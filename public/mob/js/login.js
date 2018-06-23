$("[type='button']").on("click", function () {
  if ($("[name='username']").val() === "") {
    mui.toast("用户名不能为空");
    return;
  }
  if ($("[name='password']").val() === "") {
    mui.toast("密码不能为空");
    return;
  }
  $.ajax({
    type: 'post',
    url: "/user/login",
    data: $("form").serialize(),
    success: function (r) {
      if (r.error) {
        mui.toast(r.message);
      }
      if (r.success) {
        location.href = "user.html";
      }
    }
  })
})
