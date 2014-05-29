// Main Library View #library
//   => contains a #bookshelf-container
//        => contains shelf views which are .bookshelf
//             => contains a book-container

window.Bookfriends.Views.Library = Backbone.CompositeView.extend({

  attributes: {
    id: "library"
  },

  template: JST["library"],

  populateCatalog: function() {
    // Populate the catalog of books
    var catalog = this.bookCatalog = [];
    this.collection.each(function(shelf){
      shelf.books().each(function(book) {
        catalog.push(book.get("google_id"));
      });
    });
  },

  initialize: function(options) {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    this.bookCatalog = []; // All the google_ids of books in the catalog
    this.mode = options.mode;
    this.friendId = options.friendId;

    this.listenTo(this.collection, "sync", this.populateCatalog);
    if (this.mode === "own") this.showAddShelf = true;

    // Make subview for the sidebar
    var shelfIndexView = new Bookfriends.Views.ShelfIndex({
      collection: this.collection,
      showAdd: this.showAddShelf,
      parentView: this
    });
    this.addSubview("#bookshelf-list", shelfIndexView);
  },

  changeActiveShelf: function(newShelf) {
    var shelfSubviews = this.subviews("#shelf-show");
    if (shelfSubviews && shelfSubviews.length > 0) {
      shelfSubviews[0].remove();
      shelfSubviews.splice(0, 1);
    }

    var shelfShowView = new Bookfriends.Views.ShelfShow({
      model: newShelf,
      mode: this.mode,
      parentView: this,
    });
    this.addSubview("#shelf-show", shelfShowView);
  },

  requestBook: function(event, model) {
    var view = this;
    var friend = Bookfriends.Models.currentUser.friends().get(this.friendId);
    var headerContent = JST["books/rental"]({
      book: model,
      friend: friend
    });

    $("#book-request-modal-content").html(headerContent);
    $("#book-request-modal").modal("show");
  },

  events: {
    "submit #rental-request-form": "saveRentalRequest"
  },

  saveRentalRequest: function(event) {
    event.preventDefault();
    var view = this;
    var rentalData = $(event.target).serializeJSON()["rental"];
    var rental = new Bookfriends.Models.Rental(rentalData);
    rental.save({}, {
      success: function(model, response) {
        console.log("successfully saved rental request");
        Bookfriends.Collections.rentalsMade.add(model);
        Bookfriends.Collections.rentalsMade.trigger("sync");
        $("#book-request-modal").modal("hide");
      },
      error: function(model, response) {
        var alertContent = JST["books/rental_alert"]({
          response: response
        });
        $("#book-request-modal .modal-header").prepend(alertContent);
      }
    });
  },

  render: function() {
    var shelfIndexTitle = "Your Bookshelves";
    if (this.mode === "friend") {
      var shelfIndexTitle = "Friend Bookshelves";
      var friendId = this.friendId;
      this.friend = Bookfriends.Models.currentUser.friends().get(this.friendId);
      if (this.friend) {
        shelfIndexTitle = this.friend.escape("email") + "'s Bookshelves";
      }
    }

    var renderedContent = this.template({
      shelfIndexTitle: shelfIndexTitle
    });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }

});