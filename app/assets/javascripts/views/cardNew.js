Trellino.Views.CardNewView = Backbone.View.extend({
  template: JST["cards/new"],

  events: {"submit #new-card-form": "submit"},

  initialize: function(options) {
    this.list = options.list;
    this.parentView = options.parentView;
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    this.parentView.removeSubview("#card-form", this);

    var params = $(event.currentTarget).serializeJSON()["card"];

    _.extend(params, {
      list_id: this.list.id,
      rank: this.list.cards().length + 1
    });

    this.list.cards().create(params, {
      wait: true
    });
  }
});