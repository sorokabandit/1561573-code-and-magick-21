'use strict';
(function () {
  const saveURL = `https://21.javascript.pages.academy/code-and-magick`;
  const loadURL = `https://21.javascript.pages.academy/code-and-magick/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;


  window.backend = {
    save(data, onLoad, onError) {
      const savexhr = new XMLHttpRequest();
      savexhr.responseType = `json`;

      savexhr.addEventListener(`load`, function () {
        onLoad(savexhr.response);
      });
      savexhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      savexhr.open(`POST`, saveURL);
      savexhr.send(data);
    },
    load(onLoad, onError) {
      const loadxhr = new XMLHttpRequest();
      loadxhr.responseType = `json`;


      loadxhr.addEventListener(`load`, function () {
        if (loadxhr.status === StatusCode.OK && onLoad) {
          onLoad(loadxhr.response);
        } else if (onError) {
          onError(`Статус ответа: ` + loadxhr.status + ` ` + loadxhr.statusText);
        }
      });
      loadxhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });

      loadxhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + loadxhr.timeout + `мс`);
      });

      loadxhr.timeout = TIMEOUT_IN_MS;

      loadxhr.open(`GET`, loadURL);
      loadxhr.send();
    }

  };
})();
