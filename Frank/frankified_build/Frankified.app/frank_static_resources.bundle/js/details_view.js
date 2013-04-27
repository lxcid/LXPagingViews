(function() {
  var INTERESTING_PROPERTIES, IRREGULAR_PROPERTIES, renderListItem;

  INTERESTING_PROPERTIES = ['class', 'accessibilityLabel', 'tag', 'alpha', 'isHidden'];

  IRREGULAR_PROPERTIES = INTERESTING_PROPERTIES.concat('parent', 'subviews', 'children');

  renderListItem = function(propertyName, propertyValue, cssClass) {
    if (propertyValue == null) {
      propertyValue = 'null';
    }
    if (_.isObject(propertyValue)) {
      propertyValue = JSON.stringify(propertyValue);
    }
    return $("<li>").addClass(cssClass).append($('<div/>').addClass('key').text(propertyName), $('<div/>').addClass('value').text(propertyValue));
  };

  define(function() {
    var DetailsView;
    DetailsView = Backbone.View.extend({
      el: $('#dom-detail'),
      updateModel: function(model) {
        this.model = model;
        return this.refresh();
      },
      refresh: function() {
        var $ul, prop, val, _i, _j, _len, _len1, _ref;
        $ul = $('<ul>');
        for (_i = 0, _len = INTERESTING_PROPERTIES.length; _i < _len; _i++) {
          prop = INTERESTING_PROPERTIES[_i];
          if (this.model.has(prop)) {
            val = this.model.get(prop);
            $ul.append(renderListItem(prop, val, 'interesting'));
          }
        }
        _ref = _.keys(this.model.attributes).sort();
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          prop = _ref[_j];
          if (_.contains(IRREGULAR_PROPERTIES, prop)) {
            continue;
          }
          val = this.model.get(prop);
          $ul.append(renderListItem(prop, val));
        }
        return this.$el.empty().append($ul);
      }
    });
    return DetailsView;
  });

}).call(this);
