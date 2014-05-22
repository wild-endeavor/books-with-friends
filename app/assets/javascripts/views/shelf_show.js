window.Bookfriends.Views.ShelfShow = Backbone.CompositeView.extend({
  template: JST["bookshelves/show"],

  initialize: function(options) {
    // this.model (automatically) is a Bookfriends.Models.Bookshelf
    
    this.listenTo(this.model.books(), "sync", this.render);
    this.listenTo(this.model.books(), "add", this.addBook);
    this.listenTo(this.model.books(), "remove", this.removeBook);

    // TODO add functionality to add/remove books
    // Add subviews for books
    var parentView = this;

    this.model.books().each(function(book) {
      var bookShowView = new Bookfriends.Views.BookShow({
        model: book
      });
      parentView.addSubview(".book-container", bookShowView);
    });

  },

  addBook: function(book) {
    var bookShowView = new Bookfriends.Views.BookShow({
      model: book
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