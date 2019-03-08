/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// deferred-promise-branch-then.js
'use strict';

$(function () {

  // ボタンクリック時に実行する
  $('#deferred-start').on('click', function () {

    // trueかfalseをランダムに返却する関数
    var random = function () {
      return Math.floor(Math.random() * 2) === 1 ? true : false;
    };

    // 非同期処理を行う関数
    var async = function () {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期処理を実行する
      setTimeout(function () {

        // ランダム関数の結果により、deferredの状態を設定する
        var result = random();
        $('#deferred-area').append('<p>ランダム処理の結果は' + result + 'です。</p>');
        if (result) {
          dfd.resolve('resolve');
        } else {
          dfd.reject('reject');
        }
      }, 1000);

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 成功メッセージを出力する関数
    var success = function (arg) {
      $('#deferred-area').append('<p>' + arg + 'が実行されました。成功です。</p>');
    };

    // 失敗メッセージを出力する関数
    var failure = function (arg) {
      $('#deferred-area').append('<p>' + arg + 'が実行されました。失敗です。</p>');
    };

    // 非同期処理の関数を実行する
    // 成功時・失敗時のコールバックを設定
    async()
    .then(success)
    .catch(failure);
  });
});
