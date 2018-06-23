$(".btn_register").on("click", function () {
  if ($('name="username"').val() === "") {
    mui.toast("用户名不能为空");
    return;
  }
  if ($('name="password"').val() === "") {
    mui.toast("密码不能为空");
    return;
  }
  if ($('name="").val() === "") {
    mui.toast("俩密码不一致");
    return;
  }
  if ($('name="username"').val() === "") {
    mui.toast("请输入用户名");
    return;
  }
})
