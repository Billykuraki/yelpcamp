const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get('/', (req, res) => {
  res.render('landing');
});

// ## Auth Route ##
// show register form
router.get("/register", (req, res) => {
  res.render("register", {page: "register"});
});

// handle sign up logic
router.post("/register", (req, res) => {

  // TODO: wait for implementation
  if (req.body.invitationcode !== process.env.INVITECODE) {
    return res.render("register", {error: "Invitation code error"});
  }

  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register", {error: err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp" + user.username);
      res.redirect("/campgrounds");
    });
  });
});

//show login form
router.get("/login", (req, res) => {
  res.render("login", {page: "login"});
});

// handle login logic
router.post("/login", passport.authenticate(
  "local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"}),
  function(req, res) {
});

// logout route'
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;