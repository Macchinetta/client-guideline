.. _grid-notice:

BootstrapとSlickGridを同時に使用する際の注意点
------------------------------------------------------

ここでは、BootstrapとSlickGridを同時に使用する際の注意点を説明する。

.. _grid-solution-label:

スタイル競合によるテーブルの表示崩れ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

スタイル競合によりテーブルの表示が崩れる。

`不具合事象サンプル <samples/bootstrap-and-slickgrid-header/header-before.html>`__

.. figure:: images/styles-competion-example.png
   :alt: ヘッダとデータ行がずれる例
   :align: center

   **図: ヘッダとデータ行がずれる例**

SlickGridでは、\ ``box-sizing``\プロパティの値が\ ``content-box``\ であることを前提にセルの幅と高さを計算してレイアウトを生成するが、Bootstrapはすべての要素に対して\ ``box-sizing``\ プロパティの値に\ ``border-box``\ を設定する。その結果、SlickGridとBootstrapの併用時にテーブルの表示が崩れる。

.. note::
  \ ``border-box``\ は、髙さと幅のプロパティである\ ``width``\ 、\ ``height``\ に線の幅とパディングを含める設定（\ ``width``\ 、\ ``height``\ が画面上の表示サイズと等しい）である。一方で\ ``content-box``\ は線の幅とパディングを含めない設定（\ ``width``\ 、\ ``height``\ に線の幅とパディングを含めたものが画面上の表示サイズと等しい）である。

この事象に対して、ヘッダーとデータ行のセルの\ ``box-sizing``\プロパティの値を\ ``content-box``\ にすることで対処する。
具体的には、ヘッダーのセルにSlickGridによって設定される\ ``.slick-header-column.ui-state-default``\ とデータ行のセルに設定される\ ``.slick-cell``\ に値を設定する。


.. code-block:: css

  .slick-header-column.ui-state-default {
    box-sizing: content-box;
  }

  .slick-cell {
    box-sizing: content-box;
  }


対処後は崩れが解消される。

`対処済みサンプル <samples/bootstrap-and-slickgrid-header/header-after.html>`__

.. figure:: images/styles-competion-solution.png
   :alt: 対処後の例
   :align: center

   **図: 対処後の例**

上記では、ライブラリのスタイルシート、JavaScriptへの変更を行わずに独自に作成したスタイルシートで対処を実施しているが、他にも方法が議論されているため、必要に応じて参照すること。

* \ `Support the "box-sizing: border-box;" css rule for column headers #699 <https://github.com/mleibman/SlickGrid/issues/699>`_\
* \ `Conflict with bootstrap 3 #742 <https://github.com/mleibman/SlickGrid/issues/742>`_\

タブ内へのテーブル表示の際の表示崩れ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

初期状態で選択されていないタブのペイン内にテーブルを表示する場合、タブを切り替えてテーブルを表示すると右側のカラムが途中で欠ける場合がある。

これは、タブのペインが\ ``display: none``\ で非表示となっていることで、SligkGridがレイアウトする際に幅を計算できないことが原因である。

`公式ページ <http://mleibman.github.io/SlickGrid/examples/example-explicit-initialization.html>`_\ でも\ ``display: none``\ では正確に計算できないと記載がある。

`不具合事象サンプル <samples/bootstrap-and-slickgrid-tab/tab-before.html>`__

.. figure:: images/celldata-vanishing-example.png
   :alt: タブのペイン内にテーブル表示時、右側のカラムが欠ける例
   :align: center

   **図: タブのペイン内にテーブル表示時、右側のカラムが欠ける例**

この事象に対して、初期表示時にテーブルを生成するのではなく、タブ切り替え時に初めてテーブルを作成するようにすることで対処する。
具体的には、Bootstrapの\ ``nav-tab``\ タブクリック時のイベントである、\ ``shown.bs.tab``\ を契機にテーブルを作成する処理を実装する。

:ref:`basic-usages-slickgrid`\ のdefault.jsで実装している画面初期化処理を次のように実装する。

.. code-block:: javascript

    $('#tab2btn').one('shown.bs.tab', function () {
      new Slick.Grid('#myGrid', data, columns, options);
    });

対処後は正常に表示される。

`対処済みサンプル <samples/bootstrap-and-slickgrid-tab/tab-after.html>`__

.. figure:: images/celldata-vanishing-solution.png
   :alt: 対処後の例
   :align: center

   **図: 対処後の例**
