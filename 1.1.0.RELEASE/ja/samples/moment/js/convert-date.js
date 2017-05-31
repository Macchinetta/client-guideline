// convert-date.js

'use strict';

$(function () {
  $('#date').on({

    // フォーカス時にイベントが発生する
    'focus' : function () {
      var date = $('#date').val();
      if (date === '') {
        return;
      }

      // スラッシュなしのフォーマットに変換する
      $('#date').val(moment(date, 'YYYY/MM/DD', true).format('YYYYMMDD'));
    },

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var date = $('#date').val();
      if (date === '' || moment(date, 'YYYY/MM/DD', true).isValid()) {
        return;
      }

      // スラッシュありのフォーマットに変換する
      $('#date').val(moment(date, 'YYYYMMDD', true).format('YYYY/MM/DD'));
    }
  });
});
