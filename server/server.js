require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: '7b8b965ad4bca0e41ab51de7b31363a21c4d75a60dfa144d16c4266ce60b5f17',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

const uri = 'mongodb+srv://stephen:Mark123%21%22%C2%A3@cluster0.dcxcg2q.mongodb.net/';

MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db('recipe-roulette');
    const usersCollection = db.collection('users');

    app.post('/register', async (req, res) => {
      const { username, password } = req.body;
      // Hash the password before storing (if you add bcrypt)
      // const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await usersCollection.insertOne({ username, password /* hashedPassword if using bcrypt */ });
        res.status(201).send('User registered successfully');
      } catch (error) {
        console.error(error);
        res.status(500).send('Registration failed');
      }
    });

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      try {
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(400).send('User not found');
        }
        // If using bcrypt, compare the hashed password
        // const match = await bcrypt.compare(password, user.password);
        if (user.password !== password /* match if using bcrypt */) {
          return res.status(400).send('Invalid password');
        }
        req.session.userId = user._id;
        res.status(200).send('Logged in successfully');
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
