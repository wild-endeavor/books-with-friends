// Main Library View #library
//   => contains a #bookshelf-container
//        => contains shelf views which are .bookshelf
//             => contains a book-container

window.Bookfriends.Views.Library = Backbone.CompositeView.extend({

  attributes: {
    id: "library"
  },

  template: JST["bookshelves/index"],

  initialize: function(options) {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addShelf);
    this.listenTo(this.collection, "remove", this.removeShelf);

    shelves = this.collection;

    // Make subviews for each of the bookshelves
    var parentView = this;
    this.collection.each(function (bookshelf) {
      var shelfShowView = new Bookfriends.Views.ShelfShow({
        model: bookshelf
      });
      parentView.addSubview("#bookshelf-container", shelfShowView);
    });

  },

  addShelf: function (shelf) {
    var shelfShowView = new Bookfriends.Views.ShelfShow({
      model: shelf
    });
    this.addSubview("#bookshelf-container", shelfShowView);
  },

  removeShelf: function(shelf) {
    var subview = _.find(this.subviews("#bookshelf-container"),
      function (subview) {
        return subview.model === shelf;
      }
    );
    this.removeSubview("#bookshelf-container", subview);
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