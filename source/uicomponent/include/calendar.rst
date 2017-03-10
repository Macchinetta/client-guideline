.. _calendar:

日付入力時のカレンダー表示
================================================

.. _calendarOutline:

概要
------------------------------------------------

| 日付入力のテキストフィールドへのフォーカス時にカレンダーを表示することで、日付入力を容易にすることができる。
| ここでは、jQuery UI、bootstrap-datepickerそれぞれを用いて、カレンダーを表示する方法を説明する。

.. figure:: /images/calendar.png
   :alt: calendar
   :align: center

   **図: カレンダー表示の例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - - `基本的なカレンダー <../samples/jquery-ui/datepicker-basic.html>`_
       - `休日設定（背景色・休日選択不可・休日定義） <../samples/jquery-ui/datepicker-holiday.html>`_
       - `選択可能な日付の範囲制御 <../samples/jquery-ui/datepicker-range.html>`_
       - `カレンダーのロケール設定 <../samples/jquery-ui/datepicker-locale.html>`_
     - `Datepicker | jQuery UI <http://jqueryui.com/datepicker/>`_
   * - Bootstrap-datepicker
     - * `マークアップ形式のカレンダー表示 <../samples/bootstrap-datepicker/bootstrap-datepicker-markup.html>`_
       * `JavaScript形式のカレンダー表示 <../samples/bootstrap-datepicker/bootstrap-datepicker-javascript.html>`_
     - `bootstrap-datepicker documentation <http://bootstrap-datepicker.readthedocs.io/>`_

.. _calendarHowToUse:

利用方法(jQuery UI)
------------------------------------------------

| ここでは、jQuery UIを用いて、日付入力のテキストフィールドへのフォーカス時にカレンダーを表示する方法を説明する。
| 本ガイドラインおよびサンプルで紹介するプロパティ以外にもプロパティが提供されている。これらの詳細について知りたい場合は、\ `jQuery UI 公式ウェブサイトのリファレンス\ <http://api.jqueryui.com/datepicker/>`_\ を参照すること。

.. _calendarBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、日付入力をするテキストフィールドを追加する。

.. code-block:: html

   <!-- (1) -->
   <label>日付: <input type="text" id="jquery-ui-datepicker"></label>


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | フォーカスを契機にカレンダーが表示されるテキストフィールドを設置する。


| JavaScript(datepicker-basic.js)では、カレンダーをポップアップするテキストフィールドに対し、\ ``datepicker``\ メソッドを実行する。

.. code-block:: javascript

   // datepicker-basic.js

   'use strict';

   $(function () {

     // (1)
     $('#jquery-ui-datepicker').datepicker();
   });


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | テキストフィールドに対し、\ ``datepicker``\ メソッドを実行する。


.. _calendarHolidaySetting:

休日設定（背景色・休日選択不可・休日定義）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、日付入力をするテキストフィールドを追加する。

.. code-block:: html

   <!-- (1) -->
   <label>日付: <input type="text" id="jquery-ui-datepicker-holiday"></label>


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | フォーカスを契機にカレンダーが表示されるテキストフィールドを設置する。


| JavaScript(datapicker-holiday-definition.js)では、休日設定する日付をオブジェクトで定義する。

.. code-block:: javascript

   // datapicker-holiday-definition.js

   'use strict';

   // (1)
   var holidays = {
     '2016-01-01': {selectable: true, label: '元日'},
     '2016-11-03': {selectable: true, label: '文化の日'},
     '2016-11-23': {selectable: false, label: '勤労感謝の日'},
     '2016-04-01': {selectable: false, label: '任意の休日'}
   };


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 祝日・休日をオブジェクトで定義する。
        | オブジェクトはカレンダーにおける対象年月日（date）をキーに選択可否（selectable）・ラベル（label）を定義する。


.. note::

   このサンプルでは休日定義をJavaScriptにハードコーディングしている。

   休日定義が設定ファイルやデータベースに格納されている場合、外部から取得するよう実装方法を変更すること。

| JavaScript(datepicker-holiday.js)では、カレンダーをポップアップするテキストフィールドに対し、\ ``datepicker``\ メソッドを実行する。
| 上記で定義した日付に対し、個別のラベル名やスタイル、選択可否を設定する場合には、\ ``datepicker``\ メソッドの\ ``beforeShowDay``\ プロパティに関数を指定する。

.. code-block:: javascript

   // datepicker-holiday.js

   'use strict';

   $(function () {

     function addZero(n) {
       return ('0' + n).slice(-2);
     }

     $('#jquery-ui-datepicker-holiday').datepicker({

       dateFormat: 'yy/mm/dd',

       // (1)
       defaultDate: '2016/01/01',

       // (2)
       beforeShowDay: function (date) {

         // (3)
         var holiday = holidays[date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate())];
         if (holiday) {

           // (4)
           return [holiday.selectable, 'class-holiday', holiday.label];

         } else {

           // (5)
           switch (date.getDay()) {

             // (6)
             case 0 :
               return [true, 'class-sunday', 'Sunday'];

             // (7)
             case 6 :
               return [true, 'class-saturday', 'Saturday'];
             default:
               return [true, '', 'Weekday'];
           }
         }
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
      - | テキストフィールドを最初に開いた時にハイライトされる日付を設定する。
    * - | (2)
      - | カレンダーを表示する前にすべての日付に対して処理を実施する。
    * - | (3)
      - | カレンダーに表示する日付と定義した祝日・休日を比較する。
    * - | (4)
      - | 日付が一致した場合は、[選択可否（boolean）, 日付に適用するスタイル名（String）, 日付がフォーカスされた際に表示するラベル（String）]を返却する。
    * - | (5)
      - | 定義した祝日・休日に一致しない場合、土曜日・日曜日と平日で適用するスタイル等を設定する。
        | 曜日判定は\ ``beforeShowDay``\ オプションに実装する関数に渡されたdateオブジェクトに対して、\ ``date.getDay()``\ の取得結果（0：日曜～6：土曜）で判定する。
    * - | (6)
      - | 日曜日(\ ``date.getDay()``\ の値が\ ``0``\ )の場合の定義
    * - | (7)
      - | 土曜日(\ ``date.getDay()``\ の値が\ ``6``\ )の場合の定義


| \ ``beforeShowDay``\ オプションはカレンダーが表示される直前に、表示する全ての日付に対して繰り返し処理を実行する。
| \ ``function(date)``\ の引数にはDate型の日付情報が渡され、休日・祝日設定を実施するために渡された日付情報に対して判定処理を実装する。
| \ ``beforeShowDay``\ オプションの戻り値には配列を設定し、設定項目は配列の先頭から順番にそれぞれ以下の通り。

- 選択可否（Boolean）
- CSSクラス名（String）
- ラベル名（String）

| 選択可否はtrueを設定すればカレンダー上で選択可能となり、falseを設定すればカレンダー上で選択不可となる。
| CSSクラス名は対象日付に独自の装飾（背景色や文字色）を設定したい場合に、個別定義したCSSクラス名を設定する。指定しない場合は空文字を設定する。
| ラベル名はカレンダー上で日付がマウスオーバーされた際に表示する情報を設定する。祝日名や休日名を設定する場合に活用する。指定しない場合は空文字を設定する。

.. note::

   CSSクラスを定義する際は

     .. code-block:: css

       .class-sunday .ui-state-default {
         color:red;
       }

   のようにjQueryのCSSクラスである \ ``.ui-state-default``\ を上書きする必要がある。

.. warning::

   \ ``beforeShowDay``\ オプションは配列の戻り値を設定する必要があり、分岐条件等の実装により戻り値が返却されない場合は、JavaScript実行時エラーが発生するため注意すること。


.. _calendarRangeSetting:

選択可能な日付の範囲制御
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、日付入力をするテキストフィールドを追加する。

.. code-block:: html

   <!-- (1) -->
   <label>日付: <input type="text" id="jquery-ui-datepicker-range"></label>


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | フォーカスを契機にカレンダーが表示されるテキストフィールドを設置する。


| JavaScript(datepicker-range.js)では、カレンダーをポップアップするテキストフィールドに対し、\ ``datepicker``\ メソッドを実行する。
| カレンダーの選択範囲を指定範囲に設定する場合には\ ``datepicker``\ メソッドの\ ``minDate``\ オプションと\ ``maxDate``\ オプションを使用する。

.. code-block:: javascript

   // datepicker-range.js

   'use strict';

   // (1)
   $(function () {
     $('#jquery-ui-datepicker-range').datepicker({
       dateFormat: 'yy/mm/dd',
       minDate: '2016/01/11',
       maxDate: '2016/03/21'
     });
   });


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ ``minDate``\と\ ``maxDate``\ を使用し範囲指定を実装する。


.. _calendarLocalize:

カレンダーのロケール設定
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、日付入力をするテキストフィールドとローカライズファイルを読み込む記述を追加する。jQuery UI本体の読み込み後にローカライズファイルを読み込む必要があるため、順序性に注意すること。

.. code-block:: html

   <!-- (1) -->
   <label>Date(en-GB): <input type="text" id="jquery-ui-datepicker-localize-en-GB"></label><br><br>
   <label>日付(ja): <input type="text" id="jquery-ui-datepicker-localize-ja"></label>

   <!-- (2) -->
   <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>
   <script src="../lib/vendor/jquery-ui/1.11.1/jquery-ui.min.js"></script>
   <!-- (3) -->
   <script src="../lib/vendor/jquery-ui/1.11.1/i18n/datepicker-en-GB.js"></script>
   <script src="../lib/vendor/jquery-ui/1.11.1/i18n/datepicker-ja.js"></script>


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | フォーカスを契機にカレンダーが表示されるテキストフィールドを設置する。
    * - | (2)
      - | jQueryとjQuery UIのJavaScript、カレンダーの日本語対応のJavaScript、独自に実装したJavaScriptを読み込む。
    * - | (3)
      - | jQuery UI本体読み込み後にローカライズファイルを読み込む。


| JavaScript(datepicker-locale.js)では、全カレンダーで使用する言語を\ ``$.datepicker.setDefaults``\ で指定する。また、特定のカレンダーのみ言語を変更する場合、セレクタで対象を選択し、\ ``$datepicker``\ メソッドの引数に使用する言語を設定する。

.. code-block:: javascript

   // datepicker-locale.js

   'use strict';

   $(function () {
     // (1)
     $.datepicker.setDefaults($.datepicker.regional['ja']);

     // (2)
     $('#jquery-ui-datepicker-localize-en-GB').datepicker($.datepicker.regional['en-GB']);

     // (3)
     $('#jquery-ui-datepicker-localize-ja').datepicker();
   });


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 全てのカレンダーに有効なローカライズを設定する。
    * - | (2)
      - | 特定のカレンダーをセレクトし、ローカライズを設定する。
    * - | (3)
      - | ローカライズ設定を個別に指定しない場合は\ ``setDefaults``\ の設定が使用される。


.. note::

    ローカライズファイルを複数読み込み、かつ使用言語の設定を省略した場合、最後に読み込まれたローカライズファイルが使用される。サンプルの例の場合、\ ``datepicker-ja.js``\ が有効になる。

.. note::

    ローカライズファイルはGitHubリポジトリ(https://github.com/jquery/jquery-ui/tree/master/ui/i18n)で配布されている。利用する際はjQuery UIのバージョンに合わせて適切なリリースタグから資材を取得すること。

     .. figure:: /images/calender-localization-github-branch.png
        :alt: GitHubリポジトリのブランチ/タグ切り替え例
        :align: center

        **図: GitHubリポジトリのブランチ/タグ切り替え例**

.. _bootstrapDatepickerHowToUse:

利用方法(bootstrap-datepicker)
------------------------------------------------

| Bootstrapには日付入力時のカレンダー表示機能が存在しない。
| jQuery UIには日付入力時のカレンダー表示機能があるが、Bootstrapと併用する際にはスタイルの統一が課題になる。
|
| bootstrap-datepickerはBootstrap風のスタイルを持つ日付入力部品である。これを利用することで、jQuery UIのスタイルをカスタマイズすることなく、日付入力部品が使用できる。
| また、jQuery UIは様々な機能を包含しているためにファイルサイズが大きい(圧縮時に約250kb)が、bootstrap-datepickerはファイルサイズが小さい(圧縮時に約25kb)というメリットもある。
|
| ここでは、bootstrap-datepickerを用いて、Bootstrap風のスタイルのカレンダーを表示する方法を説明する。
|
| 実装方法はマークアップによる方法とJavaScriptによる方法の二通りを説明する。
| なお、カレンダー表示の前後に処理を実装する場合は、JavaScript形式での実装が適している。

.. _bootstrapDatepickerMarkup:

基本的な使い方(マークアップ形式)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

HTMLでは、Bootstrapのスタイルシート、jQuery、Bootstrap及びbootstrap-datepickerのJavaScript、カレンダーの日本語対応のJavaScriptを読み込む。日付入力をするテキストフィールドには\ ``input``\ 要素を使用し、\ ``data-provide``\ 属性に\ ``datepicker``\ を指定する。

.. code-block:: html

  <head>
    <meta charset="utf-8">
    <title>マークアップ形式のカレンダー</title>

    <!-- (1) -->
    <link rel="stylesheet" href="../lib/vendor/bootstrap/3.2.0/css/bootstrap.css">
    <link rel="stylesheet" href="../lib/vendor/bootstrap/3.2.0/css/bootstrap-theme.css">
    <link rel="stylesheet" href="../lib/vendor/bootstrap-datepicker/datepicker3.css">
  </head>
  <body>

    <h1>マークアップ形式のカレンダー</h1>

    <!-- (2) -->
    <label>日付: <input value="2014/09/09" data-provide="datepicker"
                        data-date-format="yyyy/mm/dd" data-date-language="ja" data-date-orientation="top auto" data-date-autoclose="true"></label>

    <!-- (3) -->
    <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>
    <script src="../lib/vendor/bootstrap/3.2.0/js/bootstrap.js"></script>
    <script src="../lib/vendor/bootstrap-datepicker/bootstrap-datepicker.js"></script>
    <script src="../lib/vendor/bootstrap-datepicker/bootstrap-datepicker.ja.js"></script>
  </body>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | Bootstrapのスタイルシートを読み込む。
    * - | (2)
      - | フォーカスを契機にカレンダーが表示されるテキストフィールドを設置する。
    * - | (3)
      - | jQuery、Bootstrap、Bootstrap-datepicker及びカレンダーの日本語対応のJavaScriptを読み込む。

日付フォーマットや表示言語を変更する場合には、\ ``data-date-format``\ や\ ``data-date-language``\ などの属性を指定することができる。その他のオプションについて知りたい場合は、`Bootstrap-datepicker公式ウェブサイトのリファレンス <http://bootstrap-datepicker.readthedocs.io/en/1.3.1/options.html>`_ を参照すること。

.. _bootstrapDatepickerJavaScript:

基本的な使い方(JavaScript形式)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

HTMLでは、Bootstrapのスタイルシート、jQuery、Bootstrap及びBootstrap-datepickerのJavaScriptを読み込み、独自に実装したJavaScriptを読み込む。

.. code-block:: html

  <head>
    <meta charset="utf-8">
    <title>JavaScript形式のカレンダー</title>

    <!-- (1) -->
    <link rel="stylesheet" href="../lib/vendor/bootstrap/3.2.0/css/bootstrap.css">
    <link rel="stylesheet" href="../lib/vendor/bootstrap/3.2.0/css/bootstrap-theme.css">
    <link rel="stylesheet" href="../lib/vendor/bootstrap-datepicker/datepicker3.css">
  </head>
  <body>

    <h1>JavaScript形式のカレンダー</h1>

    <!-- (2) -->
    <label>日付: <input id="datepicker" type="text" value="2014/09/09" ></label>

    <!-- (3) -->
    <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>
    <script src="../lib/vendor/bootstrap/3.2.0/js/bootstrap.js"></script>
    <script src="../lib/vendor/bootstrap-datepicker/bootstrap-datepicker.js"></script>
    <script src="../lib/vendor/bootstrap-datepicker/bootstrap-datepicker.ja.js"></script>

    <!-- (4) -->
    <script src="js/bootstrap-datepicker-javascript.js"></script>
  </body>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | Bootstrapのスタイルシートを読み込む。
    * - | (2)
      - | フォーカスを契機にカレンダーが表示されるテキストフィールドを設置する。
    * - | (3)
      - | jQuery、Bootstrap、Bootstrap-datepicker及びカレンダーの日本語対応のJavaScriptを読み込む。
    * - | (4)
      - | 独自に実装したJavaScriptを読み込む。

JavaScript(bootstrap-datepicker-javascript.js)では、フォーカスを契機にカレンダーが表示されるテキストフィールドに対し、\ ``datepicker``\ メソッドを実行する。

.. code-block:: javascript

  // bootstrap-datepicker-javascript.js

  'use strict';

  $(function () {

    // (1)
    $('#datepicker').datepicker({
      format: 'yyyy/mm/dd',
      language: 'ja',
      orientation: 'top auto',
      autoclose: true
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | カレンダー表示を設定する。

.. note::

   jQuery UIとbootstrap-datepickerは別のライブラリなので、動作や表示が異なることに注意する。例として次の点が異なる。

     .. list-table::
        :header-rows: 1
        :widths: 30 35 35

        * - 条件
          - jQuery UI
          - bootstrap-datepicker
        * - カレンダーをクリックして日付を選択した際の動作
          - カレンダー表示が閉じる。
          - カレンダー表示が閉じない(\ ``autoclose``\ オプションを指定することで閉じるように動作を変更できる)。
        * - キー入力で「2014/04/35」などの無効な日付を入力した際の動作
          - そのまま「2014/04/35」が表示され、カレンダー上は選択されていない状態になる。
          - 自動的に「2014/05/05」に修正される。カレンダー上も修正後の日付が選択されている状態になる。
        * - 日本語化時のカレンダーのヘッダ部の年月表示
          - 「2014年 4月」のように年月の順で表示される。
          - 「4月 2014」のように月年の順で表示される。
        * - 日本語化時のカレンダーのヘッダ部の年月表示をクリック
          - 何も起こらない。
          - 1年単位でのページ送り、さらにもう一度クリックすると10年単位でのページ送りが可能になる。
