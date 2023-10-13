require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3001;

const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db(process.env.DB_NAME);
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
        res.status(200).redirect('/dashboard');
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
