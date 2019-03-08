/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// convert-zenkaku-hankaku.js

'use strict';

$(function () {

  /**
   * 変換用文字列を格納したオブジェクト
   */
  var style = {
    'zenkaku' : 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０　（）｛｝［］＜＞＝＋‐－＊／｜＿？，．￥＠＾；：！＃＄％＆',
    'hankaku' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 (){}[]<>=+--*/|_?,.\\@^;:!#$%&'
  };

  /**
   * 特定文字の全角半角変換用の関数
   *
   * @input 入力値
   * @type 変換後の形式。半角から全角に変換する場合は「zenkaku」、全角から半角に変換する場合は「hankaku」を設定する
   * @return 変換後の文字列
   */
  var convertStyle = function (input, type) {
    var fromStyle;
    var toStyle;
    var output = [];

    switch (type) {
      case 'zenkaku':

        // typeが「zenkaku」の場合、変換前の文字列に半角文字列を格納する
        fromStyle = style['hankaku'];

        // 変換後の文字列に全角文字列を格納する
        toStyle = style['zenkaku'];
        break;
      default:

        // typeが「hankaku」の場合、変換前の文字列に全角文字列を格納する
        fromStyle = style['zenkaku'];

        // 変換後の文字列に半角文字列を格納する
        toStyle = style['hankaku'];
        break;
    }

    var pos;
    for (var i = 0, len = input.length; i < len; i++) {

      // 入力値の位置を取得する
      pos = fromStyle.indexOf(input.charAt(i));
      if (pos < 0) {

        // 該当しない場合、入力値を格納する
        output[i] = input.charAt(i);
      } else {

        // 該当する場合、'toStyle'の文字を格納する
        output[i] = toStyle.charAt(pos);
      }
    }
    return output.join('');
  };

  $('#zenkaku-string').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {

      var st = $('#zenkaku-string').val();

      // 半角文字を全角に変換する
      $('#zenkaku-string').val(convertStyle(st, 'zenkaku'));
    }
  });

  $('#hankaku-string').on({

    // フォーカスアウト時にイベントが発生する
    'blur' : function () {

      var st = $('#hankaku-string').val();

      // 全角文字を半角に変換する
      $('#hankaku-string').val(convertStyle(st, 'hankaku'));
    }
  });
});
