import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desirehub.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/dashboard/',
                    '/api/',
                    '/admin/',
                    '/auth/',
                    '/profile/edit',
                    '/settings/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
