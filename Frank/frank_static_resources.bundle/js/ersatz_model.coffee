define ["frank"], (frank)->

  ErsatzModel = Backbone.Model.extend
    default: 
      highlightFrames = []

    initialize: ->
      @refreshBaseScreenshot()

    highlightSomeFramesForABit: (frames)->
      @set('highlightFrames',frames)
      @temporaryHighlightTimeout = window.setTimeout( =>
        @set('highlightFrames',[])
        @temporaryHighlightTimeout = undefined
      , 1500 )

    resetViews: (views,deviceFamily,orientation)->
      @set('allViews',views)
      @set('deviceFamily',deviceFamily)
      @set('orientation',orientation)
      @set('highlightFrames',[])
      @configureAllViews(views)

    refreshBaseScreenshot: ->
      @set('baseScreenshotUrl',frank.baseScreenshotUrl())

    toggleAsploded: ->
      isAsploded = !(@get('isAsploded'))
      @set('isAsploded',isAsploded)
      if isAsploded
        @updateAsplodedViews()

      isAsploded

    updateAsplodedViews: ()->
      frank.requestSnapshotRefresh().done =>
        @trigger('snapshots-refreshed',@)
    
    configureAllViews: (allViews)->
      allViews.on 'change:active', (subject,isActive)=>
        window.clearTimeout(@temporaryHighlightTimeout) if @temporaryHighlightTimeout?

        if isActive && !@get('isAsploded')
          @set('highlightFrames',[subject.get('accessibilityFrame')])
        else
          @set('highlightFrames',[])
