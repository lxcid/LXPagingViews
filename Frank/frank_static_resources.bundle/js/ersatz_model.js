(function() {

  define(["frank"], function(frank) {
    var ErsatzModel, highlightFrames;
    return ErsatzModel = Backbone.Model.extend({
      "default": highlightFrames = [],
      initialize: function() {
        return this.refreshBaseScreenshot();
      },
      highlightSomeFramesForABit: function(frames) {
        var _this = this;
        this.set('highlightFrames', frames);
        return this.temporaryHighlightTimeout = window.setTimeout(function() {
          _this.set('highlightFrames', []);
          return _this.temporaryHighlightTimeout = void 0;
        }, 1500);
      },
      resetViews: function(views, deviceFamily, orientation) {
        this.set('allViews', views);
        this.set('deviceFamily', deviceFamily);
        this.set('orientation', orientation);
        this.set('highlightFrames', []);
        return this.configureAllViews(views);
      },
      refreshBaseScreenshot: function() {
        return this.set('baseScreenshotUrl', frank.baseScreenshotUrl());
      },
      toggleAsploded: function() {
        var isAsploded;
        isAsploded = !(this.get('isAsploded'));
        this.set('isAsploded', isAsploded);
        if (isAsploded) {
          this.updateAsplodedViews();
        }
        return isAsploded;
      },
      updateAsplodedViews: function() {
        var _this = this;
        return frank.requestSnapshotRefresh().done(function() {
          return _this.trigger('snapshots-refreshed', _this);
        });
      },
      configureAllViews: function(allViews) {
        var _this = this;
        return allViews.on('change:active', function(subject, isActive) {
          if (_this.temporaryHighlightTimeout != null) {
            window.clearTimeout(_this.temporaryHighlightTimeout);
          }
          if (isActive && !_this.get('isAsploded')) {
            return _this.set('highlightFrames', [subject.get('accessibilityFrame')]);
          } else {
            return _this.set('highlightFrames', []);
          }
        });
      }
    });
  });

}).call(this);
