.. _prevent-continuous-click:

二度押し無効化（二重送信防止）
================================================

.. _prevent-continuous-click-outline:

概要
------------------------------------------------

ここでは、jQueryを用いて、ボタンの二度押しを無効化する方法を説明する。

例として、ボタンがクリックされたら処理が完了するまでボタンを非活性化することで、二度押しを無効化するサンプルを用いて説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery
     - `二度押し無効化(ボタン非活性化) <../samples/jquery/prevent-continuous-click.html>`_
     - \-

.. _prevent-continuous-click-howtouse:

利用方法
------------------------------------------------

HTMLでは、jQueryと、二度押しを無効化するために実装したJavaScript(prevent-continuous-click.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>
    <script src="js/prevent-continuous-click.js"></script>

JavaScript(prevent-continuous-click.js)は、次のように実装する。

.. code-block:: javascript

  // prevent-continuous-click.js

  'use strict';

  $(function () {

    $('#the-form').on('submit', function (e) {
      e.preventDefault();

      var $form = $(this),
          $button = $form.find('[type=submit]');

      // (1)
      $button.prop('disabled', true);

      // (2)
      $.ajax({
        url : $form.attr('action'),
        type : $form.attr('method'),
        data : $form.serialize()

      // (3)
      }).always(function () {
        setTimeout(function () {

          // (4)
          $button.prop('disabled', false);
        }, 2000);
      });
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 送信ボタンを非活性化する。
    * - | (2)
      - | 非同期通信を開始する。
    * - | (3)
      - | 通信処理完了後に実行する関数を指定する。
    * - | (4)
      - | 送信ボタンを再度活性化する。

        .. note::
          本サンプルでは、ボタンの活性状態の変化が分かり易いように、Ajax通信のレスポンスを得てから2秒後にボタンを再活性化している。実際の開発では\ ``setTimeout``\ 関数は不要である。

これにより、送信ボタンがクリックされたら直ちに非活性化し、通信処理が完了後に活性状態に戻す動作が実現され、
二度押し無効化が実現できる。

.. note::
  本サンプルでは、通信失敗時や通信中にブラウザの停止ボタンを押下した場合などを考慮していない。

  通信の成功(\ ``done``\ )、失敗(\ ``fail``\ )にかかわらず、常にボタンが再活性化する。(\ ``always``\ )

  実際のシステムでは業務要件に合わせて、通信成功／通信失敗、通信終了時それぞれで、活性化する／常に活性化しないなど処理を実装すること。

  \ ``done``\ 、\ ``fail``\ 、\ ``always``\ の扱いなど、Ajax通信については\ :ref:`asynchronous-processing`\ と\ :ref:`ajaxGearingServer`\ も参照すること。

.. _prevent-continuous-click-howtoextend:

応用方法
------------------------------------------------

.. _prevent-continuous-click-howtoextend-multipleButtons:

同一フォーム内に複数のボタンを設置する場合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

同一フォーム内に複数のボタンを設置する場合、遷移先情報をHTTPパラメータに設定し実現することが多い。
jQueryの\ `submit`\ イベントハンドラ内では、本来HTTPパラメータにセットされるはずだった情報が設定されないため、実装を追加する必要がある。

なお、以下のサンプルはMacchinettaオンライン版と連携することを前提としている。

- HTML

.. code-block:: html

    <form:form id="form1" action="${pageContext.request.contextPath}/Doubleclick1/click" modelAttribute="sampleForm" method="POST">
        <form:button id="button-aaa" name="aaa">aaa</form:button>
        <form:button id="button-bbb" name="bbb">bbb</form:button>
    </form:form>


- JavaScript

.. code-block:: javascript

   // (1)
   var clickedName = '';

   $(function () {

     $('#form1').on('submit', function (e) {

       var $form = $(this),
           $button = $form.find('[type=submit]');

       // (2)
       var input = $("<input>").attr("type", "hidden")
                               .attr("name", clickedName);
       $form.append($(input));

       // (3)
       $button.prop('disabled', true);

     });

     // (4)
     $(':button').on('click', function () {
       clickedName = $(this).attr('name');
     });

   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 押下されたボタンのname属性を格納する。
    * - | (2)
      - | 複数ボタンを設置した場合、サーバ側のControllerクラスで\ ``@RequestMapping``\ のparam属性による振り分けを設定しているため、本来HTTPパラメータで送信されるはずだったButtonのname属性を手動で設定する必要がある。
    * - | (3)
      - | 送信ボタンを非活性化する。
    * - | (4)
      - | 押下されたボタンのname属性を取得する関数を定義する。

.. note::
   サーバサイドの複数ボタンの設置についてはMacchinettaオンライン版 開発ガイドライン ( \ http://macchinetta.github.io/server/guideline/\ の Macchinetta Server Framework (1.x) Development Guideline ) を参照すること。

また、非同期通信用のボタン等で個別に１ボタンずつ二度押しを無効化したい場合はjQueryの\ `click`\ イベントハンドラ内でボタン毎に制御を実装する。
例えば以下のようなHTMLの場合、

.. code-block:: html

   <form id="form1" action="/server-sampleapp-basic/Doubleclick2/click" method="POST">
       <input type="button" id="executeService1" value="Execute Function 1" />
       <br />
       <input type="button" id="executeService2" value="Execute Function 2" />
       <br />
       <button id="submit" name="submit" type="submit" value="Submit">submit</button>
   </form>

非同期通信を実行するボタンに対してはそれぞれ以下のようなJavaScriptを実装する。

.. code-block:: javascript

   // (1)
   $('#executeService1').on('click', function () {
     $('#executeService1').prop('disabled', true);
     $(function () {
       $.ajax({
         url: contextPath + '/api/v1/dummyServiceForLoading',
         type: 'POST',
         dataType: 'json',
       }).always(function() {
         $('#executeService1').prop('disabled', false);
       });
     });
   });

   // (2)
   $('#executeService2').on('click', function () {
     $('#executeService2').prop('disabled', true);
     $(function () {
       $.ajax({
         url: contextPath + '/api/v1/dummyServiceForLoading',
         type: 'POST',
         dataType: 'json',
       }).always(function() {
         $('#executeService2').prop('disabled', false);
       });
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | "Execute Function 1"ボタンを押下した場合に実行する処理を定義する。
    * - | (2)
      - | "Execute Function 2"ボタンを押下した場合に実行する処理を定義する。

.. _prevent-continuous-click-howtoextend-loading:

非同期通信中を表示する場合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここではAjax処理によって非同期通信処理を実行している間に、画面に通信中である旨を表示するための仕組みを紹介する。
| なお、以下のサンプルはサーバサイドと連携することを前提としている。

| HTMLは、Ajaxを実行する契機となるボタンと、通信中に表示する文言を設置する。

.. code-block:: html

    <button id="executeService">EXECUTE</button>&nbsp;<label id="loadingLabel" style="display: none;">Loading...</label>

| "Loading..."はAjax実行中にのみ表示させるため、デフォルトのCSSスタイルに\ `display: none;`\ を指定している。
| Javascriptは以下のように実装する。

.. code-block:: javascript

    $(function() {

      // (1)
      $('#executeService').click(function() {

        // (2)
        $('#executeService').prop('disabled', true);

        // (3)
        $('#loadingLabel').fadeIn();

        // (4)
        $(function() {
          $.ajax({
            url: contextPath + '/api/v1/dummyServiceForLoading',
            type: 'POST',
            dataType: 'json',
          }).always(function() {

            // (5)
            $('#executeService').prop('disabled', false);

            // (6)
            $('#loadingLabel').fadeOut();
          });
        });
      });
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ボタン押下を契機に処理を開始する。
    * - | (2)
      - | ボタンを非活性に変更する。
    * - | (3)
      - | 処理中に表示させる文言をフェードインさせる。
    * - | (4)
      - | 非同期通信処理を実行する。
    * - | (5)
      - | 処理完了後にボタンを再度活性化する。
    * - | (6)
      - | 処理中に表示していた文言をフェードアウトさせる。

| このサンプルではボタン押下のタイミングでAjax処理を実行する。
| Ajax処理実行の直前でボタンを非活性にしている。これは２度押しによる不具合を回避するために設定する。
| CSSスタイルに\ `display: none;`\ を指定し非表示にしていた領域をjQueryの\ `fadeIn`\ メソッドを使用することで表示させる。
| Ajax処理完了後は\ `always`\ メソッドを使用することで、処理結果が\ `done`\ ・\ `fail`\ のどちらの場合でも実行されるように実装する。

.. note::

   Ajaxを用いたサーバとの非同期通信の詳細についてはMacchinettaオンライン版 開発ガイドライン ( \ http://macchinetta.github.io/guideline/\ の Macchinetta Server Framework (1.x) Development Guideline ) を参照すること。

.. _prevent-continuous-click-howtoextend-alinktag:

a要素によるリンクに対して二度押しを無効化する場合
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

a要素を使用したリンクに対して二度押しを無効化する場合、ボタンのように\ `disable`\ 属性は使用できない。
このため、二度押しを無効化するためのJavaScriptを独自に実装する必要がある。
以下にサンプルを示す。

- HTML

.. code-block:: html

   <a id="sample" href="#">sample</a>


- JavaScript

.. code-block:: javascript

   // (1)
   var clicked = false;

   $(function () {

     // (2)
     $('a').on('click', function () {

       // (3)
       if (clicked) {
         return false;
       };

       // (4)
       clicked = true;

       // (5)
       $(function () {
         $.ajax({
           url: contextPath + '/api/v1/dummyServiceForLoading',
           type: 'POST',
           dataType: 'json',
         }).always(function() {
             clicked = false;
         });
       });
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 対象のリンクについて押下の未済を判定するための変数を定義する。
    * - | (2)
      - | a要素が押下された際のイベントハンドラを定義する。
    * - | (3)
      - | 押下済みの場合はfalseを返却しリンクを無効化する。
    * - | (4)
      - | 押下済みでない場合はフラグを立て押下済みとする。
    * - | (5)
      - | リンク押下時の動作を実装する。
