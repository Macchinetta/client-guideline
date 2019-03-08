/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
/* global holidays */
// datepicker-holiday.js

'use strict';

$(function () {

  // 一桁の数値の左側に0を補う関数
  function addZero(n) {
    return ('0' + n).slice(-2);
  }

  $('#jquery-ui-datepicker-holiday').datepicker({

    // テキストフィールドを最初に開いた時にハイライトされる日付を設定する。
    dateFormat: 'yy/mm/dd',
    defaultDate: '2016/01/01',

    // カレンダーを表示する前にすべての日付に対して処理を実施する。
    beforeShowDay: function (date) {

      // カレンダーに表示する日付と定義した祝日・休日を比較する。
      var holiday = holidays[date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())];
      if (holiday) {

        // 日付が一致した場合は、
        // [選択可否（boolean）, 日付に適用するスタイル名（String）, 日付がフォーカスされた際に表示するラベル（String）]
        // を返却する。
        return [holiday.selectable, 'class-holiday', holiday.label];
      } else {

        // 定義した祝日・休日に一致しない場合、
        // 土曜日・日曜日と平日で適用するスタイル等を設定する。
        switch (date.getDay()) {
          case 0 /* 日曜日*/ :
            return [true, 'class-sunday', 'Sunday'];
          case 6 /* 土曜日 */ :
            return [true, 'class-saturday', 'Saturday'];
          default:
            return [true, '', 'Weekday'];
        }
      }
    }
  });
});
