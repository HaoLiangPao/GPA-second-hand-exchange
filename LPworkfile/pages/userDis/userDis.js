// pages/userDis/userDis.js

const app = getApp()
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonecall: app.globalData.user.PhoneNumber,
    program: app.globalData.user.Program,
    email: app.globalData.user.Email,
    year: app.globalData.user.Year,
    userInfo: {},
    // if the page is entered from bookList -- seller info
    qrCode: {},
    fromSale: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //get the user info and try to display
    this.setData({
      phonecall: app.globalData.user.PhoneNumber,
      program: app.globalData.user.Program,
      email: app.globalData.user.Email,
      year: app.globalData.user.Year,
    })
    // WeChat name and WeChat profile picture
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // how to get the variable passed from "Detail page?"
    if (app.globalData.fromSale === true){
      console.log("UserDis onLoad -- the fromSale is true:", fromSale);
      this.setData({
        fromSale: true
      })
    }


    // set data process for QR_Code
    if (this.qrCode === undefined){
      console.log("this user did not have any QR_Code uploaded.");
      this.setData({
        qrCode: { 0: "/image/image_notyetavailable.jpg" },
      })
    }
    else{
      // request data from the server -- get the qrCode URL

      
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

  call: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  },

  edit: function (){
    wx.navigateTo({
      url: '/pages/userinfo/info',
    })
  }
})