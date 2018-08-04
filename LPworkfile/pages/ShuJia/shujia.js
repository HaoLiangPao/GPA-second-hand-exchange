// pages/ShuJia/shujia.js
var app = getApp()
var my_book = ["Books1","Books2","Book3s","Books4"]
var arr_link = [1,2,3,4]
var file = ""

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      id: "1",
      src: "../../image/pig.jpg",
      text: my_book[0],
    },
      {
        id: "2",
        src: "../../image/pig.jpg",
        text: my_book[1]
      },

      {
        id: "3",
        src: "../../image/pig.jpg",
        text: my_book[2]
      },

      {
        id: "4",
        src: "../../image/pig.jpg",
        text: my_book[3]
      },
    
    ],
    url: file,
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
  
  },

  wantsell: function () {
    wx.navigateTo({
      url: '../wantsell/wantsell'
    })
  },

  history:function (){
    wx.showToast({
      title: '选择下架',
      image: '/image/info.png',
      duration: 2000
    });
    wx.navigateTo({
      url: '../history/history'
    })
  },

  /**
   * delete button
   * 
   * change it to 
   * 
   */





})