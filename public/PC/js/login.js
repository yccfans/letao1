// 使用bootstrapValidator进行表单校验
$("form").bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    username: {
      validators: {
        notEmpty: {
          message: "用户名不能为空"
        },
        regexp: {
          regexp: /^[a-zA-Z]\S{3,}$/,
          message: "至少4位字符，且不能以数字开头"
        },
        callback: {
          message: "用户名错误"
        }
      }
    },
    password: {
      validators: {
        notEmpty: {
          message: "密码不能为空"
        },
        regexp: {
          regexp: /^\S{6,16}$/,
          message: "正确格式应为6-16位字符"
        },
        callback: {
          message: "密码错误"
        }
      }
    }
  }
})

// 重置表单时重置校验内容
$("[type='reset']").on("click", function () {
  $("form").data("bootstrapValidator").resetForm();
})

// 表单校验成功
$("form").on("success.form.bv", function (e) {
  e.preventDefault();
  $.ajax({
    type: "post",
    url: "/employee/employeeLogin",
    data: $("form").serialize(),
    success: function (res) {
      if (res.success) {
        location.href = "./index.html";
      }
      // 用户名错误时手动更新username的校验为callback状态
      if (res.error === 1000) {
        $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
      }
      // 密码错误时手动更新password的校验为callback状态
      if (res.error === 1001) {
        $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
      }
    }
  })
})
