'use strict'
import Promise from '../lib/promise'
import config from './config'
import * as Mock from './mock'

const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {}, // Expected format: [{attr1: val1, attr2: val2 ... }, {attr1: val1, attr2: val2 ... }],
  header: {
    "Content-Type": "application/json"
  },
  method: 'GET',
  dataType: 'json'
}


let util = {
  // 判断是否是开发反应
  isDEV: config.isDev,
  
  log() {
    this.isDEV && console.log(...arguments)
  },

  /**
   * title -- alert title
   * content -- alert message
   */ 
  alert(title = '提示', content = config.defaultAlertMsg) {
    if ('object' === typeof content) {
      content = this.isDEV && JSON.stringify(content) || config.defaultAlertMsg
    }
    wx.showModal({
      title: title,
      content: content
    })
  },

  /**
   * cb -- Callback function to be called on success
   * 
   * Get value for the given key in storage synchronously. This Can't be asynchonous because redering page views (book list) depends on the data.
   */
  getStorageDataSync(key, cb) {
    let self = this;

    try{
      var value = wx.getStorageSync(key);
      if (value) {
        cb && cb(value);
      } else {
        // If key cannot be found then store new pair <key, ''> in storage
        self.setStorageData(key);
      }
    } catch (e) {
      // Just ignore any error as not being able to get the storage data is okay.
    }
  },

  /**
   * key, value -- <key, value> pair to be stored in storage. If key already exists, the value will be overwritten.
   * cb -- Callback function to be called on success
   * 
   * This is an asynchronous function.
   */
  setStorageData(key, value = '', cb) {
    wx.setStorage({
      key: key,
      data: value,
      success() {
        cb && cb();
      }
    })
  },
  
  /**
   * Wrapper for wx.request()
   * 
   * Return a Promise object
   */
  request(url, data, isMockRequest){
    var that = this;
    return new Promise((resolve, reject) => {
      if(isMockRequest){ // Mock request for testing
        console.log("\n\nMOCKING REQUEST\n\n");
      }
      else{
        wx.request({
          url: url,
          data: data,
          header: DEFAULT_REQUEST_OPTIONS.header,
          method: DEFAULT_REQUEST_OPTIONS.method,
          dataType: DEFAULT_REQUEST_OPTIONS.dataType,
          success: function (res) {
            if (res && res.statusCode == 200 && res.data) {
              resolve(res.data);
            } else {
              that.alert('提示', res);
              reject(res);
            }
          },
          fail: function (err) {
            that.log(err);
            that.alert('提示', err);
            reject(err);
          }
        })
      }
    });
  },

  // 网络请求
  requestMock(opt) {
    let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt)
    console.log(options);
    let { url, data, header, method, dataType, numOfBooks, idStartFrom, mock = false } = options
    let self = this
    return new Promise((resolve, reject) => {
      let res = undefined;
      if (mock) {
        if (idStartFrom) { // Request next n books -- For testing purpose just get all the mock data
          res = {
            statusCode: 200,
            data: Mock[url].data,
            hasMore: false, // For testing purpose just marks no more data
            status: 0 // 0 marks success request; 1 marks success request but no more data to read from database; 2 marks failure / errors
          }
        }
        else{ // Request first n books -- For testing purpose just get all the mock data
          res = {
            statusCode: 200,
            data: Mock[url].data,
            hasMore: false, // For testing purpose just marks no more data
            status: 0 // 0 marks success request; 1 marks success request but no more data to read from database; 2 marks failure / errors
          }
        }
        if (res && res.statusCode == 200 && res.data && res.status != 2) {
          resolve(res);
        } else {
          reject(res);
        }
      }
      /* TODO: do real database request
      else{
        wx.request({
          url: url,
          data: data,
          header: header,
          method: method,
          dataType: dataType,
          success: function (res) {
            if (res && res.statusCode == 200 && res.data) {
              resolve(res.data);
            } else {
              self.alert('提示', res);
              reject(res);
            }
          },
          fail: function (err) {
            self.log(err);
            self.alert('提示', err);
            reject(err);
          }
        })
      }*/
    })
  }

}
export default util