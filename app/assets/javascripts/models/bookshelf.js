window.Bookfriends.Models.Bookshelf = Backbone.Model.extend({
  url: function() {
    if (this.isNew()) {
      return "/api/users/" + this.escape("user_id") + "/bookshelves";
    } else {
      return "api/bookshelves/" + this.id;
    }
  },

  books: function() {
    if (!this._books) {
      this._books = new Bookfriends.Collections.Books([],{
        parentBookshelf: this
      });
    }
    return this._books;
  },

  parse: function(jsonResponse) {
    if (jsonResponse.books) {
      this.books().set(jsonResponse.books, {parse: true});
      delete jsonResponse.books;
    }
    return jsonResponse;
  }

});