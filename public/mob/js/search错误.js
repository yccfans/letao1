$(function () {
  var obj = {};
  var arr = [];
  $(".search_btn").on("click", function () {
    if ($(".search input").val() !== "") {
      arr.unshift($(".search input").val());
      $(".search input").val("");
      // arr += getLocalStorage();
      // console.log(arr)
      console.log(getLocalStorage())
      localStorage.setItem("lt-history", arr);
      render();
    }
  })
  render();
  function getLocalStorage() {
    var history = localStorage.getItem("lt-history") || '[]';
    history = JSON.parse(history);
    return history;
  }
  function render() {
    var ls = localStorage.getItem("lt-history");
    // var arr = ls.split(",");
    obj = {
      rows: arr
    }
    $(".history").html(template("tpl", obj))
  }
})

// localStorage.clear()


