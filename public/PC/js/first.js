var page = 1;
var pageSize = 4;
render();
function render() {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (r) {
      // console.log(r);
      // console.log(template("tpl", r));
      $("tbody").html(template("tpl", r));
      $("#ppppp").bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: page,
        totalPages: Math.ceil(r.total / r.size),
        onPageClicked: function (a, s, d, p) {
          page = p;
          render();
        }
      });
    }
  })
}

//添加分类
$(".btn_add").on("click", function () {
  $("#addModal").modal("show");
})
$("#form").bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [':disabled', ':hidden', ':not(:visible)'],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    categoryName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '分类名不能为空'
        },
      }
    }
  }
})
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type: "post",
    url: "/category/addTopCategory",
    data: $("#form").serialize(),
    success: function (r) {
      // console.log(r);
      $("#addModal").modal("hide");
      render();
      $("#form").data("bootstrapValidator").resetForm();
      $("#form")[0].reset();
    }
  })
});
