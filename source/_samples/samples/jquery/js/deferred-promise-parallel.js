// deferred-promise-parallel.js
'use strict';

$(function () {

  // ボタンクリック時に実行する
  $('#deferred-start').on('click', function () {

    // 非同期処理を行う関数
    var asyncFuncA = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {
        $('#deferred-area').append('<p>Function A が終了しました</p>');

        // deferredの状態を設定する
        dfd.resolve();
      }, 1000);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 非同期処理を行う関数
    var asyncFuncB = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {
        $('#deferred-area').append('<p>Function B が終了しました</p>');

        // deferredの状態を設定する
        dfd.resolve();
      }, 1500);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 非同期処理を行う関数
    var asyncFuncC = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {
        $('#deferred-area').append('<p>Function C が終了しました</p>');

        // deferredの状態を設定する
        dfd.resolve();
      }, 2000);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // メッセージを出力する関数
    var outputMessage = function () {
      $('#deferred-area').append('<p>全ての処理が終了しました</p>');
    };

    // 非同期処理の関数を並列処理で実行する
    $.when(asyncFuncA(), asyncFuncB(), asyncFuncC())

    // コールバックを設定する
    .then(outputMessage);
  });
});
