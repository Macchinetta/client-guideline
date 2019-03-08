.. _format-conversion:

フォーマット変換・文字種変換
================================================

.. _format-conversion-outline:

概要
------------------------------------------------

| 本節で紹介するフォーマット変換・文字種変換とは、ユーザーが入力した入力値のフォーマットや文字種を自動的に変換することを指す。
| ここでは、フォーマット変換・文字種変換について、日付を操作するMoment.jsと独自に実装したJavaScriptを用いて実現する方法を紹介する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - Moment.js
     - - `日付のフォーマット変換 <../samples/moment/convert-date.html>`_
       - `日付妥当性チェック <../samples/moment/check-date.html>`_
       - `時刻のフォーマット変換 <../samples/moment/convert-time.html>`_
     - - `String + Format | Moment.js <https://momentjs.com/docs/#/parsing/string-format/>`_
       - `Validation | Moment.js <https://momentjs.com/docs/#/parsing/is-valid/>`_
   * - \-
     - `特定文字の全角半角変換 <../samples/jquery/convert-zenkaku-hankaku.html>`_
     - \-

.. _format-conversion-houtouse:

利用方法
------------------------------------------------

.. _format-conversion-convert-date:

日付フォーマット変換
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここではMoment.jsを使用して日付フォーマットを変換する方法を紹介する。
| サンプルは、日付入力欄のフォーカス時に「YYYYMMDD」形式に変換し、フォーカスアウト時に「YYYY/MM/DD」形式に変換する。

| HTMLでは、jQuery、Moment.jsと独自に実装したJavaScript(convert-date.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="../lib/vendor/moment/2.22.2/moment.min.js"></script>
    <script src="js/check-date.js"></script>

| JavaScript(convert-date.js)では、以下のように処理を実装する。

.. code-block:: javascript

  // convert-date.js

  'use strict';

  $(function () {
    $('#date').on({

      // (1)
      'focus' : function () {
        var date = $('#date').val();
        if (date === '') {
          return;
        }

        // (2)
        $('#date').val(moment(date, 'YYYY/MM/DD', true).format('YYYYMMDD'));
      },

      // (3)
      'blur' : function () {
        var date = $('#date').val();
        if (date === '' || moment(date, 'YYYY/MM/DD', true).isValid()) {
          return;
        }

        // (4)
        $('#date').val(moment(date, 'YYYYMMDD', true).format('YYYY/MM/DD'));
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
      - | フォーカス時に発生するイベントを定義する。
    * - | (2)
      - | スラッシュなしのフォーマットに変換する。
    * - | (3)
      - | フォーカスアウト時に発生するイベントを定義する。
    * - | (4)
      - | スラッシュありのフォーマットに変換する。

| \ ``moment``\ メソッドの第1引数に日付（文字列）、第2引数にフォーマットを設定すると、フォーマットに従ってパースする。\ ``format``\ メソッドにフォーマットを設定すると、指定したフォーマットに変換した日付を取得できる。

.. note::

   \ ``moment``\ の第3引数に\ ``true``\ を設定すると、Strictモードで動作する。Strictモードは、入力値がフォーマットと一致していることを厳密にチェックし、一致する場合のみ有効な日付としてパースする。

   第3引数を省略、または\ ``false``\ を設定した場合、Forgivingモードで動作する。Forgivingモードは、入力値がフォーマットとある程度異なっても有効な日付としてパースする。

   各モードの挙動の差異について、以下に例を示す。

     .. code-block:: javascript

        // (1)
        // (1-a)
        moment('2015-01-01', 'YYYY/MM/DD', false).format('YYYYMMDD');

        // (1-b)
        moment('2015-01-01', 'YYYY/MM/DD', true).format('YYYYMMDD');

        // (2)
        // (2-a)
        moment('2015/01/31 is Date', 'YYYY/MM/DD', false).format('YYYYMMDD');

        // (2-b)
        moment('2015/01/31 is Date', 'YYYY/MM/DD', true).format('YYYYMMDD');

     .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
     .. list-table::
         :header-rows: 1
         :widths: 10 80

         * - 項番
           - 説明
         * - | (1)
           - | 入力値(2015-01-01)とフォーマット(YYYY/MM/DD)が異なる場合。
         * - | (1-a)
           - | Forgivingモードの場合では返却値が\ ``20150101``\ となる。
         * - | (1-b)
           - | Strictモードでは\ ``Invalid date``\ となる。
         * - | (2)
           - | 入力値(2015/01/31 is Date)に日付以外が含まれる場合。
         * - | (2-a)
           - | Forgivingモードの場合では返却値が\ ``20150131``\ となる。
         * - | (2-b)
           - | Strictモードでは\ ``Invalid date``\ となる。

   また、Forgivingモードはフォーマットを厳密にチェックしないため、入力値が誤って変換される可能性がある。

     .. code-block:: javascript

        // (1)
        moment('01/12/2016', 'YYYY/MM/DD', false).format('YYYYMMDD');

     .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
     .. list-table::
         :header-rows: 1
         :widths: 10 80

         * - 項番
           - 説明
         * - | (1)
           - | 入力値(01/12/2016)とフォーマット(YYYY/MM/DD)が異なるが、Forgivingモードでは\ ``20011220``\ として解釈される。

   このように、Forgivingモードは故障に繋がる可能性があるため、Strictモードを利用することを推奨する。

.. warning::

   入力値に誤りがある場合、入力欄に「Invalid date」が出力される。メッセージの文言や出力位置は変更できないため、入力値の妥当性を事前にチェックし、エラーの場合はメッセージを出力するよう実装すること。チェック方法は\ :ref:`format-conversion-check-date`\ に記述する。

.. _format-conversion-check-date:

日付妥当性チェック
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、Moment.jsを使用して日付の妥当性をチェックする方法を紹介する。
| 本節の妥当性チェックは、入力値のフォーマットが正しいこと、日付が実在することを判定する。許容するフォーマットは指定できる。

| HTMLでは、jQuery、Moment.jsと独自に実装したJavaScript(check-date.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="../lib/vendor/moment/2.22.2/moment.min.js"></script>
    <script src="js/check-date.js"></script>

| JavaScript(check-date.js)では、日付の入力欄に\ ``blur``\ イベントが発生した際、入力値の妥当性をチェックする。
| \ ``moment``\ メソッドの引数に、入力値、フォーマットとStrictモードで実行するための\ ``true``\ を設定し、\ ``isValid``\ メソッドを実行する。

.. code-block:: javascript

  // check-date.js

  'use strict';

  $(function () {
    $('#date').on({

      // (1)
      'blur' : function () {
        var date = $('#date').val();

        // (2)
        var result = moment(date, 'YYYY/MM/DD', true).isValid();

        $('#date-area > span').remove();
        if (result) {
          $('#date-area').append('<span>入力値は正常です。</span>');
        } else {
          $('#date-area').append('<span>入力値に誤りがあります。</span>');
        }
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
      - | フォーカスアウト時に発生するイベントを定義する。
    * - | (2)
      - | 入力値の妥当性をチェックする。

| \ ``moment``\ メソッドは、日付をパースする際、フォーマットに合致していること、日付が実在することをチェックする。\ ``isValid``\ メソッドを実行すると、チェック結果を確認できる。パースに成功した場合は\ ``true``\ 、失敗した場合は\ ``false``\ が返却される。


.. note::

   複数のフォーマットを許容する場合、以下のように配列を設定すればよい。

     .. code-block:: javascript

       var result = moment(date, ['YYYY/MM/DD','YYYYMMDD'], true).isValid();


.. note::

   \ :ref:`format-conversion-convert-date`\ のサンプルに本節の妥当性チェックを組み合わせた実装例を以下に示す。

     .. code-block:: javascript

       // (1)
       'blur' : function () {
         var date = $('#date').val();

         // (2)
         var result = moment(date, 'YYYYMMDD', true).isValid();

         if (!result) {
           $('#form-area').append('<span>入力値に誤りがあります。</span>');
           return false;
         }

         // (3)
         $('#date').val(moment(date, 'YYYYMMDD', true).format('YYYY/MM/DD'));
       }

     .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
     .. list-table::
         :header-rows: 1
         :widths: 10 80

         * - 項番
           - 説明
         * - | (1)
           - | フォーカスアウト時に発生するイベントを定義する。
         * - | (2)
           - | 入力値の妥当性をチェックする。
         * - | (3)
           - | スラッシュありのフォーマットに変換する。


.. _format-conversion-convert-time:

時刻フォーマット変換
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここではMoment.jsを使用して時刻フォーマットを変換する方法を紹介する。
| サンプルは、時刻入力欄のフォーカス時に「HHmmss」形式に変換し、フォーカスアウト時に「HH:mm:ss」形式に変換する。

| HTMLでは、jQuery、Moment.jsと独自に実装したJavaScript(convert-time.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="../lib/vendor/moment/2.22.2/moment.min.js"></script>
    <script src="js/convert-time.js"></script>

| JavaScript(convert-time.js)では、以下のように実装する。

.. code-block:: javascript

  // convert-time.js

  'use strict';

  $(function () {
    $('#time').on({

      // (1)
      'focus' : function () {
        var time = $('#time').val();
        if (time === '') {
          return;
        }

        // (2)
        $('#time').val(moment(time, 'HH:mm:ss', true).format('HHmmss'));
      },

      // (3)
      'blur' : function () {
        var time = $('#time').val();
        if (time === '' || moment(time, 'HH:mm:ss', true).isValid()) {
          return;
        }

        // (4)
        $('#time').val(moment(time, 'HHmmss', true).format('HH:mm:ss'));
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
      - | フォーカス時に発生するイベントを定義する。
    * - | (2)
      - | コロンなしのフォーマットに変換する。
    * - | (3)
      - | フォーカスアウト時に発生するイベントを定義する。
    * - | (4)
      - | コロンありのフォーマットに変換する。

| \ ``moment``\ メソッドの第1引数に時刻（文字列）、第2引数にフォーマットを設定すると、フォーマットに従ってパースする。\ ``format``\ メソッドにフォーマットを設定すると、指定したフォーマットに変換した時刻を取得できる。

.. warning::

   \ ``moment``\ のパラメーターに不正な値を設定した場合、入力欄に「Invalid date」や想定外の値が出力される。入力値の妥当性を事前にチェックし、エラーの場合はメッセージを出力するよう実装すること。:ref:`format-conversion-check-date`\ と同様の方法でチェックできる。

.. _format-conversion-convert-zenkaku-hankaku:

特定文字の全角半角変換
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、JavaScriptを使用して、特定文字（「英字」、「数字」や一部の「記号」）を全角文字・半角文字に相互変換する実装例を紹介する。

| HTMLでは、jQueryと独自に実装したJavaScript(convert-zenkaku-hankaku.js)を読み込む。

.. code-block:: html

    <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/convert-zenkaku-hankaku.js"></script>

| JavaScript(convert-zenkaku-hankaku.js)では、入力欄に\ ``blur``\ イベントが発生した際、独自に実装した\ ``convertStyle``\ 関数を実行する。コードを区切って説明する。

| まず\ ``style``\ オブジェクトに変換対象の全角文字・半角文字を定義する。


.. code-block:: javascript

    var style = {
      'zenkaku' : 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０　（）｛｝［］＜＞＝＋‐－＊／｜＿？，．￥＠＾；：！＃＄％＆',
      'hankaku' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 (){}[]<>=+--*/|_?,.\\@^;:!#$%&'
    };

| \ ``convertStyle``\ 関数は、\ ``input``\ の文字数分ループする。
| 入力値の文字が\ ``fromStyle``\ に格納された文字に該当する場合、\ ``toStyle``\ の文字に置換する。

.. code-block:: javascript

    // (1)
    var convertStyle = function (input, type) {
      var fromStyle;
      var toStyle;
      var output = [];

      switch (type) {
        case 'zenkaku':

          // (2)
          fromStyle = style['hankaku'];

          // (3)
          toStyle = style['zenkaku'];
          break;
        default:

          // (4)
          fromStyle = style['zenkaku'];

          // (5)
          toStyle = style['hankaku'];
          break;
      }

      var pos;
      for (var i = 0, len = input.length; i < len; i++) {

        // (6)
        pos = fromStyle.indexOf(input.charAt(i));
        if (pos < 0) {

          // (7)
          output[i] = input.charAt(i);
        } else {

          // (8)
          output[i] = toStyle.charAt(pos);
        }
      }
      return output.join('');
    };

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 特定文字の全角半角変換用の関数を定義する。
        | 第1引数に変換対象の文字列を指定し、第2引数に変換形式(半角から全角に変換する場合は「zenkaku」、全角から半角に変換する場合は「hankaku」)を指定する。
    * - | (2)
      - | typeが「zenkaku」の場合、変換前の文字列に半角文字列を格納する。
    * - | (3)
      - | 変換後の文字列に全角文字列を格納する。
    * - | (4)
      - | typeが「hankaku」の場合、変換前の文字列に全角文字列を格納する。
    * - | (5)
      - | 変換後の文字列に半角文字列を格納する。
    * - | (6)
      - | 入力値の位置を取得する。
    * - | (7)
      - | 該当しない場合、入力値を格納する。
    * - | (8)
      - | 該当する場合、'toStyle'の文字を格納する。

| 入力欄にblurイベントが発生した際、\ ``convertStyle``\ 関数を呼び出す。第2引数に変換後の文字種（「zenkaku」・「hankaku」）を指定する。

.. code-block:: javascript

    $('#zenkaku-string').on({

      // (9)
      'blur' : function () {

        var st = $('#zenkaku-string').val();

        // (10)
        $('#zenkaku-string').val(convertStyle(st, 'zenkaku'));
      }
    });

    $('#hankaku-string').on({
      'blur' : function () {

        var st = $('#hankaku-string').val();

        // (11)
        $('#hankaku-string').val(convertStyle(st, 'hankaku'));
      }
    });
  });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (9)
      - | フォーカスアウト時に発生するイベントを定義する。
    * - | (10)
      - | 半角文字を全角に変換する。
    * - | (11)
      - | 全角文字を半角に変換する。

.. note::

   本実装例は、styleオブジェクトのzenkakuとhankakuに、変換対象の文字が対になるように定義する。変換時は対象文字の定義位置を取得し、相対する文字種から同じ位置に定義されている文字を取得することで変換処理を実現している。

   実装例のstyleオブジェクトにない文字を変換したい場合、styleオブジェクトの定義内容を変更すればよいが、定義する文字や順序に誤りが無いよう注意すること。

.. note::

   「英字」を大文字、または小文字のみに変換する場合、JavaScriptの\ ``toUpperCase``\ ・\ ``toLowerCase``\ で入力値を変換すればよい。
