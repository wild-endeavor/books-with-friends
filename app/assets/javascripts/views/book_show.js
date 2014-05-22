window.Bookfriends.Views.BookShow = Backbone.View.extend({

  initialize: function(options) {
    // this.model (automatically) is a Bookfriends.Models.Book

    this.listenTo(this.model, "sync", this.render);

  },

  template: JST["books/show"],

  render: function() {
    var renderedContent = this.template({
      book: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }

});