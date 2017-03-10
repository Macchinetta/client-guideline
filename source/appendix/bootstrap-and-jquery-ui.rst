.. _bootstrapandjqueryui:

BootstrapとjQuery UIを同時に使用する際の名前空間の競合
---------------------------------------------------------------

BootstrapとjQuery UIを同時使用する際に、名前空間が競合することにより正常に動作がしない場合ある。

例えば、次のサンプルではモードレスダイアログの×ボタンが正常に表示されない。

`不具合事象サンプル <samples/bootstrap-and-jquery-ui/modeless-before.html>`__

.. figure:: images/conflict-example.png
   :alt: モードレスダイアログの×ボタンが正常に表示されない例
   :align: center
   
   **図: モードレスダイアログの×ボタンが正常に表示されない例**


これはjQuery UIがモーダルダイアログ作成の際に内部で実行する\ ``$.fn.button``\  メソッドがBootstrapのメソッドと競合・上書きされているため、実行できないことが原因である。

この事象に対して、Bootstrapのメソッド毎に用意されている\ ``noConflict``\ メソッドを使用することで対処する。このメソッドを使用することで、上書きされる前のメソッドに差し戻すことができる。このサンプルでは\ ``$.fn.button``\ が競合しているため以下のように\ ``$.fn.button.noConflict``\ を使用する。


.. code-block:: javascript

  $.fn.bsbutton = $.fn.button.noConflict();

対処後は×ボタンが正常に表示されるようになる。

`対処済みサンプル <samples/bootstrap-and-jquery-ui/modeless-after.html>`__

.. figure:: images/conflict-solution.png
   :alt: 対処後の例
   :align: center

   **図: 対処後の例**


.. note::
  jQueryでは\ ``$``\ 変数への競合のみ対処方法が用意されているが、Bootstrapのように個別のメソッドへの対処方法は用意されていない。そのため、BootstrapとjQuery UIを同時に使用する際は、基本的にBootstrapで名前空間の競合の対処を実施する。
