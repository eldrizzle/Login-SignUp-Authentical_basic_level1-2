//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

///Connecting to database 
mongoose.connect("mongodb://localhost:27017/userlevel1DB")

const userSchema = ({
    username : String,
    password : String
})




const User = mongoose.model ("User",userSchema);

// routes
app.get("/",function(req, res){
    res.render("home")
})

app.get("/login",function(req, res){
    res.render("login")
})

app.get("/register",function(req, res){
    res.render("register")
})

app.post("/register", function(req, res){
    const newUser =  new User({
      email: req.body.username,
      password: req.body.password
    });
    newUser.save(function(err){
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
  
  app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({email: username}, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          if (foundUser.password === password) {
            res.render("secrets");
          }
          else{
            res.send("Sorry ! We cannot find your credentials please try again or try register")
          }
        }
      }
    });
  });
  
  
  
  



app.listen(3000,function(req, res){
    console.log("Server running at port 3000")
})
