const { default: mongoose } = require("mongoose");

const databaseName = "GoFood";
const encodedDatabaseName = encodeURIComponent(databaseName);
const uri = `mongodb+srv://aniketmotwani52:Aniket12345@cluster0.chs6gob.mongodb.net/${encodedDatabaseName}?retryWrites=true&w=majority`;

async function connectToMongoDB() {

  //as we are implementing the function in try-catch block if at any stage any error occurs then it is directed to catch block displaying the error
    try {
    //Here the time limit is increased to 60sec
    await mongoose.connect(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // Increase the timeout to 60 seconds
    }); 

    console.log("Connected to MongoDB successfully!");

    const fetched_data = mongoose.connection.db.collection("food_items"); //don't put await here as we don't want to wait to connect instead connect should be asap
    const items_data = await fetched_data.find({}).toArray();
    // but wait until the find function finds the data from collection
    // as the {} are empty which denotes the whole data which we find in fetched data we want to add it in our data
    global.food_items = items_data;

    //Fetching Food Categories
    const fetched_data2 = mongoose.connection.db.collection("food_Collections");
    const category_data = await fetched_data2.find({}).toArray();
    global.foodCategory = category_data;
    

    return mongoose.connection;
  } 
  
  
  catch (error) {
    console.log("An error occurred while connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
