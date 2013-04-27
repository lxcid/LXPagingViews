(function() {

  define(function() {
    var createController;
    return createController = function($listTabs, $inspectTabs) {
      var selectLocatorTab, selectViewDetailsTab;
      $listTabs.tabs();
      $inspectTabs.tabs();
      selectViewDetailsTab = function() {
        return $inspectTabs.tabs('select', 0);
      };
      selectLocatorTab = function() {
        return $inspectTabs.tabs('select', 1);
      };
      return {
        selectViewDetailsTab: selectViewDetailsTab,
        selectLocatorTab: selectLocatorTab
      };
    };
  });

}).call(this);
