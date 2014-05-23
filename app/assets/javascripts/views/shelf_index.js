window.Bookfriends.Views.ShelfIndex = Backbone.CompositeView.extend({

  initialize: function(options) {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    this.parentView = options.parentView; // this is the parent of this entire view

    this.listenTo(this.collection, "sync add remove", this.render);

  },

  template: JST["bookshelves/index"],

  changeShelf: function(event) {
    var shelfId = $(event.target).data("id");
    var newShelf = this.collection.get(shelfId);
    if (newShelf) {
      this.parentView.replaceShelfView.bind(this.parentView)(newShelf);
    }
  },

  events: {
    "click .a-bookshelf-name": "changeShelf"
  },

  render: function() {
    var renderedContent = this.template({
      shelves: this.collection
    });
    this.$el.html(renderedContent);
    // this.attachSubviews();

    return this;
  }


});