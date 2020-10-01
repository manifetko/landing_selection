$(function() {
  $('a[href^="#"]').on("click", function(event) {
    event.preventDefault();
    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    $("html, body").animate({ scrollTop: dn }, 500);
  });
});
const nav = $(".nav");
$(".header__humburger").on("click", () => {
  if (nav.hasClass("menu")) {
    nav.removeClass("menu");
    nav.fadeOut(300);
    $("body").css({
      overflow: "unset"
    });
  } else {
    nav.addClass("menu");
    nav.fadeIn(300);
    $("body").css({
      overflow: "hidden"
    });
  }
});
//
var sliderItems = $(".slider__item");
var sliderList = $(".slider__list");
var sliderWidth = sliderList.width();
$(window).resize(function() {
  sliderWidth = sliderList.width();
});
var sliderBreadcrumbs = $(".slider__breadcrumbs-item");
var currentDisplacement = 0;
var idIntervals = 0;
var sliderRight = $(".slider__right");
var sliderLeft = $(".slider__left");
sliderList.append(
  sliderList
    .children()
    .first()
    .clone()
);
sliderBreadcrumbs.each((ndx, item) => {
  $(item).on("click", () => {
    moveSlide(ndx);
    clearInterval(idIntervals);
    idIntervals = setInterval(function() {
      moveSlide(currentDisplacement + 1);
    }, 5000);
  });
});
function moveSlide(slidesToMove) {
  currentDisplacement = slidesToMove;
  sliderBreadcrumbs.removeClass("active");
  sliderList.animate(
    { left: -currentDisplacement * sliderWidth },
    500,
    function() {
      if (currentDisplacement === sliderItems.length) {
        currentDisplacement = 0;
        sliderList.css({
          left: "0px"
        });
      }
      sliderBreadcrumbs.each((ndx, item) => {
        if (ndx === currentDisplacement) {
          $(item).addClass("active");
        }
      });
    }
  );
}
idIntervals = setInterval(function() {
  moveSlide(currentDisplacement + 1);
}, 5000);
sliderRight.on("click", () => {
  clearInterval(idIntervals);
  idIntervals = setInterval(function() {
    moveSlide(currentDisplacement + 1);
  }, 5000);
  moveSlide(currentDisplacement + 1);
});
sliderLeft.on("click", () => {
  clearInterval(idIntervals);
  idIntervals = setInterval(function() {
    moveSlide(currentDisplacement + 1);
  }, 5000);
  moveSlide(currentDisplacement - 1);
});
// slider
const playerVideo = $(".player__video").get(0);
const player = $(".player");
const playerStart = $(".player__start");
player.on("click", () => {
  if (playerVideo.paused) {
    playerVideo.play();
    playerStart.addClass("disable");
  } else {
    playerStart.removeClass("disable");
    playerVideo.pause();
  }
});
