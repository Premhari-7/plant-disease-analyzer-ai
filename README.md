# 🌿 Plant Disease Analyzer (AI + ML)

## 📌 Overview
Plant Disease Analyzer is a web-based AI application that detects plant leaf diseases using a trained deep learning model built with TensorFlow and Keras.

This system allows users to upload a leaf image and receive a disease prediction instantly.

---

## 🎯 Features
-  Upload plant leaf images
-  AI-based disease prediction
-  Clean and responsive frontend
-  Node.js backend integration
-  Flask-based ML prediction API
-  Real-time classification

---

## 🧠 Model Details

The deep learning model was trained using a **subset** of the PlantVillage dataset.

### Classes Supported:
- Healthy
- Potato Early Blight
- Tomato Late Blight
- Tomato Leaf Mold

> Note: This project is trained only on selected classes, not the full dataset.

---

## 📂 Project Structure
plant-disease-analyzer-ai/
│
├── backend/
│ ├── server.js
│ ├── app.py
│ └── requirements.txt
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── dataset/ (Not included in repository)
└── README.md

---

## 📊 Dataset Information

The model was trained using the PlantVillage dataset.

Due to GitHub size limitations, the dataset is not included in this repository.

You can download it from:
https://www.kaggle.com/datasets/emmarex/plantdisease

After downloading, place the dataset inside:

dataset/
├── train/
└── test/

---

## ⚙ Installation Guide

### 1️⃣ Clone Repository


git clone https://github.com/Premhari-7/plant-disease-analyzer-ai.git

cd plant-disease-analyzer-ai


---

## 🖥 Backend Setup (Node.js)

Open Terminal 1:


cd backend
npm install
node server.js


---

## 🧠 AI Model Server (Python Flask)

Open Terminal 2:


cd backend
pip install -r requirements.txt
python app.py


---

## 📦 Required Python Packages

Create a file named `requirements.txt` inside backend folder:


tensorflow
keras
numpy
pandas
flask
flask-cors
pillow
scikit-learn
opencv-python


Install using:


pip install -r requirements.txt


---

## 🚀 How It Works

1. User uploads an image from frontend.
2. Image is sent to Node.js backend.
3. Backend forwards image to Flask ML server.
4. TensorFlow model processes the image.
5. Predicted disease result is returned to frontend.


---

## 🤖 Smart AI Chatbot (Powered by Groq API)

One of the key highlights of this project is the integrated AI chatbot powered by the Groq API.

### 🌟 Key Features:

- 🌿 Answers plant-related questions
- 🦠 Provides disease prevention tips
- 💡 Suggests remedies and care instructions
- 🌍 Supports multiple languages
- 💬 General AI conversational ability
- ⚡ Real-time response generation

The chatbot enhances user experience by providing intelligent agricultural guidance alongside disease prediction.

> 🔐 The API key is securely stored using environment variables (.env) and is not included in this repository.

---

## 🛠 Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Python
- Flask
- TensorFlow / Keras
- NumPy
- Pandas
- OpenCV

---

## 📄 License

This project is licensed under the MIT License.

---


## 📸 Screenshots

### 🏠 Home Page
![Home Page](assets/Home.png)

### 🔍 Chatbot Page
![Chatbot Result](assets/Chatbot.png)


## 👨‍💻 Author

**Prem Hari S**  
GitHub: https://github.com/Premhari-7

