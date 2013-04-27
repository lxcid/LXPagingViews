define ['view_hier_model'],(ViewHierModel)->

  TreeNodeView = Backbone.View.extend
    tagName: 'li'

    initialize: ->
      @model.on 'change:selected', _.bind( @refreshSelectedness, @ ) 

    $a: -> @$( '> a' )

    render: ->
      $childList = $("<ul/>")

      for child in @model.get('children')
        childView = new TreeNodeView( model: child )
        $childList.append( childView.render().el )

      @$el.append("<a>#{@model.getDesc()}</a>").append($childList)

      # have to do this by hand rather than with events property
      # because BB doesn't appear to let you bind to just immediate
      # descendants using e.g. "mouseenter > a"
      @$a()
        .on( 'mouseenter', => @model.setActive() )
        .on( 'mouseleave', => @model.unsetActive() )
        .on( 'click', => @model.trigger('selected',@model) )

      @refreshSelectedness()
      @

    refreshSelectedness: ->
      if @model.get('selected')
        @$a().addClass('selected')
      else
        @$a().removeClass('selected')





  TreeView = Backbone.View.extend
    el: $('#dom-dump > ul')

    initialize: ->
      @model = new ViewHierModel()
      @model.on 'change', _.bind(@refresh,@)

    refresh: ->
      @$el.empty()
      rootNodeView = new TreeNodeView(model: @model.get('root'))
      @$el.append( rootNodeView.render().el )
      @$el.treeview( collapsed: false )

