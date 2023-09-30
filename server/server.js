const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://stephen:Mark123%21%22%C2%A3@cluster0.dcxcg2q.mongodb.net/"

// Replace with your connection string from MongoDB Atlas
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    return;
  }
  console.log("Connected to MongoDB");
  const collection = client.db("recipe-roulette").collection("users");
  // Perform database operations here...
  client.close();
});
