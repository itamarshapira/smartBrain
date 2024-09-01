# Smart Brain 🧠

Smart Brain is a full-stack web application that uses the Clarifai API to detect faces and predict ages in user-submitted images. This project integrates a React frontend with a Node.js backend and MongoDB for data storage.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Key Components](#key-components)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- **User Authentication:** Registration and sign-in functionality using a secure password hashing mechanism.
- **Face Detection:** Upload an image URL to detect faces using Clarifai's machine learning models.
- **Age Prediction:** Predicts the age range of detected faces.
- **Interactive UI:** Responsive and interactive frontend built with React.
- **Backend Integration:** A robust Node.js server with API endpoints to handle user data and interaction with MongoDB.
- **Data Visualization:** Display age predictions in a pie chart using `react-chartjs-2`.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Chart.js**: For data visualization.
- **CSS**: For styling.

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for database management.
- **bcrypt-nodejs**: For password hashing.

### API

- **Clarifai API**: For machine learning-based face detection and age prediction.

## Project Structure
