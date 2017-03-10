// default.js

'use strict';

(function () {

  // (1) SlickGridのカラム定義
  //     6つのカラムのそれぞれにつき ID・表示名・マッピングするデータ を定義している。
  var columns = [
    {id: 'title', name: 'Title', field: 'title'},
    {id: 'duration', name: 'Duration', field: 'duration'},
    {id: '%', name: '% Complete', field: 'percentComplete'},
    {id: 'start', name: 'Start', field: 'start'},
    {id: 'finish', name: 'Finish', field: 'finish'},
    {id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven'}
  ];

  // (2) SlickGridの動作オプション
  var options = {

    // 何も指定しない。
  };

  // (3) 1000件のサンプルデータ作成
  var data = [];
  for (var i = 0; i < 1000; i++) {

    // データのプロパティ名を columns で定義した field 値と一致させることで、
    // 表示データがマッピングされる。
    data[i] = {
      title: 'タスク ' + i,
      duration: '5 days',
      percentComplete: Math.round(Math.random() * 100),
      start: '01/01/2009',
      finish: '01/05/2009',
      effortDriven: (i % 5 === 0)
    };
  }

  // 画面初期化処理
  $(function () {

    // (4) SlickGridテーブルを作成
    new Slick.Grid('#myGrid', data, columns, options);
  });

}());
