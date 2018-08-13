// pages/userinfo/info.js
import util from '../../utils/util';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   * tempData
   */
  data: {
    openid: '',
    full_name: '',
    wechat_name: '',
    email: '',
    phone: '',
    program: '',
    index: 0,
    date: '2000',
    campus:'UTSC',
    // remember to upload the QR_Code to the server
    qrCode: {},
    userInfo: {},
    checkItems: [
      { name: 'GP_Student', value: 'true'},
      { name: 'Non_GP', value: 'false' },
    ],
    GP: '',
    createDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载创建用户时间
    var time = util.formatTime(new Date());
    this.setData({
      createDate: time
    });

    // 再通过setData更改Page()里面的data，动态更新页面的数据
    //加载db里的账户信息并作显示
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
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
    //加载数据库信息
    
    //测试信息
    console.log("QR_Code path is :", this.data.qrCode);
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

  onUnload: function() {
    // Verify again if the user has updated his info
    //util.checkIfUserExistsIfNotForceInfoUpdate();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  toast:function(title){
    wx.showToast({
      title: title,
      duration: 1500
    })
  },

  submit_in: function (e) {
    var that = this;
    //格式检查
    var email_ex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (e.detail.value.full_name == ''){that.toast('姓名不能为空')}
    else if (e.detail.value.wechat_name == ''){that.toast('微信不能为空')}
    else if (e.detail.value.phone == ''){that.toast('手机不能为空')}
    else if (e.detail.value.phone.length != 10) { that.toast('手机格式错误') }
    else if (e.detail.value.email == '') { that.toast('邮箱不能为空') }
    else if (!email_ex.test(e.detail.value.email)) { that.toast('邮箱格式错误') }
    else if (e.detail.value.program == '') { that.toast('专业不能为空') }
    else if (e.detail.value.date == '2000') { that.toast('请设置入学年份') }

    else{

      //TODO：过滤SQL关键字符
      //set data in this page
      that.setData({
        openid: app.globalData.user.UserID,
        full_name: e.detail.value.full_name,
        wechat_name: e.detail.value.wechat_name,
        phone: e.detail.value.phone,
        email: e.detail.value.email,
        program: e.detail.value.program,
        campus: this.data.campus,
        createDate: this.data.createDate,
        //year and GP is in different function
      })

      //upload data
      var upload = {
        UserID:this.data.openid,
        FullName:this.data.full_name,
        WeChatID:this.data.wechat_name,
        PhoneNumber: this.data.phone,
        Email:this.data.email,
        Program: this.data.program,
        Campus: this.data.campus,
        Year:this.data.date,
        CreateDate: this.data.createDate,
        IsGP: this.data.GP,
        QRCodeURL:this.data.qrCode
      }

      //upload or create user by checking the HaveUser
      if(app.globalData.user.HaveUser){
        wx.request({
          url: 'http://localhost:8000/user/update',
          data: upload
        })
      }else{
        console.log(app.globalData.user.HaveUser)
        wx.request({
          url: 'http://localhost:8000/user/create',
          data: upload
        })
      }
    }
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

  //Date picker
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
      // get the local file Pass - need to upload to and get from the server
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
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var checkItems = this.data.checkItems;
    for (var i = 0, len = checkItems.length; i < len; ++i) {
      checkItems[i].checked = checkItems[i].value == e.detail.value
    }

    this.setData({
      checkItems: checkItems,
      GP: e.detail.value
    });
  }
})