#RESTful Routing
--Essential to interacting with API's and building your own app.
--Just a protocol, so you can (technically) do whatever you want, but
  it's a good idea to follow this since everyone should.

ex.) api.github.com/users -- get's all the users from github api 
                          -- predictable and easy to use.

===============================================================
Name     URL          VERB     Description
===============================================================
INDEX   /dogs         GET      Displays a list of all dogs. 
NEW     /dogs/new     GET      Display FORM to make a new dog
CREATE  /dogs         POST     Add new dog to DB (redirects back)
SHOW    /dogs/:id     GET      Shows info about ONE dog.