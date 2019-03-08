/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// carousel-javascript.js

'use strict';

$(function () {
  $('.carousel').carousel({
    interval: 3000
  });

  $('.prev-slide').click(function () {
    $('#carousel-example-generic').carousel('prev');
  });

  $('.next-slide').click(function () {
    $('#carousel-example-generic').carousel('next');
  });

  $('.slide-one').click(function () {
    $('#carousel-example-generic').carousel(0);
  });

  $('.slide-two').click(function () {
    $('#carousel-example-generic').carousel(1);
  });

  $('.slide-three').click(function () {
    $('#carousel-example-generic').carousel(2);
  });

  $('.slide-four').click(function () {
    $('#carousel-example-generic').carousel(3);
  });
});
