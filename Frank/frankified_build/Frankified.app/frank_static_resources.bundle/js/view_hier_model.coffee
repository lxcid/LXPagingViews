define ['view_model'], (ViewModel)->
  ViewCollection = Backbone.Collection

  flatten = (rootViewModel)->
    flattenedViewModels = [rootViewModel]
    for childViewModel in rootViewModel.get('children')
      flattenedViewModels = flattenedViewModels.concat( flatten(childViewModel) )

    flattenedViewModels



  ViewHierModel = Backbone.Model.extend
    getAccessibleViews: ->
      @get( 'allViews' ).filter (viewModel)-> viewModel.has('accessibilityLabel')

    resetViewHier: (rawRootView)->
      rootViewModel = new ViewModel(rawRootView) 
      allViews = new ViewCollection( flatten( rootViewModel ) )

      allViews.on 'change:active', (viewModel)=>
        if viewModel.get('active')
          @trigger( 'active-view-changed', viewModel )

      allViews.on 'selected', (selectedViewModel)=>
        allViews.each (viewModel)->
          viewModel.set('selected',viewModel == selectedViewModel)
        @trigger( 'selected-view-changed', selectedViewModel )

      allViews.on 'accessible-selected', (viewModel)=>
        @trigger( 'accessible-view-selected', viewModel )
      
      @set( 'root', rootViewModel )
      @set( 'allViews', allViews )


  ViewHierModel
