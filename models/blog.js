var mongoose = require('mongoose');
var userModel = require("./user");

//creating a schema of the collection ,based on out requirements
var blogSchema = new mongoose.Schema({
    bloggerName: String,
    title: String,
    image: String,
    skills: String,
    uploadfile: String,
    body: String,
    budget: Number,
    created: { type: Date, default: Date.now },
    currentBlogComment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

//establishing a model based on our schema
var blogModel = mongoose.model("blog", blogSchema);
module.exports = mongoose.model("blog", blogSchema);

//=================================================
//creating a initial comment fo the first time to create the collection
// blogModel.create({
//     title: "Natures beautiful view",
//     image: "image Url view ",
//     skills: "java",
//     uploadfile: "NaveenOffer",
//     body: "Nature helps us in lot of ways by providing us fresh air n resources",
//     budget: 123,
// }, function(err, newBlog) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("inserted successfully");
//     }

// });
//=================================================

//=================================================
//(extended)inserting the new comment of new user into the database of new user 
// var newUser = new userModel({
//     email: "naveenpatke98@gmail.com",
//     name: "Naveen Patke"
// });

// // newUser.blogs.push({
// //     title: "Nature view",
// //     image: "naveenvbrvrev",
// //     body: "Nature has very beautiful view"
// // });

// newUser.save(function(err, newUserDetails) {
//     if (err) {
//         console.log("Something went wrong will adding new user");
//     } else {
//         console.log(newUserDetails);
//     }
// });
//=======================================================

//=======================================================
//(extended)To fetch the details of the user from the database , and add a new blog created by the user into his account
// userModel.findOne({ name: "Naveen Patke" }, function(err, userDetails) {
//     if (err) {
//         console.log("Something went wrong");
//     } else {
//         //when the userdetails r fetched ,we can add a new blog within that user account
//         userDetails.blogs.push({
//             title: "Nature view sceneary",
//             image: "naveenvbrvrev",
//             body: "Nature has very beautiful viewAn image is a picture or other representation of a person or thing, or it can be someone's public perception, like a rock star who tries to change his image by dressing like a professor and learning to play chess. ... Another kind of image is what we think a public figure like a celebrity is "
//         });

//         userDetails.save(function(err, newUserDetails) {
//             if (err) {
//                 console.log("Something went wrong will adding new user");
//             } else {
//                 console.log(newUserDetails);
//             }
//         });
//     }
// });
//=======================================================

//=======================================================
//(reference) to add new blog into the particular users collection set(in this only blogs id will be stored in the user database)
// blogModel.create({
//     title: "oceans beautiful view1",
//     image: "image Url view ",
//     body: "ocean helps us in lot of ways by providing us fresh air n resources"
// }, function(err, blogDetails) {
//     if (err) {
//         console.log("Something went wrong outer");
//     } else {
//         userModel.findOne({ name: "Naveen Patke" }, function(err, user) {
//             if (err) {
//                 console.log("Something went wrong inn");
//             } else {
//                 user.userBlogs.push(blogDetails);
//                 user.save(function(err, userdetails) {
//                     if (err) {
//                         console.log("Something went wrong1");
//                         //console.log(err);

//                     } else {
//                         console.log(userdetails);

//                     }
//                 });
//             }
//         });
//     }
// });
//=======================================================

//=======================================================
//how to populate the user blogs collection with actual data
// userModel.findOne({ name: 'Naveen Patke' }).populate('userBlogs', 'title').exec(function(err, userData) {
//     if (err) {
//         console.log("Something went wrong in populating the userModel");
//     } else {
//         console.log(userData);
//     }
// });
//=======================================================