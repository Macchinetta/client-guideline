/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// check-date.js

'use strict';

$(function () {
  $('#date').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var date = $('#date').val();

      // 入力値の妥当性をチェックする
      var result = moment(date, 'YYYY/MM/DD', true).isValid();

      $('#date-area > span').remove();
      if (result) {
        $('#date-area').append('<span>入力値は正常です。</span>');
      } else {
        $('#date-area').append('<span>入力値に誤りがあります。</span>');
      }
    }
  });
});
