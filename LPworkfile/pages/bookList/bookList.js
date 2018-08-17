import utilOLD from '../../utils/bookListUtil'
import config from '../../utils/config';
const util = require('../../utils/util.js');

let app = getApp();
const numOfNewBooksOnReachBottom = 10;

// 后继的代码都会放在此对象中
let handler = {
  data: {
    hasMore: true,// 用来判断下拉加载更多内容操作
    bookList: [], // 存放文章列表数据，与视图相关联
    numOfBooksOnPage: 0,
    idOldestBookOnPage: '@',
    dateOldestBookOnPage: '@',
    defaultImg: config.defaultImg,
    mode: "",
    searchInput: ""
  },

  onLoad(options) {
    console.log(options);
    this.data.mode = options.mode;
    this.data.searchInput = options.value;
    this.requestFirstNBooks(numOfNewBooksOnReachBottom);
  },

  onReady(){
  },

  onPullDownRefresh(){
    console.log("ON PULL DOWN REFRESH!!!")
    this.requestFirstNBooks(numOfNewBooksOnReachBottom);
    wx.stopPullDownRefresh()
  },

  onReachBottom() { // TODO: Switch to a button and make the button disappear when doing any requests; Otherwise if we can do the next request or not has to depend on the value of this.data.idOldestBookOnPage and this.data.dateOldestBookOnPage, which is however hard to achieve
    console.log("ON REACH BOTTOM!!!")
    if (this.data.hasMore) {
      this.requestNextNBooks(this.data.idOldestBookOnPage, this.data.dateOldestBookOnPage, numOfNewBooksOnReachBottom);
    }
  },

  /**
   * From database, retrieve information of the first n books in ascending order of upload date and ascending order of ID
   * 
   */
  requestFirstNBooks(n) {
    this.data.bookList = []; // Discard existing data
    this.showLoading();
    if ( this.data.mode == "newBook" ) {
      util.doGET('http://localhost:8000/search/display/nextN', { OwnerID: '@', CreateDate: '@', N: n }, this.resolveSuccessBookRequest, this.resolveFailureBookRequest, this); // Use '@' to represent empty string in request URL
    }
    else if ( this.data.mode == "search" ) {
      util.doGET('http://localhost:8000/search/display/courseNextN', { OwnerID: '@', CreateDate: '@', CourseCode: this.data.searchInput, N: n }, this.resolveSuccessBookRequest, this.resolveFailureBookRequest, this); // Use '@' to represent empty string in request URL
    }
    else {
      this.hideLoading();
    }
  },

  /**
   * From database, retrieve information of the next N books in ascending order of upload date and ascending order of ID, where N = numOfNewBooksOnReachBottom.
   * 
   */
  requestNextNBooks(idStartFrom, dateStartFrom, n) {
    console.log(idStartFrom);
    console.log(dateStartFrom);
    this.showLoading();
    if ( this.data.mode == "newBook" ) {
      util.doGET('http://localhost:8000/search/display/nextN', { OwnerID: idStartFrom, CreateDate: dateStartFrom, N: n }, this.resolveSuccessBookRequest, this.resolveFailureBookRequest, this);
    }
    else if (this.data.mode == "search" ) {
      util.doGET('http://localhost:8000/search/display/courseNextN', { OwnerID: idStartFrom, CreateDate: dateStartFrom, CourseCode: this.data.searchInput, N: n }, this.resolveSuccessBookRequest, this.resolveFailureBookRequest, this);
    }
    else {
      this.hideLoading();
    }
  },

  resolveSuccessBookRequest(res, page){
      console.log(res);
      // Update the book list with new data (res.data)
      if (res && res.statusCode == 200 && res.data && res.data.length) {
        var bookData = JSON.parse(res.data);
        console.log(bookData);
        page.data.bookList = page.data.bookList.concat(page.formatBookData(bookData, page));
        page.data.hasMore = (res.header.Status == 1) ? false : true;
        page.flushNewDataToPageView(page);
        page.numOfBooksOnPage = page.numOfBooksOnPage + numOfNewBooksOnReachBottom;
      }
      else{
        util.alert("错误", "抱歉，数据加载失败了。请您重试或者联系客服。");
      }
      page.hideLoading();
  },

  resolveFailureBookRequest(res, page){
    page.hideLoading();
    util.alert("错误", "抱歉，数据加载失败了。请您重试或者联系客服。");
  },

  /*
  * data -- Newly requested book data from database (array of goup data in JSON)
  * page -- Reference to this page
  *
  * Group up and format book data to make them easier used by the views.
  */
  formatBookData(data, page) {
    var result = [];
    if (data && data.length) {
      var thisGroup = { books: [], date: "", formattedDate: "" };
      var date = "";
      for (var i = 0; i < data.length; i++) {
        console.log("\n\nThis Group:");
        console.log(thisGroup);
        console.log(result);
        var thisBook = data[i];
        thisBook.cover = thisBook.BookPhotoURL.split(',')[0] // Chose a cover photo
        var thisBookDate = thisBook.CreateDate.split(' ')[0]
        if ( thisBookDate > date ) {
          if (date != "") {
            result.push(thisGroup);
          }
          date = thisBookDate;
          thisGroup = { books: [], date: "", formattedDate: "" };
          thisGroup.date = date;
          thisGroup.formattedDate = page.dateConvert(date);
          thisGroup.books.push(thisBook);
        }
        else {
          thisGroup.books.push(thisBook);
        }
        if( i == data.length - 1 ) {
          result.push(thisGroup);
          // Record the OwnerID and CreateDate of the last book, used for the next server request
          page.data.idOldestBookOnPage = thisBook.OwnerID;
          page.data.dateOldestBookOnPage = thisBook.CreateDate;
        }
      }
    }
    console.log("\n\nResult:");
    console.log(result);
    return result;
  },

  /*
  * Given a date in format: 'YEAR/MONTH/DAY' e.g. '2017/06/12'
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
    let todayFormat = `${todayYear}/${todayMonth}/${todayDay}`;
    if (dateStr === todayFormat) {
      convertStr = '今日';
    } else if (originYear < todayYear) {
      let splitStr = dateStr.split('/');
      convertStr = `${splitStr[0]}年${splitStr[1]}月${splitStr[2]}日`;
    } else {
      convertStr = dateStr.slice(5).replace('/', '月') + '日'
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
          if (thisGroup[j].BookPhotoURL === contentId) {
            thisGroup[j].isVisited = 1;
          }
        }
      }
    }
    this.flushNewDataToPageView(this);
  },

  /**
   * Update page view with the current book list data
   * Also update the 'hasMore' flag which marks if there's more books to display
   */
  flushNewDataToPageView(page) {
    page.setData({
      bookList: page.data.bookList,
      hasMore: page.data.hasMore
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

  /*
  * Navigates to book detail page
  */
  showDetail(target) {
    console.log(target);
    var itemData = target.currentTarget.dataset.item;
    var bookid = itemData && itemData.BookPhotoURL; // Use the book's images' URL as the unique identifier
    var ownerid = itemData && itemData.OwnerID;
    var bookTitle = itemData && itemData.BookTitle;
    var groupdate = itemData && itemData.CreateDate.substring(0, 10);
    this.goToBookDetailPage(ownerid, bookTitle);
    // Mark this book as read
    this.markRead(groupdate, bookid)
  },

  /**
   * Get a book's information by its OwnerID and BookTitle, then navigates to the detailed information page rendered by it.
   */
  goToBookDetailPage(ownerid, bookTitle){
    var url = "http://" + config.serverURL + "/search/detail";
    var data = { OwnerID: ownerid, BookTitle: bookTitle };
    var result = undefined;
    var success_cb = function (res, page) {
      if(res.header.Status == 1){
        util.alert("提示", "抱歉，这本书刚刚下架了~");
      }
      else{
        result = res.data; // result should be a JSON array and should have only one object
        var detailPageURL = "../detail/detail?";
        console.log(JSON.parse(result)[0]);
        console.log();
        wx.navigateTo({
          url: util.buildURLWithEncoding(detailPageURL, JSON.parse(result)[0])
        });
      }
    };
    var failure_cb = function (err, page) { util.alert("错误", "获取数据失败" + JSON.stringify(e)) };
    util.doGET(url, data, success_cb, failure_cb, this)
  }
}

Page(handler)