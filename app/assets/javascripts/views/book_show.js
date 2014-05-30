window.Bookfriends.Views.BookShow = Backbone.View.extend({

  initialize: function(options) {
    // this.model (automatically) is a Bookfriends.Models.Book
    this.listenTo(this.model, "sync", this.render);
    this.parentView = options.parentView;
    this.ownBookCatalog = options.ownBookCatalog;
    this.mode = options.mode;
    if (this.mode === "friend" || this.mode === "search") {
      // don't _really_ need the search listen... can rely on the fact that by the time
      // a search is rendered, we've already likely received the response from the server
      // but this is more reliable.
      this.listenTo(Bookfriends.Collections.rentalsMade, "sync", this.render);
    }

    if (this.mode === "search") {
      // create an attribute to hold the borrowing requests the current user
      // has made for the book.
      var requests = this.model.getActiveBorrowRequests();
      this.model.set("borrowRequests", requests);
    }
    window.bv = this;
  },

  attributes: function() {
    return {
      "data-id": this.model.get("google_id"),
      "class": "book-item row"
    };
  },

  events: {
    "click button.remove-owned-book": "deleteBook",
    "click button.add-book-to-shelf": "addBookToShelf",
    "click button.request-book": "requestBook"
  },

  deleteBook: function(event) {
    event.preventDefault();
    this.parentView.removeFromUserLibrary(event, this.model);
  },

  addBookToShelf: function(event) {
    event.preventDefault();
    this.parentView.parentView.addToUserLibrary(event, this.model);
  },

  requestBook: function(event) {
    event.preventDefault();
    this.parentView.parentView.requestBook(event, this.model);
  },

  template: JST["books/show"],

  render: function() {
    var view = this;
    if (this.mode === "friend") {
      // gather all the requests made by the user for this title, can include previous
      // fulfilled requests.
      var allRequests = Bookfriends.Collections.rentalsMade.filter(function(request) {
        return parseInt(request.escape("book_id")) === view.model.id;
      });
      var requests = allRequests.filter(function(request) {
        return request.get("status") === "N" ||
               request.get("status") === "A" ||
               request.get("status") === "D"
      });
    }

    if (this.mode === "search") {
      var view = this;
      // var requests = this.model.get("borrowRequests");
      var requests = this.model.getActiveBorrowRequests();

      // look up the book in the faux global collection Bookfriends.Collections.friendsBooks
      var friendAvailability = [];
      var friendIds = Bookfriends.Collections.friendsBooks[this.model.get("google_id")];
      if (friendIds) {
        _(friendIds).each(function(friendId) {
          var existingRequests = _(requests).filter(function(request) {
            return request.escape("google_id") === view.model.get("google_id") &&
                    parseInt(request.escape("dest_user")) === friendId;
          });
          if (existingRequests.length > 0) {
            return; // continue does not work, use return
          }

          var friendInstance = Bookfriends.Models.currentUser.friends().get(friendId);
          if (friendInstance) { // this really should always be defined
            friendAvailability.push(friendInstance);
          }
        });
      }

    }

    var renderedContent = this.template({
      book: this.model,
      ownBookCatalog: this.parentView.parentView.bookCatalog,
      requests: requests, // variable hoisting
      friendAvailability: friendAvailability, // variable hoisting
      mode: this.mode
    });

    this.$el.html(renderedContent);

    return this;
  }

});