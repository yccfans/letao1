$ftlinks = $(".aside .footer a");
$ftlinks.on('click', function () {
  $ftlinks.each(function () {
    $(this).removeClass("now");
  })
  $(this).addClass('now');
})
$('.category').on("click",function(){
  $(".footer .navs li li").css('display','block')
})