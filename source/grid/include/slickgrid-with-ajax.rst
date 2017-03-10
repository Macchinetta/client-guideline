.. _slickgrid-with-ajax:

テーブルのスクロールによる非同期データ取得
================================================

.. _slickgrid-with-ajax-overview:

概要
------------------------------------------------

ここでは、SlickGridを用いて非同期通信でデータを取得し、テーブルに表示する方法を紹介する。

検索画面などで大量データをテーブルに表示する場合、全データを1度に表示するとクライアントやサーバに負荷が掛かる。そのため、初期表示に必要な分だけデータを取得し、以降はユーザー操作に合わせて非同期通信で取得するのが望ましい。

上記を実現するには、スクロール時に非同期通信でデータを取得し、SlickGridに関連付けられたデータ配列に追加してテーブルを再描画すればよい。概念的にはシンプルだが、非同期通信が頻発しないようある程度の件数をまとめて取得するなど、独自に作りこむ必要がある。


.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGridによる非同期データ取得サンプル <../samples/slickgrid/slickgrid-with-ajax.html>`_
     - `SlickGrid Wiki <https://github.com/mleibman/SlickGrid/wiki>`_


サンプルの動作イメージを示す。
下図は、初期表示時のテーブルを示している。

.. figure:: /images/slickgrid-with-ajax-before-scroll.png
   :alt: 初期表示時の表示範囲と取得範囲
   :align: center

   **図: 初期表示時の表示範囲と取得範囲**


前提として、本例ではテーブルの領域を以下に分類する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - 領域
     - 説明
   * - 表示範囲
     - テーブルのうち、画面に表示される範囲を示す。本例では20件とする。
   * - 取得範囲
     - 1度の非同期通信で取得する範囲を示す。本例では50件とする。

初期表示時は、取得範囲のデータを非同期通信で取得し、表示範囲のデータを画面に表示する。

次に、スクロール後のイメージを示す。

.. figure:: /images/slickgrid-with-ajax-after-scroll.png
   :alt: スクロール後の表示範囲と取得範囲
   :align: center

   **図: スクロール後の表示範囲と取得範囲**

スクロールによって表示範囲が取得範囲からはみ出している。この時点で次の取得範囲分のデータを非同期通信で取得する。


.. note::

   表示範囲の件数はテーブルの高さに依存する。高さを広げる場合、初期表示時にテーブルが空行にならないよう取得範囲を調整すること。

   また、取得範囲の件数が表示範囲に近いほど、非同期通信の頻度が高まる。システムの要件などを考慮し、取得範囲の件数を調整すること。


.. _slickgrid-with-ajax-howtouse:

利用方法
------------------------------------------------

SlickGridを利用した非同期データ取得の実装例を紹介する。

:ref:`basic-usages-slickgrid`\ に示したHTMLに加え、独自に実装した次のモジュールを読み込む。それ以外は同様なので省略する。

JavaScriptは以下を実装する。

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - モジュール名
     - 用途
   * - slickgrid-with-ajax.js
     - スクロールを監視し、非同期通信を行う関数を実行する。また、テーブルを描画する。
   * - slickgrid-remotemodel.js
     - 非同期通信でデータを取得する。

各JavaScriptの実装を説明する。

slickgrid-with-ajax.jsの実装を以下に示す。
なお、SlickGridのカラム定義、SlickGrid動作オプションは :ref:`basic-usages-slickgrid`\ のJavaScript(js/default.js)と同一であるため、省略する。

.. code-block:: javascript

  // slickgrid-with-ajax.js

  'use strict';

  (function () {

    $(function () {

      // SlickGridのカラム定義
      /* omitted */

      // SlickGrid動作オプション
      /* omitted */

      var grid;
      var loadingIndicator = null;

      // テーブルデータを非同期で取得するオブジェクト生成
      var loader = new Slickgrid.Data.RemoteModel();

      // 画面初期化処理
      $(function () {

        // SlickGridテーブルを作成
        grid = new Slick.Grid('#myGrid', loader.data, columns, options);

        // スクロール時に起動するイベント
        grid.onViewportChanged.subscribe(function () {

          // 開始位置・終了位置取得
          var vp = grid.getViewport();

          // データ取得関数実行
          loader.ensureData(vp.top, vp.bottom);
        });

        // ローディング中に起動するイベント
        loader.onDataLoading.subscribe(function () {

          // データ取得中であることを示すメッセージ出力
          if (!loadingIndicator) {
            loadingIndicator = $('<span><label>Buffering...</label></span>')
              .appendTo(document.body);

            // CSSの設定
            /* omitted */
          }
          loadingIndicator.show();
        });

        // ローディング後に起動するイベント
        loader.onDataLoaded.subscribe(function (e, args) {

          // 表示する行のみ有効化
          for (var i = args.from; i <= args.to; i++) {
            grid.invalidateRow(i);
          }
          grid.render();
          loadingIndicator.fadeOut();
        });

        // テーブル表示
        grid.onViewportChanged.notify();
      });
    });

  }());



slickgrid-with-ajax.jsには3つのイベントを実装する。各イベントの機能は以下の通り。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - イベント名
     - 説明
   * - onViewportChanged
     - スクロール時に発生する。テーブルの表示領域を\ ``grid.getViewport``\ で取得する。
   * - onDataLoading
     - 非同期通信中に発生する。データ取得中であることを示すインディケータを表示する。
   * - onDataLoaded
     - 非同期通信後に発生する。\ ``grid.invalidateRow``\ で再描画対象を設定し、\ ``grid.render``\ でテーブルを再描画する。完了後にインディケータを非表示にする。

|

次に、slickgrid-remotemodel.jsを説明する。
なお、ソースが長いため、途中で区切って解説を加える。

.. code-block:: javascript

  // slickgrid-remotemodel.js

  'use strict';

  (function () {
    function RemoteModel() {

      // 変数定義
      var PAGESIZE = 50;
      var data = {
        length : 1000
      };

\ ``PAGESIZE``\ は取得範囲の件数である。表示範囲の開始位置・終了位置を\ ``PAGESIZE``\ で除算することで、取得範囲上の位置（以降、ポインタとする）を得られる。また、非同期通信で取得するデータの件数などにも使用する。

\ ``data``\ はテーブルデータを格納する。


.. code-block:: javascript

      var hRequest = null;
      var req = null;

      // イベント
      var onDataLoading = new Slick.Event();
      var onDataLoaded = new Slick.Event();

      function init() {
      }

      // データ取得関数
      function ensureData(from, to) {

        // 非同期通信が実行中の場合、直前の処理を中断する
        if (req) {
          req.abort();
          for (var i = req.fromPage; i <= req.toPage; i++) {

            // 処理中のデータを削除する
            data[i * PAGESIZE] = null;
          }
        }

        // 開始位置が0以下の場合は0に補正する
        if (from < 0) {
          from = 0;
        }

        // 終了位置が上限以上の場合は上限値に補正する
        if (data.length > 0) {
          to = Math.min(to, data.length - 1);
        }

        // 開始位置・終了位置からポインタを算出する
        var fromPage = Math.floor(from / PAGESIZE);
        var toPage = Math.floor(to / PAGESIZE);

パラメータの\ ``from``\ ・\ ``to``\ には、テーブル表示の開始位置・終了位置が格納されいている。
\ ``PAGESIZE``\ で除算することでポインタを取得する。

.. code-block:: javascript

        // ポインタが異なる場合、位置を補正する
        while (!(data[fromPage * PAGESIZE] === null || data[fromPage * PAGESIZE] === undefined) &&
          fromPage < toPage) {
          fromPage++;
        }

        while (!(data[toPage * PAGESIZE] === null || data[toPage * PAGESIZE] === undefined) &&
          fromPage < toPage) {
          toPage--;
        }

スクロールによって表示範囲が取得範囲を跨った場合、ポインタを前後に補正する。

例えばテーブルを下方向にスクロールし、表示範囲がテーブルデータの40件目から60件目にある場合、開始位置のポインタは「0」、終了位置のポインタは「1」となる。

上記の場合は\ ``fromPage``\を加算し、後続の判定でポインタ「1」（テーブルデータの50件目から100件目の範囲）にデータが存在するかチェックする。

.. code-block:: javascript

        // 取得範囲のデータが取得済みか判定する
        if (fromPage > toPage ||
          (fromPage === toPage && !(data[fromPage * PAGESIZE] === null || data[fromPage *
            PAGESIZE] === undefined))) {

          // テーブルを再描画するイベントを発生させる
          onDataLoaded.notify({
            from : from,
            to : to
          });
          return;
        }

データの有無をチェックし、存在する場合はテーブルを再描画する。


.. code-block:: javascript

        // 非同期通信のURLを編集する
        var url = 'js/slickgrid-data.json';

非同期通信に使用するURLを編集する。

.. note::

   本例では\ ``url``\ を固定としている。サーバからデータを取得する場合は、データを絞り込むために開始位置や取得件数などをパラメータとして設定する。以下に例を示す。

     .. code-block:: javascript

        var url = "http://your.server.path/scroll?start=" + (fromPage * PAGESIZE) + "&limit=" + PAGESIZE);

.. code-block:: javascript

        // setTimeoutが実行中の場合、直前の処理を中断する
        if (hRequest !== null) {
          clearTimeout(hRequest);
        }

        // 非同期通信を実行する
        hRequest = setTimeout(function () {

          // データ取得中であることを示すイベントを発生させる
          onDataLoading.notify();

          // 非同期通信処理
          req = $.ajax({
            type : 'GET',
            url : url,
            dataType : 'json'
          }).done(function (data) {

            // データ配列を編集する
            onSuccess(data, fromPage);
          });

          // 中断時にデータを削除するために格納する
          req.fromPage = fromPage;
          req.toPage = toPage;
        }, 100);
      }

スクロールはマウスホイールによって連続的に実行される可能性があるため、\ ``setTimeout``\ で一定時間待機後に非同期通信を実行する。

.. code-block:: javascript

      // データ編集を行う関数
      function onSuccess(resp, fromPage) {
        var from = fromPage * PAGESIZE, to = from + resp.results.length;

        // 取得したデータをdataに格納する
        for (var i = 0; i < resp.results.length; i++) {
          var item = resp.results[i].item;

          data[from + i] = item;
          data[from + i].index = from + i;
        }

        req = null;

        // テーブルを再描画するイベントを発生させる
        onDataLoaded.notify({
          from : from,
          to : to
        });
      }

      init();

      return {

        // プロパティ
        'data' : data,

        // 関数
        'ensureData' : ensureData,

        // イベント
        'onDataLoading' : onDataLoading,
        'onDataLoaded' : onDataLoaded
      };
    }

    // Slick.Data.RemoteModel
    $.extend(true, window, {
      Slick : {
        Data : {
          RemoteModel : RemoteModel
        }
      }
    });
  }());


最後に取得したデータを\ ``data``\ に格納し、テーブルを再描画する。

.. note::

   本例ではテーブルの表示件数を1000件に固定している。必要に応じて\ ``data.length``\ に任意の数値を設定すること。

.. note::

   本例ではデータの変動（追加・変更・削除）を考慮していない。取得したデータはクライアント側でキャッシュするため、サーバ側でデータが変動すると齟齬が生じる。非同期通信時にクライアント・サーバ間のデータをチェックするなど、変動を前提とした実装を考慮すること。
