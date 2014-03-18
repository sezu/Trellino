Trellino.Views.BoardIndexView = Backbone.View.extend({
  template: JST['boards/index'],

  initialize: function() {
    this.listenTo(this.collection, "remove", this.render)
  },

  events: {
    "click .remove-board-btn": "destroyBoard"
  },

  render: function() {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);

    return this;
  },

  destroyBoard: function(event) {
    event.preventDefault();
    var board_id = $(event.currentTarget).data("id")
    var board = Trellino.Collections.boards.get(board_id)
    board.destroy()
  }
});