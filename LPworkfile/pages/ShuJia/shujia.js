// pages/ShuJia/shujia.js
var app = getApp()
var my_book = ["","","",""]
var arr_link = [1,2,3,4]
var file = ""

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    temp : [],
    items1: [
      {id: 0,src: "",text: my_book[0],value:'0'},
      {id: 1,src: "",text: my_book[1],value:'1'},
      {id: 2,src: "",text: my_book[2],value:'2'},
      { id: 3, src: "", text: my_book[3],value:'3'},
    ],
    items2:[
      { id: 4, src: "", text: my_book[0], value: '4'},
      { id: 5, src: "", text: my_book[1], value: '5'},
      { id: 6, src: "", text: my_book[2], value: '6'},
      { id: 7, src: "", text: my_book[3], value: '7'},
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
        that.data.item1.push({ id: i, src: that.data.temp[i]["BookPhotoURL"][0], text: that.data.temp[i]["CourseCode"]})
        i++
      }
      that.setData({ items1: that.data.item1 })

      //设置item2:中书架
      while (i < len) {
        that.data.item2.push({ id: i, src: that.data.temp[i]["BookPhotoURL"][0], text: that.data.temp[i]["CourseCode"] })
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
    for (id in select) {
        idx = select[id]
        console.log(idx)
        // 本page列表里删
        this.data.temp.splice(parseInt(idx), 1)
        //user book_info里删??
        app.globalData.user_books.book_info.splice(parseInt(idx), 1)
        //数据库里删？
        //
      }

    this.refresh();

    wx.showToast({
      title:"删除选中书本",
      duration:3000
    })
  },

  refresh: function () {
    //重置place holder
    this.setData({item1 : [] , item2 : []});
    //添加现有书本并显示
    this.display();
  },


})