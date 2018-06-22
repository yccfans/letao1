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
