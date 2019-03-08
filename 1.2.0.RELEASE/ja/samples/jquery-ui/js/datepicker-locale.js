/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// datepicker-locale.js

'use strict';

$(function () {

  // 全てのカレンダーに有効なローカライズを設定する。
  $.datepicker.setDefaults($.datepicker.regional['ja']);

  // 特定のカレンダーに対し、ローカライズを設定する。
  $('#jquery-ui-datepicker-localize-en-GB').datepicker($.datepicker.regional['en-GB']);

  // ローカライズ設定を個別に指定しない場合はsetDefaultsの設定が使用される。
  $('#jquery-ui-datepicker-localize-ja').datepicker();
});

