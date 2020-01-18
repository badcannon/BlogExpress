var express = require("express");
var passport = require("passport");
var Blogs = require("../models/blog");
var stripString = require("string-strip-html"); 


var Users = require("../models/user");
var middleware = require("../middleware/index");
var router = express.Router();



// User Routes : 

// New User : 
router.get("/user/new",(req,res)=>{

    res.render("index/register");

});



// Register New User : 

router.post("/user",(req,res)=>{
    var userObj;
    if(req.body.secretCode != undefined && req.body.secretCode == process.env.SECRETCODE){
        userObj = new Users({username : req.body.username ,image:req.body.image,email:req.body.email,isAdmin:true});
    }
    else {
        userObj = new Users({username : req.body.username ,image:req.body.image,email:req.body.email});
    }
     Users.register(userObj,req.body.password,(err,user)=>{
        if(err){
            console.log("Something went wrong with the Database :(");
            res.redirect("/blogs");
        }
        else {
            passport.authenticate("local")(req,res,function(){
            res.redirect("/blogs");
            });
        }
     });
});



// User Profile :

router.get("/user/:id",function(req,res){
    Users.findById(req.params.id,(err,user)=>{
        if(err || !user){
            console.log("User not found !!!");

        }
        else {
            Blogs.find().populate("comments").where('author.id').equals(req.params.id).exec(function(err,AllBlogs){

                AllBlogs.forEach((blog)=>{
                    blog.content = stripString(blog.content);
                });
                res.render("users/showUser",{
                    user:user,AllBlogs:AllBlogs
                });

            });
           
        }
    });
});



// Login Routes : 
router.get("/login",(req,res)=>{

    res.render("index/login");

});

// Login Post route :
router.post("/login",passport.authenticate("local",{
    successRedirect:"/blogs",
    failureRedirect:"/login",
    failureFlash:true
}),(req,res)=>{
});

// logout route :

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/blogs");
});


module.exports = router;