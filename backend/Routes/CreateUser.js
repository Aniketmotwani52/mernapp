/* eslint-disable no-unreachable */
/* eslint-disable no-template-curly-in-string */
const express = require("express");
const router = express.Router();
require('dotenv').config();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecretToken;

const nodemailer = require('nodemailer');
const mailchimp = require('mailchimp-api-v3');


const userEmail = process.env.senderEmailAddress;
const emailPassword = process.env.senderPassword;
const mailchimpAPIKey = process.env.mailChimpAPIKey;

const mailchimpAPI = new mailchimp(mailchimpAPIKey);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendOTP = async (email, otp) => {
  //console.log(otp);
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: emailPassword
      }
    });
  
    const mailOptions = {
      from: 'aniketmotwani52@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`
    };
    
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send OTP');
  }
};

const otpStore = {}; // Initialize otpStore to store OTPs temporarily


router.post(
  "/verifyOTP",
  [
    body("email", "Invalid email address").isEmail(),
    body("otp", "Invalid OTP").isLength({ min: 6, max: 6 }).isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Email address already exists" });
      }

      // Check if OTP matches
      if (otp == otpStore[email]) {
        delete otpStore[email];
        return res.json({ success: true });
      }
      else
      {
        // console.log("Here is the error in this code");
        // console.log(otp);
        // console.log(otpStore);
        // console.log(otpStore[email]);
        return res.status(400).json({ error: "Invalid OTP" });
      }

      // Remove OTP from store after verification
      

      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: "Failed to verify OTP" });
    }
  }
);


router.post(
  "/createUser",
  //These are the validators as they will check if the data entered by the user has the correct syntax or not  
  [
    body("name", "Name is too short").isLength({ min: 3 }),
    body("email", "Invalid email address").isEmail(),
    body("password", "Password is too short").isLength({ min: 7 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //convert the errors to an array and then display
    }

    const { email } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Generate and store OTP
      const otp = generateOTP();
      otpStore[email] = otp;
      console.log("generated otp");
      console.log(otp);

      // Send OTP to the user's email
      await sendOTP(email, otp);

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);


//Creating the user in database
router.post(
  "/creatingUser",
  //These are the validators as the will check that the data which user has entered is correct in syntax or not  
  [
    body("name", "Name is too short").isLength({ min: 3 }),
    body("email", "invalid email address").isEmail(),
    body("password", "Password is too short").isLength({ min: 7 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //convert the errors to array and then display
    }

    const { email } = req.body;


    
    try {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password,salt); //from frontend we are taking any string which is written and named as password and hashing it with salt  

      await User.create({
        //await is must as until n unless the user is not created in backend with the help of mongoose we will wait and will not deliver any further message
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Invalid email address").isEmail(),
    body("password", "Password is too short").isLength({ min: 7 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //convert the errors to an array and then display
    }

    try {
      const email = req.body.email;
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const data = {
        user: {
          id: userData.id
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
