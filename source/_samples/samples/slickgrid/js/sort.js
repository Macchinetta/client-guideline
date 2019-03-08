/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// sort.js

'use strict';

(function () {
  var i, len;

  // SlickGridのカラム定義
  var columns = [

    // (1) ソート機能を有効化するカラム定義に `sortable: true` を設定する。
    {id: 'id', name: 'ID', field: 'id', sortable: true},
    {id: 'value1', name: 'value 1', field: 'value1', sortable: true},
    {id: 'value2', name: 'value 2', field: 'value2', sortable: true},
    {id: 'value3', name: 'value 3', field: 'value3', sortable: true}
  ];

  // SlickGridの動作オプション
  var options = {

    // 何も指定しない。
  };

  // 1000件のサンプルデータ作成
  var data = [];
  for (i = 0; i < 1000; i++) {
    data[i] = {
      id: 'タスク' + i,
      value1: Math.round(Math.random() * 100),
      value2: Math.round(Math.random() * 1000),
      value3: Math.round(Math.random() * 10000)
    };
  }

  // ソート関数を定義
  // 文字列の場合は文字列比較を、数値の場合は数値比較をした結果でソートする。
  function sortfn(o1, o2) {
    if (o1[column.field] > o2[column.field]) {
      return 1;
    } else if (o1[column.field] < o2[column.field]) {
      return -1;
    }
    return 0;
  }

  // (2) `data` を基にソート用インデックス `indicies` を作成
  //     データ表示時はこのインデックスを経由してデータを引き当てるようにしている。
  var indices = {};
  var column;
  for (i = 0, len = columns.length; i < len; i++) {
    column = columns[i];
    indices[column.id] = [];
    data.sort(sortfn);
    for (var j = 0; j < data.length; j++) {
      indices[column.id][j] = data[j];
    }
  }

  // 画面初期化処理
  $(function () {

    // ソート設定を保持する変数
    var isAsc = true;                  // 初期設定は昇順
    var currentSortCol = { id: 'id'};  // 初期設定は id カラムでソート

    // (3) データ引き当て関数。`Slick.Grid` コンストラクタの引数で使用
    //     ソート用インデックス `indices` を経由して表示データを引き当てる。
    function getItem(index) {
      var newIndex = isAsc ? index : data.length - index - 1;
      return indices[currentSortCol.id][newIndex];
    }

    // データ長取得関数。`Slick.Grid` コンストラクタの引数で使用
    // テーブルに表示するデータの長さは変更しないため、 ``data`` の長さを返す。
    function getLength() {
      return data.length;
    }

    // (4) SlickGridテーブルを作成
    //     第2引数に配列を指定する代わりに、 `getLength` および `getItem` 関数を持つオブジェクトを指定して
    //     ソート設定に基づきデータの表示を行う。
    var grid = new Slick.Grid('#myGrid', {getLength: getLength, getItem: getItem}, columns, options);

    // (5) ソートイベントハンドラ
    grid.onSort.subscribe(function (e, args) {

      // ソート設定を書き換える。
      isAsc = args.sortAsc;
      currentSortCol = args.sortCol;

      // テーブル全体を再描画
      grid.invalidateAllRows();
      grid.render();
    });
  });

}());
