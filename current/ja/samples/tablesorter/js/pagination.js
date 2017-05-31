// pagination.js

'use strict';

$(function () {

  // テーブルにtablesorterを適用する。
  var $tablesorter = $('#tablesorter').tablesorter();

  // テーブルにページネーションを適用する。
  $tablesorter.tablesorterPager({

    // ページネーションコントロールに対し設定する。
    container: $('#pager')
  });
});
