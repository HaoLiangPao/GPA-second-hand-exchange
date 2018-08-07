// pages/wantsell/wantsell.js
import util from '../../utils/bookListUtil';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    ImagePaths: [],
    bookname:'',
    bookyear:'',
    instructor:'',
    description:'',
    course_code:'',
    year: '0000',
    // the maximum number of photo uploaded
    maxPhoto: 6,
    notes: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("the length of ImagePaths is:", this.data.ImagePaths.length);
    // default a placeholder picture for uploading
    //if (this.data.ImagePaths === []){
    //}
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
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        /*
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      //启动上传等待中...
      wx.showToast({
        title: '正在上传...',
        icon: 'loading',
        mask: true,
        duration: 10000
      })
      var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
        wx.uploadFile({
          url: util.getClientSetting().domainName + '/home/uploadfilenew',
          filePath: tempFilePaths[i],
          name: 'uploadfile_ant',
          formData: {
            'imgIndex': i
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            uploadImgCount++;
            var data = JSON.parse(res.data);
            //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
            var productInfo = that.data.productInfo;
            if (productInfo.bannerInfo == null) {
              productInfo.bannerInfo = [];
            }
            productInfo.bannerInfo.push({
              "catalog": data.Catalog,
              "fileName": data.FileName,
              "url": data.Url
            });
            that.setData({
              productInfo: productInfo
            });

            //如果是最后一张,则隐藏等待中
            if (uploadImgCount == tempFilePaths.length) {
              wx.hideToast();
            }
          },
          fail: function (res) {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });
      }
        */
        console.log("the response data is:", res);
        console.log("the current that.data is:", that.data);
        // add the newly added picture's filePath to 
        let image_path = that.data.ImagePaths.concat(res.tempFilePaths);
        console.log("impage path is :", image_path);
        // check if maximum number of photo is reached
        if (image_path.length < that.data.maxPhoto){
          that.setData({
            ImagePaths: image_path
          });
        }
        else {
          util.alert("错误", "抱歉，当前版本最多支持6张图片请重新选择");
        }
        console.log("the ImagePath list in global data is :", that.data.ImagePaths);
      },
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
  },

  check:function(){
    
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

  // how to define the checked item??
  checkboxChange: function (e) {
    const that = this;
    that.setData({
      notes: e.detail.value
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
})