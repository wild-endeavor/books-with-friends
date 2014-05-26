window.Bookfriends.Models.Rental = Backbone.Model.extend({
  url: function() {
    if (this.isNew()) {
      return "/api/users/" + this.escape("dest_user") + "/rentals";
    }
    return "/api/rentals/" + this.id;
  }

});