var pid = getKey().pid;

$.ajax({
  type: "get",
  url: "/product/queryProductDetail",
  data: {
    id: pid
  },
  success: function (r) {
    console.log(r);
    var arr = r.size.split("-");
    var sizeP = [];
    for (var i = +arr[0]; i <= arr[1]; i++) {
      sizeP.push(i);
    }
    r.sizeP = sizeP;
    $(".content").html(template("tpl", r));

    // 轮播组件内容为js动态生成时（比如通过ajax动态获取的营销信息），则需要在动态生成完整DOM (包含mui-slider下所有DOM结构) 后，手动调用图片轮播的初始化方法
    mui('.mui-slider').slider({
      interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    mui('.mui-scroll-wrapper').scroll({
      indicators: false
    });
    //初始化numbox
    mui(".mui-numbox").numbox();
    $(".prosize span").on("click", function () {
      $(this).addClass('cur').siblings().removeClass('cur');
    })

    $(".btn_add_cart").on("click", function () {
      if ($(".prosize span.cur").length === 0) {
        mui.toast('请选择商品的尺码');
        return;
      }
      $.ajax({
        type: "post",
        url: '/cart/addCart',
        data: {
          productId: getKey().pid,
          num: $(".pronum input").val(),
          size: $(".prosize span.cur").text()
        },
        success: function (r) {
          console.log(r);
          if (r.error) {
            location.href = "login.html?retUrl=" + location.href;
          }
          if (r.success) {
            location.href = "cart.html";
          }
        }
      })
    })
  }
})


