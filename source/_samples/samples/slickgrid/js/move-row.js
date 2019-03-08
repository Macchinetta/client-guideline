/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// move-row.js

'use strict';

(function () {

  // SlickGridのカラム定義
  var columns = [

    // (1) 行ドラッグアンドドロップ機能を有効化するため、すべてのカラムに `behavior: 'selectAndMove'` を設定する。
    {id: 'title', name: 'Title', behavior: 'selectAndMove', field: 'title'},
    {id: 'duration', name: 'Duration', behavior: 'selectAndMove', field: 'duration'},
    {id: '%', name: '% Complete', behavior: 'selectAndMove', field: 'percentComplete'},
    {id: 'start', name: 'Start', behavior: 'selectAndMove', field: 'start'},
    {id: 'finish', name: 'Finish', behavior: 'selectAndMove', field: 'finish'},
    {id: 'effort-driven', name: 'Effort Driven', behavior: 'selectAndMove', field: 'effortDriven'}
  ];

  // SlickGridの動作オプション
  var options = {

    // 何も指定しない。
  };

  // 1000件のサンプルデータ作成
  var data = [];
  for (var i = 0; i < 1000; i++) {
    data[i] = {
      title: 'タスク ' + i,
      duration: '5 days',
      percentComplete: Math.round(Math.random() * 100),
      start: '01/01/2009',
      finish: '01/05/2009',
      effortDriven: (i % 5 === 0) ? 'true' : 'false'
    };
  }

  // 画面初期化処理
  $(function () {

    // SlickGridテーブルを作成
    var grid = new Slick.Grid('#myGrid', data, columns, options);

    // (2) 行選択機能のプラグインを追加
    grid.setSelectionModel(new Slick.RowSelectionModel());

    // (3) 行ドラッグアンドドロップ移動機能のプラグインを追加
    var moveRowsPlugin = new Slick.RowMoveManager();
    grid.registerPlugin(moveRowsPlugin);

    // (4) 行ドラッグアンドドロップイベントハンドラ
    //     移動操作を受けた行を、移動先の位置に挿入して並び替える処理を実装する。
    moveRowsPlugin.onMoveRows.subscribe(function (e, args) {

      var i,

          // 移動操作を受けた行のインデックス番号
          rows = args.rows,

          // 移動先の行のインデックス番号
          insertBefore = args.insertBefore;

      var left = data.slice(0, insertBefore);
      var right = data.slice(insertBefore, data.length);

      // 複数行選択時の選択順を、行のインデックス番号の小さい順でソート
      var extractedRows = [];
      rows.sort(function (a, b) { return a - b; });
      for (i = 0; i < rows.length; i++) {
        extractedRows.push(data[rows[i]]);
      }

      // データ全体のソート
      rows.reverse();
      for (i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row < insertBefore) {
          left.splice(row, 1);
        } else {
          right.splice(row - insertBefore, 1);
        }
      }
      data = left.concat(extractedRows.concat(right));

      // 選択状態を復元
      var selectedRows = [];
      for (i = 0; i < rows.length; i++) {
        selectedRows.push(left.length + i);
      }

      // データと画面を更新する。
      grid.resetActiveCell();
      grid.setData(data);
      grid.setSelectedRows(selectedRows);
      grid.render();
      grid.invalidate();
    });
  });

}());
