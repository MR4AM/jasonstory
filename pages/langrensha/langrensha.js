//测试数据
const gamedata = require('../../utils/lrsdata.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskstate:false,
    gamearr:[],//角色数组
    src:'',
    dec:'',
    role:1,
    faguan:15,
    rolelimit:false,//角色人数限制
    start:false,//是否开启游戏
    selectresult:[],//选择结果,
    end:false,//选人结束
    rolenum:'',//玩家人数
    outarr:[],//淘汰玩家的数组,
    outnum:0,//淘汰人数
  },

  //，，10人局4民3杀神3神，11人局4民3杀4神，12人局4民4杀4神
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
    
  },
  selectnum(e){
    this.setData({
      rolenum:e.detail.value
    })
  },
  creategame:function(num1,num2){
    console.log(666)
    let temparr = gamedata.gamedata;
    let selectarr = [];
    for (var i = 0; i < temparr.length; i++) {
      switch (temparr[i].role) {
        case '平民':
          for (var a = 0; a < num1; a++) {
            selectarr.push(temparr[i]);
          }
          break;
        case '狼人':
          for (var b = 0; b < num2; b++) {
            selectarr.push(temparr[i]);
          }
          break;
        case '女巫':
          selectarr.push(temparr[i]);
          break;
        case '守卫':
          selectarr.push(temparr[i]);
          break;
        case '预言家':
          selectarr.push(temparr[i]);
          break;
      }
      //将对应的角色按比例加入数组后再打乱数组
      this.setData({
        gamearr: selectarr.sort(this.randomsort),
        start:true,
      }, () => {
        console.log(this.data.gamearr, '检测游戏角色gamearr')
      })
    }
  },
  start(){
    console.log(this.data.rolenum, '检测玩家输入的值oooo')
    if(!this.data.rolenum){
      wx.showModal({
        title: '开局提示',
        content: '请输入玩家人数',
        success: function (res) {
        }
      })
    }
    switch(Number(this.data.rolenum)){
      case 8:
      // 8人局3民2杀3神
      this.creategame(3,2);
      break;
      case 9:
      // 9人局3民3杀3神
      this.creategame(3,3)
      break;
      case 10:
      // 10人局4民3杀神3神
      this.creategame(4,3)
      break;
    }
  },
  maskShow(){
    let that=this;
    //测试随机抽取角色
    let ram=Math.floor(Math.random()*19+1);
    if (this.data.role > Number(this.data.rolenum)){
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
    this.data.selectresult.push(this.data.role + '号玩家是' + this.data.gamearr[this.data.role - 1].role)
    if (this.data.role >= Number(this.data.rolenum)){
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
  },
  out(e){
    let that =this;
    console.log(Number(e.target.dataset.item.slice(0, 1)),'淘汰玩家的索引值');
    this.setData({
      outnum:this.data.outnum+1
    },()=>{
      wx.showModal({
        title: '玩家淘汰',
        content: '确定淘汰' + Number(e.target.dataset.item.slice(0, 1))+'号玩家',
        success: function (res) {
          if(res.confirm){
            console.log(666666)
            that.data.outarr.push(e.target.dataset.item.slice(0, 4));
            let outidx = Number(e.target.dataset.item.slice(0, 1));
            that.data.selectresult.splice(outidx - that.data.outnum, 1);
            that.setData({
              selectresult: that.data.selectresult,
            })
            that.setData({
              outarr: that.data.outarr
            }, () => {
              let tempstr = that.data.selectresult.join('');
              //胜负规则
              //民全死或神全死，狼人赢。狼人全死，平民方赢
              if (tempstr.indexOf('平民') == -1) {
                wx.showModal({
                  title: '游戏结束',
                  content: '平民全部淘汰，狼人赢',
                  success: function (res) {
                  }
                })
              } else if (tempstr.indexOf('守卫') == -1 && tempstr.indexOf('预言家') == -1 && tempstr.indexOf('女巫') == -1) {
                wx.showModal({
                  title: '游戏结束',
                  content: '神全部淘汰，狼人赢',
                  success: function (res) {
                  }
                })
              } else if (tempstr.indexOf('狼人') == -1) {
                wx.showModal({
                  title: '游戏结束',
                  content: '狼人全部淘汰，平民和神赢',
                  success: function (res) {
                  }
                })
              }

              console.log(this.data.selectresult, '更新玩家存活')
            })
          }
        }
      })
    })
    
  },
  //随机打乱数组
  randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  },
  //两个数组相减
  arrcount(arr1,arr2){
    var arr3 = [];
    return arr1.forEach((a) => {
      let c = arr2.findIndex(b => a == b);
      if (c > -1){
        delete arr2[c];
      }else{
        arr3.push(a);}
    });
  }

})