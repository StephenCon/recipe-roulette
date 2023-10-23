// Import necessary libraries and configurations
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuration and initialization
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Apply middleware
app.use(cors());
app.use(express.json());

// Middleware function to authenticate JWT tokens
function authenticateJWT(req, res, next) {
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
}

// Route Handlers
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const usersCollection = req.db.collection('users');
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleUserRegistration(req, res) {
  const { email, password } = req.body;
  try {
    const usersCollection = req.db.collection('users');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(409).send('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ email, password: hashedPassword });
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed');
  }
}

async function handleAddRecipe(req, res) {
  const { name, mealType } = req.body;  // Destructure mealType from req.body
  const userId = req.user.userId;
  try {
    const recipesCollection = req.db.collection('recipes');
    const result = await recipesCollection.insertOne({ name, mealType, userId });  // Include mealType
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleGetRecipes(req, res) {
  const userId = req.user.userId;
  try {
    const recipesCollection = req.db.collection('recipes');
    const recipes = await recipesCollection.find({ userId }).toArray();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// MongoDB Connection and Server Startup
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db(process.env.DB_NAME);
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Route Definitions
    app.post('/register', handleUserRegistration);
    app.post('/login', handleUserLogin);  // Add this line for the login endpoint
    app.post('/recipes', authenticateJWT, handleAddRecipe);
    app.get('/recipes', authenticateJWT, handleGetRecipes);
    app.get('/dashboard', authenticateJWT, (req, res) => res.send('This is a protected route'));


    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
