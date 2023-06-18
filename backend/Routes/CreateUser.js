const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "*hey@How$are#You!Aniket_Motwani*";

router.post(
  "/createUser",
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

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password); //from frontend we are taking any string which is written and named as password and hashing it with salt  

    try {
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
    body("email", "invalid email address").isEmail(),
    body("password", "Password is too short").isLength({ min: 7 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //convert the errors to array and then display
    }

    //whenevr the loginuser route is executed we have ti check the data
    //in try block we will be validating the data
    //as when the api is called in that req.body we will be having email and pass so we have to validate that
    try {
      //Here this will find that the provided email exist or not in our schema(user) created by us
      let email = req.body.email;
      let userData = await User.findOne({ email: email });

      //if the useremail is empty i.e. the findOne function doesn't finds the email id
      if (!userData) {
        return res.status(400).json({ error: "Enter Valid email id !" });
      }

      const passwordCompare = bcrypt.compare(req.body.password,userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter Valid Password !" });
      }

      
      const data = {
        user:{
            id: userData.id
        }
      }
      //Header is automatically generated 
      //Payload is the data string i.e. the userid which we have fetched from the backend
      //secret is the jwtSecret which we have generated in our backend which is not visible to user
      const authToken =  jwt.sign(data,jwtSecret);
      //the generated authToken will be having header.payload.secret

      return res.json({ success: true,authToken:authToken });

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
