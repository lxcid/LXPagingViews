(function() {
  var R,
    __slice = [].slice;

  R = Raphael;

  define(function() {
    return function(initialMatrix) {
      var chainerFor, clone, currentMatrix, desc, descAndPop, pop, prefixedWithTranslate, push, rotate, rotateAroundPoint, scale, skew, stack, translate;
      currentMatrix = initialMatrix || R.matrix();
      stack = [currentMatrix];
      clone = function() {
        return transformStack(currentMatrix.clone());
      };
      push = function() {
        stack.push(currentMatrix);
        currentMatrix = currentMatrix.clone();
        return this;
      };
      pop = function() {
        stack.pop();
        currentMatrix = _.last(stack);
        return this;
      };
      desc = function() {
        return currentMatrix.toTransformString();
      };
      descAndPop = function() {
        var str;
        str = desc();
        pop();
        return str;
      };
      prefixedWithTranslate = function(x, y) {
        var prefix;
        prefix = R.matrix();
        prefix.translate(x, y);
        prefix.add(currentMatrix);
        return prefix;
      };
      chainerFor = function(methodName) {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          currentMatrix[methodName].apply(currentMatrix, args);
          return this;
        };
      };
      translate = chainerFor('translate');
      rotate = chainerFor('rotate');
      scale = chainerFor('scale');
      skew = function(x, y) {
        x = R.rad(x);
        y = R.rad(y);
        currentMatrix.add(1, 0, Math.tan(x), 1, 0, 0);
        currentMatrix.add(1, Math.tan(y), 0, 1, 0, 0);
        return this;
      };
      rotateAroundPoint = function(rot, x, y) {
        return this.translate(x, y).rotate(rot).translate(-x, -y);
      };
      return {
        clone: clone,
        translate: translate,
        rotate: rotate,
        scale: scale,
        skew: skew,
        rotateAroundPoint: rotateAroundPoint,
        push: push,
        pop: pop,
        desc: desc,
        descAndPop: descAndPop,
        prefixedWithTranslate: prefixedWithTranslate
      };
    };
  });

}).call(this);
