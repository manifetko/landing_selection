$(function() {
  $('a[href^="#"]').on("click", function(event) {
    event.preventDefault();
    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    $("html, body").animate({ scrollTop: dn }, 500);
  });
});
// links
function createOverlay() {
  var ovarlayTemplate = $("#overlayTemplate").html();
  $("body").append(ovarlayTemplate);
  var overlay = $(".overlay");
  var overlayWindow = $(".overlay__window");
  var mouseOutside;
  overlay.fadeOut(0, function() {
    $("body").css({
      overflow: "hidden",
      position: "fixed",
      width: "100%"
    });
    overlay.fadeIn(1000);
  });
  $(".overlay__close").on("click", () => {
    overlay.fadeOut(500, function() {
      overlay.remove();
      $("body").css({
        overflow: "unset",
        position: "relative",
        width: "auto"
      });
    });
  });
  overlayWindow.on("mouseleave", e => {
    mouseOutside = true;
  });
  overlayWindow.on("mouseenter", e => {
    mouseOutside = false;
  });
  overlay.on("click", e => {
    e.preventDefault;
    if (mouseOutside === true) {
      overlay.fadeOut(500, function() {
        overlay.remove();
      });
      $("body").css({
        overflow: "unset",
        position: "relative",
        width: "auto"
      });
    }
  });
}
// overlay
