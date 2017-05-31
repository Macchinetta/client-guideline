// tabs-bottom.js

'use strict';

$(function () {

  // tabsメソッドを実行する
  $('#tabs').tabs({
  });

  // タブの上側のコーナーの角の丸みを取り除き、タブの下側のコーナーの角を丸くする
  $('.tabs-bottom .ui-tabs-nav > *')
  .removeClass('ui-corner-top')
  .addClass('ui-corner-bottom');

  // タブ領域を下部に移動する
  $('.tabs-bottom .ui-tabs-nav').appendTo('#tabs');
});