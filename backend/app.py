from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from generate_image import generate_image
import uuid
import os

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "AI NFT Backend Running"



@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.json
        prompt = data.get("prompt")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

       
        image_bytes = generate_image(prompt)

        
        os.makedirs("generated", exist_ok=True)

        
        filename = f"{uuid.uuid4()}.png"
        filepath = os.path.join("generated", filename)

        
        with open(filepath, "wb") as f:
            f.write(image_bytes)

        
        return jsonify({
            "message": "Image generated successfully",
            "image_path": f"generated/{filename}",
            "image_url": f"http://127.0.0.1:5000/generated/{filename}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/generated/<filename>")
def get_image(filename):
    return send_from_directory("generated", filename)

if __name__ == "__main__":
    app.run(debug=True)