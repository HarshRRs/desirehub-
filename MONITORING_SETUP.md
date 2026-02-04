# 📊 Monitoring & Observability Setup Guide

## Overview

This guide covers setting up monitoring, error tracking, analytics, and database backups for DesireHub.

---

## 1. Error Monitoring with Sentry

### 1.1 Why Sentry?

- Track runtime errors in production
- Get notified of crashes before users report them
- View stack traces and context
- Free tier: 5,000 errors/month

### 1.2 Setup Steps

**Step 1: Create Sentry Account**

1. Go to [https://sentry.io/signup](https://sentry.io/signup)
2. Create account (free)
3. Create new project → **Next.js**

**Step 2: Install Sentry SDK**

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Step 3: Configure Sentry**

The wizard will create:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

Update `sentry.client.config.ts`:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% of transactions
  environment: process.env.NODE_ENV,
  beforeSend(event, hint) {
    // Don't send if user is in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },
});
```

**Step 4: Add Environment Variables**

Add to Vercel dashboard:

```env
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=your_auth_token
```

**Step 5: Test Error Tracking**

Add a test error button:

```typescript
<button onClick={() => { throw new Error("Sentry Test Error"); }}>
  Test Sentry
</button>
```

---

## 2. Analytics

### Option A: Vercel Analytics (Recommended for MVP)

**Pros:**
- Zero configuration
- Privacy-friendly
- Free tier available

**Setup:**

1. Vercel Dashboard → Your Project → **Analytics**
2. Enable Analytics
3. Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Option B: Google Analytics 4

**Pros:**
- Detailed user behavior tracking
- Free forever
- Industry standard

**Setup:**

1. Create GA4 property at [https://analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Install package:

```bash
npm install @next/third-parties
```

4. Add to `app/layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
```

5. Add env var: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

### Option C: Plausible Analytics (Privacy-First)

**Pros:**
- GDPR compliant
- No cookie consent needed
- Simple dashboard

**Cost:** $9/month

**Setup:**

1. Create account at [https://plausible.io](https://plausible.io)
2. Add your domain
3. Add script to `app/layout.tsx`:

```typescript
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 3. Database Monitoring & Backups

### 3.1 Supabase Backups

**Automatic Backups (Pro Plan $25/mo):**
- Daily automatic backups
- 7-day retention
- Point-in-time recovery

**Manual Backup (Free Tier):**

```bash
# Using Supabase CLI
npx supabase db dump > backup_$(date +%Y%m%d).sql

# Or via Dashboard
# Database → Backups → Download
```

**Backup Schedule:**

- **Before major changes:** Always
- **Weekly:** For active production sites
- **Monthly:** For stable sites

### 3.2 Supabase Monitoring

**Dashboard → Reports:**
- Database size
- API requests
- Active connections
- Slow queries

**Set up alerts:**

1. Supabase Dashboard → **Settings** → **Alerts**
2. Configure email alerts for:
   - Database size >80% of limit
   - High error rate
   - Slow queries

### 3.3 Database Health Checks

Create a cron job to monitor database:

**File:** `app/api/health/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    
    return Response.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ 
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
```

Use a service like [UptimeRobot](https://uptimerobot.com) to ping `/api/health` every 5 minutes.

---

## 4. Uptime Monitoring

### Option A: UptimeRobot (Free)

1. Create account at [https://uptimerobot.com](https://uptimerobot.com)
2. Add monitor:
   - Type: HTTPS
   - URL: `https://yourdomain.com`
   - Interval: 5 minutes
3. Set up email/SMS alerts

### Option B: Better Uptime

**Pros:**
- Beautiful status pages
- Incident management
- Multiple checks

**Cost:** Free tier available

---

## 5. Log Management

### 5.1 Vercel Logs

**View Logs:**
- Vercel Dashboard → Your Project → **Logs**
- Filter by: Function, Status Code, Time Range

**Log Retention:**
- Free: 24 hours
- Pro: 30 days

### 5.2 Supabase Logs

**View Logs:**
- Supabase Dashboard → **Logs**
- Types: API, Database, Auth, Storage

**Common Issues to Monitor:**
- Failed auth attempts
- Rate limit hits
- Storage upload errors
- Slow queries (>1s)

---

## 6. Performance Monitoring

### 6.1 Web Vitals

Use Vercel Analytics or add custom tracking:

```typescript
// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Key Metrics:**
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### 6.2 Lighthouse CI (Optional)

Run automated Lighthouse audits on every deployment:

```bash
npm install -D @lhci/cli

# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm start',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

---

## 7. Security Monitoring

### 7.1 Dependabot (GitHub)

**Auto-enabled for public repos:**
- Alerts for vulnerable dependencies
- Auto-generates PRs to update

**Enable for private repos:**
- GitHub Repo → **Settings** → **Security** → **Dependabot**

### 7.2 Security Headers Check

Use [https://securityheaders.com](https://securityheaders.com) to verify:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

**Target Grade:** A or A+

---

## 8. User Behavior Analytics (Optional)

### Option: Hotjar / Microsoft Clarity

**Features:**
- Heatmaps
- Session recordings
- User journey tracking

**Setup (Microsoft Clarity - Free):**

1. Create account at [https://clarity.microsoft.com](https://clarity.microsoft.com)
2. Add project
3. Get tracking code
4. Add to `app/layout.tsx`:

```typescript
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
    `
  }}
/>
```

---

## 9. Monitoring Dashboard

Create a simple monitoring dashboard:

**File:** `app/admin/monitoring/page.tsx`

```typescript
export default async function MonitoringPage() {
  // Fetch stats from Supabase
  const stats = {
    totalUsers: 1234,
    totalVideos: 567,
    todaySignups: 23,
    errorRate: '0.1%',
    avgResponseTime: '245ms',
  };

  return (
    <div>
      <h1>DesireHub Monitoring</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Videos" value={stats.totalVideos} />
        <StatCard title="Today's Signups" value={stats.todaySignups} />
        <StatCard title="Error Rate" value={stats.errorRate} />
        <StatCard title="Avg Response" value={stats.avgResponseTime} />
      </div>
    </div>
  );
}
```

---

## 10. Recommended Stack (MVP)

**Free Tier:**
- ✅ Vercel Analytics (web vitals)
- ✅ Vercel Logs (function logs)
- ✅ Supabase Logs (database/auth)
- ✅ UptimeRobot (uptime monitoring)
- ✅ Manual database backups

**Recommended ($10-20/mo):**
- ✅ Sentry (error tracking)
- ✅ Vercel Pro (better analytics)
- ✅ Supabase Pro (auto backups)

**Advanced ($50+/mo):**
- ✅ Datadog or New Relic (APM)
- ✅ PagerDuty (incident response)
- ✅ LogRocket (session replay)

---

## Quick Reference

| What | Tool | Cost |
|------|------|------|
| Error Tracking | Sentry | Free tier |
| Analytics | Vercel Analytics | Free tier |
| Uptime | UptimeRobot | Free |
| Logs | Vercel + Supabase | Free |
| Backups | Supabase Pro | $25/mo |
| Session Replay | Clarity | Free |

---

**Next Steps:**
1. Set up error monitoring (Sentry) - **Priority 1**
2. Enable analytics (Vercel) - **Priority 2**
3. Configure uptime monitoring - **Priority 3**
4. Set up database backups - **Priority 4**
