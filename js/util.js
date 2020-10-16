'use strict';

(function () {

  window.util = {
    isEscEvent(evt, action) {
      if (evt.key === `Escape` && !window.nameFocus) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.key === `Enter`) {
        action();
      }
    }
  };
})();
