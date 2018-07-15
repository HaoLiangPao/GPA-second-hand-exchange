'use strict'
import Promise from '../lib/promise'
import config from './config'
import * as Mock from './mock'

const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {},
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
  // 
  alert(title = '提示', content = config.defaultAlertMsg) {
    if ('object' === typeof content) {
      content = this.isDEV && JSON.stringify(content) || config.defaultAlertMsg
    }
    wx.showModal({
      title: title,
      content: content
    })
  },

  // 获取数据 -- 本地存储
  getStorageData(key, cb) {
    let self = this;

    // 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
    wx.getStorage({
      key: key,
      success(res) {
        cb && cb(res.data);
      },
      fail(err) {
        let msg = err.errMsg || '';
        if (/getStorage:fail/.test(msg)) {
          self.setStorageData(key)
        }
      }
    })
  },

  setStorageData(key, value = '', cb) {
    wx.setStorage({
      key: key,
      data: value,
      success() {
        cb && cb();
      }
    })
  },
  
  // 网络请求
  request(opt) {
    let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt)
    let { url, data, header, method, dataType, mock = false } = options
    let self = this
    return new Promise((resolve, reject) => {
      if (mock) {
        let res = {
          statusCode: 200,
          data: Mock[url]
        }
        if (res && res.statusCode == 200 && res.data) {
          resolve(res.data);
        } else {
          self.alert('提示', res);
          reject(res);
        }
      }else{
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
      }
    })
  }

}
export default util