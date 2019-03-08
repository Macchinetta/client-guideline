.. _pagination:

ページネーション
================================================

.. _pagination-outline:

概要
------------------------------------------------

ここでは、SlickGridおよびtablesorterを用いて、テーブル表示データのページネーションを行う方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGridによるページネーションサンプル <../samples/slickgrid/pagination.html>`_
     - `SlickGrid Wiki <https://github.com/6pac/SlickGrid/wiki>`_
   * -  tablesorter
     - `tablesorterによるページネーションサンプル <../samples/tablesorter/pagination.html>`_
     - `jQuery plugin: Tablesorter 2.0 - Pager plugin <https://mottie.github.io/tablesorter/docs/example-pager.html>`_

.. _pagination-howtouse:

利用方法
------------------------------------------------

SlickGridによるページネーション
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-slickgrid`\ で示したHTMLに加え、次のモジュールを読み込む。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - モジュール名
     - 用途
   * - slick.dataview.js
     - データの表示条件を詳細に設定するための部品\ ``DataView``\ を提供する
   * - slick.pager.js
     - ページネーション操作を行うためのコントロール部品を提供する

また、ページネーションコントロールを表示する領域を追加する。
ただし、ページネーションコントロールの中身はライブラリが自動生成するため、HTMLにマークアップする必要はない。

以下に該当個所を抜粋する。それ以外は :ref:`basic-usages-slickgrid` で説明した基本構成と同じなので省略する。

.. code-block:: html

    <div id="border">

      <!-- SlickGridテーブルの表示領域となる要素 -->
      <div id="myGrid" class="grid" style="grid"></div>

      <!-- SlickGridページネーションコントロールの表示領域となる要素 -->
      <div id="pager"></div>
    </div>

JavaScript(pagination.js)では、ページ切り替え操作によって発生するイベントを監視し、データの表示範囲・件数を切り替えている。

.. literalinclude:: /_samples/samples/slickgrid/js/pagination.js
   :language: javascript

ソースコードリスト上の(1)で、データの表示条件を詳細に設定するための部品\ ``DataView``\ オブジェクトを生成し、
これに実際のデータ\ ``data``\ をセットしている。\ ``DataView``\ は ページネーションコントロールを作成する
\ ``Slick.Controls.Pager``\ コンストラクタを実行するために必要になる。

\(2)では\ ``Slick.Controls.Pager``\ コンストラクタを次のシグネチャに従って実行する。

.. js:function:: Slick.Controls.Pager(dataView, grid, $container)
   :noindex:

   :param DataView dataView: テーブルのデータ表示に用いられている\ ``DataView``\ オブジェクト
   :param SlickGrid grid: SlickGridテーブルオブジェクト
   :param jQuery $container: ページネーションコントロールを表示する要素を選択したjQueryオブジェクト

これにより、ページ切り替え操作によって\ ``dataView``\ 上で次のイベントが発生するようになる。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - イベント名
     - 発生契機
   * - \ ``onRowCountChanged``\
     - ページネーションコントロールでデータ表示行数が変更された際
   * - \ ``onRowsChanged``\
     - ページネーションコントロールでデータ表示行数が変更された際、またはページ送りされた際

これらのイベントを(3)および(4)で監視し、それぞれテーブル表示を更新している。

.. note::

   ページ切り替えのたびにリクエストする場合には、\ ``onRowsChanged``\ イベントのタイミングでAjaxリクエストを実行し、レスポンスで得たデータを\ ``dataView.setItems``\ メソッドを用いてセットすればよい。

.. note::

  jQuery v.3.2.0以降の `バグ <https://github.com/jquery/jquery/issues/3571>`_ により、ページネーションの\ Auto\を使用する際、表示行数が異なる可能性がある。
  jQuery内部で、width()かheight()を取得できない場合、offsetHeight/Widthを設定することで回避はしているものの、
  実際に取得できる値は同じではなく、offsetHeightはボーダーを含む高さであるため、
  \ Auto\選択時に表示される行数が表示領域に対して異なるという事象が発生します。


TableSorterを用いた表示データのページネーション
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

この例では、次のユーザインタフェースを設けることで実現する方法を説明する。

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - 表示設定の変更
     - 1ページに表示するデータ数の変更、ページ数の変更する部品を設ける。
   * - ページの移動
     - ページを移動するボタンを設ける。


.. figure:: ../images/pagination-tablesorter.png
   :alt: ページネーションのユーザインタフェース例
   :align: center

   **図: ページネーションのユーザインタフェース例**


:ref:`basic-usages-tablesorter`\ で示したHTMLに加え、次のモジュールを読み込む。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - モジュール名
     - 用途
   * - jquery.tablesorter.pager.js
     - ページネーション機能を提供する。

また、ページネーションコントロールを追加する。

以下に該当個所を抜粋する。それ以外は\ :ref:`basic-usages-tablesorter`\ で説明した基本構成と同じなので省略する。

.. literalinclude:: /_samples/samples/tablesorter/pagination.html
   :language: html
   :lines: 20-50

ページネーションコントロールの表示件数部品、ページ数選択部品は、次のクラスを持つ\ ``select``\ 要素で構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``pagesize``
     - 1ページあたりの表示件数を制御する。
   * - ``gotoPage``
     - ページを制御する。

表示件数部品は\ ``option``\ 要素で選択する値を明示する必要があるが、ページ選択部品の値は自動的に計算される。


ページネーションコントロールのページ移動部品は、次のクラスを持つ要素で構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``first``
     - 最初のページに移動するための要素に付与する。
   * - ``prev``
     - 1つ前のページに移動するための要素に付与する。
   * - ``pagedisplay``
     - 現在のページ数を表示する要素に付与する。
   * - ``next``
     - 1つ後のページに移動するための要素に付与する。
   * - ``last``
     - 最後のページに移動するための要素に付与する。



JavaScript(pagination.js)では、次の処理を行う。

* ページネーションを適用するテーブル要素をjQueryでセレクトし、\ ``tablesorter``\ メソッドを実行する。
* \ ``tablesorterPager``\ メソッドを実行する。その際\ ``container``\ プロパティに、ページネーションコントロールを表示する要素を選択したjQueryオブジェクトを指定する。

.. literalinclude:: /_samples/samples/tablesorter/js/pagination.js
   :language: javascript

\ ``tablesorterPager``\ メソッドで設定できるプロパティは他にも提供されている。これらの詳細について知りたい場合は、 `tablesorterの公式ウェブサイトのリファレンス <https://mottie.github.io/tablesorter/docs/index.html#pager-ajaxobject>`__ を参照すること。

.. note::
  ページ切り替え時にサーバから情報を取得することもできるが、その場合、クライアントでのソートができなくなるため、サーバサイドでソートを実装する必要がある。詳細は、 `tablesorterの公式ウェブサイトのリファレンス\ <https://mottie.github.io/tablesorter/docs/example-pager-ajax.html>`__\ を参照すること。
