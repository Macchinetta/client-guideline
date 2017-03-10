.. _modeless-dialog:

モードレスダイアログ
================================================

.. _modeless-dialog-overview:

概要
------------------------------------------------

モードレスダイアログとは、呼び出し元画面が操作できる状態で表示されるダイアログである。

ここでは、jQuery UIを用いて、ボタンクリック時にモードレスダイアログを表示する方法を説明する。

.. figure:: /images/modeless-dialog.png
   :alt: modeless-dialog
   :align: center

   **図: モードレスダイアログの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - `モードレスダイアログ表示 <../samples/jquery-ui/modeless.html>`_
     - `Dialog | jQuery UI <http://jqueryui.com/dialog/>`_

.. _modeless-dialog-howtouse:

利用方法
------------------------------------------------

:ref:`basic-usages-jqueryui`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

  <!-- (1) -->
  <button id="modeless-launch">モードレスダイアログ起動ボタン</button>

  <!-- (2) -->
  <div id="dialog">
    <p>
      コンテンツ
    </p>
  </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | モードレスダイアログ起動ボタンを設置する。
    * - | (2)
      - | 表示するモードレスダイアログを定義する。

JavaScript(modeless.js)は以下のように実装する。

.. code-block:: javascript

  // modeless.js

  'use strict';

  $(function () {

    // (1)
    $('#dialog').dialog({
      title: 'タイトル',

      // (2)
      autoOpen: false
    });

    // (3)
    $('#modeless-launch').on('click', function () {
      $('#dialog').dialog('open');
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 指定した要素をモードレスダイアログにする。
    * - | (2)
      - | ダイアログが自動的に表示されないようにオプションを指定する。
    * - | (3)
      - | ボタンのクリックでモードレスダイアログを起動するイベントを設定する。

上記のサンプルでは\ ``dialog``\メソッドの実行の際に、タイトルを設定する\ ``title``\プロパティを設定しているが、他にも多くのプロパティが提供されている。これらの詳細について知りたい場合は、\ `jQuery UI公式ウェブサイトのリファレンス <http://api.jqueryui.com/dialog/>`_\を参照すること。
