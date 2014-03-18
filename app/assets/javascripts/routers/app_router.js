Trellino.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
      this.$rootEl = options.$rootEl
    },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow"
  },

  boardsIndex: function(){
    var indexView = new Trellino.Views.BoardIndexView({
      collection: Trellino.Collections.boards
    });

    this._swapView(indexView);
  },

  boardNew: function(){
    var board = new Trellino.Models.Board
    var newView = new Trellino.Views.BoardNewView({
      model: board
    });

    this._swapView(newView);
  },

  boardShow: function(id){
    var board =  Trellino.Collections.boards.getOrFetch(id)
    board.lists().fetch();

    var showView = new Trellino.Views.BoardShowView({
      model: board
    });

    this._swapView(showView);
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
});