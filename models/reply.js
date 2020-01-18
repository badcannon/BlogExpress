var mongoose = require("mongoose");

var replySchema = new mongoose.Schema({
 
    text : String,
    author : {
        id : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        username : String,
        image : String 
    }

});

module.exports = mongoose.model("replies",replySchema);