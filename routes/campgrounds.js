var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');


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
    res.render('campgrounds/new.ejs', {currentUser: req.user});
});

router.post("/", isLoggedIn, function(req, res){

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    // Create a new campground & save it to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
    
});


router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
           // render the show template with that campground
           res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
       }
    });
});
//=============================================================================

// EDIT CAMPGROUND ROUTE
    // we don't need the '/campground' part, from our 'use' in the app.js
router.get('/:id/edit', checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground:foundCampground, currentUser: req.user});
    });
});

//=============================================================================
// UPDATE CAMPGROUND ROUTE
router.put('/:id', checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
    // redirect somewhere
});
//=============================================================================
// DESTROY CAMPGROUND ROUTE
router.delete('/:id', checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

//=============================================================================

// My Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next){
        if(req.isAuthenticated()){
        // if so, does that user own this campground?
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect('back'); 
            // you can send a user back to the previous page. 
            // (Yeah, that 'back' is built-in to express.)
            
            } else {
                // if so, does that user own this campground?
                    /* Note: MongoDB has a built-in method (for a lot of things) 
                    that handles this called 'equals()'. We'll use it because
                    foundCampground is a Mongo OBJECT while req.user._id is
                    a string. We want to compare the two, and this method
                    let's us do that.*/
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
                
            }
        });
    } else {
        res.redirect('back');
    }
}
module.exports = router;