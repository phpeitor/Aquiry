!(function (e) {
  "use strict";
  function t() {
    for (
      var e = document
          .getElementById("topnav-menu-content")
          .getElementsByTagName("a"),
        t = 0,
        n = e.length;
      t < n;
      t++
    )
      "nav-item dropdown active" === e[t].parentElement.getAttribute("class") &&
        (e[t].parentElement.classList.remove("active"),
        e[t].nextElementSibling.classList.remove("show"));
  }
  document.addEventListener("scroll", function () {
    !(function () {
      var e = document.getElementById("page-topbar"),
        t = document.querySelector(".sidebar-left");
      if (e) {
        var n = document.body.scrollTop || document.documentElement.scrollTop,
          o = document.documentElement.getAttribute("data-layout");
        n >= 50
          ? (e.classList.add("topbar-shadow"),
            "semibox" === o &&
              (e.classList.add("topbar-sticky"),
              t && t.classList.add("sidebar-sticky")))
          : (e.classList.remove("topbar-shadow"),
            e.classList.remove("topbar-sticky"),
            t && t.classList.remove("sidebar-sticky"));
      }
    })();
  });
  var n = {
    defaultConfig: {
      layout: "vertical",
      contentWidth: "default",
      theme: "light",
      sidebarSize: "default",
      sidebarColor: "light",
      topbarColor: "light",
      themeColors: "default",
      dir: "ltr",
    },
    storageKey: "app_layout_config",
    config: {},
    systemThemeMediaQuery: null,
    handleSystemThemeChange: null,
    init: function () {
      (this.loadConfig(),
        this.applyConfig(),
        this.setupEventListeners(),
        this.setupSystemThemeDetection(),
        this.initializeBootstrapComponents());
    },
    loadConfig: function () {
      try {
        var t = localStorage.getItem(this.storageKey);
        this.config = t ? JSON.parse(t) : Object.assign({}, this.defaultConfig);
      } catch (e) {
        (console.error("Error loading layout config:", e),
          (this.config = Object.assign({}, this.defaultConfig)));
      }
      e(window).on(
        "resize",
        function () {
          e(window).width() < 769
            ? document.documentElement.setAttribute("data-sidebar", "default")
            : "horizontal" !== this.config.layout &&
              document.documentElement.setAttribute(
                "data-sidebar",
                this.config.sidebarSize,
              );
        }.bind(this),
      );
    },
    saveConfig: function () {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.config));
      } catch (e) {
        console.error("Error saving layout config:", e);
      }
    },
    applyConfig: function () {
      var t = document.documentElement;
      (t.setAttribute("data-layout", this.config.layout),
        t.setAttribute("data-content-width", this.config.contentWidth),
        t.setAttribute("data-bs-theme", this.config.theme),
        "horizontal" !== this.config.layout
          ? (t.setAttribute("data-sidebar", this.config.sidebarSize),
            e(".sidebarSize").show())
          : (t.removeAttribute("data-sidebar"), e(".sidebarSize").hide()),
        t.setAttribute("data-sidebar-color", this.config.sidebarColor),
        t.setAttribute("data-topbar-color", this.config.topbarColor),
        this.config.themeColors &&
          t.setAttribute("data-theme-colors", this.config.themeColors),
        t.setAttribute("dir", this.config.dir),
        "rtl" === this.config.dir &&
          (document
            .getElementById("bootstrap-style")
            .setAttribute("href", "./css/bootstrap-rtl.min.css"),
          document
            .getElementById("app-style")
            .setAttribute("href", "./css/app-rtl.min.css")),
        this.updateRadioSelections(),
        this.applyThemeMode(),
        "boxed" === this.config.contentWidth &&
          window.dispatchEvent(new Event("resize")));
    },
    updateRadioSelections: function () {
      function e(e, t) {
        var n = document.querySelector(e + '[value="' + t + '"]');
        n && (n.checked = !0);
      }
      (e('input[name="data-layout"]', this.config.layout),
        e('input[name="data-content-width"]', this.config.contentWidth),
        e('input[name="data-bs-theme"]', this.config.theme),
        e('input[name="data-sidebar"]', this.config.sidebarSize),
        e('input[name="data-sidebar-color"]', this.config.sidebarColor),
        e('input[name="data-topbar-color"]', this.config.topbarColor),
        e('input[name="data-theme-colors"]', this.config.themeColors));
    },
    applyThemeMode: function () {
      if ("auto" === this.config.theme) {
        var e = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute(
          "data-bs-theme",
          e ? "dark" : "light",
        );
      } else
        document.documentElement.setAttribute(
          "data-bs-theme",
          this.config.theme,
        );
    },
    setupSystemThemeDetection: function () {
      var e = this;
      (this.systemThemeMediaQuery &&
        this.handleSystemThemeChange &&
        this.systemThemeMediaQuery.removeEventListener(
          "change",
          this.handleSystemThemeChange,
        ),
        (this.systemThemeMediaQuery = window.matchMedia(
          "(prefers-color-scheme: dark)",
        )),
        (this.handleSystemThemeChange = function () {
          "auto" === e.config.theme && e.applyThemeMode();
        }),
        this.systemThemeMediaQuery.addEventListener
          ? this.systemThemeMediaQuery.addEventListener(
              "change",
              this.handleSystemThemeChange,
            )
          : this.systemThemeMediaQuery.addListener &&
            this.systemThemeMediaQuery.addListener(
              this.handleSystemThemeChange,
            ));
    },
    handleRadioChange: function (e) {
      var t = e.target;
      if ("radio" === t.type) {
        var n = t.name,
          o = t.value,
          a = n.replace("data-", "").replace("bs-", "");
        ("content-width" === a && (a = "contentWidth"),
          "sidebar-color" === a && (a = "sidebarColor"),
          "topbar-color" === a && (a = "topbarColor"),
          "sidebar" === a && (a = "sidebarSize"),
          "theme-colors" === a && (a = "themeColors"),
          (this.config[a] = o),
          this.saveConfig(),
          document.documentElement.setAttribute(n, o),
          "data-bs-theme" === n &&
            (this.applyThemeMode(),
            "auto" === o && this.setupSystemThemeDetection()),
          "data-layout" === n && this.handleLayoutChange(o),
          console.log("Layout changed:", a, "=", o));
      }
    },
    handleLayoutChange: function (t) {
      ("horizontal" === t
        ? (e("body").addClass("horizontal-layout"),
          e("body").removeClass("sidebar-enable sidebar-collpsed"),
          e(".sidebarSize").hide(),
          document.documentElement.removeAttribute("data-sidebar"))
        : (e("body").removeClass("horizontal-layout"),
          e(".sidebarSize").show()),
        setTimeout(function () {
          e(window).trigger("resize");
        }, 100));
    },
    resetToDefaults: function () {
      ((this.config = Object.assign({}, this.defaultConfig)),
        this.saveConfig(),
        this.applyConfig(),
        console.log("Layout reset to defaults"));
    },
    setupEventListeners: function () {
      var e = this;
      document.addEventListener("change", function (t) {
        "radio" === t.target.type &&
          (t.target.name.startsWith("data-") ||
            [
              "layout",
              "content-width",
              "theme",
              "sidebar",
              "sidebar-color",
              "topbar-color",
              "theme-colors",
            ].includes(t.target.name)) &&
          e.handleRadioChange(t);
      });
      var t = document.querySelector('.btn-light[data-reset="layouts"]');
      t &&
        t.addEventListener("click", function () {
          e.resetToDefaults();
        });
      var n = document.querySelector(".btn-danger");
      n &&
        n.innerHTML.includes("Buy") &&
        n.addEventListener("click", function () {
          console.log("Buy Now clicked");
        });
      var o = document.getElementById("light-dark-mode");
      o &&
        o.addEventListener("click", function () {
          var t =
            "dark" === document.documentElement.getAttribute("data-bs-theme")
              ? "light"
              : "dark";
          ((e.config.theme = t),
            e.saveConfig(),
            e.applyThemeMode(),
            e.updateRadioSelections(),
            console.log("Theme toggled to:", t));
        });
    },
    initializeBootstrapComponents: function () {
      "undefined" != typeof bootstrap &&
        ([].slice
          .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
          .map(function (e) {
            return new bootstrap.Tooltip(e);
          }),
        [].slice
          .call(document.querySelectorAll('[data-bs-toggle="popover"]'))
          .map(function (e) {
            return new bootstrap.Popover(e);
          }));
    },
  };
  function o() {
    (e("#side-menu").metisMenu(),
      e(".horizontal-sidebar #side-menu").metisMenu(),
      e("#sidebar-btn").on("click", function (t) {
        t.preventDefault();
        var o = document.documentElement.getAttribute("data-sidebar");
        e(window).width() >= 992
          ? "small" === o
            ? (document.documentElement.setAttribute("data-sidebar", "default"),
              (n.config.sidebarSize = "default"),
              n.saveConfig())
            : (document.documentElement.setAttribute("data-sidebar", "small"),
              (n.config.sidebarSize = "small"),
              n.saveConfig())
          : e("body").toggleClass("sidebar-enable");
      }),
      e("body,html").click(function (t) {
        var n = e("#sidebar-btn");
        n.is(t.target) ||
          0 !== n.has(t.target).length ||
          t.target.closest("div.sidebar-left") ||
          (e(window).width() < 992 && e("body").removeClass("sidebar-enable"));
      }),
      e("#sidebar-menu a").each(function () {
        var t = window.location.href.split(/[?#]/)[0];
        this.href == t &&
          (e(this).addClass("active"),
          e(this).parent().addClass("mm-active"),
          e(this).parent().parent().addClass("mm-show"),
          e(this).parent().parent().prev().addClass("mm-active"),
          e(this).parent().parent().parent().addClass("mm-active"),
          e(this).parent().parent().parent().parent().addClass("mm-show"),
          e(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("mm-active"));
      }),
      e(".navbar-nav a").each(function () {
        var t = window.location.href.split(/[?#]/)[0];
        this.href == t &&
          (e(this).addClass("active"),
          e(this).parent().addClass("active"),
          e(this).parent().parent().addClass("active"),
          e(this).parent().parent().parent().addClass("active"),
          e(this).parent().parent().parent().parent().addClass("active"),
          e(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .parent()
            .addClass("active"));
      }),
      e(document).ready(function () {
        if (
          e("#sidebar-menu").length > 0 &&
          e("#sidebar-menu .mm-active .active").length > 0
        ) {
          var t = e("#sidebar-menu .mm-active .active").offset().top;
          t > 300 &&
            ((t -= 300),
            e(".vertical-menu .simplebar-content-wrapper").animate(
              { scrollTop: t },
              "slow",
            ));
        }
      }),
      (function () {
        function t() {
          document.webkitIsFullScreen ||
            document.mozFullScreen ||
            document.msFullscreenElement ||
            (console.log("pressed"),
            e("body").removeClass("fullscreen-enable"));
        }
        (e('[data-toggle="fullscreen"]').on("click", function (t) {
          (t.preventDefault(),
            e("body").toggleClass("fullscreen-enable"),
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement
              ? document.cancelFullScreen
                ? document.cancelFullScreen()
                : document.mozCancelFullScreen
                  ? document.mozCancelFullScreen()
                  : document.webkitCancelFullScreen &&
                    document.webkitCancelFullScreen()
              : document.documentElement.requestFullscreen
                ? document.documentElement.requestFullscreen()
                : document.documentElement.mozRequestFullScreen
                  ? document.documentElement.mozRequestFullScreen()
                  : document.documentElement.webkitRequestFullscreen &&
                    document.documentElement.webkitRequestFullscreen(
                      Element.ALLOW_KEYBOARD_INPUT,
                    ));
        }),
          document.addEventListener("fullscreenchange", t),
          document.addEventListener("webkitfullscreenchange", t),
          document.addEventListener("mozfullscreenchange", t));
      })(),
      e(".right-bar-toggle").on("click", function (t) {
        e("body").toggleClass("right-bar-enabled");
      }),
      e(document).on("click", "body", function (t) {
        e(t.target).closest(".right-bar-toggle, .right-bar").length > 0 ||
          e("body").removeClass("right-bar-enabled");
      }),
      (function () {
        if (document.getElementById("topnav-menu-content")) {
          for (
            var e = document
                .getElementById("topnav-menu-content")
                .getElementsByTagName("a"),
              n = 0,
              o = e.length;
            n < o;
            n++
          )
            e[n].onclick = function (e) {
              "#" === e.target.getAttribute("href") &&
                (e.target.parentElement.classList.toggle("active"),
                e.target.nextElementSibling.classList.toggle("show"));
            };
          window.addEventListener("resize", t);
        }
      })(),
      [].slice
        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        .map(function (e) {
          return new bootstrap.Tooltip(e);
        }),
      [].slice
        .call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        .map(function (e) {
          return new bootstrap.Popover(e);
        }),
      "undefined" != typeof eva && eva.replace(),
      e(window).on("load", function () {
        (e("#status").fadeOut(), e("#preloader").delay(350).fadeOut("slow"));
      }),
      n.init(),
      (function () {
        (e("#customizer-layout01").on("click", function () {
          a("data-layout", "vertical");
        }),
          e("#customizer-layout02").on("click", function () {
            (a("data-layout", "horizontal"),
              document.documentElement.removeAttribute("data-sidebar"));
          }),
          e("#customizer-layout03").on("click", function () {
            a("data-layout", "semibox");
          }),
          e("#defaultContent").on("click", function () {
            a("data-content-width", "default");
          }),
          e("#boxLayout").on("click", function () {
            a("data-content-width", "boxed");
          }),
          e("#layout-light").on("click", function () {
            a("data-bs-theme", "light");
          }),
          e("#layout-dark").on("click", function () {
            a("data-bs-theme", "dark");
          }),
          e("#automode").on("click", function () {
            a("data-bs-theme", "auto");
          }),
          e("#sidebar-default").on("click", function () {
            (a("data-sidebar", "default"),
              e("body").removeClass("sidebar-collpsed"));
          }),
          e("#sidebar-medium").on("click", function () {
            a("data-sidebar", "medium");
          }),
          e("#sidebar-small").on("click", function () {
            a("data-sidebar", "small");
          }),
          e("#sidebar-light").on("click", function () {
            a("data-sidebar-color", "light");
          }),
          e("#sidebar-dark").on("click", function () {
            a("data-sidebar-color", "dark");
          }),
          e("#topbar-light").on("click", function () {
            a("data-topbar-color", "light");
          }),
          e("#topbar-dark").on("click", function () {
            a("data-topbar-color", "dark");
          }),
          e("#themeColor-01").on("click", function () {
            a("data-theme-colors", "default");
          }),
          e("#themeColor-02").on("click", function () {
            a("data-theme-colors", "orange");
          }),
          e("#themeColor-03").on("click", function () {
            a("data-theme-colors", "skyblue");
          }),
          e("#themeColor-04").on("click", function () {
            a("data-theme-colors", "purple");
          }),
          e("#themeColor-05").on("click", function () {
            a("data-theme-colors", "green");
          }),
          e("#themeColor-06").on("click", function () {
            a("data-theme-colors", "pink");
          }));
        var t = document.documentElement,
          o = document.getElementById("layout-dir-btn");
        function a(e, t) {
          document.documentElement.setAttribute(e, t);
          var o = e.replace("data-", "").replace("bs-", "");
          ("content-width" === o && (o = "contentWidth"),
            "sidebar-color" === o && (o = "sidebarColor"),
            "topbar-color" === o && (o = "topbarColor"),
            "sidebar" === o && (o = "sidebarSize"),
            "theme-colors" === o && (o = "themeColors"),
            (n.config[o] = t),
            n.saveConfig(),
            "data-bs-theme" === e &&
              (n.applyThemeMode(),
              "auto" === t && n.setupSystemThemeDetection()),
            console.log("Layout attribute set:", e, "=", t));
        }
        o &&
          o.addEventListener("click", function (e) {
            t.hasAttribute("dir") && "rtl" == t.getAttribute("dir")
              ? (t.setAttribute("dir", "ltr"),
                document
                  .getElementById("bootstrap-style")
                  .setAttribute("href", "./css/bootstrap.min.css"),
                document
                  .getElementById("app-style")
                  .setAttribute("href", "./css/app.min.css"),
                (this.innerHTML = "RTL"),
                (n.config.dir = "ltr"),
                n.saveConfig())
              : (t.setAttribute("dir", "rtl"),
                document
                  .getElementById("bootstrap-style")
                  .setAttribute("href", "./css/bootstrap-rtl.min.css"),
                document
                  .getElementById("app-style")
                  .setAttribute("href", "./css/app-rtl.min.css"),
                (this.innerHTML = "LTR"),
                (n.config.dir = "rtl"),
                n.saveConfig());
          });
      })(),
      "undefined" != typeof Waves && Waves.init(),
      e("[data-counter]").each(function () {
        var t = e(this),
          n = parseFloat(t.attr("data-counter")),
          o = t.attr("data-prefix") || "",
          a = t.attr("data-suffix") || "",
          i = parseInt(t.attr("data-decimals") || 0, 10),
          s = 0,
          r = n / 200;
        !(function e() {
          (s += r) < n
            ? (t.text(
                o +
                  s
                    .toFixed(i)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  a,
              ),
              setTimeout(e, 20))
            : t.text(
                o +
                  n
                    .toFixed(i)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  a,
              );
        })();
      }));
  }
  e(document).ready(function () {
    window.LayoutIncludes && window.LayoutIncludes.ready
      ? window.LayoutIncludes.ready.then(o).catch(function (e) {
          (console.error(e), o());
        })
      : o();
  });
})(jQuery);
