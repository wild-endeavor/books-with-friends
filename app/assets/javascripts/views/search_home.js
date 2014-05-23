window.Bookfriends.Views.SearchHome = Backbone.CompositeView.extend({

  template: JST["search/home"],

  initialize: function() {
    this.shelf = new Bookfriends.Models.Bookshelf();

    // TODO: Add initialization logic to this here and the router to set up another bookshelf
    // that contains not only all your books but also all your friends books.
    // Do this in order to match up all the books you and your friends have
    // against google API search results.

    this.listenTo(this.shelf.books(), "sync", this.render);
    this.listenTo(this.shelf.books(), "add", this.addBook);
    this.listenTo(this.shelf.books(), "remove", this.removeBook);
  },

  addBook: function(book) {
    var bookShowView = new Bookfriends.Views.BookShow({
      model: book
    });
    this.addSubview("#main-search-results", bookShowView);
  },

  removeBook: function(book) {
    var subview = _.find(this.subviews("#main-search-results"),
      function(subview) {
        return subview.model === book;
      }
    );
    this.removeSubview("#main-search-results", subview);
  },

  events: {
    "keyup #main-search-box": "keyUpHandler"
  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  keyUpHandler: function(event) {
    if (event.keyCode === 13) {   // if the user hits enter
      this.performSearch(event);
      return;
    }
    // http://suggestqueries.google.com/complete/search?client=books&ds=bo&q=monxxxxx
  },

  performSearch: function(event) {
    searchString = event.target.value;

    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes",
      dataType: "json",
      data: {
        q: searchString,
        maxResults: 20,
        printType: "books",
        projection: "lite"
      },
      success: this.handleSearchResponse.bind(this)
    });
  },

  handleSearchResponse: function(response) {
    var parsedBooks = this.extractBooksData(response);
    console.log(parsedBooks);
    this.shelf.books().set(parsedBooks);
  },

  extractBooksData: function(response) {
    var results = [];
    response.items.forEach(function(item) {
      var volume = {};
      _(volume).extend({
        google_id: item["id"] ,
        title: item["volumeInfo"]["title"] || "",
        subtitle: item["volumeInfo"]["subtitle"],
        author: item["volumeInfo"]["authors"] ? item["volumeInfo"]["authors"][0] : "",
        selfLink: item["selfLink"],
        thumbnail: item["volumeInfo"]["imageLinks"] ?
            item["volumeInfo"]["imageLinks"]["thumbnail"] : undefined,
        smallThumbnail: item["volumeInfo"]["imageLinks"] ? 
            item["volumeInfo"]["imageLinks"]["smallThumbnail"] : undefined
      });
      results.push(volume);
    });
    return results;
  }



});