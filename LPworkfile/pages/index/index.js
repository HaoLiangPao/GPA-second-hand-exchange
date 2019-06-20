const util = require('../../utils/util.js');
import config from '../../utils/config';
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

  onLoad: function () {
    var tryToGetUserInfo = function () {
      //读取数据库中用户信息并存在globaldata中
      var upload = {
        UserID: app.globalData.user.UserID
      }
      var url = 'http://' + config.serverURL +'/user/getInfo';
      console.log(url)
      var result = undefined;
      var success_cb = function (res, page) {
        // The content of 'res': res.data, res.header, res.statusCode, res.errMsg
        if (res.header.Status == 1) {
          console.log("数据库中未找到此用户")
        }
        else {
          result = JSON.parse(res.data)[0]; 
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
        }
      util.checkIfUserExistsIfNotForceInfoUpdate();
    };
      var failure_cb = function (err, page) { util.alert("错误", "获取数据失败" + JSON.stringify(err)) };
      util.doGET(url, upload, success_cb, failure_cb, this)
    }
    //读取数据库中用户po书本信息并存在global data中
    var upload = {
      OwnerID: app.globalData.user.UserID
    }
    var url = 'http://' + config.serverURL +'/search/display/user';
    var result = undefined;
    var success_cb = function (res, page) {
      if (res.header.Status == 1) {
        console.log("提交数据库中没有此用户")
      }
      else {
        result = JSON.parse(res.data); 
        app.globalData.user_books.book_info = result;
        var obj_count;
        for (obj_count = 0; obj_count < result.length; obj_count++) {
          app.globalData.user_books.book_info[obj_count]["BookPhotoURL"] =
            app.globalData.user_books.book_info[obj_count]["BookPhotoURL"].split(",")
        }
        console.log(app.globalData.user_books.book_info)
      }
    };
    var failure_cb = function (err, page) { util.alert("错误", "获取数据失败" + JSON.stringify(err)) };
    util.doGET(url, upload, success_cb, failure_cb, this)
    util.forceUpdateWeChatToTheLatestVersion(tryToGetUserInfo);
  },

  //页面加载完成
  onReady: function (){
  },

  getUserInfo: function (e) {
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

  getInput: function(e) {
    this.setData({ searchInput : e.detail.value})
  },

  //搜索方程
  query: function (e) {
    console.log(this.data.searchInput)
    wx.navigateTo({
      url: '../bookList/bookList?mode=search&value=' + this.data.searchInput + '%'
    })
  },

  egg: function (){
    wx.showToast({
      title: 'WSYNB',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  }
})
