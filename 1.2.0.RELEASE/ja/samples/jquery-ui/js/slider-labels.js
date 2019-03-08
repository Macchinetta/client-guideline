/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// slider-labels.js

'use strict';

$(function () {

  // スライダーの最小値と最大値に合わせて目盛りを追加
  var createLabels = function (event, ui) {

    // スライダーのオプションを取得
    var opt = $(this).slider('option');

    // 範囲内の数値の個数を取得
    var vals = opt.max - opt.min;

    // スライダーに対して最小値側からステップ数毎に目盛りを配置
    for (var i = 0; i <= vals; i = i + opt.step) {

      // label要素を生成し、目盛りの位置を設定
      var el = $('<label>' + (i + opt.min) + '</label>').css('left', (i / vals * 100) + '%');

      // スライダーに要素を追加
      $('#slider-labels').append(el);
    }
  };

  // sliderメソッドを実行
  $('#slider-labels').slider({

    // スライダーの最小値を設定
    min: 0,

    // スライダーの最大値を設定
    max: 10,

    // スライダーが生成された時に発生するイベントに関数を設定
    create: createLabels
  });
});