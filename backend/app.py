from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json
from PIL import Image
import io
import requests   # connect to Node AI server

app = Flask(__name__)
CORS(app)

# ---------------- LOAD IMAGE MODEL ----------------
model = tf.keras.models.load_model("model.h5")

class_names = [
    "Healthy",
    "Potato_Early_Blight",
    "Tomato_Late_Blight",
    "Tomato_Leaf_Mold"
]

cure_data = {
    "Healthy": "No treatment required. Plant is healthy 🌱",
    "Potato_Early_Blight": "Remove infected leaves. Use fungicide.",
    "Tomato_Late_Blight": "Apply copper fungicide. Remove affected plants.",
    "Tomato_Leaf_Mold": "Reduce humidity. Improve air circulation."
}

# ---------------- DISEASE REPORT STORAGE ----------------
disease_count = {
    "Healthy": 0,
    "Potato_Early_Blight": 0,
    "Tomato_Late_Blight": 0,
    "Tomato_Leaf_Mold": 0
}

# ---------------- LOAD CHATBOT DATA ----------------
with open("chatbot_data.json", "r", encoding="utf-8") as f:
    chatbot_data = json.load(f)

# ---------------- HOME ----------------
@app.route("/")
def home():
    return "Backend running ✅"

# ---------------- IMAGE ANALYSIS (UNCHANGED) ----------------
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)
    index = np.argmax(prediction)

    disease = class_names[index]
    confidence = round(float(np.max(prediction)) * 100, 2)

    disease_count[disease] += 1

    return jsonify({
        "disease": disease,
        "confidence": confidence,
        "cure": cure_data[disease]
    })

# ---------------- REPORT API ----------------
@app.route("/report", methods=["GET"])
def report():
    return jsonify(disease_count)

# ============================================================
# 🤖 CHATBOT → CONNECTS TO NODE AI SERVER (GROQ)
# ============================================================
@app.route("/chatbot", methods=["POST"])
def chatbot():
    user_msg = request.json.get("message", "").lower().strip()

    # 1️⃣ First check local dataset
    for disease in chatbot_data:
        if disease.lower() in user_msg:
            return jsonify({
                "reply": (
                    f"Disease: {disease}\n"
                    f"Info: {chatbot_data[disease]['info']}\n"
                    f"Symptoms: {chatbot_data[disease]['symptoms']}\n"
                    f"Cure: {chatbot_data[disease]['cure']}"
                )
            })

    # 2️⃣ Otherwise → Ask Node AI server (Groq)
    try:
        response = requests.post(
            "http://127.0.0.1:5001/chatbot-ai",
            json={"message": user_msg},
            timeout=60
        )

        ai_reply = response.json()["reply"]
        return jsonify({"reply": ai_reply})

    except Exception as e:
        print("AI Server Error:", e)
        return jsonify({
            "reply": "AI server not running. Start Node server."
        })

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)
