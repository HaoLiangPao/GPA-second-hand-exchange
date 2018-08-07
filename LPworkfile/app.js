import util from './utils/bookListUtil';
import * as Mock from './utils/mock'
let handler = {
  // initialize the mini program
  onLaunch() {
    console.log('app init...');
    /*
     store some local storage data
     
    */

    //获取用户暂时登陆凭证code以获取进一步openid
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    util.getStorageDataSync('visited', (data) => {
      this.globalData.visitedBooks = data;
    });
  },
  // global data
  globalData: {
    openid:'1',
    user: {
      name: '',
      avator: ''
    },
    bookData: [{}],
    visitedBooks: ''
  }
};
App(handler);

/*
//app.js
App(
  {onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else {

        }
      }
    })
  },
  globalData: {
    userInfo: []
  }
})
*/