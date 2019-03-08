/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// button-basic.js

'use strict';

$(function () {

  // ボタンを生成する対象に対して、buttonメソッドを実行する
  $('.buttonClass').button({
  });

  // チェックボックスとラジオボタンのボタンを生成する対象に対して、checkboxradioメソッドを実行する
  $('.checkClass').checkboxradio({

    // チェックボックスとラジオボタンのチェックマークを非表示にするオプションを設定する
    icon: false
  });
});
