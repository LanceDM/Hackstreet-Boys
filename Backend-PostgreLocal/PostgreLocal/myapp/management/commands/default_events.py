from django.core.management.base import BaseCommand
from django.db import connections

DEFAULT_EVENTS = [
    {"event_code": "E1", "action": "start_test", "description": "Baseline for total duration; can detect pre-start delay (procrastination)."},
    {"event_code": "E2", "action": "end_test", "description": "Final timestamp to compute total session time."},
    {"event_code": "E3", "action": "open_question", "description": "Track focus per problem; detect skipping back/forth. Record what questions were opened."},
    {"event_code": "E4", "action": "close_question", "description": "Record what questions were closed or left without submitting."},
    {"event_code": "E5", "action": "submit_answer", "description": "Capture answer correctness per question → relate effort vs outcome. May display submitted characters."},
    {"event_code": "E6", "action": "edit_answer", "description": "Detects repeated changes; log number of edits (e.g., +1 or -2) to indicate uncertainty or revision frequency."},
    {"event_code": "E7", "action": "keystroke", "description": "Fine-grained insight into coding behavior, typing speed, and hesitation."},
    {"event_code": "E8", "action": "selecting_text", "description": "Detect rereading or code navigation; indicates planning or confusion."},
    {"event_code": "E9", "action": "window_resize", "description": "May indicate switching context or possible distractions."},
    {"event_code": "E10", "action": "scroll", "description": "Tracks scrolling; can indicate reviewing problem statements or code carefully."},
    {"event_code": "E11", "action": "button_click", "description": "Detects copying code snippets; may indicate reliance on external sources or prior knowledge."},
]

class Command(BaseCommand):
    help = "Populate the event_list table in the data_storage database with default events."

    def handle(self, *args, **kwargs):
        connection = connections["data_storage"]
        with connection.cursor() as cursor:
            for event in DEFAULT_EVENTS:
                cursor.execute("""
                    INSERT INTO event_list (event_code, action, description)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (event_code) DO NOTHING;
                """, [event["event_code"], event["action"], event["description"]])
        connection.commit()
        self.stdout.write(self.style.SUCCESS("✅ Default events populated successfully!"))
