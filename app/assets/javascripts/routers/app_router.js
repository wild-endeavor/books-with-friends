window.Bookfriends.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "shelvesIndex",
    "search": "searchHome"
  },

  shelvesIndex: function() {
    $("#search").html("");

    var currentUser = JSON.parse($('#bstrapped-current-user').html());
    var shelves = Bookfriends.Collections.shelves =
      new Bookfriends.Collections.Bookshelves([], {
        userId: currentUser.current_user_id
      });

    // TODO - Make the backend return an empty array if the user
    //        does not have any bookshelves
    shelves.fetch();

    var view = new Bookfriends.Views.Library({
      collection: shelves
    });

    this._swapView(view, "#library");
  },

  searchHome: function() {
    $("#library").html("");
    var view = new Bookfriends.Views.SearchHome();
    this._swapView(view, "#search");
  },

  _swapView: function(view, selector) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;

    $(selector).html(view.render().$el);
  }

});