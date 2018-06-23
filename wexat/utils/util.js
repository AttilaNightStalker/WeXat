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

var myServer = "https://www.attiladomain.xyz";//"http://localhost:70";//

module.exports = {
/***************************************************/
  formatTime: formatTime,
  delMsg: function(textId, callback) {
    wx.request({
      url: myServer, //'https://www.attiladomain.xyz',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: JSON.stringify({
        goal: 'remove',
        textId: textId,
      }),

      success: callback
    })
  }, 
/***************************************************/
  postNewMsg: function (userId, msg, callback) {
    wx.request({
      url: myServer, //'https://www.attiladomain.xyz',
      method: 'POST', 
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }, 
      data: JSON.stringify({
        goal: 'post',
        userId: userId,
        content: msg
      }), 

      success: callback
    })
  }, 
/***************************************************/
  getComment: function (userId, textId, callback) {
    wx.request({
      url: myServer, //'https://www.attiladomain.xyz',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: JSON.stringify({
        goal: 'get_comment',
        userId: userId,
        textId: textId,
      }),
      success: callback
    })
  }, 
/***************************************************/
  postNewComment: function(userId, textId, cmt, callback) {
    console.log("cmt: " + cmt);
    wx.request({
      url: myServer, //'https://www.attiladomain.xyz',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: JSON.stringify({
        goal: 'post_comment',
        userId: userId,
        textId: textId, 
        content: cmt
      }),
      success: callback
    })
  }, 

  jiba: 1
}
