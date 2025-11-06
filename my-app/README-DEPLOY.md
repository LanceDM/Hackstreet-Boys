# Deployment Guide for Render

## Frontend Setup (React App)

1. **Create a new Web Service on Render:**
   - Connect your GitHub repository
   - Root Directory: `my-app`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx serve -s build -l 10000`
   - Or use Static Site with Publish Directory: `build`

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

