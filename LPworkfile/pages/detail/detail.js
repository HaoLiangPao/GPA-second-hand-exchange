import util from '../../utils/bookListUtil';
import commonUtil from '../../utils/util.js';
import config from '../../utils/config';

let app = getApp();
const NA = "N/A";

Page({

  data: {
    detailData: {},
    userData: {},
    fromSale: false,
    hiddenLoading: true
  },

  /**
   * Update the page view with current book data
   */
  flushNewDataToPageView(){
    this.setData({
      detailData: this.data.detailData
    })
  },

  /**
   * option contains:
   * 
   * option.OwnerID -- owner id
   * option.BookTitle -- book title
   * option.BookPhotoURL -- book photo URL
   * option.CourseCode -- course code (CSCA08, MATA37...)
   * option.Instructor -- instructor name
   * option.TakeYear -- the year in which the owner took the course
   * option.Price -- price
   * option.CreateDate -- The time this post is created
   * option.Description -- The description of the book
   * option.HasNotes -- If the book posting includes notes or not
   * 
   */
  onLoad(option) {
    this.showLoading();
    console.log(commonUtil.EYE_CATCHER + "\ndetail.js page parameters:");
    console.log(option);
    console.log("\n" + commonUtil.EYE_CATCHER);
    // to indicate how the users get to this place
    this.setData({
      isFromShare: !!option.share
    });
    for (var property in option) {
      this.data.detailData[property] = decodeURIComponent(option[property]);
    }
    console.log(commonUtil.EYE_CATCHER + "\nDEBUG: Updated data:");
    console.log(this.data.detailData);
    console.log("\n" + commonUtil.EYE_CATCHER);
    // Get the book owner's information
    var url = "http://localhost:8000/user/getInfo";
    var data = {
      UserID: this.data.detailData.OwnerID
    };
    var resolve = function (res, page) {
      page.data.userData = JSON.parse(res.data)[0];
      console.log(commonUtil.EYE_CATCHER + "\nDEBUG: User data:");
      console.log(page.data.userData);
      console.log("\n" + commonUtil.EYE_CATCHER);
      page.flushNewDataToPageView();
      page.hideLoading();
    };
    var reject = function (err, page) {
      commonUtil.alert("错误", "获取数据失败" + JSON.stringify(err));
      page.flushNewDataToPageView();
      page.hideLoading();
    };
    commonUtil.doGET(url, data, resolve, reject, this);
    //this.init(id);
  },

  showLoading() {
    this.setData({
      hiddenLoading: false
    })
  },

  hideLoading() {
    this.setData({
      hiddenLoading: true
    })
  },

  // work as a constructor
  /*init(contentId) {
    // only do the following process when contentID exists
    if (contentId) {
      this.requestDetail(contentId)
        // print the message out for debug purpose
        .then(data => {
          // reset the data
          this.configPageData(data)
          util.log(data)
        })
    }
  },*/


  // request for detail information
  /*requestDetail(contentId) {
    return util.requestMock({
      url: 'detail',
      mock: true,
      data: {
        source: 1
      }
    })
      .then(res => {
        let formatedUpdateTime = this.formatTime(res.data.lastUpdateTime)
        // 格式化后的时间
        res.data.formatedUpdateTime = formatedUpdateTime
        return res.data
      })
  },*/

  // 更改时间格式
  /*formatTime(timeStr = '') {
    let year = timeStr.slice(0, 4),
      month = timeStr.slice(5, 7),
      day = timeStr.slice(8, 10);
    return `${year}/${month}/${day}`;
  },*/


  // change title with the changed data
  /*configPageData(data) {
    if (data) {
      // 同步数据到 Model 层，Model 层数据发生变化的话，视图层会自动渲染
      this.setData({
        detailData: data
      });
      //设置标题
      let title = this.data.detailData.title || config.defaultBarTitle
      //title = "哈哈哈哈哈哈哈哈哈哈"
      wx.setNavigationBarTitle({
        title: title
      })
    }
  },*/


  // enable "next book" function
  next() {
    this.requestNextContentId()
      .then(data => {
        let contentId = data && data.contentId || 0;
        this.init(contentId);
      })
  },
  requestNextContentId() {
    //let pubDate = this.data.detailData && this.data.detailData.lastUpdateTime || ''
    let contentId = this.data.detailData && this.data.detailData.contentId || 0
    return util.requestMock({
      url: 'detail',
      mock: true,
      data: {
        //tag: '微信热门',
        //pubDate: pubDate,
        contentId: contentId,
        //langs: config.appLang || 'en'
      }
    })
      .then(res => {
        if (res && res.status === 0 && res.data && res.data.contentId) {
          util.log(res)
          return res.data
        } else {
          util.alert('提示', '没有更多文章了!')
          return null
        }
      })
  },

  // share function
  onShareAppMessage() {
    let title = this.data.detailData && this.data.detailData.title || config.defaultShareText;
    let contentId = this.data.detailData && this.data.detailData.contentId || 0;
    return {
      // 分享出去的内容标题
      title: title,

      // 用户点击分享出去的内容，跳转的地址
      // contentId为文章id参数；share参数作用是说明用户是从分享出去的地址进来的，我们后面会用到
      path: `/pages/detail/detail?share=1&contentId=${contentId}`,

      // 分享成功
      success: function (res) { },

      // 分享失败
      fail: function (res) { }
    }
  },
  
  // when user's WeChat version is too old
  notSupportShare() {
    // deviceInfo 是用户的设备信息，我们在 app.js 中已经获取并保存在 globalData 中
    let device = app.globalData.deviceInfo;
    let sdkVersion = device && device.SDKVersion || '1.0.0';
    return /1\.0\.0|1\.0\.1|1\.1\.0|1\.1\.1/.test(sdkVersion);
  },

  share() {
    if (this.notSupportShare()) {
      wx.showModal({
        title: '提示',
        content: '您的微信版本较低，请点击右上角分享'
      })
    }
  },

  /**
   * Go back to the page which we navigated from.
   * A shared page will navigate to index page.
   */
  back() {
    if (this.data.isFromShare) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else {
      wx.navigateBack()
    }
  },

  /**
   * Go to the page which shows the seller's information
   */
  sellerInfo: function (event){
    wx.navigateTo({
      url: '../SellerInfo/SellerInfo'
    })
  }
})