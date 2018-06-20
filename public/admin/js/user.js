var page = 1;
var pageSize = 6;
render();
function render() {
  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (r) {
      // console.log(r);
      $("tbody").html(template("tpl", r));
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: page,
        totalPages: Math.ceil(r.total / r.size),
        onPageClicked: function (a, b, c, p) {
          page = p;
          render();
        }
      })
    }
  })
}

//启用禁用
$("tbody").on("click", "button", function () {
  $("#userModal").modal("show");
  var id = $(this).data("id");
  var isDelete = $(this).text() === "禁用" ? 0 : 1;
  // console.log(id)
  // console.log(isDelete)
  $(".btn_user").off().on("click", function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (r) {
        // console.log(r)
        $("#userModal").modal("hide");
        render();
      }
    })
  })
})
