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
  $("body").append(overlayTemplate);
  if ($(".overlay")) {
    $("body").append(overlayTemplate);
    var overlay = $(".overlay");
    var overlayWindow = $(".overlay__window");
    overlay.on("scroll", function(e) {
      e.preventDefault();
    });
    overlay.fadeOut(0, function() {
      overlay.fadeIn(1000);
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
    }
  });
}
$(".btn-callback").on("click", e => {
  e.preventDefault();
  createOverlay("callback");
});
$(".analysis__link").each((ndx, item) => {
  $(item).on("click", e => {
    createOverlay("analysis");
    var analysisNdx = ndx;
    var hrefAnalysis = $(item).attr("href");
    $(".overlay__btn").attr("href", `${hrefAnalysis}`);
    $(".overlay__label").each((ndx, item) => {
      if (ndx === analysisNdx) {
        $(item).css({
          background: "red"
        });
      }
    });
    $(".overlay__checkbox").each((ndx, item) => {
      if (ndx === analysisNdx) {
        $(item).attr("checked","checked")  
      }
    })
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
      step: function(num) {
        this.innerHTML = ((num + 3).toFixed(fraction) + "")
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")
          .replace(".", ",");
      }
    }
  );
});
// values in about product .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ");
