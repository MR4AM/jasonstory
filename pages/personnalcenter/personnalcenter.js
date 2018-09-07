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
    avatarUrl:'',
    nickName:'',
    msg:['头像','昵称','生日','所属地区']
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
    this.getuserInfo();
    this.socketio();
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

  },
  //生命周期函数
  onShow: function () {
   
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
  //socket连接
  socketio(){
    wx.connectSocket({
      url: 'http://localhost:433'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
  },
  //日期选择函数
  bindDateChange: function (e) {
    console.log(e, '检测时间控件返回对象')
    let that = this;
    that.setData({
      date: e.detail.value
    })
  },
  //省份选择函数
  bindRegionChange: function (e) {
    console.log(e, '检测省份返回对象')
    let that = this;
    that.setData({
      region: e.detail.value
    })
  },
 //获取用户信息
 getuserInfo:function(){
   let that = this;
   wx.getUserInfo({
     success:(res)=>{
       that.setData({
         avatarUrl: res.userInfo.avatarUrl,
         nickName:res.userInfo.nickName
       })
       console.log(res)
     }
   })
 },
 //选择本机图片
 chooseimage: function () {
   var _this = this
   wx.chooseImage({
     count: 1, // 默认9
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
       var tempFilePaths = res.tempFilePaths;
       console.log(res.tempFilePaths, '检测当前图片路径')
       _this.setData({
         avatarUrl: res.tempFilePaths
       })
     }
   })
 },
})
