// Main Library View #library
//   => contains a #bookshelf-container
//        => contains shelf views which are .bookshelf
//             => contains a book-container

window.Bookfriends.Views.Library = Backbone.CompositeView.extend({

  attributes: {
    id: "library"
  },

  template: JST["library"],

  initialize: function(options) {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves

    var shelves = this.collection;

    // Make subviews for the sidebar
    var shelfIndexView = new Bookfriends.Views.ShelfIndex({
      collection: shelves,
      parentView: this
    });
    this.addSubview("#bookshelf-list", shelfIndexView);

    // Make a subview for the main shelf show area
    this.replaceShelfView(shelves.models[0] || new Bookfriends.Models.Bookshelf());
  },

  changeShelf: function(shelfCollection) {
    if (shelfCollection.models[0]) {
      this.replaceShelfView(shelfCollection.models[0]);
    }
  },

  replaceShelfView: function(newShelf) {
    var shelfSubviews = this.subviews("#shelf-show");
    if (shelfSubviews && shelfSubviews.length > 0) {
      shelfSubviews[0].remove();
      shelfSubviews.splice(0, 1);
    }

    var shelfShowView = new Bookfriends.Views.ShelfShow({
      collection: this.collection,
      model: newShelf
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