import os
import django
from django.core.management import call_command, CommandError

# Load Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PostgreLocal.settings')
django.setup()


def setup_database():
    print("🌱 Starting database population...")

    # Run the seed command
    try:
        print("📦 Running seed command...")
        call_command('seed')
        print("✅ Local data seeded successfully!")
    except CommandError as e:
        print(f"⚠️  Could not run 'seed' command: {e}")

    # Run the default events command
    try:
        print("🔗 Populating default events...")
        call_command('default_events')
        print("✅ Default events populated successfully!")
    except CommandError as e:
        print(f"⚠️  Could not run 'default_events' command: {e}")

    print("🎉 All population tasks complete!")


if __name__ == "__main__":
    setup_database()
