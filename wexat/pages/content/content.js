// pages/content/content.js
var utils = require('../../utils/util');
var myServer = "https://www.attiladomain.xyz";//"http://localhost:70";//

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myId: "hehe", 
    refreshHeight: 0, 
    commented: -1, 
    touched: false, 
    onRefresh: false, 
    sTop: 1,

    panelState: 0, 
    loadingInfo: "已加载完毕", 
    loading: false, 

    dataDemo: [], 
    commentDemo: [], 
    msgData: [], 
    newMessage: "", 

    curMsg: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.setData ({
      myId: getApp().globalData.openId, 
      refreshHeight: wx.getSystemInfoSync().windowHeight * 0.07
    })

    console.log(this.data.refreshHeight);
  },

  onPullDownRefresh: function () {
    console.log("refresh");
    wx.stopPullDownRefresh()
  },

  upper: function(e) {
    console.log("upper");
  }, 

  toMyContent: function () {
    wx, wx.redirectTo({
      url: '../mycontent/mycontent',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }, 

  showComments: function (e) {
    console.log("show comment");
    var that = this;
    this.setData({
      commentDemo: []
    });
    if (this.data.commented != e.currentTarget.dataset.index) {
      /* send get_comment goal */
      utils.getComment(this.data.myId, e.currentTarget.dataset.index,
        function (res) {
          that.setData({
            commentDemo: res.data
          });
        });

      this.setData({
        commented: e.currentTarget.dataset.index,
      })
    }
    else {
      this.setData({
        commented: -1
      });
    }
  }, 

  search: function (e) {
    if (this.data.panelState != 1) {
      this.setData({
        panelState: 1
      });
    }
    else {
      this.setData({
        panelState: 0
      });
    }
  }, 

  postNew: function(e) {
    if (this.data.panelState != 2) {
      this.setData({
        panelState: 2
      });
    }
    else {
      this.setData({
        panelState: 0
      });
    }
  }, 

  newMsg: function (e) {
    this.setData({
      newMessage: e.detail.value
    }); 
    console.log("newMsg");
  }, 

  removeMessage: function(e) {
    var that = this;
    utils.delMsg(e.currentTarget.dataset.index, 
      function (res) {
        console.log("res: " + res.data);
        if (res != null) {
          that.setData({
            dataDemo: res.data.reverse()
          })
        }
    });
  }, 

  submitNew: function (e) {
    var that = this;
    console.log(this.data.newMessage)
    console.log("submitNew");
    this.setData({
      panelState: 0, 
    })

    utils.postNewMsg(this.data.myId, this.data.newMessage, 
    function (res) {
      console.log("res: " + res.data);
      if (res != null) {
        that.setData({
          dataDemo: res.data.reverse()
        })
      }
    });
    // utils.postNewMsg(233, this.data.newMessage);
  }, 

  postComment: function(e) {
    console.log(this.data.curMsg);
    var that = this;
    utils.postNewComment(this.data.myId, this.data.curMsg, this.data.newMessage, 
    function (res) {
      // console.log("res " + res.data);
      that.setData({
        commentDemo: res.data
      });
    })
    this.setData({
      panelState: 0
    })
  }, 

  cancel: function (e) {
    this.setData({
      panelState: 0
    });
  }, 
  
  getData: function() {
    console.log("getting data...");
    var that = this;
    this.setData({
      loading: true
    })
    wx.request({
      url: myServer, 
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: JSON.stringify({
        goal: "get",
        userId: that.data.myId
      }),
      success: function (res) {
        console.log("successfully get data");
        console.log(res.data);
        // that.data.dataList = res.data;

        that.setData({
          dataDemo: res.data.reverse(), 
          sTop: that.data.refreshHeight, 
          loading: false
        });
        // console.log("got data");
        // console.log(that.data.dataList);
      },

      fail: function (res) {
        console.log("get data fail")
        that.setData({
          loading: false
        })
        // this.setData({
        //   dataDemo: ["{content: 'fail'}"]
        // })
      }
    })
  },
  
  promptComment: function (e) {
    this.setData({
      panelState: 3, 
      curMsg: e.currentTarget.dataset.index, 
    });

    console.log(e.currentTarget.dataset.index);
  }, 


  scrollListener: function(e) {
    this.data.sTop = e.detail.scrollTop;
    if (this.data.touched == false) {
      if (this.data.sTop < this.data.refreshHeight * 0.7) {
        this.getData();
      }
      else if (this.data.sTop < this.data.refreshHeight){
        this.setData({
          sTop: this.data.refreshHeight
        });
      }
    }
  }, 

   onTouch: function(e) {
     this.setData({
       touched: true
     })
   }, 

   offTouch: function(e) {
    //  console.log("off " + this.data.sTop);
     this.setData({
       touched: false,
     }) 

     var test = this.data.sTop; 
     if (this.data.sTop < this.data.refreshHeight * 0.7) {
       this.getData();
     }
     else if (this.data.sTop < this.data.refreshHeight) {
       this.setData({
         sTop: this.data.refreshHeight
       });
     }

   }

  //  onReachBottom: function(e) {
  //    if (wx.pageScrollTo) {
  //      wx.pageScrollTo({
  //        scrollTop: 0
  //      })
  //    } else {
  //      wx.showModal({
  //        title: '提示',
  //        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  //      })
  //    }
  //    console.log("bottom");
  //  }
})


// /**
//  * 生命周期函数--监听页面初次渲染完成
//  */
// onReady: function () {

// },

// /**
//  * 生命周期函数--监听页面显示
//  */
// onShow: function () {

// },

// /**
//  * 生命周期函数--监听页面隐藏
//  */
// onHide: function () {

// },

// /**
//  * 生命周期函数--监听页面卸载
//  */
// onUnload: function () {

// },

// /**
//  * 页面相关事件处理函数--监听用户下拉动作
//  */
// onPullDownRefresh: function () {

// },

// /**
//  * 页面上拉触底事件的处理函数
//  */
// onReachBottom: function () {

// },

// /**
//  * 用户点击右上角分享
//  */
// onShareAppMessage: function () {

// }, 