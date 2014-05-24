window.Bookfriends.Views.ShelfIndex = Backbone.CompositeView.extend({

  initialize: function(options) {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    this.parentView = options.parentView; // this is the parent of this entire view

    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.handleSync);
    this.listenTo(this.collection, "add", this.render);
  },

  template: JST["bookshelves/index"],

  changeShelf: function(event) {
    this.$el.find(".a-bookshelf-name").removeClass("active");
    $(event.currentTarget).addClass("active");
    var shelfId = $(event.currentTarget).data("id");
    var newShelf = this.collection.get(shelfId);
    if (newShelf) {
      this.parentView.changeActiveShelf.bind(this.parentView)(newShelf);
    }
  },

  handleSync: function(collection) {
    if (collection.models.length > 0) {
      this.$el.find(".a-bookshelf-name").removeClass("active");
      this.$el.find(".a-bookshelf-name[data-id='" + collection.models[0].id + "']").addClass("active");
      this.setActiveShelf(collection.models[0])
    }
  },

  setActiveShelf: function(newShelf) {
    if (!newShelf) {
      newShelf = this.collection.models[0];
    }
    if (newShelf) {
      this.parentView.changeActiveShelf.bind(this.parentView)(newShelf);
    }
  },

  events: {
    "click .a-bookshelf-name": "changeShelf",
    "click button.add-bookshelf": "addBookshelf",
    "submit form#new-bookshelf-form": "newBookshelfSubmit"
  },

  addBookshelf: function(event) {
    this.$("input#new-bookshelf").show();
    $(event.currentTarget).hide()
  },

  newBookshelfSubmit: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    _(data.bookshelf).extend({ user_id: this.collection.userId });
    var shelf = new Bookfriends.Models.Bookshelf(data["bookshelf"]);
    var parentView = this;
    shelf.save({}, {
      success: function(response) {
        debugger
        parentView.collection.add(shelf);
      }
    });
  },

  render: function() {
    var renderedContent = this.template({
      shelves: this.collection
    });
    this.$el.html(renderedContent);
    // this.attachSubviews();

    return this;
  }


});