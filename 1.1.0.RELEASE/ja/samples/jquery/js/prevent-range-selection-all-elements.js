// prevent-range-selection-all-elements.js

'use strict';

/**
 * ページ内の全要素の範囲選択を防止にする
 */
$(document).ready(function () {

  // CSSによる範囲選択防止
  $('html').css({
    'user-select' : 'none',

    // Firefox
    '-moz-user-select' : 'none',

    // Safari、Chromeほか
    '-webkit-user-select' : 'none',

    // IE
    '-ms-user-select' : 'none'
  });
});
