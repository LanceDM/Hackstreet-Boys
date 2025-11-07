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
    # Difficulty A
    {
        "quiz_difficulty": "A",
        "quiz_number": 1,
        "problem_title": "Print Hello World",
        "problem_description": "Write a function that prints 'Hello, World!'.",
        "initial_code": "def hello_world():\n    # Write your code here",
        "quiz_data": {
            "answers": ["Hello, World!"],
            "test_cases": [
                {"input": None, "expected_output": "Hello, World!"}
            ]
        }
    },
    {
        "quiz_difficulty": "A",
        "quiz_number": 2,
        "problem_title": "Check Even/Odd",
        "problem_description": "Return 'even' if number is even, else 'odd'.",
        "initial_code": "def even_or_odd(n):\n    # Write your code here",
        "quiz_data": {
            "answers": ["even", "odd"],
            "test_cases": [
                {"input": [4], "expected_output": "even"},
                {"input": [7], "expected_output": "odd"}
            ]
        }
    },
    {
        "quiz_difficulty": "A",
        "quiz_number": 3,
        "problem_title": "Count Vowels",
        "problem_description": "Return the number of vowels in a string.",
        "initial_code": "def count_vowels(s):\n    # Write your code here",
        "quiz_data": {
            "answers": [2, 5, 0],
            "test_cases": [
                {"input": ["hello"], "expected_output": 2},
                {"input": ["beautiful"], "expected_output": 5},
                {"input": ["why"], "expected_output": 0}
            ]
        }
    },

    # Difficulty B
    {
        "quiz_difficulty": "B",
        "quiz_number": 1,
        "problem_title": "Sum Two Numbers",
        "problem_description": "Return the sum of two numbers.",
        "initial_code": "def add(a, b):\n    # Write your code here",
        "quiz_data": {
            "answers": [3, 5, 10],
            "test_cases": [
                {"input": [1, 2], "expected_output": 3},
                {"input": [2, 3], "expected_output": 5},
                {"input": [5, 5], "expected_output": 10}
            ]
        }
    },
    {
        "quiz_difficulty": "B",
        "quiz_number": 2,
        "problem_title": "Find Max in List",
        "problem_description": "Return the largest number in a list.",
        "initial_code": "def find_max(nums):\n    # Write your code here",
        "quiz_data": {
            "answers": [5, 100, -1],
            "test_cases": [
                {"input": [[1, 3, 5]], "expected_output": 5},
                {"input": [[100, 20]], "expected_output": 100},
                {"input": [[-1]], "expected_output": -1}
            ]
        }
    },
    {
        "quiz_difficulty": "B",
        "quiz_number": 3,
        "problem_title": "Palindrome Check",
        "problem_description": "Return True if the string is a palindrome.",
        "initial_code": "def is_palindrome(s):\n    # Write your code here",
        "quiz_data": {
            "answers": [True, False],
            "test_cases": [
                {"input": ["racecar"], "expected_output": True},
                {"input": ["hello"], "expected_output": False}
            ]
        }
    },

    # Difficulty C
    {
        "quiz_difficulty": "C",
        "quiz_number": 1,
        "problem_title": "Reverse a String",
        "problem_description": "Return the input string in reverse order.",
        "initial_code": "def reverse_string(s):\n    # Write your code here",
        "quiz_data": {
            "answers": ["cba", "olleh", ""],
            "test_cases": [
                {"input": ["abc"], "expected_output": "cba"},
                {"input": ["hello"], "expected_output": "olleh"},
                {"input": [""], "expected_output": ""}
            ]
        }
    },
    {
        "quiz_difficulty": "C",
        "quiz_number": 2,
        "problem_title": "Fibonacci Sequence",
        "problem_description": "Return the nth Fibonacci number (0-indexed).",
        "initial_code": "def fibonacci(n):\n    # Write your code here",
        "quiz_data": {
            "answers": [0, 1, 5],
            "test_cases": [
                {"input": [0], "expected_output": 0},
                {"input": [1], "expected_output": 1},
                {"input": [5], "expected_output": 5}
            ]
        }
    },
    {
        "quiz_difficulty": "C",
        "quiz_number": 3,
        "problem_title": "Binary Search",
        "problem_description": "Implement binary search on a sorted list.",
        "initial_code": "def binary_search(arr, target):\n    # Write your code here",
        "quiz_data": {
            "answers": [2, -1],
            "test_cases": [
                {"input": [[1, 3, 5, 7], 5], "expected_output": 2},
                {"input": [[1, 3, 5], 4], "expected_output": -1}
            ]
        }
    },
]
