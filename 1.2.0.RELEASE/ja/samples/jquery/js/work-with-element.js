/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// work-with-element.js

'use strict';

$(function () {

  // 要素を取得
  var regions = $('#region'); // 地域区分
  var prefectures = $('#prefecture'); // 都道府県

  // 地域区分が選択されたときに実行する関数を設定
  regions.on('change', function () {

    // 選択された地域区分の情報をキーに都道府県リストを取得
    var prefecture = prop.data[regions.val()];

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
  });
});

var prop = {
  'data' : {
    'hokkaido' : [
      {'text': '道央', 'value': 'douou'},
      {'text': '道北', 'value': 'douhoku'},
      {'text': '道東', 'value': 'doutou'},
      {'text': '道南', 'value': 'dounan'}
    ],
    'tohoku' : [
      {'text': '青森', 'value': 'aomori'},
      {'text': '岩手', 'value': 'iwate'},
      {'text': '宮城', 'value': 'miyagi'},
      {'text': '秋田', 'value': 'akita'},
      {'text': '山形', 'value': 'yamagata'},
      {'text': '福島', 'value': 'fukushima'}
    ],
    'kanto' : [
      {'text': '東京', 'value': 'tokyo'},
      {'text': '神奈川', 'value': 'kanagawa'},
      {'text': '埼玉', 'value': 'saitama'},
      {'text': '千葉', 'value': 'chiba'},
      {'text': '茨城', 'value': 'ibaraki'},
      {'text': '栃木', 'value': 'tochigi'},
      {'text': '群馬', 'value': 'gumma'}
    ],
    'chubu' : [
      {'text': '新潟', 'value': 'niigata'},
      {'text': '富山', 'value': 'toyama'},
      {'text': '石川', 'value': 'ishikawa'},
      {'text': '福井', 'value': 'fukui'},
      {'text': '山梨', 'value': 'yamanashi'},
      {'text': '長野', 'value': 'nagano'},
      {'text': '岐阜', 'value': 'gifu'},
      {'text': '静岡', 'value': 'shizuoka'},
      {'text': '愛知', 'value': 'aichi'}
    ],
    'kinki' : [
      {'text': '三重', 'value': 'mie'},
      {'text': '滋賀', 'value': 'shiga'},
      {'text': '京都', 'value': 'kyoto'},
      {'text': '大阪', 'value': 'osaka'},
      {'text': '兵庫', 'value': 'hyogo'},
      {'text': '奈良', 'value': 'nara'},
      {'text': '和歌山', 'value': 'wakayama'}
    ],
    'chugoku' : [
      {'text': '鳥取', 'value': 'tottori'},
      {'text': '島根', 'value': 'shimane'},
      {'text': '岡山', 'value': 'okayama'},
      {'text': '広島', 'value': 'hiroshima'},
      {'text': '山口', 'value': 'yamaguchi'}
    ],
    'shikoku' : [
      {'text': '徳島', 'value': 'tokushima'},
      {'text': '香川', 'value': 'kagawa'},
      {'text': '愛媛', 'value': 'ehime'},
      {'text': '高知', 'value': 'kochi'}
    ],
    'kyushu' : [
      {'text': '福岡', 'value': 'fukuoka'},
      {'text': '佐賀', 'value': 'saga'},
      {'text': '長崎', 'value': 'nagasaki'},
      {'text': '熊本', 'value': 'kumamoto'},
      {'text': '大分', 'value': 'oita'},
      {'text': '宮崎', 'value': 'miyazaki'},
      {'text': '鹿児島', 'value': 'kagoshima'},
      {'text': '沖縄', 'value': 'okinawa'}
    ]
  }
};
