import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function generateMetadata({
  title = 'DesireHub - Premium Adult Entertainment Platform',
  description = 'Experience the ultimate in premium adult entertainment. Stream exclusive 4K videos, connect with top creators, and explore your deepest fantasies on the world\'s most sophisticated platform.',
  keywords = [
    'premium adult content',
    'exclusive videos',
    '4K streaming',
    'content creators',
    'adult entertainment',
    'premium membership',
    'exclusive platform',
  ],
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  canonical,
}: SEOProps = {}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://desirehub.com';
  const fullTitle = title.includes('DesireHub') ? title : `${title} | DesireHub`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'DesireHub' }],
    creator: 'DesireHub',
    publisher: 'DesireHub',
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: ogType as any,
      title: fullTitle,
      description,
      siteName: 'DesireHub',
      url: canonical || siteUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@desirehub',
    },
    alternates: {
      canonical: canonical || siteUrl,
    },
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
    category: 'entertainment',
  };
}

// Predefined metadata for common pages
export const homeMetadata = generateMetadata({
  title: 'DesireHub - Premium Adult Entertainment Platform',
  description:
    'The world\'s most exclusive adult entertainment platform. Stream 4K videos, connect with top creators, and explore your deepest fantasies. Join 100,000+ members today.',
  keywords: [
    'premium adult content',
    'exclusive videos',
    '4K streaming',
    'top creators',
    'adult entertainment platform',
    'premium membership',
    'exclusive content',
    'adult streaming',
  ],
});

export const trendingMetadata = generateMetadata({
  title: 'Trending Now - Popular Videos',
  description:
    'Discover the hottest trending content on DesireHub. Watch what everyone is talking about from our top creators. Updated daily with fresh exclusive content.',
  keywords: ['trending videos', 'popular content', 'hot videos', 'viral content', 'trending creators'],
});

export const creatorsMetadata = generateMetadata({
  title: 'Top Creators - Premium Content Creators',
  description:
    'Browse and connect with DesireHub\'s elite content creators. Follow your favorites, subscribe for exclusive content, and experience premium entertainment.',
  keywords: ['content creators', 'premium creators', 'exclusive creators', 'verified models', 'top performers'],
});

export const categoriesMetadata = generateMetadata({
  title: 'Browse Categories - All Content Categories',
  description:
    'Explore all content categories on DesireHub. From fitness to fashion, cosplay to artistic content. Find exactly what you\'re looking for.',
  keywords: ['content categories', 'video categories', 'browse content', 'filter videos', 'all categories'],
});

export const pricingMetadata = generateMetadata({
  title: 'Pricing - Membership Plans',
  description:
    'Choose the perfect DesireHub membership plan for you. From free access to premium VIP experiences. Unlock exclusive content and features today.',
  keywords: ['pricing', 'membership plans', 'subscription', 'premium access', 'VIP membership'],
});

export const searchMetadata = generateMetadata({
  title: 'Search - Find Your Favorite Content',
  description:
    'Search through thousands of exclusive videos and creators. Advanced filters help you find exactly what you want.',
  keywords: ['search videos', 'find content', 'search creators', 'discover content'],
});

export const dashboardMetadata = generateMetadata({
  title: 'Dashboard - Your Personal Hub',
  description: 'Manage your DesireHub account, subscriptions, favorites, and preferences all in one place.',
  keywords: ['user dashboard', 'account management', 'subscriptions', 'favorites'],
  noIndex: true, // Private pages
});

export const creatorDashboardMetadata = generateMetadata({
  title: 'Creator Dashboard - Manage Your Content',
  description: 'Track analytics, manage content, view earnings, and grow your subscriber base.',
  keywords: ['creator dashboard', 'content management', 'creator analytics', 'earnings'],
  noIndex: true, // Private pages
});
