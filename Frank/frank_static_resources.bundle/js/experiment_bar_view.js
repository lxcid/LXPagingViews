(function() {

  define(['experiment_bar_model', 'dropdown_control'], function(ExperimentBarModel, DropdownControl) {
    var ExperimentBarView;
    return ExperimentBarView = Backbone.View.extend({
      el: $("#selector-test"),
      initialize: function() {
        var _this = this;
        this.actionDropdownView = new DropdownControl.DropdownView();
        this.actionDropdownView.setElement(this.$('.action-buttons'));
        this.actionDropdownView.collection.reset([
          {
            name: 'highlight',
            text: 'Highlight'
          }, {
            name: 'touch',
            text: 'Touch In App'
          }, {
            name: 'flash',
            text: 'Flash In App'
          }
        ]);
        this.actionDropdownView.collection.at(0).select();
        this.actionDropdownView.collection.on('option-clicked', function(option) {
          return _this.actionClicked(option.get('name'));
        });
        this.engineDropdownView = new DropdownControl.DropdownView();
        this.engineDropdownView.setElement(this.$('.selector-engine'));
        this.engineDropdownView.collection.reset([
          {
            name: 'shelley_compat',
            text: 'Shelley'
          }, {
            name: 'uiquery',
            text: 'UIQuery'
          }, {
            name: 'calabash_uispec',
            text: 'Calabash'
          }
        ]);
        this.engineDropdownView.collection.at(0).select();
        this.engineDropdownView.collection.on('option-clicked', function(option) {
          return _this.model.set('selectorEngine', option.get('name'));
        });
        this.$selectorInput = this.$('input#query');
        this.model = new ExperimentBarModel();
        this.model.on('change', _.bind(this.update, this));
        return this.update();
      },
      update: function() {
        return this.$selectorInput.val(this.model.get('selector'));
      },
      actionClicked: function(actionName) {
        this.updateModelFromSelectorInput();
        return this.model.actionClicked(actionName);
      },
      updateModelFromSelectorInput: function() {
        return this.model.set('selector', this.$selectorInput.val());
      }
    });
  });

}).call(this);
