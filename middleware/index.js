
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

// all the middleware goes here
var middleObj = {};

middleObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, result) {
      if (err) {
        res.redirect("back");
      } else {

        if (!result ) {
          req.flash("error", "Item not found");
          return ees.redirect("back");
        }

        // does user own the campground.
        if (result.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middleObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, result) {
      if (err) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {

        if (!result ) {
          req.flash("error", "comment not found");
          return ees.redirect("back");
        }
        // does user own the comment.
        if (result.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged to do that");
    res.redirect("back");
  }
};

middleObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged to do that");
  res.redirect("/login");
};

module.exports = middleObj;