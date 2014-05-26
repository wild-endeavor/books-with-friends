window.Bookfriends.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "userShowLibrary",
    "search": "userShowSearch",
    "friends": "showFriendsIndex",
    "friendShow": "showFriendLibrary"
  },

  userShowLibrary: function() {
    var currentUser = JSON.parse($('#bstrapped-current-user').html());
    var shelves = Bookfriends.Collections.shelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: currentUser.current_user_id
      });
    shelves.fetch();

    // TODO - Make the backend return an empty array if the user
    //        does not have any bookshelves

    var view = new Bookfriends.Views.Library({
      collection: shelves
    });

    this._swapView(view, "#main-content");
  },

  showFriendsIndex: function() {
    var cu = JSON.parse($('#bstrapped-current-user').html());
    var currentUser = new Bookfriends.Models.User ({ id: cu.current_user_id});
    cu.fetch();

    // var shelves = Bookfriends.Collections.shelves =
    //   new Bookfriends.Collections.Bookshelves([], {
    //     userId: cu.current_user_id
    //   });
    // shelves.fetch();

    // var view = new Bookfriends.Views.FriendsHome({
    //   collection_shelves: shelves
    // });



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