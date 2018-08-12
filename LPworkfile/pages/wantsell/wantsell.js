// pages/wantsell/wantsell.js
import util from '../../utils/util';
const app = getApp();


const ImagePathsDefault = ["/image/book-flat.png",
  "/image/book-open-flat.png",
  "/image/book-flat.png",
  "/image/book-open-flat.png",
  "/image/book-flat.png",
  "/image/book-open-flat.png"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateInfoRequestData: {},
    ImagePaths: ImagePathsDefault,
    index: 0,
    year: '2000',
    // the maximum number of photos to upload
    maxNumPhotos: 6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("the length of ImagePaths is:", this.data.ImagePaths.length);
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
    var page = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#11110f",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            page.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            page.chooseWxImage('camera')
          }
        }
      }
    })

  },

  chooseWxImage: function (albumOrCamera) {
    var page = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: [albumOrCamera],
      success: function (res) {
        // Record the images' temp file path
        for (var i = 0; i < res.tempFilePaths.length; i++ ) {
          page.data.ImagePaths[i] = res.tempFilePaths[i];
        }
        // check if maximum number of photos is reached
        if (page.data.ImagePaths.length <= page.data.maxNumPhotos){
          page.setData({
            ImagePaths: page.data.ImagePaths
          });
        }
        else {
          util.alert("错误", "抱歉，当前版本最多支持6张图片请重新选择");
        }
      }
    })
  },

  submit_in: function (e) {
    // DEFAULT e.detail.value: {course_code: "", bookname: "", instructor: "", hasNote: "false", description: "" } TODO: Add price
    console.log(e.detail.value);

    /**
     *  validate input
     */

    var isCourseCodeValid = /^\w\w\w(\w|\d)\d\d$/.test(e.detail.value.course_code);
    var isBookNameValid = /^(\w|\s|\d)+$/.test(e.detail.value.bookname) && e.detail.value.bookname.length <= 50;
    var isInstructorValid = /^(\w|\s)+$/.test(e.detail.value.instructor.length) && e.detail.value.instructor.length <= 50;
    var isDescriptionValid = e.detail.value.description.length < 200;
    console.log("================================");
    console.log(isCourseCodeValid);
    console.log(isBookNameValid);
    console.log(isInstructorValid);
    console.log(isDescriptionValid);
    console.log("================================");
    if ( !(isCourseCodeValid ) ) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: '好的！',
        content: '请输入合法数据。要求：'
          + '（1）课程代码需满足形式"AAAA00"或者“AAA000”'
          + '（2）很丑，无法空行，对不起😞'
      })
    }
    else if (!isBookNameValid) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: '好的！',
        content: '请输入合法数据。要求：'
        + '（1）书本名称只能包含字母数字和空格，且不超过50个字'
        + '（2）很丑，无法空行，对不起😞'
      })
    }
    else if (!isInstructorValid) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: '好的！',
        content: '请输入合法数据。要求：'
        + '（1）讲师姓名只能包含字母和空格，且不超过50个字'
        + '（2）很丑，无法空行，对不起😞'
      })
    }
    else if (!isDescriptionValid) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmText: '好的！',
        content: '请输入合法数据。要求：'
        + '（1）书本描述不能超过200个字'
        + '（5）很丑，无法空行，对不起😞'
      })
    }

    // User input data
    this.data.updateInfoRequestData = {
      OwnerID: app.globalData.user.UserID,
      BookTitle: e.detail.value.bookname,
      BookPhotoURL: "",
      CourseCode: e.detail.value.course_code,
      Instructor: e.detail.value.instructor,
      TakeYear: this.data.year,
      Description: e.detail.value.description,
      CreateDate: util.formatTime(new Date()),
      Price: '0.0',
      HasNotes: e.detail.value.hasNote
    };

    var doUpdateInfoRequest = function (urlData, concatedURLs) {
      console.log("\n");
      console.log("进入doUpdateInfoRequest");
      console.log("\n")
      urlData.BookPhotoURL = concatedURLs.join();
      var successUpdateInfoCb = function (res) {
        var result = res.data;
        if (res.statusCode != 200) { // fail
          util.alert("错误", "更新数据失败 " + JSON.stringify(result));
        }
      };
      var failUpdateInfoCb = function (err) {
        util.alert("错误", "更新数据失败 " + JSON.stringify(err));
      };
      util.doGET("http://localhost:8000/post/create", urlData, successUpdateInfoCb, failUpdateInfoCb);
    }

    /**
     *  Upload images and get the image URLs responded from server
     */

    var concatedURLs = [];
    var aggErrors = [];
    var passedUploadingStatus = [];
    var successImgUploadCustomCb = function (res, aggErrors, concatedURLs) {
      var result = res.data;
      if (res.statusCode == 200) { // success
        var urlArray = JSON.parse(result);
        var url = urlArray[0].BookPhotoURL;
        concatedURLs.push(url);
      } else {
        aggErrors.push(result);
      }
    };
    var failImgUploadCustomCb = function (err, aggErrors) { aggErrors.push(err) };
    var uploadImage = function (page, i, aggErrors, concatedURLs, successImgUploadCustomCb, failImgUploadCustomCb) { // "page" is the page object, "i" is the image index in the array page.data.ImagePaths
      console.log("\n");
      console.log(i);
      console.log("\n");
      if ( i == page.data.ImagePaths.length ) {
        // All image uploading have finished
        var ifAllsucceeded = i == concatedURLs.length;
        if ( ifAllsucceeded ) {

          /**
           *  Update book info with the input data and responded image URLs
           */

          doUpdateInfoRequest(page.data.updateInfoRequestData, concatedURLs);
        }
        else { // At least one of the image uploading failed
          util.alert("错误", "上传图片失败。详细信息：" + aggErrors.join());
          // TODO: Server has to delete all the uploaded images for this book
        }
      }
      else {
        // Upload this image
        wx.uploadFile({
          url: util.buildURL("http://localhost:8000/bookImage/upload?", {
            OwnerID: app.globalData.user.UserID,
            BookTitle: e.detail.value.bookname
          }),
          filePath: page.data.ImagePaths[i],
          name: 'whatever',
          success: function (res) {
            successImgUploadCustomCb(res, aggErrors, concatedURLs);
          },
          fail: function (err) {
            failImgUploadCustomCb(err, aggErrors);
          },
          complete: function () { // TODO: Verify that complete happens after success/fail
            uploadImage(page, i + 1, aggErrors, concatedURLs, successImgUploadCustomCb, failImgUploadCustomCb); // Upload next image
          }
        })
      }
    };
    uploadImage(this, 0, aggErrors, concatedURLs, successImgUploadCustomCb, failImgUploadCustomCb);
  },

  /**
   * Picker listener -- record the course taken year information
   */
  bindDateChange: function (e) {
    this.setData({
      year: e.detail.value
    })
  }
})