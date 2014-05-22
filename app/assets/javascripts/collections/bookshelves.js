window.Bookfriends.Collections.Bookshelves = Backbone.Collection.extend({
  model: Bookfriends.Models.Bookshelf,

  initialize: function(options) {
    this.userId = options.userId;
  },

  url: function() {
    return "/api/users/" + this.userId + "/bookshelves";
  }
});
