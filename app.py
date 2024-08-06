from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import groq

# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask app
app = Flask(__name__, static_folder='static')

# Initialize the Groq client with your API key
groq_client = groq.Client(api_key=os.getenv("GROQ_API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

# Initialize the Groq client with your API key

@app.route("/generate_text", methods=["POST"])
def generate_text():
    # Get the input prompt from the request body
    prompt = request.json["prompt"]

    # Use Groq to generate text
    response = groq_client.generate_text(prompt, model="llama3-70b")

    # Return the generated text as a JSON response
    return jsonify({"text": response.text})

# Application entry point for the WSGI server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8881, debug=False)
