const express = require("express");
const router = express.Router();

router.post("/userData", (req, res) => {
  try {
    //console.log(global.usersData);
    const emails = global.usersData.map((user) => user.email);
    res.json(emails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error, Try Again!");
  }
});

module.exports = router;
