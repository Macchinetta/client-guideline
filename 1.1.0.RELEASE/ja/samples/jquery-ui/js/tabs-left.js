// tabs-left.js

'use strict';

$(function () {

  // tabsメソッドを実行する
  $('#tabs').tabs({
  });

  // タブの上側のコーナーの角の丸みを取り除き、左側のコーナーの角を丸くする
  $('.tabs-left .ui-tabs-nav > *')
  .removeClass('ui-corner-top')
  .addClass('ui-corner-left');
});