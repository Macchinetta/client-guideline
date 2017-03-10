.. _validation:

入力値チェック
================================================

.. validation-outline:

概要
------------------------------------------------

| ここでは、Parsleyを用いた入力値チェックの実装方法を説明する。
| Parsleyはクライアントサイドでの入力値チェックを容易に実現するためのライブラリである。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - Parsley
     - `入力値チェック <../samples/parsleyjs/validation.html>`_
     - `Parsley - The ultimate documentation <http://parsleyjs.org/doc/index.html>`__

.. note::

   クライアントサイドでの入力値チェックは、入力値が受け付けられるかどうかをサーバにリクエストすることなく即座に確認できるため、ユーザビリティの向上に寄与する。

   ただし、クライアントから送信されるパラメータは容易に改ざんできるため、サーバサイドでの入力値チェックの代替にはならない。業務上のデータ不整合を防ぐためには必ずサーバサイドでのチェックを実施すること。

利用方法
------------------------------------------------

.. _parsley-basic-usage:

基本的な使用方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

HTMLでは、次の順番でJavaScriptを読み込む。

1. jQuery
2. Parsley拡張プラグイン (日付形式検証などの、拡張プラグインとして提供されている機能を使用する場合のみ)
3. Parsley本体
4. Parsleyメッセージ定義ファイル (指定しない場合メッセージは英語で出力される。サンプルでは未設定。)
5. 独自実装したJavaScript

.. code-block:: html

    <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>
    <script src="../lib/vendor/parsleyjs/2.0.6/extra/validator/dateiso.js"></script>
    <script src="../lib/vendor/parsleyjs/2.0.6/parsley.js"></script>
    <script src="js/validation.js"></script>

検証ルールを適用するためには、対象の\ ``input``\ に対して\ ``data-parsley-検証ルール名``\ という属性を指定する。次の例は、年齢フィールドが「入力必須」「正の整数値」「20以上」であることを検証する例である。

.. code-block:: html

        <label for="age">年齢</label><br>
        <input id="age" name="age" type="text"
               data-parsley-type="digits"
               data-parsley-min="20" data-parsley-min-message="未成年は登録できません。">

検証エラー時のメッセージは、エラーとなった検証ルールのデフォルトメッセージが表示される ( 設定方法は :ref:`parsley-setting-default-messages` を参照) 。ただし、上の例にある\ ``data-parsley-min-message="can not register age under 20"``\ のように、\ ``検証ルール属性-message``\ 属性を用いることで、特定の検証ルールのみメッセージを変更できる。

その他の検証ルールを適用する属性として、以下が使用できる。

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - 属性
     - 用途
   * - ``data-parsley-required="true"``
     - 入力必須であることを検証する。
   * - ``data-parsley-type="digits"``
     - 正の整数値であることを検証する。
   * - ``data-parsley-type="email"``
     - Eメール形式であることを検証する。
   * - | ``data-parsley-min="n"``
       | (n は正の整数)
     - n 以上の数値であることを検証する。
   * - | ``data-parsley-max="n"``
       | (n は正の整数)
     - n 以下の数値であることを検証する。
   * - | ``data-parsley-length="[m, n]"``
       | (m, n は正の整数)
     - m 文字以上 n 文字以下であることを検証する。
   * - ``data-parsley-equalto="セレクタ文字列"``
     - セレクタで指定した要素の値と同じ値であることを検証する。

検証ルールの完全な一覧は `Validators list <http://parsleyjs.org/doc/index.html#psly-validators-list>`__ を参照すること。

JavaScript(validation.js)では、 入力値チェック対象となるフォーム要素をjQueryでセレクトし、\ ``parsley``\ メソッドを実行する。

\ ``parsley``\ メソッドの引数には、次のようにオプションを指定するためのオブジェクトを指定できる。

.. code-block:: javascript

  // validation.js

  'use strict';

  $(function () {

    // (1)
    $('#form').parsley({

      // (2)
      inputs: 'input, textarea, select',

      // (3)
      excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',

      // (4)
      errorClass: 'has-error',

      // (5)
      successClass: '',

      // (6)
      classHandler: function (ParsleyField) {

        // (7)
        return ParsleyField.$element.parent();
      },

      // (8)
      errorsContainer: function (ParsleyField) {

        // (9)
      },

      // (10)
      errorsWrapper: '<ul class="parsley-errors-list"></ul>',

      // (11)
      errorTemplate: '<li></li>'
    });

  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | バリデーションを有効化する。
    * - | (2)
      - | 検証対象の要素を指定する。(セレクタ文字列、またはjQueryオブジェクト)
    * - | (3)
      - | 検証対象から除外する要素を指定する。(セレクタ文字列、またはjQueryオブジェクト)
    * - | (4)
      - | 検証エラー時に付与するクラス名を指定する。
    * - | (5)
      - | 検証成功時に付与するクラス名を指定する。
    * - | (6)
      - | 検証結果に応じてクラスを付与する要素を指定する。(セレクタ文字列、jQueryオブジェクト、またはそれらを返す関数)
    * - | (7)
      - | 検証エラーが起きた input要素の親要素に\ ``has-error``\ クラスを付与する。
    * - | (8)
      - | エラーメッセージを追加する要素を指定する。(文字列、jQueryオブジェクト、またはそれらを返す関数)
    * - | (9)
      - | 実装しない場合(オプション未指定時)や\ ``undefined``\ を返すと、input要素の次に作られる。
    * - | (10)
      - | エラーメッセージの親要素に用いるHTML文字列を指定する。
    * - | (11)
      - | エラーメッセージ表示に用いるHTML文字列を指定する。

これらのオプションを使用することで、エラー時のメッセージ表示位置やスタイルの変更などを柔軟にカスタマイズすることができる。


.. _parsley-setting-default-messages:

デフォルトエラーメッセージ定義と国際化対応
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Parsleyの出力するデフォルトのエラーメッセージは英語であるが、他の各言語についてもデフォルトのエラーメッセージ定義が提供されている (i18nディレクトリ配下)。また、それらのファイル内のメッセージ定義を任意の内容に書き換えることができる。日本語のメッセージを変更する場合は、i18n/ja.js に定義されているメッセージ部分を直接書き換えればよい。

デフォルトのエラーメッセージを変更したい場合は、次のように Parsley 本体の後に読み込む。

.. code-block:: html

   <script src="jquery.js"></script>
   <script src="parsley.min.js"></script>
   <script src="i18n/ja.js"></script>

複数のロケールに対応する場合には、次のように複数の言語のメッセージ定義を読み込んだ後、\ ``ParsleyValidator.setLocale``\ メソッドを用いて適用するロケールを指定する。

.. code-block:: html

   <script src="jquery.js"></script>
   <script src="parsley.min.js"></script>
   <script src="i18n/fr.js"></script>
   <script src="i18n/ja.js"></script>
   <script type="text/javascript">
     var locale = (navigator.language || navigator.userLanguage).substring(0, 2);
     try {
       window.ParsleyValidator.setLocale(locale);
     } catch (e) {
       window.ParsleyValidator.setLocale('en');
     }
   </script>

この例は、\ ``ParsleyValidator.setLocale``\ メソッドで指定するロケールをウェブブラウザの設定言語から取得して適用する例である。
この例では 'en', 'fr', 'ja' が有効となり、ウェブブラウザから取得したロケールから選択される。

.. _parsley-custom-validator:

カスタムバリデータの実装方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

独自の検証ルールとメッセージを追加するためには、Parsley本体の読み込み後に、\ ``ParsleyValidator.addValidator``\ メソッドおよび\ ``ParsleyValidator.addMessage``\ メソッドを使用する。

次の例は、指定した数値の倍数であることを検証する独自の検証ルール ``multipleof`` の実装および使用例である。

Javascriptでは以下のように実装する。

.. code-block:: javascript

   window.ParsleyValidator
     .addValidator('multipleof', function (value, requirement) {
       return 0 === value % requirement;
     }, 32)
     .addMessage('en', 'multipleof', 'This value should be a multiple of %s')
     .addMessage('ja', 'multipleof', '%s の倍数である必要があります。');

HTMLは以下のようなinput要素を設置する。

.. code-block:: html

   <input type="text" data-parsley-multipleof="3">


\ ``ParsleyValidator.addValidator``\ および\ ``ParsleyValidator.addMessage``\ メソッドのシグネチャは次のとおり。

.. js:function:: ParsleyValidator.addValidator(name, fn, priority)
   :noindex:

   :param String name: 検証ルール名
   :param Function fn: 検証を実行する関数。2つの引数として、対象の\ ``input``\ 要素の値と、オプション (\ ``data-parsley-multipleof="3"``\ のように使用した場合は\ ``3``\ ) を受け取る。成功時は\ ``true``\ 、失敗時は\ ``false``\ を返すように実装する。
   :param Number priority: 優先順位。値が大きいほど優先的に検証される。

.. js:function:: ParsleyValidator.addMessage(locale, name, message)
   :noindex:

   :param String locale: ロケール
   :param String name: メッセージに対応させる検証ルール名
   :param String message: メッセージ本文。\ ``%s``\ プレースホルダを用いることでオプション値を埋め込むことができる。


.. note::

   より高度な入力チェックの例として、サーバ通信を伴う入力値チェックがある。具体例の一つとして、ユーザ登録フォームの「ユーザID」が利用可能かどうかを検証するためサーバに問い合わせるといったケースが考えられる。

   このような機能も、カスタムバリデータを実装することで実現できる。

     .. code-block:: javascript

        window.ParsleyValidator
          .addValidator('registerable',

                       // (1)
                       function (value) {
                         var status = $.ajax({
                           url: '/userid_available',

                           // (2)
                           data: 'id=' + value,

                           // (3)
                           async: false
                         }).status;

                         // (4)
                         return status !== 409;
                       }, 1)
          .addMessage('en', 'registerable', 'this USER ID is already used');

     .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
     .. list-table::
         :header-rows: 1
         :widths: 10 80

         * - 項番
           - 説明
         * - | (1)
           - | 登録可能なユーザIDかどうかを検証する関数を定義する。
         * - | (2)
           - | パラメータ名を\ ``id``\ とし、入力値を設定する。
         * - | (3)
           - | \ ``async``\ オプションに\ ``false``\ を設定し同期処理とする。
         * - | (4)
           - | ステータスコード 409 (Conflict) の場合は登録不可

   検証を実行する関数内で結果を返却するため、\ ``$.ajax``\ の\ ``async``\ オプションを\ ``false``\ にすることで同期的に処理する必要がある。

   なお、非同期で検証を行えるカスタムバリデータを作成する専用APIとして、parsley.remote.js を読み込むことで利用可能になる\ ``Parsley.addAsyncValidator``\ メソッドがある (\ `参考 <http://parsleyjs.org/doc/index.html#remote>`__\ )。ただし、これを用いると、検証時に送信されるパラメータが ``name属性値=value`` で固定化され、変形することができない (上のサンプルコード中の ``data: 'id=' + value`` のように、パラメータ名を"id"に固定するといったことができない)。

   よって、サーバのAPI仕様に合わせてパラメータを変形する必要がある場合は\ ``Parsley.addValidator``\ メソッドを、必要ない場合は\ ``Parsley.addAsyncValidator``\ メソッドを用いるとよい。
