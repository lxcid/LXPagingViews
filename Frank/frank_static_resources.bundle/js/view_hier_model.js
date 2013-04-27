(function() {

  define(['view_model'], function(ViewModel) {
    var ViewCollection, ViewHierModel, flatten;
    ViewCollection = Backbone.Collection;
    flatten = function(rootViewModel) {
      var childViewModel, flattenedViewModels, _i, _len, _ref;
      flattenedViewModels = [rootViewModel];
      _ref = rootViewModel.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        childViewModel = _ref[_i];
        flattenedViewModels = flattenedViewModels.concat(flatten(childViewModel));
      }
      return flattenedViewModels;
    };
    ViewHierModel = Backbone.Model.extend({
      getAccessibleViews: function() {
        return this.get('allViews').filter(function(viewModel) {
          return viewModel.has('accessibilityLabel');
        });
      },
      resetViewHier: function(rawRootView) {
        var allViews, rootViewModel,
          _this = this;
        rootViewModel = new ViewModel(rawRootView);
        allViews = new ViewCollection(flatten(rootViewModel));
        allViews.on('change:active', function(viewModel) {
          if (viewModel.get('active')) {
            return _this.trigger('active-view-changed', viewModel);
          }
        });
        allViews.on('selected', function(selectedViewModel) {
          allViews.each(function(viewModel) {
            return viewModel.set('selected', viewModel === selectedViewModel);
          });
          return _this.trigger('selected-view-changed', selectedViewModel);
        });
        allViews.on('accessible-selected', function(viewModel) {
          return _this.trigger('accessible-view-selected', viewModel);
        });
        this.set('root', rootViewModel);
        return this.set('allViews', allViews);
      }
    });
    return ViewHierModel;
  });

}).call(this);
