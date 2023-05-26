const express = require("express");
// const express = require("express");
require('dotenv').config();
const app = express();
const port = 5000;
const connectToMongo = require("./db");
connectToMongo();

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/senddata"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Some error occured`);
    return;
  }
  console.log(`Server is running on port 5000`);
});
