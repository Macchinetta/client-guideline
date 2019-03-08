/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// slickgrid-remotemodel.js

'use strict';

(function () {
  function RemoteModel() {

    // 変数定義
    var PAGESIZE = 50;
    var data = {
      length : 1000
    };

    var hRequest = null;
    var req = null;

    // イベント
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();

    function init() {
    }

    // データ取得関数
    function ensureData(from, to) {

      // 非同期通信が実行中の場合、直前の処理を中断する
      if (req) {
        req.abort();
        for (var i = req.fromPage; i <= req.toPage; i++) {

          // 処理中のデータを削除する
          data[i * PAGESIZE] = null;
        }
      }

      // 開始位置が0以下の場合は0に補正する
      if (from < 0) {
        from = 0;
      }

      // 終了位置が上限以上の場合は上限値に補正する
      if (data.length > 0) {
        to = Math.min(to, data.length - 1);
      }

      // 開始位置・終了位置からポインタを算出する
      var fromPage = Math.floor(from / PAGESIZE);
      var toPage = Math.floor(to / PAGESIZE);

      // ポインタが異なる場合、位置を補正する
      while (!(data[fromPage * PAGESIZE] === null || data[fromPage * PAGESIZE] === undefined) &&
        fromPage < toPage) {
        fromPage++;
      }

      while (!(data[toPage * PAGESIZE] === null || data[toPage * PAGESIZE] === undefined) &&
        fromPage < toPage) {
        toPage--;
      }

      // 取得範囲のデータが取得済みか判定する
      if (fromPage > toPage ||
        (fromPage === toPage && !(data[fromPage * PAGESIZE] === null || data[fromPage *
          PAGESIZE] === undefined))) {

        // テーブルを再描画するイベントを発生させる
        onDataLoaded.notify({
          from : from,
          to : to
        });
        return;
      }

      // 非同期通信のURLを編集する
      var url = 'js/slickgrid-data.json';

      // setTimeoutが実行中の場合、直前の処理を中断する
      if (hRequest !== null) {
        clearTimeout(hRequest);
      }

      // 非同期通信を実行する
      hRequest = setTimeout(function () {

        // データ取得中であることを示すイベントを発生させる
        onDataLoading.notify();

        // 非同期通信処理
        req = $.ajax({
          type : 'GET',
          url : url,
          dataType : 'json'
        }).then(function (data) {

          // データ配列を編集する
          onSuccess(data, fromPage);
        });

        // 中断時にデータを削除するために格納する
        req.fromPage = fromPage;
        req.toPage = toPage;
      }, 100);
    }

    // データ編集を行う関数
    function onSuccess(resp, fromPage) {
      var from = fromPage * PAGESIZE, to = from + resp.results.length;

      // 取得したデータをdataに格納する
      for (var i = 0; i < resp.results.length; i++) {
        var item = resp.results[i].item;

        data[from + i] = item;
        data[from + i].index = from + i;
      }

      req = null;

      // テーブルを再描画するイベントを発生させる
      onDataLoaded.notify({
        from : from,
        to : to
      });
    }

    init();

    return {

      // プロパティ
      'data' : data,

      // 関数
      'ensureData' : ensureData,

      // イベント
      'onDataLoading' : onDataLoading,
      'onDataLoaded' : onDataLoaded
    };
  }

  // Slick.Data.RemoteModel
  $.extend(true, window, {
    Slick : {
      Data : {
        RemoteModel : RemoteModel
      }
    }
  });
}());
