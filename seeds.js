

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
  {name: "doggo", image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg", description: "doggo"},
  {name: "doggo", image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg", description: "doggo"},
  {name: "doggo", image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg", description: "doggo"},
  {name: "makonatu", image: "https://i.pinimg.com/originals/66/2d/37/662d3756ec1b87ad5670dcd435d08ed0.jpg", description: "makonatu"},
  {name: "makonatu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtd4BycmOBoUNbd7PZrSjrZNkQP7KoXk2StTbdOG536Zh84coy", description: "makonatu"},
  {name: "makonatu", image: "http://s2.lookerpets.com/imgs/201808/22/3/15349214074715.jpg", description: "makonatu"}
];

function seedDB(){
  //Remove all campgrounds
  Campground.deleteMany({}, function(err){
       if(err){
           console.log(err);
       }
       console.log("removed campgrounds!");
       Comment.deleteMany({}, function(err) {
           if(err){
               console.log(err);
           }
           console.log("removed comments!");
            //add a few campgrounds
           data.forEach(function(seed){
               Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err)
                   } else {
                       console.log("added a campground");
                       // create a comment
                       Comment.create(
                           {
                               text: "This place is great, but I wish there was internet",
                               author: "Homer"
                           }, function(err, comment){
                               if(err){
                                   console.log(err);
                               } else {
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("Created new comment");
                               }
                           });
                   }
               });
           });
       });
   }); 
   //add a few comments
}

module.exports = seedDB;
