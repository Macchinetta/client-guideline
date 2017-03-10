.. _breadcrumb:

パンくずリスト表示
================================================

.. _breadcrumb-overview:

概要
------------------------------------------------

パンくずリスト表示とは、利用者に表示ページの現在位置を知らせ、操作を助ける表示である。

ここでは、Bootstrapを用いた実装方法を説明する。

.. figure:: /images/breadcrumb-list.png
   :alt: breadcrumb
   :align: center

   **図: パンくずリストの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - Bootstrap
     - `パンくずリスト表示 <../samples/bootstrap/breadcrumb.html>`_
     - `Components - Bootstrap #breadcrumbs <http://getbootstrap.com/components/#breadcrumbs>`_

.. _breadcrumb-howtouse:

利用方法
------------------------------------------------

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

  <!-- (1)  -->
  <ol class="breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">Library</a></li>
    <li class="active">Data</li>
  </ol>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | パンくずリストの領域を定義する。

パンくずリストは、次のクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``breadcrumbs``
     - 必須
   * - ``active``
     - 必須。現在のページを表す。
