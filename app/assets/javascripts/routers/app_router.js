window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow",
    "boards/:id/lists/new": "listsNew",
  },
  
  boardsIndex: function() {
    var indexView = new Trellino.Views.boardsIndex({
      collection: Trellino.Collections.boards
    });
    Trellino.Collections.boards.fetch();
    this._swapView(indexView);
  },
  
  boardsNew: function() {
    var newView = new Trellino.Views.boardsNew();
    this._swapView(newView);
  },
  
  boardsShow: function(id) {
    var showModel = Trellino.Collections.boards.getOrFetch(id);
    var showView = new Trellino.Views.boardsShow({
      model: showModel
    });
    this._swapView(showView);
  },
  
  // listsNew: function(id) {
  //   var showModel = Trellino.Collections.boards.getOrFetch(id);
  //   var newView = new Trellino.Views.listsNew( {model: showModel} );
  //   this._swapView(newView);
  // },
    
  _swapView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    $("#content").html(view.render().$el);
  },
});

