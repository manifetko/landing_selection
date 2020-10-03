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
$(".slider").each((ndx, item) => {
  var sliderItems = $(item).find(".slider__item");
  var sliderList = $(item).children(".slider__list");
  var sliderWidth = sliderList.width();
  var sliderBreadcrumbs = $(item).find(".slider__breadcrumbs-item");
  var displacement = 1;
  var sliderRight = $(item).children(".slider__right");
  var sliderLeft = $(item).children(".slider__left");
  sliderList.append(
    sliderList
      .children()
      .first()
      .clone()
  );
  sliderList.prepend(
    sliderList
      .children()
      .last()
      .clone()
  );
  sliderList.css({
    left: `-${sliderWidth * displacement}px`
  });
  $(window).resize(function() {
    sliderWidth = sliderList.width();
  });
  sliderBreadcrumbs.each((ndx, item) => {
    $(item).on("click", () => {
      moveSlide(ndx + 1);
      restartInterval();
    });
  });
  function moveSlide(slidesToMove) {
    displacement = slidesToMove;
    sliderBreadcrumbs.removeClass("active");
    sliderList.animate({ left: -displacement * sliderWidth }, 500, function() {
      if (displacement === sliderItems.length + 1) {
        displacement = 1;
        sliderList.css({
          left: `-${sliderWidth * displacement}px`
        });
      }
      if (displacement === 0) {
        displacement = sliderItems.length;
        sliderList.css({
          left: `-${sliderWidth * displacement}px`
        });
      }
      sliderBreadcrumbs.each((ndx, item) => {
        if (ndx + 1 === displacement) {
          $(item).addClass("active");
        }
      });
    });
  }
  sliderRight.on("click", () => {
    moveSlide(displacement + 1);
  });
  sliderLeft.on("click", () => {
    moveSlide(displacement - 1);
  });
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
