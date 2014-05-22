window.Bookfriends.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "shelvesIndex"
  },

  shelvesIndex: function() {
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
    // qqq = view;

    this._swapView(view);
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;

    $('#library').html(view.render().$el);
  }

});