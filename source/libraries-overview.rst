.. include:: variable-declaration.rst

.. _libraries:

構成ライブラリ
******************************

この章では、構成ライブラリの概要を説明し、本ガイドラインで説明している機能と構成ライブラリの対応について示す。

.. _libraries-overview:

構成ライブラリ概要
==============================

.. role:: text-red
.. role:: text-green


\ |framework-name|\ の構成ライブラリはオープンソースソフトウェアから選出したものである。
この章では、構成ライブラリの\ |version|\ 、機能\ |summary|\ 、\ |official-website|\ 、及び\ |dependency|\ を説明する。
構成ライブラリの名称とそれらの機能の分類を以下の表に示す。:text-green:`✔` は構成ライブラリが機能を提供していることを示し、:text-red:`✗` は提供していないことを示す。

.. list-table:: 機能分類
   :header-rows: 1

   * - 機能分類
     - 説明
   * - UIコンポーネント
     - パネルやダイアログなどの画面に関する汎用部品の提供
   * - テーブル
     - 行の追加・削除、ソート、ページネーションなどテーブルについての機能を提供
   * - 操作性向上・制御
     - 入力操作の補助・制限など操作性についての機能を提供
   * - 非同期処理
     - 非同期処理を制御する機能を提供

.. list-table:: 構成ライブラリと機能分類
   :header-rows: 1
   :stub-columns: 1

   * -
     - UIコンポーネント
     - テーブル
     - 操作性向上・制御
     - 非同期処理
   * - jQuery
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-green:`✔`
     - :text-green:`✔`
   * - jQuery UI
     - :text-green:`✔`
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-red:`✗`
   * - Bootstrap
     - :text-green:`✔`
     - :text-green:`✔` (表示のみ)
     - :text-red:`✗`
     - :text-red:`✗`
   * - SlickGrid
     - :text-red:`✗`
     - :text-green:`✔`
     - :text-red:`✗`
     - :text-red:`✗`
   * - tablesorter
     - :text-red:`✗`
     - :text-green:`✔`
     - :text-red:`✗`
     - :text-red:`✗`
   * - Mousetrap
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-green:`✔`
     - :text-red:`✗`
   * - slick
     - :text-green:`✔`
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-red:`✗`
   * - bootstrap-datepicker
     - :text-green:`✔`
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-red:`✗`
   * - Moment.js
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-green:`✔`
     - :text-red:`✗`
   * - Parsley
     - :text-red:`✗`
     - :text-red:`✗`
     - :text-green:`✔`
     - :text-red:`✗`

jQuery
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - jQuery
   * - |version|
     - 3.3.1
   * - |official-website|
     - https://jquery.com/
   * - |summary|
     - * DOM要素の操作、イベント処理、アニメーション、Ajax通信等のAPIを提供するライブラリ。
       * JavaScriptを使用したウェブアプリケーション開発時のデファクトスタンダードとなっている。
   * - |dependency|
     - なし

.. _libraries-overview-jqueryui:

jQuery UI
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - jQuery UI
   * - |version|
     - 1.12.1
   * - |official-website|
     - https://jqueryui.com/
   * - |summary|
     - * UIコンポーネントなどを提供するライブラリ。
       * ドラッグアンドドロップなどのマウスベースのイベント処理、ダイアログや日付入力用カレンダーなどのウィジェットを提供する。
       * 作成したHTMLに対して、JavaScriptで提供されている各種メソッドを実行することで動的な部品を利用する。
   * - |dependency|
     - * jQuery

.. _libraries-overview-bootstrap:

Bootstrap
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - Bootstrap
   * - |version|
     - 3.3.7
   * - |official-website|
     - https://getbootstrap.com/
   * - |summary|
     - * UIコンポーネントなどを提供するライブラリ。
       * パネルやダイアログなどの汎用部品を数多く提供しており、レスポンシブウェブデザインやグリッドレイアウトにも対応している。
       * あらかじめ用意されたクラスやData APIと呼ばれる機能を用いることで、JavaScriptを書かずにHTMLをマークアップするだけで動的な部品が利用できる。
   * - |dependency|
     - * jQuery

.. _libraries-overview-slickgrid:

SlickGrid
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - SlickGrid
   * - |version|
     - 2.3.19
   * - |official-website|
     - https://github.com/6pac/SlickGrid/
   * - |summary|
     - * 高機能なテーブルを提供するライブラリ。
       * 行の追加・削除、列のサイズ変更、列の並び替えや、ソート、ページネーションなどを提供する。
       * 表示すべきデータが画面外に及ぶ場合は、スクロール操作がなされたタイミングで表示内容を書き換えるという手法で遅延レンダリングを実現している。生成するDOM要素の数を削減したことで大量のデータを扱える。
   * - |dependency|
     - * jQuery
       * jQuery UI Sortable
       * `jquery.event.drag <http://threedubmedia.com/code/event/drag>`_
       * `jquery.event.drop <http://threedubmedia.com/code/event/drop>`_

.. _libraries-overview-tablesorter:

tablesorter
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - tablesorter
   * - |version|
     - 2.30.7
   * - |official-website|
     - https://mottie.github.io/tablesorter/docs/
   * - |summary|
     - * 高機能なテーブルを提供するライブラリ。
       * 行の追加・削除、ソート、ページネーションなどを提供する。
   * - |dependency|
     - * jQuery

.. note::
   tablesorterは、SlickGridと比較して機能の数は少ないものの、各機能は特定のオプションを指定するだけで容易に利用できる。

   一方、SlickGridは、単にオプションを指定するだけでは利用できない機能が多い。その代わり、詳細な振る舞いを独自に実装するためのインターフェースやイベント発生の仕組みが提供されており、拡張性が高い。

   どちらを使用するか選択する際は、まずは実現したい機能がtablesorterで提供されているかどうかを確認し、もし機能が提供されておらず、かつ拡張も困難である場合にSlickGridを使用することを推奨する。


.. warning::
   同一ページ内でのtablesoterとSlickGridの同時利用は、それぞれのライブラリが競合する恐れがあるため、禁止とする。

Mousetrap
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - Mousetrap
   * - |version|
     - 1.6.2
   * - |official-website|
     - https://craig.is/killing/mice
   * - |summary|
     - * JavaScriptでキーボードショートカットを処理するためのライブラリ。
       * 特定のキー操作で任意の処理を実行したり、標準のショートカットキー操作の動作を無効化するコードの作成を支援する。
   * - |dependency|
     - なし

slick
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - slick
   * - |version|
     - 1.8.1
   * - |official-website|
     - http://kenwheeler.github.io/slick/
   * - |summary|
     - * カルーセルを実現するためのライブラリ。
       * レスポンシブ対応しておりブレイクポイントごとに細かな設定が可能、縦・横どちらのカルーセルにも対応、画像の遅延読み込みも可能。
   * - |dependency|
     - jQuery

.. _libraries-overview-bootstrapdatepicker:

bootstrap-datepicker
------------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - bootstrap-datepicker
   * - |version|
     - 1.8.0
   * - |official-website|
     - https://bootstrap-datepicker.readthedocs.io/en/latest/
   * - |summary|
     - * Bootstrap風のスタイルを持つ日付入力部品を提供するライブラリ。
       * jQuery UIと併用することなく、日付入力部品が使用できる。
   * - |dependency|
     - * jQuery
       * Bootstrap

.. _libraries-overview-moment:

Moment.js
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - Moment.js
   * - |version|
     - 2.22.2
   * - |official-website|
     - https://momentjs.com/
   * - |summary|
     - * 日付操作機能を提供するライブラリ。
       * 解析、検証、操作および表示などの機能を提供する。
   * - |dependency|
     - なし

.. _libraries-overview-parsley:

Parsley
---------------------

.. list-table::
   :stub-columns: 1
   :widths: 20 80

   * - |name|
     - Parsley
   * - |version|
     - 2.8.1
   * - |official-website|
     - http://parsleyjs.org/
   * - |summary|
     - * 入力値チェックを容易に実現するためのライブラリ。
   * - |dependency|
     - jQuery

.. _libraries-relation:

機能と構成ライブラリの対応
====================================

ここでは、ウェブアプリケーションの開発において頻繁に求められる機能の実現方法を、動作するサンプルと共に説明する。

なおサンプルは機能を実現する上で最低限必要な構成になっている。またサンプルの動作環境については :ref:`browser-env`\ を参照。

機能を実現するために使用するライブラリを以下の表に示す。

.. list-table:: 機能を実現するために使用するライブラリ
    :header-rows: 1
    :widths: 30 40 30

    * - 記載箇所
      - 機能
      - 使用するライブラリ
    * - :doc:`uicomponent/index`
      - :ref:`button`
      - * jQuery UI
        * Bootstrap
    * -
      - :ref:`modal-dialog`
      - * jQuery UI
        * Bootstrap
    * -
      - :ref:`modeless-dialog`
      - jQuery UI
    * -
      - :ref:`breadcrumb`
      - Bootstrap
    * -
      - :ref:`dropdown`
      - Bootstrap
    * -
      - :ref:`accordion`
      - Bootstrap
    * -
      - :ref:`tab`
      - * jQuery UI
        * Bootstrap
    * -
      - :ref:`slider`
      - jQuery UI
    * -
      - :ref:`carousel`
      - * slick
        * Bootstrap
    * -
      - :ref:`calendar`
      - * jQuery UI
        * bootstrap-datepicker
    * -
      - :ref:`autocomplete`
      - jQuery UI
    * -
      - :ref:`progress-bar`
      - * jQuery UI
        * Bootstrap
    * -
      - :ref:`drag-and-drop`
      - jQuery UI
    * -
      - :ref:`responsive-web-design`
      - Bootstrap
    * - :doc:`grid/index`
      - :ref:`insert-and-delete-row`
      - * SlickGrid
        * tablesorter
    * -
      - :ref:`move-row`
      - SlickGrid
    * -
      - :ref:`fixed-header`
      - * SlickGrid
        * tablesorter
    * -
      - :ref:`pagination`
      - * SlickGrid
        * tablesorter
    * -
      - :ref:`sort`
      - * SlickGrid
        * tablesorter
    * -
      - :ref:`swap-columns`
      - SlickGrid
    * -
      - :ref:`copy-and-paste`
      - SlickGrid
    * -
      - :ref:`slickgrid-with-ajax`
      - SlickGrid
    * - :doc:`manipulation/index`
      - :ref:`control-shortcut-key`
      - Mousetrap
    * -
      - :ref:`prevent-range-selection`
      - jQuery
    * -
      - :ref:`enable-and-disable-button`
      - jQuery
    * -
      - :ref:`prevent-continuous-click`
      - jQuery
    * -
      - :ref:`disable-right-click`
      - jQuery
    * -
      - :ref:`work-with-element`
      - jQuery
    * -
      - :ref:`format-conversion`
      - Moment.js
    * -
      - :ref:`validation`
      - Parsley
    * - :doc:`async/index`
      - :ref:`event-serialization`
      - jQuery
