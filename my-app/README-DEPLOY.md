# Deployment Guide for Render

## ⚠️ CRITICAL: Root Directory Setting

**The most common error is: "Couldn't find package.json"**

### How to Fix:

1. **Go to your Render service dashboard**
2. **Click Settings** (left sidebar)
3. **Scroll to "Build & Deploy" section**
4. **Find "Root Directory" field**
5. **Set it to EXACTLY:** `my-app` 
   - ❌ NOT: `/my-app` or `my-app/` or `src` or empty
   - ✅ YES: `my-app`
6. **Click "Save Changes" at the bottom**
7. **Go to "Manual Deploy" → "Deploy latest commit"**

**If you still get errors, see `RENDER-FIX.md` for detailed troubleshooting.**

## Frontend Setup (React App) - FREE PLAN

**Use Static Site (FREE, unlimited on free plan):**

1. **Create a new Static Site:**
   - Go to Render Dashboard → New → Static Site
   - Connect your GitHub repository
   - **Root Directory:** `my-app` (IMPORTANT: Set this in Render settings)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Click "Create Static Site"

2. **Set Environment Variable:**
   - After creation, go to Settings → Environment
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend-service.onrender.com` (replace with your actual backend URL)

## Backend Setup (Django) - FREE PLAN

**Use Web Service (uses your 1 free service):**

1. **Create a new Web Service:**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - **Root Directory:** `Backend-PostgreLocal/PostgreLocal` (IMPORTANT!)
   - **Environment:** Select `Python 3` from dropdown
   - Build Command: 
     ```
     pip install -r ../../requirements.txt
     python manage.py migrate
     python manage.py collectstatic --noinput
     ```
   - Start Command: `gunicorn PostgreLocal.wsgi:application --bind 0.0.0.0:$PORT`
   - Click "Create Web Service"

2. **Set Environment Variables:**
   - `DEBUG=False`
   - `ALLOWED_HOSTS=your-backend-service.onrender.com` (comma-separated if multiple)
   - `SECRET_KEY=your-secret-key-here` (generate a secure random key)
   - Database credentials (if using external DB):
     - `DB_NAME=your_db_name`
     - `DB_USER=your_db_user`
     - `DB_PASSWORD=your_db_password`
     - `DB_HOST=your_db_host`
     - `DB_PORT=5432`

3. **Install gunicorn:**
   - Add `gunicorn` to your `requirements.txt` if not already present

## Local Development

Create a `.env` file in `my-app/` directory:
```
REACT_APP_API_URL=http://localhost:8000
```

**Note:** The app will automatically use `http://localhost:8000` if `REACT_APP_API_URL` is not set, so local development works without any setup.

