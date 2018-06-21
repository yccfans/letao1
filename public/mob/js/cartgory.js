$.ajax({
  type: "get",
  url: "/category/queryTopCategory",
  success: function (r) {
    $(".tags ul").html(template("f", r));
  }
})
$(".tags ul").on("click", "li", function () {
  var id = $(this).data("id")
  render(id);
  mui('.brands .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
})

function render(id) {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {
      id: id
    },
    success: function (r) {
      // console.log(r)
      $(".brands ul").html(template("s", r));
    }
  })
}
render(1)

