# =============================
# Default / Initial Data Seeds
# =============================

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
