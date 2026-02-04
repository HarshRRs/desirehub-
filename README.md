# DesireHub - Premium Adult Entertainment Platform

## 🚀 Project Overview
A fully functional adult entertainment platform built with Next.js, Supabase, and premium UI design.

## ✅ Features Implemented
- **Authentication System** - Login/Signup with email + Google/GitHub OAuth
- **Video Player** - Custom HTML5 player with controls
- **Video Upload** - Complete upload system for creators
- **Database Integration** - Supabase with all tables configured
- **Premium UI** - Dark theme with neon pink accents, glassmorphism
- **Adult Compliance** - Age gate, RTA label, 18+ verification
- **All Pages** - Homepage, Trending, Categories, Creators, Watch, Dashboards

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create `.env.local` in the root directory:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

(See `env.setup` file for the actual credentials)

### 3. Set Up Supabase Database
1. Go to your Supabase project
2. Open SQL Editor
3. Run the SQL from `SQL_TO_RUN.sql` file (this creates all tables and sample data)

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Key Pages

- **Homepage:** `/` - Hero section with luxury poolside image
- **Trending:** `/trending` - Browse popular videos
- **Categories:** `/categories` - 12 adult categories
- **Creators:** `/creators` - Browse content creators
- **Watch:** `/watch/[id]` - Video player page
- **Upload:** `/dashboard/creator/upload` - Upload videos (creators only)
- **Login:** `/login` - User authentication
- **Signup:** `/signup` - Create account (User or Creator)

## 🔐 Authentication

### Test Accounts
After running SQL_TO_RUN.sql, you can:
- Sign up as new user (email + password)
- Use Google/GitHub OAuth
- Choose "User" or "Creator" account type

### Creator Features
- Upload videos (up to 500MB)
- Add thumbnails
- Set premium content flags
- View analytics
- Manage subscribers

## 📁 Project Structure

```
app/
├── api/upload/video/    # Upload API endpoint
├── dashboard/creator/   # Creator dashboard pages
├── watch/[id]/         # Video player
├── login/              # Authentication
├── signup/             # Registration
├── page.tsx            # Homepage
components/
├── VideoPlayer.tsx     # Custom video player
├── layout/             # Navbar, Footer
lib/
├── auth/               # Auth context  
├── supabase/          # Database clients
public/
├── hero-bg.jpg        # Luxury poolside hero image
├── logo-new.jpg       # DesireHub logo
```

## 🎨 Design System

- **Colors:** Midnight black, Neon pink (#FF1B6D), Violet, Crimson
- **Fonts:** Kanit (headings), Inter (body)
- **Effects:** Glassmorphism, Neon glows, Smooth animations
- **Theme:** Premium dark with 35% overlay on hero

## 🚀 Deployment

### Quick Deploy to Vercel
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy
npx vercel
```

Add environment variables in Vercel dashboard.

## 📝 Notes

- **Content:** Currently has sample data. Upload real videos via creator dashboard
- **Storage:** Videos stored in Supabase Storage buckets
- **Security:** Row Level Security (RLS) enabled on all tables
- **Compliance:** Age verification modal on first visit

## 🎬 How to Upload Videos

1. Create a Creator account
2. Go to `/dashboard/creator/upload`
3. Upload video file (MP4/WebM/MOV)
4. Add thumbnail, title, description
5. Select category and premium status
6. Click "Upload Video"

## 💻 Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, TailwindCSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel (recommended)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## ✨ Status: 100% READY TO LAUNCH

All core features implemented and working!

---

**Built with ❤️ for DesireHub**
