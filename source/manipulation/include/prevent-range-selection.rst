.. _prevent-range-selection:

範囲選択防止
================================================

.. _preventRangeSelectionOutline:

概要
------------------------------------------------

| 範囲選択防止とは、マウスやキー操作によってページ内の文字列等がハイライトすることを抑止する機能である。

| 範囲選択防止は、カスケード スタイル シート (CSS) プロパティである\ ``user-select``\ プロパティを使用する。\ ``user-select``\ プロパティは各ブラウザが独自に実装しており、設定がそれぞれ異なる。また、 Internet Explorer は Firefox ・ Chrome と比べてハイライトの挙動に差異がある。

| ここでは、ブラウザ毎の設定方法や、Internet Explorer の挙動の差異の吸収方法を紹介する。

.. note::

   \ ``user-select``\ プロパティは World Wide Web Consortium (W3C) CSS Level 3（https://www.w3.org/TR/css-ui-3/）に含まれておらず、CSS Level 4（https://www.w3.org/TR/css-ui-4/）に記述されているものの、草案（Working Draft）に留まっている。

.. warning::

   後述する範囲選択防止の実現のため用いるCSSやJavaScriptは、ブラウザ毎に挙動が異なり、またブラウザバージョンアップ後に動作が保証されているわけではない。本ガイドラインで紹介する実現方法については動作確認しているが、ブラウザのバージョンアップなども考慮した上で、範囲選択防止の要件を取り込むかどうか検討すること。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - - `ページ全体を範囲選択防止 <../samples/jquery/prevent-range-selection-all-elements.html>`_
       - `ページ内の特定要素の範囲選択防止 <../samples/jquery/prevent-range-selection-target-elements.html>`_
     - \-

.. _preventRangeSelectionHowToUse:

利用方法
------------------------------------------------

| ここでは、ページ全体、またはページの一部がハイライトできないよう制御する方法を紹介する。

ページ全体の範囲選択防止
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ページ全体がハイライトできないよう制御する方法を紹介する。

| HTMLでは、jQueryと、ハイライトを防止するために実装したJavaScript(prevent-range-selection-all-elements.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/prevent-range-selection-all-elements.js"></script>

| JavaScript(prevent-range-selection-all-elements.js)では、\ ``html``\ 要素に\ ``css``\ 関数を用いて\ ``user-select``\ プロパティを指定する。

.. code-block:: javascript

  // (1)
  $('html').css({
    'user-select' : 'none',

    // (2)
    '-moz-user-select' : 'none',

    // (3)
    '-webkit-user-select' : 'none',

    // (4)
    '-ms-user-select' : 'none'
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | CSSによる範囲選択防止を実装する。
    * - | (2)
      - | ブラウザがFirefoxの場合の定義を設定する。
    * - | (3)
      - | ブラウザがSafari、Chromeの場合の定義を設定する。
    * - | (4)
      - | ブラウザがInternet Explorerの場合の定義を設定する。

ページ内の特定要素の範囲選択防止
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、ページ内の特定要素をハイライトできないよう制御する方法を紹介する。

| HTMLではハイライトを不可とする要素のクラス属性に\ ``disable``\ を設定する。なお、クラス名はJavaScriptのセレクタと一致していれば他の名称でも問題ない。

.. code-block:: html

    <p class="disable">
        HTMLの特定の要素を選択不可とします
    </p>

| また、jQueryと、ハイライトを防止するために実装したJavaScript(prevent-range-selection-target-elements.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/prevent-range-selection-target-elements.js"></script>

| JavaScriptでは、クラス属性に\ ``disable``\ を設定した要素に\ ``css``\ 関数を用いて\ ``user-select``\ プロパティを指定する。

.. code-block:: javascript

  // (1)
  $('.disable').css({
    'user-select' : 'none',
    '-moz-user-select' : 'none',
    '-webkit-user-select' : 'none',
    '-ms-user-select' : 'none'
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | CSSによる範囲選択防止。\ ``class="disable"``\ を設定した要素をハイライトできないように実装する。

.. note::

   INPUT・TEXTAREAに\ ``user-select``\ プロパティを設定した場合、ブラウザ毎に挙動が異なるため設定しないこと。

|
| Internet Explorerは特定要素をハイライト不可としても、以下の操作を行うことでハイライトできる。

*  *Ctrl + a* を押下する。
* ハイライト可の要素から不可の要素をマウスでドラッグする。

| それらを防止するための方法を紹介する。

| *Ctrl + a* を防止する方法を以下に示す。
| \ ``keydown``\ イベントをトラップし、 *Ctrl + a* が押下された場合に\ ``false``\ を返却する。

.. code-block:: javascript

  // (1)
  $(document).on('keydown', keyDownEvent);

  // (2)
  function keyDownEvent(event) {

    // (3)
    if (!isIE()) {
      return true;
    }

    // (4)
    if (event.ctrlKey && event.key === 'a') {

      // (5)
      if (event.target.nodeName !== 'INPUT' &&
          event.target.nodeName !== 'TEXTAREA') {

        // (6)
        return false;
      }
    }
    return true;
  }

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | キー押下実行時に関数を呼び出す。
    * - | (2)
      - | キー操作が行われた場合に実行する関数を定義する。
    * - | (3)
      - | 独自関数によるブラウザ判定を実施し、Internet Explorer以外の場合は処理を終了する。
    * - | (4)
      - | キー押下が *Ctrl + a* の場合の条件を実装する。
    * - | (5)
      - | 入力系の要素は制御対象外とする。
    * - | (6)
      - | 入力系以外の要素の場合にはキー操作を無効とする。

.. note::

   *Ctrl + a* の制御はMousetrapを用いて実現することもできる。`ショートカットキー制御 <#control-shortcut-key>`_ を参照すること。


| 次に、ドラッグを防止する方法を以下に示す。
| 範囲選択を開始した要素のみ選択可能とし、カーソルが別要素をマウスオーバーした時点で範囲選択を解除する。

| \ ``selectstart``\ イベント発生時に範囲選択開始時点の要素を取得し、\ ``mouseover``\ イベント発生時に開始時点の要素と一致しているかチェックする。不一致の場合は範囲選択開始時点の要素を格納する。また、\ ``mouseup``\ イベント発生時に変数を初期化する。

.. code-block:: javascript

  // (1)
  $(document).on('mouseup', mouseUpEvent);
  $(document).on('selectstart', mouseSelectEvent);
  $(document).on('mouseover', mouseOverEvent);

  // (2)
  var select = false;
  var range = null;
  var selectStartNode = '';

  // (3)
  function mouseUpEvent() {
    if (!isIE()) {
      return true;
    }

    // (4)
    select = false;
    range = null;
    selectStartNode = '';

    return true;
  }

  // (5)
  function mouseSelectEvent(event) {
    if (!isIE()) {
      return true;
    }

    var selection = window.getSelection();

    // (6)
    if (selection.rangeCount === 0) {
      return true;
    }

    // (7)
    if (event.target.tagName === 'HTML' ||
        event.target.tagName === 'BODY') {
      selection.removeAllRanges();
      return false;
    }

    // (8)
    select = true;
    range = selection.getRangeAt(0);
    selectStartNode = selection.anchorNode.parentNode;

    return true;
  }

  // (9)
  function mouseOverEvent(event) {
    if (!isIE()) {
      return true;
    }

    // (10)
    if (select && event.target !== selectStartNode) {
      var selection = window.getSelection();
      var newRange = document.createRange();
      newRange.selectNode(range.startContainer);
      selection.removeAllRanges();

      // (11)
      selection.addRange(newRange);
    }
    return true;
  }

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | マウス操作時に範囲選択を防止するための関数を実行する。
    * - | (2)
      - | 範囲選択制御に使用する変数(範囲選択ステータス、範囲選択開始時の領域、範囲選択開始時の要素名)を定義する。
    * - | (3)
      - | マウスキーが離された時に実行する関数を定義する。
    * - | (4)
      - | 範囲選択制御に使用する変数を初期化する。
    * - | (5)
      - | 範囲選択開始時に実行する関数を定義する。
    * - | (6)
      - | INPUT・TEXTAREAを除き、範囲選択を行っていない場合は対象外とする。
    * - | (7)
      - | タグがBODY・HTMLの場合は範囲選択不可とする。
    * - | (8)
      - | 範囲選択制御に使用する変数をそれぞれ更新する。
    * - | (9)
      - | マウスオーバー時に実行する関数を定義する。
    * - | (10)
      - | カーソルが別要素に到達したら文字列選択をクリアする。
    * - | (11)
      - | 範囲選択開始時の要素を設定することで、ハイライトしている範囲を限定する

.. note::

   上記のサンプルでは、ブラウザ判定を\ ``isIE``\ 関数で行っている。\ ``isIE``\ の実装を以下に示す。

     .. code-block:: javascript

       function isIE() {
         var userAgent = window.navigator.userAgent.toLowerCase();
         if (userAgent.match(/trident/)) {
           return true;
         }
         return false;
       }

   Internet Explorerの判定は、ユーザエージェントに特定の文字列（\ ``trident``\ ）が含まれるかどうかで行っている。ただし、ユーザエージェントはブラウザのバージョンアップ等で変更される可能性があるため、導入する場合は判定方法を別途検討すること。

.. warning::

   Internet Explorerにおいて、ブロック要素とインライン要素を入れ子にし、インライン要素に範囲選択防止の設定をした場合、ブロック要素上をドラッグ、またはダブルクリックすることでインライン要素をハイライトできる。

   HTMLの実装例と範囲選択防止が機能しない例のイメージを以下に示す。

     .. code-block:: html

       <p>
           Make particular element of HTML <span class="disable">non-selectable</span>.<br />
           Try to select the sentence above without mouse-overing "non-selectable".
       </p>

     .. figure:: /images/prevent-range-selection.png
        :alt: マウスドラッグによる範囲選択防止を設定した要素のハイライト例
        :align: center

        **図: マウスドラッグによる範囲選択防止を設定した要素のハイライト例**

   本事象はInternet Explorerがハイライト可の要素を含めることで、不可の要素もハイライトできてしまうことに起因しており、範囲選択防止機能では制御できない。導入する際はブロック要素を範囲選択防止の対象とすること。
