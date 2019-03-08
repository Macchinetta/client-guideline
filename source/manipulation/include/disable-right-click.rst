.. _disable-right-click:

右クリック無効
================================================

.. _disable-right-click-outline:

概要
------------------------------------------------

ここでは、jQueryを用いて、右クリックを無効化する方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - `右クリック無効化 <../samples/jquery/disable-right-click.html>`_
     - \-

.. _disable-right-click-howtouse:

利用方法
------------------------------------------------

HTMLでは、jQueryと、右クリックを無効化するために実装したJavaScript(disable-right-click.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/disable-right-click.js"></script>

JavaScript(disable-right-click.js)では、\ ``contextmenu``\ イベントハンドラ内で、\ ``event.preventDefault``\ を実行することで、ウェブブラウザの標準動作（この例ではコンテキストメニューの表示）を停止している。

.. code-block:: javascript

  // disable-right-click.js

  'use strict';

  $(function () {

    $(document).on('contextmenu', function (event) {
      event.preventDefault();
    });

  });
