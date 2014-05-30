
# Books With Friend #
### Description ###
This is a week-and-a-half long final project for [App Academy](http://www.appacademy.io).  This project
was actually conceived long before I began the a/A curriculum, on a Bloomberg chat with a friend.  
Somewhere between arguing over which authors were better and when I could borrow what, we decided a better inventory solution was needed.  Unfortunately, it wasn't until I began this course that I really knew how to do any of it, or had time to do any
of it.

## Technology ##

The site is built mostly with Backbone.js but also Rails (Heroku hosted) on the backend.  It is a work in progress
(including this readme file!) and there is much left to do.  After this course is over, please feel free to contribute!

### User Authentication ###
Currently authentication is done manually in Rails.  I would love to incorporate OmniAuth and devise in the future when
I have more time, and have caught up on some sleep.

### Models ###

Below is a listing of the Rails models I used.  Descriptions are brief - I'll add more verbosity later.

*   Users

    Users are the base model for the site.

*   Bookshelves

    Bookshelves belong to users.

*   Books

    Books currently belong to bookshelves, but see the TODO section.  Going to re-work this.  One book model
    per physical book supposedly in existence.

*   Friendship

    Two way friendships only (if you add one, also add the other)

*   Rentals

    Two users, the owner and borrower.  Status information.

### API ###
Google is integral!  Everything is google: the suggestion engine, the searching, the images.  Praise the Google.


## How it works ##

### Splash Page ###
  * The login page also serves as the 
  * Section to sign up
  * Footer with links to about/contact pages

## User show pages ##

  * Basic show page for users (their home page)
    * Starts with the library, #/ is the user's library


## TODOS ##

### Basic Stuff ###

* After hitting the add bookshelf button, set the focus to the search box
* When moving from Library view to search view, maintain the state of the shelf index
* Make an alert section that works.
* Pre-populate typeahead when searching with existing book terms.  Get only real words
  Maybe add another controller for this.
* Add the add bookshelf button to the search view.



### Styling ###
Styling sucks obviously.  Even the somewhat acceptable login page is blatantly plagiarized from airbnb.  But it looks nice though.

* Friends listing can be beefed up enormously and styled.  Much of this has to do with better user modeling/auth though.

### Larger Features ###
* Use subviews for the rental request page instead of re-rendering the whole page.
* Change model structure so that books belong directly to a user instead of through a bookshelf.
* Rental Request Functionality
  * Allow users to cancel requests
  * Allow users to reject requests
  * Allow users to change the due-date on approval, and extend/change the due date of books lent out.
  * Be able to handle multiple copies of the same book.
  * Make search results aware of the rentals collection.
  * Add waiting lists.
* Infinite scrolling for search results.
* Move books user has borrowed onto a separate, special shelf.
* Clean up unused routes/controllers
* Use custom routes instead of just the general update route to change status on rental requests.
* Devise, OmniAuth, making the login page https.  Add the whole searching for friends thing.  Currently the site should be called books-with-friends-that-you-add-on-the-backend.






    
