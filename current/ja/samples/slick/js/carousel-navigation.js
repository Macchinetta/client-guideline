// carousel-navigation.js

'use strict';

$(function () {
  $('.carousel-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.carousel-nav',
    arrows: false,
    fade: true
  });
  $('.carousel-nav').slick({
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.carousel-for',
    centerMode: true,
    focusOnSelect: true
  });
});

