window.Bookfriends.Models.Bookshelf = Backbone.Model.extend({

  books: function() {
    if (!this._books) {
      this._books = new Bookfriends.Collections.Books([],{
        parentBookshelf: this
      });
    }
    return this._books;
  },

  parse: function(jsonResponse) {
    debugger
    if (jsonResponse.books) {
      this.books().set(jsonResponse.books, {parse: true});
      delete jsonResponse.books;
    }
    return jsonResponse;
  }

});