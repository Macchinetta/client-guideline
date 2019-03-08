/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// modal-javascript.js

'use strict';

$(function () {

  var timerId;
  var $myModal = $('#myModal');

  // フォームに、時間のかかる処理を起動すると同時にダイアログを表示するイベントを設定
  $('#dummy-form').on('submit', function (e) {
    e.preventDefault();

    $myModal.modal({backdrop: 'static'});

    // 時間のかかる処理が完了したら、ダイアログを非表示にする。
    // ※ 時間のかかる処理を再現するため、setTimeout関数で3秒の遅延を再現しているが
    //    本来はサーバからのレスポンスを受信して閉じるようにする。
    timerId = setTimeout(function () {

      $myModal.modal('hide');
    }, 3000);
  });

  // キャンセルボタンに、フォーム処理を中断してダイアログを非表示にするイベントを設定
  $('#cancel-btn').on('click', function () {
    $myModal.modal('hide');
    clearTimeout(timerId);
  });

});
