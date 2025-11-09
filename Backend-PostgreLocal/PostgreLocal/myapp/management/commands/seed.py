from django.core.management.base import BaseCommand
from django.db import transaction
from myapp.models import Quiz
from myapp.default_data import TEMP_QUIZZES


class Command(BaseCommand):
    help = "Seeds default Quiz data (main Django DB)."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Starting database seeding..."))

        with transaction.atomic():
            # Seed quizzes
            for q in TEMP_QUIZZES:
                obj, created = Quiz.objects.get_or_create(
                    problem_title=q["problem_title"], defaults=q
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"✅ Created Quiz: {obj.problem_title}"))
                else:
                    self.stdout.write(self.style.WARNING(f"⚠️ Quiz already exists: {obj.problem_title}"))

        self.stdout.write(self.style.SUCCESS("🌱 Local seeding complete!"))
