/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// insert-and-delete-row.js

'use strict';

(function () {

  // SlickGridのカラム定義
  var columns = [

    // (1) データのテキスト編集を可能にするため `editor` プロパティに `Slick.Editors.Text` を指定する。
    {id: 'title', name: 'Title', field: 'title', editor: Slick.Editors.Text },
    {id: 'duration', name: 'Duration', field: 'duration', editor: Slick.Editors.Text },
    {id: '%', name: '% Complete', field: 'percentComplete', editor: Slick.Editors.Text },
    {id: 'start', name: 'Start', field: 'start', editor: Slick.Editors.Text },
    {id: 'finish', name: 'Finish', field: 'finish', editor: Slick.Editors.Text },
    {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', editor: Slick.Editors.Text },

    // (2) 削除ボタンを表示するためのカラムを定義
    {id: 'delete', name: '削除', field: '', cssClass: 'delete', width: 10,
     formatter: function () { return '<button class="delete-button">x</button>'; } }
  ];

  // SlickGrid動作オプション
  var options = {

    // (3) 編集可能にする。
    editable: true,

    // (4) セル選択時に自動的に編集モードにしない。
    autoEdit: false,

    // (5) 行追加を可能にする。
    enableAddRow: true
  };

  // 5件のサンプルデータ作成
  var data = [];
  for (var i = 0; i < 5; i++) {
    data[i] = {
      title: 'タスク ' + i,
      duration: '5 days',
      percentComplete: Math.round(Math.random() * 100),
      start: '01/01/2009',
      finish: '01/05/2009',
      effortDriven: 1
    };
  }

  function formatDate(date) {
    return ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
      ('0' + date.getDate()).slice(-2) + '/' +
      date.getFullYear();
  }

  // 新規追加されるアイテムのデフォルト値
  var defaultData = {
    title: '未設定',
    duration: '未設定',
    percentComplete: 0,
    start: formatDate(new Date()),
    finish: formatDate(new Date(+new Date() + 1000 * 60 * 60 * 24)),
    effortDriven: 'false'
  };

  // 画面初期化処理
  $(function () {

    // SlickGridテーブルを作成
    var grid = new Slick.Grid('#myGrid', data, columns, options);

    // (6) クリックイベントハンドラ
    grid.onClick.subscribe(function (e, args) {
      if ($(e.target).hasClass('delete-button')) {
        data.splice(args.row, 1);
        grid.invalidate();
      }
    });

    // (7) 行追加イベントハンドラ
    grid.onAddNewRow.subscribe(function (e, args) {

      // 追加されたアイテムにデフォルト値を設定してデータに追加し、更新する。
      var item = $.extend({}, defaultData, args.item);
      data.push(item);
      grid.updateRowCount();
      grid.invalidateRow(data.length - 1);
      grid.render();
    });
  });

}());
