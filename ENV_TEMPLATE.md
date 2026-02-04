# ============================================
# DESIREHUB ENVIRONMENT VARIABLES
# ============================================
# Copy this file to .env.local and fill in your actual values

# --------------------------------------------
# Supabase Configuration
# --------------------------------------------
# Get these from: https://supabase.com/dashboard → Your Project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# --------------------------------------------
# Site Configuration
# --------------------------------------------
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=DesireHub

# --------------------------------------------
# Optional: Analytics
# --------------------------------------------
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_MIXPANEL_TOKEN=your-mixpanel-token

# --------------------------------------------
# Optional: Payment Integration (Stripe)
# --------------------------------------------
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# --------------------------------------------
# Optional: Email Service (SendGrid/Resend)
# --------------------------------------------
# SENDGRID_API_KEY=SG....
# RESEND_API_KEY=re_...

# --------------------------------------------
# Optional: Cloud Storage (if not using Supabase Storage)
# --------------------------------------------
# AWS_ACCESS_KEY_ID=your-access-key
# AWS_SECRET_ACCESS_KEY=your-secret-key
# AWS_S3_BUCKET=your-bucket-name
# AWS_REGION=us-east-1

# --------------------------------------------
# Optional: Rate Limiting & Security  
# --------------------------------------------
# RATE_LIMIT_MAX_REQUESTS=100
# RATE_LIMIT_WINDOW_MS=900000
