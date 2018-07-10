//index.js
//获取应用实例
var app = getApp()
var arr_name = ["CSC", "MAT", "MGE", "STA", "MGT", "LIN", "EES", "BIO",
                "PSY", "CHM", "ANT", "ENG", "HIS", "MDS", "ECT",
                "LGG", "VPM", "GAS", "PHY", "NME", "CTL"]
var arr_link = [1, 10, 15, 52, 62, 68, 75, 82, 98, 112, 147, 161, 218, 166, 182,
                188, 192, 197, 202, 205, 212, 227, 132]
var file = "../../pages/list/list"
Page({
    data: {
        items: [{
            id: "1",
            src: "",
            text: arr_name[0]
        }, {
            id: "10",
            src: "",
            text: arr_name[1]
        }, {
            id: "15",
            src: "",
            text: arr_name[2]
        }, {
            id: "52",
            src: "",
            text: arr_name[3]
        }, {
            id: "62",
            src: "",
            text: arr_name[4]
        }, {
            id: "68",
            src: "",
            text: arr_name[5]
        }, {
            id: "75",
            src: "",
            text: arr_name[6]
        }, {
            id: "82",
            src: "",
            text: arr_name[7]
        }, {
            id: "98",
            src: "",
            text: arr_name[8]
        }, {
            id: "112",
            src: "",
            text: arr_name[9]
        }, {
            id: "147",
            src: "",
            text: arr_name[10]
        }, {
            id: "161",
            src: "",
            text: arr_name[11]
        }, {
            id: "218",
            src: "",
            text: arr_name[12]
        }, {
            id: "166",
            src: "",
            text: arr_name[13]
        }, {
            id: "182",
            src: "",
            text: arr_name[14]
        }, {
            id: "188",
            src: "",
            text: arr_name[15]
        }, {
            id: "192",
            src: "",
            text: arr_name[16]
        }, {
            id: "197",
            src: "",
            text: arr_name[17]
        }, {
            id: "202",
            src: "",
            text: arr_name[18]
        }, {
            id: "205",
            src: "",
            text: arr_name[19]
        }, {
            id: "212",
            src: "",
            text: arr_name[20]
        }],
        url:file,
    },
})
