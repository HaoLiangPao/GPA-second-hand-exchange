const util = require('../../utils/util.js')
const app = getApp()
var path = app.globalData.user_books.book_info


Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    motto: '欢迎使用二手书平台',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchInput: "",
    tempFilePaths: ''
  },
  /*//事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function () {
    //读取数据库中用户信息并存在globaldata中
    var upload = {
      UserID: app.globalData.user.UserID
    }
    var url = 'http://localhost:8000/user/getInfo';
    var result = undefined;
    var success_cb = function (res) {
      // The content of 'res': res.data, res.header, res.statusCode, res.errMsg
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

    //读取数据库中用户po书本信息并存在global data中
    var upload = {
      OwnerID: app.globalData.user.UserID
    }
    var url = 'http://localhost:8000/search/display/user';
    var result = undefined;
    var success_cb = function (res) {
      if (res.header.Status == 1) {
        console.log("提交数据库中没有此用户")
      }
      else {
        result = JSON.parse(res.data); // result should be a JSON array and should have only one object
        app.globalData.user_books.book_info = result;
        var obj_count;
        for (obj_count = 0; obj_count < result.length; obj_count++) {
          app.globalData.user_books.book_info[obj_count]["BookPhotoURL"] =
            app.globalData.user_books.book_info[obj_count]["BookPhotoURL"].split(",")
        }
        console.log(app.globalData.user_books.book_info)
      }
    };
    var failure_cb = function (err) { util.alert("错误", "获取数据失败" + JSON.stringify(e)) };
    util.doGET(url, upload, success_cb, failure_cb)
  },

  //页面加载完成
  onReady: function(){
    util.forceUpdateWeChatToTheLatestVersion(util.checkIfUserExistsIfNotForceInfoUpdate);
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
  getInput: function(e) {
    this.data.searchInput = e.detail.value
  },

  //搜索方程 （待接课程编码）
  query: function (e) {
    wx.navigateTo({
      url: '../bookList/bookList?mode=search&value=' + this.data.searchInput
    })
    //var url = "http://localhost:8000/search/byBook";//查询数据的URL
    //console.log("YES!")
    // 搜索：获取数据库书本数据
    //util.doGET(url, { BookTitle: "val3" }, function (res) {
      //wx.navigateTo({
        //url: util.buildURL('../detail/detail?', res.data[0]),
      //})
    //}, function (err) { util.alert("错误", "获取数据失败" + JSON.stringify(e))})
  },

  BookList: function () {
    wx.navigateTo({
      url: '../bookList/bookList?mode=newBook',
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
