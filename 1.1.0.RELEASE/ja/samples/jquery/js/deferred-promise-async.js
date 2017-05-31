// deferred-promise-async.js
'use strict';

$(function () {

  // ボタンクリック時に実行する
  $('#deferred-start').on('click', function () {

    // 1秒毎にメッセージを出力する
    setTimeout(function () {
      $('#deferred-area').append('<p>1</p>');
      setTimeout(function () {
        $('#deferred-area').append('<p>2</p>');
        setTimeout(function () {
          $('#deferred-area').append('<p>3</p>');
        }, 1000);
      }, 1000);
    }, 1000);

  });

});
