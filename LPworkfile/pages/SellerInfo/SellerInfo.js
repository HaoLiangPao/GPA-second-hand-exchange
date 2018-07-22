// pages/SellerInfo/SellerInfo.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonecall: '',
    userInfo: {},
    // if the page is entered from bookList -- seller info
    // get the QR_Code from the server?
    qrCode: {},
    email:'',
    fromSale: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




    // need to get seller's WeChat info from the server



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

    // set data process for QR_Code
    if (this.qrCode === undefined) {
      console.log("\nthis user did not have any QR_Code uploaded.");
      this.setData({
        qrCode: { 0: "/image/image_notyetavailable.jpg" },
      })
    }
    else {
      // request data from the server -- get the qrCode URL
    }

    // set data process for phone number
    if (this.phonecall === undefined){
      console.log("this user did not set phone number.");
      this.setData({
        phonecall:' Not Available '
      })
    }
    else{
      // request data from the server -- get the phone number
    }

    // set data process for email
    if (this.qrCode === undefined) {
      console.log("\nthis user did not have any QR_Code uploaded.");
      this.setData({
        email: " Not Available "
      })
    }
    else {
      // request data from the server -- get the email
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

  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  }
})