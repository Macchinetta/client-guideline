/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// disable-copy-paste.js

'use strict';

window.onload = function () {

  // Ctrl + c 操作を変更
  Mousetrap.bind('ctrl+c', function () {

    // 無効化
    return false;
  });

  // Ctrl + v 操作を変更
  Mousetrap.bind('ctrl+v', function () {

    // 無効化
    return false;
  });

  // Ctrl + s 操作を変更
  Mousetrap.bind('ctrl+s', function () {

    // フォーカスが #area3 にある場合のみ処理を変更
    if (document.activeElement.id === 'area3') {
      alert('サーバにデータを保存しました。');
      return false;
    }

    return true;
  });

};
