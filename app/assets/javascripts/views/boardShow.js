Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function(options) {
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);

    this.model.lists().each(this.addList.bind(this));
  },

  events: {
    "click #add-list-btn": "addListForm",
    "sortstop .sortable-board": "updateBoard"
  },

  updateBoard: function(event, ui) {
    var newRank = null;
    var boardItem = ui.item;

    var prevRank = ui.item.prev().find(".list-data").data("rank");
    var nextRank = ui.item.next().find(".list-data").data("rank");

    if(!prevRank) {
      //less than first list item
      newRank = nextRank/2
    } else if(!nextRank) {
      //greater than last list item but less than 1
      newRank = prevRank + (1 - (prevRank % 1)) / 2
    } else {
      newRank = (prevRank + nextRank)/2
    }

    var listId = ui.item.find(".list-data").data("id");
    var list = this.model.lists().get(listId);

    list.save({ rank: newRank }, {
      success: function() {
        boardItem.find(".list-data").data("rank", newRank);
      }
    });
},

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    var $sortable = $(this.$el.find(".sortable-board"));
    $sortable.sortable();

    this.renderSubviews();
    return this;
  },

  addListForm: function(event) {
    event.preventDefault();
    $("#add-list-btn").addClass("hidden")

    var listNew = new Trellino.Views.ListNewView({
      parentView: this,
      board: this.model
    });

    this.addSubview("#list-form", listNew);
    listNew.render();
  },

  addList: function (list) {
    $("#add-list-btn").attr("class","")

    var listShowView = new Trellino.Views.ListShowView({
      model: list
    });

    this.addSubview("#lists", listShowView);
    listShowView.render();
  },

  removeList: function(list) {
    var listShowView =  _(this.subviews()["#lists"]).find(function (subview) {
        return subview.model == list;
      });

    this.removeSubview("#lists", listShowView)
  }
});