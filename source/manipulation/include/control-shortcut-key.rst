.. _control-shortcut-key:

ショートカットキー制御
================================================

.. _control-shortcut-key-outline:

概要
------------------------------------------------

ショートカットキー制御とは、指定したキー操作を無効化したり、動作を変更することである。

ここでは、Mousetrapを用いて、 *Ctrl + c* および *Ctrl + v* による「コピーアンドペースト」、および *Ctrl + s* による「ページの保存」の動作を変更する方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - Mousetrap
     - `コピー・ペースト無効化 <../samples/mousetrap/disable-copy-paste.html>`_
     - `Mousetrap - Keyboard shortcuts in Javascript <http://craig.is/killing/mice>`_

.. _control-shortcut-key-howtouse:

利用方法
------------------------------------------------

HTMLでは、Mousetrapと、ショートカットキーを制御するために実装したJavaScript(disable-copy-paste.js)を読み込む。

留意点として、Mousetrapの仕様上、\ ``textarea``\ ・\ ``input``\ ・\ ``select``\ 要素にフォーカスがある場合は、キー操作時の動作は変更されない。
これらの要素内でキー操作を変更する場合は、対象の要素に\ ``mousetrap``\ クラスを指定する必要がある。

.. code-block:: html

    <textarea id="area1">No key-controls executed for this text-area.</textarea>

    <!-- (1) -->
    <textarea id="area2" class="mousetrap">key-controls for copy(Ctrl + c) and paste(Ctrl + v) is disabled for this text-area.</textarea>

    <!-- (1) -->
    <textarea id="area3" class="mousetrap">disable copy(Ctrl + c) and paste(Ctrl + v), and execute original function when key-control for save(Ctrl + s) is used.</textarea>

    <!-- (2) -->
    <script src="../lib/vendor/mousetrap/1.4.6/mousetrap.js"></script>
    <script src="js/disable-copy-paste.js"></script>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | キー制御を有効化するため class属性に "mousetrap" を指定する。
    * - | (2)
      - | Mousetrapと、独自に実装したJavaScriptを読み込む。

JavaScript(disable-copy-paste.js)では、\ ``Mousetrap.bind``\ 関数を用いて次の処理を実行する。


.. code-block:: javascript

   // disable-copy-paste.js

   'use strict';

   window.onload = function () {

     // (1)
     Mousetrap.bind('ctrl+c', function () {
       return false;
     });

     // (2)
     Mousetrap.bind('ctrl+v', function () {
       return false;
     });

     // (3)
     Mousetrap.bind('ctrl+s', function () {
       if (document.activeElement.id === 'area3') {
         alert('data is saved');
         return false;
       }

       return true;
     });

   };

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | *Ctrl + c* 実行時の操作を変更する。ここでは操作を無効化する。
    * - | (2)
      - | *Ctrl + v* 実行時の操作を変更する。ここでは操作を無効化する。
    * - | (3)
      - | *Ctrl + s* 実行時の操作を変更する。ここではフォーカスが #area3 にある場合のみ処理を変更する。

標準動作を無効化するためには\ ``Mousetrap.bind``\ 関数のコールバック関数で\ ``false``\ を返す。\ ``true``\ を返すと標準動作が行われる。


.. note::

   ショートカットキー操作で起動できる動作は、JavaScriptで実行できる動作のみである。
   例えば、 *Ctrl + s* 操作による「ページの保存」のようなブラウザの標準動作は、JavaScriptから実行できないため、これを別のショートカットキー操作に割り当てることは不可能である。

.. note::

   対応可能なキーは `Mousetrapの公式リファレンス <http://craig.is/killing/mice>`_ の「Supported Keys」を参照すること。なお、「F12」など、「Supported Keys」に記載は無いが、制御可能なものもある。Mousetrapのソースコードを参照すること。
