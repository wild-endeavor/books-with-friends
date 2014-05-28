window.Bookfriends.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  url: function () {
    return "/api/users/";
  },

  friends: function() {
    if (!this._friends) {
      this._friends = new Bookfriends.Collections.Friends([],{
        sourceFriend: this
      });
    }
    return this._friends;
  },

  shelves: function() {
    if (!this._shelves) {
      this._shelves = new Bookfriends.Collections.Bookshelves([],{
        owner: this,
        userId: this.id
      });
    }
    return this._shelves;
  },

  parse: function(jsonResponse) {
    this.friends().set(jsonResponse.friends, {parse: true});
    delete jsonResponse.friends;
    return jsonResponse;
  }
})