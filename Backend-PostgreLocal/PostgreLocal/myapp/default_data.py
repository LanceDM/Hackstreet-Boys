# =============================
# Default / Initial Data Seeds
# =============================

# 🔹 Predefined EventList entries (A1–A10)
DEFAULT_EVENTS = [
    {
        "event_code": "E1",
        "action": "start_test",
        "description": "Baseline for total duration; can detect pre-start delay (procrastination).",
    },
    {
        "event_code": "E2",
        "action": "end_test",
        "description": "Final timestamp to compute total session time.",
    },
    {
        "event_code": "E3",
        "action": "open_question",
        "description": "Track focus per problem; detect skipping back/forth. Record what questions were opened.",
    },
    {
        "event_code": "E4",
        "action": "close_question",
        "description": "Record what questions were closed or left without submitting.",
    },
    {
        "event_code": "E5",
        "action": "submit_answer",
        "description": "Capture answer correctness per question → relate effort vs outcome. May display submitted characters.",
    },
    {
        "event_code": "E6",
        "action": "edit_answer",
        "description": "Detects repeated changes; log number of edits (e.g., +1 or -2) to indicate uncertainty or revision frequency.",
    },
    {
        "event_code": "E7",
        "action": "keystroke",
        "description": "Fine-grained insight into coding behavior, typing speed, and hesitation.",
    },
    {
        "event_code": "E8",
        "action": "selecting_text",
        "description": "Detect rereading or code navigation; indicates planning or confusion.",
    },
    {
        "event_code": "E9",
        "action": "window_resize",
        "description": "May indicate switching context or possible distractions.",
    },
    {
        "event_code": "E10",
        "action": "scroll",
        "description": "Tracks scrolling; can indicate reviewing problem statements or code carefully.",
    },
]


# 🔹 Temporary Quiz entries (for testing or placeholder content)
TEMP_QUIZZES = [
    {
        "quiz_difficulty": "A",
        "quiz_number": 1,
        "problem_title": "Print Hello World",
        "problem_description": "Write a function that prints 'Hello, World!'.",
        "initial_code": "def hello_world():\n    # Write your code here",
        "quiz_data": {
            "answers": ["Hello, World!"],
            "test_cases": [
                {"input": None, "expected_output": "Hello, World!"},
            ],
        },
    },
    {
        "quiz_difficulty": "B",
        "quiz_number": 2,
        "problem_title": "Sum Two Numbers",
        "problem_description": "Return the sum of two numbers.",
        "initial_code": "def add(a, b):\n    # Write your code here",
        "quiz_data": {
            "answers": [3, 5, 10],
            "test_cases": [
                {"input": [1, 2], "expected_output": 3},
                {"input": [2, 3], "expected_output": 5},
                {"input": [5, 5], "expected_output": 10},
            ],
        },
    },
]
