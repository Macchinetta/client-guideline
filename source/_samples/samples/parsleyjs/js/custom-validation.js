/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// custom-validation.js

'use strict';

$(function () {

  // バリデーションを有効化(validation.jsと同様)
  $('#form').parsley({
    inputs: 'input, textarea, select',
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',
    errorClass: 'has-error',
    successClass: '',
    classHandler: function (ParsleyField) {
      return ParsleyField.$element.parent();
    },
    errorsContainer: function (ParsleyField) {
    },
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',
    errorTemplate: '<li></li>'
  });

  // addValidatorメソッドを使用する。第1引数に検証ルール名、第2引数に検証ルールのオブジェクトを設定する。
  Parsley.addValidator('multipleof', {

    // 要求パラメータの型を指定する。
    requirementType: 'number',

    // 検証を実行する関数を指定する。
    validateNumber: function (value, requirement) {
      return 0 === value % requirement;
    },

    // 検証エラー時に表示されるメッセージを設定する。
    messages: {
      en: 'This value should be a multiple of %s',
      ja: '%s の倍数である必要があります。'
    }
  });

});
