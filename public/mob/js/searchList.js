$(".search input").val(getKey().key);
var page = 1;
var pageSize = 8;
render();
$(".lt-sort li[data-type]").on("click", function () {
  if (!$(this).hasClass('cur')) {
    $(this).addClass("cur").siblings().removeClass("cur");
    $(".lt-sort li span").addClass("fa-angle-down").removeClass("fa-angle-up");
  } else {
    $(this).find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }
  render();
})

$(".search_btn").on("click", function () {
  $(".lt-sort li").removeClass("cur");
  $(".lt-sort li span").addClass("fa-angle-down").removeClass("fa-angle-up");
  render();
})



function render() {
  $(".goods ul").html("<div class='loading'></div>")
  var obj = {
    proName: $(".search input").val(),
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
      // console.log(r);
      setTimeout(function () {
        $(".goods ul").html(template("tdd", r));
      }, 1000)
    }
  })
}

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