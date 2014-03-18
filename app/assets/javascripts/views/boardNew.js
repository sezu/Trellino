Trellino.Views.BoardNewView = Backbone.View.extend({
  template: JST['boards/new'],

  events: {"submit #board-form": "submit"},

  render: function(){
    var content = this.template({});
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["board"];

    Trellino.Collections.boards.create(params, {
      success: function () {
        Backbone.history.navigate("", { trigger: true});
      }
    });
  }

});