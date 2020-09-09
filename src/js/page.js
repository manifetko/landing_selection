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
  var ovarlayTemplate = $("#overlayCallbackTemplate").html();
  $("body").append(ovarlayTemplate);
  var overlay = $(".overlay-callback");
  var overlayWindow = $(".overlay-callback__window");
  var mouseOutside;
  overlay.fadeOut(0, function() {
    $("body").css({
      overflow: "hidden"
    });
    overlay.fadeIn(1000);
  });
  $(".overlay-callback__close").on("click", () => {
    overlay.fadeOut(500, function() {
      overlay.remove();
      $("body").css({
        overflow: "unset"
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
        overflow: "unset"
      });
    }
  });
}
$(".btn-callback").on("click", e => {
  e.preventDefault();
  createOverlay();
});
// overlay
var howBuyItem;
$(".how-buy__item").each((ndx, item) => {
  $(item).on("click", () => {
    $(".how-buy__item").removeClass("active");
    howBuyItem = $(item);
    $(item).addClass("active");
    $(".how-buy__template").each((ndx, item) => {
      if (howBuyItem.attr("data-type") === $(item).attr("data-type")) {
        $(".how-buy__content").html($(item).html());
      }
    });
  });
});
// how-buy section
$(window).scroll(function() {
  var winScrollTop = $(this).scrollTop();
  $(".container__heading").each((ndx, item) => {
    var target = $(item);
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;
    if (winScrollTop > scrollToElem) {
      $(item)
        .find(".container__heading-front")
        .animate({
          left: "3.625rem"
        }, 1000);
    }
  });
});
