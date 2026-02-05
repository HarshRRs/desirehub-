# 🚀 Simple Database Setup - DesireHub

## Step 1: Run Basic SQL

1. Open [`SQL_SIMPLE.sql`](file:///C:/Users/SHAH%20HARSH/.gemini/antigravity/scratch/desirehub-fullstack/SQL_SIMPLE.sql)
2. Copy ALL content
3. Paste in Supabase SQL Editor
4. Click **Run**
5. ✅ Should complete successfully!

## Step 2: Manual Storage Setup (Supabase Dashboard)

Since SQL keeps failing for storage, do this manually:

### Create Buckets

1. **Supabase Dashboard** → **Storage**
2. Click **"New bucket"**  
3. Create these 4 buckets (one at a time):

**Bucket 1:**
- Name: `avatars`
- Public: ✅ Yes
- Click **Create**

**Bucket 2:**
- Name: `videos`
- Public: ✅ Yes
- Click **Create**

**Bucket 3:**
- Name: `thumbnails`  
- Public: ✅ Yes
- Click **Create**

**Bucket 4:**
- Name: `banners`
- Public: ✅ Yes
- Click **Create**

### Set Bucket Policies

For EACH bucket, click the bucket → **Policies** → **New Policy**:

**For all buckets, create 2 policies:**

**Policy 1: Public Read**
- Policy name: `Public access`
- Allowed operation: **SELECT**
- Policy definition:
```sql
true
```

**Policy 2: Authenticated Upload**
- Policy name: `Authenticated uploads`
- Allowed operation: **INSERT**  
- Policy definition:
```sql
auth.role() = 'authenticated'
```

## Step 3: Enable Email Confirmation

1. **Authentication** → **Providers** → **Email**
2. Toggle ON: **"Confirm email"**
3. **Save**

## ✅ Done!

Your database is ready. The manual storage setup avoids all SQL errors.

## Test It

1. Create a creator account on your site
2. Verify email
3. Upload a test video
4. Check if it plays!
