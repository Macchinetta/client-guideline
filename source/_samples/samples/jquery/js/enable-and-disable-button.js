// enable-and-disable-button.js

'use strict';

$(function () {

  $('#check').on('change', function () {
    var $submit = $('#submit');

    if (this.checked) {

      // チェック状態なら送信ボタンを活性状態にする。
      $submit.prop('disabled', false);
    } else {

      // 非チェック状態なら送信ボタンを非活性状態にする。
      $submit.prop('disabled', true);
    }
  });

});
