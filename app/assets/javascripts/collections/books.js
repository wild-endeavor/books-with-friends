window.Bookfriends.Collections.Books = Backbone.Collection.extend({

  model: Bookfriends.Models.Book,

  url: function() {
    return "/api/users/" + this.userId + "/books";
  }

});