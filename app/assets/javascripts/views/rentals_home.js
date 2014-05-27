window.Bookfriends.Views.RentalsHome = Backbone.CompositeView.extend({
  template: JST["rentals/home"],

  initialize: function(options) {

  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }
});