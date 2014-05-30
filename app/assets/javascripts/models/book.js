window.Bookfriends.Models.Book = Backbone.Model.extend({
  url: function() {
    if (this.isNew()) {
      return "/api/bookshelves/" + this.escape("bookshelf_id") + "/books";
    } else {
      return "/api/books/" + this.id;
    }
  },

  getActiveBorrowRequests: function() {
    var model = this;
    var allRequests = Bookfriends.Collections.rentalsMade.filter(function(request) {
      return request.escape("google_id") === model.get("google_id");
    });
    var requests = allRequests.filter(function(request) {
      return request.get("status") === "N" ||
             request.get("status") === "A" ||
             request.get("status") === "D"
    });
    return requests;
  }

});