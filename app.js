var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');
var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var blogModel = require("./models/blog"); //importing blogSchema module from the blog.js file
var user = require("./models/user"); //importing userSchema module from the user.js file
var comment = require("./models/comment");
var education = require("./models/Education");
var language = require("./models/language");
var skills = require("./models/skills");
var workExperience = require("./models/workExperience");

var flash = require('connect-flash');
var formidable = require('formidable');
var fs = require('fs');
var http = require('http');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

//email packages import
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

var connectFlash = require('connect-flash');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/finalProject"); //Connection code

app.use(bodyParser.urlencoded({ extended: true })); //including the bodyparser for parsing of data from the forms 
app.use(express.static('public')); //to include the public folder into this file
app.use(methodOverride("_method")); //To trick html to use post request as put request
app.use(expressSanitizer()); //It helps to write the html code within the description of the blog
app.use(flash());

app.set("view engine", "ejs"); //to set the view engine to default the file type as ejs


//passport configuration
app.use(require('express-session')({
    secret: " My Name is Naveen",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//email config
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'naveenpatke.gmail.com',
//     secure:'true',
//     port: '4020',
//     auth: {
//     type: 'OAuth2', //Authentication type
//     user: ‘your_email@service.com’, //For example, xyz@gmail.com
//     clientId: ‘Your_ClientID’,
//     clientSecret: ‘Client_Secret’,
//     refreshToken: ‘Refresh_Token’
//          }
//     });


//-----------------------------------------------------------------
//RESTFULL ROUTES

//Home page
app.get("/", function(req, res) {
    res.render("homePage");
})

//Home Page route
app.get("/blogs", isLoggedIn, function(req, res) {
    blogModel.find({}, function(err, blogDetails) {
        console.log(req.user);
        if (err) {
            console.log("Something went wrong loading home page!!!");
        } else {
            res.render("index", { blogs: blogDetails });
        }
    });

});

//New Post form route
app.get("/blogs/new", isLoggedIn, function(req, res) {
    res.render("newPost");
});

//Create Post route
app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body); //To sanitize the given input n save the data into the database
    //blogObject = { title: req.body.title, image: req.body.image, body: req.body.body, uploadfile: req.body.uploadfile };
    req.body.blog.bloggerName = req.user.username;
    blogModel.create(req.body.blog, function(err, blog) {
        if (err) {
            console.log("Something went wrong in create page!!!");
        } else {
            console.log("Data saved into the database");
            user.findOne({ username: req.user.username }, function(err, user) {
                if (err) {
                    console.log("something went wrong inside add blog");
                } else {
                    user.userBlogs.push(blog);
                    user.save(function(err, userDetails) {
                        if (err) {
                            req.flash("error", "Something went wrong while adding the blog.")
                            console.log("something went wrong in userDetails");
                        } else {
                            req.flash("success", "Succesfull");
                            //console.log(userDetails);
                        }
                    })
                }
            })
        }
    });
    res.redirect("/blogs");
});

//Show route
app.get("/show/:id", isLoggedIn, function(req, res) {
    blogModel.findById(req.params.id).populate('currentBlogComment').exec(function(err, blogDetails) {
        if (err) {
            console.log(err);
            console.log("Something went wrong in show route!!!");
        } else {
            res.render("showGivenBlogDetails", { blog: blogDetails });
        }
    });
});

//route for currentUsersCompleteBlogDescription route
app.get("/showcurrentuserblog/:id", isLoggedIn, function(req, res) {
    blogModel.findById(req.params.id).populate('currentBlogComment').exec(function(err, blogDetails) {
        if (err) {
            // console.log(err);
            console.log("Something went wrong in show route!!!");
        } else {
            // console.log("Data fetched successfully");
            res.render("currentUserBlogDetails", { blog: blogDetails });
        }
    });

});

//Edit route
app.get("/show/:id/edit", isLoggedIn, function(req, res) {
    blogModel.findById(req.params.id, function(err, blogDetails) {
        if (err) {
            console.log("Something went wrong in edit route!!!");
        } else {
            res.render("editBlogDetails", { blog: blogDetails });
        }
    });
});

//Update route
app.put("/update/:id", function(req, res) {
    blogModel.findByIdAndUpdate(req.params.id, req.body.blogs, function(err, updatedBlog) {
        if (err) {
            console.log("Something went wrong in update route!!!");
        } else {
            res.redirect("/showcurrentuserblog/" + req.params.id);
            //console.log(updatedBlog);
        }
    });

});

//DELETE BLOG route
app.delete("/delete/:id", function(req, res) {
    blogModel.findByIdAndDelete(req.params.id, function(err, deletedBlog) {
        if (err) {
            console.log("Something went wrong in delete route!!!");
        } else {
            res.redirect("/blogs");
        }
    });

});

//route for currentUsers Blogs Index
app.get("/user/:id", isLoggedIn, function(req, res) {
    var currentUserId = req.params.id;

    var currentUserBlogDetails = "";
    user.findOne({ username: req.user.username }).populate('userBlogs').populate('languageDetails').exec(function(err, userData) {
        if (err) {
            console.log("Something went wrong in populating the userModel");
        } else {
            console.log(userData);
            res.render("currentUserBlogIndex", { blogs: userData.userBlogs });
            //console.log(userData.userBlogs);

        }
    });
    // res.render("userBlogDetails", { blogs: currentUserBlogDetails });
});

//route to show user detailed profile
app.get("/showuser/:name", isLoggedIn, function(req, res) {
    console.log(req.params.name);
    user.findOne({ username: req.params.name.toLowerCase() }).populate('userBlogs').exec(function(err, userData) {
        if (err) {
            console.log("Something went wrong in populating the userModel");
        } else {
            //console.log(userData);
            res.render("currentUserProfileDetails", { user: userData });
            console.log(userData);

        }
    });
});


app.get("/addProfileDetails/:id", isLoggedIn, function(req, res) {

    res.render("profileDetailsForm");

});

app.post("/addProfileDetails/:id", isLoggedIn, function(req, res) {

    res.redirect("/addProfileDetails/" + req.params.id);

});

//post route for HomePage Blogs  individualBlogComment Details page
app.post("/blogsComment/:id", isLoggedIn, function(req, res) {
    //res.redirect("")
    var blogId = req.params.id;
    var commenterName = req.user.username.toUpperCase();
    var currentBlogComment = req.body.comment;
    var rating = req.body.rating;
    commentObject = { commenter: commenterName, comment: currentBlogComment, rating: rating };
    comment.create(commentObject, function(err, comment) {
        if (err) {
            console.log("Something went wrong in create page!!!");
        } else {
            console.log("Data saved into the database");
            blogModel.findOne({ _id: blogId }, function(err, blog) {
                if (err) {
                    console.log("something went wrong inside add blog");
                } else {
                    blog.currentBlogComment.push(comment);
                    blog.save(function(err, blogDetails) {
                        if (err) {
                            console.log("something went wrong in userDetails");
                        } else {
                            //console.log(blogDetails);
                        }
                    })
                }
            })
        }
    });

    res.redirect("/show/" + blogId);
});

//post route for currentUsers blogAndComments
app.post("/currentUserBlogsComment/:id", isLoggedIn, function(req, res) {
    //res.redirect("")
    var blogId = req.params.id;
    var commenterName = req.user.username.toUpperCase();
    var currentBlogComment = req.body.comment;
    var rating = req.body.rating;
    commentObject = { commenter: commenterName, comment: currentBlogComment, rating: rating };
    comment.create(commentObject, function(err, comment) {
        if (err) {
            console.log("Something went wrong in create page!!!");
        } else {
            console.log("Data saved into the database");
            blogModel.findOne({ _id: blogId }, function(err, blog) {
                if (err) {
                    console.log("something went wrong inside add blog");
                } else {
                    blog.currentBlogComment.push(comment);
                    blog.save(function(err, blogDetails) {
                        if (err) {
                            console.log("something went wrong in userDetails");
                        } else {
                            //console.log(blogDetails);
                        }
                    })
                }
            })
        }
    });

    res.redirect("/showcurrentuserblog/" + blogId);
});

//--------------------------------------------------
//AUTHENTICATION ROUTES

//signup new user
app.get("/signup", function(req, res) {
    res.render("signUpForm");
});

app.post("/signup", function(req, res) {
    var newUser = new user({ username: req.body.username, email: req.body.email });
    user.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/signup");
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome To FlexWork , " + req.user.username);
                res.redirect("/blogs");
            });
        }
    });
});

//login user
app.get("/login", function(req, res) {
    res.render("loginpage");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: '/blogs',
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res) {
    //res.redirect("/blogs");
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are Successfully Logout!");
    res.redirect("/");
});

//function to check whether current user is loggedin out loggedout
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //req.flash("error","You need to Login");
    res.redirect("/login");
};

//-------------------------------------------------------
//Server Route

app.listen(4030, function() {
    console.log("server is up n running");
});