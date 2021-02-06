
const constants = {
    provinces: ['北京市',
        '天津市',
        '河北省',
        '山西省',
        '内蒙古自治区',
        '辽宁省',
        '吉林省',
        '黑龙江省',
        '上海市',
        '江苏省',
        '浙江省',
        '安徽省',
        '福建省',
        '江西省',
        '山东省',
        '河南省',
        '湖北省',
        '湖南省',
        '广东省',
        '广西壮族自治区',
        '海南省',
        '重庆市',
        '四川省',
        '贵州省',
        '云南省',
        '西藏自治区',
        '陕西省',
        '甘肃省',
        '青海省',
        '宁夏回族自治区',
        '新疆维吾尔自治区'],

    instituteLabels: [
        '985',
        '211',
        '一本',
        '一流大学建设高校A类',
        '一流大学建设高校B类',
        '一流学科建设高校',
        '教育部直属',
    ],

    instituteCategories: [
        '本科',
        '专科',
        '合作办学',
        '公办',
        '民办'
    ],
    sampleData: [
    {
        id: 104,
        instname: "中山大学",
        homepage: "http://www.sysu.edu.cn",
        tel: "020-84036491",
        email: "adado@mail.sysu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/104.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "广东，广州市"
    },
    {
        id: 105,
        instname: "华南理工大学",
        homepage: "http://www.scut.edu.cn/",
        tel: "020-84036491",
        email: "admit@scut.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/105.jpg",
        labels: ["本科", "理工类", "公办", "211", "985", "一流大学建设高校"],
        location: "广东，广州市"
    },
    {
        id: 106,
        instname: "暨南大学",
        homepage: "http://www.jnu.edu.cn",
        tel: "020-85220130",
        email: "ozsb@jnu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/106.jpg",
        labels: ["本科", "综合类", "公办", "211", "一流学科建设高校"],
        location: "广东，广州市"
    },
    {
        id: 284,
        instname: "深圳大学",
        homepage: "http://zs.szu.edu.cn",
        tel: "0755-26536235",
        email: "zsb@szu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/284.jpg",
        labels: ["本科", "综合类", "公办"],
        location: "广东，深圳市"
    },
    {
        id: 293,
        instname: "广州大学",
        homepage: "http://www.gzhu.edu.cn",
        tel: "020-39366232",
        email: "zhaosb@gzhu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/293.jpg",
        labels: ["本科", "综合类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 286,
        instname: "广东工业大学",
        homepage: "http://www.gdut.edu.cn",
        tel: "020-39322681",
        email: "zsb@gdut.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/286.jpg",
        labels: ["本科", "理工类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 98,
        instname: "华南师范大学",
        homepage: "http://www.scnu.edu.cn",
        tel: "020-85211098",
        email: "zsb02@scnu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/98.jpg",
        labels: ["本科", "综合类", "公办", "211", "一流学科建设高校"],
        location: "广东，广州市"
    },
    {
        id: 302,
        instname: "广东财经大学",
        homepage: "http://www.gdufe.edu.cn",
        tel: "020-84096844",
        email: "zsb@gdufe.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/302.jpg",
        labels: ["本科", "财经类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 290,
        instname: "广东外语外贸大学",
        homepage: "http://www.gdufs.edu.cn",
        tel: "020-36204310",
        email: "zsb@gdufs.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/290.jpg",
        labels: ["本科", "语言类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 287,
        instname: "华南农业大学",
        homepage: "http://www.scau.edu.cn",
        tel: "020-85283652",
        email: "zsb@scau.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/287.jpg",
        labels: ["本科", "综合类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 288,
        instname: "广东海洋大学",
        homepage: "http://www.gdou.edu.cn",
        tel: "0759-2396115",
        email: "zsb@gdou.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/288.jpg",
        labels: ["本科", "农林类", "公办"],
        location: "广东，湛江市"
    },
    {
        id: 960,
        instname: "南方医科大学",
        homepage: "http://www.smu.edu.cn/",
        tel: "020-61648502",
        email: "zsb@smu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/960.jpg",
        labels: ["本科", "医药类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 2054,
        instname: "北京师范大学珠海分校",
        homepage: "http://www.bnuz.edu.cn",
        tel: "0756-3683333",
        email: "zsb@bnuz.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/2054.jpg",
        labels: ["本科", "其他", "民办"],
        location: "广东，珠海市"
    },
    {
        id: 1031,
        instname: "广东金融学院",
        homepage: "http://www.gduf.edu.cn",
        tel: "020-37215393",
        email: "zsb@scau.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/1031.jpg",
        labels: ["本科", "财经类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 295,
        instname: "广州医科大学",
        homepage: "http://www.gzhmu.edu.cn/",
        tel: "020-81340278",
        email: "zs8134@126.com",
        icon: "https://static-data.eol.cn/upload/logo/295.jpg",
        labels: ["本科", "医药类", "公办"],
        location: "广东，广州市"
    },
    {
        id: 283,
        instname: "汕头大学",
        homepage: "http://www.stu.edu.cn",
        tel: "0754-86503666",
        email: "zsb@bnuz.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/283.jpg",
        labels: ["本科", "其他", "公办"],
        location: "广东，汕头市"
    },
    {
        id: 1031,
        instname: "北京师范大学-香港浸会大学联合国际学院",
        homepage: "https://uic.edu.cn/cn",
        tel: "0756-3520011",
        email: "admission@uic.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/1275.jpg",
        labels: ["本科", "综合类", "合作办学"],
        location: "广东，珠海市"
    },
    {
        id: 102,
        instname: "厦门大学",
        homepage: "http://www.xmu.edu.cn/",
        tel: "0592-2188888",
        email: "zs@xmu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/102.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "福建，厦门市"
    },
    {
        id: 99,
        instname: "四川大学",
        homepage: "http://www.scu.edu.cn",
        tel: "028-86081605",
        email: "nic8401@scu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/99.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "四川，成都市"
    },
    {
        id: 42,
        instname: "武汉大学",
        homepage: "http://www.whu.edu.cn",
        tel: "027-68754231",
        email: "wlxxs@whu.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/42.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "湖北，武汉市"
    },
    {
        id: 31,
        instname: "北京大学",
        homepage: "http://www.pku.edu.cn/",
        tel: "010-62751407",
        email: "bdzsb@pku.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/31.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "北京，海淀区"
    },
    {
        id: 140,
        instname: "清华大学",
        homepage: "http://www.tsinghua.edu.cn",
        tel: "010-62782051",
        email: "zsb@mail.tsinghua.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/140.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "北京，海淀区"
    },
    {
        id: 46,
        instname: "中国人民大学",
        homepage: "http://www.ruc.edu.cn",
        tel: "400-012-3517",
        email: "zsb@ruc.edu.cn",
        icon: "https://static-data.eol.cn/upload/logo/46.jpg",
        labels: ["本科", "综合类", "公办", "211", "985", "一流大学建设高校"],
        location: "北京，海淀区"
    },
]
}

export default constants;