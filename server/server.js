// Import necessary libraries and configurations
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration and initialization
const app = express();
const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Apply middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Middleware function to authenticate JWT tokens
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
    const recipesCollection = db.collection('recipes');  // New recipes collection

    /**
     * Endpoint to handle user registration.
     * Expects a JSON body with email and password fields.
     */
    app.post('/register', async (req, res) => {
      const { email, password } = req.body;

      try {
        // Check if email already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(409).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ email, password: hashedPassword });
        res.status(201).send('User registered successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed');
      }
    });
    
    /**
     * Endpoint to add a new recipe.
     * Expects a JSON body with recipe data.
     */
    app.post('/recipes', authenticateJWT, async (req, res) => {
      const { name, ingredients, instructions } = req.body;
      const userId = req.user.userId;  // Get user ID from JWT

      try {
        const result = await recipesCollection.insertOne({ name, ingredients, instructions, userId });
        res.status(201).json(result.ops[0]);  // Return the newly added recipe
      } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    /**
     * Endpoint to retrieve all recipes for the authenticated user.
     */
    app.get('/recipes', authenticateJWT, async (req, res) => {
      const userId = req.user.userId;  // Get user ID from JWT

      try {
        const recipes = await recipesCollection.find({ userId }).toArray();
        res.status(200).json(recipes);
      } catch (error) {
        console.error('Error retrieving recipes:', error);
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
