/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// button-controlgroup.js

'use strict';

$(function () {

  // チェックボックスとラジオボタンにオプションを設定する場合は、事前にcheckboxradioメソッドを実行する
  $('.checkClass').checkboxradio({
    icon: false
  });

  // ボタンを生成する対象のグループに対して、controlgroupメソッドを実行する
  $('.buttongroup').controlgroup({
  });
});
