/*
 *
 * Copyright(c) 2018 NTT Corporation.
 */
// accordion-multiple.js

'use strict';

// 複数開くアコーディオン
$(function () {
  $('#accordion').children('div').accordion({
    active: false,
    collapsible: true
  });
});
