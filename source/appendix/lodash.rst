Lo-Dashによるコーディング支援
------------------------------------------------

Lo-Dashは、リスト操作やテンプレートエンジンなどの様々な便利な関数を提供するライブラリである。リスト操作関数は、ネイティブ実装が用意されていないレガシーブラウザへの対応にも役立つ。

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
     - 2.4.1
     - なし
     - `Lo-Dash <https://lodash.com/>`__


.. _lodash-array-function:

リスト操作
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ここでは代表的なメソッドのみ紹介する。
完全な一覧は `Lo-Dashの公式リファレンス <https://lodash.com/docs>`__ を参照すること。


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
          | 上記サンプルでは [2, 4, 6] が返却される。

* ``_.map(collection, callback)``

  リスト要素のそれぞれに関数を適用した結果の新たなリストを返す。(\ ``Array.map``\ 相当)

  .. code-block:: javascript

     // (3)
     _.map([1, 2, 3], function(num) {
       return num * 3;
     });

  .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
  .. list-table::
      :header-rows: 1
      :widths: 10 80

      * - 項番
        - 説明
      * - | (3)
        - | 各要素の値を3倍したリストを作る。
          | 上記サンプルでは [3, 6, 9] が返却される。

* ``_.where(collection, props)``

  指定したプロパティに一致する要素からなるリストを返す。

  .. code-block:: javascript

     var characters = [
       { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
       { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
     ];

     // (4)
     _.where(characters, { 'age': 36 });

  .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
  .. list-table::
      :header-rows: 1
      :widths: 10 80

      * - 項番
        - 説明
      * - | (4)
        - | ageプロパティが36である要素のリストを返す。
          | 上記サンプルでは [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }] が返却される。


.. _lodash-template-engine:

テンプレートエンジン
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

``_.template(templateStr, data)`` メソッドを用いることで、予め定義したテンプレート文字列と与えられたデータから、新たな文字列を生成することができる。

.. code-block:: javascript

   // (1)
   var templateStr = 'hello <%= name %>';
   _.template(templateStr, { 'name': 'fred' });

   // (2)
   var templateStr = '<b><%- value %></b>';
   _.template(templateStr, { 'value': '<script>' });

   // (3)
   var templateStr = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
   _.template(templateStr, { 'people': ['fred', 'barney'] });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | プロパティの値で置き換える。( '<%= ... %>' を使用)
        | この場合、文字列 'hello fred' が設定される。
    * - | (2)
      - | プロパティの値をHTMLエスケープして置き換える。( '<%- ... %>' を使用)
        | この場合、文字列 '<b>&lt;script&gt;</b>' が設定される。
    * - | (3)
      - | テンプレート内でJavaScriptコードを実行する。(<% ... %> を使用)
        | この場合、文字列 '<li>fred</li><li>barney</li>' が設定される。

.. note::

   XSS脆弱性を作らないよう、HTML上のテキスト出力には\ ``<%- ... %>``\ プレースホルダを使用すること。

.. note::

   JSPなど、他のテンプレートエンジンが用いるテンプレート記号との競合が起きる可能性がある。
   その場合は、Lo-Dashが用いるテンプレート記号を次のようにして変更することができる。

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
           - | '<%- ... %>' を '<@- ... @>' に変更する。
         * - | (2)
           - | '<%= ... %>' を '<@= ... @>' に変更する。
         * - | (3)
           - | '<% ... %>'  を '<@ ... @>'  に変更する。
