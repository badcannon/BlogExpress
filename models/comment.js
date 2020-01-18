var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
    author :{
      id: { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
          },
        username : String,
        image:String
    },
    text : String
});

module.exports = mongoose.model("comments",CommentSchema);