const util = require('../../utils/util.js')

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    motto: '欢迎使用二手书平台',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tempFilePaths: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    /*
    wx.showModal({
      title: '提示',
      content: '请填写个人信息以进行交易',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../userinfo/info'
          })
        }
      }
    })*/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setDemoData: function (e) {
    this.setData({
      coursecode: this.data.demoData
    });
  },
  //照片查书(硬编码未完成)
  scan: function (e) {
    var that = this;
    wx.showToast({
      title: '功能敬请期待',
      image: '/image/pig.jpg',
      duration: 2000
    });
    //wx.scanCode({
    //  success: function (res) {
    //    that.setData({
    //      barcode: res.result
    //    });
    //    that.query(e);
    //  },
    //  fail: function () {
    //    that.setData({
    //      barcode: "",
    //      hiddenData: true
    //    });
    //  },
    //  complete: function () {
        // complete
    //  }
    //})
  },

  //搜索方程 （待接课程编码）
  query: function (e) {
    var url = "http://localhost:8000/search/byBook";//查询数据的URL
    console.log("YES!")
    // 搜索：获取数据库书本数据
    util.doGET(url, { BookTitle: "val3" }, function (res) {
      wx.navigateTo({
        url: util.buildURL('../detail/detail?', res.data[0]),
      })
    }, function (err) { util.alert("错误", "获取数据失败" + JSON.stringify(e))})
  },

  BookList: function () {
    wx.navigateTo({
      url: '../bookList/bookList',
    })
  },

  CourseType: function () {
    wx.navigateTo({
      url: '../CourseType/CourseType',
    })
  },

  egg: function (){
    wx.showToast({
      title: '老铁，不存在的',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  }
})
