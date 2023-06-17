const express = require('express');
const app = express()
const port = 5000;

const connectToMongoDB = require('./db');

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    console.log("MongoDB is Working !"); // Log "yesssss" when MongoDB connection is successful
  })
  .catch((error) => {
    console.log("An error occurred while connecting to MongoDB:", error);
  });  

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));


app.listen(port, () => {
    console.log(`GoFood is listening on port ${port}`);
});

