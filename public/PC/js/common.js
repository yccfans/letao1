//禁用进度环
NProgress.configure({ showSpinner: false });
//发送ajax之前
$(document).ajaxStart(function () {
  NProgress.start();
})
//发送ajax之后
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500)
})


$(".aside a").on('click', function () {
  // console.log(111)
  $(".aside a").each(function () {
    $(this).removeClass("cur");
  })
  $(this).addClass("cur");
})

$(".slideT p").on("click", function () {
  $(this).next().slideToggle();
})

$(".icon-menu").on("click", function () {
  $(".aside").toggleClass("cur");
  $(".main").toggleClass("cur");
})

$(".icon-logout").on("click", function () {
  $(".modal-logout").modal("show");
  $("")
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    success: function (r) {
      if (r.success) {
        
        // location.href = "login.html";
      }
      // console.log(r);
    }
  })
})