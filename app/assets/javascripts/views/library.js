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
    this.listenTo(this.collection, "sync", this.populateCatalog);
    var shelves = this.collection;

    // Make subview for the sidebar
    var shelfIndexView = new Bookfriends.Views.ShelfIndex({
      collection: shelves,
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
      collection: this.collection,
      model: newShelf,
      parentView: this,
      showAdd: false,
      showRemove: true,
      showRequest: false
    });
    this.addSubview("#shelf-show", shelfShowView);
  },

  render: function() {
    var renderedContent = this.template({
      shelves: this.collection
    });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  }

});