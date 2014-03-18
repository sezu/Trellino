Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  tagName: "li",
  className: "list_entry",
  template: JST['lists/show'],

  initialize: function(){
    this.cardBtn = "#add-card" + this.model.id

    this.listenTo(this.model.cards(), "add", this.addCard);

    this.model.cards().each(this.addCard.bind(this));
  },

  events: {
    "click .add-card": "addCardForm",
    "sortupdate .sortable-list": "updateList",
    "click .pop": "togglePopover",
    "click .destroy-list": "destroyList"
  },

  togglePopover: function(event) {
    event.preventDefault();

    $("#popover" + this.model.id).popover({
      "html": "true",
      "content": "<button class='destroy-list'>Delete</button>"
    });
  },

  updateList: function(event, ui) {
    event.stopPropagation();

    var newRank = null;
    var listItem = ui.item;
    var prevRank = ui.item.prev().find(".data").data("rank");
    var nextRank = ui.item.next().find(".data").data("rank");

    if(!prevRank) {
      //less than first list item
      newRank = nextRank/2
    } else if(!nextRank) {
      //greater than last list item but less than 1
      newRank = prevRank + (1 - (prevRank % 1)) / 2
    } else {
      newRank = (prevRank + nextRank)/2
    }

    var cardId = ui.item.find(".data").data("id");
    var card = this.model.cards().get(cardId);
    //var listId = this.model.id
    //list_id: listId

    card.save({ rank: newRank}, {
      success: function() {
        listItem.find(".data").data("rank", newRank);
      }
    });
  },

  render: function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);

    $("#popover" + this.model.id).popover({
      "html": "true",
      "content": "<button class='destroy-list'>Delete</button>"
    });

    var $sortable = $(this.$el.find(".sortable-list"));
    $sortable.sortable();
    $sortable.sortable({
      connectWith: ".sortable-list"
    })

    this.renderSubviews();
    return this;
  },

  addCardForm: function(event) {
    event.preventDefault();
    $(this.cardBtn).addClass("hidden");

    cardNew = new Trellino.Views.CardNewView({
      parentView: this,
      list: this.model
    });

    this.addSubview("#card-form", cardNew)
    cardNew.render();
  },

  addCard: function(card) {
    $(this.cardBtn).attr("class","btn-sm add-card");

    var cardShow = new Trellino.Views.CardShowView({
      model: card
    })

    this.addSubview("#list" + this.model.id, cardShow)
    cardShow.render();
  },

  destroyList: function() {
    this.model.destroy();
  }
});