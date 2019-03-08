/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// drag-and-drop-sortable.js

'use strict';

$(function () {

  // ドラッグアンドドロップするリストの親要素に対し、sortableメソッドを実行する。
  $('.jquery-ui-sortable').sortable({

    // ドラッグアンドドロップをし合うリストグループのセレクタをconnectWithプロパティに設定する。
    connectWith: '.jquery-ui-sortable'
  });
});
