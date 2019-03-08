.. _lodash:

Lodashによるコーディング支援
------------------------------------------------

Lo-Dashは、リスト操作やテンプレートエンジンなどの様々な便利な関数を提供するライブラリである。

ここではLo-Dashを用いた以下の内容を説明する。

* :ref:`lodash-array-function`
* :ref:`lodash-template-engine`

.. list-table::
   :header-rows: 1
   :widths: 20 10 30 40

   * - |using-library-name|
     - 参考バージョン
     - |sample|
     - |reference-page|
   * - Lo-Dash (Compatibility build)
     - 4.17.10
     - なし
     - `Lo-Dash <https://lodash.com/>`__


.. _lodash-array-function:

リスト操作
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ここでは代表的なメソッドのみ紹介する。
完全な一覧は `Lodashの公式リファレンス <https://lodash.com/docs>`__ を参照すること。

* ``_.each(collection, callback)``

  リストのすべての要素に対して繰り返し処理する。(\ ``Array.forEach``\ 相当)

  .. code-block:: javascript

     // (1)
     _([1, 2, 3]).forEach(function(num) {
       console.log(num);
     });

  .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
  .. list-table::
      :header-rows: 1
      :widths: 10 80

      * - 項番
        - 説明
      * - | (1)
        - | リストの要素を1つずつコンソール出力する。
          | 上記サンプルの場合、コンソールにリストの要素を1つずつ順に出力する。

* ``_.filter(collection, fn)``

  リストの要素のうち、条件に一致した値だけのリストを返す。(\ ``Array.filter``\ 相当)

  .. code-block:: javascript

     // (2)
     _.filter([1, 2, 3, 4, 5, 6], function(num) {
       return num % 2 == 0;
     });

  .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
  .. list-table::
      :header-rows: 1
      :widths: 10 80

      * - 項番
        - 説明
      * - | (2)
        - | 2の倍数の要素からなるリストを返す。
          | 上記サンプルでは\ ``[2, 4, 6]``\ が返却される。

* ``_.filter(collection, props)``

  指定したプロパティに一致する要素からなるリストを返す。

  .. code-block:: javascript

     var characters = [
       { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
       { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     ];

     // (3)
     _.filter(characters, { 'age': 36 });

  .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
  .. list-table::
      :header-rows: 1
      :widths: 10 80

      * - 項番
        - 説明
      * - | (3)
        - | ageプロパティが36である要素のリストを返す。
          | 上記サンプルでは\ ``[{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]``\ が返却される。

* ``_.map(collection, callback)``

  リスト要素のそれぞれに関数を適用した結果の新たなリストを返す。(\ ``Array.map``\ 相当)

  .. code-block:: javascript

     // (4)
     _.map([1, 2, 3], function(num) {
       return num * 3;
     });

  .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
  .. list-table::
      :header-rows: 1
      :widths: 10 80

      * - 項番
        - 説明
      * - | (4)
        - | 各要素の値を3倍したリストを作る。
          | 上記サンプルでは\ ``[3, 6, 9]``\ が返却される。

.. _lodash-template-engine:

テンプレートエンジン
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

\ ``_.template([string=''], [options={}])``\ メソッドを用いることで、予め定義したテンプレート文字列と与えられたデータから、新たな文字列を生成することができる。
optionsではテンプレート記号の変更やインポートするオブジェクトの設定を行うことができる。optionsの詳細は `Lodashの公式リファレンス <https://lodash.com/#template>`__ を参照すること。

.. code-block:: javascript

   // (1)
   var compiled = _.template('hello <%= name %>');
   compiled({ 'name': 'fred' });

   // (2)
   var compiled = _.template('<b><%- value %></b>');
   compiled({ 'value': '<script>' });

   // (3)
   var compiled = _.template('<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>');
   compiled({ 'people': ['fred', 'barney'] });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | プロパティの値で置き換える。(\ ``<%= ... %>``\ を使用)
        | この場合、文字列\ ``hello fred``\ が設定される。
    * - | (2)
      - | プロパティの値をHTMLエスケープして置き換える。(\ ``<%- ... %>``\ を使用)
        | この場合、文字列\ ``<b>&lt;script&gt;</b>``\ が設定される。
    * - | (3)
      - | テンプレート内でJavaScriptコードを実行する。(\ ``<% ... %>``\ を使用)
        | この場合、文字列\ ``<li>fred</li><li>barney</li>``\ が設定される。

.. note::

   XSS脆弱性を作らないよう、HTML上のテキスト出力には\ ``<%- ... %>``\ プレースホルダを使用すること。

.. note::

   JSPなど、他のテンプレートエンジンが用いるテンプレート記号との競合が起きる可能性がある。
   その場合は、Lodashが用いるテンプレート記号を次のようにして変更することができる。

     .. code-block:: javascript

        _.templateSettings.escape      = /<@-([\s\S]+?)@>/g; // (1)
        _.templateSettings.interpolate = /<@=([\s\S]+?)@>/g; // (2)
        _.templateSettings.evaluate    = /<@([\s\S]+?)@>/g;  // (3)

     .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
     .. list-table::
         :header-rows: 1
         :widths: 10 80

         * - 項番
           - 説明
         * - | (1)
           - | \ ``<%- ... %>``\ を\ ``<@- ... @>``\ に変更する。
         * - | (2)
           - | \ ``<%= ... %>``\ を\ ``<@= ... @>``\ に変更する。
         * - | (3)
           - | \ ``<% ... %>``\ を\ ``<@ ... @>``\ に変更する。
