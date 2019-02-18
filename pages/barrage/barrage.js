var page = undefined;
Page({
  onLoad: function () {
    page = this;
    setInterval(()=>{
      this.bindbt();
    },3000)
  },
  bindbt: function () {
    for(var i=0;i<10;i++){
      doommList.push(new Doomm("希望你每天能开心", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 20), getRandomColor()));
      this.setData({
        doommData: doommList
      })
    }
  },
  data: {
    doommData: []
  }
})
var doommList = [];
var i = 0;//用做唯一的wx:key
class Doomm {
  constructor(text, top, time, color) {
    this.text = text + i;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)//定时器动画完成后执行。
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}