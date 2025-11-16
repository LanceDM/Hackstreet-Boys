FROM python:3.11-slim
# FROM python:
# Prevent Python from writing .pyc files and buffering stdout
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system dependencies for wait-for-db and psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first (for caching)
COPY PostgreLocal/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project
COPY PostgreLocal /app/PostgreLocal

# Set working directory to where manage.py lives
WORKDIR /app/PostgreLocal

# Copy the wait-for-db script
COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

# Expose Django port
EXPOSE 8000

# Run migrations automatically before starting Django
CMD ["/bin/sh", "-c", "./../wait-for-db.sh db && python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]
