Page({
  data:{
    diceArr:[],//生成6位1-6随机数字的空数组
  },
  //生成6位骰子数组
  createDice:function(){
    let that =this;
    let diceLength=6;
    let randomNum=parseInt(Math.random()*diceLength+1);
    let tempArr=[];
    for(var i=0;i<diceLength;i++){
      tempArr.push(parseInt(Math.random() * diceLength + 1))
      that.setData({
        diceArr:tempArr,
      })
    }
  },

})