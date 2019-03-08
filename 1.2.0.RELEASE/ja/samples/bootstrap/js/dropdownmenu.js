/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// dropdownmenu.js

'use strict';

$(function () {

  // ドロップダウンリストに対し、それぞれのa要素にclickイベント発生時の処理をバインドする。
  $('.dropdown-menu').on('click', 'a', function () {
    $('.container').append($('<p>').text($(this).text() + 'がクリックされました。'));
  });
});
