.. _button:

ボタン
================================================

概要
------------------------------------------------

| jQuery UI やBootStrap を用いると、button要素やinput要素だけでなく、a要素によるリンクもボタンとして扱う事ができる。
| ここでは、jQuery UIとBootStrapそれぞれを用いたボタンの実装方法を説明する。

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
       - `ボタンのグループ化 <../samples/jquery-ui/button-buttonset.html>`_
     - `Button | jQuery UI <http://jqueryui.com/button/>`_
   * - Bootstrap
     - - `基本的なボタン <../samples/bootstrap/button-basic.html>`__
       - `ボタンのグループ化 <../samples/bootstrap/button-buttonset.html>`__
     - - `CSS - Bootstrap #Buttons <http://getbootstrap.com/css/#buttons>`_
       - `Components - Bootstrap #Button groups <http://getbootstrap.com/components/#btn-groups>`_

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
      <input type="checkbox" id="checkbox1" class="buttonClass" />
      <label for="checkbox1">CheckBox</label>
      <input type="radio" id="radio1" class="buttonClass" name="radio" />
      <label for="radio1">RadioButton1</label>
      <input type="radio" id="radio2" class="buttonClass" name="radio" />
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
      - | (1)と同様にinput要素にclass属性を付与し、\ ``buttonClass``\ を指定する。
        | input要素のtype属性がcheckboxやradioの場合、label要素を定義する。

| JavaScriptは以下の通り実装する。

.. code-block:: javascript

    // button-basic.js

    'use strict';

    // (1)
    $(function () {
      $('.buttonClass').button({
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

.. _buttonBasicNote-DescriptionOfElements:

.. note::

    ボタンはbutton要素、input要素、a要素以外にも、span要素やdiv要素などからも生成できる。
    なお、span要素やdiv要素などから生成したボタンは、そのままではフォーカスを維持したりTabキーでフォーカス遷移する事ができないが、tabindex属性を指定することで可能になる。また、keypress、keyup、keydownなどのイベントハンドラを実装する場合も、同様にtabindex属性を指定する必要がある。

.. _buttonButtonset:

ボタンのグループ化
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| ここでは、複数のボタンを隙間なく並べて、1つのグループの画面項目として表示する方法を説明する。
| ボタンのグループ化は\ ``buttonset``\ メソッドを利用する。

| :ref:`basic-usages-jqueryui`\ で示したHTMLに、ボタンを構成する表示領域を追加する。

.. code-block:: html

    <!-- (1) -->
    <div class="buttonset">
      <p>Button</p>
      <a href="#" >button1</a>
      <a href="#" >button2</a>
      <a href="#" >button3</a>
    </div>
    <div class="buttonset">
      <p>Checkbox</p>
      <input type="checkbox" id="checkbox1" />
      <label for="checkbox1">checkbox1</label>
      <input type="checkbox" id="checkbox2" />
      <label for="checkbox2">checkbox2</label>
      <input type="checkbox" id="checkbox3" />
      <label for="checkbox3">checkbox3</label>
    </div>
    <div class="buttonset">
      <p>Radio Button</p>
      <input type="radio" id="radio1" name="radio" />
      <label for="radio1">radiobutton1</label>
      <input type="radio" id="radio2" name="radio" />
      <label for="radio2">radiobutton2</label>
      <input type="radio" id="radio3" name="radio" />
      <label for="radio3">radiobutton3</label>
    </div>

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | グループ化する対象をdiv要素で囲う。この際、div要素にはclass属性を付与し、\ ``buttonset``\ を指定する。

| JavaScriptは以下の通り実装する。

.. code-block:: javascript

    // button-buttonset.js

    'use strict';

    // (1)
    $(function () {
      $('.buttonset').buttonset({
      });
    });

.. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
.. list-table::
    :header-rows: 1
    :widths: 10 80

    * - 項番
      - 説明
    * - | (1)
      - | ボタンを生成する対象のグループに対して、buttonsetメソッドを実行する。

| \ ``buttonset``\ メソッドを利用することで、複数のボタンが1つのグループとして表示される。
| ボタンをグループ化すると、ボタン間の隙間はなくなり、両端のボタンのみ角が丸くなる。

.. note::

    \ ``buttonset``\ メソッドは、次の条件に当てはまる要素をグループ化できる。

    * button要素
    * input要素のうち、typeがbutton、submit、reset、checkbox、radioのいずれか
    * a要素
    * 事前に\ ``button``\ メソッドでボタン化した要素

    このため、span要素やdiv要素など、上記に当てはまらない要素をグループ化する場合、事前に対象の要素を\ ``button``\ メソッドでボタン化し、\ ``buttonset``\ メソッドを実行する必要がある。

      .. code-block:: html

          <div class="buttonset">
            <span class="buttonClass">span</span>
            <div class="buttonClass">div</div>
          </div>

      .. code-block:: javascript

          $(function () {

            // (1)
            $('.buttonClass').button({
            });

            // (2)
            $('.buttonset').buttonset({
            });
          });

      .. tabularcolumns:: |p{0.10\linewidth}|p{0.80\linewidth}|
      .. list-table::
          :header-rows: 1
          :widths: 10 80

          * - 項番
            - 説明
          * - | (1)
            - | 先に対象の部品をボタンとして生成する。
          * - | (2)
            - | グループに対してbuttonsetを実行する。

    なお、``buttonset``\ メソッドは、a要素とbutton要素の組み合わせなど、異なる要素同士でも1つのグループとすることができる。

    詳細は、\ `jQuery UI公式ウェブサイトのリファレンス <http://api.jqueryui.com/buttonset/#option-items>`__\を参照すること。

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
        | 上記以外にも、ボタン用のクラスが提供されている。これらの詳細について知りたい場合は、\ `BootStrap 公式ウェブサイトのリファレンス\ <http://getbootstrap.com/css/#buttons>`__\ を参照すること。
    * - | (2)
      - | input要素のtype属性が\ ``checkbox``\ や\ ``radio``\ の場合、対象のinput要素をlabel要素とdiv要素で囲う。
        | この際、div要素にdata-toggle属性を付与し\ ``buttons``\ を指定する。またlabel要素にclass属性を付与しボタン用のクラスを指定する。

.. note::

    ボタンは上記以外に、span要素やdiv要素などからも生成できる。
    なお、フォーカスの維持などjQuery UIと同様の配慮が必要になる。詳細は、利用方法(jQuery UI)の基本的な使い方に記載した\ :ref:`Note<buttonBasicNote-DescriptionOfElements>`\ を参照すること。

.. _buttonset-bootstrap:

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
