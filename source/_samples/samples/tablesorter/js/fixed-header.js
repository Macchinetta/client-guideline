/* jshint camelcase: false */
/* eslint camelcase: 0 */
// fixed-header.js

'use strict';

$(function () {

  // ヘッダを固定するテーブルに対し、tablesorterメソッドを実行する。
  // その際、widgetsプロパティに['scroller']を設定する。
  $('#tablesorter').tablesorter({
    widgets: ['scroller'],
    widgetOptions: {

      // テーブルの髙さの指定
      scroller_height : 200
    }
  });
});
