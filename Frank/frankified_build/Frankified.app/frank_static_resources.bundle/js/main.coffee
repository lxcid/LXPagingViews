require ['controller','tabs_controller','tree_view','ersatz_view','details_view', 'accessible_views_view','experiment_bar_view','toast_controller'], (createMainController,createTabsController,TreeView,ErsatzView,DetailsView,AccessibleViewsView,ExperimentBarView,createToastController)->
  $ ->
    treeView = new TreeView()

    ersatzView = new ErsatzView()
    detailsView = new DetailsView()
    accessibleViewsView = new AccessibleViewsView()
    experimentBarView = new ExperimentBarView()

    tabsController = createTabsController( $("#list-tabs"), $("#inspect-tabs") );
    toastController = createToastController( $('.toast') )

    mainController = createMainController( 
      tabsController: tabsController
      toastController: toastController
      treeView: treeView
      ersatzView: ersatzView
      detailsView: detailsView
      accessibleViewsView: accessibleViewsView
      experimentBarModel: experimentBarView.model
      $asplodeButton: $('#asploder button')
      $reloadButton: $('button#dump_button')
      $liveButton: $('#live-view button')
    )
    mainController.boot()


