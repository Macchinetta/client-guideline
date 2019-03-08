.. _drag-and-drop:

ドラッグアンドドロップ
================================================

.. _drag-and-drop-overview:

概要
------------------------------------------------

ここでは、jQuery UIを用いて、ドラッグアンドドロップによるイベントを検知する方法と、リストの要素を入れ替える方法を説明する。

.. list-table::
    :header-rows: 1
    :widths: 20 40 40

    * - |using-library-name|
      - |sample|
      - |reference-page|
    * - jQuery UI
      - * `ドラッグアンドドロップ <../samples/jquery-ui/drag-and-drop.html>`_
        * `リストでのドラッグアンドドロップ <../samples/jquery-ui/drag-and-drop-sortable.html>`_
      - * `draggable | jQuery UI <https://jqueryui.com/draggable/>`_
        * `droppable | jQuery UI <https://jqueryui.com/droppable/>`_
        * `sortable | jQuery UI <https://jqueryui.com/sortable/>`_

.. _drag-and-drop-howtouse:

利用方法
------------------------------------------------

.. _drag-and-drop-basic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-jqueryui`\ で示したHTMLに加え、ドラッグする要素とドラッグ先の要素を追加する。

.. code-block:: html

  <!-- (1) -->
  <div id="drag1" class="drag">ドラッグする要素A</div>
  <div id="drag2" class="drag">ドラッグする要素B</div>
  <div id="drag3" class="drag">ドラッグする要素C</div>

  <hr>

  <!-- (2) -->
  <div class="drop">drag and drop it here<br/></div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ドラッグする要素を定義する。
    * - | (2)
      - | ドラッグ先を設置する。

JavaScript(drag-and-drop.js)では、次の処理を行っている。

.. code-block:: javascript

  // drag-and-drop.js

  'use strict';

  $(function () {

    // (1)
    $('.drag').draggable({

      // (2)
      cursor: 'move',

      // (3)
      helper: 'clone'
    });

    // (4)
    $('.drop').droppable({
      drop: function (e, ui) {
        var $this = $(this);
        $this
          .append(document.createTextNode(ui.draggable.text() + 'がカートに入れられました。'))
          .append('<br>');
      }
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ドラッグする要素に対し、draggableメソッドを実行する。
    * - | (2)
      - | マウスカーソルの形状を設定する。
    * - | (3)
      - | ドラッグ時の要素の表示設定をする。
    * - | (4)
      - | ドラッグ先に対し、droppableメソッドを実行する。

上記のサンプルでは\ ``draggable``\ メソッドのプロパティにマウスカーソルの形状を指定する\ ``cursor``\ や、ドラッグの際の動作を設定する\ ``helper``\ を使用している。
これらの詳細について知りたい場合は、`jQuery UI 公式ウェブサイトのリファレンス\ <https://api.jqueryui.com/draggable/>`__\ を参照すること。


リストでのドラッグアンドドロップ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-jqueryui`\ で示したHTMLに加え、ドラッグアンドドロップにより入れ替えることのできるリストを追加する。

.. code-block:: html

  <!-- (1) -->
  <ul class="jquery-ui-sortable">
    <li>項目 1-1</li>
    <li>項目 1-2</li>
    <li>項目 1-3</li>
  </ul>

  <!-- (1) -->
  <ul class="jquery-ui-sortable">
    <li>項目 2-1</li>
    <li>項目 2-2</li>
    <li>項目 2-3</li>
  </ul>

  <!-- (1) -->
  <ul class="jquery-ui-sortable">
    <li>項目 3-1</li>
    <li>項目 3-2</li>
    <li>項目 3-3</li>
  </ul>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | リストグループを定義する。

JavaScript(drag-and-drop-sortable.js)では、次の処理を行っている。

.. code-block:: javascript

  // drag-and-drop-sortable.js

  'use strict';

  $(function () {

    // (1)
    $('.jquery-ui-sortable').sortable({

      // (2)
      connectWith: '.jquery-ui-sortable'
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ドラッグアンドドロップするリストの親要素に対し、\ ``sortable``\ メソッドを実行する。
    * - | (2)
      - | ドラッグアンドドロップをし合うリストグループのセレクタを\ ``connectWith``\ プロパティに設定する。

別のリスト間で相互に入れ替えられるようにする場合は、\ ``connectWith``\ プロパティに対象のリストのセレクタを設定する。
他にも様々なプロパティが提供されている。これらの詳細について知りたい場合は、 `jQuery UI 公式ウェブサイトのリファレンス\ <https://api.jqueryui.com/sortable/>`__\ を参照すること。
