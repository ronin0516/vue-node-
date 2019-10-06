/**
 * 前后端接口交互api文件
 * index-restaurants接口传
 *      offset表示前面显示了几条店铺数据，limit表示一次传几条店铺数据回来
 *      经纬度告知后台当前位置，
 */

// 这种方式对pc端可以，移动端不太友好


 export default {
     'index': {
        'entries': '/h5/waimai/entries', // 图标导航入口图标
        'restaurants': '/h5/waimai/restaurants', // 首页店铺列表
      }
 }

 