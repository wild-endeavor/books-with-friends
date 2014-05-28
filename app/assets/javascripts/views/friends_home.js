window.Bookfriends.Views.FriendsHome = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.listenTo(Bookfriends.Models.currentUser.friends(), "add", this.render);
        // gets called N times where N is number of friends, change later
  },

  template: JST["friends/home"],

  render: function() {
    var renderedContent = this.template({
      friends: Bookfriends.Models.currentUser.friends()
    });

    this.$el.html(renderedContent);
    return this;
  }

});