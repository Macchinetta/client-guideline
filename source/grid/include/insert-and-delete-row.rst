.. _insert-and-delete-row:

行追加・削除・編集
================================================

.. _insert-and-delete-row-overview:

概要
------------------------------------------------

ここでは、SlickGridおよびtablesorterを用いて、テーブルのデータ行の追加・削除を行う方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - SlickGrid
     - `SlickGridによる行追加・削除・編集サンプル <../samples/slickgrid/insert-and-delete-row.html>`_
     - `SlickGrid Wiki <https://github.com/6pac/SlickGrid/wiki>`_
   * - tablesorter
     - `tablesorterによる行追加・削除・編集サンプル <../samples/tablesorter/insert-and-delete-row.html>`_
     - * `jQuery plugin: Tablesorter 2.0 - Pager plugin <https://mottie.github.io/tablesorter/docs/example-pager.html>`_
       * `jQuery plugin: Tablesorter 2.0 - Content Editable <https://mottie.github.io/tablesorter/docs/example-widget-editable.html>`_

.. _insert-and-delete-row-howtouse:

利用方法
------------------------------------------------

SlickGridによる行追加・削除・編集サンプル
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

行追加・削除・編集のためのユーザインタフェースにはいくつかのパターンが考えられるが、
この例では、次のユーザインタフェースでの実現方法を説明する。

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - 行追加
     - テーブルの最下行にデータ追加用の空白行を設ける。
   * - 行削除
     - 各行の最後のカラムにデータ削除ボタンを設ける。
   * - データ編集
     - * カーソルキーで選択セルを移動できる。
       * セル選択状態でエンターキー、またはセルのダブルクリックで編集モードに入る。

.. figure:: /images/insert-and-delete-row-slickgrid.png
   :alt: 行追加・削除・編集ユーザインタフェース例
   :align: center

   **図: 行追加・削除・編集ユーザインタフェース例**

:ref:`basic-usages-slickgrid`\ に示したHTMLに加え、次のモジュールを読み込む。それ以外は同様なので省略する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - モジュール名
     - 用途
   * - slick.editors.js
     - データの編集機能を提供する。

JavaScript(insert-and-delete-row.js)では、ユーザインタフェースの操作によって発生するイベントを監視し、行データの追加・削除を行う。

.. literalinclude:: /_samples/samples/slickgrid/js/insert-and-delete-row.js
   :language: javascript

行追加機能は、ソースコードリスト上の(5)・(7)で実現している。
(5)でオプション\ ``enableAddRow``\ を\ ``true``\ にすることで、最下行にデータ追加用の空白行が表示されるようになり、
空白行に新たなデータが入力された際に\ ``onAddNewRow``\ イベントが発生するようになる。このイベントを(7)で監視し、
空白行へ追加されたデータを\ ``data``\ に追加して、テーブルを再描画している。

行削除機能は、(2)・(6)で実現している。
(2)のカラム定義では\ ``formatter``\ プロパティにHTML文字列を返す関数を指定して、\ ``delete-button``\ クラスを持つ
行削除用ボタンを作成している。このように\ ``formatter``\ プロパティに任意の文字列を返す関数を指定することで、
該当するカラムの各セル内にレンダリングされるHTMLを変更できる。
またテーブルがクリックされた際に発生する\ ``onClick``\ イベントを(6)で監視し、
もしクリックされた要素が(2)で作成した\ ``delete-button``\ クラスを持つボタンであれば、クリックされた行のデータを
\ ``data``\ から削除して、テーブルを再描画している。

データ編集機能は、(1)・(3)・(4)で実現している。
(1)のカラム定義では\ ``editor``\ プロパティにテキスト編集を可能にする\ ``Slick.Editors.Text``\ \ [#slickgrid-editors]_\ を指定し、
(3)でオプション\ ``editable``\ を\ ``true``\ にすることで、セルのデータ編集が可能になる。
またカーソルキーで選択セルを移動できるようにするため、(4)でオプション\ ``autoEdit``\ を\ ``false``\ にして
セル選択時に自動的に編集モードに入らないようにしている。

.. [#slickgrid-editors] テキスト編集をする\ ``Slick.Editors.Text``\ 以外にも、数値を編集する\ ``Slick.Editors.Integer``\ 、日付を編集する\ ``Slick.Editors.Date``\ などの編集用オブジェクトが提供されている。ただしドキュメントが整備されていないため、何が利用できるかは\ `slick.editors.jsのソースコード <https://github.com/6pac/SlickGrid/blob/master/slick.editors.js>`__\ を参照する必要がある。

.. note::
   SlickGridでは、データの追加や削除などを画面に反映するために\ ``invalidate``\ および\ ``render``\ などのメソッドを実行する必要がある。
   その際に使用するメソッドを以下に示す。

     .. list-table:: SlickGridの主なメソッド
       :header-rows: 1
       :widths: 40 60

       * - メソッド名
         - 説明
       * - `grid.render() <https://github.com/6pac/SlickGrid/wiki/Slick.Grid#render>`__
         - 再描画対象になっている行を再描画する。再描画対象を設定するには\ ``invalidateRow``\ などのメソッドを使用する。
       * - `grid.invalidateRow(Number) <https://github.com/6pac/SlickGrid/wiki/Slick.Grid#invalidateRow>`__
         - 特定行を再描画対象にする。引数には行インデックス番号(0から開始)を示す数値を与える。
       * - `grid.invalidateRows(Array<Number>) <https://github.com/6pac/SlickGrid/wiki/Slick.Grid#invalidateRows>`__
         - 複数の特定行を再描画対象にする。引数には行インデックス番号(0から開始)を示す数値の配列を与える。
       * - `grid.invalidateAllRows() <https://github.com/6pac/SlickGrid/wiki/Slick.Grid#invalidateAllRows>`__
         - 全ての行を再描画対象にする。
       * - `grid.invalidate() <https://github.com/6pac/SlickGrid/wiki/Slick.Grid#invalidate>`__
         - すべての行を再描画する。\ ``render``\ メソッドを実行しなくても再描画される。


tablesorterによる行追加・削除・編集サンプル
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

この例では、次のユーザインタフェースを設けることで実現する方法を説明する。

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - 行追加
     - ボタンクリックで、テーブルの最下行にデータを追加する。
   * - 行削除
     - 各行の最後のカラムにデータ削除ボタンを設ける。
   * - データ編集
     - セルをクリックすると編集モードに入る。


.. figure:: /images/insert-and-delete-row-tablesorter.png
   :alt: 行追加・削除・編集ユーザインタフェース例
   :align: center

   **図: 行追加・削除・編集ユーザインタフェース例**


:ref:`basic-usages-tablesorter`\ で示したHTMLに加え、次のモジュールを読み込む。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - モジュール名
     - 用途
   * - widget-scroller.js
     - データの編集機能を提供する。

また、各データ行に削除ボタンを用意する。以下に該当箇所を抜粋する。

.. literalinclude:: /_samples/samples/tablesorter/insert-and-delete-row.html
   :language: html
   :lines: 18-35

JavaScript(insert-and-delete-row.js)では、ユーザインタフェースの操作から行データの追加・削除・編集を行う。

.. literalinclude:: /_samples/samples/tablesorter/js/insert-and-delete-row.js
   :language: javascript


行追加機能は、 データ行の\ ``tr``\ 要素をテーブルの\ ``tbody``\ に追加した後、ソースコードリスト上の(2)で\ ``addRows``\ イベントを発生させることで、行が追加されたことをtablesorterに認識させる。

行削除機能は、 テーブルの\ ``tbody``\ から データ行の\ ``tr``\ を削除した後、ソースコードリスト上の(4)で\ ``update``\ イベントを発生させることで、行が削除されたことをtablesorterに認識させる。

データ編集機能は、ソースコードリスト上の(1)・(3)で実現している。
(1)で\ ``widgets``\ の配列に\ ``'editable'``\ を追加することで、データ編集機能の利用が可能になる。また、\ ``widgetOptions``\ で編集時の動作を設定している。
(3)では、後から追加された行も編集可能とするために\ ``refreshWidgets``\ イベントを発生させている。ただしこの処理は行追加が終わった後に実行される必要があるため、(2)のコールバック関数として指定している。

.. note::
   tablesorterはデータ編集を実現するために、\ ``contentEditable``\ 属性を用いているが、Internet Explorerでは\ ``contentEditable``\ 属性を\ ``td``\ 要素へ設定することができない。
   そのため、セルの値を\ ``contentEditable``\ 属性を設定できる\ ``div``\ 要素や\ ``span``\ 要素内に記述する必要がある。
   なお、このサンプルでは\ ``div``\ 要素を用いて実装している。


.. note::
   tablesorterでは、データの追加や削除などを行った後、それらの状態変化をtablesorterに認識させる必要がある。その際に発生させるイベント名を以下に示す。

   なお、tablesorterの公式リファレンスでは、これらの手動で発生させるイベントのことを *method* と表現しているため、参照する際は注意すること。本ガイドラインでもこれにならって *メソッド* と表現する。

     .. list-table:: tablesorterの主なメソッド
       :header-rows: 1
       :widths: 40 60

       * - メソッド名
         - 説明
       * - `addRows <https://mottie.github.io/tablesorter/docs/index.html#addrows>`_
         - 行を追加する際に実行する。tablesorterがキャッシュしているテーブル情報を更新する。
       * - `update <https://mottie.github.io/tablesorter/docs/index.html#addrows>`_
         - 行の削除する際に実行する。tablesorterがキャッシュしているテーブル情報を更新する。
       * - `refreshWidgets <https://mottie.github.io/tablesorter/docs/index.html#refreshwidgets>`_
         - 設定されているウィジェットを削除し、再設定する際に実行する。
