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
   date:'',
   region: ['广东省', '广州市', '海珠区'],
   customItem: '全部',
   imgUrls: [
     'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
     'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
     'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
   ],
   indicatorDots: true,
   autoplay: true,
   interval: 5000,
   duration: 1000,
   color: "orange",
   coloractive: "#fff",
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加定位
    //this.getLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.startRecord()
      }
    })
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.record']) {
        }
      }
    })
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
  onShow:function(){
   
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
  //日期选择函数
  bindDateChange:function(e){
    console.log(e,'检测时间控件返回对象')
    let that=this;
    that.setData({
      date:e.detail.value
    })
  },
  //省份选择函数
  bindRegionChange:function(e){
    console.log(e,'检测省份返回对象')
    let that=this;
    that.setData({
      region:e.detail.value
    })
  },
  //获取定位
  getLocation: function () {
    console.log("正在定位城市");
    this.setData({
      county: ''
    })
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
          success: res => {
            console.log(res)
            that.getWeather(res.data.result.ad_info.city)
            // console.log(res.data.result.ad_info.city+res.data.result.ad_info.adcode);
            that.setData({
              location: res.data.result.ad_info.city,
              currentCityCode: res.data.result.ad_info.adcode,
              county: res.data.result.ad_info.district
            })
          },
          fail:res=>{
            alert('定位失败，请打开你手机的定位功能')
          }
        })
      }
    })
  },
  //获取对应城市天气
  getWeather:function(city){
    wx.request({
      data:{city:city},
      url: 'http://wthrcdn.etouch.cn/weather_mini',
      success:(res)=>{
        console.log(res,'检查res')
      }
    })
  },
  //获取qq头像及昵称的接口
  getQQmsg:function(){
    let qq=1479856243;
    wx.request({
      url:`http://r.qzone.qq.com/cgi-bin/user/cgi_personal_card?uin=${qq}`,
      success:(res)=>{
        console.log(res,'检测qq信息')
      },
    })
  },
  //获取翻译信息
  getLan:function(){
    let q='你好';
    wx.request({
      url:`http://www.youdao.com/smartresult-xml/search.s?jsFlag=true&type=mobile&q=${q}`,
      success:(res)=>{
        console.log(res,'检测翻译接口返回信息')
      }
    })
  },
})