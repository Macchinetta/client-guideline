// modeless.js

'use strict';

$(function () {

  // 指定した要素をモードレスダイアログにする
  $('#dialog').dialog({
    title: 'タイトル',

    // ダイアログが自動的に表示されないようにする
    autoOpen: false
  });

  // ボタンのクリックでモードレスダイアログを起動するイベントを設定する
  $('#modeless-launch').on('click', function () {
    $('#dialog').dialog('open');
  });
});
