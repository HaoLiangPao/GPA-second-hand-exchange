//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
    imgUrls: [
      "../../image/book_image.jpeg",
      "../../image/gpa.jpg",
      "../../image/gpa_qr.jpg"
    ],
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

  bindBarcodeInput: function (e) {
    this.setData({
      barcode: e.detail.value
    })
  },
  bindFocus: function (e) {
    this.setData({
      hiddenDropdown: false,
      hiddenClear: false
    })
  },
  bindcodeBlur: function (e) {
    this.setData({
      hiddenDropdown: true,
      hiddenClear: true
    })
  },

  setDemoData: function (e) {
    this.setData({
      coursecode: this.data.demoData
    });
  },
  clear: function (e) {
    this.setData({
      coursecode: "",
      hiddenData: true
    });
  },
  //照片查书(硬编码未完成)
  scan: function (e) {
    var that = this;
    wx.scanCode({
      success: function (res) {
        that.setData({
          barcode: res.result
        });
        that.query(e);
      },
      fail: function () {
        that.setData({
          barcode: "",
          hiddenData: true
        });
      },
      complete: function () {
        // complete
      }
    })
  },

  //搜索方程 （待接课程编码）
  query: function (e) {
    var url = "https://www.xxx.com/query";//查询数据的URL
    var that = this;
    if (that.data.coursecode == undefined
      || that.data.coursecode == null
      || that.data.coursecode.length <= 0) {
      that.setData({ hiddenData: true });
      wx.showToast({
        title: 'Enter Course',
        image: '/image/info.png',
        duration: 2000
      });
      return;
    }
    // 搜索：获取数据库书本数据
    wx.request({
      url: url,
      data: { coursecode: that.data.coursecode },
      method: 'GET',
      success: function (res) {
        var result = res.data;
        if (result.Status != 0) {
          that.setData({ hiddenData: true });
          wx.showToast({
            title: result.Message,
            image: '/images/fail.png',
            duration: 2000
          })
          return;
        }
        that.setData({ Product: result.Data, hiddenData: false });
        wx.showToast({
          title: "获取数据成功",
          image: '/images/ok.png',
          duration: 2000
        })
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
        that.setData({
          hiddenLoading: !that.data.hiddenLoading,
          hiddenData: true
        });
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        })
      },
      complete: function () {
        // complete
      }
    })
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
  }
})
