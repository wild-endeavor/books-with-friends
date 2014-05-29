window.Bookfriends.Views.SearchHome = Backbone.CompositeView.extend({

  template: JST["search/home"],

  populateCatalog: function() {
    // Populate the catalog of books
    var catalog = this.bookCatalog = [];
    this.collection.each(function(shelf){
      shelf.books().each(function(book) {
        catalog.push(book.get("google_id"));
      });
    });
  },

  initialize: function() {
    // this.collection (automatically) is a Bookfriends.Collections.Bookshelves
    var shelves = this.collection;
    this.bookCatalog = []; // All the google_ids of books in the catalog
    this.listenTo(this.collection, "sync", this.populateCatalog);

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

    window.sh_view = this;

    // Active shelf object into which to add new books
    this._activeShelf;

    this.hasSearched = false;
    this.searchTerms = "";

    // TODO: Add initialization logic to this here and the router to set up another bookshelf
    // that contains not only all your books but also all your friends books.
    // Do this in order to match up all the books you and your friends have
    // against google API search results.
    // TODO: Use the titles of all the books as the initial search suggestion
    // instead of the fake stuff below.

    // Setup for typeahead-bloodhound and the google suggestion to work.
    this.searchSuggestions = [
      "math",
      "apple",
      "fuji"
    ];
    this.initializedBloodhound = false;

    this.cbTemp = function() {
      var args = [].slice.call(arguments);
      if ($.isArray(args[0])) {
        if ($.isArray(args[0][1]) && args[0][1].length > 0) {
          this.searchSuggestions = args[0][1].map( function(ele) { return ele[0]; });
          this.loadIntoBloodhound();      
        }
      }
      // console.log(this.searchSuggestions);
    };
    this.suggestCallBack = this.cbTemp.bind(this);
  },

  loadIntoBloodhound: function() {
    console.log("Adding to suggestions: ");
    console.log(this.searchSuggestions);
    this.engine.clear();
    this.engine.add(
      $.map(this.searchSuggestions, function(term) {
          return { value: term };
      })
    );
  },

  startBloodhound: function() {
    console.log(this.searchSuggestions);

    this.engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(this.searchSuggestions, function(state) { return { value: state }; })
    });
     
    // kicks off the loading/processing of `local` and `prefetch`
    this.engine.initialize();

    // Look for it inside the element since it's not in the DOM yet.     
    this.$('#bloodhound-search-area .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      displayKey: 'value',
      // `ttAdapter` wraps the suggestion engine in an adapter that
      // is compatible with the typeahead jQuery plugin
      source: this.engine.ttAdapter()
    });

    console.log(this.searchSuggestions);
  },

  addToUserLibrary: function(event, bookModel) {
    // will be sent from a book show view - already prevented default
    var view = this;
    if (this._activeShelf === undefined) {
      console.log("Please select a bookshelf to add to first.");
      return;
      // Maybe throw "No bookshelves";
    }
    bookModel.set("bookshelf_id", this._activeShelf.id);
    bookModel.save({},{
      success: function(model, response) {
        // this manual push is redundant, the books re-render is triggering before the
        // fetch here (which also updates the catalog).
        view.bookCatalog.push(model.get("google_id"));
        view.collection.fetch();
      }
    });
  },

  // shelf index view event will trigger changes to the active shelf
  // through this function
  changeActiveShelf: function(newShelf) {
    this._activeShelf = newShelf;
  },

  startSearchResultsView: function() {
    var shelfShowView = new Bookfriends.Views.ShelfShow({
      collection: this.collection,
      parentView: this,
      model: this.searchShelf,
      mode: "search"
    });
    this.addSubview("#main-search-results", shelfShowView);
    this.render();
  },

  events: {
    "keyup #main-search-box": "keyUpHandler",
    "submit #rental-request-form": "saveRentalRequest"
  },

  handleSearchResponse: function(response) {
    var parsedBooks = this.extractBooksData(response);
    // console.log(parsedBooks);
    if (!this.hasSearched) {
      this.hasSearched = true;
      this.startSearchResultsView();
    }
    this.searchShelf.set("name", "Search Results: " + this.searchTerms);
    this.searchShelf.books().set(parsedBooks);
  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    this.attachSubviews();
    
    if (!this.initializedBloodhound) {
      this.startBloodhound();
      this.initializedBloodhound = true;
    }
    console.log(this.searchSuggestions);

    return this;
  },

  keyUpHandler: function(event) {
    if (event.keyCode === 13) {   // if the user hits enter
      this.performSearch(event);
      return;
    }
    if (event.keyCode <= 46) {    // do nothing if control keys
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
  },

  requestBook: function(event, model) {
    var view = this;
    var friendId = parseInt($(event.target).parent().attr("data-id"));
    var friend = Bookfriends.Models.currentUser.friends().get(friendId);
    var tempBookCollection = new Bookfriends.Collections.Books();
    tempBookCollection.userId = friendId;
    tempBookCollection.fetch({
      data: {q: {google_id: model.get("google_id")}},
      success: function(responseCollection) {
        var bookInstance = responseCollection.first();
        if (bookInstance) {
          bookInstance.set("owner_id", friendId);
              // won't need this after we make owner_id a column in the db
          var headerContent = JST["books/rental"]({
            book: bookInstance,
            friend: friend
          });

          $("#book-request-modal-content").html(headerContent);
          $("#book-request-modal").modal("show");
        } else {
          console.log("Could not fetch book."); // replace with flash alert
        }
      }
    });
  },

  // same as library, exactly, should be factored out.
  saveRentalRequest: function(event) {
    event.preventDefault();
    var view = this;
    var rentalData = $(event.target).serializeJSON()["rental"];
    var rental = new Bookfriends.Models.Rental(rentalData);
    rental.save({}, {
      success: function(model, response) {
        console.log("successfully saved rental request");
        Bookfriends.Collections.rentalsMade.add(model);
        Bookfriends.Collections.rentalsMade.trigger("sync");
        $("#book-request-modal").modal("hide");
      },
      error: function(model, response) {
        var alertContent = JST["books/rental_alert"]({
          response: response
        });
        $("#book-request-modal .modal-header").prepend(alertContent);
      }
    });
  }


});