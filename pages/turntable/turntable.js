//测试数据
let testData = [
  {
    text: '奖品1',
    colors: "red",
    id: 1,
  },
  {
    text: '奖品2',
    colors: "green",
    id: 2,
  },
  {
    text: '奖品3',
    colors: "yellow",
    id: 3,
  },
  {
    text: '奖品4',
    colors: "black",
    id: 4,
  },
  {
    text: '奖品5',
    colors: "pink",
    id: 5,
  },
  {
    text: '奖品6',
    colors: "orange",
    id: 6,
  },
  {
    text: '奖品7',
    colors: "purple",
    id: 7,
  },
  {
    text: '奖品8',
    colors: "skyblue",
    id: 8,
  },
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSource:  testData, //大转盘奖品名称/背景色
    outsideRadius: 400, //大转盘外圆的半径
    textRadius: 155, //大转盘奖品位置距离圆心的距离
    insideRadius: 68, //大转盘内圆的半径
    startAngle: 0, //开始角度
    bRotate:  true, //false:停止;ture:旋转
    fontSize: '20px',
    width:  422,
    height:  422,
    duration: 5000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.drawCanvas()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  //画布
   drawCanvas() {
    //var canvas = document.getElementById("turnplate_canvas")
    var { dataSource, outsideRadius, textRadius, insideRadius, startAngle, width, height, fontSize } = this.data;
    console.log(document,'iii')
      //根据奖品个数计算圆周角度
      var arc = Math.PI / (dataSource.length / 2);
     const ctx = wx.createCanvasContext('turnplate_canvas',this)
      // 移动端canvas模糊问题
      // canvas.width = width * 2;
      // canvas.height = height * 2;
      console.log(ctx,'8888')
      ctx.scale(2, 2)

      //在给定矩形内清空一个矩形
     ctx.rect(0, 0, width, height);
      //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
     ctx.setStrokeStyle("#FFBE04");
      //font 属性设置或返回画布上文本内容的当前字体属性
      ctx.font = `${fontSize} Microsoft YaHei`;
      for (var i = 0; i < dataSource.length; i++) {
        var angle = startAngle + i * arc - Math.PI / 2 - arc / 2;
        console.log(angle, dataSource[i])
        ctx.setFillStyle(dataSource[i].colors || '#ffefbe');
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
        ctx.translate(width / 2 + Math.cos(angle + arc / 2) * textRadius, height / 2 + Math.sin   (angle + arc / 2) * textRadius);

        //rotate方法旋转当前的绘图
        ctx.rotate(angle + arc / 2 + Math.PI / 2);

        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

        ctx.restore();
        //----绘制奖品结束----
    }
  }


})