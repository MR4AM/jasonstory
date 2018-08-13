var supportedCSS, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
for (var a = 0; a < toCheck.length; a++) if (styles[toCheck[a]] !== undefined) supportedCSS = toCheck[a];
let Wilq32 = window.Wilq32 || {};
Wilq32.PhotoEffect = (function () {

  if (supportedCSS) {
    return function (img, parameters) {
      img.Wilq32 = {
        PhotoEffect: this
      };

      this._img = this._rootObj = this._eventObj = img;
      this._handleRotation(parameters);
    }
  }
})();

Wilq32.PhotoEffect.prototype = {
  _setupParameters: function (parameters) {
    this._parameters = this._parameters || {};
    if (typeof this._angle !== "number") this._angle = 0;
    if (typeof parameters.angle === "number") this._angle = parameters.angle;
    this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle);

    this._parameters.step = parameters.step || this._parameters.step || null;
    this._parameters.easing = parameters.easing || this._parameters.easing || function (x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b; }
    this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
    this._parameters.callback = parameters.callback || this._parameters.callback || function () { };
  },
  _handleRotation: function (parameters) {
    this._setupParameters(parameters);
    if (this._angle == this._parameters.animateTo) {
      this._rotate(this._angle);
    }
    else {
      this._animateStart();
    }
  },

  _Loader: (function () {
    return function (parameters) {
      this._rootObj.setAttribute('id', this._img.getAttribute('id'));
      this._rootObj.className = this._img.className;

      this._width = this._img.width;
      this._height = this._img.height;
      this._widthHalf = this._width / 2; // used for optimisation
      this._heightHalf = this._height / 2;// used for optimisation

      var _widthMax = Math.sqrt((this._height) * (this._height) + (this._width) * (this._width));

      this._widthAdd = _widthMax - this._width;
      this._heightAdd = _widthMax - this._height;	// widthMax because maxWidth=maxHeight
      this._widthAddHalf = this._widthAdd / 2; // used for optimisation
      this._heightAddHalf = this._heightAdd / 2;// used for optimisation

      this._img.parentNode.removeChild(this._img);

      this._aspectW = ((parseInt(this._img.style.width, 10)) || this._width) / this._img.width;
      this._aspectH = ((parseInt(this._img.style.height, 10)) || this._height) / this._img.height;

      this._canvas = document.createElement('canvas');
      this._canvas.setAttribute('width', this._width);
      this._canvas.style.position = "relative";
      this._canvas.style.left = -this._widthAddHalf + "px";
      this._canvas.style.top = -this._heightAddHalf + "px";
      this._canvas.Wilq32 = this._rootObj.Wilq32;

      this._rootObj.appendChild(this._canvas);
      this._rootObj.style.width = this._width + "px";
      this._rootObj.style.height = this._height + "px";
      this._eventObj = this._canvas;

      this._cnv = this._canvas.getContext('2d');
      this._handleRotation(parameters);
    }
  })(),

  _animateStart: function () {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this._animateStartTime = +new Date;
    this._animateStartAngle = this._angle;
    this._animate();
  },
  _animate: function () {
    var actualTime = +new Date;
    var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

    // TODO: Bug for animatedGif for static rotation ? (to test)
    if (checkEnd && !this._parameters.animatedGif) {
      clearTimeout(this._timer);
    }
    else {
      if (this._canvas || this._vimage || this._img) {
        var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
        this._rotate((~~(angle * 10)) / 10);
      }
      if (this._parameters.step) {
        this._parameters.step(this._angle);
      }
      var self = this;
      this._timer = setTimeout(function () {
        self._animate.call(self);
      }, 10);
    }

    // To fix Bug that prevents using recursive function in callback I moved this function to back
    if (this._parameters.callback && checkEnd) {
      this._angle = this._parameters.animateTo;
      this._rotate(this._angle);
      this._parameters.callback.call(this._rootObj);
    }
  },

  _rotate: (function () {
    var rad = Math.PI / 180;
    return function (angle) {
      this._angle = angle;
      this._img.style[supportedCSS] = "rotate(" + (angle % 360) + "deg)";
    }

  })()
}

module.exports={
  
}