define ["frank"], (frank)->

  ViewModel = Backbone.Model.extend
    defaults:
      parent: undefined
      depth: 0

    initialize: (attributes)->
      childDepth = attributes.depth + 1
      childModels = for subview in attributes.subviews
        new ViewModel( _.extend( subview, {parent:@,depth:childDepth} ) )

      @set( children: childModels )

    getDesc: ->
      viewClass = @get('class')
      if label = @get('accessibilityLabel')
        "#{viewClass}: #{label}"
      else
        viewClass

    getShelleySelector: ->
      if @has('accessibilityLabel')
        "view:'#{@get('class')}' marked:'#{@get('accessibilityLabel')}'"
      else
        false

    getSnapshotUrl: ->
      frank.snapshotUrlForViewWithUid(@get('uid'))

    setActive: ->
      @collection.each (viewModel)=>
        viewModel.set( 'active', viewModel == @ )

    unsetActive: ->
      @set( 'active', false )


  ViewModel
