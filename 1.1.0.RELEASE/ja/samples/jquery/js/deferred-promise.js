// deferred-promise.js
'use strict';

$(function () {

  // ボタンクリック時に実行する
  $('#deferred-start').on('click', function () {

    // 1秒後にメッセージ「1」を出力する関数
    var outputMessage1 = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {
        $('#deferred-area').append('<p>1</p>');

        // deferredの状態を設定する
        dfd.resolve();
      }, 1000);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 1秒後にメッセージ「2」を出力する関数
    var outputMessage2 = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {
        $('#deferred-area').append('<p>2</p>');

        // deferredの状態を設定する
        dfd.resolve();
      }, 1000);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 1秒後にメッセージ「3」を出力する関数
    var outputMessage3 = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {
        $('#deferred-area').append('<p>3</p>');

        // deferredの状態を設定する
        dfd.resolve();
      }, 1000);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // メッセージを出力する関数を実行する
    outputMessage1()

    // Promiseオブジェクトのthenにコールバックを設定する
    .then(outputMessage2)
    .then(outputMessage3);

  });
});
