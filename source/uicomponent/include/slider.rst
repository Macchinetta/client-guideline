.. _slider:

スライダー
================================================

.. _sliderOutline:

概要
------------------------------------------------

| スライダーとは、棒状の領域の上に現在位置を指し示す小さな印(以降、ハンドル)を表示し、ハンドルを移動させることで値や範囲を指示する入力要素のことである。

.. figure:: /images/slider-example.png
   :alt: スライダーの例
   :align: center

   **図: スライダーの例**

| ここでは、jQuery UIを用いて、スライダーを表示する方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - - `基本的なスライダー <../samples/jquery-ui/slider.html>`__
       - `スライダーのオプション <../samples/jquery-ui/slider-numeric.html>`_
       - `イベントを利用した他部品との連動 <../samples/jquery-ui/slider-change-fontsize.html>`_
       - `目盛り付きスライダー <../samples/jquery-ui/slider-labels.html>`_
     - `Slider | jQuery UI <https://jqueryui.com/slider/>`_

| 本ガイドラインおよびサンプルで紹介するプロパティ以外にもプロパティが提供されている。これらの詳細について知りたい場合は、\ `jQuery UI 公式ウェブサイトのリファレンス\ <https://jqueryui.com/slider/>`__\ を参照すること。

.. _sliderHowToUse:

利用方法
------------------------------------------------

.. _sliderBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、スライダーを表示する領域を追加する。

.. code-block:: html

    <div id="slider"></div>

| JavaScript(slider.js)で、\ ``slider``\ メソッドを実行する。

.. code-block:: javascript

   // slider.js

   'use strict';

   $(function () {

     $('#slider').slider({
     });
   });

.. _sliderOption:

スライダーのオプション
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| オプションの設定について説明する。
| ここでは、スライダーの位置が示す数値を取得し、別途設置したテキストボックスにその数値を表示させるサンプルを用いて説明する。
|
| :ref:`basic-usages-jqueryui`\ で示したHTMLに、スライダーを表示する領域とテキストボックスを追加する。

.. code-block:: html

    <!-- (1) -->
    <input type="text" id="value"/><br>
    <!-- (2) -->
    <div id="max">50</div>
    <div id="slider-numeric"></div>
    <div id="min">10</div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ハンドルの数値確認用テキストボックスを設置する。
    * - | (2)
      - | スライダー領域を定義する。

| JavaScript(slider-numeric.js)で、\ ``slider``\ メソッドを実行する。

.. code-block:: javascript

   // slider-numeric.js

   'use strict';

   $(function () {

     // (1)
     $('#slider-numeric').slider({

       // (A)
       range: 'min',

       // (B)
       orientation: 'vertical',

       // (C)
       min: 10,

       // (D)
       max: 50,

       // (E)
       value: 25,

       // (F)
       step: 5,

       // (G)
       slide: function (event, ui) {
         $('#value').val(ui.value);
       }
     });

     $('#value').val($('#slider-numeric').slider('value'));
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ ``slider``\ メソッドを実行する。実行時にオプションを指定する。

        .. table::

          ===== ============== =============================== ======================================================================================================================================================== ================================
          項番  |option-name|  |type|                          |summary|                                                                                                                                                |default-value|
          ===== ============== =============================== ======================================================================================================================================================== ================================
          \(A\) range          | \ ``String``\
                               | または
                               | \ ``Boolean``\                | ハンドルの位置に応じて、トラックの色を変更するオプション。
                                                               | \ ``String``\ ：
                                                               | \ ``min``\ を設定すると、ハンドルから最小値までのトラックを着色し、\ ``max``\ を設定すると、ハンドルから最大値までのトラックを着色する。
                                                               | \ ``Boolean``\ ：
                                                               | \ ``true``\ を設定するとハンドルが2つになる。ハンドル間のトラックを着色する。                                                                          \ ``false``\
          \(B\) orientation    \ ``String``\                   スライダーの向きを設定する。\ ``horizontal``\ を設定すると横向き、 \ ``vertical``\ を設定すると縦向きとなる。                                            \ ``horizontal``\
          \(C\) min            \ ``Number``\                   スライダーの最小値を設定する。                                                                                                                           \ ``0``\
          \(D\) max            \ ``Number``\                   スライダーの最大値を設定する。                                                                                                                           \ ``100``\
          \(E\) value          \ ``Number``\                   スライダーの初期値を設定する。                                                                                                                           \ ``0``\
          \(F\) step           \ ``Number``\                   ハンドルの1ステップあたりの移動値を設定する。                                                                                                            \ ``1``\
          \(G\) slide          Event                           ハンドルが移動する度に発生するイベントに関数を設定する。                                                                                                 \-
          ===== ============== =============================== ======================================================================================================================================================== ================================

.. _sliderHowToExtend:

応用方法
------------------------------------------------

.. _sliderChangeFontSize:

イベントを利用した他部品との連動
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQuery UI Sliderにはユーザ操作によって発生するイベントがある。
| ここでは、イベントを利用して、スライダーとドロップダウンリストを連動させ、スライダーまたはドロップダウンリストを操作すると、文字列のフォントサイズが変更されるサンプルを用いて説明する。
|
| :ref:`basic-usages-jqueryui`\ で示したHTMLに、スライダーを表示する領域とドロップダウンリストとフォントサイズを変更する領域を追加する。

.. code-block:: html

    <!-- (1) -->
    <form id="font-size">
      <label>フォントサイズ</label>
      <select name="font" id="font">
        <option>10</option>
        <option>12</option>
        <option>14</option>
        <option>16</option>
        <option>18</option>
        <option>20</option>
        <option>22</option>
        <option>24</option>
      </select>
      <label>px</label>
    </form>
    <!-- (2) -->
    <div id="min">10px</div>
    <div id="slider-change-fontsize"></div>
    <div id="max">24px</div>
    <!-- (3) -->
    <div id="font-size-div" class="ui-widget-content">
      ハンドルを動かすとフォントサイズが変更されます。
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 連携用ドロップダウンリストを定義する。
    * - | (2)
      - | スライダー領域を定義する。
    * - | (3)
      - | フォントサイズの変更を反映する領域を定義する。

| JavaScript(slider-change-fontsize.js)で、\ ``slider``\ メソッドを実行する。

.. code-block:: javascript

   // slider-change-fontsize.js

   'use strict';

   $(function () {
     var select = $('#font');

     // (1)
     var changeFontSize = function (value) {
       $('#font-size-div').css('font-size', value + 'px');
     };

     var slider = $('#slider-change-fontsize').slider({

       range: 'min',
       min: 10,
       max: 24,
       step: 2,
       value: select[0].selectedIndex * 2 + 10,

       // (2)
       slide: function (event, ui) {

         // (3)
         select[0].selectedIndex = (ui.value - 10) / 2;
         changeFontSize(ui.value);
       },

       // (4)
       change: function (event, ui) {
         changeFontSize(ui.value);
       },

       // (5)
       create: function (event, ui) {
         var value = $(this).slider('value');
         changeFontSize(value);
       }
     });

     // (6)
     $('#font').on('change', function () {
       slider.slider('value', this.selectedIndex * 2 + 10);
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | フォントサイズを変更するための関数を定義する。
    * - | (2)
      - | ハンドルを移動する度に発生するイベントに関数を設定する。
    * - | (3)
      - | ドロップダウンリストを選択する。
    * - | (4)
      - | valueの値を変更した時に発生するイベントに関数を設定する。
    * - | (5)
      - | スライダーが生成された時に発生するイベントに関数を設定する。
    * - | (6)
      - | ドロップダウンリストの値を変更した場合、スライダーの位置を変更する。

| createイベントでは、\ ``slider``\ メソッドよりスライダーの値を取得し、ドロップダウンリストとフォントサイズを設定する。
| slideイベントでは、引数からスライダーの値(\ ``ui.value``\ )を取得し、ドロップダウンリストとフォントサイズを設定する。
| changeイベントでは、引数からスライダーの値(\ ``ui.value``\ )を取得し、フォントサイズを設定する。

.. warning::

   createイベントでは、\ ``ui.value``\ が\ ``undefined``\ になっているため、\ ``slider``\ メソッドを利用してスライダーの値を取得すること。

.. note::

   本サンプルでは紹介していないが、ハンドルの移動を始めた際に発生するstartイベント、ハンドルの移動を止めた際に発生するstopイベントがある。

   また、スライダーを生成してからハンドルを移動させた際に発生する一連のイベントは、下記の場合で異なる。

   (1) 画面に表示されているスライダーのハンドルをユーザが直接操作し移動した場合

   .. figure:: /images/sliderevent-execution-sequence1.png
      :alt: ユーザが操作した場合のイベント
      :scale: 50%
      :align: center

   (2) ハンドルをユーザが直接操作せず、他の画面項目と連動し（JavaScriptがハンドルに対して内部処理を行い）ハンドルを移動した場合

   .. figure:: /images/sliderevent-execution-sequence2.png
      :alt: JavaScriptで操作した場合のイベント
      :scale: 50%
      :align: center

   詳細は、\ `jQuery UI公式ウェブサイトのリファレンス <https://api.jqueryui.com/slider/#events>`__\を参照すること。

.. _sliderLabels:

目盛り付きスライダー
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQuery UIでは、スライダーに目盛りを表示することは出来ないが、JavaScriptとCSSの組み合わせで実現可能である。
| :ref:`basic-usages-jqueryui`\ で示したHTMLに、スライダーを表示する領域を追加する。

.. code-block:: html

    <div id="slider-labels"></div>

| JavaScript(slider-labels.js)で、\ ``slider``\ メソッドを実行する。
| createイベントで、目盛りの作成を行う\ ``createLabels``\ メソッドを設定する。

.. code-block:: javascript

   // slider-labels.js

   'use strict';

   $(function () {

     // (1)
     var createLabels = function (event, ui) {

       // (2)
       var opt = $(this).slider('option');

       // (3)
       var vals = opt.max - opt.min;

       // (4)
       for (var i = 0; i <= vals; i = i + opt.step) {

         // (5)
         var el = $('<label>' + (i + opt.min) + '</label>').css('left', (i / vals * 100) + '%');

         // (6)
         $('#slider-labels').append(el);
       }
     };

     $('#slider-labels').slider({
       min: 0,
       max: 10,

       // (7)
       create: createLabels
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | スライダーの最小値と最大値に合わせて目盛りを追加する関数を定義する。
    * - | (2)
      - | スライダーのオプションを取得する。
    * - | (3)
      - | 範囲内の数値の個数を取得する。
    * - | (4)
      - | スライダーに対して最小値側からステップ数毎に目盛りを配置する。
    * - | (5)
      - | label要素を生成し、目盛りの位置を設定する。
    * - | (6)
      - | スライダーに要素を追加する。
    * - | (7)
      - | スライダーが生成された時に発生するイベントに関数を設定する。

.. note::

   \ ``createLabels``\ メソッド内for文の変化式を変更することで、目盛りを任意の間隔に変更することが出来る。

   例えば、間隔を5にする場合、\ ``i = i + opt.step``\ を\ ``i = i + 5``\ に変更する。

| CSS(slider-labels.css)で、目盛りの位置を設定する。

.. code-block:: css

   #slider-labels label {
     position: absolute;
     width: 20px;
     margin-top: 20px;
     margin-left: -10px;
     text-align: center;
   }
