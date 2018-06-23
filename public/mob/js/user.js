$.ajax({
  type: "get",
  url: "/user/queryUserMessage",
  success: function (r) {
    $(".content").html(template('tpl', r))
  }
})

$(".content").on("click", ".btn_logout", function () {
  console.log(1111)
  $.ajax({
    type: "get",
    url: "/user/logout",
    success: function (r) {
      if (r.success) {
        location.href = "login.html";
      }
    }
  })
})
