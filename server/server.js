const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// MongoDB connection string
const uri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');

    const db = client.db('recipe-roulette');
    const usersCollection = db.collection('users');

    // Define the /register route
    app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      try {
        await usersCollection.insertOne({ username, password });
        res.status(201).send('User registered successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed');
      }
    });

    // Define the /login route
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      try {
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(400).send('User not found');
        }
        if (user.password !== password) {
          return res.status(400).send('Invalid password');
        }
        req.session.userId = user._id; // Store user ID in session
        res.status(200).send('Logged in successfully');
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Define the /logout route
    app.post('/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Could not log out.');
        }
        res.status(200).send('Logged out successfully');
      });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
