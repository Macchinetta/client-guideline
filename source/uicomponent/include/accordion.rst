.. _accordion:

アコーディオン
================================================

.. _accordionOutline:

概要
------------------------------------------------

| アコーディオンとは、見出しとなるヘッダと、ペアとなるコンテンツ表示領域であるパネルで構成されていて、ヘッダをクリックすることでパネルを開くスタイルのことを指す。

.. figure:: /images/accordion.png
   :alt: accordion
   :align: center

   **図: アコーディオン（jQuery UI)**

| ここでは、jQuery UI 、Bootstrapそれぞれをを用いて、アコーディオンを表示する方法を説明する。

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - - `基本的なアコーディオン <../samples/jquery-ui/accordion-basic.html>`_
       - `全てのパネルを閉じることができるアコーディオン <../samples/jquery-ui/accordion-collapsible.html>`_
       - `全てのパネルを開くことができるアコーディオン <../samples/jquery-ui/accordion-multiple.html>`_
     - `Accordion | jQuery UI <http://jqueryui.com/accordion/>`_
   * - Bootstrap
     - `アコーディオン <../samples/bootstrap/accordion.html>`_
     - `JavaScript - Bootstrap #collapse <http://getbootstrap.com/javascript/#collapse>`_

.. _accordionHowToUse:

利用方法(jQuery UI)
------------------------------------------------

| ここでは、jQuery UI を用いてアコーディオンを表示する方法を説明する。
| なお、本ガイドラインおよびサンプルで紹介するオプション以外に、オプションやメソッドが提供されている。これらの詳細について知りたい場合は、\ `jQuery UI 公式ウェブサイトのリファレンス\ <http://jqueryui.com/accordion/>`__\ を参照すること。

.. _accordionBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、アコーディオンを構成する表示領域を追加する。

.. code-block:: html

    <!-- (1) -->
    <div id="accordion">
      <!-- (2) -->
      <h3>アコーディオン1</h3>
      <!-- (3) -->
      <div>
        <p>アコーディオン1の内容が表示されました。</p>
      </div>
      <!-- (2) -->
      <h3>アコーディオン2</h3>
      <!-- (3) -->
      <div>
        <p>アコーディオン2の内容が表示されました。</p>
      </div>
      <!-- (2) -->
      <h3>アコーディオン3</h3>
      <!-- (3) -->
      <div>
        <p>アコーディオン3の内容が表示されました。</p>
      </div>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | アコーディオン全体の領域を定義する。
    * - | (2)
      - | アコーディオンのヘッダ領域を定義する。
    * - | (3)
      - | アコーディオンのパネル領域を定義する。

| JavaScript(accordion-basic.js)で、次の処理を実行する。

.. code-block:: javascript

    // accordion-basic.js

    'use strict';

    // (1)
    $(function () {
      $('#accordion').accordion({
      });
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ ``accordion``\ メソッドを実行する。

| ヘッダとパネルは\ ``accordion``\ メソッドを実行する要素（サンプルではid="accordion"のdiv要素）の子要素（h3要素とdiv要素）から作成される。
| ヘッダとなる要素の直後の兄弟要素がパネルになるため、ヘッダとなる要素とパネルとなる要素が交互に配置されるよう順番に注意する必要がある。

.. note::

    \ ``accordion``\ メソッドを実行する要素の子要素がli要素の場合のみ、li要素の最初の子要素がヘッダとなり、li要素の2つ目の子要素がパネルの内容となる。
    このため、li要素一つ一つでヘッダとパネルのセットが作成できる。
    詳細は、\ `jQuery UI公式ウェブサイトのリファレンス <http://api.jqueryui.com/accordion/#option-header>`__\を参照すること。

.. _accordionCollapsible:

全てのパネルを閉じることができるアコーディオン
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| デフォルトでは、アコーディオンはいずれか1つのパネルが常に開いた状態となる。
| ここでは、全てのパネルを閉じた状態にする方法について説明する。

| HTMLは :ref:`accordionBasic`\ で示したものと同様の内容とする。

| JavaScript(accordion-collapsible.js)で、次の処理を実行する。

.. code-block:: javascript

    // accordion-collapsible.js

    'use strict';

    // (1)
    $(function () {
      $('#accordion').accordion({
        active: false,
        collapsible: true
      });
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | \ ``accordion``\ メソッドに\ ``active``\ と\ ``collapsible``\ オプションを実装する。

| 上記のサンプルでは以下のオプションを指定している。

.. list-table::
   :header-rows: 1
   :widths: 10 15 50 15

   * - |option-name|
     - |type|
     - |summary|
     - |default-value|
   * - active
     - \ ``Boolean``\ または \ ``Integer``\
     - | 初期状態で開いているパネルを指定する。
       | \ ``false``\ を設定すると、全てのパネルが閉じた状態となる。（collapsibleを\ ``true``\ にする必要がある）
       | 数値を設定する場合、0を基準として何番目のパネルを開くか指定する。一番上を指定したい場合は0、二番目を指定したい場合は1を設定する。
       | マイナスの値を指定すると、一番下のパネルから遡ったパネルを開く。一番下を指定したい場合は-1、下から二番目を指定したい場合は-2を設定する。
     - \ ``0``\
   * - collapsible
     - \ ``Boolean``\
     - | すべてのパネルを閉じられるかを指定する。
       | \ ``true``\ を設定すると、全てのパネルを閉じることができる。
     - \ ``false``\

.. note::

   jQuery UIのアコーディオンは同時に複数のパネルを開いた状態にすることができない。
   そのような要件がある場合は後述の :ref:`accordionMultiple`\ の方法を利用するか、jQueryの\ ``slideToggle``\ メソッド等を利用して作りこむか、Bootstrapのアコーディオンを利用する必要がある。

.. _accordionApplication:

応用方法(jQuery UI)
------------------------------------------------

.. _accordionMultiple:

全てのパネルを開くことができるアコーディオン
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| アコーディオンは、デフォルトではいずれか1つのパネルしか開いた状態にできない。
| ここでは、全てのパネルを開く方法について説明する。

| :ref:`accordionBasic`\ で示したHTMLのパネルの内容をそれぞれ変更する。

.. code-block:: html

    <!-- (1) -->
    <div id="accordion">
      <!-- (2) -->
      <div>
        <!-- (3) -->
        <h3>アコーディオン1</h3>
        <!-- (4) -->
        <div>
          <p>アコーディオン1の内容が表示されました。</p>
        </div>
      </div>
      <!-- (2) -->
      <div>
        <!-- (3) -->
        <h3>アコーディオン2</h3>
        <!-- (4) -->
        <div>
          <p>アコーディオン2の内容が表示されました。</p>
        </div>
      </div>
      <!-- (2) -->
      <div>
        <!-- (3) -->
        <h3>アコーディオン3</h3>
        <!-- (4) -->
        <div>
          <p>アコーディオン3の内容が表示されました。</p>
        </div>
      </div>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | アコーディオン全体の領域を定義する。
    * - | (2)
      - | アコーディオン1つ分の領域を定義する。
    * - | (3)
      - | アコーディオンのヘッダを定義する。
    * - | (4)
      - | アコーディオンのパネルを定義する。

| JavaScript(accordion-multiple.js)で、次の処理を実行する。

.. code-block:: javascript

    // accordion-multiple.js

    'use strict';

    // (1)
    $(function () {
      $('#accordion').children('div').accordion({
        active: false,
        collapsible: true
      });
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | div要素に対して\ ``accordion``\ メソッドを実行する。

| ヘッダとパネルのペアごとにdiv要素で分割して、そのdiv要素全てに\ ``accordion``\ メソッドを実行している。
| そのため、見た目上は3つのヘッダを持っている1つのアコーディオンだが、実際には3つのアコーディオンを並べる事で実現している。

.. _accordionBootstrap:

利用方法(Bootstrap)
------------------------------------------------

ここでは、Bootstrapを用いてアコーディオンを表示する方法を説明する。

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

      <div class="panel panel-default" role="tablist">

        <div class="panel-heading" role="tab">
          <!-- (1) -->
          <a data-toggle="collapse" href="#collapse1">ヘッダー#1</a>
        </div>

        <!-- (2) -->
        <div id="collapse1" class="collapse" role="tabpanel">
          <div class="panel-body">
            コンテンツ#1
          </div>
        </div>

        <div class="panel-heading" role="tab">
          <!-- (1) -->
          <a data-toggle="collapse" href="#collapse2">ヘッダー#2</a>
        </div>

        <!-- (2) -->
        <div id="collapse2" class="collapse" role="tabpanel">
          <div class="panel-body">
            コンテンツ#2
          </div>
        </div>

      </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | アコーディオンのヘッダーを定義する。
    * - | (2)
      - | アコーディオンのコンテンツを定義する。

アコーディオンのヘッダ部品は、次の属性を持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - 属性
     - 値
   * - ``data-toggle``
     - ``collapse``\ (固定)
   * - ``href``
     - 表示するコンテンツのセレクタ

コンテンツ部品は、次のクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``collapse``
     - アコーディオンの開閉状態やアニメーションを制御する。

上記のサンプルでは パネルの属性に\ ``collapse``\ クラスを設定することで初期表示時を閉じた状態にしているが、最初からコンテンツを展開する場合には\ ``collapse``\ に加えて\ ``in``\ クラスもあわせて指定する。

なお、\ ``panel``\ 関連のクラスはアコーディオンの動作には無関係だが、アコーディオン部品に適した見栄えを実現できるため、組み合わせて使用することが多い。パネル部品は次のクラスを持つ要素によって構成する。

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - クラス
     - 備考
   * - ``panel``
     - 必須。パネル全体の領域を表す。
   * - ``panel-default``
     - 任意。パネルのスタイルを決める。他にも\ ``panel-info``\ や\ ``panel-warning``\ などが使える。
   * - ``panel-heading``
     - 任意。パネル内のヘッダ領域を表す。
   * - ``panel-body``
     - 任意。パネル内のコンテンツ領域を表す。

.. note::

   このサンプルでは同時に複数のコンテンツ領域を展開することができるが、同時に複数のコンテンツ領域を展開できないようにすることもできる。そのためには、アコーディオン全体の領域を囲う要素や属性の追加、また\ ``panel``\ クラスの利用が必須になる。\ `Bootstrap公式ウェブサイトのリファレンス\ <http://getbootstrap.com/javascript/#collapse>`_\ にあるサンプルを参考にすること。
