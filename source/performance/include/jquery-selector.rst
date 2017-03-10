.. _jquery-selector:

jQuery利用時のチューニング
------------------------------------------

| jQueryの特徴は、CSSセレクタを利用した簡単なDOMアクセスと、豊富なDOM操作機能である。
| \ ``#id .class``\といったようなCSSセレクタの形式で指定することで、簡単に該当のDOMにアクセスすることができるため、コードをシンプルにすることができ、生産性や保守性の面でメリットとなっている。
| セレクタで指定したDOMはjQueryオブジェクトと呼ばれるオブジェクトに変換されることで、様々なAPIが利用できる。
| jQueryのDOMアクセスはそのままでも高度に最適化されているが、セレクタの記述方法によって性能に差が出る事もある。

| jQueryを利用する際に注意すべきポイントについて以降で説明する。

.. _use-simple-selector:

シンプルなセレクタの利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQueryでセレクタを利用すると、jQueryの内部の手順は大きく分けて以下の3段階で処理される。

 #. ネイティブAPIの\ ``getElementById()``\、\ ``getElementsByTagName()``\、\ ``getElementsByClassName()``\が利用できるのであれば使用する
 #. 1.に当てはまらない場合、CSSセレクタ形式として、\ ``querySelectorAll()``\を使用する
 #. 2.にも当てはまらない場合（CSSセレクタとして解析できない場合）、セレクターエンジンSizzleがセレクタを解析する

| 処理速度はネイティブAPIが高速で、その中でも\ ``getElementById()``\が最速となる。
| \ ``querySelectorAll()``\は若干低速で、Sizzleは他と比べるととても低速である。
| このため、セレクタは可能な限り、id指定、タグ指定、クラス指定のいずれかのみのシンプルなセレクタが最も望ましい。
| １つの指定で絞りきれないような条件の場合でも、CSSセレクタでの形式（\ ``querySelectorAll()``\でエラーにならない形式）が望ましい。

.. code-block:: javascript

    // (1)
    $('#foo');

    // (2)
    $('.bar');

    // (3)
    $('span');

    // (4)
    $('#foo .bar');

    // (5)
    $('#foo:first');

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 最も高速なid指定。
    * - | (2)
      - | 高速なクラス指定。
    * - | (3)
      - | 高速なタグ指定。
    * - | (4)
      - | 若干低速なCSSセレクタ形式。
    * - | (5)
      - | とても低速な拡張セレクタ利用。

.. _not-use-extensions:

jQuery独自の拡張セレクタを利用しない
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQueryではCSSセレクタ以外に、「\ ``:first``\」「\ ``:even``\」といったようなjQuery独自の拡張セレクタが利用できる。
| しかし、これらのセレクタを利用するとセレクターエンジンSizzleでの処理となってしまうため、性能は落ちてしまう。このため、可能な限り拡張セレクタは利用せず、\ ``querySelectorAll()``\で解析可能な、CSSセレクタを利用すべきである。

.. code-block:: javascript

    // (1)
    $('#foo li:even');

    // (2)
    $('#foo li:nth-child(odd)');

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 拡張セレクタである、\ ``:even``\を利用した例。Sizzleが利用されるため、低速。
    * - | (2)
      - | CSS3のセレクタで記述した例。\ ``querySelectorAll()``\で処理されるため、(1)よりも高速。

.. _use-cache:

キャッシュの利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQueryオブジェクトの生成はコストがかかるため、複数回利用するjQueryオブジェクトはローカル変数へキャッシュしておくことで、生成する手間を省くことができる。

.. code-block:: javascript

    // (1)
    $('#foo').addClass('bar');
    $('#foo').removeClass('baz');
    $('#foo').toggleClass('qux');
    $('#foo').text('change text');

    // (2)
    var foo = $('#foo');
    foo.addClass('bar');
    foo.removeClass('baz');
    foo.toggleClass('qux');
    foo.text('change text');

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 毎回jQueryオブジェクトを生成すると処理コストがかかる。
    * - | (2)
      - | 生成したjQueryオブジェクトをキャッシュすることで、生成するのは一回だけとなるため、こちらの方が高速。

| キャッシュすることで、実際に処理を実行するかの判定にも利用しやすい。
| 処理によってはセレクタから取得したjQueryオブジェクトに選択要素が含まれていなくてもオーバーヘッドが発生する事がある。
| 例として、\ ``.slideUp()``\や\ ``.slideDown()``\等のエフェクトAPIには、要素の存在チェックの前に、アニメーション処理の為の前処理が実行されてしまうため、それがオーバーヘッドとなる。
| そのため、jQueryオブジェクトの.lengthが0であれば処理を行わない、といった分岐を作成する際に利用できる。

.. code-block:: javascript

    // (1)
    $('#foo').slideUp();

    // (2)
    var foo = $('#foo');
    if (foo.length) {
      foo.slideUp();
    }

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | idがfooという要素がなくても処理が発生する。
    * - | (2)
      - | 事前に存在をチェックすることで、無駄な処理を発生させない。

.. note::
    jQueryのセレクタで取得したjQueryオブジェクトに要素が存在するかチェックする場合、\ ``.length``\を利用すること。

    .. code-block:: javascript

        var foo = $('#foo');

        // (1)
        if (foo) {
          foo.slideToggle();
        }

        // (2)
        if (foo.length) {
          foo.slideToggle();
        }

    .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
    .. list-table::
        :header-rows: 1
        :widths: 10 80

        * - 項番
          - 説明
        * - | (1)
          - | オブジェクト自体は存在しているため、当てはまる要素が存在しない場合でも、trueとして扱われてしまう。
        * - | (2)
          - | \ ``.length``\は当てはまる要素の個数を返すので、存在しない場合は0を返し、falseとして扱われる。

.. _use-method-chain:

メソッドチェーンの利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| あるjQueryオブジェクトに連続して処理を行う場合は、キャッシュの利用以外にもメソッドチェーンを利用する方法がある。
| 利用箇所がそのメソッドチェーンのみで済む場合、ローカル変数を増やす必要がなくなる。

.. code-block:: javascript

    // (1)
    $('#foo').addClass('bar');
    $('#foo').removeClass('baz');
    $('#foo').toggleClass('qux');
    $('#foo').text('change text');

    // (2)
    $('#foo')
        .addClass('bar')
        .removeClass('baz')
        .toggleClass('qux')
        .text('change text');

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 毎回jQueryオブジェクトを生成すると処理コストがかかる。
    * - | (2)
      - | メソッドチェーンを利用することでjQueryオブジェクトの生成は一回だけとなる。

.. _use-find:

find()の利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| セレクタの条件が、idで対象の範囲を絞込み、別の条件で検索するようなパターンの場合、\ ``find()``\を利用すると速くなる場合がある。
| ただし、DOMの構成やセレクタの条件によっては、通常の\ ``querySelectorAll()``\で実行できる1回のセレクタ記述の方が速い場合がある。

.. code-block:: javascript

    // (1)
    $('#foo span:hidden');

    // (2)
    $('#foo').find('span:hidden');

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | id指定と拡張セレクタの組み合わせ。
    * - | (2)
      - | 高速なid指定で絞り込んだ後に、低速な拡張セレクタで検索する。DOMの構成によっては高速。

.. _use-native-method:

JavaScriptのネイティブAPIを利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| jQueryのAPIを利用する必要がない場合は、\ ``getElementById()``\といったようなネイティブのAPIを利用した方が高速となる。
| コードの統一性や可読性等の点からはセレクタを利用した方が良いが、どうしても性能を追求したい場合はネイティブAPIの利用も検討すること。

.. code-block:: javascript

    // (1)
    $('#foo');
    $('span');
    $('.bar');
    $('#foo .bar');

    // (2)
    document.getElementById('foo');
    document.getElementsByTagName('span');
    document.getElementsByClassName('bar');
    document.querySelectorAll('#foo .bar');

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | jQueryオブジェクトを取得するためのid指定、タグ指定、クラス指定、CSSセレクタ指定の例。
    * - | (2)
      - | ネイティブAPIでDOMを取得するためのid指定、タグ指定、クラス指定、CSSセレクタ指定の例。jQueryオブジェクトの取得よりも高速。
