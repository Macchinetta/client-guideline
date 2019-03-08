/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// deferred-promise-ajax.js

'use strict';

$(function () {

  // ボタンクリック時に実行する
  $('#deferred-start').on('click', function () {

    // 非同期通信を行う関数
    var doAjax = function (path) {

      // Deferredオブジェクトを生成する
      var dfd = new $.Deferred();

      // 非同期通信を実行する
      $.ajax({
        'type' : 'GET',
        'url' : path,
        'dataType' : 'json'
      })
      .then(function (data) {
        $('#deferred-area').append('<p>' + path + 'の取得に成功しました。</p>');
        dfd.resolve([path, data]);
      })
      .catch(function () {
        $('#deferred-area').append('<p>' + path + 'の取得に失敗しました。</p>');
        dfd.reject(path);
      });

      // Promiseオブジェクトを返却する
      return dfd.promise();
    };

    // 非同期通信完了後に読み込んだデータを出力する関数
    var showData = function (data) {
      for (var n = 0, len = data.length; n < len; n++) {
        $('#deferred-area').append(data[n].text + ' : ' + data[n].value + '<br />');
      }
    };

    // 非同期通信が正常に完了した後に実行する関数
    var successCallback = function (array) {
      $('#deferred-area').append('<p>' + array[0] + 'の読み込みが成功しました。</p>');
      showData(array[1]);
    };

    // 非同期通信が失敗した場合に実行する関数
    var errorCallback = function (path) {
      $('#deferred-area').append('<p>' + path + 'の読み込みに失敗しました。</p>');
    };

    // 存在しているファイル（dataA.json）を読み込む
    doAjax('data/dataA.json')
    .then(successCallback)
    .catch(errorCallback);

    // 存在しないファイル（dataB_dummy.json）を読み込む
    doAjax('data/dataB_dummy.json')
    .then(successCallback)
    .catch(errorCallback);
  });
});
