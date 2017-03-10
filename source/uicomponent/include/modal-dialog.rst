.. _modal-dialog:

モーダルダイアログ
================================================

.. _modal-dialog-overview:

概要
------------------------------------------------

| モーダルダイアログとは、呼び出し元画面が操作できない状態で表示されるダイアログである。

| ここでは、jQuery UIとBootstrapを用いて、ボタンクリック時にモーダルダイアログを表示する方法を説明する。
| 実装方法はjQuery UIではJavaScriptによる実装方法を説明し、Bootstrapではマークアップによる方法とJavaScriptによる方法の二通りを説明する。
| なお、Bootstrapでモーダルダイアログ表示の前後に処理を実装する場合は、JavaScript形式での実装が適している。

.. figure:: /images/modal-dialog.png
   :alt: modal-dialog
   :align: center

   **図: モーダルダイアログの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - * `モーダルダイアログ <../samples/jquery-ui/modal.html>`_
     - `jQuery UI #Dialog <https://jqueryui.com/dialog/>`_
   * - Bootstrap
     - * `マークアップ形式のモーダルダイアログ <../samples/bootstrap/modal-markup.html>`_
       * `JavaScript形式のモーダルダイアログ <../samples/bootstrap/modal-javascript.html>`_
     - `JavaScript - Bootstrap #Modals <http://getbootstrap.com/javascript/#modals>`_


.. _modal-dialog-howtouse:

利用方法
------------------------------------------------

.. _modal-dialog-jqueryui:

jQuery UI（JavaScript形式）のモーダルダイアログ表示
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

HTMLではモーダル表示する領域をdiv要素で定義しておく。id属性に指定する値は任意の値でよい。

.. code-block:: html

  <!-- (1) -->
  <form id="dummy-form">
    <input type="text">
    <input type="submit">
  </form>

  <!-- (2) -->
  <div class="modal" id="myModal">
    <p>
      処理中... (処理完了後に自動的に閉じます)
    </p>
    <button id="cancel-btn">cancel</button>
  </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 時間のかかる処理を行うダミーのフォームを設置する。
    * - | (2)
      - | モーダルダイアログ用の領域を定義する。

| JavaScript(modal.js)は以下のように実装する。

.. code-block:: javascript

  // modal.js

  'use strict';

  $(function () {

    var timerId;
    var $myModal = $('#myModal');

    // (1)
    $myModal.dialog({
      modal: true,
      width: 450,
      height: 200,
      autoOpen: false
    });

    // (2)
    $('#dummy-form').on('submit', function (e) {
      e.preventDefault();

      $myModal.dialog('open');

      // (3)
      timerId = setTimeout(function () {

        $myModal.dialog('close');
      }, 3000);
    });

    // (4)
    $('#cancel-btn').on('click', function () {
      $myModal.dialog('close');
      clearTimeout(timerId);
    });

  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | モーダルダイアログの定義を実装する。
        | modalをtrueに指定することでモーダルダイアログとする。
        | autoOpenをfalseに設定することで画面ロード時に自動的に開くことを防ぐ。
    * - | (2)
      - | フォームに、時間のかかる処理を起動すると同時にダイアログを表示するイベントを設定する。
    * - | (3)
      - | 時間のかかる処理が完了したら、ダイアログを非表示にする。
        | 本サンプルでは時間のかかる処理を再現するため、setTimeout関数で3秒の遅延を再現しているが、本来はサーバからのレスポンスを受信して閉じるようにする。
    * - | (4)
      - | キャンセルボタンに、フォーム処理を中断してダイアログを非表示にするイベントを設定する。

.. note::
   モーダルダイアログの開く／閉じるをAjax通信と連動させる場合の実装例を以下に示す。イベント開始時にダイアログを開き、\ ``ajax.always``\ でダイアログを閉じるようにする。

     .. code-block:: javascript

       $('#dummy-form').on('submit', function(e) {
         e.preventDefault();

         $myModal.dialog('open');

         $.ajax({
           url : 'dummy/path',
           type : 'GET'
         }).always(function () {
           $myModal.dialog('close');
         });

       });

   Ajaxを利用したサーバとの連携については :ref:`ajaxGearingServer` も参照すること。

.. note::

   モーダルダイアログをGoogle Chromeで表示する場合、ダイアログの「×」ボタンをフォーカスした際、以下の表示上の不具合が発生する。

   .. figure:: /images/modal-dialog-bug.png
      :alt: modal-dialog-bug
      :align: center

      **図: モーダルダイアログの表示不具合例**

   上記を解消するには、以下の通りスタイルを設定すればよい。

      .. code-block:: css

         .ui-button .ui-button-text {
           display: none;
         }

.. _modal-dialog-markup:

Bootstrap（マークアップ形式）のモーダルダイアログ表示
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

  <!-- (1) -->
  <button class="btn btn-primary" data-toggle="modal"
          data-target="#myModal">モーダルダイアログ表示ボタン</button>

  <!-- (2) -->
  <div class="modal" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">

          <!-- (3) -->
          <button class="close" data-dismiss="modal">×</button>
          ヘッダー
        </div>
        <div class="modal-body">
          コンテンツ
        </div>
        <div class="modal-footer">
          <a href="destination.html" class="btn btn-primary">OK</a>
        </div>
      </div>
    </div>
  </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | モーダルダイアログを表示するボタンを設置する。
    * - | (2)
      - | モーダルダイアログ用の領域を定義する。
        | tabindexを-1に指定することでtabキー押下時にモーダルダイアログの外にフォーカスが移らないように制御する。
    * - | (3)
      - | モーダルダイアログを非表示にするボタンを設置する。


モーダルダイアログを制御するボタンは、次の属性を持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - 属性
     - 値
   * - ``data-toggle``
     - ``modal``\ (固定)。モーダルダイアログを表示するボタンに付与する。
   * - ``data-target``
     - 表示するモーダルダイアログのセレクタを指定する。\ ``data-toggle="modal"``\ が指定された要素に付与する。
   * - ``data-dismiss``
     - ``modal``\ (固定)。モーダルダイアログを非表示にするボタンに付与する。

モーダルダイアログは、次のクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``modal``
     - 必須
   * - ``modal-dialog``
     - 必須
   * - ``modal-content``
     - 必須。これの子要素が画面に表示される。
   * - ``modal-header``
     - 任意。モーダルダイアログ内のヘッダ領域を表す。
   * - ``modal-body``
     - 任意。モーダルダイアログ内のコンテンツ領域を表す。
   * - ``modal-footer``
     - 任意。モーダルダイアログ内のフッタ領域を表す。


Bootstrap（JavaScript形式）のモーダルダイアログ表示
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

JavaScript形式では、処理と連動してモーダルダイアログの表示状態を制御できる。
ここでは、時間のかかる処理中にモーダルダイアログを表示し、処理が完了したら非表示にする例を用いて説明する。

HTMLには、時間のかかる処理を起動するダミーのフォームと、モーダルダイアログを追加する。
モーダルダイアログはJavaScriptで制御するため、\ ``data-toggle``\ ・\ ``data-target``\ ・\ ``data-dismiss``\属性を設定する必要はない。

.. code-block:: html

  <!-- (1) -->
  <form id="dummy-form">
    <input type="text">
    <input type="submit">
  </form>

  <!-- (2) -->
  <div class="modal" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <p>
            処理中... (処理完了後に自動的に閉じます)
          </p>
          <button id="cancel-btn">cancel</button>
        </div>
      </div>
    </div>
  </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 時間のかかる処理を行うダミーのフォームを設置する。
    * - | (2)
      - | モーダルダイアログ用の領域を定義する。
        | tabindexを-1に指定することでtabキー押下時にモーダルダイアログの外にフォーカスが移らないように制御する。

JavaScript(modal-javascript.js)は以下のように実装する。

.. code-block:: javascript

  // modal-javascript.js

  'use strict';

  $(function () {

    var timerId;
    var $myModal = $('#myModal');

    // (1)
    $('#dummy-form').on('submit', function (e) {
      e.preventDefault();

      // (2)
      $myModal.modal({backdrop: 'static'});

      // (3)
      timerId = setTimeout(function () {

        $myModal.modal('hide');
      }, 3000);
    });

    // (4)
    $('#cancel-btn').on('click', function () {
      $myModal.modal('hide');
      clearTimeout(timerId);
    });

  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | フォームに、時間のかかる処理を起動すると同時にダイアログを表示するイベントを設定する。
    * - | (2)
      - | \ ``backdrop`` \オプションに\ ``static`` \を設定し、ダイアログにマウスクリックを受け付けない背景を表示する。
    * - | (3)
      - | 時間のかかる処理が完了したら、ダイアログを非表示にする。
        | 本サンプルでは時間のかかる処理を再現するため、setTimeout関数で3秒の遅延を再現しているが、本来はサーバからのレスポンスを受信して閉じるようにする。
    * - | (4)
      - | キャンセルボタンに、フォーム処理を中断してダイアログを非表示にするイベントを設定する。


.. note::
   Bootstrap版のモーダルダイアログの場合、モーダルダイアログ表示中にTabキーを押下すると、本来編集できないはずの項目（親画面の項目）の編集ができてしまう。

   これを防ぐために\ ``class="modal"``\を指定しているモーダル実装の一番外側\ ``div`` \要素に\ ``tabindex="-1"``\を追加し、該当範囲へのtabキーによるフォーカスを制限する。

   ただし、上記対応を行ったとしても下記2つの制約が発生するため注意すること。なおjQuery UIでは、本事象は発生しない。

   * フォーカスがURL欄や別タブへ移動してしまう(モーダルダイアログ部品より後ろに、フォーカスが当たる部品を実装した場合は発生しない)
   * Shift+Tab押下時、モーダルダイアログにフォーカスが返ってこない
