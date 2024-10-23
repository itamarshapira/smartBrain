//* section 29 - code review in the midlle start he explain how to handle the server in more efficient way 


const express = require('express');
const mongojs = require('mongojs');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON body


// Use CORS Middleware with the specific origin of your frontend
app.use(cors({
  origin: 'https://smartbrain-frontend1.onrender.com', // Allow only your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// OR **Use CORS Middleware without any options to allow all origins**
// app.use(cors()); // Uncomment this line to allow all origins (for testing only)

const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024'); // Specify the collection name
const megicBrainColl = db.collection('megic-brain'); 

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.post('/register', (req, res,next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password' });
  }

  // Hash password
  bcrypt.hash(password, null, null, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    const newUser = {
      name: name,
      email: email,
      password: hash, // Store hashed password
      joined: new Date(),
      detectionCounter:0
    };

    megicBrainColl.insert(newUser, (err, doc) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// signIn:
app.post('/signIn', (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }
  
    // Find user by email
    megicBrainColl.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve user' });
      }
  
      if (!user) {
        return res.status(400).json({ error: 'User not found (there no such email' });
      }
  
      // Compare provided password with stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Error comparing passwords' });
        }
  
        if (isMatch) {
            // Passwords match, user can sign in
            return res.status(200).json({
                message: 'Sign-in successful',
                name: user.name,  // Adjusted key to match client-side expectation
                email: user.email,
                detectionCounter: user.detectionCounter  // Adjusted key to match client-side expectation
            });
        } else {
            // Passwords do not match
            return res.status(400).json({ error: 'Invalid email or password' });
        }
      });
    });
  });

  app.put('/detectionCounter', (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    // Find the user by email and increment the detection counter
    megicBrainColl.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Increment the detection counter
      megicBrainColl.update(
        { email: email },  // The query to find the user by email
        { $inc: { detectionCounter: 1 } }, // Increment the detectionCounter field by 1
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to update detection counter' });
          }
  
          res.status(200).json({
            message: 'Detection counter incremented',
            userCount: user.detectionCounter + 1, // Incremented count for response
            userName: user.name
          });
        }
      );
    });
  });

  const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests

// Route to handle Clarifai API requests
app.post('/clarifai', async (req, res) => {
  const { imageUrl, modelId } = req.body; // Get image URL and model ID from the request body

  const PAT = '902245b41f1044c28891cf32ef45fdb2'; // Clarifai PAT
  const USER_ID = 'k456q92mn98y';
  const APP_ID = 'imgRec';

  // Prepare the request body for Clarifai API
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageUrl // Use the image URL sent from the frontend
          }
        }
      }
    ]
  });

  // Set up request options
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT,
      'Content-Type': 'application/json'
    },
    body: raw
  };

  // Make the request to the Clarifai API
  try {
    const clarifaiResponse = await fetch(`https://api.clarifai.com/v2/models/${modelId}/outputs`, requestOptions);
    const data = await clarifaiResponse.json();

    // Send the Clarifai response back to the frontend
    res.status(200).json(data);
  } catch (error) {
    console.error('Error calling Clarifai API:', error);
    res.status(500).json({ error: 'Failed to process image with Clarifai API' });
  }
});

  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
