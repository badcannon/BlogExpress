var express = require("express");
var stripString = require("string-strip-html"); 
var router = express.Router();
var middleware = require("../middleware");
var Blogs = require("../models/blog");



// Index Route : 
router.get("/",(req,res)=>{

    res.redirect("/blogs");
});


// index route :D
router.get("/blogs",(req,res)=>{

    Blogs.find({},(err,AllBlogs)=>{
        if(err){
            console.log("Looks like something went wrong !");
        }
        else{
            for(var i = 0 ; i < AllBlogs.length ; i++){
                AllBlogs[i].content = stripString(AllBlogs[i].content);
            }
            res.render("blogs/blogs",{blogs : AllBlogs});
        }
    });

});

// Blog Create Route : 
router.get("/blogs/new",middleware.isLoggedIn,(req,res)=>{

    res.render("blogs/blogNew");
 });


// Post Route
router.post("/blogs",middleware.isLoggedIn,(req,res)=>{
    var newblog = {
        title : req.body.title,
        image : req.body.image,
        content : req.body.content
    };
    Blogs.create(newblog,(err,blog)=>{
        if(err){
            console.log("Looks like something went Wrong !");
            res.redirect("back");
        }
        else{
            blog.author.id = req.user._id;
            blog.author.username = req.user.username;
            blog.save();
            res.redirect("/blogs");
        }
    });
});



// show route for blogs :
router.get("/blogs/:id",(req,res)=>{

    Blogs.findById(req.params.id).populate("comments").exec((err,foundBlog)=>{
        if(err || !foundBlog){
            console.log("Looks like we dont have that blog !");
            console.log(err);
        }
        else{
              res.render("blogs/show",{blog : foundBlog});
        }
    });

});


// Edit Get 
router.get("/blogs/:id/edit",middleware.checkOwner,(req,res)=>{


    Blogs.findById(req.params.id , (err,blog)=>{
        if(err ){
            console.log("Error !");
        }
        else{
         return res.render("blogs/edit",{
        blog:blog
         });   
        }

    });


});

// Update route : 

router.put("/blogs/:id",middleware.checkOwner,(req,res)=>{
    var newblog = {
        title : req.body.title,
        image : req.body.image,
        content : req.body.content
    };
    Blogs.findByIdAndUpdate(req.params.id,newblog,(err,updatedBlog)=>{

        if(err){
            console.log(err);
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    })


});




// Delete Route : 
router.delete("/blogs/:id",middleware.checkOwner,(req,res)=>{
    Blogs.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("Blog Deleted !");
        }
        else{
            return res.redirect("/blogs");
        }
    });
});

module.exports = router;
