


## Models ##

Users
  email
  password_digest
  session_token
  account_status
  omniauthable

Friendships
  **** Still need to make model and migration
  Two way friendships only (if you add one, also add the other)
  (do in the backend for now)
  friendships can be a nested resource (index: users have many friends)
  friendship show/new action (probably just on the front end - requests)

Bookshelves
  belong to a user
  name

Books
  bookshelf_id
  belong to a user through the bookshelf
  rating (1-5)
  reading_status ('N'ot yet read, 'R'eading, 'F'inished)
  review (text)

Rentals
  Two users, the owner and borrower

  Status - Pending, In progress, 



Users have many bookshelves
  The user's 'Library' is their collection of bookshelves
  Bookshelves contain books
  Books belong to a bookshelf (can add error checking for duplicate books when adding, but
    users can have more than one copy of a given book, in which case there will be two
    database entries.)

How do users add books to their library?
  Via a search page only.




# Functionality #

## Intro pages ##
  * Header to log-in
  * Section to sign up
  * Footer with links to about/contact pages

## User show pages ##

  * Basic show page for users (their home page)
    * Feed for their friends activities (new books added)
  * Link to My Library
    * Show page for your library (bookshelf index page, nested under users)



  



