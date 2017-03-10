.. _javascript-basic:

JavaScriptの処理と性能
--------------------------------

| ここでは、JavaScriptの基本的な記述方法について、性能改善のためのポイントを説明する。

.. _cache-local:

キャッシュの利用
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| JavaScript では、ローカル変数のアクセスが最も速く、スコープチェーンの外側にある変数へのアクセスほど遅くなる。このため、スコープチェーンの一番外側にあるグローバル変数へのアクセスが最も遅い。
| よって、頻繁にアクセスが必要なグローバル変数は、可能な限りローカル変数にキャッシュした方が良い。

| 以下に例を示す。

.. code-block:: javascript

    var foo;

    // (1)
    var fooTest = function () {
      foo = 'foo';
      foo += ' test';
      return foo;
    };

    // (2)
    var barTest = function () {
      var bar;
      bar = 'bar';
      bar += ' test';
      return bar;
    };

    // (3)
    var bizTest = function () {
      var biz = foo;
      biz = 'biz';
      biz += ' test';
      return biz;
    };

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | グローバル変数へのアクセスは遅い。
    * - | (2)
      - | ローカル変数へのアクセスは速い。
    * - | (3)
      - | グローバル変数はローカル変数にキャッシュすることで、高速にアクセスできる。

| 上記コードでは利用回数が少ないのであまり差は出ないが、ループ内で利用される変数や頻繁に利用される変数はローカル変数にキャッシュした方が良い。

.. _conditional-expressions:

配列やオブジェクトの参照を利用した条件判定
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| 一般的に条件判定にはif文やswitch文が使われるが、数値や文字列と言った特定のキーに対して固定の値を返すような処理の場合、候補となる項目数が増えるほど生産性や保守性の面で効率が悪い。
| そのような処理の場合、配列やオブジェクトの参照を利用すればキーから値を直接返すことができるので効率が良い。
| また、項目数が膨大であるほど性能面で優れている。

.. code-block:: javascript

    var value1 = 3;
    var value2 = 'c';

    // (1)
    var data1 = ['result 0', 'result 1', 'result 2', 'result 3',
                 'result 4', 'result 5', 'result 6', 'result 7'];
    var result1 = data1[value1] || 'no result';

    // (2)
    var data2 = {a:'result a' ,b:'result b', c:'result c', d:'result d'};
    var result2 = data2[value2] || 'no result';

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | 配列を利用した例。一致する項目がない場合は\ ``undefined``\ととなる。
    * - | (2)
      - | オブジェクトを利用した例。一致する項目がない場合は\ ``undefined``\ととなる。

.. _loop-Control:

ループ処理の最適化
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ループでは同じ記述が何度も利用されるため、一層の配慮が必要となる。また、ループ終了条件の判定で、よく\ ``i < list.length``\という使い方がされているが、以下のように、ループの前でローカル変数にキャッシュする対処をすべきである。

.. code-block:: javascript

    var i;
    var list = ['a', 'b', 'c', 'd'];

    // (1)
    for (i = 0; i < list.length; i++) {
      resultString(list[i]);
    }

    // (2)
    var length = list.length;
    for (i = 0; i < length; i++) {
      resultString(list[i]);
    }

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | よく利用されるfor文。ループ回数分、.lengthの取得処理が実行されてしまう。
    * - | (2)
      - | list.lengthをローカル変数にキャッシュする事で、.lengthの取得処理は1回のみとなる。

| このような対応はfor文だけでなく、do-while文、while文でも同様に有効である。

| ループ条件だけでなく、ループ内の処理にも注意すること。
| jQueryオブジェクトやDOMの取得、再描画が発生するDOM操作といったような、性能に影響する処理は可能な限りループの外で行ったほうが良い。

.. note::
    for文、do-while文、while文のループの性能はどれも同程度となる。

    しかし、for-in文はオブジェクトの列挙可能なプロパティを全て探しだすため、上記の3つと異なり性能は大きく劣る。

    そのため、for-in文を利用するのは、オブジェクトのプロパティを扱うときのみ利用する。

    また、for-in文は順番が規定されていないため、ブラウザによって処理する順序が異なってしまう可能性がある点も注意すること。

.. _screen-redraw:

画面再描画回数の削減
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| JavaScriptで要素に子要素を追加する、といったような、DOMが画面表示に影響する変更を受けると、画面の再描画が発生する。
| 再描画は変更された要素だけでなく画面全体で行われるため、その処理はとても重い。

| 再描画は以下のようなタイミングで起こる。

 * 画面の初期表示
 * 要素の追加や削除
 * 要素の位置変更
 * 要素のサイズ変更
 * テキストの変更
 * ブラウザのサイズ変更（スマートフォンやタブレットでの縦横回転）

| そのため、再描画を極力減らすことが重要となる。

| \ ``main``\というidのdivの下に5つのdivを配置する場合を考える。

.. code-block:: javascript

    var main = document.getElementById('main');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    var div4 = document.createElement('div');
    var div5 = document.createElement('div');

    // (1)
    main.appendChild(div1);
    main.appendChild(div2);
    main.appendChild(div3);
    main.appendChild(div4);
    main.appendChild(div5);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | そのままappendChildを実行した例。

| \ ``main``\で\ ``appendChild()``\を5回実行すると、再描画も5回実行されてしまう。
| このような場合に再描画を減らす方法としては、ドキュメントフラグメントを利用する。

| 元となるHTMLドキュメントとは独立したドキュメントフラグメントを作成し、ドキュメントフラグメントでDOMを構築して元となるHTMLドキュメントに追加する。
| これにより、再描画はHTMLドキュメントに追加する1回のみとなる。

.. code-block:: javascript

    // (1)
    var fragment = document.createDocumentFragment();
    // (2)
    fragment.appendChild(div1);
    fragment.appendChild(div2);
    fragment.appendChild(div3);
    fragment.appendChild(div4);
    fragment.appendChild(div5);
    // (3)
    main.appendChild(fragment);

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ドキュメントフラグメントの作成。
    * - | (2)
      - | ドキュメントフラグメントに子要素を追加する。
    * - | (3)
      - | 対象にドキュメントフラグメントを追加する。

| ドキュメントフラグメントでは親要素に\ ``appendChild()``\した際に、自身の子要素を丸ごと親要素に渡すことができ、通常の\ ``appendChild()``\では出来ない、複数の子要素の受け渡しも可能になる。
