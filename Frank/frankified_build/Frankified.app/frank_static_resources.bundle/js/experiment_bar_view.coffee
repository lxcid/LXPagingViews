define ['experiment_bar_model','dropdown_control'], (ExperimentBarModel,DropdownControl)->

  ExperimentBarView = Backbone.View.extend
    el: $("#selector-test")

    initialize: ->
      @actionDropdownView = new DropdownControl.DropdownView()
      @actionDropdownView.setElement(@$('.action-buttons'))
      @actionDropdownView.collection.reset([
        {name: 'highlight', text:'Highlight'},
        {name: 'touch', text:'Touch In App'},
        {name: 'flash', text:'Flash In App'}
      ])
      @actionDropdownView.collection.at(0).select()
      @actionDropdownView.collection.on 'option-clicked', (option)=> @actionClicked(option.get('name'))

      @engineDropdownView = new DropdownControl.DropdownView()
      @engineDropdownView.setElement(@$('.selector-engine'))
      @engineDropdownView.collection.reset([
        {name: 'shelley_compat', text:'Shelley'},
        {name: 'uiquery', text:'UIQuery'},
        {name: 'calabash_uispec', text:'Calabash'}
      ])
      @engineDropdownView.collection.at(0).select()
      @engineDropdownView.collection.on 'option-clicked', (option)=> 
        @model.set( 'selectorEngine', (option.get('name')) )

      @$selectorInput = @$('input#query')
     
      
      @model = new ExperimentBarModel()
      @model.on 'change', _.bind(@update,@)
      @update()

    update: ->
      @$selectorInput.val( @model.get('selector') )

    actionClicked: (actionName)->
      @updateModelFromSelectorInput() 
      @model.actionClicked(actionName)


    updateModelFromSelectorInput: ->
      @model.set( 'selector', @$selectorInput.val() )
