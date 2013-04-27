(function() {

  define(function() {
    var AccessibleViewItemView, AccessibleViewsView;
    AccessibleViewItemView = Backbone.View.extend({
      tagName: 'div',
      events: {
        "click": "clicked",
        "mouseover": "mousedover",
        "mouseout": "mousedout"
      },
      render: function() {
        this.$el.empty().append("<a href=\"#\" title=\"" + (this.model.getShelleySelector()) + "\">\n  <span class=\"viewClass\">" + (this.model.get('class')) + "</span>\n  with label\n  \"<span class=\"viewLabel\">" + (this.model.get('accessibilityLabel')) + "</span>\"\n</a>");
        return this;
      },
      mousedover: function() {
        return this.model.setActive();
      },
      mousedout: function() {
        return this.model.unsetActive();
      },
      clicked: function() {
        return this.model.trigger('accessible-selected', this.model);
      }
    });
    AccessibleViewsView = Backbone.View.extend({
      el: $('#accessible-views'),
      initialize: function() {
        this.collection = new Backbone.Collection;
        return this.collection.on('reset', _.bind(this.render, this));
      },
      render: function() {
        var _this = this;
        this.$el.empty();
        this.collection.each(function(viewModel) {
          return _this.$el.append(new AccessibleViewItemView({
            model: viewModel
          }).render().el);
        });
        return this;
      }
    });
    return AccessibleViewsView;
  });

}).call(this);
