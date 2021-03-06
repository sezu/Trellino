Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  url: function() {
    return this.board.url() + "/lists"
  },

  initialize: function(model, options) {
    this.board = options.board;
  },

  comparator: function(list) {
    return list.get("rank");
  }
});