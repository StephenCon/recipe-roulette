const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const uri = "mongodb+srv://stephen:Mark123%21%22%C2%A3@cluster0.dcxcg2q.mongodb.net/";

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

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
