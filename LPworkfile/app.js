import bookListUtil from './utils/bookListUtil';
import util from './utils/util';
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

    bookListUtil.getStorageDataSync('visited', (data) => {
      this.globalData.visitedBooks = data;
    });
  },
  // global data
  globalData: {
    user_books: {
      book_info:[]
    },
    user: {
      HaveUser:false,
      UserID: 'val1',//should be the openid which will be set at the index page
      FullName: '',
      WeChatID: '',
      PhoneNumber: '未填写',
      Email: '未填写',
      Program: '未填写',
      Campus: '',
      Year: '未填写',
      CreateDate: '',
      IsGP: '',
      QRCodeURL: {}
    },
    bookData: [{}],
    visitedBooks: '',
    temp_info:{}
  }
};
App(handler);