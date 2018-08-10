Page({
  data:{},
  //页面跳转
  linkTo:function(url){
    let turl = url.target.dataset.url
    wx.navigateTo({
      url:turl,
    })
  }
})