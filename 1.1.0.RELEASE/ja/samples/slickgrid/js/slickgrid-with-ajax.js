// slickgrid-with-ajax.js

'use strict';

(function () {

  $(function () {

    // SlickGridのカラム定義
    var columns = [
      {id: 'title', name: 'Title', field: 'title'},
      {id: 'duration', name: 'Duration', field: 'duration'},
      {id: '%', name: '% Complete', field: 'percentComplete'},
      {id: 'start', name: 'Start', field: 'start'},
      {id: 'finish', name: 'Finish', field: 'finish'},
      {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
    ];

    // SlickGrid動作オプション
    var options = {

      // 何も指定しない
    };

    var grid;
    var loadingIndicator = null;

    // テーブルデータを非同期で取得するオブジェクト生成
    var loader = new Slick.Data.RemoteModel();

    // 画面初期化処理
    $(function () {

      // SlickGridテーブルを作成
      grid = new Slick.Grid('#myGrid', loader.data, columns, options);

      // スクロール時に起動するイベントハンドラ
      grid.onViewportChanged.subscribe(function () {

        // 開始位置・終了位置取得
        var vp = grid.getViewport();

        // データ取得関数実行
        loader.ensureData(vp.top, vp.bottom);
      });

      // ローディング中に起動するイベントハンドラ
      loader.onDataLoading.subscribe(function () {

        // データ取得中であることを示すメッセージ出力
        if (!loadingIndicator) {
          loadingIndicator = $('<span><label>Buffering...</label></span>')
            .appendTo(document.body);

          // CSSの設定
          var $g = $('#myGrid');
          loadingIndicator.css('position', 'absolute')
            .css(
              'top',
              $g.position().top + $g.height() / 2 - loadingIndicator.height() /
                2).css(
              'left',
              $g.position().left + $g.width() / 2 - loadingIndicator.width() /
                2);
        }
        loadingIndicator.show();
      });

      // ローディング後に起動するイベントハンドラ
      loader.onDataLoaded.subscribe(function (e, args) {

        // 表示する行のみ有効化
        for (var i = args.from; i <= args.to; i++) {
          grid.invalidateRow(i);
        }
        grid.render();
        loadingIndicator.fadeOut();
      });

      // テーブル表示
      grid.onViewportChanged.notify();
    });
  });

}());
