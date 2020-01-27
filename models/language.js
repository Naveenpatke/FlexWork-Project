var mongoose = require('mongoose');
var userModel = require("./user");

var languageSchema = new mongoose.Schema({
    username: String,
    knownRegionalLanguage: String,
    rating: Number
});

var languageModel = mongoose.model("language", languageSchema);
module.exports = languageModel;

//================================================
// languageModel.create({
//     username: "naveen",
//     knownRegionalLanguage: "english",
//     rating: 75
// }, function(err, languageDetails) {
//     if (err) {
//         console.log("Something went wrong outer");
//     } else {
//         userModel.findOne({ username: "naveen" }, function(err, user) {
//             if (err) {
//                 console.log("Something went wrong inn");
//             } else {
//                 user.languageDetails.push(languageDetails);
//                 user.save(function(err, user) {
//                     if (err) {
//                         console.log("Something went wrong1");
//                         //console.log(err);

//                     } else {
//                         console.log(user);

//                     }
//                 });
//             }
//         });
//     }
// });