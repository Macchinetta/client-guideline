// deferred-promise-ajax.js

'use strict';

$(function () {

  // ボタンクリック時に実行する
  $('#deferred-start').on('click', function () {

    // 非同期通信を行う関数
    var doAjax = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期通信を実行する
      $.ajax({
        url : 'js/deferred-promise-sleep.js',
        dataType : 'script'

      // deferredの状態を変更する
      }).then(dfd.resolve);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 非同期通信後に実行する関数A
    var funcA = function () {
      $('#deferred-area').append('<p>function A を実行します。</p>');
    };

    // 非同期通信後に実行する関数B
    var funcB = function () {
      $('#deferred-area').append('<p>function B を実行します。</p>');
    };

    // 非同期通信のコールバックに関数Aを設定する
    doAjax().then(funcA);

    // 非同期通信のコールバックに関数Bを設定する
    doAjax().then(funcB);
  });
});
