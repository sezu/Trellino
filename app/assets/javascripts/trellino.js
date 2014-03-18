window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Trellino.Collections.boards = new Trellino.Collections.Boards();
    Trellino.Collections.boards.fetch({
      success: function(){
        new Trellino.Routers.AppRouter({
          $rootEl: $('#content')
        });

        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  Trellino.initialize();
});

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);

    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function () {
    var view = this;

    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
  }
});

// Backbone.CompositeView = Backbone.View.extend({
//   addSubview: function(selector, subview) {
//     this.subviews().push(subview);
//     $(selector).append(subview.$el);
//     debugger;
//   },
//
//   removeSubview: function(subview) {
//     var subviewIndex = this.subviews().indexOf(subview);
//     this.subviews().splice(subviewIndex, 1);
//     subview.remove();
//   },
//
//   renderSubviews: function() {
//     var $viewEl = this.$el;
//     //$viewEl.empty();
//
//     _(this.subviews()).each(function(subview) {
//       $viewEl.append(subview.render().$el)
//       subview.delegateEvents();
//     })
//   },
//
//   subviews: function() {
//     return (this._subviews ? this._subviews : [])
//   },
//
//   remove: function () {
//     Backbone.View.prototype.remove.call(this);
//
//     // remove all subviews as well
//     _(this.subviews()).each(function (subview) {
//         subview.remove();
//     });
//   }
// });