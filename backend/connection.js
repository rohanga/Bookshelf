
const mongoose = require('mongoose');

const databaseName = 'bookshelf';
const uri = "mongodb+srv://rohangaikwad156:Rohan%401234@cluster0.oucc9r6.mongodb.net/" + databaseName + "?retryWrites=true&w=majority";

async function dbConnect() {
  try {
    console.log("Connecting to MongoDB...");

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error; // Handle connection errors
  }
}

// Export the connection function
module.exports = dbConnect;
