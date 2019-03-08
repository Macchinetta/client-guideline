/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// convert-time.js

'use strict';

$(function () {
  $('#time').on({

    // フォーカス時にイベントが発生する
    'focus' : function () {
      var time = $('#time').val();
      if (time === '') {
        return;
      }

      // コロンなしのフォーマットに変換する
      $('#time').val(moment(time, 'HH:mm:ss', true).format('HHmmss'));
    },

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {
      var time = $('#time').val();
      if (time === '' || moment(time, 'HH:mm:ss', true).isValid()) {
        return;
      }

      // コロンありのフォーマットに変換する
      $('#time').val(moment(time, 'HHmmss', true).format('HH:mm:ss'));
    }
  });
});
