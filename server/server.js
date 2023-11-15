// Importing necessary libraries and configurations
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuring and initializing the application
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Applying middleware
app.use(cors());
app.use(express.json());

/**
 * Middleware function to authenticate JWT tokens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the application’s request-response cycle.
 */
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

/**
 * Route handler for user login.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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

/**
 * Route handler for user registration.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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
    console.error('Error during registration:', error);
    res.status(500).send('Registration failed');
  }
}

/**
 * Route handler for adding a recipe.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleAddRecipe(req, res) {
  
}

/**
 * Route handler for getting recipes.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleGetRecipes(req, res) {
  
}

// Connecting to MongoDB and starting the server
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db(process.env.DB_NAME);
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Defining the routes
    app.post('/register', handleUserRegistration);
    app.post('/login', handleUserLogin);
    app.post('/recipes', authenticateJWT, handleAddRecipe);
    app.get('/recipes', authenticateJWT, handleGetRecipes);
    app.get('/dashboard', authenticateJWT, (req, res) => res.send('This is a protected route'));

    // Starting the Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
