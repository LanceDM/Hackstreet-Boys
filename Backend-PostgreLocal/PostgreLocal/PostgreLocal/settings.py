"""
Django settings for PostgreLocal project.

Production-safe and environment-based configuration.
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Base Directory Setup
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env
load_dotenv(BASE_DIR / ".env")

# ---------------------------------------------------------------------------
# Security and Debug Settings
# ---------------------------------------------------------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-default-key")
DEBUG = os.getenv("DEBUG", "True") == "True"

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")

# ---------------------------------------------------------------------------
# Application Definition
# ---------------------------------------------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "myapp",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "PostgreLocal.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "my-app/build")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "PostgreLocal.wsgi.application"

# ---------------------------------------------------------------------------
# REST Framework
# ---------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}

# ---------------------------------------------------------------------------
# CORS Settings
# ---------------------------------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = os.getenv("CORS_ALLOW_ALL_ORIGINS", "False") == "True"

CORS_ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "https://hackstreet-boys-1-8e10.onrender.com,http://localhost:3000"
).split(",")

# ---------------------------------------------------------------------------
# Database Configuration (From .env)
# ---------------------------------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", "django.db.backends.postgresql"),
        "NAME": os.getenv("DB_NAME", "postgres"),
        "USER": os.getenv("DB_USER", "postgres"),
        "PASSWORD": os.getenv("DB_PASSWORD", "postgres"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    },

    "data_storage": {
        "ENGINE": os.getenv("DATA_STORAGE_ENGINE", "django.db.backends.postgresql"),
        "NAME": os.getenv("DATA_STORAGE_NAME", "data_storage"),
        "USER": os.getenv("DATA_STORAGE_USER", "storage_user"),
        "PASSWORD": os.getenv("DATA_STORAGE_PASSWORD", "storage_pass"),
        "HOST": os.getenv("DATA_STORAGE_HOST", "data-storage"),  # matches docker-compose service name
        "PORT": os.getenv("DATA_STORAGE_PORT", "5432"),
    },
}


# ---------------------------------------------------------------------------
# Password Validation
# ---------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ---------------------------------------------------------------------------
# Internationalization
# ---------------------------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ---------------------------------------------------------------------------
# Static Files
# ---------------------------------------------------------------------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ---------------------------------------------------------------------------
# Default Primary Key
# ---------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ---------------------------------------------------------------------------
# Judge0 API URL (Optional)
# ---------------------------------------------------------------------------
JUDGE0_API_URL = os.getenv("JUDGE0_API_URL", "http://localhost:2358")

print("Loaded .env from:", BASE_DIR / ".env")
print("DB_HOST =", os.getenv("DB_HOST"))