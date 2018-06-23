var key = getKey().key;
$(".search input").val(key);
var page = 1;
var pageSize = 4;
// render();
$(".lt-sort li[data-type]").on("tap", function () {
  if (!$(this).hasClass('cur')) {
    $(this).addClass("cur").siblings().removeClass("cur");
    $(".lt-sort li span").addClass("fa-angle-down").removeClass("fa-angle-up");
  } else {
    $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
})

$(".search_btn").on("click", function () {
  key = $(".search input").val();
  $(".lt-sort li").removeClass("cur");
  $(".lt-sort li span").addClass("fa-angle-down").removeClass("fa-angle-up");
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
})

mui.init({
  pullRefresh: {
    container: ".mui-scroll-wrapper",
    down: {
      auto: true,
      callback: function () {
        page = 1;
        render(function (r) {
          $(".goods ul").html(template("tdd", r));
          // 结束下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
          // 重置上拉加载
          mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
        });
      }
    },
    up: {
      callback: function () {
        page++ ,
          render(function (r) {
            console.log(r)
            $(".goods ul").append(template("tdd", r));
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(r.data.length == 0);
          });

      }
    }
  }
});



function render(callback) {
  var obj = {
    proName: key,
    page: page,
    pageSize: pageSize
  }
  var $select = $(".lt-sort li.cur");
  if ($select.length > 0) {
    var type = $select.data("type");
    var value = $select.find("span").hasClass("fa-angle-down") ? 1 : 2;
    obj[type] = value;
    // console.log(obj)
  }
  $.ajax({
    type: "get",
    url: '/product/queryProduct',
    data: obj,
    success: function (r) {
      console.log(r);
      setTimeout(function () {
        callback(r);
      }, 1000)
    }
  })
}

