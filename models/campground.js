var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    // The New Piece Is Author -- We Want Access To That Data So We Can Use It Later
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
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