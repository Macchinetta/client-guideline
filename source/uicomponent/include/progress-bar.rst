.. _progress-bar:

プログレスバーによる進捗度表示
================================================

.. _progress-bar-overview:

概要
------------------------------------------------

| プログレスバーとは、処理の進捗状況をユーザに対して視覚的・直感的に表示するために利用するユーザインターフェースの1つである。
| ここでは、jQuery UIとBootstrapそれぞれで、プログレスバーを表示する方法を説明する。

.. figure:: /images/progressbar.png
   :alt: progressbar
   :align: center

   **図: プログレスバーの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - `プログレスバー(jQuery UI) <../samples/jquery-ui/progressbar.html>`__
     - `JavaScript - jQuery UI #progressbar <https://jqueryui.com/progressbar/>`__
   * - Bootstrap
     - `プログレスバー(Bootstrap) <../samples/bootstrap/progressbar.html>`__
     - `JavaScript - Bootstrap #progress <http://getbootstrap.com/components/#progress>`__


.. _progress-bar-jqueryui:

利用方法(jQuery UI)
------------------------------------------------

| jQuery UIのプログレスバーを使用するためには、jQuery UIのスタイルシートを読み込み、\ ``div``\ 要素を使用しプログレスバーを表示する領域を作成する。
| :ref:`basic-usages-jqueryui`\ で示したHTMLに以下のプログレスバーの領域を追加する。

.. code-block:: html

  <!-- (1) -->
  <div id="progressbar-area">
    <div id="progressbar">
      <!-- (2) -->
      <div class="progress-label">Loading...</div>
    </div>
  </div>


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | プログレスバーを表示するための領域を設置する。
    * - | (2)
      - | プログレスバーに表示するラベルの領域を設置する。


| JavaScriptでは、HTMLで設置したプログレスバーの領域に対して\ ``.progressbar``\ を実装し、各種プロパティを設定することでプログレスバーを作成・操作する。
| 以下にJavaScriptの実装のサンプルを示す。

.. code-block:: javascript

  // progressbar.js

  'use strict';

  $(function () {
    var progressbar = $('#progressbar');
    var progresslabel = $('.progress-label');
    var progressTimer;

    // (1)
    $('#execute-progressbar').on('click', function () {
      progressTimer = progress();
    });

    // (2)
    $('#reset-progressbar').on('click', function () {
      clearTimeout(progressTimer);
      progressbar.progressbar('value', false);
      progresslabel.text('Loading...');
    });

    // (3)
    progressbar.progressbar({
      value: false, // (A)
      max: 150, // (B)
      change: function () { // (C)
        progresslabel.text(progressbar.progressbar('value') + '/150');
      },
      complete: function () { // (D)
        progresslabel.text('Complete!');
      }
    });

    // (4)
    function progress() {
      var val = progressbar.progressbar('value') || 0;
      progressbar.progressbar('value', val + 1);

      if (val < 150) {
        progressTimer = setTimeout(progress, 50);
      }
    }

  });


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 処理開始ボタン押下時の挙動を定義する。
    * - | (2)
      - | リセットボタン押下時の挙動を定義する。
    * - | (3)
      - | プログレスバーの定義を実装する。使用しているオプションは以下の通り。

	.. table::

	   ========= ================ ====================================================================================================
	    項番      オプション名     説明
	   ========= ================ ====================================================================================================
	    \(A\)     \ ``value``\     プロパティの値に\ ``false``\ を設定することでプログレスバーの初期状態を不定とする。
	    \(B\)     \ ``max``\       プログレスバーの最大値を指定する。省略時は100が設定される。
	    \(C\)     \ ``change``\    プログレスバーの\ ``value``\ の値が変更された際に実行する処理を定義する。
	    \(D\)     \ ``complete``\  プログレスバーの\ ``value``\ の値が\ ``max``\ の値に達した際に実行する処理を定義する。
	   ========= ================ ====================================================================================================

        |
    * - | (4)
      - | プログレスバーの\ ``value``\ の値を更新するための処理を実装する。
        | ``value``\ の値は(3)で初期状態に\ ``false``\ を指定しているため、取得した値が\ ``false``\ の可能性がある。\ ``false``\ の場合は0を設定するよう実装する。
        | プログレスバーの\ ``value``\ の値を更新するには\ ``.progressbar``\ メソッドの第1引数に'value'（固定）を指定し、第2引数に更新する値を設定する。設定完了後に\ ``change``\ イベントが実行される。


.. note::
  進捗をパーセンテージで表示したい場合は実装を\ ``progresslabel.text(progressbar.progressbar('value')/150 * 100 '%');``\ のように修正することで可能となる。

.. _progress-bar-bootstrap:

利用方法(Bootstrap)
------------------------------------------------

ここでは、Bootstrapを用いて、10秒で完了になるプログレスバーを表示する方法を説明する。

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

  <!-- (1) -->
  <div class="progress">
    <div class="progress-bar" id="progressbar" role="progressbar"></div>
  </div>


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | プログレスバーを表示するための領域を設置する。領域を構成するクラスは以下の通り。

	.. table::

	   ================== ==========
	   クラス              備考
	   ================== ==========
	   ``progress``        必須
	   ``progress-bar``    必須
	   ================== ==========

        |



プログレスバーの進行度を動的に変更するためには、JavaScriptで\ ``progress-bar``\ クラスの要素に対し、スタイルの\ ``width``\ の値を変更する。

.. code-block:: javascript

  // progressbar.js

  'use strict';

  $(function () {

    // (1)
    var estimatedRatio = 0;
    var $progressBar = $('#progressbar');
    var progress = setInterval(function () {
      $progressBar.css('width', estimatedRatio + '%');
      if (estimatedRatio >= 100) {
        clearInterval(progress);
      }
      estimatedRatio += 10;
    }, 1000);
  });


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | プログレスバーのwidthを1秒ごとに10%増やすための実装。
