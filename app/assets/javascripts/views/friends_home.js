window.Bookfriends.Views.FriendsHome = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.shelvesCollection = options.shelvesCollection;
    this.user = options.user;
    this.listenTo(this.user.friends(), "add", this.render);
          // gets called N times where N is number of friends, change later
  },

  template: JST["friends/home"],

  render: function() {
    var renderedContent = this.template({
      friends: this.user.friends()
    });

    this.$el.html(renderedContent);
    return this;
  }

});