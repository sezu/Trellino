Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,
  url: "/cards",

  initialize: function(model, options) {
    this.list = options.list
  },

  comparator: function(card) {
    return card.get("rank");
  }
});