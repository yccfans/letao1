$(function () {
  // 增加
  $(".search_btn").on("click", function () {
    if ($(".search input").val() != "") {
      //有个bug，输入为空也能打印搜索记录
      var history = getLocalStorage();
      if (history.indexOf($(".search input").val()) > -1) {
        var idx = history.indexOf($(".search input").val());
        history.splice(idx, 1);
      }
      if (history.length === 10) {
        history.pop();
      }
      history.unshift($(".search input").val());
    }
    localStorage.setItem("lt-input", history);
    render();
    location.href = "searchList.html?key=" + $(".search input").val();
    $(".search input").val("");
  })
  render();

  // 清空搜索内容
  $(".history").on('click', ".empty", function () {
    localStorage.clear();
    render();
  })

  // 删除单条搜索记录
  $(".history").on("click", ".btn-delete", function () {
    var idx = $(this).parent().data("index");
    var history = getLocalStorage();
    history.splice(idx, 1);
    localStorage.setItem("lt-input", history);
    render();
  })



  //获取localStorage函数，返回一个数组
  function getLocalStorage() {
    var ls = localStorage.getItem("lt-input") || "[]";
    ls = ls === "[]" ? [] : ls.split(",");
    return ls;
  }
  // 查询localStorage并渲染
  function render() {
    var history = getLocalStorage();
    // console.log(history)
    $(".history").html(template("tpl", { rows: history }))
  }
})