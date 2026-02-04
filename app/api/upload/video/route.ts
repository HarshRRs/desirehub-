import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/utils/ratelimit';
import logger from '@/lib/utils/logger';

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            logger.warn('Upload attempt without authentication', { endpoint: '/api/upload/video' });
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check email verification
        if (!user.email_confirmed_at) {
            logger.warn('Upload attempt with unverified email', { userId: user.id });
            return NextResponse.json({
                error: 'Email verification required',
                message: 'Please verify your email address before uploading content.'
            }, { status: 403 });
        }

        // Rate limiting: 5 uploads per hour per user
        const rateLimit = checkRateLimit(`upload:${user.id}`, 5, 60 * 60 * 1000);
        if (!rateLimit.success) {
            const resetDate = new Date(rateLimit.resetTime);
            logger.warn('Rate limit exceeded for upload', {
                userId: user.id,
                resetTime: resetDate.toISOString()
            });
            return NextResponse.json({
                error: 'Rate limit exceeded',
                message: `Too many uploads. Please try again after ${resetDate.toLocaleTimeString()}.`,
                resetTime: rateLimit.resetTime
            }, { status: 429 });
        }

        logger.info('Upload request started', {
            userId: user.id,
            remaining: rateLimit.remaining
        });

        // Get form data
        const formData = await request.formData();
        const videoFile = formData.get('video') as File;
        const thumbnailFile = formData.get('thumbnail') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const isPremium = formData.get('isPremium') === 'true';

        if (!videoFile || !title) {
            return NextResponse.json({ error: 'Video file and title are required' }, { status: 400 });
        }

        // Upload video to Supabase Storage
        const videoFileName = `${user.id}/${Date.now()}-${videoFile.name}`;
        const { data: videoData, error: videoError } = await supabase.storage
            .from('videos')
            .upload(videoFileName, videoFile, {
                cacheControl: '3600',
                upsert: false,
            });

        if (videoError) {
            logger.error('Video upload to storage failed', new Error(videoError.message), {
                userId: user.id,
                fileName: videoFile.name
            });
            return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
        }

        // Get public URL for video
        const { data: { publicUrl: videoUrl } } = supabase.storage
            .from('videos')
            .getPublicUrl(videoFileName);

        // Upload thumbnail if provided
        let thumbnailUrl = null;
        if (thumbnailFile) {
            const thumbnailFileName = `${user.id}/${Date.now()}-${thumbnailFile.name}`;
            const { error: thumbnailError } = await supabase.storage
                .from('thumbnails')
                .upload(thumbnailFileName, thumbnailFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (!thumbnailError) {
                const { data: { publicUrl } } = supabase.storage
                    .from('thumbnails')
                    .getPublicUrl(thumbnailFileName);
                thumbnailUrl = publicUrl;
            }
        }

        // Get creator profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

        if (!profile) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        // Create video record in database
        const { data: video, error: dbError } = await supabase
            .from('videos')
            .insert({
                creator_id: user.id,
                title,
                description,
                category,
                video_url: videoUrl,
                thumbnail_url: thumbnailUrl,
                is_premium: isPremium,
                is_published: true,
                duration: 0, // You can calculate this on the frontend if needed
            })
            .select()
            .single();

        if (dbError) {
            logger.error('Failed to create video record in database', new Error(dbError.message), {
                userId: user.id,
                title
            });
            return NextResponse.json({ error: 'Failed to create video record' }, { status: 500 });
        }

        const duration = Date.now() - startTime;
        logger.uploadLog(user.id, videoFile.name, videoFile.size, true);
        logger.apiLog('POST', '/api/upload/video', 200, duration, user.id);

        return NextResponse.json({
            success: true,
            video,
            message: 'Video uploaded successfully!',
            uploadTime: duration
        });

    } catch (error) {
        const duration = Date.now() - startTime;
        logger.error('Upload error - Internal server error', error as Error, {
            endpoint: '/api/upload/video',
            duration
        });
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Note: File size limit is controlled by Vercel deployment settings
// For local development, Next.js allows up to 4MB by default
// To increase in production, add to vercel.json:
// { "functions": { "api/upload/video": { "maxDuration": 300 } } }
