var express = require('express');
var router = express.Router({
        mergeParams: true
    });
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// ============================================
// COMMENTS ROUTES
// ============================================
router.get('/new', isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});


router.post('/', isLoggedIn, function(req, res){
    // Lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            // create new comment
            console.log(req.body.comment);
            // connect new comment to campground
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();                    
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment)
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
            // redirect campground show page
            
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