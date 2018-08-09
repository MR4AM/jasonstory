// index.js
const renger = require('../../utils/trueorfalse.js');
const words = require('../../utils/trueorfalse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shakestate:false,
    words:'',
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(renger.renger.length)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      this.yaoyiyao='';
  },
  //生命周期函数
  onShow: function () {
    this.yaoyiyao();
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
  //选择真心话或大冒险
  trueorfalse:function(type){
    console.log(type)
    let that=this;
    type=type.target.dataset.w;
    if(type == 'words'){
      that.setData({
        words:true
      })
      wx.showModal({
        title: '你选择了真心话',
        content: '摇一摇抽取你的专属真心话',
      })
    }else if(type == 'renger'){
      that.setData({
        words:false,
      })
      wx.showModal({
        title: '你选择了大冒险',
        content: '摇一摇抽取大冒险',
      })
    }
  },
  //关闭遮罩和弹窗
  changestate:function(){
    this.setData({
      shakestate:false
    })
  },
  //微信用户摇一摇
 yaoyiyao:function(){
   let that =this;
   //监听摇一摇
   wx.onAccelerometerChange(function (res) {
     if (res.x > 0.8 && res.y > 0.8) {
       //播放音频
       //音频播放完毕后展示成功结果
       let widx = Math.floor(Math.random() * (words.words.length-1) + 1);
       let ridx = Math.floor(Math.random() * (renger.renger.length - 1) + 1)
       wx.playVoice({
         filePath: '../assets/yaoyiyao.mp3',
         complete: function () {
           //音频播放完毕后展示成功结果
           if(that.data.words){
             that.setData({
               title:words.words[widx],
               shakestate:true,
             })
           }else{
             that.setData({
               title: renger.renger[ridx] ,
               shakestate: true,
             })
           }
         }
       })
     }
   })
 }
 
 
 
})
