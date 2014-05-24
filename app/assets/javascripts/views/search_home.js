window.Bookfriends.Views.SearchHome = Backbone.CompositeView.extend({

  template: JST["search/home"],

  initialize: function() {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    var shelves = this.collection;

    // this.listenTo(this.collection, "sync", this.startShelf);

    // Make subview for the sidebar
    var shelfIndexView = new Bookfriends.Views.ShelfIndex({
      collection: shelves,
      parentView: this
    });
    this.addSubview("#bookshelf-list", shelfIndexView);

    // Main shelf object into which to store search results
    this.searchShelf = new Bookfriends.Models.Bookshelf({
      name: "Search Results"
    });

    // Active shelf object into which to add new books
    this._activeShelf;

    this.hasSearched = false;
    this.searchTerms = "";

    // TODO: Add initialization logic to this here and the router to set up another bookshelf
    // that contains not only all your books but also all your friends books.
    // Do this in order to match up all the books you and your friends have
    // against google API search results.

    // Setup for typeahead-bloodhound and the google suggestion to work.
    this.searchSuggestions = [];
    this.initializedBloodhound = false;
    this.cbTemp = function() {
      var args = [].slice.call(arguments);
      if ($.isArray(args[0])) {
        if ($.isArray(args[0][1]) && args[0][1].length > 0) {
          this.searchSuggestions = args[0][1].map( function(ele) { return ele[0]; });
          this.startBloodhound();      
        }
      }
      console.log(this.searchSuggestions);
    };
    this.suggestCallBack = this.cbTemp.bind(this);
  },

  resetBloodhound: function() {
    this.engine.clear();
    this.engine.add($.map(this.searchSuggestions, function(term) {
      return { value: term };
    }));
  },

  startBloodhound: function() {
    if (this.initializedBloodhound) {
      this.resetBloodhound();
      return;
    }
    this.initializedBloodhound = true;

    this.engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // `states` is an array of state names defined in "The Basics"
      local: $.map(this.searchSuggestions, function(term) { return { value: term }; })
    });
 
    // kicks off the loading/processing of `local` and `prefetch`
    this.engine.initialize();
 
    $('#bloodhound-search-area .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'search_suggestions',
      displayKey: 'value',
      // `ttAdapter` wraps the suggestion engine in an adapter that
      // is compatible with the typeahead jQuery plugin
      source: this.engine.ttAdapter()
    });
  },

  // shelf index view event will trigger changes to the active shelf
  // through this function
  changeActiveShelf: function(newShelf) {
    this._activeShelf = newShelf;
  },

  startSearchResultsView: function() {
    this.hasSearched = true;
    var shelfShowView = new Bookfriends.Views.ShelfShow({
      collection: this.collection,
      model: this.searchShelf
    });
    this.addSubview("#main-search-results", shelfShowView);
    this.render();
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

    var searchString = event.target.value;
    if (searchString.length >= 3) {
      $.ajax({
        url: "http://suggestqueries.google.com/complete/search?client=books",
        data: {
          hl: "en",
          ds: "bo",
          client: "books",
          q: searchString
        },
        dataType: "jsonp",
        success: this.suggestCallBack
      });
    } else {
      this.searchSuggestions = [];
    }
  },

  performSearch: function(event) {
    var searchString = event.target.value;
    this.searchTerms = searchString;

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
    // console.log(parsedBooks);
    if (!this.hasSearched) {
      this.hasSearched = true;
      this.startSearchResultsView();
    }
    this.searchShelf.books().set(parsedBooks);
    this.searchShelf.name = "Search Results: " + this.searchTerms;
    this.$el.find("#main-search-box").val("");
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