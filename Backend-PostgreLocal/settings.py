import os
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qsl

load_dotenv()

# Get the DATABASE_URL from the environment
database_url = os.getenv("https://console.neon.tech/app/projects/patient-dawn-83591855?database=neondb")
if not database_url:
    raise ValueError("DATABASE_URL not set in .env file")

tmpPostgres = urlparse(database_url)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': tmpPostgres.path[1:],  # remove leading '/'
        'USER': tmpPostgres.username,
        'PASSWORD': tmpPostgres.password,
        'HOST': tmpPostgres.hostname,
        'PORT': tmpPostgres.port or 5432,
        'OPTIONS': dict(parse_qsl(tmpPostgres.query)),
    }
}
