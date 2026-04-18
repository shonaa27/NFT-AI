print("generate_image.py is running")
import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_URL = "https://api-inference.huggingface.co/models/prompthero/openjourney"

headers = {
    "Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"
}

def generate_image(prompt):
    print("API URL USED:", API_URL)

    response = requests.post(
        API_URL,
        headers=headers,
        json={"inputs": prompt}
    )

    if response.status_code != 200:
        raise Exception(response.text)

    return response.content