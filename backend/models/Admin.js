const mongoose = require('mongoose');

const {Schema} = mongoose;

const AdminSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin',AdminSchema)



