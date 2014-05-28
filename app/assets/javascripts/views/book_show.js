window.Bookfriends.Views.BookShow = Backbone.View.extend({

  initialize: function(options) {
    // this.model (automatically) is a Bookfriends.Models.Book
    this.listenTo(this.model, "sync", this.render);
    this.parentView = options.parentView;
    this.ownBookCatalog = options.ownBookCatalog;
    this.mode = options.mode;
    if (this.mode === "friend") {
      this.listenTo(Bookfriends.Collections.rentalsMade, "sync", this.render);
    }
    window.bv = this;
  },

  attributes: function() {
    return {
      "data-id": this.model.get("google_id"),
      "class": "book-item"
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
      // look up the book in the faux global collection Bookfriends.Collections.friendsBooks
      var friendAvailability = [];
      var friendIds = Bookfriends.Collections.friendsBooks[this.model.get("google_id")];
      if (friendIds) {
        _(friendIds).each(function(friendId) {
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