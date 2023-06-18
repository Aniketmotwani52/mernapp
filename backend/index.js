const express = require('express');
const app = express()
const port = 5000;

const connectToMongoDB = require('./db');

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

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
//whenever in index.js this /api get's called i.e. /api + /createuser from (./Routes/CreateUser) 
//then the router function get's exported and is hitted


app.listen(port, () => {
    console.log(`GoFood is listening on port ${port}`);
});

