const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


router.post("/createUser", [
    body('name','Name is too short').isLength({min:3}),
    body('email','invalid email address').isEmail(),
    body('password','Password is too short').isLength({min:7})
] ,async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); //convert the errors to array and then display
    }

    try {
        await User.create({ //await is must as until n unless the user is not created in backend with the help of mongoose we will wait and will not deliver any further message
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            location : req.body.location
        })

        res.json({success:true});

    } catch (error) {
        console.log(error);
        res.json({success:false});
    }

})

module.exports = router;