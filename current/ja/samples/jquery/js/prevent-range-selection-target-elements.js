// prevent-range-selection-target-elements.js

'use strict';

/**
 * ページ内の特定要素の範囲選択を防止する
 */
$(document)
    .ready(
        function () {

          // CSSによる範囲選択防止。「class='disable'」を設定した要素をハイライトできないようにする
          $('.disable').css({
            'user-select' : 'none',

            // Firefox
            '-moz-user-select' : 'none',

            // Safari、Chromeほか
            '-webkit-user-select' : 'none',

            // IE
            '-ms-user-select' : 'none'
          });

          /**
           * IE向け。「Ctrl + a」押下時に選択不可要素もハイライトされるため、「Ctrl + a」の使用を抑止する
           */
          // キー操作による範囲選択防止
          $(document).on('keydown', keyDownEvent);

          // Ctrl + a の範囲選択禁止
          function keyDownEvent(event) {

            // ブラウザ判定
            if (!isIE()) {
              return true;
            }

            // Ctrl + a キー押下時
            if (event.ctrlKey && event.key === 'a') {

              // 入力系の要素は制御対象外
              if (event.target.nodeName !== 'INPUT' &&
                  event.target.nodeName !== 'TEXTAREA') {

                // キー操作無効
                return false;
              }
            }
            return true;
          }

          /**
           * IE向け。範囲選択可の要素から不可の要素をドラッグをした場合、選択不可要素も選択されるため、 当初の要素のみハイライトするよう制御する
           */
          // マウスドラッグによる範囲選択防止
          $(document).on('mouseup', mouseUpEvent);
          $(document).on('selectstart', mouseSelectEvent);
          $(document).on('mouseover', mouseOverEvent);

          // 範囲選択制御に使用する変数
          // 範囲選択のステータスを格納
          var select = false;

          // 範囲選択開始時の領域を格納
          var range = null;

          // 範囲選択開始時の要素名を格納
          var selectStartNode = '';

          // マウスキーが離された時に実行する関数
          function mouseUpEvent() {

            // ブラウザ判定
            if (!isIE()) {
              return true;
            }

            // 変数を初期化する
            select = false;
            range = null;
            selectStartNode = '';

            return true;
          }

          // 範囲選択開始時に実行する関数
          function mouseSelectEvent(event) {

            // ブラウザ判定
            if (!isIE()) {
              return true;
            }

            // 範囲選択のオブジェクトを取得する
            var selection = window.getSelection();

            // INPUT・TEXTAREAを除き、範囲選択を行っていない場合は対象外
            if (selection.rangeCount === 0) {
              return true;
            }

            // BODY・HTMLの場合は範囲選択不可
            if (event.target.tagName === 'HTML' ||
                event.target.tagName === 'BODY') {
              selection.removeAllRanges();
              return false;
            }

            // 範囲選択のステータスを設定
            select = true;

            // 範囲選択開始時の領域を取得
            range = selection.getRangeAt(0);

            // 範囲選択開始時の要素名を取得
            selectStartNode = selection.anchorNode.parentNode;

            return true;
          }

          // マウスオーバー時に実行する関数
          function mouseOverEvent(event) {

            // ブラウザ判定
            if (!isIE()) {
              return true;
            }

            // カーソルが別要素に到達したら文字列選択をクリアする
            if (select && event.target !== selectStartNode) {

              // 範囲選択のオブジェクトを取得する
              var selection = window.getSelection();

              // 範囲選択のオブジェクトを新規生成する
              var newRange = document.createRange();

              // 範囲選択開始時の要素を設定する
              newRange.selectNode(range.startContainer);

              // 一旦要素を削除する
              selection.removeAllRanges();

              // 範囲選択開始時の要素を設定することで、ハイライトしている範囲を限定する
              selection.addRange(newRange);
            }
            return true;
          }

          /**
           * ブラウザ判定
           */
          function isIE() {
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.match(/trident/)) {
              return true;
            }
            return false;
          }
        });
