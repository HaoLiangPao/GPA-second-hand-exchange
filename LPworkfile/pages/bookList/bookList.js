import utilOLD from '../../utils/bookListUtil'
import config from '../../utils/config';
const util = require('../../utils/util.js');

let app = getApp();
let isDEV = config.isDev;
const numOfNewBooksOnReachBottom = 4;

// 后继的代码都会放在此对象中
let handler = {
  data: {
    hasMore: true,// 用来判断下拉加载更多内容操作
    bookList: [], // 存放文章列表数据，与视图相关联
    numOfBooksOnPage: 0,
    idOldestBookOnPage: 0,
    defaultImg: config.defaultImg
  },

  onLoad(options) {
    this.requestFirstNBooks(numOfNewBooksOnReachBottom);
    this.showLoading();
  },

  onReady(){
    this.hideLoading();
  },

  onReachBottom() {
    if (this.data.hasMore) {
      this.requestNextNBooks(idOldestBookOnPage, numOfNewBooksOnReachBottom);
    }
  },

  /**
   * From database, retrieve information of the first n books in descending order of upload date and ascending order of ID
   * 
   * TODO: Do real database request
   * 
   */
  requestFirstNBooks(n){
    utilOLD.requestMock({
      url: 'mockData',
      numOfBooks: n,
      idStartFrom: undefined,
      mock: true,
    }).then(this.resolveSuccessBookRequest, this.resolveFailureBookRequest);
  },

  /**
   * From database, retrieve information of the next N books in descending order of upload date and ascending order of ID, where N = numOfNewBooksOnReachBottom.
   * 
   * TODO: Do real database request
   */
  requestNextNBooks(idStartFrom, n) {
    utilOLD.requestMock({
      url: 'mockData',
      numOfBooks: n,
      idStartFrom: idStartFrom,
      mock: true,
    }).then(this.resolveSuccessBookRequest, this.resolveFailureBookRequest);
  },

  resolveSuccessBookRequest(res){
      this.showLoading();

      // Update the book list with new data (res.data)
      if (res && res.status === 0 && res.data && res.data.length) {
        var bookData = res.data;
        this.generateFormattedDates(bookData); // bookData -- array of JSON where each JSON is a group
        this.data.bookList = bookData;
        this.data.hasMore = res.hasMore;
        this.flushNewDataToPageView();
      }
      else if(res.status === 1){ // Some error, ignore for now
        return;
      }

      this.hideLoading();
  },

  resolveFailureBookRequest(res){
    util.alert("错误", "抱歉，数据加载失败了。请您重试或者联系客服。");
  },

  /*
  * data -- Newly requested book data from database (array of goup data in JSON)
  *
  * Generates a new property formatedDate for each group data object (JSON) based on the existing property date.
  */
  generateFormattedDates(data) {
    if (data && data.length) {
      for (var i = 0; i < data.length; i++) {
        var thisGroup = data[i];
        thisGroup.formattedDate = this.dateConvert(thisGroup.date);
      }
    }
  },

  /*
  * Given a date in format: 'YEAR-MONTH-DAY' e.g. '2017-06-12'
  * Return '今日' (If it is today) / '08-21' (If it is in the current year) / '2017-06-12' (If it is in any past year)
  */
  dateConvert(dateStr) {
    if (!dateStr) {
      return '';
    }
    let today = new Date(),
      todayYear = today.getFullYear(),
      todayMonth = ('0' + (today.getMonth() + 1)).slice(-2),
      todayDay = ('0' + today.getDate()).slice(-2);
    let convertStr = '';
    let originYear = +dateStr.slice(0, 4);
    let todayFormat = `${todayYear}-${todayMonth}-${todayDay}`;
    if (dateStr === todayFormat) {
      convertStr = '今日';
    } else if (originYear < todayYear) {
      let splitStr = dateStr.split('-');
      convertStr = `${splitStr[0]}年${splitStr[1]}月${splitStr[2]}日`;
    } else {
      convertStr = dateStr.slice(5).replace('-', '月') + '日'
    }
    return convertStr;
  },

  /**
   * groupDate -- the date info of the group the book belongs to
   * contentId -- contentId of the book
   * 
   * Mark a book as read
   */
  markRead(groupDate, contentId) {
    for (var i = 0; i < this.data.bookList.length; i++) {
      if(this.data.bookList[i].date === groupDate){
        var thisGroup = this.data.bookList[i].books;
        for (var j = 0; j < thisGroup.length; j++) {
          if (thisGroup[j].contentId === contentId) {
            thisGroup[j].isVisited = 1;
          }
        }
      }
    }
    this.flushNewDataToPageView();
  },

  /**
   * Update page view with the current book list data
   * Also update the 'hasMore' flag which marks if there's more books to display
   */
  flushNewDataToPageView() {
    this.setData({
      bookList: this.data.bookList,
      hasMore: this.data.hasMore
    })
  },

  showLoading(){
    this.setData({
      hiddenLoading: false
    })
  },

  hideLoading(){
    this.setData({
      hiddenLoading: true
    })
  },

  /*
  * sharing message should be created on each single pages!!
  */
  onShareAppMessage() {
    let title = config.defaultShareText || 'GPA二手教材交易平台';
    return {
      title: title,
      path: `/pages/index/index`,
      success: function (res) {
        // Sharing Success
      },
      fail: function (res) {
        // Sharing Failed
      }
    }
  },

  /*
  * Navigates to book detail page
  */
  showDetail(target) {
    var dataset = target.currentTarget.dataset
    var bookid = dataset && dataset.bookid;
    var groupdate = dataset && dataset.pubdate.substring(0, 10);
    //util.alert("提示", "抱歉，这本书刚刚下架了~"); TODO: Do database request here to check if the book no longer exists
    bookid = "（假）书号"; // FAKE!!!! 
    this.goToBookDetailPage(bookid);
    // Mark this book as read
    this.markRead(groupdate, bookid)
  },

  /**
   * Get a book's information by book ID, then navigates to the detailed information page rendered by it.
   */
  goToBookDetailPage(bookID){
    var url = "http://" + config.serverURL + "/searchAllInfo/byBookID";
    var data = { PostID: bookID };
    var result = undefined;
    var success_cb = function (res) {
      if(res.header.Status == 1){
        util.alert("提示", "抱歉，这本书刚刚下架了~");
      }
      else{
        result = res.data; // result should be a JSON array and should have only one object
        var detailPageURL = "../detail/detail?";
        console.log(result);
        console.log();
        wx.navigateTo({
          url: util.buildURL(detailPageURL, JSON.parse(result)[0])
        });
      }
    };
    var failure_cb = function (err) { util.alert("错误", "获取数据失败" + JSON.stringify(e)) };
    util.doGET(url, data, success_cb, failure_cb)
  }
}

Page(handler)