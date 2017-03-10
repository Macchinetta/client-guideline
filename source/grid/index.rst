.. include:: /variable-declaration.rst

.. _table-index:

テーブル
********************

この章では、テーブルのライブラリであるSlickGrid、tablesorterを用いた実装例を説明する。

それぞれのライブラリが実現できる機能は、次の表の通りである。

.. role:: text-red
.. role:: text-green
.. list-table:: ライブラリが実現できる機能
   :header-rows: 1
   :widths: 40 30 30

   * - 機能
     - SlikGrid
     - tablesorter
   * - 行追加・削除・編集
     - :text-green:`✔`
     - :text-green:`✔`
   * - 行の並び替え
     - :text-green:`✔`
     - :text-red:`✗`
   * - ヘッダを固定したデータ行のスクロール
     - :text-green:`✔`
     - :text-green:`✔`
   * - ページネーション
     - :text-green:`✔`
     - :text-green:`✔`
   * - ソート
     - :text-green:`✔`
     - :text-green:`✔`
   * - カラムの並び替え
     - :text-green:`✔`
     - :text-red:`✗`
   * - コピーアンドペースト編集
     - :text-green:`✔`
     - :text-red:`✗`
   * - テーブルのスクロールによる非同期データ取得
     - :text-green:`✔`
     - :text-red:`✗`

どちらのライブラリを使用するかは、上に示した機能や、特徴 (\ :ref:`SlickGrid概要 <libraries-overview-slickgrid>`\ および\ :ref:`tablesorter概要 <libraries-overview-tablesorter>`\ ) を参考にして判断すること。

また、SlickGridとBootstrapを同時に使用する場合、\ :ref:`付録の注意点 <grid-notice>`\ を考慮すること。

.. note::

   SlickGridはテーブルのセル数に応じてDOMが変化する。また、スクロールを行い表示内容が変化するタイミングでDOMの書き換えが発生する。
   テーブルのセル数が多い場合、スクロール操作の度に多数のDOMを書き換える必要があり、大きなオーバーヘッドが発生することがあるため、十分に検証を行った上で採用すること。


.. ライブラリの基本的な使用方法
.. include:: include/basic-usages.rst

.. 行追加・削除・編集
.. include:: include/insert-and-delete-row.rst

.. 行の並び替え
.. include:: include/move-row.rst

.. ヘッダを固定したデータ行のスクロール
.. include:: include/fixed-header.rst

.. ページネーション
.. include:: include/pagination.rst

.. ソート
.. include:: include/sort.rst

.. カラムの並び替え
.. include:: include/swap-columns.rst

.. コピーアンドペースト編集
.. include:: include/copy-and-paste.rst

.. テーブルのスクロールによる非同期データ取得
.. include:: include/slickgrid-with-ajax.rst
