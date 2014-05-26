window.Bookfriends.Views.BookShow = Backbone.View.extend({

  initialize: function(options) {
    // this.model (automatically) is a Bookfriends.Models.Book
    this.listenTo(this.model, "sync", this.render);
    this.parentView = options.parentView;
    this.ownBookCatalog = options.ownBookCatalog;
    this.showAdd = options.showAdd;
    this.showRemove = options.showRemove;
    this.showRequest = options.showRequest;
  },

  attributes: function() {
    return {
      "data-id": this.model.get("google_id"),
      "class": "book-item"
    };
  },

  events: {
    "click button.remove-owned-book": "deleteBook",
    "click button.add-book-to-shelf": "addBookToShelf"
  },

  deleteBook: function(event) {
    event.preventDefault();
    this.parentView.removeFromUserLibrary(event, this.model);
  },

  addBookToShelf: function(event) {
    event.preventDefault();
    this.parentView.parentView.addToUserLibrary(event, this.model);
  },

  template: JST["books/show"],

  render: function() {
    var renderedContent = this.template({
      book: this.model,
      ownBookCatalog: this.parentView.parentView.bookCatalog,
      showAdd: this.showAdd,
      showRemove: this.showRemove,
      showRequest: this.showRequest
    });

    this.$el.html(renderedContent);

    return this;
  }

});