var Comments = require("../models/comment");
var Blogs = require("../models/blog");

var middleware = {};


// Middle Ware : 


middleware.isLoggedIn = function (req,res,next){
    if(req.user){
        next();
    }
    else{
        console.log("You must be signed in to do that !");
        res.redirect("/blogs");
    }

}




 middleware.checkOwner= function (req,res,next){
    if(!req.user){
        console.log("Lol no user !");
        res.redirect("back");
    }
    else {
        // console.log(typeof(req.user));
        Blogs.findById(req.params.id,(err,blog)=>{

            if(err){
                console.log("error Occurred ! ");

            }
            else {
                if(req.user._id.equals(blog.author.id)){
                    next();
                }
                else if(req.user.isAdmin){
                    next();
                }
                else {
                    console.log("Lol Not allowed !");
                    return res.redirect ("back");
                }
            }

        })

        
    }
}


middleware.checkCommentOwner= function (req,res,next){
    Comments.findById(req.params.commentID ,(err,comment)=>{
        if(err){
            console.log ("lol");
        }
        else {
            if(!req.user||!comment){
                res.redirect("back");
            }
            else if(comment.author.id.equals(req.user._id))
            { 
                next();
            }
            else if(req.user.isAdmin){
                next();
            }
            else
             {
                console.log("Comment is not Yours Just go back NUBBB!");
                res.redirect("back");

            }

        }

    });
}


module.exports = middleware;