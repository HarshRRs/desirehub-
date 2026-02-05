# 🚀 Production Launch Guide - DesireHub

## ✅ Pre-Launch Checklist

Before going live, complete these critical steps:

- [x] Production-ready code pushed to GitHub
- [x] Vercel deployment configured
- [x] Environment variables set
- [x] Security headers enabled
- [x] Rate limiting implemented
- [ ] **Run production database setup**
- [ ] **Enable email confirmation**
- [ ] **Test video upload & playback**

---

## 🗄️ Step 1: Set Up Production Database

### Run the Clean SQL Schema

1. **Go to:** https://supabase.com/dashboard
2. **Open** your `desirehub` project
3. **Navigate to:** SQL Editor
4. **Open** the file: `SQL_PRODUCTION.sql` (in your project root)
5. **Copy ALL content** from `SQL_PRODUCTION.sql`
6. **Paste** into Supabase SQL Editor
7. **Click "Run"**

✅ **What this creates:**
- All database tables (profiles, creators, videos, etc.)
- Row Level Security policies
- Storage buckets (avatars, videos, thumbnails, banners)
- Triggers and functions
- **NO sample data** - clean start for production

---

## 📧 Step 2: Enable Email Confirmation

**Critical for security!**

1. **Supabase Dashboard** → **Authentication** → **Providers**
2. **Click on "Email"** provider
3. **Toggle ON: "Confirm email"**
4. **Save changes**

✅ **Why this matters:**
- Prevents spam accounts
- Required for video uploads (enforced in code)
- Validates user authenticity

---

## 🎥 Step 3: Test Video Upload & Playback

### Create Your First Creator Account

1. **Go to your site:** (Vercel URL or localhost)
2. **Click "Sign Up"**
3. **Create account** with:
   - **Account Type:** Creator
   - **Email:** Use a real email you can access
   - **Username:** Your creator name
4. **Check email** for verification link
5. **Click verification link**
6. **Log in**

### Upload a Test Video

1. **Go to:** Dashboard → Upload
2. **Select a video file** (MP4, WebM, or MOV recommended)
3. **Add:**
   - Title
   - Description
   - Category
   - Tags
   - Thumbnail (optional)
4. **Click "Upload"**
5. **Wait for upload** to complete

### Verify Video Player

1. **Go to homepage** or **Trending**
2. **Click on your uploaded video**
3. **Video should play** in the built-in HTML5 player
4. **Test:**
   - ✅ Play/Pause
   - ✅ Volume control
   - ✅ Fullscreen
   - ✅ Progress bar
   - ✅ Video quality

---

## 🎬 How the Video Player Works

### Video Storage Flow

```
1. Creator uploads video → Supabase Storage (videos bucket)
2. Video URL saved to database → videos.video_url
3. User clicks video → Loads /watch/[id] page
4. Page fetches video data from database
5. HTML5 <video> element streams from Supabase Storage
6. Video plays with controls
```

### Supported Formats

✅ **Best formats:**
- MP4 (H.264 codec) - **Recommended**
- WebM (VP8/VP9 codec)
- MOV (H.264 codec)

✅ **Supported by HTML5 video player:**
- Browser-native playback
- Adaptive streaming
- Mobile-friendly

---

## 🔍 Troubleshooting

### Video Won't Upload

**Error: "Email verification required"**
- ✅ Check user verified their email
- ✅ Ensure email confirmation is enabled in Supabase

**Error: "Rate limit exceeded"**
- ✅ Wait 1 hour (limit: 5 uploads/hour)
- ✅ Or increase limit in `lib/utils/ratelimit.ts`

**Error: "File too large"**
- ✅ Vercel has default limits
- ✅ For larger files, consider direct Supabase upload

### Video Won't Play

**Video player shows error:**
1. Check browser console for errors
2. Verify video URL is correct in database
3. Check Supabase storage bucket is public
4. Try a different video format (MP4 recommended)

**Video loads but won't play:**
1. Check file format compatibility
2. Try re-encoding video with H.264 codec
3. Verify storage policies allow public access

---

## ⚙️ Production Configuration

### Update Site URL

After confirming everything works:

1. **Vercel Dashboard** → Your Project → **Environment Variables**
2. **Edit:** `NEXT_PUBLIC_SITE_URL`
3. **Change from:** `http://localhost:3000`
4. **Change to:** `https://your-actual-domain.vercel.app`
5. **Redeploy**

### Configure Supabase Redirect URLs

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. **Add redirect URLs:**
   ```
   https://your-actual-domain.vercel.app/**
   https://your-actual-domain.vercel.app/auth/callback
   ```

---

## 📊 Monitor Your Launch

### First 24 Hours

**Watch for:**
- User signups
- Video uploads
- Error rates (check Vercel logs)
- Database usage (Supabase dashboard)

### Key Metrics

- **Signups:** Authentication → Users
- **Videos:** Database → videos table
- **Storage:** Storage → Usage
- **Errors:** Vercel → Logs

---

## 🎉 You're Ready to Launch!

### Final Steps:

1. ✅ Run `SQL_PRODUCTION.sql` in Supabase
2. ✅ Enable email confirmation
3. ✅ Create test creator account
4. ✅ Upload and test a video
5. ✅ Update `NEXT_PUBLIC_SITE_URL` to production domain
6. ✅ Configure Supabase redirect URLs
7. 🚀 **Announce your launch!**

---

## 📚 Important Files

- **Database:** `SQL_PRODUCTION.sql` (clean, no mock data)
- **With Sample Data:** `SQL_TO_RUN.sql` (includes demo content)
- **Deployment:** `DEPLOYMENT_GUIDE.md`
- **Monitoring:** `MONITORING_SETUP.md`

---

## 🆘 Need Help?

If you encounter issues:

1. Check Vercel deployment logs
2. Check Supabase logs (Database → Logs)
3. Verify environment variables
4. Review `DEPLOYMENT_GUIDE.md`

**Your DesireHub platform is ready for real users!** 🎬✨
