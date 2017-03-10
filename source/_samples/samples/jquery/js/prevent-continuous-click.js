// prevent-continuous-click.js

'use strict';

$(function () {

  $('#the-form').on('submit', function (e) {
    e.preventDefault();

    var $form = $(this),
        $button = $form.find('[type=submit]');

    // 送信ボタンを非活性化する。
    $button.prop('disabled', true);

    // 非同期通信を開始する。
    $.ajax({
      url : $form.attr('action'),
      type : $form.attr('method'),
      data : $form.serialize()

    // 通信処理完了後に実行する関数を指定する。
    }).always(function () {

      // 送信ボタンを再度活性化する。
      // ※ ボタンの活性状態の変化が分かり易いように、Ajax通信のレスポンスを
      // 得てから2秒後にボタンを再活性化するようにしている。
      setTimeout(function () {
        $button.prop('disabled', false);
      }, 2000);
    });
  });
});
