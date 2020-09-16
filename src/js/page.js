$(function() {
  $('a[href^="#"]').on("click", function(event) {
    event.preventDefault();
    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    $("html, body").animate({ scrollTop: dn }, 500);
  });
});
// links
function createOverlay(type) {
  var mouseOutside;
  if (type === "callback") {
    var overlayTemplate = $("#overlayCallbackTemplate").html();
  }
  if (type === "analysis") {
    var overlayTemplate = $("#overlayAnalysisTemplate").html();
  }
  if ($(".overlay")) {
    $("body").append(overlayTemplate);
    var overlay = $(".overlay");
    var overlayWindow = $(".overlay__window");
    overlay.fadeOut(0, function() {
      overlay.fadeIn(1000);
    });
    overlay.on("mousewheel", e => {
      e.preventDefault();
    });
    overlay.on("mousedown", e => {
      if (e.which === 2) {
        e.preventDefault();
      }
    });
    $(document).on("keydown", e => {
      if (e.which === 33 || 40 || 38 || 34) {
        e.preventDefault();
      }
    });
    $(".overlay__input").each((ndx, item) => {
      $(item).on("keydown", () => {
        $(item)
          .siblings(".overlay__input-required")
          .css({
            display: "none"
          });
      });
      $(item).on("keyup", () => {
        if ($(item).val() === "") {
          $(item)
            .siblings(".overlay__input-required")
            .css({
              display: "block"
            });
        }
      });
    });
  }
  $(".overlay__close").on("click", () => {
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
  createOverlay("callback");
});
$(".analysis__link").each((ndx, item) => {
  $(item).on("click", e => {
    e.preventDefault();
    createOverlay("analysis");
    var analysisNdx = ndx;
    var itemHref = $(item).attr("href");
    $(".overlay__label").each((ndx, item) => {
      if (ndx === analysisNdx) {
        $(item).click();
      }
      $(item).on("click", () => {
        analysisNdx = ndx;
        $(".analysis__link").each((ndx, item) => {
          if (ndx === analysisNdx) {
            itemHref = $(item).attr("href");
            $(".overlay__btn").attr("href", itemHref);
          }
        });
      });
    });
    $(".overlay__btn").attr("href", itemHref);
  });
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
  let winScrollTop = $(this).scrollTop();
  let winHeight = $(window).height();
  let target;
  let targetPos;
  let scrollToElem;
  $(".container__heading").each((ndx, item) => {
    target = $(item);
    targetPos = target.offset().top;
    scrollToElem = targetPos - winHeight;
    if (winScrollTop > scrollToElem) {
      $(item)
        .find(".container__heading-front")
        .animate(
          {
            left: "3.625rem"
          },
          750
        );
    }
  });
});
// for heading section
$(".product__bg-text").each((ndx, item) => {
  $(item).css({
    width: `${$(item).width() + 13}px`
  });
  let textValue = parseFloat(
    $(item)
      .html()
      .replace(/\s/g, "")
      .replace(/,/, ".")
  );
  var fraction = 0;
  if (Number.isInteger(textValue) === false) {
    fraction = 1;
  }
  $(item).animate(
    { num: textValue },
    {
      duration: 5000,
      easing: "linear",
      step: function(num) {
        this.innerHTML = ((num + 3).toFixed(fraction) + "")
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")
          .replace(".", ",");
      },
      complete: function() {
        $(item).css({
          width: `auto`
        });
      }
    }
  );
});
// values in about product .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ");
