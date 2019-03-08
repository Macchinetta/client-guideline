.. _carousel:

カルーセル
================================================

.. _carouselOutline:

概要
------------------------------------------------

| カルーセルとは写真やバナー等のコンテンツを配置したパネルをスライドさせて表示するウェブデザインのことを指す。
| JavaScriptとCSSを組み合わせて独自実装することも可能だが、実装するコードが複雑になるためここではslickライブラリを利用してカルーセルを実現する方法を紹介する。
| slickライブラリを使用することで単純なスライド、自動スライド、画像のlazy loadやレスポンシブ対応を簡易な実装で実現することが可能になる。

| Bootstrapではプラグインライブラリ(carousel.js)を使用することでカルーセルを実現することができる。
| マークアップ形式とJavaScript形式による2通りの実装方法について紹介する。

.. figure:: /images/carousel.png
   :alt: carousel
   :align: center

   **図: カルーセルの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - slick
     - - `基本的なカルーセル <../samples/slick/carousel-basic.html>`__
       - `センターモード <../samples/slick/carousel-center.html>`__
       - `ナビゲーション <../samples/slick/carousel-navigation.html>`__
     - `slick - the last carousel you'll ever need <http://kenwheeler.github.io/slick/>`__
   * - Bootstrap
     - - `基本的な使い方(マークアップ形式) <../samples/bootstrap/carousel-markup.html>`__
       - `基本的な使い方(JavaScript形式) <../samples/bootstrap/carousel-javascript.html>`__
     - `Bootstrap - Carousel <https://getbootstrap.com/docs/3.3/javascript/#carousel>`__

.. _carouselHowToUse:

利用方法(slick)
------------------------------------------------

.. warning::

   ブラウザによっては初期表示時に一瞬レイアウトが崩れて(カルーセル内のコンテンツが縦に並んで)見える事がある。
   レイアウト崩れが許容できない場合、カルーセル部分に該当するdivタグを初期状態では表示させないようにし、
   slick.jsの読み込み完了後に該当のdivタグを表示することで、縦に並ぶ瞬間を見えなくするなどの対処( :ref:`carouselLayout` を参照 )を行う必要がある。
   しかし、初期表示時にカルーセル内のコンテンツが一瞬見えなくなるため、それらが許容できない場合、別のライブラリを検討する必要がある。

.. _carouselBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| HTML内でslick用のスタイルシートとJavaScriptファイルを読み込む。
| また、slickはjQueryに依存するため、HTML内でjQueryのJavaScriptファイルを読み込む。
| 次に、カルーセル表示用の領域をdivで作成し、div内にカルーセルで表示するコンテンツを1コンテンツ(＝1div要素)で配置する。

.. code-block:: html

   <!DOCTYPE html>
   <html>

     <head>
       <meta charset="UTF-8">
       <title>カルーセル</title>

       <!-- (1) -->
       <link rel="stylesheet" href="../lib/vendor/slick/1.8.1/slick.css" />
       <link rel="stylesheet" href="../lib/vendor/slick/1.8.1/slick-theme.css" />
       <!-- (2) -->
       <link rel="stylesheet" href="./css/carousel-custom.css" />

     </head>

     <body>
       <h1>カルーセル</h1>
       <h2>シンプルなカルーセル</h2>
       <div class="content">

         <div class="sliderP">
           <div class="slider carousel-basic">
             <div><h3>1</h3></div>
             <div><h3>2</h3></div>
             <div><h3>3</h3></div>
             <div><h3>4</h3></div>
             <div><h3>5</h3></div>
             <div><h3>6</h3></div>
           </div>
         </div>

       </div>

       <!-- (3) -->
       <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
       <script src="../lib/vendor/slick/1.8.1/slick.js"></script>
       <script src="./js/carousel-basic.js"></script>
     </body>

   </html>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | slickのスタイルシートを読み込む。
    * - | (2)
      - | 独自に実装したスタイルシートを読み込む。
    * - | (3)
      - | jQuery、slickと独自に実装したJavaScriptを読み込む。

| JavaScript(carousel-basic.js)では、HTMLで作成したカルーセル表示領域を指定し、\ ``slick``\ メソッドを実行する。

.. code-block:: javascript

   // carousel-basic.js

   'use strict';

   // (1)
   $(function () {
     $('.carousel-basic').slick({
       dots: true,
       slidesToShow: 4,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed: 2000
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | カルーセルを定義する。
        | \ ``slick``\ メソッド内ではオプションを指定することが可能となっており、必要に応じて設定することでカルーセルの挙動をカスタマイズすることができる。


| 上記のサンプルでは以下のオプションを指定している。

.. list-table::
   :header-rows: 1
   :widths: 20 65 15

   * - |option-name|
     - |summary|
     - |default-value|
   * - dots
     - カルーセル表示するコンテンツに対してドットを付与する
     - false
   * - slidesToShow
     - カルーセル表示用の領域で一度に表示するコンテンツの数を設定する
     - 1
   * - slidesToScroll
     - カルーセル内のコンテンツをスライドする際に、一回のスライドでスクロールするコンテンツの数を設定する
     - 1
   * - autoplay
     - カルーセル内のコンテンツを自動的にスライドさせる
     - false
   * - autoplaySpeed
     - autoplayがtrueの場合に自動的にスライドを実行する間隔(ミリ秒)を設定する
     - 3000

| また、上記のサンプルではカルーセル上にマウスカーソルを移動すると自動スライドが停止する。
| これは自動スライドの動作に影響する\ ``pauseOnHover``\ オプションがデフォルトで\ ``true``\ となっているためである。

.. _carouselCenter:

パネルを中央表示にする
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| カルーセルで表示するパネルはデフォルト設定では左端のパネルを現在表示中のパネルとして扱う。
| 現在表示中のパネルを中央に表示するにはslickの\ ``centerMode``\ オプションを指定する。

.. code-block:: javascript

   // carousel-center.js

   'use strict';

   // (1)
   $(function () {
     $('.carousel-center').slick({
       dots: true,
       centerMode: true,
       slidesToShow: 3
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | カルーセルを中央表示するように定義する。

.. note::

   \ ``centerMode``\ を利用時には左右にコンテンツが見切れる状態となる。
   見切れるコンテンツの表示幅を変更するには、\ ``centerPadding``\ プロパティを設定し、ピクセル(px)或いはパーセンテージ(%)で調整することができる。

.. _carouselNavigation:

２つのカルーセルを同期する
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| slickでは２つのカルーセルを同期させ、ナビゲーションのように使用することができる。
| まず、カルーセルを２つ作成する。片方は表示用で、もう片方はナビゲーション用とする。

.. code-block:: html

   <div class="sliderP">
     <div class="slider sliderFor carousel-for">
       <div><h3>1</h3></div>
       <div><h3>2</h3></div>
       <div><h3>3</h3></div>
       <div><h3>4</h3></div>
       <div><h3>5</h3></div>
       <div><h3>6</h3></div>
     </div>
   </div>
   <div class="sliderP">
     <div class="slider carousel-nav">
       <div><h3>1</h3></div>
       <div><h3>2</h3></div>
       <div><h3>3</h3></div>
       <div><h3>4</h3></div>
       <div><h3>5</h3></div>
       <div><h3>6</h3></div>
     </div>
   </div>


| 表示用のカルーセルの\ ``slick``\ メソッドでは\ ``asNavFor``\ オプションにナビゲーション用カルーセルを指定し、\ ``slidesToShow``\ オプションに\ ``1``\ を設定する。
| また、\ ``arrows``\ オプションにfalseを指定し、左右の矢印のデフォルト表示をオフにする。
| さらに、\ ``fade``\ オプションをtrueに指定することでナビゲーション用カルーセルでスライドした際の表示用カルーセルのパネルの切り替えを、スクロールではなくフェードで実施する。
| 表示用のカルーセルの\ ``slick``\ メソッドでは\ ``asNavFor``\ オプションに表示用カルーセルを指定し、\ ``slidesToShow``\ オプションにナビゲーションに表示するパネルの数を設定する。

.. code-block:: javascript

   // carousel-navigation.js

   'use strict';

   // (1)
   $(function () {
     $('.carousel-for').slick({
       slidesToShow: 1,
       slidesToScroll: 1,
       asNavFor: '.carousel-nav',
       arrows: false,
       fade: true
     });
     $('.carousel-nav').slick({
       dots: true,
       slidesToShow: 3,
       slidesToScroll: 1,
       asNavFor: '.carousel-for',
       centerMode: true,
       focusOnSelect: true
     });
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ２つのカルーセルを同期するように設定する。

| この実装により、ナビゲーション用カルーセルがスクロールされると表示用カルーセルも同期して切り替わるように動作する。

|

.. note::

   slickライブラリにはここで記載した他にもコンテンツのlazy loadやレスポンシブ対応などの様々なオプションが用意されている。
   詳しくは\ `slickライブラリ公式サイト\ <http://kenwheeler.github.io/slick/>`__\ を参照すること。

.. _carouselLayout:

初期表示時のレイアウト崩れの低減について
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

初期表示時にカルーセル内のコンテンツが縦に並んで見えるのを防止する場合、
:ref:`carouselBasic` のHTMLサンプルの例では、次のような対処①または②を実施する。

①display属性の利用

.. code-block:: javascript

  /* carousel-custom.css */
  
  div.carousel-basic{
    /* (1) */
    display: none;
  }

.. code-block:: javascript

   // carousel-basic.js

   'use strict';

   $(function () {
     // (2)
     $('div.carousel-basic').show( );
     
     // 中略
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 初期状態では、カルーセル内のコンテンツをdisplay属性で非表示にする
    * - | (2)
      - | DOM構成完了後に、show( )でカルーセル内のコンテンツを表示する。

.. note::

   誤ったdivタグに対して display: none; を指定すると、
   非表示に位置ずれが発生するため、適切なdivタグに設定すること。

②visibility属性の利用

.. code-block:: javascript

  /* carousel-custom.css */
  
  .sliderP {
    /* 中略 */
    /* (1) */
    visibility: hidden;
  }

.. code-block:: javascript

   // carousel-basic.js

   'use strict';

   $(function () {
     // (2)
     $('.sliderP').css({'visibility':'visible'});
     
     // 中略
   });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 初期状態では、カルーセル内のコンテンツをvisibility属性で非表示にする
    * - | (2)
      - | DOM構成完了後に、visibility属性を変更しカルーセル内のコンテンツを表示する。

.. _carouselHowToUse-bootstrap:

利用方法(Bootstrap)
------------------------------------------------

.. _carousel-bootstrap-Basic:

基本的な使い方(マークアップ形式)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Bootstrap(マークアップ形式)でカルーセルを実装する場合、まずはHTMLにカルーセル用の領域をdiv要素で作成し、クラス名に\ ``carousel``\ を指定する。
| カルーセル用領域の中は３つのパーツで構成する。
|  1. インディケータ
|    ・ol要素を使用し、olのクラス名に\ ``carousel-indicators``\ を指定する
|    ・ol要素内にコンテンツの数だけli要素を作成する
|    ・li要素の\ ``data-target``\ 属性にカルーセル用領域のidを指定する
|    ・li要素の\ ``data-slide-to``\ 属性に0で始まる連番を付与する
|    ・初期表示するコンテンツの番号に\ ``class="active"``\ を設定する
|  2. コンテンツ
|    ・div要素を使用し、クラス名に\ ``carousel-inner``\ を指定する
|    ・div要素(carousel-inner)内にコンテンツの数だけdiv要素を作成し、クラス名に\ ``item``\ を指定する
|    ・初期表示するコンテンツはクラス名に\ ``item``\ と\ ``active``\ を指定する
|    ・コンテンツにキャプションを付けたい場合はdiv要素(item)内にdiv要素を作成し、クラス名に\ ``carousel-caption``\ を指定する。div要素(carousel-caption)内に記載した内容がコンテンツに重なって表示される。
|  3. コントローラ
|    ・スライドの前後の移動用にa要素を作成し、クラス名に\ ``carousel-conrtol``\ を指定する
|    ・左右のa要素にはそれぞれクラス名にleft/rightのどちらかを追加する
|    ・左右のa要素の\ ``data-slider``\ 属性にはそれぞれprev/nextのどちらかを指定する

.. code-block:: html

   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title>マークアップ形式のカルーセル</title>

       <link rel="stylesheet" href="../lib/vendor/bootstrap/3.3.7/css/bootstrap.min.css">
       <link rel="stylesheet" href="css/carousel.css">
     </head>
     <body>
       <div class="container">
         <h1>マークアップ形式のカルーセル</h1>

         <div id="carousel-example-generic" class="carousel slide background-grey" data-ride="carousel" data-interval="1000">

           <!-- (1) -->
           <ol class="carousel-indicators">
             <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
             <li data-target="#carousel-example-generic" data-slide-to="1"></li>
             <li data-target="#carousel-example-generic" data-slide-to="2"></li>
             <li data-target="#carousel-example-generic" data-slide-to="3"></li>
           </ol>

           <!-- (2) -->
           <div class="carousel-inner" role="listbox">
             <div class="item active">
               <div class="slide-content">slide 1</div>
               <div class="carousel-caption">
                 first slide
               </div>
             </div>
             <div class="item">
               <div class="slide-content">slide 2</div>
               <div class="carousel-caption">
                 second slide
               </div>
             </div>
             <div class="item">
               <div class="slide-content">slide 3</div>
               <div class="carousel-caption">
                 third slide
               </div>
             </div>
             <div class="item">
               <div class="slide-content">slide 4</div>
               <div class="carousel-caption">
                 fourth slide
               </div>
             </div>
           </div>

           <!-- (3) -->
           <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
             <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
             <span class="sr-only">Previous</span>
           </a>
           <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
             <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
             <span class="sr-only">Next</span>
           </a>

         </div>
       </div>

       <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
       <script src="../lib/vendor/bootstrap/3.3.7/js/bootstrap.min.js"></script>
     </body>
   </html>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | インディケータを定義する。
    * - | (2)
      - | コンテンツを定義する。
    * - | (3)
      - | コントローラを定義する。

| カルーセル用領域に指定した\ ``data-ride``\ 属性はカルーセル領域を複数配置する場合に初期化するための一意となる識別子を指定する。
| \ ``data-interval``\ 属性は指定することで設定した値（ミリ秒）の間隔毎にコンテンツを自動的にスライドしてくれる。

| なお、上記のサンプルはカルーセル上にマウスカーソルを移動すると自動スライドが停止する。
| これは自動スライドの動作に影響する\ ``data-pause``\ 属性がデフォルトで\ ``hover``\ となっているためである。

| 他にも、いくつかのオプションはオプション名に\ ``data-``\ というプレフィックスを追加することで設定できる。
| オプションの詳細については\ `Bootstrapの公式サイト\ <https://getbootstrap.com/docs/3.3/javascript/#carousel>`__\ を参照すること。

基本的な使い方(JavaScript形式)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Bootstrap(JavaScript形式)のHTMLはマークアップ形式と同様にカルーセル用領域のdiv要素を作成しクラス名にcarouselを設定する。
| インディケータとコントローラはJavaScriptで実装するためボタンとして実装し、コンテンツはマークアップ形式と同様に実装する。

.. code-block:: html

   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title>JavaScript形式のカルーセル</title>

       <link rel="stylesheet" href="../lib/vendor/bootstrap/3.3.7/css/bootstrap.min.css">
       <link rel="stylesheet" href="css/carousel.css">
     </head>
     <body>
       <div class="container">
         <h1>JavaScript形式のカルーセル</h1>

         <div id="carousel-example-generic" class="carousel slide background-grey">

           <!-- (1) -->
           <div class="carousel-inner">
             <div class="item active">
               <div class="slide-content">slide 1</div>
               <div class="carousel-caption">
                 first slide
               </div>
             </div>
             <div class="item">
               <div class="slide-content">slide 2</div>
               <div class="carousel-caption">
                 second slide
               </div>
             </div>
             <div class="item">
               <div class="slide-content">slide 3</div>
               <div class="carousel-caption">
                 third slide
               </div>
             </div>
             <div class="item">
               <div class="slide-content">slide 4</div>
               <div class="carousel-caption">
                 fourth slide
               </div>
             </div>
           </div>

           <!-- (2) -->
           <div class="custom-indicator">
              <input type="button" class="btn prev-slide" value="Previous Slide">
              <input type="button" class="btn slide-one" value="Slide 1">
              <input type="button" class="btn slide-two" value="Slide 2">
              <input type="button" class="btn slide-three" value="Slide 3">
              <input type="button" class="btn slide-four" value="Slide 4">
              <input type="button" class="btn next-slide" value="Next Slide">
           </div>

         </div>
       </div>

       <!-- (3) -->
       <script src="../lib/vendor/jquery/3.3.1/jquery.min.js"></script>
       <script src="../lib/vendor/bootstrap/3.3.7/js/bootstrap.min.js"></script>
       <script src="js/carousel-javascript.js"></script>
     </body>
   </html>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | コンテンツを定義する。
    * - | (2)
      - | インディケータとコントローラを定義する。
    * - | (3)
      - | jQueryとBootstrapのJavaScript、独自に実装したJavaScriptを読み込む。

| JavaScriptではまず、\ ``carousel``\ メソッドを使用しカルーセル用領域を初期化する。
| 初期化する際、\ ``carousel``\ メソッド内でオプションを指定することでカルーセルをカスタマイズすることができる。
| ボタンとして設置したインディケータとコントローラは、ボタン押下時のイベントとしてそれぞれのボタンに対応する\ ``click``\ メソッドを実装し、押下時のイベントとして\ ``.carousel('prev')``\ や\ ``.carousel('next')``\ 、\ ``.carousel('0')``\ を実装する。

.. code-block:: javascript

   // carousel-javascript.js

   'use strict';

   $(function () {
     $('.carousel').carousel({
       interval: 3000
     });

     $('.prev-slide').click(function () {
       $('#carousel-example-generic').carousel('prev');
     });

     $('.next-slide').click(function () {
       $('#carousel-example-generic').carousel('next');
     });

     $('.slide-one').click(function () {
       $('#carousel-example-generic').carousel(0);
     });

     $('.slide-two').click(function () {
       $('#carousel-example-generic').carousel(1);
     });

     $('.slide-three').click(function () {
       $('#carousel-example-generic').carousel(2);
     });

     $('.slide-four').click(function () {
       $('#carousel-example-generic').carousel(3);
     });
   });

| なお、上記のサンプルはカルーセル上にマウスカーソルを移動すると自動スライドが停止する。
| これは自動スライドの動作に影響する\ ``pause``\ オプションがデフォルトで\ ``hover``\ となっているためである。
