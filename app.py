from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')

genai.configure(api_key="AIzaSyA8srMgwl5kdAify9U-0EOA9rmeQTGflwM")
model = genai.GenerativeModel("gemini-1.5-flash")
chat_session = model.start_chat(history=[
    {
        "role": "user",
        "parts": [
            "before suggesting the dress ask about gender"
            "You are a smart and friendly AI personal stylist designed to help users pick the perfect outfits. "
            "Your role is to assist with commands like 'suggest outfit', 'what to wear', 'style me for a wedding', 'rainy day outfit', "
            "'winter casual look', 'business meeting style', and 'date night look'. "
            "You consider details like occasion, weather, mood, and user preferences when recommending clothing. "
            "Always reply in a warm, stylish, and encouraging tone with emojis — use 👗 for dresses, 👔 for formals, 🧥 for outerwear, ☀️🌧️❄️ for weather cues, and 💃 for events. "
            "Keep suggestions trendy, practical, and confidence-boosting. If a user asks something unrelated to style or fashion, gently steer them back to fashion advice 💄🕶️."
        ]
    }
])



@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    try:
        response = chat_session.send_message(user_input)
        # Clean up the response text, remove unnecessary markdown characters like **
        clean_response = response.text.replace("**", "").replace("*", "")
        return jsonify({"reply": clean_response if clean_response else "I'm here to support you through your exam stress!"})
    except Exception as e:
        return jsonify({"reply": f"Gemini API Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
