window.Bookfriends.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "userShowLibrary",
    "search": "userShowSearch",
    "friends": "showFriendsIndex",
    "friendShow/:id": "showFriendLibrary"
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

  _swapView: function(view, selector) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;

    $(selector).html(view.render().$el);
  }

});