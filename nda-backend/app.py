# Import necessary modules
import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Retrieve Claude API key from environment variables
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

# Define the endpoint for generating NDAs
@app.route("/generate-nda", methods=["POST"])
def generate_nda():
    try:
        # Parse incoming JSON data from React form
        data = request.get_json()

        # Create a detailed prompt to send to Claude
        prompt = f"""
Human: Create a legal Non-Disclosure Agreement (NDA) with the following details:

- Party A: {data['partyOne']}
- Party B: {data['partyTwo']}
- Effective Date: {data['effectiveDate']}
- Description of Confidential Info: {data['description']}
- Term Length: {data['termLength']} years

Write it in professional, plain legal English.
Assistant:
"""

        # Set up headers for the Claude API request
        headers = {
            "x-api-key": ANTHROPIC_API_KEY,
            "content-type": "application/json",
            "anthropic-version": "2023-06-01"
        }

        # Define the body of the request to Claude
        body = {
            "model": "claude-3-opus-20240229",
            "max_tokens": 1000,
            "temperature": 0.7,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }

        # Make the POST request to Claude API
        response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=body
        )

        # Parse JSON response
        response_json = response.json()

        # Check if 'content' exists in the response
        if "content" not in response_json:
            print("Claude response error:", response_json)
            raise ValueError("Claude API did not return content.")

        # Extract the generated NDA text
        nda_text = response_json["content"][0]["text"]

        # Return the NDA text to the frontend
        return jsonify({"nda": nda_text})

    except Exception as e:
        # Log the error and return a generic error message
        print("Error:", e)
        return jsonify({"error": "Failed to generate NDA."}), 500

# Only run the server if this file is the entry point
if __name__ == "__main__":
    app.run(debug=True)
