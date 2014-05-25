
Originally in shelf_index.js
  // addShelf: function (shelf) {
  //   var shelfShowView = new Bookfriends.Views.ShelfShow({
  //     model: shelf
  //   });
  //   this.addSubview("#bookshelf-container", shelfShowView);
  // },

  // removeShelf: function(shelf) {
  //   var subview = _.find(this.subviews("#bookshelf-container"),
  //     function (subview) {
  //       return subview.model === shelf;
  //     }
  //   );
  //   this.removeSubview("#bookshelf-container", subview);
  // },



    startBloodhound: function() {
    this.engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("val"),
      // datumTokenizer: function(d) { debugger; return Bloodhound.tokenizers.whitespace(d.val); },
      // datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.val); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: $.map(this.searchSuggestions, function(term) { return { val: term }; })
    });
    window.bh_engine = this.engine;
 
    // kicks off the loading/processing of `local` and `prefetch`
    this.engine.initialize();
 
    $('#bloodhound-search-area .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'searchSuggestions',
      displayKey: 'value',
      // `ttAdapter` wraps the suggestion engine in an adapter that
      // is compatible with the typeahead jQuery plugin
      source: this.engine.ttAdapter()
    });
  },
