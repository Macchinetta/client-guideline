// deferred-promise-sleep.js

'use strict';

function sleep(ms) {
  var d1 = new Date().getTime();
  var d2 = new Date().getTime();
  while (d2 < (d1 + ms)) {
    d2 = new Date().getTime();
  }
  return;
}

sleep(500);
