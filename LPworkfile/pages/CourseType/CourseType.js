//index.js
//获取应用实例
var app = getApp()
var arr_name = ["CSC", "MAT", "MGE", "STA", "MGT", "LIN", "EES", "BIO",
                "PSY", "CHM", "ANT", "ENG", "HIS", "MDS", "ECT",
                "LGG", "VPM", "其它", "PHY", "NME", "CTL"]
var arr_link = [1, 10, 15, 52, 62, 68, 75, 82, 98, 112, 147, 161, 218, 166, 182,
                188, 192, 197, 202, 205, 212, 227, 132]
var file = "../../image/"
Page({
    data: {
        items: [{
            id: "1",
            src: "../../image/csc.jpg",
            text: arr_name[0]
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
        url:file,
    },
})
