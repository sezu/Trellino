Trellino.Collections.Boards = Backbone.Collection.extend({
  model: Trellino.Models.Board,
  url: "/boards",

  getOrFetch: function(id) {
     var model;
     var collection = this;

     if(model = this.get(id)) {
       model.fetch();

     } else {
       model = new Trellino.Models.Board({id: id});
       model.fetch({
         success: function() { collection.add(model) }
       });
     }
     return model;
   }
});