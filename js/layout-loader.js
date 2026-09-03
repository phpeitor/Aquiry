(function () {
  "use strict";

  function includePartial(element) {
    var path = element.getAttribute("data-layout-include");

    return fetch(path)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("No se pudo cargar " + path);
        }

        return response.text();
      })
      .then(function (html) {
        element.outerHTML = html;
      });
  }

  function loadIncludes() {
    var includes = Array.prototype.slice.call(
      document.querySelectorAll("[data-layout-include]")
    );

    if (!includes.length) {
      return Promise.resolve();
    }

    return Promise.all(includes.map(includePartial)).then(loadIncludes);
  }

  window.LayoutIncludes = {
    ready: loadIncludes().then(function () {
      document.dispatchEvent(new CustomEvent("layout:loaded"));
    })
  };
})();
