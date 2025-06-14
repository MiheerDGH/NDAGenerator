# Paralegal NDA Generator

Paralegal NDA Generator is a full-stack AI-powered web application that allows users to generate legally formatted Non-Disclosure Agreements (NDAs) based on simple form inputs. Designed for speed and simplicity, it provides two download options (.txt and .pdf), automatically formats long content for PDF output, and includes error handling via modal popups. Ideal for legal assistants, startups, students, and anyone who needs a fast NDA draft.

Built with React and Flask, the frontend collects party names, effective date, description of confidential information, and term length. Once submitted, the form data is sent to the backend where an AI model generates a complete NDA contract. The result is displayed on the page and can be downloaded by the user.

Tech Stack includes:
- Frontend: React, HTML/CSS, jsPDF
- Backend: Python, Flask, OpenAI (or Claude API), CORS
- Features: PDF + TXT download, error modal, loading spinner, clean UI

How to run the project:
1. Clone the repository from GitHub.
2. Make sure you have Node.js and Python installed.
3. Navigate to the `nda-backend/` directory, install dependencies with `pip install flask flask-cors openai`, and run the backend with `python app.py`.
4. Navigate to the `nda-generator/` directory, run `npm install` to install frontend dependencies, and launch the frontend with `npm start`.
5. The React app will be available at `http://localhost:3000`, and it will communicate with the Flask backend at `http://localhost:5000`.

Project structure:
- `nda-generator/`: React frontend with `App.js` for form logic and UI, `App.css` for styling, and standard React files.
- `nda-backend/`: Flask backend with a single `app.py` that handles POST requests to generate NDAs using an AI model.
- `.gitignore`: Standard ignored files including node_modules and environment files.
- `README.md`: Project overview and instructions.
- Both download buttons and UI feedback elements (spinner and modal) are already implemented.

This app includes:
- AI-generated legal NDA text
- Automatic PDF line wrapping and page breaking using jsPDF
- Modal error popups for backend failures
- Loading indicator while the AI generates the contract
- Text and PDF download functionality
- Clean and professional interface

Future improvements may include:
- Deployment to Render (backend) and Vercel (frontend)
- User authentication
- History tracking for previous NDAs
- Support for custom clause selection or template types

This project was built as part of a Legal Chain summer intern assignment. Contributions are welcome, and the project is open-source under the MIT License.


