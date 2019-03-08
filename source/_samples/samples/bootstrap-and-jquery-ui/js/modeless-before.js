/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// modeless.js

'use strict';


$(function () {

  // 指定した要素をモードレスダイアログにする
  $('#dialoga').dialog({
    title: 'タイトル',

    // ダイアログが自動的に表示されないようにする
    autoOpen: false
  });

  // ボタンのクリックでモードレスダイアログを起動するイベントを設定する
  $('#modeless-launch').on('click', function () {
    $('#dialoga').dialog('open');
  });
});
