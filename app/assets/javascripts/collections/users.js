window.Bookfriends.Collections.Friends = Backbone.Collection.extend({
  model: Bookfriends.Models.User,

  initialize: function(options) {
    this.sourceFriend = options.sourceFriend;
  } 

});