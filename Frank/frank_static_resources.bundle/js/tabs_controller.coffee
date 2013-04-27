define ->

  createController = ($listTabs,$inspectTabs)->
    $listTabs.tabs();
    $inspectTabs.tabs();

    selectViewDetailsTab = -> $inspectTabs.tabs('select', 0)
    selectLocatorTab = -> $inspectTabs.tabs('select', 1)
    {
      selectViewDetailsTab: selectViewDetailsTab
      selectLocatorTab: selectLocatorTab
    }

