(function() {
  var TOAST_SHOW_TIME;

  TOAST_SHOW_TIME = 3000;

  define(function() {
    var createController;
    return createController = function($toast) {
      var existingTimeout, hideToast;
      existingTimeout = void 0;
      hideToast = function() {
        return $toast.removeClass('show');
      };
      hideToast();
      return {
        showToastMessage: function(message) {
          $toast.addClass('show');
          $toast.html(message);
          if (existingTimeout != null) {
            window.clearTimeout(existingTimeout);
          }
          return existingTimeout = window.setTimeout(hideToast, TOAST_SHOW_TIME);
        }
      };
    };
  });

}).call(this);
