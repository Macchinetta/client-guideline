// autocomplete.js

'use strict';

$(function () {

  // 表示される候補の文字列を設定する。
  var computerLanguages = [
    'latex', 'lisp', 'locobasic', 'lolcode', 'lotusformulas',
    'lotusscript', 'lscript', 'lsl2', 'lua'
  ];

  // テキストフィールドに対し、autocompleteメソッドを実行する。
  $('#jquery-ui-autocomplete-input').autocomplete({

    // 入力された文字から始まる候補を抽出し、sourceに設定する。
    source: function (request, response) {

      // 入力文字列から正規表現のオブジェクトを作成する。
      var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(request.term), 'i');

      // 正規表現パターンに一致する候補をcomputerLanguagesから探し、
      // suggestionsオブジェクトに設定する。
      var suggestions = $.grep(computerLanguages, function (item) {
        return matcher.test(item);
      });

      // suggestionsオブジェクトを返却する。
      response(suggestions);
    }
  });
});
