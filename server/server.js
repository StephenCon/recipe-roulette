// Importing necessary libraries and configurations
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
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
    console.log('Token:', token); // Add this line for debugging
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.status(403).json({ error: 'Forbidden', message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized', message: 'Authorization header missing' });
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
// Modify the user registration route to include the "recipes" field
async function handleUserRegistration(req, res) {
  const { email, password } = req.body;
  try {
    const usersCollection = req.db.collection('users');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(409).send('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add an empty array for recipes when a new user is registered
    await usersCollection.insertOne({ email, password: hashedPassword, recipes: [] });

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
  const { recipeName, mealType } = req.body;
  const userId = req.user.userId;

  try {
    const usersCollection = req.db.collection('users');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { recipes: { recipeName, mealType } } }
    );

    if (result.modifiedCount === 1) {
      res.status(201).json({ message: 'Recipe added successfully' });
    } else {
      res.status(404).json({ message: 'User not found or update failed' });
    }
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ message: 'Failed to add recipe' });
  }
}

/**
 * Route handler for getting recipes.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handleGetRecipes(req, res) {
  const userId = req.user.userId; // Extract user ID from the JWT token

  try {
    const usersCollection = req.db.collection('users');

    // Find the user by ID and retrieve their recipes array
    const user = await usersCollection.findOne({ _id: userId });

    if (user) {
      const userRecipes = user.recipes || [];
      res.status(200).json({ recipes: userRecipes });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting recipes:', error);
    res.status(500).json({ message: 'Failed to get recipes' });
  }
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
