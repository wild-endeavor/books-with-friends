window.Bookfriends.Views.RentalsHome = Backbone.CompositeView.extend({
  template: JST["rentals/home"],

  initialize: function(options) {
    // Application-wide collections
    this.listenTo(Bookfriends.Collections.rentalsMade, "sync", this.render);
    this.listenTo(Bookfriends.Collections.rentalsReceived, "sync change", this.render);
    window.rental_home_view = this;
  },

  events: {
    "click button.mark-as-approved": "markAsApproved",
    "click button.mark-as-delivered": "markAsDelivered",
    "click button.mark-as-returned": "markAsReturned"
  },

  markAsApproved: function(event) {
    event.preventDefault();
    var rentalId = parseInt($(event.target).parent().attr("data-id"));
      var rental = Bookfriends.Collections.rentalsReceived.findWhere({
        id: rentalId
      });
    rental.set("status", "A");
    rental.save();
  },

  markAsDelivered: function(event) {
    event.preventDefault();
    var rentalId = parseInt($(event.target).parent().attr("data-id"));
    var rental = Bookfriends.Collections.rentalsReceived.findWhere({
      id: rentalId
    });
    rental.set("status", "D");
    rental.save();
  },

  markAsReturned: function(event) {
    event.preventDefault();
    var rentalId = parseInt($(event.target).parent().attr("data-id"));
    var rental = Bookfriends.Collections.rentalsReceived.findWhere({
      id: rentalId
    });
    rental.set("status", "R");
    rental.save();
  },

  render: function() {
    // What the rental object should look like:
      // {
      //   "source_user": 5,
      //   "dest_user": 3,
      //   "approve_date": null,
      //   "delivery_date": null,
      //   "due_date": "2014-06-16",
      //   "status": "N",
      //   "message": "    ",
      //   "created_at": "2014-05-26T22:31:59.875Z",
      //   "updated_at": "2014-05-26T22:31:59.875Z",
      //   "google_id": "OXAEg36BsfoC",
      //   "book_id": 18,
      //   "id": 3,
      //   "title": "Title Text",
      //   "author": "John Smith",
      //   "thumbnail": "web address",
      //   "thumbnail_small": "web address",
      //   "source_email": "rory@tardis.com",
      //   "source_id": 5,
      //   "dest_email": "eve@swift.com",
      //   "dest_id": 3
      // },

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

    // Books that you have lent out - Delivered
    var lentBooks = Bookfriends.Collections.rentalsReceived.filter(
      function(rental) {
        return rental.get("status") === "D";
      }
    );

    var renderedContent = this.template({
      pendingRequests: pendingRequests,
      borrowedBooks: borrowedBooks,
      rentalHistory: rentalHistory,
      actionNeeded: actionNeeded,
      lentBooks: lentBooks
    });

    this.$el.html(renderedContent);

    return this;
  }
});