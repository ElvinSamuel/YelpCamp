/*
    Note: A lot of Error-Driven Development for this one.
    Write some code, run it, solve the errors, run again, etc.
*/


// Creating a bunch of campgrounds 
var mongoose   = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comment');

// Some basic campgrounds
var data = [
        {
            name: 'Cloud\'s Rest',
            image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg',
            description: 'Tacos vegan biodiesel freegan cray kale chips, vexillologist lyft kitsch semiotics messenger bag woke roof party vinyl everyday carry. Snackwave fingerstache neutra helvetica street art, iPhone roof party tumblr kitsch. Fam live-edge art party sriracha tumblr vaporware kale chips pour-over before they sold out small batch bicycle rights la croix. Cloud bread put a bird on it pour-over scenester. Post-ironic kinfolk cliche flexitarian paleo butcher, leggings af meggings tilde cray. Lyft taiyaki copper mug listicle williamsburg YOLO. Vice kinfolk tote bag, tousled pok pok tumblr DIY banjo truffaut kombucha farm-to-table adaptogen fanny pack. Food truck banh mi mixtape pork belly photo booth occupy. Cronut raclette migas ramps post-ironic whatever brunch. Photo booth irony hoodie glossier. Chillwave shaman kogi jean shorts health goth ramps vape deep v. Viral brooklyn banjo, taxidermy vice street art offal chambray. Pok pok keffiyeh chicharrones brunch artisan tousled tacos readymade tumblr man bun portland bitters..'
        },
        {
            name: 'Hidden Valley Ranch',
            image: 'https://farm7.staticflickr.com/6091/6231106268_a6dfe443c9.jpg',
            description: 'Tacos vegan biodiesel freegan cray kale chips, vexillologist lyft kitsch semiotics messenger bag woke roof party vinyl everyday carry. Snackwave fingerstache neutra helvetica street art, iPhone roof party tumblr kitsch. Fam live-edge art party sriracha tumblr vaporware kale chips pour-over before they sold out small batch bicycle rights la croix. Cloud bread put a bird on it pour-over scenester. Post-ironic kinfolk cliche flexitarian paleo butcher, leggings af meggings tilde cray. Lyft taiyaki copper mug listicle williamsburg YOLO. Vice kinfolk tote bag, tousled pok pok tumblr DIY banjo truffaut kombucha farm-to-table adaptogen fanny pack. Food truck banh mi mixtape pork belly photo booth occupy. Cronut raclette migas ramps post-ironic whatever brunch. Photo booth irony hoodie glossier. Chillwave shaman kogi jean shorts health goth ramps vape deep v. Viral brooklyn banjo, taxidermy vice street art offal chambray. Pok pok keffiyeh chicharrones brunch artisan tousled tacos readymade tumblr man bun portland bitters..'
        },
        {
            name: 'New Woodstock Point',
            image: 'https://farm8.staticflickr.com/7243/7211285084_599752aacc.jpg',
            description: 'Tacos vegan biodiesel freegan cray kale chips, vexillologist lyft kitsch semiotics messenger bag woke roof party vinyl everyday carry. Snackwave fingerstache neutra helvetica street art, iPhone roof party tumblr kitsch. Fam live-edge art party sriracha tumblr vaporware kale chips pour-over before they sold out small batch bicycle rights la croix. Cloud bread put a bird on it pour-over scenester. Post-ironic kinfolk cliche flexitarian paleo butcher, leggings af meggings tilde cray. Lyft taiyaki copper mug listicle williamsburg YOLO. Vice kinfolk tote bag, tousled pok pok tumblr DIY banjo truffaut kombucha farm-to-table adaptogen fanny pack. Food truck banh mi mixtape pork belly photo booth occupy. Cronut raclette migas ramps post-ironic whatever brunch. Photo booth irony hoodie glossier. Chillwave shaman kogi jean shorts health goth ramps vape deep v. Viral brooklyn banjo, taxidermy vice street art offal chambray. Pok pok keffiyeh chicharrones brunch artisan tousled tacos readymade tumblr man bun portland bitters..'
        }
    ];

// Content inside of the 'seedDB' function so that it's easy to export
function seedDB(){
    // Empty the original database
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('removed campgrounds');
    
    // We put the add campgrounds in the same callback b/c there's no gaurantee that it'll happen before
    // the 'remove' happens (before, it was asynchronous? not sure). 
            // Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Added a camground');
                        // Create a comment  per campground
                        Comment.create(
                            {
                                text: 'This place is great, but I wish it had internet.',
                                author: 'Jessica'
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('created new comment');
                                }
                            });
                        }
                });
            });            
            
        }
    });
    
    
    // Add a few comments
}

module.exports = seedDB;