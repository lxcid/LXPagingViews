INTERESTING_PROPERTIES = ['class', 'accessibilityLabel', 'tag', 'alpha', 'isHidden']
IRREGULAR_PROPERTIES = INTERESTING_PROPERTIES.concat( 'parent', 'subviews', 'children' )

renderListItem = ( propertyName, propertyValue, cssClass )->
  propertyValue ?= 'null'

  if _.isObject( propertyValue )
    propertyValue = JSON.stringify(propertyValue)

  $("<li>").addClass(cssClass)
    .append( 
      $('<div/>').addClass('key').text(propertyName),
      $('<div/>').addClass('value').text(propertyValue)
    )

define ->
  DetailsView = Backbone.View.extend
    el: $('#dom-detail')

    updateModel: (model)->
      @model = model
      @refresh()

    refresh: ->
      $ul  = $('<ul>')

      for prop in INTERESTING_PROPERTIES
        if @model.has(prop)
          val = @model.get(prop)
          $ul.append( renderListItem( prop, val, 'interesting' ) )

      for prop in _.keys(@model.attributes).sort()
        continue if _.contains( IRREGULAR_PROPERTIES, prop )

        val = @model.get(prop)
        $ul.append( renderListItem( prop, val ) )

      @$el.empty().append($ul)



  DetailsView
