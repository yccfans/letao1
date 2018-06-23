var gallery = mui('.mui-slider');
gallery.slider({
  interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
});
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false
});


// 根据location.search的值转换成一个对象，通用函数
function getKey() {
  var obj = {};
  var search = location.search;
  search = search.slice(1);
  var arr = search.split("&");
  arr.forEach(function (e, i) {
    var k = e.split('=')[0];
    var v = decodeURI(e.split('=')[1]);
    obj[k] = v;
  })
  return obj;
}