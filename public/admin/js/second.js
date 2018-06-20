var page = 1;
var pageSize = 6;
render();
function render() {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (r) {
      // console.log(r);
      $("tbody").html(template("tpl", r));
      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: page,
        totalPages: Math.ceil(r.total / r.size),
        onPageClicked: function (a, s, d, p) {
          page = p;
          render();
        }
      })
    }
  })
}

$(".btn_add").on("click", function () {
  $("#addModal").modal("show");
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 999
    },
    success: function (r) {
      // console.log(r);
      $(".dropdown-menu").html(template("tpl2", r));
    }
  })
})
$(".dropdown-menu").on("click", "a", function () {
  var id = $(this).data("id");
  var txt = $(this).text();
  $("[name='categoryId']").val(id);
  $("#dropdownMenu1").text(txt);
})
$("#fileupload").fileupload({
  dataType: "json",
  //e：事件对象
  //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
  done: function (e, data) {
    $(".imgbox img").attr("src", data.result.picAddr);
    $("[name='brandLogo']").val(data.result.picAddr);
  }
})
$("#form").bootstrapValidator({
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    categoryId: {
      validators: {
        notEmpty: {
          message: '分类名不能为空'
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: '品牌名不能为空'
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: '品牌图片不能为空'
        }
      }
    }
  }
})

$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type: "post",
    url: "/category/addSecondCategory",
    data: $("#form").serialize(),
    success: function (r) {
      console.log(r);
      $("#addModal").modal("hide");
      page = 1;
      render();
      $("#form").data("bootstrapValidator").resetForm(true);
      // $("#form")[0].reset();
      $(".imgbox img").attr("src", "images/none.png");
      $("#dropdownMenu1").text("请选择一级分类");
    }
  })
});
