var mongoose = require('mongoose');
//var blogModel = require("./blog");

var educationSchema = new mongoose.Schema({
    username: String,
    universityName: String,
    Date: String,
    degree: String
});

var educationModel = mongoose.model("education", educationSchema);
module.exports = educationModel;