Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:false,
    count:3,
    setInter:'',
    timer2:'',
    timer3:'',
    tips:'Ready!',
    masknone:false,
    activeidx:'',
    score:0,//当前关卡得分
    gamestate:1,//游戏关卡,
    gamecountdown:10,//游戏当前关卡倒计时,
    gameover:false,
    pauge:false,//游戏中断中状态，
    needpoint:0,//所需分数,
    btntext:'',//游戏控制按钮,
    passwords:['你怎么那么腻害','被你的手速折服','大哥，请喝茶','kidding me?']
  },

  readygame(){
    this.setData({
      start:true
    })
    let that=this;
    that.data.setInter = setInterval(() => {
      this.setData({
        count: this.data.count - 1
      },()=>{
        if (that.data.count < 1) {
          clearInterval(that.data.setInter)
          that.setData({
            tips:'Go!!!'
          })
          setTimeout(()=>{
            that.setData({
              masknone:true,
            })
            this.gamestart(1000,30,10)
          },2000)
        }
      })
    }, 1000)
  },
  //游戏开始函数，三个参数分别是地鼠闪跳时间间隔，关卡倒计时，关卡所需分数
  gamestart(duration,countdown,score){
    //清除定时器
    clearInterval(this.data.setInter)
    clearInterval(this.data.timer2);
    clearInterval(this.data.timer3);
    //游戏开始，倒计时开始，动画开始
    this.randomflash(duration);
    this.setData({
      gamecountdown:countdown
    },()=>{
      this.setData({
        needpoint:score
      },()=>{
        this.gamecountdown(this.data.needpoint);
      })
    })
  },
  //地鼠随机出现
  randomflash(duration,stop){
    let that= this;
    that.data.timer2=setInterval(()=>{
        let rannum=Math.floor(Math.random()*12);
        that.setData({
          activeidx:rannum,
        },()=>{
          if (that.data.gameover){
            clearInterval(that.data.timer2)
          }
        })
    },duration)
  },
  //游戏当前倒计时
  gamecountdown(score){
    let that =this;
      that.data.timer3=setInterval(()=>{
        that.setData({
          gamecountdown:that.data.gamecountdown-1
        },()=>{
          if (that.data.gamecountdown < 0 && this.data.score < score) {
            clearInterval(that.data.timer3);
            that.setData({
              gameover:true
            })
            this.setData({
              gamestate:1,
              pauge: true,
              masknone: false,
              tips: '很遗憾，你在规定时间内没有打到对应分数',
              count: '',
              btntext:'再来一局',
              score: 0
            })
          }
        })
      },1000)
  },
  //打击地鼠
  hitmice(e){
    console.log(e.currentTarget.dataset.hitidx);
    if (e.currentTarget.dataset.hitidx ==this.data.activeidx){
      console.log(e.currentTarget.dataset.hitidx,'打中了');
      this.setData({
        score:this.data.score+1,
      },()=>{
        if(this.data.score>=this.data.needpoint){
          this.setData({
            gamestate: this.data.gamestate + 1,
            pauge:true,
            masknone:false,
            tips:this.data.passwords[this.data.gamestate-2],
            count:'',
            btntext: '下一关',
            score: 0
          })
        }
      })
    }
  },
  //到下一关
  tonextstate(){
    switch(this.data.gamestate){
      case 2:
      this.gamestart(1000, 30, 20);
      break;
      case 3:
      this.gamestart(900, 30, 30);
      break;
      case 4:
      this.gamestart(800, 30, 30);
      break;
    }
    this.setData({
      masknone:true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  }
})