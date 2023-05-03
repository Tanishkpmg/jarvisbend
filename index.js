const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Some error occured`);
    return;
  }
  console.log(`Server is running on port 5000`);
});
