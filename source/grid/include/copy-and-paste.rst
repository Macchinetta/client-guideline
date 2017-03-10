.. _copy-and-paste:

コピーアンドペースト編集
================================================

.. _copy-and-paste-outline:

概要
------------------------------------------------

ここでは、SlickGridを用いて、テーブルのデータのコピーアンドペーストによる編集を行う方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGridによるコピーアンドペースト編集サンプル <../samples/slickgrid/copy-and-paste.html>`_
     - `SlickGrid Wiki <https://github.com/mleibman/SlickGrid/wiki>`_

.. _copy-and-paste-howtouse:

利用方法
------------------------------------------------

:ref:`basic-usages-slickgrid`\ で示したHTMLに加え、次のモジュールを読み込む。それ以外は同様なので省略する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - モジュール名
     - 用途
   * - slick.cellcopymanager.js
     - コピーアンドペースト機能を提供する
   * - slick.cellrangeselector.js
     - セル選択機能を提供する
   * - slick.cellrangedecorator.js
     - セル選択機能を提供する
   * - slick.cellselectionmodel.js
     - セル選択機能を提供する

JavaScript(copy-and-paste.js)では、コピーアンドペースト操作によって発生するイベントを監視し、データのコピーとテーブルの再描画を行う。

.. literalinclude:: /_samples/samples/slickgrid/js/copy-and-paste.js
   :language: javascript

ソースコードリスト上の(1)で、セル選択機能を提供するプラグインを設定している。また(2)でコピーアンドペースト機能を提供するプラグインを設定している。これによってコピーアンドペースト操作によって\ ``onPasteCells``\ イベントが発生するようになるため、これを(3)で監視し、データのコピー後、テーブルの表示を更新している。
