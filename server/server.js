require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const app = express();
const port = 3001;

const uri = 'mongodb+srv://stephen:Mark123%21%22%C2%A3@cluster0.dcxcg2q.mongodb.net/';

// Initialize Redis client
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

app.use(cors());
app.use(express.json());

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: '7b8b965ad4bca0e41ab51de7b31363a21c4d75a60dfa144d16c4266ce60b5f17',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db('recipe-roulette');
    const usersCollection = db.collection('users');

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

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      try {
        const user = await usersCollection.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(400).send('Invalid username or password');
        }
        req.session.userId = user._id;
        res.status(200).redirect('/dashboard');
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    app.post('/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Logout failed');
        }
        res.redirect('/login');
      });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });
