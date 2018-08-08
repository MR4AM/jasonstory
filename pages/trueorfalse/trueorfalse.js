// index.js
const appInstance = getApp();
const city = require('../../utils/city.js');
const cityObjs = require('../../utils/city.js');
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: appInstance.globalData.defaultCity,
    county: appInstance.globalData.defaultCounty,
    date: '',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
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
    this.setData({
      location: appInstance.globalData.defaultCity,
      county: appInstance.globalData.defaultCounty
    })
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
 //微信用户摇一摇
 yaoyiyao:()=>{
   //监听摇一摇
   wx.onAccelerometerChange(function (res) {
     if (res.x > 0.8 && res.y > 0.8) {
       //播放音频
       //音频播放完毕后展示成功结果
       let qa = ['真心话', '大冒险', '去哪里嫖', '亲一个女生', '亲一个男生', '认识一个异性', '想你女朋友吗', '回来吧', '恭喜你', '哈哈哈']
       let idx = Math.floor(Math.random() * 9 + 1);

       wx.playVoice({
         filePath: '../assets/yaoyiyao.mp3',
         complete: function () {
           console.log(6666, '检测用户是执行该操作是否成功')
           //音频播放完毕后展示成功结果
           wx.showModal({
             title: qa[idx],
             duration: 5000
           })
         }
       })
     }
   })
 }
 
 
 
})
