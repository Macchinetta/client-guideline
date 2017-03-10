.. _responsive-web-design:

レスポンシブウェブデザイン
================================================

.. _responsive-web-design-overview:

概要
------------------------------------------------

レスポンシブウェブデザインとは、画面のサイズによってレイアウトを組み替えることである。

ここでは、Bootstrapを用いた実装方法をサイドメニューとコンテンツがレイアウトされたサンプルを例に説明する。

このサンプルではウィンドウの幅が768px以上の幅で表示されている場合にはサイドメニューとコンテンツが1対2の比率で並んで表示され、それ未満だとサイドメニューとコンテンツが上下に並び表示される。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - Bootstrap
     - `レスポンシブウェブデザイン <../samples/bootstrap/responsive-web-design.html>`__
     - `CSS - Bootstrap #grid <http://getbootstrap.com/css/#grid>`__


.. _responsive-web-design-howtouse:

利用方法
------------------------------------------------

:ref:`basic-usages-bootstrap`\ で示したソースコードに、サイドメニュー領域とコンテンツ領域を次のように追加する。

.. code-block:: html

  <!-- (1) -->
  <div class="side col-sm-4">
    side
    <ul>
      <li><a href="#">menu 1</a></li>
      <li><a href="#">menu 2</a></li>
      <li><a href="#">menu 3</a></li>
    </ul>
  </div>

  <!-- (2) -->
  <div class="contents col-sm-8">
    contents
    <div class="article article1">
      article 1
    </div>
    <div class="article article2">
      article 2
    </div>
    <div class="article article3">
      article 3
    </div>
  </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | サイドメニュー領域を定義する。
    * - | (2)
      - | コンテンツ領域を定義する。

サイドメニュー領域には\ ``col-sm-4``\ クラスを、コンテンツ領域には\ ``col-sm-8``\ を指定する。

Bootstrapには、幅を12分割したグリッドに見立ててレイアウトできる機能があり、\ ``col-sm-4``\ や\ ``col-sm-8``\ のようなクラスはグリッド4個分または8個分の幅を確保する。数値部は、1から12までの値を指定できる。

これらのクラスは、レイアウト分岐点となる既定幅が定められており。ウィンドウの幅がこれを下回る場合には\ ``col-sm-4``\ や\ ``col-sm-8``\ は等しく幅100%のブロック要素としてレイアウトされる。つまり、これらのクラスを使用することで自動的にレスポンシブウェブデザインが実現される。

\ ``col-sm-``\ のプレフィックス部はレイアウト分岐点となる幅を768pxに設定することを意味し、より広い幅を指定する場合には\ ``col-md-``\ (992px)や、\ ``col-lg-``\ (1200px)が使用できる。

.. note::

   レスポンシブウェブデザインとせず単にグリッドレイアウトを使用したい場合は、\ ``col-xs-4``\ のような\ ``col-xs-``\ プレフィックスのクラスを使用する。

.. note::

   レスポンシブウェブデザインによって表示領域の幅が可変であることにより、特定のウィンドウ幅にした際にコンテンツの文字列が折り返されて表示されてしまうことがある。

   これに対し、次の対応方法が考えられる。

   1. メインとなるウィンドウサイズでは文字が折り返されないようレイアウトを調整し、それ以外の画面サイズでは折り返しが生じても無視する
   2. 該当箇所のCSSプロパティ\ ``text-overflow``\ に\ ``ellipsis``\ を指定することで、はみ出した文字を\ ``...``\ 表示に置き換える
   3. 固定幅、または\ ``min-width``\ を指定し、折り返さないようにする

   案2はレイアウト崩れは防止できるものの、画面表示される情報量が減るというデメリットがある。案3は、Bootstrapのグリッドレイアウトと共存させることができないため、実装のコストが高くなるというデメリットがある。

詳細について知りたい場合は、 `Bootstrap 公式ウェブサイトのリファレンス\ <http://getbootstrap.com/css/#grid>`__\ を参照すること。
