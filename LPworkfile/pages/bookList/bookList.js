import util from '../../utils/bookList';
import config from '../../utils/config';

let app = getApp();
let isDEV = config.isDev;

// 后继的代码都会放在此对象中
let handler = {
  data: {
    page: 1, //当前加载第几页的数据
    days: 3,
    pageSize: 4,
    totalSize: 0,
    hasMore: true,// 用来判断下拉加载更多内容操作
    bookList: [], // 存放文章列表数据，与视图相关联
    defaultImg: config.defaultImg
  }, 
  onLoad(options) {
    this.requestBook()
    this.setData({
      hiddenLoading: false
    })
  },
  /*
   * reques book information
   */
  requestBook() {
    // request for mock data stored in list
    util.request({
      url: 'list',
      mock: true,
      data: {
        tag: 'U of T',
        start: this.data.page || 1,
        days: this.data.days || 3,
        pageSize: this.data.pageSize,
        langs: config.appLang || 'en'
      }
    })
      .then(res => {
        if (res && res.status === 0 && res.data && res.data.length) {
          // get original data
          let bookData = res.data;
          // format original data
          let formatData = this.formatBookData(bookData);
          // append book to the bookList
          this.renderBook(formatData)
        }
        /*
        * 1. no data after request:
              a) no books in the database
              b) unknow error
        * Sent alert message
        * Mute onReachBottom function
        */
        else if (this.data.page === 1 && res.data && res.data.length === 0) {
          util.alert();
          this.setData({
            hasMore: false
          });
        }
        /*
        * 1. "no more data"
        * 2. mute onReachBottom
        */
        else if (this.data.page !== 1 && res.data && res.data.length === 0) {
          this.setData({
            hasMore: false
          });
        }
        /*
        * Unknow Error
        * Show error message sent back from back end, mute onReachBottom
        */
        else {
          util.alert('提示', res);
          this.setData({
            hasMore: false
          });
          return null;
        }
      });
  },
  /*
  * Format original data for coding purpose
  *
  * Task:
  * 1. formate date of posted
  * 2. valid if visited
  * 
  */
  formatBookData(data) {
    let formatData = undefined;
    // when data is valid and it has a length
    if (data && data.length) {
      // change format of data to each group member
      formatData = data.map((group) => {
        // 格式化日期
        group.formateDate = this.dateConvert(group.date);
        // when group is valid and it has books in it
        if (group && group.books) {
          // go through each book in groups
          // group.books is either an empty list or formatedBooks
          let formatBookItems = group.books.map((item) => {
            // 判断是否已经访问过
            //
            item.hasVisited = this.isVisited(item.contentId);
            return item;
          }) || [];
          group.books = formatBookItems;
        }
        return group
      })
    }
    return formatData;
  },
  /*
  * format the date from '2017-06-12'
  * to
  * return '今日' / 08-21 / 2017-06-12
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
  /*
  * see if the bookID is in local storage
  * if it has index in the contentList(a list for readed books -- local storage)
  * (globalData.visitedBooks can be get from local storage)
  */
  isVisited(contentId) {
    let visitedBooks = app.globalData && app.globalData.visitedBooks || '';
    return visitedBooks.indexOf(`${contentId}`) > -1;
  },
  
  /*
  * append requested book to the bookList
  *
  */
  renderBook(data) {
    // if data exist
    if (data && data.length) {
      // append new book to a list and update the old list
      let newList = this.data.bookList.concat(data);
      this.setData({
        bookList: newList,
        hiddenLoading: true
      })
    }
  },

  /*
  * the user will call onReachBotton by themselves so dont have to call when compile
  */
  onReachBottom() {
    // hasMore is defaulted to be true, only update under cases that request fails
    if (this.data.hasMore) {
      // keep track on the page nubmer for #books references
      let nextPage = this.data.page + 1;
      this.setData({
        page: nextPage
      });
      this.requestBook();
    }
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
  * change to another page for LayOut2 when users want to see details
  */
  showDetail(book) {
    let dataset = book.currentTarget.dataset
    let item = dataset && dataset.item
    // default the ID to be 0
    let contentId = item.contentId || 0
    // varify the "visited" function
    this.markRead(contentId)
    wx.navigateTo({
      url: `../detail/detail?contentId=${contentId}`
    });
  },


  /*
  * 如果我们只是把阅读过的文章contentId保存在globalData中，则重新打开小程序后，记录就不存在了
  * 所以，如果想要实现下次进入小程序依然能看到阅读标识，我们还需要在缓存中保存同样的数据
  * 当进入小程序时候，从缓存中查找，如果有缓存数据，就同步到 globalData 中
  */
  markRead(contentId) {
    //先从缓存中查找 visited 字段对应的所有文章 contentId 数据
    util.getStorageData('visited', (data) => {
      let newStorage = data;
      if (data) {
        // if no visited data, it is the first time this user ever open it, add data into it
        // 如果当前的文章 contentId 不存在，也就是还没有阅读，就把当前的文章 contentId 拼接进去
        if (data.indexOf(contentId) === -1) {
          newStorage = `${data},${contentId}`;
        }
      }
      // 如果还没有阅读 visited 的数据，那说明当前的文章是用户阅读的第一篇，直接赋值就行了 
      else {
        newStorage = `${contentId}`;
      }

      /*
      * if data and newStorage are different
      * we need to update the global data (local storage) 
      */
      if (data !== newStorage) {
        if (app.globalData) {
          app.globalData.visitedBooks = newStorage;
        }
        util.setStorageData('visited', newStorage, () => {
          this.resetBooks();
        });
      }
    });
  },
  
  // reset the book to the final updated visited version
  resetBooks() {
    let old = this.data.bookList;
    let newBooks = this.formatBookData(old);
    this.setData({
      bookList: newBooks
    });
  },
}
Page(handler)