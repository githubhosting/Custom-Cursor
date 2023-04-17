(() => {
  var e = {
      187: (e) => {
        "use strict";
        var t,
          i = "object" == typeof Reflect ? Reflect : null,
          n =
            i && "function" == typeof i.apply
              ? i.apply
              : function (e, t, i) {
                  return Function.prototype.apply.call(e, t, i);
                };
        t =
          i && "function" == typeof i.ownKeys
            ? i.ownKeys
            : Object.getOwnPropertySymbols
            ? function (e) {
                return Object.getOwnPropertyNames(e).concat(
                  Object.getOwnPropertySymbols(e)
                );
              }
            : function (e) {
                return Object.getOwnPropertyNames(e);
              };
        var r =
          Number.isNaN ||
          function (e) {
            return e != e;
          };
        function s() {
          s.init.call(this);
        }
        (e.exports = s),
          (e.exports.once = function (e, t) {
            return new Promise(function (i, n) {
              function r(i) {
                e.removeListener(t, s), n(i);
              }
              function s() {
                "function" == typeof e.removeListener &&
                  e.removeListener("error", r),
                  i([].slice.call(arguments));
              }
              m(e, t, s, { once: !0 }),
                "error" !== t &&
                  (function (e, t, i) {
                    "function" == typeof e.on && m(e, "error", t, i);
                  })(e, r, { once: !0 });
            });
          }),
          (s.EventEmitter = s),
          (s.prototype._events = void 0),
          (s.prototype._eventsCount = 0),
          (s.prototype._maxListeners = void 0);
        var a = 10;
        function o(e) {
          if ("function" != typeof e)
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof e
            );
        }
        function l(e) {
          return void 0 === e._maxListeners
            ? s.defaultMaxListeners
            : e._maxListeners;
        }
        function c(e, t, i, n) {
          var r, s, a, c;
          if (
            (o(i),
            void 0 === (s = e._events)
              ? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
              : (void 0 !== s.newListener &&
                  (e.emit("newListener", t, i.listener ? i.listener : i),
                  (s = e._events)),
                (a = s[t])),
            void 0 === a)
          )
            (a = s[t] = i), ++e._eventsCount;
          else if (
            ("function" == typeof a
              ? (a = s[t] = n ? [i, a] : [a, i])
              : n
              ? a.unshift(i)
              : a.push(i),
            (r = l(e)) > 0 && a.length > r && !a.warned)
          ) {
            a.warned = !0;
            var u = new Error(
              "Possible EventEmitter memory leak detected. " +
                a.length +
                " " +
                String(t) +
                " listeners added. Use emitter.setMaxListeners() to increase limit"
            );
            (u.name = "MaxListenersExceededWarning"),
              (u.emitter = e),
              (u.type = t),
              (u.count = a.length),
              (c = u),
              console && console.warn && console.warn(c);
          }
          return e;
        }
        function u() {
          if (!this.fired)
            return (
              this.target.removeListener(this.type, this.wrapFn),
              (this.fired = !0),
              0 === arguments.length
                ? this.listener.call(this.target)
                : this.listener.apply(this.target, arguments)
            );
        }
        function d(e, t, i) {
          var n = {
              fired: !1,
              wrapFn: void 0,
              target: e,
              type: t,
              listener: i,
            },
            r = u.bind(n);
          return (r.listener = i), (n.wrapFn = r), r;
        }
        function h(e, t, i) {
          var n = e._events;
          if (void 0 === n) return [];
          var r = n[t];
          return void 0 === r
            ? []
            : "function" == typeof r
            ? i
              ? [r.listener || r]
              : [r]
            : i
            ? (function (e) {
                for (var t = new Array(e.length), i = 0; i < t.length; ++i)
                  t[i] = e[i].listener || e[i];
                return t;
              })(r)
            : f(r, r.length);
        }
        function p(e) {
          var t = this._events;
          if (void 0 !== t) {
            var i = t[e];
            if ("function" == typeof i) return 1;
            if (void 0 !== i) return i.length;
          }
          return 0;
        }
        function f(e, t) {
          for (var i = new Array(t), n = 0; n < t; ++n) i[n] = e[n];
          return i;
        }
        function m(e, t, i, n) {
          if ("function" == typeof e.on) n.once ? e.once(t, i) : e.on(t, i);
          else {
            if ("function" != typeof e.addEventListener)
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof e
              );
            e.addEventListener(t, function r(s) {
              n.once && e.removeEventListener(t, r), i(s);
            });
          }
        }
        Object.defineProperty(s, "defaultMaxListeners", {
          enumerable: !0,
          get: function () {
            return a;
          },
          set: function (e) {
            if ("number" != typeof e || e < 0 || r(e))
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            a = e;
          },
        }),
          (s.init = function () {
            (void 0 !== this._events &&
              this._events !== Object.getPrototypeOf(this)._events) ||
              ((this._events = Object.create(null)), (this._eventsCount = 0)),
              (this._maxListeners = this._maxListeners || void 0);
          }),
          (s.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || r(e))
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  e +
                  "."
              );
            return (this._maxListeners = e), this;
          }),
          (s.prototype.getMaxListeners = function () {
            return l(this);
          }),
          (s.prototype.emit = function (e) {
            for (var t = [], i = 1; i < arguments.length; i++)
              t.push(arguments[i]);
            var r = "error" === e,
              s = this._events;
            if (void 0 !== s) r = r && void 0 === s.error;
            else if (!r) return !1;
            if (r) {
              var a;
              if ((t.length > 0 && (a = t[0]), a instanceof Error)) throw a;
              var o = new Error(
                "Unhandled error." + (a ? " (" + a.message + ")" : "")
              );
              throw ((o.context = a), o);
            }
            var l = s[e];
            if (void 0 === l) return !1;
            if ("function" == typeof l) n(l, this, t);
            else {
              var c = l.length,
                u = f(l, c);
              for (i = 0; i < c; ++i) n(u[i], this, t);
            }
            return !0;
          }),
          (s.prototype.addListener = function (e, t) {
            return c(this, e, t, !1);
          }),
          (s.prototype.on = s.prototype.addListener),
          (s.prototype.prependListener = function (e, t) {
            return c(this, e, t, !0);
          }),
          (s.prototype.once = function (e, t) {
            return o(t), this.on(e, d(this, e, t)), this;
          }),
          (s.prototype.prependOnceListener = function (e, t) {
            return o(t), this.prependListener(e, d(this, e, t)), this;
          }),
          (s.prototype.removeListener = function (e, t) {
            var i, n, r, s, a;
            if ((o(t), void 0 === (n = this._events))) return this;
            if (void 0 === (i = n[e])) return this;
            if (i === t || i.listener === t)
              0 == --this._eventsCount
                ? (this._events = Object.create(null))
                : (delete n[e],
                  n.removeListener &&
                    this.emit("removeListener", e, i.listener || t));
            else if ("function" != typeof i) {
              for (r = -1, s = i.length - 1; s >= 0; s--)
                if (i[s] === t || i[s].listener === t) {
                  (a = i[s].listener), (r = s);
                  break;
                }
              if (r < 0) return this;
              0 === r
                ? i.shift()
                : (function (e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop();
                  })(i, r),
                1 === i.length && (n[e] = i[0]),
                void 0 !== n.removeListener &&
                  this.emit("removeListener", e, a || t);
            }
            return this;
          }),
          (s.prototype.off = s.prototype.removeListener),
          (s.prototype.removeAllListeners = function (e) {
            var t, i, n;
            if (void 0 === (i = this._events)) return this;
            if (void 0 === i.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = Object.create(null)),
                    (this._eventsCount = 0))
                  : void 0 !== i[e] &&
                    (0 == --this._eventsCount
                      ? (this._events = Object.create(null))
                      : delete i[e]),
                this
              );
            if (0 === arguments.length) {
              var r,
                s = Object.keys(i);
              for (n = 0; n < s.length; ++n)
                "removeListener" !== (r = s[n]) && this.removeAllListeners(r);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = Object.create(null)),
                (this._eventsCount = 0),
                this
              );
            }
            if ("function" == typeof (t = i[e])) this.removeListener(e, t);
            else if (void 0 !== t)
              for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
            return this;
          }),
          (s.prototype.listeners = function (e) {
            return h(this, e, !0);
          }),
          (s.prototype.rawListeners = function (e) {
            return h(this, e, !1);
          }),
          (s.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount
              ? e.listenerCount(t)
              : p.call(e, t);
          }),
          (s.prototype.listenerCount = p),
          (s.prototype.eventNames = function () {
            return this._eventsCount > 0 ? t(this._events) : [];
          });
      },
      41: function (e) {
        e.exports = (function () {
          "use strict";
          var e = document,
            t = e.createTextNode.bind(e);
          function i(e, t, i) {
            e.style.setProperty(t, i);
          }
          function n(e, t) {
            return e.appendChild(t);
          }
          function r(t, i, r, s) {
            var a = e.createElement("span");
            return (
              i && (a.className = i),
              r && (!s && a.setAttribute("data-" + i, r), (a.textContent = r)),
              (t && n(t, a)) || a
            );
          }
          function s(e, t) {
            return e.getAttribute("data-" + t);
          }
          function a(t, i) {
            return t && 0 != t.length
              ? t.nodeName
                ? [t]
                : [].slice.call(
                    t[0].nodeName ? t : (i || e).querySelectorAll(t)
                  )
              : [];
          }
          function o(e) {
            for (var t = []; e--; ) t[e] = [];
            return t;
          }
          function l(e, t) {
            e && e.some(t);
          }
          function c(e) {
            return function (t) {
              return e[t];
            };
          }
          function u(e, t, n) {
            var r = "--" + t,
              s = r + "-index";
            l(n, function (e, t) {
              Array.isArray(e)
                ? l(e, function (e) {
                    i(e, s, t);
                  })
                : i(e, s, t);
            }),
              i(e, r + "-total", n.length);
          }
          var d = {};
          function h(e, t, i) {
            var n = i.indexOf(e);
            if (-1 == n)
              i.unshift(e),
                l(d[e].depends, function (t) {
                  h(t, e, i);
                });
            else {
              var r = i.indexOf(t);
              i.splice(n, 1), i.splice(r, 0, e);
            }
            return i;
          }
          function p(e, t, i, n) {
            return { by: e, depends: t, key: i, split: n };
          }
          function f(e) {
            return h(e, 0, []).map(c(d));
          }
          function m(e) {
            d[e.by] = e;
          }
          function g(e, i, s, o, c) {
            e.normalize();
            var u = [],
              d = document.createDocumentFragment();
            o && u.push(e.previousSibling);
            var h = [];
            return (
              a(e.childNodes).some(function (e) {
                if (!e.tagName || e.hasChildNodes()) {
                  if (e.childNodes && e.childNodes.length)
                    return h.push(e), void u.push.apply(u, g(e, i, s, o, c));
                  var n = e.wholeText || "",
                    a = n.trim();
                  a.length &&
                    (" " === n[0] && h.push(t(" ")),
                    l(a.split(s), function (e, t) {
                      t && c && h.push(r(d, "whitespace", " ", c));
                      var n = r(d, i, e);
                      u.push(n), h.push(n);
                    }),
                    " " === n[n.length - 1] && h.push(t(" ")));
                } else h.push(e);
              }),
              l(h, function (e) {
                n(d, e);
              }),
              (e.innerHTML = ""),
              n(e, d),
              u
            );
          }
          var v = 0;
          function y(e, t) {
            for (var i in t) e[i] = t[i];
            return e;
          }
          var b = "words",
            w = p(b, v, "word", function (e) {
              return g(e, "word", /\s+/, 0, 1);
            }),
            _ = "chars",
            x = p(_, [b], "char", function (e, t, i) {
              var n = [];
              return (
                l(i[b], function (e, i) {
                  n.push.apply(n, g(e, "char", "", t.whitespace && i));
                }),
                n
              );
            });
          function T(e) {
            var t = (e = e || {}).key;
            return a(e.target || "[data-splitting]").map(function (i) {
              var n = i["ðŸŒ"];
              if (!e.force && n) return n;
              n = i["ðŸŒ"] = { el: i };
              var r = f(e.by || s(i, "splitting") || _),
                a = y({}, e);
              return (
                l(r, function (e) {
                  if (e.split) {
                    var r = e.by,
                      s = (t ? "-" + t : "") + e.key,
                      o = e.split(i, a, n);
                    s && u(i, s, o), (n[r] = o), i.classList.add(r);
                  }
                }),
                i.classList.add("splitting"),
                n
              );
            });
          }
          function E(e) {
            var t = ((e = e || {}).target = r());
            return (t.innerHTML = e.content), T(e), t.outerHTML;
          }
          function S(e, t, i) {
            var n = a(t.matching || e.children, e),
              r = {};
            return (
              l(n, function (e) {
                var t = Math.round(e[i]);
                (r[t] || (r[t] = [])).push(e);
              }),
              Object.keys(r).map(Number).sort(C).map(c(r))
            );
          }
          function C(e, t) {
            return e - t;
          }
          (T.html = E), (T.add = m);
          var M = p("lines", [b], "line", function (e, t, i) {
              return S(e, { matching: i[b] }, "offsetTop");
            }),
            O = p("items", v, "item", function (e, t) {
              return a(t.matching || e.children, e);
            }),
            D = p("rows", v, "row", function (e, t) {
              return S(e, t, "offsetTop");
            }),
            A = p("cols", v, "col", function (e, t) {
              return S(e, t, "offsetLeft");
            }),
            L = p("grid", ["rows", "cols"]),
            P = "layout",
            k = p(P, v, v, function (e, t) {
              var o = (t.rows = +(t.rows || s(e, "rows") || 1)),
                l = (t.columns = +(t.columns || s(e, "columns") || 1));
              if (
                ((t.image = t.image || s(e, "image") || e.currentSrc || e.src),
                t.image)
              ) {
                var c = a("img", e)[0];
                t.image = c && (c.currentSrc || c.src);
              }
              t.image && i(e, "background-image", "url(" + t.image + ")");
              for (var u = o * l, d = [], h = r(v, "cell-grid"); u--; ) {
                var p = r(h, "cell");
                r(p, "cell-inner"), d.push(p);
              }
              return n(e, h), d;
            }),
            $ = p("cellRows", [P], "row", function (e, t, i) {
              var n = t.rows,
                r = o(n);
              return (
                l(i[P], function (e, t, i) {
                  r[Math.floor(t / (i.length / n))].push(e);
                }),
                r
              );
            }),
            R = p("cellColumns", [P], "col", function (e, t, i) {
              var n = t.columns,
                r = o(n);
              return (
                l(i[P], function (e, t) {
                  r[t % n].push(e);
                }),
                r
              );
            }),
            z = p(
              "cells",
              ["cellRows", "cellColumns"],
              "cell",
              function (e, t, i) {
                return i[P];
              }
            );
          return (
            m(w), m(x), m(M), m(O), m(D), m(A), m(L), m(k), m($), m(R), m(z), T
          );
        })();
      },
    },
    t = {};
  function i(n) {
    var r = t[n];
    if (void 0 !== r) return r.exports;
    var s = (t[n] = { exports: {} });
    return e[n].call(s.exports, s, s.exports, i), s.exports;
  }
  (i.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return i.d(t, { a: t }), t;
  }),
    (i.d = (e, t) => {
      for (var n in t)
        i.o(t, n) &&
          !i.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (i.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
  var n = {};
  (() => {
    "use strict";
    function e(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function t(e, t) {
      (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        (e.__proto__ = t);
    }
    /*!
     * GSAP 3.10.4
     * https://greensock.com
     *
     * @license Copyright 2008-2022, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */ i.d(n, { S: () => yl });
    var r,
      s,
      a,
      o,
      l,
      c,
      u,
      d,
      h,
      p,
      f,
      m,
      g,
      v = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: { lineHeight: "" },
      },
      y = { duration: 0.5, overwrite: !1, delay: 0 },
      b = 1e8,
      w = 1e-8,
      _ = 2 * Math.PI,
      x = _ / 4,
      T = 0,
      E = Math.sqrt,
      S = Math.cos,
      C = Math.sin,
      M = function (e) {
        return "string" == typeof e;
      },
      O = function (e) {
        return "function" == typeof e;
      },
      D = function (e) {
        return "number" == typeof e;
      },
      A = function (e) {
        return void 0 === e;
      },
      L = function (e) {
        return "object" == typeof e;
      },
      P = function (e) {
        return !1 !== e;
      },
      k = function () {
        return "undefined" != typeof window;
      },
      $ = function (e) {
        return O(e) || M(e);
      },
      R =
        ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
      z = Array.isArray,
      I = /(?:-?\.?\d|\.)+/gi,
      F = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      B = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      N = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      q = /[+-]=-?[.\d]+/,
      X = /[^,'"\[\]\s]+/gi,
      Y = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      G = {},
      H = {},
      j = function (e) {
        return (H = ye(e, G)) && li;
      },
      V = function (e, t) {
        return console.warn(
          "Invalid property",
          e,
          "set to",
          t,
          "Missing plugin? gsap.registerPlugin()"
        );
      },
      U = function (e, t) {
        return !t && console.warn(e);
      },
      W = function (e, t) {
        return (e && (G[e] = t) && H && (H[e] = t)) || G;
      },
      Q = function () {
        return 0;
      },
      K = {},
      Z = [],
      J = {},
      ee = {},
      te = {},
      ie = 30,
      ne = [],
      re = "",
      se = function (e) {
        var t,
          i,
          n = e[0];
        if ((L(n) || O(n) || (e = [e]), !(t = (n._gsap || {}).harness))) {
          for (i = ne.length; i-- && !ne[i].targetTest(n); );
          t = ne[i];
        }
        for (i = e.length; i--; )
          (e[i] && (e[i]._gsap || (e[i]._gsap = new Lt(e[i], t)))) ||
            e.splice(i, 1);
        return e;
      },
      ae = function (e) {
        return e._gsap || se(Qe(e))[0]._gsap;
      },
      oe = function (e, t, i) {
        return (i = e[t]) && O(i)
          ? e[t]()
          : (A(i) && e.getAttribute && e.getAttribute(t)) || i;
      },
      le = function (e, t) {
        return (e = e.split(",")).forEach(t) || e;
      },
      ce = function (e) {
        return Math.round(1e5 * e) / 1e5 || 0;
      },
      ue = function (e) {
        return Math.round(1e7 * e) / 1e7 || 0;
      },
      de = function (e, t) {
        var i = t.charAt(0),
          n = parseFloat(t.substr(2));
        return (
          (e = parseFloat(e)),
          "+" === i ? e + n : "-" === i ? e - n : "*" === i ? e * n : e / n
        );
      },
      he = function (e, t) {
        for (var i = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < i; );
        return n < i;
      },
      pe = function () {
        var e,
          t,
          i = Z.length,
          n = Z.slice(0);
        for (J = {}, Z.length = 0, e = 0; e < i; e++)
          (t = n[e]) &&
            t._lazy &&
            (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
      },
      fe = function (e, t, i, n) {
        Z.length && pe(), e.render(t, i, n), Z.length && pe();
      },
      me = function (e) {
        var t = parseFloat(e);
        return (t || 0 === t) && (e + "").match(X).length < 2
          ? t
          : M(e)
          ? e.trim()
          : e;
      },
      ge = function (e) {
        return e;
      },
      ve = function (e, t) {
        for (var i in t) i in e || (e[i] = t[i]);
        return e;
      },
      ye = function (e, t) {
        for (var i in t) e[i] = t[i];
        return e;
      },
      be = function e(t, i) {
        for (var n in i)
          "__proto__" !== n &&
            "constructor" !== n &&
            "prototype" !== n &&
            (t[n] = L(i[n]) ? e(t[n] || (t[n] = {}), i[n]) : i[n]);
        return t;
      },
      we = function (e, t) {
        var i,
          n = {};
        for (i in e) i in t || (n[i] = e[i]);
        return n;
      },
      _e = function (e) {
        var t,
          i = e.parent || s,
          n = e.keyframes
            ? ((t = z(e.keyframes)),
              function (e, i) {
                for (var n in i)
                  n in e ||
                    ("duration" === n && t) ||
                    "ease" === n ||
                    (e[n] = i[n]);
              })
            : ve;
        if (P(e.inherit))
          for (; i; ) n(e, i.vars.defaults), (i = i.parent || i._dp);
        return e;
      },
      xe = function (e, t, i, n, r) {
        void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
        var s,
          a = e[n];
        if (r) for (s = t[r]; a && a[r] > s; ) a = a._prev;
        return (
          a
            ? ((t._next = a._next), (a._next = t))
            : ((t._next = e[i]), (e[i] = t)),
          t._next ? (t._next._prev = t) : (e[n] = t),
          (t._prev = a),
          (t.parent = t._dp = e),
          t
        );
      },
      Te = function (e, t, i, n) {
        void 0 === i && (i = "_first"), void 0 === n && (n = "_last");
        var r = t._prev,
          s = t._next;
        r ? (r._next = s) : e[i] === t && (e[i] = s),
          s ? (s._prev = r) : e[n] === t && (e[n] = r),
          (t._next = t._prev = t.parent = null);
      },
      Ee = function (e, t) {
        e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e),
          (e._act = 0);
      },
      Se = function (e, t) {
        if (e && (!t || t._end > e._dur || t._start < 0))
          for (var i = e; i; ) (i._dirty = 1), (i = i.parent);
        return e;
      },
      Ce = function (e) {
        for (var t = e.parent; t && t.parent; )
          (t._dirty = 1), t.totalDuration(), (t = t.parent);
        return e;
      },
      Me = function e(t) {
        return !t || (t._ts && e(t.parent));
      },
      Oe = function (e) {
        return e._repeat ? De(e._tTime, (e = e.duration() + e._rDelay)) * e : 0;
      },
      De = function (e, t) {
        var i = Math.floor((e /= t));
        return e && i === e ? i - 1 : i;
      },
      Ae = function (e, t) {
        return (
          (e - t._start) * t._ts +
          (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
        );
      },
      Le = function (e) {
        return (e._end = ue(
          e._start + (e._tDur / Math.abs(e._ts || e._rts || w) || 0)
        ));
      },
      Pe = function (e, t) {
        var i = e._dp;
        return (
          i &&
            i.smoothChildTiming &&
            e._ts &&
            ((e._start = ue(
              i._time -
                (e._ts > 0
                  ? t / e._ts
                  : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
            )),
            Le(e),
            i._dirty || Se(i, e)),
          e
        );
      },
      ke = function (e, t) {
        var i;
        if (
          ((t._time || (t._initted && !t._dur)) &&
            ((i = Ae(e.rawTime(), t)),
            (!t._dur || He(0, t.totalDuration(), i) - t._tTime > w) &&
              t.render(i, !0)),
          Se(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
        ) {
          if (e._dur < e.duration())
            for (i = e; i._dp; )
              i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
          e._zTime = -1e-8;
        }
      },
      $e = function (e, t, i, n) {
        return (
          t.parent && Ee(t),
          (t._start = ue(
            (D(i) ? i : i || e !== s ? Xe(e, i, t) : e._time) + t._delay
          )),
          (t._end = ue(
            t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
          )),
          xe(e, t, "_first", "_last", e._sort ? "_start" : 0),
          Fe(t) || (e._recent = t),
          n || ke(e, t),
          e
        );
      },
      Re = function (e, t) {
        return (
          (G.ScrollTrigger || V("scrollTrigger", t)) &&
          G.ScrollTrigger.create(t, e)
        );
      },
      ze = function (e, t, i, n) {
        return (
          Bt(e, t),
          e._initted
            ? !i &&
              e._pt &&
              ((e._dur && !1 !== e.vars.lazy) || (!e._dur && e.vars.lazy)) &&
              u !== yt.frame
              ? (Z.push(e), (e._lazy = [t, n]), 1)
              : void 0
            : 1
        );
      },
      Ie = function e(t) {
        var i = t.parent;
        return (
          i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || e(i))
        );
      },
      Fe = function (e) {
        var t = e.data;
        return "isFromStart" === t || "isStart" === t;
      },
      Be = function (e, t, i, n) {
        var r = e._repeat,
          s = ue(t) || 0,
          a = e._tTime / e._tDur;
        return (
          a && !n && (e._time *= s / e._dur),
          (e._dur = s),
          (e._tDur = r ? (r < 0 ? 1e10 : ue(s * (r + 1) + e._rDelay * r)) : s),
          a > 0 && !n ? Pe(e, (e._tTime = e._tDur * a)) : e.parent && Le(e),
          i || Se(e.parent, e),
          e
        );
      },
      Ne = function (e) {
        return e instanceof kt ? Se(e) : Be(e, e._dur);
      },
      qe = { _start: 0, endTime: Q, totalDuration: Q },
      Xe = function e(t, i, n) {
        var r,
          s,
          a,
          o = t.labels,
          l = t._recent || qe,
          c = t.duration() >= b ? l.endTime(!1) : t._dur;
        return M(i) && (isNaN(i) || i in o)
          ? ((s = i.charAt(0)),
            (a = "%" === i.substr(-1)),
            (r = i.indexOf("=")),
            "<" === s || ">" === s
              ? (r >= 0 && (i = i.replace(/=/, "")),
                ("<" === s ? l._start : l.endTime(l._repeat >= 0)) +
                  (parseFloat(i.substr(1)) || 0) *
                    (a ? (r < 0 ? l : n).totalDuration() / 100 : 1))
              : r < 0
              ? (i in o || (o[i] = c), o[i])
              : ((s = parseFloat(i.charAt(r - 1) + i.substr(r + 1))),
                a && n && (s = (s / 100) * (z(n) ? n[0] : n).totalDuration()),
                r > 1 ? e(t, i.substr(0, r - 1), n) + s : c + s))
          : null == i
          ? c
          : +i;
      },
      Ye = function (e, t, i) {
        var n,
          r,
          s = D(t[1]),
          a = (s ? 2 : 1) + (e < 2 ? 0 : 1),
          o = t[a];
        if ((s && (o.duration = t[1]), (o.parent = i), e)) {
          for (n = o, r = i; r && !("immediateRender" in n); )
            (n = r.vars.defaults || {}), (r = P(r.vars.inherit) && r.parent);
          (o.immediateRender = P(n.immediateRender)),
            e < 2 ? (o.runBackwards = 1) : (o.startAt = t[a - 1]);
        }
        return new Gt(t[0], o, t[a + 1]);
      },
      Ge = function (e, t) {
        return e || 0 === e ? t(e) : t;
      },
      He = function (e, t, i) {
        return i < e ? e : i > t ? t : i;
      },
      je = function (e, t) {
        return M(e) && (t = Y.exec(e)) ? t[1] : "";
      },
      Ve = [].slice,
      Ue = function (e, t) {
        return (
          e &&
          L(e) &&
          "length" in e &&
          ((!t && !e.length) || (e.length - 1 in e && L(e[0]))) &&
          !e.nodeType &&
          e !== a
        );
      },
      We = function (e, t, i) {
        return (
          void 0 === i && (i = []),
          e.forEach(function (e) {
            var n;
            return (M(e) && !t) || Ue(e, 1)
              ? (n = i).push.apply(n, Qe(e))
              : i.push(e);
          }) || i
        );
      },
      Qe = function (e, t, i) {
        return !M(e) || i || (!o && bt())
          ? z(e)
            ? We(e, i)
            : Ue(e)
            ? Ve.call(e, 0)
            : e
            ? [e]
            : []
          : Ve.call((t || l).querySelectorAll(e), 0);
      },
      Ke = function (e) {
        return e.sort(function () {
          return 0.5 - Math.random();
        });
      },
      Ze = function (e) {
        if (O(e)) return e;
        var t = L(e) ? e : { each: e },
          i = Ct(t.ease),
          n = t.from || 0,
          r = parseFloat(t.base) || 0,
          s = {},
          a = n > 0 && n < 1,
          o = isNaN(n) || a,
          l = t.axis,
          c = n,
          u = n;
        return (
          M(n)
            ? (c = u = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
            : !a && o && ((c = n[0]), (u = n[1])),
          function (e, a, d) {
            var h,
              p,
              f,
              m,
              g,
              v,
              y,
              w,
              _,
              x = (d || t).length,
              T = s[x];
            if (!T) {
              if (!(_ = "auto" === t.grid ? 0 : (t.grid || [1, b])[1])) {
                for (
                  y = -b;
                  y < (y = d[_++].getBoundingClientRect().left) && _ < x;

                );
                _--;
              }
              for (
                T = s[x] = [],
                  h = o ? Math.min(_, x) * c - 0.5 : n % _,
                  p = _ === b ? 0 : o ? (x * u) / _ - 0.5 : (n / _) | 0,
                  y = 0,
                  w = b,
                  v = 0;
                v < x;
                v++
              )
                (f = (v % _) - h),
                  (m = p - ((v / _) | 0)),
                  (T[v] = g =
                    l ? Math.abs("y" === l ? m : f) : E(f * f + m * m)),
                  g > y && (y = g),
                  g < w && (w = g);
              "random" === n && Ke(T),
                (T.max = y - w),
                (T.min = w),
                (T.v = x =
                  (parseFloat(t.amount) ||
                    parseFloat(t.each) *
                      (_ > x
                        ? x - 1
                        : l
                        ? "y" === l
                          ? x / _
                          : _
                        : Math.max(_, x / _)) ||
                    0) * ("edges" === n ? -1 : 1)),
                (T.b = x < 0 ? r - x : r),
                (T.u = je(t.amount || t.each) || 0),
                (i = i && x < 0 ? Et(i) : i);
            }
            return (
              (x = (T[e] - T.min) / T.max || 0),
              ue(T.b + (i ? i(x) : x) * T.v) + T.u
            );
          }
        );
      },
      Je = function (e) {
        var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
        return function (i) {
          var n = Math.round(parseFloat(i) / e) * e * t;
          return (n - (n % 1)) / t + (D(i) ? 0 : je(i));
        };
      },
      et = function (e, t) {
        var i,
          n,
          r = z(e);
        return (
          !r &&
            L(e) &&
            ((i = r = e.radius || b),
            e.values
              ? ((e = Qe(e.values)), (n = !D(e[0])) && (i *= i))
              : (e = Je(e.increment))),
          Ge(
            t,
            r
              ? O(e)
                ? function (t) {
                    return (n = e(t)), Math.abs(n - t) <= i ? n : t;
                  }
                : function (t) {
                    for (
                      var r,
                        s,
                        a = parseFloat(n ? t.x : t),
                        o = parseFloat(n ? t.y : 0),
                        l = b,
                        c = 0,
                        u = e.length;
                      u--;

                    )
                      (r = n
                        ? (r = e[u].x - a) * r + (s = e[u].y - o) * s
                        : Math.abs(e[u] - a)) < l && ((l = r), (c = u));
                    return (
                      (c = !i || l <= i ? e[c] : t),
                      n || c === t || D(t) ? c : c + je(t)
                    );
                  }
              : Je(e)
          )
        );
      },
      tt = function (e, t, i, n) {
        return Ge(z(e) ? !t : !0 === i ? !!(i = 0) : !n, function () {
          return z(e)
            ? e[~~(Math.random() * e.length)]
            : (i = i || 1e-5) &&
                (n = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
                Math.floor(
                  Math.round(
                    (e - i / 2 + Math.random() * (t - e + 0.99 * i)) / i
                  ) *
                    i *
                    n
                ) / n;
        });
      },
      it = function (e, t, i) {
        return Ge(i, function (i) {
          return e[~~t(i)];
        });
      },
      nt = function (e) {
        for (var t, i, n, r, s = 0, a = ""; ~(t = e.indexOf("random(", s)); )
          (n = e.indexOf(")", t)),
            (r = "[" === e.charAt(t + 7)),
            (i = e.substr(t + 7, n - t - 7).match(r ? X : I)),
            (a +=
              e.substr(s, t - s) +
              tt(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5)),
            (s = n + 1);
        return a + e.substr(s, e.length - s);
      },
      rt = function (e, t, i, n, r) {
        var s = t - e,
          a = n - i;
        return Ge(r, function (t) {
          return i + (((t - e) / s) * a || 0);
        });
      },
      st = function (e, t, i) {
        var n,
          r,
          s,
          a = e.labels,
          o = b;
        for (n in a)
          (r = a[n] - t) < 0 == !!i &&
            r &&
            o > (r = Math.abs(r)) &&
            ((s = n), (o = r));
        return s;
      },
      at = function (e, t, i) {
        var n,
          r,
          s = e.vars,
          a = s[t];
        if (a)
          return (
            (n = s[t + "Params"]),
            (r = s.callbackScope || e),
            i && Z.length && pe(),
            n ? a.apply(r, n) : a.call(r)
          );
      },
      ot = function (e) {
        return (
          Ee(e),
          e.scrollTrigger && e.scrollTrigger.kill(!1),
          e.progress() < 1 && at(e, "onInterrupt"),
          e
        );
      },
      lt = function (e) {
        var t = (e = (!e.name && e.default) || e).name,
          i = O(e),
          n =
            t && !i && e.init
              ? function () {
                  this._props = [];
                }
              : e,
          r = {
            init: Q,
            render: Jt,
            add: It,
            kill: ti,
            modifier: ei,
            rawVars: 0,
          },
          s = {
            targetTest: 0,
            get: 0,
            getSetter: Wt,
            aliases: {},
            register: 0,
          };
        if ((bt(), e !== n)) {
          if (ee[t]) return;
          ve(n, ve(we(e, r), s)),
            ye(n.prototype, ye(r, we(e, s))),
            (ee[(n.prop = t)] = n),
            e.targetTest && (ne.push(n), (K[t] = 1)),
            (t =
              ("css" === t ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) +
              "Plugin");
        }
        W(t, n), e.register && e.register(li, n, ri);
      },
      ct = 255,
      ut = {
        aqua: [0, ct, ct],
        lime: [0, ct, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, ct],
        navy: [0, 0, 128],
        white: [ct, ct, ct],
        olive: [128, 128, 0],
        yellow: [ct, ct, 0],
        orange: [ct, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [ct, 0, 0],
        pink: [ct, 192, 203],
        cyan: [0, ct, ct],
        transparent: [ct, ct, ct, 0],
      },
      dt = function (e, t, i) {
        return (
          ((6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1
            ? t + (i - t) * e * 6
            : e < 0.5
            ? i
            : 3 * e < 2
            ? t + (i - t) * (2 / 3 - e) * 6
            : t) *
            ct +
            0.5) |
          0
        );
      },
      ht = function (e, t, i) {
        var n,
          r,
          s,
          a,
          o,
          l,
          c,
          u,
          d,
          h,
          p = e ? (D(e) ? [e >> 16, (e >> 8) & ct, e & ct] : 0) : ut.black;
        if (!p) {
          if (("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), ut[e]))
            p = ut[e];
          else if ("#" === e.charAt(0)) {
            if (
              (e.length < 6 &&
                ((n = e.charAt(1)),
                (r = e.charAt(2)),
                (s = e.charAt(3)),
                (e =
                  "#" +
                  n +
                  n +
                  r +
                  r +
                  s +
                  s +
                  (5 === e.length ? e.charAt(4) + e.charAt(4) : ""))),
              9 === e.length)
            )
              return [
                (p = parseInt(e.substr(1, 6), 16)) >> 16,
                (p >> 8) & ct,
                p & ct,
                parseInt(e.substr(7), 16) / 255,
              ];
            p = [(e = parseInt(e.substr(1), 16)) >> 16, (e >> 8) & ct, e & ct];
          } else if ("hsl" === e.substr(0, 3))
            if (((p = h = e.match(I)), t)) {
              if (~e.indexOf("="))
                return (p = e.match(F)), i && p.length < 4 && (p[3] = 1), p;
            } else
              (a = (+p[0] % 360) / 360),
                (o = +p[1] / 100),
                (n =
                  2 * (l = +p[2] / 100) -
                  (r = l <= 0.5 ? l * (o + 1) : l + o - l * o)),
                p.length > 3 && (p[3] *= 1),
                (p[0] = dt(a + 1 / 3, n, r)),
                (p[1] = dt(a, n, r)),
                (p[2] = dt(a - 1 / 3, n, r));
          else p = e.match(I) || ut.transparent;
          p = p.map(Number);
        }
        return (
          t &&
            !h &&
            ((n = p[0] / ct),
            (r = p[1] / ct),
            (s = p[2] / ct),
            (l = ((c = Math.max(n, r, s)) + (u = Math.min(n, r, s))) / 2),
            c === u
              ? (a = o = 0)
              : ((d = c - u),
                (o = l > 0.5 ? d / (2 - c - u) : d / (c + u)),
                (a =
                  c === n
                    ? (r - s) / d + (r < s ? 6 : 0)
                    : c === r
                    ? (s - n) / d + 2
                    : (n - r) / d + 4),
                (a *= 60)),
            (p[0] = ~~(a + 0.5)),
            (p[1] = ~~(100 * o + 0.5)),
            (p[2] = ~~(100 * l + 0.5))),
          i && p.length < 4 && (p[3] = 1),
          p
        );
      },
      pt = function (e) {
        var t = [],
          i = [],
          n = -1;
        return (
          e.split(mt).forEach(function (e) {
            var r = e.match(B) || [];
            t.push.apply(t, r), i.push((n += r.length + 1));
          }),
          (t.c = i),
          t
        );
      },
      ft = function (e, t, i) {
        var n,
          r,
          s,
          a,
          o = "",
          l = (e + o).match(mt),
          c = t ? "hsla(" : "rgba(",
          u = 0;
        if (!l) return e;
        if (
          ((l = l.map(function (e) {
            return (
              (e = ht(e, t, 1)) &&
              c +
                (t
                  ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3]
                  : e.join(",")) +
                ")"
            );
          })),
          i && ((s = pt(e)), (n = i.c).join(o) !== s.c.join(o)))
        )
          for (a = (r = e.replace(mt, "1").split(B)).length - 1; u < a; u++)
            o +=
              r[u] +
              (~n.indexOf(u)
                ? l.shift() || c + "0,0,0,0)"
                : (s.length ? s : l.length ? l : i).shift());
        if (!r)
          for (a = (r = e.split(mt)).length - 1; u < a; u++) o += r[u] + l[u];
        return o + r[a];
      },
      mt = (function () {
        var e,
          t =
            "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (e in ut) t += "|" + e + "\\b";
        return new RegExp(t + ")", "gi");
      })(),
      gt = /hsl[a]?\(/,
      vt = function (e) {
        var t,
          i = e.join(" ");
        if (((mt.lastIndex = 0), mt.test(i)))
          return (
            (t = gt.test(i)),
            (e[1] = ft(e[1], t)),
            (e[0] = ft(e[0], t, pt(e[1]))),
            !0
          );
      },
      yt = (function () {
        var e,
          t,
          i,
          n,
          r,
          s,
          u = Date.now,
          d = 500,
          p = 33,
          f = u(),
          m = f,
          g = 1e3 / 240,
          v = g,
          y = [],
          b = function i(a) {
            var o,
              l,
              c,
              h,
              b = u() - m,
              w = !0 === a;
            if (
              (b > d && (f += b - p),
              ((o = (c = (m += b) - f) - v) > 0 || w) &&
                ((h = ++n.frame),
                (r = c - 1e3 * n.time),
                (n.time = c /= 1e3),
                (v += o + (o >= g ? 4 : g - o)),
                (l = 1)),
              w || (e = t(i)),
              l)
            )
              for (s = 0; s < y.length; s++) y[s](c, r, h, a);
          };
        return (
          (n = {
            time: 0,
            frame: 0,
            tick: function () {
              b(!0);
            },
            deltaRatio: function (e) {
              return r / (1e3 / (e || 60));
            },
            wake: function () {
              c &&
                (!o &&
                  k() &&
                  ((a = o = window),
                  (l = a.document || {}),
                  (G.gsap = li),
                  (a.gsapVersions || (a.gsapVersions = [])).push(li.version),
                  j(H || a.GreenSockGlobals || (!a.gsap && a) || {}),
                  (i = a.requestAnimationFrame)),
                e && n.sleep(),
                (t =
                  i ||
                  function (e) {
                    return setTimeout(e, (v - 1e3 * n.time + 1) | 0);
                  }),
                (h = 1),
                b(2));
            },
            sleep: function () {
              (i ? a.cancelAnimationFrame : clearTimeout)(e), (h = 0), (t = Q);
            },
            lagSmoothing: function (e, t) {
              (d = e || 1e8), (p = Math.min(t, d, 0));
            },
            fps: function (e) {
              (g = 1e3 / (e || 240)), (v = 1e3 * n.time + g);
            },
            add: function (e, t, i) {
              var r = t
                ? function (t, i, s, a) {
                    e(t, i, s, a), n.remove(r);
                  }
                : e;
              return n.remove(e), y[i ? "unshift" : "push"](r), bt(), r;
            },
            remove: function (e, t) {
              ~(t = y.indexOf(e)) && y.splice(t, 1) && s >= t && s--;
            },
            _listeners: y,
          }),
          n
        );
      })(),
      bt = function () {
        return !h && yt.wake();
      },
      wt = {},
      _t = /^[\d.\-M][\d.\-,\s]/,
      xt = /["']/g,
      Tt = function (e) {
        for (
          var t,
            i,
            n,
            r = {},
            s = e.substr(1, e.length - 3).split(":"),
            a = s[0],
            o = 1,
            l = s.length;
          o < l;
          o++
        )
          (i = s[o]),
            (t = o !== l - 1 ? i.lastIndexOf(",") : i.length),
            (n = i.substr(0, t)),
            (r[a] = isNaN(n) ? n.replace(xt, "").trim() : +n),
            (a = i.substr(t + 1).trim());
        return r;
      },
      Et = function (e) {
        return function (t) {
          return 1 - e(1 - t);
        };
      },
      St = function e(t, i) {
        for (var n, r = t._first; r; )
          r instanceof kt
            ? e(r, i)
            : !r.vars.yoyoEase ||
              (r._yoyo && r._repeat) ||
              r._yoyo === i ||
              (r.timeline
                ? e(r.timeline, i)
                : ((n = r._ease),
                  (r._ease = r._yEase),
                  (r._yEase = n),
                  (r._yoyo = i))),
            (r = r._next);
      },
      Ct = function (e, t) {
        return (
          (e &&
            (O(e)
              ? e
              : wt[e] ||
                (function (e) {
                  var t = (e + "").split("("),
                    i = wt[t[0]];
                  return i && t.length > 1 && i.config
                    ? i.config.apply(
                        null,
                        ~e.indexOf("{")
                          ? [Tt(t[1])]
                          : (function (e) {
                              var t = e.indexOf("(") + 1,
                                i = e.indexOf(")"),
                                n = e.indexOf("(", t);
                              return e.substring(
                                t,
                                ~n && n < i ? e.indexOf(")", i + 1) : i
                              );
                            })(e)
                              .split(",")
                              .map(me)
                      )
                    : wt._CE && _t.test(e)
                    ? wt._CE("", e)
                    : i;
                })(e))) ||
          t
        );
      },
      Mt = function (e, t, i, n) {
        void 0 === i &&
          (i = function (e) {
            return 1 - t(1 - e);
          }),
          void 0 === n &&
            (n = function (e) {
              return e < 0.5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
            });
        var r,
          s = { easeIn: t, easeOut: i, easeInOut: n };
        return (
          le(e, function (e) {
            for (var t in ((wt[e] = G[e] = s),
            (wt[(r = e.toLowerCase())] = i),
            s))
              wt[
                r +
                  ("easeIn" === t ? ".in" : "easeOut" === t ? ".out" : ".inOut")
              ] = wt[e + "." + t] = s[t];
          }),
          s
        );
      },
      Ot = function (e) {
        return function (t) {
          return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
        };
      },
      Dt = function e(t, i, n) {
        var r = i >= 1 ? i : 1,
          s = (n || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1),
          a = (s / _) * (Math.asin(1 / r) || 0),
          o = function (e) {
            return 1 === e ? 1 : r * Math.pow(2, -10 * e) * C((e - a) * s) + 1;
          },
          l =
            "out" === t
              ? o
              : "in" === t
              ? function (e) {
                  return 1 - o(1 - e);
                }
              : Ot(o);
        return (
          (s = _ / s),
          (l.config = function (i, n) {
            return e(t, i, n);
          }),
          l
        );
      },
      At = function e(t, i) {
        void 0 === i && (i = 1.70158);
        var n = function (e) {
            return e ? --e * e * ((i + 1) * e + i) + 1 : 0;
          },
          r =
            "out" === t
              ? n
              : "in" === t
              ? function (e) {
                  return 1 - n(1 - e);
                }
              : Ot(n);
        return (
          (r.config = function (i) {
            return e(t, i);
          }),
          r
        );
      };
    le("Linear,Quad,Cubic,Quart,Quint,Strong", function (e, t) {
      var i = t < 5 ? t + 1 : t;
      Mt(
        e + ",Power" + (i - 1),
        t
          ? function (e) {
              return Math.pow(e, i);
            }
          : function (e) {
              return e;
            },
        function (e) {
          return 1 - Math.pow(1 - e, i);
        },
        function (e) {
          return e < 0.5
            ? Math.pow(2 * e, i) / 2
            : 1 - Math.pow(2 * (1 - e), i) / 2;
        }
      );
    }),
      (wt.Linear.easeNone = wt.none = wt.Linear.easeIn),
      Mt("Elastic", Dt("in"), Dt("out"), Dt()),
      (p = 7.5625),
      (m = 1 / (f = 2.75)),
      Mt(
        "Bounce",
        function (e) {
          return 1 - g(1 - e);
        },
        (g = function (e) {
          return e < m
            ? p * e * e
            : e < 0.7272727272727273
            ? p * Math.pow(e - 1.5 / f, 2) + 0.75
            : e < 0.9090909090909092
            ? p * (e -= 2.25 / f) * e + 0.9375
            : p * Math.pow(e - 2.625 / f, 2) + 0.984375;
        })
      ),
      Mt("Expo", function (e) {
        return e ? Math.pow(2, 10 * (e - 1)) : 0;
      }),
      Mt("Circ", function (e) {
        return -(E(1 - e * e) - 1);
      }),
      Mt("Sine", function (e) {
        return 1 === e ? 1 : 1 - S(e * x);
      }),
      Mt("Back", At("in"), At("out"), At()),
      (wt.SteppedEase =
        wt.steps =
        G.SteppedEase =
          {
            config: function (e, t) {
              void 0 === e && (e = 1);
              var i = 1 / e,
                n = e + (t ? 0 : 1),
                r = t ? 1 : 0;
              return function (e) {
                return (((n * He(0, 0.99999999, e)) | 0) + r) * i;
              };
            },
          }),
      (y.ease = wt["quad.out"]),
      le(
        "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
        function (e) {
          return (re += e + "," + e + "Params,");
        }
      );
    var Lt = function (e, t) {
        (this.id = T++),
          (e._gsap = this),
          (this.target = e),
          (this.harness = t),
          (this.get = t ? t.get : oe),
          (this.set = t ? t.getSetter : Wt);
      },
      Pt = (function () {
        function e(e) {
          (this.vars = e),
            (this._delay = +e.delay || 0),
            (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
              ((this._rDelay = e.repeatDelay || 0),
              (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
            (this._ts = 1),
            Be(this, +e.duration, 1, 1),
            (this.data = e.data),
            h || yt.wake();
        }
        var t = e.prototype;
        return (
          (t.delay = function (e) {
            return e || 0 === e
              ? (this.parent &&
                  this.parent.smoothChildTiming &&
                  this.startTime(this._start + e - this._delay),
                (this._delay = e),
                this)
              : this._delay;
          }),
          (t.duration = function (e) {
            return arguments.length
              ? this.totalDuration(
                  this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e
                )
              : this.totalDuration() && this._dur;
          }),
          (t.totalDuration = function (e) {
            return arguments.length
              ? ((this._dirty = 0),
                Be(
                  this,
                  this._repeat < 0
                    ? e
                    : (e - this._repeat * this._rDelay) / (this._repeat + 1)
                ))
              : this._tDur;
          }),
          (t.totalTime = function (e, t) {
            if ((bt(), !arguments.length)) return this._tTime;
            var i = this._dp;
            if (i && i.smoothChildTiming && this._ts) {
              for (
                Pe(this, e), !i._dp || i.parent || ke(i, this);
                i && i.parent;

              )
                i.parent._time !==
                  i._start +
                    (i._ts >= 0
                      ? i._tTime / i._ts
                      : (i.totalDuration() - i._tTime) / -i._ts) &&
                  i.totalTime(i._tTime, !0),
                  (i = i.parent);
              !this.parent &&
                this._dp.autoRemoveChildren &&
                ((this._ts > 0 && e < this._tDur) ||
                  (this._ts < 0 && e > 0) ||
                  (!this._tDur && !e)) &&
                $e(this._dp, this, this._start - this._delay);
            }
            return (
              (this._tTime !== e ||
                (!this._dur && !t) ||
                (this._initted && Math.abs(this._zTime) === w) ||
                (!e && !this._initted && (this.add || this._ptLookup))) &&
                (this._ts || (this._pTime = e), fe(this, e, t)),
              this
            );
          }),
          (t.time = function (e, t) {
            return arguments.length
              ? this.totalTime(
                  Math.min(this.totalDuration(), e + Oe(this)) %
                    (this._dur + this._rDelay) || (e ? this._dur : 0),
                  t
                )
              : this._time;
          }),
          (t.totalProgress = function (e, t) {
            return arguments.length
              ? this.totalTime(this.totalDuration() * e, t)
              : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.ratio;
          }),
          (t.progress = function (e, t) {
            return arguments.length
              ? this.totalTime(
                  this.duration() *
                    (!this._yoyo || 1 & this.iteration() ? e : 1 - e) +
                    Oe(this),
                  t
                )
              : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.ratio;
          }),
          (t.iteration = function (e, t) {
            var i = this.duration() + this._rDelay;
            return arguments.length
              ? this.totalTime(this._time + (e - 1) * i, t)
              : this._repeat
              ? De(this._tTime, i) + 1
              : 1;
          }),
          (t.timeScale = function (e) {
            if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
            if (this._rts === e) return this;
            var t =
              this.parent && this._ts
                ? Ae(this.parent._time, this)
                : this._tTime;
            return (
              (this._rts = +e || 0),
              (this._ts = this._ps || -1e-8 === e ? 0 : this._rts),
              this.totalTime(He(-this._delay, this._tDur, t), !0),
              Le(this),
              Ce(this)
            );
          }),
          (t.paused = function (e) {
            return arguments.length
              ? (this._ps !== e &&
                  ((this._ps = e),
                  e
                    ? ((this._pTime =
                        this._tTime || Math.max(-this._delay, this.rawTime())),
                      (this._ts = this._act = 0))
                    : (bt(),
                      (this._ts = this._rts),
                      this.totalTime(
                        this.parent && !this.parent.smoothChildTiming
                          ? this.rawTime()
                          : this._tTime || this._pTime,
                        1 === this.progress() &&
                          Math.abs(this._zTime) !== w &&
                          (this._tTime -= w)
                      ))),
                this)
              : this._ps;
          }),
          (t.startTime = function (e) {
            if (arguments.length) {
              this._start = e;
              var t = this.parent || this._dp;
              return (
                t && (t._sort || !this.parent) && $e(t, this, e - this._delay),
                this
              );
            }
            return this._start;
          }),
          (t.endTime = function (e) {
            return (
              this._start +
              (P(e) ? this.totalDuration() : this.duration()) /
                Math.abs(this._ts || 1)
            );
          }),
          (t.rawTime = function (e) {
            var t = this.parent || this._dp;
            return t
              ? e &&
                (!this._ts ||
                  (this._repeat && this._time && this.totalProgress() < 1))
                ? this._tTime % (this._dur + this._rDelay)
                : this._ts
                ? Ae(t.rawTime(e), this)
                : this._tTime
              : this._tTime;
          }),
          (t.globalTime = function (e) {
            for (var t = this, i = arguments.length ? e : t.rawTime(); t; )
              (i = t._start + i / (t._ts || 1)), (t = t._dp);
            return i;
          }),
          (t.repeat = function (e) {
            return arguments.length
              ? ((this._repeat = e === 1 / 0 ? -2 : e), Ne(this))
              : -2 === this._repeat
              ? 1 / 0
              : this._repeat;
          }),
          (t.repeatDelay = function (e) {
            if (arguments.length) {
              var t = this._time;
              return (this._rDelay = e), Ne(this), t ? this.time(t) : this;
            }
            return this._rDelay;
          }),
          (t.yoyo = function (e) {
            return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
          }),
          (t.seek = function (e, t) {
            return this.totalTime(Xe(this, e), P(t));
          }),
          (t.restart = function (e, t) {
            return this.play().totalTime(e ? -this._delay : 0, P(t));
          }),
          (t.play = function (e, t) {
            return null != e && this.seek(e, t), this.reversed(!1).paused(!1);
          }),
          (t.reverse = function (e, t) {
            return (
              null != e && this.seek(e || this.totalDuration(), t),
              this.reversed(!0).paused(!1)
            );
          }),
          (t.pause = function (e, t) {
            return null != e && this.seek(e, t), this.paused(!0);
          }),
          (t.resume = function () {
            return this.paused(!1);
          }),
          (t.reversed = function (e) {
            return arguments.length
              ? (!!e !== this.reversed() &&
                  this.timeScale(-this._rts || (e ? -1e-8 : 0)),
                this)
              : this._rts < 0;
          }),
          (t.invalidate = function () {
            return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
          }),
          (t.isActive = function () {
            var e,
              t = this.parent || this._dp,
              i = this._start;
            return !(
              t &&
              !(
                this._ts &&
                this._initted &&
                t.isActive() &&
                (e = t.rawTime(!0)) >= i &&
                e < this.endTime(!0) - w
              )
            );
          }),
          (t.eventCallback = function (e, t, i) {
            var n = this.vars;
            return arguments.length > 1
              ? (t
                  ? ((n[e] = t),
                    i && (n[e + "Params"] = i),
                    "onUpdate" === e && (this._onUpdate = t))
                  : delete n[e],
                this)
              : n[e];
          }),
          (t.then = function (e) {
            var t = this;
            return new Promise(function (i) {
              var n = O(e) ? e : ge,
                r = function () {
                  var e = t.then;
                  (t.then = null),
                    O(n) && (n = n(t)) && (n.then || n === t) && (t.then = e),
                    i(n),
                    (t.then = e);
                };
              (t._initted && 1 === t.totalProgress() && t._ts >= 0) ||
              (!t._tTime && t._ts < 0)
                ? r()
                : (t._prom = r);
            });
          }),
          (t.kill = function () {
            ot(this);
          }),
          e
        );
      })();
    ve(Pt.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1,
    });
    var kt = (function (i) {
      function n(t, n) {
        var r;
        return (
          void 0 === t && (t = {}),
          ((r = i.call(this, t) || this).labels = {}),
          (r.smoothChildTiming = !!t.smoothChildTiming),
          (r.autoRemoveChildren = !!t.autoRemoveChildren),
          (r._sort = P(t.sortChildren)),
          s && $e(t.parent || s, e(r), n),
          t.reversed && r.reverse(),
          t.paused && r.paused(!0),
          t.scrollTrigger && Re(e(r), t.scrollTrigger),
          r
        );
      }
      t(n, i);
      var r = n.prototype;
      return (
        (r.to = function (e, t, i) {
          return Ye(0, arguments, this), this;
        }),
        (r.from = function (e, t, i) {
          return Ye(1, arguments, this), this;
        }),
        (r.fromTo = function (e, t, i, n) {
          return Ye(2, arguments, this), this;
        }),
        (r.set = function (e, t, i) {
          return (
            (t.duration = 0),
            (t.parent = this),
            _e(t).repeatDelay || (t.repeat = 0),
            (t.immediateRender = !!t.immediateRender),
            new Gt(e, t, Xe(this, i), 1),
            this
          );
        }),
        (r.call = function (e, t, i) {
          return $e(this, Gt.delayedCall(0, e, t), i);
        }),
        (r.staggerTo = function (e, t, i, n, r, s, a) {
          return (
            (i.duration = t),
            (i.stagger = i.stagger || n),
            (i.onComplete = s),
            (i.onCompleteParams = a),
            (i.parent = this),
            new Gt(e, i, Xe(this, r)),
            this
          );
        }),
        (r.staggerFrom = function (e, t, i, n, r, s, a) {
          return (
            (i.runBackwards = 1),
            (_e(i).immediateRender = P(i.immediateRender)),
            this.staggerTo(e, t, i, n, r, s, a)
          );
        }),
        (r.staggerFromTo = function (e, t, i, n, r, s, a, o) {
          return (
            (n.startAt = i),
            (_e(n).immediateRender = P(n.immediateRender)),
            this.staggerTo(e, t, n, r, s, a, o)
          );
        }),
        (r.render = function (e, t, i) {
          var n,
            r,
            a,
            o,
            l,
            c,
            u,
            d,
            h,
            p,
            f,
            m,
            g = this._time,
            v = this._dirty ? this.totalDuration() : this._tDur,
            y = this._dur,
            b = e <= 0 ? 0 : ue(e),
            _ = this._zTime < 0 != e < 0 && (this._initted || !y);
          if (
            (this !== s && b > v && e >= 0 && (b = v),
            b !== this._tTime || i || _)
          ) {
            if (
              (g !== this._time &&
                y &&
                ((b += this._time - g), (e += this._time - g)),
              (n = b),
              (h = this._start),
              (c = !(d = this._ts)),
              _ && (y || (g = this._zTime), (e || !t) && (this._zTime = e)),
              this._repeat)
            ) {
              if (
                ((f = this._yoyo),
                (l = y + this._rDelay),
                this._repeat < -1 && e < 0)
              )
                return this.totalTime(100 * l + e, t, i);
              if (
                ((n = ue(b % l)),
                b === v
                  ? ((o = this._repeat), (n = y))
                  : ((o = ~~(b / l)) && o === b / l && ((n = y), o--),
                    n > y && (n = y)),
                (p = De(this._tTime, l)),
                !g && this._tTime && p !== o && (p = o),
                f && 1 & o && ((n = y - n), (m = 1)),
                o !== p && !this._lock)
              ) {
                var x = f && 1 & p,
                  T = x === (f && 1 & o);
                if (
                  (o < p && (x = !x),
                  (g = x ? 0 : y),
                  (this._lock = 1),
                  (this.render(g || (m ? 0 : ue(o * l)), t, !y)._lock = 0),
                  (this._tTime = b),
                  !t && this.parent && at(this, "onRepeat"),
                  this.vars.repeatRefresh &&
                    !m &&
                    (this.invalidate()._lock = 1),
                  (g && g !== this._time) ||
                    c !== !this._ts ||
                    (this.vars.onRepeat && !this.parent && !this._act))
                )
                  return this;
                if (
                  ((y = this._dur),
                  (v = this._tDur),
                  T &&
                    ((this._lock = 2),
                    (g = x ? y : -1e-4),
                    this.render(g, !0),
                    this.vars.repeatRefresh && !m && this.invalidate()),
                  (this._lock = 0),
                  !this._ts && !c)
                )
                  return this;
                St(this, m);
              }
            }
            if (
              (this._hasPause &&
                !this._forcing &&
                this._lock < 2 &&
                ((u = (function (e, t, i) {
                  var n;
                  if (i > t)
                    for (n = e._first; n && n._start <= i; ) {
                      if ("isPause" === n.data && n._start > t) return n;
                      n = n._next;
                    }
                  else
                    for (n = e._last; n && n._start >= i; ) {
                      if ("isPause" === n.data && n._start < t) return n;
                      n = n._prev;
                    }
                })(this, ue(g), ue(n))),
                u && (b -= n - (n = u._start))),
              (this._tTime = b),
              (this._time = n),
              (this._act = !d),
              this._initted ||
                ((this._onUpdate = this.vars.onUpdate),
                (this._initted = 1),
                (this._zTime = e),
                (g = 0)),
              !g && n && !t && (at(this, "onStart"), this._tTime !== b))
            )
              return this;
            if (n >= g && e >= 0)
              for (r = this._first; r; ) {
                if (
                  ((a = r._next), (r._act || n >= r._start) && r._ts && u !== r)
                ) {
                  if (r.parent !== this) return this.render(e, t, i);
                  if (
                    (r.render(
                      r._ts > 0
                        ? (n - r._start) * r._ts
                        : (r._dirty ? r.totalDuration() : r._tDur) +
                            (n - r._start) * r._ts,
                      t,
                      i
                    ),
                    n !== this._time || (!this._ts && !c))
                  ) {
                    (u = 0), a && (b += this._zTime = -1e-8);
                    break;
                  }
                }
                r = a;
              }
            else {
              r = this._last;
              for (var E = e < 0 ? e : n; r; ) {
                if (
                  ((a = r._prev), (r._act || E <= r._end) && r._ts && u !== r)
                ) {
                  if (r.parent !== this) return this.render(e, t, i);
                  if (
                    (r.render(
                      r._ts > 0
                        ? (E - r._start) * r._ts
                        : (r._dirty ? r.totalDuration() : r._tDur) +
                            (E - r._start) * r._ts,
                      t,
                      i
                    ),
                    n !== this._time || (!this._ts && !c))
                  ) {
                    (u = 0), a && (b += this._zTime = E ? -1e-8 : w);
                    break;
                  }
                }
                r = a;
              }
            }
            if (
              u &&
              !t &&
              (this.pause(),
              (u.render(n >= g ? 0 : -1e-8)._zTime = n >= g ? 1 : -1),
              this._ts)
            )
              return (this._start = h), Le(this), this.render(e, t, i);
            this._onUpdate && !t && at(this, "onUpdate", !0),
              ((b === v && this._tTime >= this.totalDuration()) || (!b && g)) &&
                ((h !== this._start && Math.abs(d) === Math.abs(this._ts)) ||
                  this._lock ||
                  ((e || !y) &&
                    ((b === v && this._ts > 0) || (!b && this._ts < 0)) &&
                    Ee(this, 1),
                  t ||
                    (e < 0 && !g) ||
                    (!b && !g && v) ||
                    (at(
                      this,
                      b === v && e >= 0 ? "onComplete" : "onReverseComplete",
                      !0
                    ),
                    this._prom &&
                      !(b < v && this.timeScale() > 0) &&
                      this._prom())));
          }
          return this;
        }),
        (r.add = function (e, t) {
          var i = this;
          if ((D(t) || (t = Xe(this, t, e)), !(e instanceof Pt))) {
            if (z(e))
              return (
                e.forEach(function (e) {
                  return i.add(e, t);
                }),
                this
              );
            if (M(e)) return this.addLabel(e, t);
            if (!O(e)) return this;
            e = Gt.delayedCall(0, e);
          }
          return this !== e ? $e(this, e, t) : this;
        }),
        (r.getChildren = function (e, t, i, n) {
          void 0 === e && (e = !0),
            void 0 === t && (t = !0),
            void 0 === i && (i = !0),
            void 0 === n && (n = -b);
          for (var r = [], s = this._first; s; )
            s._start >= n &&
              (s instanceof Gt
                ? t && r.push(s)
                : (i && r.push(s),
                  e && r.push.apply(r, s.getChildren(!0, t, i)))),
              (s = s._next);
          return r;
        }),
        (r.getById = function (e) {
          for (var t = this.getChildren(1, 1, 1), i = t.length; i--; )
            if (t[i].vars.id === e) return t[i];
        }),
        (r.remove = function (e) {
          return M(e)
            ? this.removeLabel(e)
            : O(e)
            ? this.killTweensOf(e)
            : (Te(this, e),
              e === this._recent && (this._recent = this._last),
              Se(this));
        }),
        (r.totalTime = function (e, t) {
          return arguments.length
            ? ((this._forcing = 1),
              !this._dp &&
                this._ts &&
                (this._start = ue(
                  yt.time -
                    (this._ts > 0
                      ? e / this._ts
                      : (this.totalDuration() - e) / -this._ts)
                )),
              i.prototype.totalTime.call(this, e, t),
              (this._forcing = 0),
              this)
            : this._tTime;
        }),
        (r.addLabel = function (e, t) {
          return (this.labels[e] = Xe(this, t)), this;
        }),
        (r.removeLabel = function (e) {
          return delete this.labels[e], this;
        }),
        (r.addPause = function (e, t, i) {
          var n = Gt.delayedCall(0, t || Q, i);
          return (
            (n.data = "isPause"), (this._hasPause = 1), $e(this, n, Xe(this, e))
          );
        }),
        (r.removePause = function (e) {
          var t = this._first;
          for (e = Xe(this, e); t; )
            t._start === e && "isPause" === t.data && Ee(t), (t = t._next);
        }),
        (r.killTweensOf = function (e, t, i) {
          for (var n = this.getTweensOf(e, i), r = n.length; r--; )
            $t !== n[r] && n[r].kill(e, t);
          return this;
        }),
        (r.getTweensOf = function (e, t) {
          for (var i, n = [], r = Qe(e), s = this._first, a = D(t); s; )
            s instanceof Gt
              ? he(s._targets, r) &&
                (a
                  ? (!$t || (s._initted && s._ts)) &&
                    s.globalTime(0) <= t &&
                    s.globalTime(s.totalDuration()) > t
                  : !t || s.isActive()) &&
                n.push(s)
              : (i = s.getTweensOf(r, t)).length && n.push.apply(n, i),
              (s = s._next);
          return n;
        }),
        (r.tweenTo = function (e, t) {
          t = t || {};
          var i,
            n = this,
            r = Xe(n, e),
            s = t,
            a = s.startAt,
            o = s.onStart,
            l = s.onStartParams,
            c = s.immediateRender,
            u = Gt.to(
              n,
              ve(
                {
                  ease: t.ease || "none",
                  lazy: !1,
                  immediateRender: !1,
                  time: r,
                  overwrite: "auto",
                  duration:
                    t.duration ||
                    Math.abs(
                      (r - (a && "time" in a ? a.time : n._time)) /
                        n.timeScale()
                    ) ||
                    w,
                  onStart: function () {
                    if ((n.pause(), !i)) {
                      var e =
                        t.duration ||
                        Math.abs(
                          (r - (a && "time" in a ? a.time : n._time)) /
                            n.timeScale()
                        );
                      u._dur !== e && Be(u, e, 0, 1).render(u._time, !0, !0),
                        (i = 1);
                    }
                    o && o.apply(u, l || []);
                  },
                },
                t
              )
            );
          return c ? u.render(0) : u;
        }),
        (r.tweenFromTo = function (e, t, i) {
          return this.tweenTo(t, ve({ startAt: { time: Xe(this, e) } }, i));
        }),
        (r.recent = function () {
          return this._recent;
        }),
        (r.nextLabel = function (e) {
          return void 0 === e && (e = this._time), st(this, Xe(this, e));
        }),
        (r.previousLabel = function (e) {
          return void 0 === e && (e = this._time), st(this, Xe(this, e), 1);
        }),
        (r.currentLabel = function (e) {
          return arguments.length
            ? this.seek(e, !0)
            : this.previousLabel(this._time + w);
        }),
        (r.shiftChildren = function (e, t, i) {
          void 0 === i && (i = 0);
          for (var n, r = this._first, s = this.labels; r; )
            r._start >= i && ((r._start += e), (r._end += e)), (r = r._next);
          if (t) for (n in s) s[n] >= i && (s[n] += e);
          return Se(this);
        }),
        (r.invalidate = function () {
          var e = this._first;
          for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
          return i.prototype.invalidate.call(this);
        }),
        (r.clear = function (e) {
          void 0 === e && (e = !0);
          for (var t, i = this._first; i; )
            (t = i._next), this.remove(i), (i = t);
          return (
            this._dp && (this._time = this._tTime = this._pTime = 0),
            e && (this.labels = {}),
            Se(this)
          );
        }),
        (r.totalDuration = function (e) {
          var t,
            i,
            n,
            r = 0,
            a = this,
            o = a._last,
            l = b;
          if (arguments.length)
            return a.timeScale(
              (a._repeat < 0 ? a.duration() : a.totalDuration()) /
                (a.reversed() ? -e : e)
            );
          if (a._dirty) {
            for (n = a.parent; o; )
              (t = o._prev),
                o._dirty && o.totalDuration(),
                (i = o._start) > l && a._sort && o._ts && !a._lock
                  ? ((a._lock = 1), ($e(a, o, i - o._delay, 1)._lock = 0))
                  : (l = i),
                i < 0 &&
                  o._ts &&
                  ((r -= i),
                  ((!n && !a._dp) || (n && n.smoothChildTiming)) &&
                    ((a._start += i / a._ts), (a._time -= i), (a._tTime -= i)),
                  a.shiftChildren(-i, !1, -Infinity),
                  (l = 0)),
                o._end > r && o._ts && (r = o._end),
                (o = t);
            Be(a, a === s && a._time > r ? a._time : r, 1, 1), (a._dirty = 0);
          }
          return a._tDur;
        }),
        (n.updateRoot = function (e) {
          if ((s._ts && (fe(s, Ae(e, s)), (u = yt.frame)), yt.frame >= ie)) {
            ie += v.autoSleep || 120;
            var t = s._first;
            if ((!t || !t._ts) && v.autoSleep && yt._listeners.length < 2) {
              for (; t && !t._ts; ) t = t._next;
              t || yt.sleep();
            }
          }
        }),
        n
      );
    })(Pt);
    ve(kt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
    var $t,
      Rt,
      zt = function (e, t, i, n, r, s, a) {
        var o,
          l,
          c,
          u,
          d,
          h,
          p,
          f,
          m = new ri(this._pt, e, t, 0, 1, Zt, null, r),
          g = 0,
          v = 0;
        for (
          m.b = i,
            m.e = n,
            i += "",
            (p = ~(n += "").indexOf("random(")) && (n = nt(n)),
            s && (s((f = [i, n]), e, t), (i = f[0]), (n = f[1])),
            l = i.match(N) || [];
          (o = N.exec(n));

        )
          (u = o[0]),
            (d = n.substring(g, o.index)),
            c ? (c = (c + 1) % 5) : "rgba(" === d.substr(-5) && (c = 1),
            u !== l[v++] &&
              ((h = parseFloat(l[v - 1]) || 0),
              (m._pt = {
                _next: m._pt,
                p: d || 1 === v ? d : ",",
                s: h,
                c: "=" === u.charAt(1) ? de(h, u) - h : parseFloat(u) - h,
                m: c && c < 4 ? Math.round : 0,
              }),
              (g = N.lastIndex));
        return (
          (m.c = g < n.length ? n.substring(g, n.length) : ""),
          (m.fp = a),
          (q.test(n) || p) && (m.e = 0),
          (this._pt = m),
          m
        );
      },
      It = function (e, t, i, n, r, s, a, o, l) {
        O(n) && (n = n(r || 0, e, s));
        var c,
          u = e[t],
          d =
            "get" !== i
              ? i
              : O(u)
              ? l
                ? e[
                    t.indexOf("set") || !O(e["get" + t.substr(3)])
                      ? t
                      : "get" + t.substr(3)
                  ](l)
                : e[t]()
              : u,
          h = O(u) ? (l ? Vt : jt) : Ht;
        if (
          (M(n) &&
            (~n.indexOf("random(") && (n = nt(n)),
            "=" === n.charAt(1) &&
              ((c = de(d, n) + (je(d) || 0)) || 0 === c) &&
              (n = c)),
          d !== n || Rt)
        )
          return isNaN(d * n) || "" === n
            ? (!u && !(t in e) && V(t, n),
              zt.call(this, e, t, d, n, h, o || v.stringFilter, l))
            : ((c = new ri(
                this._pt,
                e,
                t,
                +d || 0,
                n - (d || 0),
                "boolean" == typeof u ? Kt : Qt,
                0,
                h
              )),
              l && (c.fp = l),
              a && c.modifier(a, this, e),
              (this._pt = c));
      },
      Ft = function (e, t, i, n, r, s) {
        var a, o, l, c;
        if (
          ee[e] &&
          !1 !==
            (a = new ee[e]()).init(
              r,
              a.rawVars
                ? t[e]
                : (function (e, t, i, n, r) {
                    if (
                      (O(e) && (e = qt(e, r, t, i, n)),
                      !L(e) || (e.style && e.nodeType) || z(e) || R(e))
                    )
                      return M(e) ? qt(e, r, t, i, n) : e;
                    var s,
                      a = {};
                    for (s in e) a[s] = qt(e[s], r, t, i, n);
                    return a;
                  })(t[e], n, r, s, i),
              i,
              n,
              s
            ) &&
          ((i._pt = o = new ri(i._pt, r, e, 0, 1, a.render, a, 0, a.priority)),
          i !== d)
        )
          for (
            l = i._ptLookup[i._targets.indexOf(r)], c = a._props.length;
            c--;

          )
            l[a._props[c]] = o;
        return a;
      },
      Bt = function e(t, i) {
        var n,
          a,
          o,
          l,
          c,
          u,
          d,
          h,
          p,
          f,
          m,
          g,
          v,
          _ = t.vars,
          x = _.ease,
          T = _.startAt,
          E = _.immediateRender,
          S = _.lazy,
          C = _.onUpdate,
          M = _.onUpdateParams,
          O = _.callbackScope,
          D = _.runBackwards,
          A = _.yoyoEase,
          L = _.keyframes,
          k = _.autoRevert,
          $ = t._dur,
          R = t._startAt,
          z = t._targets,
          I = t.parent,
          F = I && "nested" === I.data ? I.parent._targets : z,
          B = "auto" === t._overwrite && !r,
          N = t.timeline;
        if (
          (N && (!L || !x) && (x = "none"),
          (t._ease = Ct(x, y.ease)),
          (t._yEase = A ? Et(Ct(!0 === A ? x : A, y.ease)) : 0),
          A &&
            t._yoyo &&
            !t._repeat &&
            ((A = t._yEase), (t._yEase = t._ease), (t._ease = A)),
          (t._from = !N && !!_.runBackwards),
          !N || (L && !_.stagger))
        ) {
          if (
            ((g = (h = z[0] ? ae(z[0]).harness : 0) && _[h.prop]),
            (n = we(_, K)),
            R && (Ee(R.render(-1, !0)), (R._lazy = 0)),
            T)
          )
            if (
              (Ee(
                (t._startAt = Gt.set(
                  z,
                  ve(
                    {
                      data: "isStart",
                      overwrite: !1,
                      parent: I,
                      immediateRender: !0,
                      lazy: P(S),
                      startAt: null,
                      delay: 0,
                      onUpdate: C,
                      onUpdateParams: M,
                      callbackScope: O,
                      stagger: 0,
                    },
                    T
                  )
                ))
              ),
              i < 0 && !E && !k && t._startAt.render(-1, !0),
              E)
            ) {
              if ((i > 0 && !k && (t._startAt = 0), $ && i <= 0))
                return void (i && (t._zTime = i));
            } else !1 === k && (t._startAt = 0);
          else if (D && $)
            if (R) !k && (t._startAt = 0);
            else if (
              (i && (E = !1),
              (o = ve(
                {
                  overwrite: !1,
                  data: "isFromStart",
                  lazy: E && P(S),
                  immediateRender: E,
                  stagger: 0,
                  parent: I,
                },
                n
              )),
              g && (o[h.prop] = g),
              Ee((t._startAt = Gt.set(z, o))),
              i < 0 && t._startAt.render(-1, !0),
              (t._zTime = i),
              E)
            ) {
              if (!i) return;
            } else e(t._startAt, w);
          for (
            t._pt = t._ptCache = 0, S = ($ && P(S)) || (S && !$), a = 0;
            a < z.length;
            a++
          ) {
            if (
              ((d = (c = z[a])._gsap || se(z)[a]._gsap),
              (t._ptLookup[a] = f = {}),
              J[d.id] && Z.length && pe(),
              (m = F === z ? a : F.indexOf(c)),
              h &&
                !1 !== (p = new h()).init(c, g || n, t, m, F) &&
                ((t._pt = l =
                  new ri(t._pt, c, p.name, 0, 1, p.render, p, 0, p.priority)),
                p._props.forEach(function (e) {
                  f[e] = l;
                }),
                p.priority && (u = 1)),
              !h || g)
            )
              for (o in n)
                ee[o] && (p = Ft(o, n, t, m, c, F))
                  ? p.priority && (u = 1)
                  : (f[o] = l =
                      It.call(t, c, o, "get", n[o], m, F, 0, _.stringFilter));
            t._op && t._op[a] && t.kill(c, t._op[a]),
              B &&
                t._pt &&
                (($t = t),
                s.killTweensOf(c, f, t.globalTime(i)),
                (v = !t.parent),
                ($t = 0)),
              t._pt && S && (J[d.id] = 1);
          }
          u && ni(t), t._onInit && t._onInit(t);
        }
        (t._onUpdate = C),
          (t._initted = (!t._op || t._pt) && !v),
          L && i <= 0 && N.render(b, !0, !0);
      },
      Nt = function (e, t, i, n) {
        var r,
          s,
          a = t.ease || n || "power1.inOut";
        if (z(t))
          (s = i[e] || (i[e] = [])),
            t.forEach(function (e, i) {
              return s.push({ t: (i / (t.length - 1)) * 100, v: e, e: a });
            });
        else
          for (r in t)
            (s = i[r] || (i[r] = [])),
              "ease" === r || s.push({ t: parseFloat(e), v: t[r], e: a });
      },
      qt = function (e, t, i, n, r) {
        return O(e)
          ? e.call(t, i, n, r)
          : M(e) && ~e.indexOf("random(")
          ? nt(e)
          : e;
      },
      Xt = re + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
      Yt = {};
    le(Xt + ",id,stagger,delay,duration,paused,scrollTrigger", function (e) {
      return (Yt[e] = 1);
    });
    var Gt = (function (i) {
      function n(t, n, a, o) {
        var l;
        "number" == typeof n && ((a.duration = n), (n = a), (a = null));
        var c,
          u,
          d,
          h,
          p,
          f,
          m,
          g,
          y = (l = i.call(this, o ? n : _e(n)) || this).vars,
          b = y.duration,
          w = y.delay,
          _ = y.immediateRender,
          x = y.stagger,
          T = y.overwrite,
          E = y.keyframes,
          S = y.defaults,
          C = y.scrollTrigger,
          M = y.yoyoEase,
          O = n.parent || s,
          A = (z(t) || R(t) ? D(t[0]) : "length" in n) ? [t] : Qe(t);
        if (
          ((l._targets = A.length
            ? se(A)
            : U(
                "GSAP target " + t + " not found. https://greensock.com",
                !v.nullTargetWarn
              ) || []),
          (l._ptLookup = []),
          (l._overwrite = T),
          E || x || $(b) || $(w))
        ) {
          if (
            ((n = l.vars),
            (c = l.timeline =
              new kt({ data: "nested", defaults: S || {} })).kill(),
            (c.parent = c._dp = e(l)),
            (c._start = 0),
            x || $(b) || $(w))
          ) {
            if (((h = A.length), (m = x && Ze(x)), L(x)))
              for (p in x) ~Xt.indexOf(p) && (g || (g = {}), (g[p] = x[p]));
            for (u = 0; u < h; u++)
              ((d = we(n, Yt)).stagger = 0),
                M && (d.yoyoEase = M),
                g && ye(d, g),
                (f = A[u]),
                (d.duration = +qt(b, e(l), u, f, A)),
                (d.delay = (+qt(w, e(l), u, f, A) || 0) - l._delay),
                !x &&
                  1 === h &&
                  d.delay &&
                  ((l._delay = w = d.delay), (l._start += w), (d.delay = 0)),
                c.to(f, d, m ? m(u, f, A) : 0),
                (c._ease = wt.none);
            c.duration() ? (b = w = 0) : (l.timeline = 0);
          } else if (E) {
            _e(ve(c.vars.defaults, { ease: "none" })),
              (c._ease = Ct(E.ease || n.ease || "none"));
            var k,
              I,
              F,
              B = 0;
            if (z(E))
              E.forEach(function (e) {
                return c.to(A, e, ">");
              });
            else {
              for (p in ((d = {}), E))
                "ease" === p || "easeEach" === p || Nt(p, E[p], d, E.easeEach);
              for (p in d)
                for (
                  k = d[p].sort(function (e, t) {
                    return e.t - t.t;
                  }),
                    B = 0,
                    u = 0;
                  u < k.length;
                  u++
                )
                  ((F = {
                    ease: (I = k[u]).e,
                    duration: ((I.t - (u ? k[u - 1].t : 0)) / 100) * b,
                  })[p] = I.v),
                    c.to(A, F, B),
                    (B += F.duration);
              c.duration() < b && c.to({}, { duration: b - c.duration() });
            }
          }
          b || l.duration((b = c.duration()));
        } else l.timeline = 0;
        return (
          !0 !== T || r || (($t = e(l)), s.killTweensOf(A), ($t = 0)),
          $e(O, e(l), a),
          n.reversed && l.reverse(),
          n.paused && l.paused(!0),
          (_ ||
            (!b &&
              !E &&
              l._start === ue(O._time) &&
              P(_) &&
              Me(e(l)) &&
              "nested" !== O.data)) &&
            ((l._tTime = -1e-8), l.render(Math.max(0, -w))),
          C && Re(e(l), C),
          l
        );
      }
      t(n, i);
      var a = n.prototype;
      return (
        (a.render = function (e, t, i) {
          var n,
            r,
            s,
            a,
            o,
            l,
            c,
            u,
            d,
            h = this._time,
            p = this._tDur,
            f = this._dur,
            m = e > p - w && e >= 0 ? p : e < w ? 0 : e;
          if (f) {
            if (
              m !== this._tTime ||
              !e ||
              i ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 != e < 0)
            ) {
              if (((n = m), (u = this.timeline), this._repeat)) {
                if (((a = f + this._rDelay), this._repeat < -1 && e < 0))
                  return this.totalTime(100 * a + e, t, i);
                if (
                  ((n = ue(m % a)),
                  m === p
                    ? ((s = this._repeat), (n = f))
                    : ((s = ~~(m / a)) && s === m / a && ((n = f), s--),
                      n > f && (n = f)),
                  (l = this._yoyo && 1 & s) && ((d = this._yEase), (n = f - n)),
                  (o = De(this._tTime, a)),
                  n === h && !i && this._initted)
                )
                  return (this._tTime = m), this;
                s !== o &&
                  (u && this._yEase && St(u, l),
                  !this.vars.repeatRefresh ||
                    l ||
                    this._lock ||
                    ((this._lock = i = 1),
                    (this.render(ue(a * s), !0).invalidate()._lock = 0)));
              }
              if (!this._initted) {
                if (ze(this, e < 0 ? e : n, i, t))
                  return (this._tTime = 0), this;
                if (h !== this._time) return this;
                if (f !== this._dur) return this.render(e, t, i);
              }
              if (
                ((this._tTime = m),
                (this._time = n),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = c = (d || this._ease)(n / f)),
                this._from && (this.ratio = c = 1 - c),
                n && !h && !t && (at(this, "onStart"), this._tTime !== m))
              )
                return this;
              for (r = this._pt; r; ) r.r(c, r.d), (r = r._next);
              (u &&
                u.render(
                  e < 0 ? e : !n && l ? -1e-8 : u._dur * u._ease(n / this._dur),
                  t,
                  i
                )) ||
                (this._startAt && (this._zTime = e)),
                this._onUpdate &&
                  !t &&
                  (e < 0 && this._startAt && this._startAt.render(e, !0, i),
                  at(this, "onUpdate")),
                this._repeat &&
                  s !== o &&
                  this.vars.onRepeat &&
                  !t &&
                  this.parent &&
                  at(this, "onRepeat"),
                (m !== this._tDur && m) ||
                  this._tTime !== m ||
                  (e < 0 &&
                    this._startAt &&
                    !this._onUpdate &&
                    this._startAt.render(e, !0, !0),
                  (e || !f) &&
                    ((m === this._tDur && this._ts > 0) ||
                      (!m && this._ts < 0)) &&
                    Ee(this, 1),
                  t ||
                    (e < 0 && !h) ||
                    (!m && !h) ||
                    (at(this, m === p ? "onComplete" : "onReverseComplete", !0),
                    this._prom &&
                      !(m < p && this.timeScale() > 0) &&
                      this._prom()));
            }
          } else
            !(function (e, t, i, n) {
              var r,
                s,
                a,
                o = e.ratio,
                l =
                  t < 0 ||
                  (!t &&
                    ((!e._start && Ie(e) && (e._initted || !Fe(e))) ||
                      ((e._ts < 0 || e._dp._ts < 0) && !Fe(e))))
                    ? 0
                    : 1,
                c = e._rDelay,
                u = 0;
              if (
                (c &&
                  e._repeat &&
                  ((u = He(0, e._tDur, t)),
                  (s = De(u, c)),
                  e._yoyo && 1 & s && (l = 1 - l),
                  s !== De(e._tTime, c) &&
                    ((o = 1 - l),
                    e.vars.repeatRefresh && e._initted && e.invalidate())),
                l !== o || n || e._zTime === w || (!t && e._zTime))
              ) {
                if (!e._initted && ze(e, t, n, i)) return;
                for (
                  a = e._zTime,
                    e._zTime = t || (i ? w : 0),
                    i || (i = t && !a),
                    e.ratio = l,
                    e._from && (l = 1 - l),
                    e._time = 0,
                    e._tTime = u,
                    r = e._pt;
                  r;

                )
                  r.r(l, r.d), (r = r._next);
                e._startAt && t < 0 && e._startAt.render(t, !0, !0),
                  e._onUpdate && !i && at(e, "onUpdate"),
                  u && e._repeat && !i && e.parent && at(e, "onRepeat"),
                  (t >= e._tDur || t < 0) &&
                    e.ratio === l &&
                    (l && Ee(e, 1),
                    i ||
                      (at(e, l ? "onComplete" : "onReverseComplete", !0),
                      e._prom && e._prom()));
              } else e._zTime || (e._zTime = t);
            })(this, e, t, i);
          return this;
        }),
        (a.targets = function () {
          return this._targets;
        }),
        (a.invalidate = function () {
          return (
            (this._pt =
              this._op =
              this._startAt =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(),
            i.prototype.invalidate.call(this)
          );
        }),
        (a.resetTo = function (e, t, i, n) {
          h || yt.wake(), this._ts || this.play();
          var r = Math.min(
            this._dur,
            (this._dp._time - this._start) * this._ts
          );
          return (
            this._initted || Bt(this, r),
            (function (e, t, i, n, r, s, a) {
              var o,
                l,
                c,
                u = ((e._pt && e._ptCache) || (e._ptCache = {}))[t];
              if (!u)
                for (
                  u = e._ptCache[t] = [],
                    l = e._ptLookup,
                    c = e._targets.length;
                  c--;

                ) {
                  if ((o = l[c][t]) && o.d && o.d._pt)
                    for (o = o.d._pt; o && o.p !== t; ) o = o._next;
                  if (!o)
                    return (Rt = 1), (e.vars[t] = "+=0"), Bt(e, a), (Rt = 0), 1;
                  u.push(o);
                }
              for (c = u.length; c--; )
                ((o = u[c]).s =
                  (!n && 0 !== n) || r ? o.s + (n || 0) + s * o.c : n),
                  (o.c = i - o.s),
                  o.e && (o.e = ce(i) + je(o.e)),
                  o.b && (o.b = o.s + je(o.b));
            })(this, e, t, i, n, this._ease(r / this._dur), r)
              ? this.resetTo(e, t, i, n)
              : (Pe(this, 0),
                this.parent ||
                  xe(
                    this._dp,
                    this,
                    "_first",
                    "_last",
                    this._dp._sort ? "_start" : 0
                  ),
                this.render(0))
          );
        }),
        (a.kill = function (e, t) {
          if ((void 0 === t && (t = "all"), !(e || (t && "all" !== t))))
            return (this._lazy = this._pt = 0), this.parent ? ot(this) : this;
          if (this.timeline) {
            var i = this.timeline.totalDuration();
            return (
              this.timeline.killTweensOf(e, t, $t && !0 !== $t.vars.overwrite)
                ._first || ot(this),
              this.parent &&
                i !== this.timeline.totalDuration() &&
                Be(this, (this._dur * this.timeline._tDur) / i, 0, 1),
              this
            );
          }
          var n,
            r,
            s,
            a,
            o,
            l,
            c,
            u = this._targets,
            d = e ? Qe(e) : u,
            h = this._ptLookup,
            p = this._pt;
          if (
            (!t || "all" === t) &&
            (function (e, t) {
              for (
                var i = e.length, n = i === t.length;
                n && i-- && e[i] === t[i];

              );
              return i < 0;
            })(u, d)
          )
            return "all" === t && (this._pt = 0), ot(this);
          for (
            n = this._op = this._op || [],
              "all" !== t &&
                (M(t) &&
                  ((o = {}),
                  le(t, function (e) {
                    return (o[e] = 1);
                  }),
                  (t = o)),
                (t = (function (e, t) {
                  var i,
                    n,
                    r,
                    s,
                    a = e[0] ? ae(e[0]).harness : 0,
                    o = a && a.aliases;
                  if (!o) return t;
                  for (n in ((i = ye({}, t)), o))
                    if ((n in i))
                      for (r = (s = o[n].split(",")).length; r--; )
                        i[s[r]] = i[n];
                  return i;
                })(u, t))),
              c = u.length;
            c--;

          )
            if (~d.indexOf(u[c]))
              for (o in ((r = h[c]),
              "all" === t
                ? ((n[c] = t), (a = r), (s = {}))
                : ((s = n[c] = n[c] || {}), (a = t)),
              a))
                (l = r && r[o]) &&
                  (("kill" in l.d && !0 !== l.d.kill(o)) || Te(this, l, "_pt"),
                  delete r[o]),
                  "all" !== s && (s[o] = 1);
          return this._initted && !this._pt && p && ot(this), this;
        }),
        (n.to = function (e, t) {
          return new n(e, t, arguments[2]);
        }),
        (n.from = function (e, t) {
          return Ye(1, arguments);
        }),
        (n.delayedCall = function (e, t, i, r) {
          return new n(t, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: e,
            onComplete: t,
            onReverseComplete: t,
            onCompleteParams: i,
            onReverseCompleteParams: i,
            callbackScope: r,
          });
        }),
        (n.fromTo = function (e, t, i) {
          return Ye(2, arguments);
        }),
        (n.set = function (e, t) {
          return (t.duration = 0), t.repeatDelay || (t.repeat = 0), new n(e, t);
        }),
        (n.killTweensOf = function (e, t, i) {
          return s.killTweensOf(e, t, i);
        }),
        n
      );
    })(Pt);
    ve(Gt.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0,
    }),
      le("staggerTo,staggerFrom,staggerFromTo", function (e) {
        Gt[e] = function () {
          var t = new kt(),
            i = Ve.call(arguments, 0);
          return (
            i.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, i)
          );
        };
      });
    var Ht = function (e, t, i) {
        return (e[t] = i);
      },
      jt = function (e, t, i) {
        return e[t](i);
      },
      Vt = function (e, t, i, n) {
        return e[t](n.fp, i);
      },
      Ut = function (e, t, i) {
        return e.setAttribute(t, i);
      },
      Wt = function (e, t) {
        return O(e[t]) ? jt : A(e[t]) && e.setAttribute ? Ut : Ht;
      },
      Qt = function (e, t) {
        return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
      },
      Kt = function (e, t) {
        return t.set(t.t, t.p, !!(t.s + t.c * e), t);
      },
      Zt = function (e, t) {
        var i = t._pt,
          n = "";
        if (!e && t.b) n = t.b;
        else if (1 === e && t.e) n = t.e;
        else {
          for (; i; )
            (n =
              i.p +
              (i.m
                ? i.m(i.s + i.c * e)
                : Math.round(1e4 * (i.s + i.c * e)) / 1e4) +
              n),
              (i = i._next);
          n += t.c;
        }
        t.set(t.t, t.p, n, t);
      },
      Jt = function (e, t) {
        for (var i = t._pt; i; ) i.r(e, i.d), (i = i._next);
      },
      ei = function (e, t, i, n) {
        for (var r, s = this._pt; s; )
          (r = s._next), s.p === n && s.modifier(e, t, i), (s = r);
      },
      ti = function (e) {
        for (var t, i, n = this._pt; n; )
          (i = n._next),
            (n.p === e && !n.op) || n.op === e
              ? Te(this, n, "_pt")
              : n.dep || (t = 1),
            (n = i);
        return !t;
      },
      ii = function (e, t, i, n) {
        n.mSet(e, t, n.m.call(n.tween, i, n.mt), n);
      },
      ni = function (e) {
        for (var t, i, n, r, s = e._pt; s; ) {
          for (t = s._next, i = n; i && i.pr > s.pr; ) i = i._next;
          (s._prev = i ? i._prev : r) ? (s._prev._next = s) : (n = s),
            (s._next = i) ? (i._prev = s) : (r = s),
            (s = t);
        }
        e._pt = n;
      },
      ri = (function () {
        function e(e, t, i, n, r, s, a, o, l) {
          (this.t = t),
            (this.s = n),
            (this.c = r),
            (this.p = i),
            (this.r = s || Qt),
            (this.d = a || this),
            (this.set = o || Ht),
            (this.pr = l || 0),
            (this._next = e),
            e && (e._prev = this);
        }
        return (
          (e.prototype.modifier = function (e, t, i) {
            (this.mSet = this.mSet || this.set),
              (this.set = ii),
              (this.m = e),
              (this.mt = i),
              (this.tween = t);
          }),
          e
        );
      })();
    le(
      re +
        "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
      function (e) {
        return (K[e] = 1);
      }
    ),
      (G.TweenMax = G.TweenLite = Gt),
      (G.TimelineLite = G.TimelineMax = kt),
      (s = new kt({
        sortChildren: !1,
        defaults: y,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0,
      })),
      (v.stringFilter = vt);
    var si = {
      registerPlugin: function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
          t[i] = arguments[i];
        t.forEach(function (e) {
          return lt(e);
        });
      },
      timeline: function (e) {
        return new kt(e);
      },
      getTweensOf: function (e, t) {
        return s.getTweensOf(e, t);
      },
      getProperty: function (e, t, i, n) {
        M(e) && (e = Qe(e)[0]);
        var r = ae(e || {}).get,
          s = i ? ge : me;
        return (
          "native" === i && (i = ""),
          e
            ? t
              ? s(((ee[t] && ee[t].get) || r)(e, t, i, n))
              : function (t, i, n) {
                  return s(((ee[t] && ee[t].get) || r)(e, t, i, n));
                }
            : e
        );
      },
      quickSetter: function (e, t, i) {
        if ((e = Qe(e)).length > 1) {
          var n = e.map(function (e) {
              return li.quickSetter(e, t, i);
            }),
            r = n.length;
          return function (e) {
            for (var t = r; t--; ) n[t](e);
          };
        }
        e = e[0] || {};
        var s = ee[t],
          a = ae(e),
          o = (a.harness && (a.harness.aliases || {})[t]) || t,
          l = s
            ? function (t) {
                var n = new s();
                (d._pt = 0),
                  n.init(e, i ? t + i : t, d, 0, [e]),
                  n.render(1, n),
                  d._pt && Jt(1, d);
              }
            : a.set(e, o);
        return s
          ? l
          : function (t) {
              return l(e, o, i ? t + i : t, a, 1);
            };
      },
      quickTo: function (e, t, i) {
        var n,
          r = li.to(
            e,
            ye((((n = {})[t] = "+=0.1"), (n.paused = !0), n), i || {})
          ),
          s = function (e, i, n) {
            return r.resetTo(t, e, i, n);
          };
        return (s.tween = r), s;
      },
      isTweening: function (e) {
        return s.getTweensOf(e, !0).length > 0;
      },
      defaults: function (e) {
        return e && e.ease && (e.ease = Ct(e.ease, y.ease)), be(y, e || {});
      },
      config: function (e) {
        return be(v, e || {});
      },
      registerEffect: function (e) {
        var t = e.name,
          i = e.effect,
          n = e.plugins,
          r = e.defaults,
          s = e.extendTimeline;
        (n || "").split(",").forEach(function (e) {
          return (
            e && !ee[e] && !G[e] && U(t + " effect requires " + e + " plugin.")
          );
        }),
          (te[t] = function (e, t, n) {
            return i(Qe(e), ve(t || {}, r), n);
          }),
          s &&
            (kt.prototype[t] = function (e, i, n) {
              return this.add(te[t](e, L(i) ? i : (n = i) && {}, this), n);
            });
      },
      registerEase: function (e, t) {
        wt[e] = Ct(t);
      },
      parseEase: function (e, t) {
        return arguments.length ? Ct(e, t) : wt;
      },
      getById: function (e) {
        return s.getById(e);
      },
      exportRoot: function (e, t) {
        void 0 === e && (e = {});
        var i,
          n,
          r = new kt(e);
        for (
          r.smoothChildTiming = P(e.smoothChildTiming),
            s.remove(r),
            r._dp = 0,
            r._time = r._tTime = s._time,
            i = s._first;
          i;

        )
          (n = i._next),
            (!t &&
              !i._dur &&
              i instanceof Gt &&
              i.vars.onComplete === i._targets[0]) ||
              $e(r, i, i._start - i._delay),
            (i = n);
        return $e(s, r, 0), r;
      },
      utils: {
        wrap: function e(t, i, n) {
          var r = i - t;
          return z(t)
            ? it(t, e(0, t.length), i)
            : Ge(n, function (e) {
                return ((r + ((e - t) % r)) % r) + t;
              });
        },
        wrapYoyo: function e(t, i, n) {
          var r = i - t,
            s = 2 * r;
          return z(t)
            ? it(t, e(0, t.length - 1), i)
            : Ge(n, function (e) {
                return t + ((e = (s + ((e - t) % s)) % s || 0) > r ? s - e : e);
              });
        },
        distribute: Ze,
        random: tt,
        snap: et,
        normalize: function (e, t, i) {
          return rt(e, t, 0, 1, i);
        },
        getUnit: je,
        clamp: function (e, t, i) {
          return Ge(i, function (i) {
            return He(e, t, i);
          });
        },
        splitColor: ht,
        toArray: Qe,
        selector: function (e) {
          return (
            (e = Qe(e)[0] || U("Invalid scope") || {}),
            function (t) {
              var i = e.current || e.nativeElement || e;
              return Qe(
                t,
                i.querySelectorAll
                  ? i
                  : i === e
                  ? U("Invalid scope") || l.createElement("div")
                  : e
              );
            }
          );
        },
        mapRange: rt,
        pipe: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          return function (e) {
            return t.reduce(function (e, t) {
              return t(e);
            }, e);
          };
        },
        unitize: function (e, t) {
          return function (i) {
            return e(parseFloat(i)) + (t || je(i));
          };
        },
        interpolate: function e(t, i, n, r) {
          var s = isNaN(t + i)
            ? 0
            : function (e) {
                return (1 - e) * t + e * i;
              };
          if (!s) {
            var a,
              o,
              l,
              c,
              u,
              d = M(t),
              h = {};
            if ((!0 === n && (r = 1) && (n = null), d))
              (t = { p: t }), (i = { p: i });
            else if (z(t) && !z(i)) {
              for (l = [], c = t.length, u = c - 2, o = 1; o < c; o++)
                l.push(e(t[o - 1], t[o]));
              c--,
                (s = function (e) {
                  e *= c;
                  var t = Math.min(u, ~~e);
                  return l[t](e - t);
                }),
                (n = i);
            } else r || (t = ye(z(t) ? [] : {}, t));
            if (!l) {
              for (a in i) It.call(h, t, a, "get", i[a]);
              s = function (e) {
                return Jt(e, h) || (d ? t.p : t);
              };
            }
          }
          return Ge(n, s);
        },
        shuffle: Ke,
      },
      install: j,
      effects: te,
      ticker: yt,
      updateRoot: kt.updateRoot,
      plugins: ee,
      globalTimeline: s,
      core: {
        PropTween: ri,
        globals: W,
        Tween: Gt,
        Timeline: kt,
        Animation: Pt,
        getCache: ae,
        _removeLinkedListItem: Te,
        suppressOverwrites: function (e) {
          return (r = e);
        },
      },
    };
    le("to,from,fromTo,delayedCall,set,killTweensOf", function (e) {
      return (si[e] = Gt[e]);
    }),
      yt.add(kt.updateRoot),
      (d = si.to({}, { duration: 0 }));
    var ai = function (e, t) {
        for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
          i = i._next;
        return i;
      },
      oi = function (e, t) {
        return {
          name: e,
          rawVars: 1,
          init: function (e, i, n) {
            n._onInit = function (e) {
              var n, r;
              if (
                (M(i) &&
                  ((n = {}),
                  le(i, function (e) {
                    return (n[e] = 1);
                  }),
                  (i = n)),
                t)
              ) {
                for (r in ((n = {}), i)) n[r] = t(i[r]);
                i = n;
              }
              !(function (e, t) {
                var i,
                  n,
                  r,
                  s = e._targets;
                for (i in t)
                  for (n = s.length; n--; )
                    (r = e._ptLookup[n][i]) &&
                      (r = r.d) &&
                      (r._pt && (r = ai(r, i)),
                      r && r.modifier && r.modifier(t[i], e, s[n], i));
              })(e, i);
            };
          },
        };
      },
      li =
        si.registerPlugin(
          {
            name: "attr",
            init: function (e, t, i, n, r) {
              var s, a;
              for (s in t)
                (a = this.add(
                  e,
                  "setAttribute",
                  (e.getAttribute(s) || 0) + "",
                  t[s],
                  n,
                  r,
                  0,
                  0,
                  s
                )) && (a.op = s),
                  this._props.push(s);
            },
          },
          {
            name: "endArray",
            init: function (e, t) {
              for (var i = t.length; i--; ) this.add(e, i, e[i] || 0, t[i]);
            },
          },
          oi("roundProps", Je),
          oi("modifiers"),
          oi("snap", et)
        ) || si;
    (Gt.version = kt.version = li.version = "3.10.4"), (c = 1), k() && bt();
    wt.Power0,
      wt.Power1,
      wt.Power2,
      wt.Power3,
      wt.Power4,
      wt.Linear,
      wt.Quad,
      wt.Cubic,
      wt.Quart,
      wt.Quint,
      wt.Strong,
      wt.Elastic,
      wt.Back,
      wt.SteppedEase,
      wt.Bounce,
      wt.Sine,
      wt.Expo,
      wt.Circ;
    var ci,
      ui,
      di,
      hi,
      pi,
      fi,
      mi,
      gi = {},
      vi = 180 / Math.PI,
      yi = Math.PI / 180,
      bi = Math.atan2,
      wi = /([A-Z])/g,
      _i = /(left|right|width|margin|padding|x)/i,
      xi = /[\s,\(]\S/,
      Ti = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity",
      },
      Ei = function (e, t) {
        return t.set(
          t.t,
          t.p,
          Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
          t
        );
      },
      Si = function (e, t) {
        return t.set(
          t.t,
          t.p,
          1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
          t
        );
      },
      Ci = function (e, t) {
        return t.set(
          t.t,
          t.p,
          e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b,
          t
        );
      },
      Mi = function (e, t) {
        var i = t.s + t.c * e;
        t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
      },
      Oi = function (e, t) {
        return t.set(t.t, t.p, e ? t.e : t.b, t);
      },
      Di = function (e, t) {
        return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
      },
      Ai = function (e, t, i) {
        return (e.style[t] = i);
      },
      Li = function (e, t, i) {
        return e.style.setProperty(t, i);
      },
      Pi = function (e, t, i) {
        return (e._gsap[t] = i);
      },
      ki = function (e, t, i) {
        return (e._gsap.scaleX = e._gsap.scaleY = i);
      },
      $i = function (e, t, i, n, r) {
        var s = e._gsap;
        (s.scaleX = s.scaleY = i), s.renderTransform(r, s);
      },
      Ri = function (e, t, i, n, r) {
        var s = e._gsap;
        (s[t] = i), s.renderTransform(r, s);
      },
      zi = "transform",
      Ii = zi + "Origin",
      Fi = function (e, t) {
        var i = ui.createElementNS
          ? ui.createElementNS(
              (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
              e
            )
          : ui.createElement(e);
        return i.style ? i : ui.createElement(e);
      },
      Bi = function e(t, i, n) {
        var r = getComputedStyle(t);
        return (
          r[i] ||
          r.getPropertyValue(i.replace(wi, "-$1").toLowerCase()) ||
          r.getPropertyValue(i) ||
          (!n && e(t, qi(i) || i, 1)) ||
          ""
        );
      },
      Ni = "O,Moz,ms,Ms,Webkit".split(","),
      qi = function (e, t, i) {
        var n = (t || pi).style,
          r = 5;
        if (e in n && !i) return e;
        for (
          e = e.charAt(0).toUpperCase() + e.substr(1);
          r-- && !(Ni[r] + e in n);

        );
        return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? Ni[r] : "") + e;
      },
      Xi = function () {
        "undefined" != typeof window &&
          window.document &&
          ((ci = window),
          (ui = ci.document),
          (di = ui.documentElement),
          (pi = Fi("div") || { style: {} }),
          Fi("div"),
          (zi = qi(zi)),
          (Ii = zi + "Origin"),
          (pi.style.cssText =
            "border-width:0;line-height:0;position:absolute;padding:0"),
          (mi = !!qi("perspective")),
          (hi = 1));
      },
      Yi = function e(t) {
        var i,
          n = Fi(
            "svg",
            (this.ownerSVGElement &&
              this.ownerSVGElement.getAttribute("xmlns")) ||
              "http://www.w3.org/2000/svg"
          ),
          r = this.parentNode,
          s = this.nextSibling,
          a = this.style.cssText;
        if (
          (di.appendChild(n),
          n.appendChild(this),
          (this.style.display = "block"),
          t)
        )
          try {
            (i = this.getBBox()),
              (this._gsapBBox = this.getBBox),
              (this.getBBox = e);
          } catch (e) {}
        else this._gsapBBox && (i = this._gsapBBox());
        return (
          r && (s ? r.insertBefore(this, s) : r.appendChild(this)),
          di.removeChild(n),
          (this.style.cssText = a),
          i
        );
      },
      Gi = function (e, t) {
        for (var i = t.length; i--; )
          if (e.hasAttribute(t[i])) return e.getAttribute(t[i]);
      },
      Hi = function (e) {
        var t;
        try {
          t = e.getBBox();
        } catch (i) {
          t = Yi.call(e, !0);
        }
        return (
          (t && (t.width || t.height)) ||
            e.getBBox === Yi ||
            (t = Yi.call(e, !0)),
          !t || t.width || t.x || t.y
            ? t
            : {
                x: +Gi(e, ["x", "cx", "x1"]) || 0,
                y: +Gi(e, ["y", "cy", "y1"]) || 0,
                width: 0,
                height: 0,
              }
        );
      },
      ji = function (e) {
        return !(!e.getCTM || (e.parentNode && !e.ownerSVGElement) || !Hi(e));
      },
      Vi = function (e, t) {
        if (t) {
          var i = e.style;
          t in gi && t !== Ii && (t = zi),
            i.removeProperty
              ? (("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6)) ||
                  (t = "-" + t),
                i.removeProperty(t.replace(wi, "-$1").toLowerCase()))
              : i.removeAttribute(t);
        }
      },
      Ui = function (e, t, i, n, r, s) {
        var a = new ri(e._pt, t, i, 0, 1, s ? Di : Oi);
        return (e._pt = a), (a.b = n), (a.e = r), e._props.push(i), a;
      },
      Wi = { deg: 1, rad: 1, turn: 1 },
      Qi = function e(t, i, n, r) {
        var s,
          a,
          o,
          l,
          c = parseFloat(n) || 0,
          u = (n + "").trim().substr((c + "").length) || "px",
          d = pi.style,
          h = _i.test(i),
          p = "svg" === t.tagName.toLowerCase(),
          f = (p ? "client" : "offset") + (h ? "Width" : "Height"),
          m = 100,
          g = "px" === r,
          v = "%" === r;
        return r === u || !c || Wi[r] || Wi[u]
          ? c
          : ("px" !== u && !g && (c = e(t, i, n, "px")),
            (l = t.getCTM && ji(t)),
            (!v && "%" !== u) || (!gi[i] && !~i.indexOf("adius"))
              ? ((d[h ? "width" : "height"] = m + (g ? u : r)),
                (a =
                  ~i.indexOf("adius") || ("em" === r && t.appendChild && !p)
                    ? t
                    : t.parentNode),
                l && (a = (t.ownerSVGElement || {}).parentNode),
                (a && a !== ui && a.appendChild) || (a = ui.body),
                (o = a._gsap) && v && o.width && h && o.time === yt.time
                  ? ce((c / o.width) * m)
                  : ((v || "%" === u) && (d.position = Bi(t, "position")),
                    a === t && (d.position = "static"),
                    a.appendChild(pi),
                    (s = pi[f]),
                    a.removeChild(pi),
                    (d.position = "absolute"),
                    h && v && (((o = ae(a)).time = yt.time), (o.width = a[f])),
                    ce(g ? (s * c) / m : s && c ? (m / s) * c : 0)))
              : ((s = l ? t.getBBox()[h ? "width" : "height"] : t[f]),
                ce(v ? (c / s) * m : (c / 100) * s)));
      },
      Ki = function (e, t, i, n) {
        var r;
        return (
          hi || Xi(),
          t in Ti &&
            "transform" !== t &&
            ~(t = Ti[t]).indexOf(",") &&
            (t = t.split(",")[0]),
          gi[t] && "transform" !== t
            ? ((r = un(e, n)),
              (r =
                "transformOrigin" !== t
                  ? r[t]
                  : r.svg
                  ? r.origin
                  : dn(Bi(e, Ii)) + " " + r.zOrigin + "px"))
            : (!(r = e.style[t]) ||
                "auto" === r ||
                n ||
                ~(r + "").indexOf("calc(")) &&
              (r =
                (nn[t] && nn[t](e, t, i)) ||
                Bi(e, t) ||
                oe(e, t) ||
                ("opacity" === t ? 1 : 0)),
          i && !~(r + "").trim().indexOf(" ") ? Qi(e, t, r, i) + i : r
        );
      },
      Zi = function (e, t, i, n) {
        if (!i || "none" === i) {
          var r = qi(t, e, 1),
            s = r && Bi(e, r, 1);
          s && s !== i
            ? ((t = r), (i = s))
            : "borderColor" === t && (i = Bi(e, "borderTopColor"));
        }
        var a,
          o,
          l,
          c,
          u,
          d,
          h,
          p,
          f,
          m,
          g,
          y = new ri(this._pt, e.style, t, 0, 1, Zt),
          b = 0,
          w = 0;
        if (
          ((y.b = i),
          (y.e = n),
          (i += ""),
          "auto" === (n += "") &&
            ((e.style[t] = n), (n = Bi(e, t) || n), (e.style[t] = i)),
          vt((a = [i, n])),
          (n = a[1]),
          (l = (i = a[0]).match(B) || []),
          (n.match(B) || []).length)
        ) {
          for (; (o = B.exec(n)); )
            (h = o[0]),
              (f = n.substring(b, o.index)),
              u
                ? (u = (u + 1) % 5)
                : ("rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5)) ||
                  (u = 1),
              h !== (d = l[w++] || "") &&
                ((c = parseFloat(d) || 0),
                (g = d.substr((c + "").length)),
                "=" === h.charAt(1) && (h = de(c, h) + g),
                (p = parseFloat(h)),
                (m = h.substr((p + "").length)),
                (b = B.lastIndex - m.length),
                m ||
                  ((m = m || v.units[t] || g),
                  b === n.length && ((n += m), (y.e += m))),
                g !== m && (c = Qi(e, t, d, m) || 0),
                (y._pt = {
                  _next: y._pt,
                  p: f || 1 === w ? f : ",",
                  s: c,
                  c: p - c,
                  m: (u && u < 4) || "zIndex" === t ? Math.round : 0,
                }));
          y.c = b < n.length ? n.substring(b, n.length) : "";
        } else y.r = "display" === t && "none" === n ? Di : Oi;
        return q.test(n) && (y.e = 0), (this._pt = y), y;
      },
      Ji = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%",
      },
      en = function (e) {
        var t = e.split(" "),
          i = t[0],
          n = t[1] || "50%";
        return (
          ("top" !== i && "bottom" !== i && "left" !== n && "right" !== n) ||
            ((e = i), (i = n), (n = e)),
          (t[0] = Ji[i] || i),
          (t[1] = Ji[n] || n),
          t.join(" ")
        );
      },
      tn = function (e, t) {
        if (t.tween && t.tween._time === t.tween._dur) {
          var i,
            n,
            r,
            s = t.t,
            a = s.style,
            o = t.u,
            l = s._gsap;
          if ("all" === o || !0 === o) (a.cssText = ""), (n = 1);
          else
            for (r = (o = o.split(",")).length; --r > -1; )
              (i = o[r]),
                gi[i] && ((n = 1), (i = "transformOrigin" === i ? Ii : zi)),
                Vi(s, i);
          n &&
            (Vi(s, zi),
            l &&
              (l.svg && s.removeAttribute("transform"),
              un(s, 1),
              (l.uncache = 1)));
        }
      },
      nn = {
        clearProps: function (e, t, i, n, r) {
          if ("isFromStart" !== r.data) {
            var s = (e._pt = new ri(e._pt, t, i, 0, 0, tn));
            return (s.u = n), (s.pr = -10), (s.tween = r), e._props.push(i), 1;
          }
        },
      },
      rn = [1, 0, 0, 1, 0, 0],
      sn = {},
      an = function (e) {
        return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
      },
      on = function (e) {
        var t = Bi(e, zi);
        return an(t) ? rn : t.substr(7).match(F).map(ce);
      },
      ln = function (e, t) {
        var i,
          n,
          r,
          s,
          a = e._gsap || ae(e),
          o = e.style,
          l = on(e);
        return a.svg && e.getAttribute("transform")
          ? "1,0,0,1,0,0" ===
            (l = [
              (r = e.transform.baseVal.consolidate().matrix).a,
              r.b,
              r.c,
              r.d,
              r.e,
              r.f,
            ]).join(",")
            ? rn
            : l
          : (l !== rn ||
              e.offsetParent ||
              e === di ||
              a.svg ||
              ((r = o.display),
              (o.display = "block"),
              ((i = e.parentNode) && e.offsetParent) ||
                ((s = 1), (n = e.nextSibling), di.appendChild(e)),
              (l = on(e)),
              r ? (o.display = r) : Vi(e, "display"),
              s &&
                (n
                  ? i.insertBefore(e, n)
                  : i
                  ? i.appendChild(e)
                  : di.removeChild(e))),
            t && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
      },
      cn = function (e, t, i, n, r, s) {
        var a,
          o,
          l,
          c = e._gsap,
          u = r || ln(e, !0),
          d = c.xOrigin || 0,
          h = c.yOrigin || 0,
          p = c.xOffset || 0,
          f = c.yOffset || 0,
          m = u[0],
          g = u[1],
          v = u[2],
          y = u[3],
          b = u[4],
          w = u[5],
          _ = t.split(" "),
          x = parseFloat(_[0]) || 0,
          T = parseFloat(_[1]) || 0;
        i
          ? u !== rn &&
            (o = m * y - g * v) &&
            ((l = x * (-g / o) + T * (m / o) - (m * w - g * b) / o),
            (x = x * (y / o) + T * (-v / o) + (v * w - y * b) / o),
            (T = l))
          : ((x =
              (a = Hi(e)).x + (~_[0].indexOf("%") ? (x / 100) * a.width : x)),
            (T =
              a.y + (~(_[1] || _[0]).indexOf("%") ? (T / 100) * a.height : T))),
          n || (!1 !== n && c.smooth)
            ? ((b = x - d),
              (w = T - h),
              (c.xOffset = p + (b * m + w * v) - b),
              (c.yOffset = f + (b * g + w * y) - w))
            : (c.xOffset = c.yOffset = 0),
          (c.xOrigin = x),
          (c.yOrigin = T),
          (c.smooth = !!n),
          (c.origin = t),
          (c.originIsAbsolute = !!i),
          (e.style[Ii] = "0px 0px"),
          s &&
            (Ui(s, c, "xOrigin", d, x),
            Ui(s, c, "yOrigin", h, T),
            Ui(s, c, "xOffset", p, c.xOffset),
            Ui(s, c, "yOffset", f, c.yOffset)),
          e.setAttribute("data-svg-origin", x + " " + T);
      },
      un = function (e, t) {
        var i = e._gsap || new Lt(e);
        if ("x" in i && !t && !i.uncache) return i;
        var n,
          r,
          s,
          a,
          o,
          l,
          c,
          u,
          d,
          h,
          p,
          f,
          m,
          g,
          y,
          b,
          w,
          _,
          x,
          T,
          E,
          S,
          C,
          M,
          O,
          D,
          A,
          L,
          P,
          k,
          $,
          R,
          z = e.style,
          I = i.scaleX < 0,
          F = "px",
          B = "deg",
          N = Bi(e, Ii) || "0";
        return (
          (n = r = s = l = c = u = d = h = p = 0),
          (a = o = 1),
          (i.svg = !(!e.getCTM || !ji(e))),
          (g = ln(e, i.svg)),
          i.svg &&
            ((M =
              (!i.uncache || "0px 0px" === N) &&
              !t &&
              e.getAttribute("data-svg-origin")),
            cn(e, M || N, !!M || i.originIsAbsolute, !1 !== i.smooth, g)),
          (f = i.xOrigin || 0),
          (m = i.yOrigin || 0),
          g !== rn &&
            ((_ = g[0]),
            (x = g[1]),
            (T = g[2]),
            (E = g[3]),
            (n = S = g[4]),
            (r = C = g[5]),
            6 === g.length
              ? ((a = Math.sqrt(_ * _ + x * x)),
                (o = Math.sqrt(E * E + T * T)),
                (l = _ || x ? bi(x, _) * vi : 0),
                (d = T || E ? bi(T, E) * vi + l : 0) &&
                  (o *= Math.abs(Math.cos(d * yi))),
                i.svg &&
                  ((n -= f - (f * _ + m * T)), (r -= m - (f * x + m * E))))
              : ((R = g[6]),
                (k = g[7]),
                (A = g[8]),
                (L = g[9]),
                (P = g[10]),
                ($ = g[11]),
                (n = g[12]),
                (r = g[13]),
                (s = g[14]),
                (c = (y = bi(R, P)) * vi),
                y &&
                  ((M = S * (b = Math.cos(-y)) + A * (w = Math.sin(-y))),
                  (O = C * b + L * w),
                  (D = R * b + P * w),
                  (A = S * -w + A * b),
                  (L = C * -w + L * b),
                  (P = R * -w + P * b),
                  ($ = k * -w + $ * b),
                  (S = M),
                  (C = O),
                  (R = D)),
                (u = (y = bi(-T, P)) * vi),
                y &&
                  ((b = Math.cos(-y)),
                  ($ = E * (w = Math.sin(-y)) + $ * b),
                  (_ = M = _ * b - A * w),
                  (x = O = x * b - L * w),
                  (T = D = T * b - P * w)),
                (l = (y = bi(x, _)) * vi),
                y &&
                  ((M = _ * (b = Math.cos(y)) + x * (w = Math.sin(y))),
                  (O = S * b + C * w),
                  (x = x * b - _ * w),
                  (C = C * b - S * w),
                  (_ = M),
                  (S = O)),
                c &&
                  Math.abs(c) + Math.abs(l) > 359.9 &&
                  ((c = l = 0), (u = 180 - u)),
                (a = ce(Math.sqrt(_ * _ + x * x + T * T))),
                (o = ce(Math.sqrt(C * C + R * R))),
                (y = bi(S, C)),
                (d = Math.abs(y) > 2e-4 ? y * vi : 0),
                (p = $ ? 1 / ($ < 0 ? -$ : $) : 0)),
            i.svg &&
              ((M = e.getAttribute("transform")),
              (i.forceCSS = e.setAttribute("transform", "") || !an(Bi(e, zi))),
              M && e.setAttribute("transform", M))),
          Math.abs(d) > 90 &&
            Math.abs(d) < 270 &&
            (I
              ? ((a *= -1),
                (d += l <= 0 ? 180 : -180),
                (l += l <= 0 ? 180 : -180))
              : ((o *= -1), (d += d <= 0 ? 180 : -180))),
          (t = t || i.uncache),
          (i.x =
            n -
            ((i.xPercent =
              n &&
              ((!t && i.xPercent) ||
                (Math.round(e.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
              ? (e.offsetWidth * i.xPercent) / 100
              : 0) +
            F),
          (i.y =
            r -
            ((i.yPercent =
              r &&
              ((!t && i.yPercent) ||
                (Math.round(e.offsetHeight / 2) === Math.round(-r) ? -50 : 0)))
              ? (e.offsetHeight * i.yPercent) / 100
              : 0) +
            F),
          (i.z = s + F),
          (i.scaleX = ce(a)),
          (i.scaleY = ce(o)),
          (i.rotation = ce(l) + B),
          (i.rotationX = ce(c) + B),
          (i.rotationY = ce(u) + B),
          (i.skewX = d + B),
          (i.skewY = h + B),
          (i.transformPerspective = p + F),
          (i.zOrigin = parseFloat(N.split(" ")[2]) || 0) && (z[Ii] = dn(N)),
          (i.xOffset = i.yOffset = 0),
          (i.force3D = v.force3D),
          (i.renderTransform = i.svg ? yn : mi ? vn : pn),
          (i.uncache = 0),
          i
        );
      },
      dn = function (e) {
        return (e = e.split(" "))[0] + " " + e[1];
      },
      hn = function (e, t, i) {
        var n = je(t);
        return ce(parseFloat(t) + parseFloat(Qi(e, "x", i + "px", n))) + n;
      },
      pn = function (e, t) {
        (t.z = "0px"),
          (t.rotationY = t.rotationX = "0deg"),
          (t.force3D = 0),
          vn(e, t);
      },
      fn = "0deg",
      mn = "0px",
      gn = ") ",
      vn = function (e, t) {
        var i = t || this,
          n = i.xPercent,
          r = i.yPercent,
          s = i.x,
          a = i.y,
          o = i.z,
          l = i.rotation,
          c = i.rotationY,
          u = i.rotationX,
          d = i.skewX,
          h = i.skewY,
          p = i.scaleX,
          f = i.scaleY,
          m = i.transformPerspective,
          g = i.force3D,
          v = i.target,
          y = i.zOrigin,
          b = "",
          w = ("auto" === g && e && 1 !== e) || !0 === g;
        if (y && (u !== fn || c !== fn)) {
          var _,
            x = parseFloat(c) * yi,
            T = Math.sin(x),
            E = Math.cos(x);
          (x = parseFloat(u) * yi),
            (_ = Math.cos(x)),
            (s = hn(v, s, T * _ * -y)),
            (a = hn(v, a, -Math.sin(x) * -y)),
            (o = hn(v, o, E * _ * -y + y));
        }
        m !== mn && (b += "perspective(" + m + gn),
          (n || r) && (b += "translate(" + n + "%, " + r + "%) "),
          (w || s !== mn || a !== mn || o !== mn) &&
            (b +=
              o !== mn || w
                ? "translate3d(" + s + ", " + a + ", " + o + ") "
                : "translate(" + s + ", " + a + gn),
          l !== fn && (b += "rotate(" + l + gn),
          c !== fn && (b += "rotateY(" + c + gn),
          u !== fn && (b += "rotateX(" + u + gn),
          (d === fn && h === fn) || (b += "skew(" + d + ", " + h + gn),
          (1 === p && 1 === f) || (b += "scale(" + p + ", " + f + gn),
          (v.style[zi] = b || "translate(0, 0)");
      },
      yn = function (e, t) {
        var i,
          n,
          r,
          s,
          a,
          o = t || this,
          l = o.xPercent,
          c = o.yPercent,
          u = o.x,
          d = o.y,
          h = o.rotation,
          p = o.skewX,
          f = o.skewY,
          m = o.scaleX,
          g = o.scaleY,
          v = o.target,
          y = o.xOrigin,
          b = o.yOrigin,
          w = o.xOffset,
          _ = o.yOffset,
          x = o.forceCSS,
          T = parseFloat(u),
          E = parseFloat(d);
        (h = parseFloat(h)),
          (p = parseFloat(p)),
          (f = parseFloat(f)) && ((p += f = parseFloat(f)), (h += f)),
          h || p
            ? ((h *= yi),
              (p *= yi),
              (i = Math.cos(h) * m),
              (n = Math.sin(h) * m),
              (r = Math.sin(h - p) * -g),
              (s = Math.cos(h - p) * g),
              p &&
                ((f *= yi),
                (a = Math.tan(p - f)),
                (r *= a = Math.sqrt(1 + a * a)),
                (s *= a),
                f &&
                  ((a = Math.tan(f)),
                  (i *= a = Math.sqrt(1 + a * a)),
                  (n *= a))),
              (i = ce(i)),
              (n = ce(n)),
              (r = ce(r)),
              (s = ce(s)))
            : ((i = m), (s = g), (n = r = 0)),
          ((T && !~(u + "").indexOf("px")) ||
            (E && !~(d + "").indexOf("px"))) &&
            ((T = Qi(v, "x", u, "px")), (E = Qi(v, "y", d, "px"))),
          (y || b || w || _) &&
            ((T = ce(T + y - (y * i + b * r) + w)),
            (E = ce(E + b - (y * n + b * s) + _))),
          (l || c) &&
            ((a = v.getBBox()),
            (T = ce(T + (l / 100) * a.width)),
            (E = ce(E + (c / 100) * a.height))),
          (a =
            "matrix(" +
            i +
            "," +
            n +
            "," +
            r +
            "," +
            s +
            "," +
            T +
            "," +
            E +
            ")"),
          v.setAttribute("transform", a),
          x && (v.style[zi] = a);
      },
      bn = function (e, t, i, n, r) {
        var s,
          a,
          o = 360,
          l = M(r),
          c = parseFloat(r) * (l && ~r.indexOf("rad") ? vi : 1) - n,
          u = n + c + "deg";
        return (
          l &&
            ("short" === (s = r.split("_")[1]) &&
              (c %= o) !== c % 180 &&
              (c += c < 0 ? o : -360),
            "cw" === s && c < 0
              ? (c = ((c + 36e9) % o) - ~~(c / o) * o)
              : "ccw" === s && c > 0 && (c = ((c - 36e9) % o) - ~~(c / o) * o)),
          (e._pt = a = new ri(e._pt, t, i, n, c, Si)),
          (a.e = u),
          (a.u = "deg"),
          e._props.push(i),
          a
        );
      },
      wn = function (e, t) {
        for (var i in t) e[i] = t[i];
        return e;
      },
      _n = function (e, t, i) {
        var n,
          r,
          s,
          a,
          o,
          l,
          c,
          u = wn({}, i._gsap),
          d = i.style;
        for (r in (u.svg
          ? ((s = i.getAttribute("transform")),
            i.setAttribute("transform", ""),
            (d[zi] = t),
            (n = un(i, 1)),
            Vi(i, zi),
            i.setAttribute("transform", s))
          : ((s = getComputedStyle(i)[zi]),
            (d[zi] = t),
            (n = un(i, 1)),
            (d[zi] = s)),
        gi))
          (s = u[r]) !== (a = n[r]) &&
            "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 &&
            ((o = je(s) !== (c = je(a)) ? Qi(i, r, s, c) : parseFloat(s)),
            (l = parseFloat(a)),
            (e._pt = new ri(e._pt, n, r, o, l - o, Ei)),
            (e._pt.u = c || 0),
            e._props.push(r));
        wn(n, u);
      };
    le("padding,margin,Width,Radius", function (e, t) {
      var i = "Top",
        n = "Right",
        r = "Bottom",
        s = "Left",
        a = (t < 3 ? [i, n, r, s] : [i + s, i + n, r + n, r + s]).map(function (
          i
        ) {
          return t < 2 ? e + i : "border" + i + e;
        });
      nn[t > 1 ? "border" + e : e] = function (e, t, i, n, r) {
        var s, o;
        if (arguments.length < 4)
          return (
            (s = a.map(function (t) {
              return Ki(e, t, i);
            })),
            5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o
          );
        (s = (n + "").split(" ")),
          (o = {}),
          a.forEach(function (e, t) {
            return (o[e] = s[t] = s[t] || s[((t - 1) / 2) | 0]);
          }),
          e.init(t, o, r);
      };
    });
    var xn,
      Tn,
      En,
      Sn = {
        name: "css",
        register: Xi,
        targetTest: function (e) {
          return e.style && e.nodeType;
        },
        init: function (e, t, i, n, r) {
          var s,
            a,
            o,
            l,
            c,
            u,
            d,
            h,
            p,
            f,
            m,
            g,
            y,
            b,
            w,
            _ = this._props,
            x = e.style,
            T = i.vars.startAt;
          for (d in (hi || Xi(), t))
            if (
              "autoRound" !== d &&
              ((a = t[d]), !ee[d] || !Ft(d, t, i, n, e, r))
            )
              if (
                ((c = typeof a),
                (u = nn[d]),
                "function" === c && (c = typeof (a = a.call(i, n, e, r))),
                "string" === c && ~a.indexOf("random(") && (a = nt(a)),
                u)
              )
                u(this, e, d, a, i) && (w = 1);
              else if ("--" === d.substr(0, 2))
                (s = (getComputedStyle(e).getPropertyValue(d) + "").trim()),
                  (a += ""),
                  (mt.lastIndex = 0),
                  mt.test(s) || ((h = je(s)), (p = je(a))),
                  p ? h !== p && (s = Qi(e, d, s, p) + p) : h && (a += h),
                  this.add(x, "setProperty", s, a, n, r, 0, 0, d),
                  _.push(d);
              else if ("undefined" !== c) {
                if (
                  (T && d in T
                    ? ((s =
                        "function" == typeof T[d]
                          ? T[d].call(i, n, e, r)
                          : T[d]),
                      M(s) && ~s.indexOf("random(") && (s = nt(s)),
                      je(s + "") || (s += v.units[d] || je(Ki(e, d)) || ""),
                      "=" === (s + "").charAt(1) && (s = Ki(e, d)))
                    : (s = Ki(e, d)),
                  (l = parseFloat(s)),
                  (f =
                    "string" === c && "=" === a.charAt(1) && a.substr(0, 2)) &&
                    (a = a.substr(2)),
                  (o = parseFloat(a)),
                  d in Ti &&
                    ("autoAlpha" === d &&
                      (1 === l &&
                        "hidden" === Ki(e, "visibility") &&
                        o &&
                        (l = 0),
                      Ui(
                        this,
                        x,
                        "visibility",
                        l ? "inherit" : "hidden",
                        o ? "inherit" : "hidden",
                        !o
                      )),
                    "scale" !== d &&
                      "transform" !== d &&
                      ~(d = Ti[d]).indexOf(",") &&
                      (d = d.split(",")[0])),
                  (m = d in gi))
                )
                  if (
                    (g ||
                      (((y = e._gsap).renderTransform && !t.parseTransform) ||
                        un(e, t.parseTransform),
                      (b = !1 !== t.smoothOrigin && y.smooth),
                      ((g = this._pt =
                        new ri(
                          this._pt,
                          x,
                          zi,
                          0,
                          1,
                          y.renderTransform,
                          y,
                          0,
                          -1
                        )).dep = 1)),
                    "scale" === d)
                  )
                    (this._pt = new ri(
                      this._pt,
                      y,
                      "scaleY",
                      y.scaleY,
                      (f ? de(y.scaleY, f + o) : o) - y.scaleY || 0
                    )),
                      _.push("scaleY", d),
                      (d += "X");
                  else {
                    if ("transformOrigin" === d) {
                      (a = en(a)),
                        y.svg
                          ? cn(e, a, 0, b, 0, this)
                          : ((p = parseFloat(a.split(" ")[2]) || 0) !==
                              y.zOrigin && Ui(this, y, "zOrigin", y.zOrigin, p),
                            Ui(this, x, d, dn(s), dn(a)));
                      continue;
                    }
                    if ("svgOrigin" === d) {
                      cn(e, a, 1, b, 0, this);
                      continue;
                    }
                    if (d in sn) {
                      bn(this, y, d, l, f ? de(l, f + a) : a);
                      continue;
                    }
                    if ("smoothOrigin" === d) {
                      Ui(this, y, "smooth", y.smooth, a);
                      continue;
                    }
                    if ("force3D" === d) {
                      y[d] = a;
                      continue;
                    }
                    if ("transform" === d) {
                      _n(this, a, e);
                      continue;
                    }
                  }
                else d in x || (d = qi(d) || d);
                if (
                  m ||
                  ((o || 0 === o) && (l || 0 === l) && !xi.test(a) && d in x)
                )
                  o || (o = 0),
                    (h = (s + "").substr((l + "").length)) !==
                      (p = je(a) || (d in v.units ? v.units[d] : h)) &&
                      (l = Qi(e, d, s, p)),
                    (this._pt = new ri(
                      this._pt,
                      m ? y : x,
                      d,
                      l,
                      (f ? de(l, f + o) : o) - l,
                      m || ("px" !== p && "zIndex" !== d) || !1 === t.autoRound
                        ? Ei
                        : Mi
                    )),
                    (this._pt.u = p || 0),
                    h !== p &&
                      "%" !== p &&
                      ((this._pt.b = s), (this._pt.r = Ci));
                else if (d in x) Zi.call(this, e, d, s, f ? f + a : a);
                else {
                  if (!(d in e)) {
                    V(d, a);
                    continue;
                  }
                  this.add(e, d, s || e[d], f ? f + a : a, n, r);
                }
                _.push(d);
              }
          w && ni(this);
        },
        get: Ki,
        aliases: Ti,
        getSetter: function (e, t, i) {
          var n = Ti[t];
          return (
            n && n.indexOf(",") < 0 && (t = n),
            t in gi && t !== Ii && (e._gsap.x || Ki(e, "x"))
              ? i && fi === i
                ? "scale" === t
                  ? ki
                  : Pi
                : (fi = i || {}) && ("scale" === t ? $i : Ri)
              : e.style && !A(e.style[t])
              ? Ai
              : ~t.indexOf("-")
              ? Li
              : Wt(e, t)
          );
        },
        core: { _removeProperty: Vi, _getMatrix: ln },
      };
    (li.utils.checkPrefix = qi),
      (En = le(
        (xn = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
          "," +
          (Tn = "rotation,rotationX,rotationY,skewX,skewY") +
          ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
        function (e) {
          gi[e] = 1;
        }
      )),
      le(Tn, function (e) {
        (v.units[e] = "deg"), (sn[e] = 1);
      }),
      (Ti[En[13]] = xn + "," + Tn),
      le(
        "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
        function (e) {
          var t = e.split(":");
          Ti[t[1]] = En[t[0]];
        }
      ),
      le(
        "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
        function (e) {
          v.units[e] = "px";
        }
      ),
      li.registerPlugin(Sn);
    var Cn = li.registerPlugin(Sn) || li;
    Cn.core.Tween;
    function Mn(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    /*!
     * Observer 3.10.4
     * https://greensock.com
     *
     * @license Copyright 2008-2022, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var On,
      Dn,
      An,
      Ln,
      Pn,
      kn,
      $n,
      Rn,
      zn,
      In,
      Fn,
      Bn,
      Nn = function () {
        return (
          On ||
          ("undefined" != typeof window &&
            (On = window.gsap) &&
            On.registerPlugin &&
            On)
        );
      },
      qn = 1,
      Xn = [],
      Yn = [],
      Gn = [],
      Hn = Date.now,
      jn = function (e, t) {
        return t;
      },
      Vn = function (e, t) {
        return ~Gn.indexOf(e) && Gn[Gn.indexOf(e) + 1][t];
      },
      Un = function (e) {
        return !!~In.indexOf(e);
      },
      Wn = function (e, t, i, n, r) {
        return e.addEventListener(t, i, { passive: !n, capture: !!r });
      },
      Qn = function (e, t, i, n) {
        return e.removeEventListener(t, i, !!n);
      },
      Kn = "scrollLeft",
      Zn = "scrollTop",
      Jn = function () {
        return (Fn && Fn.isPressed) || Yn.cache++;
      },
      er = function (e, t) {
        var i = function i(n) {
          if (n || 0 === n) {
            qn && (An.history.scrollRestoration = "manual");
            var r = Fn && Fn.isPressed;
            (n = i.v = Math.round(n) || (Fn && Fn.iOS ? 1 : 0)),
              e(n),
              (i.cacheID = Yn.cache),
              r && jn("ss", n);
          } else
            (t || Yn.cache !== i.cacheID || jn("ref")) &&
              ((i.cacheID = Yn.cache), (i.v = e()));
          return i.v + i.offset;
        };
        return (i.offset = 0), e && i;
      },
      tr = {
        s: Kn,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: er(function (e) {
          return arguments.length
            ? An.scrollTo(e, ir.sc())
            : An.pageXOffset ||
                Ln.scrollLeft ||
                Pn.scrollLeft ||
                kn.scrollLeft ||
                0;
        }),
      },
      ir = {
        s: Zn,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: tr,
        sc: er(function (e) {
          return arguments.length
            ? An.scrollTo(tr.sc(), e)
            : An.pageYOffset ||
                Ln.scrollTop ||
                Pn.scrollTop ||
                kn.scrollTop ||
                0;
        }),
      },
      nr = function (e) {
        return (
          On.utils.toArray(e)[0] ||
          ("string" == typeof e && !1 !== On.config().nullTargetWarn
            ? console.warn("Element not found:", e)
            : null)
        );
      },
      rr = function (e, t) {
        var i = t.s,
          n = t.sc,
          r = Yn.indexOf(e),
          s = n === ir.sc ? 1 : 2;
        return (
          !~r && (r = Yn.push(e) - 1),
          Yn[r + s] ||
            (Yn[r + s] =
              er(Vn(e, i), !0) ||
              (Un(e)
                ? n
                : er(function (t) {
                    return arguments.length ? (e[i] = t) : e[i];
                  })))
        );
      },
      sr = function (e, t, i) {
        var n = e,
          r = e,
          s = Hn(),
          a = s,
          o = t || 50,
          l = Math.max(500, 3 * o),
          c = function (e, t) {
            var l = Hn();
            t || l - s > o
              ? ((r = n), (n = e), (a = s), (s = l))
              : i
              ? (n += e)
              : (n = r + ((e - r) / (l - a)) * (s - a));
          };
        return {
          update: c,
          reset: function () {
            (r = n = i ? 0 : n), (a = s = 0);
          },
          getVelocity: function (e) {
            var t = a,
              o = r,
              u = Hn();
            return (
              (e || 0 === e) && e !== n && c(e),
              s === a || u - a > l
                ? 0
                : ((n + (i ? o : -o)) / ((i ? u : s) - t)) * 1e3
            );
          },
        };
      },
      ar = function (e, t) {
        return (
          t && !e._gsapAllow && e.preventDefault(),
          e.changedTouches ? e.changedTouches[0] : e
        );
      },
      or = function (e) {
        var t = Math.max.apply(Math, e),
          i = Math.min.apply(Math, e);
        return Math.abs(t) >= Math.abs(i) ? t : i;
      },
      lr = function () {
        (zn = On.core.globals().ScrollTrigger) &&
          zn.core &&
          (function () {
            var e = zn.core,
              t = e.bridge || {},
              i = e._scrollers,
              n = e._proxies;
            i.push.apply(i, Yn),
              n.push.apply(n, Gn),
              (Yn = i),
              (Gn = n),
              (jn = function (e, i) {
                return t[e](i);
              });
          })();
      },
      cr = function (e) {
        return (
          (On = e || Nn()) &&
            "undefined" != typeof document &&
            document.body &&
            ((An = window),
            (Ln = document),
            (Pn = Ln.documentElement),
            (kn = Ln.body),
            (In = [An, Ln, Pn, kn]),
            On.utils.clamp,
            (Rn = "onpointerenter" in kn ? "pointer" : "mouse"),
            ($n = ur.isTouch =
              An.matchMedia &&
              An.matchMedia("(hover: none), (pointer: coarse)").matches
                ? 1
                : "ontouchstart" in An ||
                  navigator.maxTouchPoints > 0 ||
                  navigator.msMaxTouchPoints > 0
                ? 2
                : 0),
            (Bn = ur.eventTypes =
              (
                "ontouchstart" in Pn
                  ? "touchstart,touchmove,touchcancel,touchend"
                  : "onpointerdown" in Pn
                  ? "pointerdown,pointermove,pointercancel,pointerup"
                  : "mousedown,mousemove,mouseup,mouseup"
              ).split(",")),
            setTimeout(function () {
              return (qn = 0);
            }, 500),
            lr(),
            (Dn = 1)),
          Dn
        );
      };
    (tr.op = ir), (Yn.cache = 0);
    var ur = (function () {
      function e(e) {
        this.init(e);
      }
      var t, i, n;
      return (
        (e.prototype.init = function (e) {
          Dn || cr(On) || console.warn("Please gsap.registerPlugin(Observer)"),
            zn || lr();
          var t = e.tolerance,
            i = e.dragMinimum,
            n = e.type,
            r = e.target,
            s = e.lineHeight,
            a = e.debounce,
            o = e.preventDefault,
            l = e.onStop,
            c = e.onStopDelay,
            u = e.ignore,
            d = e.wheelSpeed,
            h = e.event,
            p = e.onDragStart,
            f = e.onDragEnd,
            m = e.onDrag,
            g = e.onPress,
            v = e.onRelease,
            y = e.onRight,
            b = e.onLeft,
            w = e.onUp,
            _ = e.onDown,
            x = e.onChangeX,
            T = e.onChangeY,
            E = e.onChange,
            S = e.onToggleX,
            C = e.onToggleY,
            M = e.onHover,
            O = e.onHoverEnd,
            D = e.onMove,
            A = e.ignoreCheck,
            L = e.isNormalizer,
            P = e.onGestureStart,
            k = e.onGestureEnd,
            $ = e.onWheel,
            R = e.onEnable,
            z = e.onDisable,
            I = e.onClick,
            F = e.scrollSpeed,
            B = e.capture,
            N = e.allowClicks,
            q = e.lockAxis,
            X = e.onLockAxis;
          (this.target = r = nr(r) || Pn),
            (this.vars = e),
            u && (u = On.utils.toArray(u)),
            (t = t || 0),
            (i = i || 0),
            (d = d || 1),
            (F = F || 1),
            (n = n || "wheel,touch,pointer"),
            (a = !1 !== a),
            s || (s = parseFloat(An.getComputedStyle(kn).lineHeight) || 22);
          var Y,
            G,
            H,
            j,
            V,
            U,
            W,
            Q = this,
            K = 0,
            Z = 0,
            J = rr(r, tr),
            ee = rr(r, ir),
            te = J(),
            ie = ee(),
            ne =
              ~n.indexOf("touch") &&
              !~n.indexOf("pointer") &&
              "pointerdown" === Bn[0],
            re = Un(r),
            se = r.ownerDocument || Ln,
            ae = [0, 0, 0],
            oe = [0, 0, 0],
            le = 0,
            ce = function () {
              return (le = Hn());
            },
            ue = function (e, t) {
              return (
                ((Q.event = e) && u && ~u.indexOf(e.target)) ||
                (t && ne && "touch" !== e.pointerType) ||
                (A && A(e, t))
              );
            },
            de = function () {
              var e = (Q.deltaX = or(ae)),
                i = (Q.deltaY = or(oe)),
                n = Math.abs(e) >= t,
                r = Math.abs(i) >= t;
              E && (n || r) && E(Q, e, i, ae, oe),
                n &&
                  (y && Q.deltaX > 0 && y(Q),
                  b && Q.deltaX < 0 && b(Q),
                  x && x(Q),
                  S && Q.deltaX < 0 != K < 0 && S(Q),
                  (K = Q.deltaX),
                  (ae[0] = ae[1] = ae[2] = 0)),
                r &&
                  (_ && Q.deltaY > 0 && _(Q),
                  w && Q.deltaY < 0 && w(Q),
                  T && T(Q),
                  C && Q.deltaY < 0 != Z < 0 && C(Q),
                  (Z = Q.deltaY),
                  (oe[0] = oe[1] = oe[2] = 0)),
                (j || H) &&
                  (D && D(Q),
                  X && U && X(Q),
                  H && (m(Q), (H = !1)),
                  (j = U = !1)),
                V && ($(Q), (V = !1)),
                (Y = 0);
            },
            he = function (e, t, i) {
              (ae[i] += e),
                (oe[i] += t),
                Q._vx.update(e),
                Q._vy.update(t),
                a ? Y || (Y = requestAnimationFrame(de)) : de();
            },
            pe = function (e, t) {
              "y" !== W && ((ae[2] += e), Q._vx.update(e, !0)),
                "x" !== W && ((oe[2] += t), Q._vy.update(t, !0)),
                q &&
                  !W &&
                  ((Q.axis = W = Math.abs(e) > Math.abs(t) ? "x" : "y"),
                  (U = !0)),
                a ? Y || (Y = requestAnimationFrame(de)) : de();
            },
            fe = function (e) {
              if (!ue(e, 1)) {
                var t = (e = ar(e, o)).clientX,
                  n = e.clientY,
                  r = t - Q.x,
                  s = n - Q.y,
                  a = Q.isDragging;
                (Q.x = t),
                  (Q.y = n),
                  (a ||
                    Math.abs(Q.startX - t) >= i ||
                    Math.abs(Q.startY - n) >= i) &&
                    (m && (H = !0),
                    a || (Q.isDragging = !0),
                    pe(r, s),
                    a || (p && p(Q)));
              }
            },
            me = (Q.onPress = function (e) {
              ue(e, 1) ||
                ((Q.axis = W = null),
                G.pause(),
                (Q.isPressed = !0),
                (e = ar(e)),
                (K = Z = 0),
                (Q.startX = Q.x = e.clientX),
                (Q.startY = Q.y = e.clientY),
                Q._vx.reset(),
                Q._vy.reset(),
                Wn(L ? r : se, Bn[1], fe, o, !0),
                (Q.deltaX = Q.deltaY = 0),
                g && g(Q));
            }),
            ge = function (e) {
              if (!ue(e, 1)) {
                Qn(L ? r : se, Bn[1], fe, !0);
                var t =
                    Q.isDragging &&
                    (Math.abs(Q.x - Q.startX) > 3 ||
                      Math.abs(Q.y - Q.startY) > 3),
                  i = ar(e);
                t ||
                  (Q._vx.reset(),
                  Q._vy.reset(),
                  o &&
                    N &&
                    On.delayedCall(0.08, function () {
                      if (Hn() - le > 300 && !e.defaultPrevented)
                        if (e.target.click) e.target.click();
                        else if (se.createEvent) {
                          var t = se.createEvent("MouseEvents");
                          t.initMouseEvent(
                            "click",
                            !0,
                            !0,
                            An,
                            1,
                            i.screenX,
                            i.screenY,
                            i.clientX,
                            i.clientY,
                            !1,
                            !1,
                            !1,
                            !1,
                            0,
                            null
                          ),
                            e.target.dispatchEvent(t);
                        }
                    })),
                  (Q.isDragging = Q.isGesturing = Q.isPressed = !1),
                  l && !L && G.restart(!0),
                  f && t && f(Q),
                  v && v(Q, t);
              }
            },
            ve = function (e) {
              return (
                e.touches &&
                e.touches.length > 1 &&
                (Q.isGesturing = !0) &&
                P(e, Q.isDragging)
              );
            },
            ye = function () {
              return (Q.isGesturing = !1) || k(Q);
            },
            be = function (e) {
              if (!ue(e)) {
                var t = J(),
                  i = ee();
                he((t - te) * F, (i - ie) * F, 1),
                  (te = t),
                  (ie = i),
                  l && G.restart(!0);
              }
            },
            we = function (e) {
              if (!ue(e)) {
                (e = ar(e, o)), $ && (V = !0);
                var t =
                  (1 === e.deltaMode
                    ? s
                    : 2 === e.deltaMode
                    ? An.innerHeight
                    : 1) * d;
                he(e.deltaX * t, e.deltaY * t, 0), l && !L && G.restart(!0);
              }
            },
            _e = function (e) {
              if (!ue(e)) {
                var t = e.clientX,
                  i = e.clientY,
                  n = t - Q.x,
                  r = i - Q.y;
                (Q.x = t), (Q.y = i), (j = !0), (n || r) && pe(n, r);
              }
            },
            xe = function (e) {
              (Q.event = e), M(Q);
            },
            Te = function (e) {
              (Q.event = e), O(Q);
            },
            Ee = function (e) {
              return ue(e) || (ar(e, o) && I(Q));
            };
          (G = Q._dc =
            On.delayedCall(c || 0.25, function () {
              Q._vx.reset(), Q._vy.reset(), G.pause(), l && l(Q);
            }).pause()),
            (Q.deltaX = Q.deltaY = 0),
            (Q._vx = sr(0, 50, !0)),
            (Q._vy = sr(0, 50, !0)),
            (Q.scrollX = J),
            (Q.scrollY = ee),
            (Q.isDragging = Q.isGesturing = Q.isPressed = !1),
            (Q.enable = function (e) {
              return (
                Q.isEnabled ||
                  (Wn(re ? se : r, "scroll", Jn),
                  n.indexOf("scroll") >= 0 &&
                    Wn(re ? se : r, "scroll", be, o, B),
                  n.indexOf("wheel") >= 0 && Wn(r, "wheel", we, o, B),
                  ((n.indexOf("touch") >= 0 && $n) ||
                    n.indexOf("pointer") >= 0) &&
                    (Wn(r, Bn[0], me, o, B),
                    Wn(se, Bn[2], ge),
                    Wn(se, Bn[3], ge),
                    N && Wn(r, "click", ce, !1, !0),
                    I && Wn(r, "click", Ee),
                    P && Wn(se, "gesturestart", ve),
                    k && Wn(se, "gestureend", ye),
                    M && Wn(r, Rn + "enter", xe),
                    O && Wn(r, Rn + "leave", Te),
                    D && Wn(r, Rn + "move", _e)),
                  (Q.isEnabled = !0),
                  e && e.type && me(e),
                  R && R(Q)),
                Q
              );
            }),
            (Q.disable = function () {
              Q.isEnabled &&
                (Xn.filter(function (e) {
                  return e !== Q && Un(e.target);
                }).length || Qn(re ? se : r, "scroll", Jn),
                Q.isPressed &&
                  (Q._vx.reset(), Q._vy.reset(), Qn(L ? r : se, Bn[1], fe, !0)),
                Qn(re ? se : r, "scroll", be, B),
                Qn(r, "wheel", we, B),
                Qn(r, Bn[0], me, B),
                Qn(se, Bn[2], ge),
                Qn(se, Bn[3], ge),
                Qn(r, "click", ce, !0),
                Qn(r, "click", Ee),
                Qn(se, "gesturestart", ve),
                Qn(se, "gestureend", ye),
                Qn(r, Rn + "enter", xe),
                Qn(r, Rn + "leave", Te),
                Qn(r, Rn + "move", _e),
                (Q.isEnabled = Q.isPressed = Q.isDragging = !1),
                z && z(Q));
            }),
            (Q.kill = function () {
              Q.disable();
              var e = Xn.indexOf(Q);
              e >= 0 && Xn.splice(e, 1), Fn === Q && (Fn = 0);
            }),
            Xn.push(Q),
            L && Un(r) && (Fn = Q),
            Q.enable(h);
        }),
        (t = e),
        (i = [
          {
            key: "velocityX",
            get: function () {
              return this._vx.getVelocity();
            },
          },
          {
            key: "velocityY",
            get: function () {
              return this._vy.getVelocity();
            },
          },
        ]) && Mn(t.prototype, i),
        n && Mn(t, n),
        e
      );
    })();
    (ur.version = "3.10.4"),
      (ur.create = function (e) {
        return new ur(e);
      }),
      (ur.register = cr),
      (ur.getAll = function () {
        return Xn.slice();
      }),
      (ur.getById = function (e) {
        return Xn.filter(function (t) {
          return t.vars.id === e;
        })[0];
      }),
      Nn() && On.registerPlugin(ur);
    /*!
     * ScrollTrigger 3.10.4
     * https://greensock.com
     *
     * @license Copyright 2008-2022, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var dr,
      hr,
      pr,
      fr,
      mr,
      gr,
      vr,
      yr,
      br,
      wr,
      _r,
      xr,
      Tr,
      Er,
      Sr,
      Cr,
      Mr,
      Or,
      Dr,
      Ar,
      Lr,
      Pr,
      kr,
      $r,
      Rr,
      zr,
      Ir,
      Fr,
      Br,
      Nr,
      qr,
      Xr,
      Yr,
      Gr = 1,
      Hr = Date.now,
      jr = Hr(),
      Vr = 0,
      Ur = 0,
      Wr = function () {
        return (Er = 1);
      },
      Qr = function () {
        return (Er = 0);
      },
      Kr = function (e) {
        return e;
      },
      Zr = function (e) {
        return Math.round(1e5 * e) / 1e5 || 0;
      },
      Jr = function () {
        return "undefined" != typeof window;
      },
      es = function () {
        return dr || (Jr() && (dr = window.gsap) && dr.registerPlugin && dr);
      },
      ts = function (e) {
        return !!~vr.indexOf(e);
      },
      is = function (e) {
        return (
          Vn(e, "getBoundingClientRect") ||
          (ts(e)
            ? function () {
                return (
                  (ha.width = pr.innerWidth), (ha.height = pr.innerHeight), ha
                );
              }
            : function () {
                return Ss(e);
              })
        );
      },
      ns = function (e, t) {
        var i = t.s,
          n = t.d2,
          r = t.d,
          s = t.a;
        return (i = "scroll" + n) && (s = Vn(e, i))
          ? s() - is(e)()[r]
          : ts(e)
          ? (mr[i] || gr[i]) -
            (pr["inner" + n] || mr["client" + n] || gr["client" + n])
          : e[i] - e["offset" + n];
      },
      rs = function (e, t) {
        for (var i = 0; i < Dr.length; i += 3)
          (!t || ~t.indexOf(Dr[i + 1])) && e(Dr[i], Dr[i + 1], Dr[i + 2]);
      },
      ss = function (e) {
        return "string" == typeof e;
      },
      as = function (e) {
        return "function" == typeof e;
      },
      os = function (e) {
        return "number" == typeof e;
      },
      ls = function (e) {
        return "object" == typeof e;
      },
      cs = function (e) {
        return as(e) && e();
      },
      us = function (e, t) {
        return function () {
          var i = cs(e),
            n = cs(t);
          return function () {
            cs(i), cs(n);
          };
        };
      },
      ds = function (e, t, i) {
        return e && e.progress(t ? 0 : 1) && i && e.pause();
      },
      hs = function (e, t) {
        if (e.enabled) {
          var i = t(e);
          i && i.totalTime && (e.callbackAnimation = i);
        }
      },
      ps = Math.abs,
      fs = "left",
      ms = "right",
      gs = "bottom",
      vs = "width",
      ys = "height",
      bs = "padding",
      ws = "margin",
      _s = "Width",
      xs = "px",
      Ts = function (e) {
        return pr.getComputedStyle(e);
      },
      Es = function (e, t) {
        for (var i in t) i in e || (e[i] = t[i]);
        return e;
      },
      Ss = function (e, t) {
        var i =
            t &&
            "matrix(1, 0, 0, 1, 0, 0)" !== Ts(e)[Sr] &&
            dr
              .to(e, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0,
              })
              .progress(1),
          n = e.getBoundingClientRect();
        return i && i.progress(0).kill(), n;
      },
      Cs = function (e, t) {
        var i = t.d2;
        return e["offset" + i] || e["client" + i] || 0;
      },
      Ms = function (e) {
        var t,
          i = [],
          n = e.labels,
          r = e.duration();
        for (t in n) i.push(n[t] / r);
        return i;
      },
      Os = function (e) {
        var t = dr.utils.snap(e),
          i =
            Array.isArray(e) &&
            e.slice(0).sort(function (e, t) {
              return e - t;
            });
        return i
          ? function (e, n, r) {
              var s;
              if ((void 0 === r && (r = 0.001), !n)) return t(e);
              if (n > 0) {
                for (e -= r, s = 0; s < i.length; s++)
                  if (i[s] >= e) return i[s];
                return i[s - 1];
              }
              for (s = i.length, e += r; s--; ) if (i[s] <= e) return i[s];
              return i[0];
            }
          : function (i, n, r) {
              void 0 === r && (r = 0.001);
              var s = t(i);
              return !n || Math.abs(s - i) < r || s - i < 0 == n < 0
                ? s
                : t(n < 0 ? i - e : i + e);
            };
      },
      Ds = function (e, t, i, n) {
        return i.split(",").forEach(function (i) {
          return e(t, i, n);
        });
      },
      As = function (e, t, i, n, r) {
        return e.addEventListener(t, i, { passive: !n, capture: !!r });
      },
      Ls = function (e, t, i, n) {
        return e.removeEventListener(t, i, !!n);
      },
      Ps = function (e, t, i) {
        return i && i.wheelHandler && e(t, "wheel", i);
      },
      ks = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal",
      },
      $s = { toggleActions: "play", anticipatePin: 0 },
      Rs = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
      zs = function (e, t) {
        if (ss(e)) {
          var i = e.indexOf("="),
            n = ~i ? +(e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0;
          ~i &&
            (e.indexOf("%") > i && (n *= t / 100), (e = e.substr(0, i - 1))),
            (e =
              n +
              (e in Rs
                ? Rs[e] * t
                : ~e.indexOf("%")
                ? (parseFloat(e) * t) / 100
                : parseFloat(e) || 0));
        }
        return e;
      },
      Is = function (e, t, i, n, r, s, a, o) {
        var l = r.startColor,
          c = r.endColor,
          u = r.fontSize,
          d = r.indent,
          h = r.fontWeight,
          p = fr.createElement("div"),
          f = ts(i) || "fixed" === Vn(i, "pinType"),
          m = -1 !== e.indexOf("scroller"),
          g = f ? gr : i,
          v = -1 !== e.indexOf("start"),
          y = v ? l : c,
          b =
            "border-color:" +
            y +
            ";font-size:" +
            u +
            ";color:" +
            y +
            ";font-weight:" +
            h +
            ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return (
          (b += "position:" + ((m || o) && f ? "fixed;" : "absolute;")),
          (m || o || !f) &&
            (b += (n === ir ? ms : gs) + ":" + (s + parseFloat(d)) + "px;"),
          a &&
            (b +=
              "box-sizing:border-box;text-align:left;width:" +
              a.offsetWidth +
              "px;"),
          (p._isStart = v),
          p.setAttribute(
            "class",
            "gsap-marker-" + e + (t ? " marker-" + t : "")
          ),
          (p.style.cssText = b),
          (p.innerText = t || 0 === t ? e + "-" + t : e),
          g.children[0] ? g.insertBefore(p, g.children[0]) : g.appendChild(p),
          (p._offset = p["offset" + n.op.d2]),
          Fs(p, 0, n, v),
          p
        );
      },
      Fs = function (e, t, i, n) {
        var r = { display: "block" },
          s = i[n ? "os2" : "p2"],
          a = i[n ? "p2" : "os2"];
        (e._isFlipped = n),
          (r[i.a + "Percent"] = n ? -100 : 0),
          (r[i.a] = n ? "1px" : 0),
          (r["border" + s + _s] = 1),
          (r["border" + a + _s] = 0),
          (r[i.p] = t + "px"),
          dr.set(e, r);
      },
      Bs = [],
      Ns = {},
      qs = function () {
        return Hr() - Vr > 34 && sa();
      },
      Xs = function () {
        (!kr || !kr.isPressed || kr.startX > gr.clientWidth) &&
          (Yn.cache++,
          Br || (Br = requestAnimationFrame(sa)),
          Vr || Qs("scrollStart"),
          (Vr = Hr()));
      },
      Ys = function () {
        (zr = pr.innerWidth), (Rr = pr.innerHeight);
      },
      Gs = function () {
        Yn.cache++,
          !Tr &&
            !Pr &&
            !fr.fullscreenElement &&
            !fr.webkitFullscreenElement &&
            (!$r ||
              zr !== pr.innerWidth ||
              Math.abs(pr.innerHeight - Rr) > 0.25 * pr.innerHeight) &&
            yr.restart(!0);
      },
      Hs = {},
      js = [],
      Vs = [],
      Us = function (e) {
        var t,
          i = dr.ticker.frame,
          n = [],
          r = 0;
        if (qr !== i || Gr) {
          for (Js(); r < Vs.length; r += 4)
            (t = pr.matchMedia(Vs[r]).matches) !== Vs[r + 3] &&
              ((Vs[r + 3] = t),
              t ? n.push(r) : Js(1, Vs[r]) || (as(Vs[r + 2]) && Vs[r + 2]()));
          for (Zs(), r = 0; r < n.length; r++)
            (t = n[r]), (Nr = Vs[t]), (Vs[t + 2] = Vs[t + 1](e));
          (Nr = 0), hr && ia(0, 1), (qr = i), Qs("matchMedia");
        }
      },
      Ws = function e() {
        return Ls(va, "scrollEnd", e) || ia(!0);
      },
      Qs = function (e) {
        return (
          (Hs[e] &&
            Hs[e].map(function (e) {
              return e();
            })) ||
          js
        );
      },
      Ks = [],
      Zs = function (e) {
        for (var t = 0; t < Ks.length; t += 5)
          (e && Ks[t + 4] !== e) ||
            ((Ks[t].style.cssText = Ks[t + 1]),
            Ks[t].getBBox && Ks[t].setAttribute("transform", Ks[t + 2] || ""),
            (Ks[t + 3].uncache = 1));
      },
      Js = function (e, t) {
        var i;
        for (Cr = 0; Cr < Bs.length; Cr++)
          (i = Bs[Cr]), (t && i.media !== t) || (e ? i.kill(1) : i.revert());
        t && Zs(t), t || Qs("revert");
      },
      ea = function () {
        return (
          Yn.cache++ &&
          Yn.forEach(function (e) {
            return "function" == typeof e && (e.rec = 0);
          })
        );
      },
      ta = 0,
      ia = function (e, t) {
        if (!Vr || e) {
          Xr = !0;
          var i = Qs("refreshInit");
          Ar && va.sort(),
            t || Js(),
            Bs.slice(0).forEach(function (e) {
              return e.refresh();
            }),
            Bs.forEach(function (e) {
              return (
                "max" === e.vars.end &&
                e.setPositions(e.start, ns(e.scroller, e._dir))
              );
            }),
            i.forEach(function (e) {
              return e && e.render && e.render(-1);
            }),
            ea(),
            yr.pause(),
            ta++,
            (Xr = !1),
            Qs("refresh");
        } else As(va, "scrollEnd", Ws);
      },
      na = 0,
      ra = 1,
      sa = function () {
        if (!Xr) {
          (va.isUpdating = !0), Yr && Yr.update(0);
          var e = Bs.length,
            t = Hr(),
            i = t - jr >= 50,
            n = e && Bs[0].scroll();
          if (
            ((ra = na > n ? -1 : 1),
            (na = n),
            i &&
              (Vr && !Er && t - Vr > 200 && ((Vr = 0), Qs("scrollEnd")),
              (_r = jr),
              (jr = t)),
            ra < 0)
          ) {
            for (Cr = e; Cr-- > 0; ) Bs[Cr] && Bs[Cr].update(0, i);
            ra = 1;
          } else for (Cr = 0; Cr < e; Cr++) Bs[Cr] && Bs[Cr].update(0, i);
          va.isUpdating = !1;
        }
        Br = 0;
      },
      aa = [
        fs,
        "top",
        gs,
        ms,
        "marginBottom",
        "marginRight",
        "marginTop",
        "marginLeft",
        "display",
        "flexShrink",
        "float",
        "zIndex",
        "gridColumnStart",
        "gridColumnEnd",
        "gridRowStart",
        "gridRowEnd",
        "gridArea",
        "justifySelf",
        "alignSelf",
        "placeSelf",
        "order",
      ],
      oa = aa.concat([
        vs,
        ys,
        "boxSizing",
        "maxWidth",
        "maxHeight",
        "position",
        ws,
        bs,
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
      ]),
      la = function (e, t, i, n) {
        if (e.parentNode !== t) {
          for (var r, s = aa.length, a = t.style, o = e.style; s--; )
            a[(r = aa[s])] = i[r];
          (a.position = "absolute" === i.position ? "absolute" : "relative"),
            "inline" === i.display && (a.display = "inline-block"),
            (o.bottom = o.right = a.flexBasis = "auto"),
            (a.overflow = "visible"),
            (a.boxSizing = "border-box"),
            (a.width = Cs(e, tr) + xs),
            (a.height = Cs(e, ir) + xs),
            (a.padding = o.margin = o.top = o.left = "0"),
            ua(n),
            (o.width = o.maxWidth = i.width),
            (o.height = o.maxHeight = i.height),
            (o.padding = i.padding),
            e.parentNode.insertBefore(t, e),
            t.appendChild(e);
        }
      },
      ca = /([A-Z])/g,
      ua = function (e) {
        if (e) {
          var t,
            i,
            n = e.t.style,
            r = e.length,
            s = 0;
          for ((e.t._gsap || dr.core.getCache(e.t)).uncache = 1; s < r; s += 2)
            (i = e[s + 1]),
              (t = e[s]),
              i
                ? (n[t] = i)
                : n[t] && n.removeProperty(t.replace(ca, "-$1").toLowerCase());
        }
      },
      da = function (e) {
        for (var t = oa.length, i = e.style, n = [], r = 0; r < t; r++)
          n.push(oa[r], i[oa[r]]);
        return (n.t = e), n;
      },
      ha = { left: 0, top: 0 },
      pa = function (e, t, i, n, r, s, a, o, l, c, u, d, h) {
        as(e) && (e = e(o)),
          ss(e) &&
            "max" === e.substr(0, 3) &&
            (e = d + ("=" === e.charAt(4) ? zs("0" + e.substr(3), i) : 0));
        var p,
          f,
          m,
          g = h ? h.time() : 0;
        if ((h && h.seek(0), os(e))) a && Fs(a, i, n, !0);
        else {
          as(t) && (t = t(o));
          var v,
            y,
            b,
            w,
            _ = e.split(" ");
          (m = nr(t) || gr),
            ((v = Ss(m) || {}) && (v.left || v.top)) ||
              "none" !== Ts(m).display ||
              ((w = m.style.display),
              (m.style.display = "block"),
              (v = Ss(m)),
              w ? (m.style.display = w) : m.style.removeProperty("display")),
            (y = zs(_[0], v[n.d])),
            (b = zs(_[1] || "0", i)),
            (e = v[n.p] - l[n.p] - c + y + r - b),
            a && Fs(a, b, n, i - b < 20 || (a._isStart && b > 20)),
            (i -= i - b);
        }
        if (s) {
          var x = e + i,
            T = s._isStart;
          (p = "scroll" + n.d2),
            Fs(
              s,
              x,
              n,
              (T && x > 20) ||
                (!T && (u ? Math.max(gr[p], mr[p]) : s.parentNode[p]) <= x + 1)
            ),
            u &&
              ((l = Ss(a)),
              u && (s.style[n.op.p] = l[n.op.p] - n.op.m - s._offset + xs));
        }
        return (
          h &&
            m &&
            ((p = Ss(m)),
            h.seek(d),
            (f = Ss(m)),
            (h._caScrollDist = p[n.p] - f[n.p]),
            (e = (e / h._caScrollDist) * d)),
          h && h.seek(g),
          h ? e : Math.round(e)
        );
      },
      fa = /(webkit|moz|length|cssText|inset)/i,
      ma = function (e, t, i, n) {
        if (e.parentNode !== t) {
          var r,
            s,
            a = e.style;
          if (t === gr) {
            for (r in ((e._stOrig = a.cssText), (s = Ts(e))))
              +r ||
                fa.test(r) ||
                !s[r] ||
                "string" != typeof a[r] ||
                "0" === r ||
                (a[r] = s[r]);
            (a.top = i), (a.left = n);
          } else a.cssText = e._stOrig;
          (dr.core.getCache(e).uncache = 1), t.appendChild(e);
        }
      },
      ga = function (e, t) {
        var i,
          n,
          r = rr(e, t),
          s = "_scroll" + t.p2,
          a = function t(a, o, l, c, u) {
            var d = t.tween,
              h = o.onComplete,
              p = {};
            return (
              (l = l || r()),
              (u = (c && u) || 0),
              (c = c || a - l),
              d && d.kill(),
              (i = Math.round(l)),
              (o[s] = a),
              (o.modifiers = p),
              (p[s] = function (e) {
                return (
                  (e = Zr(r())) !== i &&
                  e !== n &&
                  Math.abs(e - i) > 2 &&
                  Math.abs(e - n) > 2
                    ? (d.kill(), (t.tween = 0))
                    : (e = l + c * d.ratio + u * d.ratio * d.ratio),
                  (n = i),
                  (i = Zr(e))
                );
              }),
              (o.onComplete = function () {
                (t.tween = 0), h && h.call(d);
              }),
              (d = t.tween = dr.to(e, o))
            );
          };
        return (
          (e[s] = r),
          (r.wheelHandler = function () {
            return a.tween && a.tween.kill() && (a.tween = 0);
          }),
          As(e, "wheel", r.wheelHandler),
          a
        );
      },
      va = (function () {
        function e(t, i) {
          hr ||
            e.register(dr) ||
            console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
            this.init(t, i);
        }
        return (
          (e.prototype.init = function (t, i) {
            if (
              ((this.progress = this.start = 0),
              this.vars && this.kill(!0, !0),
              Ur)
            ) {
              var n,
                r,
                s,
                a,
                o,
                l,
                c,
                u,
                d,
                h,
                p,
                f,
                m,
                g,
                v,
                y,
                b,
                w,
                _,
                x,
                T,
                E,
                S,
                C,
                M,
                O,
                D,
                A,
                L,
                P,
                k,
                $,
                R,
                z,
                I,
                F,
                B,
                N,
                q,
                X,
                Y,
                G = (t = Es(
                  ss(t) || os(t) || t.nodeType ? { trigger: t } : t,
                  $s
                )),
                H = G.onUpdate,
                j = G.toggleClass,
                V = G.id,
                U = G.onToggle,
                W = G.onRefresh,
                Q = G.scrub,
                K = G.trigger,
                Z = G.pin,
                J = G.pinSpacing,
                ee = G.invalidateOnRefresh,
                te = G.anticipatePin,
                ie = G.onScrubComplete,
                ne = G.onSnapComplete,
                re = G.once,
                se = G.snap,
                ae = G.pinReparent,
                oe = G.pinSpacer,
                le = G.containerAnimation,
                ce = G.fastScrollEnd,
                ue = G.preventOverlaps,
                de =
                  t.horizontal || (t.containerAnimation && !1 !== t.horizontal)
                    ? tr
                    : ir,
                he = !Q && 0 !== Q,
                pe = nr(t.scroller || pr),
                fe = dr.core.getCache(pe),
                me = ts(pe),
                ge =
                  "fixed" ===
                  ("pinType" in t
                    ? t.pinType
                    : Vn(pe, "pinType") || (me && "fixed")),
                ve = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
                ye = he && t.toggleActions.split(" "),
                be = "markers" in t ? t.markers : $s.markers,
                we = me ? 0 : parseFloat(Ts(pe)["border" + de.p2 + _s]) || 0,
                _e = this,
                xe =
                  t.onRefreshInit &&
                  function () {
                    return t.onRefreshInit(_e);
                  },
                Te = (function (e, t, i) {
                  var n = i.d,
                    r = i.d2,
                    s = i.a;
                  return (s = Vn(e, "getBoundingClientRect"))
                    ? function () {
                        return s()[n];
                      }
                    : function () {
                        return (t ? pr["inner" + r] : e["client" + r]) || 0;
                      };
                })(pe, me, de),
                Ee = (function (e, t) {
                  return !t || ~Gn.indexOf(e)
                    ? is(e)
                    : function () {
                        return ha;
                      };
                })(pe, me),
                Se = 0,
                Ce = 0,
                Me = rr(pe, de);
              if (
                ((_e.media = Nr),
                (_e._dir = de),
                (te *= 45),
                (_e.scroller = pe),
                (_e.scroll = le ? le.time.bind(le) : Me),
                (a = Me()),
                (_e.vars = t),
                (i = i || t.animation),
                "refreshPriority" in t &&
                  ((Ar = 1), -9999 === t.refreshPriority && (Yr = _e)),
                (fe.tweenScroll = fe.tweenScroll || {
                  top: ga(pe, ir),
                  left: ga(pe, tr),
                }),
                (_e.tweenTo = n = fe.tweenScroll[de.p]),
                (_e.scrubDuration = function (e) {
                  (k = os(e) && e)
                    ? P
                      ? P.duration(e)
                      : (P = dr.to(i, {
                          ease: "expo",
                          totalProgress: "+=0.001",
                          duration: k,
                          paused: !0,
                          onComplete: function () {
                            return ie && ie(_e);
                          },
                        }))
                    : (P && P.progress(1).kill(), (P = 0));
                }),
                i &&
                  ((i.vars.lazy = !1),
                  i._initted ||
                    (!1 !== i.vars.immediateRender &&
                      !1 !== t.immediateRender &&
                      i.render(0, !0, !0)),
                  (_e.animation = i.pause()),
                  (i.scrollTrigger = _e),
                  _e.scrubDuration(Q),
                  (A = 0),
                  V || (V = i.vars.id)),
                Bs.push(_e),
                se &&
                  ((ls(se) && !se.push) || (se = { snapTo: se }),
                  "scrollBehavior" in gr.style &&
                    dr.set(me ? [gr, mr] : pe, { scrollBehavior: "auto" }),
                  (s = as(se.snapTo)
                    ? se.snapTo
                    : "labels" === se.snapTo
                    ? (function (e) {
                        return function (t) {
                          return dr.utils.snap(Ms(e), t);
                        };
                      })(i)
                    : "labelsDirectional" === se.snapTo
                    ? ((q = i),
                      function (e, t) {
                        return Os(Ms(q))(e, t.direction);
                      })
                    : !1 !== se.directional
                    ? function (e, t) {
                        return Os(se.snapTo)(
                          e,
                          Hr() - Ce < 500 ? 0 : t.direction
                        );
                      }
                    : dr.utils.snap(se.snapTo)),
                  ($ = se.duration || { min: 0.1, max: 2 }),
                  ($ = ls($) ? wr($.min, $.max) : wr($, $)),
                  (R = dr
                    .delayedCall(se.delay || k / 2 || 0.1, function () {
                      var e = Me(),
                        t = Hr() - Ce < 500,
                        r = n.tween;
                      if (
                        !(t || Math.abs(_e.getVelocity()) < 10) ||
                        r ||
                        Er ||
                        Se === e
                      )
                        _e.isActive && Se !== e && R.restart(!0);
                      else {
                        var a = (e - l) / m,
                          o = i && !he ? i.totalProgress() : a,
                          u = t ? 0 : ((o - L) / (Hr() - _r)) * 1e3 || 0,
                          d = dr.utils.clamp(
                            -a,
                            1 - a,
                            (ps(u / 2) * u) / 0.185
                          ),
                          h = a + (!1 === se.inertia ? 0 : d),
                          p = wr(0, 1, s(h, _e)),
                          f = Math.round(l + p * m),
                          g = se,
                          v = g.onStart,
                          y = g.onInterrupt,
                          b = g.onComplete;
                        if (e <= c && e >= l && f !== e) {
                          if (r && !r._initted && r.data <= ps(f - e)) return;
                          !1 === se.inertia && (d = p - a),
                            n(
                              f,
                              {
                                duration: $(
                                  ps(
                                    (0.185 * Math.max(ps(h - o), ps(p - o))) /
                                      u /
                                      0.05 || 0
                                  )
                                ),
                                ease: se.ease || "power3",
                                data: ps(f - e),
                                onInterrupt: function () {
                                  return R.restart(!0) && y && y(_e);
                                },
                                onComplete: function () {
                                  _e.update(),
                                    (Se = Me()),
                                    (A = L =
                                      i && !he
                                        ? i.totalProgress()
                                        : _e.progress),
                                    ne && ne(_e),
                                    b && b(_e);
                                },
                              },
                              e,
                              d * m,
                              f - e - d * m
                            ),
                            v && v(_e, n.tween);
                        }
                      }
                    })
                    .pause())),
                V && (Ns[V] = _e),
                (N =
                  (K = _e.trigger = nr(K || Z)) &&
                  K._gsap &&
                  K._gsap.stRevert) && (N = N(_e)),
                (Z = !0 === Z ? K : nr(Z)),
                ss(j) && (j = { targets: K, className: j }),
                Z &&
                  (!1 === J ||
                    J === ws ||
                    (J = !(!J && "flex" === Ts(Z.parentNode).display) && bs),
                  (_e.pin = Z),
                  !1 !== t.force3D && dr.set(Z, { force3D: !0 }),
                  (r = dr.core.getCache(Z)).spacer
                    ? (g = r.pinState)
                    : (oe &&
                        ((oe = nr(oe)) &&
                          !oe.nodeType &&
                          (oe = oe.current || oe.nativeElement),
                        (r.spacerIsNative = !!oe),
                        oe && (r.spacerState = da(oe))),
                      (r.spacer = b = oe || fr.createElement("div")),
                      b.classList.add("pin-spacer"),
                      V && b.classList.add("pin-spacer-" + V),
                      (r.pinState = g = da(Z))),
                  (_e.spacer = b = r.spacer),
                  (D = Ts(Z)),
                  (S = D[J + de.os2]),
                  (_ = dr.getProperty(Z)),
                  (x = dr.quickSetter(Z, de.a, xs)),
                  la(Z, b, D),
                  (y = da(Z))),
                be)
              ) {
                (f = ls(be) ? Es(be, ks) : ks),
                  (h = Is("scroller-start", V, pe, de, f, 0)),
                  (p = Is("scroller-end", V, pe, de, f, 0, h)),
                  (w = h["offset" + de.op.d2]);
                var Oe = nr(Vn(pe, "content") || pe);
                (u = this.markerStart = Is("start", V, Oe, de, f, w, 0, le)),
                  (d = this.markerEnd = Is("end", V, Oe, de, f, w, 0, le)),
                  le && (B = dr.quickSetter([u, d], de.a, xs)),
                  ge ||
                    (Gn.length && !0 === Vn(pe, "fixedMarkers")) ||
                    ((Y = Ts((X = me ? gr : pe)).position),
                    (X.style.position =
                      "absolute" === Y || "fixed" === Y ? Y : "relative"),
                    dr.set([h, p], { force3D: !0 }),
                    (M = dr.quickSetter(h, de.a, xs)),
                    (O = dr.quickSetter(p, de.a, xs)));
              }
              if (le) {
                var De = le.vars.onUpdate,
                  Ae = le.vars.onUpdateParams;
                le.eventCallback("onUpdate", function () {
                  _e.update(0, 0, 1), De && De.apply(Ae || []);
                });
              }
              (_e.previous = function () {
                return Bs[Bs.indexOf(_e) - 1];
              }),
                (_e.next = function () {
                  return Bs[Bs.indexOf(_e) + 1];
                }),
                (_e.revert = function (e) {
                  var t = !1 !== e || !_e.enabled,
                    n = Tr;
                  t !== _e.isReverted &&
                    (t &&
                      (_e.scroll.rec || !Tr || !Xr || (_e.scroll.rec = Me()),
                      (I = Math.max(Me(), _e.scroll.rec || 0)),
                      (z = _e.progress),
                      (F = i && i.progress())),
                    u &&
                      [u, d, h, p].forEach(function (e) {
                        return (e.style.display = t ? "none" : "block");
                      }),
                    t && (Tr = 1),
                    _e.update(t),
                    (Tr = n),
                    Z &&
                      (t
                        ? (function (e, t, i) {
                            ua(i);
                            var n = e._gsap;
                            if (n.spacerIsNative) ua(n.spacerState);
                            else if (e.parentNode === t) {
                              var r = t.parentNode;
                              r && (r.insertBefore(e, t), r.removeChild(t));
                            }
                          })(Z, b, g)
                        : (!ae || !_e.isActive) && la(Z, b, Ts(Z), C)),
                    (_e.isReverted = t));
                }),
                (_e.refresh = function (r, s) {
                  if ((!Tr && _e.enabled) || s)
                    if (Z && r && Vr) As(e, "scrollEnd", Ws);
                    else {
                      !Xr && xe && xe(_e),
                        (Tr = 1),
                        (Ce = Hr()),
                        n.tween && (n.tween.kill(), (n.tween = 0)),
                        P && P.pause(),
                        ee && i && i.time(-0.01, !0).invalidate(),
                        _e.isReverted || _e.revert();
                      for (
                        var f,
                          w,
                          x,
                          S,
                          M,
                          O,
                          D,
                          A,
                          L,
                          k,
                          $ = Te(),
                          B = Ee(),
                          N = le ? le.duration() : ns(pe, de),
                          q = 0,
                          X = 0,
                          Y = t.end,
                          G = t.endTrigger || K,
                          H =
                            t.start ||
                            (0 !== t.start && K ? (Z ? "0 0" : "0 100%") : 0),
                          j = (_e.pinnedContainer =
                            t.pinnedContainer && nr(t.pinnedContainer)),
                          V = (K && Math.max(0, Bs.indexOf(_e))) || 0,
                          U = V;
                        U--;

                      )
                        (O = Bs[U]).end || O.refresh(0, 1) || (Tr = 1),
                          !(D = O.pin) ||
                            (D !== K && D !== Z) ||
                            O.isReverted ||
                            (k || (k = []), k.unshift(O), O.revert()),
                          O !== Bs[U] && (V--, U--);
                      for (
                        as(H) && (H = H(_e)),
                          l =
                            pa(H, K, $, de, Me(), u, h, _e, B, we, ge, N, le) ||
                            (Z ? -0.001 : 0),
                          as(Y) && (Y = Y(_e)),
                          ss(Y) &&
                            !Y.indexOf("+=") &&
                            (~Y.indexOf(" ")
                              ? (Y = (ss(H) ? H.split(" ")[0] : "") + Y)
                              : ((q = zs(Y.substr(2), $)),
                                (Y = ss(H) ? H : l + q),
                                (G = K))),
                          c =
                            Math.max(
                              l,
                              pa(
                                Y || (G ? "100% 0" : N),
                                G,
                                $,
                                de,
                                Me() + q,
                                d,
                                p,
                                _e,
                                B,
                                we,
                                ge,
                                N,
                                le
                              )
                            ) || -0.001,
                          m = c - l || ((l -= 0.01) && 0.001),
                          q = 0,
                          U = V;
                        U--;

                      )
                        (D = (O = Bs[U]).pin) &&
                          O.start - O._pinPush < l &&
                          !le &&
                          O.end > 0 &&
                          ((f = O.end - O.start),
                          (D !== K && D !== j) ||
                            os(H) ||
                            (q += f * (1 - O.progress)),
                          D === Z && (X += f));
                      if (
                        ((l += q),
                        (c += q),
                        (_e._pinPush = X),
                        u &&
                          q &&
                          (((f = {})[de.a] = "+=" + q),
                          j && (f[de.p] = "-=" + Me()),
                          dr.set([u, d], f)),
                        Z)
                      )
                        (f = Ts(Z)),
                          (S = de === ir),
                          (x = Me()),
                          (T = parseFloat(_(de.a)) + X),
                          !N &&
                            c > 1 &&
                            ((me ? gr : pe).style["overflow-" + de.a] =
                              "scroll"),
                          la(Z, b, f),
                          (y = da(Z)),
                          (w = Ss(Z, !0)),
                          (A = ge && rr(pe, S ? tr : ir)()),
                          J &&
                            (((C = [J + de.os2, m + X + xs]).t = b),
                            (U = J === bs ? Cs(Z, de) + m + X : 0) &&
                              C.push(de.d, U + xs),
                            ua(C),
                            ge && Me(I)),
                          ge &&
                            (((M = {
                              top: w.top + (S ? x - l : A) + xs,
                              left: w.left + (S ? A : x - l) + xs,
                              boxSizing: "border-box",
                              position: "fixed",
                            }).width = M.maxWidth =
                              Math.ceil(w.width) + xs),
                            (M.height = M.maxHeight = Math.ceil(w.height) + xs),
                            (M.margin =
                              M.marginTop =
                              M.marginRight =
                              M.marginBottom =
                              M.marginLeft =
                                "0"),
                            (M.padding = f.padding),
                            (M.paddingTop = f.paddingTop),
                            (M.paddingRight = f.paddingRight),
                            (M.paddingBottom = f.paddingBottom),
                            (M.paddingLeft = f.paddingLeft),
                            (v = (function (e, t, i) {
                              for (
                                var n, r = [], s = e.length, a = i ? 8 : 0;
                                a < s;
                                a += 2
                              )
                                (n = e[a]), r.push(n, n in t ? t[n] : e[a + 1]);
                              return (r.t = e.t), r;
                            })(g, M, ae))),
                          i
                            ? ((L = i._initted),
                              Lr(1),
                              i.render(i.duration(), !0, !0),
                              (E = _(de.a) - T + m + X),
                              m !== E && ge && v.splice(v.length - 2, 2),
                              i.render(0, !0, !0),
                              L || i.invalidate(),
                              Lr(0))
                            : (E = m);
                      else if (K && Me() && !le)
                        for (w = K.parentNode; w && w !== gr; )
                          w._pinOffset &&
                            ((l -= w._pinOffset), (c -= w._pinOffset)),
                            (w = w.parentNode);
                      k &&
                        k.forEach(function (e) {
                          return e.revert(!1);
                        }),
                        (_e.start = l),
                        (_e.end = c),
                        (a = o = Me()),
                        le || (a < I && Me(I), (_e.scroll.rec = 0)),
                        _e.revert(!1),
                        R &&
                          ((Se = -1),
                          _e.isActive && Me(l + m * z),
                          R.restart(!0)),
                        (Tr = 0),
                        i &&
                          he &&
                          (i._initted || F) &&
                          i.progress() !== F &&
                          i.progress(F, !0).render(i.time(), !0, !0),
                        (z !== _e.progress || le) &&
                          (i && !he && i.totalProgress(z, !0),
                          (_e.progress = z),
                          _e.update(0, 0, 1)),
                        Z && J && (b._pinOffset = Math.round(_e.progress * E)),
                        W && W(_e);
                    }
                }),
                (_e.getVelocity = function () {
                  return ((Me() - o) / (Hr() - _r)) * 1e3 || 0;
                }),
                (_e.endAnimation = function () {
                  ds(_e.callbackAnimation),
                    i &&
                      (P
                        ? P.progress(1)
                        : i.paused()
                        ? he || ds(i, _e.direction < 0, 1)
                        : ds(i, i.reversed()));
                }),
                (_e.labelToScroll = function (e) {
                  return (
                    (i &&
                      i.labels &&
                      (l || _e.refresh() || l) +
                        (i.labels[e] / i.duration()) * m) ||
                    0
                  );
                }),
                (_e.getTrailing = function (e) {
                  var t = Bs.indexOf(_e),
                    i =
                      _e.direction > 0
                        ? Bs.slice(0, t).reverse()
                        : Bs.slice(t + 1);
                  return (
                    ss(e)
                      ? i.filter(function (t) {
                          return t.vars.preventOverlaps === e;
                        })
                      : i
                  ).filter(function (e) {
                    return _e.direction > 0 ? e.end <= l : e.start >= c;
                  });
                }),
                (_e.update = function (e, t, r) {
                  if (!le || r || e) {
                    var s,
                      u,
                      d,
                      p,
                      f,
                      g,
                      w,
                      _ = _e.scroll(),
                      C = e ? 0 : (_ - l) / m,
                      D = C < 0 ? 0 : C > 1 ? 1 : C || 0,
                      k = _e.progress;
                    if (
                      (t &&
                        ((o = a),
                        (a = le ? Me() : _),
                        se &&
                          ((L = A), (A = i && !he ? i.totalProgress() : D))),
                      te &&
                        !D &&
                        Z &&
                        !Tr &&
                        !Gr &&
                        Vr &&
                        l < _ + ((_ - o) / (Hr() - _r)) * te &&
                        (D = 1e-4),
                      D !== k && _e.enabled)
                    ) {
                      if (
                        ((p =
                          (f =
                            (s = _e.isActive = !!D && D < 1) !==
                            (!!k && k < 1)) || !!D != !!k),
                        (_e.direction = D > k ? 1 : -1),
                        (_e.progress = D),
                        p &&
                          !Tr &&
                          ((u = D && !k ? 0 : 1 === D ? 1 : 1 === k ? 2 : 3),
                          he &&
                            ((d =
                              (!f && "none" !== ye[u + 1] && ye[u + 1]) ||
                              ye[u]),
                            (w =
                              i &&
                              ("complete" === d || "reset" === d || d in i)))),
                        ue &&
                          (f || w) &&
                          (w || Q || !i) &&
                          (as(ue)
                            ? ue(_e)
                            : _e.getTrailing(ue).forEach(function (e) {
                                return e.endAnimation();
                              })),
                        he ||
                          (!P || Tr || Gr
                            ? i && i.totalProgress(D, !!Tr)
                            : ((le || (Yr && Yr !== _e)) &&
                                P.render(P._dp._time - P._start),
                              P.resetTo
                                ? P.resetTo(
                                    "totalProgress",
                                    D,
                                    i._tTime / i._tDur
                                  )
                                : ((P.vars.totalProgress = D),
                                  P.invalidate().restart()))),
                        Z)
                      )
                        if ((e && J && (b.style[J + de.os2] = S), ge)) {
                          if (p) {
                            if (
                              ((g =
                                !e &&
                                D > k &&
                                c + 1 > _ &&
                                _ + 1 >= ns(pe, de)),
                              ae)
                            )
                              if (e || (!s && !g)) ma(Z, b);
                              else {
                                var $ = Ss(Z, !0),
                                  z = _ - l;
                                ma(
                                  Z,
                                  gr,
                                  $.top + (de === ir ? z : 0) + xs,
                                  $.left + (de === ir ? 0 : z) + xs
                                );
                              }
                            ua(s || g ? v : y),
                              (E !== m && D < 1 && s) ||
                                x(T + (1 !== D || g ? 0 : E));
                          }
                        } else x(Zr(T + E * D));
                      se && !n.tween && !Tr && !Gr && R.restart(!0),
                        j &&
                          (f || (re && D && (D < 1 || !Fr))) &&
                          br(j.targets).forEach(function (e) {
                            return e.classList[s || re ? "add" : "remove"](
                              j.className
                            );
                          }),
                        H && !he && !e && H(_e),
                        p && !Tr
                          ? (he &&
                              (w &&
                                ("complete" === d
                                  ? i.pause().totalProgress(1)
                                  : "reset" === d
                                  ? i.restart(!0).pause()
                                  : "restart" === d
                                  ? i.restart(!0)
                                  : i[d]()),
                              H && H(_e)),
                            (!f && Fr) ||
                              (U && f && hs(_e, U),
                              ve[u] && hs(_e, ve[u]),
                              re && (1 === D ? _e.kill(!1, 1) : (ve[u] = 0)),
                              f ||
                                (ve[(u = 1 === D ? 1 : 3)] && hs(_e, ve[u]))),
                            ce &&
                              !s &&
                              Math.abs(_e.getVelocity()) >
                                (os(ce) ? ce : 2500) &&
                              (ds(_e.callbackAnimation),
                              P ? P.progress(1) : ds(i, !D, 1)))
                          : he && H && !Tr && H(_e);
                    }
                    if (O) {
                      var I = le
                        ? (_ / le.duration()) * (le._caScrollDist || 0)
                        : _;
                      M(I + (h._isFlipped ? 1 : 0)), O(I);
                    }
                    B && B((-_ / le.duration()) * (le._caScrollDist || 0));
                  }
                }),
                (_e.enable = function (t, i) {
                  _e.enabled ||
                    ((_e.enabled = !0),
                    As(pe, "resize", Gs),
                    As(me ? fr : pe, "scroll", Xs),
                    xe && As(e, "refreshInit", xe),
                    !1 !== t && ((_e.progress = z = 0), (a = o = Se = Me())),
                    !1 !== i && _e.refresh());
                }),
                (_e.getTween = function (e) {
                  return e && n ? n.tween : P;
                }),
                (_e.setPositions = function (e, t) {
                  Z && ((T += e - l), (E += t - e - m)),
                    (_e.start = l = e),
                    (_e.end = c = t),
                    (m = t - e),
                    _e.update();
                }),
                (_e.disable = function (t, i) {
                  if (
                    _e.enabled &&
                    (!1 !== t && _e.revert(),
                    (_e.enabled = _e.isActive = !1),
                    i || (P && P.pause()),
                    (I = 0),
                    r && (r.uncache = 1),
                    xe && Ls(e, "refreshInit", xe),
                    R &&
                      (R.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                    !me)
                  ) {
                    for (var s = Bs.length; s--; )
                      if (Bs[s].scroller === pe && Bs[s] !== _e) return;
                    Ls(pe, "resize", Gs), Ls(pe, "scroll", Xs);
                  }
                }),
                (_e.kill = function (e, n) {
                  _e.disable(e, n), P && !n && P.kill(), V && delete Ns[V];
                  var s = Bs.indexOf(_e);
                  s >= 0 && Bs.splice(s, 1),
                    s === Cr && ra > 0 && Cr--,
                    (s = 0),
                    Bs.forEach(function (e) {
                      return e.scroller === _e.scroller && (s = 1);
                    }),
                    s || (_e.scroll.rec = 0),
                    i &&
                      ((i.scrollTrigger = null),
                      e && i.render(-1),
                      n || i.kill()),
                    u &&
                      [u, d, h, p].forEach(function (e) {
                        return e.parentNode && e.parentNode.removeChild(e);
                      }),
                    Yr === _e && (Yr = 0),
                    Z &&
                      (r && (r.uncache = 1),
                      (s = 0),
                      Bs.forEach(function (e) {
                        return e.pin === Z && s++;
                      }),
                      s || (r.spacer = 0)),
                    t.onKill && t.onKill(_e);
                }),
                _e.enable(!1, !1),
                N && N(_e),
                i && i.add && !m
                  ? dr.delayedCall(0.01, function () {
                      return l || c || _e.refresh();
                    }) &&
                    (m = 0.01) &&
                    (l = c = 0)
                  : _e.refresh();
            } else this.update = this.refresh = this.kill = Kr;
          }),
          (e.register = function (t) {
            return (
              hr ||
                ((dr = t || es()),
                Jr() && window.document && e.enable(),
                (hr = Ur)),
              hr
            );
          }),
          (e.defaults = function (e) {
            if (e) for (var t in e) $s[t] = e[t];
            return $s;
          }),
          (e.disable = function (e, t) {
            (Ur = 0),
              Bs.forEach(function (i) {
                return i[t ? "kill" : "disable"](e);
              }),
              Ls(pr, "wheel", Xs),
              Ls(fr, "scroll", Xs),
              clearInterval(xr),
              Ls(fr, "touchcancel", Kr),
              Ls(gr, "touchstart", Kr),
              Ds(Ls, fr, "pointerdown,touchstart,mousedown", Wr),
              Ds(Ls, fr, "pointerup,touchend,mouseup", Qr),
              yr.kill(),
              rs(Ls);
            for (var i = 0; i < Yn.length; i += 3)
              Ps(Ls, Yn[i], Yn[i + 1]), Ps(Ls, Yn[i], Yn[i + 2]);
          }),
          (e.enable = function () {
            if (
              ((pr = window),
              (fr = document),
              (mr = fr.documentElement),
              (gr = fr.body),
              dr &&
                ((br = dr.utils.toArray),
                (wr = dr.utils.clamp),
                (Lr = dr.core.suppressOverwrites || Kr),
                dr.core.globals("ScrollTrigger", e),
                gr))
            ) {
              (Ur = 1),
                ur.register(dr),
                (e.isTouch = ur.isTouch),
                (Ir =
                  ur.isTouch &&
                  /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                As(pr, "wheel", Xs),
                (vr = [pr, fr, mr, gr]),
                e.matchMedia({
                  "(orientation: portrait)": function () {
                    return Ys(), Ys;
                  },
                }),
                As(fr, "scroll", Xs);
              var t,
                i,
                n = gr.style,
                r = n.borderTopStyle;
              for (
                n.borderTopStyle = "solid",
                  t = Ss(gr),
                  ir.m = Math.round(t.top + ir.sc()) || 0,
                  tr.m = Math.round(t.left + tr.sc()) || 0,
                  r
                    ? (n.borderTopStyle = r)
                    : n.removeProperty("border-top-style"),
                  xr = setInterval(qs, 250),
                  dr.delayedCall(0.5, function () {
                    return (Gr = 0);
                  }),
                  As(fr, "touchcancel", Kr),
                  As(gr, "touchstart", Kr),
                  Ds(As, fr, "pointerdown,touchstart,mousedown", Wr),
                  Ds(As, fr, "pointerup,touchend,mouseup", Qr),
                  Sr = dr.utils.checkPrefix("transform"),
                  oa.push(Sr),
                  hr = Hr(),
                  yr = dr.delayedCall(0.2, ia).pause(),
                  Dr = [
                    fr,
                    "visibilitychange",
                    function () {
                      var e = pr.innerWidth,
                        t = pr.innerHeight;
                      fr.hidden
                        ? ((Mr = e), (Or = t))
                        : (Mr === e && Or === t) || Gs();
                    },
                    fr,
                    "DOMContentLoaded",
                    ia,
                    pr,
                    "load",
                    ia,
                    pr,
                    "resize",
                    Gs,
                  ],
                  rs(As),
                  Bs.forEach(function (e) {
                    return e.enable(0, 1);
                  }),
                  i = 0;
                i < Yn.length;
                i += 3
              )
                Ps(Ls, Yn[i], Yn[i + 1]), Ps(Ls, Yn[i], Yn[i + 2]);
            }
          }),
          (e.config = function (t) {
            "limitCallbacks" in t && (Fr = !!t.limitCallbacks);
            var i = t.syncInterval;
            (i && clearInterval(xr)) || ((xr = i) && setInterval(qs, i)),
              "ignoreMobileResize" in t &&
                ($r = 1 === e.isTouch && t.ignoreMobileResize),
              "autoRefreshEvents" in t &&
                (rs(Ls) || rs(As, t.autoRefreshEvents || "none"),
                (Pr = -1 === (t.autoRefreshEvents + "").indexOf("resize")));
          }),
          (e.scrollerProxy = function (e, t) {
            var i = nr(e),
              n = Yn.indexOf(i),
              r = ts(i);
            ~n && Yn.splice(n, r ? 6 : 2),
              t && (r ? Gn.unshift(pr, t, gr, t, mr, t) : Gn.unshift(i, t));
          }),
          (e.matchMedia = function (e) {
            var t, i, n, r, s;
            for (i in e)
              (n = Vs.indexOf(i)),
                (r = e[i]),
                (Nr = i),
                "all" === i
                  ? r()
                  : (t = pr.matchMedia(i)) &&
                    (t.matches && (s = r()),
                    ~n
                      ? ((Vs[n + 1] = us(Vs[n + 1], r)),
                        (Vs[n + 2] = us(Vs[n + 2], s)))
                      : ((n = Vs.length),
                        Vs.push(i, r, s),
                        t.addListener
                          ? t.addListener(Us)
                          : t.addEventListener("change", Us)),
                    (Vs[n + 3] = t.matches)),
                (Nr = 0);
            return Vs;
          }),
          (e.clearMatchMedia = function (e) {
            e || (Vs.length = 0), (e = Vs.indexOf(e)) >= 0 && Vs.splice(e, 4);
          }),
          (e.isInViewport = function (e, t, i) {
            var n = (ss(e) ? nr(e) : e).getBoundingClientRect(),
              r = n[i ? vs : ys] * t || 0;
            return i
              ? n.right - r > 0 && n.left + r < pr.innerWidth
              : n.bottom - r > 0 && n.top + r < pr.innerHeight;
          }),
          (e.positionInViewport = function (e, t, i) {
            ss(e) && (e = nr(e));
            var n = e.getBoundingClientRect(),
              r = n[i ? vs : ys],
              s =
                null == t
                  ? r / 2
                  : t in Rs
                  ? Rs[t] * r
                  : ~t.indexOf("%")
                  ? (parseFloat(t) * r) / 100
                  : parseFloat(t) || 0;
            return i
              ? (n.left + s) / pr.innerWidth
              : (n.top + s) / pr.innerHeight;
          }),
          e
        );
      })();
    (va.version = "3.10.4"),
      (va.saveStyles = function (e) {
        return e
          ? br(e).forEach(function (e) {
              if (e && e.style) {
                var t = Ks.indexOf(e);
                t >= 0 && Ks.splice(t, 5),
                  Ks.push(
                    e,
                    e.style.cssText,
                    e.getBBox && e.getAttribute("transform"),
                    dr.core.getCache(e),
                    Nr
                  );
              }
            })
          : Ks;
      }),
      (va.revert = function (e, t) {
        return Js(!e, t);
      }),
      (va.create = function (e, t) {
        return new va(e, t);
      }),
      (va.refresh = function (e) {
        return e ? Gs() : (hr || va.register()) && ia(!0);
      }),
      (va.update = sa),
      (va.clearScrollMemory = ea),
      (va.maxScroll = function (e, t) {
        return ns(e, t ? tr : ir);
      }),
      (va.getScrollFunc = function (e, t) {
        return rr(nr(e), t ? tr : ir);
      }),
      (va.getById = function (e) {
        return Ns[e];
      }),
      (va.getAll = function () {
        return Bs.filter(function (e) {
          return "ScrollSmoother" !== e.vars.id;
        });
      }),
      (va.isScrolling = function () {
        return !!Vr;
      }),
      (va.snapDirectional = Os),
      (va.addEventListener = function (e, t) {
        var i = Hs[e] || (Hs[e] = []);
        ~i.indexOf(t) || i.push(t);
      }),
      (va.removeEventListener = function (e, t) {
        var i = Hs[e],
          n = i && i.indexOf(t);
        n >= 0 && i.splice(n, 1);
      }),
      (va.batch = function (e, t) {
        var i,
          n = [],
          r = {},
          s = t.interval || 0.016,
          a = t.batchMax || 1e9,
          o = function (e, t) {
            var i = [],
              n = [],
              r = dr
                .delayedCall(s, function () {
                  t(i, n), (i = []), (n = []);
                })
                .pause();
            return function (e) {
              i.length || r.restart(!0),
                i.push(e.trigger),
                n.push(e),
                a <= i.length && r.progress(1);
            };
          };
        for (i in t)
          r[i] =
            "on" === i.substr(0, 2) && as(t[i]) && "onRefreshInit" !== i
              ? o(0, t[i])
              : t[i];
        return (
          as(a) &&
            ((a = a()),
            As(va, "refresh", function () {
              return (a = t.batchMax());
            })),
          br(e).forEach(function (e) {
            var t = {};
            for (i in r) t[i] = r[i];
            (t.trigger = e), n.push(va.create(t));
          }),
          n
        );
      });
    var ya,
      ba = function (e, t, i, n) {
        return (
          t > n ? e(n) : t < 0 && e(0),
          i > n ? (n - t) / (i - t) : i < 0 ? t / (t - i) : 1
        );
      },
      wa = function e(t, i) {
        !0 === i
          ? t.style.removeProperty("touch-action")
          : (t.style.touchAction =
              !0 === i
                ? "auto"
                : i
                ? "pan-" + i + (ur.isTouch ? " pinch-zoom" : "")
                : "none"),
          t === mr && e(gr, i);
      },
      _a = { auto: 1, scroll: 1 },
      xa = function (e) {
        var t,
          i = e.event,
          n = e.target,
          r = e.axis,
          s = (i.changedTouches ? i.changedTouches[0] : i).target,
          a = s._gsap || dr.core.getCache(s),
          o = Hr();
        if (!a._isScrollT || o - a._isScrollT > 2e3) {
          for (; s && s.scrollHeight <= s.clientHeight; ) s = s.parentNode;
          (a._isScroll =
            s &&
            !ts(s) &&
            s !== n &&
            (_a[(t = Ts(s)).overflowY] || _a[t.overflowX])),
            (a._isScrollT = o);
        }
        (a._isScroll || "x" === r) && (i._gsapAllow = !0);
      },
      Ta = function (e, t, i, n) {
        return ur.create({
          target: e,
          capture: !0,
          debounce: !1,
          lockAxis: !0,
          type: t,
          onWheel: (n = n && xa),
          onPress: n,
          onDrag: n,
          onScroll: n,
          onEnable: function () {
            return i && As(fr, ur.eventTypes[0], Sa, !1, !0);
          },
          onDisable: function () {
            return Ls(fr, ur.eventTypes[0], Sa, !0);
          },
        });
      },
      Ea = /(input|label|select|textarea)/i,
      Sa = function (e) {
        var t = Ea.test(e.target.tagName);
        (t || ya) && ((e._gsapAllow = !0), (ya = t));
      },
      Ca = function (e) {
        ls(e) || (e = {}),
          (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
          e.type || (e.type = "wheel,touch"),
          (e.debounce = !!e.debounce),
          (e.id = e.id || "normalizer");
        var t,
          i,
          n,
          r,
          s,
          a,
          o,
          l,
          c = e,
          u = c.normalizeScrollX,
          d = c.momentum,
          h = c.allowNestedScroll,
          p = nr(e.target) || mr,
          f = dr.core.globals().ScrollSmoother,
          m =
            Ir &&
            ((e.content && nr(e.content)) ||
              (f && f.get() && f.get().content())),
          g = rr(p, ir),
          v = rr(p, tr),
          y = 1,
          b =
            (ur.isTouch && pr.visualViewport
              ? pr.visualViewport.scale * pr.visualViewport.width
              : pr.outerWidth) / pr.innerWidth,
          w = 0,
          _ = as(d)
            ? function () {
                return d(t);
              }
            : function () {
                return d || 2.8;
              },
          x = Ta(p, e.type, !0, h),
          T = function () {
            return (n = !1);
          },
          E = Kr,
          S = Kr,
          C = function () {
            (i = ns(p, ir)),
              (S = wr(Ir ? 1 : 0, i)),
              u && (E = wr(0, ns(p, tr))),
              (r = ta);
          },
          M = function () {
            C(),
              s.isActive() &&
                s.vars.scrollY > i &&
                (g() > i ? s.progress(1) && g(i) : s.resetTo("scrollY", i));
          };
        return (
          (e.ignoreCheck = function (e) {
            return (
              (Ir &&
                "touchmove" === e.type &&
                (function () {
                  if (n) {
                    requestAnimationFrame(T);
                    var e = Zr(t.deltaY / 2),
                      i = S(g.v - e);
                    return (
                      m &&
                        i !== g.v + g.offset &&
                        ((g.offset = i - g.v),
                        (m.style.transform = "translateY(" + -g.offset + "px)"),
                        m._gsap && (m._gsap.y = -g.offset + "px"),
                        (g.cacheID = Yn.cache),
                        sa()),
                      !0
                    );
                  }
                  m &&
                    ((m.style.transform = "translateY(0px)"),
                    (g.offset = g.cacheID = 0),
                    m._gsap && (m._gsap.y = "0px")),
                    (n = !0);
                })()) ||
              (y > 1.05 && "touchstart" !== e.type) ||
              t.isGesturing ||
              (e.touches && e.touches.length > 1)
            );
          }),
          (e.onPress = function () {
            var e = y;
            (y = Zr(((pr.visualViewport && pr.visualViewport.scale) || 1) / b)),
              s.pause(),
              e !== y && wa(p, y > 1.01 || (!u && "x")),
              (n = !1),
              (a = v()),
              (o = g()),
              C(),
              (r = ta);
          }),
          (e.onRelease = e.onGestureStart =
            function (e, t) {
              if (
                (m &&
                  ((m.style.transform = "translateY(0px)"),
                  (g.offset = g.cacheID = 0),
                  m._gsap && (m._gsap.y = "0px")),
                t)
              ) {
                Yn.cache++;
                var n,
                  r,
                  a = _();
                u &&
                  ((r = (n = v()) + (0.05 * a * -e.velocityX) / 0.227),
                  (a *= ba(v, n, r, ns(p, tr))),
                  (s.vars.scrollX = E(r))),
                  (r = (n = g()) + (0.05 * a * -e.velocityY) / 0.227),
                  (a *= ba(g, n, r, ns(p, ir))),
                  (s.vars.scrollY = S(r)),
                  s.invalidate().duration(a).play(0.01),
                  ((Ir && s.vars.scrollY >= i) || n >= i - 1) &&
                    dr.to({}, { onUpdate: M, duration: a });
              } else l.restart(!0);
            }),
          (e.onWheel = function () {
            s._ts && s.pause(), Hr() - w > 1e3 && ((r = 0), (w = Hr()));
          }),
          (e.onChange = function (e, t, i, n, s) {
            ta !== r && C(),
              t &&
                u &&
                v(E(n[2] === t ? a + (e.startX - e.x) : v() + t - n[1])),
              i && g(S(s[2] === i ? o + (e.startY - e.y) : g() + i - s[1])),
              sa();
          }),
          (e.onEnable = function () {
            wa(p, !u && "x"), As(pr, "resize", M), x.enable();
          }),
          (e.onDisable = function () {
            wa(p, !0), Ls(pr, "resize", M), x.kill();
          }),
          ((t = new ur(e)).iOS = Ir),
          Ir && !g() && g(1),
          (l = t._dc),
          (s = dr.to(t, {
            ease: "power4",
            paused: !0,
            scrollX: u ? "+=0.1" : "+=0",
            scrollY: "+=0.1",
            onComplete: l.vars.onComplete,
          })),
          t
        );
      };
    (va.sort = function (e) {
      return Bs.sort(
        e ||
          function (e, t) {
            return (
              -1e6 * (e.vars.refreshPriority || 0) +
              e.start -
              (t.start + -1e6 * (t.vars.refreshPriority || 0))
            );
          }
      );
    }),
      (va.observe = function (e) {
        return new ur(e);
      }),
      (va.normalizeScroll = function (e) {
        if (void 0 === e) return kr;
        if (!0 === e && kr) return kr.enable();
        if (!1 === e) return kr && kr.kill();
        var t = e instanceof ur ? e : Ca(e);
        return (
          kr && kr.target === t.target && kr.kill(), ts(t.target) && (kr = t), t
        );
      }),
      (va.core = {
        _getVelocityProp: sr,
        _inputObserver: Ta,
        _scrollers: Yn,
        _proxies: Gn,
        bridge: {
          ss: function () {
            Vr || Qs("scrollStart"), (Vr = Hr());
          },
          ref: function () {
            return Tr;
          },
        },
      }),
      es() && dr.registerPlugin(va);
    class Ma {
      constructor(e) {
        (this.DOM = {
          el: e,
          hamburger: e.querySelector("#hamburger"),
          nav: e.querySelector("nav"),
          hamburgerLines: [...e.querySelectorAll("#hamburger .icon span")],
        }),
          (this.hamburgerTl = Cn.timeline({
            paused: !0,
            defaults: { duration: 0.5, ease: "power2.inOut" },
          })
            .to(this.DOM.hamburgerLines[0], { y: 0 }, "<=")
            .to(this.DOM.hamburgerLines[2], { y: 0 }, "<=")
            .set(this.DOM.hamburgerLines[1], { opacity: 0 })
            .to(this.DOM.hamburgerLines[0], { rotate: 45 })
            .to(this.DOM.hamburgerLines[2], { rotate: -45 }, "<=")
            .reverse()),
          (this.active = !1),
          (this.play = !1),
          this.initEvents();
      }
      initEvents() {
        this.DOM.hamburger.addEventListener("click", () => {
          this.play ||
            ((this.play = !0), this.active ? this.closeNav() : this.openNav());
        }),
          [...this.DOM.el.querySelectorAll("nav .icon")].forEach((e) => {
            e.addEventListener("click", () => {
              e.classList.contains("active")
                ? (e.classList.remove("active"),
                  Cn.to(e.nextSibling.nextSibling, { height: 0 }))
                : (e.classList.add("active"),
                  Cn.to(e.nextSibling.nextSibling, { height: "auto" }));
            });
          });
      }
      openNav() {
        Cn.fromTo(
          ".nav-wrapper > .column > div",
          { y: "2em", opacity: 0 },
          {
            y: "0",
            opacity: 1,
            duration: 0.5,
            delay: 0.6,
            stagger: { each: 0.15 },
            onComplete: () => {
              this.play = !1;
            },
            clearProps: "y",
          }
        ),
          this.DOM.hamburger.classList.add("active"),
          this.hamburgerTl.reversed(!1),
          Cn.to(this.DOM.nav, { duration: 1, y: "0%", ease: "power2.inOut" }),
          (this.active = !this.active);
      }
      closeNav() {
        this.DOM.hamburger.classList.remove("active"),
          this.hamburgerTl.reversed(!0),
          Cn.timeline()
            .to(this.DOM.nav, {
              duration: 1,
              y: "-100%",
              ease: "power4.inOut",
              onComplete: () => {
                Cn.utils.toArray("nav .icon").forEach((e) => {
                  e.classList.remove("active");
                }),
                  Cn.set("nav .icon + .column", { height: 0 }),
                  (this.play = !1);
              },
            })
            .set(this.DOM.nav, { x: "0%", y: "-100%" }),
          (this.active = !this.active);
      }
    }
    Cn.registerPlugin(va);
    var Oa = i(41),
      Da = i.n(Oa);
    class Aa {
      constructor(e) {
        (this.DOM = { el: e, lines: [...e.querySelectorAll(".title--line")] }),
          (this.active = 0),
          (this.config = { staggerValue: 0.014, charsDuration: 0.6 }),
          (this.timeline = Cn.timeline()),
          (this.observer = new IntersectionObserver(
            (e) => {
              e.forEach((e) => {
                e.intersectionRatio > 0
                  ? this.timeline.play()
                  : this.timeline.pause();
              });
            },
            { threshold: 0 }
          )),
          this.observer.observe(this.DOM.el),
          this.animateTitle();
      }
      animateTitle() {
        const e = this.DOM.lines[this.active % this.DOM.lines.length],
          t = e.querySelectorAll(".char");
        this.active++;
        const i = this.DOM.lines[this.active % this.DOM.lines.length],
          n = i.querySelectorAll(".char");
        this.timeline = Cn.timeline({ delay: 2 })
          .addLabel("start")
          .to(
            t,
            {
              ease: "Power3.easeIn",
              y: "-100%",
              opacity: 0,
              stagger: { each: this.config.staggerValue },
              duration: this.config.charsDuration,
            },
            "start"
          )
          .addLabel("switchtime")
          .set(n, { y: "100%", opacity: 0 })
          .add(() => {
            (e.style.display = "none"), (i.style.display = "block");
          })
          .to(n, {
            ease: "Power3.easeOut",
            y: "0%",
            opacity: 1,
            stagger: { each: this.config.staggerValue, from: "end" },
            duration: this.config.charsDuration,
            onComplete: () => {
              this.animateTitle();
            },
          });
      }
    }
    class La {
      constructor(e, t) {
        (this.DOM = { el: e, title: e.querySelector(".title-gradient") }),
          (this.smoke = t),
          this.initColors(),
          this.initEvents();
      }
      initColors() {
        (this.color = getComputedStyle(this.DOM.el)
          .getPropertyValue("--color")
          .replace(/\s/g, "")),
          (this.gradientColor = getComputedStyle(this.DOM.el)
            .getPropertyValue("--gradient")
            .replace(/\s/g, ""));
        const e = this.color
          .substring(this.color.indexOf("(") + 1, this.color.indexOf(")"))
          .split(",");
        this.smokeColor = {
          r: (parseInt(e[0], 10) / 255) * 0.15,
          g: (parseInt(e[1], 10) / 255) * 0.15,
          b: (parseInt(e[2], 10) / 255) * 0.15,
        };
      }
      initEvents() {
        this.DOM.el.addEventListener("mouseenter", () => {
          this.smoke.color = this.smokeColor;
        }),
          this.DOM.title.addEventListener("mouseenter", () => {
            this.gradient("#FFF", "#FFF");
          }),
          this.DOM.title.addEventListener("mousemove", () => {
            const e = this.DOM.title.getBoundingClientRect();
            (this.progress = ((yl.x - e.left) / e.width) * 100),
              this.gradient(this.color, this.gradientColor);
          }),
          this.DOM.title.addEventListener("mouseleave", () => {
            this.gradient("#FFF", "#FFF");
          }),
          this.DOM.el.addEventListener("mouseleave", () => {
            this.smoke.color = null;
          });
      }
      gradient(e, t) {
        Cn.to(this.DOM.title, {
          backgroundImage: `linear-gradient(154deg, ${e} ${this.progress}%, ${t} 97.65%)`,
        });
      }
    }
    class Pa {
      constructor(e) {
        (this.counters = []),
          (this.DOM = { el: e, counters: e.querySelectorAll(".counter") }),
          this.DOM.counters.forEach((e) => {
            this.counters.push(new ka(e));
          }),
          this.addIntersection();
      }
      addIntersection() {
        (this.observer = new IntersectionObserver(
          (e) => {
            e.forEach((e) => {
              e.intersectionRatio > 0 &&
                (this.counters.forEach((e) => {
                  e.updateCount();
                }),
                this.observer.unobserve(this.DOM.el));
            });
          },
          { threshold: 0.5 }
        )),
          this.observer.observe(this.DOM.el);
      }
    }
    class ka {
      constructor(e) {
        (this.duration = 2e3),
          (this.DOM = { el: e }),
          (this.target = +this.DOM.el.getAttribute("data-target")),
          (this.DOM.el.innerText = "0");
      }
      updateCount() {
        let e = null;
        Date.now();
        const t = (i) => {
          e || (e = i);
          const n = Math.min((i - e) / this.duration, 1);
          (this.DOM.el.innerText = Math.floor(n * this.target)),
            n < 1
              ? (this.frame = window.requestAnimationFrame(t))
              : window.cancelAnimationFrame(this.frame);
        };
        this.frame = window.requestAnimationFrame(t);
      }
    }
    function $a(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function Ra(e = {}, t = {}) {
      Object.keys(t).forEach((i) => {
        void 0 === e[i]
          ? (e[i] = t[i])
          : $a(t[i]) &&
            $a(e[i]) &&
            Object.keys(t[i]).length > 0 &&
            Ra(e[i], t[i]);
      });
    }
    const za = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function Ia() {
      const e = "undefined" != typeof document ? document : {};
      return Ra(e, za), e;
    }
    const Fa = {
      document: za,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function Ba() {
      const e = "undefined" != typeof window ? window : {};
      return Ra(e, Fa), e;
    }
    class Na extends Array {
      constructor(e) {
        "number" == typeof e
          ? super(e)
          : (super(...(e || [])),
            (function (e) {
              const t = e.__proto__;
              Object.defineProperty(e, "__proto__", {
                get: () => t,
                set(e) {
                  t.__proto__ = e;
                },
              });
            })(this));
      }
    }
    function qa(e = []) {
      const t = [];
      return (
        e.forEach((e) => {
          Array.isArray(e) ? t.push(...qa(e)) : t.push(e);
        }),
        t
      );
    }
    function Xa(e, t) {
      return Array.prototype.filter.call(e, t);
    }
    function Ya(e, t) {
      const i = Ba(),
        n = Ia();
      let r = [];
      if (!t && e instanceof Na) return e;
      if (!e) return new Na(r);
      if ("string" == typeof e) {
        const i = e.trim();
        if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
          let e = "div";
          0 === i.indexOf("<li") && (e = "ul"),
            0 === i.indexOf("<tr") && (e = "tbody"),
            (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
            0 === i.indexOf("<tbody") && (e = "table"),
            0 === i.indexOf("<option") && (e = "select");
          const t = n.createElement(e);
          t.innerHTML = i;
          for (let e = 0; e < t.childNodes.length; e += 1)
            r.push(t.childNodes[e]);
        } else
          r = (function (e, t) {
            if ("string" != typeof e) return [e];
            const i = [],
              n = t.querySelectorAll(e);
            for (let e = 0; e < n.length; e += 1) i.push(n[e]);
            return i;
          })(e.trim(), t || n);
      } else if (e.nodeType || e === i || e === n) r.push(e);
      else if (Array.isArray(e)) {
        if (e instanceof Na) return e;
        r = e;
      }
      return new Na(
        (function (e) {
          const t = [];
          for (let i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
          return t;
        })(r)
      );
    }
    Ya.fn = Na.prototype;
    const Ga = "resize scroll".split(" ");
    function Ha(e) {
      return function (...t) {
        if (void 0 === t[0]) {
          for (let t = 0; t < this.length; t += 1)
            Ga.indexOf(e) < 0 &&
              (e in this[t] ? this[t][e]() : Ya(this[t]).trigger(e));
          return this;
        }
        return this.on(e, ...t);
      };
    }
    Ha("click"),
      Ha("blur"),
      Ha("focus"),
      Ha("focusin"),
      Ha("focusout"),
      Ha("keyup"),
      Ha("keydown"),
      Ha("keypress"),
      Ha("submit"),
      Ha("change"),
      Ha("mousedown"),
      Ha("mousemove"),
      Ha("mouseup"),
      Ha("mouseenter"),
      Ha("mouseleave"),
      Ha("mouseout"),
      Ha("mouseover"),
      Ha("touchstart"),
      Ha("touchend"),
      Ha("touchmove"),
      Ha("resize"),
      Ha("scroll");
    const ja = {
      addClass: function (...e) {
        const t = qa(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.add(...t);
          }),
          this
        );
      },
      removeClass: function (...e) {
        const t = qa(e.map((e) => e.split(" ")));
        return (
          this.forEach((e) => {
            e.classList.remove(...t);
          }),
          this
        );
      },
      hasClass: function (...e) {
        const t = qa(e.map((e) => e.split(" ")));
        return (
          Xa(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
            .length > 0
        );
      },
      toggleClass: function (...e) {
        const t = qa(e.map((e) => e.split(" ")));
        this.forEach((e) => {
          t.forEach((t) => {
            e.classList.toggle(t);
          });
        });
      },
      attr: function (e, t) {
        if (1 === arguments.length && "string" == typeof e)
          return this[0] ? this[0].getAttribute(e) : void 0;
        for (let i = 0; i < this.length; i += 1)
          if (2 === arguments.length) this[i].setAttribute(e, t);
          else
            for (const t in e)
              (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
        return this;
      },
      removeAttr: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
        return this;
      },
      transform: function (e) {
        for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
        return this;
      },
      transition: function (e) {
        for (let t = 0; t < this.length; t += 1)
          this[t].style.transitionDuration =
            "string" != typeof e ? `${e}ms` : e;
        return this;
      },
      on: function (...e) {
        let [t, i, n, r] = e;
        function s(e) {
          const t = e.target;
          if (!t) return;
          const r = e.target.dom7EventData || [];
          if ((r.indexOf(e) < 0 && r.unshift(e), Ya(t).is(i))) n.apply(t, r);
          else {
            const e = Ya(t).parents();
            for (let t = 0; t < e.length; t += 1)
              Ya(e[t]).is(i) && n.apply(e[t], r);
          }
        }
        function a(e) {
          const t = (e && e.target && e.target.dom7EventData) || [];
          t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
        }
        "function" == typeof e[1] && (([t, n, r] = e), (i = void 0)),
          r || (r = !1);
        const o = t.split(" ");
        let l;
        for (let e = 0; e < this.length; e += 1) {
          const t = this[e];
          if (i)
            for (l = 0; l < o.length; l += 1) {
              const e = o[l];
              t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                t.dom7LiveListeners[e].push({ listener: n, proxyListener: s }),
                t.addEventListener(e, s, r);
            }
          else
            for (l = 0; l < o.length; l += 1) {
              const e = o[l];
              t.dom7Listeners || (t.dom7Listeners = {}),
                t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                t.dom7Listeners[e].push({ listener: n, proxyListener: a }),
                t.addEventListener(e, a, r);
            }
        }
        return this;
      },
      off: function (...e) {
        let [t, i, n, r] = e;
        "function" == typeof e[1] && (([t, n, r] = e), (i = void 0)),
          r || (r = !1);
        const s = t.split(" ");
        for (let e = 0; e < s.length; e += 1) {
          const t = s[e];
          for (let e = 0; e < this.length; e += 1) {
            const s = this[e];
            let a;
            if (
              (!i && s.dom7Listeners
                ? (a = s.dom7Listeners[t])
                : i && s.dom7LiveListeners && (a = s.dom7LiveListeners[t]),
              a && a.length)
            )
              for (let e = a.length - 1; e >= 0; e -= 1) {
                const i = a[e];
                (n && i.listener === n) ||
                (n &&
                  i.listener &&
                  i.listener.dom7proxy &&
                  i.listener.dom7proxy === n)
                  ? (s.removeEventListener(t, i.proxyListener, r),
                    a.splice(e, 1))
                  : n ||
                    (s.removeEventListener(t, i.proxyListener, r),
                    a.splice(e, 1));
              }
          }
        }
        return this;
      },
      trigger: function (...e) {
        const t = Ba(),
          i = e[0].split(" "),
          n = e[1];
        for (let r = 0; r < i.length; r += 1) {
          const s = i[r];
          for (let i = 0; i < this.length; i += 1) {
            const r = this[i];
            if (t.CustomEvent) {
              const i = new t.CustomEvent(s, {
                detail: n,
                bubbles: !0,
                cancelable: !0,
              });
              (r.dom7EventData = e.filter((e, t) => t > 0)),
                r.dispatchEvent(i),
                (r.dom7EventData = []),
                delete r.dom7EventData;
            }
          }
        }
        return this;
      },
      transitionEnd: function (e) {
        const t = this;
        return (
          e &&
            t.on("transitionend", function i(n) {
              n.target === this && (e.call(this, n), t.off("transitionend", i));
            }),
          this
        );
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(e.getPropertyValue("margin-right")) +
              parseFloat(e.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            const e = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(e.getPropertyValue("margin-top")) +
              parseFloat(e.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      styles: function () {
        const e = Ba();
        return this[0] ? e.getComputedStyle(this[0], null) : {};
      },
      offset: function () {
        if (this.length > 0) {
          const e = Ba(),
            t = Ia(),
            i = this[0],
            n = i.getBoundingClientRect(),
            r = t.body,
            s = i.clientTop || r.clientTop || 0,
            a = i.clientLeft || r.clientLeft || 0,
            o = i === e ? e.scrollY : i.scrollTop,
            l = i === e ? e.scrollX : i.scrollLeft;
          return { top: n.top + o - s, left: n.left + l - a };
        }
        return null;
      },
      css: function (e, t) {
        const i = Ba();
        let n;
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (n = 0; n < this.length; n += 1)
              for (const t in e) this[n].style[t] = e[t];
            return this;
          }
          if (this[0])
            return i.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (n = 0; n < this.length; n += 1) this[n].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        return e
          ? (this.forEach((t, i) => {
              e.apply(t, [t, i]);
            }),
            this)
          : this;
      },
      html: function (e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : null;
        for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
        return this;
      },
      text: function (e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
        return this;
      },
      is: function (e) {
        const t = Ba(),
          i = Ia(),
          n = this[0];
        let r, s;
        if (!n || void 0 === e) return !1;
        if ("string" == typeof e) {
          if (n.matches) return n.matches(e);
          if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
          if (n.msMatchesSelector) return n.msMatchesSelector(e);
          for (r = Ya(e), s = 0; s < r.length; s += 1)
            if (r[s] === n) return !0;
          return !1;
        }
        if (e === i) return n === i;
        if (e === t) return n === t;
        if (e.nodeType || e instanceof Na) {
          for (r = e.nodeType ? [e] : e, s = 0; s < r.length; s += 1)
            if (r[s] === n) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        let e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        const t = this.length;
        if (e > t - 1) return Ya([]);
        if (e < 0) {
          const i = t + e;
          return Ya(i < 0 ? [] : [this[i]]);
        }
        return Ya([this[e]]);
      },
      append: function (...e) {
        let t;
        const i = Ia();
        for (let n = 0; n < e.length; n += 1) {
          t = e[n];
          for (let e = 0; e < this.length; e += 1)
            if ("string" == typeof t) {
              const n = i.createElement("div");
              for (n.innerHTML = t; n.firstChild; )
                this[e].appendChild(n.firstChild);
            } else if (t instanceof Na)
              for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
            else this[e].appendChild(t);
        }
        return this;
      },
      prepend: function (e) {
        const t = Ia();
        let i, n;
        for (i = 0; i < this.length; i += 1)
          if ("string" == typeof e) {
            const r = t.createElement("div");
            for (r.innerHTML = e, n = r.childNodes.length - 1; n >= 0; n -= 1)
              this[i].insertBefore(r.childNodes[n], this[i].childNodes[0]);
          } else if (e instanceof Na)
            for (n = 0; n < e.length; n += 1)
              this[i].insertBefore(e[n], this[i].childNodes[0]);
          else this[i].insertBefore(e, this[i].childNodes[0]);
        return this;
      },
      next: function (e) {
        return this.length > 0
          ? e
            ? this[0].nextElementSibling && Ya(this[0].nextElementSibling).is(e)
              ? Ya([this[0].nextElementSibling])
              : Ya([])
            : this[0].nextElementSibling
            ? Ya([this[0].nextElementSibling])
            : Ya([])
          : Ya([]);
      },
      nextAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return Ya([]);
        for (; i.nextElementSibling; ) {
          const n = i.nextElementSibling;
          e ? Ya(n).is(e) && t.push(n) : t.push(n), (i = n);
        }
        return Ya(t);
      },
      prev: function (e) {
        if (this.length > 0) {
          const t = this[0];
          return e
            ? t.previousElementSibling && Ya(t.previousElementSibling).is(e)
              ? Ya([t.previousElementSibling])
              : Ya([])
            : t.previousElementSibling
            ? Ya([t.previousElementSibling])
            : Ya([]);
        }
        return Ya([]);
      },
      prevAll: function (e) {
        const t = [];
        let i = this[0];
        if (!i) return Ya([]);
        for (; i.previousElementSibling; ) {
          const n = i.previousElementSibling;
          e ? Ya(n).is(e) && t.push(n) : t.push(n), (i = n);
        }
        return Ya(t);
      },
      parent: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1)
          null !== this[i].parentNode &&
            (e
              ? Ya(this[i].parentNode).is(e) && t.push(this[i].parentNode)
              : t.push(this[i].parentNode));
        return Ya(t);
      },
      parents: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          let n = this[i].parentNode;
          for (; n; )
            e ? Ya(n).is(e) && t.push(n) : t.push(n), (n = n.parentNode);
        }
        return Ya(t);
      },
      closest: function (e) {
        let t = this;
        return void 0 === e ? Ya([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const n = this[i].querySelectorAll(e);
          for (let e = 0; e < n.length; e += 1) t.push(n[e]);
        }
        return Ya(t);
      },
      children: function (e) {
        const t = [];
        for (let i = 0; i < this.length; i += 1) {
          const n = this[i].children;
          for (let i = 0; i < n.length; i += 1)
            (e && !Ya(n[i]).is(e)) || t.push(n[i]);
        }
        return Ya(t);
      },
      filter: function (e) {
        return Ya(Xa(this, e));
      },
      remove: function () {
        for (let e = 0; e < this.length; e += 1)
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        return this;
      },
    };
    Object.keys(ja).forEach((e) => {
      Object.defineProperty(Ya.fn, e, { value: ja[e], writable: !0 });
    });
    const Va = Ya;
    function Ua(e, t) {
      return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function Wa() {
      return Date.now();
    }
    function Qa(e, t) {
      void 0 === t && (t = "x");
      const i = Ba();
      let n, r, s;
      const a = (function (e) {
        const t = Ba();
        let i;
        return (
          t.getComputedStyle && (i = t.getComputedStyle(e, null)),
          !i && e.currentStyle && (i = e.currentStyle),
          i || (i = e.style),
          i
        );
      })(e);
      return (
        i.WebKitCSSMatrix
          ? ((r = a.transform || a.webkitTransform),
            r.split(",").length > 6 &&
              (r = r
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (s = new i.WebKitCSSMatrix("none" === r ? "" : r)))
          : ((s =
              a.MozTransform ||
              a.OTransform ||
              a.MsTransform ||
              a.msTransform ||
              a.transform ||
              a
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (n = s.toString().split(","))),
        "x" === t &&
          (r = i.WebKitCSSMatrix
            ? s.m41
            : 16 === n.length
            ? parseFloat(n[12])
            : parseFloat(n[4])),
        "y" === t &&
          (r = i.WebKitCSSMatrix
            ? s.m42
            : 16 === n.length
            ? parseFloat(n[13])
            : parseFloat(n[5])),
        r || 0
      );
    }
    function Ka(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function Za(e) {
      return "undefined" != typeof window && void 0 !== window.HTMLElement
        ? e instanceof HTMLElement
        : e && (1 === e.nodeType || 11 === e.nodeType);
    }
    function Ja() {
      const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
        t = ["__proto__", "constructor", "prototype"];
      for (let i = 1; i < arguments.length; i += 1) {
        const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (null != n && !Za(n)) {
          const i = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
          for (let t = 0, r = i.length; t < r; t += 1) {
            const r = i[t],
              s = Object.getOwnPropertyDescriptor(n, r);
            void 0 !== s &&
              s.enumerable &&
              (Ka(e[r]) && Ka(n[r])
                ? n[r].__swiper__
                  ? (e[r] = n[r])
                  : Ja(e[r], n[r])
                : !Ka(e[r]) && Ka(n[r])
                ? ((e[r] = {}),
                  n[r].__swiper__ ? (e[r] = n[r]) : Ja(e[r], n[r]))
                : (e[r] = n[r]));
          }
        }
      }
      return e;
    }
    function eo(e, t, i) {
      e.style.setProperty(t, i);
    }
    function to(e) {
      let { swiper: t, targetPosition: i, side: n } = e;
      const r = Ba(),
        s = -t.translate;
      let a,
        o = null;
      const l = t.params.speed;
      (t.wrapperEl.style.scrollSnapType = "none"),
        r.cancelAnimationFrame(t.cssModeFrameID);
      const c = i > s ? "next" : "prev",
        u = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
        d = () => {
          (a = new Date().getTime()), null === o && (o = a);
          const e = Math.max(Math.min((a - o) / l, 1), 0),
            c = 0.5 - Math.cos(e * Math.PI) / 2;
          let h = s + c * (i - s);
          if ((u(h, i) && (h = i), t.wrapperEl.scrollTo({ [n]: h }), u(h, i)))
            return (
              (t.wrapperEl.style.overflow = "hidden"),
              (t.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (t.wrapperEl.style.overflow = ""),
                  t.wrapperEl.scrollTo({ [n]: h });
              }),
              void r.cancelAnimationFrame(t.cssModeFrameID)
            );
          t.cssModeFrameID = r.requestAnimationFrame(d);
        };
      d();
    }
    let io, no, ro;
    function so() {
      return (
        io ||
          (io = (function () {
            const e = Ba(),
              t = Ia();
            return {
              smoothScroll:
                t.documentElement &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
              passiveListener: (function () {
                let t = !1;
                try {
                  const i = Object.defineProperty({}, "passive", {
                    get() {
                      t = !0;
                    },
                  });
                  e.addEventListener("testPassiveListener", null, i);
                } catch (e) {}
                return t;
              })(),
              gestures: "ongesturestart" in e,
            };
          })()),
        io
      );
    }
    function ao(e) {
      return (
        void 0 === e && (e = {}),
        no ||
          (no = (function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const i = so(),
              n = Ba(),
              r = n.navigator.platform,
              s = t || n.navigator.userAgent,
              a = { ios: !1, android: !1 },
              o = n.screen.width,
              l = n.screen.height,
              c = s.match(/(Android);?[\s\/]+([\d.]+)?/);
            let u = s.match(/(iPad).*OS\s([\d_]+)/);
            const d = s.match(/(iPod)(.*OS\s([\d_]+))?/),
              h = !u && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              p = "Win32" === r;
            let f = "MacIntel" === r;
            return (
              !u &&
                f &&
                i.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${o}x${l}`) >= 0 &&
                ((u = s.match(/(Version)\/([\d.]+)/)),
                u || (u = [0, 1, "13_0_0"]),
                (f = !1)),
              c && !p && ((a.os = "android"), (a.android = !0)),
              (u || h || d) && ((a.os = "ios"), (a.ios = !0)),
              a
            );
          })(e)),
        no
      );
    }
    function oo() {
      return (
        ro ||
          (ro = (function () {
            const e = Ba();
            return {
              isSafari: (function () {
                const t = e.navigator.userAgent.toLowerCase();
                return (
                  t.indexOf("safari") >= 0 &&
                  t.indexOf("chrome") < 0 &&
                  t.indexOf("android") < 0
                );
              })(),
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
            };
          })()),
        ro
      );
    }
    const lo = {
      on(e, t, i) {
        const n = this;
        if (!n.eventsListeners || n.destroyed) return n;
        if ("function" != typeof t) return n;
        const r = i ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            n.eventsListeners[e] || (n.eventsListeners[e] = []),
              n.eventsListeners[e][r](t);
          }),
          n
        );
      },
      once(e, t, i) {
        const n = this;
        if (!n.eventsListeners || n.destroyed) return n;
        if ("function" != typeof t) return n;
        function r() {
          n.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
          for (var i = arguments.length, s = new Array(i), a = 0; a < i; a++)
            s[a] = arguments[a];
          t.apply(n, s);
        }
        return (r.__emitterProxy = t), n.on(e, r, i);
      },
      onAny(e, t) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof e) return i;
        const n = t ? "unshift" : "push";
        return (
          i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[n](e), i
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const i = t.eventsAnyListeners.indexOf(e);
        return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
      },
      off(e, t) {
        const i = this;
        return !i.eventsListeners || i.destroyed
          ? i
          : i.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (i.eventsListeners[e] = [])
                : i.eventsListeners[e] &&
                  i.eventsListeners[e].forEach((n, r) => {
                    (n === t || (n.__emitterProxy && n.__emitterProxy === t)) &&
                      i.eventsListeners[e].splice(r, 1);
                  });
            }),
            i)
          : i;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners || e.destroyed) return e;
        if (!e.eventsListeners) return e;
        let t, i, n;
        for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
          s[a] = arguments[a];
        "string" == typeof s[0] || Array.isArray(s[0])
          ? ((t = s[0]), (i = s.slice(1, s.length)), (n = e))
          : ((t = s[0].events), (i = s[0].data), (n = s[0].context || e)),
          i.unshift(n);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(n, [t, ...i]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(n, i);
                });
          }),
          e
        );
      },
    };
    const co = {
      updateSize: function () {
        const e = this;
        let t, i;
        const n = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : n[0].clientWidth),
          (i =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : n[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === i && e.isVertical()) ||
            ((t =
              t -
              parseInt(n.css("padding-left") || 0, 10) -
              parseInt(n.css("padding-right") || 0, 10)),
            (i =
              i -
              parseInt(n.css("padding-top") || 0, 10) -
              parseInt(n.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(i) && (i = 0),
            Object.assign(e, {
              width: t,
              height: i,
              size: e.isHorizontal() ? t : i,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function i(e, i) {
          return parseFloat(e.getPropertyValue(t(i)) || 0);
        }
        const n = e.params,
          { $wrapperEl: r, size: s, rtlTranslate: a, wrongRTL: o } = e,
          l = e.virtual && n.virtual.enabled,
          c = l ? e.virtual.slides.length : e.slides.length,
          u = r.children(`.${e.params.slideClass}`),
          d = l ? e.virtual.slides.length : u.length;
        let h = [];
        const p = [],
          f = [];
        let m = n.slidesOffsetBefore;
        "function" == typeof m && (m = n.slidesOffsetBefore.call(e));
        let g = n.slidesOffsetAfter;
        "function" == typeof g && (g = n.slidesOffsetAfter.call(e));
        const v = e.snapGrid.length,
          y = e.slidesGrid.length;
        let b = n.spaceBetween,
          w = -m,
          _ = 0,
          x = 0;
        if (void 0 === s) return;
        "string" == typeof b &&
          b.indexOf("%") >= 0 &&
          (b = (parseFloat(b.replace("%", "")) / 100) * s),
          (e.virtualSize = -b),
          a
            ? u.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : u.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          n.centeredSlides &&
            n.cssMode &&
            (eo(e.wrapperEl, "--swiper-centered-offset-before", ""),
            eo(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const T = n.grid && n.grid.rows > 1 && e.grid;
        let E;
        T && e.grid.initSlides(d);
        const S =
          "auto" === n.slidesPerView &&
          n.breakpoints &&
          Object.keys(n.breakpoints).filter(
            (e) => void 0 !== n.breakpoints[e].slidesPerView
          ).length > 0;
        for (let r = 0; r < d; r += 1) {
          E = 0;
          const a = u.eq(r);
          if (
            (T && e.grid.updateSlide(r, a, d, t), "none" !== a.css("display"))
          ) {
            if ("auto" === n.slidesPerView) {
              S && (u[r].style[t("width")] = "");
              const s = getComputedStyle(a[0]),
                o = a[0].style.transform,
                l = a[0].style.webkitTransform;
              if (
                (o && (a[0].style.transform = "none"),
                l && (a[0].style.webkitTransform = "none"),
                n.roundLengths)
              )
                E = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
              else {
                const e = i(s, "width"),
                  t = i(s, "padding-left"),
                  n = i(s, "padding-right"),
                  r = i(s, "margin-left"),
                  o = i(s, "margin-right"),
                  l = s.getPropertyValue("box-sizing");
                if (l && "border-box" === l) E = e + r + o;
                else {
                  const { clientWidth: i, offsetWidth: s } = a[0];
                  E = e + t + n + r + o + (s - i);
                }
              }
              o && (a[0].style.transform = o),
                l && (a[0].style.webkitTransform = l),
                n.roundLengths && (E = Math.floor(E));
            } else
              (E = (s - (n.slidesPerView - 1) * b) / n.slidesPerView),
                n.roundLengths && (E = Math.floor(E)),
                u[r] && (u[r].style[t("width")] = `${E}px`);
            u[r] && (u[r].swiperSlideSize = E),
              f.push(E),
              n.centeredSlides
                ? ((w = w + E / 2 + _ / 2 + b),
                  0 === _ && 0 !== r && (w = w - s / 2 - b),
                  0 === r && (w = w - s / 2 - b),
                  Math.abs(w) < 0.001 && (w = 0),
                  n.roundLengths && (w = Math.floor(w)),
                  x % n.slidesPerGroup == 0 && h.push(w),
                  p.push(w))
                : (n.roundLengths && (w = Math.floor(w)),
                  (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                    e.params.slidesPerGroup ==
                    0 && h.push(w),
                  p.push(w),
                  (w = w + E + b)),
              (e.virtualSize += E + b),
              (_ = E),
              (x += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, s) + g),
          a &&
            o &&
            ("slide" === n.effect || "coverflow" === n.effect) &&
            r.css({ width: `${e.virtualSize + n.spaceBetween}px` }),
          n.setWrapperSize &&
            r.css({ [t("width")]: `${e.virtualSize + n.spaceBetween}px` }),
          T && e.grid.updateWrapperSize(E, h, t),
          !n.centeredSlides)
        ) {
          const t = [];
          for (let i = 0; i < h.length; i += 1) {
            let r = h[i];
            n.roundLengths && (r = Math.floor(r)),
              h[i] <= e.virtualSize - s && t.push(r);
          }
          (h = t),
            Math.floor(e.virtualSize - s) - Math.floor(h[h.length - 1]) > 1 &&
              h.push(e.virtualSize - s);
        }
        if ((0 === h.length && (h = [0]), 0 !== n.spaceBetween)) {
          const i = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
          u.filter((e, t) => !n.cssMode || t !== u.length - 1).css({
            [i]: `${b}px`,
          });
        }
        if (n.centeredSlides && n.centeredSlidesBounds) {
          let e = 0;
          f.forEach((t) => {
            e += t + (n.spaceBetween ? n.spaceBetween : 0);
          }),
            (e -= n.spaceBetween);
          const t = e - s;
          h = h.map((e) => (e < 0 ? -m : e > t ? t + g : e));
        }
        if (n.centerInsufficientSlides) {
          let e = 0;
          if (
            (f.forEach((t) => {
              e += t + (n.spaceBetween ? n.spaceBetween : 0);
            }),
            (e -= n.spaceBetween),
            e < s)
          ) {
            const t = (s - e) / 2;
            h.forEach((e, i) => {
              h[i] = e - t;
            }),
              p.forEach((e, i) => {
                p[i] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: u,
            snapGrid: h,
            slidesGrid: p,
            slidesSizesGrid: f,
          }),
          n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
        ) {
          eo(e.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"),
            eo(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - f[f.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            i = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + i));
        }
        if (
          (d !== c && e.emit("slidesLengthChange"),
          h.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          p.length !== y && e.emit("slidesGridLengthChange"),
          n.watchSlidesProgress && e.updateSlidesOffset(),
          !(l || n.cssMode || ("slide" !== n.effect && "fade" !== n.effect)))
        ) {
          const t = `${n.containerModifierClass}backface-hidden`,
            i = e.$el.hasClass(t);
          d <= n.maxBackfaceHiddenSlides
            ? i || e.$el.addClass(t)
            : i && e.$el.removeClass(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          i = [],
          n = t.virtual && t.params.virtual.enabled;
        let r,
          s = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const a = (e) =>
          n
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || Va([])).each((e) => {
              i.push(e);
            });
          else
            for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
              const e = t.activeIndex + r;
              if (e > t.slides.length && !n) break;
              i.push(a(e));
            }
        else i.push(a(t.activeIndex));
        for (r = 0; r < i.length; r += 1)
          if (void 0 !== i[r]) {
            const e = i[r].offsetHeight;
            s = e > s ? e : s;
          }
        (s || 0 === s) && t.$wrapperEl.css("height", `${s}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset = e.isHorizontal()
            ? t[i].offsetLeft
            : t[i].offsetTop;
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          i = t.params,
          { slides: n, rtlTranslate: r, snapGrid: s } = t;
        if (0 === n.length) return;
        void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        r && (a = e),
          n.removeClass(i.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let e = 0; e < n.length; e += 1) {
          const o = n[e];
          let l = o.swiperSlideOffset;
          i.cssMode && i.centeredSlides && (l -= n[0].swiperSlideOffset);
          const c =
              (a + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (o.swiperSlideSize + i.spaceBetween),
            u =
              (a - s[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
              (o.swiperSlideSize + i.spaceBetween),
            d = -(a - l),
            h = d + t.slidesSizesGrid[e];
          ((d >= 0 && d < t.size - 1) ||
            (h > 1 && h <= t.size) ||
            (d <= 0 && h >= t.size)) &&
            (t.visibleSlides.push(o),
            t.visibleSlidesIndexes.push(e),
            n.eq(e).addClass(i.slideVisibleClass)),
            (o.progress = r ? -c : c),
            (o.originalProgress = r ? -u : u);
        }
        t.visibleSlides = Va(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const i = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * i) || 0;
        }
        const i = t.params,
          n = t.maxTranslate() - t.minTranslate();
        let { progress: r, isBeginning: s, isEnd: a } = t;
        const o = s,
          l = a;
        0 === n
          ? ((r = 0), (s = !0), (a = !0))
          : ((r = (e - t.minTranslate()) / n), (s = r <= 0), (a = r >= 1)),
          Object.assign(t, { progress: r, isBeginning: s, isEnd: a }),
          (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
            t.updateSlidesProgress(e),
          s && !o && t.emit("reachBeginning toEdge"),
          a && !l && t.emit("reachEnd toEdge"),
          ((o && !s) || (l && !a)) && t.emit("fromEdge"),
          t.emit("progress", r);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: i,
            $wrapperEl: n,
            activeIndex: r,
            realIndex: s,
          } = e,
          a = e.virtual && i.virtual.enabled;
        let o;
        t.removeClass(
          `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
        ),
          (o = a
            ? e.$wrapperEl.find(
                `.${i.slideClass}[data-swiper-slide-index="${r}"]`
              )
            : t.eq(r)),
          o.addClass(i.slideActiveClass),
          i.loop &&
            (o.hasClass(i.slideDuplicateClass)
              ? n
                  .children(
                    `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${s}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass)
              : n
                  .children(
                    `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${s}"]`
                  )
                  .addClass(i.slideDuplicateActiveClass));
        let l = o.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
        i.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(i.slideNextClass));
        let c = o.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
        i.loop &&
          0 === c.length &&
          ((c = t.eq(-1)), c.addClass(i.slidePrevClass)),
          i.loop &&
            (l.hasClass(i.slideDuplicateClass)
              ? n
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass)
              : n
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicateNextClass),
            c.hasClass(i.slideDuplicateClass)
              ? n
                  .children(
                    `.${i.slideClass}:not(.${
                      i.slideDuplicateClass
                    })[data-swiper-slide-index="${c.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)
              : n
                  .children(
                    `.${i.slideClass}.${
                      i.slideDuplicateClass
                    }[data-swiper-slide-index="${c.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(i.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          i = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: n,
            snapGrid: r,
            params: s,
            activeIndex: a,
            realIndex: o,
            snapIndex: l,
          } = t;
        let c,
          u = e;
        if (void 0 === u) {
          for (let e = 0; e < n.length; e += 1)
            void 0 !== n[e + 1]
              ? i >= n[e] && i < n[e + 1] - (n[e + 1] - n[e]) / 2
                ? (u = e)
                : i >= n[e] && i < n[e + 1] && (u = e + 1)
              : i >= n[e] && (u = e);
          s.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0);
        }
        if (r.indexOf(i) >= 0) c = r.indexOf(i);
        else {
          const e = Math.min(s.slidesPerGroupSkip, u);
          c = e + Math.floor((u - e) / s.slidesPerGroup);
        }
        if ((c >= r.length && (c = r.length - 1), u === a))
          return void (
            c !== l && ((t.snapIndex = c), t.emit("snapIndexChange"))
          );
        const d = parseInt(
          t.slides.eq(u).attr("data-swiper-slide-index") || u,
          10
        );
        Object.assign(t, {
          snapIndex: c,
          realIndex: d,
          previousIndex: a,
          activeIndex: u,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          o !== d && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          i = t.params,
          n = Va(e).closest(`.${i.slideClass}`)[0];
        let r,
          s = !1;
        if (n)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === n) {
              (s = !0), (r = e);
              break;
            }
        if (!n || !s)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = n),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                Va(n).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = r),
          i.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    };
    const uo = {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {
          params: t,
          rtlTranslate: i,
          translate: n,
          $wrapperEl: r,
        } = this;
        if (t.virtualTranslate) return i ? -n : n;
        if (t.cssMode) return n;
        let s = Qa(r[0], e);
        return i && (s = -s), s || 0;
      },
      setTranslate: function (e, t) {
        const i = this,
          {
            rtlTranslate: n,
            params: r,
            $wrapperEl: s,
            wrapperEl: a,
            progress: o,
          } = i;
        let l,
          c = 0,
          u = 0;
        i.isHorizontal() ? (c = n ? -e : e) : (u = e),
          r.roundLengths && ((c = Math.floor(c)), (u = Math.floor(u))),
          r.cssMode
            ? (a[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                i.isHorizontal() ? -c : -u)
            : r.virtualTranslate ||
              s.transform(`translate3d(${c}px, ${u}px, 0px)`),
          (i.previousTranslate = i.translate),
          (i.translate = i.isHorizontal() ? c : u);
        const d = i.maxTranslate() - i.minTranslate();
        (l = 0 === d ? 0 : (e - i.minTranslate()) / d),
          l !== o && i.updateProgress(e),
          i.emit("setTranslate", i.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, i, n, r) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === i && (i = !0),
          void 0 === n && (n = !0);
        const s = this,
          { params: a, wrapperEl: o } = s;
        if (s.animating && a.preventInteractionOnTransition) return !1;
        const l = s.minTranslate(),
          c = s.maxTranslate();
        let u;
        if (
          ((u = n && e > l ? l : n && e < c ? c : e),
          s.updateProgress(u),
          a.cssMode)
        ) {
          const e = s.isHorizontal();
          if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -u;
          else {
            if (!s.support.smoothScroll)
              return (
                to({ swiper: s, targetPosition: -u, side: e ? "left" : "top" }),
                !0
              );
            o.scrollTo({ [e ? "left" : "top"]: -u, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (s.setTransition(0),
              s.setTranslate(u),
              i &&
                (s.emit("beforeTransitionStart", t, r),
                s.emit("transitionEnd")))
            : (s.setTransition(t),
              s.setTranslate(u),
              i &&
                (s.emit("beforeTransitionStart", t, r),
                s.emit("transitionStart")),
              s.animating ||
                ((s.animating = !0),
                s.onTranslateToWrapperTransitionEnd ||
                  (s.onTranslateToWrapperTransitionEnd = function (e) {
                    s &&
                      !s.destroyed &&
                      e.target === this &&
                      (s.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        s.onTranslateToWrapperTransitionEnd
                      ),
                      s.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        s.onTranslateToWrapperTransitionEnd
                      ),
                      (s.onTranslateToWrapperTransitionEnd = null),
                      delete s.onTranslateToWrapperTransitionEnd,
                      i && s.emit("transitionEnd"));
                  }),
                s.$wrapperEl[0].addEventListener(
                  "transitionend",
                  s.onTranslateToWrapperTransitionEnd
                ),
                s.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  s.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function ho(e) {
      let { swiper: t, runCallbacks: i, direction: n, step: r } = e;
      const { activeIndex: s, previousIndex: a } = t;
      let o = n;
      if (
        (o || (o = s > a ? "next" : s < a ? "prev" : "reset"),
        t.emit(`transition${r}`),
        i && s !== a)
      ) {
        if ("reset" === o) return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`),
          "next" === o
            ? t.emit(`slideNextTransition${r}`)
            : t.emit(`slidePrevTransition${r}`);
      }
    }
    const po = {
      slideTo: function (e, t, i, n, r) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === i && (i = !0),
          "number" != typeof e && "string" != typeof e)
        )
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const s = this;
        let a = e;
        a < 0 && (a = 0);
        const {
          params: o,
          snapGrid: l,
          slidesGrid: c,
          previousIndex: u,
          activeIndex: d,
          rtlTranslate: h,
          wrapperEl: p,
          enabled: f,
        } = s;
        if (
          (s.animating && o.preventInteractionOnTransition) ||
          (!f && !n && !r)
        )
          return !1;
        const m = Math.min(s.params.slidesPerGroupSkip, a);
        let g = m + Math.floor((a - m) / s.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1),
          (d || o.initialSlide || 0) === (u || 0) &&
            i &&
            s.emit("beforeSlideChangeStart");
        const v = -l[g];
        if ((s.updateProgress(v), o.normalizeSlideIndex))
          for (let e = 0; e < c.length; e += 1) {
            const t = -Math.floor(100 * v),
              i = Math.floor(100 * c[e]),
              n = Math.floor(100 * c[e + 1]);
            void 0 !== c[e + 1]
              ? t >= i && t < n - (n - i) / 2
                ? (a = e)
                : t >= i && t < n && (a = e + 1)
              : t >= i && (a = e);
          }
        if (s.initialized && a !== d) {
          if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
            return !1;
          if (
            !s.allowSlidePrev &&
            v > s.translate &&
            v > s.maxTranslate() &&
            (d || 0) !== a
          )
            return !1;
        }
        let y;
        if (
          ((y = a > d ? "next" : a < d ? "prev" : "reset"),
          (h && -v === s.translate) || (!h && v === s.translate))
        )
          return (
            s.updateActiveIndex(a),
            o.autoHeight && s.updateAutoHeight(),
            s.updateSlidesClasses(),
            "slide" !== o.effect && s.setTranslate(v),
            "reset" !== y && (s.transitionStart(i, y), s.transitionEnd(i, y)),
            !1
          );
        if (o.cssMode) {
          const e = s.isHorizontal(),
            i = h ? v : -v;
          if (0 === t) {
            const t = s.virtual && s.params.virtual.enabled;
            t &&
              ((s.wrapperEl.style.scrollSnapType = "none"),
              (s._immediateVirtual = !0)),
              (p[e ? "scrollLeft" : "scrollTop"] = i),
              t &&
                requestAnimationFrame(() => {
                  (s.wrapperEl.style.scrollSnapType = ""),
                    (s._swiperImmediateVirtual = !1);
                });
          } else {
            if (!s.support.smoothScroll)
              return (
                to({ swiper: s, targetPosition: i, side: e ? "left" : "top" }),
                !0
              );
            p.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
          }
          return !0;
        }
        return (
          s.setTransition(t),
          s.setTranslate(v),
          s.updateActiveIndex(a),
          s.updateSlidesClasses(),
          s.emit("beforeTransitionStart", t, n),
          s.transitionStart(i, y),
          0 === t
            ? s.transitionEnd(i, y)
            : s.animating ||
              ((s.animating = !0),
              s.onSlideToWrapperTransitionEnd ||
                (s.onSlideToWrapperTransitionEnd = function (e) {
                  s &&
                    !s.destroyed &&
                    e.target === this &&
                    (s.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      s.onSlideToWrapperTransitionEnd
                    ),
                    s.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      s.onSlideToWrapperTransitionEnd
                    ),
                    (s.onSlideToWrapperTransitionEnd = null),
                    delete s.onSlideToWrapperTransitionEnd,
                    s.transitionEnd(i, y));
                }),
              s.$wrapperEl[0].addEventListener(
                "transitionend",
                s.onSlideToWrapperTransitionEnd
              ),
              s.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                s.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e, t, i, n) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === i && (i = !0),
          "string" == typeof e)
        ) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const r = this;
        let s = e;
        return r.params.loop && (s += r.loopedSlides), r.slideTo(s, t, i, n);
      },
      slideNext: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const n = this,
          { animating: r, enabled: s, params: a } = n;
        if (!s) return n;
        let o = a.slidesPerGroup;
        "auto" === a.slidesPerView &&
          1 === a.slidesPerGroup &&
          a.slidesPerGroupAuto &&
          (o = Math.max(n.slidesPerViewDynamic("current", !0), 1));
        const l = n.activeIndex < a.slidesPerGroupSkip ? 1 : o;
        if (a.loop) {
          if (r && a.loopPreventsSlide) return !1;
          n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
        }
        return a.rewind && n.isEnd
          ? n.slideTo(0, e, t, i)
          : n.slideTo(n.activeIndex + l, e, t, i);
      },
      slidePrev: function (e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const n = this,
          {
            params: r,
            animating: s,
            snapGrid: a,
            slidesGrid: o,
            rtlTranslate: l,
            enabled: c,
          } = n;
        if (!c) return n;
        if (r.loop) {
          if (s && r.loopPreventsSlide) return !1;
          n.loopFix(), (n._clientLeft = n.$wrapperEl[0].clientLeft);
        }
        function u(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const d = u(l ? n.translate : -n.translate),
          h = a.map((e) => u(e));
        let p = a[h.indexOf(d) - 1];
        if (void 0 === p && r.cssMode) {
          let e;
          a.forEach((t, i) => {
            d >= t && (e = i);
          }),
            void 0 !== e && (p = a[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== p &&
            ((f = o.indexOf(p)),
            f < 0 && (f = n.activeIndex - 1),
            "auto" === r.slidesPerView &&
              1 === r.slidesPerGroup &&
              r.slidesPerGroupAuto &&
              ((f = f - n.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          r.rewind && n.isBeginning)
        ) {
          const r =
            n.params.virtual && n.params.virtual.enabled && n.virtual
              ? n.virtual.slides.length - 1
              : n.slides.length - 1;
          return n.slideTo(r, e, t, i);
        }
        return n.slideTo(f, e, t, i);
      },
      slideReset: function (e, t, i) {
        return (
          void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          this.slideTo(this.activeIndex, e, t, i)
        );
      },
      slideToClosest: function (e, t, i, n) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === n && (n = 0.5);
        const r = this;
        let s = r.activeIndex;
        const a = Math.min(r.params.slidesPerGroupSkip, s),
          o = a + Math.floor((s - a) / r.params.slidesPerGroup),
          l = r.rtlTranslate ? r.translate : -r.translate;
        if (l >= r.snapGrid[o]) {
          const e = r.snapGrid[o];
          l - e > (r.snapGrid[o + 1] - e) * n && (s += r.params.slidesPerGroup);
        } else {
          const e = r.snapGrid[o - 1];
          l - e <= (r.snapGrid[o] - e) * n && (s -= r.params.slidesPerGroup);
        }
        return (
          (s = Math.max(s, 0)),
          (s = Math.min(s, r.slidesGrid.length - 1)),
          r.slideTo(s, e, t, i)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: i } = e,
          n =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let r,
          s = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (r = parseInt(
            Va(e.clickedSlide).attr("data-swiper-slide-index"),
            10
          )),
            t.centeredSlides
              ? s < e.loopedSlides - n / 2 ||
                s > e.slides.length - e.loopedSlides + n / 2
                ? (e.loopFix(),
                  (s = i
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  Ua(() => {
                    e.slideTo(s);
                  }))
                : e.slideTo(s)
              : s > e.slides.length - n
              ? (e.loopFix(),
                (s = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                Ua(() => {
                  e.slideTo(s);
                }))
              : e.slideTo(s);
        } else e.slideTo(s);
      },
    };
    const fo = {
      loopCreate: function () {
        const e = this,
          t = Ia(),
          { params: i, $wrapperEl: n } = e,
          r = n.children().length > 0 ? Va(n.children()[0].parentNode) : n;
        r.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
        let s = r.children(`.${i.slideClass}`);
        if (i.loopFillGroupWithBlank) {
          const e = i.slidesPerGroup - (s.length % i.slidesPerGroup);
          if (e !== i.slidesPerGroup) {
            for (let n = 0; n < e; n += 1) {
              const e = Va(t.createElement("div")).addClass(
                `${i.slideClass} ${i.slideBlankClass}`
              );
              r.append(e);
            }
            s = r.children(`.${i.slideClass}`);
          }
        }
        "auto" !== i.slidesPerView ||
          i.loopedSlides ||
          (i.loopedSlides = s.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(i.loopedSlides || i.slidesPerView, 10)
          )),
          (e.loopedSlides += i.loopAdditionalSlides),
          e.loopedSlides > s.length && (e.loopedSlides = s.length);
        const a = [],
          o = [];
        s.each((t, i) => {
          const n = Va(t);
          i < e.loopedSlides && o.push(t),
            i < s.length && i >= s.length - e.loopedSlides && a.push(t),
            n.attr("data-swiper-slide-index", i);
        });
        for (let e = 0; e < o.length; e += 1)
          r.append(Va(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
        for (let e = a.length - 1; e >= 0; e -= 1)
          r.prepend(Va(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: i,
          loopedSlides: n,
          allowSlidePrev: r,
          allowSlideNext: s,
          snapGrid: a,
          rtlTranslate: o,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const c = -a[t] - e.getTranslate();
        if (t < n) {
          (l = i.length - 3 * n + t), (l += n);
          e.slideTo(l, 0, !1, !0) &&
            0 !== c &&
            e.setTranslate((o ? -e.translate : e.translate) - c);
        } else if (t >= i.length - n) {
          (l = -i.length + t + n), (l += n);
          e.slideTo(l, 0, !1, !0) &&
            0 !== c &&
            e.setTranslate((o ? -e.translate : e.translate) - c);
        }
        (e.allowSlidePrev = r), (e.allowSlideNext = s), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: i } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          i.removeAttr("data-swiper-slide-index");
      },
    };
    function mo(e) {
      const t = this,
        i = Ia(),
        n = Ba(),
        r = t.touchEventsData,
        { params: s, touches: a, enabled: o } = t;
      if (!o) return;
      if (t.animating && s.preventInteractionOnTransition) return;
      !t.animating && s.cssMode && s.loop && t.loopFix();
      let l = e;
      l.originalEvent && (l = l.originalEvent);
      let c = Va(l.target);
      if ("wrapper" === s.touchEventsTarget && !c.closest(t.wrapperEl).length)
        return;
      if (
        ((r.isTouchEvent = "touchstart" === l.type),
        !r.isTouchEvent && "which" in l && 3 === l.which)
      )
        return;
      if (!r.isTouchEvent && "button" in l && l.button > 0) return;
      if (r.isTouched && r.isMoved) return;
      !!s.noSwipingClass &&
        "" !== s.noSwipingClass &&
        l.target &&
        l.target.shadowRoot &&
        e.path &&
        e.path[0] &&
        (c = Va(e.path[0]));
      const u = s.noSwipingSelector
          ? s.noSwipingSelector
          : `.${s.noSwipingClass}`,
        d = !(!l.target || !l.target.shadowRoot);
      if (
        s.noSwiping &&
        (d
          ? (function (e, t) {
              return (
                void 0 === t && (t = this),
                (function t(i) {
                  if (!i || i === Ia() || i === Ba()) return null;
                  i.assignedSlot && (i = i.assignedSlot);
                  const n = i.closest(e);
                  return n || i.getRootNode
                    ? n || t(i.getRootNode().host)
                    : null;
                })(t)
              );
            })(u, c[0])
          : c.closest(u)[0])
      )
        return void (t.allowClick = !0);
      if (s.swipeHandler && !c.closest(s.swipeHandler)[0]) return;
      (a.currentX =
        "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
        (a.currentY =
          "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
      const h = a.currentX,
        p = a.currentY,
        f = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
        m = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
      if (f && (h <= m || h >= n.innerWidth - m)) {
        if ("prevent" !== f) return;
        e.preventDefault();
      }
      if (
        (Object.assign(r, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
        (a.startX = h),
        (a.startY = p),
        (r.touchStartTime = Wa()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        s.threshold > 0 && (r.allowThresholdMove = !1),
        "touchstart" !== l.type)
      ) {
        let e = !0;
        c.is(r.focusableElements) &&
          ((e = !1), "SELECT" === c[0].nodeName && (r.isTouched = !1)),
          i.activeElement &&
            Va(i.activeElement).is(r.focusableElements) &&
            i.activeElement !== c[0] &&
            i.activeElement.blur();
        const n = e && t.allowTouchMove && s.touchStartPreventDefault;
        (!s.touchStartForcePreventDefault && !n) ||
          c[0].isContentEditable ||
          l.preventDefault();
      }
      t.params.freeMode &&
        t.params.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !s.cssMode &&
        t.freeMode.onTouchStart(),
        t.emit("touchStart", l);
    }
    function go(e) {
      const t = Ia(),
        i = this,
        n = i.touchEventsData,
        { params: r, touches: s, rtlTranslate: a, enabled: o } = i;
      if (!o) return;
      let l = e;
      if ((l.originalEvent && (l = l.originalEvent), !n.isTouched))
        return void (
          n.startMoving &&
          n.isScrolling &&
          i.emit("touchMoveOpposite", l)
        );
      if (n.isTouchEvent && "touchmove" !== l.type) return;
      const c =
          "touchmove" === l.type &&
          l.targetTouches &&
          (l.targetTouches[0] || l.changedTouches[0]),
        u = "touchmove" === l.type ? c.pageX : l.pageX,
        d = "touchmove" === l.type ? c.pageY : l.pageY;
      if (l.preventedByNestedSwiper) return (s.startX = u), void (s.startY = d);
      if (!i.allowTouchMove)
        return (
          Va(l.target).is(n.focusableElements) || (i.allowClick = !1),
          void (
            n.isTouched &&
            (Object.assign(s, {
              startX: u,
              startY: d,
              currentX: u,
              currentY: d,
            }),
            (n.touchStartTime = Wa()))
          )
        );
      if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
        if (i.isVertical()) {
          if (
            (d < s.startY && i.translate <= i.maxTranslate()) ||
            (d > s.startY && i.translate >= i.minTranslate())
          )
            return (n.isTouched = !1), void (n.isMoved = !1);
        } else if (
          (u < s.startX && i.translate <= i.maxTranslate()) ||
          (u > s.startX && i.translate >= i.minTranslate())
        )
          return;
      if (
        n.isTouchEvent &&
        t.activeElement &&
        l.target === t.activeElement &&
        Va(l.target).is(n.focusableElements)
      )
        return (n.isMoved = !0), void (i.allowClick = !1);
      if (
        (n.allowTouchCallbacks && i.emit("touchMove", l),
        l.targetTouches && l.targetTouches.length > 1)
      )
        return;
      (s.currentX = u), (s.currentY = d);
      const h = s.currentX - s.startX,
        p = s.currentY - s.startY;
      if (i.params.threshold && Math.sqrt(h ** 2 + p ** 2) < i.params.threshold)
        return;
      if (void 0 === n.isScrolling) {
        let e;
        (i.isHorizontal() && s.currentY === s.startY) ||
        (i.isVertical() && s.currentX === s.startX)
          ? (n.isScrolling = !1)
          : h * h + p * p >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(p), Math.abs(h))) / Math.PI),
            (n.isScrolling = i.isHorizontal()
              ? e > r.touchAngle
              : 90 - e > r.touchAngle));
      }
      if (
        (n.isScrolling && i.emit("touchMoveOpposite", l),
        void 0 === n.startMoving &&
          ((s.currentX === s.startX && s.currentY === s.startY) ||
            (n.startMoving = !0)),
        n.isScrolling)
      )
        return void (n.isTouched = !1);
      if (!n.startMoving) return;
      (i.allowClick = !1),
        !r.cssMode && l.cancelable && l.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && l.stopPropagation(),
        n.isMoved ||
          (r.loop && !r.cssMode && i.loopFix(),
          (n.startTranslate = i.getTranslate()),
          i.setTransition(0),
          i.animating &&
            i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
          (n.allowMomentumBounce = !1),
          !r.grabCursor ||
            (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
            i.setGrabCursor(!0),
          i.emit("sliderFirstMove", l)),
        i.emit("sliderMove", l),
        (n.isMoved = !0);
      let f = i.isHorizontal() ? h : p;
      (s.diff = f),
        (f *= r.touchRatio),
        a && (f = -f),
        (i.swipeDirection = f > 0 ? "prev" : "next"),
        (n.currentTranslate = f + n.startTranslate);
      let m = !0,
        g = r.resistanceRatio;
      if (
        (r.touchReleaseOnEdges && (g = 0),
        f > 0 && n.currentTranslate > i.minTranslate()
          ? ((m = !1),
            r.resistance &&
              (n.currentTranslate =
                i.minTranslate() -
                1 +
                (-i.minTranslate() + n.startTranslate + f) ** g))
          : f < 0 &&
            n.currentTranslate < i.maxTranslate() &&
            ((m = !1),
            r.resistance &&
              (n.currentTranslate =
                i.maxTranslate() +
                1 -
                (i.maxTranslate() - n.startTranslate - f) ** g)),
        m && (l.preventedByNestedSwiper = !0),
        !i.allowSlideNext &&
          "next" === i.swipeDirection &&
          n.currentTranslate < n.startTranslate &&
          (n.currentTranslate = n.startTranslate),
        !i.allowSlidePrev &&
          "prev" === i.swipeDirection &&
          n.currentTranslate > n.startTranslate &&
          (n.currentTranslate = n.startTranslate),
        i.allowSlidePrev ||
          i.allowSlideNext ||
          (n.currentTranslate = n.startTranslate),
        r.threshold > 0)
      ) {
        if (!(Math.abs(f) > r.threshold || n.allowThresholdMove))
          return void (n.currentTranslate = n.startTranslate);
        if (!n.allowThresholdMove)
          return (
            (n.allowThresholdMove = !0),
            (s.startX = s.currentX),
            (s.startY = s.currentY),
            (n.currentTranslate = n.startTranslate),
            void (s.diff = i.isHorizontal()
              ? s.currentX - s.startX
              : s.currentY - s.startY)
          );
      }
      r.followFinger &&
        !r.cssMode &&
        (((r.freeMode && r.freeMode.enabled && i.freeMode) ||
          r.watchSlidesProgress) &&
          (i.updateActiveIndex(), i.updateSlidesClasses()),
        i.params.freeMode &&
          r.freeMode.enabled &&
          i.freeMode &&
          i.freeMode.onTouchMove(),
        i.updateProgress(n.currentTranslate),
        i.setTranslate(n.currentTranslate));
    }
    function vo(e) {
      const t = this,
        i = t.touchEventsData,
        {
          params: n,
          touches: r,
          rtlTranslate: s,
          slidesGrid: a,
          enabled: o,
        } = t;
      if (!o) return;
      let l = e;
      if (
        (l.originalEvent && (l = l.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", l),
        (i.allowTouchCallbacks = !1),
        !i.isTouched)
      )
        return (
          i.isMoved && n.grabCursor && t.setGrabCursor(!1),
          (i.isMoved = !1),
          void (i.startMoving = !1)
        );
      n.grabCursor &&
        i.isMoved &&
        i.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const c = Wa(),
        u = c - i.touchStartTime;
      if (t.allowClick) {
        const e = l.path || (l.composedPath && l.composedPath());
        t.updateClickedSlide((e && e[0]) || l.target),
          t.emit("tap click", l),
          u < 300 &&
            c - i.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", l);
      }
      if (
        ((i.lastClickTime = Wa()),
        Ua(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !i.isTouched ||
          !i.isMoved ||
          !t.swipeDirection ||
          0 === r.diff ||
          i.currentTranslate === i.startTranslate)
      )
        return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
      let d;
      if (
        ((i.isTouched = !1),
        (i.isMoved = !1),
        (i.startMoving = !1),
        (d = n.followFinger
          ? s
            ? t.translate
            : -t.translate
          : -i.currentTranslate),
        n.cssMode)
      )
        return;
      if (t.params.freeMode && n.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: d });
      let h = 0,
        p = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < a.length;
        e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
      ) {
        const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== a[e + t]
          ? d >= a[e] && d < a[e + t] && ((h = e), (p = a[e + t] - a[e]))
          : d >= a[e] && ((h = e), (p = a[a.length - 1] - a[a.length - 2]));
      }
      let f = null,
        m = null;
      n.rewind &&
        (t.isBeginning
          ? (m =
              t.params.virtual && t.params.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (f = 0));
      const g = (d - a[h]) / p,
        v = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      if (u > n.longSwipesMs) {
        if (!n.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (g >= n.longSwipesRatio
            ? t.slideTo(n.rewind && t.isEnd ? f : h + v)
            : t.slideTo(h)),
          "prev" === t.swipeDirection &&
            (g > 1 - n.longSwipesRatio
              ? t.slideTo(h + v)
              : null !== m && g < 0 && Math.abs(g) > n.longSwipesRatio
              ? t.slideTo(m)
              : t.slideTo(h));
      } else {
        if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
          ? l.target === t.navigation.nextEl
            ? t.slideTo(h + v)
            : t.slideTo(h)
          : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : h + v),
            "prev" === t.swipeDirection && t.slideTo(null !== m ? m : h));
      }
    }
    function yo() {
      const e = this,
        { params: t, el: i } = e;
      if (i && 0 === i.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: n, allowSlidePrev: r, snapGrid: s } = e;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
        e.isEnd &&
        !e.isBeginning &&
        !e.params.centeredSlides
          ? e.slideTo(e.slides.length - 1, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.run(),
        (e.allowSlidePrev = r),
        (e.allowSlideNext = n),
        e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
    }
    function bo(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function wo() {
      const e = this,
        { wrapperEl: t, rtlTranslate: i, enabled: n } = e;
      if (!n) return;
      let r;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const s = e.maxTranslate() - e.minTranslate();
      (r = 0 === s ? 0 : (e.translate - e.minTranslate()) / s),
        r !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    let _o = !1;
    function xo() {}
    const To = (e, t) => {
      const i = Ia(),
        {
          params: n,
          touchEvents: r,
          el: s,
          wrapperEl: a,
          device: o,
          support: l,
        } = e,
        c = !!n.nested,
        u = "on" === t ? "addEventListener" : "removeEventListener",
        d = t;
      if (l.touch) {
        const t = !(
          "touchstart" !== r.start ||
          !l.passiveListener ||
          !n.passiveListeners
        ) && { passive: !0, capture: !1 };
        s[u](r.start, e.onTouchStart, t),
          s[u](
            r.move,
            e.onTouchMove,
            l.passiveListener ? { passive: !1, capture: c } : c
          ),
          s[u](r.end, e.onTouchEnd, t),
          r.cancel && s[u](r.cancel, e.onTouchEnd, t);
      } else
        s[u](r.start, e.onTouchStart, !1),
          i[u](r.move, e.onTouchMove, c),
          i[u](r.end, e.onTouchEnd, !1);
      (n.preventClicks || n.preventClicksPropagation) &&
        s[u]("click", e.onClick, !0),
        n.cssMode && a[u]("scroll", e.onScroll),
        n.updateOnWindowResize
          ? e[d](
              o.ios || o.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              yo,
              !0
            )
          : e[d]("observerUpdate", yo, !0);
    };
    const Eo = {
        attachEvents: function () {
          const e = this,
            t = Ia(),
            { params: i, support: n } = e;
          (e.onTouchStart = mo.bind(e)),
            (e.onTouchMove = go.bind(e)),
            (e.onTouchEnd = vo.bind(e)),
            i.cssMode && (e.onScroll = wo.bind(e)),
            (e.onClick = bo.bind(e)),
            n.touch && !_o && (t.addEventListener("touchstart", xo), (_o = !0)),
            To(e, "on");
        },
        detachEvents: function () {
          To(this, "off");
        },
      },
      So = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const Co = {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: i,
            loopedSlides: n = 0,
            params: r,
            $el: s,
          } = e,
          a = r.breakpoints;
        if (!a || (a && 0 === Object.keys(a).length)) return;
        const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
        if (!o || e.currentBreakpoint === o) return;
        const l = (o in a ? a[o] : void 0) || e.originalParams,
          c = So(e, r),
          u = So(e, l),
          d = r.enabled;
        c && !u
          ? (s.removeClass(
              `${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !c &&
            u &&
            (s.addClass(`${r.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === r.grid.fill)) &&
              s.addClass(`${r.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
          ["navigation", "pagination", "scrollbar"].forEach((t) => {
            const i = r[t] && r[t].enabled,
              n = l[t] && l[t].enabled;
            i && !n && e[t].disable(), !i && n && e[t].enable();
          });
        const h = l.direction && l.direction !== r.direction,
          p = r.loop && (l.slidesPerView !== r.slidesPerView || h);
        h && i && e.changeDirection(), Ja(e.params, l);
        const f = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          d && !f ? e.disable() : !d && f && e.enable(),
          (e.currentBreakpoint = o),
          e.emit("_beforeBreakpoint", l),
          p &&
            i &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - n + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t, i) {
        if ((void 0 === t && (t = "window"), !e || ("container" === t && !i)))
          return;
        let n = !1;
        const r = Ba(),
          s = "window" === t ? r.innerHeight : i.clientHeight,
          a = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: s * t, point: e };
            }
            return { value: e, point: e };
          });
        a.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let e = 0; e < a.length; e += 1) {
          const { point: s, value: o } = a[e];
          "window" === t
            ? r.matchMedia(`(min-width: ${o}px)`).matches && (n = s)
            : o <= i.clientWidth && (n = s);
        }
        return n || "max";
      },
    };
    const Mo = {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: i,
            rtl: n,
            $el: r,
            device: s,
            support: a,
          } = e,
          o = (function (e, t) {
            const i = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((n) => {
                      e[n] && i.push(t + n);
                    })
                  : "string" == typeof e && i.push(t + e);
              }),
              i
            );
          })(
            [
              "initialized",
              i.direction,
              { "pointer-events": !a.touch },
              { "free-mode": e.params.freeMode && i.freeMode.enabled },
              { autoheight: i.autoHeight },
              { rtl: n },
              { grid: i.grid && i.grid.rows > 1 },
              {
                "grid-column":
                  i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
              },
              { android: s.android },
              { ios: s.ios },
              { "css-mode": i.cssMode },
              { centered: i.cssMode && i.centeredSlides },
              { "watch-progress": i.watchSlidesProgress },
            ],
            i.containerModifierClass
          );
        t.push(...o), r.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    };
    const Oo = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      loopPreventsSlide: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function Do(e, t) {
      return function (i) {
        void 0 === i && (i = {});
        const n = Object.keys(i)[0],
          r = i[n];
        "object" == typeof r && null !== r
          ? (["navigation", "pagination", "scrollbar"].indexOf(n) >= 0 &&
              !0 === e[n] &&
              (e[n] = { auto: !0 }),
            n in e && "enabled" in r
              ? (!0 === e[n] && (e[n] = { enabled: !0 }),
                "object" != typeof e[n] ||
                  "enabled" in e[n] ||
                  (e[n].enabled = !0),
                e[n] || (e[n] = { enabled: !1 }),
                Ja(t, i))
              : Ja(t, i))
          : Ja(t, i);
      };
    }
    const Ao = {
        eventsEmitter: lo,
        update: co,
        translate: uo,
        transition: {
          setTransition: function (e, t) {
            const i = this;
            i.params.cssMode || i.$wrapperEl.transition(e),
              i.emit("setTransition", e, t);
          },
          transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const i = this,
              { params: n } = i;
            n.cssMode ||
              (n.autoHeight && i.updateAutoHeight(),
              ho({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const i = this,
              { params: n } = i;
            (i.animating = !1),
              n.cssMode ||
                (i.setTransition(0),
                ho({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: po,
        loop: fo,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              t.support.touch ||
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const i =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            (i.style.cursor = "move"),
              (i.style.cursor = e ? "grabbing" : "grab");
          },
          unsetGrabCursor: function () {
            const e = this;
            e.support.touch ||
              (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = "");
          },
        },
        events: Eo,
        breakpoints: Co,
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: i } = e,
              { slidesOffsetBefore: n } = i;
            if (n) {
              const t = e.slides.length - 1,
                i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
              e.isLocked = e.size > i;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: Mo,
        images: {
          loadImage: function (e, t, i, n, r, s) {
            const a = Ba();
            let o;
            function l() {
              s && s();
            }
            Va(e).parent("picture")[0] || (e.complete && r)
              ? l()
              : t
              ? ((o = new a.Image()),
                (o.onload = l),
                (o.onerror = l),
                n && (o.sizes = n),
                i && (o.srcset = i),
                t && (o.src = t))
              : l();
          },
          preloadImages: function () {
            const e = this;
            function t() {
              null != e &&
                e &&
                !e.destroyed &&
                (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                e.imagesLoaded === e.imagesToLoad.length &&
                  (e.params.updateOnImagesReady && e.update(),
                  e.emit("imagesReady")));
            }
            e.imagesToLoad = e.$el.find("img");
            for (let i = 0; i < e.imagesToLoad.length; i += 1) {
              const n = e.imagesToLoad[i];
              e.loadImage(
                n,
                n.currentSrc || n.getAttribute("src"),
                n.srcset || n.getAttribute("srcset"),
                n.sizes || n.getAttribute("sizes"),
                !0,
                t
              );
            }
          },
        },
      },
      Lo = {};
    class Po {
      constructor() {
        let e, t;
        for (var i = arguments.length, n = new Array(i), r = 0; r < i; r++)
          n[r] = arguments[r];
        if (
          (1 === n.length &&
          n[0].constructor &&
          "Object" === Object.prototype.toString.call(n[0]).slice(8, -1)
            ? (t = n[0])
            : ([e, t] = n),
          t || (t = {}),
          (t = Ja({}, t)),
          e && !t.el && (t.el = e),
          t.el && Va(t.el).length > 1)
        ) {
          const e = [];
          return (
            Va(t.el).each((i) => {
              const n = Ja({}, t, { el: i });
              e.push(new Po(n));
            }),
            e
          );
        }
        const s = this;
        (s.__swiper__ = !0),
          (s.support = so()),
          (s.device = ao({ userAgent: t.userAgent })),
          (s.browser = oo()),
          (s.eventsListeners = {}),
          (s.eventsAnyListeners = []),
          (s.modules = [...s.__modules__]),
          t.modules && Array.isArray(t.modules) && s.modules.push(...t.modules);
        const a = {};
        s.modules.forEach((e) => {
          e({
            swiper: s,
            extendParams: Do(t, a),
            on: s.on.bind(s),
            once: s.once.bind(s),
            off: s.off.bind(s),
            emit: s.emit.bind(s),
          });
        });
        const o = Ja({}, Oo, a);
        return (
          (s.params = Ja({}, o, Lo, t)),
          (s.originalParams = Ja({}, s.params)),
          (s.passedParams = Ja({}, t)),
          s.params &&
            s.params.on &&
            Object.keys(s.params.on).forEach((e) => {
              s.on(e, s.params.on[e]);
            }),
          s.params && s.params.onAny && s.onAny(s.params.onAny),
          (s.$ = Va),
          Object.assign(s, {
            enabled: s.params.enabled,
            el: e,
            classNames: [],
            slides: Va(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === s.params.direction,
            isVertical: () => "vertical" === s.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: s.params.allowSlideNext,
            allowSlidePrev: s.params.allowSlidePrev,
            touchEvents: (function () {
              const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                t = ["pointerdown", "pointermove", "pointerup"];
              return (
                (s.touchEventsTouch = {
                  start: e[0],
                  move: e[1],
                  end: e[2],
                  cancel: e[3],
                }),
                (s.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                s.support.touch || !s.params.simulateTouch
                  ? s.touchEventsTouch
                  : s.touchEventsDesktop
              );
            })(),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: s.params.focusableElements,
              lastClickTime: Wa(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0,
            },
            allowClick: !0,
            allowTouchMove: s.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          s.emit("_swiper"),
          s.params.init && s.init(),
          s
        );
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const n = i.minTranslate(),
          r = (i.maxTranslate() - n) * e + n;
        i.translateTo(r, void 0 === t ? 0 : t),
          i.updateActiveIndex(),
          i.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed
          ? ""
          : e.className
              .split(" ")
              .filter(
                (e) =>
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass)
              )
              .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.each((i) => {
          const n = e.getSlideClasses(i);
          t.push({ slideEl: i, classNames: n }), e.emit("_slideClass", i, n);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"), void 0 === t && (t = !1);
        const {
          params: i,
          slides: n,
          slidesGrid: r,
          slidesSizesGrid: s,
          size: a,
          activeIndex: o,
        } = this;
        let l = 1;
        if (i.centeredSlides) {
          let e,
            t = n[o].swiperSlideSize;
          for (let i = o + 1; i < n.length; i += 1)
            n[i] &&
              !e &&
              ((t += n[i].swiperSlideSize), (l += 1), t > a && (e = !0));
          for (let i = o - 1; i >= 0; i -= 1)
            n[i] &&
              !e &&
              ((t += n[i].swiperSlideSize), (l += 1), t > a && (e = !0));
        } else if ("current" === e)
          for (let e = o + 1; e < n.length; e += 1) {
            (t ? r[e] + s[e] - r[o] < a : r[e] - r[o] < a) && (l += 1);
          }
        else
          for (let e = o - 1; e >= 0; e -= 1) {
            r[o] - r[e] < a && (l += 1);
          }
        return l;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: i } = e;
        function n() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let r;
        i.breakpoints && e.setBreakpoint(),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (n(), e.params.autoHeight && e.updateAutoHeight())
            : ((r =
                ("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              r || n()),
          i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t) {
        void 0 === t && (t = !0);
        const i = this,
          n = i.params.direction;
        return (
          e || (e = "horizontal" === n ? "vertical" : "horizontal"),
          e === n ||
            ("horizontal" !== e && "vertical" !== e) ||
            (i.$el
              .removeClass(`${i.params.containerModifierClass}${n}`)
              .addClass(`${i.params.containerModifierClass}${e}`),
            i.emitContainerClasses(),
            (i.params.direction = e),
            i.slides.each((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            i.emit("changeDirection"),
            t && i.update()),
          i
        );
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        const i = Va(e || t.params.el);
        if (!(e = i[0])) return !1;
        e.swiper = t;
        const n = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let r = (() => {
          if (e && e.shadowRoot && e.shadowRoot.querySelector) {
            const t = Va(e.shadowRoot.querySelector(n()));
            return (t.children = (e) => i.children(e)), t;
          }
          return i.children ? i.children(n()) : Va(i).children(n());
        })();
        if (0 === r.length && t.params.createElements) {
          const e = Ia().createElement("div");
          (r = Va(e)),
            (e.className = t.params.wrapperClass),
            i.append(e),
            i.children(`.${t.params.slideClass}`).each((e) => {
              r.append(e);
            });
        }
        return (
          Object.assign(t, {
            $el: i,
            el: e,
            $wrapperEl: r,
            wrapperEl: r[0],
            mounted: !0,
            rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
            wrongRTL: "-webkit-box" === r.css("display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
          !1 === t.mount(e) ||
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop
              ? t.slideTo(
                  t.params.initialSlide + t.loopedSlides,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                ),
            t.attachEvents(),
            (t.initialized = !0),
            t.emit("init"),
            t.emit("afterInit")),
          t
        );
      }
      destroy(e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        const i = this,
          { params: n, $el: r, $wrapperEl: s, slides: a } = i;
        return (
          void 0 === i.params ||
            i.destroyed ||
            (i.emit("beforeDestroy"),
            (i.initialized = !1),
            i.detachEvents(),
            n.loop && i.loopDestroy(),
            t &&
              (i.removeClasses(),
              r.removeAttr("style"),
              s.removeAttr("style"),
              a &&
                a.length &&
                a
                  .removeClass(
                    [
                      n.slideVisibleClass,
                      n.slideActiveClass,
                      n.slideNextClass,
                      n.slidePrevClass,
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((e) => {
              i.off(e);
            }),
            !1 !== e &&
              ((i.$el[0].swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(i)),
            (i.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        Ja(Lo, e);
      }
      static get extendedDefaults() {
        return Lo;
      }
      static get defaults() {
        return Oo;
      }
      static installModule(e) {
        Po.prototype.__modules__ || (Po.prototype.__modules__ = []);
        const t = Po.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => Po.installModule(e)), Po)
          : (Po.installModule(e), Po);
      }
    }
    Object.keys(Ao).forEach((e) => {
      Object.keys(Ao[e]).forEach((t) => {
        Po.prototype[t] = Ao[e][t];
      });
    }),
      Po.use([
        function (e) {
          let { swiper: t, on: i, emit: n } = e;
          const r = Ba();
          let s = null,
            a = null;
          const o = () => {
              t &&
                !t.destroyed &&
                t.initialized &&
                (n("beforeResize"), n("resize"));
            },
            l = () => {
              t && !t.destroyed && t.initialized && n("orientationchange");
            };
          i("init", () => {
            t.params.resizeObserver && void 0 !== r.ResizeObserver
              ? t &&
                !t.destroyed &&
                t.initialized &&
                ((s = new ResizeObserver((e) => {
                  a = r.requestAnimationFrame(() => {
                    const { width: i, height: n } = t;
                    let r = i,
                      s = n;
                    e.forEach((e) => {
                      let { contentBoxSize: i, contentRect: n, target: a } = e;
                      (a && a !== t.el) ||
                        ((r = n ? n.width : (i[0] || i).inlineSize),
                        (s = n ? n.height : (i[0] || i).blockSize));
                    }),
                      (r === i && s === n) || o();
                  });
                })),
                s.observe(t.el))
              : (r.addEventListener("resize", o),
                r.addEventListener("orientationchange", l));
          }),
            i("destroy", () => {
              a && r.cancelAnimationFrame(a),
                s && s.unobserve && t.el && (s.unobserve(t.el), (s = null)),
                r.removeEventListener("resize", o),
                r.removeEventListener("orientationchange", l);
            });
        },
        function (e) {
          let { swiper: t, extendParams: i, on: n, emit: r } = e;
          const s = [],
            a = Ba(),
            o = function (e, t) {
              void 0 === t && (t = {});
              const i = new (a.MutationObserver || a.WebkitMutationObserver)(
                (e) => {
                  if (1 === e.length) return void r("observerUpdate", e[0]);
                  const t = function () {
                    r("observerUpdate", e[0]);
                  };
                  a.requestAnimationFrame
                    ? a.requestAnimationFrame(t)
                    : a.setTimeout(t, 0);
                }
              );
              i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData,
              }),
                s.push(i);
            };
          i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            n("init", () => {
              if (t.params.observer) {
                if (t.params.observeParents) {
                  const e = t.$el.parents();
                  for (let t = 0; t < e.length; t += 1) o(e[t]);
                }
                o(t.$el[0], { childList: t.params.observeSlideChildren }),
                  o(t.$wrapperEl[0], { attributes: !1 });
              }
            }),
            n("destroy", () => {
              s.forEach((e) => {
                e.disconnect();
              }),
                s.splice(0, s.length);
            });
        },
      ]);
    const ko = Po;
    function $o(e, t, i, n) {
      const r = Ia();
      return (
        e.params.createElements &&
          Object.keys(n).forEach((s) => {
            if (!i[s] && !0 === i.auto) {
              let a = e.$el.children(`.${n[s]}`)[0];
              a ||
                ((a = r.createElement("div")),
                (a.className = n[s]),
                e.$el.append(a)),
                (i[s] = a),
                (t[s] = a);
            }
          }),
        i
      );
    }
    function Ro(e) {
      let { swiper: t, extendParams: i, on: n, emit: r } = e;
      function s(e) {
        let i;
        return (
          e &&
            ((i = Va(e)),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              i.length > 1 &&
              1 === t.$el.find(e).length &&
              (i = t.$el.find(e))),
          i
        );
      }
      function a(e, i) {
        const n = t.params.navigation;
        e &&
          e.length > 0 &&
          (e[i ? "addClass" : "removeClass"](n.disabledClass),
          e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = i),
          t.params.watchOverflow &&
            t.enabled &&
            e[t.isLocked ? "addClass" : "removeClass"](n.lockClass));
      }
      function o() {
        if (t.params.loop) return;
        const { $nextEl: e, $prevEl: i } = t.navigation;
        a(i, t.isBeginning && !t.params.rewind),
          a(e, t.isEnd && !t.params.rewind);
      }
      function l(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev();
      }
      function c(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext();
      }
      function u() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = $o(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        const i = s(e.nextEl),
          n = s(e.prevEl);
        i && i.length > 0 && i.on("click", c),
          n && n.length > 0 && n.on("click", l),
          Object.assign(t.navigation, {
            $nextEl: i,
            nextEl: i && i[0],
            $prevEl: n,
            prevEl: n && n[0],
          }),
          t.enabled ||
            (i && i.addClass(e.lockClass), n && n.addClass(e.lockClass));
      }
      function d() {
        const { $nextEl: e, $prevEl: i } = t.navigation;
        e &&
          e.length &&
          (e.off("click", c), e.removeClass(t.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", l),
            i.removeClass(t.params.navigation.disabledClass));
      }
      i({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = {
          nextEl: null,
          $nextEl: null,
          prevEl: null,
          $prevEl: null,
        }),
        n("init", () => {
          !1 === t.params.navigation.enabled ? h() : (u(), o());
        }),
        n("toEdge fromEdge lock unlock", () => {
          o();
        }),
        n("destroy", () => {
          d();
        }),
        n("enable disable", () => {
          const { $nextEl: e, $prevEl: i } = t.navigation;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.navigation.lockClass
            ),
            i &&
              i[t.enabled ? "removeClass" : "addClass"](
                t.params.navigation.lockClass
              );
        }),
        n("click", (e, i) => {
          const { $nextEl: n, $prevEl: s } = t.navigation,
            a = i.target;
          if (t.params.navigation.hideOnClick && !Va(a).is(s) && !Va(a).is(n)) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === a || t.pagination.el.contains(a))
            )
              return;
            let e;
            n
              ? (e = n.hasClass(t.params.navigation.hiddenClass))
              : s && (e = s.hasClass(t.params.navigation.hiddenClass)),
              r(!0 === e ? "navigationShow" : "navigationHide"),
              n && n.toggleClass(t.params.navigation.hiddenClass),
              s && s.toggleClass(t.params.navigation.hiddenClass);
          }
        });
      const h = () => {
        t.$el.addClass(t.params.navigation.navigationDisabledClass), d();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.$el.removeClass(t.params.navigation.navigationDisabledClass),
            u(),
            o();
        },
        disable: h,
        update: o,
        init: u,
        destroy: d,
      });
    }
    function zo(e) {
      return (
        void 0 === e && (e = ""),
        `.${e
          .trim()
          .replace(/([\.:!\/])/g, "\\$1")
          .replace(/ /g, ".")}`
      );
    }
    function Io(e) {
      let { swiper: t, extendParams: i, on: n, emit: r } = e;
      const s = "swiper-pagination";
      let a;
      i({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${s}-bullet`,
          bulletActiveClass: `${s}-bullet-active`,
          modifierClass: `${s}-`,
          currentClass: `${s}-current`,
          totalClass: `${s}-total`,
          hiddenClass: `${s}-hidden`,
          progressbarFillClass: `${s}-progressbar-fill`,
          progressbarOppositeClass: `${s}-progressbar-opposite`,
          clickableClass: `${s}-clickable`,
          lockClass: `${s}-lock`,
          horizontalClass: `${s}-horizontal`,
          verticalClass: `${s}-vertical`,
          paginationDisabledClass: `${s}-disabled`,
        },
      }),
        (t.pagination = { el: null, $el: null, bullets: [] });
      let o = 0;
      function l() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          !t.pagination.$el ||
          0 === t.pagination.$el.length
        );
      }
      function c(e, i) {
        const { bulletActiveClass: n } = t.params.pagination;
        e[i]().addClass(`${n}-${i}`)[i]().addClass(`${n}-${i}-${i}`);
      }
      function u() {
        const e = t.rtl,
          i = t.params.pagination;
        if (l()) return;
        const n =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          s = t.pagination.$el;
        let u;
        const d = t.params.loop
          ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
          : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((u = Math.ceil(
                (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
              )),
              u > n - 1 - 2 * t.loopedSlides && (u -= n - 2 * t.loopedSlides),
              u > d - 1 && (u -= d),
              u < 0 && "bullets" !== t.params.paginationType && (u = d + u))
            : (u = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
          "bullets" === i.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const n = t.pagination.bullets;
          let r, l, d;
          if (
            (i.dynamicBullets &&
              ((a = n
                .eq(0)
                [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
              s.css(
                t.isHorizontal() ? "width" : "height",
                a * (i.dynamicMainBullets + 4) + "px"
              ),
              i.dynamicMainBullets > 1 &&
                void 0 !== t.previousIndex &&
                ((o += u - (t.previousIndex - t.loopedSlides || 0)),
                o > i.dynamicMainBullets - 1
                  ? (o = i.dynamicMainBullets - 1)
                  : o < 0 && (o = 0)),
              (r = Math.max(u - o, 0)),
              (l = r + (Math.min(n.length, i.dynamicMainBullets) - 1)),
              (d = (l + r) / 2)),
            n.removeClass(
              ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                .map((e) => `${i.bulletActiveClass}${e}`)
                .join(" ")
            ),
            s.length > 1)
          )
            n.each((e) => {
              const t = Va(e),
                n = t.index();
              n === u && t.addClass(i.bulletActiveClass),
                i.dynamicBullets &&
                  (n >= r &&
                    n <= l &&
                    t.addClass(`${i.bulletActiveClass}-main`),
                  n === r && c(t, "prev"),
                  n === l && c(t, "next"));
            });
          else {
            const e = n.eq(u),
              s = e.index();
            if ((e.addClass(i.bulletActiveClass), i.dynamicBullets)) {
              const e = n.eq(r),
                a = n.eq(l);
              for (let e = r; e <= l; e += 1)
                n.eq(e).addClass(`${i.bulletActiveClass}-main`);
              if (t.params.loop)
                if (s >= n.length) {
                  for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                    n.eq(n.length - e).addClass(`${i.bulletActiveClass}-main`);
                  n.eq(n.length - i.dynamicMainBullets - 1).addClass(
                    `${i.bulletActiveClass}-prev`
                  );
                } else c(e, "prev"), c(a, "next");
              else c(e, "prev"), c(a, "next");
            }
          }
          if (i.dynamicBullets) {
            const r = Math.min(n.length, i.dynamicMainBullets + 4),
              s = (a * r - a) / 2 - d * a,
              o = e ? "right" : "left";
            n.css(t.isHorizontal() ? o : "top", `${s}px`);
          }
        }
        if (
          ("fraction" === i.type &&
            (s.find(zo(i.currentClass)).text(i.formatFractionCurrent(u + 1)),
            s.find(zo(i.totalClass)).text(i.formatFractionTotal(d))),
          "progressbar" === i.type)
        ) {
          let e;
          e = i.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const n = (u + 1) / d;
          let r = 1,
            a = 1;
          "horizontal" === e ? (r = n) : (a = n),
            s
              .find(zo(i.progressbarFillClass))
              .transform(`translate3d(0,0,0) scaleX(${r}) scaleY(${a})`)
              .transition(t.params.speed);
        }
        "custom" === i.type && i.renderCustom
          ? (s.html(i.renderCustom(t, u + 1, d)), r("paginationRender", s[0]))
          : r("paginationUpdate", s[0]),
          t.params.watchOverflow &&
            t.enabled &&
            s[t.isLocked ? "addClass" : "removeClass"](i.lockClass);
      }
      function d() {
        const e = t.params.pagination;
        if (l()) return;
        const i =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          n = t.pagination.$el;
        let s = "";
        if ("bullets" === e.type) {
          let r = t.params.loop
            ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.loop &&
            r > i &&
            (r = i);
          for (let i = 0; i < r; i += 1)
            e.renderBullet
              ? (s += e.renderBullet.call(t, i, e.bulletClass))
              : (s += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
          n.html(s), (t.pagination.bullets = n.find(zo(e.bulletClass)));
        }
        "fraction" === e.type &&
          ((s = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          n.html(s)),
          "progressbar" === e.type &&
            ((s = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
            n.html(s)),
          "custom" !== e.type && r("paginationRender", t.pagination.$el[0]);
      }
      function h() {
        t.params.pagination = $o(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" }
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let i = Va(e.el);
        0 !== i.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            i.length > 1 &&
            ((i = t.$el.find(e.el)),
            i.length > 1 &&
              (i = i.filter((e) => Va(e).parents(".swiper")[0] === t.el))),
          "bullets" === e.type && e.clickable && i.addClass(e.clickableClass),
          i.addClass(e.modifierClass + e.type),
          i.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          "bullets" === e.type &&
            e.dynamicBullets &&
            (i.addClass(`${e.modifierClass}${e.type}-dynamic`),
            (o = 0),
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
          "progressbar" === e.type &&
            e.progressbarOpposite &&
            i.addClass(e.progressbarOppositeClass),
          e.clickable &&
            i.on("click", zo(e.bulletClass), function (e) {
              e.preventDefault();
              let i = Va(this).index() * t.params.slidesPerGroup;
              t.params.loop && (i += t.loopedSlides), t.slideTo(i);
            }),
          Object.assign(t.pagination, { $el: i, el: i[0] }),
          t.enabled || i.addClass(e.lockClass));
      }
      function p() {
        const e = t.params.pagination;
        if (l()) return;
        const i = t.pagination.$el;
        i.removeClass(e.hiddenClass),
          i.removeClass(e.modifierClass + e.type),
          i.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          t.pagination.bullets &&
            t.pagination.bullets.removeClass &&
            t.pagination.bullets.removeClass(e.bulletActiveClass),
          e.clickable && i.off("click", zo(e.bulletClass));
      }
      n("init", () => {
        !1 === t.params.pagination.enabled ? f() : (h(), d(), u());
      }),
        n("activeIndexChange", () => {
          (t.params.loop || void 0 === t.snapIndex) && u();
        }),
        n("snapIndexChange", () => {
          t.params.loop || u();
        }),
        n("slidesLengthChange", () => {
          t.params.loop && (d(), u());
        }),
        n("snapGridLengthChange", () => {
          t.params.loop || (d(), u());
        }),
        n("destroy", () => {
          p();
        }),
        n("enable disable", () => {
          const { $el: e } = t.pagination;
          e &&
            e[t.enabled ? "removeClass" : "addClass"](
              t.params.pagination.lockClass
            );
        }),
        n("lock unlock", () => {
          u();
        }),
        n("click", (e, i) => {
          const n = i.target,
            { $el: s } = t.pagination;
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            s.length > 0 &&
            !Va(n).hasClass(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && n === t.navigation.nextEl) ||
                (t.navigation.prevEl && n === t.navigation.prevEl))
            )
              return;
            const e = s.hasClass(t.params.pagination.hiddenClass);
            r(!0 === e ? "paginationShow" : "paginationHide"),
              s.toggleClass(t.params.pagination.hiddenClass);
          }
        });
      const f = () => {
        t.$el.addClass(t.params.pagination.paginationDisabledClass),
          t.pagination.$el &&
            t.pagination.$el.addClass(
              t.params.pagination.paginationDisabledClass
            ),
          p();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.$el.removeClass(t.params.pagination.paginationDisabledClass),
            t.pagination.$el &&
              t.pagination.$el.removeClass(
                t.params.pagination.paginationDisabledClass
              ),
            h(),
            d(),
            u();
        },
        disable: f,
        render: d,
        update: u,
        init: h,
        destroy: p,
      });
    }
    function Fo(e) {
      let { swiper: t, extendParams: i, on: n, emit: r } = e;
      const s = Ba();
      i({
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      }),
        (t.zoom = { enabled: !1 });
      let a,
        o,
        l,
        c = 1,
        u = !1;
      const d = {
          $slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          $imageEl: void 0,
          $imageWrapEl: void 0,
          maxRatio: 3,
        },
        h = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        p = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        };
      let f = 1;
      function m(e) {
        if (e.targetTouches.length < 2) return 1;
        const t = e.targetTouches[0].pageX,
          i = e.targetTouches[0].pageY,
          n = e.targetTouches[1].pageX,
          r = e.targetTouches[1].pageY;
        return Math.sqrt((n - t) ** 2 + (r - i) ** 2);
      }
      function g(e) {
        const i = t.support,
          n = t.params.zoom;
        if (((o = !1), (l = !1), !i.gestures)) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (o = !0), (d.scaleStart = m(e));
        }
        (d.$slideEl && d.$slideEl.length) ||
        ((d.$slideEl = Va(e.target).closest(`.${t.params.slideClass}`)),
        0 === d.$slideEl.length && (d.$slideEl = t.slides.eq(t.activeIndex)),
        (d.$imageEl = d.$slideEl
          .find(`.${n.containerClass}`)
          .eq(0)
          .find("picture, img, svg, canvas, .swiper-zoom-target")
          .eq(0)),
        (d.$imageWrapEl = d.$imageEl.parent(`.${n.containerClass}`)),
        (d.maxRatio = d.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio),
        0 !== d.$imageWrapEl.length)
          ? (d.$imageEl && d.$imageEl.transition(0), (u = !0))
          : (d.$imageEl = void 0);
      }
      function v(e) {
        const i = t.support,
          n = t.params.zoom,
          r = t.zoom;
        if (!i.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (l = !0), (d.scaleMove = m(e));
        }
        d.$imageEl && 0 !== d.$imageEl.length
          ? (i.gestures
              ? (r.scale = e.scale * c)
              : (r.scale = (d.scaleMove / d.scaleStart) * c),
            r.scale > d.maxRatio &&
              (r.scale = d.maxRatio - 1 + (r.scale - d.maxRatio + 1) ** 0.5),
            r.scale < n.minRatio &&
              (r.scale = n.minRatio + 1 - (n.minRatio - r.scale + 1) ** 0.5),
            d.$imageEl.transform(`translate3d(0,0,0) scale(${r.scale})`))
          : "gesturechange" === e.type && g(e);
      }
      function y(e) {
        const i = t.device,
          n = t.support,
          r = t.params.zoom,
          s = t.zoom;
        if (!n.gestures) {
          if (!o || !l) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !i.android)
          )
            return;
          (o = !1), (l = !1);
        }
        d.$imageEl &&
          0 !== d.$imageEl.length &&
          ((s.scale = Math.max(Math.min(s.scale, d.maxRatio), r.minRatio)),
          d.$imageEl
            .transition(t.params.speed)
            .transform(`translate3d(0,0,0) scale(${s.scale})`),
          (c = s.scale),
          (u = !1),
          1 === s.scale && (d.$slideEl = void 0));
      }
      function b(e) {
        const i = t.zoom;
        if (!d.$imageEl || 0 === d.$imageEl.length) return;
        if (((t.allowClick = !1), !h.isTouched || !d.$slideEl)) return;
        h.isMoved ||
          ((h.width = d.$imageEl[0].offsetWidth),
          (h.height = d.$imageEl[0].offsetHeight),
          (h.startX = Qa(d.$imageWrapEl[0], "x") || 0),
          (h.startY = Qa(d.$imageWrapEl[0], "y") || 0),
          (d.slideWidth = d.$slideEl[0].offsetWidth),
          (d.slideHeight = d.$slideEl[0].offsetHeight),
          d.$imageWrapEl.transition(0));
        const n = h.width * i.scale,
          r = h.height * i.scale;
        if (!(n < d.slideWidth && r < d.slideHeight)) {
          if (
            ((h.minX = Math.min(d.slideWidth / 2 - n / 2, 0)),
            (h.maxX = -h.minX),
            (h.minY = Math.min(d.slideHeight / 2 - r / 2, 0)),
            (h.maxY = -h.minY),
            (h.touchesCurrent.x =
              "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (h.touchesCurrent.y =
              "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
            !h.isMoved && !u)
          ) {
            if (
              t.isHorizontal() &&
              ((Math.floor(h.minX) === Math.floor(h.startX) &&
                h.touchesCurrent.x < h.touchesStart.x) ||
                (Math.floor(h.maxX) === Math.floor(h.startX) &&
                  h.touchesCurrent.x > h.touchesStart.x))
            )
              return void (h.isTouched = !1);
            if (
              !t.isHorizontal() &&
              ((Math.floor(h.minY) === Math.floor(h.startY) &&
                h.touchesCurrent.y < h.touchesStart.y) ||
                (Math.floor(h.maxY) === Math.floor(h.startY) &&
                  h.touchesCurrent.y > h.touchesStart.y))
            )
              return void (h.isTouched = !1);
          }
          e.cancelable && e.preventDefault(),
            e.stopPropagation(),
            (h.isMoved = !0),
            (h.currentX = h.touchesCurrent.x - h.touchesStart.x + h.startX),
            (h.currentY = h.touchesCurrent.y - h.touchesStart.y + h.startY),
            h.currentX < h.minX &&
              (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** 0.8),
            h.currentX > h.maxX &&
              (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** 0.8),
            h.currentY < h.minY &&
              (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** 0.8),
            h.currentY > h.maxY &&
              (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** 0.8),
            p.prevPositionX || (p.prevPositionX = h.touchesCurrent.x),
            p.prevPositionY || (p.prevPositionY = h.touchesCurrent.y),
            p.prevTime || (p.prevTime = Date.now()),
            (p.x =
              (h.touchesCurrent.x - p.prevPositionX) /
              (Date.now() - p.prevTime) /
              2),
            (p.y =
              (h.touchesCurrent.y - p.prevPositionY) /
              (Date.now() - p.prevTime) /
              2),
            Math.abs(h.touchesCurrent.x - p.prevPositionX) < 2 && (p.x = 0),
            Math.abs(h.touchesCurrent.y - p.prevPositionY) < 2 && (p.y = 0),
            (p.prevPositionX = h.touchesCurrent.x),
            (p.prevPositionY = h.touchesCurrent.y),
            (p.prevTime = Date.now()),
            d.$imageWrapEl.transform(
              `translate3d(${h.currentX}px, ${h.currentY}px,0)`
            );
        }
      }
      function w() {
        const e = t.zoom;
        d.$slideEl &&
          t.previousIndex !== t.activeIndex &&
          (d.$imageEl && d.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          d.$imageWrapEl && d.$imageWrapEl.transform("translate3d(0,0,0)"),
          (e.scale = 1),
          (c = 1),
          (d.$slideEl = void 0),
          (d.$imageEl = void 0),
          (d.$imageWrapEl = void 0));
      }
      function _(e) {
        const i = t.zoom,
          n = t.params.zoom;
        if (
          (d.$slideEl ||
            (e &&
              e.target &&
              (d.$slideEl = Va(e.target).closest(`.${t.params.slideClass}`)),
            d.$slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (d.$slideEl = t.$wrapperEl.children(
                    `.${t.params.slideActiveClass}`
                  ))
                : (d.$slideEl = t.slides.eq(t.activeIndex))),
            (d.$imageEl = d.$slideEl
              .find(`.${n.containerClass}`)
              .eq(0)
              .find("picture, img, svg, canvas, .swiper-zoom-target")
              .eq(0)),
            (d.$imageWrapEl = d.$imageEl.parent(`.${n.containerClass}`))),
          !d.$imageEl ||
            0 === d.$imageEl.length ||
            !d.$imageWrapEl ||
            0 === d.$imageWrapEl.length)
        )
          return;
        let r, a, o, l, u, p, f, m, g, v, y, b, w, _, x, T, E, S;
        t.params.cssMode &&
          ((t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.touchAction = "none")),
          d.$slideEl.addClass(`${n.zoomedSlideClass}`),
          void 0 === h.touchesStart.x && e
            ? ((r =
                "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
              (a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((r = h.touchesStart.x), (a = h.touchesStart.y)),
          (i.scale = d.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio),
          (c = d.$imageWrapEl.attr("data-swiper-zoom") || n.maxRatio),
          e
            ? ((E = d.$slideEl[0].offsetWidth),
              (S = d.$slideEl[0].offsetHeight),
              (o = d.$slideEl.offset().left + s.scrollX),
              (l = d.$slideEl.offset().top + s.scrollY),
              (u = o + E / 2 - r),
              (p = l + S / 2 - a),
              (g = d.$imageEl[0].offsetWidth),
              (v = d.$imageEl[0].offsetHeight),
              (y = g * i.scale),
              (b = v * i.scale),
              (w = Math.min(E / 2 - y / 2, 0)),
              (_ = Math.min(S / 2 - b / 2, 0)),
              (x = -w),
              (T = -_),
              (f = u * i.scale),
              (m = p * i.scale),
              f < w && (f = w),
              f > x && (f = x),
              m < _ && (m = _),
              m > T && (m = T))
            : ((f = 0), (m = 0)),
          d.$imageWrapEl
            .transition(300)
            .transform(`translate3d(${f}px, ${m}px,0)`),
          d.$imageEl
            .transition(300)
            .transform(`translate3d(0,0,0) scale(${i.scale})`);
      }
      function x() {
        const e = t.zoom,
          i = t.params.zoom;
        d.$slideEl ||
          (t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (d.$slideEl = t.$wrapperEl.children(
                `.${t.params.slideActiveClass}`
              ))
            : (d.$slideEl = t.slides.eq(t.activeIndex)),
          (d.$imageEl = d.$slideEl
            .find(`.${i.containerClass}`)
            .eq(0)
            .find("picture, img, svg, canvas, .swiper-zoom-target")
            .eq(0)),
          (d.$imageWrapEl = d.$imageEl.parent(`.${i.containerClass}`))),
          d.$imageEl &&
            0 !== d.$imageEl.length &&
            d.$imageWrapEl &&
            0 !== d.$imageWrapEl.length &&
            (t.params.cssMode &&
              ((t.wrapperEl.style.overflow = ""),
              (t.wrapperEl.style.touchAction = "")),
            (e.scale = 1),
            (c = 1),
            d.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            d.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            d.$slideEl.removeClass(`${i.zoomedSlideClass}`),
            (d.$slideEl = void 0));
      }
      function T(e) {
        const i = t.zoom;
        i.scale && 1 !== i.scale ? x() : _(e);
      }
      function E() {
        const e = t.support;
        return {
          passiveListener: !(
            "touchstart" !== t.touchEvents.start ||
            !e.passiveListener ||
            !t.params.passiveListeners
          ) && { passive: !0, capture: !1 },
          activeListenerWithCapture: !e.passiveListener || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function S() {
        return `.${t.params.slideClass}`;
      }
      function C(e) {
        const { passiveListener: i } = E(),
          n = S();
        t.$wrapperEl[e]("gesturestart", n, g, i),
          t.$wrapperEl[e]("gesturechange", n, v, i),
          t.$wrapperEl[e]("gestureend", n, y, i);
      }
      function M() {
        a || ((a = !0), C("on"));
      }
      function O() {
        a && ((a = !1), C("off"));
      }
      function D() {
        const e = t.zoom;
        if (e.enabled) return;
        e.enabled = !0;
        const i = t.support,
          { passiveListener: n, activeListenerWithCapture: r } = E(),
          s = S();
        i.gestures
          ? (t.$wrapperEl.on(t.touchEvents.start, M, n),
            t.$wrapperEl.on(t.touchEvents.end, O, n))
          : "touchstart" === t.touchEvents.start &&
            (t.$wrapperEl.on(t.touchEvents.start, s, g, n),
            t.$wrapperEl.on(t.touchEvents.move, s, v, r),
            t.$wrapperEl.on(t.touchEvents.end, s, y, n),
            t.touchEvents.cancel &&
              t.$wrapperEl.on(t.touchEvents.cancel, s, y, n)),
          t.$wrapperEl.on(
            t.touchEvents.move,
            `.${t.params.zoom.containerClass}`,
            b,
            r
          );
      }
      function A() {
        const e = t.zoom;
        if (!e.enabled) return;
        const i = t.support;
        e.enabled = !1;
        const { passiveListener: n, activeListenerWithCapture: r } = E(),
          s = S();
        i.gestures
          ? (t.$wrapperEl.off(t.touchEvents.start, M, n),
            t.$wrapperEl.off(t.touchEvents.end, O, n))
          : "touchstart" === t.touchEvents.start &&
            (t.$wrapperEl.off(t.touchEvents.start, s, g, n),
            t.$wrapperEl.off(t.touchEvents.move, s, v, r),
            t.$wrapperEl.off(t.touchEvents.end, s, y, n),
            t.touchEvents.cancel &&
              t.$wrapperEl.off(t.touchEvents.cancel, s, y, n)),
          t.$wrapperEl.off(
            t.touchEvents.move,
            `.${t.params.zoom.containerClass}`,
            b,
            r
          );
      }
      Object.defineProperty(t.zoom, "scale", {
        get: () => f,
        set(e) {
          if (f !== e) {
            const t = d.$imageEl ? d.$imageEl[0] : void 0,
              i = d.$slideEl ? d.$slideEl[0] : void 0;
            r("zoomChange", e, t, i);
          }
          f = e;
        },
      }),
        n("init", () => {
          t.params.zoom.enabled && D();
        }),
        n("destroy", () => {
          A();
        }),
        n("touchStart", (e, i) => {
          t.zoom.enabled &&
            (function (e) {
              const i = t.device;
              d.$imageEl &&
                0 !== d.$imageEl.length &&
                (h.isTouched ||
                  (i.android && e.cancelable && e.preventDefault(),
                  (h.isTouched = !0),
                  (h.touchesStart.x =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (h.touchesStart.y =
                    "touchstart" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY)));
            })(i);
        }),
        n("touchEnd", (e, i) => {
          t.zoom.enabled &&
            (function () {
              const e = t.zoom;
              if (!d.$imageEl || 0 === d.$imageEl.length) return;
              if (!h.isTouched || !h.isMoved)
                return (h.isTouched = !1), void (h.isMoved = !1);
              (h.isTouched = !1), (h.isMoved = !1);
              let i = 300,
                n = 300;
              const r = p.x * i,
                s = h.currentX + r,
                a = p.y * n,
                o = h.currentY + a;
              0 !== p.x && (i = Math.abs((s - h.currentX) / p.x)),
                0 !== p.y && (n = Math.abs((o - h.currentY) / p.y));
              const l = Math.max(i, n);
              (h.currentX = s), (h.currentY = o);
              const c = h.width * e.scale,
                u = h.height * e.scale;
              (h.minX = Math.min(d.slideWidth / 2 - c / 2, 0)),
                (h.maxX = -h.minX),
                (h.minY = Math.min(d.slideHeight / 2 - u / 2, 0)),
                (h.maxY = -h.minY),
                (h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX)),
                (h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY)),
                d.$imageWrapEl
                  .transition(l)
                  .transform(`translate3d(${h.currentX}px, ${h.currentY}px,0)`);
            })();
        }),
        n("doubleTap", (e, i) => {
          !t.animating &&
            t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            T(i);
        }),
        n("transitionEnd", () => {
          t.zoom.enabled && t.params.zoom.enabled && w();
        }),
        n("slideChange", () => {
          t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && w();
        }),
        Object.assign(t.zoom, {
          enable: D,
          disable: A,
          in: _,
          out: x,
          toggle: T,
        });
    }
    function Bo(e) {
      let { swiper: t, extendParams: i, on: n, emit: r } = e;
      i({
        lazy: {
          checkInView: !1,
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          scrollingElement: "",
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader",
        },
      }),
        (t.lazy = {});
      let s = !1,
        a = !1;
      function o(e, i) {
        void 0 === i && (i = !0);
        const n = t.params.lazy;
        if (void 0 === e) return;
        if (0 === t.slides.length) return;
        const s =
            t.virtual && t.params.virtual.enabled
              ? t.$wrapperEl.children(
                  `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
                )
              : t.slides.eq(e),
          a = s.find(
            `.${n.elementClass}:not(.${n.loadedClass}):not(.${n.loadingClass})`
          );
        !s.hasClass(n.elementClass) ||
          s.hasClass(n.loadedClass) ||
          s.hasClass(n.loadingClass) ||
          a.push(s[0]),
          0 !== a.length &&
            a.each((e) => {
              const a = Va(e);
              a.addClass(n.loadingClass);
              const l = a.attr("data-background"),
                c = a.attr("data-src"),
                u = a.attr("data-srcset"),
                d = a.attr("data-sizes"),
                h = a.parent("picture");
              t.loadImage(a[0], c || l, u, d, !1, () => {
                if (null != t && t && (!t || t.params) && !t.destroyed) {
                  if (
                    (l
                      ? (a.css("background-image", `url("${l}")`),
                        a.removeAttr("data-background"))
                      : (u &&
                          (a.attr("srcset", u), a.removeAttr("data-srcset")),
                        d && (a.attr("sizes", d), a.removeAttr("data-sizes")),
                        h.length &&
                          h.children("source").each((e) => {
                            const t = Va(e);
                            t.attr("data-srcset") &&
                              (t.attr("srcset", t.attr("data-srcset")),
                              t.removeAttr("data-srcset"));
                          }),
                        c && (a.attr("src", c), a.removeAttr("data-src"))),
                    a.addClass(n.loadedClass).removeClass(n.loadingClass),
                    s.find(`.${n.preloaderClass}`).remove(),
                    t.params.loop && i)
                  ) {
                    const e = s.attr("data-swiper-slide-index");
                    if (s.hasClass(t.params.slideDuplicateClass)) {
                      o(
                        t.$wrapperEl
                          .children(
                            `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                          )
                          .index(),
                        !1
                      );
                    } else {
                      o(
                        t.$wrapperEl
                          .children(
                            `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                          )
                          .index(),
                        !1
                      );
                    }
                  }
                  r("lazyImageReady", s[0], a[0]),
                    t.params.autoHeight && t.updateAutoHeight();
                }
              }),
                r("lazyImageLoad", s[0], a[0]);
            });
      }
      function l() {
        const { $wrapperEl: e, params: i, slides: n, activeIndex: r } = t,
          s = t.virtual && i.virtual.enabled,
          l = i.lazy;
        let c = i.slidesPerView;
        function u(t) {
          if (s) {
            if (
              e.children(`.${i.slideClass}[data-swiper-slide-index="${t}"]`)
                .length
            )
              return !0;
          } else if (n[t]) return !0;
          return !1;
        }
        function d(e) {
          return s ? Va(e).attr("data-swiper-slide-index") : Va(e).index();
        }
        if (
          ("auto" === c && (c = 0), a || (a = !0), t.params.watchSlidesProgress)
        )
          e.children(`.${i.slideVisibleClass}`).each((e) => {
            o(s ? Va(e).attr("data-swiper-slide-index") : Va(e).index());
          });
        else if (c > 1) for (let e = r; e < r + c; e += 1) u(e) && o(e);
        else o(r);
        if (l.loadPrevNext)
          if (c > 1 || (l.loadPrevNextAmount && l.loadPrevNextAmount > 1)) {
            const e = l.loadPrevNextAmount,
              t = Math.ceil(c),
              i = Math.min(r + t + Math.max(e, t), n.length),
              s = Math.max(r - Math.max(t, e), 0);
            for (let e = r + t; e < i; e += 1) u(e) && o(e);
            for (let e = s; e < r; e += 1) u(e) && o(e);
          } else {
            const t = e.children(`.${i.slideNextClass}`);
            t.length > 0 && o(d(t));
            const n = e.children(`.${i.slidePrevClass}`);
            n.length > 0 && o(d(n));
          }
      }
      function c() {
        const e = Ba();
        if (!t || t.destroyed) return;
        const i = t.params.lazy.scrollingElement
            ? Va(t.params.lazy.scrollingElement)
            : Va(e),
          n = i[0] === e,
          r = n ? e.innerWidth : i[0].offsetWidth,
          a = n ? e.innerHeight : i[0].offsetHeight,
          o = t.$el.offset(),
          { rtlTranslate: u } = t;
        let d = !1;
        u && (o.left -= t.$el[0].scrollLeft);
        const h = [
          [o.left, o.top],
          [o.left + t.width, o.top],
          [o.left, o.top + t.height],
          [o.left + t.width, o.top + t.height],
        ];
        for (let e = 0; e < h.length; e += 1) {
          const t = h[e];
          if (t[0] >= 0 && t[0] <= r && t[1] >= 0 && t[1] <= a) {
            if (0 === t[0] && 0 === t[1]) continue;
            d = !0;
          }
        }
        const p = !(
          "touchstart" !== t.touchEvents.start ||
          !t.support.passiveListener ||
          !t.params.passiveListeners
        ) && { passive: !0, capture: !1 };
        d
          ? (l(), i.off("scroll", c, p))
          : s || ((s = !0), i.on("scroll", c, p));
      }
      n("beforeInit", () => {
        t.params.lazy.enabled &&
          t.params.preloadImages &&
          (t.params.preloadImages = !1);
      }),
        n("init", () => {
          t.params.lazy.enabled && (t.params.lazy.checkInView ? c() : l());
        }),
        n("scroll", () => {
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            !t.params.freeMode.sticky &&
            l();
        }),
        n("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
          t.params.lazy.enabled && (t.params.lazy.checkInView ? c() : l());
        }),
        n("transitionStart", () => {
          t.params.lazy.enabled &&
            (t.params.lazy.loadOnTransitionStart ||
              (!t.params.lazy.loadOnTransitionStart && !a)) &&
            (t.params.lazy.checkInView ? c() : l());
        }),
        n("transitionEnd", () => {
          t.params.lazy.enabled &&
            !t.params.lazy.loadOnTransitionStart &&
            (t.params.lazy.checkInView ? c() : l());
        }),
        n("slideChange", () => {
          const {
            lazy: e,
            cssMode: i,
            watchSlidesProgress: n,
            touchReleaseOnEdges: r,
            resistanceRatio: s,
          } = t.params;
          e.enabled && (i || (n && (r || 0 === s))) && l();
        }),
        n("destroy", () => {
          t.$el &&
            t.$el
              .find(`.${t.params.lazy.loadingClass}`)
              .removeClass(t.params.lazy.loadingClass);
        }),
        Object.assign(t.lazy, { load: l, loadInSlide: o });
    }
    function No(e) {
      let { swiper: t, extendParams: i, on: n } = e;
      i({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let r = !1,
        s = !1;
      function a() {
        const e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        const i = e.clickedIndex,
          n = e.clickedSlide;
        if (n && Va(n).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
        if (null == i) return;
        let r;
        if (
          ((r = e.params.loop
            ? parseInt(Va(e.clickedSlide).attr("data-swiper-slide-index"), 10)
            : i),
          t.params.loop)
        ) {
          let e = t.activeIndex;
          t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
            (t.loopFix(),
            (t._clientLeft = t.$wrapperEl[0].clientLeft),
            (e = t.activeIndex));
          const i = t.slides
              .eq(e)
              .prevAll(`[data-swiper-slide-index="${r}"]`)
              .eq(0)
              .index(),
            n = t.slides
              .eq(e)
              .nextAll(`[data-swiper-slide-index="${r}"]`)
              .eq(0)
              .index();
          r = void 0 === i ? n : void 0 === n ? i : n - e < e - i ? n : i;
        }
        t.slideTo(r);
      }
      function o() {
        const { thumbs: e } = t.params;
        if (r) return !1;
        r = !0;
        const i = t.constructor;
        if (e.swiper instanceof i)
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            });
        else if (Ka(e.swiper)) {
          const n = Object.assign({}, e.swiper);
          Object.assign(n, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new i(n)),
            (s = !0);
        }
        return (
          t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
          t.thumbs.swiper.on("tap", a),
          !0
        );
      }
      function l(e) {
        const i = t.thumbs.swiper;
        if (!i || i.destroyed) return;
        const n =
            "auto" === i.params.slidesPerView
              ? i.slidesPerViewDynamic()
              : i.params.slidesPerView,
          r = t.params.thumbs.autoScrollOffset,
          s = r && !i.params.loop;
        if (t.realIndex !== i.realIndex || s) {
          let a,
            o,
            l = i.activeIndex;
          if (i.params.loop) {
            i.slides.eq(l).hasClass(i.params.slideDuplicateClass) &&
              (i.loopFix(),
              (i._clientLeft = i.$wrapperEl[0].clientLeft),
              (l = i.activeIndex));
            const e = i.slides
                .eq(l)
                .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index(),
              n = i.slides
                .eq(l)
                .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                .eq(0)
                .index();
            (a =
              void 0 === e
                ? n
                : void 0 === n
                ? e
                : n - l == l - e
                ? i.params.slidesPerGroup > 1
                  ? n
                  : l
                : n - l < l - e
                ? n
                : e),
              (o = t.activeIndex > t.previousIndex ? "next" : "prev");
          } else (a = t.realIndex), (o = a > t.previousIndex ? "next" : "prev");
          s && (a += "next" === o ? r : -1 * r),
            i.visibleSlidesIndexes &&
              i.visibleSlidesIndexes.indexOf(a) < 0 &&
              (i.params.centeredSlides
                ? (a =
                    a > l
                      ? a - Math.floor(n / 2) + 1
                      : a + Math.floor(n / 2) - 1)
                : a > l && i.params.slidesPerGroup,
              i.slideTo(a, e ? 0 : void 0));
        }
        let a = 1;
        const o = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (a = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (a = 1),
          (a = Math.floor(a)),
          i.slides.removeClass(o),
          i.params.loop || (i.params.virtual && i.params.virtual.enabled))
        )
          for (let e = 0; e < a; e += 1)
            i.$wrapperEl
              .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
              .addClass(o);
        else
          for (let e = 0; e < a; e += 1)
            i.slides.eq(t.realIndex + e).addClass(o);
      }
      (t.thumbs = { swiper: null }),
        n("beforeInit", () => {
          const { thumbs: e } = t.params;
          e && e.swiper && (o(), l(!0));
        }),
        n("slideChange update resize observerUpdate", () => {
          l();
        }),
        n("setTransition", (e, i) => {
          const n = t.thumbs.swiper;
          n && !n.destroyed && n.setTransition(i);
        }),
        n("beforeDestroy", () => {
          const e = t.thumbs.swiper;
          e && !e.destroyed && s && e.destroy();
        }),
        Object.assign(t.thumbs, { init: o, update: l });
    }
    function qo(e) {
      const t = this,
        { $wrapperEl: i, params: n } = t;
      if ((n.loop && t.loopDestroy(), "object" == typeof e && "length" in e))
        for (let t = 0; t < e.length; t += 1) e[t] && i.append(e[t]);
      else i.append(e);
      n.loop && t.loopCreate(), n.observer || t.update();
    }
    function Xo(e) {
      const t = this,
        { params: i, $wrapperEl: n, activeIndex: r } = t;
      i.loop && t.loopDestroy();
      let s = r + 1;
      if ("object" == typeof e && "length" in e) {
        for (let t = 0; t < e.length; t += 1) e[t] && n.prepend(e[t]);
        s = r + e.length;
      } else n.prepend(e);
      i.loop && t.loopCreate(), i.observer || t.update(), t.slideTo(s, 0, !1);
    }
    function Yo(e, t) {
      const i = this,
        { $wrapperEl: n, params: r, activeIndex: s } = i;
      let a = s;
      r.loop &&
        ((a -= i.loopedSlides),
        i.loopDestroy(),
        (i.slides = n.children(`.${r.slideClass}`)));
      const o = i.slides.length;
      if (e <= 0) return void i.prependSlide(t);
      if (e >= o) return void i.appendSlide(t);
      let l = a > e ? a + 1 : a;
      const c = [];
      for (let t = o - 1; t >= e; t -= 1) {
        const e = i.slides.eq(t);
        e.remove(), c.unshift(e);
      }
      if ("object" == typeof t && "length" in t) {
        for (let e = 0; e < t.length; e += 1) t[e] && n.append(t[e]);
        l = a > e ? a + t.length : a;
      } else n.append(t);
      for (let e = 0; e < c.length; e += 1) n.append(c[e]);
      r.loop && i.loopCreate(),
        r.observer || i.update(),
        r.loop ? i.slideTo(l + i.loopedSlides, 0, !1) : i.slideTo(l, 0, !1);
    }
    function Go(e) {
      const t = this,
        { params: i, $wrapperEl: n, activeIndex: r } = t;
      let s = r;
      i.loop &&
        ((s -= t.loopedSlides),
        t.loopDestroy(),
        (t.slides = n.children(`.${i.slideClass}`)));
      let a,
        o = s;
      if ("object" == typeof e && "length" in e) {
        for (let i = 0; i < e.length; i += 1)
          (a = e[i]), t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1);
        o = Math.max(o, 0);
      } else
        (a = e),
          t.slides[a] && t.slides.eq(a).remove(),
          a < o && (o -= 1),
          (o = Math.max(o, 0));
      i.loop && t.loopCreate(),
        i.observer || t.update(),
        i.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1);
    }
    function Ho() {
      const e = this,
        t = [];
      for (let i = 0; i < e.slides.length; i += 1) t.push(i);
      e.removeSlide(t);
    }
    function jo(e) {
      let { swiper: t } = e;
      Object.assign(t, {
        appendSlide: qo.bind(t),
        prependSlide: Xo.bind(t),
        addSlide: Yo.bind(t),
        removeSlide: Go.bind(t),
        removeAllSlides: Ho.bind(t),
      });
    }
    var Vo = i(187),
      Uo = i.n(Vo);
    class Wo extends Uo() {
      constructor() {
        super(), this.initEvents();
      }
      hideLoader() {
        Cn.timeline({
          onComplete: () => {
            Cn.set(".loader", { y: "100%" }), this.emit("complete");
          },
        })
          .to("#loader-content", {
            opacity: 0,
            duration: "0.5",
            ease: "power2.out",
          })
          .to(".loader", {
            y: "-100%",
            duration: 0.85,
            ease: "power2.out",
            stagger: { each: 0.15, from: "end" },
          });
      }
      initEvents() {
        Cn.utils
          .toArray([
            "a[href]:not(.lightbox):not(.pagination_link):not(.download)",
          ])
          .forEach((e) => {
            e.addEventListener("click", (t) => {
              Cn.timeline({
                onComplete: () => {
                  window.location.href = e.getAttribute("href");
                },
              })
                .to(".loader", {
                  y: "0%",
                  duration: 0.85,
                  ease: "power2.in",
                  stagger: { each: 0.15 },
                })
                .to("#loader-content", {
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.in",
                }),
                t.preventDefault();
            });
          });
      }
    }
    class Qo {
      constructor() {
        (this.graphics = document.getElementById("section-graphics")),
          (this.services = document.getElementById("services")),
          (this.prevBtn = document.getElementById("btn-prev")),
          (this.values = document.getElementById("values")),
          this.graphics && this.initGraphics(),
          this.services && this.initServices(),
          this.prevBtn && this.initPrevBtn(),
          this.values && this.initValues();
      }
      initGraphics() {
        const e = (e) => {
          const t = this.graphics
              .querySelector(".graphics-circle div")
              .getBoundingClientRect(),
            i = this.graphics.getBoundingClientRect();
          return `circle(${
            e ? Math.hypot(t.top - i.top, i.width - t.left) : "0"
          }px at ${t.left}px ${t.top - i.top}px)`;
        };
        va.create({
          animation: Cn.timeline().fromTo(
            "#section-graphics section:nth-child(2)",
            { clipPath: () => e(!1) },
            { clipPath: () => e(!0), ease: "power2.inOut" }
          ),
          invalidateOnRefresh: !0,
          trigger: this.graphics,
          start: "top top",
          scrub: !0,
          pin: !0,
          end: "200%",
        });
      }
      initServices() {
        Cn.utils.toArray("#services section").forEach((e, t) => {
          va.create({
            animation: Cn.timeline()
              .to(e.querySelector(".service-side:nth-child(1)"), {
                opacity: 0,
                filter: "blur(10px)",
                scale: 0.8,
                y: -0.05 * e.offsetHeight + "px",
              })
              .to(
                e.querySelector(".service-side:nth-child(2)"),
                { y: -e.offsetHeight, ease: "linear" },
                "0"
              ),
            trigger: e,
            start: "top top",
            scrub: !0,
            pin: !0,
            pinSpacing: !1,
          });
        });
      }
      initPrevBtn() {
        va.create({
          trigger: this.prevBtn,
          start: () =>
            "top top+=" + (document.querySelector("header").clientHeight + 30),
          pin: !0,
          scrub: !0,
          pinSpacing: !1,
          endTrigger: this.prevBtn.parentNode,
          end: () =>
            "bottom top+=" +
            (document.querySelector("header").clientHeight + 190),
        });
      }
      initValues() {
        const e = Cn.utils.toArray("#values section");
        e.forEach((t, i) => {
          const n = Cn.timeline()
            .to(t.querySelector(".value-side:nth-child(1)"), {
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.8,
              y: -0.05 * t.offsetHeight + "px",
            })
            .to(
              t.querySelector(".value-side:nth-child(2)"),
              { y: -t.offsetHeight, ease: "linear" },
              "0"
            );
          i === e.length - 1 &&
            (Cn.set(t, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
            }),
            n.add(
              Cn.to(t, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "linear",
              }),
              "0"
            )),
            va.create({
              animation: n,
              trigger: t,
              start: "top top",
              scrub: !0,
              pin: !0,
              pinSpacing: !1,
            });
        });
      }
    }
    class Ko {
      constructor(e) {
        (this.thumbsManual = !1),
          (this.lightbox = this.initTemplate()),
          (this.DOM = {
            el: e,
            lightboxItems: [...(e.querySelectorAll(".lightbox") || [])].filter(
              (e) => !!e.getAttribute("href")
            ),
            overlay: this.lightbox.querySelector(".sl--overlay"),
            container: this.lightbox.querySelector(".sl--container"),
            backdrop: this.lightbox.querySelector(".sl--backdrop"),
            btnZoom: this.lightbox.querySelector(".sl--zoom"),
            btnFullScreen: this.lightbox.querySelector(".sl--fullscreen"),
            btnClose: this.lightbox.querySelector(".sl--close"),
            btnThumbs: this.lightbox.querySelector(".sl--thumbs"),
            swiper: this.lightbox.querySelector(".sl--middle .swiper"),
            thumbnails: this.lightbox.querySelector(".sl--bottom .swiper"),
            swiperPrev: this.lightbox.querySelector(".sl--swiper-button-prev"),
            swiperNext: this.lightbox.querySelector(".sl--swiper-button-next"),
            swiperFraction: this.lightbox.querySelector(".sl--fraction"),
            lightboxBottom: this.lightbox.querySelector(".sl--bottom"),
          }),
          this.initSwiper(),
          this.initEvents();
      }
      initTemplate() {
        (this.lightbox = document.createElement("div")),
          (this.lightbox.className = "sl--overlay"),
          this.lightbox.setAttribute("tabindex", "-1");
        const e = document.createElement("template");
        return (
          (e.innerHTML =
            '\n      <div class="sl--backdrop"></div>\n      <div class="sl--container">\n        <div class="sl--top">\n          <div class="sl--fraction"></div>\n          <button type="button" class="sl--thumbs active">\n            <i class="sl--icon icon-th-thumb-empty"></i>\n            <i class="sl--icon icon-th-thumb"></i>\n          </button>\n          <button type="button" class="sl--fullscreen">\n            <i class="sl--icon icon-resize-full"></i>\n            <i class="sl--icon icon-resize-normal"></i>\n          </button>\n          <button type="button" class="sl--zoom">\n            <i class="sl--icon icon-zoom-in"></i>\n            <i class="sl--icon icon-zoom-out"></i>\n          </button>\n          <button type="button" class="sl--close">\n            <i class="sl--icon icon-cancel"></i>\n          </button>\n        </div>\n        <div class="sl--middle">\n          <div class="swiper">\n            <div class="swiper-wrapper">\n            </div>\n            <button type="button" class="sl--swiper-button-prev">\n              <i class="sl--icon icon-left"></i>\n            </button>\n            <button type="button" class="sl--swiper-button-next">\n              <i class="sl--icon icon-right"></i>\n            </button>\n          </div>\n        </div>\n        <div class="sl--bottom">\n          <div class="swiper">\n            <div class="swiper-wrapper"></div>\n          </div>\n        </div>\n      </div>'),
          this.lightbox.append(e.content),
          document.body.append(this.lightbox),
          this.lightbox
        );
      }
      initSwiper() {
        this.thumbnails = new ko(this.DOM.thumbnails, {
          modules: [jo],
          spaceBetween: 5,
          slidesPerView: "auto",
          freeMode: !0,
          centerInsufficientSlides: !0,
        });
        const e = this.DOM.lightboxItems.map(
          (e) =>
            `\n        <div class="swiper-slide">\n          <img src="${
              e.getAttribute("data-thumbnail") || e.getAttribute("href")
            }" alt="" />\n        </div>`
        );
        this.thumbnails.appendSlide(e),
          (this.swiper = new ko(this.DOM.swiper, {
            modules: [jo, Ro, Bo, Io, No, Fo],
            navigation: {
              nextEl: this.DOM.swiperNext,
              prevEl: this.DOM.swiperPrev,
            },
            mouseWheel: !0,
            preloadImages: !1,
            lazy: !0,
            zoom: !0,
            pagination: { type: "fraction", el: this.DOM.swiperFraction },
            thumbs: { swiper: this.thumbnails },
            on: {
              zoomChange: function (e, t, i, n) {
                1 !== t
                  ? (this.hideThumbs(),
                    this.DOM.btnZoom.classList.add("active"))
                  : (this.showThumbs(),
                    this.DOM.btnZoom.classList.remove("active"));
              }.bind(this),
              lazyImageReady: function (e, t, i) {
                i.complete
                  ? this.imageParams(i)
                  : i.addEventListener(
                      "load",
                      () => {
                        this.imageParams(i);
                      },
                      { once: !0 }
                    );
              }.bind(this),
              slideChangeTransitionEnd: function (e) {
                this.imageParams(
                  e.el
                    .querySelectorAll(".swiper-slide")
                    [e.realIndex].querySelector("img")
                );
              }.bind(this),
            },
          }));
        const t = this.DOM.lightboxItems.map(
          (e) =>
            `\n        <div class="swiper-slide">\n          <div class="swiper-zoom-container">\n            <img\n              data-src="${e.getAttribute(
              "href"
            )}"\n              class="swiper-lazy"\n              alt=""\n            />\n          </div>\n          <div class="swiper-lazy-preloader"></div>\n        </div>`
        );
        this.swiper.appendSlide(t);
      }
      imageParams(e) {
        let t = 1;
        if (e.getAttribute("src")) {
          let i = 1,
            n = 1;
          e.naturalWidth > this.bounds.width &&
            (i = (e.naturalWidth / this.bounds.width).toFixed(2)),
            e.naturalHeight > this.bounds.height &&
              (n = (e.naturalHeight / this.bounds.height).toFixed(2)),
            (t = Math.max(i, n) / (window.devicePixelRatio || 1));
        }
        e.parentNode.setAttribute("data-swiper-zoom", t);
      }
      calculatePosition() {
        this.bounds = this.DOM.swiper.getBoundingClientRect();
      }
      initEvents() {
        this.DOM.btnZoom.addEventListener("click", (e) => {
          e.preventDefault(), this.swiper.zoom.toggle();
        }),
          window.addEventListener("resize", () => this.resizeFn()),
          this.DOM.lightboxItems.forEach((e) => {
            e.addEventListener("click", (t) => {
              t.preventDefault();
              const i = this.DOM.lightboxItems.indexOf(e);
              this.swiper.slideTo(i, 0), this.lightboxShow();
            });
          }),
          this.DOM.btnClose.addEventListener("click", (e) => {
            e.preventDefault(), this.lightboxHide();
          }),
          this.DOM.btnThumbs.addEventListener("click", (e) => {
            e.preventDefault(),
              this.DOM.btnThumbs.classList.contains("active")
                ? this.hideThumbs()
                : this.showThumbs(),
              (this.thumbsManual = !this.thumbsManual);
          }),
          this.DOM.btnFullScreen.addEventListener("click", (e) => {
            e.preventDefault(),
              this.toggleFullScreen(document.documentElement),
              this.DOM.btnFullScreen.classList.toggle("active");
          }),
          document.addEventListener("fullscreenchange", (e) => {
            document.fullscreenElement ||
              this.DOM.btnFullScreen.classList.remove("active");
          }),
          document.addEventListener("keydown", (e) => {
            "Escape" === e.code && this.lightboxHide();
          });
      }
      resizeFn() {
        this.calculatePosition();
      }
      lightboxShow() {
        this.lightbox.classList.add("show"),
          setTimeout(() => {
            this.DOM.container.classList.add("show"),
              this.DOM.backdrop.classList.add("show");
          }, 0),
          this.swiper.lazy.load(),
          this.calculatePosition();
      }
      lightboxHide() {
        this.DOM.backdrop.addEventListener(
          "transitionend",
          () => {
            this.lightbox.classList.remove("show");
          },
          { once: !0 }
        ),
          this.DOM.container.classList.remove("show"),
          this.DOM.backdrop.classList.remove("show");
      }
      showThumbs() {
        this.DOM.lightboxBottom.classList.remove("hide"),
          this.DOM.btnThumbs.classList.add("active");
      }
      hideThumbs() {
        this.DOM.lightboxBottom.classList.add("hide"),
          this.DOM.btnThumbs.classList.remove("active");
      }
      toggleFullScreen(e) {
        document.fullscreenElement
          ? document.exitFullscreen()
          : e.requestFullscreen().catch((e) => {
              alert(
                `Error attempting to enable full-screen mode: ${e.message} (${e.name})`
              );
            });
      }
    }
    class Zo {
      constructor(e) {
        (this.DOM = {
          el: e,
          input: e.querySelector("input"),
          button: e.querySelector("a"),
          value: e.querySelector(".value"),
          placeholder: e.querySelector(".placeholder"),
          list: e.querySelector("ul"),
          clear: e.querySelector("img"),
        }),
          this.initEvents();
      }
      initEvents() {
        this.DOM.input.addEventListener("change", (e) => {
          const t = this.DOM.input.files;
          t.length
            ? (this.DOM.placeholder.classList.add("d-none"),
              this.DOM.value.classList.remove("d-none"),
              (this.DOM.list.innerHTML = ""),
              [...t].forEach((e) => {
                console.log(this.DOM.list);
                const t = document.createElement("li");
                if (
                  ((t.textContent = e.name),
                  this.DOM.list.append(t),
                  e.size > 5e6)
                ) {
                  const e = document.createElement("li");
                  e.classList.add("error_file_size_message"),
                    (e.textContent =
                      "File to large and have more than 5 MB, please select another file"),
                    this.DOM.list.append(e);
                }
              }))
            : this.clear();
        }),
          this.DOM.el.addEventListener("dragenter", () => {
            this.DOM.el.classList.add("dragenter");
          }),
          this.DOM.input.addEventListener("dragleave", () => {
            this.DOM.el.classList.remove("dragenter");
          }),
          this.DOM.input.addEventListener("drop", () => {
            this.DOM.el.classList.remove("dragenter");
          }),
          this.DOM.button.addEventListener("click", () => {
            this.DOM.input.click();
          }),
          this.DOM.clear.addEventListener("click", () => {
            this.clear();
          });
      }
      clear() {
        (this.DOM.input.value = ""),
          (this.DOM.list.innerHTML = ""),
          this.DOM.placeholder.classList.remove("d-none"),
          this.DOM.value.classList.add("d-none");
      }
    }
    class Jo {
      constructor(e) {
        (this.DOM = {
          el: e,
          panels: [...e.querySelectorAll(".accordeon-panel")].map(
            (e) => new el(e)
          ),
        }),
          (this.multi = e.hasAttribute("data-multi")),
          this.initEvents();
      }
      initEvents() {
        this.multi ||
          this.DOM.panels.forEach((e) => {
            e.on("toggle", () => {
              e.open ||
                this.DOM.panels
                  .filter((e) => e.open)
                  .forEach((e) => {
                    e.toggleAccordeon();
                  });
            });
          });
      }
    }
    class el extends Uo() {
      constructor(e) {
        super(),
          (this.DOM = {
            el: e,
            title: e.querySelector(".accordeon-title"),
            content: e.querySelector(".accordeon-content"),
          }),
          (this.open = !1),
          this.initEvents();
      }
      initEvents() {
        this.DOM.title.addEventListener("click", () => {
          this.emit("toggle"), this.toggleAccordeon();
        });
      }
      toggleAccordeon() {
        this.DOM.title.classList[this.open ? "remove" : "add"]("active"),
          Cn.to(this.DOM.content, {
            height: this.open ? "0" : "auto",
            onComplete: () => {
              va.refresh();
            },
          }),
          (this.open = !this.open);
      }
    }
    const tl = function (e, t, i) {
      for (
        var n = new Array(512),
          r = [
            151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7,
            225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6,
            148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35,
            11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171,
            168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231,
            83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245,
            40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76,
            132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
            164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5,
            202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16,
            58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
            154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253,
            19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246,
            97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
            81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199,
            106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
            138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78,
            66, 215, 61, 156, 180,
          ],
          s = 0;
        s < 256;
        s++
      )
        n[256 + s] = n[s] = r[s];
      var a = 255 & Math.floor(e),
        o = 255 & Math.floor(t),
        l = 255 & Math.floor(i);
      (e -= Math.floor(e)), (t -= Math.floor(t)), (i -= Math.floor(i));
      var c = il(e),
        u = il(t),
        d = il(i),
        h = n[a] + o,
        p = n[h] + l,
        f = n[h + 1] + l,
        m = n[a + 1] + o,
        g = n[m] + l,
        v = n[m + 1] + l;
      return (function (e) {
        return (1 + e) / 2;
      })(
        nl(
          d,
          nl(
            u,
            nl(c, rl(n[p], e, t, i), rl(n[g], e - 1, t, i)),
            nl(c, rl(n[f], e, t - 1, i), rl(n[v], e - 1, t - 1, i))
          ),
          nl(
            u,
            nl(c, rl(n[p + 1], e, t, i - 1), rl(n[g + 1], e - 1, t, i - 1)),
            nl(
              c,
              rl(n[f + 1], e, t - 1, i - 1),
              rl(n[v + 1], e - 1, t - 1, i - 1)
            )
          )
        )
      );
    };
    function il(e) {
      return e * e * e * (e * (6 * e - 15) + 10);
    }
    function nl(e, t, i) {
      return t + e * (i - t);
    }
    function rl(e, t, i, n) {
      var r = 15 & e,
        s = r < 8 ? t : i,
        a = r < 4 ? i : 12 == r || 14 == r ? t : n;
      return (0 == (1 & r) ? s : -s) + (0 == (2 & r) ? a : -a);
    }
    class sl {
      constructor(e) {
        (this.DOM = { el: e }),
          (this.size = {}),
          (this.density = 22),
          (this.smoothness = 5),
          (this.time = 0),
          this.initCanvas(),
          this.initGradient(),
          this.addIntersection(),
          this.initEvents(),
          this.render();
      }
      initCanvas() {
        (this.canvas = document.createElement("canvas")),
          this.resize(),
          this.DOM.el.appendChild(this.canvas);
      }
      initGradient() {
        this.DOM.el.hasAttribute("data-color")
          ? (this.gradient = this.DOM.el.getAttribute("data-color"))
          : ((this.gradient = this.ctx.createLinearGradient(
              0,
              0,
              this.DOM.el.clientWidth,
              0
            )),
            this.gradient.addColorStop(0.24, "#5557D2"),
            this.gradient.addColorStop(0.43, "#B73096"),
            this.gradient.addColorStop(0.52, "#C82461"),
            this.gradient.addColorStop(0.64, "#DA3054"),
            this.gradient.addColorStop(0.77, "#D77439"),
            this.gradient.addColorStop(0.89, "#E5B43B"));
      }
      addIntersection() {
        (this.observer = new IntersectionObserver((e) => {
          e.forEach((e) => (this.isVisible = e.intersectionRatio > 0));
        })),
          this.observer.observe(this.DOM.el);
      }
      initEvents() {
        window.addEventListener("resize", this.resize.bind(this)),
          va.addEventListener("refresh", () => {
            setTimeout(() => {
              this.resize();
            }, 0);
          });
      }
      resize() {
        (this.size.width = Math.min(1e3, this.DOM.el.clientWidth)),
          (this.size.height = (690 * this.size.width) / 1e3),
          (this.canvas.width = this.size.width),
          (this.canvas.height = this.size.height),
          (this.spacer =
            (this.size.height - 0.21 * this.size.width) / this.density),
          (this.ctx = this.canvas.getContext("2d")),
          (this.ctx.lineWidth = window.innerWidth < 575 ? 1 : 2),
          this.initGradient();
      }
      draw() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height);
        for (let e = 0; e < this.density; e++) {
          this.ctx.beginPath();
          for (let t = 0; t < this.size.width; t += this.smoothness)
            this.ctx.lineTo(
              t,
              e * this.spacer +
                (this.size.width / 4) *
                  tl(
                    (10 * t) / this.size.width + this.time / 200,
                    e / 100 + this.time / 400,
                    0
                  )
            );
          (this.ctx.strokeStyle = this.gradient), this.ctx.stroke();
        }
      }
      render() {
        this.isVisible && (this.time++, this.draw()),
          window.requestAnimationFrame(this.render.bind(this));
      }
    }
    class al {
      constructor(e) {
        this.DOM = { el: e };
        const t = ajax.banner_settings;
        (this.options = {
          rotation: t.rotation || 45,
          waves: t.waves || 3,
          width: t.width || 300,
          hue: [14, 50],
          amplitude: t.amplitude || 0.5,
          background: t.background || !0,
          preload: t.preload || !0,
          speed: [0.001, 0.004],
        }),
          (this.waves = []),
          (this.hue = this.options.hue[0]),
          (this.hueFw = !0),
          this.initCanvas(),
          this.resize(),
          this.initEvents(),
          this.init(),
          this.addIntersection(),
          this.render();
      }
      initCanvas() {
        (this.holder = this.DOM.el),
          (this.canvas = document.createElement("canvas")),
          (this.ctx = this.canvas.getContext("2d")),
          this.holder.appendChild(this.canvas);
      }
      initEvents() {
        window.addEventListener("resize", this.resize.bind(this));
      }
      init() {
        for (var e = 0; e < this.options.waves; e++)
          this.waves.push(new ol(this));
        this.options.preload && this.preload();
      }
      addIntersection() {
        (this.observer = new IntersectionObserver((e) => {
          e.forEach((e) => (this.isVisible = e.intersectionRatio > 0));
        })),
          this.observer.observe(this.DOM.el);
      }
      preload() {
        for (var e = 0; e < this.options.waves; e++) {
          this.updateColor();
          for (var t = 0; t < this.options.width; t++) this.waves[e].update();
        }
      }
      draw() {
        this.updateColor(),
          this.clear(),
          this.options.background && this.background(),
          cl(this.waves, function (e, t) {
            e.update(), e.draw();
          });
      }
      render() {
        this.isVisible && this.draw(),
          window.requestAnimationFrame(this.render.bind(this));
      }
      clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
      background() {
        (this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)),
          this.gradient.addColorStop(1, "#0E1218"),
          this.gradient.addColorStop(0, this.color),
          (this.ctx.fillStyle = this.gradient),
          this.ctx.fillRect(1, 0, this.width, this.height);
      }
      resize() {
        let e = this.holder.offsetWidth,
          t = this.holder.offsetHeight;
        (this.scale = window.devicePixelRatio || 1),
          (this.width = e * this.scale),
          (this.height = t * this.scale),
          (this.canvas.width = this.width),
          (this.canvas.height = this.height),
          (this.canvas.style.width = e + "px"),
          (this.canvas.style.height = t + "px"),
          (this.radius =
            Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2),
          (this.centerX = this.width / 2),
          (this.centerY = this.height / 2);
      }
      updateColor() {
        (this.hue += this.hueFw ? 0.01 : -0.01),
          this.hue > this.options.hue[1] && this.hueFw
            ? (this.hueFw = !1)
            : this.hue < this.options.hue[0] &&
              !this.hueFw &&
              (this.hueFw = !0);
        let e = Math.floor(127 * Math.sin(0.3 * this.hue + 0) + 128),
          t = Math.floor(127 * Math.sin(0.3 * this.hue + 2) + 128),
          i = Math.floor(127 * Math.sin(0.3 * this.hue + 4) + 128);
        this.color = "rgba(" + e + "," + t + "," + i + ", 0.1)";
      }
    }
    class ol {
      constructor(e) {
        (this.banner = e),
          (this.Lines = []),
          (this.angle = [
            ul(2 * Math.PI),
            ul(2 * Math.PI),
            ul(2 * Math.PI),
            ul(2 * Math.PI),
          ]),
          (this.speed = [
            ul(e.options.speed[0], e.options.speed[1]) * dl(),
            ul(e.options.speed[0], e.options.speed[1]) * dl(),
            ul(e.options.speed[0], e.options.speed[1]) * dl(),
            ul(e.options.speed[0], e.options.speed[1]) * dl(),
          ]);
      }
      update = function () {
        this.Lines.push(new ll(this, this.banner.color)),
          this.Lines.length > this.banner.options.width && this.Lines.shift();
      };
      draw = function () {
        let e = this.banner.ctx,
          t = this.banner.radius,
          i = t / 3,
          n = this.banner.centerX,
          r = this.banner.centerY,
          s = (this.banner.options.rotation * Math.PI) / 360;
        let a = this.banner.options.amplitude;
        cl(this.Lines, function (o, l) {
          let c = o.angle,
            u = n - t * Math.cos(c[0] * a + s),
            d = r - t * Math.sin(c[0] * a + s),
            h = n + t * Math.cos(c[3] * a + s),
            p = r + t * Math.sin(c[3] * a + s),
            f = n - i * Math.cos(c[1] * a * 2),
            m = r - i * Math.sin(c[1] * a * 2),
            g = n + i * Math.cos(c[2] * a * 2),
            v = r + i * Math.sin(c[2] * a * 2);
          (e.strokeStyle = o.color),
            e.beginPath(),
            e.moveTo(u, d),
            e.bezierCurveTo(f, m, g, v, h, p),
            e.stroke();
        });
      };
    }
    class ll {
      constructor(e, t) {
        (this.parent = e),
          (this.color = t),
          (this.angle = [
            Math.sin((e.angle[0] += e.speed[0])),
            Math.sin((e.angle[1] += e.speed[1])),
            Math.sin((e.angle[2] += e.speed[2])),
            Math.sin((e.angle[3] += e.speed[3])),
          ]);
      }
    }
    function cl(e, t) {
      for (var i = 0; i < e.length; i++) t(e[i], i);
    }
    function ul(e, t) {
      return 1 == arguments.length
        ? Math.random() * e
        : e + Math.random() * (t - e);
    }
    function dl() {
      return Math.random() > 0.5 ? 1 : -1;
    }
    const hl =
      /iPad|iPhone|iPod|android/.test(navigator.userAgent) ||
      ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1);
    class pl {
      constructor() {
        (this.DOM = {
          el: document.getElementById("cursor"),
          circle: document.querySelector("#cursor .circle"),
          icon: document.querySelector("#cursor .icon"),
        }),
          (this.bounds = this.DOM.el.getBoundingClientRect()),
          (this.renderedStyles = {
            circletx: { previous: 0, current: 0, amt: 0.15 },
            circlety: { previous: 0, current: 0, amt: 0.15 },
            icontx: { previous: 0, current: 0, amt: 0.25 },
            iconty: { previous: 0, current: 0, amt: 0.25 },
            opacity: { previous: 0, current: 0, amt: 0.2 },
          }),
          (this.onMouseMoveEv = () => {
            (this.renderedStyles.circletx.previous =
              this.renderedStyles.circletx.current =
              this.renderedStyles.icontx.previous =
              this.renderedStyles.icontx.current =
                yl.x - this.bounds.width / 2),
              (this.renderedStyles.circlety.previous =
                this.renderedStyles.circlety.previous =
                this.renderedStyles.iconty.previous =
                this.renderedStyles.iconty.previous =
                  yl.y - this.bounds.height / 2),
              this.render(),
              window.removeEventListener("mousemove", this.onMouseMoveEv);
          }),
          window.addEventListener("mousemove", this.onMouseMoveEv),
          (this.pulsed = Cn.to(this.DOM.circle, {
            scale: 1.2,
            repeat: -1,
            yoyo: !0,
            paused: !0,
            duration: 1.6,
            ease: "ease.out",
          }));
      }
      enter() {
        (this.renderedStyles.opacity.current = 1), this.pulsed.play();
      }
      leave() {
        (this.renderedStyles.opacity.current = 0), this.pulsed.pause();
      }
      render() {
        (this.renderedStyles.circletx.current =
          this.renderedStyles.icontx.current =
            yl.x - this.bounds.width / 2),
          (this.renderedStyles.circlety.current =
            this.renderedStyles.iconty.current =
              yl.y - this.bounds.height / 2);
        for (const n in this.renderedStyles)
          this.renderedStyles[n].previous =
            ((e = this.renderedStyles[n].previous),
            (t = this.renderedStyles[n].current),
            (i = this.renderedStyles[n].amt),
            e + (t - e) * i);
        var e, t, i;
        Cn.set(this.DOM.circle, {
          x: this.renderedStyles.circletx.previous,
          y: this.renderedStyles.circlety.previous,
        }),
          Cn.set(this.DOM.icon, {
            x: this.renderedStyles.icontx.previous,
            y: this.renderedStyles.iconty.previous,
          }),
          (this.DOM.el.style.opacity = this.renderedStyles.opacity.previous),
          requestAnimationFrame(() => this.render());
      }
    }
    Cn.registerPlugin({
      name: "directionalRotation",
      init(e, t) {
        "object" != typeof t && (t = { rotation: t });
        var i,
          n,
          r,
          s,
          a,
          o = this,
          l = t.useRadians ? 2 * Math.PI : 360,
          c = 1e-6;
        for (i in ((o.endValues = {}), (o.target = e), t))
          "useRadians" !== i &&
            ((n = (a = (t[i] + "").split("_"))[0]),
            (r = parseFloat(e[i])),
            (s =
              (o.endValues[i] =
                "string" == typeof n && "=" === n.charAt(1)
                  ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))
                  : +n || 0) - r),
            a.length &&
              (~(n = a.join("_")).indexOf("short") &&
                (s %= l) !== s % (l / 2) &&
                (s = s < 0 ? s + l : s - l),
              -1 !== n.indexOf("_cw") && s < 0
                ? (s = ((s + 1e10 * l) % l) - ((s / l) | 0) * l)
                : -1 !== n.indexOf("ccw") &&
                  s > 0 &&
                  (s = ((s - 1e10 * l) % l) - ((s / l) | 0) * l)),
            (s > c || s < -c) && (o.add(e, i, r, r + s), o._props.push(i)));
      },
      render(e, t) {
        if (1 === e) for (let e in t.endValues) t.target[e] = t.endValues[e];
        else {
          let i = t._pt;
          for (; i; ) i.r(e, i.d), (i = i._next);
        }
      },
    });
    class fl {
      constructor(e) {
        (this.DOM = { el: e }),
          (this.size = {}),
          (this.time = 0),
          (this.dots = []),
          (this.gridDimension = {
            width: parseInt(e.getAttribute("data-dots-h"), 10) || 16,
            height: parseInt(e.getAttribute("data-dots-v"), 10) || 16,
          }),
          (this.k = parseFloat(e.getAttribute("data-k")) || 1e3 / 690),
          (this.mouse = { x: 0, y: 0 }),
          (this.mouseOver = !1),
          this.initCanvas(),
          this.initColor(),
          this.initDots(),
          this.addIntersection(),
          this.initEvents(),
          this.render();
      }
      initCanvas() {
        (this.canvas = document.createElement("canvas")),
          this.resize(),
          this.DOM.el.appendChild(this.canvas);
      }
      initColor() {
        const e = (
          getComputedStyle(this.DOM.el).getPropertyValue("--color") ||
          "rgb(255, 255, 255)"
        ).replace(/\s/g, "");
        this.color = e
          .substring(e.indexOf("(") + 1, e.indexOf(")"))
          .split(",")
          .map((e) => 1.8 * e);
      }
      initDots() {
        for (let e = 0; e < this.gridDimension.width; e++) {
          this.dots[e] = [];
          for (let t = 0; t < this.gridDimension.height; t++) {
            const i = new ml();
            (i.left =
              ((this.size.width - 2 * this.magnitudeTop) /
                (this.gridDimension.width - 1)) *
                e +
              this.magnitudeTop),
              (i.top =
                ((this.size.height - 2 * this.magnitudeTop) /
                  (this.gridDimension.height - 1)) *
                  t +
                this.magnitudeTop),
              (i.magnitude = 0.001),
              (this.dots[e][t] = i);
          }
        }
      }
      addIntersection() {
        (this.observer = new IntersectionObserver((e) => {
          e.forEach((e) => (this.isVisible = e.intersectionRatio > 0));
        })),
          this.observer.observe(this.DOM.el);
      }
      initEvents() {
        window.addEventListener("resize", this.resize.bind(this)),
          this.canvas.addEventListener("mousemove", this.mouseMove.bind(this)),
          this.canvas.addEventListener("mouseenter", () => {
            this.mouseOver = !0;
          }),
          this.canvas.addEventListener("mouseleave", this.reset.bind(this)),
          va.addEventListener("refresh", () => {
            setTimeout(() => {
              this.resize();
            }, 0);
          });
      }
      resize() {
        (this.size.width = this.DOM.el.clientWidth),
          (this.size.height = this.size.width / this.k),
          (this.canvas.width = this.size.width),
          (this.canvas.height = this.size.height),
          (this.ctx = this.canvas.getContext("2d")),
          (this.radius = window.innerWidth),
          (this.magnitudeTop = this.radius / 80),
          (this.lineWidth = Math.max(4, window.innerWidth / 500)),
          this.initDots();
      }
      draw() {
        this.ctx.clearRect(0, 0, this.size.width, this.size.height),
          this.mouseOver && !hl && this.calculateDotTransform();
        for (let e = 0; e < this.gridDimension.width; e++)
          for (let t = 0; t < this.gridDimension.height; t++) {
            this.dots[e][t].draw(
              this.ctx,
              this.mouseOver,
              this.lineWidth,
              this.color
            );
          }
      }
      calculateDotTransform() {
        for (let n = 0; n < this.gridDimension.width; n++)
          for (let r = 0; r < this.gridDimension.height; r++) {
            const s = this.dots[n][r],
              a = this.mouse.x - s.left,
              o = this.mouse.y - s.top,
              l = Math.sqrt(a ** 2 + o ** 2) || 1,
              c = Math.atan2(o, a),
              u =
                ((e = this.radius / l),
                (t = 0.001),
                (i = this.magnitudeTop),
                Math.min(Math.max(e, t), i));
            Cn.to(s, {
              duration: 0.8,
              ease: "elastic.out(1, 0.4)",
              magnitude: u,
              directionalRotation: { angle: c + "_short", useRadians: !0 },
            });
          }
        var e, t, i;
      }
      mouseMove(e) {
        const t = this.canvas.getBoundingClientRect();
        (this.mouse.x = e.clientX - t.left),
          (this.mouse.y = e.clientY - t.top),
          (this.mouseMoved = !0);
      }
      reset() {
        this.mouseOver = !1;
        for (let e = 0; e < this.gridDimension.width; e++)
          for (let t = 0; t < this.gridDimension.height; t++) {
            const i = this.dots[e][t];
            Cn.to(i, {
              duration: 0.8,
              magnitude: 0.001,
              directionalRotation: { angle: "0_short", useRadians: !0 },
            });
          }
      }
      render() {
        this.isVisible && (this.time++, this.draw()),
          window.requestAnimationFrame(this.render.bind(this));
      }
    }
    class ml {
      constructor() {
        (this.left = 0),
          (this.top = 0),
          (this.magnitude = 0),
          (this.angle = 0),
          (this.alphaFrame = Math.floor(201 * Math.random())),
          (this.alphaIncreasing = Math.random() < 0.5),
          (this.alpha = 0);
      }
      modulateAlpha() {
        ((200 === this.alphaFrame && this.alphaIncreasing) ||
          (0 === this.alphaFrame && !this.alphaIncreasing)) &&
          (this.alphaIncreasing = !this.alphaIncreasing),
          this.alphaIncreasing ? this.alphaFrame++ : this.alphaFrame--,
          (this.alpha = this.alphaFrame / 200);
      }
      getColor(e, t) {
        return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${e ? 1 : this.alpha})`;
      }
      draw(e, t, i, n) {
        this.modulateAlpha(),
          (e.strokeStyle = this.getColor(t, n)),
          (e.lineWidth = i),
          (e.lineCap = "round"),
          e.save(),
          e.beginPath(),
          e.setTransform(1, 0, 0, 1, this.left, this.top),
          e.rotate(this.angle),
          e.moveTo(-this.magnitude / 2, 0),
          e.lineTo(this.magnitude / 2, 0),
          e.stroke(),
          e.restore();
      }
    }
    class gl {
      constructor() {
        (this.$ = jQuery),
          jQuery(document).on(
            "click",
            ".js_pagination_html_response .paginator a.pagination_link:not(.active), .js_pagination_html_response .paginator .pagination_link:not(.disabled)",
            (e) => {
              e.preventDefault();
              let t = jQuery(e.target);
              this.runAjaxFunction(t);
            }
          ),
          jQuery(document).on(
            "change",
            '.js_posts_filter select, .js_posts_filter input[name="search"]',
            (e) => {
              e.preventDefault();
              let t = jQuery(e.target);
              this.runAjaxFunction(t);
            }
          ),
          jQuery(document).on("click", ".open_popup", (e) => {
            e.preventDefault();
            const t = jQuery(e.target).attr("data-rel");
            jQuery(`#${t}`).length > 0 &&
              showPopup(document.getElementById(t), !0, !0);
          }),
          this.wcf7FormSend();
      }
      runAjaxFunction(e) {
        const t = e.parents(".js_posts_args_page"),
          i = e.parents(".js_pagination_html_response"),
          n = parseInt(e.attr("data-page"));
        this.paginationRequest(n, i, t);
      }
      setCategoriesArgs(e, t = {}) {
        let i = [];
        const n = "object" == typeof t && Object.keys(t).length;
        if (
          ((i = n ? t : this.parseArgs(e)),
          ("object" != typeof i.category ||
            ("object" == typeof i.category &&
              !Object.keys(i.category).length)) &&
            (i.category = {}),
          e.find(".js_posts_filter select").each((e, t) => {
            const n = jQuery(t);
            n.length && (i.category[n[0].name] = n[0].value);
          }),
          n)
        )
          return i;
        this.parseArgs(e, i);
      }
      setSearchArgs(e, t = {}) {
        let i = [];
        const n = "object" == typeof t && Object.keys(t).length;
        if (
          ((i = n ? t : this.parseArgs(e)),
          ("object" != typeof i.search ||
            ("object" == typeof i.search && !Object.keys(i.search).length)) &&
            (i.search = ""),
          e.find('.js_posts_filter input[name="search"]').each((e, t) => {
            const n = jQuery(t);
            n.length && (i.search = n[0].value);
          }),
          n)
        )
          return i;
        this.parseArgs(e, i);
      }
      parseArgs(e, t = []) {
        return (
          e.length &&
            (t.length && Array.isArray(t)
              ? e.attr("data-args", JSON.stringify(t))
              : void 0 !== (e = e.attr("data-args")) &&
                e.length > 0 &&
                (e = JSON.parse(e))),
          e
        );
      }
      paginationRequest(e, t, i) {
        let n = i;
        if (
          ((i = this.parseArgs(i)),
          (i = this.setCategoriesArgs(n, i)),
          (i = this.setSearchArgs(n, i)),
          t.hasClass("ajaxLoader"))
        )
          return !1;
        t.addClass("ajaxLoader"),
          e || (e = i.page),
          this.paginationHtmlResponse(e, t, i);
      }
      paginationHtmlResponse(e, t, i) {
        let n = jQuery(".js_posts_html_response"),
          r = jQuery(".js_pagination_html_response"),
          s = jQuery(".js_posts_args_page");
        i.action &&
          jQuery
            .post(ajax.url, {
              action: i.action,
              page: e,
              post_type: i.post_type,
              category: i.category,
              search: i.search,
              tag: i.tag,
            })
            .done(async (i) => {
              let a = jQuery.parseJSON(i);
              await updatePage(() => {
                if (a.success) {
                  n.find(".js_post_item").remove(),
                    n.find(".js_posts_filter").after(a.html),
                    r.html(a.pagination),
                    s.attr("data-args", a.args);
                  let t = {};
                  e && (t.page = e);
                } else {
                  n.find(".js_post_item").remove(),
                    n.find(".js_posts_filter").after(a.message),
                    r.html(null);
                  let t = {};
                  e && (t.page = e);
                }
              }),
                jQuery("html, body").animate(
                  { scrollTop: s.offset().top },
                  2e3
                ),
                t.removeClass("ajaxLoader");
            })
            .fail(function (e) {
              t.removeClass("ajaxLoader");
            });
      }
      addGetParams(e) {
        let t = "",
          i = 1;
        Object.keys(e).length >= 1
          ? jQuery.each(e, function (e, n) {
              (t += 1 === i ? "?" + e + "=" + n : "&" + e + "=" + n), i++;
            })
          : (t = document.location.origin + document.location.pathname),
          window.history.pushState("", "", t);
      }
      wcf7FormSend() {
        document.addEventListener(
          "wpcf7mailsent",
          function (e) {
            resetForm(document.getElementsByClassName("wpcf7-form")[0]),
              showPopup(document.getElementById("thank-you"));
          },
          !1
        );
      }
    }
    Da()();
    const vl = {
      gallery: {
        slidesPerView: 1,
        spaceBetween: 120,
        breakpoints: { 575: { slidesPerView: 2 }, 991: { slidesPerView: 3 } },
        loop: !1,
      },
    };
    [...document.querySelectorAll(".swiper")].forEach((e) => {
      const t = {
        modules: [Io, Ro],
        loop: !0,
        autoHeight: !0,
        pagination: { el: e.querySelector(".swiper-pagination") },
        navigation: {
          nextEl: e.querySelector(".swiper-button-next"),
          prevEl: e.querySelector(".swiper-button-prev"),
        },
        on: {
          slideChangeTransitionEnd: function () {
            va.refresh();
          },
        },
        ...(vl[e.getAttribute("data-config")] || {}),
      };
      new ko(e, t);
    }),
      [...document.querySelectorAll(".lightbox-wrapper")].forEach((e) => {
        new Ko(e);
      }),
      (function (e, t, i) {
        (e = Cn.utils.toArray(e)[0]),
          (i = i || 1),
          Cn.set(t || e.parentNode, {
            overflow: "hidden",
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }),
          Cn.set(e, { overflow: "visible", width: "100%" });
        let n,
          r,
          s = Cn.getProperty(e),
          a = Cn.quickSetter(e, "y", "px"),
          o = va.getScrollFunc(window),
          l = () => (e.style.overflow = "visible"),
          c = (e) => {
            let t = e.getTween ? e.getTween() : Cn.getTweensOf(e.animation)[0];
            t && t.pause(), e.animation.progress(e.progress);
          };
        va.addEventListener("refresh", () => {
          l(), requestAnimationFrame(l);
        }),
          va.defaults({ scroller: e }),
          va.scrollerProxy(e, {
            scrollTop(e) {
              return arguments.length ? ((r = !0), a(-e), void o(e)) : -s("y");
            },
            scrollHeight: () => document.body.scrollHeight,
            getBoundingClientRect: () => ({
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }),
          }),
          va.create({
            animation: Cn.fromTo(
              e,
              { y: 0 },
              {
                y: () => document.documentElement.clientHeight - n,
                ease: "none",
                onUpdate: va.update,
              }
            ),
            scroller: window,
            invalidateOnRefresh: !0,
            start: 0,
            end: function () {
              return (
                (n = e.clientHeight),
                (e.style.overflow = "visible"),
                (document.body.style.height = n + "px"),
                n - document.documentElement.clientHeight
              );
            },
            refreshPriority: -999,
            scrub: i,
            onUpdate: (e) => {
              r && (c(e), (r = !1));
            },
            onRefresh: c,
          });
      })(document.querySelector("[data-scroll-container]")),
      window.addEventListener("scroll", (e) => {
        window.scrollY > 40
          ? document.querySelector("header").classList.add("active")
          : document.querySelector("header").classList.remove("active");
      }),
      document.addEventListener("visibilitychange", function (e) {
        document.hidden || va.refresh(!0);
      }),
      document.querySelectorAll(".scroll-to").forEach((e) => {
        e.addEventListener("click", (t) => {
          t.preventDefault();
          const i = document.querySelector(e.getAttribute("data-scroll-to"));
          smooth.scroll(
            i.getBoundingClientRect().top -
              document.querySelector("header").clientHeight
          );
        });
      });
    const yl = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      (yl.x = e.clientX), (yl.y = e.clientY);
    });
    const bl = new Wo();
    (i.g.updatePage = (e) => {
      "function" == typeof e && e(),
        new Ma(document.querySelector("header")),
        new Qo(),
        [...document.querySelectorAll(".banner-background")].forEach(
          (e) => new al(e)
        ),
        va.refresh(!0),
        updateImages(),
        updateCursor();
    }),
      (window.onload = () => {
        new Ma(document.querySelector("header")),
          new Qo(),
          [...document.querySelectorAll(".banner-background")].forEach((e) => {
            new al(e);
          }),
          va.refresh(!0),
          bl.hideLoader(),
          updateImages(),
          updateCursor(),
          new gl();
      }),
      bl.on("complete", () => {
        [...document.querySelectorAll(".title--demo")].forEach((e) => {
          new Aa(e);
        });
      });
    const wl = new (class {
      constructor() {
        (this.canvas = document.createElement("canvas")),
          document.getElementById("background").append(this.canvas),
          (this.color = null),
          this.initBackground(this);
      }
      initBackground(e) {
        const t = e.canvas,
          i = ajax.smoke_mouse_settings;
        (t.width = t.clientWidth), (t.height = t.clientHeight);
        let n = {
          SIM_RESOLUTION: 256,
          DYE_RESOLUTION: 512,
          DENSITY_DISSIPATION: i.density_dissipation || 0.98,
          VELOCITY_DISSIPATION: i.velocity_dissipation || 0.9,
          PRESSURE_DISSIPATION: i.pressure_dissipation || 0.1,
          PRESSURE_ITERATIONS: i.pressure_iterations || 20,
          CURL: i.curl || 0,
          SPLAT_RADIUS: i.splat_radius || 0.3,
          SHADING: i.shading || !1,
          COLORFUL: i.colorful || !0,
          PAUSED: !1,
          BACK_COLOR: { r: 0, g: 0, b: 0 },
          TRANSPARENT: i.transparent || !0,
        };
        let r = [],
          s = [];
        r.push(
          new (function () {
            (this.id = -1),
              (this.x = 0),
              (this.y = 0),
              (this.dx = 0),
              (this.dy = 0),
              (this.down = !1),
              (this.moved = !1),
              (this.color = [30, 0, 300]);
          })()
        ),
          (r[0].down = !0),
          (r[0].color = Z());
        const { gl: a, ext: o } = (function (e) {
          const t = {
            alpha: !0,
            depth: !1,
            stencil: !1,
            antialias: !1,
            preserveDrawingBuffer: !1,
          };
          let i = e.getContext("webgl2", t);
          const n = !!i;
          n ||
            (i =
              e.getContext("webgl", t) ||
              e.getContext("experimental-webgl", t));
          let r, s;
          n
            ? (i.getExtension("EXT_color_buffer_float"),
              (s = i.getExtension("OES_texture_float_linear")))
            : ((r = i.getExtension("OES_texture_half_float")),
              (s = i.getExtension("OES_texture_half_float_linear")));
          i.clearColor(0, 0, 0, 1);
          const a = n ? i.HALF_FLOAT : r.HALF_FLOAT_OES;
          let o, c, u;
          n
            ? ((o = l(i, i.RGBA16F, i.RGBA, a)),
              (c = l(i, i.RG16F, i.RG, a)),
              (u = l(i, i.R16F, i.RED, a)))
            : ((o = l(i, i.RGBA, i.RGBA, a)),
              (c = l(i, i.RGBA, i.RGBA, a)),
              (u = l(i, i.RGBA, i.RGBA, a)));
          return {
            gl: i,
            ext: {
              formatRGBA: o,
              formatRG: c,
              formatR: u,
              halfFloatTexType: a,
              supportLinearFiltering: s,
            },
          };
        })(t);
        function l(e, t, i, n) {
          if (
            !(function (e, t, i, n) {
              let r = e.createTexture();
              e.bindTexture(e.TEXTURE_2D, r),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
                e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_S,
                  e.CLAMP_TO_EDGE
                ),
                e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_T,
                  e.CLAMP_TO_EDGE
                ),
                e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, i, n, null);
              let s = e.createFramebuffer();
              e.bindFramebuffer(e.FRAMEBUFFER, s),
                e.framebufferTexture2D(
                  e.FRAMEBUFFER,
                  e.COLOR_ATTACHMENT0,
                  e.TEXTURE_2D,
                  r,
                  0
                );
              return (
                e.checkFramebufferStatus(e.FRAMEBUFFER) ==
                e.FRAMEBUFFER_COMPLETE
              );
            })(e, t, i, n)
          )
            switch (t) {
              case e.R16F:
                return l(e, e.RG16F, e.RG, n);
              case e.RG16F:
                return l(e, e.RGBA16F, e.RGBA, n);
              default:
                return null;
            }
          return { internalFormat: t, format: i };
        }
        /Mobi|Android/i.test(navigator.userAgent) && (n.SHADING = !1),
          o.supportLinearFiltering || (n.SHADING = !1);
        class c {
          constructor(e, t) {
            if (
              ((this.uniforms = {}),
              (this.program = a.createProgram()),
              a.attachShader(this.program, e),
              a.attachShader(this.program, t),
              a.linkProgram(this.program),
              !a.getProgramParameter(this.program, a.LINK_STATUS))
            )
              throw a.getProgramInfoLog(this.program);
            const i = a.getProgramParameter(this.program, a.ACTIVE_UNIFORMS);
            for (let e = 0; e < i; e++) {
              const t = a.getActiveUniform(this.program, e).name;
              this.uniforms[t] = a.getUniformLocation(this.program, t);
            }
          }
          bind() {
            a.useProgram(this.program);
          }
        }
        function u(e, t) {
          const i = a.createShader(e);
          if (
            (a.shaderSource(i, t),
            a.compileShader(i),
            !a.getShaderParameter(i, a.COMPILE_STATUS))
          )
            throw a.getShaderInfoLog(i);
          return i;
        }
        const d = u(
            a.VERTEX_SHADER,
            "\n    precision highp float;\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"
          ),
          h = u(
            a.FRAGMENT_SHADER,
            "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n"
          ),
          p = u(
            a.FRAGMENT_SHADER,
            "\n    precision mediump float;\n    uniform vec4 color;\n    void main () {\n        gl_FragColor = color;\n    }\n"
          ),
          f = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float aspectRatio;\n    #define SCALE 125.0\n    void main () {\n        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));\n        float v = mod(uv.x + uv.y, 2.0);\n        v = v * 0.1 + 0.8;\n        gl_FragColor = vec4(vec3(v), 1.0);\n    }\n"
          ),
          m = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    void main () {\n        vec3 C = texture2D(uTexture, vUv).rgb;\n        float a = max(C.r, max(C.g, C.b));\n        gl_FragColor = vec4(C, a);\n    }\n"
          ),
          g = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform vec2 texelSize;\n    void main () {\n        vec3 L = texture2D(uTexture, vL).rgb;\n        vec3 R = texture2D(uTexture, vR).rgb;\n        vec3 T = texture2D(uTexture, vT).rgb;\n        vec3 B = texture2D(uTexture, vB).rgb;\n        vec3 C = texture2D(uTexture, vUv).rgb;\n        float dx = length(R) - length(L);\n        float dy = length(T) - length(B);\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        C.rgb *= diffuse;\n        float a = max(C.r, max(C.g, C.b));\n        gl_FragColor = vec4(C, a);\n    }\n"
          ),
          v = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n"
          ),
          y = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n    void main () {\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);\n        gl_FragColor.a = 1.0;\n    }\n"
          ),
          b = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform float dt;\n    uniform float dissipation;\n    void main () {\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        gl_FragColor = dissipation * texture2D(uSource, coord);\n        gl_FragColor.a = 1.0;\n    }\n"
          ),
          w = u(
            a.FRAGMENT_SHADER,
            "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n"
          ),
          _ = u(
            a.FRAGMENT_SHADER,
            "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n"
          ),
          x = u(
            a.FRAGMENT_SHADER,
            "\n    precision highp float;\n    precision highp sampler2D;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n        vec2 vel = texture2D(uVelocity, vUv).xy;\n        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n    }\n"
          ),
          T = u(
            a.FRAGMENT_SHADER,
            "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n    vec2 boundary (vec2 uv) {\n        return uv;\n        // uncomment if you use wrap or repeat texture mode\n        // uv = min(max(uv, 0.0), 1.0);\n        // return uv;\n    }\n    void main () {\n        float L = texture2D(uPressure, boundary(vL)).x;\n        float R = texture2D(uPressure, boundary(vR)).x;\n        float T = texture2D(uPressure, boundary(vT)).x;\n        float B = texture2D(uPressure, boundary(vB)).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n"
          ),
          E = u(
            a.FRAGMENT_SHADER,
            "\n    precision mediump float;\n    precision mediump sampler2D;\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n    vec2 boundary (vec2 uv) {\n        return uv;\n        // uv = min(max(uv, 0.0), 1.0);\n        // return uv;\n    }\n    void main () {\n        float L = texture2D(uPressure, boundary(vL)).x;\n        float R = texture2D(uPressure, boundary(vR)).x;\n        float T = texture2D(uPressure, boundary(vT)).x;\n        float B = texture2D(uPressure, boundary(vB)).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"
          ),
          S =
            (a.bindBuffer(a.ARRAY_BUFFER, a.createBuffer()),
            a.bufferData(
              a.ARRAY_BUFFER,
              new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
              a.STATIC_DRAW
            ),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, a.createBuffer()),
            a.bufferData(
              a.ELEMENT_ARRAY_BUFFER,
              new Uint16Array([0, 1, 2, 0, 2, 3]),
              a.STATIC_DRAW
            ),
            a.vertexAttribPointer(0, 2, a.FLOAT, !1, 0, 0),
            a.enableVertexAttribArray(0),
            (e) => {
              a.bindFramebuffer(a.FRAMEBUFFER, e),
                a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0);
            });
        let C, M, O, D, A, L, P, k, $;
        const R = new c(d, h),
          z = new c(d, p),
          I = (new c(d, f), new c(d, m)),
          F = new c(d, g),
          B = new c(d, v),
          N = new c(d, o.supportLinearFiltering ? b : y),
          q = new c(d, w),
          X = new c(d, _),
          Y = new c(d, x),
          G = new c(d, T),
          H = new c(d, E);
        function j() {
          let e = J(n.SIM_RESOLUTION),
            t = J(n.DYE_RESOLUTION);
          (C = e.width), (M = e.height), (O = t.width), (D = t.height);
          const i = o.halfFloatTexType,
            r = o.formatRGBA,
            s = o.formatRG,
            l = o.formatR,
            c = o.supportLinearFiltering ? a.LINEAR : a.NEAREST;
          (A =
            null == A
              ? U(O, D, r.internalFormat, r.format, i, c)
              : W(A, O, D, r.internalFormat, r.format, i, c)),
            (L =
              null == L
                ? U(C, M, s.internalFormat, s.format, i, c)
                : W(L, C, M, s.internalFormat, s.format, i, c)),
            (P = V(C, M, l.internalFormat, l.format, i, a.NEAREST)),
            (k = V(C, M, l.internalFormat, l.format, i, a.NEAREST)),
            ($ = U(C, M, l.internalFormat, l.format, i, a.NEAREST));
        }
        function V(e, t, i, n, r, s) {
          a.activeTexture(a.TEXTURE0);
          let o = a.createTexture();
          a.bindTexture(a.TEXTURE_2D, o),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, s),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, s),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
            a.texImage2D(a.TEXTURE_2D, 0, i, e, t, 0, n, r, null);
          let l = a.createFramebuffer();
          return (
            a.bindFramebuffer(a.FRAMEBUFFER, l),
            a.framebufferTexture2D(
              a.FRAMEBUFFER,
              a.COLOR_ATTACHMENT0,
              a.TEXTURE_2D,
              o,
              0
            ),
            a.viewport(0, 0, e, t),
            a.clear(a.COLOR_BUFFER_BIT),
            {
              texture: o,
              fbo: l,
              width: e,
              height: t,
              attach: (e) => (
                a.activeTexture(a.TEXTURE0 + e),
                a.bindTexture(a.TEXTURE_2D, o),
                e
              ),
            }
          );
        }
        function U(e, t, i, n, r, s) {
          let a = V(e, t, i, n, r, s),
            o = V(e, t, i, n, r, s);
          return {
            get read() {
              return a;
            },
            set read(e) {
              a = e;
            },
            get write() {
              return o;
            },
            set write(e) {
              o = e;
            },
            swap() {
              let e = a;
              (a = o), (o = e);
            },
          };
        }
        function W(e, t, i, n, r, s, o) {
          return (
            (e.read = (function (e, t, i, n, r, s, o) {
              let l = V(t, i, n, r, s, o);
              return (
                R.bind(),
                a.uniform1i(R.uniforms.uTexture, e.attach(0)),
                a.uniform1f(R.uniforms.value, 1),
                S(l.fbo),
                l
              );
            })(e.read, t, i, n, r, s, o)),
            (e.write = V(t, i, n, r, s, o)),
            e
          );
        }
        j();
        let Q = Date.now();
        function K(e, i, r, s, o) {
          a.viewport(0, 0, C, M),
            B.bind(),
            a.uniform1i(B.uniforms.uTarget, L.read.attach(0)),
            a.uniform1f(B.uniforms.aspectRatio, t.width / t.height),
            a.uniform2f(B.uniforms.point, e / t.width, 1 - i / t.height),
            a.uniform3f(B.uniforms.color, r, -s, 1),
            a.uniform1f(B.uniforms.radius, n.SPLAT_RADIUS / 100),
            S(L.write.fbo),
            L.swap(),
            a.viewport(0, 0, O, D),
            a.uniform1i(B.uniforms.uTarget, A.read.attach(0)),
            a.uniform3f(B.uniforms.color, o.r, o.g, o.b),
            S(A.write.fbo),
            A.swap();
        }
        function Z() {
          if (e.color) return e.color;
          let t = (function (e, t, i) {
            let n, r, s, a, o, l, c, u;
            switch (
              ((a = Math.floor(6 * e)),
              (o = 6 * e - a),
              (l = i * (1 - t)),
              (c = i * (1 - o * t)),
              (u = i * (1 - (1 - o) * t)),
              a % 6)
            ) {
              case 0:
                (n = i), (r = u), (s = l);
                break;
              case 1:
                (n = c), (r = i), (s = l);
                break;
              case 2:
                (n = l), (r = i), (s = u);
                break;
              case 3:
                (n = l), (r = c), (s = i);
                break;
              case 4:
                (n = u), (r = l), (s = i);
                break;
              case 5:
                (n = i), (r = l), (s = c);
            }
            return { r: n, g: r, b: s };
          })(Math.random(), 1, 1);
          return (t.r *= 0.15), (t.g *= 0.15), (t.b *= 0.15), t;
        }
        function J(e) {
          let t = a.drawingBufferWidth / a.drawingBufferHeight;
          t < 1 && (t = 1 / t);
          let i = Math.round(e * t),
            n = Math.round(e);
          return a.drawingBufferWidth > a.drawingBufferHeight
            ? { width: i, height: n }
            : { width: n, height: i };
        }
        !(function e() {
          (t.width == t.clientWidth && t.height == t.clientHeight) ||
            ((t.width = t.clientWidth), (t.height = t.clientHeight), j()),
            (function () {
              s.length > 0 &&
                (function (e) {
                  for (let i = 0; i < e; i++) {
                    const e = Z();
                    (e.r *= 10), (e.g *= 10), (e.b *= 10);
                    K(
                      t.width * Math.random(),
                      t.height * Math.random(),
                      1e3 * (Math.random() - 0.5),
                      1e3 * (Math.random() - 0.5),
                      e
                    );
                  }
                })(s.pop());
              for (let e = 0; e < r.length; e++) {
                const t = r[e];
                t.moved && (K(t.x, t.y, t.dx, t.dy, t.color), (t.moved = !1));
              }
              if (!n.COLORFUL) return;
              if (Q + 100 < Date.now()) {
                Q = Date.now();
                for (let e = 0; e < r.length; e++) {
                  r[e].color = Z();
                }
              }
            })(),
            n.PAUSED ||
              (function (e) {
                a.disable(a.BLEND),
                  a.viewport(0, 0, C, M),
                  X.bind(),
                  a.uniform2f(X.uniforms.texelSize, 1 / C, 1 / M),
                  a.uniform1i(X.uniforms.uVelocity, L.read.attach(0)),
                  S(k.fbo),
                  Y.bind(),
                  a.uniform2f(Y.uniforms.texelSize, 1 / C, 1 / M),
                  a.uniform1i(Y.uniforms.uVelocity, L.read.attach(0)),
                  a.uniform1i(Y.uniforms.uCurl, k.attach(1)),
                  a.uniform1f(Y.uniforms.curl, n.CURL),
                  a.uniform1f(Y.uniforms.dt, e),
                  S(L.write.fbo),
                  L.swap(),
                  q.bind(),
                  a.uniform2f(q.uniforms.texelSize, 1 / C, 1 / M),
                  a.uniform1i(q.uniforms.uVelocity, L.read.attach(0)),
                  S(P.fbo),
                  R.bind(),
                  a.uniform1i(R.uniforms.uTexture, $.read.attach(0)),
                  a.uniform1f(R.uniforms.value, n.PRESSURE_DISSIPATION),
                  S($.write.fbo),
                  $.swap(),
                  G.bind(),
                  a.uniform2f(G.uniforms.texelSize, 1 / C, 1 / M),
                  a.uniform1i(G.uniforms.uDivergence, P.attach(0));
                for (let e = 0; e < n.PRESSURE_ITERATIONS; e++)
                  a.uniform1i(G.uniforms.uPressure, $.read.attach(1)),
                    S($.write.fbo),
                    $.swap();
                H.bind(),
                  a.uniform2f(H.uniforms.texelSize, 1 / C, 1 / M),
                  a.uniform1i(H.uniforms.uPressure, $.read.attach(0)),
                  a.uniform1i(H.uniforms.uVelocity, L.read.attach(1)),
                  S(L.write.fbo),
                  L.swap(),
                  N.bind(),
                  a.uniform2f(N.uniforms.texelSize, 1 / C, 1 / M),
                  o.supportLinearFiltering ||
                    a.uniform2f(N.uniforms.dyeTexelSize, 1 / C, 1 / M);
                let t = L.read.attach(0);
                a.uniform1i(N.uniforms.uVelocity, t),
                  a.uniform1i(N.uniforms.uSource, t),
                  a.uniform1f(N.uniforms.dt, e),
                  a.uniform1f(N.uniforms.dissipation, n.VELOCITY_DISSIPATION),
                  S(L.write.fbo),
                  L.swap(),
                  a.viewport(0, 0, O, D),
                  o.supportLinearFiltering ||
                    a.uniform2f(N.uniforms.dyeTexelSize, 1 / O, 1 / D);
                a.uniform1i(N.uniforms.uVelocity, L.read.attach(0)),
                  a.uniform1i(N.uniforms.uSource, A.read.attach(1)),
                  a.uniform1f(N.uniforms.dissipation, n.DENSITY_DISSIPATION),
                  S(A.write.fbo),
                  A.swap();
              })(0.016);
          (function (e) {
            null != e && n.TRANSPARENT
              ? a.disable(a.BLEND)
              : (a.blendFunc(a.ONE, a.ONE_MINUS_SRC_ALPHA), a.enable(a.BLEND));
            let t = null == e ? a.drawingBufferWidth : O,
              i = null == e ? a.drawingBufferHeight : D;
            if ((a.viewport(0, 0, t, i), !n.TRANSPARENT)) {
              z.bind();
              let t = n.BACK_COLOR;
              a.uniform4f(z.uniforms.color, t.r / 255, t.g / 255, t.b / 255, 1),
                S(e);
            }
            if (n.SHADING) {
              let e = F;
              e.bind(),
                a.uniform2f(e.uniforms.texelSize, 1 / t, 1 / i),
                a.uniform1i(e.uniforms.uTexture, A.read.attach(0));
            } else {
              let e = I;
              e.bind(), a.uniform1i(e.uniforms.uTexture, A.read.attach(0));
            }
            S(e);
          })(null),
            requestAnimationFrame(e);
        })(),
          window.addEventListener("mousemove", (e) => {
            const t = e.target.tagName.toLowerCase();
            "img" !== t &&
              "a" !== t &&
              "canvas" !== t &&
              ((r[0].moved = r[0].down),
              (r[0].dx = 5 * (e.clientX - r[0].x)),
              (r[0].dy = 5 * (e.clientY - r[0].y)),
              (r[0].x = e.clientX),
              (r[0].y = e.clientY));
          }),
          window.addEventListener(
            "touchmove",
            (e) => {
              const t = e.targetTouches;
              let i = r[0];
              (i.moved = i.down),
                (i.dx = 8 * (t[0].pageX - window.scrollX - i.x)),
                (i.dy = 8 * (t[0].pageY - window.scrollY - i.y)),
                (i.x = t[0].pageX - window.scrollX),
                (i.y = t[0].pageY - window.scrollY);
            },
            !1
          ),
          window.addEventListener("touchstart", (e) => {
            const t = e.targetTouches;
            (r[0].id = t[0].identifier),
              (r[0].down = !0),
              (r[0].x = t[0].pageX - window.scrollX),
              (r[0].y = t[0].pageY - window.scrollY),
              (r[0].color = Z());
          });
      }
    })();
    [...document.querySelectorAll(".section-color")].forEach((e) => {
      new La(e, wl);
    });
    [...document.querySelectorAll(".counters")].forEach((e) => {
      new Pa(e);
    }),
      [...document.querySelectorAll(".accordeon")].forEach((e) => {
        new Jo(e);
      }),
      [...document.querySelectorAll(".perlin")].forEach((e) => {
        new sl(e);
      }),
      [...document.querySelectorAll(".dots")].forEach((e) => {
        new fl(e);
      }),
      (i.g.updateCursor = () => {
        const e = new pl();
        [
          ...document.querySelectorAll(
            "a img.media, .lightbox img, .custom_cursor_link"
          ),
        ].forEach((t) => {
          t.addEventListener("mouseenter", () => {
            e.enter();
          }),
            t.addEventListener("mouseleave", () => {
              e.leave();
            });
        });
      });
    const _l = new IntersectionObserver(
      (e) => {
        e.forEach((e) => {
          e.intersectionRatio > 0 && e.target.classList.add("visible");
        });
      },
      { threshold: 0.4 }
    );
    function xl(e, t) {
      t.value
        ? e.classList.add("not--empty")
        : e.classList.remove("not--empty");
    }
    (i.g.updateImages = () => {
      const e = document.querySelectorAll(".image");
      e.length &&
        [...e].forEach((e) => {
          _l.observe(e);
        });
    }),
      document.querySelectorAll(".form-control").forEach((e) => {
        const t = e.querySelector(".input");
        xl(e, t),
          t.addEventListener("focus", () => {
            e.classList.add("focus");
          }),
          t.addEventListener("blur", () => {
            e.classList.remove("focus");
          }),
          t.addEventListener("keyup", () => {
            xl(e, t);
          }),
          t.addEventListener("change", () => {
            xl(e, t);
          });
      }),
      [...document.querySelectorAll(".popup")].forEach((e) => {
        Cn.utils
          .toArray([e.querySelector(".close"), e.querySelector(".overlay")])
          .forEach((t) => {
            t &&
              t.addEventListener("click", () => {
                hidePopup(e);
              });
          });
      }),
      [...document.querySelectorAll(".popup")].forEach((e) => {
        Cn.utils
          .toArray([
            e.querySelector(".closeScale"),
            e.querySelector(".overlayScale"),
          ])
          .forEach((t) => {
            t &&
              t.addEventListener("click", () => {
                hidePopup(e, !0);
              });
          });
      }),
      (i.g.showPopup = (e, t = !1, i = !1) => {
        (e.style.display = "block"),
          i
            ? Cn.fromTo(
                e.querySelector(".container-fluid"),
                { scale: 1.5, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  ease: "power2.in",
                  duration: 0.5,
                  onComplete: () => {
                    t && jQuery("html").css("overflow", "hidden");
                  },
                }
              )
            : Cn.fromTo(
                e.querySelector(".container-fluid"),
                { y: "-100%" },
                {
                  y: "0",
                  ease: "power2.in",
                  duration: 0.5,
                  onComplete: () => {
                    t && jQuery("html").css("overflow", "hidden");
                  },
                }
              );
      }),
      (i.g.hidePopup = (e, t = !1) => {
        t
          ? Cn.to(e.querySelector(".container-fluid"), {
              scale: 1.5,
              opacity: 0,
              ease: "power2.out",
              duration: 0.5,
              onComplete: () => {
                (e.style.display = "none"),
                  jQuery("html").css("overflow-y", "scroll");
              },
            })
          : Cn.to(e.querySelector(".container-fluid"), {
              y: "-100%",
              ease: "power2.out",
              duration: 0.5,
              onComplete: () => {
                (e.style.display = "none"),
                  jQuery("html").css("overflow-y", "scroll");
              },
            });
      }),
      document.querySelectorAll(".upload").forEach((e) => {
        new Zo(e);
      }),
      (i.g.resetForm = (e) => {
        e.reset(),
          [...e.querySelectorAll(".form-control:not(.selector)")].forEach(
            (e) => {
              e.classList.remove("focus"), e.classList.remove("not--empty");
            }
          );
      });
  })();
})();
