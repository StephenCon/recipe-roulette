// Import necessary libraries and configurations
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration and initialization
const app = express();
const PORT = 3001; // Note: Do not change the port number
const MONGODB_URI = process.env.MONGODB_URI;

// Apply middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

/**
 * Middleware function to authenticate JWT tokens.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Connect to MongoDB and set up routes
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB Atlas');

    // Setup database and collections
    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection('users');

    /**
     * Endpoint to handle user registration.
     * Expects a JSON body with username and password fields.
     */
    app.post('/register', async (req, res) => {
      const { username, password } = req.body;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ username, password: hashedPassword });
        res.status(201).send('User registered successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed');
      }
    });

    /**
     * Endpoint to handle user login.
     * Expects a JSON body with username and password fields.
     */
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      try {
        const user = await usersCollection.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    /**
     * Protected route requiring JWT authentication.
     */
    app.get('/dashboard', authenticateJWT, (req, res) => {
      res.send('This is a protected route');
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });

  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
