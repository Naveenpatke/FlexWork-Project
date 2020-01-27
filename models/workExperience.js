var mongoose = require('mongoose');
//var blogModel = require("./blog");

var workExperienceSchema = new mongoose.Schema({
    username: String,
    role: String,
    date: String,
    description: String
});

var workExperienceModel = mongoose.model("work", workExperienceSchema);
module.exports = workExperienceModel;