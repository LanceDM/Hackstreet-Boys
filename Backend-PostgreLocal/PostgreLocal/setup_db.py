import os
import sys
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PostgreLocal.settings')

import django
django.setup()

def setup_database():
    app_name = 'myapp'
    print("🚀 Running makemigrations...")
    call_command('makemigrations', app_name)

    print("📦 Running migrate...")
    call_command('migrate', app_name)

    print("🌱 Seeding database...")
    call_command('seed')  # assuming your seed command is registered as `python manage.py seed`

    print("✅ All done!")

if __name__ == "__main__":
    setup_database()
