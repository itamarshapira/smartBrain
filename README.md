Smart Brain 🧠
Smart Brain is a full-stack web application that uses the Clarifai API to detect faces and predict ages in user-submitted images. This project integrates a React frontend with a Node.js backend and MongoDB for data storage.

Table of Contents
Features
Technologies Used
Project Structure
Installation
Usage
API Endpoints
Key Components
Contributing
License
Features
User Authentication: Registration and sign-in functionality using a secure password hashing mechanism.
Face Detection: Upload an image URL to detect faces using Clarifai's machine learning models.
Age Prediction: Predicts the age range of detected faces.
Interactive UI: Responsive and interactive frontend built with React.
Backend Integration: A robust Node.js server with API endpoints to handle user data and interaction with MongoDB.
Data Visualization: Display age predictions in a pie chart using react-chartjs-2.
Technologies Used
Frontend:

React
Chart.js for data visualization
CSS for styling
Backend:

Node.js
Express.js for server routing
MongoDB for database management
bcrypt-nodejs for password hashing
API:

Clarifai API for machine learning-based face detection and age prediction
Project Structure: smartBrain/
│
├── face_recognition/ # Frontend directory (React)
│ ├── src/
│ │ ├── components/
│ │ │ ├── AgePredictions/
│ │ │ │ ├── AgePredictions.js
│ │ │ │ └── AgePredictions.css
│ │ │ ├── FaceRecognition/
│ │ │ │ ├── FaceRecognition.js
│ │ │ │ └── FaceRecognition.css
│ │ │ ├── Footer/
│ │ │ │ ├── Footer.js
│ │ │ │ └── Footer.css
│ │ │ ├── ImageLinkForm/
│ │ │ │ ├── ImageLinkForm.js
│ │ │ │ └── ImageLinkForm.css
│ │ │ ├── Logo/
│ │ │ │ ├── Logo.js
│ │ │ │ └── Logo.css
│ │ │ ├── Navigation/
│ │ │ │ ├── Navigation.js
│ │ │ │ └── Navigation.css
│ │ │ ├── Rank/
│ │ │ │ ├── Rank.js
│ │ │ │ └── Rank.css
│ │ │ ├── Register/
│ │ │ │ ├── Register.js
│ │ │ │ └── Register.css
│ │ │ ├── SignIn/
│ │ │ │ ├── SignIn.js
│ │ │ │ └── SignIn.css
│ │ ├── App.js
│ │ └── App.css
│ ├── public/
│ │ └── index.html
│ └── package.json
│
└── Server/ # Backend directory (Node.js)
├── server.js
└── package.json
new/1
