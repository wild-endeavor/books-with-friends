window.Bookfriends.Views.ShelfIndex = Backbone.CompositeView.extend({

  initialize: function(options) {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    this.parentView = options.parentView; // this is the parent of this entire view

window.shelf_index = this.collection;
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.handleSync);
    this._activeShelf;
  },

  template: JST["bookshelves/index"],

  changeShelf: function(event) {
    event.preventDefault();
    var shelfId = $(event.currentTarget).data("id");
    var newShelf = this.collection.get(shelfId);
    if (newShelf) {
      this._activeShelf = newShelf;
      this.setActiveShelf();
    }
  },

  handleSync: function(collection) {
    if (!collection.models) { return; } // when adding a shelf, this runs for some reason.
    if (collection.models.length > 0) {
      this._activeShelf = (this._activeShelf || collection.models[0]);
      this.setActiveShelf();
    }
  },

  setActiveShelf: function(newShelf) {
    if (!newShelf) {
      newShelf = this._activeShelf || this.collection.models[0];
    }
    if (newShelf) {
      this.$el.find(".a-bookshelf-name").removeClass("active");
      this.$el.find(".a-bookshelf-name[data-id='" + newShelf.id + "']").addClass("active");
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
// ttt = this;
// s = shelf;
// debugger
    shelf.save({}, {
      success: function(model, response) {
        // debugger
        parentView.collection.add(shelf);
        parentView._activeShelf = shelf;
      }
    });
  },

  render: function() {
    var renderedContent = this.template({
      shelves: this.collection
    });
    this.$el.html(renderedContent);
    this.setActiveShelf();

    return this;
  }


});