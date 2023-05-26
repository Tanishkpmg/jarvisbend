const express = require("express");
const router = express.Router();
const convertToJson = require("./convertToJson");
// const path = 
router.get("/sendData", (req, res) => {
    let data = convertToJson();
    res.send(data);
})


module.exports = router;



