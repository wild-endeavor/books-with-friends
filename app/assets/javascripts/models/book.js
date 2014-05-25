window.Bookfriends.Models.Book = Backbone.Model.extend({
  url: function() {
    if (this.isNew()) {
      return "/api/bookshelves/" + this.escape("bookshelf_id") + "/books";
    } else {
      return "/api/books/" + this.id;
    }
  }

});