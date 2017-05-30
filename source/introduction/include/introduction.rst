.. include:: ../../variable-declaration.rst

.. _introduction:

目的
=======

本ガイドラインは、画面遷移を基本とするウェブアプリケーション開発のフレームワーク\ |framework-name|\ を構成するJavaScriptやCSSのライブラリ・フレームワーク(以降、構成ライブラリ)の主な利用方法を説明する。

本ガイドラインを読むことで、次の2点を達成することを目的としている。

* \ |framework-name|\ を利用したウェブアプリケーション開発、特に多くのウェブアプリケーションで頻繁に求められる機能のコーディングが円滑に進むこと。
* 構成ライブラリへの理解を深めることにより、最終的にライブラリの公式リファレンスを基に本ガイドラインで記載している機能以外のコーディングも円滑に行えるようになること。

.. _introduction-attention:

留意事項
=========

以下の点に留意すること。

* |framework-name|\ の構成ライブラリは、多くのウェブアプリケーションで頻繁に求められる機能を基に選定されている。
* 構成ライブラリは必ずしもすべてを利用する必要はないため、必要なライブラリを選択し、利用すること。
* 個別の要件によっては構成ライブラリ以外にも有用なライブラリ・フレームワークがあるため、それらの利用も検討すること。
* 実際のアプリケーション開発では、サーバとの連携が必要となる。サーバサイドについては、Macchinettaオンライン版 開発ガイドライン ( \ http://macchinetta.github.io/server/guideline/\ の Macchinetta Server Framework (1.x) Development Guideline ) を参照すること。


.. _introduction-user:

対象読者
========

本ガイドラインはウェブプリケーション開発経験のあるアーキテクトやプログラマ向けであり、 以下を前提としている。

* HTML・CSS・JavaScriptに関する基礎的な知識がある
* jQueryに関する基礎的な知識がある


.. _introduction-constitution:

構成
====

* 2章 :doc:`../../libraries-overview`
    構成ライブラリのバージョン、主な機能、公式サイト、依存ライブラリなどを説明する。
* 3章 :doc:`../../uicomponent/index`
    UIコンポーネントに関する構成ライブラリの利用方法を、サンプルとソースコードを用いて説明する。
* 4章 :doc:`../../grid/index`
    テーブルに関する構成ライブラリの利用方法を、サンプルとソースコードを用いて説明する。
* 5章 :doc:`../../manipulation/index`
    ユーザー操作の制御や補助に関する構成ライブラリの利用方法を、サンプルとソースコードを用いて説明する。
* 6章 :doc:`../../async/index`
    非同期処理に関する問題点と改善方法を、サンプルとソースコードを用いて説明する。
* 7章 :doc:`../../development-javascript`
    JavaScriptの開発に関する問題点や改善方法などを説明する。
* 8章 :doc:`../../appendix`
    構成ライブラリを使用する際のTipsや構成ライブラリ以外の便利なライブラリの使用方法を説明する。


.. _browser-env:

動作確認環境
============

本ガイドラインにて紹介するサンプルコードについては以下の環境で動作確認を実施している。

.. list-table::
    :header-rows: 1
    :widths: 40 40

    * - ブラウザ
      - バージョン
    * - Internet Explorer
      - 11.576.14393.0
    * - Mozilla Firefox
      - ESR 45.5.1
    * - Google Chrome
      - 55.0.2883.75 m

.. warning::

    Google Chrome を使用する場合、以下のサンプル（Ajax通信箇所）はWebサーバ上に配置する必要がある。ローカルに配置した場合はブラウザ仕様により動作しないため注意すること。

      .. list-table::
          :header-rows: 1
          :widths: 40 40

          * - 機能
            - サンプル名
          * - :ref:`slickgrid-with-ajax`
            - SlickGridによる非同期データ取得サンプル
          * - :ref:`work-with-element`
            - 非同期通信を使用したドロップダウンリストの連動
          * - :ref:`event-serialization`
            - Ajaxの再利用


.. _introduction-change-log:

更新履歴
========

.. list-table::
    :header-rows: 1
    :widths: 15 15 70

    * - 更新日付
      - 改訂箇所
      - 改訂内容
    * - 2017-5-31
      - | -
      - 1.1.0.RELEASE公開
    * -
      - | 全般
      - | ガイドラインの全般的な修正

        * 章立ての見直し
        * 記載内容の一部を表形式に修正
        * ガイドライン内のコードスニペットに記載していたコメントを、本文内に表形式で記載するよう修正
        * 利用方法に影響しない誤記や表現の修正

        | ガイドラインに付随するサンプルコードの全般的な修正

        * OSSライブラリの格納先を集約
        * HTMLに実装されているstyleをCSSファイルに切り出すよう修正

    * -
      - | :ref:`introduction-attention`
      - | 記載内容の変更

        * クライアントSPA版に関する記載を削除

    * -
      - | :ref:`introduction-constitution`
      - | 記載内容の変更

        * ガイドラインの拡充に伴う構成追加を反映

    * -
      - | :ref:`browser-env`
      - | 記載内容の変更

        * 動作確認した各ブラウザのバージョン情報を修正
        * Google Chromeで動作させることができないサンプルの一覧および注意事項を追加

    * -
      - | :ref:`libraries`
      - | 記載内容の変更

        * 章立ての変更に伴い、一部の記載内容を :ref:`libraries-overview` に移動

    * -
      - | :ref:`libraries-overview`
      - | 記載内容の変更

        * 機能分類の表について、章立てに合わせるよう修正
        * 機能拡充に伴い、以下のライブラリを追加

          * slick
          * bootstrap-datepicker
          * Moment.js
          * Parsley

        * tablesorterについて、公式サイトのリンクを修正

    * -
      - | :ref:`libraries-relation`
      - | 記載内容の移動

        * 章立ての変更に伴い、表「機能を実現するために使用するライブラリ」を本節に移動

        | 記載内容の変更

        * 機能拡充に伴い、加筆した機能を追加

    * -
      - | :ref:`ui-component`
      - | :ref:`ui-component` の全般的な変更

        * 各コンポーネントの概要にイメージ図を追加
        * jQueryとBootstrapの両方の使用方法を紹介しているコンポーネントについて、紹介順序を整理

        | 記載内容の変更

        * BootStrapを推奨する記載を見直し
        * bootstrap-datepickerの追加に伴い、注釈を追加
        * jQueryとBootstrapを併用する場合の注意点を追加

    * -
      - | :ref:`button`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`modal-dialog`
      - | 記載内容の変更

        * jQueryUIの記載とサンプルコードを追加

    * -
      - | :ref:`accordion`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`tab`
      - | 記載内容の変更

        * jQueryUIの記載とサンプルコードを追加

    * -
      - | :ref:`slider`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`carousel`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`calendar`
      - | 記載内容の移動

        * 「bootstrap-datepickerを用いた日付入力時のカレンダー表示」を付録から移動

        | 記載内容の変更

        * :ref:`calendarholidaysetting` について、性能を考慮した実装に改善
        * :ref:`calendarlocalize` について、ロケールの誤記を修正（jp⇒ja）

    * -
      - | :ref:`autocomplete`
      - | 記載内容の変更

        * オートコンプリートの候補を非同期通信で取得する方法について記載を追加
        * 「jQuery UI AutocompleteでIMEを使用する際の不具合」について、Firefoxのバージョンアップで解消したため、記載とサンプルコードを削除

    * -
      - | :ref:`progress-bar`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`table-index`
      - | 記載内容の変更

        * 機能拡充に伴い、ライブラリが実現できる機能に加筆した機能を追加
        * テーブルの表示セル数に関する注意点を追加
        * SlickGridとBootstrapを併用する場合の注意点を追加

    * -
      - | :ref:`slickgrid-with-ajax`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`control-shortcut-key`
      - | 記載内容の変更

        * 対応可能なキーの確認方法について記載を追加

    * -
      - | :ref:`prevent-range-selection`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`prevent-continuous-click`
      - | 記載内容の変更

        * :ref:`prevent-continuous-click-howtoextend-multiplebuttons` について、ガイドラインの記載とサンプルコードの追加
        * :ref:`prevent-continuous-click-howtoextend-loading` について、ガイドラインの記載とサンプルコードの追加
        * :ref:`prevent-continuous-click-howtoextend-alinktag` について、ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`work-with-element`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`format-conversion`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加
        * 「Moment.jsによる日付処理」を付録から本節に移動

    * -
      - | :ref:`validation`
      - | 記載内容の変更

        * 「Parsleyを用いた入力値チェック」を付録から本節に移動
        * サンプルコードのバグ（必須チェック誤り、エラーメッセージの文字色誤り）を修正

    * -
      - | :ref:`asynchronous-processing`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * -
      - | :ref:`javascript-howto`
      - | 記載内容の追加

        * ガイドラインの記載の追加

    * -
      - | :ref:`grid-solution-label`
      - | 記載内容の変更

        * GitHubのissueのリンク誤りを修正

    * -
      - | :ref:`gearing-macchinetta-server-framework`
      - | 記載内容の追加

        * ガイドラインの記載とサンプルコードの追加

    * - 2015-2-27
      - | -
      - 初版制定
