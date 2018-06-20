var page = 1;
var pageSize = 2;
render();
function render() {
  $.ajax({
    type: "get",
    url: "/product/queryProductDetailList",
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
        },
        itemTexts: function (type, page, current) {
          switch (type) {
            case "first":
              return "首页";
            case "prev":
              return "上页";
            case "next":
              return "下页";
            case "last":
              return "尾页";
            case "page":
              return page;
          }
        }
      })
    }
  })
}

$(".btn_add").on("click", function () {
  $("#addModal").modal("show");
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: 1,
      pageSize: 999
    },
    success: function (r) {
      // console.log(r);
      $(".dropdown-menu").html(template("tpl2", r))
    }
  })
})

// 把dropdown点击那条的data-id添加到name='brandId'的input上
$(".dropdown-menu").on("click", "a", function () {
  var id = $(this).data("id");
  $("[name='brandId']").val(id);
  $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  $("#dropdownMenu1").text($(this).text());
})

// 表单校验
$("#form").bootstrapValidator({
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    brandId: {
      validators: {
        notEmpty: {
          message: '品牌名不能为空'
        }
      }
    },
    oldPrice: {
      validators: {
        notEmpty: {
          message: '原价不能为空'
        }
      }
    },
    price: {
      validators: {
        notEmpty: {
          message: '现价不能为空'
        }
      }
    },
    num: {
      validators: {
        notEmpty: {
          message: '库存不能为空'
        },
        regexp: {
          regexp: /^[1-9]\d{0,4}$/,
          message: '库存应该在1-99999之间'
        }
      }
    },
    size: {
      validators: {
        notEmpty: {
          message: '分类名不能为空'
        },
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message: 'size正确的格式为xx-xx'
        }
      }
    },
    proDesc: {
      validators: {
        notEmpty: {
          message: '商品描述不能为空'
        }
      }
    },
    proName: {
      validators: {
        notEmpty: {
          message: '商品名不能为空'
        }
      }
    },
    abc: {
      validators: {
        notEmpty: {
          message: '请上传三张图片'
        }
      }
    }
  }
})

// 图片上传
var arr = [];
// var html = "";
$("#fileupload").fileupload({
  dataType: "json",
  //e：事件对象
  //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
  done: function (e, data) {
    arr.push(data.result);
    // // arr.forEach(function (e, i) {
    // html = "<img src='" + data.result.picAddr + "' width='100' alt=''>";
    // console.log(html)
    // $(".imgbox").html(html);
    // // })
    if (arr.length > 3) {
      return;
    }
    $(".imgbox").append('<img src="' + data.result.picAddr + '" width="100" alt="">')
    if (arr.length == 3) {
      $("form").data("bootstrapValidator").updateStatus("abc", "VALID");
    } else {
      $("form").data("bootstrapValidator").updateStatus("abc", "INVALID");
    }
  }
});

// 表单检验成功
$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  var param = $("form").serialize();
  param += "&picName1=" + arr[0].picName + "&picAddr1=" + arr[0].picAddr;
  param += "&picName2=" + arr[1].picName + "&picAddr2=" + arr[1].picAddr;
  param += "&picName3=" + arr[2].picName + "&picAddr3=" + arr[2].picAddr;
  //使用ajax提交逻辑
  // console.log(param)
  $.ajax({
    type: "post",
    url: "/product/addProduct",
    data: param,
    success: function (r) {
      console.log(r);
      $("#addModal").modal("hide");
      page: page;
      render();
      $("form")[0].reset();
      $("form").data("bootstrapValidator").resetForm(true);
      $("#dropdownMenu1").text("请选择二级分类");
      // $(".imgbox").html(""); 
      $(".imgbox img").remove();
      arr = [];
    }
  })
});
