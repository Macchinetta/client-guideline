.. _fixed-header:

ヘッダを固定したデータ行のスクロール
================================================

.. _fixed-header-outline:

概要
------------------------------------------------

ここでは、SlickGrid、tablesorterを用いてヘッダを固定してデータ行をスクロールする実装方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGridによるヘッダを固定したデータ行のスクロールサンプル <../samples/slickgrid/default.html>`_
     - `SlickGrid Wiki <https://github.com/mleibman/SlickGrid/wiki>`_
   * - tablesorter
     - `tablesorterによるヘッダを固定したデータ行のスクロールサンプル <../samples/tablesorter/fixed-header.html>`_
     - `jQuery plugin: Tablesorter 2.0 - Scroller Widget <https://mottie.github.io/tablesorter/docs/example-widget-scroller.html>`_


.. _fixed-header-howtouse:

利用方法
------------------------------------------------

SlickGridによるヘッダを固定したデータ行のスクロール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SlickGridは標準でヘッダが固定されるため、特別な考慮は不要である。よって\ :ref:`basic-usages-slickgrid`\ を参照すること。

tablesorterによるヘッダを固定したデータ行のスクロール
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-tablesorter`\ で示したHTMLに加え、次のモジュールを読み込む。それ以外は同様なので省略する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - モジュール名
     - 用途
   * - widget-scroller.js
     - ヘッダ固定機能を提供する。

JavaScript(fixed-header.js)では、テーブル要素に対し\ ``tablesorter``\ メソッドを実行する。ヘッダの\ ``thead``\ 要素を固定するためには\ ``tablesorter``\ メソッドのオプションである\ ``widgets``\ 配列に\ ``'scroller'``\ を追加する。

.. literalinclude:: /_samples/samples/tablesorter/js/fixed-header.js
   :language: javascript

\ ``widgetOptions``\ プロパティでテーブル要素の高さを設定できる\ ``scroller_height``\ などオプションが提供されている。これらの詳細について知りたい場合は、 `tablesorterの公式ウェブサイトのリファレンス <http://mottie.github.io/tablesorter/docs/example-widget-scroller.html>`__ を参照すること。
