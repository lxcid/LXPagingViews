define ->
  ExperimentBarModel = Backbone.Model.extend
    defaults:
      engines: ['shelley_compat','uiquery','calabash_uispec']
      selectorEngine: 'shelley_compat'
      selector: ''

    actionClicked: (actionName)->
      @trigger("#{actionName}-clicked",@)

