window.Bookfriends = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    window.router = new Bookfriends.Routers.AppRouter();
    Backbone.history.start();
    window.qqq;
  }
};

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    // Attach subview element and may as well render.
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    // Bind events in case subview has previously been removed from DOM
    subview.delegateEvents();
  },

  delegateEvents: function() {
    Backbone.View.prototype.delegateEvents.call(this);
    // Recursively call delegateEvents -- we need this because parent views
    // are removed (thus removing their children) after children
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.delegateEvents(); 
      });
    });
  },

  attachSubviews: function () {
    // * The user of CompositeView should explicitly render the
    //   subview themself when they build the subview object.
    // * The subview should listenTo relevant events and re-render
    //   itself.
    // All that is necessary is "attaching" the subview `$el`s to the
    // relevant points in the parent CompositeView.

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      // alert("Emptying " + selector);
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
