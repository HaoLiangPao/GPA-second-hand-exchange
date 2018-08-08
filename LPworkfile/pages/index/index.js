const util = require('../../utils/util.js')
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
    //读取数据库中用户信息并存在globaldata中
    var upload = {
      UserID: app.globalData.user.UserID
    }
    var url = 'http://localhost:8000/user/getInfo';
    var result = undefined;
    var success_cb = function (res) {
      if (res.header.Status == 1) {
        console.log("数据库中未找到此用户")
      }
      else {
        result = JSON.parse(res.data)[0]; // result should be a JSON array and should have only one object
        //console.log(result);

        //设置用户全局变量
        app.globalData.user.HaveUser = true;
        app.globalData.user.UserID = result['UserID'];
        app.globalData.user.Campus = result['Campus'];
        app.globalData.user.CreateDate = result['CreateDate'];
        app.globalData.user.Email = result['Email'];
        app.globalData.user.FullName = result['FullName'];
        app.globalData.user.IsGP = result['IsGP'];
        app.globalData.user.PhoneNumber = result['PhoneNumber'];
        app.globalData.user.Program = result['Program'];
        app.globalData.user.QRCodeURL = result['QRCodeURL'];
        app.globalData.user.WeChatID = result['WeChatID'];
        app.globalData.user.Year = result['Year'];

        //console.log(app.globalData.user.HaveUser)
      }
    };
    var failure_cb = function (err) { util.alert("错误", "获取数据失败" + JSON.stringify(e)) };
    util.doGET(url, upload, success_cb, failure_cb)
  },

  //页面加载完成
  onReady: function () {
    //提示用户填写信息
    if (app.globalData.user.HaveUser == false) {
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
