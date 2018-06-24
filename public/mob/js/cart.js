$(function () {
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,
        callback: function () {
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (r) {
              console.log(r)
              if (r.error) {
                location.href = "login.html?retUrl=" + location.href;
              } else {
                $("#OA_task_2").html(template("tpl", { data: r }));
                setTimeout(function () {
                  // 渲染完结束下拉刷新
                  mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                }, 1000);
              }
            }
          })
        }
      }
    }
  });

  // 计算总价
  $("#OA_task_2").on("change", ".ck input", function () {
    var $ckinput = $(".ck input:checked");
    var total = 0;
    $ckinput.each(function () {
      total += $(this).data("price") * $(this).data("num");
    })
    total = total.toFixed(2);
    $(".totalPrice .pull-left span").text(total);
  })

  // 删除某一条
  $("#OA_task_2").on("tap", ".btn-delete", function () {
    var id = $(this).data("id");
    mui.confirm("你确定要删除这件商品吗？", "温馨提示", ["Yes,I do!", "手滑按错了"], function (e) {
      if (e.index == 0) {
        $.ajax({
          type: "get",
          url: '/cart/deleteCart',
          data: {
            id: [id]
          },
          success: function (r) {
            if (r.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  })

  //编辑购物车内容
  $("#OA_task_2").on("tap", ".btn-edit", function () {
    var data = this.dataset;
    console.log(data)
    var html = template("t2", data);
    html = html.replace(/\n/g, "");
    mui.confirm(html, "温馨提示", ["Yes,I do!", "手滑按错了"], function (e) {
      if (e.index == 0) {
        $.ajax({
          type: "post",
          url: "/cart/updateCart",
          data: {
            id: data.id,
            size: $(".lt_edit_size span.cur").text(),
            num: $(".lt_edit_num input").val()
          },
          success: function (r) {
            if (r.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
    // 重置数字框
    mui(".mui-numbox").numbox();
    //尺码点击添加cur类
    $(document).on("click", ".lt_edit_size span", function () {
      $(this).addClass("cur").siblings().removeClass("cur");
    })
  })

})
