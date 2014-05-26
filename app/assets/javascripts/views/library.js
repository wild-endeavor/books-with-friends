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
    this.rentalRequests = [];
    this.friendView = options.friendView;
    this.friendId = options.friendId;
    this.friendShelves = options.friendShelves;
    this.currentUser = options.currentUser;


    this.listenTo(this.collection, "sync", this.populateCatalog);
    if (this.currentUser) this.listenTo(this.currentUser, "sync", this.render);

    // Make subview for the sidebar
    var shelfIndexView = new Bookfriends.Views.ShelfIndex({
      collection: this.friendShelves || this.collection,
      showAdd: this.friendShelves ? false : true,
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
      parentView: this,
      showAdd: false,
      showRemove: this.friendView ? false : true,
      showRequest: this.friendView ? true : false
    });
    this.addSubview("#shelf-show", shelfShowView);
  },

  requestBook: function(event, model) {
    var view = this;
    var headerContent = JST["books/rental"]({
      book: model,
      friend: this.friend
    });

    $("#modal-book-header").html(headerContent);
    $("#book-request-modal").modal("show");
    // this.saveRentalRequest(event, model);
  },

  saveRentalRequest: function(event, model) {
    var view = this;
    var rental = new Bookfriends.Models.Rental({
      dest_user: parseInt(this.friendId),
      google_id: model.escape("google_id")
    });
    // rental.save({}, {
    //   success: function(model, response) {
    //     console.log("successfully saved rental request");
    //     view.rentalRequests.push(model.escape("google_id"));
    //   }
    // });
  },

  render: function() {
    var shelfIndexTitle = this.friendView ? "Your friend's shelves" : "Your Bookshelves";
    if (this.currentUser) {
      var friendId = this.friendId;
      this.friend = this.currentUser.friends().find(
        function(f) { return f.id === parseInt(friendId); }
      );
      if (this.friend) {
        shelfIndexTitle = friend.escape("email") + "'s Bookshelves";
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