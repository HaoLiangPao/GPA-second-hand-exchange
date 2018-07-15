// pages/userinfo/info.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   * tempData
   */
  data: {
    full_name: '',
    wechat_name: '',
    email: '',
    year: '',
    phone: '',
    program: '',
    index: 0,
    date: '2018-09-01',
    // remember to upload the QR_Code to the server
    qrCode: {},
    userInfo: {},
    checkItems: [
      { name: 'GP_Student', value: 'ture'},
      { name: 'Non_GP', value: 'false' },
    ],
    GP: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载db里的账户信息并作显示
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log("lalala");
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  submit_in: function (e) {
    const that = this;
    that.setData({
      full_name: e.detail.value.full_name,
      wechat_name: e.detail.value.wechat_name,
      email: e.detail.value.email,
      phone: e.detail.value.phone,
      program: e.detail.value.program,
      qrCode: e.detail.value.qrCode,
      year: e.detail.value.year
    })
    //wx.navigateTo({url:'../success_submit/success'})
    //在检查通过后对db进行update/insert
  },

  // function to upload pictures
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#11110f",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },
  // picker
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // help function to set filePath
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          qrCode: res.tempFilePaths,
        })
      }
    })
  },

  // how to define the checked item??
  checkboxChange: function (e) {
    const that = this;
    that.setData({
      GP: e.detail.value
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})