window.Bookfriends.Views.SearchHome = Backbone.CompositeView.extend({

  template: JST["search/home"],

  initialize: function() {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    var shelves = this.collection;

    this.shelf = new Bookfriends.Models.Bookshelf();

    // Make subviews for the sidebar
    var shelfIndexView = new Bookfriends.Views.ShelfIndex({
      collection: shelves,
      parentView: this
    });
    this.addSubview("#bookshelf-list", shelfIndexView);

    // Make a subview for the main shelf show area
    this.replaceShelfView(shelves.models[0] || new Bookfriends.Models.Bookshelf());

    // TODO: Add initialization logic to this here and the router to set up another bookshelf
    // that contains not only all your books but also all your friends books.
    // Do this in order to match up all the books you and your friends have
    // against google API search results.

    this.listenTo(this.shelf.books(), "sync", this.render);
    this.listenTo(this.shelf.books(), "add", this.addBook);
    this.listenTo(this.shelf.books(), "remove", this.removeBook);

    this.searchSuggestions = [];
    this.initializedBloodhound = false;

  },

  // addBook: function(book) {
  //   var bookShowView = new Bookfriends.Views.BookShow({
  //     model: book
  //   });
  //   this.addSubview("#main-search-results", bookShowView);
  // },

  // removeBook: function(book) {
  //   var subview = _.find(this.subviews("#main-search-results"),
  //     function(subview) {
  //       return subview.model === book;
  //     }
  //   );
  //   this.removeSubview("#main-search-results", subview);
  // },

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

    var searchString = event.target.value;

    // if (searchString.length >= 3) {
    //   $.ajax({
    //     url: "http://suggestqueries.google.com/complete/search?client=books",
    //     data: {
    //       ds: "bo",
    //       q: searchString
    //     },
    //     dataType: "json",
    //     success: "handleSearchSuggestions"
    //   });
    // } else {
    //   this.searchSuggestions = [];
    // }
  },

  handleSearchSuggestions: function(response) {
    console.log(response);
    debugger;
  },

  performSearch: function(event) {
    var searchString = event.target.value;

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

  startBloodhound: function() {
    this.initializedBloodhound = true;

    this.BhObj = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(this.searchSuggestions, function(suggestion) {
        return { value: suggestion };
      })
    });
     
    // kicks off the loading/processing of `local` and `prefetch`
    this.BhObj.initialize();
     
    $('#bloodhound-search-area .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'BhObj', // what is this name for???
      displayKey: 'value',
      // `ttAdapter` wraps the suggestion engine in an adapter that
      // is compatible with the typeahead jQuery plugin
      source: this.BhObj.ttAdapter()
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
        self_link: item["selfLink"],
        thumbnail: item["volumeInfo"]["imageLinks"] ?
            item["volumeInfo"]["imageLinks"]["thumbnail"] : undefined,
        thumbnail_small: item["volumeInfo"]["imageLinks"] ? 
            item["volumeInfo"]["imageLinks"]["smallThumbnail"] : undefined
      });
      results.push(volume);
    });
    return results;
  }



});