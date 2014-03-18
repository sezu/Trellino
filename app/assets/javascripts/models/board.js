Trellino.Models.Board = Backbone.Model.extend({
  lists: function(){
    this.list_collection = this.list_collection ||
        new Trellino.Collections.Lists([], { board: this });

    return this.list_collection
  }
});