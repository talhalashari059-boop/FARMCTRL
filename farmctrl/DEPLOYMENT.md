
# 🚀 FARMCTRL Deployment Guide

This document outlines the steps to take your FARMCTRL application from local development to a live production server.

## 1. Recommended Tech Stack
- **Frontend/Backend**: Vercel (Optimized for Next.js)
- **Database**: PostgreSQL (Managed via Vercel Postgres, Railway, or Supabase)
- **Authentication**: NextAuth.js

## 2. Preparation Steps

### A. Update Prisma for PostgreSQL
To use a production database, you must change the database provider in `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql" // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### B. Environment Variables
You will need to set these in your hosting provider's dashboard (e.g., Vercel Settings):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | The connection string for your Postgres DB |
| `NEXTAUTH_SECRET` | A secure random string (you can use `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your live site URL (e.g., `https://farmctrl-demo.vercel.app`) |

## 3. Deploying to Vercel (The Easiest Way)

1. **Push to GitHub**: Initialize a git repo and push your code to a private GitHub repository.
2. **Import to Vercel**: 
   - Log in to [vercel.com](https://vercel.com).
   - Click "New Project" and import your GitHub repo.
3. **Configure Settings**:
   - Add the Environment Variables listed above.
   - For the Build Command, ensure it is `next build`.
4. **Deploy**: Click **Deploy**. Vercel will handle the rest!

## 4. Post-Deployment Database Setup
Once deployed, you need to sync your database schema:

```bash
# Run this from your local machine (with prod DATABASE_URL in .env) 
# OR use a CI/CD action
npx prisma migrate deploy
npx prisma db seed
```

## 5. Bilingual Support
The application is already bilingual. No additional configuration is needed for the Urdu/English UI to work in production.

---

**Need Help?** Ask me any questions about SSL, domain names, or database scaling!
