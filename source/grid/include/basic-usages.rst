.. _grid-basic-usages:

ライブラリの基本的な使用方法
================================================

ここでは、テーブルを扱うライブラリであるSlickGridとtablesorterの基本的な使用方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGrid基本構成サンプル <../samples/slickgrid/default.html>`_
     - `SlickGrid Wiki <https://github.com/6pac/SlickGrid/wiki>`_
   * - tablesorter
     - `tablesorter基本構成サンプル <../samples/tablesorter/default.html>`_
     - `jQuery plugin: Tablesorter 2.0 <https://mottie.github.io/tablesorter/docs/>`_


.. _basic-usages-slickgrid:

SlickGrid基本構成サンプル
------------------------------------------------

HTMLでは、SlickGrid用のスタイルシート、依存ライブラリ、SlickGridモジュール、さらにSlickGridでテーブルを生成するために実装したJavaScriptファイル(js/default.js)を読み込む。

.. literalinclude:: /_samples/samples/slickgrid/default.html
   :language: html

JavaScript(js/default.js)では、\ ``Slick.Grid``\ コンストラクタを実行することで、指定した領域にテーブルを生成する。
\ ``Slick.Grid``\ コンストラクタのシグネチャは次のとおり。

.. js:function:: Slick.Grid(container, data, columns[, options])
   :noindex:

   :param String container: テーブルの表示領域となる要素のセレクタ
   :param Array|DataView|Object data: テーブルで扱うデータ配列。データの表示条件をより詳細に制御する場合は、配列の代わりに、\ ``DataView``\ オブジェクトや、\ ``getLength``\ と\ ``getItem``\ 関数を持つオブジェクトを指定することもできる。
   :param Array columns: カラム定義。各カラムごとに表示名やデータ項目などのプロパティをもつオブジェクトを配列で複数指定する。
   :param Object options: 動作オプション

.. literalinclude:: /_samples/samples/slickgrid/js/default.js
   :language: javascript

カラム定義は、ソースコードリスト上の(1)で行っている。この例では6列のカラムを定義し、それぞれIDやヘッダの表示テキスト(\ ``name``\ )、表示データ名(\ ``field``\ )を指定している。

オプションの設定は(2)で行う。この例は基本構成なのでオプションは指定しないが、以降のサンプルではここに設定を追加していく。

データの作成は(3)で行っている。この例では1000件のデータを作成している。各データの\ ``title``\ などのデータは、カラム定義の\ ``field``\ プロパティと一致するカラムに表示される。意図した通りにデータが表示されない場合は、カラム定義とデータのプロパティ名が一致していない可能性があるため、見直すこと。

最後に(4)で、これらの設定値やデータを用いて ``Slick.Grid`` コンストラクタを実行しテーブルを作成している。


.. _slickgrid-required-resources:

.. note::

  SlickGridには様々な依存ライブラリやスタイルシート、機能拡張用モジュールがあり、使用する機能に応じてこれらを読み込む必要がある。以下に、それぞれのファイルがどのような際に必要とされるかをまとめている(用途の少ないものは省略している)。

    .. list-table:: 依存ライブラリ
      :header-rows: 1
      :widths: 40 60

      * - 依存ライブラリ名
        - 必要なケース
      * - jQuery
        - 常に必要
      * - jQuery UI Sortable
        - 常に必要\ [#slickgrid-requires-jquery-ui]_\
      * - jquery.event.drag
        - 常に必要
      * - jquery.event.drop
        - 常に必要\ [#slickgrid-not-requires-jqdrop]_\

    .. list-table:: SlickGrid用スタイルシート
      :header-rows: 1
      :widths: 40 60

      * - ファイル名
        - 必要なケース
      * - slick.grid.css
        - 常に必要
      * - css/smoothness/jquery-ui-1.8.16.custom.css
        - jQuery UIのスタイルを適用する場合、またはページネーション機能を要する場合
      * - controls/slick.pager.css
        - ページネーション機能を要する場合

    .. list-table:: SlickGridモジュール
      :header-rows: 1
      :widths: 40 60

      * - ファイル名
        - 必要なケース
      * - slick.core.js
        - 常に必要
      * - slick.grid.js
        - 常に必要
      * - slick.editors.js
        - データの編集機能を要する場合
      * - slick.dataview.js
        - データの表示条件を詳細に制御する必要のある場合\ [#slickgrid-dataview]_\
      * - plugins/slick.cellrangeselector.js
        - セル選択機能を要する場合(ドラッグアンドドロップでの選択操作を可能にする)
      * - plugins/slick.cellrangedecorator.js
        - セル選択機能を要する場合(選択範囲を可視化する)
      * - plugins/slick.cellselectionmodel.js
        - セル選択機能を要する場合(データ選択範囲をプログラムから変更可能にする)
      * - plugins/slick.cellcopymanager.js
        - コピーアンドペースト機能を要する場合
      * - plugins/slick.rowselectionmodel.js
        - 行選択機能を要する場合
      * - plugins/slick.rowmovemanager.js
        - 行の並び替え機能を要する場合
      * - controls/slick.pager.js
        - ページネーション機能を要する場合


.. [#slickgrid-requires-jquery-ui] 公式ドキュメントではソート機能を有効化した場合のみ必要と記載されているが、他にカーソル操作での選択セル移動機能や、セルのコピーアンドペースト機能などにも使用されている。そのため、基本的には常に読み込んでおくほうが無難ではあるが、ファイルサイズが比較的大きいため、極力読み込ませずに済ませたい場合には、動作確認を充分に行うこと。
.. [#slickgrid-not-requires-jqdrop] 公式ドキュメントでは依存ライブラリとして記載されているが、実際のところは利用されていない。よって、テストで正常に動作することが確認できれば、読み込まなくてもよい。
.. [#slickgrid-dataview] データ表示条件を詳細に制御できる部品\ ``DataView``\ が利用可能になる。これによって、ページネーション、複数カラムでのソート、検索、グループ化などが可能になる。詳細は https://github.com/6pac/SlickGrid/wiki を参照すること。

.. note::
   ウインドウの幅に併せてテーブルの幅を変更したい場合は、SlickGridの提供機能ではないが、次のように記述して対応できる。

     .. code-block:: javascript

          // (2) SlickGridの動作オプション
          var options = {

            // テーブルの幅をコンテナの幅に合わせるオプションを指定
            forceFitColumns: true
          };


     .. code-block:: javascript

          // 画面初期化処理
          $(function () {

            // (4) SlickGridテーブルを作成
            // SlickGridのインスタンスをgrid変数に格納
            var grid = new Slick.Grid('#myGrid', data, columns, options);
          });


     .. code-block:: javascript

          // ウィンドウサイズが変更された際に発生するイベントで、
          // コンテナ幅にテーブルのサイズを合わせるメソッドを実行する処理を追加
          $(window).resize(function () {
            grid.resizeCanvas();
          });

   ただし、ウインドウサイズを変更するたびに処理が発生するため、動作がもたつくことがある。
   頻繁にウインドウサイズの変更を求められる画面では注意すること。

.. note::
   jquery.event.drag, jquery.event.drop については、`公式サイト <http://threedubmedia.com/>`_  で提供されている最終リリースバージョンは 2.2 であるが、SlickGrid(6pac) の依存ライブラリバージョンとして非公認であるバージョン 2.3 の利用を推奨していることから、本ガイドラインのサンプルプログラムにおいてもバージョン 2.3 を使用する。詳細は https://github.com/6pac/SlickGrid/wiki を参照すること。

.. _basic-usages-tablesorter:

tablesorter基本構成サンプル
------------------------------------------------

HTMLでは、tablesorter用のスタイルシート、依存ライブラリ、tablesorterモジュール、さらにtablesorterを有効にするために実装したJavaScriptファイル(js/default.js)を読み込む。

.. literalinclude:: /_samples/samples/tablesorter/default.html
   :language: html

JavaScript(js/default.js)では、table要素に対し、\ ``tablesorter``\ メソッドを実行することで、指定したテーブルにtablesorterの動作を適用する。また、\ ``tablesorter``\ メソッドのプロパティとしてオプションを指定することで、様々な動作を実現することができる。

.. literalinclude:: /_samples/samples/tablesorter/js/default.js
   :language: javascript


.. _tablesorter-required-resources:

.. note::

   tablesorterには様々な依存ライブラリやスタイルシート、機能拡張用モジュールがあり、使用する機能に応じてこれらを読み込む必要がある。以下に、それぞれのファイルがどのような際に必要とされるかをまとめている(用途の少ないものは省略している)。

    .. list-table:: 依存ライブラリ
      :header-rows: 1
      :widths: 40 60

      * - 依存ライブラリ名
        - 必要なケース
      * - jQuery
        - 常に必須

    .. list-table:: tablesorter用スタイルシート
      :header-rows: 1
      :widths: 40 60

      * - ファイル名
        - 必要なケース
      * - css/theme.default.css
        - 常に必要

    .. list-table:: tablesorterモジュール
      :header-rows: 1
      :widths: 40 60

      * - ファイル名
        - 必要なケース
      * - js/jquery.tablesorter.js
        - 常に必要
      * - js/widgets/widget-scroller.js
        - ヘッダの固定を実現する場合
      * - js/widgets/widget-editable.js
        - データの編集機能を要する場合
      * - addons/pager/jquery.tablesorter.pager.js
        - ページネーション機能を要する場合


.. note::
   基本構成サンプルではdefaut.jsを読み込んでいるが、以降の節ではそれぞれ実装したJavaScriptファイルを読み込む。

.. note::
   SlickGridではJavaScriptでセルの値を設定するのに対し、tablesorterではHTMLに直接マークアップするのが基本的な使い方である。

   この仕組みのため、tablesorterではページのロード時に、tablesorterの処理が適用前のテーブルが一時的に表示されることがある。これを防ぎたい場合は、\ ``table``\ 要素のスタイルに\ ``display: none``\ を指定した上で、JavaScriptで ``$('#tablesorter').tablesorter().show()`` のように記述することで、tablesorterの処理が完了後に表示されるようにすればよい。
