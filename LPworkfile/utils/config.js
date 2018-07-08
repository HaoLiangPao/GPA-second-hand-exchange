'use strict';
const env = 'dev';// dev production
/*
 * 默认接口出错弹窗文案
 * @type {string}
 */
const defaultAlertMessage = '好像哪里出了小问题~ 请再试一次~';
/*
 * 默认分享文案
 * @type {{en: string}}
 */
const defaultShareText = {
  en: 'GPA二手书交易平台'
};
/*
 * 小程序默认标题栏文字
 * @type {string}
 */
const defaultBarTitle = {
  en: 'GPA二手书交易平台'
};
/*
 * 文章默认图片
 * @type {string}
 */
const defaultImg = {
  articleImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_c8GvctTkm_DnPpyymdN8BRp7lHWeKZk81SZCE90ka1tDqBBm',
  coverImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_c8GvctTkm_DnPpyymdN8BRp7lHWeKZk81SZCE90ka1tDqBBm'
};
let core = {
  env: env,
  defaultBarTitle: defaultBarTitle['en'],
  defaultImg: defaultImg,
  defaultAlertMsg: defaultAlertMessage,
  defaultShareText: defaultShareText['en'],
  isDev: env === 'dev',
  isProduction: env === 'production'
};
export default core;