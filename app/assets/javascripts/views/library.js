window.Bookfriends.Views.Library = Backbone.CompositeView.extend({

  attributes: {
    id: "library"
  }

  initialize: function(options) {
    this.collection = options.collection;  // remove later
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(this.collection.models[0].books(), "sync", this.render);

    // Make subviews for each of the bookshelves

    // shelves go into library-container in bookshelves/index
    // books go into the 

  },

  template: JST["bookshelves/index"],

  render: function() {
    var renderedContent = this.template({
      shelves: this.collection
    });
    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }

});