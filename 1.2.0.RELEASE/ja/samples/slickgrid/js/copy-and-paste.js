/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// copy-and-paste.js

'use strict';

(function () {

  // SlickGridのカラム定義
  var columns = [
    {id: 'num', name: '', field: 'id', width: 30},
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

  // 1000件のサンプルデータ作成
  var data = [];
  for (var i = 0; i < 1000; i++) {
    data[i] = {
      id: i,
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

    // (1) セル選択機能のプラグインを追加
    var cellSelectionModel = new Slick.CellSelectionModel();
    grid.setSelectionModel(cellSelectionModel);

    // (2) コピーアンドペースト機能のプラグインを追加
    var copyManager = new Slick.CellCopyManager();
    grid.registerPlugin(copyManager);

    // (3) ペーストイベントハンドラ
    copyManager.onPasteCells.subscribe(function (e, args) {
      var from = args.from[0];
      var to = args.to[0];
      var i, I, j, J;

      // コピー元のデータを保存するための配列
      var src = [];

      // コピー元のデータを保存
      for (i = 0, I = from.toRow - from.fromRow; i <= I; i++) {
        src[i] = [];
        for (j = 0, J = from.toCell - from.fromCell; j <= J; j++) {
          src[i][j] = data[from.fromRow + i][columns[from.fromCell + j].field];
        }
      }

      // ペースト先にコピーしたデータを上書き
      for (i = 0, I = src.length; i < I && (i + to.toRow) < data.length; i++) {
        for (j = 0, J = src[i].length; j < J && (j + to.toCell) < columns.length; j++) {
          data[to.fromRow + i][columns[to.fromCell + j].field] = src[i][j];
          grid.invalidateRow(to.fromRow + i);
        }
      }

      // ペースト先を選択状態にする。
      cellSelectionModel.setSelectedRanges([{
        fromRow: to.fromRow,
        fromCell: to.fromCell,
        toRow: to.fromRow + i - 1,
        toCell: to.fromCell + j - 1
      }]);

      grid.render();
    });
  });

}());
