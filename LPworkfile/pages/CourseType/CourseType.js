//CourseType.js
//获取应用实例
var app = getApp()
var arr_name = ["CSC", "MAT", "MGE", "STA", "MGT", "LIN", "EES", "BIO",
  "PSY", "CHM", "ANT", "MDS", "其它"]
var arr_link = [1, 10, 15, 52, 62, 68, 75, 82, 98, 112, 147, 161, 218, 166, 182,
  188, 192, 197, 202, 205, 212, 227, 132]
var file = "../../image/"
Page({
  data: {
    navLeftItems: [{
      id: "1",
      src: "../../image/csc.jpg",
      text: arr_name[0],
    }, {
      id: "10",
      src: "../../image/mat.jpg",
      text: arr_name[1]
    }, {
      id: "15",
      src: "../../image/pig.jpg",
      text: arr_name[2]
    }, {
      id: "52",
      src: "../../image/pig.jpg",
      text: arr_name[3]
    }, {
      id: "62",
      src: "../../image/pig.jpg",
      text: arr_name[4]
    }, {
      id: "68",
      src: "../../image/pig.jpg",
      text: arr_name[5]
    }, {
      id: "75",
      src: "../../image/pig.jpg",
      text: arr_name[6]
    }, {
      id: "82",
      src: "../../image/pig.jpg",
      text: arr_name[7]
    }, {
      id: "98",
      src: "../../image/pig.jpg",
      text: arr_name[8]
    }, {
      id: "112",
      src: "../../image/pig.jpg",
      text: arr_name[9]
    }, {
      id: "147",
      src: "../../image/pig.jpg",
      text: arr_name[10]
    }, {
      id: "161",
      src: "../../image/pig.jpg",
      text: arr_name[11]
    }, {
      id: "218",
      src: "../../image/pig.jpg",
      text: arr_name[12]
    }, {
      id: "166",
      src: "../../image/pig.jpg",
      text: arr_name[13]
    }, {
      id: "182",
      src: "../../image/pig.jpg",
      text: arr_name[14]
    }, {
      id: "188",
      src: "../../image/pig.jpg",
      text: arr_name[15]
    }, {
      id: "192",
      src: "../../image/pig.jpg",
      text: arr_name[16]
    }, {
      id: "197",
      src: "../../image/pig.jpg",
      text: arr_name[17]
    }, {
      id: "202",
      src: "../../image/pig.jpg",
      text: arr_name[18]
    }, {
      id: "205",
      src: "../../image/pig.jpg",
      text: arr_name[19]
    }, {
      id: "212",
      src: "../../image/pig.jpg",
      text: arr_name[20]
    }],
    cateItems: [
      {
        cate_id: 1,
        cate_name: arr_name[0],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'CSCA08H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 2,
            name: 'CSCA20H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 3,
            name: 'CSCA48H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 4,
            name: 'CSCA67H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 5,
            name: 'CSCB07H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 6,
            name: 'CSCB09H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 7,
            name: 'CSCB20H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 8,
            name: 'CSCB36H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 9,
            name: 'CSCB29H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 10,
            name: 'CSCB58H3',
            image: "../../image/csBook.png"
          },
          {
            child_id: 11,
            name: 'CSCB63H3',
            image: "../../image/csBook.png"
          },
        ]
      },
      {
        cate_id: 2,
        cate_name: arr_name[1],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'MATA02H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 2,
            name: 'MATA23H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 3,
            name: 'MATA29H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 4,
            name: 'MATA30H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 5,
            name: 'MATA31H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 6,
            name: 'MATA32H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 7,
            name: 'MATA33H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 8,
            name: 'MATA35H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 9,
            name: 'MATA36H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 10,
            name: 'MATA37H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 11,
            name: 'MATA67H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 12,
            name: 'MATB24H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 13,
            name: 'MATB41H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 14,
            name: 'MATB42H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 15,
            name: 'MATB43H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 16,
            name: 'MATB44H3',
            image: "../../image/matBook.png"
          },
          {
            child_id: 17,
            name: 'MATB61H3',
            image: "../../image/matBook.png"
          },
        ]
      },
      {
        cate_id: 3,
        cate_name: arr_name[2],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'MGAB01H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 2,
            name: 'MGAB02H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 3,
            name: 'MGAB03H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 4,
            name: 'MGFB10H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 5,
            name: 'MGIA01H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 6,
            name: 'MGFB10H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 7,
            name: 'MGIB01H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 8,
            name: 'MGIB02H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 9,
            name: 'MGIB12H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 10,
            name: 'MGMA01H3',
            image: "../../image/MAT.png"
          },
          {
            child_id: 11,
            name: 'MGMB01H3',
            image: "../../image/MAT.png"
          },
        ]
      },
      {
        cate_id: 4,
        cate_name: arr_name[3],
        ishaveChild: true,
        children: 
        [
          {
          child_id: 1,
          name: 'STAA57H3',
          image: "../../image/stats.png"},
          {
          child_id: 2,
          name: 'STAB22H3',
          image: "../../image/stats.png"
          },
          {
          child_id: 3,
          name: 'STAB23H3',
          image: "../../image/stats.png"
          },
          {
          child_id: 4,
          name: 'STAB27H3',
          image: "../../image/stats.png"
          },
          {
          child_id: 5,
          name: 'STAB41H3',
          image: "../../image/stats.png"
          },
          {
          child_id: 6,
          name: 'STAB52H3',
          image: "../../image/stats.png"
          },
          {
          child_id: 7,
          name: 'STAB57H3',
          image: "../../image/stats.png"
          }]
      },
      {
        cate_id: 5,
        cate_name: arr_name[4],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'MGTA06H3',
            image: "../../image/mat.jpg"
          },
          {
            child_id: 2,
            name: 'MGTA01H3',
            image: "../../image/mat.jpg"
          },
          {
            child_id: 3,
            name: 'MGTA02H3',
            image: "../../image/mat.jpg"
          },
          {
            child_id: 4,
            name: 'MGTB20H3',
            image: "../../image/mat.jpg"
          }
        ]
      },
      {
        cate_id: 6,
        cate_name: arr_name[5],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'LINA01H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 2,
            name: 'LINA02H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 3,
            name: 'LINB04H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 4,
            name: 'LINB06H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 5,
            name: 'LINB09H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 6,
            name: 'LINB10H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 7,
            name: 'LINB13H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 8,
            name: 'LINB18H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 9,
            name: 'LINB19H3',
            image: "../../image/linguistic.png"
          },
          {
            child_id: 10,
            name: 'LINB20H3',
            image: "../../image/linguistic.png"
          },
        ]
      },
      {
        cate_id: 7,
        cate_name: arr_name[6],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'EESA01',
            image: "../../image/Environmental.png"
          },
          {
            child_id: 2,
            name: 'EESA06',
            image: "../../image/Environmental.png"
          },
          {
            child_id: 3,
            name: 'EESA02',
            image: "../../image/Environmental.png"
          },
          {
            child_id: 4,
            name: 'EESB09',
            image: "../../image/Environmental.png"
          },
          {
            child_id: 5,
            name: 'EESB04',
            image: "../../image/Environmental.png"
          },
          {
            child_id: 6,
            name: 'EESB03',
            image: "../../image/Environmental.png"
          }
        ]
      },
      {
        cate_id: 8,
        cate_name: arr_name[7],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: 'BIOA01',
            image: "../../image/biology.png"
          },
          {
            child_id: 2,
            name: 'BIOA02',
            image: "../../image/biology.png"
          },
          {
            child_id: 3,
            name: 'BIOB03',
            image: "../../image/biology.png"
          },
          {
            child_id: 4,
            name: 'BIOB14',
            image: "../../image/biology.png"
          }
        ]
      },
      {
        cate_id: 9,
        cate_name: arr_name[8],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          }
        ]
      },
      {
        cate_id: 10,
        cate_name: arr_name[9],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          }
        ]
      },
      {
        cate_id: 11,
        cate_name: arr_name[10],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          }
        ]
      },
      {
        cate_id: 12,
        cate_name: arr_name[11],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          }
        ]
      },
      {
        cate_id: 13,
        cate_name: arr_name[12],
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
          }
        ]
      },
    ],
    curNav: 1,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  // 进入分类函数
  goToCourse: function (e) {

  }
})