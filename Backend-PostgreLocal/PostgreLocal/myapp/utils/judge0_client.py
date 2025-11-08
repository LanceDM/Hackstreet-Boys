import requests
import os

JUDGE0_API = os.getenv("JUDGE0_API_URL", "http://localhost:2358")

def submit_code(source_code, language_id, stdin=""):
    """
    Submits code to Judge0 for execution and returns a token.
    """
    if not source_code or not language_id:
        raise ValueError("source_code and language_id are required")

    payload = {
        "source_code": str(source_code),
        "language_id": int(language_id),
        "stdin": str(stdin),
        "redirect_stderr_to_stdout": True,
    }

    print(f"🚀 Submitting to Judge0: {JUDGE0_API}/submissions")
    print(f"Payload: {payload}")

    response = requests.post(
        f"{JUDGE0_API}/submissions?base64_encoded=false&wait=false",
        json=payload,
        headers={"Content-Type": "application/json"},
        timeout=10,
    )

    # Judge0 422 → invalid or incomplete payload
    if response.status_code == 422:
        print("⚠️ Judge0 422 Error — payload rejected.")
        print("Response:", response.text)

    response.raise_for_status()

    data = response.json()
    print("✅ Judge0 response:", data)
    return data.get("token")


def get_submission_result(token):
    """
    Retrieves the result of a submission from Judge0.
    """
    if not token:
        raise ValueError("Submission token is required")

    print(f"📥 Fetching result for token: {token}")

    response = requests.get(
        f"{JUDGE0_API}/submissions/{token}?base64_encoded=false",
        headers={"Content-Type": "application/json"},
        timeout=10,
    )

    response.raise_for_status()
    data = response.json()
    print("📄 Judge0 result:", data)
    return data
