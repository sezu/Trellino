Trellino.Views.CardShowView = Backbone.View.extend({
  tagName: "li",
  className: "card_entry",

  template: JST["cards/show"],

  render: function(){
    var content = this.template({ card: this.model })
    this.$el.html(content);

    return this;
  }
})