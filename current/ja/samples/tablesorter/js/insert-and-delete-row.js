/* jshint camelcase: false */
/* eslint camelcase: 0 */
// insert-and-delete-row.js

'use strict';

$(function () {

  // テーブルにtablesorterを適用する。
  var $tablesorter = $('#tablesorter').tablesorter({

    // （1）編集機能の設定
    widgets: ['editable'],
    widgetOptions: {

      // 編集可能なカラムを設定
      editable_columns: [0, 1, 2],

      // 編集後にEnterキー押下で編集完了とする。
      editable_enterToAccept: true,

      // 編集後の自動ソートを無効にする。
      editable_autoResort: false
    }
  });

  // 行の追加ボタンのイベント
  $('#add-btn').on('click', function () {
    var age = parseInt(Math.random() * 100);
    var row = '<tr><td><div>姓</div></td><td><div>名</div></td><td><div>' + age +
          '</div></td><td><button class="remove-btn">X</button></td>';
    var $row = $(row);

    // テーブルに行を追加する。
    $tablesorter.find('tbody').append($row);

    // （2）追加した行をtablesorterに認識させる。
    $tablesorter.trigger('addRows', [$row, false, function () {

      // （3）追加した行を修正可能にする。
      $tablesorter.trigger('refreshWidgets', true);
    }]);
  });

  // 行の削除ボタンのイベント
  $('table').on('click', 'button.remove-btn', function () {

    // テーブルから行の削除
    $(this).closest('tr').remove();

    // （4）データの削除をtablesorterに認識させる。
    $tablesorter.trigger('update');
  });
});
