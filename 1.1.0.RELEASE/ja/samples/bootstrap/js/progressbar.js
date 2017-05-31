// progressbar.js

'use strict';

$(function () {

  // プログレスバーのwidthを1秒ごとに10%増やす。
  var estimatedRatio = 0;
  var $progressBar = $('#progressbar');
  var progress = setInterval(function () {
    $progressBar.css('width', estimatedRatio + '%');
    if (estimatedRatio >= 100) {
      clearInterval(progress);
    }
    estimatedRatio += 10;
  }, 1000);
});
