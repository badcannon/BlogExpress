require("dotenv").config();

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var blogsRoutes = require("./routes/blogRoutes");
var commentRoutes = require("./routes/commentRoutes");
var userRoutes = require("./routes/userRoutes");
var customRoutes = require("./routes/customRoutes");
var flashConnect = require("flash");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(__dirname + "/public"));

// This is to set new Parser UP!
mongoose.set("useNewUrlParser", true);
// This is for the new Topology Engine :
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DATABASEURL);
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// Requiring blog model
var Blogs = require("./models/blog");
// User Model :
var Users = require("./models/user");
// Comments Model :
var Comments = require("./models/comment");
// Reply Model:
var Replies = require("./models/reply");

// Express-session Config :!
app.use(
  require("express-session")({
    secret: "Hey This is my blogs secret !",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use(flashConnect());

app.use(function(req, res, next) {
  res.locals.CurrentUser = req.user;
  next();
});

app.locals.moment = require("moment");

app.use(blogsRoutes);
app.use(commentRoutes);
app.use(userRoutes);
app.use(customRoutes);


// require("./seed")();

if (process.env.PORT || (process.env.PORT = 3000))
  app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server Started ! ");
  });
