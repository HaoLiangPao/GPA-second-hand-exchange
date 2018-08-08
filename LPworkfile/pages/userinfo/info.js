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
    year: '',
    phone: '',
    program: '',
    index: 0,
    date: '0000',
    campus:'UTSC',
    // remember to upload the QR_Code to the server
    qrCode: {},
    userInfo: {},
    checkItems: [
      { name: 'GP_Student', value: 'ture'},
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
    console.log("QR_Code path is :", qrCode);
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
    else if (e.detail.value.year == '0000') { that.toast('入学年不能为空') }

    else{
      that.setData({
        openid: app.globalData.user.UserID,
        //Math.random().toString(36).substr(2, 15),
        full_name: e.detail.value.full_name,
        wechat_name: e.detail.value.wechat_name,
        phone: e.detail.value.phone,
        email: e.detail.value.email,
        program: e.detail.value.program,
        campus: this.data.campus,
        year: '1234',
        createDate: this.data.createDate,
        GP: 'true',
      })

      var upload = {
        UserID:this.data.openid,
        FullName:this.data.full_name,
        WeChatID:this.data.wechat_name,
        PhoneNumber: this.data.phone,
        Email:this.data.email,
        Program: this.data.program,
        Campus: this.data.campus,
        Year:this.data.year,
        CreateDate: this.data.createDate,
        IsGP: this.data.GP,
        QRCodeURL:this.data.qrCode
      }
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
    const that = this;
    that.setData({
      GP: e.detail.value
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})