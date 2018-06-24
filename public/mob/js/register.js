$(".btn_register").on("click", function () {
  if ($('[name="username"]').val() === "") {
    mui.toast("用户名不能为空");
    return;
  }
  if ($('[name="password"]').val() === "") {
    mui.toast("密码不能为空");
    return;
  }
  if ($('[name="password"]').val() !== $('[name="repassword"]').val()) {
    mui.toast("两次密码不一致");
    return;
  }
  if (!/^1[3-9]\d{9}$/.test($('[name="mobile"]').val())) {
    mui.toast("手机号格式不正确");
    console.log($('[name="mobile"]').val())
    return;
  }
  if ($("[name='vCode']").val() === "") {
    mui.toast("验证码不能为空");
    return;
  }
  $.ajax({
    type: "post",
    url: "/user/register",
    data: $(".myform").serialize(),
    success: function (r) {
      console.log(r);
      if (r.error) {
        mui.toast(r.message);
        return;
      }
      mui.toast("注册成功，3秒后跳转到登录页");
      setTimeout(function () {
        location.href = "login.html";
      }, 3000)
    }
  })
})

//获取验证码
$(".btn_vcode").on('click', function () {
  $.ajax({
    type: "get",
    url: "/user/vCode",
    success: function (r) {
      console.log(r);
    }
  })
})

