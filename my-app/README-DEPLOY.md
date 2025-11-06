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

## Frontend Setup (React App)

1. **Create a new Static Site on Render (Recommended):**
   - Connect your GitHub repository
   - **Root Directory:** `my-app` (IMPORTANT: Set this in Render settings)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

   **OR create a Web Service:**
   - Connect your GitHub repository
   - **Root Directory:** `my-app` (IMPORTANT: Set this in Render settings)
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s build -l 10000`

2. **Set Environment Variable:**
   - Go to your Render service settings → Environment
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend-service.onrender.com` (replace with your actual backend URL)

## Backend Setup (Django)

1. **Create a new Web Service on Render:**
   - Root Directory: `Backend-PostgreLocal/PostgreLocal`
   - Environment: `Python 3`
   - Build Command: `pip install -r ../../requirements.txt`
   - Start Command: `python manage.py migrate && gunicorn PostgreLocal.wsgi:application`

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

