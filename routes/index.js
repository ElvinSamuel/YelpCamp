var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User = require('../models/user');



// The Root Route

router.get('/', function(req, res){
    res.render('landing', {currentUser: req.user});
});


/*
    Authentication Routes ==========================
*/

// show register form
router.get('/register', function(req, res){
    res.render('register');
});

// handle the logic for signing up
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        } 
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});

// show login form
router.get('/login', function(req, res){
    res.render('login');
});

// handle the login logic
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds', 
        failureRedirect: '/login'
    }), function(req, res){
});

// add logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

/* Here's where the middleware will come in to play,
   to verify whether a user is logged in and what they can
   see if they are/aren't.
   
   You can use this piece of middleware in whatever route you want
   and it will redirect according to whether that user is logged in
   or not.
*/

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

module.exports = router;