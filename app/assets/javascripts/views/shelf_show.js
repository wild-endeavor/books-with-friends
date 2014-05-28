window.Bookfriends.Views.ShelfShow = Backbone.CompositeView.extend({
  template: JST["bookshelves/show"],

  initialize: function(options) {
    // this.model (automatically) is a Bookfriends.Models.Bookshelf
    //    but will be an empty one if the user does not have any defined.
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.books(), "sync", this.render);
    this.listenTo(this.model.books(), "add", this.addBook);
    this.listenTo(this.model.books(), "remove", this.removeBook);

    this.parentView = options.parentView;
    this.mode = options.mode;

    // Add subviews for books
    var view = this;
    this.model.books().each(function(book) {
      var bookShowView = new Bookfriends.Views.BookShow({
        model: book,
        parentView: view,
        ownBookCatalog: view.parentView.bookCatalog,
        mode: view.mode
      });
      // option 1: change the book show view to look up the global hash when rendering search results
      view.addSubview(".book-container", bookShowView);
    });
  },

  removeFromUserLibrary: function(event, bookModel) {
    var bookId = $(event.currentTarget).parent().attr("data-id");
    // TODO: Add an alert here or something
    bookModel.destroy();
  },

  addBook: function(book) {
    var bookShowView = new Bookfriends.Views.BookShow({
      model: book,
      parentView: this,
      ownBookCatalog: this.parentView.bookCatalog,
      mode: this.mode
    });
    this.addSubview(".book-container", bookShowView);
  },

  removeBook: function(book) {
    var subview = _.find(this.subviews(".book-container"),
      function(subview) {
        return subview.model === book;
      }
    );
    this.removeSubview(".book-container", subview);
  },

  attributes: {
    class: "bookshelf"
  },

  render: function() {
    var renderedContent = this.template({
      bookshelf: this.model
    });
    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }

});