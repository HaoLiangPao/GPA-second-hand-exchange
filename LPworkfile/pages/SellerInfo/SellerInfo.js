// pages/SellerInfo/SellerInfo.js

const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    program: 'Not Avaliable',
    phonecall: 'Not Avaliable',
    name: 'Not Avaliable',
    email:'Not Avaliable',
    wechatID:'Not Avaliable',
    entryYear:'Not Avaliable'
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
    console.log(app.globalData.user.temp_info)
    this.setData({
      email: app.globalData.user.temp_info["Email"],
      name: app.globalData.user.temp_info["FullName"],
      phonecall: app.globalData.user.temp_info["PhoneNumber"],
      program: app.globalData.user.temp_info["Program"],
      wechatID: app.globalData.user.temp_info["WeChatID"],
      entryYear: app.globalData.user.temp_info["Year"]
    })
  }
})