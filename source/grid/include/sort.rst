.. _sort:

ソート
================================================

.. _sort-outline:

概要
------------------------------------------------

ここでは、SlickGridおよびtablesorterを用いて、テーブルのデータのソートを行う方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGridによるソートサンプル <../samples/slickgrid/sort.html>`_
     - `SlickGrid Wiki <https://github.com/6pac/SlickGrid/wiki>`_
   * - tablesorter
     - `tablesorterによるソートサンプル <../samples/tablesorter/default.html>`_
     - `jQuery plugin: Tablesorter 2.0 - Scroller Widget <https://mottie.github.io/tablesorter/docs/example-widget-scroller.html>`_

.. _sort-howtouse:

利用方法
------------------------------------------------

SlickGridによるソート
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

HTMLは\ :ref:`basic-usages-slickgrid`\ で説明した基本構成と同様なので、省略する。

JavaScript(sort.js)では、ヘッダのクリック操作からソートイベントを発生させ、ソート処理を実行する。

.. literalinclude:: /_samples/samples/slickgrid/js/sort.js
   :language: javascript

ソート機能の実現は、ユーザインタフェース部とデータ表示ルール変更部から成り立つ。

ユーザインタフェース部は、ソースコードリスト上の(1)・(5)で実現している。
(1)でカラム定義のオプション\ ``sortable``\ を\ ``true``\ にすることで、ヘッダがクリックされた際にスタイルの変更や
\ ``onSort``\ イベントが発生するようになる。このイベントを(5)で監視し、クリックされたヘッダのカラムを基に
ソート設定を書き換え、テーブル全体を再描画している。

データ表示ルール変更部は、(2)・(3)・(4)で実現している。
(4)で示すように、\ ``Slick.Grid``\ コンストラクタの第2引数に、データの配列の代わりに\ ``getLength``\ と\ ``getItem``\ 関数を持つオブジェクトを指定している。こうすることで、テーブルの各行には\ ``getItem``\ 関数の返すデータが表示されるようになる。

\ ``getItem``\ 関数は(3)で定義している。引数\ ``index``\ は表示行のインデックス番号を受け取るので、これを用いて、
あらかじめ(2)で作成しておいたインデックスからソート設定に基づいてデータを引き当てている。

.. note::
  この例では、ソートのためのインデックス作成とデータ引き当てについて複雑な実装を行っている。
  これはパフォーマンスを考慮したためである。

  最もシンプルな実装は、\ ``onSort``\ イベントハンドラ内で、 クリックされたカラムの値をもとに\ ``data``\ 配列を
  逆順ソートすることである。この実装の場合、データ長が数千件ならよいが、数万件以上に及んだ場合には
  ソートを実行する度に大きなオーバーヘッドが発生する。

  SlickGridの主要な用途の一つに大量データ表示が挙げられるため、ここでは大量データ表示に耐えうる
  ソートの実装を例示した。


tablesorterによるソート
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

tablesorterは標準でデータのソートが可能なため、特別な考慮は不要である。よって :ref:`basic-usages-tablesorter` を参照すること。

なお、tablesorterは、デフォルトの設定で数値か文字かを自動的に判別しソートできる。
また、複合キーによるソートが可能であり、Shiftキーを押した状態でのソートの操作、またはJavaScriptの実装により、実現できる。
詳細は\ `tablesorterの公式ウェブサイトのリファレンス <https://mottie.github.io/tablesorter/docs/example-trigger-sort.html>`__\ を参照すること。

.. note::
   標準で提供されているソート機能を無効化したい場合は、無効化したいカラムの\ ``th``\ 要素に対して、\ ``data-sorter=false``\ の属性を設定する。
