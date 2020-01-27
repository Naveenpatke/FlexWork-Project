var mongoose = require('mongoose');
var blogModel = require("./blog");

var commentSchema = new mongoose.Schema({
    commenter: String,
    comment: String,
    rating: Number
});

var commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;

//===========================================================================
//creating a initial blog fo the first time to create the collection
// commentModel.create({
//     commemter: "Naveen",
//     comment: "The current blog provide really good knowledge",
//     rating: 4
// }, function(err, newBlog) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("inserted successfully");
//     }

// });
//===========================================================================

//(reference) to add new blog into the particular users collection set(in this only blogs id will be stored in the user database)
// commentModel.create({
//     commenter: "Naveen",
//     comment: "The current blog provide really good knowledge",
//     rating: 4
// }, function(err, commentDetails) {
//     if (err) {
//         console.log("Something went wrong outer");
//     } else {
//         blogModel.findOne({ _id: "5dd3f4404b5dcb08a4170e10" }, function(err, blog) {
//             if (err) {
//                 console.log("Something went wrong inn");
//             } else {
//                 blog.currentBlogComment.push(commentDetails);
//                 blog.save(function(err, blogDetails) {
//                     if (err) {
//                         console.log("Something went wrong1");
//                         //console.log(err);

//                     } else {
//                         console.log(blogDetails);

//                     }
//                 });
//             }
//         });
//     }
// });