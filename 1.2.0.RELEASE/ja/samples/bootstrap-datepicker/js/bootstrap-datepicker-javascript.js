/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// bootstrap-datepicker-javascript.js

'use strict';

$(function () {

  // カレンダー表示の設定
  $('#datepicker').datepicker({
    format: 'yyyy/mm/dd',
    language: 'ja',
    orientation: 'buttom auto',
    autoclose: true
  });
});
