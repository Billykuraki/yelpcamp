var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// index
router.get('/', function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allCampgrounds,
        currentUser: req.user
      });
    }
  });
});

// create
router.post('/', middleware.isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds
  // redirect back to camp ground page
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.desc;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    price: price,
    image: image,
    description: desc,
    author: author
  };
  Campground.create(newCampground, function (err, newCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(newCampground);
      res.redirect('/campgrounds');
    }
  });
});

// show
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('campgrounds/new.ejs');
});

router.get('/:id', function (req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec(function (err, found) {
    if (err) {
      console.log(err);
    } else {

      if (!found) {
        return res.status(404).send("Item not found");
      }
      res.render('campgrounds/show', {
        campground: found
      });
    }
  });
});

// edit campground route (form)
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, result) {

    if (!result) {
      return res.status(404).send("Item not found");
    }
    res.render("campgrounds/edit", {campground: result});
  });
});

// update
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  // find and update the corrent campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updated) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + updated._id);
    }
  });

  // redirect 
});

// Destroy the campground
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;