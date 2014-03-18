Trellino.Views.ListNewView = Backbone.View.extend({
  template: JST['lists/new'],

  events: {"submit #new-list-form": "submit"},

  initialize: function(options) {
    this.board = options.board;
    this.parentView = options.parentView;
  },

  render: function(){
    var content = this.template({});
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    this.parentView.removeSubview("#list-form", this);

    var params = $(event.currentTarget).serializeJSON()["list"];

    _.extend(params, {
      board_id: this.board.id,
      rank: this.board.lists().length + 1
    });

    var view = this;

    this.board.lists().create(params, { wait: true })
  }
});