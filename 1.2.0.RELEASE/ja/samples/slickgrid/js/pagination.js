/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// pagination.js

'use strict';

(function () {

  // SlickGridカラム設定
  var columns = [
    {id: 'title', name: 'Title', field: 'title'},
    {id: 'duration', name: 'Duration', field: 'duration'},
    {id: '%', name: '% Complete', field: 'percentComplete'},
    {id: 'start', name: 'Start', field: 'start'},
    {id: 'finish', name: 'Finish', field: 'finish'},
    {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
  ];

  // SlickGrid動作オプション
  var options = {

    // 何も指定しない。
  };

  // データ作成部
  var data = [];
  for (var i = 0; i < 500; i++) {
    data[i] = {

      // DataViewを使用する際はidの設定が必須なことに注意
      id: 'id_' + i,
      title: 'タスク ' + i,
      duration: '5 days',
      percentComplete: Math.round(Math.random() * 100),
      start: '01/01/2009',
      finish: '01/05/2009',
      effortDriven: (i % 5 === 0) ? 'true' : 'false'
    };
  }

  $(function () {

    // (1) DataViewオブジェクトを生成
    var dataView = new Slick.Data.DataView();
    dataView.beginUpdate();
    dataView.setItems(data);
    dataView.endUpdate();

    // SlickGridテーブルを作成
    // コンストラクタの引数には `data` の代わりに `dataView` を渡す。
    var grid = new Slick.Grid('#myGrid', dataView, columns, options);

    // (2) ページネーション機能のプラグインを追加
    var $pager = $('#pager');
    new Slick.Controls.Pager(dataView, grid, $pager);

    // (3) 表示行数が変更された際のイベントハンドラ
    dataView.onRowCountChanged.subscribe(function () {
      grid.updateRowCount();
      grid.render();
    });

    // (4) 表示行が変更された際のイベントハンドラ
    dataView.onRowsChanged.subscribe(function (e, args) {
      grid.invalidateRows(args.rows);
      grid.render();
    });

    // 25件ごと表示する(ドキュメントには載っていないAPIのため注意)。
    dataView.setPagingOptions({pageSize: 25});

    // ページネーションパネルを表示状態にする。
    $pager.find('.slick-pager-settings-expanded').toggle(true);

  });

}());
