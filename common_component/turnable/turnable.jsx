/**
 * 用法
 * <Turntable
 *     data={[{text:'xxx', colors: '#456788'}]}  //奖品列表的数组数据
 *     className="xxx" //调整转盘的样式
 *     cb={} //获取转盘返回的值
 *      
 * />
 *
 */
import React, { Component } from 'react';
import './styles/turnable.scss';

//测试数据
let testData=[
  {
      text:'奖品1',
      colors:"red",
      id:1,
  },
  {
      text:'奖品2',
      colors:"green",
      id:2,
  },
  {
      text:'奖品3',
      colors:"yellow",
      id:3,
  },
  {
      text:'奖品4',
      colors:"black",
      id:4,
  },
  {
      text:'奖品5',
      colors:"pink",
      id:5,
  },
  {
      text:'奖品6',
      colors:"orange",
      id:6,
  },
  {
      text:'奖品7',
      colors:"purple",
      id:7,
  },
  {
      text:'奖品8',
      colors:"skyblue",
      id:8,
  },
]
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

class Turntable extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: this.props.data || testData, //大转盘奖品名称/背景色
      outsideRadius: 400, //大转盘外圆的半径
      textRadius: 155, //大转盘奖品位置距离圆心的距离
      insideRadius: 68, //大转盘内圆的半径
      startAngle: 0, //开始角度
      bRotate: this.props.bRotate || true, //false:停止;ture:旋转
      fontSize: '20px',
      width: this.props.width || 422,
      height: this.props.height || 422,
      duration: this.props.duration || 5000
    }
  }

  drawCanvas() {
    var canvas = document.getElementById("turnplate_canvas")
    var { dataSource, outsideRadius, textRadius, insideRadius, startAngle, width, height, fontSize } = this.state
    if (canvas.getContext) {
      //根据奖品个数计算圆周角度
      var arc = Math.PI / (dataSource.length / 2);
      var ctx = canvas.getContext("2d");
      // 移动端canvas模糊问题
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.scale(2, 2)
      
      //在给定矩形内清空一个矩形
      ctx.clearRect(0, 0, width, height);
      //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
      ctx.strokeStyle = "#FFBE04";
      //font 属性设置或返回画布上文本内容的当前字体属性
      ctx.font = `${fontSize} Microsoft YaHei`;
      for (var i = 0; i < dataSource.length; i++) {
        var angle = startAngle + i * arc -  Math.PI/2 - arc/2;
        console.log(angle, dataSource[i])
        ctx.fillStyle = dataSource[i].colors || '#ffefbe';
        ctx.beginPath();
        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
        ctx.arc(width / 2, height / 2, outsideRadius, angle, angle + arc, false);
        ctx.arc(width / 2, height / 2, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
        //锁画布(为了保存之前的画布状态)
        ctx.save();

        //----绘制奖品开始----
        ctx.fillStyle = "#fff";
        var text = dataSource[i].text;
        var line_height = 17;
        //translate方法重新映射画布上的 (0,0) 位置
        ctx.translate(width / 2 + Math.cos(angle + arc / 2) * textRadius, height / 2 + Math.sin(angle + arc / 2) * textRadius);

        //rotate方法旋转当前的绘图
        ctx.rotate(angle + arc / 2 + Math.PI / 2);

        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

        ctx.restore();
        //----绘制奖品结束----
      }
    }
  }

  rotate(parameters) {
    if (this.length === 0 || typeof parameters == "undefined") return;
    if (typeof parameters == "number") parameters = { angle: parameters };
    let element = document.getElementById('turnplate_canvas');
    if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

      new Wilq32.PhotoEffect(element, parameters)._rootObj;
    }
    else {
      element.Wilq32.PhotoEffect._handleRotation(parameters);
    }
  }

  rotateFn(id) {
    let { bRotate, dataSource, duration } = this.state
    let _this = this, index = 0;
    dataSource.map((item, i)=>{
      if(item.id == id){
        index = i
      }
    })
    var angles = (index - 1) * (360 / dataSource.length) - (360 / (dataSource.length * 2));
    if (angles < 270) {
      angles = 270 - angles;
    } else {
      angles = 360 - angles + 270;
    }
    this.rotate({
      angle: 0,
      animateTo: angles + 1800,
      duration: duration,
      callback: function () {
        _this.setState({
          bRotate: false
        })
      }
    });
  };

  // 启动函数
  run(id){
    let { bRotate, dataSource } = this.state;
    let cb=this.props.cb;
    //if(bRotate) return false;
    this.setState({bRotate: true})
    this.rotateFn(id)
    cb && cb(testData[id-1].text)
    console.log(id,'检测抽奖数据')
  }

  componentWillMount() {

  }

  componentDidMount() {

    let canvas = document.getElementById("turnplate_canvas")
    let width = this.props.width||canvas.clientWidth
    let height = this.props.height||canvas.clientHeight
    this.setState({
      width,
      height,
      outsideRadius: width/2 - 30,//大圆半径
      textRadius: width/2 - 100, //名字离圆心距离
    },()=>{
      this.drawCanvas()
    })
  }


  render() {
    let { className = '', backgroundImage = '' } = this.props
    let { width, height } = this.state
    return (
      <div className={`turnplate_page ${className}`}>
        <div className="start" onClick={this.run.bind(this,parseInt(Math.random()*testData.length+1))}>点击启动</div>
        <div className="turnplate" >
          <canvas id="turnplate_canvas" width={width} height={height}></canvas>
        </div>
      </div>
    )
  }
}

module.exports = Turntable;