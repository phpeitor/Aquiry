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

  var includes = Array.prototype.slice.call(
    document.querySelectorAll("[data-layout-include]")
  );

  window.LayoutIncludes = {
    ready: Promise.all(includes.map(includePartial)).then(function () {
      document.dispatchEvent(new CustomEvent("layout:loaded"));
    })
  };
})();
