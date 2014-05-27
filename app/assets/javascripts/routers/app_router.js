window.Bookfriends.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "userShowLibrary",
    "search": "userShowSearch",
    "friends": "showFriendsIndex",
    "friendShow/:id": "showFriendLibrary",
    "rentals": "rentalsMain"
  },

  userShowLibrary: function() {
    var currentUser = JSON.parse($('#bstrapped-current-user').html());
    var shelves = Bookfriends.Collections.shelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: currentUser.current_user_id
      });
    shelves.fetch();

    var view = new Bookfriends.Views.Library({
      friendView: false,
      friendShelves: undefined,
      collection: shelves
    });

    this._swapView(view, "#main-content");
  },

  showFriendsIndex: function() {
    var cu = JSON.parse($('#bstrapped-current-user').html());
    var currentUser = new Bookfriends.Models.User ({ id: cu.current_user_id});
    currentUser.fetch();

    window.cu = currentUser;

    var shelves = Bookfriends.Collections.shelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: cu.current_user_id
      });
    shelves.fetch();

    var view = new Bookfriends.Views.FriendsHome({
      shelvesCollection: shelves,
      user: currentUser
    });

    this._swapView(view, "#main-content");
  },

  showFriendLibrary: function(friendId) {
    var cu = JSON.parse($('#bstrapped-current-user').html());
    var currentUser = new Bookfriends.Models.User({ id: cu.current_user_id });
    currentUser.fetch();
    Bookfriends.Models.current_user = currentUser;
    window.showf = this;

    var yourShelves = Bookfriends.Collections.shelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: cu.current_user_id
      });
    yourShelves.fetch();

    var friendShelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: friendId
      });
    friendShelves.fetch();

    var view = new Bookfriends.Views.Library({
      friendShelves: friendShelves,
      collection: yourShelves,
      friendView: true,
      friendId: friendId,
      currentUser: currentUser
    });
    window.lib_view = view;

    this._swapView(view, "#main-content");
  },

  userShowSearch: function() {
    var currentUser = JSON.parse($('#bstrapped-current-user').html());
    var shelves = Bookfriends.Collections.shelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: currentUser.current_user_id
      });
    shelves.fetch();

    var view = new Bookfriends.Views.SearchHome({
      collection: shelves
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
        userId: userId
      });
    Bookfriends.Collections.myShelves.fetch();

    // Store all rental requests you've made and received
    var tempRequests = new Bookfriends.Collections.Rentals();
    Bookfriends.Collections.rentalsMade = new Bookfriends.Collections.Rentals();
    Bookfriends.Collections.rentalsReceived = new Bookfriends.Collections.Rentals();
    tempRequests.fetch({
      success: function() {
        // The use of these pseudo-collections is slightly awkward - have to make sure
        // they are never actually synced with the db, which would pull _all_ the requests
        // Maybe try to freeze them somehow?
        // Manually trigger sync for now
        Bookfriends.Collections.rentalsMade.set(tempRequests.where({source_user: userId}));
        Bookfriends.Collections.rentalsMade.trigger("sync");
        Bookfriends.Collections.rentalsReceived.set(tempRequests.where({dest_user: userId}));
        Bookfriends.Collections.rentalsReceived.trigger("sync");
        tempRequests = undefined;
      }
    });

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