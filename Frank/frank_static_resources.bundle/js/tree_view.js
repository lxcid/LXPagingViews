(function() {

  define(['view_hier_model'], function(ViewHierModel) {
    var TreeNodeView, TreeView;
    TreeNodeView = Backbone.View.extend({
      tagName: 'li',
      initialize: function() {
        return this.model.on('change:selected', _.bind(this.refreshSelectedness, this));
      },
      $a: function() {
        return this.$('> a');
      },
      render: function() {
        var $childList, child, childView, _i, _len, _ref,
          _this = this;
        $childList = $("<ul/>");
        _ref = this.model.get('children');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          childView = new TreeNodeView({
            model: child
          });
          $childList.append(childView.render().el);
        }
        this.$el.append("<a>" + (this.model.getDesc()) + "</a>").append($childList);
        this.$a().on('mouseenter', function() {
          return _this.model.setActive();
        }).on('mouseleave', function() {
          return _this.model.unsetActive();
        }).on('click', function() {
          return _this.model.trigger('selected', _this.model);
        });
        this.refreshSelectedness();
        return this;
      },
      refreshSelectedness: function() {
        if (this.model.get('selected')) {
          return this.$a().addClass('selected');
        } else {
          return this.$a().removeClass('selected');
        }
      }
    });
    return TreeView = Backbone.View.extend({
      el: $('#dom-dump > ul'),
      initialize: function() {
        this.model = new ViewHierModel();
        return this.model.on('change', _.bind(this.refresh, this));
      },
      refresh: function() {
        var rootNodeView;
        this.$el.empty();
        rootNodeView = new TreeNodeView({
          model: this.model.get('root')
        });
        this.$el.append(rootNodeView.render().el);
        return this.$el.treeview({
          collapsed: false
        });
      }
    });
  });

}).call(this);
