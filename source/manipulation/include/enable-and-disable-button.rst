.. _enable-and-disable-button:

ボタンの活性状態の変更
================================================

.. _enable-and-disable-button-outline:

概要
------------------------------------------------

ここでは、jQueryを用いて、ボタンの活性状態を変更する方法を説明する。

例として、チェックボックスをチェックしないと送信ボタンが押せないサンプルを用いて説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - `ボタンの活性・非活性 <../samples/jquery/enable-and-disable-button.html>`_
     - \-

.. _enable-and-disable-button-howtouse:

利用方法
------------------------------------------------

HTMLでは、jQueryと、ボタンの活性状態を制御するために実装したJavaScript(enable-and-disable-button.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>
    <script src="js/enable-and-disable-button.js"></script>

JavaScript(enable-and-disable-button.js)では、チェックボックスの\ ``change``\ イベントハンドラ内で、
チェック状態に応じて送信ボタンの活性状態を変更する。

.. code-block:: javascript

  // enable-and-disable-button.js

  'use strict';

  $(function () {

    $('#check').on('change', function () {
      var $submit = $('#submit');

      if (this.checked) {

        // (1)
        $submit.prop('disabled', false);
      } else {

        // (2)
        $submit.prop('disabled', true);
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
      - | チェック状態の場合、送信ボタンを活性状態にする。
    * - | (2)
      - | 非チェック状態の場合、送信ボタンを非活性状態にする。
