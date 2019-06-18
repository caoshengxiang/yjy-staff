/**
 * 判断是否是微信环境
 */
export function getIsWxClient () {
  var ua = window.navigator.userAgent.toLowerCase()
  // eslint-disable-next-line
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

/*
* 获取设备平台
*
* @method platform
*
* @return {String} 返回平台字符串
*
* */

export function platform () {
  let userAgentInfo = navigator.userAgent

  let Agents = [
    'Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  let pc = 'Pc'
  let platformStr = null

  Agents.forEach((item) => {
    if (userAgentInfo.indexOf(item) > 0) {
      platformStr = item
    }
  })
  if (!platformStr) {
    platformStr = pc
  }

  return platformStr
}

/*eslint-disable*/
export function iOSOrAndroid () {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

  if (isAndroid) {
    return 'Android'
  } else if (isiOS) {
    return 'iOS'
  }
}

/* eslint-enable */

/*
* 解析地址栏参数
*
* @method getQueryObj
*
* @param
*
* @return {Object} 返回query参数对象
*
* */
export function getQueryObj () {
  let href = window.location.href
  let query = href.substr(href.indexOf('?') + 1)
  let arr = query.split('&')
  let queryObj = {}

  for (let i = 0; i < arr.length; i++) {
    let keyVal = arr[i].split('=')

    queryObj[keyVal[0]] = keyVal[1]
  }
  return queryObj
}

/*
* 时间戳转 yy-MM-dd hh:mm:ss
*
* @method formatDateTime
*
* @param {Timestamp} 时间戳
*
* @return {Obj} yy-MM-dd hh:mm:ss
* */
export function formatDateTime (Timestamp) {
  if (!Timestamp) {
    return ''
  }
  let date = new Date(Timestamp)
  let y = date.getFullYear()

  if (isNaN(y)) {
    // throw new Error('')
    return ''
  }
  let m = date.getMonth() + 1

  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()

  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()

  h = h < 10 ? ('0' + h) : h
  let minute = date.getMinutes()
  let second = date.getSeconds()

  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/*
* String过长，中间显示点
*
* @method interceptString
*
* @param {String} 目标字符串
* @param {Number} 目标长度后开始截取，否则返回原String
* @param {Number} String开始保留长度 1开始
* @param {Number} String结尾保留长度
*
* @return {String} xxx...xxx 或 xxx
* */
export function interceptString (str, len, m, n) {
  if ((typeof str === 'string') && (typeof len === 'number') &&
    (typeof m === 'number') && (typeof n === 'number')) {
    if (len <= m + n) {
      throw new Error('长度参数有误，开始截取长度必须大于前后保留长度的和')
    }
    if (str.length > len) {
      return str.substring(0, m) + '...' + str.substring(str.length - n)
    } else {
      return str
    }
  } else {
    throw new Error('interceptString方法，参数类型错误')
  }
}

/*
* 动态检测浏览器大小
* @method windowWidth
*
* @return {Object} 浏览器宽度
* */
export function windowWH () {
  return {
    screenWidth: window.screen.width, // 屏幕分辨率,宽
    screenHeight: window.screen.height, // 屏幕分辨率,高
    screenAvailWidth: window.screen.availWidth, // 屏幕可用大小
    screenAvailHeight: window.screen.availHeight, // 屏幕可用大小
    clientWidth: document.body.clientWidth, // 网页可见区域宽
    clientHeight: document.body.clientHeight, // 网页可见区域高
    offsetWidth: document.body.offsetWidth, // 网页可见区域宽(包括边线的宽)
    offsetHeight: document.body.offsetHeight, // 网页可见区域高(包括边线的宽)
    scrollWidth: document.body.scrollWidth, // 网页正文全文宽
    scrollHeight: document.body.scrollHeight, // 网页正文全文高
    scrollTop: document.body.scrollTop, // 网页被卷去的高
    scrollLeft: document.body.scrollLeft, // 网页被卷去的左
    WinScreenTop: window.screenTop, // 网页正文部分左
    WinScrollLeft: window.screenLeft,
  }
}

/*
* 对象深拷贝
* @method deepCopy
* @param p {Object} 拷贝对象
* @param c {Object} 可选，拷贝到c对象
* @return {Object} 拷贝对象
* */
export function deepCopy (source) {
  let result = {}

  for (let key in source) {
    result[key] = typeof source[key] === 'object'
      ? deepCopy(source[key])
      : source[key]
  }
  return result
}

export function deepCopyJson (p) {
  return JSON.parse((JSON.stringify(p)))
}

/*
* 判断为数组
* @method isArray
* @param o {all} 判断的对象
* @return {Boolean} 是否为数组
* */
export function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export function isArray2 (arr) {
  return arr instanceof Array
}

/*
* 判断对象
* @method isJsonObj
* @param o {all} 判断的对象
* @return {Boolean} 是否为对象
* */
export function isJsonObj (o) {
  if (o instanceof Object) {
    return o instanceof Array ? false : true // eslint-disable-line
  } else {
    return false
  }
}

export function arrToStr (arr, attr) { // 对象数组id属性转为字符串[{id: 1},{id, 2}] to '1,2'
  let tempArr = []
  arr.forEach(item => {
    tempArr.push(item[attr])
  })
  return tempArr.join(',')
}

/*
* aBC 转 a_b_c
* */
export function underscoreName (s) {
  if (!s) {
    return null
  }
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/*
* a_b_c 转 aBC
* */
export function camelName () {
}

/*
* 上个月1号日期
*
* */
export function lastMonthDate () { // 上个月1号
  var Nowdate = new Date()
  var vYear = Nowdate.getFullYear()
  var vMon = Nowdate.getMonth() + 1
  // var vDay = Nowdate.getDate()
  // 每个月的最后一天日期（为了使用月份便于查找，数组第一位设为0）
  // var daysInMonth = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
  if (vMon === 1) {
    vYear = Nowdate.getFullYear() - 1
    vMon = 12
  } else {
    vMon = vMon - 1
  }
  if (vMon < 10) {
    vMon = '0' + vMon
  }
  var date = vYear + '-' + vMon + '-01'
  return new Date(date)
}

// 格式化时间
export function formatDate (d) {
  let _date = new Date(d)
  let y = _date.getFullYear()
  let mon = (_date.getMonth() + 1) < 10
    ? '0' + (_date.getMonth() + 1)
    : _date.getMonth() + 1
  let day = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate()
  let s = _date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours()
  let f = _date.getMinutes() < 10
    ? '0' + _date.getMinutes()
    : _date.getMinutes()
  let m = _date.getSeconds() < 10
    ? '0' + _date.getSeconds()
    : _date.getSeconds()
  let newDate = y + '-' + mon + '-' + day + ' ' + s + ':' + f + ':' + m
  return newDate
}

/*
* 文件下载
* @method isJsonObj
* @param o {all} 判断的对象
* */
export function fileDown (url, filename) {
  let link = document.createElement('a') // 创建事件对象
  link.setAttribute('href', url)
  link.setAttribute('download', filename || null)
  let event = document.createEvent('MouseEvents') // 初始化事件对象
  event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0,
    false, false, false, false, 0,
    null) // 触发事件
  link.dispatchEvent(event)
}

/*
* 复制对象属性
* */
