window.Bookfriends.Views.RentalsHome = Backbone.CompositeView.extend({
  template: JST["rentals/home"],

  initialize: function(options) {
    // Application-wide collections
    this.listenTo(Bookfriends.Collections.rentalsMade, "sync", this.render);
    this.listenTo(Bookfriends.Collections.rentalsReceived, "sync", this.render);
    window.rental_home_view = this;
  },

  render: function() {
    // Pending requests are status in (N,A)
    var pendingRequests = Bookfriends.Collections.rentalsMade.filter(
      function(rental) {
        return rental.get("status") === "N" || rental.get("status") === "A";
      }
    );

    // Books you have out are D (show due date)
    var borrowedBooks = Bookfriends.Collections.rentalsMade.filter(
      function(rental) {
        return rental.get("status") === "D";
      }
    );

    // Recent History - Returned (R) and rejected (J) books
    var now = new Date();
    var rentalHistory = Bookfriends.Collections.rentalsMade.filter(
      function(rental) {
        var lastUpdated = new Date(rental.get("updated_at"));
        var daysDiff = (now - lastUpdated) / 86400000;

        return (rental.get("status") === "R" || rental.get("status") === "J")
          && daysDiff <= 21;
      }
    );

    // Requests that need your action are - N, A
    var actionNeeded = Bookfriends.Collections.rentalsReceived.filter(
      function(rental) {
        return rental.get("status") === "N" || rental.get("status") === "A";
      }
    );

    var renderedContent = this.template({
      pendingRequests: pendingRequests,
      borrowedBooks: borrowedBooks,
      rentalHistory: rentalHistory,
      actionNeeded: actionNeeded
    });

    this.$el.html(renderedContent);

    return this;
  }
});