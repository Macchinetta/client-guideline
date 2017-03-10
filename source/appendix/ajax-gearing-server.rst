.. _ajaxGearingServer:

Ajaxを利用した連携
-------------------------------------------

.. _ajaxGearingServerOutline:

概要
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、jQueryのajaxとMacchinetta Server Framework (1.x)を連携させる方法を紹介する。

| クライアント側の実装に絞って説明するが、サーバ側の設定や実装も必要になる。詳細はMacchinettaオンライン版 開発ガイドライン ( http://macchinetta.github.io/server/guideline/の Macchinetta Server Framework (1.x) Development Guideline ) の「Ajax」節と「CSRF対策」節を参照すること。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - \-
     - `Ajax | jQuery <http://api.jquery.com/category/ajax/>`_

.. _serverGearingHowToUse:

利用方法
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _ajaxGearingServerUsingGet:

GETを使ったサーバ連携
"""""""""""""""""""""""""""""""""""""""""""

| 以下のサンプルは、入力欄に数値を入力すると、非同期でサーバ側にデータを送信し、結果を「Result」または「Error」に反映する。

.. figure:: /images/ajax_gearing_server.png
   :align: center
   :alt: Ajaxを利用したサーバ連携のサンプル

   **図: Ajaxを利用したサーバ連携のサンプル**

| HTML（JSP）は以下のように実装する。

.. code-block:: html

  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <!-- (1) -->
      <meta name="contextPath" content="${pageContext.request.contextPath}" />
      <title>Ajax</title>
      <link rel="stylesheet" href="vendor/jquery-ui/jquery-ui.css">
    </head>
    <body>
      <h1>Ajax</h1>
      <form id="ajaxForm">
          <p>In this sample, it adds the input value, and then output to the 'Result' area.<br />
              If an error occurs, it outputs the cause to 'ERROR' area.</p>
          <label>Addition:</label>
          <!-- (2) -->
          <input type="text" name="num1" id="num1" value="100" />
          <input type="text" name="num2" id="num2" value="200" />
          <!-- (3) -->
          <br /><label>Result： <span id="result"></span></label>
          <!-- (4) -->
          <br /><label>Error： <span id="error"></span></label>
      </form>
      <!-- JavaScript -->
      <script src="${pageContext.request.contextPath}/resources/app/vendor/jquery/jquery-1.11.1.min.js"></script>
      <script src="${pageContext.request.contextPath}/resources/app/vendor/jquery-ui/jquery-ui.min.js"></script>
      <script src="${pageContext.request.contextPath}/resources/app/js/ajax.js"></script>
    </body>
  </html>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | JavaScriptからWebアプリケーションのコンテキストパスを取得できるよう、HTML（JSP）のmeta要素に設定にする。
    * - | (2)
      - | 値の入力欄を配置する。
    * - | (3)
      - | 計算結果の出力欄を設置する。
    * - | (4)
      - | エラーの出力欄を設置する。

| JavaScriptは以下のように実装する。

.. code-block:: javascript

  'use strict';

  $(function () {

    // (1)
    var contextPath = $("meta[name='contextPath']").attr("content");
    var result = $('#result');
    var error = $('#error');

    // (2)
    $('#num1,#num2').on('change', function () {

      result.html('');
      error.html('');

      // (3)
      $.ajax({
        url: contextPath + '/api/v1/dummyCalc',
        type : 'GET',
        dataType : 'json',

        // (4)
        data : $('#ajaxForm').serialize(),
        timeout : 5000

      // (5)
      }).done(function(data) {
        result.html(data.result);
        return false;

      // (6)
      }).fail(function(jqXHR, textStatus, errorThrown) {
        if (textStatus === 'timeout') {
          error.html(errorThrown);

        }
        if (jqXHR.status === 400) {
          error.html(errorThrown);
        }
        return false;
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
      - | HTML（JSP）のmeta要素に設定したコンテキストパスを取得する。
    * - | (2)
      - | \ ``onchange``\ イベントの発生時に\ ``$.ajax``\ を実行する。
    * - | (3)
      - | \ ``$.ajax``\ メソッドの本体。
        | リクエスト先のURLやHTTPのメソッドを指定し、Ajax通信を実行する。\ ``timeout``\ オプションは、指定した時間（ミリ秒）経過時にAjax通信が未完了の場合、タイムアウトを発生させる。

          .. note::

             \ ``$.ajax``\ メソッドはThe jQuery XMLHttpRequest （以下、jqXHRとする）オブジェクトを返却する。jqXHR オブジェクトはPromiseインターフェースを実装しているため、\ ``done``\ メソッド・\ ``fail``\ メソッドが使用できる。Promise（とそのスーパーセットであるDeferred）については :ref:`event-serialization` や `jQuery公式ウェブサイトのリファレンス\ <https://api.jquery.com/category/deferred-object/>`__\ を参照すること。

    * - | (4)
      - | \ ``$.serialize``\ メソッドを実行し、フォームデータをURLエンコードする。
    * - | (5)
      - | Ajax通信が正常終了した時の処理を実装する。
        | ここでは、以下のJSON形式のレスポンスを受信することを想定している。

          .. code-block:: json

             {"result":500}

          .. note::

             正常または異常終了はHTTPステータスコードで判断している。200番台と304番が正常終了と判断される。

    * - | (6)
      - | Ajax通信が異常終了した時の処理を実装する。
        | タイムアウトの場合、\ ``textStatus``\ に「timeout」が設定される。
        | HTTPステータスコードは\ ``jqXHR.status``\ から取得できる。

.. note::
   Ajaxの処理結果に応じて実行されるコールバック関数は従来は\ `success`\ ・\ `error`\ ・\ `complete`\ であったが、jQuery1.8から非推奨となり\ `done`\ ・\ `fail`\ ・\ `always`\ に置き換えられた。

.. _ajaxGearingServerUsingPost:

POSTを使ったサーバ連携
"""""""""""""""""""""""""""""""""""""""""""

| :ref:`ajaxGearingServerUsingGet`\ ではGETメソッドを使用した。
| POSTメソッドも利用できるが、サーバ側のCSRF対策に応じた実装が必要になる。ここでは、POSTメソッドを利用する場合の実装を紹介する。

| HTML（JSP）は、前述のサンプルに以下を追加する。

.. code-block:: html

  <!-- (1) -->
  <sec:csrfMetaTags />

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | JavaScriptからCSRFトークンを取得できるよう、head要素にSpring Securityの<sec:csrfMetaTags>要素を実装する。なお、同要素はHTMLに以下のmeta要素を出力する。

          .. code-block:: html

             <meta name="_csrf_parameter" content="_csrf" />
             <meta name="_csrf_header" content="X-CSRF-TOKEN" />
             <meta name="_csrf" content="0250c860-05d6-4a69-8dca-3d92681a2ee8" />

| JavaScriptは前述のサンプルに以下を追加する。

.. code-block:: javascript

  var csrfToken = $("meta[name='_csrf']").attr("content");
  var csrfHeaderName = $("meta[name='_csrf_header']").attr("content");

  // (1)
  $(document).ajaxSend(function(event, jqXHR, options) {
    jqXHR.setRequestHeader(csrfHeaderName, csrfToken);
  });

| また、\ `ajax`\ のオプションを以下に変更する。

.. code-block:: javascript

  // (2)
  type : 'POST'

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ `ajax`\ 実行時に関数を実行し、HTTPリクエストヘッダにCSRFトークンを設定する。
    * - | (2)
      - | \ ``$.ajax``\ の\ ``type``\ オプションをPOSTに修正する。
