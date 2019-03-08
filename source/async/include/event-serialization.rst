.. _event-serialization:

Deferredによる非同期処理制御
============================================

.. _event-serializationOutline:

概要
--------------------------------------------

| Deferredは、非同期処理のコールバックを柔軟に管理・実行する機能である。

| 例えば、非同期処理完了時にコールバックを渡して次の非同期処理を呼び出すような実装を考えた場合、
| 連続した非同期処理を実装すると、コールバックのネストが発生し、ソースコードの可読性が低下する。

   .. figure:: /images/deferred-nested-callback.png
      :alt: deferred-nested-callback
      :align: center
      :scale: 75%

      **図: コールバックのネスト例**

| ここでは、Deferredを利用した非同期処理のコールバックのネストの解消方法を解説しながら非同期処理の実装方法について紹介する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - \-
     - `Deferred Object | jQuery <https://api.jquery.com/category/deferred-object/>`_

.. _event-serializationAdvantage:

非同期処理のネスト解消
--------------------------------------------

| Deferredを利用し、非同期処理完了後の後続処理を\ `then`\ メソッドで記述する。
| これにより、非同期処理の後続処理をネストせず実装できる。以下にその例を示す。

| まず、Deferredを利用せず非同期処理を実装したサンプルを示す。以下は1秒毎にメッセージを3つ出力する。

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
    .then(outputMessage3)

    // (7)
    .catch(function () {
      alert('failed!');
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 1秒後にメッセージ「1」を出力する関数。
    * - | (2)
      - | Deferredオブジェクトを生成する。
    * - | (3)
      - | 非同期処理内で最後に非同期処理の実行状態を変更する。
        | 非同期処理の実行状態については後述する。
    * - | (4)
      - | Promiseオブジェクトを返却する。
    * - | (5)
      - | メッセージ「2」「3」を出力する関数。
        | \ `outputMessage1`\ と同様のため、実装は省略する。
    * - | (6)
      - | 非同期処理完了後の後続処理を\ `then`\ で設定する。
        | 直前の非同期処理が正常に完了すると、\ `then`\ に設定されたコールバックが実行される。
    * - | (7)
      - | 各非同期処理のエラーハンドリングを\ `catch`\ で設定する。
        | \ `catch`\ については :ref:`event-serializationThenCatch` で説明する。

| Deferred適用前後を比較すると、前者はメッセージ数分ネストしているが、後者はネストが解消している。Deferred特有の実装が必要だが、ネストを浅く保てる。

.. note::

   Deferredオブジェクトを生成すると、内部で非同期処理の実行状態を管理するためのPromiseオブジェクトが生成される。このPromiseオブジェクトには次の3つの実行状態がある。

   (1) pending   （初期状態　＝　実行中）
   (2) fulfilled （成功状態　＝　正常終了）
   (3) rejected  （失敗状態　＝　異常終了）

   DeferredオブジェクトはこのPromiseオブジェクトの状態を2つのメソッド \ `Deferred.resolve()`\ , \ `Deferred.reject()`\ によってそれぞれfulfilled （成功）, rejected （失敗）の状態に変更できる。

   この状態変化に応じて、以下のように\ `then`\ や \ `catch`\ で設定されたコールバックが実行される仕組みとなっている。

   * fulfilledの状態　→　\ `then(successCallback)`\ が実行
   * rejectedの状態　 →　\ `catch(errorCallback)`\ が実行

.. _event-serializationThenCatch:

非同期処理のエラーハンドリング
--------------------------------------------

| ここでは非同期処理のエラーハンドリングの方法を説明する。
| 非同期処理内にて、Deferredメソッドの\ `Deferred.reject()`\ で、後続処理を実行せずエラーハンドリングできる。以下にその例を示す。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `非同期処理のエラーハンドリング <../samples/jquery/deferred-promise-branch-then.html>`_

.. code-block:: javascript

    // (1)
    var random = function () {
      return Math.floor(Math.random() * 2) === 1 ? true : false;
    };

    var async = function () {

      var dfd = new $.Deferred();

      setTimeout(function () {
        var result = random();
        $('#deferred-area').append('<p>ランダム処理の結果は' + result + '.</p>');
        if (result) {

          // (2)
          dfd.resolve('resolve');
        } else {

          // (2)
          dfd.reject('reject');
        }
      }, 1000);

      return dfd.promise();
    };

    // (3)
    var success = function (arg) {
      $('#deferred-area').append('<p>' + arg + 'が実行されました。成功です。</p>');
    };

    // (3)
    var failure = function (arg) {
      $('#deferred-area').append('<p>' + arg + 'が実行されました。失敗です。</p>');
    };

    async()
    .then(success)

    // (4)
    .catch(failure);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | trueかfalseをランダムに返却する関数。
    * - | (2)
      - | ランダム関数の結果に応じてPromiseオブジェクトの状態を変更する。引数には文字列を設定する。
    * - | (3)
      - | \ `resolve`\ または\ `reject`\ から文字列を受け取り、メッセージを出力する関数。
    * - | (4)
      - | Promiseオブジェクトの状態がrejectedになると、\ `catch`\ で設定したコールバックを実行する。

| 上記のように、非同期処理内でPromiseオブジェクトの状態をrejectedにすると、\ `then`\ のコールバックは実行されず、\ `catch`\ のコールバックのみが実行される。

| \ `catch`\ はPromiseチェーン（\ `.then().then()`\ のように連結可能なPromiseオブジェクトのメソッドのこと。チェーンとも呼ぶ。）の最後に置くことが基本だが、\ `.then().catch().then().catch()`\ とすると、各非同期処理ごとのエラーハンドリングもできる。
| エラーハンドリングのみを設定したい場合は、\ `async().catch()`\ とすればよい。

.. note::

   \ `resolve`\ と\ `reject`\ は引数を設定でき、それぞれ\ `then`\ と\ `catch`\ のコールバックで受け取れる。

.. note::

   \ `catch`\ をチェーンしない場合、\ `then`\ のコールバック内部で発生した例外を\ `then`\ の外側で捕捉できない問題が発生する。

   `jQuery公式のUpgradeGuide\ <https://jquery.com/upgrade-guide/3.0/#callback-exit>`__\ では **「.catch()をPromiseチェーンの最後に追加することを強く推奨」** としている。


.. warning::

  \ `then`\ と \ `catch`\ の他に \ `done`\ と \ `fail`\ による後続処理やエラーハンドリングの方法もあるが、本ガイドラインでは以下の理由により\ `done`\ と \ `fail`\ の利用を非推奨としている。

  * Promise標準のPromises/A+、ES6に準拠しておらず、後方互換性を保つために古い挙動を保持していることから今後非推奨となる可能性がある。

.. _event-serializationParallel:

非同期処理の待ち合わせ
--------------------------------------------

| ここでは、非同期処理を並列的に実行し、各非同期処理の完了を待ち合わせる方法を紹介する。
| \ `when`\ は、複数の非同期処理を並列に実行できるメソッドであり、\ `then`\ をチェーンさせることで各非同期処理の完了を待ち合わせることができる。以下にその例を示す。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `非同期処理の待ち合わせ <../samples/jquery/deferred-promise-parallel.html>`_

| ここでは、並列実行する非同期処理を3つ用意し、\ `when`\ の引数に設定する。

.. code-block:: javascript

    // (1)
    var asyncFuncA = function () {

      var dfd = new $.Deferred();

      setTimeout(function () {
        $('#deferred-area').append('<p>Function A が終了しました</p>');
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
      $('#deferred-area').append('<p>全ての処理が終了しました</p>');
    };

    // (4)
    $.when(asyncFuncA(), asyncFuncB(), asyncFuncC())
    .then(outputMessage)
    .catch(function () {
      alert('failed!');
    });

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
        | \ `asyncFuncA`\ と同様のため、実装は省略する。
    * - | (3)
      - | メッセージを出力する関数。
    * - | (4)
      - | 各非同期処理完了後の後続処理を\ `then`\ で設定する。

| 上記の通り実装すると、各非同期処理の完了を待って\ `then`\ で設定したコールバックが実行される。

.. note::

   \ `when`\ に複数の非同期処理を渡すと、pendingの状態を持つPromiseオブジェクトが返却される。Promiseオブジェクトは各非同期処理の状態を管理しており、全ての非同期処理がfulfilledになると\ `then`\ で設定したコールバックを実行する。

   ただし、いずれかの非同期処理の状態が1つでもrejectedになると、実行中の非同期処理の完了を待たず、\ `catch`\ で設定したコールバックが実行される。その際、 **実行中の非同期処理が中断されない** ことに注意が必要である。

.. _event-serializationHowToExtend:

非同期通信へのDeferred適用
--------------------------------------------

| 非同期処理は、サーバもしくは外部ファイルの情報を非同期通信で取得した後、後続処理を実施したい場面で利用されることが想定される。ここでは非同期通信にDeferredを適用したサンプルを紹介する。

| Deferredを非同期通信の実装に適用すると以下の効果が得られる。
| 　(1) 連続した非同期処理の多段階ネストを解消
| 　(2) 非同期通信処理の共通化でコードの再利用性向上
| 以下にその例を示す。

.. list-table::
   :header-rows: 1
   :widths: 40

   * - |sample|
   * - `非同期通信へのDeferred適用 <../samples/jquery/deferred-promise-ajax.html>`_

.. code-block:: javascript

    var doAjax = function (path) {

      var dfd = new $.Deferred();

      // (1)
      $.ajax({
        'type' : 'GET',
        'url' : path,
        'dataType' : 'json'
      })

      // (2)
      .then(function (data) {
        $('#deferred-area').append('<p>' + path + 'の取得に成功しました。</p>');
        dfd.resolve([path, data]);
      })

      // (3)
      .catch(function () {
        $('#deferred-area').append('<p>' + path + 'の取得に失敗しました。</p>');
        dfd.reject(path);
      });
      return dfd.promise();
    };

    // (4)
    var showData = function (data) {
      for (var n = 0, len = data.length; n < len; n++) {
        $('#deferred-area').append(data[n].text + ' : ' + data[n].value + '<br />');
      }
    };

    // (5)
    var successCallback = function (array) {
      $('#deferred-area').append('<p>' + array[0] + 'の読み込みが成功しました。</p>');
      showData(array[1]);
    };

    // (6)
    var errorCallback = function (path) {
      $('#deferred-area').append('<p>' + path + 'の読み込みに失敗しました。</p>');
    };

    // (7)
    doAjax('data/dataA.json')
    .then(successCallback)
    .catch(errorCallback);

    // (7)
    doAjax('data/dataB_dummy.json')
    .then(successCallback)
    .catch(errorCallback);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 非同期通信を実行する。
    * - | (2)
      - | 非同期通信が成功した場合に以下を実行する。
        | 1. メッセージを出力する。
        | 2. \ `resolve`\ の引数にファイルパスとjsonデータを含む配列を設定し実行する。
    * - | (3)
      - | 非同期通信が失敗した場合に以下を実行する。
        | 1. メッセージを出力する。
        | 2. \ `reject`\ の引数にファイルパスを設定し実行する。
    * - | (4)
      - | 非同期通信で取得したjsonデータを画面に出力する関数。引数にjsonデータを受け取る。
    * - | (5)
      - | メッセージとリストを出力する関数。引数にファイルパスとjsonデータを含む配列を受け取る。
    * - | (6)
      - | メッセージを出力する関数。引数にファイルパスを受け取る。
    * - | (7)
      - | 引数にファイルパスを設定し、非同期処理を実行する。
        | 非同期通信失敗時の挙動が確認できるよう、\ `dataB_dummy.json`\ は存在しないファイルパスを指定する。

| 上記のサンプルでは、Deferredを適用した非同期通信処理を共通化し、記述するソースコードを削減している。
| このように非同期通信にDeferredを適用すると、多段階ネスト解消とコードの再利用性が向上する。

.. note::

   \ `ajax`\ はThe jQuery XMLHttpRequest （以下、jqXHRとする）オブジェクトを返却する。jqXHRはPromiseインターフェースを実装しているため、\ `then`\ や\ `catch`\ をチェーンさせることができる。\ `ajax`\ の詳細な利用方法については :ref:`ajaxGearingServer` を参照すること。
