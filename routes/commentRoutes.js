var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Blogs = require("../models/blog");
var Comments = require("../models/comment");


// Comment Post route  : 
router.post("/blogs/:id/comment",middleware.isLoggedIn,(req,res)=>{

    Blogs.findById(req.params.id,(err,blog)=>{
        if(err){
            console.log("Unable to find the Blog ;(");
        }
        else{
            Comments.create({
                text:req.body.text,
            },(err,comment)=>{
                if(err){
                    console.log("Unable to perform this action !");
                    
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.image = req.user.image;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    return res.redirect("/blogs/" + blog._id);
                }
            });
        }
    })
    

});

// Edit Route : D 

router.put("/blogs/:id/comment/:commentID",middleware.checkCommentOwner,(req,res)=>{

    Comments.findOneAndUpdate(req.params.commentID,{text:req.body.text},(err,comment)=>{
        if(err){
            console.log(err.message);
            res.redirect("back");
        }
        res.redirect("/blogs/"+req.params.id);
    });
});






// Comment delete :D 

router.delete("/blogs/:blogID/comment/:commentID",middleware.checkCommentOwner,(req,res)=>{
    Comments.findByIdAndDelete(req.params.commentID,(err,comment)=>{
        if(err){
            console.log("Error With the BLog");
        }
        else{
            res.redirect("back");
        }

    });
});


module.exports = router;