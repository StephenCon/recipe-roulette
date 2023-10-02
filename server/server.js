const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Your MongoDB Atlas connection string
const uri = "mongodb+srv://stephen:Mark123%21%22%C2%A3@cluster0.dcxcg2q.mongodb.net/";

MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db('recipe-roulette');
    const usersCollection = db.collection('users');

    // POST route for user registration
    app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      try {
        const user = await usersCollection.findOne({ username });
        if (user) {
          return res.status(400).send('Username already exists');
        }
        await usersCollection.insertOne({ username, password });
        res.status(201).send('User registered successfully');
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
