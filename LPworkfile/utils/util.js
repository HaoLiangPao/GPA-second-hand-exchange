const config = require('config.js')

const REQUIRED_SDK_VERSION = '2';
const EYE_CATCHER = "****************************************"

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

/**
 * url -- url without parameters (e.g. ../detail/detail?)
 * data -- JSON which contains the key-value pairs to be added to the url
 * 
 * Return a url with parameters added
 */
function buildURL(url, data){
  var result = url;
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var thisKey = keys[i];
    result = result + ((i != 0) ? "&" : "") + thisKey + "=" + data[thisKey];
  }
  console.log(result);
  return result;
}

/**
 * url -- URL
 * data -- parameters
 * resolve -- callback for succeeded request
 * reject -- callback for failed request
 * 
 * Do HTTP GET request
 */
function doGET(url, data, resolve, reject){
  console.log(EYE_CATCHER)
  console.log("Doing HTTP GET request: ")
  console.log("URL: " + url)
  console.log("data: ", data)
  console.log(EYE_CATCHER)

  wx.request({
    url: url,
    header: {
      "Content-Type": "application/json"
    },
    method: "GET",
    dataType: "JSON",
    data: data,
    success: resolve,
    fail: reject
  })
}

/**
 * title -- alert title
 * content -- alert message
 */
function alert(title = '提示', content = config.defaultAlertMsg) {
  if ('object' === typeof content) {
    content = this.isDEV && JSON.stringify(content) || config.defaultAlertMsg
  }
  wx.showModal({
    title: title,
    content: content
  })
}

function checkIfUserExistsIfNotForceInfoUpdate() {
  //提示用户填写信息
  const app = getApp();
  if (app.globalData.user.HaveUser == false) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请填写个人信息以进行交易',
      confirmText: '好的!',
      success: function (res) {
        // The content of 'res': res.errMsg, res.cancel, res.confirm
        if (res.confirm) {
          wx.navigateTo({
            url: '../userinfo/info'
          })
        }
      }
    })
  }
}

/**
 * v1 < v2: -1
 * v1 > v2: 1
 * v1 = v2: 0
 */
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * nextAction -- the next funtion to be executed after the modal shown in this function is dealt with, or the modal is not shown
 */
function forceUpdateWeChatToTheLatestVersion(nextAction) {
  var res = wx.getSystemInfoSync();
  if (compareVersion(res.SDKVersion, REQUIRED_SDK_VERSION) < 0 ) {
    console.log("用户微信版本过低");
    wx.showModal({
      title: '提示',
      showCancel: false,
      confirmText: '知道啦!',
      content: '微信版本过低，请更新微信版本以便正常使用',
      success: function (res) {
        // The content of 'res': res.errMsg, res.cancel, res.confirm
        if (res.confirm) {
          nextAction();
        }
      }
    })
  }
  else{
    nextAction();
  }
  return false;
}

module.exports = {
  formatTime: formatTime,
  buildURL: buildURL,
  doGET: doGET,
  alert: alert,
  checkIfUserExistsIfNotForceInfoUpdate: checkIfUserExistsIfNotForceInfoUpdate,
  forceUpdateWeChatToTheLatestVersion: forceUpdateWeChatToTheLatestVersion,
  EYE_CATCHER: EYE_CATCHER
}