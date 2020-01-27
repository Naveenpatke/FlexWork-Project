var mongoose = require('mongoose');
//var blogModel = require("./blog");

var skillsSchema = new mongoose.Schema({
    username: String,
    Technology: String,
    rating: Number
});

var skillsModel = mongoose.model("skill", skillsSchema);
module.exports = skillsModel;