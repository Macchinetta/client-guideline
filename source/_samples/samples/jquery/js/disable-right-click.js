// disable-right-click.js

'use strict';

$(function () {

  $(document).on('contextmenu', function (event) {
    event.preventDefault();
  });

});
