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
    # ---------------------
    # Difficulty A
    # ---------------------
    {
        "quiz_difficulty": "A",
        "quiz_number": 1,
        "problem_title": "Print Hello World",
        "problem_description": "Write a function that returns the string 'Hello, World!'.",
        "initial_code": """#include <string>
using namespace std;

string hello_world() {
    // Write your code here
    return "";
}
""",
        "quiz_data": {
            "language_id": 52,  # C++
            "test_cases": [
                {"input": "", "expected_output": "Hello, World!\n"}
            ]
        }
    },
    {
        "quiz_difficulty": "A",
        "quiz_number": 2,
        "problem_title": "Check Even or Odd",
        "problem_description": "Write a function that returns 'even' if n is even, otherwise 'odd'.",
        "initial_code": """#include <string>
using namespace std;

string even_or_odd(int n) {
    // Write your code here
    return "";
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "4", "expected_output": "even\n"},
                {"input": "7", "expected_output": "odd\n"}
            ]
        }
    },
    {
        "quiz_difficulty": "A",
        "quiz_number": 3,
        "problem_title": "Count Vowels",
        "problem_description": "Write a function that returns the number of vowels in a given string.",
        "initial_code": """#include <string>
using namespace std;

int count_vowels(string s) {
    // Write your code here
    return 0;
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "hello", "expected_output": "2\n"},
                {"input": "beautiful", "expected_output": "5\n"},
                {"input": "why", "expected_output": "0\n"}
            ]
        }
    },

    # ---------------------
    # Difficulty B
    # ---------------------
    {
        "quiz_difficulty": "B",
        "quiz_number": 1,
        "problem_title": "Sum Two Numbers",
        "problem_description": "Write a function that returns the sum of two integers.",
        "initial_code": """int add(int a, int b) {
    // Write your code here
    return 0;
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "1 2", "expected_output": "3\n"},
                {"input": "5 5", "expected_output": "10\n"}
            ]
        }
    },
    {
        "quiz_difficulty": "B",
        "quiz_number": 2,
        "problem_title": "Find Max in List",
        "problem_description": "Write a function that returns the largest number in a list of integers.",
        "initial_code": """#include <vector>
using namespace std;

int find_max(vector<int> nums) {
    // Write your code here
    return 0;
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "3\n1 3 5", "expected_output": "5\n"},
                {"input": "4\n10 20 5 7", "expected_output": "20\n"}
            ]
        }
    },
    {
        "quiz_difficulty": "B",
        "quiz_number": 3,
        "problem_title": "Palindrome Check",
        "problem_description": "Write a function that returns true if a string is a palindrome, otherwise false.",
        "initial_code": """#include <string>
using namespace std;

bool is_palindrome(string s) {
    // Write your code here
    return false;
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "racecar", "expected_output": "true\n"},
                {"input": "hello", "expected_output": "false\n"}
            ]
        }
    },

    # ---------------------
    # Difficulty C
    # ---------------------
    {
        "quiz_difficulty": "C",
        "quiz_number": 1,
        "problem_title": "Reverse a String",
        "problem_description": "Write a function that returns the input string in reverse order.",
        "initial_code": """#include <string>
using namespace std;

string reverse_string(string s) {
    // Write your code here
    return "";
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "abc", "expected_output": "cba\n"},
                {"input": "hello", "expected_output": "olleh\n"}
            ]
        }
    },
    {
        "quiz_difficulty": "C",
        "quiz_number": 2,
        "problem_title": "Fibonacci Sequence",
        "problem_description": "Write a function that returns the nth Fibonacci number (0-indexed).",
        "initial_code": """int fibonacci(int n) {
    // Write your code here
    return 0;
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "0", "expected_output": "0\n"},
                {"input": "5", "expected_output": "5\n"},
                {"input": "10", "expected_output": "55\n"}
            ]
        }
    },
    {
        "quiz_difficulty": "C",
        "quiz_number": 3,
        "problem_title": "Binary Search",
        "problem_description": "Write a function that performs binary search on a sorted list and returns the index of the target or -1 if not found.",
        "initial_code": """#include <vector>
using namespace std;

int binary_search(vector<int> arr, int target) {
    // Write your code here
    return -1;
}
""",
        "quiz_data": {
            "language_id": 52,
            "test_cases": [
                {"input": "4\n1 3 5 7\n5", "expected_output": "2\n"},
                {"input": "3\n1 3 5\n4", "expected_output": "-1\n"}
            ]
        }
    }
]
