const config = require('config.js')

// default HTTP request options
const DEFAULT_HEADER = {
  "Content-Type": "application/json"
}
const DEFAULT_DATATYPE = "JSON"

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
    header: DEFAULT_HEADER,
    method: "GET",
    dataType: DEFAULT_DATATYPE,
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

module.exports = {
  formatTime: formatTime,
  buildURL: buildURL,
  doGET: doGET,
  alert: alert,
  EYE_CATCHER: EYE_CATCHER
}