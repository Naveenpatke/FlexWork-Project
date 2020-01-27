var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
//creating a schema of the user
var userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    age: Number,
    about: String,
    phoneNumber: Number,
    location: String,
    userBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog' //ref is the name of the blogSchema (mongoose.model(name,schemaName))
    }],
    educationDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'education'
    }],
    languageDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'language'
    }],
    skillsDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill'
    }],
    workExperienceDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'work'
    }]
});

userSchema.plugin(passportLocalMongoose);

//establishing a model based on our schema
module.exports = mongoose.model("user", userSchema);

//=================================================
//creating a initial user for the first time to create the collection
// userModel.create({
//     email: "naveenpatke@gmail.com",
//     name: "Naveen Patke"
// }, function(err, newUser) {

//     if (err) {
//         console.log(err);
//     } else {
//         console.log("fine");
//     }
// });
//=================================================