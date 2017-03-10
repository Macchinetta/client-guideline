.. _event-serialization:

Deferredによる非同期処理制御
============================================

.. _event-serializationOutline:

概要
--------------------------------------------

| Deferredは、複数のコールバックを柔軟に扱うことができるユーティリティー機能である。Deferredを利用することで、非同期処理実装時に陥りがちな、コールバックが多段階でネストする状態を避け、ソースコードの可読性・保守性を保つことができる。

   .. figure:: /images/deferred-nested-callback.png
      :alt: deferred-nested-callback
      :align: center
      :scale: 75%

      **図: コールバックのネスト例**



.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - \-
     - `Deferred Object | jQuery <http://api.jquery.com/category/deferred-object/>`_

.. _event-serializationAdvantage:

Deferredのメリット
--------------------------------------------

| Deferredを利用すると、非同期処理をネストすることなく実装できる。
| ここでは、非同期処理のネストをDeferredを利用して解消する方法を紹介する。

| まず、Deferredを利用せずに非同期処理を実装したサンプルを示す。以下は1秒毎にメッセージを3つ出力する。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `1秒毎にメッセージを出力 <../samples/jquery/deferred-promise-async.html>`_

.. code-block:: javascript

    setTimeout(function () {
      $('#deferred-area').append('<p>1</p>');
      setTimeout(function () {
        $('#deferred-area').append('<p>2</p>');
        setTimeout(function () {
          $('#deferred-area').append('<p>3</p>');
        }, 1000);
      }, 1000);
    }, 1000);

| 次に、上記のサンプルにDeferredを適用し、ネストを解消する。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `1秒毎にメッセージを出力（Deferred適用） <../samples/jquery/deferred-promise.html>`_

.. code-block:: javascript

    // (1)
    var outputMessage1 = function () {

      // (2)
      var dfd = new $.Deferred();

      setTimeout(function () {
        $('#deferred-area').append('<p>1</p>');

        // (3)
        dfd.resolve();
      }, 1000);

      // (4)
      return dfd.promise();
    };

    // (5)
    var outputMessage2 = function () {
      /* omitted */
    };

    // (5)
    var outputMessage3 = function () {
      /* omitted */
    };

    // (6)
    outputMessage1()
    .then(outputMessage2)
    .then(outputMessage3);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 1秒後にメッセージ「1」を出力する関数。
    * - | (2)
      - | deferredオブジェクトを生成する。
    * - | (3)
      - | 非同期処理内で最後にdeferredオブジェクトの状態を変更する。
        | deferredオブジェクトの状態については後述する。
    * - | (4)
      - | promiseオブジェクトを返却する。
    * - | (5)
      - | メッセージ「2」「3」を出力する関数。
        | \ `outputMessage1`\ とほぼ同一であるため、実装は省略する。
    * - | (6)
      - | \ `outputMessage1`\ を実行し、\ `then`\ で後続の非同期処理を連結する。
        | \ `then`\ については後述する。

| Deferred適用前後を比較すると、前者はメッセージ数分ネストしているが、後者はネストが解消している。Deferred特有の実装が必要だが、ネストを浅く保つことができる。

.. note::

   \ `then`\ を実行すると、promiseオブジェクトにコールバックを設定し、新たなpromiseオブジェクトが返却される。\ `then`\ を繰り返すとpromiseオブジェクトが連鎖し、コールバックが直列的に実行される。

      .. figure:: /images/deferred-then.png
         :alt: deferred-then
         :align: center
         :scale: 50%

         **図: promiseオブジェクトの連鎖とコールバック**

.. note::

   promiseオブジェクトは、deferredオブジェクトから状態を変更するメソッドを削除したサブセットである。状態を変更できる箇所を限定することで、意図せず後続処理が実行されることを抑止する。

.. _event-serializationHowToUse:

Deferredの利用方法
--------------------------------------------

.. _event-serializationBranchThen:

Deferredによるコールバックの切り替え（then）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`event-serializationAdvantage` では、\ `then`\ で非同期処理を連結した。\ `then`\ は非同期処理の連結だけでなく、deferredオブジェクトの状態に応じてコールバックを切り替えることもできる。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `thenによるコールバックの切り替え <../samples/jquery/deferred-promise-branch-then.html>`_

.. code-block:: javascript

    // (1)
    var random = function () {
      return Math.floor(Math.random() * 2) === 1 ? true : false;
    };

    var async = function () {

      var dfd = new $.Deferred();

      setTimeout(function () {
        var result = random();
        $('#deferred-area').append('<p>Result is ' + result + '.</p>');
        if (result) {

          // (2)
          dfd.resolve();
        } else {

          // (2)
          dfd.reject();
        }
      }, 1000);

      return dfd.promise();
    };

    // (3)
    var success = function () {
      $('#deferred-area').append('<p>success</p>');
    };

    // (3)
    var failure = function () {
      $('#deferred-area').append('<p>failure</p>');
    };

    // (4)
    async().then(success, failure);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | trueかfalseをランダムに返却する関数。
    * - | (2)
      - | ランダム関数の結果に応じてdeferredオブジェクトの状態を変更する。
    * - | (3)
      - | メッセージを出力する関数。
    * - | (4)
      - | 引数にコールバックを渡す。

| \ `then`\ に設定したコールバックは、deferredオブジェクトの状態に応じて実行される。対応関係を以下に示す。

.. tabularcolumns:: |p{0.10\linewidth}|p{0.10\linewidth}|p{0.20\linewidth}|p{0.60\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 20 20 60

    * - メソッド
      - 状態
      - 実行するコールバック
    * - | \ `resolve`\
      - | resolved
      - | 第1引数
    * - | \ `reject`\
      - | rejected
      - | 第2引数

| なお、resolvedに対応するコールバックが不要の場合はnullを設定すればよい。

.. _event-serializationBranchDoneFail:

Deferredによるコールバックの切り替え（done・fail）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|  ここでは、\ `then`\ と同様に\ `done`\ ・\ `fail`\ でコールバックを切り替える方法を紹介する。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `done・failによるコールバックの切り替え <../samples/jquery/deferred-promise-branch-done.html>`_

| JavaScriptは :ref:`event-serializationBranchThen` との差分のみ記述する。

.. code-block:: javascript

    // (1)
    async()
    .done(success)
    .fail(failure);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 引数にコールバックを渡す。

| deferredオブジェクトの状態と、実行するコールバックの対応関係を以下に示す。

.. tabularcolumns:: |p{0.10\linewidth}|p{0.10\linewidth}|p{0.20\linewidth}|p{0.60\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 20 20 60

    * - メソッド
      - 状態
      - 実行するコールバック
    * - | \ `resolve`\
      - | resolved
      - | \ `done`\ の引数
    * - | \ `reject`\
      - | rejected
      - | \ `fail`\ の引数

.. note::

   \ `done`\ ・\ `fail`\ を実行すると、promiseオブジェクトにコールバックを設定し、同一のpromiseオブジェクトが返却される。\ `done`\ ・\ `fail`\ を繰り返すと1つのpromiseオブジェクトに複数のコールバックが積み上げられ、ほぼ同時に実行される。\ `then`\ と挙動が異なる点に注意すること。

      .. figure:: /images/deferred-done-fail.png
         :alt: deferred-done
         :align: center
         :scale: 50%

         **図: promiseオブジェクトとコールバック**

.. note::

   \ `then`\ ・\ `done`\ ・\ `fail`\ の他に\ `always`\ がある。\ `always`\ はresolved・rejectedのどちらの状態でも実行される。

.. _event-serializationParallel:

非同期処理の並列連結（when）
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、非同期処理を並列的に連結する方法を紹介する。\ `when`\ は、複数の非同期処理を並列に実行し、結果に応じてコールバックを切り替えることができる。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `非同期処理の並列連結 <../samples/jquery/deferred-promise-parallel.html>`_

| JavaScriptは、非同期処理を3つ用意し、\ `when`\ の引数に設定する。

.. code-block:: javascript

    // (1)
    var asyncFuncA = function () {

      var dfd = new $.Deferred();

      setTimeout(function () {
        $('#deferred-area').append('<p>functionA has ended.</p>');
        dfd.resolve();
      }, 1000);
      return dfd.promise();
    };

    // (2)
    var asyncFuncB = function () {
      /* omitted */
    };

    // (2)
    var asyncFuncC = function () {
      /* omitted */
    };

    // (3)
    var outputMessage = function () {
      $('#deferred-area').append('<p>All of the function has ended.</p>');
    };

    // (4)
    $.when(asyncFuncA(), asyncFuncB(), asyncFuncC())
    .then(outputMessage);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 非同期処理終了後にメッセージを出力する関数。
    * - | (2)
      - | 非同期処理終了後にメッセージを出力する関数。
        | \ `asyncFuncA`\ と同様であるため、実装は省略。
    * - | (3)
      - | 全ての処理が完了後にメッセージを出力する関数。
    * - | (4)
      - | 非同期処理からpromiseオブジェクトを受け取る。
        | \ `then`\ の引数にメッセージ出力処理を設定する。

| 上記の通り実装すると、各非同期処理の完了を待って\ `then`\ のコールバックが実行される。

.. note::

   \ `when`\ に複数の非同期処理を渡すと、pendingの状態を持つpromiseオブジェクトが返却される。
   promiseオブジェクトは各非同期処理の状態を管理しており、全ての非同期処理がresolvedになるか、1つでもrejectedになると\ `then`\ のコールバックを実行する。

   なお、後者の場合は実行中の非同期処理の完了を待ったり、中断することなくコールバックの実行に移る。必要に応じて中断処理などを実装すること。
.. _event-serializationHowToExtend:

応用方法
--------------------------------------------

.. _event-serializationHowToReuseAjax:

Ajaxの再利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| \ `ajax`\ は、非同期通信完了後にコールバックを実行できる。コールバックに業務処理を設定した場合、それらが密に結合される。Deferredを利用すると、非同期通信とコールバックの結合を疎にし、非同期通信のみ再利用することができる。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `Ajaxの再利用 <../samples/jquery/deferred-promise-ajax.html>`_

.. code-block:: javascript

    var doAjax = function () {

      var dfd = new $.Deferred();

      // (1)
      $.ajax({
        url : 'js/deferred-promise-sleep.js',
        dataType : 'script'

      // (2)
      }).then(dfd.resolve);
      return dfd.promise();
    };

    // (3)
    var funcA = function () {
      $('#deferred-area').append('<p>Do function A.</p>');
    };

    // (3)
    var funcB = function () {
      $('#deferred-area').append('<p>Do function B.</p>');
    };

    // (4)
    doAjax().then(funcA);

    // (4)
    doAjax().then(funcB);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 非同期通信を実行する。
    * - | (2)
      - | 非同期処理終了後に状態を変更する。
    * - | (3)
      - | メッセージを出力する関数。
    * - | (4)
      - | 非同期通信を実行し、\ `then`\ の引数にメッセージを出力する関数を設定する。

| 上記のサンプルを実行すると、非同期通信は同一だが、異なるメッセージを出力することができる。AjaxとDeferredを組み合わせることで、再利用性を高めることができる。

.. note::

   サンプルでは、\ `ajax`\ に\ `then`\ を実装している。
   \ `ajax`\ は、jQuery XMLHttpRequest（以降、「jqXHR」とする。）を返却する。jqXHRはpromiseオブジェクトのインターフェースを実装しており、サンプルのように\ `then`\ や\ `done`\ ・\ `fail`\ を実行することが可能である。詳細は `jQuery公式ウェブサイトのリファレンス\ <http://jquery.com/>`__\ を参照すること。
