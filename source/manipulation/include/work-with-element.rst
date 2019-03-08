.. _work-with-element:

画面要素間の連動
================================================

.. _work-with-element-outline:

概要
------------------------------------------------

画面要素間の連動とは、ある画面要素において、指定されたイベントを検知し、別の画面要素を変更することである。

ここでは、jQueryを用いた画面要素の連動の方法について説明する。

例として、地域区分のドロップダウンリストと都道府県のドロップダウンリストが連動するサンプルを用いる。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - - `ドロップダウンリストの連動 <../samples/jquery/work-with-element.html>`_
       - `非同期通信を使用したドロップダウンリストの連動 <../samples/jquery/work-with-element-ajax.html>`_
     - \-

.. _work-with-element-howtouse:

利用方法
------------------------------------------------

HTMLでは、jQueryと、画面要素間の連動を制御するために実装したJavaScript(work-with-element.js)を読み込む。

連動させる要素である地域区分と都道府県のドロップダウンリストには\ `id`\ を設定する。

.. code-block:: html

    <h3>地域区分：</h3>
    <select id="region">
      <option>-- 地域区分 --</option>
      <option value="hokkaido">北海道</option>
      <option value="tohoku">東北</option>
      <option value="kanto">関東</option>
      <option value="chubu">中部</option>
      <option value="kinki">近畿</option>
      <option value="chugoku">中国</option>
      <option value="shikoku">四国</option>
      <option value="kyushu">九州・沖縄</option>
    </select>
    <br>
    <h3>都道府県：</h3>
    <select id="prefecture">
      <option>-- 都道府県 --</option>
    </select>

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/work-with-element.js"></script>

JavaScript(work-with-element.js)では、\ `on`\ メソッドを使って地域区分ドロップダウンリストに\ `change`\ イベントが発生した際に実行する関数を設定する。

設定した関数の中で、選択された地域区分の情報をキーに都道府県リストを取得し、そのリストを都道府県ドロップダウンリストに追加する。

.. code-block:: javascript

  // work-with-element.js

  'use strict';

  $(function () {

    // (1)
    var regions = $('#region');
    var prefectures = $('#prefecture');

    // (2)
    regions.on('change', function () {

      // (3)
      var prefecture = prop.data[regions.val()];

      // (4)
      prefectures.empty();

      // (5)
      if (prefecture instanceof Array) {
        for (var i = 0, len = prefecture.length; i < len; i++) {
          var option = $('<option>').text(prefecture[i].text)
                        .val(prefecture[i].value);
          prefectures.append(option);
        }
      }
    });
  });

  // (6)
  var prop = {
    'data' : {
      'hokkaido' : [
        {'text': '道央', 'value': 'douou'},
        {'text': '道北', 'value': 'douhoku'},
        {'text': '道東', 'value': 'doutou'},
        {'text': '道南', 'value': 'dounan'}
      ],

      // 省略

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

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 連動させる要素を取得する。
    * - | (2)
      - | 地域区分が選択されたときに実行する関数を定義する。
    * - | (3)
      - | 選択された地域区分の情報をキーに都道府県リストを取得する。\ `prop.data`\ には、地域ごとに分けられた都道府県オブジェクトの配列が定義されている。
    * - | (4)
      - | 都道府県ドロップダウンリストを一旦空にする。
    * - | (5)
      - | 都道府県ドロップダウンリストに取得した都道府県リストを追加する。
    * - | (6)
      - | 地域ごとに分けられた都道府県オブジェクトの配列。

.. _work-with-element-howtoextend-ajax:

応用方法
------------------------------------------------

画面要素間の連動を実現する際は、リストをJavaScriptファイルにハードコーディングするのではなく、サーバもしくは外部ファイルに持たせて取得するケースが考えられる。

ここでは、非同期通信で取得したリストを画面要素に反映する方法を紹介する。以下に例を示す。

HTMLは同様のため割愛する。（ただし、本サンプルでは非同期通信失敗時の挙動も確認できるよう、「非同期通信挙動選択」のラジオボタンを配置している。）

- JavaScript

.. code-block:: javascript

  // work-with-element-ajax.js

  'use strict';

  $(function () {

    var regions = $('#region');
    var prefectures = $('#prefecture');

    regions.on('change', function () {

      // (1)
      var callback =  function (data) {

        var prefecture = data[regions.val()];
        prefectures.empty();
        if (prefecture instanceof Array) {
          for (var i = 0, len = prefecture.length; i < len; i++) {
            var option = $('<option>').text(prefecture[i].text)
                          .val(prefecture[i].value);
            prefectures.append(option);
          }
        }
      };

      // (2)
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

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 選択された地域区分の情報をキーに都道府県リストを設定する関数。引数\ `data`\ には非同期通信で取得した都道府県リストを受け取る。
    * - | (2)
      - | 非同期通信を実行する。非同期通信成功後に\ `then`\ のコールバックを実行する。

上記のサンプルのように、\ `ajax`\ を利用することでJavaScriptファイルにハードコーディングせず、非同期通信でリストを取得し画面要素に反映できる。\ `ajax`\ の詳細な利用方法については :ref:`ajaxGearingServer` を参照すること。

上記では省略しているが、本サンプルでは非同期通信失敗後の挙動も確認できるよう実装しているので参考にしてほしい。
