# YelpCamp V11: The Legend Continues

##What's new
Authentication
My app now has to a degree authentication and limited views. This allows the user to see only the information that pertains to their account, and edit only the posts that they created.

MongoDB via mLab
Now the app uses mLab to host data instead of Mongo in my local.

Heroku/Mongo Integration
The whole project is hosted on Heroku right now, with the Heroku origin installed



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
