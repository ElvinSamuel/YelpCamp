var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
// For The Modules
    Campground     = require('./models/campground'),
    Comment        = require('./models/comment'),
    User           = require('./models/user'),
    seedDB         = require('./seeds');

// ===================================================    
// unrelated to the YelpCamp Development -- including LESS for my CSS
/*
var lessMiddleware = require('less-middleware');

app.use(lessMiddleware({
    src      : __dirname + '/public',
    compress : true
}));
*/
// ===================================================

// For navigating through routes:
    var commentRoutes = require('./routes/comments'),
        campgroundRoutes = require('./routes/campgrounds'),
        indexRoutes = require('./routes/index');
    
    
mongoose.Promise  = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp_v10', {useMongoClient: true});

// seedDB();

app.use(bodyParser.urlencoded({extended: true}));

// Making our own middleware to handle every route and whether the 'login' or 'logout' pops up
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// Add in the custom CSS page
/*
    The '__dirname' is a built-in way to say 'the directory that 
    this file was run in (in this case: /home/ubuntu/workspace/yelpcamp/v5)'
*/
app.use(express.static(__dirname + '/public'))

app.set("view engine", "ejs");

// For Method Override (v10 Stuff):
app.use(methodOverride('_method'));
    
    
// ===================== Passport Configuration
app.use(require('express-session')({
    secret: 'This can be anything that you want, so I\'ll use this.',
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==============================================

app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);


// ==================================================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(`YelpCamp Server Up & Running On ${process.env.PORT}`);
});