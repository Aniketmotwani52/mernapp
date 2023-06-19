const express = require("express");
const router = express.Router();

router.post("/foodData",(req,res)=>{
    try {
        res.send([global.food_items,global.foodCategory]);
        // console.log(global.food_items);
        // console.log(global.foodCategory);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error, Try Again !");
    }
})

module.exports = router;

