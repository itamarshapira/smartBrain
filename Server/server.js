const express = require('express');
const mongojs = require('mongojs');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  credentials: true, // Allow credentials to be sent along with the request
}));

const db = mongojs('mongodb://localhost:27017/'); // Specify the collection name
const megicBrainColl = db.collection('megic-brain'); 

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.post('/register', (req, res) => {
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
      detectionCounter: 0
    };

    megicBrainColl.insert(newUser, (err, doc) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

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
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare provided password with stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (isMatch) {
        return res.status(200).json({
          message: 'Sign-in successful',
          name: user.name,
          email: user.email,
          detectionCounter: user.detectionCounter
        });
      } else {
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
      { email: email },
      { $inc: { detectionCounter: 1 } },
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update detection counter' });
        }

        res.status(200).json({
          message: 'Detection counter incremented',
          userCount: user.detectionCounter + 1,
          userName: user.name
        });
      }
    );
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
