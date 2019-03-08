.. _button:

ボタン
================================================

概要
------------------------------------------------

| jQuery UI やBootstrap を用いると、button要素やinput要素だけでなく、a要素によるリンクもボタンとして扱う事ができる。
| ここでは、jQuery UIとBootstrapそれぞれを用いたボタンの実装方法を説明する。

.. figure:: /images/button.png
   :alt: button
   :align: center

   **図: ボタンの例**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40

   * - |using-library-name|
     - |sample|
     - |reference-page|
   * - jQuery UI
     - - `基本的なボタン <../samples/jquery-ui/button-basic.html>`_
       - `ボタンのグループ化 <../samples/jquery-ui/button-controlgroup.html>`_
     - - `Button | jQuery UI <https://jqueryui.com/button/>`_
       - `Checkboxradio | jQuery UI <https://jqueryui.com/checkboxradio/>`_
       - `Controlgroup | jQuery UI <https://jqueryui.com/controlgroup/>`_
   * - Bootstrap
     - - `基本的なボタン <../samples/bootstrap/button-basic.html>`__
       - `ボタンのグループ化 <../samples/bootstrap/button-buttongroup.html>`__
     - - `CSS - Bootstrap #Buttons <https://getbootstrap.com/docs/3.3/css/#buttons>`_
       - `Components - Bootstrap #Button groups <https://getbootstrap.com/docs/3.3/components/#btn-groups>`_

.. _buttonHowToUse:

利用方法(jQuery UI)
------------------------------------------------

ここでは、jQueryUIを用いた実装方法を説明する。

.. _buttonBasic:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、ボタンを構成する表示領域を追加する。

.. code-block:: html

    <div>
      <!-- (1) -->
      <button class="buttonClass" value="button">button</button>
      <input type="button" class="buttonClass" value="input button" />
      <input type="submit" class="buttonClass" value="input submit" />
      <a href="#" class="buttonClass">a要素</a>
    </div>
    <br>
    <div>
      <!-- (2) -->
      <input type="checkbox" id="checkbox1" class="checkClass" />
      <label for="checkbox1">CheckBox</label>
      <input type="radio" id="radio1" class="checkClass" name="radio" />
      <label for="radio1">RadioButton1</label>
      <input type="radio" id="radio2" class="checkClass" name="radio" />
      <label for="radio2">RadioButton2</label>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ボタンを生成するbutton要素やinput要素、a要素にclass属性を付与し、\ ``buttonClass``\ を指定する。
    * - | (2)
      - | (1)と同様にtype属性がcheckboxやradioのinput要素にclass属性を付与し、\ ``checkClass``\ を指定する。
        | input要素のtype属性がcheckboxやradioの場合、label要素を定義する。

| JavaScriptは以下の通り実装する。

.. code-block:: javascript

    // button-basic.js

    'use strict';

    $(function () {

      // (1)
      $('.buttonClass').button({
      });

      // (2)
      $('.checkClass').checkboxradio({

        // (3)
        icon: false
      });
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ボタンを生成する対象に対して、\ ``button``\ メソッドを実行する。
    * - | (2)
      - | チェックボックスとラジオボタンのボタンを生成する対象に対して、\ ``checkboxradio``\ メソッドを実行する。
    * - | (3)
      - | チェックボックスとラジオボタンのチェックマークを非表示にするオプションを設定する。

.. _buttonBasicNote-DescriptionOfElements:

.. note::

    ボタンはbutton要素、input要素、a要素以外にも、span要素やdiv要素などからも生成できる。
    なお、span要素やdiv要素などから生成したボタンは、そのままではフォーカスを維持したりTabキーでフォーカス遷移する事ができないが、tabindex属性を指定することで可能になる。また、keypress、keyup、keydownなどのイベントハンドラを実装する場合も、同様にtabindex属性を指定する必要がある。

.. _button-Controlgroup:

ボタンのグループ化
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、複数のボタンを隙間なく並べて、1つのグループの画面項目として表示する方法を説明する。
| ボタンのグループ化は\ ``controlgroup``\ メソッドを利用する。

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、ボタンを構成する表示領域を追加する。

.. code-block:: html

    <!-- (1) -->
    <div class="buttongroup">
      <p>Button</p>
      <a href="#" >button1</a>
      <a href="#" >button2</a>
      <a href="#" >button3</a>
    </div>
    <br>
    <div class="buttongroup">
      <p>Checkbox</p>
      <input type="checkbox" id="checkbox1" class="checkClass" />
      <label for="checkbox1">CheckBox1</label>
      <input type="checkbox" id="checkbox2" class="checkClass" />
      <label for="checkbox2">CheckBox2</label>
      <input type="checkbox" id="checkbox3" class="checkClass" />
      <label for="checkbox3">CheckBox3</label>
    </div>
    <br>
    <div class="buttongroup">
      <p>RadioButton</p>
      <input type="radio" id="radio1" name="radio" class="checkClass" />
      <label for="radio1">RadioButton1</label>
      <input type="radio" id="radio2" name="radio" class="checkClass" />
      <label for="radio2">RadioButton2</label>
      <input type="radio" id="radio3" name="radio" class="checkClass" />
      <label for="radio3">RadioButton3</label>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | グループ化する対象をdiv要素で囲う。この際、div要素にはclass属性を付与し、\ ``buttongroup``\ を指定する。

| JavaScriptは以下の通り実装する。

.. code-block:: javascript

    // button-controlgroup.js

    'use strict';

    $(function () {

      // (1)
      $('.checkClass').checkboxradio({
        icon: false
      });

      // (2)
      $('.buttongroup').controlgroup({
      });
    });


.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | チェックボックスとラジオボタンにオプションを設定する場合は、事前にcheckboxradioメソッドを実行する。
    * - | (2)
      - | ボタンを生成する対象のグループに対して、controlgroupメソッドを実行する。

| \ ``controlgroup``\ メソッドを利用することで、複数のボタンが1つのグループとして表示される。
| ボタンをグループ化すると、ボタン間の隙間はなくなり、両端のボタンのみ角が丸くなる。

.. note::

    \ ``controlgroup``\ メソッドは、次の条件に当てはまる要素をグループ化できる。

    .. list-table::
      :header-rows: 1
      :widths: 20 50 30

      * - 分類
        - 要素
        - 概要
      * - button
        - - button要素
          - input要素のうち、typeがbutton、submit、resetのいずれか
          - a要素
        - 通常のボタン
      * - checkboxradio
        - input要素のうち、typeがcheckbox、radioのいずれか
        - チェックボックス、ラジオボタン
      * - selectmenu
        - select要素
        - ドロップダウンリスト
      * - spinner
        - input要素のうち、classにui-spinner-inputを設定
        - 増減ボタン付きの数値入力用テキストボックス
      * - controlgroupLabel
        - classにui-controlgroup-labelが指定されたlabel要素やspan要素、div要素
        - 文字の表示のみでボタンの機能を有しないラベル

    各分類名のメソッドによって、\ ``controlgroup``\ メソッドより先に生成された部品も、同様にグループ化できる。

    なお、\ ``controlgroup``\ メソッドは、a要素とbutton要素の組み合わせなど、異なる要素同士でも1つのグループとすることができる。

    また、spinnerに利用するinput要素のtype属性がnumberの場合、増減ボタンがinputにも作成されてしまうため、CSSで非表示にする必要がある。

    詳細は、\ `jQuery UI公式ウェブサイトのリファレンス <https://api.jqueryui.com/controlgroup/#option-items>`__\を参照すること。


.. _button-bootstrapHowToUse:

利用方法(Bootstrap)
------------------------------------------------

ここでは、Bootstrapを用いた実装方法を説明する。

.. _button-bootstrap:

基本的な使い方
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

    <div>
      <!-- (1) -->
      <button class="btn btn-default" type="submit">button</button>
      <input class="btn btn-default" type="button" value="input button">
      <input class="btn btn-default" type="submit" value="input submit">
      <a class="btn btn-default" href="#" role="button">a要素</a>
    </div>
    <br>
    <!-- (2) -->
    <div data-toggle="buttons">
      <label class="btn btn-default">
        <input type="checkbox" id="checkbox1">checkbox
      </label>
    </div>
    <br>
    <div data-toggle="buttons">
      <label for="radio1" class="btn btn-default">
        <input type="radio" id="radio1" name="radio">radiobutton1
      </label>
      <label for="radio2" class="btn btn-default">
        <input type="radio" id="radio2" name="radio">radiobutton2
      </label>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ボタンを生成するbutton要素やinput要素、a要素にclass属性を付与し、\ ``btn``\ (必須)とスタイルを決める\ ``btn-default``\ を指定する。
        | 上記以外にも、ボタン用のクラスが提供されている。これらの詳細について知りたい場合は、\ `Bootstrap 公式ウェブサイトのリファレンス\ <https://getbootstrap.com/docs/3.3/css/#buttons>`__\ を参照すること。
    * - | (2)
      - | input要素のtype属性が\ ``checkbox``\ や\ ``radio``\ の場合、対象のinput要素をlabel要素とdiv要素で囲う。
        | この際、div要素にdata-toggle属性を付与し\ ``buttons``\ を指定する。またlabel要素にclass属性を付与しボタン用のクラスを指定する。

.. note::

    ボタンは上記以外に、span要素やdiv要素などからも生成できる。
    なお、フォーカスの維持などjQuery UIと同様の配慮が必要になる。詳細は、利用方法(jQuery UI)の基本的な使い方に記載した\ :ref:`Note<buttonBasicNote-DescriptionOfElements>`\ を参照すること。

.. _buttongroup-bootstrap:

ボタンのグループ化
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、複数のボタンを隙間なく並べて、1つのグループの画面項目として表示する方法を説明する。

:ref:`basic-usages-bootstrap`\ で示したHTMLに、次の内容を追加する。

.. code-block:: html

    <!-- (1) -->
    <div class="btn-group">
      <a class="btn btn-default" href="#" role="button">button1</a>
      <a class="btn btn-default" href="#" role="button">button2</a>
      <a class="btn btn-default" href="#" role="button">button3</a>
    </div>
    <br>
    <div class="btn-group" data-toggle="buttons">
      <label class="btn btn-default">
        <input type="checkbox" id="checkbox1">checkbox1
      </label>
      <label class="btn btn-default">
        <input type="checkbox" id="checkbox2">checkbox2
      </label>
      <label class="btn btn-default">
        <input type="checkbox" id="checkbox3">checkbox3
      </label>
    </div>
    <br>
    <div class="btn-group" data-toggle="buttons">
      <label for="radio1" class="btn btn-default">
        <input type="radio" id="radio1" name="radio">radiobutton1
      </label>
      <label for="radio2" class="btn btn-default">
        <input type="radio" id="radio2" name="radio">radiobutton2
      </label>
      <label for="radio3" class="btn btn-default">
        <input type="radio" id="radio3" name="radio">radiobutton3
      </label>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | グループ化する対象をdiv要素で囲う。この際、div要素にはclass属性を付与し、\ ``btn-group``\ を指定する。
