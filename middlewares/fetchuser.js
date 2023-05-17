const jwt = require("jsonwebtoken");
const fetchuser = async (req, res, next) => {
  const authToken = await req.header("auth-token");
  if (!authToken) {
    return res.status(401).send("invalid request");
  }
  try {
    let data = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = fetchuser;
