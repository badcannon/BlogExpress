var express = require("express");
var router = express.Router();


router.get("/about",(req,res)=>{

    res.render("index/about");

});

router.get("/projects",(req,res)=>{

    res.render("index/projects");

});


module.exports = router;