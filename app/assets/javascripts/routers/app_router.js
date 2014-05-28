window.Bookfriends.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "userShowLibrary",
    "search": "userShowSearch",
    "friends": "showFriendsIndex",
    "friendShow/:id": "showFriendLibrary",
    "rentals": "rentalsMain"
  },

  userShowLibrary: function() {
    this.initialize();

    var view = new Bookfriends.Views.Library({
      mode: "own",
      collection: Bookfriends.Collections.myShelves
    });

    this._swapView(view, "#main-content");
  },

  showFriendsIndex: function() {
    this.initialize();

    var view = new Bookfriends.Views.FriendsHome();

    this._swapView(view, "#main-content");
  },

// Application wide variables
// Bookfriends.Models.currentUser
// Bookfriends.Collections.myShelves
// Bookfriends.Collections.rentalsMade // misnomer, more like requests made
// Bookfriends.Collections.rentalsReceived
// Bookfriends.Collections.friendsBooks // not a real collection

  showFriendLibrary: function(friendId) {
    var friendIntId = parseInt(friendId);
    this.initialize();
    var router = this;
    Bookfriends.Models.currentUser.fetch({
      success: function() {
        var friend = Bookfriends.Models.currentUser.friends().get(friendIntId);
        var friendShelves = friend.shelves();
        friendShelves.fetch();

        var view = new Bookfriends.Views.Library({
          collection: friendShelves,
          mode: "friend",
          friendId: friendIntId
        });

        router._swapView(view, "#main-content");
      }
    });
  },

  userShowSearch: function() {
    var view = new Bookfriends.Views.SearchHome({
      collection: Bookfriends.Collections.myShelves
    });
    this._swapView(view, "#main-content");
  },

  rentalsMain: function () {
    this.initialize();

    var view = new Bookfriends.Views.RentalsHome();

    this._swapView(view, "#main-content");
  },

  initialize: function() {
    var bootstrappedInfo = JSON.parse($('#bstrapped-current-user').html());
    var userId = bootstrappedInfo.current_user_id;

    // Store your own user information
    Bookfriends.Models.currentUser = new Bookfriends.Models.User({ id: userId });
    Bookfriends.Models.currentUser.fetch();

    // Store all your own bookshelves
    Bookfriends.Collections.myShelves =
      new Bookfriends.Collections.Bookshelves([], {
        owner: Bookfriends.Models.currentUser,
        userId: userId
      });
    Bookfriends.Collections.myShelves.fetch();

    // Store all rental requests you've made and received
    Bookfriends.Collections.rentalsMade = new Bookfriends.Collections.Rentals();
    Bookfriends.Collections.rentalsMade.fetch();
    Bookfriends.Collections.rentalsReceived = new Bookfriends.Collections.RentalsReceived();
    Bookfriends.Collections.rentalsReceived.fetch();

    // Store all of your friends books as a hash of google_id to user id
    Bookfriends.Collections.friendsBooks = {};
    $.ajax({
      url: "/api/friends_books/",
      method: "GET",
      success: function(response) {
        Bookfriends.Collections.friendsBooks = response;
        // TODO?: re-render everything that needs to be re-rendered
        // this should be populated by the time a search
        // actually executes in any case
      }
    });
  },

  _swapView: function(view, selector) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;

    $(selector).html(view.render().$el);
  }

});