// slider-change-fontsize.js

'use strict';

$(function () {
  var select = $('#font');

  // フォントサイズを変更
  var changeFontSize = function (value) {
    $('#font-size-div').css('font-size', value + 'px');
  };

  var slider = $('#slider-change-fontsize').slider({

    // スライダーの表示範囲を設定
    range: 'min',

    // スライダーの最小値を設定
    min: 8,

    // スライダーの最大値を設定
    max: 24,

    // ハンドルの1ステップあたりの移動値を設定
    step: 2,

    // スライダーの初期値を設定
    value: select[0].selectedIndex * 2 + 8,

    // ハンドルを移動する度に発生するイベントに関数を設定
    slide: function (event, ui) {

      // ドロップダウンリストを選択
      select[0].selectedIndex = (ui.value - 8) / 2;
      changeFontSize(ui.value);
    },

    // valueの値を変更した時に発生するイベントに関数を設定
    change: function (event, ui) {
      changeFontSize(ui.value);
    },

    // スライダーが生成された時に発生するイベントに関数を設定
    create: function (event, ui) {
      var value = $(this).slider('value');
      changeFontSize(value);
    }
  });

  // ドロップダウンリストの値を変更した場合、スライダーの位置を変更する
  $('#font').on('change', function () {
    slider.slider('value', this.selectedIndex * 2 + 8);
  });
});
