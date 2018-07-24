
var express = require('express');
var router = express.Router();
var Campground = require('../models/campground')


/*
    Campground Routes =====================================
*/

router.get('/', function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

// RESTful -- shows the FORM to add a new campground
router.get('/new', isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs');
});

router.post("/", isLoggedIn, function(req, res){

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    // Create a new campground & save it to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds/campgrounds');
        }
    });
    
});


router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
           console.log(foundCampground);
           // render the show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;