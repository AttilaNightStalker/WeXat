//app.js

const AppId = "wx6529e346909cbc25";
const AppSecret = "90cbd839a0a2270abfa2966aab6435ce";
// var openId;
// var sessionKey;


App({
  globalData: {
    openId: -1,
    sessionKey: -1, 
  }, 
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // wx.setStorage('logs', logs);
    // 登录
    wx.login({
      success: loginCode => {
        wx.request({
          url: "https://www.attiladomain.xyz/get_open_id" ,
          data: {
            appid: AppId,
            secret: AppSecret,
            js_code: loginCode.code,
            grant_type: 'authorization_code'  
          }, 
          method: 'GET', 
          success: function (res) {
            // that.setData({
            //   openId: res.data.openid,
            //   sessionKey: res.data.session_key
            // })
            that.globalData.openId = res.data.openid;
            that.globalData.sessionKey = res.data.session_key;
            console.log(res.data.openid);
            console.log(res.data.session_key);
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  
  globalData: {
    userInfo: null
  }
})