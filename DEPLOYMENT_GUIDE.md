# 🚀 DesireHub - Complete Deployment Guide

## Prerequisites

Before deploying to production, ensure you have:

- ✅ Completed all code fixes and enhancements
- ✅ A GitHub repository with your code
- ✅ A Vercel account (free tier works)
- ✅ A Supabase project set up
- ✅ Your domain name (optional, but recommended)

---

## Part 1: Supabase Setup

### 1.1 Create/Configure Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Wait for project to be provisioned (~2 minutes)

### 1.2 Run Database Migrations

1. Navigate to **SQL Editor** in Supabase Dashboard
2. Create a new query
3. Copy the entire contents of `SQL_TO_RUN.sql`
4. Run the script
5. Verify tables were created in **Table Editor**

**Expected tables:**
- profiles
- creators
- videos
- subscriptions
- favorites
- comments
- messages
- analytics

### 1.3 Create Storage Buckets

1. Go to **Storage** in Supabase Dashboard
2. Create four public buckets:
   - `avatars` (Public)
   - `videos` (Public)
   - `thumbnails` (Public)
   - `banners` (Public)

3. For each bucket, set the following policies (if not auto-created):
   - **SELECT**: Public access
   - **INSERT**: Authenticated users only (with folder-based restrictions)

### 1.4 Configure Authentication

1. Go to **Authentication** → **Providers**
2. **Enable Email Provider:**
   - Toggle "Enable Email provider"
   - ✅ **Enable "Confirm email"** (IMPORTANT for security)
   - Set "Confirm email" to "Enabled"
   
3. **Enable OAuth Providers** (optional but recommended):
   - **Google:**
     - Get credentials from Google Cloud Console
     - Add Client ID and Secret
   - **GitHub:**
     - Create OAuth app in GitHub settings
     - Add Client ID and Secret

4. **Configure Email Templates** (optional):
   - Customize "Confirm signup" email
   - Customize "Reset password" email
   - Add your branding/logo

### 1.5 Get API Keys

1. Go to **Settings** → **API**
2. Copy these values (needed for deployment):
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> [!CAUTION]
> **NEVER** commit these keys to Git! They should only be in `.env.local` (local) and Vercel dashboard (production).

---

## Part 2: Prepare Code for Deployment

### 2.1 Verify Environment Variables

Check that `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Will change for production
```

### 2.2 Test Production Build Locally

```bash
# Build the project
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` and test:
- ✅ Homepage loads
- ✅ Can sign up/login
- ✅ Can browse videos
- ✅ Security headers present (check DevTools → Network)

### 2.3 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Production-ready code"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/desirehub.git
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy to Vercel

### 3.1 Create Vercel Project

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### 3.2 Configure Build Settings

**Framework Preset:** Next.js (auto-detected)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

### 3.3 Set Environment Variables

In the Vercel project settings, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` |

> [!IMPORTANT]
> After adding a custom domain, update `NEXT_PUBLIC_SITE_URL` to your custom domain

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

---

## Part 4: Post-Deployment Configuration

### 4.1 Update Supabase Redirect URLs

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel domain to **Redirect URLs:**
   ```
   https://your-project.vercel.app/**
   https://your-project.vercel.app/auth/callback
   ```

### 4.2 Test Production Site

Visit your deployed site and verify:

- ✅ Homepage loads with correct styling
- ✅ Can create account
- ✅ Email verification email is sent
- ✅ Can verify email and login
- ✅ Can browse videos
- ✅ Creator can upload videos
- ✅ Rate limiting works (try uploading 6 videos)

### 4.3 Add Custom Domain (Optional)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain (e.g., `desirehub.com`)
3. Follow Vercel's DNS configuration instructions
4. Update environment variable:
   - `NEXT_PUBLIC_SITE_URL` → `https://yourdomain.com`
5. Redeploy (Vercel → Deployments → "Redeploy")

---

## Part 5: Monitoring & Maintenance

### 5.1 Enable Vercel Analytics (Optional)

1. Vercel Dashboard → **Analytics**
2. Enable Analytics (free tier available)
3. Track page views, performance, etc.

### 5.2 Set Up Error Monitoring (Recommended)

**Option A: Sentry (recommended)**

1. Create account at [https://sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Follow Sentry's Next.js setup guide
4. Add Sentry env vars to Vercel

**Option B: LogRocket**

Similar setup for session replay + error tracking

### 5.3 Monitor Supabase

1. Supabase Dashboard → **Database** → **Backups**
2. Enable daily backups (automatic on paid plans)
3. Check **Logs** regularly for errors
4. Monitor **Usage** to track growth

### 5.4 Regular Maintenance

**Weekly:**
- Check error logs in Vercel/Sentry
- Monitor Supabase database size
- Review user signups and uploads

**Monthly:**
- Update dependencies: `npm outdated` → `npm update`
- Review and optimize database queries
- Check for security updates

**Quarterly:**
- Review privacy policy/terms for compliance
- Audit user content for violations
- Performance optimization review

---

## Troubleshooting

### Build Fails on Vercel

**Error:** TypeScript errors
- Fix: Run `npm run build` locally and fix all errors first

**Error:** Missing environment variables
- Fix: Double-check all env vars are set in Vercel dashboard

### Users Can't Sign Up

**Error:** "Email verification required"
- **Cause:** Email confirmation enabled but emails not sending
- **Fix:** Check Supabase → Authentication → Email Templates
- **Fix:** Check spam folder
- **Fix:** Verify SMTP settings (if custom email provider)

### Videos Won't Upload

**Error:** "Rate limit exceeded"
- **Cause:** User exceeded 5 uploads/hour
- **Fix:** Wait or reset rate limit manually

**Error:** "Email verification required"
- **Cause:** User hasn't verified email
- **Fix:** User must check email and click verify link

**Error:** "Failed to upload video"
- **Cause:** Storage bucket not configured
- **Fix:** Verify storage buckets exist and have correct policies

### Security Headers Not Working

- Check browser DevTools → Network → Response Headers
- Verify `next.config.ts` headers are properly configured
- Redeploy after config changes

---

## Emergency Rollback

If deployment has critical issues:

1. Go to Vercel → **Deployments**
2. Find previous working deployment
3. Click **"..."** → **"Promote to Production"**
4. Fix issues locally
5. Redeploy when ready

---

## Production Checklist

Before announcing launch:

- [ ] All critical issues fixed
- [ ] Production build tested locally
- [ ] Deployed to Vercel successfully
- [ ] Custom domain configured (if applicable)
- [ ] Email verification working
- [ ] OAuth providers working (if enabled)
- [ ] Video upload working
- [ ] Rate limiting working
- [ ] Security headers verified
- [ ] Privacy policy reviewed
- [ ] Terms of service reviewed
- [ ] Error monitoring set up
- [ ] Analytics set up
- [ ] Database backups enabled
- [ ] Supabase redirect URLs configured
- [ ] All test accounts working

---

## Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Community:** https://github.com/vercel/next.js/discussions
- **Supabase Discord:** https://discord.supabase.com

---

**Deployment Complete! 🎉**

Your DesireHub platform is now live and ready for users!
