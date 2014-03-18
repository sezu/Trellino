Trellino.Models.List = Backbone.Model.extend({
  board: function() {
    return Trellino.Models.Board.get(this.board_id)
  },

  cards: function(){
    this.card_collection = this.card_collection ||
        new Trellino.Collections.Cards([], { list: this });

    return this.card_collection
  },

  parse: function(resp) {
    if(resp.cards){
      this.cards().set(resp.cards);
      delete resp.cards;
    }
    return resp
  }
});