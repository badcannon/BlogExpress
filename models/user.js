var mongoose = require("mongoose");

var PassportLocalMongoose = require("passport-local-mongoose"); 


var UserSchema = new mongoose.Schema({
    image: String,
    email : String,
    username : String,
    password : String,
    isAdmin : {
        type:Boolean,
        default:false
    }
});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("users",UserSchema);
