window.Bookfriends.Collections.RentalsReceived = Backbone.Collection.extend({
  url: function() {
    return "/api/rentals_received";
  },

  model: Bookfriends.Models.Rental
});