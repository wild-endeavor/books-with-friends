window.Bookfriends.Collections.Rentals = Backbone.Collection.extend({
  url: function() {
    return "/api/rentals";
  },

  model: Bookfriends.Models.Rental
});