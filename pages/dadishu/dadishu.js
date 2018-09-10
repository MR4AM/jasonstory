Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:false,
    count:3,
    setInter:'',
    timer:'',
    tips:'Ready!',
    masknone:false,
    activeidx:'',
    score:0,
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
            this.randomflash(1000);
          },2000)
        }
      })
    }, 1000)
  },
  //地鼠随机出现
  randomflash(duration){
    let that= this;
    that.data.timer2=setInterval(()=>{
        let rannum=Math.floor(Math.random()*12);
        that.setData({
          activeidx:rannum,
        })
    },duration)
  },
  //打击地鼠
  hitmice(e){
    console.log(e.currentTarget.dataset.hitidx);
    if (e.currentTarget.dataset.hitidx ==this.data.activeidx){
      console.log(e.currentTarget.dataset.hitidx,'打中了');
      this.setData({
        score:this.data.score+1,
      })
    }
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