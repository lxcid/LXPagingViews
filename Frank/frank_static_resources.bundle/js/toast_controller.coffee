TOAST_SHOW_TIME = 3000
define ->
  createController = ($toast)->
    existingTimeout = undefined

    hideToast = -> $toast.removeClass('show')

    hideToast()

    showToastMessage: (message)->
      $toast.addClass('show')
      $toast.html(message)

      window.clearTimeout(existingTimeout) if existingTimeout?
      existingTimeout = window.setTimeout( hideToast, TOAST_SHOW_TIME )
