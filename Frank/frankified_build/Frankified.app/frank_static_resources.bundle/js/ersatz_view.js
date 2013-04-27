(function() {
  var ISO_MAJOR_OFFSET, ISO_MINOR_OFFSET, ISO_SKEW, SCREEN_BOUNDS,
    __slice = [].slice;

  ISO_SKEW = 15;

  ISO_MAJOR_OFFSET = 50;

  ISO_MINOR_OFFSET = 5;

  SCREEN_BOUNDS = {
    iphone: {
      x: 0,
      y: 0,
      width: 320,
      height: 480
    },
    ipad: {
      x: 0,
      y: 0,
      width: 768,
      height: 1024
    }
  };

  define(['transform_stack', 'ersatz_model'], function(transformStack, ErsatzModel) {
    var ErsatzView, ErsatzViewSnapshotView, drawStaticBackdropAndReturnTransformer, transformFromBaseForViewModel;
    drawStaticBackdropAndReturnTransformer = function(paper, deviceFamily, orientation, isoSkew) {
      var isiPhone, rotation, rotationPoint, transformer;
      paper.clear();
      paper.canvas.setAttribute("width", "100%");
      paper.canvas.setAttribute("height", "100%");
      isiPhone = 'iphone' === deviceFamily;
      if (isiPhone) {
        paper.canvas.setAttribute("viewBox", "0 0 380 720");
        rotationPoint = [190, 360];
      } else {
        paper.canvas.setAttribute("viewBox", "0 0 875 1200");
        rotationPoint = [437, 600];
      }
      transformer = transformStack();
      transformer.skew(0, isoSkew).translate(6, 6);
      rotation = (function() {
        switch (orientation) {
          case 'landscape_right':
            return 90;
          case 'portrait_upside_down':
            return 180;
          case 'landscape_left':
            return 270;
          default:
            return false;
        }
      })();
      if (rotation) {
        transformer.rotateAroundPoint.apply(transformer, [rotation].concat(__slice.call(rotationPoint)));
      }
      if (isiPhone) {
        paper.rect(0, 0, 360, 708, 40).attr({
          fill: "black",
          stroke: "gray",
          "stroke-width": 4
        }).transform(transformer.desc());
      } else {
        paper.rect(10, 10, 855, 1110, 20).attr({
          'fill': 'black',
          'stroke': 'gray',
          'stroke-width': 6
        }).transform(transformer.desc());
      }
      if (isiPhone) {
        transformer.push().translate(180, 655);
        paper.circle(0, 0, 34).transform(transformer.desc()).attr("fill", "90-#303030-#101010");
        paper.rect(0, 0, 22, 22, 5).attr({
          stroke: "gray",
          "stroke-width": 2
        }).transform(transformer.push().translate(-11, -11).descAndPop());
        transformer.translate(20, 120);
      } else {
        transformer.translate(50, 50);
      }
      if (isoSkew > 0) {
        transformer.translate(-ISO_MAJOR_OFFSET, 0);
      }
      return transformer;
    };
    transformFromBaseForViewModel = function(baseTransformer, viewModel, withSkew) {
      var x, y, _ref;
      if (withSkew == null) {
        withSkew = false;
      }
      _ref = viewModel.get('accessibilityFrame').origin, x = _ref.x, y = _ref.y;
      baseTransformer.push().translate(x, y);
      if (withSkew) {
        baseTransformer.translate(viewModel.get('depth') * -ISO_MINOR_OFFSET, 0);
      }
      return baseTransformer.descAndPop();
    };
    ErsatzViewSnapshotView = Backbone.View.extend({
      initialize: function() {
        this.model.on('change:active', _.bind(this.updateOpacity, this));
        return this.render();
      },
      render: function() {
        var frame;
        frame = this.model.get('accessibilityFrame');
        this.el.attr({
          transform: transformFromBaseForViewModel(this.options.baseTransformer, this.model, true),
          src: this.model.getSnapshotUrl(),
          x: 0,
          y: 0,
          width: frame.size.width,
          height: frame.size.height
        });
        this.updateOpacity();
        return this.el;
      },
      updateOpacity: function() {
        var opacity;
        opacity = (this.model.get('active') ? 1.0 : 0.05);
        return this.el.attr('opacity', opacity);
      }
    });
    return ErsatzView = Backbone.View.extend({
      el: $('#ui-locator-view'),
      initialize: function() {
        _.bindAll(this, 'render');
        this.model = new ErsatzModel();
        this.highlights = [];
        this.paper = new Raphael(this.el);
        this.model.on('change:baseScreenshotUrl', _.bind(this.refreshBaseScreenshot, this));
        this.model.on('change:isAsploded', _.bind(this.render, this));
        this.model.on('snapshots-refreshed', _.bind(this.refreshSnapshots, this));
        return this.model.on('change:highlightFrames', _.bind(this.refreshHighlightFrames, this));
      },
      render: function() {
        var isoSkew;
        this.highlights = [];
        isoSkew = (this.model.get('isAsploded') ? ISO_SKEW : 0);
        this.backdropTransformer = drawStaticBackdropAndReturnTransformer(this.paper, this.model.get('deviceFamily'), this.model.get('orientation'), isoSkew);
        this.backdrop = this.paper.image();
        this.refreshBaseScreenshot();
        if (this.model.get('isAsploded')) {
          this.backdrop.attr('opacity', 0.5);
          this.refreshSnapshots();
        }
        return this.el;
      },
      screenBounds: function() {
        return SCREEN_BOUNDS[this.model.get('deviceFamily')];
      },
      refreshBaseScreenshot: function() {
        var newScreenshotUrl;
        newScreenshotUrl = this.model.get('baseScreenshotUrl');
        if (newScreenshotUrl == null) {
          return;
        }
        return this.backdrop.transform(this.backdropTransformer.desc()).attr(this.screenBounds()).attr('src', newScreenshotUrl).toFront();
      },
      refreshSnapshots: function() {
        var _this = this;
        return this.model.get('allViews').each(function(viewModel) {
          var snapshotView;
          return snapshotView = new ErsatzViewSnapshotView({
            model: viewModel,
            baseTransformer: _this.backdropTransformer,
            el: _this.paper.image()
          });
        });
      },
      refreshHighlightFrames: function() {
        var h, _i, _len, _ref,
          _this = this;
        _ref = this.highlights;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          h = _ref[_i];
          h.remove();
        }
        this.highlights = [];
        return this.highlights = _.map(this.model.get('highlightFrames'), function(_arg) {
          var origin, size;
          origin = _arg.origin, size = _arg.size;
          return _this.paper.rect().attr({
            fill: "#aaff00",
            opacity: 0.8,
            stroke: "black",
            transform: _this.backdropTransformer.push().translate(origin.x, origin.y).descAndPop(),
            x: 0,
            y: 0,
            width: size.width,
            height: size.height
          });
        });
      }
    });
  });

}).call(this);
