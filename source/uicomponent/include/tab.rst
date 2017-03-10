.. _tab:

タブ
================================================

.. _tabsOutline:

概要
------------------------------------------------

| タブとは、複数の表示領域(以降、パネル)を切り替えて使用する際の、それぞれのパネルの見出しのことを指す。

.. figure:: /images/tabs.png
   :align: center
   :alt: タブの例

   **図: タブの例**

| ここでは、jQuery UIとBootstrapそれぞれで、タブを表示する方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - - `基本的なタブ <../samples/jquery-ui/tabs.html>`__
       - `下付きタブ <../samples/jquery-ui/tabs-bottom.html>`_
       - `左付きタブ <../samples/jquery-ui/tabs-left.html>`_
     - `Tabs | jQuery UI <http://jqueryui.com/tabs/>`_
   * - Bootstrap
     - - `マークアップ形式のタブ <../samples/bootstrap/tab.html>`_
     - `JavaScript - Bootstrap #tabs <http://getbootstrap.com/javascript/#tabs>`_

| 本ガイドラインおよびサンプルで紹介するプロパティ以外にもプロパティが提供されている。これらの詳細について知りたい場合は、上記のjQuery UIおよびBootstrapの公式サイトを参照すること。

.. _tabsHowToUse:

利用方法(jQuery UI)
------------------------------------------------

.. _tabsBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、タブとパネルを表示する領域を追加する。
| タブおよびパネル表示用の領域をdivで作成し、div内にタブ領域をul要素、パネルをdiv要素で配置する。
| タブ領域内に配置する各タブはli要素で作成する。
| 各タブには、a要素で#を付与したパネルを表すdiv要素のid値をリンク先として指定することで、タブとパネルを紐付ける。

.. code-block:: html

    <!-- (1) -->
    <div id="tabs">
      <!-- (2) -->
      <ul>
        <li><a href="#tabs-1">タブ１</a></li>
        <li><a href="#tabs-2">タブ２</a></li>
        <li><a href="#tabs-3">タブ３</a></li>
      </ul>
      <!-- (3) -->
      <div id="tabs-1">
        <p>タブ１のパネルを表示します。</p>
      </div>
      <!-- (3) -->
      <div id="tabs-2">
        <p>タブ２のパネルを表示します。</p>
      </div>
      <!-- (3) -->
      <div id="tabs-3">
        <p>タブ３のパネルを表示します。</p>
      </div>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | タブ全体の領域を定義する。
    * - | (2)
      - | タブ領域の見出し部分をリストで定義する。
    * - | (3)
      - | タブ選択時に表示するパネル部分を定義する。

.. code-block:: javascript

  // tabs.js

  'use strict';

  $(function () {

    // (1)
    $('#tabs').tabs({
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ ``tabs``\ メソッドを実行する。


タブの表示位置変更
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQuery UIのタブの表示位置はパネルの下側・左側・右側に変更できる。
| 表示位置の変更は、タブ領域の移動と、タブのスタイル変更(タブ間隔やタブの形など)で実現する。
| ここでは、タブ領域の移動のみ、実装方法を紹介する。
|
| なおサンプルではタブのスタイル変更も行っている。必要に応じて、サンプルのソースコードを参照し、スタイルを変更すること。

.. _tabsBottom:

下付きタブ
""""""""""""""""""""""""""""""""""""""""""""""""

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、タブとパネルを表示する領域を追加する。

.. code-block:: html

    <!-- (1) -->
    <div id="tabs" class="tabs-bottom">
      <ul>
        <li><a href="#tabs-1">タブ１</a></li>
        <li><a href="#tabs-2">タブ２</a></li>
        <li><a href="#tabs-3">タブ３</a></li>
      </ul>
      <div id="tabs-1">
        <p>タブ１のパネルを表示します。</p>
      </div>
      <div id="tabs-2">
        <p>タブ２のパネルを表示します。</p>
      </div>
      <div id="tabs-3">
        <p>タブ３のパネルを表示します。</p>
      </div>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | タブ全体の領域を定義する。class属性値に独自に実装したCSS(\ ``tabs-bottom``\ )を指定する。

| JavaScript(tabs-bottom.js)で、次の処理を実行する。

.. code-block:: javascript

   // tabs-bottom.js

   'use strict';

   $(function () {

     // (1)
     $('#tabs').tabs({
     });

     // (2)
     $('.tabs-bottom .ui-tabs-nav').appendTo('#tabs');
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ ``tabs``\ メソッドを実行する。
    * - | (2)
      - | タブ領域を下部に移動する。

| なお、サンプルでは上記以外にスタイルを調整するための実装をしている。サンプルのソースコードを参照すること。

.. _tabsLeft:

左付きタブ
""""""""""""""""""""""""""""""""""""""""""""""""

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、タブとパネルを表示する領域を追加する。

.. code-block:: html

    <!-- (1) -->
    <div id="tabs" class="tabs-left ui-helper-clearfix">
      <ul>
        <li><a href="#tabs-1">タブ１</a></li>
        <li><a href="#tabs-2">タブ２</a></li>
        <li><a href="#tabs-3">タブ３</a></li>
      </ul>
      <div id="tabs-1">
        <p>タブ１のパネルを表示します。</p>
      </div>
      <div id="tabs-2">
        <p>タブ２のパネルを表示します。</p>
      </div>
      <div id="tabs-3">
        <p>タブ３のパネルを表示します。</p>
      </div>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | タブ全体の領域を定義する。class属性値に独自に実装したCSS(\ ``tabs-left``\ )を指定する。

| CSS(tabs-left.css)で、タブ領域を左側に設定する。

.. code-block:: css

   /* (1) */
   .tabs-left .ui-tabs-nav {

     /* (2) */
     float: left;
   }

   /* (3) */
   .tabs-left .ui-tabs-nav .ui-state-default {

     /* (4) */
     width: 100%;
   }

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | タブ領域の設定を定義する。
    * - | (2)
      - | 領域を左に寄せる。
    * - | (3)
      - | タブの設定を定義する。
    * - | (4)
      - | タブを縦に並べるために幅を100%に設定する。

| なお、サンプルでは上記以外にスタイルを調整するための実装をしている。サンプルのソースコードを参照すること。

.. note::

   右付きタブを作成する場合は、.ui-tabs-navセレクタのfloat属性値を\ ``right``\ に設定することで実現する。

   ただし、スタイルについては左付きタブの設定を参考に適宜修正すること。

.. _tabs-bootstrapHowToUse:

利用方法(Bootstrap)
------------------------------------------------

.. _tabs-bootstrap:

Bootstrap（マークアップ形式）のタブ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ここでは、Bootstrapを用いた実装方法を説明する。

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

      <!-- (1) -->
      <ul class="nav nav-tabs" role="tablist">
        <li class="active" role="presentation"><a href="#tab1" data-toggle="tab" role="tab">タブ１</a></li>
        <li role="presentation"><a href="#tab2" data-toggle="tab" role="tab">タブ２</a></li>
      </ul>

      <!-- (2) -->
      <div class="tab-content">
        <div class="tab-pane active" id="tab1" role="tabpanel">
          <p>コンテンツ１</p>
        </div>
        <div class="tab-pane" id="tab2" role="tabpanel">
          <p>コンテンツ２</p>
        </div>
      </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | タブ領域の見出し部分をリストで定義する。
    * - | (2)
      - | タブ選択時に表示するパネル部分を定義する。

タブ部品は、次の属性とクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - 属性
     - 値
   * - ``data-toggle``
     - ``tab``\ (固定)
   * - ``href``
     - 表示するペインのセレクタ

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``nav``
     - 必須
   * - ``nav-tabs``
     - 必須
   * - ``active``
     - 必須。これを設定したタブが選択状態で表示される。

ペイン部品は、次のクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``tab-content``
     - 必須
   * - ``tab-pane``
     - 必須。単一のペインを表す。複数設定することができる。
   * - ``active``
     - 必須。これを設定したペインが選択状態で表示される。
