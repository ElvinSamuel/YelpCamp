var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            // The comment isn't actually stored -- it's a REFERENCE to the comment
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);