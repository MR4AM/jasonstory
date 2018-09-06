//测试数据
const gamedata = require('../../utils/lrsdata.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskstate:false,
    gamearr:[],
    src:'',
    dec:'',
    role:1,
    faguan:15,
    rolelimit:false,
    start:false,
    selectresult:[],//选择结果,
    end:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let temparr=gamedata.gamedata;
      let selectarr=[];
      for(var i=0;i<temparr.length;i++){
        switch(temparr[i].role){
          case 'pingmin':
          for(var a=0;a<3;a++){
            selectarr.push(temparr[i]);
          }
            break;
          case 'langren':
            for (var b = 0; b < 2; b++) {
              selectarr.push(temparr[i]);
            }
            break;
          case 'nvwu':
            selectarr.push(temparr[i]);
            break;
          case 'shouwei':
            selectarr.push(temparr[i]);
            break;
          case 'yuyanjia':
            selectarr.push(temparr[i]);
            break;
        }
        this.setData({
          gamearr:selectarr
        },()=>{
          console.log(this.data.gamearr, '检测游戏角色gamearr')
        })
      }
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
  start(){
    this.setData({start:true})
  },
  maskShow(){
    let that=this;
    //测试随机抽取角色
    let ram=Math.floor(Math.random()*19+1);
    if(this.data.role>8){
      this.setData({
        end:true,
      })
      return 
    }
    that.setData({
      maskstate:true,
      src: this.data.gamearr[this.data.role-1].src,
      dec: this.data.gamearr[this.data.role-1].dec
    })
  },

  changestate(){
    let that=this;
    let temparr=[];
    this.data.selectresult.push(this.data.role + '号玩家选择了' + this.data.gamearr[this.data.role - 1].role)
    if(this.data.role>=8){
      that.setData({
        rolelimit:true
      })
    }
    that.setData({
      maskstate:false,
      role: this.data.role + 1,
      selectresult: this.data.selectresult      
    },()=>{
      console.log(this.data.selectresult,'检测选择结果')
    })
  },
  rolecounter(){
    let that=this;
    that.setData({
      
    })
  }


})