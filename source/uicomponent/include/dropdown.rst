.. _dropdown:

ドロップダウンリスト
================================================

.. _dropdown-outline:

概要
------------------------------------------------

| ここでは、ボタンクリック時にメニューのリストを表示する方法を説明する。

.. figure:: /images/dropdown.png
   :alt: dropdown
   :align: center

   **図: ドロップダウンリストの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - `セレクトメニュー <../samples/jquery-ui/selectmenu.html>`_
     - `Selectmenu | jQuery UI <https://jqueryui.com/selectmenu/>`_
   * - Bootstrap
     - `ドロップダウンリスト <../samples/bootstrap/dropdownmenu.html>`_
     - `Components - Bootstrap #dropdowns <https://getbootstrap.com/docs/3.3/components/#dropdowns>`_

.. _selectmenu-howtouse:

利用方法(jQuery UI)
------------------------------------------------

| ここでは、jQuery UIを用いた実装方法を説明する。
| jQuery UIでは、セレクトメニューという名称のWidgetとして実装されている。

.. _selectmenuBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、セレクトメニューを構成する表示領域を追加する。

.. code-block:: html

  <label for="selectmenu">アカウント管理</label>

  <!-- (1) -->
  <select name="selectmenu" id="selectmenu">

    <!-- (2) -->
    <option>ユーザ情報登録</option>
    <option>ユーザ情報編集</option>
    <option>ユーザ情報削除</option>
    <option>パスワード変更</option>
  </select>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | セレクトメニューのボタンとなるselect要素を作成し、id属性に\ ``selectmenu``\ を指定する。
    * - | (2)
      - | セレクトメニューの項目をoption要素で指定する。

| JavaScriptは以下の通り実装する。

.. code-block:: javascript

  // selectmenu.js

  'use strict';

  // (1)
  $(function () {
    $('#selectmenu').selectmenu({
      width: 200
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | セレクトメニューを生成する対象に対して、\ ``selectmenu``\ メソッドを実行する。このサンプルではオプションの\ ``width``\ で横幅を指定している。

.. _dropdown-howtouse:

利用方法(Bootstrap)
------------------------------------------------

| ここでは、Bootstrapを用いた実装方法を説明する。

.. _dropdownBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-bootstrap`\ で示したソースコードに、次の内容を追加する。

.. code-block:: html

  <!-- (1) -->
  <div class="dropdown">

    <!-- (2) -->
    <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      manage account <span class="caret"></span>
    </button>

    <!-- (3) -->
    <ul class="dropdown-menu">
      <li><a href="#">ユーザ情報登録</a></li>
      <li><a href="#">ユーザ情報編集</a></li>
      <li><a href="#">ユーザ情報削除</a></li>
      <li class="divider" role="separator"></li>
      <li><a href="#">パスワード変更</a></li>
    </ul>
  </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ドロップダウンリスト全体の領域を定義する。
    * - | (2)
      - | ドロップダウンリストを開閉するボタンを設置する。
    * - | (3)
      - | ドロップダウンリストの中身を定義する。

ドロップダウンリストを開閉するボタンは、次の属性を持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - 属性
     - 値
   * - ``data-toggle``
     - ``dropdown``\ (固定)

ドロップダウンリストは、次のクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``dropdown``
     - 必須
   * - ``dropdown-toggle``
     - 必須。これを指定した要素がドロップダウンリストを開閉するボタンになる。
   * - ``dropdown-menu``
     - 必須。これを指定した要素がドロップダウンリストになる。
