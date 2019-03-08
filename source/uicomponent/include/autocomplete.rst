.. _autocomplete:

オートコンプリート
================================================

.. _autocomplete-outline:

概要
------------------------------------------------

オートコンプリートとは、あらかじめ語句を定義しておくことで、入力時に候補リストを表示し、入力を補助する機能である。

ここでは、jQuery UIを用いて、テキストフィールドへの文字入力時に候補リストを表示する方法を説明する。

.. figure:: /images/autocomplete.png
   :alt: autocomplete
   :align: center

   **図: オートコンプリートの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - `オートコンプリート <../samples/jquery-ui/autocomplete.html>`_
     - `Autocomplete | jQuery UI <https://jqueryui.com/autocomplete/>`_

.. note::
  HTML5から\ ``input``\ などのフォームコントロールで\ `autocomplete <https://www.w3.org/TR/html5/forms.html#autofilling-form-controls:-the-autocomplete-attribute>`__\ 属性が使用できるようになっているが、これはユーザが過去に入力した値をもとに候補を表示する機能である。

.. _autocomplete-howtouse:

利用方法
------------------------------------------------

:ref:`basic-usages-jqueryui`\ で示したHTMLに加え、候補リストを表示するテキストフィールドを追加する。

.. code-block:: html

  <!-- (1) -->
  <label>入力欄:<input id="jquery-ui-autocomplete-input" /></label>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 文字を入力すると候補を表示するテキストフィールドを定義する。

JavaScript(autocomplete.js)では、候補リストを表示するテキストフィールドに対し、\ ``autocomplete``\ メソッドを実行する。

.. code-block:: javascript

  // autocomplete.js

  'use strict';

  $(function () {

    // (1)
    var computerLanguages = [
      'latex', 'lisp', 'locobasic', 'lolcode', 'lotusformulas',
      'lotusscript', 'lscript', 'lsl2', 'lua'
    ];

    // (2)
    $('#jquery-ui-autocomplete-input').autocomplete({

      // (3)
      source: function (request, response) {

        // (4)
        var matcher = new RegExp('^' + $.ui.autocomplete.escapeRegex(request.term), 'i');

        // (5)
        var suggestions = $.grep(computerLanguages, function (item) {
          return matcher.test(item);
        });

        // (6)
        response(suggestions);
      }
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 表示される候補の文字列を設定する。
    * - | (2)
      - | テキストフィールドに対し、\ ``autocomplete``\ メソッドを実行する。
    * - | (3)
      - | 入力された文字から始まる候補を抽出し、sourceに設定する。
    * - | (4)
      - | 入力文字列から正規表現のオブジェクトを作成する。
    * - | (5)
      - | 正規表現パターンに一致する候補をcomputerLanguagesから探し、suggestionsオブジェクトに設定する。
    * - | (6)
      - | suggestionsオブジェクトを返却する。

\ ``autocomplete``\ メソッドには、入力された文字から始まる候補を抽出する処理を実装した関数を、\ ``source``\ プロパティに設定する。

.. _autocomplete-howtoextend:

応用方法
------------------------------------------------

上記では候補の絞り込みを対象データに対してクライアント側で実施したが、候補の絞り込み対象データが大量に存在する等の場合にはサーバ側で絞り込みを実装し、クライアント側は絞り込み済みのデータを表示するよう工夫する必要がある。
サーバ側で絞り込みを実装するために使用する入力文字列は、\ ``request.term``\  として取得しリクエストの際にクエリ文字列として設定する。

例えば、Ajaxを用いて候補情報を取得する場合は以下のように実装する。

.. code-block:: javascript

   $(function () {
     $('#autocompleteInput').autocomplete({
       source: function (request, response) {
         $.ajax({
           url: contextPath + '/api/v1/autocomplete',
           type: 'POST',
           dataType: 'json',
           data: {
           inputText : request.term
           }
         }).then(function (data) {
           response(data);
         });
       }
     });
   });

上記の例ではサーバへ送信する項目に \ ``request.term``\ を設定し、処理正常終了時に \ ``response``\ にサーバから返却された絞り込み済みの戻り値（リスト/配列）を設定している。

.. note::
  Ajaxを用いたサーバとの非同期通信の詳細については |online-framework-name| ( \ https://macchinetta.github.io/server-guideline/current/ja/\ の Macchinetta Server Framework (1.x) Development Guideline ) を参照すること。

.. warning::
  本応用方法を用いた場合では、ユーザが文字を入力すると都度サーバへのリクエストが発生するため、通信量については注意する必要がある。
