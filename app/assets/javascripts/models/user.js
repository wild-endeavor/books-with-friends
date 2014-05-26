window.Bookfriends.Models.User = Backbone.Model.extend({
  url: function () {
    return "/api/users/" + this.id;
  },

  friends: function() {
    if (!this._friends) {
      this._friends = new Bookfriends.Collections.Friends([],{
        sourceFriend: this
      });
      return this._friends;
    }
  },


  parse: function(jsonResponse) {
    debugger
    return jsonResponse;
  }
})