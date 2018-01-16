# YelpCamp Redeux V4: The Legend Continues


## Nested Routes
With the campgrounds routing below, notice that it works for the campgrounds
themselves, but not with comments. That's because each comment need to be associated
with a campground, so the route would have to include that specific campground id.
We'll 'nest' the comment routing inside that of the campground routing for it to work.


RESTful Routes (Campgrounds)
==========================================================
name      url               verb        desc
==========================================================
INDEX    /campgrounds       GET         Display a list of all campgrounds
NEW      /campgrounds/new   GET         Displays a FORM to make a new campground
CREATE   /campgrounds       POST        Add new campground(s) to DB
SHOW     /campgrounds/:id   GET         Shows info about a specific campground.


RESTful Routes (Comments)
==========================================================
name      url                            verb        desc
==========================================================
NEW      /campgrounds/:id/comments/new   GET         Displays a FORM to make a new comment
CREATE   /campgrounds/:id/comments       POST        Add new comment(s) to DB