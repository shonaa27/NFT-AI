import requests
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

API_KEY = os.getenv("STABILITY_API_KEY")

print("🔑 API KEY LOADED:", API_KEY is not None)


def generate_image(prompt):
    url = "https://api.stability.ai/v2beta/stable-image/generate/core"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "image/*"
    }

    payload = {
        "prompt": prompt,
        "output_format": "png"
    }

    response = requests.post(
        url,
        headers=headers,
        files=payload   # ✅ THIS IS THE FIX (NOT data)
    )

    print("🔥 STATUS CODE:", response.status_code)
    print("🔥 RESPONSE TEXT:", response.text)

    if response.status_code != 200:
        raise Exception(response.text)

    return response.content