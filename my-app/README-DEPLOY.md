# Deployment Guide for Render

## ⚠️ IMPORTANT: Root Directory Setting

**The most common issue is forgetting to set the Root Directory!**

When creating your service in Render:
1. Go to **Settings** → **General**
2. Find **"Root Directory"** field
3. Set it to: `my-app` (for frontend) or `Backend-PostgreLocal/PostgreLocal` (for backend)
4. **Save** and redeploy

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

