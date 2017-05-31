// slider-numeric.js

'use strict';

$(function () {

  // sliderメソッドを実行する。
  $('#slider-numeric').slider({

    // スライダーの表示範囲を設定
    range: 'min',

    // スライダーの向きを設定
    orientation: 'vertical',

    // スライダーの最小値を設定
    min: 10,

    // スライダーの最大値を設定
    max: 50,

    // スライダーの初期値を設定
    value: 25,

    // ハンドルの1ステップあたりの移動値を設定
    step: 5,

    // ハンドルが移動する度に発生するイベントに関数を設定
    slide: function (event, ui) {
      $('#value').val(ui.value);
    }
  });

  $('#value').val($('#slider-numeric').slider('value'));
});