/* eslint-disable no-unreachable */
/* eslint-disable no-template-curly-in-string */
const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecretToken;

router.post(
  "/loginadmin",
  [
    body("email", "Invalid email address").isEmail(),
    body("password", "Password is too short").isLength({ min: 7 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const email = req.body.email;
      const adminData = await Admin.findOne({ email });

      if (!adminData) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const passwordCompare = await bcrypt.compare(req.body.password, adminData.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const data = {
        user: {
          id: adminData.id
        }
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
