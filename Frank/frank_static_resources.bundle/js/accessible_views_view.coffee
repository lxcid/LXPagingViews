define ->
  AccessibleViewItemView = Backbone.View.extend
    tagName: 'div'

    events: 
      "click": "clicked"
      "mouseover":"mousedover"
      "mouseout":"mousedout"

    render: ->
      @$el.empty().append( """
        <a href="#" title="#{@model.getShelleySelector()}">
          <span class="viewClass">#{@model.get('class')}</span>
          with label
          "<span class="viewLabel">#{@model.get('accessibilityLabel')}</span>"
        </a>
      """)
      @
      
    mousedover: -> @model.setActive()
    mousedout: -> @model.unsetActive()

    clicked: ->
      @model.trigger( 'accessible-selected', @model )
  
  
  AccessibleViewsView = Backbone.View.extend
    el: $('#accessible-views')

    initialize: ->
      @collection = new Backbone.Collection
      @collection.on 'reset', _.bind(@render,@)
        

    render: ->
      @$el.empty()
      @collection.each (viewModel) =>
        @$el.append( new AccessibleViewItemView(model:viewModel).render().el )
      @

   AccessibleViewsView
