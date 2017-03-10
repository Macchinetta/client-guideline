.. include:: /variable-declaration.rst

.. _ui-component:

UIコンポーネント
********************

この章では、UIコンポーネントのライブラリであるjQuery UI、Bootstrapを用いた実装例を説明する。

それぞれのライブラリが実現できる機能は、次の表の通りである。

.. role:: text-red
.. role:: text-green

.. list-table:: ライブラリが実現できる機能
   :header-rows: 1
   :widths: 40 30 30

   * - 機能
     - jQuery UI
     - Bootstrap
   * - ボタン
     - :text-green:`✔`
     - :text-green:`✔`
   * - モーダルダイアログ
     - :text-green:`✔`
     - :text-green:`✔`
   * - モードレスダイアログ
     - :text-green:`✔`
     - :text-red:`✗`
   * - パンくずリスト表示
     -  :text-red:`✗`
     - :text-green:`✔`
   * - ドロップダウンリスト
     - :text-green:`✔`
     - :text-green:`✔`
   * - アコーディオン
     - :text-green:`✔`
     - :text-green:`✔`
   * - タブ
     - :text-green:`✔`
     - :text-green:`✔`
   * - スライダー
     - :text-green:`✔`
     - :text-red:`✗`
   * - カルーセル [#ui1]_
     - :text-red:`✗`
     - :text-green:`✔`
   * - 日付入力時のカレンダー表示 [#ui2]_
     - :text-green:`✔`
     - :text-red:`✗`
   * - オートコンプリート
     - :text-green:`✔`
     - :text-red:`✗`
   * - プログレスバーによる進捗度表示
     - :text-green:`✔`
     - :text-green:`✔`
   * - ドラッグアンドドロップ
     - :text-green:`✔`
     - :text-red:`✗`
   * - レスポンシブウェブデザイン
     - :text-red:`✗`
     - :text-green:`✔`

jQuery UIとBootstrapには重複する機能が多い。どちらのライブラリを使用するかは、以下で説明する実装方法や、特徴 (\ :ref:`jQuery UI概要 <libraries-overview-jqueryui>`\ および\ :ref:`Bootstrap概要 <libraries-overview-bootstrap>`\ ) を参考にして判断すること。

.. [#ui1] カルーセルについてはslickライブラリとBootstrapのプラグインライブラリを使用した方法を紹介する

.. [#ui2] 日付入力時のカレンダー表示についてはjQuery UIライブラリ、Bootstrapとbootstrap-datepickerライブラリを使用した方法を紹介する

.. note::

   jQuery UIとBootstrapを併用すると不具合が発生する場合がある。対処方法は付録の\ :ref:`bootstrapandjqueryui`\ を参照すること。

.. ライブラリの基本的な使用方法
.. include:: include/basic-usages.rst

.. ボタン
.. include:: include/button.rst

.. モーダルダイアログ
.. include:: include/modal-dialog.rst

.. モードレスダイアログ
.. include:: include/modeless-dialog.rst

.. パンくずリスト表示
.. include:: include/breadcrumb.rst

.. ドロップダウンリスト
.. include:: include/dropdown.rst

.. アコーディオン
.. include:: include/accordion.rst

.. タブ
.. include:: include/tab.rst

.. スライダー
.. include:: include/slider.rst

.. カルーセル
.. include:: include/carousel.rst

.. 日付入力時のカレンダー表示
.. include:: include/calendar.rst

.. オートコンプリート
.. include:: include/autocomplete.rst

.. プログレスバーによる進捗度表示
.. include:: include/progress-bar.rst

.. ドラッグアンドドロップ
.. include:: include/drag-and-drop.rst

.. レスポンシブウェブデザイン
.. include:: include/responsive-web-design.rst
