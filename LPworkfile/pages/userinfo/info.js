// pages/userinfo/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first_name: '',
    second_name: '',
    wechat_name: '',
    email: '',
    phone: '',
    program: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载db里的账户信息并作显示
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

  submit_in: function (e) {
    const that = this;
    that.setData({
      first_name: e.detail.value.first_name,
      second_name: e.detail.value.second_name,
      wechat_name: e.detail.value.wechat_name,
      email: e.detail.value.email,
      phone: e.detail.value.phone,
      program: e.detail.value.program
    })
    //wx.navigateTo({url:'../success_submit/success'})
    //在检查通过后对db进行update/insert
  }
})