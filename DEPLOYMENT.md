# Deployment Guide - Seize the Summit '26

## Step-by-Step Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Git installed on your computer

### Step 1: Prepare Your Code

1. Make sure all files are saved
2. The project is ready to deploy as-is

### Step 2: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Seize the Summit registration website"
```

2. Create a new repository on GitHub:
   - Go to github.com
   - Click "New repository"
   - Name it "seize-the-summit-26"
   - Don't initialize with README (we already have one)

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/seize-the-summit-26.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Wait for deployment to complete (2-3 minutes)

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **seize-the-summit-26**
   - Directory? **./
   - Override settings? **N**

5. Deploy to production:
```bash
vercel --prod
```

### Step 4: Set Up Database

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Choose a database name (e.g., "summit-registrations")
7. Select region closest to your users
8. Click "Create"

**Important**: Vercel will automatically add the database environment variables to your project!

### Step 5: Redeploy with Database

1. After database creation, go to "Deployments" tab
2. Click on the three dots (...) next to your latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache"
5. Click "Redeploy"

Your website is now live! 🎉

### Step 6: Test Your Website

1. Visit your deployment URL (e.g., `https://seize-the-summit-26.vercel.app`)
2. Test the registration form:
   - Fill in team details
   - Submit the form
   - Verify you reach the success page

### Step 7: View Registrations

To view all registrations, visit:
```
https://your-domain.vercel.app/api/register
```

This will return JSON data with all team registrations.

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

If you need to manually add environment variables:

1. Go to project Settings
2. Click "Environment Variables"
3. Add the following (if not auto-added by database):
   - `POSTGRES_DATABASE`

### Using Supabase Postgres

If you are using Supabase instead of Vercel's built-in Postgres:

1. Go to your **Supabase Project Settings** > **Database**.
2. Find the **Connection string** section and select **URI**.
3. Copy the URI (it starts with `postgres://...`).
4. In your **Vercel Project Settings** > **Environment Variables**, add:
   - Key: `POSTGRES_URL`
   - Value: `[Paste your Supabase URI here]`
5. **Important**: If you see an SSL error, append `?sslmode=require` to the end of your `POSTGRES_URL`.
6. Redeploy your project for the changes to take effect.

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors

### Database Connection Issues
- Verify environment variables are set
- Check database is in the same region
- Ensure database is not paused (free tier limitation)

### Form Submission Fails
- Check browser console for errors
- Verify API route is accessible
- Check database tables were created

## Monitoring

- View deployment logs in Vercel dashboard
- Monitor database usage in Storage tab
- Check analytics for visitor statistics

## Support

For issues:
1. Check Vercel documentation: vercel.com/docs
2. Check Next.js documentation: nextjs.org/docs
3. Contact Nature And Trekking Club administrators

---

**Your website is now live and ready to accept registrations!** 🏔️🏆
