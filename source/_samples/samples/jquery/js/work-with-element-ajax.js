/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// work-with-element-ajax.js

'use strict';

$(function () {

  // 要素を取得
  var regions = $('#region'); // 地域区分
  var prefectures = $('#prefecture'); // 都道府県

  var url = '';

  // 地域区分が選択されたときに実行する関数を設定
  regions.on('change', function () {

    // 挙動選択の値に応じて通信するファイルを設定
    if ($('input[name=behave]:eq(0)').prop('checked')) {
      url = 'data/prefecture-data.json';
      $('#message-area p').remove();
    } else {
      url = 'data/dummy.json';
    }

    // 非同期通信が完了したときに実行する関数を設定
    var callback = function (data) {

      // 選択された地域区分の情報をキーに都道府県リストを取得
      var prefecture = data[regions.val()];

      // 都道府県ドロップダウンリストを一旦空にする
      prefectures.empty();

      // 都道府県ドロップダウンリストに取得した都道府県リストを追加する
      if (prefecture instanceof Array) {
        for (var i = 0, len = prefecture.length; i < len; i++) {
          var option = $('<option>').text(prefecture[i].text)
                        .val(prefecture[i].value);
          prefectures.append(option);
        }
      }
    };

    // 非同期通信を開始する
    $.ajax({
      'type' : 'GET',
      'url' : url,
      'dataType' : 'json'
    })
    .then(callback)
    .catch(function() {
      $('#message-area').append('<p>エラー発生 : 通信に失敗しました。</p>');
      prefectures.empty();
    });
  });
});
