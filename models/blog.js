var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({

    title : String,
    image : String,
    content : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        },
     username : String
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "comments"
    }],
    createdDate : {
        type:Date,
        default:Date.now()
    },
});

module.exports = mongoose.model("blog",blogSchema);

