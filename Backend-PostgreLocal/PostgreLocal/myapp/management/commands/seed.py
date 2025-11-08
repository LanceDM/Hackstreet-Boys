from django.core.management.base import BaseCommand
from django.db import transaction
from myapp.models import EventList, Quiz
from myapp.default_data import DEFAULT_EVENTS, TEMP_QUIZZES


class Command(BaseCommand):
    help = "Seeds default EventList and temporary Quiz data."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Starting database seeding..."))

        with transaction.atomic():
            # --- Seed EventList ---
            for e in DEFAULT_EVENTS:
                obj, created = EventList.objects.get_or_create(
                    event_code=e["event_code"], defaults=e
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Created Event: {obj.event_code}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Event already exists: {obj.event_code}"))

            # --- Seed Quiz ---
            for q in TEMP_QUIZZES:
                obj, created = Quiz.objects.get_or_create(
                    problem_title=q["problem_title"], defaults=q
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Created Quiz: {obj.problem_title}"))
                else:
                    self.stdout.write(self.style.WARNING(f"Quiz already exists: {obj.problem_title}"))

        self.stdout.write(self.style.SUCCESS("✅ Seeding complete!"))
