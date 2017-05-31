// drag-and-drop.js

'use strict';

$(function () {

  // ドラッグする要素に対し、draggableメソッドを実行する。
  $('.drag').draggable({

    // マウスカーソルの形状の設定
    cursor: 'move',

    // ドラッグ時の要素の表示設定
    helper: 'clone'
  });

  // ドラッグ先に対し、droppableメソッドを実行する。
  $('.drop').droppable({
    drop: function (e, ui) {
      var $this = $(this);
      $this
        .append(document.createTextNode(ui.draggable.text() + 'がカートに入れられました。'))
        .append('<br>');
    }
  });
});
