// pages/ShuJia/shujia.js
var app = getApp()
var my_book = ["","","",""]
var arr_link = [1,2,3,4]
var file = ""
import util from '../../utils/util';
import config from '../../utils/config';

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    temp : [],
    items1: [
      { id: 0, src: "", text: my_book[0], value: '0', ownerid: "", booktitle: ""},
      { id: 1, src: "", text: my_book[1], value: '1', ownerid: "", booktitle: ""},
      { id: 2, src: "", text: my_book[2], value: '2', ownerid: "", booktitle: ""},
      { id: 3, src: "", text: my_book[3], value: '3', ownerid: "", booktitle: ""},
    ],
    items2:[
      { id: 4, src: "", text: my_book[0], value: '4', ownerid: "", booktitle: ""},
      { id: 5, src: "", text: my_book[1], value: '5', ownerid: "", booktitle: ""},
      { id: 6, src: "", text: my_book[2], value: '6', ownerid: "", booktitle: ""},
      { id: 7, src: "", text: my_book[3], value: '7', ownerid: "", booktitle: ""},
    ],
    item1: [],
    item2: [],
    url: file,
    showView: true,
    selected:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    showView: (that.data.showView == "true" ? true : false),
    that.setData({
      temp : app.globalData.user_books.book_info,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.display();
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

  wantsell: function () {
    wx.navigateTo({
      url: '../wantsell/wantsell'
    })
  },

  /**
   * 添加&显示书本
   */

  display:function () {
    var that = this
    var len = that.data.temp.length
    // 测试list用 console.log(len)
    var i=0
    // 个人书目设置书架list
    if (len < 9) {
      // 设置item1:上书架
      while ((i < 4) && (i < len)) {
        that.data.item1.push({ id: i, src: that.data.temp[i]["BookPhotoURL"][0], text: that.data.temp[i]["CourseCode"], ownerid: that.data.temp[i]["OwnerID"], booktitle: that.data.temp[i]["BookTitle"]})
        i++
      }
      that.setData({ items1: that.data.item1 })

      //设置item2:中书架
      while (i < len) {
        that.data.item2.push({ id: i, src: that.data.temp[i]["BookPhotoURL"][0], text: that.data.temp[i]["CourseCode"], ownerid: that.data.temp[i]["OwnerID"], booktitle: that.data.temp[i]["BookTitle"]})
        i++
      }
      if (len > 4) {
        that.setData({items2: that.data.item2 })
      }
      else {
        that.setData({ items2: [] })
      }
    }

  },


  switch:function (){
    var that = this
    that.setData({
      showView: (!that.data.showView)
    })
  },
  
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selected: e.detail.value
    })
    console.log('checkbox发生change事件，携带value值为：', this.data.selected)
  },

  delete:function (){

    //删items内
    var id=0;
    var idx;
    var select = this.data.selected
    //获取ownerid 和 书本 title
    console.log("id" + select)
    for (id in select) {
      idx = parseInt(select[id])
      //数据库中先进行删除
      var BookTitle = app.globalData.user_books.book_info[idx]["BookTitle"]
      var OwnerID = app.globalData.user_books.book_info[idx]["OwnerID"]
      var upload = {
        BookTitle:BookTitle,
        OwnerID:OwnerID
      }
      wx.request({
        url: 'http://'+ config.serverURL +'/post/delete',
        data: upload
      })
      // 本page列表里删
      this.data.temp.splice(idx, 1)
      //user book_info里删??
      app.globalData.user_books.book_info.splice(idx, 1)
      }

    this.refresh();

    //提示
    wx.showToast({
      title:"已删除书本",
      duration:3000
    })

    //切换回修改模式
    var that = this
    that.setData({
      showView: (!that.data.showView)
    })
  },

  //TODO：function 无法工作，需要修改
  refresh: function () {
    //重置place holder
    this.setData({item1 : [] , item2 : []});
    //添加现有书本并显示
    this.display();
  },

    /*
  * Navigates to book detail page
  */
  showDetail(event) {
    console.log(event)
    var itemData = event.currentTarget.dataset.item;
    var ownerid = itemData && itemData.ownerid;
    var bookTitle = itemData && itemData.booktitle;
    this.goToBookDetailPage(ownerid, bookTitle);
  },

  /**
   * Get a book's information by its OwnerID and BookTitle, then navigates to the detailed information page rendered by it.
   */
  goToBookDetailPage(ownerid, bookTitle) {
    var url = "http://" + config.serverURL + "/search/detail";
    var data = { OwnerID: ownerid, BookTitle: bookTitle };
    var result = undefined;
    var success_cb = function (res, page) {
      if (res.header.Status == 1) {
        util.alert("提示", "抱歉，这本书刚刚下架了~");
      }
      else {
        result = res.data; // result should be a JSON array and should have only one object
        var detailPageURL = "../detail/detail?";
        wx.navigateTo({
          url: util.buildURLWithEncoding(detailPageURL, JSON.parse(result)[0])
        });
      }
    };
    var failure_cb = function (err, page) { util.alert("错误", "获取数据失败" + JSON.stringify(e)) };
    util.doGET(url, data, success_cb, failure_cb, this)
  }
})