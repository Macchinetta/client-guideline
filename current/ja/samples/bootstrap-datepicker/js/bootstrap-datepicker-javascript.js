// bootstrap-datepicker-javascript.js

'use strict';

$(function () {

  // カレンダー表示の設定
  $('#datepicker').datepicker({
    format: 'yyyy/mm/dd',
    language: 'ja',
    orientation: 'top auto',
    autoclose: true
  });
});
