// pages/wantsell/wantsell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    tempFilePaths: {},
    bookname:'',
    bookyear:'',
    instructor:'',
    description:'',
    course_code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

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

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count:6,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths,
        })
      }
    })
  },

  submit_in: function(e){
    const that = this;
    that.setData({
      course_code:e.detail.value.course_code,
      bookname: e.detail.value.bookname,
      bookyear: e.detail.value.bookyear,
      instructor: e.detail.value.instructor,
      description: e.detail.value.description
    })
      //wx.navigateTo({url:'../success_submit/success'})
  },

  check:function(){
    
  }
})