(function() {

  define(function() {
    var DropdownCollection, DropdownModel, DropdownView;
    DropdownModel = Backbone.Model.extend({
      select: function() {
        var _this = this;
        this.collection.each(function(model) {
          return model.set('selected', model === _this);
        });
        return this.trigger('option-clicked', this);
      }
    });
    DropdownCollection = Backbone.Collection.extend({
      model: DropdownModel
    });
    DropdownView = Backbone.View.extend({
      tagName: 'div',
      className: 'dropdown',
      events: {
        "click .drop-indicator": 'clickedDrop',
        "click .button": 'clickedItem'
      },
      initialize: function() {
        this.collection = new DropdownCollection();
        this.collection.on('all', _.bind(this.render, this));
        return $('body').on('click', _.bind(this.clickedOutsideDropdown, this));
      },
      selectedModel: function() {
        var selected;
        selected = this.collection.find(function(m) {
          return m.get('selected');
        });
        return selected || this.collection.at(0);
      },
      unselectedModels: function() {
        return _(this.collection.reject(function(m) {
          return m.get('selected');
        }));
      },
      createButtonFor: function(model) {
        var _this = this;
        return $("<button>" + (model.get('text')) + "</button>").on('click', function() {
          return _this.clickedItem(model);
        });
      },
      render: function() {
        var $ul,
          _this = this;
        this.$el.empty().append(this.createButtonFor(this.selectedModel())).append($ul = $("<ul>"));
        this.unselectedModels().each(function(model) {
          return $ul.append(_this.createButtonFor(model));
        });
        return this.$el.append("<div class=\"drop-indicator\">v</div>");
      },
      clickedDrop: function(e) {
        e.stopPropagation();
        return this.$('ul').toggleClass('shown');
      },
      clickedOutsideDropdown: function() {
        return this.$('ul').removeClass('shown');
      },
      clickedItem: function(model) {
        return model.select();
      }
    });
    return {
      DropdownModel: DropdownModel,
      DropdownView: DropdownView
    };
  });

}).call(this);
