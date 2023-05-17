const mongoose = require("mongoose");
require('dotenv').config();

// const connectToMongo = async () => {
//   await mongoose.connect(process.env.DB);
//   console.log(`MongoDb connected successfully`);
// };

// module.exports = connectToMongo;
// const mongoose = require("mongoose");




module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};