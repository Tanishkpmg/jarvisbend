const mongoose = require("mongoose");
const connectToMongo = async () => {
  // console.log(process.env.URI);
  await mongoose.connect("mongodb://localhost:27017/jarvis");
  console.log(`MongoDb connected successfully`);
};

module.exports = connectToMongo;
