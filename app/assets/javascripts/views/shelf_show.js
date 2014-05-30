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
    if (options.mode === "search") {
      this.listenTo(Bookfriends.Collections.rentalsMade, "add", this.updateBorrowedBook);
    }

    this.parentView = options.parentView;
    this.mode = options.mode;

    // TODO: replace this with the addBook function
    var view = this;
    this.model.books().each(function(book) {
      var bookShowView = new Bookfriends.Views.BookShow({
        model: book,
        parentView: view,
        ownBookCatalog: view.parentView.bookCatalog,
        mode: view.mode
      });
      book.ownView = bookShowView;
      view.addSubview(".book-container", bookShowView);
    });
  },

  updateBorrowedBook: function(rentalRequest) {
    // find the corresponding book model in the books() collection
    // then update the borrowRequests array with the new request.
    var book = this.model.books().findWhere({google_id: rentalRequest.get("google_id")});
    book.get("borrowRequests").push(rentalRequest);
    // instead of trying to get the backbone book model to listen to changes to the
    // borrowRequests array (or make it a collection), just manually render.
    book.ownView.render();
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
    book.ownView = bookShowView;
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