# Paralegal NDA Generator

This project is a full-stack AI-powered Non-Disclosure Agreement (NDA) generator. It allows users to input relevant information through a web form, and automatically generates a legally structured NDA using an AI model such as Claude or OpenAI.

## Features

- AI-generated NDA content using provided party and agreement details
- Dynamic form-based UI for quick and simple data entry
- Export or copy the NDA result
- Secure handling of API keys using environment variables

## Tech Stack

- Frontend: React (Create React App), CSS
- Backend: Flask (Python), Requests, dotenv
- AI Integration: Claude API
- Version Control: Git and GitHub

## Project Structure

LegalChainNdaGenerator/
├── .gitignore
├── README.md
├── NDAGenerator.git/               # Local Git mirror (can be removed from project root)
│
├── nda-backend/                    # Flask backend
│   ├── app.py                      # Main Flask application with API route to generate NDA
│   └── .env                        # Contains API keys (should be gitignored)
│
├── nda-generator/                  # React frontend
│   ├── public/                     # Static files
│   │   ├── favicon.ico
│   │   ├── index.html              # Main HTML file
│   │   ├── logo192.png             # React logo (optional)
│   │   ├── logo512.png             # React logo (optional)
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/                        # React source code
│   │   ├── App.js                  # Main React component
│   │   ├── App.css                 # Styling for App component
│   │   ├── App.test.js             # React testing file
│   │   ├── NDAimage.jpg            # (Optional) Local image asset
│   │   ├── index.js                # Entry point for React
│   │   ├── index.css               # Global styles
│   │   ├── logo.svg                # Default React logo (optional)
│   │   ├── reportWebVitals.js      # Performance reporting
│   │   └── setupTests.js           # Test configuration
│   │
│   ├── package.json                # Frontend dependencies and scripts
│   └── package-lock.json           # Exact dependency versions
