.. _uicomponent-basic-usages:

ライブラリの基本的な使用方法
================================================

ここでは、UIコンポーネントを扱うライブラリであるjQuery UIとBootstrapの基本的な使用方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - |using-library-name|
     - |reference-page|
   * - jQuery UI
     - `jQuery UI <http://jqueryui.com/>`_
   * - Bootstrap
     - `Getting started・Bootstrap <http://getbootstrap.com/getting-started/#template>`_


.. _basic-usages-jqueryui:

jQuery UI基本構成サンプル
------------------------------------------------

HTML内でjQuery UI用のスタイルシートを読み込む。また、依存ライブラリであるjQuery、jQuery UIのJavaScriptファイルを順に読み込む。

この例は基本構成なので実際にUIコンポーネントは配置しないが、以降のサンプルではここにマークアップや独自に実装したJavaScriptを追加していく。

.. code-block:: html

  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>jQuery UI基本構成サンプル</title>

      <!-- (1) -->
      <link rel="stylesheet" href="../lib/vendor/jquery-ui/1.11.1/jquery-ui.min.css">
    </head>
    <body>

      <h1>jQuery UI基本構成サンプル</h1>

      <!-- (2) -->
      <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>

      <!-- (3) -->
      <script src="../lib/vendor/jquery-ui/1.11.1/jquery-ui.min.js"></script>

      <!-- (4) -->
      <script src="js/default.js"></script>
    </body>
  </html>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | jQuery UIのスタイルシートを読み込む。
    * - | (2)
      - | 依存ライブラリを読み込む。
    * - | (3)
      - | jQuery UIのJavaScriptを読み込む。
    * - | (4)
      - | 独自実装したJavaScriptファイルを読み込む。

.. _basic-usages-bootstrap:

Bootstrap基本構成サンプル
------------------------------------------------

HTML内でBootstrap用のスタイルシートを読み込む。また、依存ライブラリであるjQuery、BootstrapのJavaScriptファイルを順に読み込む。

この例は基本構成なので実際にUIコンポーネントは配置しないが、以降のサンプルではここにマークアップや独自に実装したJavaScriptを追加していく。

.. code-block:: html

  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Bootstrap基本構成サンプル</title>

      <!-- (1) -->
      <link rel="stylesheet" href="../lib/vendor/bootstrap/3.2.0/css/bootstrap.min.css">
    </head>
    <body>

      <h1>Bootstrap基本構成サンプル</h1>

      <!-- (2) -->
      <script src="../lib/vendor/jquery/1.11.1/jquery-1.11.1.min.js"></script>

      <!-- (3) -->
      <script src="../lib/vendor/bootstrap/3.2.0/js/bootstrap.min.js"></script>

      <!-- (4) -->
      <script src="js/default.js"></script>
    </body>
  </html>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | Bootstrapのスタイルシートを読み込む。
    * - | (2)
      - | 依存ライブラリを読み込む。
    * - | (3)
      - | BootstrapのJavaScriptを読み込む。
    * - | (4)
      - | 独自実装したJavaScriptファイルを読み込む。


.. note::
   基本構成サンプルではdefault.jsを読み込んでいるが、以降の節ではそれぞれ実装したJavaScriptファイルを読み込む。

.. note::
   jQuery UI、Bootstrapで色あいなどの見た目について変更する場合は、次のような方法がある。

   * 既定のルールを上書きするよう、独自にスタイルシートを作成する。変更箇所が少ない場合はこの方法が手軽である。
   * サードパーティが作成・配布しているテーマを探す。ただし動作や表示の確認を十分に行う必要がある。
   * 公式サイトにあるテーマのカスタマイズページを利用する。jQuery UIは\ `ThemeRoller | jQuery <http://jqueryui.com/themeroller/>`_\ 、Bootstrapは\ `Customize and download・Bootstrap <http://getbootstrap.com/customize/>`_\ にある。

   * 公式リポジトリからソースコードを取得してビルドする。最も柔軟にカスタマイズできるが難易度は高い。
