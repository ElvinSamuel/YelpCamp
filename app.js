var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
    // Workaround for the mongoose.connect('mongodb') thing from the v11Deployed/ videos
    MongoClient    = require('mongodb').MongoClient,
// For The Modules
    Campground     = require('./models/campground'),
    Comment        = require('./models/comment'),
    User           = require('./models/user'),
    seedDB         = require('./seeds');
    

// For navigating through routes:
    var commentRoutes = require('./routes/comments'),
        campgroundRoutes = require('./routes/campgrounds'),
        indexRoutes = require('./routes/index');
    
    
mongoose.Promise  = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp_v10', {useMongoClient: true})

// v11Deployment Stuff: adding the mLab url
// MongoClient.connect('mongodb://elvinsamuel:sitk2byc@ds159997.mlab.com:59997/yelpcamp_elvinsamuel');
//MongoClient.connect('mongodb://elvinsamuel:sitk2b%3Ayc@ds159997.mlab.com:59997/yelpcamp_elvinsamuel');

// FOUND A WORKAROUND! My password contains a ':', so we have to use URL Encoding to include that character! Great stuff.
/*MongoClient.connect("mongodb://elvinsamuel:sitk2b%3Ayc@ds159997.mlab.com:59997/yelpcamp_elvinsamuel", { 
    uri_decode_auth: true 
    }, function(err, db) {
        console.log(err);
    }
);*/
/*MongoClient.connect('mongodb://elvinsamuel:sitk2b%3Ayc@ds159997.mlab.com:59997/yelpcamp_elvinsamuel', {
    username: 'elvinsamuel',
    password: 'sitk2b:yc'
});*/


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
    })
);

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