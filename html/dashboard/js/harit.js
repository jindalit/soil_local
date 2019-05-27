$(document).ready(function() {
  var date = new Date();
  $("#copyrightYear").text(date.getFullYear());
  $("#id-name--1").on("click", function() {
    console.log("switch clicked.");
    if ($("body").hasClass("vertical-dark")) {
      $("body")
        .removeClass("vertical-dark")
        .addClass("vertical-light");
      $("div.admetro-page-wrapper")
        .removeClass("sidebar-dark")
        .addClass("sidebar-light");
    } else {
      $("body")
        .removeClass("vertical-light")
        .addClass("vertical-dark");
      $("div.admetro-page-wrapper")
        .removeClass("sidebar-light")
        .addClass("sidebar-dark");
    }
  });
});
