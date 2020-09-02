/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/* Javascript plotting library for jQuery, version 0.8.3.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

*/

/*! jQuery UI - v1.10.4 - 2014-03-11
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.resizable.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

// licenseOrTutorial == 0  -> license 

// licenseOrTutorial == 1  -> tutorial

/*! jQuery UI - v1.12.0 - 2016-09-13
 * http://jqueryui.com
 * Includes: keycode.js, widgets/datepicker.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

/*!
 * jQuery UI Keycode 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

/*!
 * jQuery UI Datepicker 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko
 * @version 2.0.4
 *
 * See usage examples at http://jscolor.com/examples/
 */

/*
 Color animation 1.6.0
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2013 Edwin Martin
 Released under the MIT and GPL licenses.
*/

/*!child.parent.hasTilesetContent &&*/

var requirejs, require, define;
(function (e) {
  function c(e, t) {
    return f.call(e, t)
  }

  function h(e, t) {
    var n, r, i, s, o, a, f, l, c, h, p = t && t.split("/"),
      d = u.map,
      v = d && d["*"] || {};
    if (e && e.charAt(0) === ".")
      if (t) {
        p = p.slice(0, p.length - 1), e = p.concat(e.split("/"));
        for (l = 0; l < e.length; l += 1) {
          h = e[l];
          if (h === ".") e.splice(l, 1), l -= 1;
          else if (h === "..") {
            if (l === 1 && (e[2] === ".." || e[0] === "..")) break;
            l > 0 && (e.splice(l - 1, 2), l -= 2)
          }
        }
        e = e.join("/")
      } else e.indexOf("./") === 0 && (e = e.substring(2));
    if ((p || v) && d) {
      n = e.split("/");
      for (l = n.length; l > 0; l -= 1) {
        r = n.slice(0, l).join("/");
        if (p)
          for (c = p.length; c > 0; c -= 1) {
            i = d[p.slice(0, c).join("/")];
            if (i) {
              i = i[r];
              if (i) {
                s = i, o = l;
                break
              }
            }
          }
        if (s) break;
        !a && v && v[r] && (a = v[r], f = l)
      }!s && a && (s = a, o = f), s && (n.splice(0, o, s), e = n.join("/"))
    }
    return e
  }

  function p(t, r) {
    return function () {
      return n.apply(e, l.call(arguments, 0).concat([t, r]))
    }
  }

  function d(e) {
    return function (t) {
      return h(t, e)
    }
  }

  function v(e) {
    return function (t) {
      s[e] = t
    }
  }

  function m(n) {
    if (c(o, n)) {
      var r = o[n];
      delete o[n], a[n] = !0, t.apply(e, r)
    }
    if (!c(s, n) && !c(a, n)) throw new Error("No " + n);
    return s[n]
  }

  function g(e) {
    var t, n = e ? e.indexOf("!") : -1;
    return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
  }

  function y(e) {
    return function () {
      return u && u.config && u.config[e] || {}
    }
  }
  var t, n, r, i, s = {},
    o = {},
    u = {},
    a = {},
    f = Object.prototype.hasOwnProperty,
    l = [].slice;
  r = function (e, t) {
    var n, r = g(e),
      i = r[0];
    return e = r[1], i && (i = h(i, t), n = m(i)), i ? n && n.normalize ? e = n.normalize(e, d(t)) : e = h(e, t) : (e = h(e, t), r = g(e), i = r[0], e = r[1], i && (n = m(i))), {
      f: i ? i + "!" + e : e,
      n: e,
      pr: i,
      p: n
    }
  }, i = {
    require: function (e) {
      return p(e)
    },
    exports: function (e) {
      var t = s[e];
      return typeof t != "undefined" ? t : s[e] = {}
    },
    module: function (e) {
      return {
        id: e,
        uri: "",
        exports: s[e],
        config: y(e)
      }
    }
  }, t = function (t, n, u, f) {
    var l, h, d, g, y, b = [],
      w;
    f = f || t;
    if (typeof u == "function") {
      n = !n.length && u.length ? ["require", "exports", "module"] : n;
      for (y = 0; y < n.length; y += 1) {
        g = r(n[y], f), h = g.f;
        if (h === "require") b[y] = i.require(t);
        else if (h === "exports") b[y] = i.exports(t), w = !0;
        else if (h === "module") l = b[y] = i.module(t);
        else if (c(s, h) || c(o, h) || c(a, h)) b[y] = m(h);
        else {
          if (!g.p) throw new Error(t + " missing " + h);
          g.p.load(g.n, p(f, !0), v(h), {}), b[y] = s[h]
        }
      }
      d = u.apply(s[t], b);
      if (t)
        if (l && l.exports !== e && l.exports !== s[t]) s[t] = l.exports;
        else if (d !== e || !w) s[t] = d
    } else t && (s[t] = u)
  }, requirejs = require = n = function (s, o, a, f, l) {
    return typeof s == "string" ? i[s] ? i[s](o) : m(r(s, o).f) : (s.splice || (u = s, o.splice ? (s = o, o = a, a = null) : s = e), o = o || function () {}, typeof a == "function" && (a = f, f = l), f ? t(e, s, o, a) : setTimeout(function () {
      t(e, s, o, a)
    }, 4), n)
  }, n.config = function (e) {
    return u = e, u.deps && n(u.deps, u.callback), n
  }, requirejs._defined = s, define = function (e, t, n) {
    t.splice || (n = t, t = []), !c(s, e) && !c(o, e) && (o[e] = [e, t, n])
  }, define.amd = {
    jQuery: !0
  }
})(), define("./ThirdParty/almond-0.2.6/almond.js", function () {}), define("jquery", [], function () {
    return $
  }),
  function (e) {
    e.color = {}, e.color.make = function (t, n, r, i) {
      var s = {};
      return s.r = t || 0, s.g = n || 0, s.b = r || 0, s.a = i != null ? i : 1, s.add = function (e, t) {
        for (var n = 0; n < e.length; ++n) s[e.charAt(n)] += t;
        return s.normalize()
      }, s.scale = function (e, t) {
        for (var n = 0; n < e.length; ++n) s[e.charAt(n)] *= t;
        return s.normalize()
      }, s.toString = function () {
        return s.a >= 1 ? "rgb(" + [s.r, s.g, s.b].join(",") + ")" : "rgba(" + [s.r, s.g, s.b, s.a].join(",") + ")"
      }, s.normalize = function () {
        function e(e, t, n) {
          return t < e ? e : t > n ? n : t
        }
        return s.r = e(0, parseInt(s.r), 255), s.g = e(0, parseInt(s.g), 255), s.b = e(0, parseInt(s.b), 255), s.a = e(0, s.a, 1), s
      }, s.clone = function () {
        return e.color.make(s.r, s.b, s.g, s.a)
      }, s.normalize()
    }, e.color.extract = function (t, n) {
      var r;
      do {
        r = t.css(n).toLowerCase();
        if (r != "" && r != "transparent") break;
        t = t.parent()
      } while (t.length && !e.nodeName(t.get(0), "body"));
      return r == "rgba(0, 0, 0, 0)" && (r = "transparent"), e.color.parse(r)
    }, e.color.parse = function (n) {
      var r, i = e.color.make;
      if (r = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) return i(parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10));
      if (r = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return i(parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10), parseFloat(r[4]));
      if (r = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) return i(parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55);
      if (r = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n)) return i(parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55, parseFloat(r[4]));
      if (r = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) return i(parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16));
      if (r = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) return i(parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16), parseInt(r[3] + r[3], 16));
      var s = e.trim(n).toLowerCase();
      return s == "transparent" ? i(255, 255, 255, 0) : (r = t[s] || [0, 0, 0], i(r[0], r[1], r[2]))
    };
    var t = {
      aqua: [0, 255, 255],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      black: [0, 0, 0],
      blue: [0, 0, 255],
      brown: [165, 42, 42],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgrey: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkviolet: [148, 0, 211],
      fuchsia: [255, 0, 255],
      gold: [255, 215, 0],
      green: [0, 128, 0],
      indigo: [75, 0, 130],
      khaki: [240, 230, 140],
      lightblue: [173, 216, 230],
      lightcyan: [224, 255, 255],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      navy: [0, 0, 128],
      olive: [128, 128, 0],
      orange: [255, 165, 0],
      pink: [255, 192, 203],
      purple: [128, 0, 128],
      violet: [128, 0, 128],
      red: [255, 0, 0],
      silver: [192, 192, 192],
      white: [255, 255, 255],
      yellow: [255, 255, 0]
    }
  }(jQuery),
  function (e) {
    function n(t, n) {
      var r = n.children("." + t)[0];
      if (r == null) {
        r = document.createElement("canvas"), r.className = t, e(r).css({
          direction: "ltr",
          position: "absolute",
          left: 0,
          top: 0
        }).appendTo(n);
        if (!r.getContext) {
          if (!window.G_vmlCanvasManager) throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
          r = window.G_vmlCanvasManager.initElement(r)
        }
      }
      this.element = r;
      var i = this.context = r.getContext("2d"),
        s = window.devicePixelRatio || 1,
        o = i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1;
      this.pixelRatio = s / o, this.resize(n.width(), n.height()), this.textContainer = null, this.text = {}, this._textCache = {}
    }

    function r(t, r, s, o) {
      function E(e, t) {
        t = [w].concat(t);
        for (var n = 0; n < e.length; ++n) e[n].apply(this, t)
      }

      function S() {
        var t = {
          Canvas: n
        };
        for (var r = 0; r < o.length; ++r) {
          var i = o[r];
          i.init(w, t), i.options && e.extend(!0, a, i.options)
        }
      }

      function x(n) {
        e.extend(!0, a, n), n && n.colors && (a.colors = n.colors), a.xaxis.color == null && (a.xaxis.color = e.color.parse(a.grid.color).scale("a", .22).toString()), a.yaxis.color == null && (a.yaxis.color = e.color.parse(a.grid.color).scale("a", .22).toString()), a.xaxis.tickColor == null && (a.xaxis.tickColor = a.grid.tickColor || a.xaxis.color), a.yaxis.tickColor == null && (a.yaxis.tickColor = a.grid.tickColor || a.yaxis.color), a.grid.borderColor == null && (a.grid.borderColor = a.grid.color), a.grid.tickColor == null && (a.grid.tickColor = e.color.parse(a.grid.color).scale("a", .22).toString());
        var r, i, s, o = t.css("font-size"),
          u = o ? +o.replace("px", "") : 13,
          f = {
            style: t.css("font-style"),
            size: Math.round(.8 * u),
            variant: t.css("font-variant"),
            weight: t.css("font-weight"),
            family: t.css("font-family")
          };
        s = a.xaxes.length || 1;
        for (r = 0; r < s; ++r) i = a.xaxes[r], i && !i.tickColor && (i.tickColor = i.color), i = e.extend(!0, {}, a.xaxis, i), a.xaxes[r] = i, i.font && (i.font = e.extend({}, f, i.font), i.font.color || (i.font.color = i.color), i.font.lineHeight || (i.font.lineHeight = Math.round(i.font.size * 1.15)));
        s = a.yaxes.length || 1;
        for (r = 0; r < s; ++r) i = a.yaxes[r], i && !i.tickColor && (i.tickColor = i.color), i = e.extend(!0, {}, a.yaxis, i), a.yaxes[r] = i, i.font && (i.font = e.extend({}, f, i.font), i.font.color || (i.font.color = i.color), i.font.lineHeight || (i.font.lineHeight = Math.round(i.font.size * 1.15)));
        a.xaxis.noTicks && a.xaxis.ticks == null && (a.xaxis.ticks = a.xaxis.noTicks), a.yaxis.noTicks && a.yaxis.ticks == null && (a.yaxis.ticks = a.yaxis.noTicks), a.x2axis && (a.xaxes[1] = e.extend(!0, {}, a.xaxis, a.x2axis), a.xaxes[1].position = "top", a.x2axis.min == null && (a.xaxes[1].min = null), a.x2axis.max == null && (a.xaxes[1].max = null)), a.y2axis && (a.yaxes[1] = e.extend(!0, {}, a.yaxis, a.y2axis), a.yaxes[1].position = "right", a.y2axis.min == null && (a.yaxes[1].min = null), a.y2axis.max == null && (a.yaxes[1].max = null)), a.grid.coloredAreas && (a.grid.markings = a.grid.coloredAreas), a.grid.coloredAreasColor && (a.grid.markingsColor = a.grid.coloredAreasColor), a.lines && e.extend(!0, a.series.lines, a.lines), a.points && e.extend(!0, a.series.points, a.points), a.bars && e.extend(!0, a.series.bars, a.bars), a.shadowSize != null && (a.series.shadowSize = a.shadowSize), a.highlightColor != null && (a.series.highlightColor = a.highlightColor);
        for (r = 0; r < a.xaxes.length; ++r) O(d, r + 1).options = a.xaxes[r];
        for (r = 0; r < a.yaxes.length; ++r) O(v, r + 1).options = a.yaxes[r];
        for (var l in b) a.hooks[l] && a.hooks[l].length && (b[l] = b[l].concat(a.hooks[l]));
        E(b.processOptions, [a])
      }

      function T(e) {
        u = N(e), M(), _()
      }

      function N(t) {
        var n = [];
        for (var r = 0; r < t.length; ++r) {
          var i = e.extend(!0, {}, a.series);
          t[r].data != null ? (i.data = t[r].data, delete t[r].data, e.extend(!0, i, t[r]), t[r].data = i.data) : i.data = t[r], n.push(i)
        }
        return n
      }

      function C(e, t) {
        var n = e[t + "axis"];
        return typeof n == "object" && (n = n.n), typeof n != "number" && (n = 1), n
      }

      function k() {
        return e.grep(d.concat(v), function (e) {
          return e
        })
      }

      function L(e) {
        var t = {},
          n, r;
        for (n = 0; n < d.length; ++n) r = d[n], r && r.used && (t["x" + r.n] = r.c2p(e.left));
        for (n = 0; n < v.length; ++n) r = v[n], r && r.used && (t["y" + r.n] = r.c2p(e.top));
        return t.x1 !== undefined && (t.x = t.x1), t.y1 !== undefined && (t.y = t.y1), t
      }

      function A(e) {
        var t = {},
          n, r, i;
        for (n = 0; n < d.length; ++n) {
          r = d[n];
          if (r && r.used) {
            i = "x" + r.n, e[i] == null && r.n == 1 && (i = "x");
            if (e[i] != null) {
              t.left = r.p2c(e[i]);
              break
            }
          }
        }
        for (n = 0; n < v.length; ++n) {
          r = v[n];
          if (r && r.used) {
            i = "y" + r.n, e[i] == null && r.n == 1 && (i = "y");
            if (e[i] != null) {
              t.top = r.p2c(e[i]);
              break
            }
          }
        }
        return t
      }

      function O(t, n) {
        return t[n - 1] || (t[n - 1] = {
          n: n,
          direction: t == d ? "x" : "y",
          options: e.extend(!0, {}, t == d ? a.xaxis : a.yaxis)
        }), t[n - 1]
      }

      function M() {
        var t = u.length,
          n = -1,
          r;
        for (r = 0; r < u.length; ++r) {
          var i = u[r].color;
          i != null && (t--, typeof i == "number" && i > n && (n = i))
        }
        t <= n && (t = n + 1);
        var s, o = [],
          f = a.colors,
          l = f.length,
          c = 0;
        for (r = 0; r < t; r++) s = e.color.parse(f[r % l] || "#666"), r % l == 0 && r && (c >= 0 ? c < .5 ? c = -c - .2 : c = 0 : c = -c), o[r] = s.scale("rgb", 1 + c);
        var h = 0,
          p;
        for (r = 0; r < u.length; ++r) {
          p = u[r], p.color == null ? (p.color = o[h].toString(), ++h) : typeof p.color == "number" && (p.color = o[p.color].toString());
          if (p.lines.show == null) {
            var m, g = !0;
            for (m in p)
              if (p[m] && p[m].show) {
                g = !1;
                break
              } g && (p.lines.show = !0)
          }
          p.lines.zero == null && (p.lines.zero = !!p.lines.fill), p.xaxis = O(d, C(p, "x")), p.yaxis = O(v, C(p, "y"))
        }
      }

      function _() {
        function x(e, t, n) {
          t < e.datamin && t != -r && (e.datamin = t), n > e.datamax && n != r && (e.datamax = n)
        }
        var t = Number.POSITIVE_INFINITY,
          n = Number.NEGATIVE_INFINITY,
          r = Number.MAX_VALUE,
          i, s, o, a, f, l, c, h, p, d, v, m, g, y, w, S;
        e.each(k(), function (e, r) {
          r.datamin = t, r.datamax = n, r.used = !1
        });
        for (i = 0; i < u.length; ++i) l = u[i], l.datapoints = {
          points: []
        }, E(b.processRawData, [l, l.data, l.datapoints]);
        for (i = 0; i < u.length; ++i) {
          l = u[i], w = l.data, S = l.datapoints.format;
          if (!S) {
            S = [], S.push({
              x: !0,
              number: !0,
              required: !0
            }), S.push({
              y: !0,
              number: !0,
              required: !0
            });
            if (l.bars.show || l.lines.show && l.lines.fill) {
              var T = !!(l.bars.show && l.bars.zero || l.lines.show && l.lines.zero);
              S.push({
                y: !0,
                number: !0,
                required: !1,
                defaultValue: 0,
                autoscale: T
              }), l.bars.horizontal && (delete S[S.length - 1].y, S[S.length - 1].x = !0)
            }
            l.datapoints.format = S
          }
          if (l.datapoints.pointsize != null) continue;
          l.datapoints.pointsize = S.length, h = l.datapoints.pointsize, c = l.datapoints.points;
          var N = l.lines.show && l.lines.steps;
          l.xaxis.used = l.yaxis.used = !0;
          for (s = o = 0; s < w.length; ++s, o += h) {
            y = w[s];
            var C = y == null;
            if (!C)
              for (a = 0; a < h; ++a) m = y[a], g = S[a], g && (g.number && m != null && (m = +m, isNaN(m) ? m = null : m == Infinity ? m = r : m == -Infinity && (m = -r)), m == null && (g.required && (C = !0), g.defaultValue != null && (m = g.defaultValue))), c[o + a] = m;
            if (C)
              for (a = 0; a < h; ++a) m = c[o + a], m != null && (g = S[a], g.autoscale !== !1 && (g.x && x(l.xaxis, m, m), g.y && x(l.yaxis, m, m))), c[o + a] = null;
            else if (N && o > 0 && c[o - h] != null && c[o - h] != c[o] && c[o - h + 1] != c[o + 1]) {
              for (a = 0; a < h; ++a) c[o + h + a] = c[o + a];
              c[o + 1] = c[o - h + 1], o += h
            }
          }
        }
        for (i = 0; i < u.length; ++i) l = u[i], E(b.processDatapoints, [l, l.datapoints]);
        for (i = 0; i < u.length; ++i) {
          l = u[i], c = l.datapoints.points, h = l.datapoints.pointsize, S = l.datapoints.format;
          var L = t,
            A = t,
            O = n,
            M = n;
          for (s = 0; s < c.length; s += h) {
            if (c[s] == null) continue;
            for (a = 0; a < h; ++a) {
              m = c[s + a], g = S[a];
              if (!g || g.autoscale === !1 || m == r || m == -r) continue;
              g.x && (m < L && (L = m), m > O && (O = m)), g.y && (m < A && (A = m), m > M && (M = m))
            }
          }
          if (l.bars.show) {
            var _;
            switch (l.bars.align) {
              case "left":
                _ = 0;
                break;
              case "right":
                _ = -l.bars.barWidth;
                break;
              default:
                _ = -l.bars.barWidth / 2
            }
            l.bars.horizontal ? (A += _, M += _ + l.bars.barWidth) : (L += _, O += _ + l.bars.barWidth)
          }
          x(l.xaxis, L, O), x(l.yaxis, A, M)
        }
        e.each(k(), function (e, r) {
          r.datamin == t && (r.datamin = null), r.datamax == n && (r.datamax = null)
        })
      }

      function D() {
        t.css("padding", 0).children().filter(function () {
          return !e(this).hasClass("flot-overlay") && !e(this).hasClass("flot-base")
        }).remove(), t.css("position") == "static" && t.css("position", "relative"), f = new n("flot-base", t), l = new n("flot-overlay", t), h = f.context, p = l.context, c = e(l.element).unbind();
        var r = t.data("plot");
        r && (r.shutdown(), l.clear()), t.data("plot", w)
      }

      function P() {
        a.grid.hoverable && (c.mousemove(at), c.bind("mouseleave", ft)), a.grid.clickable && c.click(lt), E(b.bindEvents, [c])
      }

      function H() {
        ot && clearTimeout(ot), c.unbind("mousemove", at), c.unbind("mouseleave", ft), c.unbind("click", lt), E(b.shutdown, [c])
      }

      function B(e) {
        function t(e) {
          return e
        }
        var n, r, i = e.options.transform || t,
          s = e.options.inverseTransform;
        e.direction == "x" ? (n = e.scale = g / Math.abs(i(e.max) - i(e.min)), r = Math.min(i(e.max), i(e.min))) : (n = e.scale = y / Math.abs(i(e.max) - i(e.min)), n = -n, r = Math.max(i(e.max), i(e.min))), i == t ? e.p2c = function (e) {
          return (e - r) * n
        } : e.p2c = function (e) {
          return (i(e) - r) * n
        }, s ? e.c2p = function (e) {
          return s(r + e / n)
        } : e.c2p = function (e) {
          return r + e / n
        }
      }

      function j(e) {
        var t = e.options,
          n = e.ticks || [],
          r = t.labelWidth || 0,
          i = t.labelHeight || 0,
          s = r || (e.direction == "x" ? Math.floor(f.width / (n.length || 1)) : null),
          o = e.direction + "Axis " + e.direction + e.n + "Axis",
          u = "flot-" + e.direction + "-axis flot-" + e.direction + e.n + "-axis " + o,
          a = t.font || "flot-tick-label tickLabel";
        for (var l = 0; l < n.length; ++l) {
          var c = n[l];
          if (!c.label) continue;
          var h = f.getTextInfo(u, c.label, a, null, s);
          r = Math.max(r, h.width), i = Math.max(i, h.height)
        }
        e.labelWidth = t.labelWidth || r, e.labelHeight = t.labelHeight || i
      }

      function F(t) {
        var n = t.labelWidth,
          r = t.labelHeight,
          i = t.options.position,
          s = t.direction === "x",
          o = t.options.tickLength,
          u = a.grid.axisMargin,
          l = a.grid.labelMargin,
          c = !0,
          h = !0,
          p = !0,
          g = !1;
        e.each(s ? d : v, function (e, n) {
          n && (n.show || n.reserveSpace) && (n === t ? g = !0 : n.options.position === i && (g ? h = !1 : c = !1), g || (p = !1))
        }), h && (u = 0), o == null && (o = p ? "full" : 5), isNaN(+o) || (l += +o), s ? (r += l, i == "bottom" ? (m.bottom += r + u, t.box = {
          top: f.height - m.bottom,
          height: r
        }) : (t.box = {
          top: m.top + u,
          height: r
        }, m.top += r + u)) : (n += l, i == "left" ? (t.box = {
          left: m.left + u,
          width: n
        }, m.left += n + u) : (m.right += n + u, t.box = {
          left: f.width - m.right,
          width: n
        })), t.position = i, t.tickLength = o, t.box.padding = l, t.innermost = c
      }

      function I(e) {
        e.direction == "x" ? (e.box.left = m.left - e.labelWidth / 2, e.box.width = f.width - m.left - m.right + e.labelWidth) : (e.box.top = m.top - e.labelHeight / 2, e.box.height = f.height - m.bottom - m.top + e.labelHeight)
      }

      function q() {
        var t = a.grid.minBorderMargin,
          n, r;
        if (t == null) {
          t = 0;
          for (r = 0; r < u.length; ++r) t = Math.max(t, 2 * (u[r].points.radius + u[r].points.lineWidth / 2))
        }
        var i = {
          left: t,
          right: t,
          top: t,
          bottom: t
        };
        e.each(k(), function (e, t) {
          t.reserveSpace && t.ticks && t.ticks.length && (t.direction === "x" ? (i.left = Math.max(i.left, t.labelWidth / 2), i.right = Math.max(i.right, t.labelWidth / 2)) : (i.bottom = Math.max(i.bottom, t.labelHeight / 2), i.top = Math.max(i.top, t.labelHeight / 2)))
        }), m.left = Math.ceil(Math.max(i.left, m.left)), m.right = Math.ceil(Math.max(i.right, m.right)), m.top = Math.ceil(Math.max(i.top, m.top)), m.bottom = Math.ceil(Math.max(i.bottom, m.bottom))
      }

      function R() {
        var t, n = k(),
          r = a.grid.show;
        for (var i in m) {
          var s = a.grid.margin || 0;
          m[i] = typeof s == "number" ? s : s[i] || 0
        }
        E(b.processOffset, [m]);
        for (var i in m) typeof a.grid.borderWidth == "object" ? m[i] += r ? a.grid.borderWidth[i] : 0 : m[i] += r ? a.grid.borderWidth : 0;
        e.each(n, function (e, t) {
          var n = t.options;
          t.show = n.show == null ? t.used : n.show, t.reserveSpace = n.reserveSpace == null ? t.show : n.reserveSpace, U(t)
        });
        if (r) {
          var o = e.grep(n, function (e) {
            return e.show || e.reserveSpace
          });
          e.each(o, function (e, t) {
            z(t), W(t), X(t, t.ticks), j(t)
          });
          for (t = o.length - 1; t >= 0; --t) F(o[t]);
          q(), e.each(o, function (e, t) {
            I(t)
          })
        }
        g = f.width - m.left - m.right, y = f.height - m.bottom - m.top, e.each(n, function (e, t) {
          B(t)
        }), r && G(), it()
      }

      function U(e) {
        var t = e.options,
          n = +(t.min != null ? t.min : e.datamin),
          r = +(t.max != null ? t.max : e.datamax),
          i = r - n;
        if (i == 0) {
          var s = r == 0 ? 1 : .01;
          t.min == null && (n -= s);
          if (t.max == null || t.min != null) r += s
        } else {
          var o = t.autoscaleMargin;
          o != null && (t.min == null && (n -= i * o, n < 0 && e.datamin != null && e.datamin >= 0 && (n = 0)), t.max == null && (r += i * o, r > 0 && e.datamax != null && e.datamax <= 0 && (r = 0)))
        }
        e.min = n, e.max = r
      }

      function z(t) {
        var n = t.options,
          r;
        typeof n.ticks == "number" && n.ticks > 0 ? r = n.ticks : r = .3 * Math.sqrt(t.direction == "x" ? f.width : f.height);
        var s = (t.max - t.min) / r,
          o = -Math.floor(Math.log(s) / Math.LN10),
          u = n.tickDecimals;
        u != null && o > u && (o = u);
        var a = Math.pow(10, -o),
          l = s / a,
          c;
        l < 1.5 ? c = 1 : l < 3 ? (c = 2, l > 2.25 && (u == null || o + 1 <= u) && (c = 2.5, ++o)) : l < 7.5 ? c = 5 : c = 10, c *= a, n.minTickSize != null && c < n.minTickSize && (c = n.minTickSize), t.delta = s, t.tickDecimals = Math.max(0, u != null ? u : o), t.tickSize = n.tickSize || c;
        if (n.mode == "time" && !t.tickGenerator) throw new Error("Time mode requires the flot.time plugin.");
        t.tickGenerator || (t.tickGenerator = function (e) {
          var t = [],
            n = i(e.min, e.tickSize),
            r = 0,
            s = Number.NaN,
            o;
          do o = s, s = n + r * e.tickSize, t.push(s), ++r; while (s < e.max && s != o);
          return t
        }, t.tickFormatter = function (e, t) {
          var n = t.tickDecimals ? Math.pow(10, t.tickDecimals) : 1,
            r = "" + Math.round(e * n) / n;
          if (t.tickDecimals != null) {
            var i = r.indexOf("."),
              s = i == -1 ? 0 : r.length - i - 1;
            if (s < t.tickDecimals) return (s ? r : r + ".") + ("" + n).substr(1, t.tickDecimals - s)
          }
          return r
        }), e.isFunction(n.tickFormatter) && (t.tickFormatter = function (e, t) {
          return "" + n.tickFormatter(e, t)
        });
        if (n.alignTicksWithAxis != null) {
          var h = (t.direction == "x" ? d : v)[n.alignTicksWithAxis - 1];
          if (h && h.used && h != t) {
            var p = t.tickGenerator(t);
            p.length > 0 && (n.min == null && (t.min = Math.min(t.min, p[0])), n.max == null && p.length > 1 && (t.max = Math.max(t.max, p[p.length - 1]))), t.tickGenerator = function (e) {
              var t = [],
                n, r;
              for (r = 0; r < h.ticks.length; ++r) n = (h.ticks[r].v - h.min) / (h.max - h.min), n = e.min + n * (e.max - e.min), t.push(n);
              return t
            };
            if (!t.mode && n.tickDecimals == null) {
              var m = Math.max(0, -Math.floor(Math.log(t.delta) / Math.LN10) + 1),
                g = t.tickGenerator(t);
              g.length > 1 && /\..*0$/.test((g[1] - g[0]).toFixed(m)) || (t.tickDecimals = m)
            }
          }
        }
      }

      function W(t) {
        var n = t.options.ticks,
          r = [];
        n == null || typeof n == "number" && n > 0 ? r = t.tickGenerator(t) : n && (e.isFunction(n) ? r = n(t) : r = n);
        var i, s;
        t.ticks = [];
        for (i = 0; i < r.length; ++i) {
          var o = null,
            u = r[i];
          typeof u == "object" ? (s = +u[0], u.length > 1 && (o = u[1])) : s = +u, o == null && (o = t.tickFormatter(s, t)), isNaN(s) || t.ticks.push({
            v: s,
            label: o
          })
        }
      }

      function X(e, t) {
        e.options.autoscaleMargin && t.length > 0 && (e.options.min == null && (e.min = Math.min(e.min, t[0].v)), e.options.max == null && t.length > 1 && (e.max = Math.max(e.max, t[t.length - 1].v)))
      }

      function V() {
        f.clear(), E(b.drawBackground, [h]);
        var e = a.grid;
        e.show && e.backgroundColor && K(), e.show && !e.aboveData && Q();
        for (var t = 0; t < u.length; ++t) E(b.drawSeries, [h, u[t]]), Y(u[t]);
        E(b.draw, [h]), e.show && e.aboveData && Q(), f.render(), ht()
      }

      function J(e, t) {
        var n, r, i, s, o = k();
        for (var u = 0; u < o.length; ++u) {
          n = o[u];
          if (n.direction == t) {
            s = t + n.n + "axis", !e[s] && n.n == 1 && (s = t + "axis");
            if (e[s]) {
              r = e[s].from, i = e[s].to;
              break
            }
          }
        }
        e[s] || (n = t == "x" ? d[0] : v[0], r = e[t + "1"], i = e[t + "2"]);
        if (r != null && i != null && r > i) {
          var a = r;
          r = i, i = a
        }
        return {
          from: r,
          to: i,
          axis: n
        }
      }

      function K() {
        h.save(), h.translate(m.left, m.top), h.fillStyle = bt(a.grid.backgroundColor, y, 0, "rgba(255, 255, 255, 0)"), h.fillRect(0, 0, g, y), h.restore()
      }

      function Q() {
        var t, n, r, i;
        h.save(), h.translate(m.left, m.top);
        var s = a.grid.markings;
        if (s) {
          e.isFunction(s) && (n = w.getAxes(), n.xmin = n.xaxis.min, n.xmax = n.xaxis.max, n.ymin = n.yaxis.min, n.ymax = n.yaxis.max, s = s(n));
          for (t = 0; t < s.length; ++t) {
            var o = s[t],
              u = J(o, "x"),
              f = J(o, "y");
            u.from == null && (u.from = u.axis.min), u.to == null && (u.to = u.axis.max), f.from == null && (f.from = f.axis.min), f.to == null && (f.to = f.axis.max);
            if (u.to < u.axis.min || u.from > u.axis.max || f.to < f.axis.min || f.from > f.axis.max) continue;
            u.from = Math.max(u.from, u.axis.min), u.to = Math.min(u.to, u.axis.max), f.from = Math.max(f.from, f.axis.min), f.to = Math.min(f.to, f.axis.max);
            var l = u.from === u.to,
              c = f.from === f.to;
            if (l && c) continue;
            u.from = Math.floor(u.axis.p2c(u.from)), u.to = Math.floor(u.axis.p2c(u.to)), f.from = Math.floor(f.axis.p2c(f.from)), f.to = Math.floor(f.axis.p2c(f.to));
            if (l || c) {
              var p = o.lineWidth || a.grid.markingsLineWidth,
                d = p % 2 ? .5 : 0;
              h.beginPath(), h.strokeStyle = o.color || a.grid.markingsColor, h.lineWidth = p, l ? (h.moveTo(u.to + d, f.from), h.lineTo(u.to + d, f.to)) : (h.moveTo(u.from, f.to + d), h.lineTo(u.to, f.to + d)), h.stroke()
            } else h.fillStyle = o.color || a.grid.markingsColor, h.fillRect(u.from, f.to, u.to - u.from, f.from - f.to)
          }
        }
        n = k(), r = a.grid.borderWidth;
        for (var v = 0; v < n.length; ++v) {
          var b = n[v],
            E = b.box,
            S = b.tickLength,
            x, T, N, C;
          if (!b.show || b.ticks.length == 0) continue;
          h.lineWidth = 1, b.direction == "x" ? (x = 0, S == "full" ? T = b.position == "top" ? 0 : y : T = E.top - m.top + (b.position == "top" ? E.height : 0)) : (T = 0, S == "full" ? x = b.position == "left" ? 0 : g : x = E.left - m.left + (b.position == "left" ? E.width : 0)), b.innermost || (h.strokeStyle = b.options.color, h.beginPath(), N = C = 0, b.direction == "x" ? N = g + 1 : C = y + 1, h.lineWidth == 1 && (b.direction == "x" ? T = Math.floor(T) + .5 : x = Math.floor(x) + .5), h.moveTo(x, T), h.lineTo(x + N, T + C), h.stroke()), h.strokeStyle = b.options.tickColor, h.beginPath();
          for (t = 0; t < b.ticks.length; ++t) {
            var L = b.ticks[t].v;
            N = C = 0;
            if (isNaN(L) || L < b.min || L > b.max || S == "full" && (typeof r == "object" && r[b.position] > 0 || r > 0) && (L == b.min || L == b.max)) continue;
            b.direction == "x" ? (x = b.p2c(L), C = S == "full" ? -y : S, b.position == "top" && (C = -C)) : (T = b.p2c(L), N = S == "full" ? -g : S, b.position == "left" && (N = -N)), h.lineWidth == 1 && (b.direction == "x" ? x = Math.floor(x) + .5 : T = Math.floor(T) + .5), h.moveTo(x, T), h.lineTo(x + N, T + C)
          }
          h.stroke()
        }
        r && (i = a.grid.borderColor, typeof r == "object" || typeof i == "object" ? (typeof r != "object" && (r = {
          top: r,
          right: r,
          bottom: r,
          left: r
        }), typeof i != "object" && (i = {
          top: i,
          right: i,
          bottom: i,
          left: i
        }), r.top > 0 && (h.strokeStyle = i.top, h.lineWidth = r.top, h.beginPath(), h.moveTo(0 - r.left, 0 - r.top / 2), h.lineTo(g, 0 - r.top / 2), h.stroke()), r.right > 0 && (h.strokeStyle = i.right, h.lineWidth = r.right, h.beginPath(), h.moveTo(g + r.right / 2, 0 - r.top), h.lineTo(g + r.right / 2, y), h.stroke()), r.bottom > 0 && (h.strokeStyle = i.bottom, h.lineWidth = r.bottom, h.beginPath(), h.moveTo(g + r.right, y + r.bottom / 2), h.lineTo(0, y + r.bottom / 2), h.stroke()), r.left > 0 && (h.strokeStyle = i.left, h.lineWidth = r.left, h.beginPath(), h.moveTo(0 - r.left / 2, y + r.bottom), h.lineTo(0 - r.left / 2, 0), h.stroke())) : (h.lineWidth = r, h.strokeStyle = a.grid.borderColor, h.strokeRect(-r / 2, -r / 2, g + r, y + r))), h.restore()
      }

      function G() {
        e.each(k(), function (e, t) {
          var n = t.box,
            r = t.direction + "Axis " + t.direction + t.n + "Axis",
            i = "flot-" + t.direction + "-axis flot-" + t.direction + t.n + "-axis " + r,
            s = t.options.font || "flot-tick-label tickLabel",
            o, u, a, l, c;
          f.removeText(i);
          if (!t.show || t.ticks.length == 0) return;
          for (var h = 0; h < t.ticks.length; ++h) {
            o = t.ticks[h];
            if (!o.label || o.v < t.min || o.v > t.max) continue;
            t.direction == "x" ? (l = "center", u = m.left + t.p2c(o.v), t.position == "bottom" ? a = n.top + n.padding : (a = n.top + n.height - n.padding, c = "bottom")) : (c = "middle", a = m.top + t.p2c(o.v), t.position == "left" ? (u = n.left + n.width - n.padding, l = "right") : u = n.left + n.padding), f.addText(i, u, a, o.label, s, null, null, l, c)
          }
        })
      }

      function Y(e) {
        e.lines.show && Z(e), e.bars.show && nt(e), e.points.show && et(e)
      }

      function Z(e) {
        function t(e, t, n, r, i) {
          var s = e.points,
            o = e.pointsize,
            u = null,
            a = null;
          h.beginPath();
          for (var f = o; f < s.length; f += o) {
            var l = s[f - o],
              c = s[f - o + 1],
              p = s[f],
              d = s[f + 1];
            if (l == null || p == null) continue;
            if (c <= d && c < i.min) {
              if (d < i.min) continue;
              l = (i.min - c) / (d - c) * (p - l) + l, c = i.min
            } else if (d <= c && d < i.min) {
              if (c < i.min) continue;
              p = (i.min - c) / (d - c) * (p - l) + l, d = i.min
            }
            if (c >= d && c > i.max) {
              if (d > i.max) continue;
              l = (i.max - c) / (d - c) * (p - l) + l, c = i.max
            } else if (d >= c && d > i.max) {
              if (c > i.max) continue;
              p = (i.max - c) / (d - c) * (p - l) + l, d = i.max
            }
            if (l <= p && l < r.min) {
              if (p < r.min) continue;
              c = (r.min - l) / (p - l) * (d - c) + c, l = r.min
            } else if (p <= l && p < r.min) {
              if (l < r.min) continue;
              d = (r.min - l) / (p - l) * (d - c) + c, p = r.min
            }
            if (l >= p && l > r.max) {
              if (p > r.max) continue;
              c = (r.max - l) / (p - l) * (d - c) + c, l = r.max
            } else if (p >= l && p > r.max) {
              if (l > r.max) continue;
              d = (r.max - l) / (p - l) * (d - c) + c, p = r.max
            }(l != u || c != a) && h.moveTo(r.p2c(l) + t, i.p2c(c) + n), u = p, a = d, h.lineTo(r.p2c(p) + t, i.p2c(d) + n)
          }
          h.stroke()
        }

        function n(e, t, n) {
          var r = e.points,
            i = e.pointsize,
            s = Math.min(Math.max(0, n.min), n.max),
            o = 0,
            u, a = !1,
            f = 1,
            l = 0,
            c = 0;
          for (;;) {
            if (i > 0 && o > r.length + i) break;
            o += i;
            var p = r[o - i],
              d = r[o - i + f],
              v = r[o],
              m = r[o + f];
            if (a) {
              if (i > 0 && p != null && v == null) {
                c = o, i = -i, f = 2;
                continue
              }
              if (i < 0 && o == l + i) {
                h.fill(), a = !1, i = -i, f = 1, o = l = c + i;
                continue
              }
            }
            if (p == null || v == null) continue;
            if (p <= v && p < t.min) {
              if (v < t.min) continue;
              d = (t.min - p) / (v - p) * (m - d) + d, p = t.min
            } else if (v <= p && v < t.min) {
              if (p < t.min) continue;
              m = (t.min - p) / (v - p) * (m - d) + d, v = t.min
            }
            if (p >= v && p > t.max) {
              if (v > t.max) continue;
              d = (t.max - p) / (v - p) * (m - d) + d, p = t.max
            } else if (v >= p && v > t.max) {
              if (p > t.max) continue;
              m = (t.max - p) / (v - p) * (m - d) + d, v = t.max
            }
            a || (h.beginPath(), h.moveTo(t.p2c(p), n.p2c(s)), a = !0);
            if (d >= n.max && m >= n.max) {
              h.lineTo(t.p2c(p), n.p2c(n.max)), h.lineTo(t.p2c(v), n.p2c(n.max));
              continue
            }
            if (d <= n.min && m <= n.min) {
              h.lineTo(t.p2c(p), n.p2c(n.min)), h.lineTo(t.p2c(v), n.p2c(n.min));
              continue
            }
            var g = p,
              y = v;
            d <= m && d < n.min && m >= n.min ? (p = (n.min - d) / (m - d) * (v - p) + p, d = n.min) : m <= d && m < n.min && d >= n.min && (v = (n.min - d) / (m - d) * (v - p) + p, m = n.min), d >= m && d > n.max && m <= n.max ? (p = (n.max - d) / (m - d) * (v - p) + p, d = n.max) : m >= d && m > n.max && d <= n.max && (v = (n.max - d) / (m - d) * (v - p) + p, m = n.max), p != g && h.lineTo(t.p2c(g), n.p2c(d)), h.lineTo(t.p2c(p), n.p2c(d)), h.lineTo(t.p2c(v), n.p2c(m)), v != y && (h.lineTo(t.p2c(v), n.p2c(m)), h.lineTo(t.p2c(y), n.p2c(m)))
          }
        }
        h.save(), h.translate(m.left, m.top), h.lineJoin = "round";
        var r = e.lines.lineWidth,
          i = e.shadowSize;
        if (r > 0 && i > 0) {
          h.lineWidth = i, h.strokeStyle = "rgba(0,0,0,0.1)";
          var s = Math.PI / 18;
          t(e.datapoints, Math.sin(s) * (r / 2 + i / 2), Math.cos(s) * (r / 2 + i / 2), e.xaxis, e.yaxis), h.lineWidth = i / 2, t(e.datapoints, Math.sin(s) * (r / 2 + i / 4), Math.cos(s) * (r / 2 + i / 4), e.xaxis, e.yaxis)
        }
        h.lineWidth = r, h.strokeStyle = e.color;
        var o = rt(e.lines, e.color, 0, y);
        o && (h.fillStyle = o, n(e.datapoints, e.xaxis, e.yaxis)), r > 0 && t(e.datapoints, 0, 0, e.xaxis, e.yaxis), h.restore()
      }

      function et(e) {
        function t(e, t, n, r, i, s, o, u) {
          var a = e.points,
            f = e.pointsize;
          for (var l = 0; l < a.length; l += f) {
            var c = a[l],
              p = a[l + 1];
            if (c == null || c < s.min || c > s.max || p < o.min || p > o.max) continue;
            h.beginPath(), c = s.p2c(c), p = o.p2c(p) + r, u == "circle" ? h.arc(c, p, t, 0, i ? Math.PI : Math.PI * 2, !1) : u(h, c, p, t, i), h.closePath(), n && (h.fillStyle = n, h.fill()), h.stroke()
          }
        }
        h.save(), h.translate(m.left, m.top);
        var n = e.points.lineWidth,
          r = e.shadowSize,
          i = e.points.radius,
          s = e.points.symbol;
        n == 0 && (n = 1e-4);
        if (n > 0 && r > 0) {
          var o = r / 2;
          h.lineWidth = o, h.strokeStyle = "rgba(0,0,0,0.1)", t(e.datapoints, i, null, o + o / 2, !0, e.xaxis, e.yaxis, s), h.strokeStyle = "rgba(0,0,0,0.2)", t(e.datapoints, i, null, o / 2, !0, e.xaxis, e.yaxis, s)
        }
        h.lineWidth = n, h.strokeStyle = e.color, t(e.datapoints, i, rt(e.points, e.color), 0, !1, e.xaxis, e.yaxis, s), h.restore()
      }

      function tt(e, t, n, r, i, s, o, u, a, f, l) {
        var c, h, p, d, v, m, g, y, b;
        f ? (y = m = g = !0, v = !1, c = n, h = e, d = t + r, p = t + i, h < c && (b = h, h = c, c = b, v = !0, m = !1)) : (v = m = g = !0, y = !1, c = e + r, h = e + i, p = n, d = t, d < p && (b = d, d = p, p = b, y = !0, g = !1));
        if (h < o.min || c > o.max || d < u.min || p > u.max) return;
        c < o.min && (c = o.min, v = !1), h > o.max && (h = o.max, m = !1), p < u.min && (p = u.min, y = !1), d > u.max && (d = u.max, g = !1), c = o.p2c(c), p = u.p2c(p), h = o.p2c(h), d = u.p2c(d), s && (a.fillStyle = s(p, d), a.fillRect(c, d, h - c, p - d)), l > 0 && (v || m || g || y) && (a.beginPath(), a.moveTo(c, p), v ? a.lineTo(c, d) : a.moveTo(c, d), g ? a.lineTo(h, d) : a.moveTo(h, d), m ? a.lineTo(h, p) : a.moveTo(h, p), y ? a.lineTo(c, p) : a.moveTo(c, p), a.stroke())
      }

      function nt(e) {
        function t(t, n, r, i, s, o) {
          var u = t.points,
            a = t.pointsize;
          for (var f = 0; f < u.length; f += a) {
            if (u[f] == null) continue;
            tt(u[f], u[f + 1], u[f + 2], n, r, i, s, o, h, e.bars.horizontal, e.bars.lineWidth)
          }
        }
        h.save(), h.translate(m.left, m.top), h.lineWidth = e.bars.lineWidth, h.strokeStyle = e.color;
        var n;
        switch (e.bars.align) {
          case "left":
            n = 0;
            break;
          case "right":
            n = -e.bars.barWidth;
            break;
          default:
            n = -e.bars.barWidth / 2
        }
        var r = e.bars.fill ? function (t, n) {
          return rt(e.bars, e.color, t, n)
        } : null;
        t(e.datapoints, n, n + e.bars.barWidth, r, e.xaxis, e.yaxis), h.restore()
      }

      function rt(t, n, r, i) {
        var s = t.fill;
        if (!s) return null;
        if (t.fillColor) return bt(t.fillColor, r, i, n);
        var o = e.color.parse(n);
        return o.a = typeof s == "number" ? s : .4, o.normalize(), o.toString()
      }

      function it() {
        a.legend.container != null ? e(a.legend.container).html("") : t.find(".legend").remove();
        if (!a.legend.show) return;
        var n = [],
          r = [],
          i = !1,
          s = a.legend.labelFormatter,
          o, f;
        for (var l = 0; l < u.length; ++l) o = u[l], o.label && (f = s ? s(o.label, o) : o.label, f && r.push({
          label: f,
          color: o.color
        }));
        if (a.legend.sorted)
          if (e.isFunction(a.legend.sorted)) r.sort(a.legend.sorted);
          else if (a.legend.sorted == "reverse") r.reverse();
        else {
          var c = a.legend.sorted != "descending";
          r.sort(function (e, t) {
            return e.label == t.label ? 0 : e.label < t.label != c ? 1 : -1
          })
        }
        for (var l = 0; l < r.length; ++l) {
          var h = r[l];
          l % a.legend.noColumns == 0 && (i && n.push("</tr>"), n.push("<tr>"), i = !0), n.push('<td class="legendColorBox"><div style="border:1px solid ' + a.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + h.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + h.label + "</td>")
        }
        i && n.push("</tr>");
        if (n.length == 0) return;
        var p = '<table style="font-size:smaller;color:' + a.grid.color + '">' + n.join("") + "</table>";
        if (a.legend.container != null) e(a.legend.container).html(p);
        else {
          var d = "",
            v = a.legend.position,
            g = a.legend.margin;
          g[0] == null && (g = [g, g]), v.charAt(0) == "n" ? d += "top:" + (g[1] + m.top) + "px;" : v.charAt(0) == "s" && (d += "bottom:" + (g[1] + m.bottom) + "px;"), v.charAt(1) == "e" ? d += "right:" + (g[0] + m.right) + "px;" : v.charAt(1) == "w" && (d += "left:" + (g[0] + m.left) + "px;");
          var y = e('<div class="legend">' + p.replace('style="', 'style="position:absolute;' + d + ";") + "</div>").appendTo(t);
          if (a.legend.backgroundOpacity != 0) {
            var b = a.legend.backgroundColor;
            b == null && (b = a.grid.backgroundColor, b && typeof b == "string" ? b = e.color.parse(b) : b = e.color.extract(y, "background-color"), b.a = 1, b = b.toString());
            var w = y.children();
            e('<div style="position:absolute;width:' + w.width() + "px;height:" + w.height() + "px;" + d + "background-color:" + b + ';"> </div>').prependTo(y).css("opacity", a.legend.backgroundOpacity)
          }
        }
      }

      function ut(e, t, n) {
        var r = a.grid.mouseActiveRadius,
          i = r * r + 1,
          s = null,
          o = !1,
          f, l, c;
        for (f = u.length - 1; f >= 0; --f) {
          if (!n(u[f])) continue;
          var h = u[f],
            p = h.xaxis,
            d = h.yaxis,
            v = h.datapoints.points,
            m = p.c2p(e),
            g = d.c2p(t),
            y = r / p.scale,
            b = r / d.scale;
          c = h.datapoints.pointsize, p.options.inverseTransform && (y = Number.MAX_VALUE), d.options.inverseTransform && (b = Number.MAX_VALUE);
          if (h.lines.show || h.points.show)
            for (l = 0; l < v.length; l += c) {
              var w = v[l],
                E = v[l + 1];
              if (w == null) continue;
              if (w - m > y || w - m < -y || E - g > b || E - g < -b) continue;
              var S = Math.abs(p.p2c(w) - e),
                x = Math.abs(d.p2c(E) - t),
                T = S * S + x * x;
              T < i && (i = T, s = [f, l / c])
            }
          if (h.bars.show && !s) {
            var N, C;
            switch (h.bars.align) {
              case "left":
                N = 0;
                break;
              case "right":
                N = -h.bars.barWidth;
                break;
              default:
                N = -h.bars.barWidth / 2
            }
            C = N + h.bars.barWidth;
            for (l = 0; l < v.length; l += c) {
              var w = v[l],
                E = v[l + 1],
                k = v[l + 2];
              if (w == null) continue;
              if (u[f].bars.horizontal ? m <= Math.max(k, w) && m >= Math.min(k, w) && g >= E + N && g <= E + C : m >= w + N && m <= w + C && g >= Math.min(k, E) && g <= Math.max(k, E)) s = [f, l / c]
            }
          }
        }
        return s ? (f = s[0], l = s[1], c = u[f].datapoints.pointsize, {
          datapoint: u[f].datapoints.points.slice(l * c, (l + 1) * c),
          dataIndex: l,
          series: u[f],
          seriesIndex: f
        }) : null
      }

      function at(e) {
        a.grid.hoverable && ct("plothover", e, function (e) {
          return e["hoverable"] != 0
        })
      }

      function ft(e) {
        a.grid.hoverable && ct("plothover", e, function (e) {
          return !1
        })
      }

      function lt(e) {
        ct("plotclick", e, function (e) {
          return e["clickable"] != 0
        })
      }

      function ct(e, n, r) {
        var i = c.offset(),
          s = n.pageX - i.left - m.left,
          o = n.pageY - i.top - m.top,
          u = L({
            left: s,
            top: o
          });
        u.pageX = n.pageX, u.pageY = n.pageY;
        var f = ut(s, o, r);
        f && (f.pageX = parseInt(f.series.xaxis.p2c(f.datapoint[0]) + i.left + m.left, 10), f.pageY = parseInt(f.series.yaxis.p2c(f.datapoint[1]) + i.top + m.top, 10));
        if (a.grid.autoHighlight) {
          for (var l = 0; l < st.length; ++l) {
            var h = st[l];
            h.auto == e && (!f || h.series != f.series || h.point[0] != f.datapoint[0] || h.point[1] != f.datapoint[1]) && vt(h.series, h.point)
          }
          f && dt(f.series, f.datapoint, e)
        }
        t.trigger(e, [u, f])
      }

      function ht() {
        var e = a.interaction.redrawOverlayInterval;
        if (e == -1) {
          pt();
          return
        }
        ot || (ot = setTimeout(pt, e))
      }

      function pt() {
        ot = null, p.save(), l.clear(), p.translate(m.left, m.top);
        var e, t;
        for (e = 0; e < st.length; ++e) t = st[e], t.series.bars.show ? yt(t.series, t.point) : gt(t.series, t.point);
        p.restore(), E(b.drawOverlay, [p])
      }

      function dt(e, t, n) {
        typeof e == "number" && (e = u[e]);
        if (typeof t == "number") {
          var r = e.datapoints.pointsize;
          t = e.datapoints.points.slice(r * t, r * (t + 1))
        }
        var i = mt(e, t);
        i == -1 ? (st.push({
          series: e,
          point: t,
          auto: n
        }), ht()) : n || (st[i].auto = !1)
      }

      function vt(e, t) {
        if (e == null && t == null) {
          st = [], ht();
          return
        }
        typeof e == "number" && (e = u[e]);
        if (typeof t == "number") {
          var n = e.datapoints.pointsize;
          t = e.datapoints.points.slice(n * t, n * (t + 1))
        }
        var r = mt(e, t);
        r != -1 && (st.splice(r, 1), ht())
      }

      function mt(e, t) {
        for (var n = 0; n < st.length; ++n) {
          var r = st[n];
          if (r.series == e && r.point[0] == t[0] && r.point[1] == t[1]) return n
        }
        return -1
      }

      function gt(t, n) {
        var r = n[0],
          i = n[1],
          s = t.xaxis,
          o = t.yaxis,
          u = typeof t.highlightColor == "string" ? t.highlightColor : e.color.parse(t.color).scale("a", .5).toString();
        if (r < s.min || r > s.max || i < o.min || i > o.max) return;
        var a = t.points.radius + t.points.lineWidth / 2;
        p.lineWidth = a, p.strokeStyle = u;
        var f = 1.5 * a;
        r = s.p2c(r), i = o.p2c(i), p.beginPath(), t.points.symbol == "circle" ? p.arc(r, i, f, 0, 2 * Math.PI, !1) : t.points.symbol(p, r, i, f, !1), p.closePath(), p.stroke()
      }

      function yt(t, n) {
        var r = typeof t.highlightColor == "string" ? t.highlightColor : e.color.parse(t.color).scale("a", .5).toString(),
          i = r,
          s;
        switch (t.bars.align) {
          case "left":
            s = 0;
            break;
          case "right":
            s = -t.bars.barWidth;
            break;
          default:
            s = -t.bars.barWidth / 2
        }
        p.lineWidth = t.bars.lineWidth, p.strokeStyle = r, tt(n[0], n[1], n[2] || 0, s, s + t.bars.barWidth, function () {
          return i
        }, t.xaxis, t.yaxis, p, t.bars.horizontal, t.bars.lineWidth)
      }

      function bt(t, n, r, i) {
        if (typeof t == "string") return t;
        var s = h.createLinearGradient(0, r, 0, n);
        for (var o = 0, u = t.colors.length; o < u; ++o) {
          var a = t.colors[o];
          if (typeof a != "string") {
            var f = e.color.parse(i);
            a.brightness != null && (f = f.scale("rgb", a.brightness)), a.opacity != null && (f.a *= a.opacity), a = f.toString()
          }
          s.addColorStop(o / (u - 1), a)
        }
        return s
      }
      var u = [],
        a = {
          colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
          legend: {
            show: !0,
            noColumns: 1,
            labelFormatter: null,
            labelBoxBorderColor: "#ccc",
            container: null,
            position: "ne",
            margin: 5,
            backgroundColor: null,
            backgroundOpacity: .85,
            sorted: null
          },
          xaxis: {
            show: null,
            position: "bottom",
            mode: null,
            font: null,
            color: null,
            tickColor: null,
            transform: null,
            inverseTransform: null,
            min: null,
            max: null,
            autoscaleMargin: null,
            ticks: null,
            tickFormatter: null,
            labelWidth: null,
            labelHeight: null,
            reserveSpace: null,
            tickLength: null,
            alignTicksWithAxis: null,
            tickDecimals: null,
            tickSize: null,
            minTickSize: null
          },
          yaxis: {
            autoscaleMargin: .02,
            position: "left"
          },
          xaxes: [],
          yaxes: [],
          series: {
            points: {
              show: !1,
              radius: 3,
              lineWidth: 2,
              fill: !0,
              fillColor: "#ffffff",
              symbol: "circle"
            },
            lines: {
              lineWidth: 2,
              fill: !1,
              fillColor: null,
              steps: !1
            },
            bars: {
              show: !1,
              lineWidth: 2,
              barWidth: 1,
              fill: !0,
              fillColor: null,
              align: "left",
              horizontal: !1,
              zero: !0
            },
            shadowSize: 3,
            highlightColor: null
          },
          grid: {
            show: !0,
            aboveData: !1,
            color: "#545454",
            backgroundColor: null,
            borderColor: null,
            tickColor: null,
            margin: 0,
            labelMargin: 5,
            axisMargin: 8,
            borderWidth: 2,
            minBorderMargin: null,
            markings: null,
            markingsColor: "#f4f4f4",
            markingsLineWidth: 2,
            clickable: !1,
            hoverable: !1,
            autoHighlight: !0,
            mouseActiveRadius: 10
          },
          interaction: {
            redrawOverlayInterval: 1e3 / 60
          },
          hooks: {}
        },
        f = null,
        l = null,
        c = null,
        h = null,
        p = null,
        d = [],
        v = [],
        m = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        g = 0,
        y = 0,
        b = {
          processOptions: [],
          processRawData: [],
          processDatapoints: [],
          processOffset: [],
          drawBackground: [],
          drawSeries: [],
          draw: [],
          bindEvents: [],
          drawOverlay: [],
          shutdown: []
        },
        w = this;
      w.setData = T, w.setupGrid = R, w.draw = V, w.getPlaceholder = function () {
        return t
      }, w.getCanvas = function () {
        return f.element
      }, w.getPlotOffset = function () {
        return m
      }, w.width = function () {
        return g
      }, w.height = function () {
        return y
      }, w.offset = function () {
        var e = c.offset();
        return e.left += m.left, e.top += m.top, e
      }, w.getData = function () {
        return u
      }, w.getAxes = function () {
        var t = {},
          n;
        return e.each(d.concat(v), function (e, n) {
          n && (t[n.direction + (n.n != 1 ? n.n : "") + "axis"] = n)
        }), t
      }, w.getXAxes = function () {
        return d
      }, w.getYAxes = function () {
        return v
      }, w.c2p = L, w.p2c = A, w.getOptions = function () {
        return a
      }, w.highlight = dt, w.unhighlight = vt, w.triggerRedrawOverlay = ht, w.pointOffset = function (e) {
        return {
          left: parseInt(d[C(e, "x") - 1].p2c(+e.x) + m.left, 10),
          top: parseInt(v[C(e, "y") - 1].p2c(+e.y) + m.top, 10)
        }
      }, w.shutdown = H, w.destroy = function () {
        H(), t.removeData("plot").empty(), u = [], a = null, f = null, l = null, c = null, h = null, p = null, d = [], v = [], b = null, st = [], w = null
      }, w.resize = function () {
        var e = t.width(),
          n = t.height();
        f.resize(e, n), l.resize(e, n)
      }, w.hooks = b, S(w), x(s), D(), T(r), R(), V(), P();
      var st = [],
        ot = null
    }

    function i(e, t) {
      return t * Math.floor(e / t)
    }
    var t = Object.prototype.hasOwnProperty;
    e.fn.detach || (e.fn.detach = function () {
      return this.each(function () {
        this.parentNode && this.parentNode.removeChild(this)
      })
    }), n.prototype.resize = function (e, t) {
      if (e <= 0 || t <= 0) throw new Error("Invalid dimensions for plot, width = " + e + ", height = " + t);
      var n = this.element,
        r = this.context,
        i = this.pixelRatio;
      this.width != e && (n.width = e * i, n.style.width = e + "px", this.width = e), this.height != t && (n.height = t * i, n.style.height = t + "px", this.height = t), r.restore(), r.save(), r.scale(i, i)
    }, n.prototype.clear = function () {
      this.context.clearRect(0, 0, this.width, this.height)
    }, n.prototype.render = function () {
      var e = this._textCache;
      for (var n in e)
        if (t.call(e, n)) {
          var r = this.getTextLayer(n),
            i = e[n];
          r.hide();
          for (var s in i)
            if (t.call(i, s)) {
              var o = i[s];
              for (var u in o)
                if (t.call(o, u)) {
                  var a = o[u].positions;
                  for (var f = 0, l; l = a[f]; f++) l.active ? l.rendered || (r.append(l.element), l.rendered = !0) : (a.splice(f--, 1), l.rendered && l.element.detach());
                  a.length == 0 && delete o[u]
                }
            } r.show()
        }
    }, n.prototype.getTextLayer = function (t) {
      var n = this.text[t];
      return n == null && (this.textContainer == null && (this.textContainer = e("<div class='flot-text'></div>").css({
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        "font-size": "smaller",
        color: "#545454"
      }).insertAfter(this.element)), n = this.text[t] = e("<div></div>").addClass(t).css({
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }).appendTo(this.textContainer)), n
    }, n.prototype.getTextInfo = function (t, n, r, i, s) {
      var o, u, a, f;
      n = "" + n, typeof r == "object" ? o = r.style + " " + r.variant + " " + r.weight + " " + r.size + "px/" + r.lineHeight + "px " + r.family : o = r, u = this._textCache[t], u == null && (u = this._textCache[t] = {}), a = u[o], a == null && (a = u[o] = {}), f = a[n];
      if (f == null) {
        var l = e("<div></div>").html(n).css({
          position: "absolute",
          "max-width": s,
          top: -9999
        }).appendTo(this.getTextLayer(t));
        typeof r == "object" ? l.css({
          font: o,
          color: r.color
        }) : typeof r == "string" && l.addClass(r), f = a[n] = {
          width: l.outerWidth(!0),
          height: l.outerHeight(!0),
          element: l,
          positions: []
        }, l.detach()
      }
      return f
    }, n.prototype.addText = function (e, t, n, r, i, s, o, u, a) {
      var f = this.getTextInfo(e, r, i, s, o),
        l = f.positions;
      u == "center" ? t -= f.width / 2 : u == "right" && (t -= f.width), a == "middle" ? n -= f.height / 2 : a == "bottom" && (n -= f.height);
      for (var c = 0, h; h = l[c]; c++)
        if (h.x == t && h.y == n) {
          h.active = !0;
          return
        } h = {
        active: !0,
        rendered: !1,
        element: l.length ? f.element.clone() : f.element,
        x: t,
        y: n
      }, l.push(h), h.element.css({
        top: Math.round(n),
        left: Math.round(t),
        "text-align": u
      })
    }, n.prototype.removeText = function (e, n, r, i, s, o) {
      if (i == null) {
        var u = this._textCache[e];
        if (u != null)
          for (var a in u)
            if (t.call(u, a)) {
              var f = u[a];
              for (var l in f)
                if (t.call(f, l)) {
                  var c = f[l].positions;
                  for (var h = 0, p; p = c[h]; h++) p.active = !1
                }
            }
      } else {
        var c = this.getTextInfo(e, i, s, o).positions;
        for (var h = 0, p; p = c[h]; h++) p.x == n && p.y == r && (p.active = !1)
      }
    }, e.plot = function (t, n, i) {
      var s = new r(e(t), n, i, e.plot.plugins);
      return s
    }, e.plot.version = "0.8.3", e.plot.plugins = [], e.fn.plot = function (t, n) {
      return this.each(function () {
        e.plot(this, t, n)
      })
    }
  }(jQuery), define("flot/jquery.flot.min", function () {}), define("TELang", ["jquery"], function (e) {
    "use strict";
    var t = {
        lang: {},
        defaultCode: "0",
        getCode: function () {
          var e = t.getUrlParameters().lang;
          return e || (e = t.defaultCode), e
        },
        getUrlParameters: function () {
          var e = [],
            t, n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
          for (var r = 0; r < n.length; r++) t = n[r].split("="), e.push(t[0]), e[t[0]] = t[1];
          return e
        },
        i18n: function (e, n) {
          var r = t.lang[e];
          return r || (r = e), n && (r = t.format(r, n)), r
        },
        i18nFile: function (e) {
          var t = this.getCode();
          return t == "0" || t == "1033" ? e : t + "/" + e
        },
        format: function (e, n, r) {
          n || (n = window);
          var i = function (e, t) {
            var i, s = t.split(/\.+/);
            for (var o = 0; o < s.length; o++) o == 0 && (i = n), i = i[s[o]];
            return typeof i == "function" && (i = r ? i.apply(null, r) : i()), typeof i == "undefined" ? "undefined" : i
          };
          return e.replace(t.tokenRegEx, i)
        },
        tokenRegEx: /\$\{([\w.]+?)\}/g
      },
      n = typeof window != "undefined" ? window : typeof self != "undefined" ? self : {};
    n.TELang = t;
    var r = t.getCode(),
      i = r != 0 ? "js/" + r + "/strings.js" : "js/strings.js";
    return e.ajax({
      url: i,
      dataType: "script",
      async: !1
    }), t
  }), define("internal/NotificationCenter", ["jquery", "TELang"], function (e, t) {
    "use strict";
    var n = null,
      r = function () {
        this._Observers = []
      };
    return Cesium.defineProperties(r.prototype, {}), r.prototype.addObserver = function (e, t, n, r) {
      var i = {
        observer: e,
        funcName: t,
        eventName: n,
        sender: r
      };
      if (this.find(i) > -1) return;
      this._Observers.push(i)
    }, r.prototype.removeObserver = function (e, t, n, r) {
      var i = {
          observer: e,
          funcName: t,
          eventName: n,
          sender: r
        },
        s = this.find(i);
      s > -1 && this._Observers.splice(s, 1)
    }, r.prototype.find = function (e) {
      for (var t = 0; t < this._Observers.length; t++)
        if (this._Observers[t].observer == e.observer && this._Observers[t].funcName == e.funcName && this._Observers[t].eventName == e.eventName && this._Observers[t].sender == e.sender) return t;
      return -1
    }, r.prototype.postNotification = function (t, n, r) {
      for (var i = 0; i < this._Observers.length; i++) {
        var s = this._Observers[i];
        if (s.eventName == t)
          if (s.sender == null || s.sender == n) {
            var o = s.observer[s.funcName];
            o != undefined && e.proxy(o, s.observer)(r)
          }
      }
    }, n = new r, n
  }), define("internal/GeometryHelper", ["jquery", "TELang"], function (e, t) {
    "use strict";

    function r(e, t, n) {
      return (e > t || e > n) && (e < t || e < n) || t === n && t === e
    }

    function o(e, t, n, r) {
      var o = Cesium.Cartesian2.subtract(n, e, s),
        u = t.x * r.y - t.y * r.x,
        a = u * u,
        f = Cesium.Cartesian2.magnitudeSquared(t),
        l = Cesium.Cartesian2.magnitudeSquared(r);
      if (a > i * f * l) {
        var c = (o.x * r.y - o.y * r.x) / u;
        return Cesium.Cartesian2.add(e, Cesium.Cartesian2.multiplyByScalar(t, c, s), s)
      }
      return undefined
    }

    function l(e, t, n) {
      var i = Cesium.Cartesian2.subtract(t, e, a),
        s = n.length;
      for (var u = 0; u < s; u++) {
        var l = n[u].position,
          c = n[Cesium.Math.mod(u + 1, s)].position;
        if (Cesium.Cartesian2.equals(e, l) || Cesium.Cartesian2.equals(t, c) || Cesium.Cartesian2.equals(e, c) || Cesium.Cartesian2.equals(t, l)) continue;
        var h = Cesium.Cartesian2.subtract(c, l, f),
          p = o(e, i, l, h);
        if (!Cesium.defined(p)) continue;
        if (Cesium.Cartesian2.equals(p, e) || Cesium.Cartesian2.equals(p, t) || Cesium.Cartesian2.equals(p, l) || Cesium.Cartesian2.equals(p, c)) continue;
        var d = p.x,
          v = p.y,
          m = r(d, e.x, t.x) && r(v, e.y, t.y) && r(d, l.x, c.x) && r(v, l.y, c.y);
        if (m) return !0
      }
      return !1
    }

    function h(e, t, n, r) {
      var i = Cesium.EllipsoidTangentPlane.fromPoints(t, e),
        s = i.projectPointsOntoPlane(t, c),
        o = Cesium.PolygonPipeline.computeWindingOrder2D(s);
      o === Cesium.WindingOrder.CLOCKWISE && (s.reverse(), t.reverse());
      var u = Cesium.PolygonPipeline.triangulate(s);
      u.length < 3 && (u = [0, 1, 2]);
      var a;
      if (!r) a = Cesium.PolygonPipeline.computeSubdivision(e, t, u, n);
      else {
        var f = t.length,
          l = new Array(f * 3),
          h = 0;
        for (var p = 0; p < f; p++) {
          var d = t[p];
          l[h++] = d.x, l[h++] = d.y, l[h++] = d.z
        }
        a = new Cesium.Geometry({
          attributes: {
            position: new Cesium.GeometryAttribute({
              componentDatatype: Cesium.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: l
            })
          },
          indices: u,
          primitiveType: Cesium.PrimitiveType.TRIANGLES
        })
      }
      return new Cesium.GeometryInstance({
        geometry: a
      })
    }
    var n = function () {
      this._currentPlaneXAxis = null, this._currentPlaneYAxis = null
    };
    n.EARTH_RADIUS = 0, Cesium.defineProperties(n.prototype, {});
    var i = Cesium.Math.EPSILON14,
      s = new Cesium.Cartesian2,
      u = new Cesium.Cartesian2,
      a = new Cesium.Cartesian2,
      f = new Cesium.Cartesian2;
    n.init = function () {
      n.EARTH_RADIUS = viewer.scene.globe.ellipsoid.maximumRadius
    }, n.latLong2Meter = function (e) {
      var t = new Cesium.Cartographic(e.longitude * -Math.PI / 180, e.latitude * Math.PI / 180, e.height),
        r = n.EARTH_RADIUS + t.height,
        i = r * Math.cos(t.latitude),
        s = new Cesium.Cartographic(i * Math.sin(t.longitude), i * Math.cos(t.longitude), r * Math.sin(t.latitude));
      return s
    }, n.geoDist = function (e, t, r) {
      r == undefined && (r = !1);
      var i, s, o;
      o = e instanceof Cesium.Cartesian3 ? viewer.scene.globe.ellipsoid.cartesianToCartographic(e) : e;
      if (o instanceof Cesium.Cartographic) {
        i = new Cesium.Cartographic(Cesium.Math.toDegrees(o.longitude), Cesium.Math.toDegrees(o.latitude), o.height), o = t instanceof Cesium.Cartesian3 ? viewer.scene.globe.ellipsoid.cartesianToCartographic(t) : t;
        if (o instanceof Cesium.Cartographic) {
          s = new Cesium.Cartographic(Cesium.Math.toDegrees(o.longitude), Cesium.Math.toDegrees(o.latitude), o.height), r && (s.height = i.height);
          var u = i.height + n.EARTH_RADIUS,
            a = s.height + n.EARTH_RADIUS,
            f = n.latLong2Meter(i),
            l = n.latLong2Meter(s),
            c = (f.longitude - l.longitude) * (f.longitude - l.longitude) + (f.height - l.height) * (f.height - l.height) + (f.latitude - l.latitude) * (f.latitude - l.latitude);
          if (c < 5) return Math.sqrt(c);
          f.longitude /= u, f.latitude /= u, f.height /= u, l.longitude /= a, l.latitude /= a, l.height /= a;
          var h = Math.max(Math.min(f.longitude * l.longitude + f.height * l.height + f.latitude * l.latitude, 1), -1),
            p = Math.acos(h),
            d = Math.abs(p) * (u + a) / 2;
          return c = Math.sqrt(d * d + (u - a) * (u - a)), c
        }
        return undefined
      }
      return undefined
    }, n.geoDist2D = function (e, t) {
      return n.geoDist(e, t, !0)
    }, n.geoDist3D = function (e, t) {
      return n.geoDist(e, t, !1)
    }, n.getPlaneFromPoints = function (e, t, n) {
      if (!Cesium.defined(e) || !Cesium.defined(e) || !Cesium.defined(n)) return null;
      if (e instanceof Cesium.Cartesian3 && t instanceof Cesium.Cartesian3 && n instanceof Cesium.Cartesian3) {
        var r = new Cesium.Cartesian3;
        Cesium.Cartesian3.subtract(e, t, r);
        var i = new Cesium.Cartesian3;
        Cesium.Cartesian3.subtract(t, n, i);
        var s = new Cesium.Cartesian3;
        Cesium.Cartesian3.normalize(Cesium.Cartesian3.cross(r, i, s), s);
        var o = Cesium.Plane.fromPointNormal(e, s);
        return o
      }
      return null
    }, n.getShortArcDirection = function (e, t) {
      e = Cesium.Math.toDegrees(e), t = Cesium.Math.toDegrees(t), t += 360, e += 360;
      var n = t - e;
      return Math.abs(n) > 180 && (n < 0 ? n = 360 + n : n = -(360 - n)), Cesium.Math.toRadians(n)
    };
    var c = [];
    return n.prepareVerticesBeforePlanarSurfaceCalc = function (e) {}, n.area3DPlanarPolygon = function (e, t) {
      var n = 0,
        r, i, s, o, u, a, f, l, c = e.length,
        h = t.normal;
      if (c < 3) return 0;
      var p = new Cesium.Cartesian3,
        d = new Cesium.Cartesian3;
      e[0].clone(p), e[1].clone(d), e.push(p), e.push(d), i = h.x > 0 ? h.x : -h.x, s = h.y > 0 ? h.y : -h.y, o = h.z > 0 ? h.z : -h.z, u = 3, i > s ? i > o && (u = 1) : s > o && (u = 2);
      for (a = 1, f = 2, l = 0; a < c; a++, f++, l++) switch (u) {
        case 1:
          n += e[a].y * (e[f].z - e[l].z);
          continue;
        case 2:
          n += e[a].z * (e[f].x - e[l].x);
          continue;
        case 3:
          n += e[a].x * (e[f].y - e[l].y);
          continue
      }
      switch (u) {
        case 1:
          n += e[c].y * (e[1].z - e[c - 1].z);
          break;
        case 2:
          n += e[c].z * (e[1].x - e[c - 1].x);
          break;
        case 3:
          n += e[c].x * (e[1].y - e[c - 1].y)
      }
      r = Math.sqrt(i * i + s * s + o * o);
      switch (u) {
        case 1:
          n *= r / (2 * h.x);
          break;
        case 2:
          n *= r / (2 * h.y);
          break;
        case 3:
          n *= r / (2 * h.z)
      }
      return Math.abs(n)
    }, n.calcArea2D = function (e) {
      if (e.length < 3) return 0;
      var t = Cesium.EllipsoidTangentPlane.fromPoints(e, Cesium.Ellipsoid.WGS84),
        n = t.projectPointsOntoPlane(e, c),
        r = Math.abs(Cesium.PolygonPipeline.computeArea2D(n));
      return r
    }, n.isSelfIntersect = function (e) {
      if (e.length < 3) return !1;
      var t = Cesium.EllipsoidTangentPlane.fromPoints(e, Cesium.Ellipsoid.WGS84),
        n = t.projectPointsOntoPlane(e, c),
        r = [];
      for (var i = 0; i < n.length; i++) r.push({
        position: n[i],
        index: i
      });
      for (var i = 0; i < r.length - 1; i++) {
        var s = l(r[i].position, r[i + 1].position, r);
        if (s) return !0
      }
      return !1
    }, n.getGeometrySubdevision = function (e) {
      if (e.length < 3) return 0;
      var t = Cesium.BoundingSphere.fromPoints(e),
        n = t.radius / 1e6,
        r = h(Cesium.Ellipsoid.WGS84, e, Cesium.Math.RADIANS_PER_DEGREE * n, !1);
      return r
    }, n.TriArea = function (e, t, n) {
      var r = new Cesium.Cartesian3;
      Cesium.Cartesian3.subtract(e, t, r);
      var i = new Cesium.Cartesian3;
      Cesium.Cartesian3.subtract(e, n, i);
      var s = new Cesium.Cartesian3;
      Cesium.Cartesian3.cross(r, i, s);
      var o = Cesium.Cartesian3.magnitude(s) / 2;
      return o
    }, n.getHeadingPitchRange = function (e, t) {
      if (e == undefined || t == undefined) return undefined;
      var r = e instanceof Cesium.Cartesian3 ? viewer.scene.globe.ellipsoid.cartesianToCartographic(e) : e,
        i = t instanceof Cesium.Cartesian3 ? viewer.scene.globe.ellipsoid.cartesianToCartographic(t) : t,
        s = new Cesium.EllipsoidGeodesic(r, i),
        o = 0;
      try {
        o = s.startHeading
      } catch (u) {
        o = 0
      }
      var a = n.geoDist3D(e, t),
        f = Cesium.Cartesian3.subtract(Cesium.Cartesian3.fromRadians(r.longitude, r.latitude, r.height), Cesium.Cartesian3.fromRadians(r.longitude, r.latitude, r.height - 100), new Cesium.Cartesian3),
        l = Cesium.Cartesian3.subtract(viewer.scene.globe.ellipsoid.cartographicToCartesian(i), viewer.scene.globe.ellipsoid.cartographicToCartesian(r), new Cesium.Cartesian3),
        c = Cesium.Cartesian3.dot(l, f),
        h = c / (Cesium.Cartesian3.magnitude(l) * Cesium.Cartesian3.magnitude(f)),
        p = Cesium.Math.toRadians(90) - Math.acos(h);
      return new Cesium.HeadingPitchRange(o, p, a)
    }, n
  }),
  function (e, t) {
    typeof exports == "object" && typeof module != "undefined" ? t(exports) : typeof define == "function" && define.amd ? define("mgrs", ["exports"], t) : t(e.mgrs = e.mgrs || {})
  }(this, function (e) {
    "use strict";

    function l(e, t) {
      return t = t || 5, y(v({
        lat: e[1],
        lon: e[0]
      }), t)
    }

    function c(e) {
      var t = m(S(e.toUpperCase()));
      return t.lat && t.lon ? [t.lon, t.lat, t.lon, t.lat] : [t.left, t.bottom, t.right, t.top]
    }

    function h(e) {
      var t = m(S(e.toUpperCase()));
      return t.lat && t.lon ? [t.lon, t.lat] : [(t.left + t.right) / 2, (t.top + t.bottom) / 2]
    }

    function p(e) {
      return e * (Math.PI / 180)
    }

    function d(e) {
      return 180 * (e / Math.PI)
    }

    function v(e) {
      var t = e.lat,
        n = e.lon,
        r = 6378137,
        i = .00669438,
        s = .9996,
        o, u, a, f, l, c, h, d = p(t),
        v = p(n),
        m, y;
      y = Math.floor((n + 180) / 6) + 1, n === 180 && (y = 60), t >= 56 && t < 64 && n >= 3 && n < 12 && (y = 32), t >= 72 && t < 84 && (n >= 0 && n < 9 ? y = 31 : n >= 9 && n < 21 ? y = 33 : n >= 21 && n < 33 ? y = 35 : n >= 33 && n < 42 && (y = 37)), o = (y - 1) * 6 - 180 + 3, m = p(o), u = i / (1 - i), a = r / Math.sqrt(1 - i * Math.sin(d) * Math.sin(d)), f = Math.tan(d) * Math.tan(d), l = u * Math.cos(d) * Math.cos(d), c = Math.cos(d) * (v - m), h = r * ((1 - i / 4 - 3 * i * i / 64 - 5 * i * i * i / 256) * d - (3 * i / 8 + 3 * i * i / 32 + 45 * i * i * i / 1024) * Math.sin(2 * d) + (15 * i * i / 256 + 45 * i * i * i / 1024) * Math.sin(4 * d) - 35 * i * i * i / 3072 * Math.sin(6 * d));
      var b = s * a * (c + (1 - f + l) * c * c * c / 6 + (5 - 18 * f + f * f + 72 * l - 58 * u) * c * c * c * c * c / 120) + 5e5,
        w = s * (h + a * Math.tan(d) * (c * c / 2 + (5 - f + 9 * l + 4 * l * l) * c * c * c * c / 24 + (61 - 58 * f + f * f + 600 * l - 330 * u) * c * c * c * c * c * c / 720));
      return t < 0 && (w += 1e7), {
        northing: Math.trunc(w),
        easting: Math.trunc(b),
        zoneNumber: y,
        zoneLetter: g(t)
      }
    }

    function m(e) {
      var t = e.northing,
        n = e.easting,
        r = e.zoneLetter,
        i = e.zoneNumber;
      if (i < 0 || i > 60) return null;
      var s = .9996,
        o = 6378137,
        u = .00669438,
        a, f = (1 - Math.sqrt(1 - u)) / (1 + Math.sqrt(1 - u)),
        l, c, h, p, v, g, y, b, w, E = n - 5e5,
        S = t;
      r < "N" && (S -= 1e7), y = (i - 1) * 6 - 180 + 3, a = u / (1 - u), g = S / s, b = g / (o * (1 - u / 4 - 3 * u * u / 64 - 5 * u * u * u / 256)), w = b + (3 * f / 2 - 27 * f * f * f / 32) * Math.sin(2 * b) + (21 * f * f / 16 - 55 * f * f * f * f / 32) * Math.sin(4 * b) + 151 * f * f * f / 96 * Math.sin(6 * b), l = o / Math.sqrt(1 - u * Math.sin(w) * Math.sin(w)), c = Math.tan(w) * Math.tan(w), h = a * Math.cos(w) * Math.cos(w), p = o * (1 - u) / Math.pow(1 - u * Math.sin(w) * Math.sin(w), 1.5), v = E / (l * s);
      var x = w - l * Math.tan(w) / p * (v * v / 2 - (5 + 3 * c + 10 * h - 4 * h * h - 9 * a) * v * v * v * v / 24 + (61 + 90 * c + 298 * h + 45 * c * c - 252 * a - 3 * h * h) * v * v * v * v * v * v / 720);
      x = d(x);
      var T = (v - (1 + 2 * c + h) * v * v * v / 6 + (5 - 2 * h + 28 * c - 3 * h * h + 8 * a + 24 * c * c) * v * v * v * v * v / 120) / Math.cos(w);
      T = y + d(T);
      var N;
      if (e.accuracy) {
        var C = m({
          northing: e.northing + e.accuracy,
          easting: e.easting + e.accuracy,
          zoneLetter: e.zoneLetter,
          zoneNumber: e.zoneNumber
        });
        N = {
          top: C.lat,
          right: C.lon,
          bottom: x,
          left: T
        }
      } else N = {
        lat: x,
        lon: T
      };
      return N
    }

    function g(e) {
      var t = "Z";
      return 84 >= e && e >= 72 ? t = "X" : 72 > e && e >= 64 ? t = "W" : 64 > e && e >= 56 ? t = "V" : 56 > e && e >= 48 ? t = "U" : 48 > e && e >= 40 ? t = "T" : 40 > e && e >= 32 ? t = "S" : 32 > e && e >= 24 ? t = "R" : 24 > e && e >= 16 ? t = "Q" : 16 > e && e >= 8 ? t = "P" : 8 > e && e >= 0 ? t = "N" : 0 > e && e >= -8 ? t = "M" : -8 > e && e >= -16 ? t = "L" : -16 > e && e >= -24 ? t = "K" : -24 > e && e >= -32 ? t = "J" : -32 > e && e >= -40 ? t = "H" : -40 > e && e >= -48 ? t = "G" : -48 > e && e >= -56 ? t = "F" : -56 > e && e >= -64 ? t = "E" : -64 > e && e >= -72 ? t = "D" : -72 > e && e >= -80 && (t = "C"), t
    }

    function y(e, t) {
      var n = "00000" + e.easting,
        r = "00000" + e.northing;
      return e.zoneNumber + e.zoneLetter + b(e.easting, e.northing, e.zoneNumber) + n.substr(n.length - 5, t) + r.substr(r.length - 5, t)
    }

    function b(e, t, n) {
      var r = w(n),
        i = Math.floor(e / 1e5),
        s = Math.floor(t / 1e5) % 20;
      return E(i, s, r)
    }

    function w(e) {
      var n = e % t;
      return n === 0 && (n = t), n
    }

    function E(e, t, f) {
      var l = f - 1,
        c = n.charCodeAt(l),
        h = r.charCodeAt(l),
        p = c + e - 1,
        d = h + t,
        v = !1;
      p > a && (p = p - a + i - 1, v = !0), (p === s || c < s && p > s || (p > s || c < s) && v) && p++;
      if (p === o || c < o && p > o || (p > o || c < o) && v) p++, p === s && p++;
      p > a && (p = p - a + i - 1), d > u ? (d = d - u + i - 1, v = !0) : v = !1, (d === s || h < s && d > s || (d > s || h < s) && v) && d++;
      if (d === o || h < o && d > o || (d > o || h < o) && v) d++, d === s && d++;
      d > u && (d = d - u + i - 1);
      var m = String.fromCharCode(p) + String.fromCharCode(d);
      return m
    }

    function S(e) {
      if (e && e.length === 0) throw "MGRSPoint coverting from nothing";
      var t = e.length,
        n = null,
        r = "",
        i, s = 0;
      while (!/[A-Z]/.test(i = e.charAt(s))) {
        if (s >= 2) throw "MGRSPoint bad conversion from: " + e;
        r += i, s++
      }
      var o = parseInt(r, 10);
      if (s === 0 || s + 3 > t) throw "MGRSPoint bad conversion from: " + e;
      var u = e.charAt(s++);
      if (u <= "A" || u === "B" || u === "Y" || u >= "Z" || u === "I" || u === "O") throw "MGRSPoint zone letter " + u + " not handled: " + e;
      n = e.substring(s, s += 2);
      var a = w(o),
        f = x(n.charAt(0), a),
        l = T(n.charAt(1), a);
      while (l < N(u)) l += 2e6;
      var c = t - s;
      if (c % 2 !== 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + e;
      var h = c / 2,
        p = 0,
        d = 0,
        v, m, g, y, b;
      return h > 0 && (v = 1e5 / Math.pow(10, h), m = e.substring(s, s + h), p = parseFloat(m) * v, g = e.substring(s + h), d = parseFloat(g) * v), y = p + f, b = d + l, {
        easting: y,
        northing: b,
        zoneLetter: u,
        zoneNumber: o,
        accuracy: v
      }
    }

    function x(e, t) {
      var r = n.charCodeAt(t - 1),
        u = 1e5,
        f = !1;
      while (r !== e.charCodeAt(0)) {
        r++, r === s && r++, r === o && r++;
        if (r > a) {
          if (f) throw "Bad character: " + e;
          r = i, f = !0
        }
        u += 1e5
      }
      return u
    }

    function T(e, t) {
      if (e > "V") throw "MGRSPoint given invalid Northing " + e;
      var n = r.charCodeAt(t - 1),
        a = 0,
        f = !1;
      while (n !== e.charCodeAt(0)) {
        n++, n === s && n++, n === o && n++;
        if (n > u) {
          if (f) throw "Bad character: " + e;
          n = i, f = !0
        }
        a += 1e5
      }
      return a
    }

    function N(e) {
      var t;
      switch (e) {
        case "C":
          t = 11e5;
          break;
        case "D":
          t = 2e6;
          break;
        case "E":
          t = 28e5;
          break;
        case "F":
          t = 37e5;
          break;
        case "G":
          t = 46e5;
          break;
        case "H":
          t = 55e5;
          break;
        case "J":
          t = 64e5;
          break;
        case "K":
          t = 73e5;
          break;
        case "L":
          t = 82e5;
          break;
        case "M":
          t = 91e5;
          break;
        case "N":
          t = 0;
          break;
        case "P":
          t = 8e5;
          break;
        case "Q":
          t = 17e5;
          break;
        case "R":
          t = 26e5;
          break;
        case "S":
          t = 35e5;
          break;
        case "T":
          t = 44e5;
          break;
        case "U":
          t = 53e5;
          break;
        case "V":
          t = 62e5;
          break;
        case "W":
          t = 7e6;
          break;
        case "X":
          t = 79e5;
          break;
        default:
          t = -1
      }
      if (t >= 0) return t;
      throw "Invalid zone letter: " + e
    }
    var t = 6,
      n = "AJSAJS",
      r = "AFAFAF",
      i = 65,
      s = 73,
      o = 79,
      u = 86,
      a = 90,
      f = {
        forward: l,
        inverse: c,
        toPoint: h
      };
    e["default"] = f, e.forward = l, e.inverse = c, e.toPoint = h, Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }), define("internal/Settings", ["jquery", "TELang"], function (e, t) {
    "use strict";
    var n = "_TEW_Settings_",
      r = function () {
        e.extend(this, JSON.parse(localStorage.getItem(n)))
      };
    Cesium.defineProperties(r.prototype, {}), r.prototype.init = function () {}, r.prototype.saveSettings = function () {
      localStorage.setItem(n, JSON.stringify(this))
    };
    var i = new r;
    return i
  }), define("internal/Units", ["jquery", "TELang", "./GeometryHelper", "mgrs", "./Settings"], function (e, t, n, r, i) {
    "use strict";

    function u() {
      var e = new Cesium.Cartographic(0, 0, 0),
        t = Cesium.sampleTerrain(viewer.terrainProvider, s, [e]);
      Cesium.when(t, function (e) {
        e[0].height != undefined && s <= 23 ? (s++, u()) : o = !0
      })
    }
    var s = 0,
      o = !1,
      a = function () {
        this.AltitudeUnit = Cesium.defaultValue(i.altitudeUnit, a.prototype.METERS)
      };
    return Cesium.defineProperties(a.prototype, {
      AltitudeUnit: {
        get: function () {
          return this._altitudeUnit
        },
        set: function (e) {
          e = Number(e);
          if (e != a.prototype.METERS && e != a.prototype.FEET) return;
          this._altitudeUnit = e
        }
      },
      EARTH_RADIUS: {
        get: function () {
          return n.EARTH_RADIUS
        }
      },
      TerrainMaxLevel: {
        get: function () {
          return s
        }
      }
    }), a.prototype.METERS = 0, a.prototype.FEET = 1, a.prototype.meterToFeet = function (e) {
      return e * 3.280839895013
    }, a.prototype.feetToMeter = function (e) {
      return e * .3048
    }, a.prototype.init = function () {
      u()
    }, a.prototype.formatDistance = function (e, n, r) {
      return n == undefined && (n = !0), this.AltitudeUnit == a.prototype.METERS ? Math.abs(e) < 1e4 ? this.format(e, r ? t.i18n("meters_short") : t.i18n("meters")) : this.format(e / 1e3, t.i18n("km")) : (n && (e = this.meterToFeet(e)), Math.abs(e) < 5280 ? this.format(e, r ? t.i18n("feet_short") : t.i18n("feet")) : this.format(e / 5280, t.i18n("mile")))
    }, a.prototype.format = function (e, t) {
      return e.toFixed(2) + " " + t
    }, a.prototype.latLong2Meter = function (e) {
      return n.latLong2Meter(e)
    }, a.prototype.formatArea = function (e) {
      if (this.AltitudeUnit == a.prototype.METERS) {
        var n = t.i18n("meters");
        e > 1e5 && (e /= 1e6, n = t.i18n("km"))
      } else {
        var n = t.i18n("feet");
        e *= 10.764, e > 1e6 && (e /= 27878400, n = t.i18n("mile"))
      }
      return this.format(e, t.i18n("measure_square") + " " + n)
    }, a.prototype.blockWidthToTeLayerLevel = function (e) {
      if (e <= 0 || isNaN(Number(e))) e = 9783e3;
      var t = 2 * Math.PI * this.EARTH_RADIUS / e,
        n = Math.log(t) / Math.log(2),
        n = n < 1e-6 ? 0 : parseInt(n),
        r = Math.max(0, n);
      return r
    }, a.prototype.MGRS2LL = function (e) {
      if (e == undefined) {
        console.log("MGRS string is missing!");
        return
      }
      var t = r.toPoint(e);
      return {
        longitude: t[0],
        latitude: t[1]
      }
    }, a.prototype.LL2MGRS = function (e, t) {
      if (e == undefined || t == undefined) {
        console.log("LL coordinates are missing!");
        return
      }
      var n = [e, t];
      return r.forward(n)
    }, a.prototype.TeLayerLevelToCesiumLayerLevel = function (e) {
      return Math.max(0, e - 2)
    }, a.prototype.blockWidthToCesiumLayerLevel = function (e) {
      return this.TeLayerLevelToCesiumLayerLevel(this.blockWidthToTeLayerLevel(e))
    }, new a
  }), define("internal/TEPosition", ["jquery", "./Units"], function (e, t) {
    "use strict";
    var n = function (e) {
      this.cartesian = null, this.headingPitchRange = null, this.altitudeType = 3;
      if (e == undefined) this.cartesian = new Cesium.Cartesian3, this.headingPitchRange = new Cesium.HeadingPitchRange;
      else
        for (var t in e) this[t] = e[t]
    };
    return n.ATC_TERRAIN_RELATIVE = 0, n.ATC_ON_TERRAIN = 2, n.ATC_TERRAIN_ABSOLUTE = 3, Cesium.defineProperties(n.prototype, {
      Cartesian: {
        get: function () {
          return this.cartesian
        },
        set: function (e) {
          this.cartesian = e
        }
      },
      HeadingPitchRange: {
        get: function () {
          return this.headingPitchRange
        },
        set: function (e) {
          this.headingPitchRange = e
        }
      },
      AltitudeType: {
        get: function () {
          return this.altitudeType
        },
        set: function (e) {
          if (e != n.ATC_TERRAIN_RELATIVE && e != n.ATC_ON_TERRAIN && e != n.ATC_TERRAIN_ABSOLUTE) return;
          this.altitudeType = Number(e)
        }
      }
    }), n.prototype.clone = function () {
      var e = new n;
      return e.cartesian = new Cesium.Cartesian3(this.cartesian.x, this.cartesian.y, this.cartesian.z), e.headingPitchRange = Cesium.HeadingPitchRange.clone(this.headingPitchRange), e.altitudeType = this.altitudeType, e
    }, n
  }), define("tools/TETools/FavoritesStorage", ["jquery", "TELang", "internal/NotificationCenter", "internal/TEPosition"], function (e, t, n, r) {
    "use strict";

    function i() {
      return "_TEW_Favorites_"
    }
    var s = null,
      o = function (e) {
        this.id = Cesium.createGuid(), this.name = "", this.icon = "./img/star_red.png", this.desc = "", this.showOn3D = !0, this.tePosition = new r
      },
      u = function () {
        this._favorites = null
      };
    return Cesium.defineProperties(u.prototype, {
      DefaultStorage: {
        get: function () {
          return s
        }
      },
      Favorites: {
        get: function () {
          return this._favorites == null && this.loadFavoritesLayer(), this._favorites
        }
      }
    }), u.prototype.createFavoriteItem = function () {
      return new o
    }, u.prototype.getAll = function () {
      var e = [];
      for (var t = 0; t < this.Favorites.length; t++) {
        var n = this.Favorites.get(t);
        e.push(n.favoriteItem)
      }
      return e
    }, u.prototype.iconList = function () {
      return ["./img/star_red.png", "./img/star_green.png", "./img/star_purple.png", "./img/star_blue.png", "./img/star_yellow.png"]
    }, u.prototype.descriptionForIcon = function (e) {
      if (e == "") return;
      var n = e.split("/").pop();
      return n = n.substr(0, n.lastIndexOf(".")) || n, t.i18n("favorite_icon_" + n)
    }, u.prototype.loadFavoritesLayer = function () {
      this._favorites == null && (this._favorites = new Cesium.BillboardCollection, viewer.scene.primitives.add(this._favorites));
      var e = JSON.parse(localStorage.getItem(i()));
      if (e == null) return;
      for (var t = 0; t < e.length; t++) e[t].tePosition = new r(e[t].tePosition), this.updateOrCreateFeatureFromFavoriteItem(e[t])
    }, u.prototype.saveItem = function (e) {
      this.updateOrCreateFeatureFromFavoriteItem(e), this.save(), n.postNotification("TEN_FAVORITE_CHANGED", this, e)
    }, u.prototype.save = function () {
      localStorage.setItem(i(), JSON.stringify(this.getAll()))
    }, u.prototype.deleteItem = function (e) {
      var t = this.getFeatureById(e);
      t != null && (this.Favorites.remove(t), this.save())
    }, u.prototype.getItem = function (e) {
      var t = this.getFeatureById(e);
      return t == null ? null : t.favoriteItem
    }, u.prototype.getFeatureById = function (e) {
      for (var t = 0; t < this.Favorites.length; t++) {
        var n = this.Favorites.get(t);
        if (n.id == e) return n
      }
      return null
    }, u.prototype.updateOrCreateFeatureFromFavoriteItem = function (e) {
      if (e == null) return;
      var t = this.getFeatureById(e.id);
      t == null && (t = this.Favorites.add({
        position: e.tePosition.Cartesian,
        image: e.icon,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: .5,
        id: e.id
      })), t.show = e.showOn3D, t.image = e.icon, t.favoriteItem = e
    }, s = new u, s
  }), define("tools/ToolContainer", ["jquery", "TELang", "internal/NotificationCenter"], function (e, t, n) {
    "use strict";

    function i() {
      return 1
    }

    function s() {
      return 48
    }

    function o() {
      return (s() + 2 * i()) * 2 + 8 * i()
    }

    function u() {
      return o() - s() - 2 * 2 * i()
    }

    function a() {
      return 22.5 * i()
    }

    function f() {
      return 6.5 * s()
    }

    function l() {
      return 45683704
    }

    function c() {
      return 78830222
    }

    function h() {
      return 3
    }
    var r = null,
      p = function () {
        this.ToolContainerCloseReasonAnotherToolOpening = 1, this.ToolContainerCloseReasonCloseButton = 2, this.ToolContainerCloseReasonApi = 3, this._toolDelegate = null, this._onContainerCloseStarting = null, this._mainButton = null, this._upperViewHidden = !1, this._animating = !1, this._afterHideCallback = null, this._lowerViewStartX = 0, this._enabled = !0, this._toolManager = null
      };
    return Cesium.defineProperties(p.prototype, {
      MainButton: {
        get: function () {
          return this._mainButton
        },
        set: function (t) {
          this._mainButton = t;
          var n = e("<div id='ContainerRootDiv' style='position:absolute; display:none; width:400px; height:200px; left:275px;bottom:0px; z-index:50;'></div>");
          e("body").append(n);
          var r = e("<div class='container' id='ContainerDiv' style='position:absolute;width:100%; height:100%;'></div>");
          n.append(r);
          var i = e('<div id="headerDivContainer" class="headerDivContainer" style="position:relative;top:0;height:30px;width:100%;background-color:#2b2b2b;"></div>');
          n.append(i);
          var s = e("<div id='UpperView' style='position:relative;top:15px; border-bottom:2px solid black; background-color: #141414;  opacity:1.0;'></div>");
          s.css({
            height: 50
          });
          var o = e("<div id='LowerView' style='position:relative;top:13px;background-color:#141414;opacity:1.0;width:100%;height:112px;word-wrap: break-word;'></div>"),
            u = e("<div style='width:95%; background-color: rgba(0, 0, 0, .0); color:white; border:0px; padding:0px;'><p id='TextView' style='margin:5px; font-size:10pt; font-family: helvetica;'>100</p></div> ");
          r.append(s), r.append(o), o.append(u);
          var f = this.containerHideBounds();
          n.css({
            left: 300,
            bottom: 30,
            width: f.width,
            height: f.height
          }), r.css({
            left: 0,
            bottom: 0
          }).css("width", "calc(100% - " + (a() / 2 + h()) + "px)").css("height", "calc(100% - " + (a() / 2 + h()) + "px)")
        }
      },
      UpperViewHidden: {
        get: function () {
          return this._upperViewHidden
        },
        set: function (t) {
          this._upperViewHidden = t;
          if (this._animating || e("#UpperView").is(":visible") == this.UpperViewHidden) return;
          this.UpperViewHidden ? e("#UpperView").hide() : e("#UpperView").show(), this.UpperViewHidden ? frame.size.height -= u() : frame.size.height += u()
        }
      },
      IsVisible: {
        get: function () {
          return e("#ContainerRootDiv").is(":visible")
        }
      },
      ToolManager: {
        get: function () {
          return this._toolManager
        },
        set: function (e) {
          this._toolManager = e
        }
      },
      BUTTON_SIZE: {
        get: function () {
          return 44
        }
      },
      BUTTON_IMG_SIZE: {
        get: function () {
          return 30
        }
      },
      BUTTON_IMG_PADDING: {
        get: function () {
          return (this.BUTTON_SIZE - this.BUTTON_IMG_SIZE) / 2
        }
      },
      SLIDER_PADDING: {
        get: function () {
          return 10
        }
      },
      SLIDER_WIDTH: {
        get: function () {
          return this.BUTTON_IMG_SIZE * 5
        }
      },
      SLIDER_HEIGHT: {
        get: function () {
          return this.BUTTON_IMG_SIZE * 1.5
        }
      }
    }), p.prototype.getInstance = function () {
      return r
    }, p.prototype.canClose = function (e) {
      return this._toolDelegate == null ? !0 : this._toolDelegate.onBeforeCloseToolContainer != undefined && this._toolDelegate.onBeforeCloseToolContainer(e) == 0 ? !1 : !0
    }, p.prototype.showWithDelegate = function (t, n) {
      if (!this.canClose(this.ToolContainerCloseReasonAnotherToolOpening)) return !1;
      this.resetUI(), this._afterHideCallback != null ? this._afterHideCallback(!0) : this._toolDelegate != null && (this._toolDelegate.ToolContainer = null), this._afterHideCallback = null, this._toolDelegate = t, this._onContainerCloseStarting = n, this._toolDelegate.ToolContainer = this;
      var r = !0;
      return this._toolDelegate.onBeforeOpenToolContainer != undefined && (r = this._toolDelegate.onBeforeOpenToolContainer()), r ? this.show() : e("#ContainerRootDiv").is(":visible") && this.hideAndClearDelegate(), !0
    }, p.prototype.show = function () {
      function r(e) {
        var t = /^function\s+([\w\$]+)\s*\(/.exec(e.toString());
        return t ? t[1] : ""
      }
      var t = e("#sideBar").width();
      e("#ContainerRootDiv").css({
        opacity: 1
      }), e("#ContainerRootDiv").show(), e("#ContainerRootDiv").css({
        left: t + 30,
        bottom: "15"
      }), e("#ContainerRootDiv").width(f()), e("#ContainerRootDiv").height("200"), e(".headerDivContainer").css("background-color", "#2b2b2b"), e(".headerDivContainer").width(e("#UpperView").width()), e(".headerDivContainer").css("bottom", e("#ContainerDiv").height() + 30);
      var i = "";
      if (r(this._toolDelegate.constructor).indexOf("Tool") != -1) {
        var s = r(this._toolDelegate.constructor).indexOf("Tool");
        i = r(this._toolDelegate.constructor).substring(0, s)
      } else i = this._toolDelegate;
      e(".headerDivContainer").empty(), e(".headerDivContainer").append(e('<span class="analyzeToolHeaderContainer"></span>')), e(e(".analyzeToolHeaderContainer")[0]).text(i);
      var o = 200;
      this._toolDelegate.onOpenedToolContainer != undefined && this._toolDelegate.onOpenedToolContainer(), n.postNotification("TEN_TOOL_CONTAINER_VISIBILITY_CHANGED", this, !0);
      var u = e("<img id='CloseImg' width=12 height=12 src='img/close.png' style='cursor:pointer; float:right; margin-right:5px; margin-top:5px; opacity:1'/>");
      u.click(e.proxy(this.hideAndClearDelegateFromCloseButton, this)), e("#headerDivContainer").append(u)
    }, p.prototype.hide = function (t) {
      this.onContainerCloseStarting != undefined && (this.onContainerCloseStarting(), this.onContainerCloseStarting = undefined);
      var r = e("#" + this._mainButton.DivId);
      r.css({
        visibility: "visible"
      }), e("#" + l()).css({
        opacity: 0
      });
      var i = this.containerHideBounds(),
        s = 0;
      this._animating = !0, this._afterHideCallback = this.afterHideCallback, this._afterHideCallback != null && this._afterHideCallback(t), n.postNotification("TEN_TOOL_CONTAINER_VISIBILITY_CHANGED", this, !1)
    }, p.prototype.containerShowBounds = function () {
      var t = this._upperViewHidden ? o() - u() : o(),
        n = e("#" + this._mainButton.DivId),
        r = n.offset(),
        i = r.top,
        s = e(window).height() - i - n.outerHeight();
      return new Cesium.BoundingRectangle(r.left, s, f() + a() / 2, t + a() / 2 - h())
    }, p.prototype.containerHideBounds = function () {
      var t = this._upperViewHidden ? o() - u() : o(),
        n = e("#" + this._mainButton.DivId),
        r = n.offset(),
        i = r.top,
        s = i - n.outerHeight();
      return new Cesium.BoundingRectangle(280, 60, 350, 250)
    }, p.prototype.hideAndClearDelegateFromCloseButton = function () {
      if (!this._enabled) return;
      this.canClose(this.ToolContainerCloseReasonCloseButton) == 1 && this.hide(!0)
    }, p.prototype.hideAndClearDelegate = function () {
      return this._enabled ? this.canClose(this.ToolContainerCloseReasonApi) == 0 ? !1 : (this.hide(!0), !0) : !1
    }, p.prototype.afterHideCallback = function (t) {
      this._animating = !1, this._afterHideCallback = null, e("#ContainerRootDiv").hide();
      var n = this._toolDelegate;
      t && this._toolDelegate != null && (this._toolDelegate.ToolContainer = null, this._toolDelegate = null), n != null && n.onClosedToolContainer != undefined && n.onClosedToolContainer()
    }, p.prototype.addSlider = function (t, n, r, i) {
      var s = null;
      return t = Cesium.defaultValue(t, 0), n = Cesium.defaultValue(n, 100), r = Cesium.defaultValue(r, 1), i = Cesium.defaultValue(i, Math.floor(Math.abs(n - t) / 2)), this._lowerViewStartX += this.SLIDER_PADDING + 5, s = e("<input class='slider' id='sliderId' type='range' min=" + t + " max=" + n + " step=" + r + " value=" + i + " data-orientation='vertical'>"), s.css({
        "margin-left": this._lowerViewStartX,
        width: this.SLIDER_WIDTH,
        height: this.SLIDER_HEIGHT,
        "background-color": "#141414"
      }), this._lowerViewStartX += s.outerWidth() + 10, e("#UpperView").append(s), s
    }, p.prototype.getLowerViewStartX = function () {
      return this._lowerViewStartX
    }, p.prototype.addButton = function (t, n, r, i) {
      if (t == 0) throw {
        type: "TE_EXCEPTION",
        format: "Tag for button in TEAToolContainer must be positive integer"
      };
      var s = null;
      return r == undefined ? (s = e("<img class='containerButton' id='" + t.toString() + "'src='" + n + "' style='margin-top:0px; vertical-align:middle;'></img>"), s.on("mouseover", function () {
        e(this).css("background-color", "rgb(13, 194, 223)")
      }), s.on("mouseout", function () {
        e(this).css("background-color", "#141414")
      }), s.css({
        left: this._lowerViewStartX,
        width: this.BUTTON_IMG_SIZE,
        height: this.BUTTON_IMG_SIZE,
        padding: this.BUTTON_IMG_PADDING
      })) : (s = e("<div class='containerButton' id='" + t.toString() + "'style='position:absolute; padding-right: 10px;'><table style='border-collapse: collapse!important; width:100%'><tr style='padding:0;'><td id='btnTD' style='padding:0;'><img src='" + n + "' style='margin-top:0px; vertical-align:middle; width:" + this.BUTTON_IMG_SIZE + "px; height:" + this.BUTTON_IMG_SIZE + "px; padding:" + this.BUTTON_IMG_PADDING + "px;'></img><span style='color:white; font-family: helvetica;'>" + r + "</span></td></tr></table></div>"), s.css({
        left: this._lowerViewStartX
      })), i != undefined && s.attr("title", i), e("#UpperView").append(s), this._lowerViewStartX += s.outerWidth(), s.click(t, e.proxy(this.handleButtonClick, this)), s
    }, p.prototype.updateButton = function (t, n, r) {
      var i = e("#UpperView #" + t);
      if (i.length == 0) return;
      i.attr("src", n), r != undefined && i.find("span").text(r)
    }, p.prototype.enableButton = function (t, n) {
      var r = e("#UpperView #" + t);
      if (r.length == 0) return;
      r.css({
        opacity: n ? "1.0" : "0.3"
      })
    }, p.prototype.addView = function (t) {
      t.css({
        right: this._lowerViewStartX
      }), e("#UpperView").append(t), this._lowerViewStartX += t.width()
    }, p.prototype.removeButtons = function () {
      e(".containerButton").remove(), e(".containerView").remove(), e(".slider").remove(), this._lowerViewStartX = 0
    }, p.prototype.resetUI = function () {
      this._upperViewHidden = !1, e("#TextView").text(""), this.removeButtons()
    }, p.prototype.setExplanationText = function (t) {
      e("#TextView").empty(), e("#TextView").addClass("explanation"), e("#TextView").append(t)
    }, p.prototype.handleButtonClick = function (t) {
      if (!this._enabled) return;
      var n = t.data;
      if (this._mainButton != null && n == l()) {
        var r = e("#" + this._mainButton.DivId);
        r.click()
      } else if (this._toolDelegate.onButtonClick != undefined) {
        var i = e("#UpperView #" + n);
        if (i.length == 0) return;
        if (i.css("opacity") == "0.3") return;
        this._toolDelegate.onButtonClick(n)
      }
    }, p.prototype.setEnable = function (t, n) {
      var r = e("#ContainerRootDiv");
      if (r.is(":hidden") || this._animating) return;
      var i = e("#" + this._mainButton.DivId);
      this._enabled = t, t ? (r.prop("disabled", !1), r.css({
        opacity: "1"
      }), i.css({
        visibility: "hidden"
      })) : (r.prop("disabled", !0), r.css({
        opacity: "0.3"
      }), n == undefined && (n = !0), n && i.css({
        visibility: "visible",
        "border-color": "rgba(255,255,255,1.0)",
        "background-color": "rgba(0,0,0,0.85)"
      }))
    }, p.prototype.getEnable = function () {
      return this._enabled
    }, p.prototype.getText = function () {
      return e("#TextView").text()
    }, p.prototype.setText = function (t) {
      e("#TextView").removeClass("explanation"), e("#TextView").empty(), e("#TextView").append(t)
    }, r = new p, r
  }), define("internal/Globals", [], function () {
    "use strict";
    (function () {
      Function.prototype.inheritsFrom = function (e) {
        return e.constructor == Function ? (this.prototype = new e, this.prototype.constructor = this, this.prototype.parent = e.prototype) : (this.prototype = e, this.prototype.constructor = this, this.prototype.parent = e), this
      }
    })()
  }), define("tools/ToolProtocol", ["jquery"], function (e) {
    var t = function () {};
    return t.prototype.getId = function () {
      throw {
        type: "TE_EXCEPTION",
        format: "getId() is an abstract method !"
      }
    }, t
  }), define("tools/ToolDelegate", ["jquery", "TELang", "internal/Globals", "./ToolProtocol"], function (e, t, n, r) {
    "use strict";
    var i = function () {
      this._toolContainer = null
    };
    return i.inheritsFrom(r), Cesium.defineProperties(i.prototype, {
      ToolContainer: {
        get: function () {
          return this._toolContainer
        },
        set: function (e) {
          this._toolContainer = e
        }
      }
    }), i.prototype.onBeforeCloseToolContainer = function (t) {
      e("#checkImageSubHeader").length > 0 && e("#checkImageSubHeader").remove()
    }, i.prototype.onBeforeOpenToolContainer = function () {}, i.prototype.onClosedToolContainer = function () {}, i.prototype.onBeforeOpenToolContainer = function () {
      return !0
    }, i.prototype.onOpenedToolContainer = function () {
      return !0
    }, i.prototype.onButtonClick = function (e) {}, i.prototype.onTextClick = function () {
      return !0
    }, i.prototype.onSliderChanged = function (e) {
      return !0
    }, i
  }), define("tools/MenuEntry", ["jquery", "TELang"], function (e, t) {
    "use strict";
    var n = function () {
      this._text = "", this._icon = "", this._toolId = "", this._param = null, this._parent = "", this._order = 0, this._group = "", this._childEntries = new Array, this.addChildEntryOrdered = function (e) {
        var t = 0;
        while (t < this._childEntries.length && this._childEntries[t].Order < e.Order) t++;
        this._childEntries.splice(t, 0, e)
      }
    };
    return Cesium.defineProperties(n.prototype, {
      Text: {
        get: function () {
          return this._text
        },
        set: function (e) {
          this._text = e
        }
      },
      Icon: {
        get: function () {
          return this._icon
        },
        set: function (e) {
          this._icon = e
        }
      },
      ToolId: {
        get: function () {
          return this._toolId
        },
        set: function (e) {
          this._toolId = e
        }
      },
      Param: {
        get: function () {
          return this._param
        },
        set: function (e) {
          this._param = e
        }
      },
      Parent: {
        get: function () {
          return this._parent
        },
        set: function (e) {
          this._parent = e
        }
      },
      Order: {
        get: function () {
          return this._order
        },
        set: function (e) {
          this._order = e
        }
      },
      Group: {
        get: function () {
          return this._group
        },
        set: function (e) {
          this._group = e
        }
      },
      ChildEntries: {
        get: function () {
          return this._childEntries
        }
      }
    }), n.createFor = function (e, t, r, i, s, o) {
      var u = new n;
      return u.ToolId = e.getId(), u.Text = t, u.Icon = r, u.Order = i, u.Parent = s, u.Group = o, u.Parent == undefined && (u.Parent = ""), u
    }, n.MenuEntryAnalyze = function () {
      return t.i18n("Menu_Analyze") + "|./img/newDesign/bt_analyze.png|40"
    }, n.MenuEntryNavigation = function () {
      return t.i18n("Menu_Navigation") + "|./img/newDesign/bt_navigate.png|42"
    }, n
  }), define("internal/InputMode", ["jquery"], function (e) {
    "use strict";
    var t = function () {
      this._inputMode = 0
    };
    return t.prototype.FREE_FLIGHT = 0, t.prototype.CLIENT = 1, t.prototype.CONTROLLED_FLIGHT = 2, t.prototype.EDIT = 3, t.prototype.MEASUREMENT = 4, Cesium.defineProperties(t.prototype, {
      Mode: {
        get: function () {
          return this._inputMode
        },
        set: function (e) {
          if (e < t.FREE_FLIGHT || e > t.MEASUREMENT) return;
          this._inputMode = e
        }
      }
    }), t.prototype.test = function () {}, new t
  }), define("tools/TETools/ProgressTool", ["jquery", "TELang", "internal/Globals", "../ToolDelegate", "../ToolContainer"], function (e, t, n, r, i) {
    "use strict";

    function s() {
      return 100
    }
    var o = function () {
      this._cancelWork = !1
    };
    return o.inheritsFrom(r), Cesium.defineProperties(o.prototype, {
      CancelWork: {
        get: function () {
          return this._cancelWork
        },
        set: function (e) {
          this._cancelWork = e, e && this.onWorkCompletedHandler()
        }
      }
    }), o.prototype.onBeforeOpenToolContainer = function () {
      return !0
    }, o.prototype.onBeforeCloseToolContainer = function (t) {
      return e("#checkImageSubHeader").length > 0 && e("#checkImageSubHeader").remove(), this.CancelWork = !0, !0
    }, o.prototype.onButtonClick = function (e) {
      e == s() && (this.CancelWork = !0)
    }, o.prototype.showNormalButtons = function () {}, o.prototype.doWorkAsync = function () {
      this.showProgressButtons(), this.CancelWork = !1, this.doWork(e.proxy(this.onWorkCompletedHandler, this))
    }, o.prototype.onWorkCompletedHandler = function () {
      this.showNormalButtons(), this.workCompleted(), this.CancelWork = !1
    }, o.prototype.showProgressButtons = function () {
      this._toolContainer.removeButtons();
      var n = e("<div class='containerView' style='border-right: 1px solid rgba(255, 255, 255, .5);'><table style='border-collapse: collapse!important;'><tr style='padding:0;'><td style='padding:0; width:100px' ><img id='progressAnim' src='./img/progress.gif' style='margin-top:0px; vertical-align:middle'></img><span id='progressTxt' style='color:white; font-family: helvetica;'>0%</span></td></tr></table></div>");
      this._toolContainer.addView(n), this._toolContainer.addButton(s(), "./img/stop_calc.png", t.i18n("Cancel"))
    }, o.prototype.workCompleted = function () {}, o.prototype.setProgress = function (t, n) {
      var r = t / n * 100;
      e("#progressTxt").text(r.toFixed(0) + "%")
    }, o.prototype.CreateNew = function () {}, o
  }), define("tools/ToolDialog", ["jquery", "TELang"], function (e, t) {
    "use strict";
    var n = null,
      r = function () {
        this._title = "", this._icon = null, this._isOpen = !1, this._mainButton = null, this._lastPositionX = null, this._lastPositionY = null, this._eventListener = null, this._rightAnalyzePosition = 30, this._topAnalyzePosition = 100, this._containsFrame = !1, this._isResizing = !1
      };
    Cesium.defineProperties(r.prototype, {
      Title: {
        get: function () {
          return this._title
        },
        set: function (e) {
          this._title = e
        }
      },
      Icon: {
        get: function () {
          return this._icon
        },
        set: function (e) {
          this._icon = e
        }
      },
      IsOpen: {
        get: function () {
          return this._isOpen
        }
      },
      MainButton: {
        get: function () {
          return this._mainButton
        },
        set: function (e) {
          this._mainButton = e
        }
      },
      PositionX: {
        get: function () {
          return this._lastPositionX
        },
        set: function (e) {
          this._lastPositionX = e
        }
      },
      PositionY: {
        get: function () {
          return this._lastPositionY
        },
        set: function (e) {
          this._lastPositionY = e
        }
      },
      ContainsFrame: {
        get: function () {
          return this._containsFrame
        },
        set: function (e) {
          this._containsFrame = e
        }
      },
      IsResizing: {
        get: function () {
          return this._isResizing
        },
        set: function (e) {
          this._isResizing = e
        }
      }
    }), r.prototype.onClose = function () {}, r.prototype.openModeless = function (e, t, n, r) {
      this.open(e, t, n, r, !0)
    }, r.prototype.addLeftButton = function (n, r, i) {
      if (r == undefined) return;
      var s = e('<button class="link" id="leftButton" type="button" style="position:relative;height:22px;left:20px; top:7px; background-color:#2B2B2B; border:0px; color:#FFFFFF;">' + t.i18n(n) + "</button>");
      i != undefined && s.on("click", i);
      var o = e("#ToolDialog");
      r.append(s)
    }, r.prototype.closeLoadLayersDialogOnly = function () {
      setTimeout(function () {
        e("#menuIconLayersTool").length > 0 && e("#menuIconLayersTool").click()
      }, 2e3);
      if (e(".toolDialog")[0].textContent == t.i18n("Menu_Load_Layers") && e(".toolDialog").find("#closeXID") != undefined) e(".toolDialog").find("#closeXID").click();
      else {
        if (e(".toolDialog")[0].textContent != t.i18n("Menu_Load_Layers")) return;
        e(".toolDialog").find("#CloseButton").click()
      }
    }, r.prototype.openAsSideToolDialog = function (t, n, r, i) {
      this._title = t, this._icon = n;
      var s = 40,
        o = e("<div id='toolDialogTitleID' class='toolDialogTitle' style='height:" + s + "px;'><img id='iconImageID' src='" + this._icon + "'style='height:16px; padding-left:5px; padding-right:5px;'></img><span id='titleTextID' style='color:white;'>" + this._title + "</span></div>"),
        u = e(r),
        a = e("<div class='ToolDialogSidebar' id='ToolDialog' style='z-index: 1000;'></div> ");
      a.append(u);
      var f = TerraExplorer.tools.ToolDialog.width;
      a.width(f), i && a.css("margin-top", "250px"), e("#sidebarContentDiv").append(a)
    }, r.prototype.open = function (n, r, s, o, u, a) {
      this._containsFrame = !1, e(".toolDialog").length > 0 && e(".toolDialog").remove(), u == undefined && (u = !1), this._title = n, this._icon = r;
      var f = 40,
        l = 40;
      this._lastResizingState = !1, this._eventListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas), this._eventListener.setInputAction(e.proxy(this.SetPosition, this), Cesium.ScreenSpaceEventType.LEFT_UP);
      var c = e("<div id='toolDialogTitleID' class='toolDialogTitle' style='height:" + f + "px;'><img id='iconImageID' src='" + this._icon + "'style='height:16px; padding-left:5px; padding-right:5px;'></img><span id='titleTextID' style='color:white;'>" + this._title + "</span></div>"),
        h = e(s),
        p = e("<img id='closeXID' class='link' src='./img/dialogs/header_icons/header_close_x.png' width='11px' height='11px' style='position:absolute; padding:5px; right:0px;'></img>"),
        d = e("<button class='link' id='CloseButton' type='button' style='position:absolute; height:22px; right:5px; bottom:7px; background-color:rgba(221,221,221,1.0); border:0px; color:rgba(50,50,50,1.0);'>" + t.i18n("Button_close") + "</button>"),
        v = e("<div class='toolDialog' id='ToolDialog' style='z-index: 1000;'></div> "),
        m = e("<div style='position: absolute; width:100%; height:100%; background-color:rgba(255,255,255,.0); z-index: 999;'></div>");
      v.append(c), v.append(p), v.append(h), v.append(d), v.css({
        width: h.outerWidth(),
        height: h.height() + f + l
      }), h.css({
        top: f
      }), e("body").append(v), u == 0 && e("body").append(m), Cesium.defined(this._lastPositionX) && Cesium.defined(this._lastPositionY) ? window.navigator.userAgent.indexOf("Edge") > -1 && i == 1 ? v.css({
        right: this._lastPositionX,
        top: this._lastPositionY
      }) : v.css({
        left: this._lastPositionX,
        top: this._lastPositionY
      }) : a ? e("#ContainerRootDiv").length > 0 && e("#LowerView").append(h) : v.center(), v.drags({
        onlyElements: [v.get(0), c.get(0)].concat(c.find("*").get()),
        cursor: "default"
      });
      var g = e.proxy(function () {
          o != undefined && o(), this._mainButton != null && this._mainButton.onToolDialogClosed(), v.remove(), m.remove(), this._isOpen = !1
        }, this),
        y = this,
        g = function (e) {
          o != undefined && o(e), y._mainButton != null && y._mainButton.onToolDialogClosed(), v.remove(), m.remove(), y._isOpen = !1
        };
      d.click(function () {
        g(!1)
      }), p.click(function () {
        g(!0)
      }), this._isOpen = !0
    };
    var i = !1;
    return r.prototype.removeCloseButton = function () {
      var t = e("#CloseButton");
      t.remove();
      return
    }, r.prototype.SetPosition = function () {
      this._lastPositionY = e("#ToolDialog").css("top");
      var t = e("#ToolDialog").css("left");
      window.navigator.userAgent.indexOf("Edge") > -1 ? t == "auto" ? (this._lastPositionX = e("#ToolDialog").css("right"), i = !0) : (this._lastPositionX = t, i = !1) : this._lastPositionX = t
    }, r.prototype.showAlertDialog = function (n) {
      var r = e("<div class='toolDialogLabel' style='position:absolute; font-color:red; width:435px; height:50px; padding:10px;'>" + n + "</div>");
      this.open(t.i18n("Alert_Message"), "./img/exclamations.png", r.get(0)), e("#iconImageID").remove(), e("#toolDialogTitleID span").css("padding-left", "10px")
    }, r.prototype.close = function () {
      this._lastResizingState = !1;
      if (TerraExplorer.tools.ToolDialog._title == "Edit Feature Layer Style") return;
      e("#ToolDialog").find("#closeXID") != undefined ? e("#ToolDialog").find("#closeXID").click() : e("#ToolDialog").find("#CloseButton").click()
    }, n = new r, n
  }), define("tools/ListControl", ["../jquery", "../TELang"], function (e, t) {
    "use strict";
    var n = 0,
      r = 1,
      i = !1,
      s = function (t) {
        this._sideStyle = !0, this._currentLine = null, this._ListDiv = e("<div class='listControl'></div>"), t.append(this._ListDiv), this._isAnalyzeToolList = !1, this._globalLeftRightPadding = 0
      };
    Cesium.defineProperties(s.prototype, {
      LinePadding: {
        get: function () {
          return this.this._globalLeftRightPadding
        },
        set: function (e) {
          this._globalLeftRightPadding = e
        }
      },
      IsAnalyzeToolList: {
        get: function () {
          return this._isAnalyzeToolList
        },
        set: function (e) {
          this._isAnalyzeToolList = e
        }
      }
    });
    var o = 34;
    return s.prototype.add = function (r) {
      var s = 16,
        u = 40 + this._globalLeftRightPadding / 2,
        a = this._ListDiv.find(".listControlLineSidebar").length,
        f = this._ListDiv.find(".listControlLineTextHeaderSidebar").length,
        l = this._ListDiv.find(".thumbImgLocation").length,
        c = 1;
      r.header != undefined && r.queryDetailsWindow != undefined ? o = 34 : r.header != undefined ? o = 68 : r.image != undefined ? o = 134 : this._isAnalyzeToolList ? r.header != undefined ? o = 34 : o = 17 : o = 34, r.queryDetailsWindow && (c = .5);
      var h = e("<div class='listControlLineSidebar' style='height:" + o + "px; position: absolute; width:270px;'></div>");
      this._isAnalyzeToolList ? h.css({
        top: (a - f) * 17 + l * 100 + f * 68
      }) : r.thinHeader != undefined ? h.css({
        top: (a - f) * 34 + l * 100 + f * 34
      }) : h.css({
        top: (a - f) * 34 + l * 100 + c * f * 68
      }), e(this._ListDiv).parent().css("height", "100%");
      var p = e("<div style='position: relative; padding-top:0px; height:100%; display:flex;align-items:center; padding-left:" + this._globalLeftRightPadding + "px'></div>");
      this._isAnalyzeToolList && p.css("display", "block"), h.append(p), this._ListDiv.append(h), this._isAnalyzeToolList ? p.css({
        width: h.width() * 2,
        height: 17
      }) : p.css({
        width: h.width() * 2,
        height: 34
      });
      var d = this._ListDiv.find(".listControlLineTextHeaderSidebar").length;
      r.line != undefined && this._ListDiv.append(h);
      var v = null,
        m = null;
      r.img != undefined && r.paddingLeft != undefined && (v = e("<img src='" + r.img + "' style='height:" + s + "px; width:" + s + "px; vertical-align: middle; padding-left:5px; padding-right:5px;'></img>"), p.append(v));
      var g = 0,
        y = null,
        b, w = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
      if (r.text != undefined)
        if (this._isAnalyzeToolList) {
          var s = v != null ? v.outerWidth() : 0;
          b = r.text.search(w);
          if (b > 0) {
            y = e("<span class='listControlLineTextAnalyzeToolURL' style=''>" + r.text + "</span>");
            var E = y[0].children[1],
              S = E.href;
            E.href = "#", E.addEventListener("click", function () {
              return window.open(S), !1
            })
          } else r.header != undefined ? y = e("<span class='listControlLineHeaderToolContainer' style=''>" + r.text + "</span>") : y = e("<span class='listControlLineTextAnalyzeTool' style=''>" + r.text + "</span>");
          g = h.width() - s, y.css({
            width: g
          }), r.queryToolContainer != undefined && y.css("margin-left", "7px"), p.append(y)
        } else {
          var s = v != null ? v.outerWidth() : 0;
          r.text.length > 29 && r.query == undefined && r.presentation == undefined && (r.text = r.text.slice(0, 29) + "  . . .");
          if (r.text.search(w) > 0) {
            y = e("<span id='listItemID' class='listControlLineTextAnalyzeToolURL' style='word-wrap: break-word;width:270px;'>" + r.text + "</span>");
            var E = y[0].children[1],
              S = E.href;
            E.href = "#", E.addEventListener("click", function () {
              return window.open(S), !1
            })
          } else y = e("<span id='listItemID' class='listControlLineTextNormalSidebar' style='word-wrap: break-word;width:270px;'>" + r.text + "</span>");
          r.presentation != undefined && (y.css("color", "black"), h.css("width", "100%")), g = h.width() - s, r.disabled != undefined && (y = e("<span class='listControlLineTextNormal' style='color:gray;font-size:11px;'><span style='text-decoration:line-through;'>" + r.text + "</span><br/>" + t.i18n("Disabled_Layer") + "</span>")), r.header != undefined && r.header == 1 && (y.attr("class", "listControlLineTextHeaderSidebar"), r.subHeader != undefined && (y.attr("class", "listControlLineTextSubHeaderSidebar"), r.img != undefined && (v = e("<img src='" + r.img + "' style='margin-right:20px;'></img>"), y.prepend(v)))), r.header != undefined && this._ListDiv._isAnalyzeToolList == 1 && y.attr("class", "listControlLineHeaderToolContainer"), y.css({
            width: g
          }), p.append(y)
        } r.onClick != undefined && (v != null && (v.click(a - d, r.onClick), v.css({
        cursor: "pointer"
      })), y != null && (y.css({
        cursor: "pointer"
      }), b > 0 ? y.click(a - d, r.onClick) : y.click(a - d, r.onClick)));
      var x = this,
        T = null;
      if (r.checkbox != undefined) {
        var N = r.greyCheckbox ? "css-label-grey" : "css-label";
        T = e("<div id='checkboxDiv' style='margin-left:" + -this._globalLeftRightPadding + "px; height:100%; width:" + u + "px; overflow:hidden'><input type='checkbox' class='css-checkbox' id='lineCheckbox" + a + "' style='' /><label class='" + N + "' style='margin: 11px 15px 15px 15px; ' for='lineCheckbox" + a + "'></label></div>"), r.disabled != undefined && T.css("opacity", "0"), p.append(T), y.css({
          width: g - u
        }), T.mouseenter(function (e) {
          T.css("opacity") == 1 && (e.stopPropagation(), x._currentLine = null)
        }), r.checkbox.onClick && T.find("#lineCheckbox" + a).click(a - d, r.checkbox.onClick), r.checkbox.isChecked && T.find("#lineCheckbox" + a).prop("checked", r.checkbox.isChecked)
      }
      var s = v != null ? v.outerWidth() : 0;
      n = h.width() - s - (T ? u : 0), this._ListDiv.find(".listControlLineTextNormalSidebar").css({
        width: n
      });
      if (r.buttons != undefined) {
        var C = e("<div class='listControlLineButtonsSidebar' style='overflow:hidden; position:relative; white-space: nowrap;'></div>");
        C.append(e("<span class='verticalAlignHelper'></span>"));
        var k = 32,
          L = e("<img id='leaderImg' src='./img/newDesign/drawer_open2.png' style='cursor:pointer;height:32px; width:15px; vertical-align: middle;'></img>");
        L.on("click", function () {
          H()
        }), C.append(L);
        for (var A = 0; A < r.buttons.length; A++) {
          A > 0;
          var O = e("<img src='" + r.buttons[A].img + "' style='vertical-align: middle; cursor: pointer;'></img>");
          O.css({
            width: 18,
            height: 18,
            padding: 8
          }), O.click(a - d, r.buttons[A].onClick), C.append(O), C.css({
            width: r.buttons.length * 36 + 15
          })
        }
        p.append(C);
        var M = Math.max(180, Math.min(240, 60 * r.buttons.length)),
          _ = function () {},
          D = !1,
          P = !1,
          H = function () {
            i || L.hide(), y.animate({
              width: n - (r.buttons.length * (o + 2) + 25 - 16)
            }, M)
          },
          B = function (t) {
            L.show(), t.stopPropagation();
            var r = x._currentLine = t.target;
            TerraExplorer.lastTouchedMenuEntry = r;
            var i = e("#ListParentID")[0],
              s = i.scrollHeight > i.clientHeight,
              o = 20;
            TerraExplorer.browser.isEdge && s ? o = 30 : (TerraExplorer.browser.isFirefox || TerraExplorer.browser.isIE) && s && (o = 35), setTimeout(function () {
              if (r != x._currentLine) return;
              y.animate({
                width: n - o
              }, M)
            }, 250)
          },
          j = function (e) {
            var t = e.target;
            setTimeout(function () {
              y.animate({
                width: n
              }, M)
            }, 300)
          };
        if (TerraExplorer.isTouch()) {
          var F, I, q = 1e3;
          F = function (e) {
            B(e)
          }, h.on("touchstart", function (t) {
            var r = t,
              i = t.target;
            x._currentLine == null && (TerraExplorer.lastTouchedMenuEntry = x._currentLine = t.target), i != x._currentLine && (e(x._currentLine).parent().parent().prop("class") == "listControlLineSidebar" ? e(e(e(x._currentLine).parent().parent().children()[0]).children()[0]).animate({
              width: n
            }, M) : e(x._currentLine).parent().prop("class") == "listControlLineSidebar" && e(e(e(x._currentLine).parent().children()[0]).children()[0]).animate({
              width: n
            }, M)), I = setTimeout(function () {
              F(r)
            }, q)
          }), h.on("touchend", function (e) {
            I && clearTimeout(I)
          })
        } else h.mouseenter(B), h.mouseleave(j)
      }
      if (r.image != undefined) {
        m = e("<img class='thumbImgLocation' src='" + r.image + "' style='cursor:pointer;height:" + 100 + "px; width:" + 225 + "px; vertical-align: middle; padding-left:0px; padding-right:5px;'></img>");
        var R = e('<div style="position:relative;z-index:1;margin-left:10px;"></div>');
        R.append(m), m.click(function (e) {
          r.onClick(e)
        }), p.after(R)
      }
    }, s.prototype.removeAll = function () {
      this._ListDiv.empty()
    }, s.prototype.highlightLine = function (t) {
      var n = this._ListDiv.find(".listControlLineSidebar");
      t >= 0 && t < n.length && (n.css({
        "background-color": "rgba(255, 255, 255, 1.0)"
      }), e(n[t]).css({
        "background-color": "rgba(220, 220, 220, 1.0)"
      }))
    }, s.prototype.ensureLineVisible = function (e) {
      var t = this._ListDiv.find(".listControlLineSidebar");
      e >= 0 && e < t.length && this._ListDiv.parent().scrollTo(e * o)
    }, s
  }), define("jquery.plugs", ["jquery"], function (e) {
    "use strict";
    e.fn.mousecapture = function (t) {
      var n = e(document);
      return this.each(function () {
        var r = e(this),
          i = {};
        r.mousedown(function (e) {
          var s;
          t.move && (s = function (e) {
            t.move.call(r, e, i)
          }, n.mousemove(s));
          var o, u = function () {
            t.move && n.unbind("mousemove", s), n.unbind("mouseup", o)
          };
          return t.up ? o = function (e) {
            return u(), t.up.call(r, e, i)
          } : o = u, n.mouseup(o), t.down.call(r, e, i)
        })
      }), this
    }, e.cookie = function (e, t, n) {
      if (typeof t == "undefined") {
        t = null;
        if (document.cookie && document.cookie != "") {
          n = document.cookie.split(";");
          for (r = 0; r < n.length; r++)
            if (i = jQuery.trim(n[r]), i.substring(0, e.length + 1) == e + "=") {
              t = decodeURIComponent(i.substring(e.length + 1));
              break
            }
        }
        return t
      }
      n = n || {}, t === null && (t = "", n.expires = -1);
      var r = "";
      n.expires && (typeof n.expires == "number" || n.expires.toUTCString) && (typeof n.expires == "number" ? (r = new Date, r.setTime(r.getTime() + n.expires * 864e5)) : r = n.expires, r = "; expires=" + r.toUTCString());
      var i = n.path ? "; path=" + n.path : "",
        s = n.domain ? "; domain=" + n.domain : "",
        n = n.secure ? "; secure" : "";
      document.cookie = [e, "=", encodeURIComponent(t), r, i, s, n].join("")
    }, e.fn.rotate = function (t) {
      return e(this).css({
        "-webkit-transform": "rotate(" + t + "deg)",
        "-moz-transform": "rotate(" + t + "deg)",
        "-ms-transform": "rotate(" + t + "deg)",
        transform: "rotate(" + t + "deg)"
      }), e(this)
    }, e.fn.disableSelection = function () {
      return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", !1)
    }, e.fn.center = function () {
      return this.css("position", "absolute"), this.css("top", Math.max(0, (e(window).height() - e(this).outerHeight()) / 2 + e(window).scrollTop()) + "px"), this.css("left", Math.max(0, (e(window).width() - e(this).outerWidth()) / 2 + e(window).scrollLeft()) + "px"), this
    }, e.fn.drags = function (t) {
      t = e.extend({
        handle: "",
        cursor: "move"
      }, t);
      if (t.handle === "") var n = this;
      else var n = this.find(t.handle);
      return n.css("cursor", t.cursor).on("mousedown", function (n) {
        var r = n || window.event,
          i = r.target || r.srcElement;
        if (t.onlyElements != undefined && t.onlyElements.indexOf(i) == -1) return;
        if (t.handle === "") var s = e(this).addClass("draggable");
        else var s = e(this).addClass("active-handle").parent().addClass("draggable");
        var o = s.css("z-index"),
          u = s.outerHeight(),
          a = s.outerWidth(),
          f = s.offset().top + u - n.pageY,
          l = s.offset().left + a - n.pageX;
        s.css("z-index", 1e3).parents().on("mousemove", function (t) {
          e(".draggable").offset({
            top: t.pageY + f - u,
            left: t.pageX + l - a
          }).on("mouseup", function () {
            e(this).removeClass("draggable").css("z-index", o)
          })
        }), n.preventDefault()
      }).on("mouseup", function () {
        t.handle === "" ? e(this).removeClass("draggable") : e(this).removeClass("active-handle").parent().removeClass("draggable")
      })
    }, e.fn.newguid = function () {
      return this.val("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = Math.random() * 16 | 0,
          n = e == "x" ? t : t & 3 | 8;
        return n.toString(16)
      })), this
    }, e.fn.hasScrollBar = function () {
      return this.get(0).scrollHeight > this.height()
    }, e.fn.scrollTo = function (t, n, r) {
      typeof n == "function" && arguments.length == 2 && (r = n, n = t);
      var i = e.extend({
        scrollTarget: t,
        offsetTop: 50,
        duration: 500,
        easing: "swing"
      }, n);
      return this.each(function () {
        var t = e(this),
          n = typeof i.scrollTarget == "number" ? i.scrollTarget : e(i.scrollTarget),
          s = typeof n == "number" ? n : n.offset().top + t.scrollTop() - parseInt(i.offsetTop);
        t.animate({
          scrollTop: s
        }, parseInt(i.duration), i.easing, function () {
          typeof r == "function" && r.call(this)
        })
      })
    }
  }), define("internal/FlyAround", ["jquery", "./GeometryHelper"], function (e, t) {
    "use strict";
    var n = function (e, t, n, r) {
      this.onStopHandler = null, this._prevOnFrameTime = 0, this._firstFrameAfterStart = !1, this._POI = e.clone(), this._currentPos = new Cesium.Cartesian3, Cesium.Cartesian3.clone(t || viewer.camera.position, this._currentPos), this._angularSpeed = n || Cesium.Math.toRadians(30), this._stopAtYaw = r, viewer.camera.setView({
        destination: this._currentPos,
        orientation: {
          heading: viewer.camera.heading,
          pitch: viewer.camera.pitch,
          roll: 0
        }
      })
    };
    return n.prototype.move = function (e) {
      if (this._stopAtYaw != undefined) {
        var n = t.getShortArcDirection(viewer.camera.heading, this._stopAtYaw);
        if (this.IsSameAngularDirection(n, this._angularSpeed)) {
          viewer.camera.rotateAroundPoint(this._POI, this._POI, this._angularSpeed * e);
          var r = t.getShortArcDirection(viewer.camera.heading, this._stopAtYaw);
          if (!this.IsSameAngularDirection(n, r)) return viewer.camera.rotateAroundPoint(this._POI, this._POI, r), !1
        }
      } else viewer.camera.rotateAroundPoint(this._POI, this._POI, this._angularSpeed * e);
      return !0
    }, n.prototype.IsSameAngularDirection = function (e, t) {
      return e == t || e != 0 && t != 0 ? e < 0 && t < 0 || e > 0 && t > 0 : !1
    }, n.prototype.start = function (e) {
      this._firstFrameAfterStart = !0, this.onStopHandler = e, viewer.scene.preRender.addEventListener(this.onPreFrame, this)
    }, n.prototype.stop = function () {
      viewer.scene.preRender.removeEventListener(this.onPreFrame, this), this.onStopHandler != null && this.onStopHandler()
    }, n.prototype.onPreFrame = function (e, t) {
      var n = Cesium.JulianDate.secondsDifference(t, this._prevOnFrameTime);
      this._prevOnFrameTime = t, this.move(this._firstFrameAfterStart ? 0 : n) == 0 && this.stop(), this._firstFrameAfterStart = !1
    }, n
  }), define("wfs/TileManager", [], function () {
    "use strict";

    function e() {
      this._quadtree = undefined, this._tilingScheme = new Cesium.GeographicTilingScheme, this._errorEvent = new Cesium.Event, this._loadTileEvent = new Cesium.Event, this._levelZeroMaximumError = Cesium.QuadtreeTileProvider.computeDefaultLevelZeroMaximumGeometricError(this._tilingScheme), this._tileCache = [], this._primitivesWaitingToBeAddedToTheScene = [], this._pauseStreaming = !1, this.STREAM_SPEED_IMIDIATE = 0, this.STREAM_SPEED_FAST = 1, this.STREAM_SPEED_NORMAL = 2, this.STREAM_SPEED_SLOW = 3, this._streamSpeed = this.STREAM_SPEED_NORMAL
    }
    Object.defineProperties(e.prototype, {
      quadtree: {
        get: function () {
          return this._quadtree
        },
        set: function (e) {
          this._quadtree = e
        }
      },
      ready: {
        get: function () {
          return !0
        }
      },
      tilingScheme: {
        get: function () {
          return this._tilingScheme
        }
      },
      errorEvent: {
        get: function () {
          return this._errorEvent
        }
      },
      loadTileEvent: {
        get: function () {
          return this._loadTileEvent
        }
      },
      pauseStreaming: {
        get: function () {
          return this._pauseStreaming
        },
        set: function (e) {
          this._pauseStreaming = e
        }
      },
      streamSpeed: {
        get: function () {
          return this._streamSpeed
        },
        set: function (e) {
          this._streamSpeed = e
        }
      }
    }), e.prototype.streamSpeedFactor = function () {
      switch (this._streamSpeed) {
        case this.STREAM_SPEED_FAST:
          return 1;
        case this.STREAM_SPEED_NORMAL:
          return 3;
        case this.STREAM_SPEED_SLOW:
          return 20;
        default:
          return 3
      }
    };
    var t = 0;
    e.prototype.onPreFrame = function (e, n) {
      t++;
      if (this._pauseStreaming) return;
      if (this._streamSpeed == this.STREAM_SPEED_IMIDIATE)
        while (this._primitivesWaitingToBeAddedToTheScene.length > 0) e.primitives.add(this._primitivesWaitingToBeAddedToTheScene.pop());
      else this._primitivesWaitingToBeAddedToTheScene.length > 0 && t % this.streamSpeedFactor() == 0 && e.primitives.add(this._primitivesWaitingToBeAddedToTheScene.pop())
    };
    var n = !1;
    e.prototype.initialize = function (e) {
      n || (viewer.scene.preRender.addEventListener(this.onPreFrame, this), n = !0)
    }, e.prototype.beginUpdate = function (e) {
      this.quadtree.beginFrame(e)
    }, e.prototype.endUpdate = function (e) {
      var t = this;
      e.afterRender.push(function () {
        t.quadtree.endFrame(e)
      })
    }, e.prototype.updateForPick = function (e) {}, e.prototype.getLevelMaximumGeometricError = function (e) {
      return this._levelZeroMaximumError / (1 << e)
    };
    var r = 180 / Math.PI,
      i = 1 / r;
    e.prototype.placeHolder = function (e, t) {
      t = t || Cesium.Color.fromBytes(0, 255, 0, 255);
      var n = new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.RectangleOutlineGeometry({
            rectangle: e.rectangle
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(t)
          }
        }),
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: !0
        })
      });
      e.data.primitive.add(n)
    }, e.prototype.loadTile = function (e, t) {
      var n = this;
      if (t.state === Cesium.QuadtreeTileLoadState.START) {
        t.data = {
          primitive: new Cesium.PrimitiveCollection,
          wfsLayerData: [],
          id: Cesium.createGuid(),
          freeResources: function () {
            if (Cesium.defined(this.wfsLayerData)) {
              for (var e in this.wfsLayerData) Cesium.defined(this.wfsLayerData[e]) && this.wfsLayerData[e].freeResources();
              this.wfsLayerData = undefined
            }
            Cesium.defined(this.primitive) && (this.primitive.destroy(), this.primitive = undefined), delete n._tileCache[t.data.id]
          }
        }, this._tileCache[t.data.id] = t;
        var i = 6371e3,
          s = Math.abs(i * (t.rectangle.south - t.rectangle.north));
        t.data.boundingSphere3D = Cesium.BoundingSphere.fromRectangle3D(t.rectangle), t.data.boundingSphere2D = Cesium.BoundingSphere.fromRectangle2D(t.rectangle, e.mapProjection);
        var o = [r * t.rectangle.west, r * t.rectangle.south, r * t.rectangle.east, r * t.rectangle.north];
        this.loadTileEvent.raiseEvent(t), t.state = Cesium.QuadtreeTileLoadState.DONE, t.renderable = !0
      }
    }, e.prototype.getTile = function (e) {
      return this._tileCache[e]
    }, e.prototype.getAllTiles = function () {
      var e = [];
      for (var t in this._tileCache) e.push(this._tileCache[t]);
      return e
    }, e.prototype.computeTileVisibility = function (e, t, n) {
      var r = this.computeDistanceToTile(e, t);
      e._distance = r;
      if (t.fog.enabled && Cesium.Math.fog(r, t.fog.density) >= 1) return Cesium.Visibility.NONE;
      var i;
      return t.mode === Cesium.SceneMode.SCENE3D ? i = e.data.boundingSphere3D : i = e.data.boundingSphere2D, t.cullingVolume.computeVisibility(i)
    }, e.prototype.showTileThisFrame = function (e, t) {
      e.data.primitive.update(t)
    };
    var s = new Cesium.Cartesian3;
    return e.prototype.computeDistanceToTile = function (e, t) {
      var n;
      return t.mode === Cesium.SceneMode.SCENE3D ? n = e.data.boundingSphere3D : n = e.data.boundingSphere2D, Math.max(0, Cesium.Cartesian3.magnitude(Cesium.Cartesian3.subtract(n.center, t.camera.positionWC, s)) - n.radius)
    }, e.prototype.isDestroyed = function () {
      return !1
    }, e.prototype.destroy = function () {
      return Cesium.destroyObject(this)
    }, e.prototype.getInstance = function (t) {
      if (Cesium.defined(t.TileManager) == 0) {
        t.TileManager = new e;
        var n = new Cesium.QuadtreePrimitive({
          tileProvider: t.TileManager
        });
        t.scene.primitives.add(n)
      }
      return t.TileManager
    }, e.prototype.addToScene = function (e) {
      this._primitivesWaitingToBeAddedToTheScene.push(e)
    }, e.prototype.removeFromScene = function (e) {
      var t = this._primitivesWaitingToBeAddedToTheScene.indexOf(e);
      t != -1 ? this._primitivesWaitingToBeAddedToTheScene.splice(t, 1) : viewer.scene.primitives.remove(e)
    }, new e
  }), define("internal/Navigate", ["jquery", "jquery.plugs", "./FlyAround", "./TEPosition", "./GeometryHelper", "./NotificationCenter", "./InputMode", "wfs/TileManager"], function (e, t, n, r, i, s, o, u) {
    "use strict";

    function h(e) {
      var t = 0,
        n = 0;
      do isNaN(e.offsetLeft) || (t += e.offsetLeft), isNaN(e.offsetTop) || (n += e.offsetTop); while (e = e.offsetParent);
      return {
        left: t,
        top: n
      }
    }

    function p(e) {
      var t = h(document.getElementById("mainContainer"));
      e.normalizedTouchCoordX = e.clientX - t.left, e.normalizedTouchCoordY = e.clientY - t.top
    }

    function d(t) {
      var n = {};
      e.extend(n, t._inputFlags), t.stop(), t._inputFlags = n
    }

    function y(e, t) {
      var n = t.complete;
      t.complete = function () {
        e._flyToStartPosition = null, n && n()
      }, t.complete != undefined && t.duration > .2 && (e._flyToStartPosition = viewer.camera.position.clone(), setTimeout(function () {
        e._flyToStartPosition.equalsEpsilon(viewer.camera.position, 0, 1e-7) && (e.stop(), t.complete())
      }, 200))
    }
    var a = 1,
      f = 0,
      l = new Cesium.Cartesian3,
      c = function () {
        this._currentNavigationMode = 3, this._prevOnFrameTime = 0, this._Movement = null, this._flyToStartPosition = null, this._groundHeightAtCameraPosition = 0, this._keyboardTurnSpeed = Cesium.Math.toRadians(20), this._minAltitudeAboveGround = 10, this._leftMouseDragParameters = {
          rotationAxis: undefined,
          rotationAngle: undefined,
          drageSphere: undefined
        }, this._prevFramePosition = null, this._useCesiumDrag = !1, this.NavigationMode = {
          FREE_FLIGHT: 0,
          DRAG: 1,
          DRAG_ROTATE: 2,
          FLY_TO: 3
        }, this._navigationMode = this.NavigationMode.FREE_FLIGHT, this._inputFlags = {
          moveForward: !1,
          moveBackward: !1,
          moveUp: !1,
          moveDown: !1,
          moveLeft: !1,
          moveRight: !1,
          lookUp: !1,
          lookDown: !1,
          turnLeft: !1,
          turnRight: !1,
          controlKey: !1,
          leftMouseButton: !1,
          middleButton: !1,
          rightButton: !1,
          isTouch: !1
        }, this._enableShortLeftClickWhileDrag = !0, this._mouseDownStartTime = undefined, this._mousePosition = undefined, this._downMousePosition = undefined, this._prevFrameMousePosition = undefined, this._downMouseCameraPosition = undefined, this._downMouseCameraHeading = undefined, this._downMouseCameraPitch = undefined, this._rotateDirX = 0, this._rotateDirY = 0, this._northOnly = !1, this._twoPointersGestureStart = !1, this._startTouches = undefined, this._currentTouches = undefined, this._rotateAndZoom = !1, this._rotateAndPitch = !1, this._startRotateAngle = 0, this._pitchAngleFactor = 0, this._zoomFactor = 1, this._prevFrameZoomFactor = undefined, this._rotateAngle = 0, this._prevFrameRotateAngle = undefined, this._pitchRotateDirY = 0, this._prevFramePitchRotateDirY = undefined, this._pitchRotateDirX = 0, this._prevFramePitchRotateDirX = undefined, this._multiGestureNavigationTime = 0, this._downMouseTerrainPosition = undefined, this._dragRotateMarker = {
          ring: undefined,
          topCone: undefined,
          icon: undefined,
          alpha: .6,
          enableDragRotateMarker: !0,
          useIconMarker: !0,
          hide: function () {
            if (this.useIconMarker) this.icon != undefined && (this.icon.show = !1);
            else {
              if (this.ring == undefined) return;
              viewer.entities.remove(this.ring), this.ring = undefined, viewer.entities.remove(this.topCone), this.topCone = undefined
            }
          },
          show: function (e, t) {
            if (!this.enableDragRotateMarker) return;
            this.alpha = Cesium.defaultValue(t, this.useIconMarker ? 1 : .6), this.useIconMarker ? this.icon == undefined ? this.createIcon(e) : (this.icon.show = !0, this.icon.position = e) : (this.createRing(e), this.createCone(e))
          },
          isVisible: function () {
            return this.useIconMarker ? this.icon ? this.icon.show : !1 : this.ring != undefined
          },
          createIcon: function (e) {
            this.icon = viewer.entities.add({
              position: e,
              billboard: {
                image: "./img/places.png",
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: .7,
                eyeOffset: new Cesium.Cartesian3(0, 0, -5)
              }
            })
          },
          markerSizeFactor: 36,
          createRing: function (e) {
            if (this.ring != undefined) return;
            var t = Cesium.Cartesian3.distance(e, viewer.camera.position),
              n = this.markerSizeFactor,
              r = new Cesium.CircleOutlineGeometry({
                center: e,
                radius: t / n
              }),
              i = Cesium.CircleOutlineGeometry.createGeometry(r),
              s = i.attributes.position.values,
              o = [];
            for (var u = 0; u < s.length - 2; u += 3) o.push(new Cesium.Cartesian3(s[u], s[u + 1], s[u + 2]));
            var a = new Cesium.CircleOutlineGeometry({
              center: e,
              radius: t / (n * 1.2)
            });
            i = Cesium.CircleOutlineGeometry.createGeometry(a), s = i.attributes.position.values;
            var f = [];
            for (var u = 0; u < s.length - 2; u += 3) f.push(new Cesium.Cartesian3(s[u], s[u + 1], s[u + 2]));
            this.ring = viewer.entities.add({
              name: "ring",
              position: e,
              polygon: {
                hierarchy: {
                  positions: o,
                  holes: [{
                    positions: f
                  }]
                },
                height: viewer.scene.globe.ellipsoid.cartesianToCartographic(e).height,
                material: Cesium.Color.WHITE.withAlpha(this.alpha),
                outline: !0,
                outlineColor: Cesium.Color.WHITE.withAlpha(this.alpha == 0 ? 0 : 1)
              }
            })
          },
          createCone: function (e) {
            if (this.topCone != undefined) return;
            var t = this.markerSizeFactor * 1.28,
              n = Cesium.Cartesian3.distance(e, viewer.camera.position),
              r = n / t,
              i = new Cesium.Matrix4;
            Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(e), new Cesium.Cartesian3(0, 0, r * .5), i);
            var s = new Cesium.Cartesian3;
            Cesium.Matrix4.getTranslation(i, s), this.topCone = viewer.entities.add({
              name: "topCone",
              position: s,
              cylinder: {
                length: r,
                topRadius: n / (t * 4.45),
                bottomRadius: 0,
                material: Cesium.Color.WHITE.withAlpha(this.alpha),
                outline: !0,
                outlineColor: Cesium.Color.WHITE.withAlpha(this.alpha == 0 ? 0 : 1)
              }
            })
          }
        }
      };
    c.prototype.DEFAULT_FLY_TO_DURATION = 5, c.prototype.MAX_ALTITUDE = 1e8, Cesium.defineProperties(c.prototype, {
      CurrentNavigationMode: {
        get: function () {
          return this._currentNavigationMode
        },
        set: function (e) {
          if (e < 1 || e > 3) {
            console.error("navigation mode can only be set to one of the three options: 1 - '2d north',2-'2d',3-'3d'");
            return
          }
          this._currentNavigationMode = e
        }
      },
      GroundHeightAtCameraPosition: {
        get: function () {
          return this._groundHeightAtCameraPosition
        }
      },
      HeightAboveGround: {
        get: function () {
          return viewer.camera.positionCartographic.height - this._groundHeightAtCameraPosition
        }
      },
      KeyboardTurnSpeed: {
        get: function () {
          return this._keyboardTurnSpeed
        },
        set: function (e) {
          this._keyboardTurnSpeed = e
        }
      },
      MinAltitudeAboveGround: {
        get: function () {
          return this._minAltitudeAboveGround
        },
        set: function (e) {
          this._minAltitudeAboveGround = e
        }
      },
      Mode: {
        get: function () {
          return this._navigationMode
        }
      },
      EnableShortLeftClickWhileDrag: {
        get: function () {
          return o.Mode != o.MEASUREMENT && this._enableShortLeftClickWhileDrag
        },
        set: function (e) {
          this._enableShortLeftClickWhileDrag = e
        }
      },
      EnableDragRotateMarker: {
        get: function () {
          return this._dragRotateMarker.enableDragRotateMarker
        },
        set: function (e) {
          this._dragRotateMarker.enableDragRotateMarker = e
        }
      },
      IsMultiGestureNavigation: {
        get: function () {
          return Date.now() - this._multiGestureNavigationTime < 500
        }
      },
      NorthOnly: {
        get: function () {
          return this._northOnly
        },
        set: function (e) {
          this._northOnly = e
        }
      }
    }), c.prototype.init = function () {
      function o(e) {
        switch (e) {
          case "Q".charCodeAt(0):
            return "moveLeft";
          case "W".charCodeAt(0):
            return "moveRight";
          case "S".charCodeAt(0):
            return "moveUp";
          case "X".charCodeAt(0):
            return "moveDown";
          case " ".charCodeAt(0):
            return "stop";
          case 37:
            return "turnLeft";
          case 39:
            return "turnRight";
          case 38:
            return "lookUp";
          case 40:
            return "lookDown";
          case 17:
            return "controlKey";
          default:
            return undefined
        }
      }

      function f(e, t) {
        var n = e.x * t.x + e.y * t.y + 0,
          r = Math.sqrt(e.x * e.x + e.y * e.y + 0),
          i = Math.sqrt(t.x * t.x + t.y * t.y + 0),
          s = 0,
          o = r * i;
        if (o == 0) s = 0;
        else {
          var u = n / o;
          u = Math.max(-1, Math.min(1, u));
          var a = Math.acos(u);
          isNaN(a) && (a = 0), a *= 180 / Cesium.Math.PI, s = a
        }
        return s
      }

      function l(t) {
        if (t._twoPointersGestureStart == 0) return;
        var n = t._startTouches[0],
          r = t._currentTouches[0],
          i = t._startTouches[1],
          s = t._currentTouches[1],
          o = {
            x: r.normalizedTouchCoordX - n.normalizedTouchCoordX,
            y: r.normalizedTouchCoordY - n.normalizedTouchCoordY
          },
          u = {
            x: s.normalizedTouchCoordX - i.normalizedTouchCoordX,
            y: s.normalizedTouchCoordY - i.normalizedTouchCoordY
          },
          a = Math.sqrt(o.x * o.x + o.y * o.y),
          l = Math.sqrt(u.x * u.x + u.y * u.y);
        if (a + l > 40) {
          t._startRotateAngle = h(s, r);
          var c = Math.abs(r.normalizedTouchCoordX - s.normalizedTouchCoordX),
            p = Math.abs(r.normalizedTouchCoordY - s.normalizedTouchCoordY);
          if (p > 3 * c) {
            t._twoPointersGestureStart = !1, t._rotateAndZoom = !0, t._rotateAndPitch = !1;
            return
          }
          t._startTouches = e.extend(!0, {}, t._currentTouches);
          var d = f(o, u);
          d < 60 && a != 0 && l != 0 ? (t._rotateAndZoom = !1, t._rotateAndPitch = !0) : (t._rotateAndZoom = !0, t._rotateAndPitch = !1), t._twoPointersGestureStart = !1
        }
        return
      }

      function c(e) {
        var t = e._startTouches[0],
          n = e._currentTouches[0],
          r = e._startTouches[1],
          i = e._currentTouches[1],
          s = r.normalizedTouchCoordX - t.normalizedTouchCoordX,
          o = r.normalizedTouchCoordY - t.normalizedTouchCoordY,
          u = Math.sqrt(s * s + o * o),
          a = i.normalizedTouchCoordX - n.normalizedTouchCoordX,
          f = i.normalizedTouchCoordY - n.normalizedTouchCoordY,
          l = Math.sqrt(a * a + f * f);
        l == 0 && (l = 1e-6);
        var c = u / l;
        return c
      }

      function h(e, t) {
        var n = {
            x: 100,
            y: 0
          },
          r = {
            x: 0,
            y: 100
          },
          i = {
            x: t.normalizedTouchCoordX - e.normalizedTouchCoordX,
            y: t.normalizedTouchCoordY - e.normalizedTouchCoordY
          },
          s = f(n, i),
          o = f(r, i),
          u = Math.abs(o) > 90 ? s : 360 - s;
        return u
      }

      function d(e) {
        var t = e._currentTouches[0],
          n = e._currentTouches[1],
          r = h(n, t);
        return r -= e._startRotateAngle, r
      }

      function v(e) {
        var t = e._startTouches[0],
          n = e._currentTouches[0],
          r = e._startTouches[1],
          i = e._currentTouches[1],
          s = (i.clientY + n.clientY) / 2,
          o = (r.clientY + t.clientY) / 2,
          u = s - o;
        return u /= 700, u
      }
      var t = viewer.scene,
        n = viewer.canvas;
      n.setAttribute("tabindex", "0"), n.onclick = function () {
        n.focus()
      };
      var r = this;
      e(n).focusout(function () {
        r.clearInput(), u.resetCursor()
      });
      var i = viewer.scene.globe.ellipsoid;
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = this.MAX_ALTITUDE, t.screenSpaceCameraController.enableRotate = this._useCesiumDrag, t.screenSpaceCameraController.enableTranslate = !1, t.screenSpaceCameraController.enableZoom = !1, t.screenSpaceCameraController.enableTilt = !1, t.screenSpaceCameraController.enableLook = !1, viewer.scene.preRender.addEventListener(this.onPreFrame, this);
      var u = this;
      document.addEventListener("keydown", function (e) {
        if (e.target == n || e.target == document.body) {
          var t = o(e.keyCode);
          typeof t != "undefined" && (u._inputFlags[t] = !0, u._inputFlags.controlKey && u._inputFlags.leftMouseButton == 0 && u.setCursor("./img/OpenHandDragRotate.png"))
        }
      }, !1), document.addEventListener("keyup", function (e) {
        if (e.target == n || e.target == document.body) {
          var t = o(e.keyCode);
          typeof t != "undefined" && (u._inputFlags[t] = !1, u._inputFlags.controlKey == 0 && u._inputFlags.leftMouseButton == 0 && u.resetCursor())
        }
      }, !1);
      var a = new Cesium.ScreenSpaceEventHandler(n);
      a.setInputAction(function (e) {
        viewer.trackedEntity = undefined
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      var m = 0;
      e("#mainContainer").on("touchstart", e.proxy(function (t) {
        t.preventDefault();
        if (t.target != viewer.scene.canvas) return;
        var n = (new Date).getTime(),
          r = n - m < 300 && t.originalEvent.touches.length == 1;
        m = n, this._inputFlags.isTouch = !0;
        if (r) {
          p(t.originalEvent.touches[0]), this.doubleClickHandler({
            position: new Cesium.Cartesian3(t.originalEvent.touches[0].normalizedTouchCoordX, t.originalEvent.touches[0].normalizedTouchCoordY)
          });
          return
        }
        this._currentTouches = t.originalEvent.targetTouches;
        for (var i in this._currentTouches) isNaN(i) || p(this._currentTouches[i]);
        this._startTouches = e.extend(!0, {}, this._currentTouches), this._currentTouches.length == 2 && (this._rotateAndZoom = !1, this._rotateAndPitch = !1, this._twoPointersGestureStart = !0, this._prevFrameRotateAngle = undefined, this._prevFrameZoomFactor = undefined, this._prevFramePitchRotateDirY = undefined), this.initMouseDownParametersTouch(t, "touchStart")
      }, this)), e("#mainContainer").on("touchcancel", e.proxy(function () {
        this._inputFlags.isTouch = !1
      }), this), e("#mainContainer").on("touchend", e.proxy(function (e) {
        e.preventDefault(), this._inputFlags.isTouch = !1, this.resetMouseDownParameters(e, "touchEnd")
      }, this)), e("#mainContainer").on("touchmove", e.proxy(function (e) {
        e.preventDefault(), this._currentTouches = e.originalEvent.targetTouches;
        for (var t in this._currentTouches) isNaN(t) || p(this._currentTouches[t]);
        this._currentTouches.length > 1 && (this._multiGestureNavigationTime = Date.now());
        if (this._currentTouches.length == 2) {
          if (this._twoPointersGestureStart) l(this);
          else if (this._rotateAndZoom) this._zoomFactor = c(this), this._rotateAngle = d(this), this._prevFrameRotateAngle == undefined && (this._prevFrameRotateAngle = this._rotateAngle), this._prevFrameZoomFactor == undefined && (this._prevFrameZoomFactor = this._zoomFactor);
          else if (this._rotateAndPitch) {
            this._pitchAngleFactor = v(this);
            var n = {
                x: (this._startTouches[0].normalizedTouchCoordX + this._startTouches[1].normalizedTouchCoordX) / 2,
                y: (this._startTouches[0].normalizedTouchCoordY + this._startTouches[1].normalizedTouchCoordY) / 2
              },
              r = {
                x: (this._currentTouches[0].normalizedTouchCoordX + this._currentTouches[1].normalizedTouchCoordX) / 2,
                y: (this._currentTouches[0].normalizedTouchCoordY + this._currentTouches[1].normalizedTouchCoordY) / 2
              };
            this._pitchRotateDirX = r.x - n.x, this._pitchRotateDirY = r.y - n.y, this._prevFramePitchRotateDirX == undefined && (this._prevFramePitchRotateDirX = this._pitchRotateDirX), this._prevFramePitchRotateDirY == undefined && (this._prevFramePitchRotateDirY = this._pitchRotateDirY)
          }
        } else if (this._twoPointersGestureStart || this._rotateAndZoom || this._rotateAndPitch) this._rotateAndZoom = !1, this._rotateAndPitch = !1
      }, this)), a.setInputAction(e.proxy(function (e) {
        this.initMouseDownParameters(e, Cesium.ScreenSpaceEventType.LEFT_DOWN)
      }, this), Cesium.ScreenSpaceEventType.LEFT_DOWN), a.setInputAction(e.proxy(function (e) {
        this.initMouseDownParameters(e, Cesium.ScreenSpaceEventType.LEFT_DOWN)
      }, this), Cesium.ScreenSpaceEventType.LEFT_DOWN, Cesium.KeyboardEventModifier.CTRL), a.setInputAction(e.proxy(function (e) {
        this.resetMouseDownParameters(e, Cesium.ScreenSpaceEventType.LEFT_UP)
      }, this), Cesium.ScreenSpaceEventType.LEFT_UP), a.setInputAction(e.proxy(function (e) {
        this.resetMouseDownParameters(e, Cesium.ScreenSpaceEventType.LEFT_UP)
      }, this), Cesium.ScreenSpaceEventType.LEFT_UP, Cesium.KeyboardEventModifier.CTRL), a.setInputAction(e.proxy(function (e) {
        this.initMouseDownParameters(e, Cesium.ScreenSpaceEventType.MIDDLE_DOWN)
      }, this), Cesium.ScreenSpaceEventType.MIDDLE_DOWN), a.setInputAction(e.proxy(function (e) {
        this.initMouseDownParameters(e, Cesium.ScreenSpaceEventType.MIDDLE_DOWN)
      }, this), Cesium.ScreenSpaceEventType.MIDDLE_DOWN, Cesium.KeyboardEventModifier.CTRL), a.setInputAction(e.proxy(function (e) {
        this.resetMouseDownParameters(e, Cesium.ScreenSpaceEventType.MIDDLE_UP)
      }, this), Cesium.ScreenSpaceEventType.MIDDLE_UP), a.setInputAction(e.proxy(function (e) {
        this.resetMouseDownParameters(e, Cesium.ScreenSpaceEventType.MIDDLE_UP)
      }, this), Cesium.ScreenSpaceEventType.MIDDLE_UP, Cesium.KeyboardEventModifier.CTRL), a.setInputAction(e.proxy(function (e) {
        this._mousePosition = e.endPosition
      }, this), Cesium.ScreenSpaceEventType.MOUSE_MOVE), a.setInputAction(e.proxy(function (e) {
        this._mousePosition = e.endPosition
      }, this), Cesium.ScreenSpaceEventType.MOUSE_MOVE, Cesium.KeyboardEventModifier.CTRL), a.setInputAction(e.proxy(this.zoom, this), Cesium.ScreenSpaceEventType.WHEEL), a.setInputAction(e.proxy(this.doubleClickHandler, this), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK), this.resetCursor(), s.addObserver(this, "toolContainerVisibilityChanged", "TEN_TOOL_CONTAINER_VISIBILITY_CHANGED", null), this._dragRotateMarker.show(Cesium.Cartesian3.ZERO)
    }, c.prototype.setCursor = function (t) {
      TerraExplorer.tools.ToolContainer.IsVisible ? this.resetCursor() : e(viewer.container).css({
        cursor: "url(" + t + ") 16 16, pointer"
      })
    }, c.prototype.resetCursor = function () {
      if (TerraExplorer.tools.ToolContainer.IsVisible && TerraExplorer.tools.ToolContainer.IsQuery) return;
      TerraExplorer.tools.ToolContainer.IsVisible ? e(viewer.container).css({
        cursor: ""
      }) : this.setCursor("./img/OpenHand.png")
    }, c.prototype.toolContainerVisibilityChanged = function (e) {
      this.resetCursor()
    }, c.prototype.initMouseDownParametersTouch = function (e, t) {
      var n = new Cesium.Cartesian3(this._startTouches[0].normalizedTouchCoordX, this._startTouches[0].normalizedTouchCoordY);
      this._startTouches.length == 2 && (n.x = (this._startTouches[0].normalizedTouchCoordX + this._startTouches[1].normalizedTouchCoordX) / 2, n.y = (this._startTouches[0].normalizedTouchCoordY + this._startTouches[1].normalizedTouchCoordY) / 2), this.initMouseDownParameters({
        position: n
      }, t)
    }, c.prototype.zoom = function (e) {
      if (this._navigationMode != this.NavigationMode.FREE_FLIGHT) return;
      var t = viewer.scene.canvas.width / 2,
        n = viewer.scene.canvas.height / 2,
        r = viewer.scene.screenToWorld(Cesium.Cartesian2.fromElements(t, n));
      if (r != undefined) {
        var i = Cesium.Cartesian3.distance(r, viewer.camera.position),
          s = Cesium.Math.sign(e) * i / (this.HeightAboveGround > 7e3 ? 4 : 6);
        viewer.scene.undergroundMode && (s = Cesium.Math.sign(e) * Math.max(10, Math.abs(s))), viewer.camera.zoomIn(s), s < 0 && viewer.camera.positionCartographic.height > this.MAX_ALTITUDE && viewer.camera.zoomIn(-s)
      } else {
        var s = Cesium.Math.sign(e) * Math.max(10, this.HeightAboveGround) / 4;
        viewer.camera.move(viewer.camera.direction, s)
      }
    }, c.prototype.doubleClickHandler = function (e) {
      var t = e.position,
        n = viewer.scene.screenToWorld(t);
      if (n == undefined) return;
      var r = Cesium.Cartesian3.distance(n, viewer.camera.position);
      this.flyToCartesian(n, r / 4)
    }, c.prototype.initMouseDownParameters = function (e, t) {
      d(this), t == Cesium.ScreenSpaceEventType.LEFT_DOWN ? (TerraExplorer.tools.ToolManager._tools.Rotate.close(), this._inputFlags.leftMouseButton = !0, this.setCursor(this._inputFlags.controlKey ? "./img/CloseHandDragRotate.png" : "./img/CloseHand.png")) : t == Cesium.ScreenSpaceEventType.MIDDLE_DOWN && (this._inputFlags.middleMouseButton = !0), this._mouseDownStartTime = new Date, this._mousePosition = this._downMousePosition = Cesium.Cartesian3.clone(e.position), this._prevFrameMousePosition = this._mousePosition.clone(), this._downMouseCameraPosition = viewer.camera.position.clone(), this._downMouseCameraHeading = viewer.camera.heading, this._downMouseCameraPitch = viewer.camera.pitch, this._rotateDirX = 0, this._rotateDirY = 0, f = 0, this._dragRotateMarker.isVisible() && this._dragRotateMarker.hide();
      var n = {
        pickPrimitive: undefined
      };
      this._downMouseTerrainPosition = viewer.scene.screenToWorld(this._downMousePosition, n), this._leftMouseDragParameters.dragSphere = this._downMouseTerrainPosition ? new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, Cesium.Cartesian3.magnitude(this._downMouseTerrainPosition)) : undefined
    }, c.prototype.resetMouseDownParameters = function (e, t) {
      t == Cesium.ScreenSpaceEventType.LEFT_UP || t == "touchEnd" ? this._inputFlags.leftMouseButton = !1 : t == Cesium.ScreenSpaceEventType.MIDDLE_UP && (this._inputFlags.middleMouseButton = !1), this.resetCursor(), this._downMouseTerrainPosition = undefined, this._dragRotateMarker.hide(), this._navigationMode == this.NavigationMode.DRAG && (this._Movement = new b(this._leftMouseDragParameters.rotationAxis, this._leftMouseDragParameters.rotationAngle)), this._navigationMode = this.NavigationMode.FREE_FLIGHT, viewer.scene.screenSpaceCameraController.enableRotate = this._useCesiumDrag
    }, c.prototype.isShortLeftClick = function () {
      return f <= 6 || Date.now() - this._mouseDownStartTime < 100
    }, c.prototype.onPreFrame = function (e, t) {
      a = Cesium.JulianDate.secondsDifference(t, this._prevOnFrameTime), this._prevOnFrameTime = t;
      if (e.mode == Cesium.SceneMode.MORPHING) return;
      var n = e.globe.getHeight(viewer.camera.positionCartographic);
      this._groundHeightAtCameraPosition = n || this._groundHeightAtCameraPosition, this.handleHitGround(), this.handleMovement(), this.handleKeys(), this.handleMouseDrag(), this.enforceZeroRoll(), this.handleStreamSpeed(), this._northOnly && viewer.camera.setView({
        orientation: {
          heading: 0
        }
      }), this._mousePosition && (this._prevFrameMousePosition = this._mousePosition.clone()), this._prevFramePosition = viewer.camera.position.clone()
    }, c.prototype.handleMouseDrag = function () {
      var e = (this._rotateAndPitch || this._rotateAndZoom) && this._currentTouches && this._currentTouches.length == 2;
      this._inputFlags.leftMouseButton && this._inputFlags.controlKey || this._inputFlags.middleMouseButton || e ? (this._navigationMode = this.NavigationMode.DRAG_ROTATE, this.handleMiddleButtonDrag()) : this._inputFlags.leftMouseButton && !this._inputFlags.controlKey && !this._inputFlags.middleMouseButton && (this._navigationMode = this.NavigationMode.DRAG, this.handleLeftButtonDrag())
    };
    var v;
    c.prototype.handleLeftButtonDrag = function () {
      if (this._prevFrameMousePosition == undefined) return;
      f++;
      if (this._navigationMode == this.NavigationMode.DRAG && !this._useCesiumDrag) {
        if (this.isShortLeftClick() && !this.EnableShortLeftClickWhileDrag) return;
        if (this._mousePosition == this._prevFrameMousePosition) return;
        var e = {
            pickPrimitive: undefined
          },
          t;
        if (!this._leftMouseDragParameters.dragSphere) t = viewer.scene.screenToWorld(this._prevFrameMousePosition, e);
        else {
          var n = viewer.camera.getPickRay(this._prevFrameMousePosition),
            r = Cesium.IntersectionTests.raySphere(n, this._leftMouseDragParameters.dragSphere),
            i = undefined;
          r != undefined && (i = r.start != 0 ? r.start : r.stop), t = i != undefined ? Cesium.Ray.getPoint(n, i) : undefined
        }
        if (t == undefined) {
          if (v == undefined) return;
          t = Cesium.IntersectionTests.rayPlane(viewer.camera.getPickRay(this._prevFrameMousePosition), v);
          if (t == undefined) return
        }
        var s;
        if (!this._leftMouseDragParameters.dragSphere) s = viewer.scene.screenToWorld(this._mousePosition, e);
        else {
          n = viewer.camera.getPickRay(this._mousePosition), r = Cesium.IntersectionTests.raySphere(n, this._leftMouseDragParameters.dragSphere);
          var i = undefined;
          r != undefined && (i = r.start != 0 ? r.start : r.stop), s = i != undefined ? Cesium.Ray.getPoint(n, i) : undefined
        }
        if (s == undefined) {
          if (v == undefined) return;
          s = Cesium.IntersectionTests.rayPlane(viewer.camera.getPickRay(this._mousePosition), v);
          if (s == undefined) return
        } else {
          var o = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(s, viewer.camera.position, l), l);
          v = Cesium.Plane.fromPointNormal(s, o)
        }
        var u = Cesium.Cartesian3.normalize(s, new Cesium.Cartesian3),
          a = Cesium.Cartesian3.normalize(t, new Cesium.Cartesian3),
          c = -Math.acos(Cesium.Cartesian3.dot(u, a)),
          h = Cesium.Cartesian3.cross(u, a, new Cesium.Cartesian3);
        this._leftMouseDragParameters.rotationAngle = 0, !h.equals(Cesium.Cartesian3.ZERO) && !isNaN(c) && (viewer.camera.rotateAroundPoint(Cesium.Cartesian3.ZERO, h, c), this._leftMouseDragParameters.rotationAxis = h, this._leftMouseDragParameters.rotationAngle = c)
      }
    }, c.prototype.handleMiddleButtonDrag = function () {
      if (this._navigationMode == this.NavigationMode.DRAG_ROTATE) {
        if (this._downMouseTerrainPosition == undefined) return;
        this._dragRotateMarker.show(this._downMouseTerrainPosition), e(viewer.container).css("cursor").indexOf("CloseHandDragRotate.png") == -1 && this.setCursor("./img/CloseHandDragRotate.png"), viewer.scene.screenSpaceCameraController.enableRotate = !1;
        var t = 20,
          n = 15,
          r = Math.min(Math.max(this.HeightAboveGround, 0), 1e4) / 1e4,
          s = 10 + r * 10,
          o, u;
        if (this._prevFrameMousePosition == undefined) return;
        if (this._twoPointersGestureStart == 1) return;
        var f = 1;
        this._rotateAndZoom ? (this._prevFrameRotateAngle == undefined ? o = 0 : (o = Math.round(Cesium.Math.toDegrees(i.getShortArcDirection(Cesium.Math.toRadians(this._prevFrameRotateAngle), Cesium.Math.toRadians(this._rotateAngle))) * 2), this._prevFrameRotateAngle = this._rotateAngle), this._prevFrameZoomFactor != undefined && (f = this._zoomFactor / this._prevFrameZoomFactor, viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, this._downMouseTerrainPosition, 0, f), this._prevFrameZoomFactor = this._zoomFactor), u = 0) : this._rotateAndPitch ? this._prevFramePitchRotateDirX == undefined || this._prevFramePitchRotateDirY == undefined ? (o = 0, u = 0) : (o = this._pitchRotateDirX - this._prevFramePitchRotateDirX, u = this._prevFramePitchRotateDirY - this._pitchRotateDirY, this._prevFramePitchRotateDirX = this._pitchRotateDirX, this._prevFramePitchRotateDirY = this._pitchRotateDirY) : (o = Cesium.Math.clamp(this._mousePosition.x - this._prevFrameMousePosition.x, -t, t), u = Cesium.Math.clamp(this._prevFrameMousePosition.y - this._mousePosition.y, -t, t));
        var l = Math.min(a, .1);
        viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, this._downMouseTerrainPosition, o * Cesium.Math.toRadians(s) * l);
        var c = Cesium.Cartesian3.subtract(viewer.camera.position, this._downMouseTerrainPosition, new Cesium.Cartesian3);
        c = Cesium.Cartesian3.normalize(c, new Cesium.Cartesian3);
        var h = Cesium.Cartesian3.normalize(this._downMouseTerrainPosition, new Cesium.Cartesian3),
          p = Cesium.Cartesian3.dot(c, h),
          d = Math.acos(p),
          v = Math.max(.1, Math.cos(d)),
          m = u * Cesium.Math.toRadians(n) * l * v;
        viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, viewer.camera.right, m);
        var d = Cesium.Cartesian3.angleBetween(viewer.camera.position, viewer.camera.up);
        d >= Cesium.Math.toRadians(90) && this.approximateUpLimit(m), u < 0 && (!viewer.scene.undergroundMode && this.HeightAboveGround < this._minAltitudeAboveGround || viewer.scene.undergroundMode && viewer.camera.positionCartographic.height < viewer.scene.undergroundSurfaceHeight) && this.approximateDownLimit(m)
      }
    }, c.prototype.approximateDownLimit = function (e) {
      function n() {
        return viewer.scene.undergroundMode ? viewer.camera.positionCartographic.height < viewer.scene.undergroundSurfaceHeight : t.HeightAboveGround < t._minAltitudeAboveGround
      }
      var t = this,
        r = 0;
      while (n() && e != 0) {
        viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, viewer.camera.right, -e);
        var i = viewer.scene.globe.getHeight(viewer.camera.positionCartographic);
        this._groundHeightAtCameraPosition = i || this._groundHeightAtCameraPosition, r++;
        if (r > 100) {
          console.log("Navigate.approximateDownLimit break");
          break
        }
      }
    }, c.prototype.approximateUpLimit = function (e, t) {
      t || (t = 0, viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, viewer.camera.right, -e)), t++, viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, viewer.camera.right, e);
      var n = Cesium.Cartesian3.angleBetween(viewer.camera.position, viewer.camera.up);
      if (n >= Cesium.Math.toRadians(90)) {
        viewer.camera.rotateAroundPoint(this._downMouseTerrainPosition, viewer.camera.right, -e);
        if (t > 5) return;
        this.approximateUpLimit(e / 2, t)
      } else this.approximateUpLimit(e, t)
    }, c.prototype.enforceZeroRoll = function () {
      viewer.camera.roll != 0 && viewer.camera.setView({
        orientation: {
          heading: viewer.camera.heading,
          pitch: viewer.camera.pitch,
          roll: 0
        }
      })
    }, c.prototype.handleMovement = function () {
      this._Movement != null && this._Movement.move(a) == 0 && (this._Movement instanceof b && (this._leftMouseDragParameters.rotationAngle = 0), this._Movement = null)
    }, c.prototype.handleKeys = function () {
      var e = 0,
        t = 0;
      this._inputFlags.stop && (TerraExplorer.tools.ToolManager._tools.Rotate.close(), this.stop(), s.postNotification("TEN_USER_INITIATE_STOP", this, this)), this._inputFlags.turnLeft && (e = -1), this._inputFlags.turnRight && (e = 1), this._inputFlags.lookUp && (t = 1), this._inputFlags.lookDown && (t = -1);
      if (this._inputFlags.moveLeft || this._inputFlags.moveRight) {
        var n = viewer.scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position).height,
          r = this._keyboardTurnSpeed * (this._inputFlags.moveRight ? -1 : 1) * this.HeightAboveGround / 3e8,
          i = new Cesium.Cartesian3;
        Cesium.Cartesian3.cross(viewer.camera.position, viewer.camera.right, i), viewer.camera.rotateAroundPoint(Cesium.Cartesian3.ZERO, i, r)
      }(e != 0 || t != 0) && viewer.camera.setView({
        orientation: {
          heading: viewer.camera.heading + e * this._keyboardTurnSpeed * a,
          pitch: Cesium.Math.clamp(viewer.camera.pitch + t * this._keyboardTurnSpeed * a, Cesium.Math.toRadians(-90), Cesium.Math.toRadians(87)),
          roll: 0
        }
      })
    }, c.prototype.clearInput = function () {
      for (var e in this._inputFlags) this._inputFlags[e] = !1
    }, c.prototype.handleHitGround = function () {
      var e, t;
      viewer.scene.undergroundMode ? (e = viewer.camera.positionCartographic.height < viewer.scene.undergroundSurfaceHeight, t = viewer.scene.undergroundSurfaceHeight + 10) : (e = this.HeightAboveGround < 0, t = this._groundHeightAtCameraPosition + 10), e && (this.stop(), viewer.camera.setView({
        destination: Cesium.Cartesian3.fromRadians(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, t),
        orientation: {
          heading: viewer.camera.heading,
          pitch: viewer.camera.pitch,
          roll: 0
        }
      }))
    };
    var m;
    c.prototype.handleStreamSpeed = function () {
      viewer.camera.position.equals(this._prevFramePosition) ? m == 0 && (m = setTimeout(function () {
        u.getInstance(viewer).streamSpeed = u.STREAM_SPEED_FAST
      }, 500)) : (clearTimeout(m), m = 0, this._navigationMode != this.NavigationMode.DRAG_ROTATE ? u.getInstance(viewer).streamSpeed = u.STREAM_SPEED_NORMAL : u.getInstance(viewer).streamSpeed = u.STREAM_SPEED_SLOW)
    }, c.prototype.stop = function () {
      this._Movement = null, viewer.scene.tweens.removeAll(), viewer.trackedEntity != undefined, viewer.trackedEntity = undefined, this.clearInput()
    }, c.prototype.flyAround = function (e, t, r, i) {
      this._Movement = new n(e, t, r, i)
    }, c.prototype.isFlyAround = function () {
      return this._Movement instanceof n
    }, c.prototype.faceNorth = function () {
      this.stop();
      var e = i.getShortArcDirection(viewer.camera.heading, 0),
        t = new Cesium.Cartesian2(viewer.scene.canvas.width / 2, viewer.scene.canvas.height / 2),
        n = viewer.camera.pickEllipsoid(t);
      if (n != undefined && viewer.scene.mode == Cesium.SceneMode.SCENE3D || viewer.scene.mode == Cesium.SceneMode.COLUMBUS_VIEW) {
        var r = 2,
          s = Math.abs(e) / Cesium.Math.toRadians(100);
        s = Math.min(Math.max(.4, s), 2);
        var o = e / s * r;
        this.flyAround(n, viewer.camera.position, o, 0)
      } else this._Movement = new g(e >= 0 ? 1 : -1)
    };
    var g = function (e) {
      this._yawDir = e != undefined ? e : 1
    };
    g.prototype.move = function () {
      var e = !0,
        t = Cesium.Math.toRadians(60) * this._yawDir,
        n = viewer.camera.heading,
        r = i.getShortArcDirection(n, 0);
      if (Math.abs(r) > 0) {
        var s = t * a,
          o = n + s,
          u = i.getShortArcDirection(o, 0),
          f = u >= 0 ? 1 : -1;
        this._yawDir != f ? (n = 0, e = !1) : n = o
      } else e = !1;
      return viewer.camera.setView({
        orientation: {
          heading: n
        }
      }), e
    }, c.prototype.flyToCartesian = function (e, t, n) {
      viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(e, t), {
        duration: c.DEFAULT_FLY_TO_DURATION,
        offset: new Cesium.HeadingPitchRange(viewer.camera.heading, Cesium.Math.toRadians(-50), t),
        complete: n || function () {}
      })
    }, c.prototype.flyToPosition = function (t, n) {
      if (viewer.scene.mode == Cesium.SceneMode.MORPHING) return;
      var r = this;
      this.convertToAbsolute(t, function (t) {
        o.Mode = o.CONTROLLED_FLIGHT;
        var i = {
          duration: c.DEFAULT_FLY_TO_DURATION,
          offset: t.HeadingPitchRange,
          hitGroundRetries: 0
        };
        e.extend(i, n), i.pausePresentation !== !1 && TerraExplorer.getCurrentPresentation() && TerraExplorer.getCurrentPresentation().pause();
        var s = i.complete;
        i.complete = function () {
          s != undefined && s(), o.Mode = o.FREE_FLIGHT
        };
        var u = i.cancel;
        i.cancel = function () {
          if (r.HeightAboveGround < 0) {
            i.hitGroundRetries++;
            if (i.hitGroundRetries < 5) {
              setTimeout(function () {
                r.flyToPosition(t, i)
              }, 200);
              return
            }
          }
          u != undefined && u(), o.Mode = o.FREE_FLIGHT
        }, y(r, i), viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(t.Cartesian, t.HeadingPitchRange.range), i)
      })
    }, c.prototype.convertToAbsolute = function (e, t) {
      if (e.AltitudeType == r.ATC_TERRAIN_RELATIVE) {
        var n = viewer.scene.globe.ellipsoid.cartesianToCartographic(e.Cartesian),
          i = n.height,
          s = Cesium.sampleTerrain(viewer.terrainProvider, 15, [n]);
        Cesium.when(s, function (s) {
          s[0].height == undefined && (s[0].height = 0), n.height = s[0].height + i;
          var o = new r;
          o.Cartesian = viewer.scene.globe.ellipsoid.cartographicToCartesian(n), o.HeadingPitchRange = Cesium.HeadingPitchRange.clone(e.HeadingPitchRange), o.AltitudeType = r.ATC_TERRAIN_ABSOLUTE, t(o)
        })
      } else t(e.clone())
    }, c.prototype.jumpToPosition = function (t, n) {
      if (viewer.scene.mode == Cesium.SceneMode.MORPHING) return;
      var r = {};
      e.extend(r, n), r.pausePresentation !== !1 && TerraExplorer.getCurrentPresentation() && TerraExplorer.getCurrentPresentation().pause(), this.convertToAbsolute(t, function (e) {
        e.HeadingPitchRange.range = Math.max(.001, e.HeadingPitchRange.range), viewer.camera.lookAt(e.Cartesian, e.HeadingPitchRange), viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      })
    };
    var b = function (e, t) {
      this.rotationAxis = e, this.startRotationAngle = t, this.rotationAngle = this.startRotationAngle, this.t = 1, this.isSpinning = !1
    };
    return b.prototype.move = function (e) {
      function t(e) {
        return e * (2 - e)
      }

      function n(e) {
        return e * e
      }
      return this.canSpin() ? (viewer.camera.rotateAroundPoint(Cesium.Cartesian3.ZERO, this.rotationAxis, this.rotationAngle), this.t = Math.max(0, this.t - e * 2), this.rotationAngle = this.startRotationAngle * n(this.t), !0) : (this.isSpinning = !1, !1)
    }, b.prototype.canSpin = function () {
      var e = Math.abs(this.rotationAngle / TerraExplorer.internal.Navigate.HeightAboveGround * Cesium.Cartesian3.magnitude(viewer.camera.position));
      return this.rotationAxis != undefined && this.rotationAngle != undefined && e > .001
    }, new c
  }), define("tools/TETools/DistanceTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "internal/Units", "internal/InputMode", "./ProgressTool", "internal/GeometryHelper", "internal/NotificationCenter", "tools/ToolDialog", "tools/ListControl", "internal/Navigate"], function (e, t, n, r, i, s, o, u, a, f, l, c) {
    "use strict";

    function h() {
      this._explanationText = t.i18n("analysis_distance_explanation_text"), this._explanationTextOnStartOnly = !0, this._listControl = null, this._eventListener = null, this._distancePoints = new Cesium.BillboardCollection, viewer.scene.primitives.add(this._distancePoints), this._distanceLines = new Cesium.PrimitiveCollection, viewer.scene.primitives.add(this._distanceLines), this._distanceLines2 = new Cesium.PrimitiveCollection, viewer.scene.primitives.add(this._distanceLines2), this._distanceLabels = new Cesium.BillboardCollection, viewer.scene.primitives.add(this._distanceLabels), this.reset(), this.getId = function () {
        return "DistanceTool"
      }, this.getMenuEntry = function () {
        return r.createFor(this, t.i18n("Menu_Analyze_Distance"), "./img/newDesign/analyze_distance.png", 10, r.MenuEntryAnalyze(), t.i18n("Measurement_Header"))
      }
    }

    function p(e, t) {
      this.longitude = e.longitude, this.latitude = e.latitude, this._height = e.height, this._requestID = t
    }
    return h.inheritsFrom(o), Cesium.defineProperties(h.prototype, {
      FirstPoint: {
        get: function () {
          return this._distancePoints.length == 0 ? null : this._distancePoints.get(0).position
        }
      },
      LastPoint: {
        get: function () {
          return this._distancePoints.length == 0 ? null : this._distancePoints.get(this._distancePoints.length - 1).position
        }
      },
      BeforeLastPoint: {
        get: function () {
          return this._distancePoints.length < 2 ? null : this._distancePoints.get(this._distancePoints.length - 2).position
        }
      }
    }), h.prototype.onOpenedToolContainer = function () {
      this._explanationTextOnStartOnly = !1, e(e(".analyzeToolHeaderContainer")[0]).text(t.i18n("Menu_Analyze_Distance"))
    }, h.prototype.onClosedToolContainer = function () {
      this._explanationTextOnStartOnly = !0
    }, h.prototype.onBeforeOpenToolContainer = function () {
      return s.Mode = s.MEASUREMENT, e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), this._eventListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas), this._eventListener.setInputAction(e.proxy(this.onLeftClick, this), Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.setInputAction(e.proxy(this.onRightClick, this), Cesium.ScreenSpaceEventType.RIGHT_CLICK), this.parent.onBeforeOpenToolContainer.call(this), this.showNormalButtons(), this.reset(), this._explanationTextOnStartOnly && this._toolContainer.setExplanationText(this._explanationText), a.addObserver(this, "unitsChanged", "TEN_UNITS_CHANGED", null), !0
    }, h.prototype.onBeforeCloseToolContainer = function (e) {
      return this.parent.onBeforeCloseToolContainer.call(this, e), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK), this.reset(), s.Mode = s.FREE_FLIGHT, a.removeObserver(this, "unitsChanged", "TEN_UNITS_CHANGED", null), f.IsOpen && f.close(), !0
    }, h.prototype.showNormalButtons = function () {
      this.ToolContainer.removeButtons(), this.ToolContainer.addButton(1, "./img/delete.png", undefined, t.i18n("measure_distance_tooltip_delete")), this.ToolContainer.addButton(2, "./img/newDesign/distance_point.png", undefined, t.i18n("measure_distance_tooltip_delete_last_point")), this.ToolContainer.addButton(3, "./img/newDesign/distance_1.png", undefined, t.i18n("measure_distance_tooltip_ground_distance"))
    }, h.prototype.reset = function () {
      this._toolContainerText = "", this._listControl != null && this._listControl.removeAll(), this._distancePoints.removeAll(), this._distanceLines.removeAll(), this._distanceLines2.removeAll(), this._distanceLabels.removeAll(), this._distanceIndex = 0, this._totalArealDist = 0, this._totalHorizontalDist = 0, this._slopFirstToLast = 0, this._elevationDifference = 0, this._groundDistance = 0, this._groundDistanceRequestID = 0, this.ToolContainer && this.ToolContainer.enableButton(3, !0)
    }, h.prototype.unitsChanged = function (e) {
      this.updateDistanceText()
    }, h.prototype.onButtonClick = function (e) {
      this.parent.onButtonClick.call(this, e);
      switch (e) {
        case 1:
          this.reset(), this.updateDistanceText(), f.IsOpen && f.close();
          break;
        case 2:
          if (this._distancePoints.length > 1) {
            var t = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.BeforeLastPoint),
              n = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint);
            this._totalArealDist -= u.geoDist(t, n), this._totalHorizontalDist -= u.geoDist2D(t, n), this._distancePoints.remove(this._distancePoints.get(this._distancePoints.length - 1)), this._distanceLines.remove(this._distanceLines.get(this._distanceLines.length - 1)), this._distanceLines2.remove(this._distanceLines2.get(this._distanceLines2.length - 1)), this._distanceLabels.remove(this._distanceLabels.get(this._distanceLabels.length - 1)), this.asyncUpdateElevationAndSlopeDiff(), this._distancePoints.length == 0 && this.ToolContainer.enableButton(3, !0)
          } else this.reset(), this.updateDistanceText();
          break;
        case 3:
          this._distancePoints.length > 1 && this.doWorkAsync()
      }
    }, h.prototype.updateDistanceText = function () {
      if (this._totalArealDist == 0 && this._totalHorizontalDist == 0 && this._slopFirstToLast == 0 && this._elevationDifference == 0) this._toolContainerText = "";
      else {
        var n = e("<div style='position:relative;overflow:hidden; width:100%; height:100%;'></div>"),
          r = e("<div id='MessageClientId' style='position:relative; margin-left:5px; margin-top:0px; overflow-y:auto; width:100%;'></div>");
        n.append(r), TerraExplorer.tools.ToolContainer.setText(""), e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), e("#LowerView").append(n), r.css({
          height: n.height()
        }), this._listControl = new l(r), this._listControl.IsAnalyzeToolList = !0;
        var s = t.i18n("measure_distance_aerial", {
            adist: i.formatDistance(this._totalArealDist)
          }),
          o = t.i18n("measure_distance_horizontal", {
            hdist: i.formatDistance(this._totalHorizontalDist)
          }),
          u = t.i18n("measure_distance_slope", {
            slope: this._slopFirstToLast.toFixed(2)
          }),
          a = t.i18n("measure_distance_elevation", {
            elevationDiff: i.formatDistance(this._elevationDifference)
          });
        if (this._groundDistance > 0) {
          var f = t.i18n("measure_distance_ground", {
            gdist: i.formatDistance(this._groundDistance)
          });
          this._toolContainerText = "<b>" + f + "</b><br>" + this._toolContainerText, this._listControl.add({
            text: f,
            header: !0
          }), this._listControl.add({
            text: ""
          })
        }
        this._listControl.add({
          text: s
        }), this._listControl.add({
          text: o
        }), this._listControl.add({
          text: a
        }), this._listControl.add({
          text: u
        })
      }
    }, h.prototype.asyncUpdateElevationAndSlopeDiff = function () {
      var t = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.FirstPoint),
        n = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint);
      t.onTerrain = this.FirstPoint.onTerrain, n.onTerrain = this.LastPoint.onTerrain;
      var r = Cesium.sampleTerrain(viewer.terrainProvider, i.TerrainMaxLevel, [t, n]);
      Cesium.when(r, e.proxy(function (e) {
        e[0].onTerrain == 0 && (e[0] = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.FirstPoint)), e[1].onTerrain == 0 && (e[1] = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint)), this._elevationDifference = e[1].height - e[0].height;
        var r = u.geoDist2D(t, n);
        this._slopFirstToLast = Cesium.Math.toDegrees(Math.atan2(this._elevationDifference, r)), this.updateDistanceText()
      }, this))
    }, h.prototype.onLeftClick = function (e) {
      if (c.IsMultiGestureNavigation) return;
      var t = {},
        n = viewer.scene.screenToWorld(e.position, t);
      if (n) {
        this._groundDistance = 0;
        var r = this._distancePoints.add({
          position: n,
          image: "img/point_white.png",
          eyeOffset: new Cesium.Cartesian3(0, 0, -5)
        });
        r.position.onTerrain = !Cesium.defined(t.pickPrimitive), this._distancePoints.length == 1 && !r.position.onTerrain && this.ToolContainer.enableButton(3, !1);
        if (this._distancePoints.length > 1) {
          var s = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.BeforeLastPoint),
            o = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint),
            a = u.geoDist(s, o);
          this._totalArealDist += a, this._totalHorizontalDist += u.geoDist2D(s, o), this.asyncUpdateElevationAndSlopeDiff();
          var r = this._distanceLines.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.PolylineGeometry({
                positions: [this.BeforeLastPoint, this.LastPoint],
                ellipsoid: Cesium.Ellipsoid.WGS84,
                vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
                width: 2
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, .3))
              }
            }),
            asynchronous: !1,
            allowPicking: !1,
            appearance: new Cesium.PolylineColorAppearance({})
          }));
          r.positions = [this.BeforeLastPoint, this.LastPoint], r.appearance.renderState.depthTest.enabled = !1, r = this._distanceLines2.add(new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.PolylineGeometry({
                positions: [this.BeforeLastPoint, this.LastPoint],
                ellipsoid: Cesium.Ellipsoid.WGS84,
                vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
                width: 2
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, 1))
              }
            }),
            asynchronous: !1,
            allowPicking: !1,
            appearance: new Cesium.PolylineColorAppearance({})
          })), r.appearance.renderState.depthTest.enabled = !0, this._distanceLabels.add(TerraExplorer.style.segmentBillboardOptions(i.formatDistance(a, !0, !0), this.BeforeLastPoint, this.LastPoint))
        }
        this.updateDistanceText()
      }
    }, h.prototype.isDistanceOnTerrain = function () {
      for (var e = 0; e < this._distancePoints.length; e++)
        if (!this._distancePoints.get(e).onTerrain) return !1;
      return !0
    }, h.prototype.onRightClick = function (e) {}, h.prototype.doWork = function (e) {
      this.calculateGroundDistance(undefined, e)
    }, p.inheritsFrom(Cesium.Cartographic), Cesium.defineProperties(p.prototype, {
      height: {
        get: function () {
          return this._height
        },
        set: function (e) {
          this._height = e, this.onHeightSet != null && this.onHeightSet(this._requestID)
        }
      }
    }), p.prototype.onHeightSet = null, h.prototype.calculateGroundDistance = function (t, n) {
      if (this._distanceLines.length < 1) return -1;
      if (t <= 0 || t == undefined) this._totalArealDist < 100 ? t = .5 : this._totalArealDist < 1e3 ? t = 1 : t = this._totalArealDist / 1e3;
      var r = this._groundDistanceRequestID,
        s = new Array,
        o = viewer.scene.globe.ellipsoid.cartesianToCartographic(this._distanceLines.get(0).positions[0]);
      s.push(new p(o, r));
      for (var a = 0; a < this._distanceLines.length; a++) {
        var f = this._distanceLines.get(a);
        if (f.positions.length != 2) return -1;
        var l = Cesium.Cartesian3.distance(f.positions[0], f.positions[1]),
          c = viewer.scene.globe.ellipsoid.cartesianToCartographic(f.positions[0]),
          h = viewer.scene.globe.ellipsoid.cartesianToCartographic(f.positions[1]);
        if (t > l) {
          s.push(new p(h, r));
          continue
        }
        var d = new Cesium.Cartesian3,
          v = t / l;
        for (var m = v; m < 1; m += v) Cesium.Cartesian3.lerp(f.positions[0], f.positions[1], m, d), s.push(new p(viewer.scene.globe.ellipsoid.cartesianToCartographic(d), r));
        s.push(new p(h, r))
      }
      var g = s.length,
        y = 0,
        b = 0;
      p.prototype.onHeightSet = e.proxy(function (e) {
        if (e != this._groundDistanceRequestID) return;
        y++;
        var t = Math.ceil(y / g * 100);
        t > b && (this.setProgress(y, g), b = t)
      }, this);
      var w = Cesium.sampleTerrain(viewer.terrainProvider, i.TerrainMaxLevel, s);
      Cesium.when(w, e.proxy(function (e) {
        if (r != this._groundDistanceRequestID) return;
        this._groundDistance = 0;
        for (var t = 0; t < e.length - 1; t++) e[t].height == undefined && (e[t].height = 0), e[t + 1].height == undefined && (e[t + 1].height = 0), this._groundDistance += u.geoDist(e[t], e[t + 1]);
        this.setProgress(e.length, e.length), n != undefined && n()
      }, this))
    }, h.prototype.workCompleted = function () {
      this.CancelWork == 0 && this.updateDistanceText(), this._groundDistanceRequestID++
    }, h
  }), define("tools/TETools/AreaTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "internal/Units", "internal/InputMode", "./ProgressTool", "internal/GeometryHelper", "internal/NotificationCenter", "tools/ToolDialog", "tools/ListControl", "internal/Navigate"], function (e, t, n, r, i, s, o, u, a, f, l, c) {
    "use strict";

    function p(e, t, n) {
      this.longitude = e.longitude, this.latitude = e.latitude, this._height = e.height, this._requestID = t, this._vertexIndex = n, this._heightWasSet = !1
    }
    var h = function () {
      this._explanationText = t.i18n("analysis_area_explanation_text"), this._explanationTextOnStartOnly = !0, this._eventListener = null, this._areaPoints = new Cesium.BillboardCollection, viewer.scene.primitives.add(this._areaPoints), this._surfaceTrianglesIds = [], this._areaPolygon = null, this._areaPolygon2 = null, this._surfaceAreaRequestID = 0, this._planeForAreaCalc = null, this._trianglesToDraw = [], this.getId = function () {
        return "AreaTool"
      }, this.getMenuEntry = function () {
        return r.createFor(this, t.i18n("Menu_Analyze_Area"), "./img/newDesign/analyze_area.png", 20, r.MenuEntryAnalyze(), t.i18n("Measurement_Header"))
      }
    };
    return h.inheritsFrom(o), Cesium.defineProperties(h.prototype, {}), h.prototype.reset = function () {
      this._toolContainerText = "", this._listControl != null && this._listControl.removeAll(), this._planeForAreaCalc = null, this._areaPoints.removeAll(), this._areaPolygon != null && (viewer.scene.primitives.remove(this._areaPolygon), this._areaPolygon = null), this._areaPolygon2 != null && (viewer.scene.primitives.remove(this._areaPolygon2), this._areaPolygon2 = null), this.removeSurfaceTriangles(), this._surfaceArea = 0, this._area = 0, this._horizontalArea = 0, this._perimeter = 0, this._trianglesGeometry = null, this._verticeToIndices = [], this._selfIntersect = !1, this._calculating = !1, this.ToolContainer.enableButton(3, !0)
    }, h.prototype.removeSurfaceTriangles = function () {
      this._surfaceTrianglesIds.forEach(function (e) {
        viewer.entities.removeById(e)
      }), this._surfaceTrianglesIds = []
    }, h.prototype.onOpenedToolContainer = function () {
      this._explanationTextOnStartOnly = !1, e(e(".analyzeToolHeaderContainer")[0]).text(t.i18n("Menu_Analyze_Area"))
    }, h.prototype.onClosedToolContainer = function () {
      this._explanationTextOnStartOnly = !0
    }, h.prototype.onBeforeOpenToolContainer = function () {
      return s.Mode = s.MEASUREMENT, e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), this._eventListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas), this._eventListener.setInputAction(e.proxy(this.onLeftClick, this), Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.setInputAction(e.proxy(this.onRightClick, this), Cesium.ScreenSpaceEventType.RIGHT_CLICK), this.parent.onBeforeOpenToolContainer.call(this), this.showNormalButtons(), this.reset(), this._explanationTextOnStartOnly && this._toolContainer.setExplanationText(this._explanationText), a.addObserver(this, "unitsChanged", "TEN_UNITS_CHANGED", null), !0
    }, h.prototype.onBeforeCloseToolContainer = function (e) {
      return this.parent.onBeforeCloseToolContainer.call(this, e), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK), this.reset(), s.Mode = s.FREE_FLIGHT, f.IsOpen && f.close(), a.removeObserver(this, "unitsChanged", "TEN_UNITS_CHANGED", null), !0
    }, h.prototype.showNormalButtons = function () {
      this.ToolContainer.removeButtons(), this.ToolContainer.addButton(1, "./img/delete.png", undefined, t.i18n("measure_area_tooltip_delete")), this.ToolContainer.addButton(2, "./img/delete_last_point.png", undefined, t.i18n("measure_area_tooltip_delete_last_point")), this.ToolContainer.addButton(3, "./img/calc_area.png", undefined, t.i18n("measure_area_tooltip_ground_area"))
    }, h.prototype.unitsChanged = function (e) {
      this.updateAreaText()
    }, h.prototype.onButtonClick = function (e) {
      this.parent.onButtonClick.call(this, e);
      switch (e) {
        case 1:
          this.reset(), this.updateAreaText(), f.IsOpen && f.close();
          break;
        case 2:
          if (this._areaPoints.length > 0) {
            var n = this._areaPoints.get(this._areaPoints.length - 1);
            this._areaPoints.remove(n), this.rebuildPolygon(), this.updateAreaText(), this.removeSurfaceTriangles(), this._areaPoints.length == 0 && this.ToolContainer.enableButton(3, !0)
          }
          break;
        case 3:
          if (this._areaPoints.length > 2) {
            if (this._selfIntersect) {
              alert(t.i18n("measure_area_cannot_calculate_area"));
              return
            }
            this.doWorkAsync()
          }
      }
    }, h.prototype.updateAreaText = function () {
      if (this._surfaceArea == 0 && this._area == 0 && this._horizontalArea == 0 && this._perimeter == 0) this._toolContainerText = "";
      else {
        var n = e("<div style='position:relative;overflow:hidden; width:100%; height:100%;'></div>"),
          r = e("<div id='MessageClientId' style='position:relative; margin-left:5px; margin-top:0px; overflow-y:auto; width:100%;'></div>");
        n.append(r), TerraExplorer.tools.ToolContainer.setText(""), e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), e("#LowerView").append(n), r.css({
          height: n.height()
        }), this._listControl = new l(r), this._listControl.IsAnalyzeToolList = !0;
        var s = t.i18n("measure_area_horizontalArea", {
            area: i.formatArea(this._horizontalArea)
          }),
          o = t.i18n("measure_area_area", {
            area: i.formatArea(this._area)
          }),
          u = t.i18n("measure_area_perimeter", {
            perimeter: i.formatDistance(this._perimeter)
          });
        if (this._surfaceArea > 0) {
          var a = t.i18n("measure_area_ground", {
            gsurface: i.formatArea(this._surfaceArea)
          });
          this._listControl.add({
            text: a,
            header: !0
          }), this._listControl.add({
            text: ""
          })
        }
        this._listControl.add({
          text: o
        }), this._listControl.add({
          text: s
        }), this._listControl.add({
          text: u
        })
      }
    }, h.prototype.onLeftClick = function (e) {
      if (c.IsMultiGestureNavigation) return;
      this.removeSurfaceTriangles(), this._areaPolygon == null && (this._areaPolygon = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonOutlineGeometry({
            polygonHierarchy: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights([0, 0, 0]),
              holes: []
            },
            ellipsoid: Cesium.Ellipsoid.WGS84,
            perPositionHeight: !0,
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, .3))
          }
        }),
        asynchronous: !1,
        allowPicking: !1,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: !0,
          renderState: {
            depthTest: {
              enabled: !1
            },
            lineWidth: 2
          }
        })
      })), this._areaPolygon2 = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonOutlineGeometry({
            polygonHierarchy: {
              positions: Cesium.Cartesian3.fromDegreesArrayHeights([0, 0, 0]),
              holes: []
            },
            ellipsoid: Cesium.Ellipsoid.WGS84,
            perPositionHeight: !0,
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, .3))
          }
        }),
        asynchronous: !1,
        allowPicking: !1,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: !0,
          renderState: {
            depthTest: {
              enabled: !0
            },
            lineWidth: 2
          }
        })
      })));
      var t = {},
        n;
      if (this._planeForAreaCalc == null) n = viewer.scene.screenToWorld(e.position, t);
      else {
        var r = viewer.camera.getPickRay(e.position),
          i = Cesium.IntersectionTests.rayPlane(r, this._planeForAreaCalc);
        i == undefined && (Cesium.Cartesian3.negate(r.direction, r.direction), i = Cesium.IntersectionTests.rayPlane(r, this._planeForAreaCalc)), i != undefined && (n = i)
      }
      if (n) {
        var s = this._areaPoints.add({
          position: n,
          image: "img/point_white.png",
          eyeOffset: new Cesium.Cartesian3(0, 0, -5)
        });
        s.position.onTerrain = !Cesium.defined(t.pickPrimitive), this._areaPoints.length == 1 && !s.position.onTerrain && this.ToolContainer.enableButton(3, !1), this.rebuildPolygon(), this.updateAreaText()
      }
      if (this._areaPoints.length < 3) this._planeForAreaCalc = null;
      else if (this._areaPoints.length == 3) {
        var o = this._areaPoints.get(0).position,
          a = this._areaPoints.get(1).position,
          f = this._areaPoints.get(2).position;
        this._planeForAreaCalc = u.getPlaneFromPoints(o, a, f), this.rebuildPolygon(), this.updateAreaText()
      }
    }, h.prototype.rebuildPolygon = function () {
      this._areaPolygon != null && (viewer.scene.primitives.remove(this._areaPolygon), this._areaPolygon = null, this._surfaceArea = 0), this._areaPolygon2 != null && (viewer.scene.primitives.remove(this._areaPolygon2), this._areaPolygon2 = null, this._surfaceArea = 0);
      var e = [];
      for (var t = 0; t < this._areaPoints.length; t++) e.push(this._areaPoints.get(t).position);
      this._selfIntersect = u.isSelfIntersect(e), this._areaPolygon = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonOutlineGeometry({
            polygonHierarchy: {
              positions: e,
              holes: []
            },
            ellipsoid: Cesium.Ellipsoid.WGS84,
            perPositionHeight: !0,
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(this._selfIntersect ? new Cesium.Color(1, 0, 0, .3) : new Cesium.Color(1, 1, 1, .3))
          }
        }),
        asynchronous: !1,
        allowPicking: !1,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: !0,
          renderState: {
            depthTest: {
              enabled: !1
            },
            lineWidth: Cesium.Math.clamp(2, Cesium.ContextLimits.minimumAliasedLineWidth, Cesium.ContextLimits.maximumAliasedLineWidth)
          }
        })
      })), this._areaPolygon2 = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonOutlineGeometry({
            polygonHierarchy: {
              positions: e,
              holes: []
            },
            ellipsoid: Cesium.Ellipsoid.WGS84,
            perPositionHeight: !0,
            vertexFormat: Cesium.VertexFormat.POSITION_AND_COLOR
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(this._selfIntersect ? new Cesium.Color(1, 0, 0, 1) : new Cesium.Color(1, 1, 1, 1))
          }
        }),
        asynchronous: !1,
        allowPicking: !1,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: !0,
          renderState: {
            depthTest: {
              enabled: !0
            },
            lineWidth: Cesium.Math.clamp(2, Cesium.ContextLimits.minimumAliasedLineWidth, Cesium.ContextLimits.maximumAliasedLineWidth)
          }
        })
      })), this._areaPoints.length < 3 && (this._planeForAreaCalc = null), this._planeForAreaCalc != null && (this._area = u.area3DPlanarPolygon(e, this._planeForAreaCalc)), this._horizontalArea = u.calcArea2D(e), this._perimeter = 0;
      for (var t = 0; t < e.length - 1; t++) this._perimeter += u.geoDist3D(e[t], e[t + 1]);
      this._perimeter += u.geoDist3D(e[e.length - 1], e[0])
    }, h.prototype.onRightClick = function (e) {}, h.prototype.doWork = function (e) {
      this.calculateSurfaceArea(undefined, e)
    }, p.inheritsFrom(Cesium.Cartographic), Cesium.defineProperties(p.prototype, {
      height: {
        get: function () {
          return this._height
        },
        set: function (e) {
          this._height = e, this.onHeightSet != null && (this._heightWasSet = !0, this.onHeightSet(this._requestID, this._vertexIndex))
        }
      }
    }), p.prototype.onHeightSet = null, h.prototype.calculateSurfaceArea = function (t, n) {
      this._surfaceArea = 0, this.updateAreaText(), this._calculating = !0, viewer.scene.preRender.addEventListener(this.onPreFrame, this);
      var r = this._surfaceAreaRequestID,
        s = [];
      for (var o = 0; o < this._areaPoints.length; o++) s.push(this._areaPoints.get(o).position);
      this._trianglesGeometry = u.getGeometrySubdevision(s);
      var a = [],
        f = this._trianglesGeometry.geometry.indices,
        l = this._trianglesGeometry.geometry.attributes.position.values;
      this._verticeToIndices = [];
      for (var o = 0; o < f.length; o++) {
        var c = f[o];
        this._verticeToIndices[c] == undefined && (this._verticeToIndices[c] = []), this._verticeToIndices[c].push(o)
      }
      var h = l.length;
      for (var o = 0; o < h; o += 3) {
        var d = l[o + 0],
          v = l[o + 1],
          m = l[o + 2],
          g = new Cesium.Cartesian3(d, v, m),
          y = viewer.scene.globe.ellipsoid.cartesianToCartographic(g);
        a.push(new p(y, r, o / 3))
      }
      var b = a.length,
        w = {},
        E = 0;
      p.prototype.onHeightSet = e.proxy(function (e, t) {
        if (e != this._surfaceAreaRequestID) return;
        w[t] = 1;
        var n = Object.keys(w).length,
          r = Math.ceil(n / b * 100);
        r > E && (this.setProgress(n, b), E = r), this.prepareTrianglesForDraw(a, t)
      }, this);
      var S = Cesium.sampleTerrain(viewer.terrainProvider, i.TerrainMaxLevel, a);
      Cesium.when(S, e.proxy(function (e) {
        if (r != this._surfaceAreaRequestID) return;
        var t = this._trianglesGeometry.geometry.indices;
        this._surfaceArea = 0;
        var i = [],
          s = t.length;
        for (var o = 0; o < s; o++) {
          e[t[o]].height == undefined && (e[t[o]].height = 0);
          var a = viewer.scene.globe.ellipsoid.cartographicToCartesian(e[t[o]]);
          i.push(a), i.length == 3 && (this._surfaceArea += u.TriArea(i[0], i[1], i[2]), i = [])
        }
        this.setProgress(e.length, e.length), n != undefined && n()
      }, this))
    }, h.prototype.workCompleted = function () {
      this.CancelWork == 0 ? this.updateAreaText() : this.removeSurfaceTriangles(), this._surfaceAreaRequestID++, this._calculating = !1
    }, h.prototype.onPreFrame = function (e, t) {
      this.drawTriangles(), this._calculating == 0 && viewer.scene.preRender.removeEventListener(this.onPreFrame, this)
    }, h.prototype.prepareTrianglesForDraw = function (e, t) {
      var n = this._verticeToIndices[t];
      for (var r = 0; r < n.length; r++) {
        var i = parseInt(n[r] / 3, 10),
          s = e[this._trianglesGeometry.geometry.indices[i * 3 + 0]],
          o = e[this._trianglesGeometry.geometry.indices[i * 3 + 1]],
          u = e[this._trianglesGeometry.geometry.indices[i * 3 + 2]];
        if (s._heightWasSet && o._heightWasSet && u._heightWasSet) {
          var a = !1;
          s.height == undefined && (s.height = 0, a = !0), o.height == undefined && (o.height = 0, a = !0), u.height == undefined && (u.height = 0, a = !0), this._trianglesToDraw.push({
            positions: [viewer.scene.globe.ellipsoid.cartographicToCartesian(s), viewer.scene.globe.ellipsoid.cartographicToCartesian(o), viewer.scene.globe.ellipsoid.cartographicToCartesian(u)],
            missingHightInfo: a
          })
        }
      }
    }, h.prototype.drawTriangles = function () {
      while (this._trianglesToDraw.length > 0) {
        var e = this._trianglesToDraw.pop(),
          t = Cesium.createGuid();
        if (this._surfaceTrianglesIds.indexOf(t) == -1) {
          this._surfaceTrianglesIds.push(t);
          var n = new Cesium.Entity({
            id: t,
            polygon: {
              hierarchy: {
                positions: e.positions,
                holes: []
              },
              perPositionHeight: !0,
              fill: e.missingHightInfo ? !0 : !1,
              material: new Cesium.Color(1, 0, 0, .3),
              outline: !0,
              outlineColor: Cesium.Color.YELLOW,
              outlineWidth: 1
            }
          });
          viewer.entities.add(n)
        }
      }
    }, h
  }),
  function (e) {
    function t(i) {
      var l, h = this,
        p = i.data || {};
      if (p.elem) h = i.dragTarget = p.elem, i.dragProxy = a.proxy || h, i.cursorOffsetX = p.pageX - p.left, i.cursorOffsetY = p.pageY - p.top, i.offsetX = i.pageX - i.cursorOffsetX, i.offsetY = i.pageY - i.cursorOffsetY;
      else if (a.dragging || p.which > 0 && i.which != p.which || e(i.target).is(p.not)) return;
      switch (i.type) {
        case "mousedown":
          return e.extend(p, e(h).offset(), {
            elem: h,
            target: i.target,
            pageX: i.pageX,
            pageY: i.pageY
          }), o.add(document, "mousemove mouseup", t, p), s(h, !1), a.dragging = null, !1;
        case !a.dragging && "mousemove":
          if (r(i.pageX - p.pageX) + r(i.pageY - p.pageY) < p.distance) break;
          i.target = p.target, l = n(i, "dragstart", h), l !== !1 && (a.dragging = h, a.proxy = i.dragProxy = e(l || h)[0]);
        case "mousemove":
          if (a.dragging) {
            if (l = n(i, "drag", h), u.drop && (u.drop.allowed = l !== !1, u.drop.handler(i)), l !== !1) break;
            i.type = "mouseup"
          };
        case "mouseup":
          o.remove(document, "mousemove mouseup", t), a.dragging && (u.drop && u.drop.handler(i), n(i, "dragend", h)), s(h, !0), a.dragging = a.proxy = p.elem = !1
      }
      return !0
    }

    function n(t, n, r) {
      t.type = n;
      var i = e.event.dispatch.call(r, t);
      return i === !1 ? !1 : i || t.result
    }

    function r(e) {
      return Math.pow(e, 2)
    }

    function i() {
      return a.dragging === !1
    }

    function s(e, t) {
      e && (e.unselectable = t ? "off" : "on", e.onselectstart = function () {
        return t
      }, e.style && (e.style.MozUserSelect = t ? "" : "none"))
    }
    e.fn.drag = function (e, t, n) {
      return t && this.bind("dragstart", e), n && this.bind("dragend", n), e ? this.bind("drag", t ? t : e) : this.trigger("drag")
    };
    var o = e.event,
      u = o.special,
      a = u.drag = {
        not: ":input",
        distance: 0,
        which: 1,
        dragging: !1,
        setup: function (n) {
          n = e.extend({
            distance: a.distance,
            which: a.which,
            not: a.not
          }, n || {}), n.distance = r(n.distance), o.add(this, "mousedown", t, n), this.attachEvent && this.attachEvent("ondragstart", i)
        },
        teardown: function () {
          o.remove(this, "mousedown", t), this === a.dragging && (a.dragging = a.proxy = !1), s(this, !0), this.detachEvent && this.detachEvent("ondragstart", i)
        }
      };
    u.dragstart = u.dragend = {
      setup: function () {},
      teardown: function () {}
    }
  }(jQuery),
  function (e) {
    function t(t) {
      var n = t || window.event,
        r = [].slice.call(arguments, 1),
        i = 0,
        s = 0,
        o = 0,
        t = e.event.fix(n);
      return t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), o = i, void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (o = 0, s = -1 * i), void 0 !== n.wheelDeltaY && (o = n.wheelDeltaY / 120), void 0 !== n.wheelDeltaX && (s = -1 * n.wheelDeltaX / 120), r.unshift(t, i, s, o), (e.event.dispatch || e.event.handle).apply(this, r)
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)
      for (var r = n.length; r;) e.event.fixHooks[n[--r]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
      setup: function () {
        if (this.addEventListener)
          for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
        else this.onmousewheel = t
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
        else this.onmousewheel = null
      }
    }, e.fn.extend({
      mousewheel: function (e) {
        return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
      },
      unmousewheel: function (e) {
        return this.unbind("mousewheel", e)
      }
    })
  }(jQuery),
  function (e) {
    function n(t) {
      function n(e, n) {
        var r = t.offset();
        r.left = e.pageX - r.left, r.top = e.pageY - r.top, n ? t.zoomOut({
          center: r
        }) : t.zoom({
          center: r
        })
      }

      function r(e, t) {
        return e.preventDefault(), n(e, t < 0), !1
      }

      function a(e) {
        if (e.which != 1) return !1;
        var n = t.getPlaceholder().css("cursor");
        n && (i = n), t.getPlaceholder().css("cursor", t.getOptions().pan.cursor), s = e.pageX, o = e.pageY
      }

      function f(e) {
        var n = t.getOptions().pan.frameRate;
        if (u || !n) return;
        u = setTimeout(function () {
          t.pan({
            left: s - e.pageX,
            top: o - e.pageY
          }), s = e.pageX, o = e.pageY, u = null
        }, 1 / n * 1e3)
      }

      function l(e) {
        u && (clearTimeout(u), u = null), t.getPlaceholder().css("cursor", i), t.pan({
          left: s - e.pageX,
          top: o - e.pageY
        })
      }

      function c(e, t) {
        var i = e.getOptions();
        i.zoom.interactive && (t[i.zoom.trigger](n), t.mousewheel(r)), i.pan.interactive && (t.bind("dragstart", {
          distance: 10
        }, a), t.bind("drag", f), t.bind("dragend", l))
      }

      function h(e, t) {
        t.unbind(e.getOptions().zoom.trigger, n), t.unbind("mousewheel", r), t.unbind("dragstart", a), t.unbind("drag", f), t.unbind("dragend", l), u && clearTimeout(u)
      }
      var i = "default",
        s = 0,
        o = 0,
        u = null;
      t.zoomOut = function (e) {
        e || (e = {}), e.amount || (e.amount = t.getOptions().zoom.amount), e.amount = 1 / e.amount, t.zoom(e)
      }, t.zoom = function (n) {
        n || (n = {});
        var r = n.center,
          i = n.amount || t.getOptions().zoom.amount,
          s = t.width(),
          o = t.height();
        r || (r = {
          left: s / 2,
          top: o / 2
        });
        var u = r.left / s,
          a = r.top / o,
          f = {
            x: {
              min: r.left - u * s / i,
              max: r.left + (1 - u) * s / i
            },
            y: {
              min: r.top - a * o / i,
              max: r.top + (1 - a) * o / i
            }
          };
        e.each(t.getAxes(), function (e, t) {
          var n = t.options,
            r = f[t.direction].min,
            s = f[t.direction].max,
            o = n.zoomRange,
            u = n.panRange;
          if (o === !1) return;
          r = t.c2p(r), s = t.c2p(s);
          if (r > s) {
            var a = r;
            r = s, s = a
          }
          u && (u[0] != null && r < u[0] && (r = u[0]), u[1] != null && s > u[1] && (s = u[1]));
          var l = s - r;
          if (o && (o[0] != null && l < o[0] && i > 1 || o[1] != null && l > o[1] && i < 1)) return;
          n.min = r, n.max = s
        }), t.setupGrid(), t.draw(), n.preventEvent || t.getPlaceholder().trigger("plotzoom", [t, n])
      }, t.pan = function (n) {
        var r = {
          x: +n.left,
          y: +n.top
        };
        isNaN(r.x) && (r.x = 0), isNaN(r.y) && (r.y = 0), e.each(t.getAxes(), function (e, t) {
          var n = t.options,
            i, s, o = r[t.direction];
          i = t.c2p(t.p2c(t.min) + o), s = t.c2p(t.p2c(t.max) + o);
          var u = n.panRange;
          if (u === !1) return;
          u && (u[0] != null && u[0] > i && (o = u[0] - i, i += o, s += o), u[1] != null && u[1] < s && (o = u[1] - s, i += o, s += o)), n.min = i, n.max = s
        }), t.setupGrid(), t.draw(), n.preventEvent || t.getPlaceholder().trigger("plotpan", [t, n])
      }, t.hooks.bindEvents.push(c), t.hooks.shutdown.push(h)
    }
    var t = {
      xaxis: {
        zoomRange: null,
        panRange: null
      },
      zoom: {
        interactive: !1,
        trigger: "dblclick",
        amount: 1.5
      },
      pan: {
        interactive: !1,
        cursor: "move",
        frameRate: 20
      }
    };
    e.plot.plugins.push({
      init: n,
      options: t,
      name: "navigate",
      version: "1.3"
    })
  }(jQuery), define("flot/jquery.flot.navigate.min", function () {}),
  function (e, t) {
    function n(t, n) {
      var i, s, o, u = t.nodeName.toLowerCase();
      return "area" === u ? (i = t.parentNode, s = i.name, t.href && s && "map" === i.nodeName.toLowerCase() ? (o = e("img[usemap=#" + s + "]")[0], !!o && r(o)) : !1) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && r(t)
    }

    function r(t) {
      return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function () {
        return "hidden" === e.css(this, "visibility")
      }).length
    }
    var i = 0,
      s = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, {
      version: "1.10.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }
    }), e.fn.extend({
      focus: function (t) {
        return function (n, r) {
          return "number" == typeof n ? this.each(function () {
            var t = this;
            setTimeout(function () {
              e(t).focus(), r && r.call(t)
            }, n)
          }) : t.apply(this, arguments)
        }
      }(e.fn.focus),
      scrollParent: function () {
        var t;
        return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
          return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
        }).eq(0) : this.parents().filter(function () {
          return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
        }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
      },
      zIndex: function (n) {
        if (n !== t) return this.css("zIndex", n);
        if (this.length)
          for (var r, i, s = e(this[0]); s.length && s[0] !== document;) {
            if (r = s.css("position"), ("absolute" === r || "relative" === r || "fixed" === r) && (i = parseInt(s.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            s = s.parent()
          }
        return 0
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++i)
        })
      },
      removeUniqueId: function () {
        return this.each(function () {
          s.test(this.id) && e(this).removeAttr("id")
        })
      }
    }), e.extend(e.expr[":"], {
      data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
        return function (n) {
          return !!e.data(n, t)
        }
      }) : function (t, n, r) {
        return !!e.data(t, r[3])
      },
      focusable: function (t) {
        return n(t, !isNaN(e.attr(t, "tabindex")))
      },
      tabbable: function (t) {
        var r = e.attr(t, "tabindex"),
          i = isNaN(r);
        return (i || r >= 0) && n(t, !i)
      }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) {
      function i(t, n, r, i) {
        return e.each(s, function () {
          n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), i && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
        }), n
      }
      var s = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
        o = r.toLowerCase(),
        u = {
          innerWidth: e.fn.innerWidth,
          innerHeight: e.fn.innerHeight,
          outerWidth: e.fn.outerWidth,
          outerHeight: e.fn.outerHeight
        };
      e.fn["inner" + r] = function (n) {
        return n === t ? u["inner" + r].call(this) : this.each(function () {
          e(this).css(o, i(this, n) + "px")
        })
      }, e.fn["outer" + r] = function (t, n) {
        return "number" != typeof t ? u["outer" + r].call(this, t) : this.each(function () {
          e(this).css(o, i(this, t, !0, n) + "px")
        })
      }
    }), e.fn.addBack || (e.fn.addBack = function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
      return function (n) {
        return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
      }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
      disableSelection: function () {
        return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
          e.preventDefault()
        })
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection")
      }
    }), e.extend(e.ui, {
      plugin: {
        add: function (t, n, r) {
          var i, s = e.ui[t].prototype;
          for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
        },
        call: function (e, t, n) {
          var r, i = e.plugins[t];
          if (i && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
            for (r = 0; i.length > r; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
        }
      },
      hasScroll: function (t, n) {
        if ("hidden" === e(t).css("overflow")) return !1;
        var r = n && "left" === n ? "scrollLeft" : "scrollTop",
          i = !1;
        return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
      }
    })
  }(jQuery),
  function (e, t) {
    var n = 0,
      r = Array.prototype.slice,
      i = e.cleanData;
    e.cleanData = function (t) {
      for (var n, r = 0; null != (n = t[r]); r++) try {
        e(n).triggerHandler("remove")
      } catch (s) {}
      i(t)
    }, e.widget = function (n, r, i) {
      var s, o, u, a, f = {},
        l = n.split(".")[0];
      n = n.split(".")[1], s = l + "-" + n, i || (i = r, r = e.Widget), e.expr[":"][s.toLowerCase()] = function (t) {
        return !!e.data(t, s)
      }, e[l] = e[l] || {}, o = e[l][n], u = e[l][n] = function (e, n) {
        return this._createWidget ? (arguments.length && this._createWidget(e, n), t) : new u(e, n)
      }, e.extend(u, o, {
        version: i.version,
        _proto: e.extend({}, i),
        _childConstructors: []
      }), a = new r, a.options = e.widget.extend({}, a.options), e.each(i, function (n, i) {
        return e.isFunction(i) ? (f[n] = function () {
          var e = function () {
              return r.prototype[n].apply(this, arguments)
            },
            t = function (e) {
              return r.prototype[n].apply(this, e)
            };
          return function () {
            var n, r = this._super,
              s = this._superApply;
            return this._super = e, this._superApply = t, n = i.apply(this, arguments), this._super = r, this._superApply = s, n
          }
        }(), t) : (f[n] = i, t)
      }), u.prototype = e.widget.extend(a, {
        widgetEventPrefix: o ? a.widgetEventPrefix || n : n
      }, f, {
        constructor: u,
        namespace: l,
        widgetName: n,
        widgetFullName: s
      }), o ? (e.each(o._childConstructors, function (t, n) {
        var r = n.prototype;
        e.widget(r.namespace + "." + r.widgetName, u, n._proto)
      }), delete o._childConstructors) : r._childConstructors.push(u), e.widget.bridge(n, u)
    }, e.widget.extend = function (n) {
      for (var i, o, u = r.call(arguments, 1), a = 0, f = u.length; f > a; a++)
        for (i in u[a]) o = u[a][i], u[a].hasOwnProperty(i) && o !== t && (n[i] = e.isPlainObject(o) ? e.isPlainObject(n[i]) ? e.widget.extend({}, n[i], o) : e.widget.extend({}, o) : o);
      return n
    }, e.widget.bridge = function (n, i) {
      var o = i.prototype.widgetFullName || n;
      e.fn[n] = function (u) {
        var a = "string" == typeof u,
          f = r.call(arguments, 1),
          l = this;
        return u = !a && f.length ? e.widget.extend.apply(null, [u].concat(f)) : u, a ? this.each(function () {
          var r, i = e.data(this, o);
          return i ? e.isFunction(i[u]) && "_" !== u.charAt(0) ? (r = i[u].apply(i, f), r !== i && r !== t ? (l = r && r.jquery ? l.pushStack(r.get()) : r, !1) : t) : e.error("no such method '" + u + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + u + "'")
        }) : this.each(function () {
          var t = e.data(this, o);
          t ? t.option(u || {})._init() : e.data(this, o, new i(u, this))
        }), l
      }
    }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: {
        disabled: !1,
        create: null
      },
      _createWidget: function (t, r) {
        r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
          remove: function (e) {
            e.target === r && this.destroy()
          }
        }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
      },
      _getCreateOptions: e.noop,
      _getCreateEventData: e.noop,
      _create: e.noop,
      _init: e.noop,
      destroy: function () {
        this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
      },
      _destroy: e.noop,
      widget: function () {
        return this.element
      },
      option: function (n, r) {
        var i, s, o, u = n;
        if (0 === arguments.length) return e.widget.extend({}, this.options);
        if ("string" == typeof n)
          if (u = {}, i = n.split("."), n = i.shift(), i.length) {
            for (s = u[n] = e.widget.extend({}, this.options[n]), o = 0; i.length - 1 > o; o++) s[i[o]] = s[i[o]] || {}, s = s[i[o]];
            if (n = i.pop(), 1 === arguments.length) return s[n] === t ? null : s[n];
            s[n] = r
          } else {
            if (1 === arguments.length) return this.options[n] === t ? null : this.options[n];
            u[n] = r
          } return this._setOptions(u), this
      },
      _setOptions: function (e) {
        var t;
        for (t in e) this._setOption(t, e[t]);
        return this
      },
      _setOption: function (e, t) {
        return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
      },
      enable: function () {
        return this._setOption("disabled", !1)
      },
      disable: function () {
        return this._setOption("disabled", !0)
      },
      _on: function (n, r, i) {
        var s, o = this;
        "boolean" != typeof n && (i = r, r = n, n = !1), i ? (r = s = e(r), this.bindings = this.bindings.add(r)) : (i = r, r = this.element, s = this.widget()), e.each(i, function (i, u) {
          function f() {
            return n || o.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof u ? o[u] : u).apply(o, arguments) : t
          }
          "string" != typeof u && (f.guid = u.guid = u.guid || f.guid || e.guid++);
          var l = i.match(/^(\w+)\s*(.*)$/),
            c = l[1] + o.eventNamespace,
            h = l[2];
          h ? s.delegate(h, c, f) : r.bind(c, f)
        })
      },
      _off: function (e, t) {
        t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
      },
      _delay: function (e, t) {
        function n() {
          return ("string" == typeof e ? r[e] : e).apply(r, arguments)
        }
        var r = this;
        return setTimeout(n, t || 0)
      },
      _hoverable: function (t) {
        this.hoverable = this.hoverable.add(t), this._on(t, {
          mouseenter: function (t) {
            e(t.currentTarget).addClass("ui-state-hover")
          },
          mouseleave: function (t) {
            e(t.currentTarget).removeClass("ui-state-hover")
          }
        })
      },
      _focusable: function (t) {
        this.focusable = this.focusable.add(t), this._on(t, {
          focusin: function (t) {
            e(t.currentTarget).addClass("ui-state-focus")
          },
          focusout: function (t) {
            e(t.currentTarget).removeClass("ui-state-focus")
          }
        })
      },
      _trigger: function (t, n, r) {
        var i, s, o = this.options[t];
        if (r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent)
          for (i in s) i in n || (n[i] = s[i]);
        return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
      }
    }, e.each({
      show: "fadeIn",
      hide: "fadeOut"
    }, function (t, n) {
      e.Widget.prototype["_" + t] = function (r, i, s) {
        "string" == typeof i && (i = {
          effect: i
        });
        var o, u = i ? i === !0 || "number" == typeof i ? n : i.effect || n : t;
        i = i || {}, "number" == typeof i && (i = {
          duration: i
        }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && e.effects.effect[u] ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function (n) {
          e(this)[t](), s && s.call(r[0]), n()
        })
      }
    })
  }(jQuery),
  function (e) {
    var t = !1;
    e(document).mouseup(function () {
      t = !1
    }), e.widget("ui.mouse", {
      version: "1.10.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0
      },
      _mouseInit: function () {
        var t = this;
        this.element.bind("mousedown." + this.widgetName, function (e) {
          return t._mouseDown(e)
        }).bind("click." + this.widgetName, function (n) {
          return !0 === e.data(n.target, t.widgetName + ".preventClickEvent") ? (e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1) : undefined
        }), this.started = !1
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
      },
      _mouseDown: function (n) {
        if (!t) {
          this._mouseStarted && this._mouseUp(n), this._mouseDownEvent = n;
          var r = this,
            i = 1 === n.which,
            s = "string" == typeof this.options.cancel && n.target.nodeName ? e(n.target).closest(this.options.cancel).length : !1;
          return i && !s && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
            r.mouseDelayMet = !0
          }, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, !this._mouseStarted) ? (n.preventDefault(), !0) : (!0 === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
            return r._mouseMove(e)
          }, this._mouseUpDelegate = function (e) {
            return r._mouseUp(e)
          }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), n.preventDefault(), t = !0, !0)) : !0
        }
      },
      _mouseMove: function (t) {
        return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
      },
      _mouseUp: function (t) {
        return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
      },
      _mouseDistanceMet: function (e) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0
      }
    })
  }(jQuery),
  function (e) {
    function t(e) {
      return parseInt(e, 10) || 0
    }

    function n(e) {
      return !isNaN(parseInt(e, 10))
    }
    e.widget("ui.resizable", e.ui.mouse, {
      version: "1.10.4",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null
      },
      _create: function () {
        var t, n, r, i, s, o = this,
          u = this.options;
        if (this.element.addClass("ui-resizable"), e.extend(this, {
            _aspectRatio: !!u.aspectRatio,
            aspectRatio: u.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper: u.helper || u.ghost || u.animate ? u.helper || "ui-resizable-helper" : null
          }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
            position: this.element.css("position"),
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
            top: this.element.css("top"),
            left: this.element.css("left")
          })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
            marginLeft: this.originalElement.css("marginLeft"),
            marginTop: this.originalElement.css("marginTop"),
            marginRight: this.originalElement.css("marginRight"),
            marginBottom: this.originalElement.css("marginBottom")
          }), this.originalElement.css({
            marginLeft: 0,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0
          }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
            position: "static",
            zoom: 1,
            display: "block"
          })), this.originalElement.css({
            margin: this.originalElement.css("margin")
          }), this._proportionallyResize()), this.handles = u.handles || (e(".ui-resizable-handle", this.element).length ? {
            n: ".ui-resizable-n",
            e: ".ui-resizable-e",
            s: ".ui-resizable-s",
            w: ".ui-resizable-w",
            se: ".ui-resizable-se",
            sw: ".ui-resizable-sw",
            ne: ".ui-resizable-ne",
            nw: ".ui-resizable-nw"
          } : "e,s,se"), this.handles.constructor === String)
          for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, n = 0; t.length > n; n++) r = e.trim(t[n]), s = "ui-resizable-" + r, i = e("<div class='ui-resizable-handle " + s + "'></div>"), i.css({
            zIndex: u.zIndex
          }), "se" === r && i.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[r] = ".ui-resizable-" + r, this.element.append(i);
        this._renderAxis = function (t) {
          var n, r, i, s;
          t = t || this.element;
          for (n in this.handles) this.handles[n].constructor === String && (this.handles[n] = e(this.handles[n], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (r = e(this.handles[n], this.element), s = /sw|ne|nw|se|n|s/.test(n) ? r.outerHeight() : r.outerWidth(), i = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join(""), t.css(i, s), this._proportionallyResize()), e(this.handles[n]).length
        }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
          o.resizing || (this.className && (i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = i && i[1] ? i[1] : "se")
        }), u.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
          u.disabled || (e(this).removeClass("ui-resizable-autohide"), o._handles.show())
        }).mouseleave(function () {
          u.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"), o._handles.hide())
        })), this._mouseInit()
      },
      _destroy: function () {
        this._mouseDestroy();
        var t, n = function (t) {
          e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
        };
        return this.elementIsWrapper && (n(this.element), t = this.element, this.originalElement.css({
          position: t.css("position"),
          width: t.outerWidth(),
          height: t.outerHeight(),
          top: t.css("top"),
          left: t.css("left")
        }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), n(this.originalElement), this
      },
      _mouseCapture: function (t) {
        var n, r, i = !1;
        for (n in this.handles) r = e(this.handles[n])[0], (r === t.target || e.contains(r, t.target)) && (i = !0);
        return !this.options.disabled && i
      },
      _mouseStart: function (n) {
        var r, i, s, o = this.options,
          u = this.element.position(),
          a = this.element;
        return this.resizing = !0, /absolute/.test(a.css("position")) ? a.css({
          position: "absolute",
          top: a.css("top"),
          left: a.css("left")
        }) : a.is(".ui-draggable") && a.css({
          position: "absolute",
          top: u.top,
          left: u.left
        }), this._renderProxy(), r = t(this.helper.css("left")), i = t(this.helper.css("top")), o.containment && (r += e(o.containment).scrollLeft() || 0, i += e(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
          left: r,
          top: i
        }, this.size = this._helper ? {
          width: this.helper.width(),
          height: this.helper.height()
        } : {
          width: a.width(),
          height: a.height()
        }, this.originalSize = this._helper ? {
          width: a.outerWidth(),
          height: a.outerHeight()
        } : {
          width: a.width(),
          height: a.height()
        }, this.originalPosition = {
          left: r,
          top: i
        }, this.sizeDiff = {
          width: a.outerWidth() - a.width(),
          height: a.outerHeight() - a.height()
        }, this.originalMousePosition = {
          left: n.pageX,
          top: n.pageY
        }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), a.addClass("ui-resizable-resizing"), this._propagate("start", n), !0
      },
      _mouseDrag: function (t) {
        var n, r = this.helper,
          i = {},
          s = this.originalMousePosition,
          o = this.axis,
          u = this.position.top,
          a = this.position.left,
          f = this.size.width,
          l = this.size.height,
          c = t.pageX - s.left || 0,
          h = t.pageY - s.top || 0,
          p = this._change[o];
        return p ? (n = p.apply(this, [t, c, h]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (n = this._updateRatio(n, t)), n = this._respectSize(n, t), this._updateCache(n), this._propagate("resize", t), this.position.top !== u && (i.top = this.position.top + "px"), this.position.left !== a && (i.left = this.position.left + "px"), this.size.width !== f && (i.width = this.size.width + "px"), this.size.height !== l && (i.height = this.size.height + "px"), r.css(i), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(i) || this._trigger("resize", t, this.ui()), !1) : !1
      },
      _mouseStop: function (t) {
        this.resizing = !1;
        var n, r, i, s, o, u, a, f = this.options,
          l = this;
        return this._helper && (n = this._proportionallyResizeElements, r = n.length && /textarea/i.test(n[0].nodeName), i = r && e.ui.hasScroll(n[0], "left") ? 0 : l.sizeDiff.height, s = r ? 0 : l.sizeDiff.width, o = {
          width: l.helper.width() - s,
          height: l.helper.height() - i
        }, u = parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left) || null, a = parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top) || null, f.animate || this.element.css(e.extend(o, {
          top: a,
          left: u
        })), l.helper.height(l.size.height), l.helper.width(l.size.width), this._helper && !f.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
      },
      _updateVirtualBoundaries: function (e) {
        var t, r, s, o, u, a = this.options;
        u = {
          minWidth: n(a.minWidth) ? a.minWidth : 0,
          maxWidth: n(a.maxWidth) ? a.maxWidth : 1 / 0,
          minHeight: n(a.minHeight) ? a.minHeight : 0,
          maxHeight: n(a.maxHeight) ? a.maxHeight : 1 / 0
        }, (this._aspectRatio || e) && (t = u.minHeight * this.aspectRatio, s = u.minWidth / this.aspectRatio, r = u.maxHeight * this.aspectRatio, o = u.maxWidth / this.aspectRatio, t > u.minWidth && (u.minWidth = t), s > u.minHeight && (u.minHeight = s), u.maxWidth > r && (u.maxWidth = r), u.maxHeight > o && (u.maxHeight = o)), this._vBoundaries = u
      },
      _updateCache: function (e) {
        this.offset = this.helper.offset(), n(e.left) && (this.position.left = e.left), n(e.top) && (this.position.top = e.top), n(e.height) && (this.size.height = e.height), n(e.width) && (this.size.width = e.width)
      },
      _updateRatio: function (e) {
        var t = this.position,
          r = this.size,
          s = this.axis;
        return n(e.height) ? e.width = e.height * this.aspectRatio : n(e.width) && (e.height = e.width / this.aspectRatio), "sw" === s && (e.left = t.left + (r.width - e.width), e.top = null), "nw" === s && (e.top = t.top + (r.height - e.height), e.left = t.left + (r.width - e.width)), e
      },
      _respectSize: function (e) {
        var t = this._vBoundaries,
          r = this.axis,
          s = n(e.width) && t.maxWidth && t.maxWidth < e.width,
          o = n(e.height) && t.maxHeight && t.maxHeight < e.height,
          u = n(e.width) && t.minWidth && t.minWidth > e.width,
          a = n(e.height) && t.minHeight && t.minHeight > e.height,
          f = this.originalPosition.left + this.originalSize.width,
          l = this.position.top + this.size.height,
          c = /sw|nw|w/.test(r),
          h = /nw|ne|n/.test(r);
        return u && (e.width = t.minWidth), a && (e.height = t.minHeight), s && (e.width = t.maxWidth), o && (e.height = t.maxHeight), u && c && (e.left = f - t.minWidth), s && c && (e.left = f - t.maxWidth), a && h && (e.top = l - t.minHeight), o && h && (e.top = l - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length) {
          var e, t, n, r, i, s = this.helper || this.element;
          for (e = 0; this._proportionallyResizeElements.length > e; e++) {
            if (i = this._proportionallyResizeElements[e], !this.borderDif)
              for (this.borderDif = [], n = [i.css("borderTopWidth"), i.css("borderRightWidth"), i.css("borderBottomWidth"), i.css("borderLeftWidth")], r = [i.css("paddingTop"), i.css("paddingRight"), i.css("paddingBottom"), i.css("paddingLeft")], t = 0; n.length > t; t++) this.borderDif[t] = (parseInt(n[t], 10) || 0) + (parseInt(r[t], 10) || 0);
            i.css({
              height: s.height() - this.borderDif[0] - this.borderDif[2] || 0,
              width: s.width() - this.borderDif[1] - this.borderDif[3] || 0
            })
          }
        }
      },
      _renderProxy: function () {
        var t = this.element,
          n = this.options;
        this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
          width: this.element.outerWidth() - 1,
          height: this.element.outerHeight() - 1,
          position: "absolute",
          left: this.elementOffset.left + "px",
          top: this.elementOffset.top + "px",
          zIndex: ++n.zIndex
        }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
      },
      _change: {
        e: function (e, t) {
          return {
            width: this.originalSize.width + t
          }
        },
        w: function (e, t) {
          var n = this.originalSize,
            r = this.originalPosition;
          return {
            left: r.left + t,
            width: n.width - t
          }
        },
        n: function (e, t, n) {
          var r = this.originalSize,
            i = this.originalPosition;
          return {
            top: i.top + n,
            height: r.height - n
          }
        },
        s: function (e, t, n) {
          return {
            height: this.originalSize.height + n
          }
        },
        se: function (t, n, r) {
          return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
        },
        sw: function (t, n, r) {
          return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
        },
        ne: function (t, n, r) {
          return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
        },
        nw: function (t, n, r) {
          return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
        }
      },
      _propagate: function (t, n) {
        e.ui.plugin.call(this, t, [n, this.ui()]), "resize" !== t && this._trigger(t, n, this.ui())
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition
        }
      }
    }), e.ui.plugin.add("resizable", "animate", {
      stop: function (t) {
        var n = e(this).data("ui-resizable"),
          r = n.options,
          i = n._proportionallyResizeElements,
          s = i.length && /textarea/i.test(i[0].nodeName),
          o = s && e.ui.hasScroll(i[0], "left") ? 0 : n.sizeDiff.height,
          u = s ? 0 : n.sizeDiff.width,
          a = {
            width: n.size.width - u,
            height: n.size.height - o
          },
          f = parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left) || null,
          l = parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top) || null;
        n.element.animate(e.extend(a, l && f ? {
          top: l,
          left: f
        } : {}), {
          duration: r.animateDuration,
          easing: r.animateEasing,
          step: function () {
            var r = {
              width: parseInt(n.element.css("width"), 10),
              height: parseInt(n.element.css("height"), 10),
              top: parseInt(n.element.css("top"), 10),
              left: parseInt(n.element.css("left"), 10)
            };
            i && i.length && e(i[0]).css({
              width: r.width,
              height: r.height
            }), n._updateCache(r), n._propagate("resize", t)
          }
        })
      }
    }), e.ui.plugin.add("resizable", "containment", {
      start: function () {
        var n, r, i, s, o, u, a, f = e(this).data("ui-resizable"),
          l = f.options,
          c = f.element,
          h = l.containment,
          p = h instanceof e ? h.get(0) : /parent/.test(h) ? c.parent().get(0) : h;
        p && (f.containerElement = e(p), /document/.test(h) || h === document ? (f.containerOffset = {
          left: 0,
          top: 0
        }, f.containerPosition = {
          left: 0,
          top: 0
        }, f.parentData = {
          element: e(document),
          left: 0,
          top: 0,
          width: e(document).width(),
          height: e(document).height() || document.body.parentNode.scrollHeight
        }) : (n = e(p), r = [], e(["Top", "Right", "Left", "Bottom"]).each(function (e, i) {
          r[e] = t(n.css("padding" + i))
        }), f.containerOffset = n.offset(), f.containerPosition = n.position(), f.containerSize = {
          height: n.innerHeight() - r[3],
          width: n.innerWidth() - r[1]
        }, i = f.containerOffset, s = f.containerSize.height, o = f.containerSize.width, u = e.ui.hasScroll(p, "left") ? p.scrollWidth : o, a = e.ui.hasScroll(p) ? p.scrollHeight : s, f.parentData = {
          element: p,
          left: i.left,
          top: i.top,
          width: u,
          height: a
        }))
      },
      resize: function (t) {
        var n, r, i, s, o = e(this).data("ui-resizable"),
          u = o.options,
          a = o.containerOffset,
          f = o.position,
          l = o._aspectRatio || t.shiftKey,
          c = {
            top: 0,
            left: 0
          },
          h = o.containerElement;
        h[0] !== document && /static/.test(h.css("position")) && (c = a), f.left < (o._helper ? a.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - a.left : o.position.left - c.left), l && (o.size.height = o.size.width / o.aspectRatio), o.position.left = u.helper ? a.left : 0), f.top < (o._helper ? a.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - a.top : o.position.top), l && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? a.top : 0), o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top, n = Math.abs((o._helper ? o.offset.left - c.left : o.offset.left - c.left) + o.sizeDiff.width), r = Math.abs((o._helper ? o.offset.top - c.top : o.offset.top - a.top) + o.sizeDiff.height), i = o.containerElement.get(0) === o.element.parent().get(0), s = /relative|absolute/.test(o.containerElement.css("position")), i && s && (n -= Math.abs(o.parentData.left)), n + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - n, l && (o.size.height = o.size.width / o.aspectRatio)), r + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - r, l && (o.size.width = o.size.height * o.aspectRatio))
      },
      stop: function () {
        var t = e(this).data("ui-resizable"),
          n = t.options,
          r = t.containerOffset,
          i = t.containerPosition,
          s = t.containerElement,
          o = e(t.helper),
          u = o.offset(),
          a = o.outerWidth() - t.sizeDiff.width,
          f = o.outerHeight() - t.sizeDiff.height;
        t._helper && !n.animate && /relative/.test(s.css("position")) && e(this).css({
          left: u.left - i.left - r.left,
          width: a,
          height: f
        }), t._helper && !n.animate && /static/.test(s.css("position")) && e(this).css({
          left: u.left - i.left - r.left,
          width: a,
          height: f
        })
      }
    }), e.ui.plugin.add("resizable", "alsoResize", {
      start: function () {
        var t = e(this).data("ui-resizable"),
          n = t.options,
          r = function (t) {
            e(t).each(function () {
              var t = e(this);
              t.data("ui-resizable-alsoresize", {
                width: parseInt(t.width(), 10),
                height: parseInt(t.height(), 10),
                left: parseInt(t.css("left"), 10),
                top: parseInt(t.css("top"), 10)
              })
            })
          };
        "object" != typeof n.alsoResize || n.alsoResize.parentNode ? r(n.alsoResize) : n.alsoResize.length ? (n.alsoResize = n.alsoResize[0], r(n.alsoResize)) : e.each(n.alsoResize, function (e) {
          r(e)
        })
      },
      resize: function (t, n) {
        var r = e(this).data("ui-resizable"),
          i = r.options,
          s = r.originalSize,
          o = r.originalPosition,
          u = {
            height: r.size.height - s.height || 0,
            width: r.size.width - s.width || 0,
            top: r.position.top - o.top || 0,
            left: r.position.left - o.left || 0
          },
          a = function (t, r) {
            e(t).each(function () {
              var t = e(this),
                i = e(this).data("ui-resizable-alsoresize"),
                s = {},
                o = r && r.length ? r : t.parents(n.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
              e.each(o, function (e, t) {
                var n = (i[t] || 0) + (u[t] || 0);
                n && n >= 0 && (s[t] = n || null)
              }), t.css(s)
            })
          };
        "object" != typeof i.alsoResize || i.alsoResize.nodeType ? a(i.alsoResize) : e.each(i.alsoResize, function (e, t) {
          a(e, t)
        })
      },
      stop: function () {
        e(this).removeData("resizable-alsoresize")
      }
    }), e.ui.plugin.add("resizable", "ghost", {
      start: function () {
        var t = e(this).data("ui-resizable"),
          n = t.options,
          r = t.size;
        t.ghost = t.originalElement.clone(), t.ghost.css({
          opacity: .25,
          display: "block",
          position: "relative",
          height: r.height,
          width: r.width,
          margin: 0,
          left: 0,
          top: 0
        }).addClass("ui-resizable-ghost").addClass("string" == typeof n.ghost ? n.ghost : ""), t.ghost.appendTo(t.helper)
      },
      resize: function () {
        var t = e(this).data("ui-resizable");
        t.ghost && t.ghost.css({
          position: "relative",
          height: t.size.height,
          width: t.size.width
        })
      },
      stop: function () {
        var t = e(this).data("ui-resizable");
        t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
      }
    }), e.ui.plugin.add("resizable", "grid", {
      resize: function () {
        var t = e(this).data("ui-resizable"),
          n = t.options,
          r = t.size,
          i = t.originalSize,
          s = t.originalPosition,
          o = t.axis,
          u = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
          a = u[0] || 1,
          f = u[1] || 1,
          l = Math.round((r.width - i.width) / a) * a,
          c = Math.round((r.height - i.height) / f) * f,
          h = i.width + l,
          p = i.height + c,
          d = n.maxWidth && h > n.maxWidth,
          v = n.maxHeight && p > n.maxHeight,
          m = n.minWidth && n.minWidth > h,
          g = n.minHeight && n.minHeight > p;
        n.grid = u, m && (h += a), g && (p += f), d && (h -= a), v && (p -= f), /^(se|s|e)$/.test(o) ? (t.size.width = h, t.size.height = p) : /^(ne)$/.test(o) ? (t.size.width = h, t.size.height = p, t.position.top = s.top - c) : /^(sw)$/.test(o) ? (t.size.width = h, t.size.height = p, t.position.left = s.left - l) : (p - f > 0 ? (t.size.height = p, t.position.top = s.top - c) : (t.size.height = f, t.position.top = s.top + i.height - f), h - a > 0 ? (t.size.width = h, t.position.left = s.left - l) : (t.size.width = a, t.position.left = s.left + i.width - a))
      }
    })
  }(jQuery), define("flot/jquery-ui-1.10.4.custom.min", function () {}),
  function (e, t, n) {
    "$:nomunge";

    function p(n) {
      o === !0 && (o = n || 1);
      for (var u = r.length - 1; u >= 0; u--) {
        var c = e(r[u]);
        if (c[0] == t || c.is(":visible")) {
          var h = c.width(),
            d = c.height(),
            v = c.data(f);
          v && (h !== v.w || d !== v.h) && (c.trigger(a, [v.w = h, v.h = d]), o = n || !0)
        } else v = c.data(f), v.w = 0, v.h = 0
      }
      s !== null && (o && (n == null || n - o < 1e3) ? s = t.requestAnimationFrame(p) : (s = setTimeout(p, i[l]), o = !1))
    }
    var r = [],
      i = e.resize = e.extend(e.resize, {}),
      s, o = !1,
      u = "setTimeout",
      a = "resize",
      f = a + "-special-event",
      l = "pendingDelay",
      c = "activeDelay",
      h = "throttleWindow";
    i[l] = 200, i[c] = 20, i[h] = !0, e.event.special[a] = {
      setup: function () {
        if (!i[h] && this[u]) return !1;
        var t = e(this);
        r.push(this), t.data(f, {
          w: t.width(),
          h: t.height()
        }), r.length === 1 && (s = n, p())
      },
      teardown: function () {
        if (!i[h] && this[u]) return !1;
        var t = e(this);
        for (var n = r.length - 1; n >= 0; n--)
          if (r[n] == this) {
            r.splice(n, 1);
            break
          } t.removeData(f), r.length || (o ? cancelAnimationFrame(s) : clearTimeout(s), s = null)
      },
      add: function (t) {
        function s(t, i, s) {
          var o = e(this),
            u = o.data(f) || {};
          u.w = i !== n ? i : o.width(), u.h = s !== n ? s : o.height(), r.apply(this, arguments)
        }
        if (!i[h] && this[u]) return !1;
        var r;
        if (e.isFunction(t)) return r = t, s;
        r = t.handler, t.handler = s
      }
    }, t.requestAnimationFrame || (t.requestAnimationFrame = function () {
      return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e, n) {
        return t.setTimeout(function () {
          e((new Date).getTime())
        }, i[c])
      }
    }()), t.cancelAnimationFrame || (t.cancelAnimationFrame = function () {
      return t.webkitCancelRequestAnimationFrame || t.mozCancelRequestAnimationFrame || t.oCancelRequestAnimationFrame || t.msCancelRequestAnimationFrame || clearTimeout
    }())
  }(jQuery, this),
  function (e) {
    function n(e) {
      function t() {
        var t = e.getPlaceholder();
        if (t.width() == 0 || t.height() == 0) return;
        e.resize(), e.setupGrid(), e.draw()
      }

      function n(e, n) {
        e.getPlaceholder().resize(t)
      }

      function r(e, n) {
        e.getPlaceholder().unbind("resize", t)
      }
      e.hooks.bindEvents.push(n), e.hooks.shutdown.push(r)
    }
    var t = {};
    e.plot.plugins.push({
      init: n,
      options: t,
      name: "resize",
      version: "1.0"
    })
  }(jQuery), define("flot/jquery.flot.resize.min", function () {}),
  function (e) {
    function t(e, t, n) {
      var r = {
          square: function (e, t, n, r, i) {
            var s = r * Math.sqrt(Math.PI) / 2;
            e.rect(t - s, n - s, s + s, s + s)
          },
          diamond: function (e, t, n, r, i) {
            var s = r * Math.sqrt(Math.PI / 2);
            e.moveTo(t - s, n), e.lineTo(t, n - s), e.lineTo(t + s, n), e.lineTo(t, n + s), e.lineTo(t - s, n)
          },
          triangle: function (e, t, n, r, i) {
            var s = r * Math.sqrt(2 * Math.PI / Math.sin(Math.PI / 3)),
              o = s * Math.sin(Math.PI / 3);
            e.moveTo(t - s / 2, n + o / 2), e.lineTo(t + s / 2, n + o / 2), i || (e.lineTo(t, n - o / 2), e.lineTo(t - s / 2, n + o / 2))
          },
          cross: function (e, t, n, r, i) {
            var s = r * Math.sqrt(Math.PI) / 2;
            e.moveTo(t - s, n - s), e.lineTo(t + s, n + s), e.moveTo(t - s, n + s), e.lineTo(t + s, n - s)
          }
        },
        i = t.points.symbol;
      r[i] && (t.points.symbol = r[i])
    }

    function n(e) {
      e.hooks.processDatapoints.push(t)
    }
    e.plot.plugins.push({
      init: n,
      name: "symbols",
      version: "1.0"
    })
  }(jQuery), define("flot/jquery.flot.symbol.min", function () {}), define("tools/TETools/ProfileTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "internal/Units", "internal/InputMode", "./ProgressTool", "internal/GeometryHelper", "tools/ToolDialog", "flot/jquery.flot.min", "flot/jquery.flot.navigate.min", "flot/jquery-ui-1.10.4.custom.min", "flot/jquery.flot.resize.min", "flot/jquery.flot.symbol.min", "tools/ListControl", "internal/Navigate", "internal/TEPosition", "internal/NotificationCenter"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g) {
    "use strict";

    function y() {
      this._explanationText = t.i18n("analysis_profile_explanation_text"), this._explanationTextOnStartOnly = !0, this._listControl = null, this._listControlToolContainer = null, this._eventListener = null, this._collections = new Cesium.PrimitiveCollection, viewer.scene.primitives.add(this._collections), this._distancePoints = new Cesium.BillboardCollection, this._collections.add(this._distancePoints), this._profileLine = null, this._profileLine2 = null, this._distanceLabels = new Cesium.BillboardCollection, this._collections.add(this._distanceLabels), this._isCalculatingModelHeights = !1, this._progressPoints = new Cesium.BillboardCollection, this._collections.add(this._progressPoints), this.reset(), this.getId = function () {
        return "ProfileTool"
      }, this.getMenuEntry = function () {
        return r.createFor(this, t.i18n("Menu_Analyze_Profile"), "./img/newDesign/analyze_profile.png", 19, r.MenuEntryAnalyze(), t.i18n("TerrainAnalysis_Header"))
      }
    }

    function w(e, t) {
      this.longitude = e.longitude, this.latitude = e.latitude, this._height = e.height, this._requestID = t, this._slope = 0
    }
    y.inheritsFrom(o), Cesium.defineProperties(y.prototype, {
      FirstPoint: {
        get: function () {
          return this._distancePoints.length == 0 ? null : this._distancePoints.get(0).position
        }
      },
      LastPoint: {
        get: function () {
          return this._distancePoints.length == 0 ? null : this._distancePoints.get(this._distancePoints.length - 1).position
        }
      },
      BeforeLastPoint: {
        get: function () {
          return this._distancePoints.length < 2 ? null : this._distancePoints.get(this._distancePoints.length - 2).position
        }
      },
      ShowRawProfileGraph: {
        get: function () {
          return this._showRawProfileGraph
        },
        set: function (e) {
          this._showRawProfileGraph = !!e
        }
      }
    }), y.prototype.onOpenedToolContainer = function () {
      this._explanationTextOnStartOnly = !1, e(e(".analyzeToolHeaderContainer")[0]).text(t.i18n("Menu_Analyze_Profile"))
    }, y.prototype.onClosedToolContainer = function () {
      this._explanationTextOnStartOnly = !0
    }, y.prototype.onBeforeOpenToolContainer = function () {
      return s.Mode = s.MEASUREMENT, e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), this._eventListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas), this._eventListener.setInputAction(e.proxy(this.onLeftClick, this), Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.setInputAction(e.proxy(this.onRightClick, this), Cesium.ScreenSpaceEventType.RIGHT_CLICK), this.parent.onBeforeOpenToolContainer.call(this), this.showNormalButtons(), this.reset(), this._explanationTextOnStartOnly && this._toolContainer.setExplanationText(this._explanationText), g.addObserver(this, "unitsChanged", "TEN_UNITS_CHANGED", null), !0
    }, y.prototype.onBeforeCloseToolContainer = function (e) {
      return this.parent.onBeforeCloseToolContainer.call(this, e), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK), this.reset(), s.Mode = s.FREE_FLIGHT, a.IsOpen && a.close(), g.removeObserver(this, "unitsChanged", "TEN_UNITS_CHANGED", null), !0
    }, y.prototype.showNormalButtons = function () {
      this.ToolContainer.removeButtons(), this.ToolContainer.addButton(1, "./img/delete.png", undefined, t.i18n("measure_distance_tooltip_delete")), this.ToolContainer.addButton(2, "./img/delete_last_point.png", undefined, t.i18n("measure_distance_tooltip_delete_last_point")), this.ToolContainer.addButton(3, "./img/profile.png", undefined, t.i18n("measure_profile_tooltip_terrain_profile"))
    }, y.prototype.reset = function () {
      this._toolContainerText = "", this._listControl != null && this._listControl.removeAll(), this._distancePoints.removeAll(), this._profileLine != null && (viewer.scene.primitives.remove(this._profileLine), this._profileLine = null, viewer.scene.primitives.remove(this._profileLine2), this._profileLine2 = null), this._distanceLabels.removeAll(), this._progressPoints.removeAll(), this._totalArealDist = 0, this._totalHorizontalDist = 0, this._slopFirstToLast = 0, this._elevationDifference = 0, this._groundDistance = 0, this._terrainProfileRequestID = 0, this._samplePoints = [], this._showRawProfileGraph = !1, this._rawSamplePoints = [], this._isCalculatingModelHeights = !1, this._minSlopeIndex = -1, this._maxSlopeIndex = -1, this._minAltitudeIndex = -1, this._maxAltitudeIndex = -1, this._waypointsIndexes = [], this._graph = null, e("#Mask3D").remove()
    }, y.prototype.unitsChanged = function (e) {
      this.updateDistanceText()
    }, y.prototype.onButtonClick = function (e) {
      this.parent.onButtonClick.call(this, e);
      switch (e) {
        case 1:
          this.reset(), this.updateDistanceText(), a.IsOpen && a.close();
          break;
        case 2:
          if (this._distancePoints.length > 1) {
            var t = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.BeforeLastPoint),
              n = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint);
            this._totalArealDist -= u.geoDist(t, n), this._totalHorizontalDist -= u.geoDist2D(t, n), this._distancePoints.remove(this._distancePoints.get(this._distancePoints.length - 1)), this._distanceLabels.remove(this._distanceLabels.get(this._distanceLabels.length - 1)), this.rebuildProfileLine(!1), this.asyncUpdateElevationAndSlopeDiff()
          } else this.reset(), this.updateDistanceText();
          break;
        case 3:
          this._distancePoints.length > 1 && this.doWorkAsync()
      }
    }, y.prototype.updateDistanceText = function () {
      if (this._totalArealDist == 0 && this._totalHorizontalDist == 0 && this._slopFirstToLast == 0 && this._elevationDifference == 0) this._toolContainerText = "";
      else {
        var n = e("<div style='position:relative;overflow:hidden; width:100%; height:100%;'></div>"),
          r = e("<div id='MessageClientId' style='position:relative;margin-left:5px; margin-top:0px; overflow-y:auto; width:100%;'></div>");
        e("#LowerView").length > 0 && e("#LowerView").append(n), TerraExplorer.tools.ToolContainer.setText(""), e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), r.css({
          height: n.height()
        }), this._listControl = new d(r), this._listControl.IsAnalyzeToolList = !0, n.append(r);
        var s = t.i18n("measure_distance_aerial", {
            adist: i.formatDistance(this._totalArealDist)
          }),
          o = t.i18n("measure_distance_horizontal", {
            hdist: i.formatDistance(this._totalHorizontalDist)
          }),
          u = t.i18n("measure_distance_slope", {
            slope: this._slopFirstToLast.toFixed(2)
          }),
          a = t.i18n("measure_distance_elevation", {
            elevationDiff: i.formatDistance(this._elevationDifference)
          });
        this._listControl.add({
          text: s,
          query: !0
        }), this._listControl.add({
          text: o,
          query: !0
        }), this._listControl.add({
          text: a,
          query: !0
        }), this._listControl.add({
          text: u,
          query: !0
        })
      }
    }, y.prototype.asyncUpdateElevationAndSlopeDiff = function () {
      var t = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.FirstPoint),
        n = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint);
      t.pointOnModel = this.FirstPoint.pointOnModel, n.pointOnModel = this.LastPoint.pointOnModel;
      var r = Cesium.sampleTerrain(viewer.terrainProvider, i.TerrainMaxLevel, [t, n]);
      Cesium.when(r, e.proxy(function (e) {
        e[0].pointOnModel == 1 && (e[0] = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.FirstPoint)), e[1].pointOnModel == 1 && (e[1] = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint)), this._elevationDifference = e[1].height - e[0].height;
        var r = u.geoDist2D(t, n);
        this._slopFirstToLast = Cesium.Math.toDegrees(Math.atan2(this._elevationDifference, r)), this.updateDistanceText()
      }, this))
    };
    var b = null;
    return y.prototype.onLeftClick = function (e) {
      if (v.IsMultiGestureNavigation) return;
      if (this._isCalculatingModelHeights) return;
      var t = {},
        n = viewer.scene.screenToWorld(e.position, t);
      if (n) {
        this._distancePoints.add({
          position: n,
          image: "img/point_white.png",
          eyeOffset: new Cesium.Cartesian3(0, 0, -5)
        }), this._distancePoints.get(this._distancePoints.length - 1).position.pointOnModel = t.pickPrimitive instanceof Cesium.Model || t.pickPrimitive instanceof Cesium.Cesium3DTileset;
        if (this._distancePoints.length > 1) {
          var r = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.BeforeLastPoint),
            s = viewer.scene.globe.ellipsoid.cartesianToCartographic(this.LastPoint),
            o = u.geoDist(r, s);
          this._totalArealDist += o, this._totalHorizontalDist += u.geoDist2D(r, s), this.asyncUpdateElevationAndSlopeDiff(), this.rebuildProfileLine(!1), this._distanceLabels.add(TerraExplorer.style.segmentBillboardOptions(i.formatDistance(o, !0, !0), this.BeforeLastPoint, this.LastPoint))
        }
        this.updateDistanceText()
      }
    }, y.prototype.isProfileOnModel = function () {
      for (var e = 0; e < this._distancePoints.length; e++)
        if (this._distancePoints.get(e).position.pointOnModel) return !0;
      return !1
    }, y.prototype.rebuildProfileLine = function (e) {
      if (this._distancePoints.length < 2) return;
      this._profileLine != null && viewer.scene.primitives.remove(this._profileLine), this._profileLine2 != null && viewer.scene.primitives.remove(this._profileLine2);
      var t = [];
      if (this._samplePoints.length == 0 || e == 0)
        for (var n = 0; n < this._distancePoints.length; n++) t.push(this._distancePoints.get(n).position);
      else
        for (var n = 0; n < this._samplePoints.length; n++) {
          var r = this._samplePoints[n].clone();
          r = viewer.scene.globe.ellipsoid.cartographicToCartesian(r), t.push(r)
        }
      this._profileLine = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: t,
            ellipsoid: Cesium.Ellipsoid.WGS84,
            vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
            width: 2
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, .3))
          }
        }),
        asynchronous: !1,
        allowPicking: !1,
        appearance: new Cesium.PolylineColorAppearance({})
      })), this._profileLine.appearance.renderState.depthTest.enabled = !1, this._profileLine2 = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: t,
            ellipsoid: Cesium.Ellipsoid.WGS84,
            vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
            width: 2
          }),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 1, 1, 1))
          }
        }),
        asynchronous: !1,
        allowPicking: !1,
        appearance: new Cesium.PolylineColorAppearance({})
      })), this._profileLine2.appearance.renderState.depthTest.enabled = !1
    }, y.prototype.onRightClick = function (e) {}, y.prototype.doWork = function (e) {
      this.calculateTerrainProfile(undefined, e)
    }, w.inheritsFrom(Cesium.Cartographic), Cesium.defineProperties(w.prototype, {
      height: {
        get: function () {
          return this._height
        },
        set: function (e) {
          this._height = e, this.onHeightSet != null && this.onHeightSet(this)
        }
      },
      slope: {
        get: function () {
          return this._slope
        },
        set: function (e) {
          this._slope = e
        }
      }
    }), w.prototype.onHeightSet = null, y.prototype.calculateTerrainProfile = function (t, n) {
      if (this._distancePoints.length < 2) return -1;
      if (t <= 0 || t == undefined) this._totalArealDist < 100 ? t = .5 : this._totalArealDist < 1e3 ? t = 1 : t = this._totalArealDist / 1e3;
      this._samplePoints = [], this._rawSamplePoints = [], this._minSlopeIndex = -1, this._maxSlopeIndex = -1, this._minAltitudeIndex = -1, this._maxAltitudeIndex = -1, this._waypointsIndexes = [];
      var r = this._terrainProfileRequestID,
        s = viewer.scene.globe.ellipsoid.cartesianToCartographic(this._distancePoints.get(0).position);
      this._samplePoints.push(new w(s, r)), this._waypointsIndexes[0] = !0;
      for (var o = 0; o < this._distancePoints.length - 1; o++) {
        var u = Cesium.Cartesian3.distance(this._distancePoints.get(o).position, this._distancePoints.get(o + 1).position),
          a = viewer.scene.globe.ellipsoid.cartesianToCartographic(this._distancePoints.get(o).position),
          f = viewer.scene.globe.ellipsoid.cartesianToCartographic(this._distancePoints.get(o + 1).position);
        if (t > u) {
          this._samplePoints.push(new w(f, r)), this._waypointsIndexes[this._samplePoints.length - 1] = !0;
          continue
        }
        var l = new Cesium.Cartesian3,
          c = t / u;
        for (var h = c; h < 1; h += c) Cesium.Cartesian3.lerp(this._distancePoints.get(o).position, this._distancePoints.get(o + 1).position, h, l), this._samplePoints.push(new w(viewer.scene.globe.ellipsoid.cartesianToCartographic(l), r));
        this._samplePoints.push(new w(f, r)), this._waypointsIndexes[this._samplePoints.length - 1] = !0
      }
      var p = this._samplePoints.length,
        d = 0,
        v = 0;
      w.prototype.onHeightSet = e.proxy(function (e) {
        if (e._requestID != this._terrainProfileRequestID) return;
        d++;
        var t = Math.ceil(d / p * 100);
        t > v && (this.setProgress(d, p), v = t, this._progressPoints.removeAll(), this._progressPoints.add({
          position: viewer.scene.globe.ellipsoid.cartographicToCartesian(e),
          image: "img/point_progress.png"
        }))
      }, this);
      var m = {
        position: viewer.camera.position.clone(),
        orientation: {
          heading: viewer.camera.heading,
          pitch: viewer.camera.pitch,
          roll: viewer.camera.roll
        }
      };
      this._collections.show = !1, viewer.render();
      var g = Cesium.sampleTerrain(viewer.terrainProvider, i.TerrainMaxLevel, this._samplePoints);
      Cesium.when(g, e.proxy(function (t) {
        if (r != this._terrainProfileRequestID) return;
        if (this.isProfileOnModel()) {
          var i = e("<img id='Mask3D'style='position:absolute; left:1px; top:1; width:1px; height:1px; z-index:10; box-shadow:0 0 0 99999px rgba(0, 0, 0, .7);'></img>");
          e("#mainContainer").append(i), this._isCalculatingModelHeights = !0, this.getModelHeights(t, 0, e.proxy(function () {
            this.onFinishedCalculateTerrainProfile(t, r, m, n)
          }, this))
        } else this.onFinishedCalculateTerrainProfile(t, r, m, n)
      }, this))
    }, y.prototype.getModelHeights = function (e, t, n) {
      if (this._distancePoints.length == 0) return;
      var r = 1;
      do {
        if (t >= e.length) {
          n();
          return
        }
        var i = e[t];
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, 300),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0
          }
        }), viewer.render();
        var s = i._height,
          o = viewer.scene.canvas.width / 2,
          u = viewer.scene.canvas.height / 2,
          a = {
            pickPrimitive: undefined
          },
          f = viewer.scene.screenToWorld(Cesium.Cartesian2.fromElements(o, u), a);
        f != undefined && (s = viewer.scene.globe.ellipsoid.cartesianToCartographic(f).height);
        if (a.pickPrimitive == undefined) {
          viewer.camera.setView({
            destination: Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, 300),
            orientation: {
              heading: Cesium.Math.toRadians(0),
              pitch: Cesium.Math.toRadians(-89),
              roll: 0
            }
          }), viewer.render();
          var f = viewer.scene.screenToWorld(Cesium.Cartesian2.fromElements(o, u), a);
          f != undefined && (s = viewer.scene.globe.ellipsoid.cartesianToCartographic(f).height)
        }
        s != i._height && a.pickPrimitive != undefined && (i._height = s);
        var l = parseInt(e.length / 100, 10);
        t % l == 0 && this.setProgress(t, e.length), r--, t++
      } while (r > 0 && this._isCalculatingModelHeights);
      if (this._isCalculatingModelHeights) {
        var c = this;
        setTimeout(function () {
          c.getModelHeights(e, t, n)
        }, 1)
      }
      this._isCalculatingModelHeights || n()
    }, y.prototype.onFinishedCalculateTerrainProfile = function (e, t, n, r) {
      this.restoreNormalView(n), this._isCalculatingModelHeights = !1;
      if (t != this._terrainProfileRequestID) return;
      if (this._showRawProfileGraph == 1)
        for (var i = 0; i < e.length; i++) this._rawSamplePoints[i] = e[i].clone();
      this.smoothSamples(e), this._groundDistance = 0;
      for (var i = 0; i < e.length; i++) {
        e[i].height == undefined && (e[i].height = 0);
        if (this._maxAltitudeIndex == -1 || e[i].height > e[this._maxAltitudeIndex].height) this._maxAltitudeIndex = i;
        if (this._minAltitudeIndex == -1 || e[i].height < e[this._minAltitudeIndex].height) this._minAltitudeIndex = i;
        var s = 0;
        if (i > 0) {
          s = this.calcSlope(e[i - 1], e[i]), e[i - 1].slope = s;
          if (this._maxSlopeIndex == -1 || s > e[this._maxSlopeIndex].slope) this._maxSlopeIndex = i - 1;
          if (this._minSlopeIndex == -1 || s < e[this._minSlopeIndex].slope) this._minSlopeIndex = i - 1;
          this._groundDistance += u.geoDist(e[i - 1], e[i])
        }
      }
      this.setProgress(e.length, e.length), r != undefined && r()
    }, y.prototype.restoreNormalView = function (t) {
      this._collections.show = !0, viewer.camera.setView({
        destination: t.position,
        orientation: t.orientation
      }), this.rebuildProfileLine(this._isCalculatingModelHeights), e("#Mask3D").remove()
    }, y.prototype.smoothSamples = function (e) {
      var t = [];
      for (var n = 0; n < e.length; n++) {
        e[n].height == undefined && (e[n].height = 0);
        var r;
        n >= 1 ? r = e[n - 1].height || 0 : r = e[0].height || 0;
        var i;
        n >= 2 ? i = e[n - 2].height || 0 : i = r;
        var s;
        n < e.length - 1 ? s = e[n + 1].height || 0 : s = e[e.length - 1].height || 0;
        var o;
        n < e.length - 2 ? o = e[n + 2].height || 0 : o = s, t[n] = (.5 * i + 1 * r + 2 * e[n].height + 1 * s + .5 * o) / 5
      }
      for (var n = 0; n < e.length; n++) e[n].height = t[n]
    }, y.prototype.calcSlope = function (e, t) {
      var n = u.geoDist2D(e, t),
        r = 180 / Math.PI * Math.atan2(t.height - e.height, n);
      return r
    }, y.prototype.workCompleted = function () {
      this._isCalculatingModelHeights = !1;
      if (this.CancelWork == 0) {
        var e = t.i18n("measure_distance_ground", {
            gdist: i.formatDistance(this._groundDistance)
          }),
          n = this._listControl;
        this._listControl.add = n, this.showProfileDialog()
      }
      this._progressPoints.removeAll(), this._terrainProfileRequestID++
    }, y.prototype.showProfileDialog = function () {
      var n = 500,
        r = 600,
        s = r - 250,
        o = this,
        f = e("<div style='position:absolute; overflow:hidden; width:" + n + "px; height:600px;'></div>"),
        l = e("<div id='chartdiv' style='position:absolute; overflow:hidden; width:" + (n - 10) + "px; height:" + s + "px; left:1px; top: 6px;'></div>");
      f.append(l);
      var c = e("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid rgba(30, 30, 30, 0.7)",
        padding: "5px",
        "background-color": "rgba(90, 90, 90, 0.2)",
        opacity: .8,
        fontSize: "12px"
      });
      f.append(c);
      var h = t.i18n("measure_distance_aerial", {
          adist: i.formatDistance(this._totalArealDist)
        }),
        p = t.i18n("measure_distance_elevation", {
          elevationDiff: i.formatDistance(this._elevationDifference)
        }),
        g = t.i18n("measure_distance_ground", {
          gdist: i.formatDistance(this._groundDistance)
        }),
        y = h + "<br>" + p + "<br>" + g,
        b = e("<p id='TextView' style='position:absolute; top:" + s + "px; margin:10px; font-size:10pt; line-height:200%;'>" + y + "</p>");
      f.append(b);
      var w = e("<div style='position:absolute; overflow-y:auto; width:100%; '></div>");
      f.append(w), a.close(), a.open(t.i18n("title_activity_terrain_profile"), "./img/dialogs/header_icons/Terrain_Profile.png", f.get(0));
      var E = 1,
        S = 1,
        x = [],
        T = [],
        N = [],
        C = [],
        k = [],
        L = [],
        A = [],
        O = [],
        M = [],
        _ = this._samplePoints.length;
      for (var D = 0; D < _; D++) T[D] = [D * E * S, this._samplePoints[D].height * S], this._showRawProfileGraph && (N[D] = [D * E * S, this._rawSamplePoints[D].height * S]), this._maxAltitudeIndex == D && (k[D] = [D * E * S, this._samplePoints[D].height * S]), this._minAltitudeIndex == D && (L[D] = [D * E * S, this._samplePoints[D].height * S]), this._maxSlopeIndex == D && (A[D] = [D * E * S, this._samplePoints[D].height * S]), this._minSlopeIndex == D && (O[D] = [D * E * S, this._samplePoints[D].height * S]), this._waypointsIndexes[D] && (C[D] = [D * E * S, this._samplePoints[D].height * S], D != this._samplePoints.length - 1 && M.push({
        xaxis: {
          from: D,
          to: D
        },
        yaxis: {
          from: this._samplePoints[D].height * S,
          to: 0
        },
        color: "rgba(0, 0, 0, 0.2)"
      }));
      var P = this._samplePoints[this._minAltitudeIndex].height < 0;
      if (P)
        for (var D = 0; D < M.length; D++) M[D].yaxis.to = this._samplePoints[this._minAltitudeIndex].height;
      x.push({
        data: T,
        lines: {
          show: !0,
          fill: P ? 0 : .5,
          zero: !1
        },
        color: "#303030"
      }), this._showRawProfileGraph && x.push({
        data: N,
        lines: {
          show: !0,
          zero: !1
        },
        color: "#CAFF51"
      }), x.push({
        data: k,
        points: {
          show: !0,
          symbol: "square",
          radius: 4
        },
        color: "#ff00ff"
      }), x.push({
        data: L,
        points: {
          show: !0,
          symbol: "square",
          radius: 4
        },
        color: "#ff00ff"
      }), x.push({
        data: A,
        points: {
          show: !0,
          symbol: "diamond",
          radius: 4
        },
        color: "#0000ff"
      }), x.push({
        data: O,
        points: {
          show: !0,
          symbol: "diamond",
          radius: 4
        },
        color: "#0000ff"
      }), x.push({
        data: C,
        points: {
          show: !0,
          symbol: "circle",
          radius: 2
        },
        color: "#000000"
      });
      var H = this._samplePoints[this._maxAltitudeIndex].height * S,
        B = this._samplePoints[this._minAltitudeIndex].height * S,
        j = Math.max(1, Math.abs(H - B)),
        F = j * .2,
        I = B - F / 4,
        q = H + F;
      this._graph = e.plot("#chartdiv", x, {
        xaxis: {
          panRange: [0, this._samplePoints.length],
          show: !1
        },
        yaxis: {
          min: I,
          max: q,
          zoomRange: [.1, j * F * 2],
          panRange: [I, q],
          position: "right"
        },
        grid: {
          hoverable: !0,
          clickable: !0,
          markings: M
        },
        zoom: {
          interactive: !0
        },
        pan: {
          interactive: !0
        }
      });
      var R = typeof InstallTrigger != "undefined";
      w.css({
        top: s + 20 + b.height(),
        height: f.height()
      }), e(e(".listControlLineTextHeaderProfile")[0]).css("width", "100%");
      var U = new d(w);
      U.LinePadding = 4, U.add({
        header: !0,
        text: t.i18n("measure_terrain_profile_show_header"),
        greyCheckbox: !0,
        thinHeader: !0,
        paddingLeft: !0
      }), U.add({
        text: t.i18n("measure_terrain_profile_show_slopes"),
        img: "./img/dialogs/profile_minmax_slope.png",
        greyCheckbox: !0,
        thinHeader: !0,
        paddingLeft: !0,
        checkbox: {
          isChecked: !0,
          onClick: function () {
            var t = e(this).is(":checked");
            o.showInfo([3, 4], t)
          }
        }
      }), U.add({
        text: t.i18n("measure_terrain_profile_show_altitude"),
        greyCheckbox: !0,
        thinHeader: !0,
        paddingLeft: !0,
        img: "./img/dialogs/profile_minmax_altitude.png",
        checkbox: {
          isChecked: !0,
          onClick: function () {
            var t = e(this).is(":checked");
            o.showInfo([1, 2], t)
          }
        }
      }), U.add({
        greyCheckbox: !0,
        thinHeader: !0,
        paddingLeft: !0,
        text: t.i18n("measure_terrain_profile_show_waypoints"),
        img: "./img/dialogs/profile_waypoint.png",
        checkbox: {
          isChecked: !0,
          onClick: function () {
            var t = e(this).is(":checked");
            o.showInfo([5], t)
          }
        }
      }), e("#chartdiv").bind("plothover", function (t, n, r) {
        r ? o.ToolTip(r) : e("#tooltip").hide()
      }), e("#chartdiv").bind("plotclick", function (e, t, n) {
        if (n) {
          var r = 0;
          n.dataIndex > 0 ? r = u.getHeadingPitchRange(o._samplePoints[n.dataIndex - 1], o._samplePoints[n.dataIndex]).heading : r = u.getHeadingPitchRange(o._samplePoints[n.dataIndex], o._samplePoints[n.dataIndex + 1]).heading;
          var i = [];
          for (var s = 0; s < o._distancePoints.length; s++) i.push(o._distancePoints.get(s).position);
          var a = Cesium.BoundingRectangle.fromPoints(i),
            f = Math.sqrt(a.width * a.width + a.height * a.height) / 4,
            l = new m({
              cartesian: viewer.scene.globe.ellipsoid.cartographicToCartesian(o._samplePoints[n.dataIndex]),
              headingPitchRange: new Cesium.HeadingPitchRange(r, Cesium.Math.toRadians(-70), f)
            });
          v.flyToPosition(l)
        }
      }), e(".toolDialog .listControlLineTextNormalSidebar").each(function () {
        e(this).attr("class", "listControlLineTextNormalProfile")
      }), e(".toolDialog .listControlLineSidebar").each(function () {
        e(this).attr("class", "listControlLineProfile")
      }), e(".toolDialog .listControlLineTextHeaderSidebar").each(function () {
        e(this).attr("class", "listControlLineTextHeaderProfile")
      })
    }, y.prototype.showInfo = function (e, t) {
      var n = this._graph.getData();
      for (var r = 0; r < e.length; r++) n[e[r]].points.show = t;
      this._graph.setData(n), this._graph.draw()
    }, y.prototype.ToolTip = function (n) {
      var r = "",
        i = n.dataIndex,
        s = 0;
      i < this._samplePoints.length - 1 && (s = this.calcSlope(this._samplePoints[i], this._samplePoints[i + 1])), r = "X: " + Cesium.Math.toDegrees(this._samplePoints[i].longitude).toFixed(8) + "<br/>Y: " + Cesium.Math.toDegrees(this._samplePoints[i].latitude).toFixed(8) + "<br/>" + t.i18n("measure_terrain_profile_tooltip_height") + ": " + this._samplePoints[i].height.toFixed(2) + "<br/>" + t.i18n("measure_distance_slope", {
        slope: s.toFixed(2)
      }), e("#tooltip").html(r).css({
        top: 20,
        left: 20
      }).fadeIn(200), this._progressPoints.removeAll(), this._progressPoints.add({
        position: viewer.scene.globe.ellipsoid.cartographicToCartesian(this._samplePoints[i]),
        image: "img/point_progress.png"
      })
    }, y
  }), define("tools/TabControl", ["../jquery", "../TELang"], function (e, t) {
    "use strict";
    var n = function (t) {
      this.TabsDiv = e("<div style='white-space: nowrap;'></div>"), t.append(this.TabsDiv), this._selectedTab = 0
    };
    return Cesium.defineProperties(n.prototype, {
      SelectedTab: {
        get: function () {
          return this._selectedTab
        },
        set: function (e) {
          if (e >= this.TabCount) return;
          this.onClick(e)
        }
      },
      TabCount: {
        get: function () {
          return this.TabsDiv.find(".tabButton").length
        }
      },
      Div: {
        get: function () {
          return this.TabsDiv
        }
      }
    }), n.prototype.add = function (t, n) {
      var r = this.TabCount,
        i = e("<button type='button' class='tabButton' id='TabButton" + r + "' style=''>" + t + "</button>").click(e.proxy(function () {
          this.onClick(r)
        }, this));
      this.TabsDiv.append(i);
      var s = this.TabsDiv.parent().outerWidth() / (r + 1) - 1,
        o = this.TabsDiv.children();
      for (var u = 0; u < o.length; u++) e(o[u]).css({
        width: u == o.length - 1 ? s + 1 : s
      });
      r == 0 && (this.SelectedTab = 0), i.get(0).tabClickHandler = n
    }, n.prototype.onClick = function (t) {
      var n = this.TabsDiv.find(".tabButton");
      for (var r = 0; r < n.length; r++) {
        var i = e(n[r]);
        r == t ? (i.css({
          "background-color": "rgba(50, 50, 50, 1.0)"
        }), this._selectedTab = r, i.get(0).tabClickHandler != undefined && i.get(0).tabClickHandler(r)) : i.css("background-color", "")
      }
    }, n
  }), define("tools/DisplayGroupItem", ["jquery"], function (e) {
    "use strict";
    var t = function (e, t) {
      this.name = e, this.childItems = [], t != undefined && (this.childItems = t.slice()), this.getItem = function (e) {
        return this.childItems.length == 0 ? null : e < 0 || e >= this.childItems.length ? null : this.childItems[e]
      }
    };
    return t
  }), define("tools/DisplayItem", ["jquery"], function (e) {
    "use strict";
    var t = function (e, t, n, r) {
      this.id = "", this.attributedName = r != undefined ? r : "", this.name = e, this.subTitle = "", this.accessoryIcon = n != undefined ? n : "", this.accessoryText = "", this.icon = t != undefined ? t : "", this.tag = 0
    };
    return t
  }), define("internal/Presentation", ["jquery", "TELang", "./Navigate", "./NotificationCenter", "tools/ToolDialog"], function (e, t, n, r, i) {
    "use strict";
    var s = function (t) {
      this._id = undefined, this._presentationData = null, this._currentStepIndex = -1, this._status = 1, this._timeout = undefined;
      var n = e.grep(TerraExplorer.internal.Project.Presentations, function (e, n) {
        return e.id == t
      });
      if (n.length == 1) {
        var i = n[0];
        i && (this._id = t, this._presentationData = i)
      }
      r.addObserver(this, "onUserStop", "TEN_USER_INITIATE_STOP", null)
    };
    s.PLAYING = 0, s.NOTPLAYING = 1, s.PAUSED = 2, s.WAITINGTIME = 3, s.WAITINGCLICK = 4, s.BEFORE_SWITCHING_TO_ANOTHER_PRESENTATION = 5, s.AFTER_SWITCHING_FROM_ANOTHER_PRESENTATION = 6, Cesium.defineProperties(s.prototype, {
      id: {
        get: function () {
          return this._id
        }
      },
      Status: {
        get: function () {
          return this._status
        }
      },
      StepIndex: {
        get: function () {
          return this._currentStepIndex
        }
      },
      Steps: {
        get: function () {
          return this._presentationData.playlist
        }
      }
    }), s.fromId = function (e) {
      return new s(e)
    }, s.prototype.play = function (t) {
      t == undefined && (t = this._currentStepIndex), this._currentStepIndex = t;
      if (this._currentStepIndex >= this._presentationData.playlist.length) {
        this.stop();
        return
      }
      if (this._currentStepIndex < 0) {
        this._currentStepIndex = 0, this._status = s.PAUSED, r.postNotification("TEN_PRESENTATION_STATUS_CHANGED", this, this);
        return
      }
      this._status != s.PLAYING && (this._status = s.PLAYING, r.postNotification("TEN_PRESENTATION_STATUS_CHANGED", this, this)), r.postNotification("TEN_PRESENTATION_STEP", this, this);
      var i = this._presentationData.playlist[this._currentStepIndex];
      if (i.type == "FlyTo") {
        var o = !0;
        if (this._currentStepIndex < this._presentationData.playlist.length - 1) {
          var u = this._presentationData.playlist[this._currentStepIndex + 1];
          o = u.type == "FlyTo" && u.flyToMode == "smooth"
        }
        n.flyToPosition(i.tePosition, {
          complete: e.proxy(function () {
            this.play(this._currentStepIndex + 1)
          }, this),
          duration: i.duration,
          easingFunction: i.flyToMode == "smooth" && o ? Cesium.EasingFunction.LINEAR_NONE : undefined,
          pausePresentation: !1
        })
      } else i.type == "Wait" && (this._timeout = setTimeout(e.proxy(function () {
        this.play(this._currentStepIndex + 1)
      }, this), i.duration * 1e3))
    }, s.prototype.next = function () {
      this.clearWait(), n.stop();
      if (this._currentStepIndex == this._presentationData.playlist.length - 1) {
        this.stop();
        return
      }
      var e = this._presentationData.playlist[this._currentStepIndex];
      e.type == "FlyTo" && n.jumpToPosition(e.tePosition, {
        pausePresentation: !1
      }), this._currentStepIndex++, this._currentStepIndex < 0 && (this._currentStepIndex = 0), r.postNotification("TEN_PRESENTATION_STEP", this, this), this._status == s.PLAYING && this.play()
    }, s.prototype.jumpToEndOfPrevStep = function (t) {
      var r = Math.max(0, t - 1),
        i = e.grep(this._presentationData.playlist, function (e, t) {
          return e.type == "FlyTo" && t <= r
        });
      i.length > 0 && n.jumpToPosition(i[i.length - 1].tePosition, {
        pausePresentation: !1
      })
    };
    var o = undefined;
    return s.prototype.previous = function () {
      clearTimeout(o), this.clearWait(), n.stop(), this.jumpToEndOfPrevStep(this._currentStepIndex), this._currentStepIndex = Math.max(0, this._currentStepIndex - 1), r.postNotification("TEN_PRESENTATION_STEP", this, this), this._status == s.PLAYING && (o = setTimeout(e.proxy(this.play, this), 1e3))
    }, s.prototype.stop = function () {
      this.clearWait(), n.stop(), this._currentStepIndex = -1, this._status = s.NOTPLAYING, r.postNotification("TEN_PRESENTATION_STATUS_CHANGED", this, this)
    }, s.prototype.pause = function () {
      this.clearWait(), n.stop(), this._status = s.PAUSED, r.postNotification("TEN_PRESENTATION_STATUS_CHANGED", this, this)
    }, s.prototype.resume = function () {
      if (this._currentStepIndex < 0 || this._currentStepIndex >= this._presentationData.playlist.length) return;
      this.play()
    }, s.prototype.clearWait = function () {
      this._timeout != undefined && (clearTimeout(this._timeout), this._timeout = undefined)
    }, s.prototype.showKeySteps = function () {
      i.close(), TerraExplorer.tools.ToolManager.openTool("PresentationStepsTool", this)
    }, s.prototype.onUserStop = function (e) {
      this.pause()
    }, s
  }), define("tools/TETools/PlacesTool", ["jquery", "TELang", "../MenuEntry", "tools/ToolDialog", "./FavoritesStorage", "tools/TabControl", "tools/ListControl", "internal/Navigate", "../DisplayGroupItem", "../DisplayItem", "internal/Presentation", "internal/Globals", "../ToolProtocol", "internal/GeometryHelper"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p) {
    "use strict";
    var d = function () {
      this._sideStyle = !0, this._locationText = "", this._locations = new a(t.i18n("places_locations")), this._presentations = new a(t.i18n("places_presentations")), this._favorites = new a(t.i18n("places_favorites")), this._all = new a(t.i18n("all")), this._dataSource = null, this._favoritesStorage = i.DefaultStorage, this._tabControl = null, this._listControl = null, this.ToolManager = null, this.getId = function () {
        return "PlacesTool"
      }, this.getMenuEntry = function () {
        return n.createFor(this, t.i18n("title_activity_places"), "./img/newDesign/bt_location.png", 20)
      }, this.open = function (n) {
        var i = e("<div style='position:absolute; overflow:hidden; width:400px; height:300px;'></div>");
        this._sideStyle ? (this._tabControl = new s(i), this._tabControl.add(t.i18n("all"), e.proxy(this.onFilterValueChanged, this))) : (this._tabControl = new s(i), this._tabControl.add(t.i18n("all"), e.proxy(this.onFilterValueChanged, this)), this._tabControl.add(t.i18n("places_favorites"), e.proxy(this.onFilterValueChanged, this)), this._tabControl.add(t.i18n("places_locations"), e.proxy(this.onFilterValueChanged, this)), this._tabControl.add(t.i18n("places_presentations"), e.proxy(this.onFilterValueChanged, this)));
        var u = e("<div id='ListParentID' style='position:absolute; overflow-y:auto; overflow-x:hidden; width:100%;height:100%;'></div>");
        i.append(u), this._listControl = new o(u), e("#sidebarContentDiv").empty(), this._sideStyle ? (i.css({
          "overflow-y": "auto",
          width: "100%",
          height: "90%"
        }), u.css("position", "relative"), r.openAsSideToolDialog(t.i18n("Menu_Places"), "./img/dialogs/header_icons/places.png", i.get(0)), u.css({
          height: i.height() - 0
        })) : (r.open(t.i18n("Menu_Places"), "./img/dialogs/header_icons/places.png", i.get(0)), u.css({
          height: i.height() - this._tabControl.Div.height()
        })), this.reloadData(), TerraExplorer.tools.SideBar.ChangeStyleForSideTools("div"), TerraExplorer.tools.SideBar.ChangeStyleForSideTools("span"), e("#toolDialogTitleID").remove(), e("#TabButton0").click(), e("#TabButton0").remove();
        var a = TerraExplorer.browser.isEdge,
          f = TerraExplorer.browser.isSafari,
          l = TerraExplorer.browser.isFirefox;
        a && e("#leftButton").css("top", "20px"), l && e("#leftButton").css("top", "6px"), f && e("#leftButton").css("top", "8px")
      }
    };
    return d.inheritsFrom(h), Cesium.defineProperties(d.prototype, {}), d.prototype.onFilterValueChanged = function (n) {
      this._listControl.removeAll();
      if (n == 0) {
        this._dataSource = this._all, this._dataSource.childItems = this._locations.childItems.concat(this._favorites.childItems, this._presentations.childItems), this.buildList(this._locations), this.buildList(this._favorites), this.buildList(this._presentations), this._listControl.add({
          text: ""
        }), this._listControl.add({
          text: ""
        });
        var i, s;
        e(".listControlLineTextHeaderSidebar").length > 0 && (i = e.grep(e(".listControlLineTextHeaderSidebar"), function (e) {
          return e.innerHTML == t.i18n("places_favorites")
        }), i != undefined && (s = e(i).parent())), s != undefined && (r.addLeftButton(t.i18n("PlacesTool_AddFavorites"), s, e.proxy(this.addFavoriteLocation, this)), e("#leftButton").css({
          position: "absolute",
          left: "150px",
          top: "30px",
          "background-color": "#2a2a2a",
          border: "1px solid white"
        }))
      } else n == 1 ? (this._dataSource = this._locations, this.buildList(this._locations)) : n == 2 ? (this._dataSource = this._favorites, this.buildList(this._favorites)) : n == 3 && (this._dataSource = this._presentations, this.buildList(this._presentations))
    }, d.prototype.addFavoriteLocation = function () {
      var e = this.PickAFavoritePosition(),
        n = this._favoritesStorage.createFavoriteItem();
      e && e != null && (n.tePosition.Cartesian = e.clone(), n.tePosition.HeadingPitchRange = p.getHeadingPitchRange(viewer.camera.position, n.tePosition.Cartesian)), n.name != undefined && n.name == "" && (n.name = t.i18n("my_favorite_location")), this._favoritesStorage.DefaultStorage.saveItem(n), this.ToolManager.openTool("EditFavoriteTool", n.id)
    }, d.prototype.PickAFavoritePosition = function () {
      var e = undefined;
      for (var t = 1; t <= 3; t++) {
        var n = new Cesium.Cartesian2(viewer.canvas.width / 2, viewer.canvas.height - viewer.canvas.height / Math.pow(2, t));
        e = viewer.scene.screenToWorld(n);
        if (e != undefined) break;
        continue
      }
      if (e == undefined) {
        var r = viewer.camera.position,
          i = viewer.camera.direction,
          s = new Cesium.Ray(r, i);
        e = Cesium.Ray.getPoint(s, viewer.camera.positionCartographic.height / 3)
      }
      return e
    }, d.prototype.buildList = function (n) {
      if (n.childItems.length == 0) {
        n == this._favorites && (r = t.i18n("places_favorites"), i = "./img/favorits.png", this._listControl.add({
          header: !0,
          text: r,
          img: i
        }));
        return
      }
      var r, i, s = 0,
        o = e.proxy(this.onFlyTo, this);
      n == this._locations ? (r = t.i18n("places_locations"), i = "./img/dialogs/header_icons/places.png", s = 2) : n == this._favorites ? (r = t.i18n("places_favorites"), i = "./img/favorits.png", s = 1) : n == this._presentations && (r = t.i18n("places_presentations"), i = "./img/placesTool_presentation.png", s = 3, o = e.proxy(this.onPlay, this)), this._listControl.add({
        header: !0,
        text: r,
        img: i
      });
      for (var u = 0; u < n.childItems.length; u++) {
        var a = n.childItems[u];
        this._listControl.add({
          onClick: o,
          img: a.icon,
          text: a.name,
          buttons: this.getRowButtonsForFilter(s),
          image: a.image
        })
      }
    }, d.prototype.getRowButtonsForFilter = function (t) {
      switch (t) {
        case 1:
          return [{
            img: "./img/newDesign/places_flyto.png",
            onClick: e.proxy(this.onFlyTo, this)
          }, {
            img: "./img/newDesign/places_jumpto.png",
            onClick: e.proxy(this.onJumpTo, this)
          }, {
            img: "./img/newDesign/places_rename.png",
            onClick: e.proxy(this.onEdit, this)
          }, {
            img: "./img/newDesign/places_delete.png",
            onClick: e.proxy(this.onDelete, this)
          }];
        case 2:
          return [{
            img: "./img/newDesign/places_flyto.png",
            onClick: e.proxy(this.onFlyTo, this)
          }, {
            img: "./img/newDesign/places_jumpto.png",
            onClick: e.proxy(this.onJumpTo, this)
          }];
        case 3:
          return [{
            img: "./img/dialogs/actions/play.png",
            onClick: e.proxy(this.onPlay, this)
          }, {
            img: "./img/dialogs/actions/list.png",
            onClick: e.proxy(this.onShowPresentationStep, this)
          }]
      }
    }, d.prototype.reloadData = function () {
      this._locations.childItems.length = 0;
      for (var e = 0; e < TerraExplorer.internal.Project.Locations.length; e++) {
        var t = TerraExplorer.internal.Project.Locations[e],
          n = new f(t.name, "./img/dialogs/locations.png");
        n.id = t.id, n.image = t.image, this._locations.childItems.push(n)
      }
      this._favorites.childItems.length = 0;
      var r = this._favoritesStorage.getAll();
      for (var e = 0; e < r.length; e++) {
        var i = r[e],
          n = new f(i.name, "./img/dialogs/favorit_places.png");
        n.id = i.id, this._favorites.childItems.push(n)
      }
      this._presentations.childItems.length = 0;
      for (var e = 0; e < TerraExplorer.internal.Project.Presentations.length; e++) {
        var s = TerraExplorer.internal.Project.Presentations[e],
          n = new f(s.name, "./img/dialogs/presentation.png");
        n.id = s.id, this._presentations.childItems.push(n)
      }
    }, d.prototype.onAddFavorites = function (e) {
      alert(e)
    }, d.prototype.onFlyTo = function (t) {
      var n;
      t.target instanceof HTMLImageElement ? n = e(t.target).parent().prev()[0].innerText.trim() : n = t.target.innerHTML;
      var i = e.grep(this._dataSource.childItems, function (e) {
          return e.name.substring(0, 27) == n.substring(0, 27)
        })[0],
        s = this.getItemPosition(i);
      s && (u.flyToPosition(s), r.close())
    }, d.prototype.onJumpTo = function (e) {
      var t = this._dataSource.getItem(e.data),
        n = this.getItemPosition(t);
      n && (u.jumpToPosition(n), r.close())
    }, d.prototype.getItemPosition = function (t) {
      var n = null,
        r = this._favoritesStorage.getItem(t.id);
      if (r != null) n = r.tePosition;
      else {
        var i = e.grep(TerraExplorer.internal.Project.Locations, function (e) {
          return e.id == t.id
        });
        i.length == 1 && (n = i[0].tePosition)
      }
      return n
    }, d.prototype.onEdit = function (e) {
      var t = this._dataSource.getItem(e.data);
      r.close(), this.ToolManager.openTool("EditFavoriteTool", t.id)
    }, d.prototype.onDelete = function (t) {
      var n = this._dataSource.getItem(t.data);
      this._favoritesStorage.deleteItem(n.id), this.reloadData(), e("#menuIcon" + this.getId()).length > 0 && e("#menuIcon" + this.getId()).click()
    }, d.prototype.onPlay = function (e) {
      var t = this._dataSource.getItem(e.data);
      r.close(), l.fromId(t.id).play(0)
    }, d.prototype.onShowPresentationStep = function (e) {
      var t = this._dataSource.getItem(e.data);
      l.fromId(t.id).showKeySteps()
    }, d
  }), define("tools/TETools/LayersStorage", ["jquery", "TELang", "internal/NotificationCenter", "internal/TEPosition"], function (e, t, n, r) {
    "use strict";

    function i() {
      return "_TEW_Layers_"
    }
    var s = null,
      o = function (e) {
        this.id = Cesium.createGuid(), this.name = "", this.style = null, this.level = 0, this.displayName = "", this.url = ""
      },
      u = function () {
        this._Layers = []
      };
    return Cesium.defineProperties(u.prototype, {
      DefaultStorage: {
        get: function () {
          return s
        }
      },
      Layers: {
        get: function () {
          return this._Layers.length == 0 && this.loadLayersFromLocalStorage(), this._Layers
        }
      }
    }), u.prototype.createLayerItem = function () {
      return new o
    }, u.prototype.convertToArrayOfLayers = function () {
      var e = [];
      if (this._Layers == null) return null;
      for (var t = 0; t < this._Layers.length; t++) {
        var n = this._Layers[t];
        e.push(n)
      }
      return e
    }, u.prototype.loadLayersFromLocalStorage = function () {
      var e = JSON.parse(localStorage.getItem(i()));
      if (e == null) return;
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        if (n == null) continue;
        var r = {};
        r.myLayer = !0, n.style != undefined && (r._style = n.style), Cesium.defined(n.type) && (n.type == "mesh" ? TerraExplorer.SGWorld.Creator.CreateMeshLayerFromSFS(n.displayName, n.url, n.name, !0) : n.type.substring(0, 7) == "Feature" ? TerraExplorer.SGWorld.Creator.CreateFeatureLayer(n.displayName, n.url + "_FromStorage", n.name, n.type, n.style, !0) : n.type == "cpt" ? TerraExplorer.SGWorld.Creator.CreatePointCloudModel(n.displayName, n.url, n.name, !0) : n.type == "elevation" ? TerraExplorer.SGWorld.Creator.CreateElevationLayer(n.displayName, n.url + "_FromStorage", n.name, !0) : TerraExplorer.SGWorld.Creator.CreateImageryLayer(n.displayName, n.url + "_FromStorage", n.name, !0))
      }
    }, u.prototype.getAll = function () {
      var e = [];
      for (var t = 0; t < this._Layers.length; t++) {
        var n = this._Layers.get(t);
        favorites.push(e)
      }
      return e
    }, u.prototype.getItemType = function (e) {
      if (e.Style == undefined) return e._imageryProvider != undefined ? "imagery" : e.url.indexOf("/pnts/") != -1 ? "cpt" : e.isElevationLayer != undefined && e.isElevationLayer ? "elevation" : "mesh";
      if (Cesium.defined(e.Style.label) || Cesium.defined(e.Style.billboard)) return "FeaturePoint";
      if (Cesium.defined(e.Style.polyline)) return "FeatureLine";
      if (Cesium.defined(e.Style.polygon)) return "FeaturePolygon"
    }, u.prototype.saveItem = function (e) {
      function t(e, t) {
        var n;
        return e.indexOf("{s}") != -1 ? n = t != undefined && t.length > 0 ? e.replace("{s}", t[0]) : console.error("Error - sTag with no subdomains.") : n = e, n
      }
      for (var n = 0; n < this._Layers.length; ++n) e.guid == this._Layers[n].id && this._Layers.splice(n, 1);
      e.type = this.getItemType(e), e.type == undefined && (e.type = "Feature");
      if (e.type == "mesh" || e.type == "cpt") var r = {
        id: e.guid,
        url: t(e.url, e._subdomains),
        name: e.name,
        displayName: e.displayName,
        visibility: !0,
        myLayer: !0,
        type: e.type
      };
      else if (e.type.indexOf("Feature") != -1) var r = {
        id: e.guid,
        url: t(e._url, e._subdomains),
        name: e._layerName,
        displayName: e._layerDisplayName,
        visibility: !0,
        style: e.Style,
        level: e._level,
        myLayer: !0,
        type: e.type
      };
      else if (e.type == "imagery" || e.type == "elevation") var r = {
        id: e.guid,
        url: e.type == "imagery" ? t(e._imageryProvider._url, e._imageryProvider._tileProvider._subdomains) : t(e.url, e.subdomains),
        rectangle: e.rectangle,
        name: e.name,
        displayName: e.displayName,
        visibility: !0,
        style: e.Style,
        myLayer: !0,
        type: e.type,
        alpha: e.alpha,
        isElevationLayer: e.isElevationLayer
      };
      this._Layers.push(r), this.saveAll()
    }, u.prototype.saveAll = function () {
      localStorage.removeItem(i()), localStorage.setItem(i(), JSON.stringify(this._Layers))
    }, u.prototype.deleteItem = function (e) {
      var t = 0;
      for (var n = 0; n < this.Layers.length; ++n) e == this._Layers[n].displayName && (t = n);
      this._Layers.splice(t, 1), this.saveAll()
    }, u.prototype.getFeatureById = function (e) {
      for (var t = 0; t < this.Layers.length; t++) {
        var n = this.Layers[t];
        if (n.id == e) return n
      }
      return null
    }, s = new u, s
  }), define("tools/TETools/LayersTool", ["jquery", "TELang", "../MenuEntry", "tools/ToolDialog", "./LayersStorage", "tools/TabControl", "tools/ListControl", "../DisplayGroupItem", "../DisplayItem", "internal/Globals", "../ToolProtocol", "internal/Settings"], function (e, t, n, r, i, s, o, u, a, f, l, c) {
    "use strict";
    var h = 1,
      p = 2,
      d = 3,
      v = 4,
      m = 5,
      g = 6,
      y = 7,
      b = 8,
      w = 9,
      E = function () {
        this._objects = null, this._cptLayers = null, this._meshLayers = null, this._elevationLayers = null, this._rasterLayers = null, this._featureLayers = null, this._dataSource = null, this._myLayers = null, this._myLayersDictionary = [], this._showProjectLayersOnly = !0, this._currentButton = 1, this._tewTypes = ["Mesh", "Feature", "Imagery", "RasterComplex", "PointCloud", "Elevation"], this._typesAsString = "", this._externalFilteredTypesAsString, this._layersStorage = i.DefaultStorage, this._loadLayersToolResizing = !1, this._alreadyHasLeftButton = !1;
        var a = this;
        this.getId = function () {
          return "LayersTool"
        }, this.getMenuEntry = function () {
          return n.createFor(this, t.i18n("Menu_Layers"), "./img/newDesign/bt_layers.png", 30)
        }, this.open = function (n) {
          this._loadLayersToolResizing = !1;
          var i = e("<div style='position:absolute; overflow:hidden; width:270px; height:900px;'></div>"),
            a = e("<div id='ListParentID' style='position:absolute; overflow-y:auto; overflow-x:hidden; width:100%;height:100%;'></div>");
          this._tabControl = new s(i), this._tabControl.add(t.i18n("all"), e.proxy(this.onFilterValueChanged, this)), this._tabControl.add(t.i18n("layers_project_layers"), e.proxy(this.onFilterValueChanged, this)), this._tabControl.add(t.i18n("layers_my_layers"), e.proxy(this.onFilterValueChanged, this)), i.append(a), i.css({
            "overflow-y": "auto",
            width: "100%",
            height: "90%"
          }), a.css("position", "relative"), this._listControl = new o(a), this._listControl.IsAnalyzeToolList = !1, e("#sidebarContentDiv").empty(), r.openAsSideToolDialog(t.i18n("Menu_Layers"), "./img/dialogs/header_icons/layers.png", i.get(0)), a.css({
            height: i.height()
          }), this._dataSource = new u, this._dataSource.childItems = this.getLayersDataItems("all"), e("#TabButton0").click(), e("#TabButton0").parent().remove();
          var f = TerraExplorer.browser.isEdge,
            l = TerraExplorer.browser.isSafari,
            c = TerraExplorer.browser.isFirefox;
          f && e("#leftButton").css("top", "20px"), c && e("#leftButton").css("top", "6px"), l && e("#leftButton").css("top", "8px")
        }
      };
    return E.inheritsFrom(l), Cesium.defineProperties(E.prototype, {
      MyLayers: {
        get: function () {
          return this._myLayersDictionary
        }
      },
      TEWTypes: {
        get: function () {
          return this._tewTypes
        }
      },
      LoadLayersToolResizing: {
        get: function () {
          return this._loadLayersToolResizing
        }
      },
      FilteredTypesString: {
        get: function () {
          return this._externalFilteredTypesAsString
        },
        set: function (e) {
          this._externalFilteredTypesAsString = e
        }
      }
    }), E.prototype.onFilterValueChanged = function (n) {
      this._listControl.removeAll(), this._showProjectLayersOnly = !1;
      if (n == 0) {
        this._currentButton = 1, this.readLayers(), this._dataSource = this._all, this._dataSource.childItems = this._myLayers.childItems.concat(this._featureLayers.childItems, this._rasterLayers.childItems, this._elevationLayers.childItems, this._meshLayers.childItems, this._cptLayers), this.buildList(this._myLayers), this.buildList(this._featureLayers), this.buildList(this._rasterLayers), this.buildList(this._elevationLayers), this.buildList(this._meshLayers), this.buildList(this._cptLayers);
        var i, s;
        e(".listControlLineTextHeaderSidebar").length > 0 && (i = e.grep(e(".listControlLineTextHeaderSidebar"), function (e) {
          return e.innerHTML == t.i18n("layers_my_layers")
        }), i != undefined && (s = e(i).parent())), s != undefined && (r.addLeftButton(t.i18n("LayersTool_LoadLayersFromServer"), s, e.proxy(this.displayLayersControl, this)), e("#leftButton").css({
          position: "absolute",
          left: "170px",
          top: "30px",
          "background-color": "#2a2a2a",
          border: "1px solid white"
        }))
      } else n == 1 ? (this._currentButton = 2, this._showProjectLayersOnly = !0, this.readLayers(), this._dataSource.childItems = this._featureLayers.childItems.concat(this._rasterLayers.childItems, this._meshLayers.childItems, this._cptLayers), this.buildList(this._featureLayers), this.buildList(this._rasterLayers), this.buildList(this._meshLayers), this.buildList(this._cptLayers)) : n == 2 && (this._currentButton = 3, this.readLayers(), this._dataSource = this._myLayers, this.buildList(this._myLayers))
    }, E.prototype.insertMyLayersKey = function (e) {
      var t = e.guid;
      this._myLayersDictionary[t] = !0, typeof e.refresh == "function" && e.refresh(), this._layersStorage.saveItem(e)
    }, E.prototype.onEdit = function (e) {
      var t = this._dataSource.getItem(e.data),
        n = this.getLayerFromItem(t);
      this.ToolManager.openTool("EditLayersTool", n)
    }, E.prototype.onDelete = function (t) {
      var n = this._dataSource.getItem(t.data),
        r = this.getLayerFromItem(n),
        i = null;
      if (r.type == "mesh" || r.type == "cpt") {
        i = TerraExplorer.internal.Project.MeshLayers;
        for (var s = 0; s < viewer.scene.primitives._primitives.length; s++) {
          var o = viewer.scene.primitives.get(s);
          n.id == o.guid && viewer.scene.primitives.remove(o)
        }
      } else if (r.type.substring(0, 4) == "Feat") i = TerraExplorer.internal.Project.FeatureLayers, i = i.sort(function (e, t) {
        return e.indexInProjectTree - t.indexInProjectTree
      });
      else if (r.type == "imagery")
        for (var s = 0; s < viewer.imageryLayers.length; s++) {
          var u = viewer.imageryLayers.get(s);
          u.guid == n.id && viewer.imageryLayers.remove(u)
        } else if (r.type == "elevation") {
          var a = TerraExplorer.internal.Project.ElevationLayers;
          for (var s = 0, f = a.length; s < f; s++) {
            var l = a[s];
            if (l.guid == r.guid) {
              a.splice(s, 1);
              break
            }
          }
        } var c = 0,
        h = 0;
      if (i != null) {
        for (var s = 0; s < i.length; s++) i[s].guid == r.guid && (c = s);
        i.splice(c, 1)
      }
      for (var p = 0; p < this._myLayers.childItems.length; ++p) {
        var d = this._myLayers.childItems[p];
        d.id == n.id && (h = p)
      }
      this._myLayers.childItems.splice(h, 1), r.show = !1, Cesium.defined(this._myLayersDictionary[n.id]) && delete this._myLayersDictionary[n.id], this._layersStorage.deleteItem(n.name), this.readLayers();
      switch (this._currentButton) {
        case 1:
          e("#TabButton0").click();
          break;
        case 2:
          e("#TabButton1").click();
          break;
        case 3:
          e("#TabButton2").click()
      }
      e("#menuIconLayersTool").length > 0 && e("#menuIconLayersTool").click()
    }, E.prototype.OpenLoadLayers = function (n, i, s) {
      function f() {
        TerraExplorer.browser.isChrome && (e(".toolDialog").height(810), e("#innerObject").height(750), e("#iframeContainer").height(780))
      }
      var o = 0,
        u = n + "te4w",
        a = n + "admin/telayers.aspx?type=" + s + escape("&") + "teweb=true";
      i.html('<iframe id="innerObject" style="width:1210px;height:708px;margin-top:40px;" type="text/html" src=' + u + "?url=" + a + "></iframe>"), r.PositionX = 300, r.PositionY = 70, r.open(t.i18n("Menu_Load_Layers"), "./img/dialogs/header_icons/layers.png", i.get(0)), e("#innerObject")[0].onload = function () {
        f()
      }, r.removeCloseButton(), r.ContainsFrame = !0, e("#ToolDialog").height(750);
      var l = document.getElementById("innerObject").contentWindow
    }, E.prototype.displayLayersControl = function () {
      this._typesAsString = this._tewTypes[0];
      for (var t = 1; t < this._tewTypes.length; t++) this._typesAsString += "|", this._typesAsString += this._tewTypes[t];
      this._typesAsString = Cesium.defaultValue(this._externalFilteredTypesAsString, this._typesAsString);
      var n = "http://www.skylineglobe.com",
        r = c.connectionUrl == undefined ? n : c.connectionUrl;
      r.indexOf("connectSG") != -1 && (r = r.replace("connectSG", ""));
      var i = e("<div id='iframeContainer' style=' overflow:hidden; width:1210px; height:750px;'></div>"),
        s = this,
        o = e('script[src="Creator.js"]').length;
      e.ajaxSetup({
        cache: !0
      });
      if (o == 0) {
        function u(e) {
          var t = document.createElement("script");
          t.type = "text/javascript", t.src = e, document.getElementsByTagName("head")[0].appendChild(t)
        }
        u(r + "Js/Creator.js"), s.OpenLoadLayers(r, i, s._typesAsString)
      } else this.OpenLoadLayers(r, i, this._typesAsString)
    }, E.prototype.getLayersDataItems = function () {
      this._objects == null && (this._objects = new u, this._meshLayers = new u(t.i18n("layers_mesh_layers")), this._cptLayers = new u(t.i18n("layers_cpt_layers")), this._rasterLayers = new u(t.i18n("layers_raster_layers")), this._elevationLayers = new u(t.i18n("layers_elevation_layers")), this._featureLayers = new u(t.i18n("layers_feature_layers")), this._myLayers = new u(t.i18n("layers_my_layers")), this._all = new u(t.i18n("all")), this.readLayers()), this._dataSource.childItems = this._objects.childItems.concat(this._meshLayers.childItems, this._cptLayers, this._rasterLayers.childItems, this._elevationLayers.childItems, this._featureLayers.childItems), this.buildList(this._featureLayers), this.buildList(this._rasterLayers), this.buildList(this._elevationLayers), this.buildList(this._meshLayers), this.buildList(this._cptLayers), this.buildList(this._myLayers)
    }, E.prototype.isMyLayer = function (e) {
      var t = this._myLayersDictionary[e.guid];
      return t != undefined ? !0 : !1
    }, E.prototype.readLayers = function () {
      this._myLayers.childItems.length = 0, this._featureLayers.childItems.length = 0;
      var e = TerraExplorer.internal.Project.FeatureLayers;
      e = e.sort(function (e, t) {
        return e.indexInProjectTree - t.indexInProjectTree
      });
      for (var t = 0; t < e.length; t++) {
        var n = e[t],
          r = "./img/dialogs/Feature_layers_points.png";
        n.Style.polygon ? r = "./img/dialogs/Feature_layers_polygons.png" : n.Style.polyline && (r = "./img/dialogs/Feature_layers_polylines.png");
        var i = new a(n.LayerDisplayName, r);
        i.id = n.guid, i.tag = h, i.latLon = n.latLon, this._featureLayers.childItems.push(i), this.isMyLayer(n) && (this._myLayers.childItems.push(i), this._featureLayers.childItems.pop())
      }
      for (var t = 0; t < TerraExplorer.internal.Project.KmlLayers.length; t++) {
        var n = TerraExplorer.internal.Project.KmlLayers[t],
          i = new a(n.LayerDisplayName, "./img/dialogs/Kml_layers.png");
        i.id = n.guid, i.tag = y, this._featureLayers.childItems.push(i), this.isMyLayer(n) && (this._myLayers.childItems.push(i), this._featureLayers.childItems.pop())
      }
      this._rasterLayers.childItems.length = 0;
      for (var t = 0; t < viewer.imageryLayers.length; t++) {
        var n = viewer.imageryLayers.get(t);
        if (n.displayName) {
          var i = new a(n.displayName, "./img/dialogs/Imagery_layers.png");
          i.id = n.guid, i.tag = p, i.latLon = n.latLon, this._rasterLayers.childItems.push(i), this.isMyLayer(n) && (this._myLayers.childItems.push(i), this._rasterLayers.childItems.pop())
        }
      }
      this._elevationLayers.childItems.length = 0;
      var s = TerraExplorer.internal.Project.ElevationLayers;
      if (s != null) {
        var o = s.length;
        for (var t = 0; t < o; t++) {
          var n = s[t];
          if (n.displayName) {
            var i = new a(n.displayName, "./img/dialogs/Imagery_layers.png");
            i.id = n.guid, i.tag = w, i.latLon = n.latLon, this._elevationLayers.childItems.push(i), this.isMyLayer(n) && (this._myLayers.childItems.push(i), this._elevationLayers.childItems.pop())
          }
        }
      }
      this._meshLayers.childItems.length = 0;
      for (var t = 0; t < viewer.scene.primitives.length; t++) {
        var n = viewer.scene.primitives.get(t);
        if (n.displayName && n instanceof Cesium.Cesium3DTileset) {
          var i = new a(n.displayName, n.type == "cpt" ? "./img/dialogs/PointCloud_layers.png" : "./img/dialogs/3D_layers.png");
          i.id = n.guid, i.tag = d, i.type == "cpt" ? this._cptLayers.childItems.push(i) : this._meshLayers.childItems.push(i), this.isMyLayer(n) && (this._myLayers.childItems.push(i), i.type == "cpt" ? this._cptLayers.childItems.pop() : this._meshLayers.childItems.pop())
        }
      }
    }, E.prototype.buildList = function (e) {
      if (e.childItems.length == 0) {
        if (e == this._myLayers) {
          var n = t.i18n("layers_my_layers"),
            r = "./img/favorits.png";
          this._listControl.add({
            header: !0,
            text: n,
            img: r
          })
        }
        return
      }
      var n, r;
      e == this._featureLayers ? (n = t.i18n("layers_feature_layers"), r = "./img/dialogs/Feature_layers_pointsIcon.png") : e == this._rasterLayers ? (n = t.i18n("layers_raster_layers"), r = "./img/layers.png") : e == this._elevationLayers ? (n = t.i18n("layers_elevation_layers"), r = "./img/layers.png") : e == this._meshLayers ? (n = t.i18n("layers_mesh_layers"), r = "./img/dialogs/3D_layersIcon.png") : e == this._cptLayers ? (n = t.i18n("layers_cpt_layers"), r = "./img/dialogs/PointCloud_layers.png") : e == this._myLayers && (n = t.i18n("layers_my_layers"), r = "./img/favorits.png"), this._listControl.add({
        header: !0,
        text: n,
        img: r
      });
      for (var i = 0; i < e.childItems.length; i++) this.addEntryToListControl(e.childItems[i])
    }, E.prototype.addEntryToListControl = function (t) {
      t == -1 && this._listControl.add({});
      var n = this.getLayerFromItem(t),
        r = this.isMyLayer(n),
        i = this;
      t.latLon != undefined && t.latLon == 1 || t.latLon == undefined ? this._listControl.add({
        onClick: function () {
          i.onFlyTo(t)
        },
        img: t.icon,
        text: t.name,
        buttons: this.getRowButtonsForEntry(t, r),
        checkbox: {
          isChecked: i.getShowLayer(t),
          onClick: function () {
            var n = e(this).is(":checked");
            i.showLayer(t, n)
          }
        }
      }) : this._listControl.add({
        onClick: function () {},
        img: t.icon,
        text: t.name,
        disabled: !0,
        buttons: this.getRowButtonsForEntry(t, r, !0),
        checkbox: {
          isChecked: !1,
          onClick: function () {}
        }
      })
    }, E.prototype.getLayerFromItem = function (t) {
      if (t.tag == h) {
        var n = e.grep(TerraExplorer.internal.Project.FeatureLayers, function (e) {
          return e.guid == t.id
        });
        if (n.length == 1) return n[0]
      } else if (t.tag == p)
        for (var r = 0; r < viewer.imageryLayers.length; r++) {
          var i = viewer.imageryLayers.get(r);
          if (i.guid == t.id) return i
        } else if (t.tag == w) {
          var s = TerraExplorer.internal.Project.ElevationLayers;
          if (s != null) {
            var o = s.length;
            for (var r = 0; r < o; r++) {
              var i = s[r];
              if (i.guid == t.id) return i
            }
          }
        } else if (t.tag == y) {
        var n = e.grep(TerraExplorer.internal.Project.KmlLayers, function (e) {
          return e.guid == t.id
        });
        if (n.length == 1) return n[0]
      } else if (t.tag == d)
        for (var r = 0; r < viewer.scene.primitives.length; r++) {
          var i = viewer.scene.primitives.get(r);
          if (i.guid == t.id) return i
        }
      return null
    }, E.prototype.onFlyTo = function (e) {
      var t = this.getLayerFromItem(e);
      t.BoundingBox != undefined && t.BoundingBox.beenModified != undefined && (t.BoundingBox.east -= 1, t.BoundingBox.north -= 1, delete t.BoundingBox.beenModified);
      if (t) switch (e.tag) {
        case h:
          viewer.camera.flyTo({
            destination: t.BoundingBox
          });
          break;
        case y:
          viewer.flyTo(t);
          break;
        case p:
          viewer.camera.flyTo({
            destination: t.imageryProvider.rectangle
          });
          break;
        case w:
          viewer.camera.flyTo({
            destination: t.rectangle
          });
          break;
        case d:
          t.type == "cpt" ? viewer.camera.flyToBoundingSphere(t.boundingSphere) : viewer.camera.flyTo({
            destination: new Cesium.Rectangle(t.properties.Longitude.minimum, t.properties.Latitude.minimum, t.properties.Longitude.maximum, t.properties.Latitude.maximum)
          })
      }
      r.close()
    }, E.prototype.getShowLayer = function (e) {
      var t = this.getLayerFromItem(e);
      return t ? e.tag == y ? viewer.dataSources.contains(t) : (t.show == undefined && (t.show = t.visibility), t.show) : !0
    }, E.prototype.showLayer = function (e, t) {
      var n = this.getLayerFromItem(e);
      n && (e.tag == y ? viewer.dataSources.contains(n) && !t ? viewer.dataSources.remove(n) : !viewer.dataSources.contains(this) && t && viewer.dataSources.add(n) : n.show = t, e.tag == w && viewer.scene.globe._surface.invalidateAllTiles())
    }, E.prototype.onRefreshLayer = function (e) {
      var t = this.getLayerFromItem(e);
      if (t) switch (e.tag) {
        case h:
          t.refresh();
          break;
        case y:
          t.refresh();
          break;
        case w:
          viewer.scene.globe._surface.invalidateAllTiles()
      }
    }, E.prototype.getRowButtonsForEntry = function (t, n, r) {
      if (r != undefined) return [{
        img: "./img/dialogs/actions/delete.png",
        onClick: e.proxy(this.onDelete, this)
      }];
      switch (t.tag) {
        case h:
        case y:
          if (n) return [{
            img: "./img/dialogs/actions/refresh.png",
            onClick: e.proxy(function () {
              this.onRefreshLayer(t)
            }, this)
          }, {
            img: "./img/dialogs/actions/edit.png",
            onClick: e.proxy(this.onEdit, this)
          }, {
            img: "./img/dialogs/actions/delete.png",
            onClick: e.proxy(this.onDelete, this)
          }];
        case d:
        case p:
        case w:
          if (n) return [{
            img: "./img/dialogs/actions/refresh.png",
            onClick: e.proxy(function () {
              this.onRefreshLayer(t)
            }, this)
          }, {
            img: "./img/dialogs/actions/delete.png",
            onClick: e.proxy(this.onDelete, this)
          }]
      }
    }, E
  }), define("tools/TETools/UndergroundTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "../ToolProtocol"], function (e, t, n, r, i) {
    "use strict";
    var s = function () {
      this.getId = function () {
        return "UndergroundTool"
      }, this.getMenuEntry = function () {
        return r.createFor(this, t.i18n("Menu_Underground"), "./img/newDesign/underground.png", 70, r.MenuEntryNavigation(), t.i18n("NavigationTools_Header"))
      }, this.open = function (n) {
        viewer.scene.undergroundMode = !viewer.scene.undergroundMode;
        if (viewer.scene.undergroundMode) {
          if (e("#UndergroundIndicator").length == 0) {
            var r = e("<div id='UndergroundIndicator' style='pointer-events:none; position: absolute; width: 100%; height: 23px; top: 20px; left:0px; display: flex; align-items: center; justify-content: center;'><div id='UndergroundBtn' class='s7' style='pointer-events:all; cursor: pointer; position: relative; opacity:.8; border:1px solid rgba(255,255,255,0.5); padding: 4px;'>" + t.i18n("Underground_tool_UndergroundMode") + "</div></div>");
            e("#mainContainer").append(r), e("#UndergroundBtn").click(e.proxy(function () {
              TerraExplorer.tools.MenuButton.menuEntryClicked(this.getMenuEntry())
            }, this));
            if (!viewer.scene.context.depthTexture) {
              var i = e("<div id='warrningDepthTexture' style='pointer-events:none; position: absolute; width: 100%; height: 23px; top: 80px; left:0px; display: flex; align-items: center; justify-content: center;'><div class='s7' style='pointer-events:all; cursor: pointer; position: relative; opacity:.8; padding: 4px; text-align: center;'>" + t.i18n("Underground_tool_Warrning1") + "<br>" + t.i18n("Underground_tool_Warrning2") + "</div></div>");
              e("#mainContainer").append(i)
            }
          }
        } else e("#UndergroundIndicator").length > 0 && (e("#UndergroundIndicator").remove(), e("#warrningDepthTexture").remove(), e("#checkImageSubHeaderUnderground").length > 0 && e("#checkImageSubHeaderUnderground").remove())
      }
    };
    return s.inheritsFrom(i), Cesium.defineProperties(s.prototype, {
      Settings: {
        get: function () {
          return teSettings
        }
      },
      IsUnderground: {
        get: function () {
          return viewer.scene.undergroundMode
        }
      }
    }), s
  }), define("internal/NavigationControl", ["jquery", "jquery.plugs", "./Navigate", "./GeometryHelper", "./Settings"], function (e, t, n, r, i) {
    "use strict";
    var s = 1,
      o = function () {
        this._visibility = !1, this._zoomDirection = 0, this._stopZoomRequest = !1, this._prevOnFrameTime = 0, this._Movement = null, this._showCenterSign = !1
      };
    return Cesium.defineProperties(o.prototype, {
      Visibility: {
        get: function () {
          return this._visibility
        },
        set: function (t) {
          var n = e(".NavElement");
          if (e("#NavigationDiv").length = !0) t ? n.show() : n.hide();
          this._visibility = t
        }
      },
      ShowCenterSign: {
        get: function () {
          return this._showCenterSign
        },
        set: function (t) {
          t ? e("#CenterSign").show() : e("#CenterSign").hide(), this._showCenterSign = !!t
        }
      }
    }), o.prototype.init = function () {
      var t = e(".NavElement"),
        r = e("<div class='s9 NavElement' id='NavigationDiv' style='position:absolute; right:20px; top:50%; opacity: 1.0; width:40px; height:160px; background-image:url(img/newDesign/ZoomControlBackground.png)'></div>").disableSelection(),
        s = e("<div id='CompassNorthDiv'class='link NavElement' style='position:absolute; opacity: 1.0; left:3px; top:10px;'><img id='CompassNorthImg' class='NavElement' src='img/ZoomControlNorth.png' style='left:2px; top:2px;'/></div>").disableSelection(),
        o = e("<div id='CompassDiv'class='link NavElement' style='position:absolute; opacity: 1.0; left:3px; top:10px;'><img id='CompassImg' src='img/ZoomControlDirection.png' /></div>").disableSelection(),
        u = e("<div id='ZoomInDiv'class='link NavElement' style='position:absolute; opacity: 1.0; left:2px; top:55px;'><img id='ZoomInImg' src='img/ZoomControlPlus.png' /></div>").disableSelection(),
        a = e("<div id='ZoomOutDiv'class='link NavElement' style='position:absolute; opacity: 1.0; left:2px; top:110px;'><img id='ZoomOutImg' src='img/ZoomControlMinus.png' /></div>").disableSelection(),
        f = e("<img id='CenterSign' style='pointer-events: none; position:absolute; top: 50%; left: 50%; width: 21px; height: 21px; margin-top: -10px; margin-left: -10px;' src='img/CenterSign.png' />");
      e("#mainContainer").append(r), r.append(s), r.append(o), r.append(u), r.append(a), e("#mainContainer").append(f), e("#CompassNorthImg").on("dragstart", function (e) {
        e.preventDefault()
      }), e("#CompassImg").on("dragstart", function (e) {
        e.preventDefault()
      }), e("#ZoomInImg").on("dragstart", function (e) {
        e.preventDefault()
      }), e("#ZoomOutImg").on("dragstart", function (e) {
        e.preventDefault()
      }), o.hide(), viewer.scene.preRender.addEventListener(this.onPreFrame, this), e("#CompassDiv").click(e.proxy(n.faceNorth, n)), e("#CompassNorthDiv").click(e.proxy(n.faceNorth, n)), e("#CompassDiv").on("touchstart", e.proxy(n.faceNorth, n)), e("#CompassNorthDiv").on("touchstart", e.proxy(n.faceNorth, n)), e("#ZoomInDiv").on("touchstart", e.proxy(function (e, t) {
        this._zoomDirection = 1, this._stopZoomRequest = !1
      }, this)), e("#ZoomInDiv").on("touchend", e.proxy(function (e, t) {
        this._zoomDirection = 1, this._stopZoomRequest = !0
      }, this)), e("#ZoomOutDiv").on("touchstart", e.proxy(function (e, t) {
        this._zoomDirection = -1, this._stopZoomRequest = !1
      }, this)), e("#ZoomOutDiv").on("touchend", e.proxy(function (e, t) {
        this._zoomDirection = -1, this._stopZoomRequest = !0
      }, this)), e("#ZoomInDiv").mousecapture({
        down: e.proxy(function (e, t) {
          this._zoomDirection = 1, this._stopZoomRequest = !1
        }, this),
        up: e.proxy(function (e, t) {
          this._stopZoomRequest = !0
        }, this)
      }), e("#ZoomOutDiv").mousecapture({
        down: e.proxy(function (e, t) {
          this._zoomDirection = -1, this._stopZoomRequest = !1
        }, this),
        up: e.proxy(function (e, t) {
          this._stopZoomRequest = !0
        }, this)
      }), this.Visibility = Cesium.defaultValue(i.navigationControlVisibility, !0), this.ShowCenterSign = Cesium.defaultValue(i.navigationControlCenterSign, !0)
    }, o.prototype.onPreFrame = function (t, r) {
      s = Cesium.JulianDate.secondsDifference(r, this._prevOnFrameTime), this._prevOnFrameTime = r;
      if (viewer.scene.mode == Cesium.SceneMode.MORPHING) return;
      var i = viewer.camera;
      if (this._visibility == 1) {
        var o = Cesium.Math.toDegrees(i.heading);
        o > 359.5 || o < .5 ? (e("#CompassDiv").hide(), e("#CompassNorthDiv").show(), e("#CompassNorthDiv").rotate(-o)) : (e("#CompassNorthDiv").hide(), e("#CompassDiv").show(), e("#CompassDiv").rotate(-o))
      }
      if (this._zoomDirection != 0) {
        var u = Math.max(1, n.HeightAboveGround / 10);
        this._zoomDirection == 1 ? (i.zoomIn(u), n.HeightAboveGround < 1 && !viewer.scene.showUndergroundSurface && i.zoomOut(u)) : n.HeightAboveGround + u * 1.5 < n.MAX_ALTITUDE && i.zoomOut(u * 1.5), this._stopZoomRequest && (this._zoomDirection = 0)
      }
    }, new o
  }), define("internal/StatusBar", ["jquery", "TELang", "internal/Units"], function (e, t, n) {
    "use strict";
    var r = "",
      i = "",
      s = "",
      o = "",
      u = "",
      a = "",
      f = "",
      l = "",
      c = function () {
        this._visibility = !1, this._copyright = "", this._displayLocation = !0, this._isBuffering = !1, this._mgrsString = ""
      };
    return Cesium.defineProperties(c.prototype, {
      Visibility: {
        get: function () {
          return this._visibility
        },
        set: function (n) {
          if (e("#StatusBarDiv").length == 0 && n == 1) {
            this._copyright.length == 0 && (this._copyright = t.i18n("StatusBar_Copyright")), r = t.i18n("StatusBar_North"), i = t.i18n("StatusBar_South"), s = t.i18n("StatusBar_East"), o = t.i18n("StatusBar_West"), u = t.i18n("Meter"), a = t.i18n("Km"), f = t.i18n("Feet"), l = t.i18n("Mile");
            var c = e("<div class='s7' id='StatusBarDiv' style='position:absolute; left:0px; bottom:0px; width:100%; height:20px;'>                                            <img id='GradImg' src='img/bottom_black_gradiant.png' style='position: absolute; width:100%; height: 80px; bottom: 0px; pointer-events:none;'/>                                            <div style='padding:4px;'>                                                <span id='CopyrightTxt' class='statusBarCell' style='padding-right: 10px'>" + this._copyright + "</span>                                                <span id='CoordHeight' class='statusBarCell truncate' style='width:90px;'>0</span>                                                <span id='MGRS_Coordinates' class='statusBarCell' style='width:160px;display:none;'></span>                                                <span id='CoordLong' class='statusBarCell truncate' style='width:80px;'>0</span>                                                <span id='CoordLat' class='statusBarCell truncate' style='width:80px;'>0</span>                                                <span id='bufferingId' class='statusBarCell truncate' style='width:40px;'><img id='bufferingImgId' src='./img/buffering_dots_static.png'/></span>                                            </div>                                          </div>");
            e("#mainContainer").append(c), e("#StatusBarDiv").on("dragstart", function (e) {
              e.preventDefault()
            }), e("#StatusBarDiv").attr("unselectable", "off"), e("#StatusBarDiv").css({
              "-webkit-user-select": "text"
            }), this.MGRS_Visibility = !1, viewer.scene.preRender.addEventListener(this.onPreFrame, this), this.DisplayLocation = this._displayLocation, setInterval(e.proxy(function () {
              var t = this.isBuffering();
              this._isBuffering != t && (e("#bufferingImgId").prop("src", t ? "./img/buffering_dots.gif" : "./img/buffering_dots_static.png"), this._isBuffering = t)
            }, this), 500)
          }
          this._visibility = n
        }
      },
      Copyright: {
        get: function () {
          return this._copyright
        },
        set: function (t) {
          e("#CopyrightTxt").length != 0 && e("#CopyrightTxt").text(t), this._copyright = t
        }
      },
      MGRS_Value: {
        get: function () {
          return this._mgrsString
        },
        set: function (e) {
          if (typeof e != "string") {
            console.error("Cannot Set MGRS string to type: " + typeof e);
            return
          }
          this._mgrsString = e
        }
      },
      MGRS_Visibility: {
        get: function () {
          return e("#MGRS_Coordinates").is(":visible")
        },
        set: function (t) {
          t ? (e("#MGRS_Coordinates").show(), TerraExplorer.internal.Settings.displayMGRS = !0) : (e("#MGRS_Coordinates").hide(), TerraExplorer.internal.Settings.displayMGRS = !1)
        }
      },
      DisplayLocation: {
        get: function () {
          return this._displayLocation
        },
        set: function (t) {
          t == 0 ? (e("#CoordLong").hide(), e("#CoordLat").hide(), e("#CoordHeight").hide()) : (e("#CoordLong").show(), e("#CoordLat").show(), e("#CoordHeight").show()), this._displayLocation = t
        }
      }
    }), c.prototype.onPreFrame = function (c, h) {
      var p = viewer.camera.positionCartographic,
        d = Cesium.Math.toDegrees(p.longitude),
        v = d.toFixed(5) + " " + (d >= 0 ? s : o),
        m = Cesium.Math.toDegrees(p.latitude),
        g = m.toFixed(5) + " " + (m >= 0 ? r : i),
        y = p.height;
      e("#CoordLong").text() != v && e("#CoordLong").text(v), e("#CoordLat").text() != g && e("#CoordLat").text(g);
      var b = y.toFixed(2) + " " + u;
      y > 1e4 && (b = (y / 1e3).toFixed(2) + " " + a);
      if (TerraExplorer != undefined && TerraExplorer.internal.Units.AltitudeUnit == TerraExplorer.internal.Units.FEET) {
        var w = TerraExplorer.internal.Units.meterToFeet(y);
        b = w.toFixed(2) + " " + f, w > 1e4 && (b = (y / 5280).toFixed(2) + " " + l)
      }
      e("#CoordHeight").text() != b && e("#CoordHeight").text(b), this.MGRS_Visibility && c.frameState.frameNumber % 2 == 0 && (this._mgrsString = n.LL2MGRS(d, m)), e("#MGRS_Coordinates").text() != this._mgrsString && e("#MGRS_Coordinates").text(t.i18n("StatusBar_MGRS") + ": " + this._mgrsString)
    }, c.prototype.isBuffering = function () {
      var t = !1;
      for (var n = 0; n < viewer.imageryLayers.length; n++) {
        var r = viewer.imageryLayers.get(n).imageryProvider;
        if (r.pendingRequests || 0) {
          t = !0;
          break
        }
      }
      var i = 0;
      e(TerraExplorer.internal.Project.MeshLayers).each(function (e, t) {
        i += t._statistics.numberOfPendingRequests
      });
      var s = i > 0;
      return t |= s, t
    }, new c
  }), define("tools/TETools/SettingsTool", ["jquery", "TELang", "tools/ToolDialog", "internal/Globals", "../MenuEntry", "internal/Units", "internal/NavigationControl", "../ToolContainer", "internal/NotificationCenter", "internal/Settings", "../ToolProtocol", "internal/StatusBar"], function (e, t, n, r, i, s, o, u, a, f, l, c) {
    "use strict";
    var h = function () {
      this._sideStyle = !0;
      var r = this;
      this._connectionState, this._connectionString = "", this.getId = function () {
        return "SettingsTool"
      }, this.getMenuEntry = function () {
        return i.createFor(this, t.i18n("Menu_Setting"), "./img/newDesign/settings_caption.png", 90)
      }, this.open = function (i) {
        this._connectionState = f.connectionState;
        var u = e("<div class='Settings' style='position:absolute; width:100%; height:100%; overflow-y:auto; padding:10px;'></div>"),
          a = e("<div class='SettingsHeader'><span>" + t.i18n("view") + "</span></div>"),
          l = e("<label class='Settingslabel' for='UnitsId' style='width:96%;'>" + t.i18n("settings_units") + "<div class='Settingslabel SettingsRadio' id='UnitsId' style=' cursor: pointer;'><label><input type='radio' class='' name='Units' value='" + s.METERS + "'>" + t.i18n("settings_units_meters") + "</input><img/></label><label><input type='radio' name='Units' value='" + s.FEET + "'>" + t.i18n("settings_units_feet") + "</input><img/></label></div></label><br/>"),
          h = e("<label class='Settingslabel' style='display:inline-block; width:80%;'>" + t.i18n("settings_navigation_buttons") + "</label><input type='checkbox' class='css-checkbox' id='NavButtonsId' style='' /><label class='css-label' style='position:relative;right:-18px;top:0px;' for='NavButtonsId'></label><br/>"),
          p = e("<label class='Settingslabel' style='display:inline-block; width:80%;'>" + t.i18n("settings_center_sign") + "</label><input type='checkbox' class='css-checkbox' id='CenterSignId' style='' /><label class='css-label' style='position:relative;right:-18px;top:0px;' for='CenterSignId'></label><br/>"),
          d = e("<label class='Settingslabel' style='display:inline-block; width:80%;'>" + t.i18n("settings_MGRS_Coordinates") + "</label><input type='checkbox' class='css-checkbox' id='MGRS_CoordinatesId' style='' /><label class='css-label' style='position:relative;right:-18px;top:0px;' for='MGRS_CoordinatesId'></label><br/>"),
          v = e("<div class='SettingsHeader'><span>SkylineGlobe Server</span></div>"),
          m = e('<div id="urlDiv"><label class="Settingslabel">' + t.i18n("settings_URL") + '</label><br/><label class="Settingslabel" style="font-size:0.8em;position:relative;left:15px;">' + TerraExplorer.internal.Settings.connectionUrl + "</label></div><br/>"),
          g = e("<div  class='Settingslabel' id ='openAnotherProjectId'>" + t.i18n("settings_Open_Another_Project") + "<a href='#' id='btnOpenProject' class='SettingsButton' style='right:-15px;'>" + t.i18n("open") + "</a></div>"),
          y = e("<div class='SettingsHeader'><span>" + t.i18n("settings_general_header") + "</span></div>"),
          b = e("<label class='Settingslabel' for='LongPressId' style='96%'>" + t.i18n("settings_long_press") + "<div class='Settingslabel SettingsRadio' id='LongPressId' style='cursor: pointer;'><label><input type='radio' class='' name='Long' value='Places'>" + t.i18n("Menu_Places") + "</input><img/></label><label><input type='radio' name='Long' value='Layers'>" + t.i18n("Menu_Layers") + "</input><img/></label></div></label><br/>"),
          w = e("<label class='Settingslabel'  style=''>" + t.i18n("settings_view_tutorial") + "</label><a href='#' id='viewTutorialId' class='SettingsButton' style='right:0px;'>" + t.i18n("view") + "</a><br/>"),
          E = e("<label  class='Settingslabel'  style=''>" + t.i18n("settings_License_File") + "</label><a href='#' id='viewLicenseId' class='SettingsButton' style='right:0px;'>" + t.i18n("view") + "</a><br/>"),
          S = TerraExplorer.Version.split(".");
        S = S[0] + "." + S[1] + "." + S[2];
        var x = t.i18n("TerraExplorer") + " " + t.i18n("settings_about_version_abr") + S,
          T = e("<div><label class='Settingslabel'  style=''>" + t.i18n("settings_about") + x + "</label><a href='#' id='viewAboutId' class='SettingsButton' style='right:0px;'>" + t.i18n("view") + "</a></div><br/>"),
          N = e("#connectionStatusID"),
          C = e('<div id="urlDiv"><label class="toolDialogLabelSidebar" style=" width:30%;">' + t.i18n("settings_User") + '</label><input id="userNameID" class="toolDialogInputText" type="text" value ="" style="float:right;width:50%;margin-right:110px;"/>' + "</div>"),
          k = e('<div id="urlDiv"><label class="toolDialogLabelSidebar" style=" width:30%;">' + t.i18n("settings_Pass") + '</label><input id="passwordID" class="toolDialogInputText" type="password" value ="" style="float:right;width:50%;margin-right:110px;"/>' + "</div>");
        u.append(a).append(l).append(h).append(p).append(d).append(v).append(m).append(g).append(y).append(E).append(T), e("#sidebarContentDiv").empty(), this._sideStyle ? n.openAsSideToolDialog(t.i18n("title_activity_settings"), "./img/settings.png", u.get(0)) : n.open(t.i18n("title_activity_settings"), "./img/settings.png", u.get(0), e.proxy(this.onClose, this)), T.click(e.proxy(this.onAbout, this)), f.navigationControlCenterSign == undefined && (f.navigationControlCenterSign = !0), f.navigationControlVisibility == undefined && (f.navigationControlVisibility = !0), f.displayMGRS == undefined && (f.displayMGRS = !1), e("#NavButtonsId").prop("checked", f.navigationControlVisibility), e("#NavButtonsId").click(function () {
          o.Visibility = e(this).is(":checked"), f.navigationControlVisibility = o.Visibility
        }), e("#CenterSignId").prop("checked", f.navigationControlCenterSign), e("#CenterSignId").click(function () {
          o.ShowCenterSign = e(this).is(":checked"), f.navigationControlCenterSign = o.ShowCenterSign
        }), e("#MGRS_CoordinatesId").prop("checked", f.displayMGRS), e("#MGRS_CoordinatesId").click(function () {
          c.MGRS_Visibility = e(this).is(":checked"), f.displayMGRS = c.MGRS_Visibility
        }), f.altitudeUnit == undefined && (f.altitudeUnit = 0), f.altitudeUnit != undefined && (f.altitudeUnit == 1 || f.altitudeUnit == 0) && (e("#UnitsId input")[f.altitudeUnit].checked = !0), e("input[type=radio][name=Units]").change(e.proxy(this.onUnitsChange, this)), e("#viewLicenseId").on("click", e.proxy(this.onViewLicenseTutorial, this, 0)), e("#viewTutorialId").on("click", e.proxy(this.onViewLicenseTutorial, this, 1)), e("#connectButton").on("click", function () {
          e("#connectButton").html() == t.i18n("disconnectFromSG") ? r.disconnectFromSG() : r.connectToSG()
        }), e("#btnOpenProject").click(e.proxy(this.onOpenProject, this));
        var L = Cesium.defaultValue(f.longPressToolId, "PlacesTool");
        e("#LongPressId").val(L), this.readFromSettings(), this._sideStyle && (e(".toolDialogLabelSidebar").css({
          "background-color": "#141414",
          color: "#FFFFFF"
        }), e(".selectionBox").css("width", "90%"))
      }
    };
    return h.inheritsFrom(l), Cesium.defineProperties(h.prototype, {
      SettingsToolOpen: {
        get: function () {}
      },
      Settings: {
        get: function () {
          return teSettings
        }
      }
    }), h.prototype.validateInputFields = function () {
      return e("#userNameID").val() == "" || e("#passwordID").val() == "" || e("urlID").val() == "" ? (TerraExplorer.tools.ToolDialog.showAlertDialog(t.i18n("SettingsTool_EmptyFields")), !1) : !0
    }, h.prototype.onOpenProject = function () {
      TerraExplorer.tools.ToolManager._tools.LayersTool.FilteredTypesString = ["TerraExplorerProjectWeb"], TerraExplorer.tools.ToolManager._tools.LayersTool.displayLayersControl(), console.log("Open Project!"), TerraExplorer.tools.ToolManager._tools.LayersTool.FilteredTypesString = undefined
    }, h.prototype.connectToSG = function () {
      var n = "";
      f.cookieString != undefined && (n = f.cookieString);
      var r = {
          username: f.userConnection,
          password: f.passwordConnection,
          cookie: n,
          toDelete: "false"
        },
        i = JSON.stringify(r),
        s = f.connectionUrl + "connectSG",
        o = this;
      e.ajax({
        type: "POST",
        url: s,
        xhrFields: {
          withCredentials: !0
        },
        data: i,
        success: function (n, r, i) {
          e("#connectButton").html(t.i18n("disconnectFromSG")), f.connectionState = "connected", e("#connectionStatusID").attr("src", "img/TE4WConnectedSmall.png"), f.cookieString = n, f.saveSettings()
        },
        error: function (n) {
          if (n.status == 530) {
            o.disconnectFromSG();
            return
          }
          e("#connectionStatusID").attr("src", "img/TE4WDisconnectedSmall.png"), f.connectionState = "Disconnected", e("#connectButton").html(t.i18n("connectToSG")), f.saveSettings()
        }
      })
    }, h.prototype.readFromSettings = function () {
      e("#userNameID").val(f.userConnection), e("#passwordID").val(f.passwordConnection), e("#urlID").val(f.connectionUrl)
    }, h.prototype.onUnitsChange = function () {
      e(e("#UnitsId input")[0]).is(":checked") == 1 ? s.AltitudeUnit = 0 : s.AltitudeUnit = 1, a.postNotification("TEN_UNITS_CHANGED", this)
    }, h.prototype.onClose = function (t) {
      if (t) return;
      f.altitudeUnit = s.AltitudeUnit, f.longPressToolId = e("#LongPressId").find(":checked").val(), f.saveSettings()
    }, h.prototype.disconnectFromSG = function () {
      var n = f.connectionUrl + "connectSG",
        r = this,
        i = f.cookieString,
        s = {
          username: "",
          password: "",
          cookie: i,
          toDelete: "true"
        },
        o = JSON.stringify(s);
      e.ajax({
        type: "POST",
        url: n,
        data: o,
        xhrFields: {
          withCredentials: !0
        },
        success: function (n) {
          n == "false" ? TerraExplorer.tools.ToolDialog.showAlertDialog(t.i18n("SettingsTool_DeleteCookieProblem")) : n == "" && (e("#connectionStatusID").attr("src", "img/TE4WDisconnectedSmall.png"), f.connectionState = "Disconnected", e("#connectButton").html(t.i18n("connectToSG")), f.cookieString = "", f.saveSettings())
        },
        error: function () {}
      })
    }, h.prototype.onAbout = function () {
      this.ToolManager.openTool("AboutTool")
    }, h.prototype.onViewLicenseTutorial = function (r) {
      var i = e("<div id='iframeContainer' style=' overflow:hidden; width:1210px; height:750px;'></div>"),
        s = r ? t.i18n("settings_TerraExplorer_For_Web_Tutorial") : t.i18n("settings_TerraExplorer_For_Web_License"),
        o = r ? "./docs/tutorial.html" : "./docs/license.html";
      i.html('<iframe id="innerObject" style="width:1210px;height:708px;margin-top:40px;overflow-x: hidden;" type="text/html" src=' + o + "></iframe>"), n.PositionX = 300, n.PositionY = 70, n.open(s, "./img/newDesign/logo_no_alpha.png", i.get(0)), e("iframe").css("border", "none"), e(".toolDialog").height("780").width(), e("#CloseButton").css({
        bottom: "5px",
        border: "#2b2b2b solid 1px"
      })
    }, h
  }), define("internal/SearchBox", ["jquery", "./TEPosition", "jquery.plugs", "TELang"], function (e, t, n, r) {
    "use strict";

    function f() {
      return s++, {
        query: null,
        data: [],
        index: s,
        completed: !1
      }
    }

    function l(e) {
      return e.split("").reverse().join("")
    }

    function c(e) {
      var t = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿",
        n = "֑-߿יִ-﷽ﹰ-ﻼ",
        r = new RegExp("^[^" + t + "]*[" + n + "]");
      return r.test(e[0])
    }

    function h(e) {
      var t = e.split(""),
        n = t.indexOf("‎");
      while (n >= 0) t.splice(n, 1), n = t.indexOf("‎");
      return t.join("")
    }
    var i = "http://www.skylineglobe.com/Skylineglobe/layers/SGServices.json",
      s = 0,
      o = null,
      u = "No results found",
      a = "Connection error",
      p = function () {
        this._visibility = !1, this._searchCopyright = "", this._searchResultsPopup = !1, this._searchTerrainLabel = null, this._searchErrorWasAlreadyShown = !1, this._searchServer = "", this._searchServerTail = "callback=fillAutoComplete<_searchIndex>&q=", this._searchLon = null, this._searchLat = null, this._isCoordSearch = !1, this._MGRS = undefined, this.jqxhr = e.ajax({
          url: i,
          context: this,
          success: function (e) {
            e.AddressSearch && this._searchServer.length == 0 && (this._searchServer = e.AddressSearch[0].Value)
          },
          error: function () {
            alert(a), this.hideResultsPopup()
          }
        }), this._searchLastRequest = new f, this.flyTo = window._searchFlyTo = e.proxy(function (e, n, r, i) {
          i != undefined && this._searchLastRequest.completed && (this.saveSearch(this._searchLastRequest.data[i]), this.hideResultsPopup());
          var s = this,
            u = Cesium.sampleTerrain(viewer.terrainProvider, 16, [Cesium.Cartographic.fromDegrees(n, e)]);
          Cesium.when(u, function (i) {
            i[0].height == undefined && (i[0].height = 0);
            var u = r.split("["),
              a = u[0];
            s._searchTerrainLabel != null && viewer.entities.remove(s._searchTerrainLabel), s._searchTerrainLabel = viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(n, e, i[0].height + 100),
              label: {
                text: h(a),
                scale: 1
              }
            }), o = s._searchTerrainLabel;
            var f = o.label.text;
            f.setValue(c(f.getValue()) ? l(f.getValue()) : f.getValue()), TerraExplorer.internal.Navigate.flyToPosition(new t({
              cartesian: Cesium.Cartesian3.fromDegrees(n, e, i[0].height + 100),
              headingPitchRange: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-89), 1e3)
            }))
          })
        }, this)
      };
    return Cesium.defineProperties(p.prototype, {
      Visibility: {
        get: function () {
          return this._visibility
        },
        set: function (t) {
          if (e("#SearchDiv").length == 0 && t == 1) {
            var n = e("<div class='s9' id='SearchDiv' style='position:relative; left:10px; top:10px; opacity: 1;'><div style='border:1px solid white;width:240px;height:24px;position:relative;'><input type='text' class='searchBox' id='search' style='background-color:black;border:none;position:relative;color:white;' ><img id='searchIcon' src='./img/newDesign/search.png' style='border-left:0.5px solid grey;vertical-align:middle;padding:2.8px;cursor:pointer;' /></div><div id='resultDiv' style='background-color:black;border: 1px solid gray;position:relative; display:none;z-index:1000;'></div></div>"),
              r = e("#searchBox");
            r.length > 0 && e(r).append(n), e("#searchIcon").click(e.proxy(this.flyToFirstResult, this)), e(".noselect").each(function () {
              this.onselectstart = function () {
                return !1
              }, this.unselectable = "on"
            }), e(document).bind("keypress", e.proxy(function (t) {
              t.keyCode == 13 && e("#search").is(":focus") && e.proxy(this.flyToFirstResult(), this)
            }, this)), e("#resultDiv").width(e("#search").width()), setTimeout(function () {
              e("#search").focus()
            }, 100), setInterval(e.proxy(this.doSearch, this), 300)
          }
          if (e("#SearchDiv").length = !0)
            if (t) {
              var i = e("#locationContainer")[0] != undefined ? e("#locationContainer")[0].dataset.defaultWidth : e("#sideBar")[0].dataset.defaultWidth,
                s = i * .92;
              e("#SearchDiv").css({
                width: s,
                left: (i - s) / 2 - 1
              }), e("#search").width(s - e("#searchIcon").outerWidth() - 4), e("#resultDiv").width("240"), e("#SearchDiv").show()
            } else e("#SearchDiv").hide();
          this._visibility = t
        }
      },
      SearchServer: {
        get: function () {
          return this._searchServer
        },
        set: function (e) {
          this._searchServer = e
        }
      }
    }), p.prototype.hideResultsPopup = function () {
      e("#resultDiv").html("").hide(), this._searchResultsPopup = !1
    }, p.prototype.doCatalogSearch = function (t) {
      var n = "http://dev.skyline.co.il/sg/Streamer.ashx?VERSION=1.0.0&Service=CSW&outputFormat=application/xml&Username=&Password=&request=GetRecords&CONSTRAINTLANGUAGE=CatalogQuery&constraint=" + t + "&resultType=result&startPosition=1&MaxRecords=5";
      e.ajax({
        url: n,
        dataType: "xml",
        xhrFields: {
          withCredentials: !0
        },
        success: function (e) {
          console.log(e)
        },
        error: function (e) {
          console.log(e)
        }
      })
    }, p.prototype.fillAutoComplete = function (e, t) {
      function n(e) {
        if (e != undefined && e.indexOf(",") > -1) {
          var r = e.split(",");
          if (r.length == 2) {
            var i = !isNaN(r[0]) && isFinite(r[0]) && r[0].match(/[0-9]/g) != null ? Number(r[0]) : null,
              s = !isNaN(r[1]) && isFinite(r[1]) && r[1].match(/[0-9]/g) != null ? Number(r[1]) : null;
            if (i != null && i >= -180 && i <= 180 && s != null && s >= -90 && s <= 90) {
              TerraExplorer.internal.SearchBox._isCoordSearch = !0, t.lon = i, t.lat = s, TerraExplorer.internal.SearchBox._MGRS != undefined && (t.mgrs = TerraExplorer.internal.SearchBox._MGRS), TerraExplorer.internal.SearchBox.createResultsPopup(t);
              return
            }
          }
        } else if (e != undefined && (e.indexOf("MGRS:") > -1 || e.indexOf("mgrs:") > -1)) {
          e = e.replace(/ /g, ""), e = e.indexOf("MGRS:") > -1 ? e.split("MGRS:")[1] : e.split("mgrs:")[1];
          if (e == "") return;
          try {
            var o = TerraExplorer.internal.Units.MGRS2LL(e),
              u = o.longitude + "," + o.latitude;
            TerraExplorer.internal.SearchBox._MGRS = e, n(u)
          } catch (a) {
            return
          }
        }
      }
      this._isCoordSearch = !1, this._MGRS = undefined, window["fillAutoComplete" + t.index] = undefined;
      if (t.index < this._searchLastRequest.index) return;
      this.hideResultsPopup(), t.completed = !0, t.data = e || [];
      if (t.autoFlyTo) {
        this.flyToFirstEntry(this._searchLastRequest);
        return
      }
      if (t.data.length == 0) {
        this.removeCurrentSearchLabelShown(), n(t.query);
        return
      }
      n(t.query), this._isCoordSearch || this.createResultsPopup(t)
    }, p.prototype.removeCurrentSearchLabelShown = function () {
      o != null && viewer.entities.remove(o)
    }, p.prototype.doSearch = function () {
      var t = e("#search").val();
      if (this._searchServer == "") return;
      if (this._searchServer == "" || this._searchLastRequest.query == t) return;
      var n = new f;
      n.query = t, window["fillAutoComplete" + n.index] = e.proxy(function (e) {
        window["calledFillAutoComplete" + n.index] = !0, this.fillAutoComplete(e, n)
      }, this), this._searchLastRequest = n;
      var r = this._searchServer + this._searchServerTail;
      e.getScript(r.replace("<_searchIndex>", n.index) + encodeURIComponent(n.query), e.proxy(function () {
        this._searchErrorWasAlreadyShown || setTimeout(e.proxy(function () {
          !this._searchErrorWasAlreadyShown && !window["calledFillAutoComplete" + n.index] && (this._searchErrorWasAlreadyShown = !0, alert(a))
        }, this), 100)
      }, this))
    }, p.prototype.flyToCoordinates = function (e, t) {
      TerraExplorer.internal.Navigate.flyToPosition(new TerraExplorer.internal.TEPosition({
        cartesian: Cesium.Cartesian3.fromDegrees(e, t, 0),
        headingPitchRange: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-89), 1e3),
        altitudeType: TerraExplorer.internal.TEPosition.ATC_TERRAIN_ABSOLUTE
      }))
    }, p.prototype.createResultsPopup = function (t) {
      var n = [],
        i = 0,
        s = this;
      if (this._isCoordSearch) {
        this._searchLon = t.lon, this._searchLat = t.lat;
        var o;
        t.mgrs != undefined ? o = r.i18n("SearchBox_coordinates_MGRS", {
          newLine: "<br/>",
          longitude: t.lon.toFixed(4),
          latitude: t.lat.toFixed(4),
          newLine2: "<br/>",
          MGRS: t.mgrs
        }) : o = r.i18n("SearchBox_coordinates", {
          newLine: "<br/>",
          longitude: t.lon.toFixed(4),
          latitude: t.lat.toFixed(4)
        });
        var a = n.push("<span id='coordinatesDivId'  class='searchBoxRes' style='padding:7px;color:White; font-size:13px; font-weight:normal;'>" + o + "</span>");
        i += Math.ceil(o.length / 58);
        var f = new Promise(function (e, t) {
          s.showResultsPopup(n.join("") + s._searchCopyright, i + 1), e()
        });
        f.then(function () {
          e("#coordinatesDivId").unbind("click").click(function (e) {
            TerraExplorer.internal.SearchBox.flyToCoordinates(s._searchLon, s._searchLat)
          })
        })
      } else e(t.data.slice(0, 8)).each(function (e) {
        var r = this.Name + " [" + this.Description + "]";
        if (t.query) {
          var s = new RegExp(t.query, "ig"),
            o;
          while (o = s.exec(r)) r = r.substr(0, o.index) + "<b>" + o[0] + "</b>" + r.substring(o.index + o[0].length), s.lastIndex += 7
        }
        var u = n.push("<a href='#' onclick='window[\"_searchFlyTo\"](" + this.Lat + "," + this.Lon + ", this.innerText, " + e + ");return false;' class='searchBoxRes' style='color:White; font-size:13px; font-weight:normal;'>" + r + "</a>");
        i += Math.ceil(r.length / 58)
      });
      n.length == 0 ? this.showResultsPopup(u, 1) : this.showResultsPopup(n.join("") + this._searchCopyright, i + 1)
    }, p.prototype.showResultsPopup = function (t, n) {
      var r = this;
      this.hideResultsPopup();
      var i = "";
      i += t, this._searchResultsPopup = !0, e("#resultDiv").html(i).show()
    }, p.prototype.flyToFirstEntry = function (e) {
      if (e.data.length == 0) this.createResultsPopup(this._searchLastRequest);
      else {
        var t = e.data[0];
        this.saveSearch(t), this.flyTo(t.Lat, t.Lon, t.Name + " [" + t.Description + "]"), this.hideResultsPopup()
      }
    }, p.prototype.dropdownClick = function () {
      if (this._searchResultsPopup) this.hideResultsPopup();
      else {
        if (e("#search").val() == "") {
          var t = e.cookie("tew_Search_recentSearches") || "[]";
          lastRequest = new f, lastRequest.query = "", lastRequest.data = JSON.parse(t)
        }
        this.createResultsPopup(lastRequest)
      }
    }, p.prototype.saveSearch = function (t) {
      var n = e.cookie("tew_Search_recentSearches") || "[]";
      n = JSON.parse(n);
      var r = [];
      e(n).each(function () {
        (this.Lat != t.Lat || this.Lon != t.Lon) && r.push(this)
      }), r.unshift(t), r = r.slice(0, 8), r = JSON.stringify(r), e.cookie("tew_Search_recentSearches", r, {
        expires: 1e3
      })
    }, p.prototype.flyToFirstResult = function () {
      this._isCoordSearch ? this.flyToCoordinates(this._searchLon, this._searchLat) : (this.doSearch(), this._searchLastRequest.completed || this._searchResultsPopup && e("#search").val() == "" ? this.flyToFirstEntry(this._searchLastRequest) : this._searchLastRequest.autoFlyTo = !0)
    }, p.prototype.reverseGeocode = function (t, n, r) {
      var i = "latlon=" + n + "," + t,
        s = this.SearchServer + "callback=reverseGeocodeComplete&" + i;
      window.reverseGeocodeComplete = r, e.getScript(s)
    }, new p
  }), define("tools/TETools/QueryTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "internal/Units", "./FavoritesStorage", "../ToolDelegate", "../ToolContainer", "internal/SearchBox", "internal/Navigate", "internal/NotificationCenter", "internal/GeometryHelper", "internal/InputMode", "tools/ToolDialog", "tools/ListControl"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
    "use strict";

    function v() {
      this._explanationText = t.i18n("analysis_query_explanation_text"), this._explanationTextOnStartOnly = !0, this._highlightColor = [255, 0, 255, 255], this._locationText = "", this._queryImage = null, this._queryPosition = null, this._flyAround = null, this._flyAroundParams = {
        pitch: -50,
        distance: 5e3
      }, this._searchResult = null, this._favoriteItemId = "", this._canHover = !1, this._canPick = !1, this._pointOnModel, this._selectedFeatureLayerId = 0, this._isMouseMoving = !1, this._cursorPosition = new Cesium.Cartesian2(0, 0), this._prePosition, this._prePosition = this._cursorPosition, this._isDisplayed = !1, this.getId = function () {
        return "QueryTool"
      }, this.getMenuEntry = function () {
        return r.createFor(this, t.i18n("Menu_Analyze_Query"), "./img/newDesign/analyze_query.png", 10, r.MenuEntryAnalyze(), t.i18n("Measurement_Header"))
      }, s.DefaultStorage, this._eventListener = null
    }
    v.inheritsFrom(o), v.prototype.onMouseOver = function (e) {
      this._canHover && Cesium.defined(e) && (this._cursorPosition = e.endPosition), this._isMouseMoving = !0
    };
    var m = null,
      g = null,
      y;
    v.prototype.onClosedToolContainer = function () {
      this._queryPosition = null, this._explanationTextOnStartOnly = !0, this._queryImage != null && (viewer.entities.remove(this._queryImage), this._queryImage = null)
    }, v.prototype.onPreFrame = function () {
      if (this._isMouseMoving) {
        var e = viewer.Scene,
          t, n, r, i = {},
          s = viewer.scene.screenToWorld(this._cursorPosition, i);
        Cesium.defined(s) && Cesium.defined(i.id) && (m == null || i.id == y) ? (y = i.id, t = TerraExplorer.internal.Project, n = t.findObjectFromID(y), r = i.pickPrimitive, Cesium.defined(n) ? n.layer != undefined && typeof r.getGeometryInstanceAttributes == "function" ? m != r.getGeometryInstanceAttributes(i.id) && (m = r.getGeometryInstanceAttributes(i.id), m.lastColor == null && (m.lastColor = m.color), m.color = this._highlightColor, m.type = "layer") : (m = i.pickPrimitive, (i.pickPrimitive.constructor.name == "Billboard" || i.pickPrimitive.constructor.name == "Label") && Cesium.defined(i.pickPrimitive.scale) && m.lastScale == null && (m.lastScale = m.scale, m.scale *= 2, m.type = "TEObject")) : Cesium.defined(i.id._billboard) && Cesium.defined(i.id._label) ? (m = i.id, m._billboard.lastScale == null && (m._billboard.lastScale = m._billboard.scale, m._billboard.scale = 2, m._label.scale = 2, m.type = "Billboard")) : Cesium.defined(i.id.polygon) && (m = i.id.polygon, m.lastMaterial == null && Cesium.defined(i.id.polygon.material) && (m.lastMaterial = m.material, m.material = Cesium.Color.MAGENTA, m.type = "CesiumPrimitive"))) : Cesium.defined(m) && (m.type == "layer" && m.lastColor != null ? (m.color = m.lastColor, m.lastColor = null) : m.type == "TEObject" && m.lastScale != null ? (m.scale = m.lastScale, m.lastScale = null) : m.type == "CesiumPrimitive" && m.lastMaterial != null ? (m.material = m.lastMaterial, m.lastMaterial = null) : m.type == "Billboard" && m._billboard.lastScale != null && (m._billboard.scale = 1, m._label.scale = 1, m._billboard.lastScale = null), m = null), this._prePosition = this._cursorPosition
      }
      this._isMouseMoving = !1
    }, v.prototype.Querying = function (n) {
      function s(e) {
        if (e._queryImage != null) return;
        e._queryImage = viewer.entities.add({
          position: e._queryPosition,
          billboard: {
            image: "./img/query.png",
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scale: .5,
            eyeOffset: new Cesium.Cartesian3(0, 0, -50)
          }
        }), e.animateScale(e._queryImage, 200)
      }
      var r = n;
      this._queryImage != null && (viewer.entities.remove(this._queryImage), this._queryImage = null);
      var o, u = {
        callback: e.proxy(function (e) {
          this._queryPosition = e, s(this), this._queryImage.position = this._queryPosition.clone()
        }, this)
      };
      this._pointOnModel = undefined;
      var f = viewer.scene.screenToWorld(r, u);
      f && (this._queryPosition = f, o = viewer.scene.globe.ellipsoid.cartesianToCartographic(this._queryPosition), u.pickPrimitive != undefined && (this._pointOnModel = o));
      if (this._queryPosition == null) return;
      a.reverseGeocode(Cesium.Math.toDegrees(o.longitude), Cesium.Math.toDegrees(o.latitude), e.proxy(function (n) {
        this._searchResult = e.extend({}, n[0]);
        if (this._searchResult.Name.length == 0 && this._searchResult.Description.length == 0) {
          p.IsOpen && p.close();
          return
        }
        var r = this,
          s = Cesium.sampleTerrain(viewer.terrainProvider, 14, [Cesium.Cartographic.fromDegrees(this._searchResult.Lon, this._searchResult.Lat)]);
        Cesium.when(s, function (n) {
          r._pointOnModel != undefined && (n[0] = r._pointOnModel);
          var s = e("<div style='position:absolute;overflow-y:auto; width:100%; height:100%;'></div>"),
            o = e("<div id='MessageClientId' style='position:static; width:100%;'></div>");
          e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), s.append(o), TerraExplorer.tools.ToolContainer.setText(""), e("#LowerView").length > 0 && e("#LowerView").append(s), o.css({
            height: s.height()
          }), r._listControl = new d(o), r._listControl.IsAnalyzeToolList = !0;
          var u = r._searchResult.Name,
            a = u + ", " + r._searchResult.Description;
          r._listControl.add({
            text: t.i18n("address") + ":&nbsp&nbsp" + r._searchResult.Name,
            queryToolContainer: !0
          }), r._listControl.add({
            text: "<span style='margin-left:52px;'>" + r._searchResult.Description + "</span>",
            queryToolContainer: !0
          }), r._listControl.add({
            text: t.i18n("longitude") + ":&nbsp&nbsp" + r._searchResult.Lon.toFixed(8),
            queryToolContainer: !0
          }), r._listControl.add({
            text: t.i18n("latitude") + ":&nbsp&nbsp" + r._searchResult.Lat.toFixed(8),
            queryToolContainer: !0
          }), TerraExplorer.internal.Settings.displayMGRS && r._listControl.add({
            text: t.i18n("StatusBar_MGRS") + ":&nbsp&nbsp" + i.LL2MGRS(r._searchResult.Lon, r._searchResult.Lat),
            queryToolContainer: !0
          }), r._listControl.add({
            text: t.i18n("altitude") + ":&nbsp&nbsp" + n[0].height.toFixed(3) + " " + t.i18n("meters_short") + "(AMSL)",
            queryToolContainer: !0
          })
        }).otherwise(function () {
          console.log("!!!!!!!!!!!")
        })
      }, this)), s(this)
    }, v.prototype.open = function (e) {
      if (this._canPick && Cesium.defined(e)) {
        var t = {},
          n = viewer.scene.screenToWorld(e, t);
        if (Cesium.defined(n) && Cesium.defined(t.id)) {
          this._queryPosition = n;
          var r = viewer.scene.globe.ellipsoid.cartesianToCartographic(n),
            i = t.id,
            s = TerraExplorer.internal.Project,
            o = s.findObjectFromID(i);
          this._queryImage != null && (viewer.entities.remove(this._queryImage), this._queryImage = null), this.DisplayDetailsAndAttributes(o, r, t.id._name, t)
        } else Cesium.defined(n) && this.Querying(e)
      }
    }, v.prototype.animateScale = function (t, n) {
      var r = t.billboard.scale.getValue(),
        i = r * 2;
      e({
        scale: r
      }).animate({
        scale: i
      }, {
        duration: n / 2,
        step: function () {
          t.billboard.scale.setValue(this.scale)
        },
        easing: "linear",
        complete: function () {
          e({
            scale: i
          }).animate({
            scale: r
          }, {
            duration: n / 2,
            step: function () {
              t.billboard.scale.setValue(this.scale)
            },
            easing: "linear"
          })
        }
      })
    }, v.prototype.DisplayDetailsAndAttributes = function (n, r, s, o) {
      function u(e) {
        var t = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        return e.replace(t, "<a href='$1'>$1</a>")
      }
      a.reverseGeocode(Cesium.Math.toDegrees(r.longitude), Cesium.Math.toDegrees(r.latitude), e.proxy(function (a) {
        this._searchResult = e.extend({}, a[0]);
        if (this._searchResult.Name.length == 0 && this._searchResult.Description.length == 0) {
          p.IsOpen && p.close();
          return
        }
        var f = r,
          l = this,
          c = Cesium.sampleTerrain(viewer.terrainProvider, 14, [Cesium.Cartographic.fromDegrees(this._searchResult.Lon, this._searchResult.Lat)]);
        Cesium.when(c, function (r) {
          r[0] = f;
          if (Cesium.defined(o.pickPrimitive.appearance) && o.pickPrimitive.appearance.constructor.name == "EllipsoidSurfaceAppearance") return;
          var a = !1,
            c = e("<div style='position:absolute;overflow:hidden; width:400px; height:350px;'></div>"),
            h = e("<div id='MessageClientId' style='position:absolute; overflow-y:auto; width:100%;'></div>");
          c.append(h), p.open(t.i18n("Query_Result"), "./img/dialogs/header_icons/layers.png", c.get(0), null, !1, undefined), p.removeCloseButton(), h.css({
            height: c.height()
          }), e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), l._listControl = new d(h);
          var v = e("<div style='position:relative;overflow:hidden; width:100%; height:100%;'></div>"),
            m = e("<div id='MessageClientId' style='position:relative; margin-left:5px; margin-top:0px; overflow-y:auto; width:100%;'></div>"),
            g = new d(m);
          g.IsAnalyzeToolList = !0, v.append(m), TerraExplorer.tools.ToolContainer.setText(""), e("#LowerView").length > 0 && e("#LowerView").append(v), m.css({
            height: v.height()
          }), l._listControl.add({
            text: t.i18n("settings_general_header"),
            header: !0,
            queryDetailsWindow: !0
          });
          if (n) n.layer != null ? (l._listControl.add({
            text: "<b>" + t.i18n("query_LayerName") + ":</b>&nbsp&nbsp" + n.layer._layerDisplayName,
            query: !0,
            queryDetailsWindow: !0
          }), n.feature != undefined && n.feature != null && l._listControl.add({
            text: "<b>" + t.i18n("query_FeatureName") + ":</b>&nbsp&nbsp" + n.feature.fid,
            query: !0,
            queryDetailsWindow: !0
          })) : l._listControl.add({
            text: "<b>" + t.i18n("query_Name") + ":</b>&nbsp&nbsp" + l._searchResult.Name,
            query: !0,
            queryDetailsWindow: !0
          });
          else {
            var y = s ? s : "  ";
            l._listControl.add({
              text: "<b>" + t.i18n("query_Name") + ":</b>&nbsp&nbsp" + y,
              query: !0,
              queryDetailsWindow: !0
            })
          }
          if (Cesium.defined(o.id.polygon) || Cesium.defined(o.id.polyline)) a = !1;
          Cesium.defined(o.pickPrimitive.appearance) && o.pickPrimitive.appearance.constructor.name == "PolylineColorAppearance" && (a = !1);
          if (o.pickPrimitive.constructor.name == "Billboard" || o.pickPrimitive.constructor.name == "Label") a = !0;
          a && (g.add({
            text: t.i18n("address") + ":&nbsp&nbsp" + l._searchResult.Name,
            query: !0
          }), g.add({
            text: "<span style='margin-left:52px;'>" + l._searchResult.Description + "</span>",
            query: !0
          }), g.add({
            text: t.i18n("longitude_pivot") + ":&nbsp&nbsp" + l._searchResult.Lon,
            query: !0
          }), g.add({
            text: t.i18n("latitude_pivot") + ":&nbsp&nbsp" + l._searchResult.Lat,
            query: !0
          }), TerraExplorer.internal.Settings.displayMGRS && l._listControl.add({
            text: t.i18n("StatusBar_MGRS") + ":&nbsp&nbsp" + i.LL2MGRS(l._searchResult.Lon, l._searchResult.Lat),
            query: !0,
            queryDetailsWindow: !0
          }), l._listControl.add({
            text: t.i18n("altitude") + ":&nbsp&nbsp" + r[0].height.toFixed(3) + t.i18n("meters_short") + " (AMSL)",
            query: !0,
            queryDetailsWindow: !0
          }));
          if (l.hasAttributes(n) && n.feature.attributes != undefined) {
            l._listControl.add({
              text: t.i18n("query_attributes_header"),
              header: !0,
              queryDetailsWindow: !0
            });
            for (var b in n.feature.attributes) {
              n.feature.attributes[b] == undefined && (n.feature.attributes[b] = "");
              var w = u(n.feature.attributes[b]);
              l._listControl.add({
                text: "<b>" + b + ":</b>&nbsp;&nbsp;" + w,
                query: !0,
                queryDetailsWindow: !0
              })
            }
          }
          e(e(e(".toolDialog .listControl")[0]).children()).each(function (t, n) {
            e(n).width("390")
          }), e(".toolDialog #MessageClientId span").each(function (t, n) {
            e(n).attr("class", e(n).attr("class").replace("Sidebar", "")), e(n).css("padding-left", "10px"), e(n).width("390")
          })
        })
      }, this))
    };
    var b = 0;
    return v.prototype.onLeftClick = function (e) {
      if (f.IsMultiGestureNavigation) return;
      u.IsVisible && this.open(e.position);
      if (!u.IsVisible) return
    }, v.prototype.hasAttributes = function (e) {
      return e == undefined ? !1 : e.layer && e.feature.attributes ? !0 : !1
    }, v.prototype.onOpenedToolContainer = function () {
      this._canPick = !0, this._canHover = !0, this._toolContainer.IsQuery = !0, e(viewer.container).css({
        cursor: 'url("./img/queryCursor.png") 16 16, pointer'
      }), e(e(".analyzeToolHeaderContainer")[0]).text(t.i18n("Menu_Analyze_Query")), this._explanationTextOnStartOnly = !1
    }, v.prototype.onBeforeOpenToolContainer = function () {
      return e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), h.Mode = h.MEASUREMENT, this._eventListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas), this._eventListener.setInputAction(e.proxy(this.onLeftClick, this), Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.setInputAction(e.proxy(this.onMouseOver, this), Cesium.ScreenSpaceEventType.MOUSE_MOVE), viewer.scene.preRender.addEventListener(this.onPreFrame, this), this.parent.onBeforeOpenToolContainer.call(this), this._explanationTextOnStartOnly && this._toolContainer.setExplanationText(this._explanationText), this.ToolContainer.addButton(1, "./img/favorits_checkbox.png"), this.ToolContainer.addButton(3, "./img/fly_around.png"), l.addObserver(this, "favoriteChanged", "TEN_FAVORITE_CHANGED", null), !0
    }, v.prototype.onBeforeCloseToolContainer = function (e) {
      return this.parent.onBeforeCloseToolContainer.call(this, e), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK), this._eventListener.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE), this._toolContainer.IsQuery = !1, h.Mode = h.FREE_FLIGHT, f.stop(), viewer.entities.remove(this._queryImage), this._queryImage = null, this._canPick = !1, this._canHover = !1, p.IsOpen && p.close(), !0
    }, v.prototype.onButtonClick = function (t) {
      this.parent.onButtonClick.call(this, t);
      switch (t) {
        case 1:
          this.addFavorite();
          break;
        case 2:
          this.removeFavorite();
          break;
        case 3:
          if (f.isFlyAround()) return;
          if (this._queryPosition == null) return;
          viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(this._queryPosition, f.HeightAboveGround * 2), {
            duration: 1,
            offset: new Cesium.HeadingPitchRange(viewer.camera.heading, Cesium.Math.toRadians(this._flyAroundParams.pitch), f.HeightAboveGround * 2),
            complete: e.proxy(function () {
              f.flyAround(this._queryPosition)
            }, this)
          });
          break;
        case 4:
      }
    }, v.prototype.addFavorite = function () {
      if (this._queryPosition == null) return;
      var e = s.createFavoriteItem();
      this._searchResult && this._searchResult.Name != "" ? (e.name = this._searchResult.Name, e.desc = this._searchResult.Description) : e.name = this._locationText, e.tePosition.Cartesian = this._queryPosition.clone(), e.tePosition.HeadingPitchRange = c.getHeadingPitchRange(viewer.camera.position, e.tePosition.Cartesian), s.DefaultStorage.saveItem(e), this._favoriteItemId = e.id, this.ToolContainer.removeButtons(), this.ToolContainer.addButton(2, "./img/favorits.png"), this.ToolContainer.addButton(3, "./img/fly_around.png"), this.ToolContainer.setEnable(!1, !1), this.ToolContainer.ToolManager.openTool("EditFavoriteTool", e.id)
    }, v.prototype.removeFavorite = function () {
      s.DefaultStorage.deleteItem(this._favoriteItemId), this.ToolContainer.removeButtons(), this.ToolContainer.addButton(1, "./img/favorits_checkbox.png"), this.ToolContainer.addButton(3, "./img/fly_around.png"), this._queryImage && (this._queryImage.show = !0)
    }, v.prototype.favoriteChanged = function (e) {
      var t = e;
      this._favoriteItemId == t.id && this._queryImage && (t.showOn3D ? this._queryImage.show = !1 : this._queryImage.show = !0)
    }, v
  }),
  function (e) {
    typeof define == "function" && define.amd ? define("internal/datePicker", ["jquery"], e) : e(jQuery)
  }(function (e) {
    function i(e) {
      var t, n;
      while (e.length && e[0] !== document) {
        t = e.css("position");
        if (t === "absolute" || t === "relative" || t === "fixed") {
          n = parseInt(e.css("zIndex"), 10);
          if (!isNaN(n) && n !== 0) return n
        }
        e = e.parent()
      }
      return 0
    }

    function s() {
      this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "mm/dd/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
      }, this._defaults = {
        showOn: "focus",
        showAnim: "fadeIn",
        showOptions: {},
        defaultDate: null,
        appendText: "",
        buttonText: "...",
        buttonImage: "",
        buttonImageOnly: !1,
        hideIfNoPrevNext: !1,
        navigationAsDateFormat: !1,
        gotoCurrent: !1,
        changeMonth: !1,
        changeYear: !1,
        yearRange: "c-10:c+10",
        showOtherMonths: !1,
        selectOtherMonths: !1,
        showWeek: !1,
        calculateWeek: this.iso8601Week,
        shortYearCutoff: "+10",
        minDate: null,
        maxDate: null,
        duration: "fast",
        beforeShowDay: null,
        beforeShow: null,
        onSelect: null,
        onChangeMonthYear: null,
        onClose: null,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        stepMonths: 1,
        stepBigMonths: 12,
        altField: "",
        altFormat: "",
        constrainInput: !0,
        showButtonPanel: !1,
        autoSize: !1,
        disabled: !1
      }, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = o(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function o(t) {
      var n = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
      return t.on("mouseout", n, function () {
        e(this).removeClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && e(this).removeClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && e(this).removeClass("ui-datepicker-next-hover")
      }).on("mouseover", n, u)
    }

    function u() {
      e.datepicker._isDisabledDatepicker(r.inline ? r.dpDiv.parent()[0] : r.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), this.className.indexOf("ui-datepicker-prev") !== -1 && e(this).addClass("ui-datepicker-prev-hover"), this.className.indexOf("ui-datepicker-next") !== -1 && e(this).addClass("ui-datepicker-next-hover"))
    }

    function a(t, n) {
      e.extend(t, n);
      for (var r in n) n[r] == null && (t[r] = n[r]);
      return t
    }
    e.ui = e.ui || {};
    var t = e.ui.version = "1.12.0",
      n = e.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      };
    e.extend(e.ui, {
      datepicker: {
        version: "1.12.0"
      }
    });
    var r;
    e.extend(s.prototype, {
      markerClassName: "hasDatepicker",
      maxRows: 4,
      _widgetDatepicker: function () {
        return this.dpDiv
      },
      setDefaults: function (e) {
        return a(this._defaults, e || {}), this
      },
      _attachDatepicker: function (t, n) {
        var r, i, s;
        r = t.nodeName.toLowerCase(), i = r === "div" || r === "span", t.id || (this.uuid += 1, t.id = "dp" + this.uuid), s = this._newInst(e(t), i), s.settings = e.extend({}, n || {}), r === "input" ? this._connectDatepicker(t, s) : i && this._inlineDatepicker(t, s)
      },
      _newInst: function (t, n) {
        var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
        return {
          id: r,
          input: t,
          selectedDay: 0,
          selectedMonth: 0,
          selectedYear: 0,
          drawMonth: 0,
          drawYear: 0,
          inline: n,
          dpDiv: n ? o(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
        }
      },
      _connectDatepicker: function (t, n) {
        var r = e(t);
        n.append = e([]), n.trigger = e([]);
        if (r.hasClass(this.markerClassName)) return;
        this._attachments(r, n), r.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(n), e.data(t, "datepicker", n), n.settings.disabled && this._disableDatepicker(t)
      },
      _attachments: function (t, n) {
        var r, i, s, o = this._get(n, "appendText"),
          u = this._get(n, "isRTL");
        n.append && n.append.remove(), o && (n.append = e("<span class='" + this._appendClass + "'>" + o + "</span>"), t[u ? "before" : "after"](n.append)), t.off("focus", this._showDatepicker), n.trigger && n.trigger.remove(), r = this._get(n, "showOn"), (r === "focus" || r === "both") && t.on("focus", this._showDatepicker);
        if (r === "button" || r === "both") i = this._get(n, "buttonText"), s = this._get(n, "buttonImage"), n.trigger = e(this._get(n, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
          src: s,
          alt: i,
          title: i
        }) : e("<button type='button'></button>").addClass(this._triggerClass).html(s ? e("<img/>").attr({
          src: s,
          alt: i,
          title: i
        }) : i)), t[u ? "before" : "after"](n.trigger), n.trigger.on("click", function () {
          return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
        })
      },
      _autoSize: function (e) {
        if (this._get(e, "autoSize") && !e.inline) {
          var t, n, r, i, s = new Date(2009, 11, 20),
            o = this._get(e, "dateFormat");
          o.match(/[DM]/) && (t = function (e) {
            n = 0, r = 0;
            for (i = 0; i < e.length; i++) e[i].length > n && (n = e[i].length, r = i);
            return r
          }, s.setMonth(t(this._get(e, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), s.setDate(t(this._get(e, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - s.getDay())), e.input.attr("size", this._formatDate(e, s).length)
        }
      },
      _inlineDatepicker: function (t, n) {
        var r = e(t);
        if (r.hasClass(this.markerClassName)) return;
        r.addClass(this.markerClassName).append(n.dpDiv), e.data(t, "datepicker", n), this._setDate(n, this._getDefaultDate(n), !0), this._updateDatepicker(n), this._updateAlternate(n), n.settings.disabled && this._disableDatepicker(t), n.dpDiv.css("display", "block")
      },
      _dialogDatepicker: function (t, n, r, i, s) {
        var o, u, f, l, c, h = this._dialogInst;
        return h || (this.uuid += 1, o = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), e("body").append(this._dialogInput), h = this._dialogInst = this._newInst(this._dialogInput, !1), h.settings = {}, e.data(this._dialogInput[0], "datepicker", h)), a(h.settings, i || {}), n = n && n.constructor === Date ? this._formatDate(h, n) : n, this._dialogInput.val(n), this._pos = s ? s.length ? s : [s.pageX, s.pageY] : null, this._pos || (u = document.documentElement.clientWidth, f = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, c = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [u / 2 - 100 + l, f / 2 - 150 + c]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), h.settings.onSelect = r, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", h), this
      },
      _destroyDatepicker: function (t) {
        var n, i = e(t),
          s = e.data(t, "datepicker");
        if (!i.hasClass(this.markerClassName)) return;
        n = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), n === "input" ? (s.append.remove(), s.trigger.remove(), i.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : (n === "div" || n === "span") && i.removeClass(this.markerClassName).empty(), r === s && (r = null)
      },
      _enableDatepicker: function (t) {
        var n, r, i = e(t),
          s = e.data(t, "datepicker");
        if (!i.hasClass(this.markerClassName)) return;
        n = t.nodeName.toLowerCase();
        if (n === "input") t.disabled = !1, s.trigger.filter("button").each(function () {
          this.disabled = !1
        }).end().filter("img").css({
          opacity: "1.0",
          cursor: ""
        });
        else if (n === "div" || n === "span") r = i.children("." + this._inlineClass), r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1);
        this._disabledInputs = e.map(this._disabledInputs, function (e) {
          return e === t ? null : e
        })
      },
      _disableDatepicker: function (t) {
        var n, r, i = e(t),
          s = e.data(t, "datepicker");
        if (!i.hasClass(this.markerClassName)) return;
        n = t.nodeName.toLowerCase();
        if (n === "input") t.disabled = !0, s.trigger.filter("button").each(function () {
          this.disabled = !0
        }).end().filter("img").css({
          opacity: "0.5",
          cursor: "default"
        });
        else if (n === "div" || n === "span") r = i.children("." + this._inlineClass), r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0);
        this._disabledInputs = e.map(this._disabledInputs, function (e) {
          return e === t ? null : e
        }), this._disabledInputs[this._disabledInputs.length] = t
      },
      _isDisabledDatepicker: function (e) {
        if (!e) return !1;
        for (var t = 0; t < this._disabledInputs.length; t++)
          if (this._disabledInputs[t] === e) return !0;
        return !1
      },
      _getInst: function (t) {
        try {
          return e.data(t, "datepicker")
        } catch (n) {
          throw "Missing instance data for this datepicker"
        }
      },
      _optionDatepicker: function (t, n, r) {
        var i, s, o, u, f = this._getInst(t);
        if (arguments.length === 2 && typeof n == "string") return n === "defaults" ? e.extend({}, e.datepicker._defaults) : f ? n === "all" ? e.extend({}, f.settings) : this._get(f, n) : null;
        i = n || {}, typeof n == "string" && (i = {}, i[n] = r), f && (this._curInst === f && this._hideDatepicker(), s = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(f, "min"), u = this._getMinMaxDate(f, "max"), a(f.settings, i), o !== null && i.dateFormat !== undefined && i.minDate === undefined && (f.settings.minDate = this._formatDate(f, o)), u !== null && i.dateFormat !== undefined && i.maxDate === undefined && (f.settings.maxDate = this._formatDate(f, u)), "disabled" in i && (i.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), f), this._autoSize(f), this._setDate(f, s), this._updateAlternate(f), this._updateDatepicker(f))
      },
      _changeDatepicker: function (e, t, n) {
        this._optionDatepicker(e, t, n)
      },
      _refreshDatepicker: function (e) {
        var t = this._getInst(e);
        t && this._updateDatepicker(t)
      },
      _setDateDatepicker: function (e, t) {
        var n = this._getInst(e);
        n && (this._setDate(n, t), this._updateDatepicker(n), this._updateAlternate(n))
      },
      _getDateDatepicker: function (e, t) {
        var n = this._getInst(e);
        return n && !n.inline && this._setDateFromField(n, t), n ? this._getDate(n) : null
      },
      _doKeyDown: function (t) {
        var n, r, i, s = e.datepicker._getInst(t.target),
          o = !0,
          u = s.dpDiv.is(".ui-datepicker-rtl");
        s._keyEvent = !0;
        if (e.datepicker._datepickerShowing) switch (t.keyCode) {
          case 9:
            e.datepicker._hideDatepicker(), o = !1;
            break;
          case 13:
            return i = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", s.dpDiv), i[0] && e.datepicker._selectDay(t.target, s.selectedMonth, s.selectedYear, i[0]), n = e.datepicker._get(s, "onSelect"), n ? (r = e.datepicker._formatDate(s), n.apply(s.input ? s.input[0] : null, [r, s])) : e.datepicker._hideDatepicker(), !1;
          case 27:
            e.datepicker._hideDatepicker();
            break;
          case 33:
            e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(s, "stepBigMonths") : -e.datepicker._get(s, "stepMonths"), "M");
            break;
          case 34:
            e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(s, "stepBigMonths") : +e.datepicker._get(s, "stepMonths"), "M");
            break;
          case 35:
            (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), o = t.ctrlKey || t.metaKey;
            break;
          case 36:
            (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), o = t.ctrlKey || t.metaKey;
            break;
          case 37:
            (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, u ? 1 : -1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(s, "stepBigMonths") : -e.datepicker._get(s, "stepMonths"), "M");
            break;
          case 38:
            (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), o = t.ctrlKey || t.metaKey;
            break;
          case 39:
            (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, u ? -1 : 1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(s, "stepBigMonths") : +e.datepicker._get(s, "stepMonths"), "M");
            break;
          case 40:
            (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), o = t.ctrlKey || t.metaKey;
            break;
          default:
            o = !1
        } else t.keyCode === 36 && t.ctrlKey ? e.datepicker._showDatepicker(this) : o = !1;
        o && (t.preventDefault(), t.stopPropagation())
      },
      _doKeyPress: function (t) {
        var n, r, i = e.datepicker._getInst(t.target);
        if (e.datepicker._get(i, "constrainInput")) return n = e.datepicker._possibleChars(e.datepicker._get(i, "dateFormat")), r = String.fromCharCode(t.charCode == null ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || r < " " || !n || n.indexOf(r) > -1
      },
      _doKeyUp: function (t) {
        var n, r = e.datepicker._getInst(t.target);
        if (r.input.val() !== r.lastVal) try {
          n = e.datepicker.parseDate(e.datepicker._get(r, "dateFormat"), r.input ? r.input.val() : null, e.datepicker._getFormatConfig(r)), n && (e.datepicker._setDateFromField(r), e.datepicker._updateAlternate(r), e.datepicker._updateDatepicker(r))
        } catch (i) {}
        return !0
      },
      _showDatepicker: function (t) {
        t = t.target || t, t.nodeName.toLowerCase() !== "input" && (t = e("input", t.parentNode)[0]);
        if (e.datepicker._isDisabledDatepicker(t) || e.datepicker._lastInput === t) return;
        var n, r, s, o, u, f, l;
        n = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== n && (e.datepicker._curInst.dpDiv.stop(!0, !0), n && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), r = e.datepicker._get(n, "beforeShow"), s = r ? r.apply(t, [t, n]) : {};
        if (s === !1) return;
        a(n.settings, s), n.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(n), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), o = !1, e(t).parents().each(function () {
          return o |= e(this).css("position") === "fixed", !o
        }), u = {
          left: e.datepicker._pos[0],
          top: e.datepicker._pos[1]
        }, e.datepicker._pos = null, n.dpDiv.empty(), n.dpDiv.css({
          position: "absolute",
          display: "block",
          top: "-1000px"
        }), e.datepicker._updateDatepicker(n), u = e.datepicker._checkOffset(n, u, o), n.dpDiv.css({
          position: e.datepicker._inDialog && e.blockUI ? "static" : o ? "fixed" : "absolute",
          display: "none",
          left: u.left + "px",
          top: u.top + "px"
        }), n.inline || (f = e.datepicker._get(n, "showAnim"), l = e.datepicker._get(n, "duration"), n.dpDiv.css("z-index", i(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[f] ? n.dpDiv.show(f, e.datepicker._get(n, "showOptions"), l) : n.dpDiv[f || "show"](f ? l : null), e.datepicker._shouldFocusInput(n) && n.input.trigger("focus"), e.datepicker._curInst = n)
      },
      _updateDatepicker: function (t) {
        this.maxRows = 4, r = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
        var n, i = this._getNumberOfMonths(t),
          s = i[1],
          o = 17,
          a = t.dpDiv.find("." + this._dayOverClass + " a");
        a.length > 0 && u.apply(a.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), t.dpDiv[(i[0] !== 1 || i[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.trigger("focus"), t.yearshtml && (n = t.yearshtml, setTimeout(function () {
          n === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), n = t.yearshtml = null
        }, 0))
      },
      _shouldFocusInput: function (e) {
        return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
      },
      _checkOffset: function (t, n, r) {
        var i = t.dpDiv.outerWidth(),
          s = t.dpDiv.outerHeight(),
          o = t.input ? t.input.outerWidth() : 0,
          u = t.input ? t.input.outerHeight() : 0,
          a = document.documentElement.clientWidth + (r ? 0 : e(document).scrollLeft()),
          f = document.documentElement.clientHeight + (r ? 0 : e(document).scrollTop());
        return n.left -= this._get(t, "isRTL") ? i - o : 0, n.left -= r && n.left === t.input.offset().left ? e(document).scrollLeft() : 0, n.top -= r && n.top === t.input.offset().top + u ? e(document).scrollTop() : 0, n.left -= Math.min(n.left, n.left + i > a && a > i ? Math.abs(n.left + i - a) : 0), n.top -= Math.min(n.top, n.top + s > f && f > s ? Math.abs(s + u) : 0), n
      },
      _findPos: function (t) {
        var n = TerraExplorer.browser.isIE,
          r, i = this._getInst(t),
          s = this._get(i, "isRTL");
        if (!n)
          while (t && (t.type === "hidden" || t.nodeType !== 1 || e.expr.filters.hidden(t))) t = t[s ? "previousSibling" : "nextSibling"];
        return r = e(t).offset(), n && setTimeout(function () {
          e("#ui-datepicker-div").css("left", e(".toolDialog").css("left")), e("#ui-datepicker-div").css("top", "25%")
        }, 10), [r.left, r.top]
      },
      _hideDatepicker: function (t) {
        var n, r, i, s, o = this._curInst;
        if (!o || t && o !== e.data(t, "datepicker")) return;
        this._datepickerShowing && (n = this._get(o, "showAnim"), r = this._get(o, "duration"), i = function () {
          e.datepicker._tidyDialog(o)
        }, e.effects && (e.effects.effect[n] || e.effects[n]) ? o.dpDiv.hide(n, e.datepicker._get(o, "showOptions"), r, i) : o.dpDiv[n === "slideDown" ? "slideUp" : n === "fadeIn" ? "fadeOut" : "hide"](n ? r : null, i), n || i(), this._datepickerShowing = !1, s = this._get(o, "onClose"), s && s.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
          position: "absolute",
          left: "0",
          top: "-100px"
        }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
      },
      _tidyDialog: function (e) {
        e.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
      },
      _checkExternalClick: function (t) {
        if (!e.datepicker._curInst) return;
        var n = e(t.target),
          r = e.datepicker._getInst(n[0]);
        n[0].id !== e.datepicker._mainDivId && n.parents("#" + e.datepicker._mainDivId).length === 0 && !n.hasClass(e.datepicker.markerClassName) && !n.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || n.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== r
      },
      _adjustDate: function (t, n, r) {
        var i = e(t),
          s = this._getInst(i[0]);
        if (this._isDisabledDatepicker(i[0])) return;
        this._adjustInstDate(s, n + (r === "M" ? this._get(s, "showCurrentAtPos") : 0), r), this._updateDatepicker(s)
      },
      _gotoToday: function (t) {
        var n, r = e(t),
          i = this._getInst(r[0]);
        this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (n = new Date, i.selectedDay = n.getDate(), i.drawMonth = i.selectedMonth = n.getMonth(), i.drawYear = i.selectedYear = n.getFullYear()), this._notifyChange(i), this._adjustDate(r)
      },
      _selectMonthYear: function (t, n, r) {
        var i = e(t),
          s = this._getInst(i[0]);
        s["selected" + (r === "M" ? "Month" : "Year")] = s["draw" + (r === "M" ? "Month" : "Year")] = parseInt(n.options[n.selectedIndex].value, 10), this._notifyChange(s), this._adjustDate(i)
      },
      _selectDay: function (t, n, r, i) {
        var s, o = e(t);
        if (e(i).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0])) return;
        s = this._getInst(o[0]), s.selectedDay = s.currentDay = e("a", i).html(), s.selectedMonth = s.currentMonth = n, s.selectedYear = s.currentYear = r, this._selectDate(t, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear))
      },
      _clearDate: function (t) {
        var n = e(t);
        this._selectDate(n, "")
      },
      _selectDate: function (t, n) {
        var r, i = e(t),
          s = this._getInst(i[0]);
        n = n != null ? n : this._formatDate(s), s.input && s.input.val(n), this._updateAlternate(s), r = this._get(s, "onSelect"), r ? r.apply(s.input ? s.input[0] : null, [n, s]) : s.input && s.input.trigger("change"), s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), this._lastInput = s.input[0], typeof s.input[0] != "object" && s.input.trigger("focus"), this._lastInput = null)
      },
      _updateAlternate: function (t) {
        var n, r, i, s = this._get(t, "altField");
        s && (n = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), i = this.formatDate(n, r, this._getFormatConfig(t)), e(s).val(i))
      },
      noWeekends: function (e) {
        var t = e.getDay();
        return [t > 0 && t < 6, ""]
      },
      iso8601Week: function (e) {
        var t, n = new Date(e.getTime());
        return n.setDate(n.getDate() + 4 - (n.getDay() || 7)), t = n.getTime(), n.setMonth(0), n.setDate(1), Math.floor(Math.round((t - n) / 864e5) / 7) + 1
      },
      parseDate: function (t, n, r) {
        if (t == null || n == null) throw "Invalid arguments";
        n = typeof n == "object" ? n.toString() : n + "";
        if (n === "") return null;
        var i, s, o, u = 0,
          a = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff,
          f = typeof a != "string" ? a : (new Date).getFullYear() % 100 + parseInt(a, 10),
          l = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort,
          c = (r ? r.dayNames : null) || this._defaults.dayNames,
          h = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort,
          p = (r ? r.monthNames : null) || this._defaults.monthNames,
          d = -1,
          v = -1,
          m = -1,
          g = -1,
          y = !1,
          b, w = function (e) {
            var n = i + 1 < t.length && t.charAt(i + 1) === e;
            return n && i++, n
          },
          E = function (e) {
            var t = w(e),
              r = e === "@" ? 14 : e === "!" ? 20 : e === "y" && t ? 4 : e === "o" ? 3 : 2,
              i = e === "y" ? r : 1,
              s = new RegExp("^\\d{" + i + "," + r + "}"),
              o = n.substring(u).match(s);
            if (!o) throw "Missing number at position " + u;
            return u += o[0].length, parseInt(o[0], 10)
          },
          S = function (t, r, i) {
            var s = -1,
              o = e.map(w(t) ? i : r, function (e, t) {
                return [
                  [t, e]
                ]
              }).sort(function (e, t) {
                return -(e[1].length - t[1].length)
              });
            e.each(o, function (e, t) {
              var r = t[1];
              if (n.substr(u, r.length).toLowerCase() === r.toLowerCase()) return s = t[0], u += r.length, !1
            });
            if (s !== -1) return s + 1;
            throw "Unknown name at position " + u
          },
          x = function () {
            if (n.charAt(u) !== t.charAt(i)) throw "Unexpected literal at position " + u;
            u++
          };
        for (i = 0; i < t.length; i++)
          if (y) t.charAt(i) === "'" && !w("'") ? y = !1 : x();
          else switch (t.charAt(i)) {
            case "d":
              m = E("d");
              break;
            case "D":
              S("D", l, c);
              break;
            case "o":
              g = E("o");
              break;
            case "m":
              v = E("m");
              break;
            case "M":
              v = S("M", h, p);
              break;
            case "y":
              d = E("y");
              break;
            case "@":
              b = new Date(E("@")), d = b.getFullYear(), v = b.getMonth() + 1, m = b.getDate();
              break;
            case "!":
              b = new Date((E("!") - this._ticksTo1970) / 1e4), d = b.getFullYear(), v = b.getMonth() + 1, m = b.getDate();
              break;
            case "'":
              w("'") ? x() : y = !0;
              break;
            default:
              x()
          }
        if (u < n.length) {
          o = n.substr(u);
          if (!/^\s+/.test(o)) throw "Extra/unparsed characters found in date: " + o
        }
        d === -1 ? d = (new Date).getFullYear() : d < 100 && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= f ? 0 : -100));
        if (g > -1) {
          v = 1, m = g;
          do {
            s = this._getDaysInMonth(d, v - 1);
            if (m <= s) break;
            v++, m -= s
          } while (!0)
        }
        b = this._daylightSavingAdjust(new Date(d, v - 1, m));
        if (b.getFullYear() !== d || b.getMonth() + 1 !== v || b.getDate() !== m) throw "Invalid date";
        return b
      },
      ATOM: "yy-mm-dd",
      COOKIE: "D, dd M yy",
      ISO_8601: "yy-mm-dd",
      RFC_822: "D, d M y",
      RFC_850: "DD, dd-M-y",
      RFC_1036: "D, d M y",
      RFC_1123: "D, d M yy",
      RFC_2822: "D, d M yy",
      RSS: "D, d M y",
      TICKS: "!",
      TIMESTAMP: "@",
      W3C: "yy-mm-dd",
      _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
      formatDate: function (e, t, n) {
        if (!t) return "";
        var r, i = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
          s = (n ? n.dayNames : null) || this._defaults.dayNames,
          o = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
          u = (n ? n.monthNames : null) || this._defaults.monthNames,
          a = function (t) {
            var n = r + 1 < e.length && e.charAt(r + 1) === t;
            return n && r++, n
          },
          f = function (e, t, n) {
            var r = "" + t;
            if (a(e))
              while (r.length < n) r = "0" + r;
            return r
          },
          l = function (e, t, n, r) {
            return a(e) ? r[t] : n[t]
          },
          c = "",
          h = !1;
        if (t)
          for (r = 0; r < e.length; r++)
            if (h) e.charAt(r) === "'" && !a("'") ? h = !1 : c += e.charAt(r);
            else switch (e.charAt(r)) {
              case "d":
                c += f("d", t.getDate(), 2);
                break;
              case "D":
                c += l("D", t.getDay(), i, s);
                break;
              case "o":
                c += f("o", Math.round(((new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime() - (new Date(t.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                break;
              case "m":
                c += f("m", t.getMonth() + 1, 2);
                break;
              case "M":
                c += l("M", t.getMonth(), o, u);
                break;
              case "y":
                c += a("y") ? t.getFullYear() : (t.getFullYear() % 100 < 10 ? "0" : "") + t.getFullYear() % 100;
                break;
              case "@":
                c += t.getTime();
                break;
              case "!":
                c += t.getTime() * 1e4 + this._ticksTo1970;
                break;
              case "'":
                a("'") ? c += "'" : h = !0;
                break;
              default:
                c += e.charAt(r)
            }
        return c
      },
      _possibleChars: function (e) {
        var t, n = "",
          r = !1,
          i = function (n) {
            var r = t + 1 < e.length && e.charAt(t + 1) === n;
            return r && t++, r
          };
        for (t = 0; t < e.length; t++)
          if (r) e.charAt(t) === "'" && !i("'") ? r = !1 : n += e.charAt(t);
          else switch (e.charAt(t)) {
            case "d":
            case "m":
            case "y":
            case "@":
              n += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              i("'") ? n += "'" : r = !0;
              break;
            default:
              n += e.charAt(t)
          }
        return n
      },
      _get: function (e, t) {
        return e.settings[t] !== undefined ? e.settings[t] : this._defaults[t]
      },
      _setDateFromField: function (e, t) {
        if (e.input.val() === e.lastVal) return;
        var n = this._get(e, "dateFormat"),
          r = e.lastVal = e.input ? e.input.val() : null,
          i = this._getDefaultDate(e),
          s = i,
          o = this._getFormatConfig(e);
        try {
          s = this.parseDate(n, r, o) || i
        } catch (u) {
          r = t ? "" : r
        }
        e.selectedDay = s.getDate(), e.drawMonth = e.selectedMonth = s.getMonth(), e.drawYear = e.selectedYear = s.getFullYear(), e.currentDay = r ? s.getDate() : 0, e.currentMonth = r ? s.getMonth() : 0, e.currentYear = r ? s.getFullYear() : 0, this._adjustInstDate(e)
      },
      _getDefaultDate: function (e) {
        return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
      },
      _determineDate: function (t, n, r) {
        var i = function (e) {
            var t = new Date;
            return t.setDate(t.getDate() + e), t
          },
          s = function (n) {
            try {
              return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), n, e.datepicker._getFormatConfig(t))
            } catch (r) {}
            var i = (n.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date,
              s = i.getFullYear(),
              o = i.getMonth(),
              u = i.getDate(),
              a = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
              f = a.exec(n);
            while (f) {
              switch (f[2] || "d") {
                case "d":
                case "D":
                  u += parseInt(f[1], 10);
                  break;
                case "w":
                case "W":
                  u += parseInt(f[1], 10) * 7;
                  break;
                case "m":
                case "M":
                  o += parseInt(f[1], 10), u = Math.min(u, e.datepicker._getDaysInMonth(s, o));
                  break;
                case "y":
                case "Y":
                  s += parseInt(f[1], 10), u = Math.min(u, e.datepicker._getDaysInMonth(s, o))
              }
              f = a.exec(n)
            }
            return new Date(s, o, u)
          },
          o = n == null || n === "" ? r : typeof n == "string" ? s(n) : typeof n == "number" ? isNaN(n) ? r : i(n) : new Date(n.getTime());
        return o = o && o.toString() === "Invalid Date" ? r : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
      },
      _daylightSavingAdjust: function (e) {
        return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
      },
      _setDate: function (e, t, n) {
        var r = !t,
          i = e.selectedMonth,
          s = e.selectedYear,
          o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
        e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), (i !== e.selectedMonth || s !== e.selectedYear) && !n && this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(r ? "" : this._formatDate(e))
      },
      _getDate: function (e) {
        var t = !e.currentYear || e.input && e.input.val() === "" ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
        return t
      },
      _attachHandlers: function (t) {
        var n = this._get(t, "stepMonths"),
          r = "#" + t.id.replace(/\\\\/g, "\\");
        t.dpDiv.find("[data-handler]").map(function () {
          var t = {
            prev: function () {
              e.datepicker._adjustDate(r, -n, "M")
            },
            next: function () {
              e.datepicker._adjustDate(r, +n, "M")
            },
            hide: function () {
              e.datepicker._hideDatepicker()
            },
            today: function () {
              e.datepicker._gotoToday(r)
            },
            selectDay: function () {
              return e.datepicker._selectDay(r, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
            },
            selectMonth: function () {
              return e.datepicker._selectMonthYear(r, this, "M"), !1
            },
            selectYear: function () {
              return e.datepicker._selectMonthYear(r, this, "Y"), !1
            }
          };
          e(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
        })
      },
      _generateHTML: function (e) {
        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q = new Date,
          R = this._daylightSavingAdjust(new Date(q.getFullYear(), q.getMonth(), q.getDate())),
          U = this._get(e, "isRTL"),
          z = this._get(e, "showButtonPanel"),
          W = this._get(e, "hideIfNoPrevNext"),
          X = this._get(e, "navigationAsDateFormat"),
          V = this._getNumberOfMonths(e),
          $ = this._get(e, "showCurrentAtPos"),
          J = this._get(e, "stepMonths"),
          K = V[0] !== 1 || V[1] !== 1,
          Q = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
          G = this._getMinMaxDate(e, "min"),
          Y = this._getMinMaxDate(e, "max"),
          Z = e.drawMonth - $,
          et = e.drawYear;
        Z < 0 && (Z += 12, et--);
        if (Y) {
          t = this._daylightSavingAdjust(new Date(Y.getFullYear(), Y.getMonth() - V[0] * V[1] + 1, Y.getDate())), t = G && t < G ? G : t;
          while (this._daylightSavingAdjust(new Date(et, Z, 1)) > t) Z--, Z < 0 && (Z = 11, et--)
        }
        e.drawMonth = Z, e.drawYear = et, n = this._get(e, "prevText"), n = X ? this.formatDate(n, this._daylightSavingAdjust(new Date(et, Z - J, 1)), this._getFormatConfig(e)) : n, r = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "e" : "w") + "'>" + n + "</span></a>" : W ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "e" : "w") + "'>" + n + "</span></a>", i = this._get(e, "nextText"), i = X ? this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z + J, 1)), this._getFormatConfig(e)) : i, s = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "w" : "e") + "'>" + i + "</span></a>" : W ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (U ? "w" : "e") + "'>" + i + "</span></a>", o = this._get(e, "currentText"), u = this._get(e, "gotoCurrent") && e.currentDay ? Q : R, o = X ? this.formatDate(o, u, this._getFormatConfig(e)) : o, a = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", f = z ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (U ? a : "") + (this._isInRange(e, u) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (U ? "" : a) + "</div>" : "", l = parseInt(this._get(e, "firstDay"), 10), l = isNaN(l) ? 0 : l, c = this._get(e, "showWeek"), h = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), d = this._get(e, "monthNames"), v = this._get(e, "monthNamesShort"), m = this._get(e, "beforeShowDay"), g = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), w = "";
        for (S = 0; S < V[0]; S++) {
          x = "", this.maxRows = 4;
          for (T = 0; T < V[1]; T++) {
            N = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), C = " ui-corner-all", k = "";
            if (K) {
              k += "<div class='ui-datepicker-group";
              if (V[1] > 1) switch (T) {
                case 0:
                  k += " ui-datepicker-group-first", C = " ui-corner-" + (U ? "right" : "left");
                  break;
                case V[1] - 1:
                  k += " ui-datepicker-group-last", C = " ui-corner-" + (U ? "left" : "right");
                  break;
                default:
                  k += " ui-datepicker-group-middle", C = ""
              }
              k += "'>"
            }
            k += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && S === 0 ? U ? s : r : "") + (/all|right/.test(C) && S === 0 ? U ? r : s : "") + this._generateMonthYearHeader(e, Z, et, G, Y, S > 0 || T > 0, d, v) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", L = c ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "";
            for (E = 0; E < 7; E++) A = (E + l) % 7, L += "<th scope='col'" + ((E + l + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + h[A] + "'>" + p[A] + "</span></th>";
            k += L + "</tr></thead><tbody>", O = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, O)), M = (this._getFirstDayOfMonth(et, Z) - l + 7) % 7, _ = Math.ceil((M + O) / 7), D = K ? this.maxRows > _ ? this.maxRows : _ : _, this.maxRows = D, P = this._daylightSavingAdjust(new Date(et, Z, 1 - M));
            for (H = 0; H < D; H++) {
              k += "<tr>", B = c ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(P) + "</td>" : "";
              for (E = 0; E < 7; E++) j = m ? m.apply(e.input ? e.input[0] : null, [P]) : [!0, ""], F = P.getMonth() !== Z, I = F && !y || !j[0] || G && P < G || Y && P > Y, B += "<td class='" + ((E + l + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (P.getTime() === N.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === P.getTime() && b.getTime() === N.getTime() ? " " + this._dayOverClass : "") + (I ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !g ? "" : " " + j[1] + (P.getTime() === Q.getTime() ? " " + this._currentClass : "") + (P.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!F || g) && j[2] ? " title='" + j[2].replace(/'/g, "&#39;") + "'" : "") + (I ? "" : " data-handler='selectDay' data-event='click' data-month='" + P.getMonth() + "' data-year='" + P.getFullYear() + "'") + ">" + (F && !g ? "&#xa0;" : I ? "<span class='ui-state-default'>" + P.getDate() + "</span>" : "<a class='ui-state-default" + (P.getTime() === R.getTime() ? " ui-state-highlight" : "") + (P.getTime() === Q.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + P.getDate() + "</a>") + "</td>", P.setDate(P.getDate() + 1), P = this._daylightSavingAdjust(P);
              k += B + "</tr>"
            }
            Z++, Z > 11 && (Z = 0, et++), k += "</tbody></table>" + (K ? "</div>" + (V[0] > 0 && T === V[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += k
          }
          w += x
        }
        return w += f, e._keyEvent = !1, w
      },
      _generateMonthYearHeader: function (e, t, n, r, i, s, o, u) {
        var a, f, l, c, h, p, d, v, m = this._get(e, "changeMonth"),
          g = this._get(e, "changeYear"),
          y = this._get(e, "showMonthAfterYear"),
          b = "<div class='ui-datepicker-title'>",
          w = "";
        if (s || !m) w += "<span class='ui-datepicker-month'>" + o[t] + "</span>";
        else {
          a = r && r.getFullYear() === n, f = i && i.getFullYear() === n, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
          for (l = 0; l < 12; l++)(!a || l >= r.getMonth()) && (!f || l <= i.getMonth()) && (w += "<option value='" + l + "'" + (l === t ? " selected='selected'" : "") + ">" + u[l] + "</option>");
          w += "</select>"
        }
        y || (b += w + (s || !m || !g ? "&#xa0;" : ""));
        if (!e.yearshtml) {
          e.yearshtml = "";
          if (s || !g) b += "<span class='ui-datepicker-year'>" + n + "</span>";
          else {
            c = this._get(e, "yearRange").split(":"), h = (new Date).getFullYear(), p = function (e) {
              var t = e.match(/c[+\-].*/) ? n + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? h + parseInt(e, 10) : parseInt(e, 10);
              return isNaN(t) ? h : t
            }, d = p(c[0]), v = Math.max(d, p(c[1] || "")), d = r ? Math.max(d, r.getFullYear()) : d, v = i ? Math.min(v, i.getFullYear()) : v, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
            for (; d <= v; d++) e.yearshtml += "<option value='" + d + "'" + (d === n ? " selected='selected'" : "") + ">" + d + "</option>";
            e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null
          }
        }
        return b += this._get(e, "yearSuffix"), y && (b += (s || !m || !g ? "&#xa0;" : "") + w), b += "</div>", b
      },
      _adjustInstDate: function (e, t, n) {
        var r = e.selectedYear + (n === "Y" ? t : 0),
          i = e.selectedMonth + (n === "M" ? t : 0),
          s = Math.min(e.selectedDay, this._getDaysInMonth(r, i)) + (n === "D" ? t : 0),
          o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(r, i, s)));
        e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), (n === "M" || n === "Y") && this._notifyChange(e)
      },
      _restrictMinMax: function (e, t) {
        var n = this._getMinMaxDate(e, "min"),
          r = this._getMinMaxDate(e, "max"),
          i = n && t < n ? n : t;
        return r && i > r ? r : i
      },
      _notifyChange: function (e) {
        var t = this._get(e, "onChangeMonthYear");
        t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
      },
      _getNumberOfMonths: function (e) {
        var t = this._get(e, "numberOfMonths");
        return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
      },
      _getMinMaxDate: function (e, t) {
        return this._determineDate(e, this._get(e, t + "Date"), null)
      },
      _getDaysInMonth: function (e, t) {
        return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
      },
      _getFirstDayOfMonth: function (e, t) {
        return (new Date(e, t, 1)).getDay()
      },
      _canAdjustMonth: function (e, t, n, r) {
        var i = this._getNumberOfMonths(e),
          s = this._daylightSavingAdjust(new Date(n, r + (t < 0 ? t : i[0] * i[1]), 1));
        return t < 0 && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s)
      },
      _isInRange: function (e, t) {
        var n, r, i = this._getMinMaxDate(e, "min"),
          s = this._getMinMaxDate(e, "max"),
          o = null,
          u = null,
          a = this._get(e, "yearRange");
        return a && (n = a.split(":"), r = (new Date).getFullYear(), o = parseInt(n[0], 10), u = parseInt(n[1], 10), n[0].match(/[+\-].*/) && (o += r), n[1].match(/[+\-].*/) && (u += r)), (!i || t.getTime() >= i.getTime()) && (!s || t.getTime() <= s.getTime()) && (!o || t.getFullYear() >= o) && (!u || t.getFullYear() <= u)
      },
      _getFormatConfig: function (e) {
        var t = this._get(e, "shortYearCutoff");
        return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
          shortYearCutoff: t,
          dayNamesShort: this._get(e, "dayNamesShort"),
          dayNames: this._get(e, "dayNames"),
          monthNamesShort: this._get(e, "monthNamesShort"),
          monthNames: this._get(e, "monthNames")
        }
      },
      _formatDate: function (e, t, n, r) {
        t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
        var i = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, n, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
        return this.formatDate(this._get(e, "dateFormat"), i, this._getFormatConfig(e))
      }
    }), e.fn.datepicker = function (t) {
      if (!this.length) return this;
      e.datepicker.initialized || (e(document).on("mousedown", e.datepicker._checkExternalClick), e.datepicker.initialized = !0), e("#" + e.datepicker._mainDivId).length === 0 && e("body").append(e.datepicker.dpDiv);
      var n = Array.prototype.slice.call(arguments, 1);
      return typeof t != "string" || t !== "isDisabled" && t !== "getDate" && t !== "widget" ? t === "option" && arguments.length === 2 && typeof arguments[1] == "string" ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(n)) : this.each(function () {
        typeof t == "string" ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(n)) : e.datepicker._attachDatepicker(this, t)
      }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(n))
    }, e.datepicker = new s, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.12.0";
    var f = e.datepicker
  }), define("internal/FixedLocalTime", ["jquery", "TELang"], function (e, t) {
    "use strict";
    var n = null,
      r = function () {
        this._enable = !1, this._fixedHour = 11, this._currentDate, this._fixedMinutes = 0
      };
    return Cesium.defineProperties(r.prototype, {
      Enable: {
        get: function () {
          return this._enable
        },
        set: function (e) {
          this._enable = !!e
        }
      },
      Hour: {
        get: function () {
          return this._fixedHour
        },
        set: function (e) {
          if (e < 0 || e > 95 || isNaN(e)) return;
          this._fixedHour = e
        }
      },
      Minute: {
        get: function () {
          return this._fixedMinutes
        },
        set: function (e) {
          if (isNaN(e) || e < 0 || e > 60) return;
          this._fixedMinutes = e
        }
      },
      CurrentDate: {
        get: function () {
          return this._currentDate
        },
        set: function (e) {
          if (!(e instanceof Date)) return;
          this._currentDate = e
        }
      }
    }), r.prototype.init = function () {
      viewer.scene.preRender.addEventListener(this.onPreFrame, this)
    }, r.prototype.onPreFrame = function (e, t) {
      if (!this._enable) return;
      Cesium.defined(this._currentDate) || (this._currentDate = new Date);
      var n = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), this._currentDate.getDate(), this._fixedHour, this._fixedMinutes),
        r = Cesium.JulianDate.fromDate(n),
        i = 15 * Cesium.Math.toDegrees(viewer.camera.positionCartographic.longitude) / 3.75,
        s = Cesium.JulianDate.addMinutes(r, -i, Cesium.JulianDate.now());
      Cesium.JulianDate.addMinutes(s, -this._currentDate.getTimezoneOffset(), viewer.clock.currentTime)
    }, n = new r, n
  }), define("tools/TETools/ShadowTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "internal/Units", "./FavoritesStorage", "../ToolDelegate", "../ToolContainer", "internal/SearchBox", "internal/Navigate", "internal/NotificationCenter", "internal/GeometryHelper", "internal/InputMode", "tools/ToolDialog", "internal/datePicker", "internal/FixedLocalTime"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
    "use strict";

    function m() {
      this._isOpen = !1, this._explanationTextOnStartOnly = !0, this._explanationText = "Click the shadow button to toggle shadow display. Use the slider and calendar to set the date and time.", this._toolContainerText = "", this._currentDate = new Date, this._isCalendarTitlePressed = !1, this._slider = null, this._sliderText = "", this._isSliderClicked = !1, this._isShadowTurnedOn = !1, this._terrainImageryLayer = viewer.scene.imageryLayers._layers[0], this._imageryLayers = viewer.scene.imageryLayers._layers, this.getId = function () {
        return "ShadowTool"
      }, this.getMenuEntry = function () {
        return r.createFor(this, t.i18n("Menu_Time"), "./img/newDesign/bt_time.png", 65)
      }, this._eventListener = null
    }
    m.inheritsFrom(o), m.prototype.onOpenedToolContainer = function () {
      this._explanationTextOnStartOnly = !1, g = new Date(v.CurrentDate), e(e(".analyzeToolHeaderContainer")[0]).text(t.i18n("Menu_Time"))
    };
    var g, y = 0;
    return m.prototype.handleSliderChanged = function (e) {
      g != null && (this._currentDate = new Date(g)), this._isSliderClicked = !0;
      if (e.target.value > 95 || e.target.value < 0) return;
      var t = e.target.value,
        n = Math.floor(t / 4),
        r = t % 4 * 15;
      v.Hour = n, v.Minute = r, this.UpdateText(n)
    }, m.prototype.changeBrightnessToAllImageryLayers = function (e) {
      var t = this._imageryLayers.length;
      for (var n = 0; n < t; n++) this._imageryLayers[n].brightness = e
    }, m.prototype.handleSliderMoved = function (e) {
      if (this._isSliderClicked) {
        if (e.target.value > 95 || e.target.value < 0) return;
        var t = e.target.value;
        if (this._isShadowTurnedOn)
          if (t < 20 || t > 82) this.changeBrightnessToAllImageryLayers(.2);
          else if (t >= 20 && t <= 30) {
          var n = Cesium.Math.lerp(0, 10, t - 20) / 100 * .8 + .2;
          this.changeBrightnessToAllImageryLayers(n)
        } else if (t >= 72 && t <= 82) {
          var n = 1 - Cesium.Math.lerp(0, 10, t - 72) / 100 * .8;
          this.changeBrightnessToAllImageryLayers(n)
        } else t < 72 && t > 30 && this.changeBrightnessToAllImageryLayers(1);
        var r = this;
        setTimeout(function () {
          var e = Math.floor(t / 4),
            n = t % 4 * 15;
          v.Hour = e, v.Minute = n, r.UpdateText(e)
        }, 300)
      }
    }, m.prototype.IsShadow = function () {
      return viewer.shadows == Cesium.ShadowMode.ENABLED ? !0 : !1
    }, m.prototype.UpdateText = function (e) {
      var n = e > 11 ? " PM" : " AM",
        r = this._currentDate.getFullYear(),
        i = this._currentDate.getMonth() + 1,
        s = this._currentDate.getDate();
      e = e.toString(), s = s.toString(), s.length == 1 && (s = "0" + s), i = i.toString(), i.length == 1 && (i = "0" + i), e = e % 12 == 0 ? 12 : e % 12, this._toolContainerText = t.i18n("Date") + " " + +i + "/" + s + "/" + r, this._toolContainerText += "</br>" + t.i18n("Hour") + " " + e + n, this._toolContainer.setText(this._toolContainerText)
    }, m.prototype.handleSliderUp = function (e) {
      this._isSliderClicked = !1
    }, m.prototype.openDatePicker = function () {
      var n = this;
      if (p.IsOpen) p.close();
      else {
        var r = e("<div id='CalendarDivId' style='position:absolute;overflow:hidden; width:307px; height:100px;'></div>"),
          i = e("<div id='datepickerDiv'><input type='text' id='datepicker' size=1 style='border:none;'/></div>");
        r.append(i), p.open(t.i18n("Calendar"), "./img/date.png", r, this.onCloseDialogCalendar, !1), e(".toolDialog").css({
          top: "20%",
          left: "40%"
        }), e("#datepicker").datepicker({
          inline: !0,
          onSelect: function (e) {
            n._currentDate = e, v.CurrentDate = new Date(e), viewer.clock.currentTime = new Date(e), g = e, n._toolContainer.setText("Date: " + e), this._isCalendarTitlePressed = !0
          },
          onClose: function () {
            p.close(), e(".toolDialog #closeXID").click(), this._isCalendarTitlePressed = !0
          }
        }), e("#datepicker").datepicker("setDate", g), setTimeout(function () {
          e("#datepicker").show().focus().hide()
        }, 10), r.css({
          top: 20
        }), e(".toolDialogTitle").on("mousedown", function () {
          return !1
        })
      }
    }, m.prototype.onCloseDialogCalendar = function () {
      e("#datepicker").datepicker("hide")
    }, m.prototype.onBeforeOpenToolContainer = function () {
      return h.Mode = h.MEASUREMENT, this._isOpen = !0, e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), this.parent.onBeforeOpenToolContainer.call(this), e("#TextView").length > 0 && e("#TextView").empty(), this._toolContainer.setText(this._toolContainerText), this._explanationTextOnStartOnly && this._toolContainer.setExplanationText(this._explanationText), this._toolContainer.addSlider(0, 95, 1, 0), e("#sliderId").on("touchstart", e.proxy(this.handleSliderChanged, this)), e("#sliderId").on("touchmove", e.proxy(this.handleSliderMoved, this)), e("#sliderId").on("touchend", e.proxy(this.handleSliderUp, this)), e("#sliderId").mousedown(e.proxy(this.handleSliderChanged, this)), e("#sliderId").mousemove(e.proxy(this.handleSliderMoved, this)), e("#sliderId").mouseup(e.proxy(this.handleSliderUp, this)), e("#sliderId").keydown(e.proxy(this.handleSliderChanged, this)), this._toolContainer.addButton("datePicker", "./img/date.png"), this._toolContainer.addButton("shadowToggle", "./img/shadowHouse.png"), this.IsShadow() ? this.enableShadowButton() : this.disableShadowButton(), !0
    }, m.prototype.onClosedToolContainer = function () {
      this._explanationTextOnStartOnly = !0
    }, m.prototype.setShadowToggleEffect = function (t) {
      var n = this._toolContainer.getText();
      e("#TextView").empty(), e("#TextView").removeClass("explanation"), e("#TextView").animate({
        opacity: 0
      }, function () {
        e(this).text(t).animate({
          opacity: 1
        })
      })
    }, m.prototype.enableShadow = function () {
      this._isShadowTurnedOn = !0, viewer.shadows = Cesium.ShadowMode.ENABLED, viewer.terrainShadows = Cesium.ShadowMode.ENABLED, viewer.scene.globe.enableLighting = !0, this._toolContainer.updateButton("shadowToggle", "./img/shadowHouse2.png"), this.setShadowToggleEffect(t.i18n("shadow_mode_on")), e("#shadowToggle").addClass("shadowToggleButton")
    }, m.prototype.disableShadow = function () {
      this._isShadowTurnedOn = !1, this.changeBrightnessToAllImageryLayers(1), viewer.shadows = Cesium.ShadowMode.DISABLED, viewer.terrainShadows = Cesium.ShadowMode.DISABLED, viewer.scene.globe.enableLighting = !1, this._toolContainer.updateButton("shadowToggle", "./img/shadowHouse.png"), this.setShadowToggleEffect(t.i18n("shadow_mode_off")), e("#shadowToggle").removeClass("shadowToggleButton")
    }, m.prototype.enableShadowButton = function () {
      this._toolContainer.updateButton("shadowToggle", "./img/shadowHouse2.png"), this.setShadowToggleEffect(t.i18n("shadow_mode_on")), e("#shadowToggle").addClass("shadowToggleButton")
    }, m.prototype.disableShadowButton = function () {
      this._toolContainer.updateButton("shadowToggle", "./img/shadowHouse.png"), this.setShadowToggleEffect(t.i18n("shadow_mode_off")), e("#shadowToggle").removeClass("shadowToggleButton")
    }, m.prototype.terrainShadowToggle = function () {
      if (viewer.shadows == Cesium.ShadowMode.DISABLED) {
        var e = viewer.scene.primitives._primitives,
          t = e.length;
        for (var n = 0; n < t; ++n) Cesium.defined(e[n].shadows) && e[n].shadows == Cesium.ShadowMode.DISABLED && e[n].appearance.constructor.name == "PerInstanceColorAppearance" && (e[n].shadows = Cesium.ShadowMode.ENABLED);
        this.enableShadow()
      } else viewer.shadows == Cesium.ShadowMode.ENABLED && this.disableShadow()
    }, m.prototype.onButtonClick = function (t) {
      this.parent.onButtonClick.call(this, t);
      switch (t) {
        case "datePicker":
          e("#TextView").empty(), this.openDatePicker();
          break;
        case "shadowToggle":
          this.terrainShadowToggle()
      }
    }, m.prototype.onBeforeCloseToolContainer = function (e) {
      return this.parent.onBeforeCloseToolContainer.call(this, e), this._isOpen = !1, h.Mode = h.FREE_FLIGHT, f.stop(), !0
    }, m
  }), define("tools/TETools/EditFavoriteTool", ["jquery", "TELang", "tools/ToolDialog", "internal/Globals", "./FavoritesStorage", "../ToolProtocol"], function (e, t, n, r, i, s) {
    "use strict";
    var o = function () {
      this._favoritesStorage = i.DefaultStorage, this._favoriteItemId = "", this._currentItem = null, this.getId = function () {
        return "EditFavoriteTool"
      }, this.open = function (r) {
        var i = e("<div style='position:absolute; width:400px; height:220px; padding:10px;'></div>"),
          s = e("<label class='toolDialogLabel' for='NameId' style=''>" + t.i18n("edit_favorite_name") + "<br><input type='text' id='NameId' class='toolDialogInputText link' style='border:none;width:100%;'/></label>"),
          o = e("<label class='toolDialogLabel' style='display:inline-block; width:96%;'>" + t.i18n("edit_favorite_show_in_3d_view") + "</label><input type='checkbox' class='css-checkbox' id='ShowIn3DId' style='' /><label class='css-label-grey' style='right:10%;' for='ShowIn3DId'></label><br>"),
          u = e("<label id='IconLabelId' class='toolDialogLabel' >" + t.i18n("edit_favorite_icon") + "</label><br><Label id='FavoriteIconName' class='toolDialogInputText' style='border:none;'>123</Label></select>"),
          a = e("<label class='toolDialogLabel' for='MessageId' style=''>" + t.i18n("edit_favorite_message") + "<br><textarea type='text' id='MessageId' class='toolDialogInputText input' rows='3'style='width:100%;padding:2px;'/></label>");
        i.append(s).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(o).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(u).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(a), n.PositionX = 200, n.PositionY = 200, n.open(t.i18n("title_activity_favorites"), "./img/favorits.png", i.get(0), e.proxy(this.onClose, this));
        var f = e("#CloseButton")[0];
        f.textContent = t.i18n("OK"), e(f).width("40"), this._favoriteItemId = r, this._favoriteItemId == undefined ? (this._currentItem = this._favoritesStorage.createFavoriteItem(), this._currentItem.name = t.i18n("favorites_default_name")) : (this._currentItem = this._favoritesStorage.getItem(this._favoriteItemId), this._currentItem == null), e("#NameId").val(this._currentItem.name), e("#ShowIn3DId").prop("checked", this._currentItem.showOn3D), e("#MessageId").val(this._currentItem.desc);
        var l = this._favoritesStorage,
          c = l.iconList(),
          h = 0;
        for (var p = c.length - 1; p >= 0; p--) {
          var d = c[p].replace("./img/", "./img/dialogs/"),
            v = e("<img class='link' id='" + p + "' selectedIcon='false' src='" + d + "'style='height:16px; width:16px; border:1px solid rgba(236, 236, 236, 1.0); padding:2px; margin:5px 0px 5px 10px; float:right;' />");
          e("#IconLabelId").append(v), v.click(function () {
            for (var t = c.length - 1; t >= 0; t--) e("#IconLabelId").find("#" + t).css({
              border: this.id == t ? "1px solid rgba(150, 150, 150, 1.0)" : "1px solid rgba(236, 236, 236, 1.0)"
            }), e("#IconLabelId").find("#" + t).attr("selectedIcon", this.id == t), e("#FavoriteIconName").text(l.descriptionForIcon(c[this.id]))
          }), this._currentItem.icon == c[p] && (h = p)
        }
        e("#IconLabelId").find("#" + h).click()
      }
    };
    return o.inheritsFrom(s), Cesium.defineProperties(o.prototype, {}), o.prototype.onClose = function () {
      this._currentItem.name = e("#NameId").val(), this._currentItem.showOn3D = e("#ShowIn3DId").is(":checked"), this._currentItem.desc = e("#MessageId").val();
      var t = e("#IconLabelId").find("[selectedIcon='true']").attr("src");
      this._currentItem.icon = t.replace("./img/dialogs/", "./img/"), this._favoritesStorage.saveItem(this._currentItem);
      var n = e("#ListParentID").length > 0;
      if (n) {
        var r = e("#ListParentID")[0].scrollTop;
        e("#menuIconPlacesTool").length > 0 && e("#menuIconPlacesTool").click(), e(e("#ListParentID")[0]).animate({
          scrollTop: r
        }, 1)
      }
    }, o
  }), window.jscolor || (window.jscolor = function () {
    var e = {
      register: function () {
        e.attachDOMReadyEvent(e.init), e.attachEvent(document, "mousedown", e.onDocumentMouseDown), e.attachEvent(document, "touchstart", e.onDocumentTouchStart), e.attachEvent(window, "resize", e.onWindowResize)
      },
      init: function () {
        e.jscolor.lookupClass && e.jscolor.installByClassName(e.jscolor.lookupClass)
      },
      tryInstallOnElements: function (t, n) {
        var r = new RegExp("(^|\\s)(" + n + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i");
        for (var i = 0; i < t.length; i += 1) {
          if (t[i].type !== undefined && t[i].type.toLowerCase() == "color" && e.isColorAttrSupported) continue;
          var s;
          if (!t[i].jscolor && t[i].className && (s = t[i].className.match(r))) {
            var o = t[i],
              u = null,
              a = e.getDataAttr(o, "jscolor");
            a !== null ? u = a : s[4] && (u = s[4]);
            var f = {};
            if (u) try {
              f = (new Function("return (" + u + ")"))()
            } catch (l) {
              e.warn("Error parsing jscolor options: " + l + ":\n" + u)
            }
            o.jscolor = new e.jscolor(o, f)
          }
        }
      },
      isColorAttrSupported: function () {
        var e = document.createElement("input");
        if (e.setAttribute) {
          e.setAttribute("type", "color");
          if (e.type.toLowerCase() == "color") return !0
        }
        return !1
      }(),
      isCanvasSupported: function () {
        var e = document.createElement("canvas");
        return !!e.getContext && !!e.getContext("2d")
      }(),
      fetchElement: function (e) {
        return typeof e == "string" ? document.getElementById(e) : e
      },
      isElementType: function (e, t) {
        return e.nodeName.toLowerCase() === t.toLowerCase()
      },
      getDataAttr: function (e, t) {
        var n = "data-" + t,
          r = e.getAttribute(n);
        return r !== null ? r : null
      },
      attachEvent: function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
      },
      detachEvent: function (e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
      },
      _attachedGroupEvents: {},
      attachGroupEvent: function (t, n, r, i) {
        e._attachedGroupEvents.hasOwnProperty(t) || (e._attachedGroupEvents[t] = []), e._attachedGroupEvents[t].push([n, r, i]), e.attachEvent(n, r, i)
      },
      detachGroupEvents: function (t) {
        if (e._attachedGroupEvents.hasOwnProperty(t)) {
          for (var n = 0; n < e._attachedGroupEvents[t].length; n += 1) {
            var r = e._attachedGroupEvents[t][n];
            e.detachEvent(r[0], r[1], r[2])
          }
          delete e._attachedGroupEvents[t]
        }
      },
      attachDOMReadyEvent: function (e) {
        var t = !1,
          n = function () {
            t || (t = !0, e())
          };
        if (document.readyState === "complete") {
          setTimeout(n, 1);
          return
        }
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1);
        else if (document.attachEvent) {
          document.attachEvent("onreadystatechange", function () {
            document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), n())
          }), window.attachEvent("onload", n);
          if (document.documentElement.doScroll && window == window.top) {
            var r = function () {
              if (!document.body) return;
              try {
                document.documentElement.doScroll("left"), n()
              } catch (e) {
                setTimeout(r, 1)
              }
            };
            r()
          }
        }
      },
      warn: function (e) {
        window.console && window.console.warn && window.console.warn(e)
      },
      preventDefault: function (e) {
        e.preventDefault && e.preventDefault(), e.returnValue = !1
      },
      captureTarget: function (t) {
        t.setCapture && (e._capturedTarget = t, e._capturedTarget.setCapture())
      },
      releaseTarget: function () {
        e._capturedTarget && (e._capturedTarget.releaseCapture(), e._capturedTarget = null)
      },
      fireEvent: function (e, t) {
        if (!e) return;
        if (document.createEvent) {
          var n = document.createEvent("HTMLEvents");
          n.initEvent(t, !0, !0), e.dispatchEvent(n)
        } else if (document.createEventObject) {
          var n = document.createEventObject();
          e.fireEvent("on" + t, n)
        } else e["on" + t] && e["on" + t]()
      },
      classNameToList: function (e) {
        return e.replace(/^\s+|\s+$/g, "").split(/\s+/)
      },
      hasClass: function (e, t) {
        return t ? -1 != (" " + e.className.replace(/\s+/g, " ") + " ").indexOf(" " + t + " ") : !1
      },
      setClass: function (t, n) {
        var r = e.classNameToList(n);
        for (var i = 0; i < r.length; i += 1) e.hasClass(t, r[i]) || (t.className += (t.className ? " " : "") + r[i])
      },
      unsetClass: function (t, n) {
        var r = e.classNameToList(n);
        for (var i = 0; i < r.length; i += 1) {
          var s = new RegExp("^\\s*" + r[i] + "\\s*|" + "\\s*" + r[i] + "\\s*$|" + "\\s+" + r[i] + "(\\s+)", "g");
          t.className = t.className.replace(s, "$1")
        }
      },
      getStyle: function (e) {
        return window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle
      },
      setStyle: function () {
        var e = document.createElement("div"),
          t = function (t) {
            for (var n = 0; n < t.length; n += 1)
              if (t[n] in e.style) return t[n]
          },
          n = {
            borderRadius: t(["borderRadius", "MozBorderRadius", "webkitBorderRadius"]),
            boxShadow: t(["boxShadow", "MozBoxShadow", "webkitBoxShadow"])
          };
        return function (e, t, r) {
          switch (t.toLowerCase()) {
            case "opacity":
              var i = Math.round(parseFloat(r) * 100);
              e.style.opacity = r, e.style.filter = "alpha(opacity=" + i + ")";
              break;
            default:
              e.style[n[t]] = r
          }
        }
      }(),
      setBorderRadius: function (t, n) {
        e.setStyle(t, "borderRadius", n || "0")
      },
      setBoxShadow: function (t, n) {
        e.setStyle(t, "boxShadow", n || "none")
      },
      getElementPos: function (t, n) {
        var r = 0,
          i = 0,
          s = t.getBoundingClientRect();
        r = s.left, i = s.top;
        if (!n) {
          var o = e.getViewPos();
          r += o[0], i += o[1]
        }
        return [r, i]
      },
      getElementSize: function (e) {
        return [e.offsetWidth, e.offsetHeight]
      },
      getAbsPointerPos: function (e) {
        e || (e = window.event);
        var t = 0,
          n = 0;
        return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (t = e.changedTouches[0].clientX, n = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (t = e.clientX, n = e.clientY), {
          x: t,
          y: n
        }
      },
      getRelPointerPos: function (e) {
        e || (e = window.event);
        var t = e.target || e.srcElement,
          n = t.getBoundingClientRect(),
          r = 0,
          i = 0,
          s = 0,
          o = 0;
        return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (s = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (s = e.clientX, o = e.clientY), r = s - n.left, i = o - n.top, {
          x: r,
          y: i
        }
      },
      getViewPos: function () {
        var e = document.documentElement;
        return [(window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0), (window.pageYOffset || e.scrollTop) - (e.clientTop || 0)]
      },
      getViewSize: function () {
        var e = document.documentElement;
        return [window.innerWidth || e.clientWidth, window.innerHeight || e.clientHeight]
      },
      redrawPosition: function () {
        if (e.picker && e.picker.owner) {
          var t = e.picker.owner,
            n, r;
          t.fixed ? (n = e.getElementPos(t.targetElement, !0), r = [0, 0]) : (n = e.getElementPos(t.targetElement), r = e.getViewPos());
          var i = e.getElementSize(t.targetElement),
            s = e.getViewSize(),
            o = e.getPickerOuterDims(t),
            u, a, f;
          switch (t.position.toLowerCase()) {
            case "left":
              u = 1, a = 0, f = -1;
              break;
            case "right":
              u = 1, a = 0, f = 1;
              break;
            case "top":
              u = 0, a = 1, f = -1;
              break;
            default:
              u = 0, a = 1, f = 1
          }
          var l = (i[a] + o[a]) / 2;
          if (!t.smartPosition) var c = [n[u], n[a] + i[a] - l + l * f];
          else var c = [-r[u] + n[u] + o[u] > s[u] ? -r[u] + n[u] + i[u] / 2 > s[u] / 2 && n[u] + i[u] - o[u] >= 0 ? n[u] + i[u] - o[u] : n[u] : n[u], -r[a] + n[a] + i[a] + o[a] - l + l * f > s[a] ? -r[a] + n[a] + i[a] / 2 > s[a] / 2 && n[a] + i[a] - l - l * f >= 0 ? n[a] + i[a] - l - l * f : n[a] + i[a] - l + l * f : n[a] + i[a] - l + l * f >= 0 ? n[a] + i[a] - l + l * f : n[a] + i[a] - l - l * f];
          var h = c[u],
            p = c[a],
            d = t.fixed ? "fixed" : "absolute",
            v = (c[0] + o[0] > n[0] || c[0] < n[0] + i[0]) && c[1] + o[1] < n[1] + i[1];
          e._drawPosition(t, h, p, d, v)
        }
      },
      _drawPosition: function (t, n, r, i, s) {
        var o = s ? 0 : t.shadowBlur;
        e.picker.wrap.style.position = i, e.picker.wrap.style.left = n + "px", e.picker.wrap.style.top = r + "px", e.setBoxShadow(e.picker.boxS, t.shadow ? new e.BoxShadow(0, o, t.shadowBlur, 0, t.shadowColor) : null)
      },
      getPickerDims: function (t) {
        var n = !!e.getSliderComponent(t),
          r = [2 * t.insetWidth + 2 * t.padding + t.width + (n ? 2 * t.insetWidth + e.getPadToSliderPadding(t) + t.sliderSize : 0), 2 * t.insetWidth + 2 * t.padding + t.height + (t.closable ? 2 * t.insetWidth + t.padding + t.buttonHeight : 0)];
        return r
      },
      getPickerOuterDims: function (t) {
        var n = e.getPickerDims(t);
        return [n[0] + 2 * t.borderWidth, n[1] + 2 * t.borderWidth]
      },
      getPadToSliderPadding: function (e) {
        return Math.max(e.padding, 1.5 * (2 * e.pointerBorderWidth + e.pointerThickness))
      },
      getPadYComponent: function (e) {
        switch (e.mode.charAt(1).toLowerCase()) {
          case "v":
            return "v"
        }
        return "s"
      },
      getSliderComponent: function (e) {
        if (e.mode.length > 2) switch (e.mode.charAt(2).toLowerCase()) {
          case "s":
            return "s";
          case "v":
            return "v"
        }
        return null
      },
      onDocumentMouseDown: function (t) {
        t || (t = window.event);
        var n = t.target || t.srcElement;
        n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "mouse") : e.picker && e.picker.owner && e.picker.owner.hide()
      },
      onDocumentTouchStart: function (t) {
        t || (t = window.event);
        var n = t.target || t.srcElement;
        n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "touch") : e.picker && e.picker.owner && e.picker.owner.hide()
      },
      onWindowResize: function (t) {
        e.redrawPosition()
      },
      onParentScroll: function (t) {
        e.picker && e.picker.owner && e.picker.owner.hide()
      },
      _pointerMoveEvent: {
        mouse: "mousemove",
        touch: "touchmove"
      },
      _pointerEndEvent: {
        mouse: "mouseup",
        touch: "touchend"
      },
      _pointerOrigin: null,
      _capturedTarget: null,
      onControlPointerStart: function (t, n, r, i) {
        var s = n._jscInstance;
        e.preventDefault(t), e.captureTarget(n);
        var o = function (s, o) {
          e.attachGroupEvent("drag", s, e._pointerMoveEvent[i], e.onDocumentPointerMove(t, n, r, i, o)), e.attachGroupEvent("drag", s, e._pointerEndEvent[i], e.onDocumentPointerEnd(t, n, r, i))
        };
        o(document, [0, 0]);
        if (window.parent && window.frameElement) {
          var u = window.frameElement.getBoundingClientRect(),
            a = [-u.left, -u.top];
          o(window.parent.window.document, a)
        }
        var f = e.getAbsPointerPos(t),
          l = e.getRelPointerPos(t);
        e._pointerOrigin = {
          x: f.x - l.x,
          y: f.y - l.y
        };
        switch (r) {
          case "pad":
            switch (e.getSliderComponent(s)) {
              case "s":
                s.hsv[1] === 0 && s.fromHSV(null, 100, null);
                break;
              case "v":
                s.hsv[2] === 0 && s.fromHSV(null, null, 100)
            }
            e.setPad(s, t, 0, 0);
            break;
          case "sld":
            e.setSld(s, t, 0)
        }
        e.dispatchFineChange(s)
      },
      onDocumentPointerMove: function (t, n, r, i, s) {
        return function (t) {
          var i = n._jscInstance;
          switch (r) {
            case "pad":
              t || (t = window.event), e.setPad(i, t, s[0], s[1]), e.dispatchFineChange(i);
              break;
            case "sld":
              t || (t = window.event), e.setSld(i, t, s[1]), e.dispatchFineChange(i)
          }
        }
      },
      onDocumentPointerEnd: function (t, n, r, i) {
        return function (t) {
          var r = n._jscInstance;
          e.detachGroupEvents("drag"), e.releaseTarget(), e.dispatchChange(r)
        }
      },
      dispatchChange: function (t) {
        t.valueElement && e.isElementType(t.valueElement, "input") && e.fireEvent(t.valueElement, "change")
      },
      dispatchFineChange: function (e) {
        if (e.onFineChange) {
          var t;
          typeof e.onFineChange == "string" ? t = new Function(e.onFineChange) : t = e.onFineChange, t.call(e)
        }
      },
      setPad: function (t, n, r, i) {
        var s = e.getAbsPointerPos(n),
          o = r + s.x - e._pointerOrigin.x - t.padding - t.insetWidth,
          u = i + s.y - e._pointerOrigin.y - t.padding - t.insetWidth,
          a = o * (360 / (t.width - 1)),
          f = 100 - u * (100 / (t.height - 1));
        switch (e.getPadYComponent(t)) {
          case "s":
            t.fromHSV(a, f, null, e.leaveSld);
            break;
          case "v":
            t.fromHSV(a, null, f, e.leaveSld)
        }
      },
      setSld: function (t, n, r) {
        var i = e.getAbsPointerPos(n),
          s = r + i.y - e._pointerOrigin.y - t.padding - t.insetWidth,
          o = 100 - s * (100 / (t.height - 1));
        switch (e.getSliderComponent(t)) {
          case "s":
            t.fromHSV(null, o, null, e.leavePad);
            break;
          case "v":
            t.fromHSV(null, null, o, e.leavePad)
        }
      },
      _vmlNS: "jsc_vml_",
      _vmlCSS: "jsc_vml_css_",
      _vmlReady: !1,
      initVML: function () {
        if (!e._vmlReady) {
          var t = document;
          t.namespaces[e._vmlNS] || t.namespaces.add(e._vmlNS, "urn:schemas-microsoft-com:vml");
          if (!t.styleSheets[e._vmlCSS]) {
            var n = ["shape", "shapetype", "group", "background", "path", "formulas", "handles", "fill", "stroke", "shadow", "textbox", "textpath", "imagedata", "line", "polyline", "curve", "rect", "roundrect", "oval", "arc", "image"],
              r = t.createStyleSheet();
            r.owningElement.id = e._vmlCSS;
            for (var i = 0; i < n.length; i += 1) r.addRule(e._vmlNS + "\\:" + n[i], "behavior:url(#default#VML);")
          }
          e._vmlReady = !0
        }
      },
      createPalette: function () {
        var t = {
          elm: null,
          draw: null
        };
        if (e.isCanvasSupported) {
          var n = document.createElement("canvas"),
            r = n.getContext("2d"),
            i = function (e, t, i) {
              n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height);
              var s = r.createLinearGradient(0, 0, n.width, 0);
              s.addColorStop(0, "#F00"), s.addColorStop(1 / 6, "#FF0"), s.addColorStop(2 / 6, "#0F0"), s.addColorStop(.5, "#0FF"), s.addColorStop(4 / 6, "#00F"), s.addColorStop(5 / 6, "#F0F"), s.addColorStop(1, "#F00"), r.fillStyle = s, r.fillRect(0, 0, n.width, n.height);
              var o = r.createLinearGradient(0, 0, 0, n.height);
              switch (i.toLowerCase()) {
                case "s":
                  o.addColorStop(0, "rgba(255,255,255,0)"), o.addColorStop(1, "rgba(255,255,255,1)");
                  break;
                case "v":
                  o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(1, "rgba(0,0,0,1)")
              }
              r.fillStyle = o, r.fillRect(0, 0, n.width, n.height)
            };
          t.elm = n, t.draw = i
        } else {
          e.initVML();
          var s = document.createElement("div");
          s.style.position = "relative", s.style.overflow = "hidden";
          var o = document.createElement(e._vmlNS + ":fill");
          o.type = "gradient", o.method = "linear", o.angle = "90", o.colors = "16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";
          var u = document.createElement(e._vmlNS + ":rect");
          u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u);
          var a = document.createElement(e._vmlNS + ":fill");
          a.type = "gradient", a.method = "linear", a.angle = "180", a.opacity = "0";
          var f = document.createElement(e._vmlNS + ":rect");
          f.style.position = "absolute", f.style.left = "-1px", f.style.top = "-1px", f.stroked = !1, f.appendChild(a), s.appendChild(f);
          var i = function (e, t, n) {
            s.style.width = e + "px", s.style.height = t + "px", u.style.width = f.style.width = e + 1 + "px", u.style.height = f.style.height = t + 1 + "px", o.color = "#F00", o.color2 = "#F00";
            switch (n.toLowerCase()) {
              case "s":
                a.color = a.color2 = "#FFF";
                break;
              case "v":
                a.color = a.color2 = "#000"
            }
          };
          t.elm = s, t.draw = i
        }
        return t
      },
      createSliderGradient: function () {
        var t = {
          elm: null,
          draw: null
        };
        if (e.isCanvasSupported) {
          var n = document.createElement("canvas"),
            r = n.getContext("2d"),
            i = function (e, t, i, s) {
              n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height);
              var o = r.createLinearGradient(0, 0, 0, n.height);
              o.addColorStop(0, i), o.addColorStop(1, s), r.fillStyle = o, r.fillRect(0, 0, n.width, n.height)
            };
          t.elm = n, t.draw = i
        } else {
          e.initVML();
          var s = document.createElement("div");
          s.style.position = "relative", s.style.overflow = "hidden";
          var o = document.createElement(e._vmlNS + ":fill");
          o.type = "gradient", o.method = "linear", o.angle = "180";
          var u = document.createElement(e._vmlNS + ":rect");
          u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u);
          var i = function (e, t, n, r) {
            s.style.width = e + "px", s.style.height = t + "px", u.style.width = e + 1 + "px", u.style.height = t + 1 + "px", o.color = n, o.color2 = r
          };
          t.elm = s, t.draw = i
        }
        return t
      },
      leaveValue: 1,
      leaveStyle: 2,
      leavePad: 4,
      leaveSld: 8,
      BoxShadow: function () {
        var e = function (e, t, n, r, i, s) {
          this.hShadow = e, this.vShadow = t, this.blur = n, this.spread = r, this.color = i, this.inset = !!s
        };
        return e.prototype.toString = function () {
          var e = [Math.round(this.hShadow) + "px", Math.round(this.vShadow) + "px", Math.round(this.blur) + "px", Math.round(this.spread) + "px", this.color];
          return this.inset && e.push("inset"), e.join(" ")
        }, e
      }(),
      jscolor: function (t, n) {
        function i(e, t, n) {
          e /= 255, t /= 255, n /= 255;
          var r = Math.min(Math.min(e, t), n),
            i = Math.max(Math.max(e, t), n),
            s = i - r;
          if (s === 0) return [null, 0, 100 * i];
          var o = e === r ? 3 + (n - t) / s : t === r ? 5 + (e - n) / s : 1 + (t - e) / s;
          return [60 * (o === 6 ? 0 : o), 100 * (s / i), 100 * i]
        }

        function s(e, t, n) {
          var r = 255 * (n / 100);
          if (e === null) return [r, r, r];
          e /= 60, t /= 100;
          var i = Math.floor(e),
            s = i % 2 ? e - i : 1 - (e - i),
            o = r * (1 - t),
            u = r * (1 - t * s);
          switch (i) {
            case 6:
            case 0:
              return [r, u, o];
            case 1:
              return [u, r, o];
            case 2:
              return [o, r, u];
            case 3:
              return [o, u, r];
            case 4:
              return [u, o, r];
            case 5:
              return [r, o, u]
          }
        }

        function o() {
          e.unsetClass(d.targetElement, d.activeClass), e.picker.wrap.parentNode.removeChild(e.picker.wrap), delete e.picker.owner
        }

        function u() {
          function l() {
            var e = d.insetColor.split(/\s+/),
              n = e.length < 2 ? e[0] : e[1] + " " + e[0] + " " + e[0] + " " + e[1];
            t.btn.style.borderColor = n
          }
          d._processParentElementsInDOM(), e.picker || (e.picker = {
            owner: null,
            wrap: document.createElement("div"),
            box: document.createElement("div"),
            boxS: document.createElement("div"),
            boxB: document.createElement("div"),
            pad: document.createElement("div"),
            padB: document.createElement("div"),
            padM: document.createElement("div"),
            padPal: e.createPalette(),
            cross: document.createElement("div"),
            crossBY: document.createElement("div"),
            crossBX: document.createElement("div"),
            crossLY: document.createElement("div"),
            crossLX: document.createElement("div"),
            sld: document.createElement("div"),
            sldB: document.createElement("div"),
            sldM: document.createElement("div"),
            sldGrad: e.createSliderGradient(),
            sldPtrS: document.createElement("div"),
            sldPtrIB: document.createElement("div"),
            sldPtrMB: document.createElement("div"),
            sldPtrOB: document.createElement("div"),
            btn: document.createElement("div"),
            btnT: document.createElement("span")
          }, e.picker.pad.appendChild(e.picker.padPal.elm), e.picker.padB.appendChild(e.picker.pad), e.picker.cross.appendChild(e.picker.crossBY), e.picker.cross.appendChild(e.picker.crossBX), e.picker.cross.appendChild(e.picker.crossLY), e.picker.cross.appendChild(e.picker.crossLX), e.picker.padB.appendChild(e.picker.cross), e.picker.box.appendChild(e.picker.padB), e.picker.box.appendChild(e.picker.padM), e.picker.sld.appendChild(e.picker.sldGrad.elm), e.picker.sldB.appendChild(e.picker.sld), e.picker.sldB.appendChild(e.picker.sldPtrOB), e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB), e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB), e.picker.sldPtrIB.appendChild(e.picker.sldPtrS), e.picker.box.appendChild(e.picker.sldB), e.picker.box.appendChild(e.picker.sldM), e.picker.btn.appendChild(e.picker.btnT), e.picker.box.appendChild(e.picker.btn), e.picker.boxB.appendChild(e.picker.box), e.picker.wrap.appendChild(e.picker.boxS), e.picker.wrap.appendChild(e.picker.boxB));
          var t = e.picker,
            n = !!e.getSliderComponent(d),
            r = e.getPickerDims(d),
            i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize,
            s = e.getPadToSliderPadding(d),
            o = Math.min(d.borderRadius, Math.round(d.padding * Math.PI)),
            u = "crosshair";
          t.wrap.style.clear = "both", t.wrap.style.width = r[0] + 2 * d.borderWidth + "px", t.wrap.style.height = r[1] + 2 * d.borderWidth + "px", t.wrap.style.zIndex = d.zIndex, t.box.style.width = r[0] + "px", t.box.style.height = r[1] + "px", t.boxS.style.position = "absolute", t.boxS.style.left = "0", t.boxS.style.top = "0", t.boxS.style.width = "100%", t.boxS.style.height = "100%", e.setBorderRadius(t.boxS, o + "px"), t.boxB.style.position = "relative", t.boxB.style.border = d.borderWidth + "px solid", t.boxB.style.borderColor = d.borderColor, t.boxB.style.background = d.backgroundColor, e.setBorderRadius(t.boxB, o + "px"), t.padM.style.background = t.sldM.style.background = "#FFF", e.setStyle(t.padM, "opacity", "0"), e.setStyle(t.sldM, "opacity", "0"), t.pad.style.position = "relative", t.pad.style.width = d.width + "px", t.pad.style.height = d.height + "px", t.padPal.draw(d.width, d.height, e.getPadYComponent(d)), t.padB.style.position = "absolute", t.padB.style.left = d.padding + "px", t.padB.style.top = d.padding + "px", t.padB.style.border = d.insetWidth + "px solid", t.padB.style.borderColor = d.insetColor, t.padM._jscInstance = d, t.padM._jscControlName = "pad", t.padM.style.position = "absolute", t.padM.style.left = "0", t.padM.style.top = "0", t.padM.style.width = d.padding + 2 * d.insetWidth + d.width + s / 2 + "px", t.padM.style.height = r[1] + "px", t.padM.style.cursor = u, t.cross.style.position = "absolute", t.cross.style.left = t.cross.style.top = "0", t.cross.style.width = t.cross.style.height = i + "px", t.crossBY.style.position = t.crossBX.style.position = "absolute", t.crossBY.style.background = t.crossBX.style.background = d.pointerBorderColor, t.crossBY.style.width = t.crossBX.style.height = 2 * d.pointerBorderWidth + d.pointerThickness + "px", t.crossBY.style.height = t.crossBX.style.width = i + "px", t.crossBY.style.left = t.crossBX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) - d.pointerBorderWidth + "px", t.crossBY.style.top = t.crossBX.style.left = "0", t.crossLY.style.position = t.crossLX.style.position = "absolute", t.crossLY.style.background = t.crossLX.style.background = d.pointerColor, t.crossLY.style.height = t.crossLX.style.width = i - 2 * d.pointerBorderWidth + "px", t.crossLY.style.width = t.crossLX.style.height = d.pointerThickness + "px", t.crossLY.style.left = t.crossLX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) + "px", t.crossLY.style.top = t.crossLX.style.left = d.pointerBorderWidth + "px", t.sld.style.overflow = "hidden", t.sld.style.width = d.sliderSize + "px", t.sld.style.height = d.height + "px", t.sldGrad.draw(d.sliderSize, d.height, "#000", "#000"), t.sldB.style.display = n ? "block" : "none", t.sldB.style.position = "absolute", t.sldB.style.right = d.padding + "px", t.sldB.style.top = d.padding + "px", t.sldB.style.border = d.insetWidth + "px solid", t.sldB.style.borderColor = d.insetColor, t.sldM._jscInstance = d, t.sldM._jscControlName = "sld", t.sldM.style.display = n ? "block" : "none", t.sldM.style.position = "absolute", t.sldM.style.right = "0", t.sldM.style.top = "0", t.sldM.style.width = d.sliderSize + s / 2 + d.padding + 2 * d.insetWidth + "px", t.sldM.style.height = r[1] + "px", t.sldM.style.cursor = "default", t.sldPtrIB.style.border = t.sldPtrOB.style.border = d.pointerBorderWidth + "px solid " + d.pointerBorderColor, t.sldPtrOB.style.position = "absolute", t.sldPtrOB.style.left = -(2 * d.pointerBorderWidth + d.pointerThickness) + "px", t.sldPtrOB.style.top = "0", t.sldPtrMB.style.border = d.pointerThickness + "px solid " + d.pointerColor, t.sldPtrS.style.width = d.sliderSize + "px", t.sldPtrS.style.height = m + "px", t.btn.style.display = d.closable ? "block" : "none", t.btn.style.position = "absolute", t.btn.style.left = d.padding + "px", t.btn.style.bottom = d.padding + "px", t.btn.style.padding = "0 15px", t.btn.style.height = d.buttonHeight + "px", t.btn.style.border = d.insetWidth + "px solid", l(), t.btn.style.color = d.buttonColor, t.btn.style.font = "12px sans-serif", t.btn.style.textAlign = "center";
          try {
            t.btn.style.cursor = "pointer"
          } catch (c) {
            t.btn.style.cursor = "hand"
          }
          t.btn.onmousedown = function () {
            d.hide()
          }, t.btnT.style.lineHeight = d.buttonHeight + "px", t.btnT.innerHTML = "", t.btnT.appendChild(document.createTextNode(d.closeText)), a(), f(), e.picker.owner && e.picker.owner !== d && e.unsetClass(e.picker.owner.targetElement, d.activeClass), e.picker.owner = d, e.isElementType(v, "body") ? e.redrawPosition() : e._drawPosition(d, 0, 0, "relative", !1), t.wrap.parentNode != v && v.appendChild(t.wrap), e.setClass(d.targetElement, d.activeClass)
        }

        function a() {
          switch (e.getPadYComponent(d)) {
            case "s":
              var t = 1;
              break;
            case "v":
              var t = 2
          }
          var n = Math.round(d.hsv[0] / 360 * (d.width - 1)),
            r = Math.round((1 - d.hsv[t] / 100) * (d.height - 1)),
            i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize,
            o = -Math.floor(i / 2);
          e.picker.cross.style.left = n + o + "px", e.picker.cross.style.top = r + o + "px";
          switch (e.getSliderComponent(d)) {
            case "s":
              var u = s(d.hsv[0], 100, d.hsv[2]),
                a = s(d.hsv[0], 0, d.hsv[2]),
                f = "rgb(" + Math.round(u[0]) + "," + Math.round(u[1]) + "," + Math.round(u[2]) + ")",
                l = "rgb(" + Math.round(a[0]) + "," + Math.round(a[1]) + "," + Math.round(a[2]) + ")";
              e.picker.sldGrad.draw(d.sliderSize, d.height, f, l);
              break;
            case "v":
              var c = s(d.hsv[0], d.hsv[1], 100),
                f = "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")",
                l = "#000";
              e.picker.sldGrad.draw(d.sliderSize, d.height, f, l)
          }
        }

        function f() {
          var t = e.getSliderComponent(d);
          if (t) {
            switch (t) {
              case "s":
                var n = 1;
                break;
              case "v":
                var n = 2
            }
            var r = Math.round((1 - d.hsv[n] / 100) * (d.height - 1));
            e.picker.sldPtrOB.style.top = r - (2 * d.pointerBorderWidth + d.pointerThickness) - Math.floor(m / 2) + "px"
          }
        }

        function l() {
          return e.picker && e.picker.owner === d
        }

        function c() {
          d.importColor()
        }
        this.value = null, this.valueElement = t, this.styleElement = t, this.required = !0, this.refine = !0, this.hash = !1, this.uppercase = !0, this.onFineChange = null, this.activeClass = "jscolor-active", this.minS = 0, this.maxS = 100, this.minV = 0, this.maxV = 100, this.hsv = [0, 0, 100], this.rgb = [255, 255, 255], this.width = 181, this.height = 101, this.showOnClick = !0, this.mode = "HSV", this.position = "bottom", this.smartPosition = !0, this.sliderSize = 16, this.crossSize = 8, this.closable = !1, this.closeText = "Close", this.buttonColor = "#000000", this.buttonHeight = 18, this.padding = 12, this.backgroundColor = "#FFFFFF", this.borderWidth = 1, this.borderColor = "#BBBBBB", this.borderRadius = 8, this.insetWidth = 1, this.insetColor = "#BBBBBB", this.shadow = !0, this.shadowBlur = 15, this.shadowColor = "rgba(0,0,0,0.2)", this.pointerColor = "#4C4C4C", this.pointerBorderColor = "#FFFFFF", this.pointerBorderWidth = 1, this.pointerThickness = 2, this.zIndex = 1e3, this.container = null;
        for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
        this.hide = function () {
          l() && o()
        }, this.show = function () {
          u()
        }, this.redraw = function () {
          l() && u()
        }, this.importColor = function () {
          this.valueElement ? e.isElementType(this.valueElement, "input") ? this.refine ? !this.required && /^\s*$/.test(this.valueElement.value) ? (this.valueElement.value = "", this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.fromString(this.valueElement.value) || this.exportColor() : this.fromString(this.valueElement.value, e.leaveValue) || (this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.exportColor() : this.exportColor()
        }, this.exportColor = function (t) {
          if (!(t & e.leaveValue) && this.valueElement) {
            var n = this.toString();
            this.uppercase && (n = n.toUpperCase()), this.hash && (n = "#" + n), e.isElementType(this.valueElement, "input") ? this.valueElement.value = n : this.valueElement.innerHTML = n
          }
          t & e.leaveStyle || this.styleElement && (this.styleElement.style.backgroundImage = "none", this.styleElement.style.backgroundColor = "#" + this.toString(), this.styleElement.style.color = this.isLight() ? "#000" : "#FFF"), !(t & e.leavePad) && l() && a(), !(t & e.leaveSld) && l() && f()
        }, this.fromHSV = function (e, t, n, r) {
          if (e !== null) {
            if (isNaN(e)) return !1;
            e = Math.max(0, Math.min(360, e))
          }
          if (t !== null) {
            if (isNaN(t)) return !1;
            t = Math.max(0, Math.min(100, this.maxS, t), this.minS)
          }
          if (n !== null) {
            if (isNaN(n)) return !1;
            n = Math.max(0, Math.min(100, this.maxV, n), this.minV)
          }
          this.rgb = s(e === null ? this.hsv[0] : this.hsv[0] = e, t === null ? this.hsv[1] : this.hsv[1] = t, n === null ? this.hsv[2] : this.hsv[2] = n), this.exportColor(r)
        }, this.fromRGB = function (e, t, n, r) {
          if (e !== null) {
            if (isNaN(e)) return !1;
            e = Math.max(0, Math.min(255, e))
          }
          if (t !== null) {
            if (isNaN(t)) return !1;
            t = Math.max(0, Math.min(255, t))
          }
          if (n !== null) {
            if (isNaN(n)) return !1;
            n = Math.max(0, Math.min(255, n))
          }
          var o = i(e === null ? this.rgb[0] : e, t === null ? this.rgb[1] : t, n === null ? this.rgb[2] : n);
          o[0] !== null && (this.hsv[0] = Math.max(0, Math.min(360, o[0]))), o[2] !== 0 && (this.hsv[1] = o[1] === null ? null : Math.max(0, this.minS, Math.min(100, this.maxS, o[1]))), this.hsv[2] = o[2] === null ? null : Math.max(0, this.minV, Math.min(100, this.maxV, o[2]));
          var u = s(this.hsv[0], this.hsv[1], this.hsv[2]);
          this.rgb[0] = u[0], this.rgb[1] = u[1], this.rgb[2] = u[2], this.exportColor(r)
        }, this.fromString = function (e, t) {
          var n;
          if (n = e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) return n[1].length === 6 ? this.fromRGB(parseInt(n[1].substr(0, 2), 16), parseInt(n[1].substr(2, 2), 16), parseInt(n[1].substr(4, 2), 16), t) : this.fromRGB(parseInt(n[1].charAt(0) + n[1].charAt(0), 16), parseInt(n[1].charAt(1) + n[1].charAt(1), 16), parseInt(n[1].charAt(2) + n[1].charAt(2), 16), t), !0;
          if (n = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
            var r = n[1].split(","),
              i = /^\s*(\d*)(\.\d+)?\s*$/,
              s, o, u;
            if (r.length >= 3 && (s = r[0].match(i)) && (o = r[1].match(i)) && (u = r[2].match(i))) {
              var a = parseFloat((s[1] || "0") + (s[2] || "")),
                f = parseFloat((o[1] || "0") + (o[2] || "")),
                l = parseFloat((u[1] || "0") + (u[2] || ""));
              return this.fromRGB(a, f, l, t), !0
            }
          }
          return !1
        }, this.toString = function () {
          return (256 | Math.round(this.rgb[0])).toString(16).substr(1) + (256 | Math.round(this.rgb[1])).toString(16).substr(1) + (256 | Math.round(this.rgb[2])).toString(16).substr(1)
        }, this.toHEXString = function () {
          return "#" + this.toString().toUpperCase()
        }, this.toRGBString = function () {
          return "rgb(" + Math.round(this.rgb[0]) + "," + Math.round(this.rgb[1]) + "," + Math.round(this.rgb[2]) + ")"
        }, this.isLight = function () {
          return .213 * this.rgb[0] + .715 * this.rgb[1] + .072 * this.rgb[2] > 127.5
        }, this._processParentElementsInDOM = function () {
          if (this._linkedElementsProcessed) return;
          this._linkedElementsProcessed = !0;
          var t = this.targetElement;
          do {
            var n = e.getStyle(t);
            n && n.position.toLowerCase() === "fixed" && (this.fixed = !0), t !== this.targetElement && (t._jscEventsAttached || (e.attachEvent(t, "scroll", e.onParentScroll), t._jscEventsAttached = !0))
          } while ((t = t.parentNode) && !e.isElementType(t, "body"))
        };
        if (typeof t == "string") {
          var h = t,
            p = document.getElementById(h);
          p ? this.targetElement = p : e.warn("Could not find target element with ID '" + h + "'")
        } else t ? this.targetElement = t : e.warn("Invalid target element: '" + t + "'");
        if (this.targetElement._jscLinkedInstance) {
          e.warn("Cannot link jscolor twice to the same element. Skipping.");
          return
        }
        this.targetElement._jscLinkedInstance = this, this.valueElement = e.fetchElement(this.valueElement), this.styleElement = e.fetchElement(this.styleElement);
        var d = this,
          v = this.container ? e.fetchElement(this.container) : document.getElementsByTagName("body")[0],
          m = 3;
        if (e.isElementType(this.targetElement, "button"))
          if (this.targetElement.onclick) {
            var g = this.targetElement.onclick;
            this.targetElement.onclick = function (e) {
              return g.call(this, e), !1
            }
          } else this.targetElement.onclick = function () {
            return !1
          };
        if (this.valueElement && e.isElementType(this.valueElement, "input")) {
          var y = function () {
            d.fromString(d.valueElement.value, e.leaveValue), e.dispatchFineChange(d)
          };
          e.attachEvent(this.valueElement, "keyup", y), e.attachEvent(this.valueElement, "input", y), e.attachEvent(this.valueElement, "blur", c), this.valueElement.setAttribute("autocomplete", "off")
        }
        this.styleElement && (this.styleElement._jscOrigStyle = {
          backgroundImage: this.styleElement.style.backgroundImage,
          backgroundColor: this.styleElement.style.backgroundColor,
          color: this.styleElement.style.color
        }), this.value ? this.fromString(this.value) || this.exportColor() : this.importColor()
      }
    };
    return e.jscolor.lookupClass = "jscolor", e.jscolor.installByClassName = function (t) {
      var n = document.getElementsByTagName("input"),
        r = document.getElementsByTagName("button");
      e.tryInstallOnElements(n, t), e.tryInstallOnElements(r, t)
    }, e.register(), e.jscolor
  }()), define("jscolor", function () {}), define("wfs/GMLParser", [], function () {
    "use strict";

    function e(e, t, n, r) {
      this._extractAttributes = e, this._featureName = t || "featureMember", this._xy = r, this._gmlns = n || "http://www.opengis.net/gml", this._regExes = {
        trimSpace: /^\s*|\s*$/g,
        removeSpace: /\s*/g,
        splitSpace: /\s+/,
        trimComma: /\s*,\s*/g
      }
    }
    return Object.defineProperties(e.prototype, {
      featureName: {
        get: function () {
          return this._featureName
        },
        set: function (e) {
          this._featureName = e
        }
      },
      extractAttributes: {
        get: function () {
          return this._extractAttributes
        },
        set: function (e) {
          this._extractAttributes = e
        }
      },
      xy: {
        get: function () {
          return this._xy
        }
      }
    }), e.prototype.getElementsByTagNameNS = function (e, t, n) {
      var r = [];
      if (e.getElementsByTagNameNS) r = e.getElementsByTagNameNS(t, n);
      else {
        var i = e.getElementsByTagName("*"),
          s, o;
        for (var u = 0, a = i.length; u < a; ++u) s = i[u], o = s.prefix ? s.prefix + ":" + n : n, (n == "*" || o == s.nodeName) && (t == "*" || t == s.namespaceURI) && r.push(s)
      }
      return r
    }, e.prototype.read = function (e) {
      var t = this.getElementsByTagNameNS(e.documentElement, this._gmlns, this.featureName),
        n = [];
      for (var r = 0; r < t.length; r++) {
        var i = this.parseFeature(t[r]);
        i && n.push(i)
      }
      return n
    }, e.prototype.parseFeature = function (e) {
      var t = ["MultiPolygon", "Polygon", "MultiLineString", "LineString", "MultiPoint", "Point", "Envelope"],
        n, r, i, s;
      for (var o = 0; o < t.length; ++o) {
        n = t[o], r = this.getElementsByTagNameNS(e, this._gmlns, n);
        if (r.length > 0) {
          s = this.parseGeometry[n.toLowerCase()], s ? i = s.apply(this, [r[0]]) : console.log("unsupportedGeometryType:" + n);
          break
        }
      }
      var u, a = this.getElementsByTagNameNS(e, this._gmlns, "Box");
      for (o = 0; o < a.length; ++o) {
        var f = a[o],
          l = this.parseGeometry.box.apply(this, [f]),
          c = f.parentNode,
          h = c.localName || c.nodeName.split(":").pop();
        h === "boundedBy" ? u = l : i = l.toGeometry()
      }
      var p;
      this.extractAttributes && (p = this.parseAttributes(e));
      var d = {
        geometryType: n.toLowerCase(),
        positions: i,
        attributes: p
      };
      d.bounds = u;
      var v = e.firstChild,
        m;
      while (v) {
        if (v.nodeType == 1) {
          m = v.getAttribute("fid") || v.getAttribute("id");
          if (m) break
        }
        v = v.nextSibling
      }
      return d.fid = m, d
    }, e.prototype.parseGeometry = {
      point: function (e) {
        var t, n, r = [],
          t = this.getElementsByTagNameNS(e, this._gmlns, "pos");
        t.length > 0 && (n = t[0].firstChild.nodeValue, n = n.replace(this._regExes.trimSpace, ""), r = n.split(this._regExes.splitSpace)), r.length == 0 && (t = this.getElementsByTagNameNS(e, this._gmlns, "coordinates"), t.length > 0 && (n = t[0].firstChild.nodeValue, n = n.replace(this._regExes.removeSpace, ""), r = n.split(",")));
        if (r.length == 0) {
          t = this.getElementsByTagNameNS(e, this._gmlns, "coord");
          if (t.length > 0) {
            var i = this.getElementsByTagNameNS(t[0], this._gmlns, "X"),
              s = this.getElementsByTagNameNS(t[0], this._gmlns, "Y");
            i.length > 0 && s.length > 0 && (r = [i[0].firstChild.nodeValue, s[0].firstChild.nodeValue])
          }
        }
        return r.length == 2 && (r[2] = null), this.xy ? [parseFloat(r[0]), parseFloat(r[1]), parseFloat(r[2])] : [parseFloat(r[1]), parseFloat(r[0]), parseFloat(r[2])]
      },
      multipoint: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "Point"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.point.apply(this, [t[i]]), r && n.push(r)
        }
        return n
      },
      linestring: function (e, t) {
        var n, r, i = [],
          s = [];
        n = this.getElementsByTagNameNS(e, this._gmlns, "posList");
        if (n.length > 0) {
          r = this.getChildValue(n[0]), r = r.replace(this._regExes.trimSpace, ""), i = r.split(this._regExes.splitSpace);
          var o = parseInt(n[0].getAttribute("dimension")),
            u, a, f, l;
          for (var c = 0; c < i.length / o; ++c) u = c * o, a = parseFloat(i[u]), f = parseFloat(i[u + 1]), l = o == 2 ? null : parseFloat(i[u + 2]), this.xy ? s.push(a, f, l) : s.push(f, a, l)
        }
        if (i.length == 0) {
          n = this.getElementsByTagNameNS(e, this._gmlns, "coordinates");
          if (n.length > 0) {
            r = this.getChildValue(n[0]), r = r.replace(this._regExes.trimSpace, ""), r = r.replace(this._regExes.trimComma, ",");
            var h = r.split(this._regExes.splitSpace);
            for (var c = 0; c < h.length; ++c) i = h[c].split(","), i.length == 2 && (i[2] = null), this.xy ? s.push(parseFloat(i[0]), parseFloat(i[1]), parseFloat(i[2])) : s.push(parseFloat(i[1]), parseFloat(i[0]), parseFloat(i[2]))
          }
        }
        return s
      },
      multilinestring: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "LineString"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.linestring.apply(this, [t[i]]), r && n.push(r)
        }
        return n
      },
      polygon: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "LinearRing"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.linestring.apply(this, [t[i], !0]), r && n.push(r)
        }
        return n
      },
      multipolygon: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "Polygon"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.polygon.apply(this, [t[i]]), r && n.push(r)
        }
        return n
      },
      envelope: function (e) {
        var t = [],
          n, r, i = this.getElementsByTagNameNS(e, this._gmlns, "lowerCorner");
        if (i.length > 0) {
          var s = [];
          i.length > 0 && (n = i[0].firstChild.nodeValue, n = n.replace(this._regExes.trimSpace, ""), s = n.split(this._regExes.splitSpace)), s.length == 2 && (s[2] = null);
          if (this.xy) var o = new OpenLayers_Geometry_Point(s[0], s[1], s[2]);
          else var o = new OpenLayers_Geometry_Point(s[1], s[0], s[2])
        }
        var u = this.getElementsByTagNameNS(e, this._gmlns, "upperCorner");
        if (u.length > 0) {
          var s = [];
          u.length > 0 && (n = u[0].firstChild.nodeValue, n = n.replace(this._regExes.trimSpace, ""), s = n.split(this._regExes.splitSpace)), s.length == 2 && (s[2] = null);
          if (this.xy) var a = new OpenLayers_Geometry_Point(s[0], s[1], s[2]);
          else var a = new OpenLayers_Geometry_Point(s[1], s[0], s[2])
        }
        return o && a && (t.push([o.x, o.y, null]), t.push([a.x, o.y, null]), t.push([a.x, a.y, null]), t.push([o.x, a.y, null]), t.push([o.x, o.y, null]), r = new OpenLayers_Geometry_Polygon([
          [t]
        ])), r
      },
      box: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "coordinates"),
          n, r, i = null,
          s = null;
        t.length > 0 && (n = t[0].firstChild.nodeValue, r = n.split(" "), r.length == 2 && (i = r[0].split(","), s = r[1].split(",")));
        if (i !== null && s !== null) return [parseFloat(i[0]), parseFloat(i[1]), null, parseFloat(s[0]), parseFloat(s[1]), null]
      }
    }, e.prototype.parseAttributes = function (e) {
      var t = {},
        n = e.firstChild,
        r, i, s, o, u, a, f;
      while (n) {
        if (n.nodeType == 1) {
          r = n.childNodes;
          for (i = 0; i < r.length; ++i) {
            s = r[i];
            if (s.nodeType == 1) {
              o = s.childNodes;
              if (o.length == 1) {
                u = o[0];
                if (u.nodeType == 3 || u.nodeType == 4) a = s.prefix ? s.nodeName.split(":")[1] : s.nodeName, f = u.nodeValue.replace(this._regExes.trimSpace, ""), t[a] = f
              } else t[s.nodeName.split(":").pop()] = null
            }
          }
          break
        }
        n = n.nextSibling
      }
      return t
    }, e.prototype.getChildValue = function (e, t) {
      var n = t || "";
      if (e)
        for (var r = e.firstChild; r; r = r.nextSibling) switch (r.nodeType) {
          case 3:
          case 4:
            n += r.nodeValue
        }
      return n
    }, e
  }), define("tools/TETools/EditLayersTool", ["jquery", "TELang", "tools/ToolDialog", "internal/Globals", "./LayersStorage", "../ToolProtocol", "jscolor", "wfs/GMLParser"], function (e, t, n, r, i, s, o, u) {
    "use strict";

    function a(e, t) {
      return e = e.replace("{s}", t == undefined ? "" : t[Math.floor(Math.random() * t.length)]), e
    }
    var f = function () {
      this._layersStorage = i.DefaultStorage, this._layerItemId = "", this._currentItem = null, this._editMode = !1, this._currentType = null, this._isLabel = !0, this._gmlParser = new u(!0, null, null, !0), this.getId = function () {
        return "EditLayersTool"
      }, this.open = function (r) {
        function E(e, t, n, r, i) {
          var s = (i - e) * (r - n) / (t - e) + n;
          return s
        }

        function S(e) {
          return e = parseInt(e, 10), isNaN(e) ? "00" : (e = Math.max(0, Math.min(e, 255)), "0123456789ABCDEF".charAt((e - e % 16) / 16) + "0123456789ABCDEF".charAt(e % 16))
        }

        function x(e, t, n) {
          var r = E(0, 1, 0, 255, e),
            i = E(0, 1, 0, 255, t),
            s = E(0, 1, 0, 255, n),
            o = S(r) + S(i) + S(s);
          return o
        }
        var i = r.LayerDisplayName,
          s;
        if (Cesium.defined(r.Style.polygon)) s = "FeaturePolygon";
        else if (Cesium.defined(r.Style.polyline)) s = "FeaturePolyline";
        else if (Cesium.defined(r.Style.billboard) || Cesium.defined(r.Style.label)) s = "FeaturePoint";
        this._editMode = !0;
        var o = e("<div style='position:absolute;width:400px; height:300px; padding:10px;'></div>"),
          u = e("<label class='toolDialogLabel' for='NameId' style=''>" + t.i18n("edit_layer_name") + "<br><input type='text' id='NameId' value=" + i + " class='toolDialogInputText link' style='border:none;width:100%;'/></label>"),
          a = e("<label id='IconLabelId' class='toolDialogLabel' >" + t.i18n("edit_layer_type") + "</label><br><label class='toolDialogLabel' style='font-size:0.8em;display:inline-block;margin-right:20px;'>" + t.i18n(s) + "</label><img id='iconImgID' src=''></img>"),
          f = e("<div class='toolDialogLineSeperator' style='height:30px;'><span style='font-size:14px;position:relative;top:5px;left:9.5px;color:Black;'>Display Options</span></div>");
        o.append(u).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(a).append(f);
        var l = e('<label class="toolDialogLabel" id="MaterialLabelId" style="">' + t.i18n("edit_layer_color") + ' </label><input id="colorPickerMaterial" class="jscolor"></input>').css("width", "100%"),
          c = e('<label class="toolDialogLabel" id="OulineColorLabelId" style="">' + t.i18n("edit_layer_outline_color") + ' </label><input id="outlineColorPickerMaterial" class="jscolor"></input>').css("width", "100%"),
          h = e("<label class='toolDialogLabel' for='iconOrLabelId' style=''>" + t.i18n("edit_layer_icon_or_label") + "<select class='toolDialogLabel' id='iconOrLabelId' style='float:right; cursor: pointer;'><option value='Icon'>" + t.i18n("Icon") + "</option><option value='Label'>" + t.i18n("Label") + "</option></select></label>"),
          p = e('<label class="toolDialogLabel" id="FillOpacityLabelId" style="position:relative;top:5px;">' + t.i18n("edit_layer_Opacity") + ' </label><br><input type="text" id="FillOpacityId" class="toolDialogInputText link" value="1" style="width:100%;position:relative;top:5px;"/>'),
          d = e("<label class='toolDialogLabel' for='WidthId' style=''>" + t.i18n("edit_layer_width") + "</label><br><input type='text' id='WidthId' class='toolDialogInputText link' value = '1' style='width:100%;'/>"),
          v = e("<label id='IconLabelId' class='toolDialogLabel' >" + t.i18n("edit_layer_Icon") + "</label><br><input type='text' id='layerIconName' value='./img/query.png' class='toolDialogInputText' style='width:100%'/>"),
          m = e("<label id='IconLabelId' class='toolDialogLabel' style='position:relative;top:-5px;' >" + t.i18n("edit_layer_label_text") + "</label><label id='applyClassificationID' class='toolDialogLabel' style='float:right;position:relative;right:38px;'>" + t.i18n("EditLayerTool_Classification_Label") + "</label><br><input type='text' id='layerLabelText' class='toolDialogInputText' value='" + t.i18n("edit_layers_label_text") + "' style='position:relative;top:-4px;width:50%;float:left;'/><select class='toolDialogLabel' id='classificationOptions' style='float:right; width:40%;cursor: pointer;position:relative;top:-3px;'><option value='" + t.i18n("edit_layers_label_text") + "'></option></select><br/>"),
          g = 0,
          y = 38;
        s == "FeaturePolygon" ? (d[0].textContent = t.i18n("edit_layer_lineWidth"), o.append(l).append(p).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(c).append(e("<div class='toolDialogLineSeperator' style='opacity:0;'></div>")).append(d), g = 8 * y, o.css("height", g)) : s == "FeaturePolyline" ? (o.append(l).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(d), g = 5 * y, o.css("height", g)) : s == "FeaturePoint" && (o.append(h).append(e("<div class='toolDialogLineSeperator' style=''></div>")), o.append(l).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(m).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(v), g = 7 * y, o.css("height", g)), n.PositionX = 350, n.PositionY = 100, n.open(t.i18n("Edit_Feature_Layer_Style"), "./img/layers.png", o.get(0), e.proxy(this.onClose, this), !0), s == "FeaturePolyline" && e(".toolDialog").css("height", "350"), s == "FeaturePolygon" && e(".toolDialog").css("height", "460"), s == "FeaturePoint" && e(".toolDialog").css("height", "450"), e(".toolDialog #CloseButton")[0].textContent = t.i18n("OK"), e(e(".toolDialog #CloseButton")[0]).width("50");
        var b = this;
        e("#iconOrLabelId").on("change", function () {
          e("#iconOrLabelId").val() == t.i18n("Label") ? (v.addClass("disabled"), e("#layerIconName").val(""), e("#layerLabelText").val("label text"), m.hasClass("disabled") && m.removeClass("disabled"), l.hasClass("disabled") && l.removeClass("disabled")) : (e("#layerLabelText").val(""), e("#layerIconName").val("./img/query.png"), l.addClass("disabled"), m.addClass("disabled"), v.hasClass("disabled") && v.removeClass("disabled")), b.resetClassificationSelectionBox()
        });
        var w = this.getIcon(s);
        e("#iconImgID").attr("src", w), jscolor.installByClassName("jscolor"), e("#colorPickerMaterial").click(), e("#MaterialLabelId").click();
        if (s == "FeaturePoint") {
          if (Cesium.defined(r.Style.label)) {
            var T = r.Style.label.text,
              N = r.Style.label.fillColor;
            e("#iconOrLabelId").val(t.i18n("Label")), v.addClass("disabled"), e("#layerIconName").val("")
          } else if (Cesium.defined(r.Style.billboard)) {
            e("#iconOrLabelId").val(t.i18n("Icon"));
            var C = r.Style.billboard.image;
            m.addClass("disabled"), l.addClass("disabled")
          }
          e("#layerLabelText").val(T);
          if (Cesium.defined(N)) {
            var k = x(N.red, N.green, N.blue);
            e("#colorPickerMaterial").val(k), e("#colorPickerMaterial").css("background-color", "#" + k)
          } else e("#colorPickerMaterial").val("#FFFFFF"), e("#colorPickerMaterial").css("background-color", "#FFFFFF");
          e("#layerIconName").val(C)
        } else if (s == "FeaturePolygon") {
          var L = r.Style.polygon.outlineColor,
            A = r.Style.polygon.material;
          e("#WidthId").val(r.Style.polygon.outlineWidth), e("#FillOpacityId").val(r.Style.polygon.material.alpha);
          var k = x(A.red, A.green, A.blue);
          e("#colorPickerMaterial").val(k), e("#colorPickerMaterial").css("background-color", "#" + k);
          var O = x(L.red, L.green, L.blue);
          e("#outlineColorPickerMaterial").val(O), e("#outlineColorPickerMaterial").css("background-color", "#" + O)
        } else if (s = "FeaturePolyline") {
          var M = r.Style.polyline.material;
          e("#WidthId").val(r.Style.polyline.width);
          var k = x(M.red, M.green, M.blue);
          e("#colorPickerMaterial").val(k), e("#colorPickerMaterial").css("background-color", "#" + k)
        }
        this._layerItemId = r.guid, this._layerItemId == undefined ? (this._currentItem = this._layersStorage.createLayerItem(), this._currentItem.name = t.i18n("layers_default_name")) : this._currentItem = r, s == "FeaturePoint" && (e("#classificationOptions").on("change", function (n) {
          e("#classificationOptions").val() != t.i18n("edit_layers_label_text") ? e("#layerLabelText").val("[" + e("#classificationOptions").val() + "]") : e("#layerLabelText").val(e("#classificationOptions").val())
        }), this.requestFeaturePointLayerAttributes(r._url, r._subdomains, r._layerName))
      }
    };
    return f.inheritsFrom(s), Cesium.defineProperties(f.prototype, {}), f.prototype.resetClassificationSelectionBox = function () {
      document.getElementById("classificationOptions").options[0].selected = !0
    }, f.prototype.requestFeaturePointLayerAttributes = function (t, n, r) {
      var i = this,
        s = document.getElementById("classificationOptions"),
        o = a(t, n) + "?SERVICE=WFS" + "&VERSION=1.0.0" + "&REQUEST=GetFeature" + "&outputFormat=GML2" + "&typeName=" + r + "&srsName=EPSG:4326";
      e.ajax({
        url: o,
        success: function (t) {
          var n = i._gmlParser.read(t);
          if (n[0] != undefined) {
            var r = n[0].attributes,
              o = 0;
            e.each(r, function (t, n) {
              e("#classificationOptions").append(e("<option/>", {
                value: t,
                text: t
              }));
              var r = e("#layerLabelText").val().replace("[", "").replace("]", "");
              r == t && e(s.options[o + 1]).prop("selected", !0), o++
            })
          }
        },
        error: function (e, t, n) {
          n !== "abort" && console.log("Failed to retrieve data from " + request + " :" + n)
        }
      })
    }, f.prototype.firstStyleLayer = function (r) {
      this._currentItem = r, this._currentType = r.type, this._editMode = !1;
      var i = e("<div style='position:absolute;width:400px; height:300px; padding:10px;'></div>"),
        s = e("<div class='toolDialogLineSeperator' style='height:30px;'><span style='font-size:14px;position:relative;top:5px;left:9.5px;color:Black;'>Display Options</span></div>"),
        o = e("<label class='toolDialogLabel' for='NameId' style=''>" + t.i18n("edit_layer_name") + "<br><input type='text' id='NameId' value=" + r.displayName + " class='toolDialogInputText link' style='border:none;width:100%;'/></label>"),
        u = e("<label id='IconLabelId' class='toolDialogLabel' >" + t.i18n("edit_layer_type") + "</label><br><label class='toolDialogLabel' style='font-size:0.8em;display:inline-block;margin-right:20px;'>" + t.i18n(r.type) + "</label><img id='iconImgID' src=''></img><label class='css-label' style='right:15%;'></label>");
      i.append(o).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(u).append(s);
      var a = e('<label class="toolDialogLabel" id="MaterialLabelId" style="">' + t.i18n("edit_layer_color") + ' </label><input id="colorPickerMaterial" class="jscolor" style="background-color:#FFFFFF;" value="FFFFFF"></input>').css("width", "100%"),
        f = e('<label class="toolDialogLabel" id="FillOpacityLabelId" style="position:relative;top:5px;">' + t.i18n("edit_layer_Opacity") + ' </label><br><input type="text" id="FillOpacityId" class="toolDialogInputText link" value="1" style="width:100%;position:relative;top:5px;"/>'),
        l = e('<label class="toolDialogLabel" id="OulineColorLabelId" style="">' + t.i18n("edit_layer_outline_color") + ' </label><input id="outlineColorPickerMaterial" class="jscolor" style="background-color:#FFFFFF;" value="FFFFFF"></input>').css("width", "100%"),
        c = e("<label class='toolDialogLabel' for='iconOrLabelId' style=''>" + t.i18n("edit_layer_icon_or_label") + "<select class='toolDialogLabel' id='iconOrLabelId' style='float:right; cursor: pointer;'><option value='Icon'>" + t.i18n("Icon") + "</option><option value='Label'>" + t.i18n("Label") + "</option></select></label>"),
        h = e("<label class='toolDialogLabel' for='WidthId' style=''>" + t.i18n("edit_layer_width") + "</label><br><input type='text' id='WidthId' class='toolDialogInputText link' value='1' style='width:100%;'/>"),
        p = e("<label id='IconLabelId' class='toolDialogLabel' >" + t.i18n("edit_layer_Icon") + "</label><br><input type='text' id='layerIconName' value='./img/query.png' class='toolDialogInputText' style='width:100%'/>"),
        d = e("<label id='IconLabelId' class='toolDialogLabel' style='position:relative;top:-5px;' >" + t.i18n("edit_layer_label_text") + "</label><label id='applyClassificationID' class='toolDialogLabel' style='float:right;position:relative;right:38px;'>" + t.i18n("EditLayerTool_Classification_Label") + "</label><br><input type='text' id='layerLabelText' class='toolDialogInputText' value='" + t.i18n("edit_layers_label_text") + "' style='position:relative;top:-4px;width:50%;float:left;'/><select class='toolDialogLabel' id='classificationOptions' style='float:right; width:40%;cursor: pointer;position:relative;top:-3px;'><option selected value='" + t.i18n("edit_layers_label_text") + "'></option></select></select><br/>"),
        v = 0,
        m = 38;
      r.type == "FeaturePolygon" ? (h[0].textContent = t.i18n("edit_layer_lineWidth"), i.append(a).append(f).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(l).append(e("<div class='toolDialogLineSeperator' style='opacity:0;'></div>")).append(h), v = 8 * m, i.css("height", v)) : r.type == "FeatureLine" ? i.append(a).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(h) : r.type == "FeaturePoint" && (i.append(c).append(e("<div class='toolDialogLineSeperator' style=''></div>")), i.append(a).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(d).append(e("<div class='toolDialogLineSeperator' style=''></div>")).append(p), v = 7 * m, i.css("height", v), a.addClass("disabled"), d.addClass("disabled")), n.PositionX = 350, n.PositionY = 100, n.open(t.i18n("Edit_Feature_Layer_Style"), "./img/layers.png", i.get(0), e.proxy(this.onClose, this), !0), e(".toolDialog #CloseButton")[0].textContent = t.i18n("Load"), e(e(".toolDialog #CloseButton")[0]).width("50"), r.type == "FeatureLine" && e(".toolDialog").css("height", "350"), r.type == "FeaturePolygon" && e(".toolDialog").css("height", "460"), r.type == "FeaturePoint" && e(".toolDialog").css("height", "450");
      var g = this;
      e("#iconOrLabelId").on("change", function () {
        e("#iconOrLabelId").val() == t.i18n("Label") ? (p.addClass("disabled"), e("#layerIconName").val(""), e("#layerLabelText").val("label text"), d.hasClass("disabled") && d.removeClass("disabled"), a.hasClass("disabled") && a.removeClass("disabled")) : (e("#layerLabelText").val(""), e("#layerIconName").val("./img/query.png"), a.addClass("disabled"), d.addClass("disabled"), p.hasClass("disabled") && p.removeClass("disabled")), g.resetClassificationSelectionBox()
      });
      var y = this.getIcon(r.type);
      e("#iconImgID").attr("src", y), jscolor.installByClassName("jscolor"), r.type == "FeaturePoint" && (e("#classificationOptions").on("change", function () {
        e("#layerLabelText").val("[" + e("#classificationOptions").val() + "]")
      }), this.requestFeaturePointLayerAttributes(r.url, r.subdomains, r.name))
    }, f.prototype.getIcon = function (e) {
      var t = "./img/dialogs/Feature_layers_points.png";
      return e == "FeaturePolygon" ? t = "./img/dialogs/Feature_layers_polygons.png" : e == "FeatureLine" && (t = "./img/dialogs/Feature_layers_polylines.png"), t
    }, f.prototype.onClose = function (t) {
      if (this._editMode) {
        if (!t) {
          var n = this._currentItem.Style;
          Cesium.defined(n.label) ? e("#layerIconName").val() == "" ? (n.label.fillColor = Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()), n.label.text = e("#layerLabelText").val()) : (delete n.label, n.billboard = {
            image: e("#layerIconName").val()
          }) : Cesium.defined(n.billboard) ? e("#layerIconName").val() != "" ? n.billboard.image = e("#layerIconName").val() : (delete n.billboard, n.label = {
            fillColor: Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()),
            text: e("#layerLabelText").val()
          }) : Cesium.defined(n.polyline) ? (n.polyline.material = Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()), n.polyline.width = Number(e("#WidthId").val())) : Cesium.defined(n.polygon) && (n.polygon.material = Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()), n.polygon.outline = 1, n.polygon.material.alpha = Number(e("#FillOpacityId").val()) >= 0 && Number(e("#FillOpacityId").val()) <= 1 ? Number(e("#FillOpacityId").val()) : 1, n.polygon.outlineColor = Cesium.Color.fromCssColorString("#" + e("#outlineColorPickerMaterial").val()), n.polygon.outlineWidth = Number(e("#WidthId").val())), this._currentItem.refresh();
          var r = this._layersStorage.createLayerItem();
          r.displayName = this._currentItem._layerDisplayName, r.name = this._currentItem._layerName, r.style = this._currentItem.Style, r.level = this._currentItem._level, r.id = this._currentItem._guid, r.url = this._currentItem._url, this._layersStorage.saveItem(this._currentItem), e("#menuIconLayersTool").length > 0 && e("#menuIconLayersTool").click()
        }
      } else {
        if (this._currentType == "FeaturePoint")
          if (e("#layerIconName").val() != "") var i = {
            billboard: {
              image: e("#layerIconName").val(),
              text: e("#layerLabelText").val()
            }
          };
          else var i = {
            label: {
              fillColor: Cesium.defaultValue(Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()), Cesium.Color.Red),
              text: Cesium.defaultValue(e("#layerLabelText").val(), "label")
            }
          };
        else if (this._currentType == "FeatureLine") var i = {
          polyline: {
            material: Cesium.defaultValue(Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()), Cesium.Color.Red),
            width: Cesium.defaultValue(Number(e("#WidthId").val()), 1)
          }
        };
        else if (this._currentType == "FeaturePolygon") {
          var i = {
            polygon: {
              material: Cesium.defaultValue(Cesium.Color.fromCssColorString("#" + e("#colorPickerMaterial").val()), Cesium.Color.Red),
              outline: 1,
              fill: Cesium.defaultValue(Number(e("#FillOpacityId").val()), 1),
              outlineColor: Cesium.defaultValue(Cesium.Color.fromCssColorString("#" + e("#outlineColorPickerMaterial").val()), Cesium.Color.Red),
              outlineWidth: Cesium.defaultValue(Number(e("#WidthId").val()), 1)
            }
          };
          i.polygon.material.alpha = Cesium.defaultValue(Number(e("#FillOpacityId").val()), 1)
        }
        this._currentItem.style = i, setTimeout(function () {
          e("#menuIconLayersTool").length > 0 && e("#menuIconLayersTool").click()
        }, 2e3), TerraExplorer.internal.Project.createFeatureLayers(this._currentItem)
      }
    }, f.prototype.rgbToHsv = function (e) {
      var t = e.r / 255,
        n = e.g / 255,
        r = e.b / 255,
        i = Math.max(t, n, r),
        s = Math.min(t, n, r),
        o, u, a = i,
        f = i - s;
      u = i === 0 ? 0 : f / i;
      if (i == s) o = 0;
      else {
        switch (i) {
          case t:
            o = (n - r) / f + (n < r ? 6 : 0);
            break;
          case n:
            o = (r - t) / f + 2;
            break;
          case r:
            o = (t - n) / f + 4
        }
        o /= 6
      }
      return {
        h: o,
        s: u,
        v: a
      }
    }, f.prototype.hsvToRgb = function (e) {
      var t, n, r, i, s, o, u, a, f = e.h,
        l = e.s,
        c = e.v;
      i = Math.floor(f * 6), s = f * 6 - i, o = c * (1 - l), u = c * (1 - s * l), a = c * (1 - (1 - s) * l);
      switch (i % 6) {
        case 0:
          t = c, n = a, r = o;
          break;
        case 1:
          t = u, n = c, r = o;
          break;
        case 2:
          t = o, n = c, r = a;
          break;
        case 3:
          t = o, n = u, r = c;
          break;
        case 4:
          t = a, n = o, r = c;
          break;
        case 5:
          t = c, n = o, r = u
      }
      return {
        r: t * 255,
        g: n * 255,
        b: r * 255
      }
    }, f.prototype.lerpBetweenNumbers = function (e, t, n) {
      return Math.min(e, t) + (Math.max(e, t) - Math.min(e, t)) * n
    }, f
  }), define("tools/TETools/PresentationTool", ["jquery", "TELang", "internal/Globals", "../MenuEntry", "internal/Units", "../ToolDelegate", "../ToolContainer", "internal/NotificationCenter", "internal/Presentation"], function (e, t, n, r, i, s, o, u, a) {
    "use strict";

    function f() {
      this._currentPresentation = null, this.getId = function () {
        return "PresentationTool"
      }, u.addObserver(this, "onPresentationStatusChanged", "TEN_PRESENTATION_STATUS_CHANGED", null), u.addObserver(this, "onPresentationStep", "TEN_PRESENTATION_STEP", null)
    }
    return f.inheritsFrom(s), Cesium.defineProperties(f.prototype, {}), f.prototype.onOpenedToolContainer = function () {
      e(e(".analyzeToolHeaderContainer")[0]).text("Presentation")
    }, f.prototype.onBeforeOpenToolContainer = function () {
      return this.setCaption(), e("#LowerView #MessageClientId").length > 0 && e("#LowerView #MessageClientId").parent().remove(), this.ToolContainer.addButton(1, "./img/rewind.png"), this.ToolContainer.addButton(2, "./img/pause.png"), this.ToolContainer.addButton(3, "./img/forward.png"), this.ToolContainer.addButton(4, "./img/list.png"), !0
    }, f.prototype.onBeforeCloseToolContainer = function (e) {
      return this.parent.onBeforeCloseToolContainer.call(this, e), this._toolContainer = null, this._currentPresentation.stop(), this._currentPresentation = null, !0
    }, f.prototype.onButtonClick = function (e) {
      this.parent.onButtonClick.call(this, e);
      switch (e) {
        case 1:
          this._currentPresentation.previous();
          break;
        case 2:
          this._currentPresentation.Status == a.PAUSED ? this._currentPresentation.resume() : this._currentPresentation.Status == a.WAITINGCLICK ? this._currentPresentation.continue() : this._currentPresentation.Status == a.PLAYING && this._currentPresentation.pause();
          break;
        case 3:
          this._currentPresentation.next();
          break;
        case 4:
          this._currentPresentation.showKeySteps()
      }
    }, f.prototype.setCaption = function () {}, f.prototype.onPresentationStatusChanged = function (e) {
      if (this._currentPresentation == null || e != this._currentPresentation) {
        if (e.Status == a.NOTPLAYING) return;
        if (o.showWithDelegate(this) == 0) return
      }
      this._currentPresentation = e;
      if (this._toolContainer) switch (this._currentPresentation.Status) {
        case a.PLAYING:
          this._toolContainer.updateButton(2, "./img/pause.png");
          break;
        case a.BEFORE_SWITCHING_TO_ANOTHER_PRESENTATION:
          break;
        case a.NOTPLAYING:
          this._toolContainer.hideAndClearDelegate();
          break;
        case a.PAUSED:
        case a.WAITINGCLICK:
          this._toolContainer.updateButton(2, "./img/play.png")
      }
    }, f.prototype.onPresentationStep = function (e) {
      if (this._toolContainer != null) {
        if (e.StepIndex < 0 || e.StepIndex >= e.Steps.length) return;
        var n = e.StepIndex + 1,
          r = t.i18n("presentation_step") + " " + n + " [" + (e.Steps[e.StepIndex].type == "Wait" ? t.i18n("presentation_wait") : t.i18n("presentation_flyto")) + "]";
        this._toolContainer.setText(r)
      }
    }, f
  }), define("tools/TETools/PresentationStepsTool", ["jquery", "TELang", "tools/ToolDialog", "tools/ListControl", "internal/Presentation", "internal/NotificationCenter", "internal/Navigate", "internal/Globals", "../ToolProtocol"], function (e, t, n, r, i, s, o, u, a) {
    "use strict";
    var f = function () {
      this._currentPresentation = null, this._listControl = null, this.getId = function () {
        return "PresentationStepsTool"
      }, s.addObserver(this, "onPresentationStatusChanged", "TEN_PRESENTATION_STATUS_CHANGED", null), s.addObserver(this, "onPresentationStep", "TEN_PRESENTATION_STEP", null), this.open = function (i) {
        var s = e("<div style='position:absolute; width:400px; height:220px; '></div>"),
          u = e("<div style='position:absolute; overflow-y:auto; width:100%;'></div>");
        s.append(u), this._listControl = new r(u), n.open(t.i18n("title_activity_presentation"), "./img/list.png", s.get(0), e.proxy(this.onClose, this)), u.css({
          height: s.height()
        }), this._listControl.LinePadding = 5, this._currentPresentation = i;
        if (this._currentPresentation) {
          for (var a = 0; a < this._currentPresentation.Steps.length; a++) {
            var f = (a + 1).toString() + ". ";
            if (this._currentPresentation.Steps[a].type == "FlyTo") {
              var l = Cesium.defaultValue(this._currentPresentation.Steps[a].duration, o.DEFAULT_FLY_TO_DURATION);
              f += t.i18n("presentation_Flyto") + " <span style='color:gray;'>(" + l.toFixed(2) + " " + t.i18n("presentation_seconds") + ")</span>"
            } else f += t.i18n("presentation_Wait") + " <span style='color:gray;'>(" + this._currentPresentation.Steps[a].duration.toFixed(2) + " " + t.i18n("presentation_seconds") + ")</span>";
            this._listControl.add({
              presentation: !0,
              onClick: e.proxy(this.onStepClicked, this),
              text: f
            })
          }
          this.onPresentationStep(this._currentPresentation)
        }
      }
    };
    return f.inheritsFrom(a), Cesium.defineProperties(f.prototype, {}), f.prototype.onStepClicked = function (e) {
      var t = e.data;
      this._currentPresentation.pause(), this._currentPresentation.jumpToEndOfPrevStep(t), this._currentPresentation.play(t)
    }, f.prototype.onClose = function () {}, f.prototype.onPresentationStatusChanged = function (e) {
      switch (e.Status) {
        case i.NOTPLAYING:
          n.close()
      }
    }, f.prototype.onPresentationStep = function (e) {
      e.Status != i.NOTPLAYING && this._listControl && (this._listControl.highlightLine(e.StepIndex), this._listControl.ensureLineVisible(e.StepIndex))
    }, f
  }), define("tools/TETools/TwoDModeTool", ["jquery", "../MenuEntry", "internal/Navigate"], function (e, t, n) {
    "use strict";
    var r = function () {
      this.getId = function () {
        return "TwoDMode"
      }, this.getMenuEntry = function () {
        return t.createFor(this, TELang.i18n("Menu_Navigate_TwoDMode"), "./img/newDesign/TwoDMode.png", 10, t.MenuEntryNavigation(), TELang.i18n("NavigationModes_Header"))
      }, this.open = function () {
        TerraExplorer.internal.Navigate.CurrentNavigationMode = 2, TerraExplorer.tools.ToolManager._tools.TwoDNorthMode.close(), viewer.scene.preRender.addEventListener(this.onPreFrame, this)
      }
    };
    return Cesium.defineProperties(r.prototype, {}), r.prototype.onPreFrame = function () {
      viewer.camera.setView({
        orientation: {
          heading: viewer.camera.heading,
          pitch: Cesium.Math.toRadians(-89.9)
        }
      })
    }, r.prototype.close = function () {
      viewer.scene.preRender.removeEventListener(this.onPreFrame, this)
    }, r
  }), define("tools/TETools/TwoDNorthModeTool", ["jquery", "../MenuEntry", "internal/Navigate"], function (e, t, n) {
    "use strict";
    var r = function () {
      this.getId = function () {
        return "TwoDNorthMode"
      }, this.getMenuEntry = function () {
        return t.createFor(this, TELang.i18n("Menu_Navigate_TwoDNorthMode"), "./img/newDesign/TwoDNorthMode.png", 11, t.MenuEntryNavigation(), TELang.i18n("NavigationModes_Header"))
      }, this.open = function () {
        e("#checkImageSubHeaderRotate").length > 0 && (n.stop(), e("#checkImageSubHeaderRotate").remove()), TerraExplorer.internal.Navigate.CurrentNavigationMode = 1, TerraExplorer.tools.ToolManager._tools.TwoDMode.close(), viewer.scene.preRender.addEventListener(this.onPreFrame, this), TerraExplorer.internal.Navigate.NorthOnly = !0
      }
    };
    return Cesium.defineProperties(r.prototype, {}), r.prototype.onPreFrame = function () {
      viewer.camera.setView({
        orientation: {
          pitch: Cesium.Math.toRadians(-89.9)
        }
      })
    }, r.prototype.close = function () {
      viewer.scene.preRender.removeEventListener(this.onPreFrame, this), TerraExplorer.internal.Navigate.NorthOnly = !1
    }, r
  }), define("tools/TETools/ThreeDModeTool", ["jquery", "../MenuEntry", "internal/Navigate"], function (e, t, n) {
    "use strict";
    var r = function () {
      this.getId = function () {
        return "ThreeDMode"
      }, this.getMenuEntry = function () {
        return t.createFor(this, TELang.i18n("Menu_Navigate_ThreeDMode"), "./img/newDesign/ThreeDMode.png", 9, t.MenuEntryNavigation(), TELang.i18n("NavigationModes_Header"))
      }, this.open = function () {
        var t = !1;
        e("#checkImageSubHeaderRotate").length > 0 && (n.stop(), t = !0), TerraExplorer.internal.Navigate.CurrentNavigationMode = 3, TerraExplorer.tools.ToolManager._tools.TwoDNorthMode.close(), TerraExplorer.tools.ToolManager._tools.TwoDMode.close(), t && TerraExplorer.tools.ToolManager._tools.Rotate.open()
      }
    };
    return Cesium.defineProperties(r.prototype, {}), r
  }), define("tools/TETools/SlopeTool", ["jquery", "../MenuEntry"], function (e, t) {
    "use strict";
    var n = function () {
      this.getId = function () {
        return "Slope"
      }, this.getMenuEntry = function () {
        return t.createFor(this, TELang.i18n("Menu_Analyze_Slope"), "./img/newDesign/analyze_slope_map.png", 21, t.MenuEntryAnalyze(), "Terrain Analysis")
      }
    };
    return Cesium.defineProperties(n.prototype, {}), n
  }), define("tools/TETools/AboutTool", ["jquery", "TELang", "tools/ToolDialog", "internal/Globals", "../MenuEntry", "../ToolProtocol"], function (e, t, n, r, i, s) {
    "use strict";
    var o = function () {
      this.getId = function () {
        return "AboutTool"
      }, this.open = function (r) {
        var i = e("<div class='toolDialogLabel' style='position:absolute; width:435px; height:232px; padding:10px;'></div>"),
          s = e("<br><img src='./img/terraexplorer_logo.png' style='width:70%; display:block; margin:auto;'>"),
          o = TerraExplorer.Version.split(".");
        o = t.i18n("about_version") + " " + o[0] + "." + o[1] + "." + o[2] + " (" + o[3] + ")";
        var u = e("<div style='text-align: center;'><span style='margin:0 auto;'>" + o + "</span></div>"),
          a = e("<br><br><span class='mail'style='font-size: 12px;'>" + t.i18n("about_patents") + "<br>" + t.i18n("about_skyline_logo") + "<br>" + t.i18n("about_copyright") + "<br><br>" + t.i18n("about_general_info") + " <a href='mailto:" + t.i18n("about_general_info_email") + "'>" + t.i18n("about_general_info_email") + "</a><br><br>" + t.i18n("about_technical_support") + " <a href='mailto:" + t.i18n("about_technical_support_email") + "'>" + t.i18n("about_technical_support_email") + "</a></span>");
        i.append(s).append(u).append(a), n.open(t.i18n("title_settings_about"), "./img/MenuButton.png", i.get(0), e.proxy(this.onClose, this))
      }
    };
    return o.inheritsFrom(s), Cesium.defineProperties(o.prototype, {}), o.prototype.onClose = function (e) {}, o
  }), define("tools/TETools/RotateTool", ["jquery", "../MenuEntry", "internal/Navigate"], function (e, t, n) {
    "use strict";
    var r = function () {
      this._isOpened = !1, this._isRotating = !1, this._flyAroundParams = {
        pitch: -50,
        distance: 0
      }, this.getId = function () {
        return "Rotate"
      }, this.getMenuEntry = function () {
        return t.createFor(this, TELang.i18n("Menu_Navigate_Rotate"), "./img/newDesign/rotate.png", 10, t.MenuEntryNavigation(), TELang.i18n("NavigationTools_Header"))
      }, this.open = function () {
        if (!this._isOpened) {
          if (TerraExplorer.internal.Navigate.CurrentNavigationMode == 1) {
            var t = e.grep(e(".listControlLineTextSubHeaderSidebar"), function (e) {
              return e.textContent == "2D"
            });
            e(t).click()
          }
          var r = new Cesium.Cartesian2(viewer.canvas.width / 2, viewer.canvas.height / 2),
            i = viewer.scene.screenToWorld(r);
          if (i == undefined || i == null) {
            e("#checkImageSubHeader").length > 0 && e("#checkImageSubHeader").remove();
            return
          }
          var s = new Cesium.Cartographic.fromCartesian(i),
            o = viewer.camera.position,
            u = {};
          Cesium.Cartesian3.subtract(o, i, u);
          var a = Cesium.Cartesian3.magnitude(u);
          viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(i, s.height), {
            duration: .1,
            offset: new Cesium.HeadingPitchRange(viewer.camera.heading, Cesium.Math.toRadians(this._flyAroundParams.pitch), a),
            complete: e.proxy(function () {
              n.flyAround(i)
            }, this)
          }), this._isRotating = !0
        } else n.stop(), e("#checkImageSubHeaderRotate").length > 0 && e("#checkImageSubHeaderRotate").remove(), this._isRotating = !1;
        this._isOpened = !this._isOpened
      }
    };
    return Cesium.defineProperties(r.prototype, {
      IsRotating: {
        get: function () {
          return this._isRotating
        }
      }
    }), r.prototype.close = function () {
      this._isOpened && (e("#checkImageSubHeaderRotate").length > 0 && e("#checkImageSubHeaderRotate").remove(), n.stop(), this._isRotating = !1, this._isOpened = !1)
    }, r
  }), define("tools/ToolManager", ["jquery", "TELang", "./ToolContainer", "./ToolDelegate", "./TETools/DistanceTool", "./TETools/AreaTool", "./TETools/ProfileTool", "./TETools/PlacesTool", "./TETools/LayersTool", "./TETools/UndergroundTool", "./TETools/SettingsTool", "./TETools/QueryTool", "./TETools/ShadowTool", "./TETools/EditFavoriteTool", "./TETools/EditLayersTool", "./TETools/PresentationTool", "./TETools/PresentationStepsTool", "./TETools/TwoDModeTool", "./TETools/TwoDNorthModeTool", "./TETools/ThreeDModeTool", "./TETools/SlopeTool", "./TETools/AboutTool", "./TETools/RotateTool"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S) {
    "use strict";
    var x = null,
      T = function () {
        this._tools = {}, this._toolsRegistered = !1, this.registerTools = function (t) {
          if (this._toolsRegistered) throw {
            type: "TE_EXCEPTION",
            format: "ToolManager is singeltone. Use ToolManager.getInstance() to get instance"
          };
          n.ToolManager = this, this.registerTool(new i), this.registerTool(new s), this.registerTool(new o), this.registerTool(new u), this.registerTool(new a), this.registerTool(new f), this.registerTool(new l), this.registerTool(new c), this.registerTool(new h), this.registerTool(new p), this.registerTool(new d), this.registerTool(new v), this.registerTool(new m), this.registerTool(new S), this.registerTool(new g), this.registerTool(new y), this.registerTool(new b), this.registerTool(new E), t.forEach(e.proxy(function (e) {
            this.registerTool(e)
          }, this))
        }, this.checkToolValidity = function (e) {
          if (e.getId == undefined) throw {
            type: "TE_EXCEPTION",
            format: "Tools must implement getId() method"
          };
          var t = e.getId();
          if (this._tools[t] != null) throw {
            type: "TE_EXCEPTION",
            format: "Tool with id {0} already registered",
            param: t
          };
          return !0
        }, this.registerToolAsSideTool = function (e) {
          this.checkToolValidity(e) && (TerraExplorer.tools.SideBar.AddSideTool(e), this._tools[e.getId()] = e, e.ToolManager = this)
        }, this.registerTool = function (e) {
          this.checkToolValidity(e) && (this._tools[e.getId()] = e, e.ToolManager = this)
        }, this.getMenuEntries = function () {
          var e = new Array;
          for (var t in this._tools) {
            var n = this._tools[t];
            n.getMenuEntry != undefined && e.push(n.getMenuEntry())
          }
          return e
        }
      };
    return T.prototype.getInstance = function () {
      return x
    }, T.prototype.openTool = function (e, t, i, s) {
      var o = this._tools[e];
      o.open != undefined && o.open(t), o instanceof r && n.showWithDelegate(o, function () {
        i != undefined && setTimeout(x.openTool, 1, i, s)
      })
    }, x = new T, x
  }),
  function (e) {
    function t(t, n, r) {
      var i = "rgb" + (e.support.rgba ? "a" : "") + "(" + parseInt(t[0] + r * (n[0] - t[0]), 10) + "," + parseInt(t[1] + r * (n[1] - t[1]), 10) + "," + parseInt(t[2] + r * (n[2] - t[2]), 10);
      return e.support.rgba && (i += "," + (t && n ? parseFloat(t[3] + r * (n[3] - t[3])) : 1)), i + ")"
    }

    function n(e) {
      var t;
      return (t = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(e)) ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), 1] : (t = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(e)) ? [17 * parseInt(t[1], 16), 17 * parseInt(t[2], 16), 17 * parseInt(t[3], 16), 1] : (t = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e)) ? [parseInt(t[1]), parseInt(t[2]), parseInt(t[3]), 1] : (t = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(e)) ? [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10), parseFloat(t[4])] : i[e]
    }
    e.extend(!0, e, {
      support: {
        rgba: function () {
          var t = e("script:first"),
            n = t.css("color"),
            r = !1;
          if (/^rgba/.test(n)) r = !0;
          else try {
            r = n != t.css("color", "rgba(0, 0, 0, 0.5)").css("color"), t.css("color", n)
          } catch (i) {}
          return r
        }()
      }
    });
    var r = "color backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor outlineColor".split(" ");
    e.each(r, function (r, i) {
      e.Tween.propHooks[i] = {
        get: function (t) {
          return e(t.elem).css(i)
        },
        set: function (r) {
          var s = r.elem.style,
            o = n(e(r.elem).css(i)),
            u = n(r.end);
          r.run = function (e) {
            s[i] = t(o, u, e)
          }
        }
      }
    }), e.Tween.propHooks.borderColor = {
      set: function (i) {
        var s = i.elem.style,
          o = [],
          u = r.slice(2, 6);
        e.each(u, function (t, r) {
          o[r] = n(e(i.elem).css(r))
        });
        var a = n(i.end);
        i.run = function (n) {
          e.each(u, function (e, r) {
            s[r] = t(o[r], a, n)
          })
        }
      }
    };
    var i = {
      aqua: [0, 255, 255, 1],
      azure: [240, 255, 255, 1],
      beige: [245, 245, 220, 1],
      black: [0, 0, 0, 1],
      blue: [0, 0, 255, 1],
      brown: [165, 42, 42, 1],
      cyan: [0, 255, 255, 1],
      darkblue: [0, 0, 139, 1],
      darkcyan: [0, 139, 139, 1],
      darkgrey: [169, 169, 169, 1],
      darkgreen: [0, 100, 0, 1],
      darkkhaki: [189, 183, 107, 1],
      darkmagenta: [139, 0, 139, 1],
      darkolivegreen: [85, 107, 47, 1],
      darkorange: [255, 140, 0, 1],
      darkorchid: [153, 50, 204, 1],
      darkred: [139, 0, 0, 1],
      darksalmon: [233, 150, 122, 1],
      darkviolet: [148, 0, 211, 1],
      fuchsia: [255, 0, 255, 1],
      gold: [255, 215, 0, 1],
      green: [0, 128, 0, 1],
      indigo: [75, 0, 130, 1],
      khaki: [240, 230, 140, 1],
      lightblue: [173, 216, 230, 1],
      lightcyan: [224, 255, 255, 1],
      lightgreen: [144, 238, 144, 1],
      lightgrey: [211, 211, 211, 1],
      lightpink: [255, 182, 193, 1],
      lightyellow: [255, 255, 224, 1],
      lime: [0, 255, 0, 1],
      magenta: [255, 0, 255, 1],
      maroon: [128, 0, 0, 1],
      navy: [0, 0, 128, 1],
      olive: [128, 128, 0, 1],
      orange: [255, 165, 0, 1],
      pink: [255, 192, 203, 1],
      purple: [128, 0, 128, 1],
      violet: [128, 0, 128, 1],
      red: [255, 0, 0, 1],
      silver: [192, 192, 192, 1],
      white: [255, 255, 255, 1],
      yellow: [255, 255, 0, 1],
      transparent: [255, 255, 255, 0]
    }
  }(jQuery), define("jquery.animate-colors-min", function () {}), define("tools/MenuButton", ["jquery", "TELang", "./ToolManager", "./MenuEntry", "./ToolContainer", "tools/ToolDialog", "internal/Settings", "./ListControl", "jquery.animate-colors-min"], function (e, t, n, r, i, s, o, u, a) {
    "use strict";
    var f = function () {
        this._visibility = !1, this._image = "./img/newDesign/menu_background.png", this._showAnalysisDistance = !0, this._showAnalysisArea = !0, this._showAnalysisProfile = !0, this._showQueryTool = !0, this._showShadowTool = !0, this._showViewshedTool = !1, this._showSlopeTool = !1, this._showContourMapTool = !1, this._showTwoDModeTool = !0, this._showTwoDNorthModeTool = !0, this._showAnalysisDistnace = !0, this._showThreeDModeTool = !0, this._showRotateTool = !0, this._showLayers = !0, this._showPlaces = !0, this._showUnderground = !0, this._showSettings = !0, this._currentEntry = {
          Text: "Places"
        }, this._thirdLevelGroups = [], this._beforeSettingsEntry = "Places", this._listControl = null, this._rootMenuEntry = null, this._currentMenuEntry = null, this._enabled = !0
      },
      l = this;
    return Cesium.defineProperties(f.prototype, {
      DefaultOpacity: {
        get: function () {
          return 1
        }
      },
      Visibility: {
        get: function () {
          return this._visibility
        },
        set: function (t) {
          if (e("#MenuButtonDiv").length == 0 && t == 1) {
            var r = e("<div class='s8' id='MenuButtonDiv' style='z-index:10000;position:absolute; left:0px; top:0px; width:54px; height:54px; border: none; border-radius: 0px; background-color: rgba(20, 20, 20, 1.0); overflow: hidden;'><img id='MenuButtonImg' src='" + this._image + "' class='link' '/></div>").disableSelection(),
              u = e("<div class='menu' id='MenuDiv' z-index='100' style='display:none; '><img id='BackButtonImg' class='menuLine' src='img/back.png' style='display:none;padding:8px 12px 8px 8px; border-right: 1px solid rgba(255, 255, 255, 0.2); float:left' /><div id='MenuHeaderDiv' style='margin:10px 8px 8px 8px; text-align: center;'>Menu</div><div style='border-top: 2px solid #ffffff;clear:both;'></div><table id='MenuTable' width ='100%' class='menuTable' cellpadding='0px' cellspacing=0px' style='position:relative;left:10px;'></table></div>").disableSelection(),
              a = e("<img id='MenuBottomBorderImg' src='img/menuButtomBorder.png' z-index='100' style='position:absolute; display:none ' />").disableSelection();
            e("#mainContainer").append(r), r.css({
              opacity: this.DefaultOpacity
            }), r.on("dragstart", function (e) {
              e.preventDefault()
            });
            var f = !1;
            r.click(e.proxy(function () {
              if (!this._enabled || f) {
                f && (f = !1);
                return
              }
              var t = e("#MenuDiv").is(":visible");
              t ? this.closeMenu() : this.showMenu()
            }, this));
            var l = e.proxy(this.closeMenu, this),
              c = this,
              h;
            r.on("mousedown", function () {
              f = !1, h = setTimeout(function () {
                f = !0;
                var e = Cesium.defaultValue(o.longPressToolId, "PlacesTool");
                n.openTool(e), l()
              }, 500)
            }).on("mouseup mouseleave", function () {
              clearTimeout(h)
            }), r.on("click", function () {
              TerraExplorer.tools.SideBar.Show()
            }), r.on("touchstart", function () {
              TerraExplorer.tools.SideBar.Show()
            }), e("#BackButtonImg").click(e.proxy(function () {
              this.CurrentMenuEntry = this.RootMenuEntry
            }, this));
            var p = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
            p.setInputAction(l, Cesium.ScreenSpaceEventType.LEFT_DOWN), p.setInputAction(l, Cesium.ScreenSpaceEventType.MIDDLE_DOWN), p.setInputAction(l, Cesium.ScreenSpaceEventType.RIGHT_DOWN), i.MainButton = this, s.MainButton = this
          }
          e("#MenuButtonDiv").length != 0 && (t ? e("#MenuButtonDiv").show() : e("#MenuButtonDiv").hide()), this._visibility = t
        }
      },
      DivId: {
        get: function () {
          return "MenuButtonDiv"
        }
      },
      Image: {
        get: function () {
          return this._image
        },
        set: function (t) {
          this._image = t, e("#MenuButtonImg").attr("src", "./img/newDesign/menu_background.png"), e("#MenuButtonImg").css("padding", "0")
        }
      },
      ShowShadowTool: {
        get: function () {
          return this._showShadowTool
        },
        set: function (e) {
          this._showShadowTool = e
        }
      },
      ShowSlopeTool: {
        get: function () {
          return this._showSlopeTool
        },
        set: function (e) {
          this._showSlopeTool = e
        }
      },
      ShowViewshedTool: {
        get: function () {
          return this._showViewshedTool
        },
        set: function (e) {
          this._showViewshedTool = e
        }
      },
      ShowContourMapTool: {
        get: function () {
          return this._showContourMapTool
        },
        set: function (e) {
          this._showContourMapTool = e
        }
      },
      ShowTwoDModeTool: {
        get: function () {
          return this._showTwoDModeTool
        },
        set: function (e) {
          this._showTwoDModeTool = e
        }
      },
      ShowThreeDModeTool: {
        get: function () {
          return this._showThreeDModeTool
        },
        set: function (e) {
          this._showThreeDModeTool = e
        }
      },
      ShowTwoDNorthModeTool: {
        get: function () {
          return this._showTwoDNorthModeTool
        },
        set: function (e) {
          this._showTwoDNorthModeTool = e
        }
      },
      ShowRotateTool: {
        get: function () {
          return this._showRotateTool
        },
        set: function (e) {
          this._showRotateTool = e
        }
      },
      ShowQueryTool: {
        get: function () {
          return this._showQueryTool
        },
        set: function (e) {
          this._showQueryTool = e
        }
      },
      ShowAnalysisDistance: {
        get: function () {
          return this._showAnalysisDistnace
        },
        set: function (e) {
          this._showAnalysisDistnace = e
        }
      },
      ShowAnalysisArea: {
        get: function () {
          return this._showAnalysisArea
        },
        set: function (e) {
          this._showAnalysisArea = e
        }
      },
      ShowAnalysisProfile: {
        get: function () {
          return this._showAnalysisProfile
        },
        set: function (e) {
          this._showAnalysisProfile = e
        }
      },
      ShowLayers: {
        get: function () {
          return this._showLayers
        },
        set: function (e) {
          this._showLayers = e
        }
      },
      ShowPlaces: {
        get: function () {
          return this._showPlaces
        },
        set: function (e) {
          this._showPlaces = e
        }
      },
      ShowUnderground: {
        get: function () {
          return this._showUnderground
        },
        set: function (e) {
          this._showUnderground = e
        }
      },
      ShowSettings: {
        get: function () {
          return this._showSettings
        },
        set: function (e) {
          this._showSettings = e
        }
      },
      RootMenuEntry: {
        get: function () {
          return this._rootMenuEntry
        },
        set: function (e) {
          this._rootMenuEntry = e, this._currentMenuEntry = e
        }
      },
      CurrentMenuEntry: {
        get: function () {
          return this._currentMenuEntry
        },
        set: function (t) {
          this._currentMenuEntry = t;
          if (this._currentMenuEntry == null) return;
          e("#MenuHeaderDiv").text(t.Text), this._rootMenuEntry == t ? e("#BackButtonImg").hide() : e("#BackButtonImg").show(), this.rebuildTable(t.ChildEntries)
        }
      },
      Enable: {
        get: function () {
          return this._enabled
        },
        set: function (t) {
          var n = e("#MenuButtonDiv");
          t ? n.css({
            opacity: this.DefaultOpacity
          }) : n.css({
            opacity: .2
          }), this._enabled = t
        }
      }
    }), f.prototype.flash = function (t) {
      t == undefined && (t = 5e3);
      var n = setInterval(function () {
        e("#MenuButtonDiv").css("border") == "2px solid rgb(255, 255, 255)" ? e("#MenuButtonDiv").css({
          border: "2px solid rgb(144, 215, 237)"
        }) : e("#MenuButtonDiv").css({
          border: "2px solid rgb(255, 255, 255)"
        })
      }, 300);
      setTimeout(function () {
        clearInterval(n), e("#MenuButtonDiv").css({
          border: "2px solid rgb(255, 255, 255)"
        })
      }, t)
    }, f.prototype.onMainMenuShow = function () {
      i.setEnable(!1)
    }, f.prototype.onMainMenuHide = function () {
      i.setEnable(!0)
    }, f.prototype.showMenu = function () {
      this.onMainMenuShow();
      var e = this.buildMenuFromEntries(n.getMenuEntries());
      if (e.ChildEntries.length == 0) return;
      this.RootMenuEntry = e, this.CurrentMenuEntry = e, TerraExplorer.tools.SideBar.Show()
    }, f.prototype.closeMenu = function () {
      e("#MenuDiv").hide(), e("#MenuBottomBorderImg").hide(), this.onMainMenuHide()
    }, f.prototype.AddSubMenu = function (n) {
      var r = "aaa";
      n.Text == t.i18n("Menu_Analyze") && (n._toolId = "AnalyzeTool"), n.Text == t.i18n("Menu_Navigation") && (n._toolId = "Menu_Navigation");
      if (n.subEntry == undefined) {
        var i = e("<img id='menuIcon" + n._toolId + "' src='" + n.Icon + "'  style='cursor:pointer;padding:5px;margin-left:3px;margin-right:3px; '/>");
        i.click(e.proxy(function () {
          e("#menuIconSettingsTool").IsSelected = !1, e("#menuIconSettingsTool").css({
            width: "14px",
            height: "14px",
            margin: "0px",
            "background-color": "#2b2b2b"
          }), e("#MenuTable img").each(function (t, n) {
            n.IsSelected = !1, e(n).css("background-color", "#141414")
          }), i.css("background-color", "#0DC2DF"), i.prop("IsSelected", !0), this.menuEntryClicked(n)
        }, this)), n.ChildEntries.length == 0 && i.find("#BulletImgId").css("visibility", "hidden"), i.entry = n, n._toolId == "SettingsTool" ? (e("#headerDiv").append(i), i.css({
          position: "absolute",
          left: "0px",
          padding: "3px 7px 3px 7px",
          "background-color": "#2b2b2b",
          "margin-top": "0px",
          height: "14px",
          width: "14px",
          cursor: "pointer"
        })) : e("#MenuTable")[0].appendChild(i[0])
      } else {
        var s = this;
        this._listControl.add({
          img: n.Icon,
          text: n.Text,
          header: !0,
          subHeader: !0,
          onClick: function () {
            e("#headerDivContainer #CloseImg").length > 0 && e("#headerDivContainer #CloseImg").click(), s.menuEntryClicked(n)
          }
        })
      }
    }, f.prototype.buildMenuFromEntries = function (e) {
      var n = {},
        i = new r;
      i.Text = t.i18n("Menu_Menu"), n[i.Text] = i;
      for (var s in e) {
        var o = e[s],
          u = o.Parent;
        u == "" && (u = i.Text);
        var a = n[u];
        if (a == undefined) {
          a = new r;
          var f = u.split("|");
          a.Text = f[0], f.length > 1 && (a.Icon = f[1]), f.length > 2 && (a.Order = parseInt(f[2])), f.length > 3 && (a.Level3Group = f[3]), this.canAddMenu(a) && this.canAddMenu(o) && (n[u] = a, i.addChildEntryOrdered(a))
        }
        this.canAddMenu(o) && a.addChildEntryOrdered(o)
      }
      return i
    }, f.prototype.canAddMenu = function (e) {
      return e.ToolId == "DistanceTool" && !this.ShowAnalysisDistance ? !1 : e.ToolId == "AreaTool" && !this.ShowAnalysisArea ? !1 : e.ToolId == "ProfileTool" && !this.ShowAnalysisProfile ? !1 : e.ToolId == "PlacesTool" && !this.ShowPlaces ? !1 : e.ToolId == "UndergroundTool" && !this.ShowUnderground ? !1 : e.ToolId == "LayersTool" && !this.ShowLayers ? !1 : e.ToolId == "SettingsTool" && !this.ShowSettings ? !1 : e.ToolId == "QueryTool" && !this.ShowQueryTool ? !1 : e.ToolId == "ShadowTool" && !this.ShowShadowTool ? !1 : e.ToolId == "ContourMapTool" && !this.ShowContourMapTool ? !1 : e.ToolId == "TwoDModeTool" && !this.ShowTwoDModeTool ? !1 : e.ToolId == "ThreeDModeTool" && !this.ShowThreeDModeTool ? !1 : e.ToolId == "TwoDNorthModeTool" && !this.ShowTwoDModeTool ? !1 : e.ToolId == "RotateTool" && !this.ShowRotateTool ? !1 : e.ToolId == "SlopeTool" && !this.ShowSlopeTool ? !1 : e.ToolId == "ViewshedTool" && !this.ShowViewshedTool ? !1 : !0
    }, f.prototype.CreateSubMenuEntryList = function (n) {
      function r(t) {
        return e("#checkImageSubHeader" + t).length > 0 ? !0 : !1
      }
      if (Object.keys(this._thirdLevelGroups).length == 0) e(n).each(e.proxy(function (e, t) {
        this.AddSubMenu(t)
      }), this);
      else {
        var i = this;
        e.each(Object.keys(this._thirdLevelGroups), function (s, o) {
          var u = o;
          if (u != "undefined") {
            var a = e.grep(n, function (e) {
              return e.Group == u
            });
            o != "" && i._listControl.add({
              text: o,
              header: !0
            }), e(a).each(function (n, s) {
              i._listControl.add({
                text: s.Text,
                img: s.Icon,
                header: !0,
                subHeader: !0,
                onClick: function (n) {
                  var o = n.target;
                  n.target instanceof HTMLImageElement && (n.stopPropagation(), o = n.target.parentElement), o.textContent != t.i18n("Menu_Underground") && o.textContent != t.i18n("Menu_Navigate_Rotate") && (e("#headerDivContainer #CloseImg").length > 0 && e("#headerDivContainer #CloseImg").click(), e("#checkImageSubHeader").length > 0 && e("#checkImageSubHeader").remove());
                  var u = "checkImageSubHeader";
                  o.textContent == t.i18n("Menu_Underground") || o.textContent == t.i18n("Menu_Navigate_Rotate") ? (u += o.textContent, r(o.textContent) || e(o).after('<img id="' + u + '" src="./img/newDesign/v-check_on.png" style="position:absolute;left:240px;"/>')) : e(o).after('<img id="' + u + '" src="./img/newDesign/v-check_on.png" style="position:absolute;left:240px;"/>'), i.menuEntryClicked(s)
                }
              })
            })
          }
        })
      }
    }, f.prototype.addGroupFromEntry = function (e) {
      var t = e.Group;
      this._thirdLevelGroups[t] == undefined && (this._thirdLevelGroups[t] = !0)
    }, f.prototype.rebuildTable = function (t) {
      if (t.length == 0) return;
      e("#sidebarContentDiv").empty();
      if (t[0].Parent == "") e("#MenuTable").empty(), t.forEach(e.proxy(function (e) {
        this.AddSubMenu(e)
      }, this));
      else {
        var n = e("<div style='position:absolute;overflow:hidden; width:100%; height:300px;'></div>"),
          r = e("<div id='MessageClientId' style='position:absolute; overflow-y:auto; width:100%;'></div>");
        e("#sidebarContentDiv").append(r), r.css({
          height: e("#sidebarContentDiv").height()
        }), this._listControl = new u(r);
        var i = this;
        Object.keys(this._thirdLevelGroups).forEach(function (e) {
          delete i._thirdLevelGroups[e]
        }), t.forEach(e.proxy(function (e) {
          e.subEntry = !0, this.addGroupFromEntry(e)
        }, this)), this.CreateSubMenuEntryList(t)
      }
      e(".menuInternalLine").last().css("border-bottom", "0px");
      var s = e("#MenuButtonDiv").position();
      e("#MenuDiv").css({
        bottom: 30 + e("#MenuButtonDiv").outerHeight(),
        left: s.left
      })
    }, f.prototype.menuEntryClicked = function (n) {
      n._toolId != "SettingsTool" && (this._beforeSettingsEntry = n), this._currentEntry._toolId == "SettingsTool" && n._toolId != this._currentEntry._toolId && TerraExplorer.tools.ToolManager._tools.SettingsTool.onClose();
      if (this._currentEntry._toolId == "SettingsTool" && n._toolId == this._currentEntry._toolId) {
        if (this._beforeSettingsEntry.Text == t.i18n("Menu_Time")) {
          var r = e.grep(e("#MenuTable img"), function (e) {
            return e.id == "menuIconShadowTool"
          });
          e(r).click()
        } else e("#menuIcon" + this._beforeSettingsEntry._toolId).click();
        return
      }
      this._currentEntry = n, e("#headerDivContainer #CloseImg").length > 0 && e("#headerDivContainer #CloseImg").click(), n.ChildEntries.length > 0 ? this.CurrentMenuEntry = n : (this.closeMenu(), this.onMenuAction(n)), navigator.appVersion.indexOf("Chrome/") != -1 && e(".listControlLineTextHeaderSidebar").each(function (t, n) {
        e(n).css("margin-top", "25px")
      });
      if (this._currentEntry.Text == t.i18n("Menu_Navigation")) {
        var i = e(".listControlLineTextSubHeaderSidebar");
        if (TerraExplorer.tools.ToolManager._tools.Rotate.IsRotating) {
          var s = e.grep(i, function (e) {
            return e.textContent == t.i18n("Menu_Navigate_Rotate")
          });
          e(s).after('<img id="checkImageSubHeaderRotate" src="./img/newDesign/v-check_on.png" style="position:absolute;left:240px;"/>')
        }
        if (TerraExplorer.tools.ToolManager._tools.UndergroundTool.IsUnderground) {
          var o = e.grep(i, function (e) {
            return e.textContent == t.i18n("Menu_Underground")
          });
          e(o).after('<img id="checkImageSubHeaderUnderground" src="./img/newDesign/v-check_on.png" style="position:absolute;left:240px;"/>')
        }
        var u = TerraExplorer.internal.Navigate.CurrentNavigationMode,
          a = e.grep(i, function (e) {
            var t = "3D";
            switch (u) {
              case 1:
                t = "2D North";
                break;
              case 2:
                t = "2D";
                break;
              case 3:
              default:
                t = "3D"
            }
            return e.textContent == t
          });
        a != undefined && e(a).next().length == 0 && e(a).after('<img id="checkImageSubHeader" src="./img/newDesign/v-check_on.png" style="position:absolute;left:240px;"/>')
      }
    }, f.prototype.onMenuAction = function (e) {
      if (e.ChildEntries.length > 0) return;
      n.openTool(e.ToolId, e.Param), s.IsOpen && i.setEnable(!1)
    }, f.prototype.onToolDialogClosed = function () {
      i.getEnable() == 0 && i.setEnable(!0)
    }, new f
  }), define("tools/ContextMenu", ["jquery", "TELang", "./TETools/PlacesTool"], function (e, t, n) {
    "use strict";
    var r = 0,
      i = function (e, t) {
        this.id = ++r, this.text = e, this.command = t, this.active = !0
      },
      s = function () {
        this._menu = {
          name: "default",
          target: null,
          items: []
        }
      };
    Cesium.defineProperties(s.prototype, {}), s.prototype.init = function () {
      var t = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      t.setInputAction(e.proxy(this.openMenu, this), Cesium.ScreenSpaceEventType.RIGHT_CLICK), t.setInputAction(function () {
        e(".contextMenu").hide()
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
    };
    var o = !1;
    return s.prototype.openMenu = function (t) {
      if (this._menu.items.length <= 0) return;
      var n = this.buildMenu(e(viewer.container).get(0), t.position.clone()),
        r = e(window).width(),
        i = e(window).height();
      t.position.x + n.outerWidth() > r ? n.css("left", r - n.outerWidth()) : n.css("left", t.position.x), t.position.y + n.outerHeight() > i ? n.css("top", i - n.outerHeight()) : n.css("top", t.position.y), n.show()
    }, s.prototype.buildMenu = function (t, n) {
      if (e("#" + this._menu.name).length) {
        var r = e("#" + this._menu.name);
        return r.hide(), r.get(0).screenPoint = n, r
      }
      var r = document.createElement("div");
      r.className = "contextMenu", r.target = t, r.id = this._menu.name, r.screenPoint = n;
      for (var i = 0; i < this._menu.items.length; i++) {
        var s = document.createElement("div");
        this._menu.items[i].active ? s.className = "contextMenuOption active" : s.className = "contextMenuOption inactive", s.innerHTML = this._menu.items[i].text;
        var o = this._menu.items[i].command;
        s.onclick = function () {
          o(r.screenPoint)
        }, r.appendChild(s)
      }
      return e("body").append(r), e(r)
    }, s.prototype.addItem = function (e, t) {
      var n = new i(e, t);
      return this._menu.items.push(n), n.id
    }, new s
  }), define("tools/MessageView", ["jquery", "TELang", "internal/InputMode", "internal/Navigate"], function (e, t, n, r) {
    "use strict";

    function s() {
      return e(viewer.scene.canvas).height() / 5
    }
    var i = null,
      o = function () {};
    return Cesium.defineProperties(o.prototype, {
      IsOpen: {
        get: function () {
          return e("#MessageDivId").is(":visible")
        }
      }
    }), o.prototype.init = function () {
      this._eventListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas), this._eventListener.setInputAction(e.proxy(this.onLeftClick, this), Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }, o.prototype.onLeftClick = function (e) {
      if (r.IsMultiGestureNavigation) return;
      if (n.Mode != n.FREE_FLIGHT) return;
      var t = this.IsOpen,
        i = {},
        s = viewer.scene.screenToWorld(e.position, i);
      Cesium.defined(s) && Cesium.defined(i.id) && (t = !this.showMessage(i.id)), t && this.hideMessage()
    }, o.prototype.showMessage = function (n) {
      var r = TerraExplorer.internal.Project.findObjectFromID(n);
      if (this.hasMessage(r) == 0) return !1;
      if (e("#MessageDivId").length == 0) {
        var i = e("<div id='MessageDivId' class='messageView' style=''><div style='width:100%; height:8px; background-color:rgba(60,60,60,1.0);'></div><div id='MessageClientId' style='overflow:auto; word-wrap: break-word;'></div></div>");
        e("#mainContainer").append(i)
      }
      e("#MessageClientId").empty();
      if (this.hasAttributeMessage(r)) {
        if (r.feature.attributes != undefined) {
          var o = "<table class='messageViewTable' style=''>";
          o += "<tr><th width='30%'>" + t.i18n("messageView_attr_name") + "</th><th>" + t.i18n("messageView_attr_value") + "</th></tr>";
          for (var u in r.feature.attributes) o += "<tr><td>" + u + "</td><td>" + r.feature.attributes[u] + "</td></tr>";
          o += "</table>", e("#MessageClientId").append(e(o)), e("#MessageClientId").css({
            height: s(),
            padding: 0
          })
        }
      } else this.hasFavoriteMessage(r) && (e("#MessageClientId").text(r.favoriteItem.desc), e("#MessageClientId").css({
        padding: 10
      }));
      if (!this.IsOpen) {
        var a = e(viewer.scene.canvas);
        e("#MessageDivId").css({
          width: "100%",
          height: s(),
          top: a.height() + 1,
          "z-index": 500
        }), e("#MessageDivId").show(), e("#MessageDivId").animate({
          top: a.height() - s()
        }, 250)
      }
      return !0
    }, o.prototype.hideMessage = function () {
      e("#MessageDivId").animate({
        top: e(viewer.scene.canvas).height() + 1
      }, 150, function () {
        e("#MessageDivId").hide()
      })
    }, o.prototype.hasMessage = function (e) {
      return e == undefined ? !1 : this.hasFavoriteMessage(e) ? !0 : this.hasAttributeMessage(e) ? !0 : !1
    }, o.prototype.hasAttributeMessage = function (e) {
      return !1
    }, o.prototype.hasFavoriteMessage = function (e) {
      return e == undefined ? !1 : e.favoriteItem && e.favoriteItem.desc != "" ? !0 : !1
    }, i = new o, i
  }), define("tools/SideBar", ["jquery", "./MenuEntry", "./ListControl", "./ToolDialog"], function (e, t, n, r) {
    "use strict";
    var i = function () {
        this._width = 270, this._hasSearchTool = !0, this._hasMenu = !0, this._isShown = !0, this._firstTime = !0, this._sideTools = [], this._currentTool = null, this._firstTimeNoAnimation = !0, this._startingXPosition = undefined, this._startingYPosition = undefined, this._menuButtonsDivHeight = 5, this._sideBarContentDivHeight = 94 - this._menuButtonsDivHeight
      },
      s = this;
    return Cesium.defineProperties(i.prototype, {
      IsShown: {
        get: function () {
          return this._isShown
        }
      },
      Width: {
        get: function () {
          return this._width
        }
      },
      Visibility: {
        set: function (t) {
          if (t == 1) {
            var n = e("<div class='' id='sideBar' style='float:left; top:0; opacity: 1; width:" + this._width + "px; height:100%;'></div>"),
              r = e('<div id="placesContainer" class="sideBar" style="display:table; left: -2px;"></div>'),
              i = e('<div id="headerDiv" class="headerDivSidebar" style="width:100%;"></div>'),
              s = e('<div id="searchBox" style="width=100%; background-color:#141414;height:30px;z-index:10000"></div>'),
              o = e("<div id='menuButtons' style='width=100%; background-color:#141414;margin-top:20px;'><table id='MenuTable' width ='100%' class='menuTable' cellpadding='0px' cellspacing=0px' style=''></table></div>"),
              u = e('<div id="sidebarContentDiv" class="narrowScrollbar" style=" width:100%; height:' + this._sideBarContentDivHeight + '%; background-color:#141414; overflow-y:hidden;z-index:1;"></div>'),
              a = e("<img id='closeXID' class='link' src='./img/newDesign/x_close_caption.png' width='12px' height='12px' style='position:absolute; padding:5px; right:0px;'></img>");
            i.append(a), r.append(i).append(s).append(o).append(u), n.append(r), n.width(this._width), e("body").prepend(n), e("#sideBar").hide()
          }
        }
      }
    }), i.prototype.toggleSideBar = function () {
      e("#sideBar").width() == 0 ? this.Show() : this.Hide()
    }, i.prototype.AddSideTool = function (e) {
      this._sideTools[e.getId()] = !0
    }, e("#menuIconSettingsTool").click(function () {
      e("#CloseImg").length > 0 && e("#CloseImg").click(), e("#sidebarContentDiv").empty(), TerraExplorer.tools.ToolManager._tools.SettingsTool.open(), e("#toolDialogTitleID").remove(), e("#ContainerRootDiv").length > 0 && e("#ContainerRootDiv").hide()
    }), i.prototype.Show = function () {
      function i(t) {
        e(t).hover(function () {
          e(this).css("background-color", "#0DC2DF")
        }, function () {
          this.IsSelected || e(this).css("background-color", "#141414")
        })
      }
      e("#sideBar").show();
      var t = TerraExplorer.tools.ToolManager.getMenuEntries();
      if (t.length == 0) return;
      var n = this._width,
        r = e("body").height();
      this._firstTimeNoAnimation ? (e("#sideBar").width(this._width), this._firstTimeNoAnimation = !1) : e({
        width: 0
      }).animate({
        width: n
      }, {
        queue: !1,
        step: function () {
          e("#sideBar").width(this.width), e("#placesContainer").css({
            left: this.width - n - 2
          })
        },
        duration: 250,
        complete: function () {
          e("#sideBar").width(n), e("#placesContainer").css({
            left: -2
          })
        }
      }), this._isShown = !0, e("#closeXID").click(function () {
        TerraExplorer.tools.SideBar.toggleSideBar()
      }), e("#MenuButtonDiv").hide(), this._firstTime && e("#MenuTable img").each(function (e, t) {
        i(t)
      });
      var s = !!navigator.userAgent.match(/firefox/i),
        o = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        u = TerraExplorer.browser.isIE;
      (s || o) && e("#searchIcon").css("padding", "0px 0px 0px 3px"), u && e("#searchIcon").css("padding", "2px"), e("#menuIconPlacesTool").click();
      var a = this;
      e("#sideBar").on("touchstart", function (e) {
        var t = e.originalEvent.targetTouches;
        t.length == 1 && (a._startingXPosition = t[0].clientX, a._startingYPosition = t[0].clientY)
      }), e("#sideBar").on("touchmove", function (e) {
        var t = e.originalEvent.changedTouches;
        if (t.length == 1) {
          var n = t[0].clientX,
            r = t[0].clientY,
            i = n - a._startingXPosition,
            s = Math.abs(r - a._startingYPosition);
          i < -1 * a._width / 3 && s < 50 && a.Hide()
        }
      })
    }, i.prototype.Hide = function () {
      e("#ContainerRootDiv").length > 0 && (e("#ContainerRootDiv").hide(), e("#CloseImg").click());
      var t = this._width,
        n = 1e3;
      e({
        width: t
      }).animate({
        width: 0
      }, {
        queue: !1,
        step: function () {
          e("#sideBar").width(this.width), e("#placesContainer").css({
            left: this.width - t - 2
          })
        },
        duration: 250,
        complete: function () {
          e("#sideBar").width(0), e("#placesContainer").css({
            left: -t - 2
          }), e("#MenuButtonDiv").show()
        }
      }), this._isShown = !1, e("#sideBar").off("touchstart").off("touchmove")
    }, i.prototype.ChangeStyleForSideTools = function (t) {
      e(t).each(function (t, n) {
        var r = e(n).attr("class");
        r != undefined && r.indexOf("listControl") != -1 && (r += "Sidebar", e(n).attr("class", r))
      })
    }, i.prototype.AddSearchTool = function () {}, i.prototype.AddMenuItem = function () {}, new i
  }), define("tools/tools", ["./ToolManager", "./MenuButton", "./MenuEntry", "./ContextMenu", "./MessageView", "./ToolContainer", "./DisplayItem", "./DisplayGroupItem", "./ToolDialog", "./ToolDelegate", "./SideBar"], function (e, t, n, r, i, s, o, u, a, f, l) {
    "use strict";
    var c = {
      init: function () {}
    };
    return c.ToolManager = e, c.MenuButton = t, c.MenuEntry = n, c.ContextMenu = r, c.MessageView = i, c.ToolContainer = s, c.DisplayItem = o, c.DisplayGroupItem = u, c.ToolDialog = a, c.ToolDelegate = f, c.SideBar = l, c
  }), define("internal/DebugInfo", ["jquery"], function (e) {
    "use strict";
    var t = function () {
      this._visibility = !1, this._frameRateMonitor, this._optimizeTerrainPerformance = !0
    };
    return Cesium.defineProperties(t.prototype, {
      Visibility: {
        get: function () {
          return this._visibility
        },
        set: function (t) {
          if (e("#DebugInfoDiv").length == 0 && t == 1) {
            var n = e("<div class='s7' id='DebugInfoDiv' style='position:absolute; right:10px; top:10px; width:200; height:60px; background: rgba(0, 0, 0, 0.7);'>                                            <div style='padding: 4px;'>                                                <span id='FrameRateDiv'>FPS: 0</span><br>                                                <span id='YawDiv'>1235</span><br>                                                <span id='PitchDiv'>1235</span>                                            </div>                                          </div>");
            n.disableSelection(), e("body").append(n), e("#DebugInfoDiv").on("dragstart", function (e) {
              e.preventDefault()
            }), this._frameRateMonitor = Cesium.FrameRateMonitor.fromScene(viewer.scene), viewer.clock.onTick.addEventListener(e.proxy(function (t) {
              if (viewer.scene.mode == Cesium.SceneMode.MORPHING) return;
              this._frameRateMonitor.lastFramesPerSecond != undefined && e("#FrameRateDiv").text("FPS: " + this._frameRateMonitor.lastFramesPerSecond.toFixed(0)), e("#YawDiv").text("Yaw: " + Cesium.Math.toDegrees(viewer.camera.heading).toFixed(1)), e("#PitchDiv").text("Pitch: " + Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(1))
            }, this))
          }
          this._visibility = t
        }
      },
      optimizeTerrainPerformance: {
        get: function () {
          return this._optimizeTerrainPerformance
        },
        set: function (e) {
          this._optimizeTerrainPerformance = e, e ? (viewer.loadQueueTimeSliceWhileMoving = 1, viewer.original_dp = undefined) : (viewer.loadQueueTimeSliceWhileMoving = 5, viewer.original_dp = !0)
        }
      }
    }), new t
  }), define("wfs/GmlParser", [], function () {
    "use strict";

    function e(e, t, n, r) {
      this._extractAttributes = e, this._featureName = t || "featureMember", this._xy = r, this._gmlns = n || "http://www.opengis.net/gml", this._regExes = {
        trimSpace: /^\s*|\s*$/g,
        removeSpace: /\s*/g,
        splitSpace: /\s+/,
        trimComma: /\s*,\s*/g
      }
    }
    return Object.defineProperties(e.prototype, {
      featureName: {
        get: function () {
          return this._featureName
        },
        set: function (e) {
          this._featureName = e
        }
      },
      extractAttributes: {
        get: function () {
          return this._extractAttributes
        },
        set: function (e) {
          this._extractAttributes = e
        }
      },
      xy: {
        get: function () {
          return this._xy
        }
      }
    }), e.prototype.getElementsByTagNameNS = function (e, t, n) {
      var r = [];
      if (e.getElementsByTagNameNS) r = e.getElementsByTagNameNS(t, n);
      else {
        var i = e.getElementsByTagName("*"),
          s, o;
        for (var u = 0, a = i.length; u < a; ++u) s = i[u], o = s.prefix ? s.prefix + ":" + n : n, (n == "*" || o == s.nodeName) && (t == "*" || t == s.namespaceURI) && r.push(s)
      }
      return r
    }, e.prototype.read = function (e) {
      var t = this.getElementsByTagNameNS(e.documentElement, this._gmlns, this.featureName),
        n = [];
      for (var r = 0; r < t.length; r++) {
        var i = this.parseFeature(t[r]);
        i && n.push(i)
      }
      return n
    }, e.prototype.parseFeature = function (e) {
      var t = ["MultiPolygon", "Polygon", "MultiLineString", "LineString", "MultiPoint", "Point", "Envelope"],
        n, r, i, s;
      for (var o = 0; o < t.length; ++o) {
        n = t[o], r = this.getElementsByTagNameNS(e, this._gmlns, n);
        if (r.length > 0) {
          s = this.parseGeometry[n.toLowerCase()], s ? i = s.apply(this, [r[0]]) : console.log("unsupportedGeometryType:" + n);
          break
        }
      }
      var u, a = this.getElementsByTagNameNS(e, this._gmlns, "Box");
      for (o = 0; o < a.length; ++o) {
        var f = a[o],
          l = this.parseGeometry.box.apply(this, [f]),
          c = f.parentNode,
          h = c.localName || c.nodeName.split(":").pop();
        h === "boundedBy" ? u = l : i = l.toGeometry()
      }
      var p;
      this.extractAttributes && (p = this.parseAttributes(e));
      var d = {
        geometryType: n.toLowerCase(),
        positions: i,
        attributes: p
      };
      d.bounds = u;
      var v = e.firstChild,
        m;
      while (v) {
        if (v.nodeType == 1) {
          m = v.getAttribute("fid") || v.getAttribute("id");
          if (m) break
        }
        v = v.nextSibling
      }
      return d.fid = m, d
    }, e.prototype.parseGeometry = {
      point: function (e) {
        var t, n, r = [],
          t = this.getElementsByTagNameNS(e, this._gmlns, "pos");
        t.length > 0 && (n = t[0].firstChild.nodeValue, n = n.replace(this._regExes.trimSpace, ""), r = n.split(this._regExes.splitSpace)), r.length == 0 && (t = this.getElementsByTagNameNS(e, this._gmlns, "coordinates"), t.length > 0 && (n = t[0].firstChild.nodeValue, n = n.replace(this._regExes.removeSpace, ""), r = n.split(",")));
        if (r.length == 0) {
          t = this.getElementsByTagNameNS(e, this._gmlns, "coord");
          if (t.length > 0) {
            var i = this.getElementsByTagNameNS(t[0], this._gmlns, "X"),
              s = this.getElementsByTagNameNS(t[0], this._gmlns, "Y");
            i.length > 0 && s.length > 0 && (r = [i[0].firstChild.nodeValue, s[0].firstChild.nodeValue])
          }
        }
        return r.length == 2 && (r[2] = null), this.xy ? [parseFloat(r[0]), parseFloat(r[1]), parseFloat(r[2])] : [parseFloat(r[1]), parseFloat(r[0]), parseFloat(r[2])]
      },
      multipoint: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "Point"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.point.apply(this, [t[i]]), r && n.push(r)
        }
        return n
      },
      linestring: function (e, t) {
        var n, r, i = [],
          s = [];
        n = this.getElementsByTagNameNS(e, this._gmlns, "posList");
        if (n.length > 0) {
          r = this.getChildValue(n[0]), r = r.replace(this._regExes.trimSpace, ""), i = r.split(this._regExes.splitSpace);
          var o = parseInt(n[0].getAttribute("dimension")),
            u, a, f, l;
          for (var c = 0; c < i.length / o; ++c) u = c * o, a = parseFloat(i[u]), f = parseFloat(i[u + 1]), l = o == 2 ? null : parseFloat(i[u + 2]), this.xy ? s.push(a, f, l) : s.push(f, a, l)
        }
        if (i.length == 0) {
          n = this.getElementsByTagNameNS(e, this._gmlns, "coordinates");
          if (n.length > 0) {
            r = this.getChildValue(n[0]), r = r.replace(this._regExes.trimSpace, ""), r = r.replace(this._regExes.trimComma, ",");
            var h = r.split(this._regExes.splitSpace);
            for (var c = 0; c < h.length; ++c) i = h[c].split(","), i.length == 2 && (i[2] = null), this.xy ? s.push(parseFloat(i[0]), parseFloat(i[1]), parseFloat(i[2])) : s.push(parseFloat(i[1]), parseFloat(i[0]), parseFloat(i[2]))
          }
        }
        return s
      },
      multilinestring: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "LineString"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.linestring.apply(this, [t[i]]), r && n.push(r)
        }
        return n
      },
      polygon: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "LinearRing"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.linestring.apply(this, [t[i], !0]), r && n.push(r)
        }
        return n
      },
      multipolygon: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "Polygon"),
          n = [];
        if (t.length > 0) {
          var r;
          for (var i = 0; i < t.length; ++i) r = this.parseGeometry.polygon.apply(this, [t[i]]), r && n.push(r)
        }
        return n
      },
      envelope: function (e) {
        var t = [],
          n, r, i = this.getElementsByTagNameNS(e, this._gmlns, "lowerCorner");
        if (i.length > 0) {
          var s = [];
          i.length > 0 && (n = i[0].firstChild.nodeValue, n = n.replace(this._regExes.trimSpace, ""), s = n.split(this._regExes.splitSpace)), s.length == 2 && (s[2] = null);
          if (this.xy) var o = new OpenLayers_Geometry_Point(s[0], s[1], s[2]);
          else var o = new OpenLayers_Geometry_Point(s[1], s[0], s[2])
        }
        var u = this.getElementsByTagNameNS(e, this._gmlns, "upperCorner");
        if (u.length > 0) {
          var s = [];
          u.length > 0 && (n = u[0].firstChild.nodeValue, n = n.replace(this._regExes.trimSpace, ""), s = n.split(this._regExes.splitSpace)), s.length == 2 && (s[2] = null);
          if (this.xy) var a = new OpenLayers_Geometry_Point(s[0], s[1], s[2]);
          else var a = new OpenLayers_Geometry_Point(s[1], s[0], s[2])
        }
        return o && a && (t.push([o.x, o.y, null]), t.push([a.x, o.y, null]), t.push([a.x, a.y, null]), t.push([o.x, a.y, null]), t.push([o.x, o.y, null]), r = new OpenLayers_Geometry_Polygon([
          [t]
        ])), r
      },
      box: function (e) {
        var t = this.getElementsByTagNameNS(e, this._gmlns, "coordinates"),
          n, r, i = null,
          s = null;
        t.length > 0 && (n = t[0].firstChild.nodeValue, r = n.split(" "), r.length == 2 && (i = r[0].split(","), s = r[1].split(",")));
        if (i !== null && s !== null) return [parseFloat(i[0]), parseFloat(i[1]), null, parseFloat(s[0]), parseFloat(s[1]), null]
      }
    }, e.prototype.parseAttributes = function (e) {
      var t = {},
        n = e.firstChild,
        r, i, s, o, u, a, f;
      while (n) {
        if (n.nodeType == 1) {
          r = n.childNodes;
          for (i = 0; i < r.length; ++i) {
            s = r[i];
            if (s.nodeType == 1) {
              o = s.childNodes;
              if (o.length == 1) {
                u = o[0];
                if (u.nodeType == 3 || u.nodeType == 4) a = s.prefix ? s.nodeName.split(":")[1] : s.nodeName, f = u.nodeValue.replace(this._regExes.trimSpace, ""), t[a] = f
              } else t[s.nodeName.split(":").pop()] = null
            }
          }
          break
        }
        n = n.nextSibling
      }
      return t
    }, e.prototype.getChildValue = function (e, t) {
      var n = t || "";
      if (e)
        for (var r = e.firstChild; r; r = r.nextSibling) switch (r.nodeType) {
          case 3:
          case 4:
            n += r.nodeValue
        }
      return n
    }, e
  }), define("wfs/EntityCreator", [], function () {
    "use strict";

    function n(e, t, n) {
      return e <= t ? t : e >= n ? n : e
    }

    function r(e) {
      return e * 3 / 4
    }

    function i(e) {
      var t = e * 72 / 96;
      return -1 * t
    }

    function s(e) {
      var t = [],
        n = e.length;
      for (var r = 0; r < n; r++) {
        var i = e[r],
          s = i.positions.length;
        for (var o = 0; o < s; o++) {
          var u = i.positions[o];
          for (var a = 0; a < u.length; a += 3) t.push(Cesium.Cartographic.fromDegrees(u[a + 0], u[a + 1], 0))
        }
      }
      return t
    }

    function o(e, t, n, r) {
      n == undefined && (n = 0), r && (n = 0);
      var i = 0;
      for (var s = 0; s < e.length; s++) {
        var o = e[s];
        for (var u = 0; u < o.positions.length; u++) {
          var a = o.positions[u];
          for (var f = 2; f < a.length; f += 3) {
            var l = r ? 0 : a[f];
            t[i].height == undefined && (t[i].height = 0), a[f] = l + t[i].height + n, i++
          }
        }
      }
    }

    function u(e) {
      var t = [];
      for (var n = 0; n < e.length; n++)
        for (var r = 0; r < e[n].positions.length; r += 3) t.push(Cesium.Cartographic.fromDegrees(e[n].positions[r + 0], e[n].positions[r + 1], 0));
      return t
    }

    function a(e, t, n, r) {
      n == undefined && (n = 0), r && (n = 0);
      var i = 0;
      for (var s = 0; s < e.length; s++)
        for (var o = 2; o < e[s].positions.length; o += 3) {
          var u = r ? 0 : e[s].positions[o];
          t[i].height == undefined && (t[i].height = 0), e[s].positions[o] = u + t[i].height + n, i++
        }
    }

    function c(e) {
      this._style = e || {}, viewer.scene.onHoverShowTextArray = {}, viewer.scene._lastObjectShowOnText = null
    }

    function h(e, t) {
      t == undefined && (t = 0);
      if (t == 0) return e;
      var n = e.length;
      for (var r = 0; r < n; r++)
        if (e[r].geometryType == "polygon") {
          var i = e[r],
            s = i.positions.length;
          for (var o = 0; o < s; o++) {
            var u = i.positions[o];
            for (var a = 2; a < u.length; a += 3) u[a] += t;
            i.positions[o] = u
          }
          e[r] = i
        } else if (e[r].geometryType == "linestring" || e[r].geometryType == "point") {
        var f = e[r],
          l = f.positions.length;
        for (var o = 2; o < l; o += 3) f.positions[o] += t;
        e[r] = f
      }
      return e
    }
    var e = 1,
      t = !1,
      f = u,
      l = a;
    Object.defineProperties(c.prototype, {
      style: {
        get: function () {
          return this._style
        },
        set: function (e) {
          this._style = e
        }
      }
    }), c.prototype.clonePartOfMultiFeature = function (e, t) {
      return {
        positions: e.positions[t],
        attributes: e.attributes,
        fid: e.fid
      }
    }, c.prototype.createPrimitiveFromWFSFeatures = function (e, t, n) {
      var r = new Cesium.PrimitiveCollection;
      try {
        var i = [],
          s = [],
          o = [];
        e.numPositions = 0;
        for (var u = 0; u < e.length; u++) {
          var a = e[u];
          this.sanitizePositions(a.positions), e.numPositions += a.positions.length;
          switch (a.geometryType) {
            case "polygon":
              i.push(a);
              break;
            case "multipolygon":
              var f = a.positions.length;
              for (var l = 0; l < f; l++) i.push(this.clonePartOfMultiFeature(a, l));
              break;
            case "linestring":
              s.push(a);
              break;
            case "multilinestring":
              var f = a.positions.length;
              for (var l = 0; l < f; l++) s.push(this.clonePartOfMultiFeature(a, l));
              break;
            case "point":
              o.push(a);
              break;
            case "multipoint":
              var f = a.positions.length;
              for (var l = 0; l < f; l++) o.push(this.clonePartOfMultiFeature(a, l))
          }
        }
        if (i.length > 0) return this.createPolygonPrimitive(i, t, n);
        if (s.length > 0) return this.createLinestringPrimitive(s, t, n);
        if (o.length > 0) return this.createPointPrimitive(o, t, n)
      } catch (c) {
        console.log("Failed to create primitive from features: " + c)
      }
      n(r)
    }, c.prototype.createPolygonPrimitive = function (n, r, i) {
      var u = this,
        a = !1,
        f = function (e, t) {
          var n = [],
            r = [];
          for (var i = 0; i < e.length; i++) {
            var s = e[i],
              o = u.createPolygonOptions(s.positions, s.attributes);
            o = o.polygon;
            if (o.outline) {
              var f = u.createPolygonGeometryHelper(Cesium.PolygonOutlineGeometry, s.fid, o.hierarchy, o.outlineColor, o.perPositionHeight);
              r.push(f)
            }
            if (o.fill) {
              var f = u.createPolygonGeometryHelper(Cesium.PolygonGeometry, s.fid, o.hierarchy, o.material, o.perPositionHeight);
              n.push(f)
            }
          }
          var l = new Cesium.PrimitiveCollection,
            c = new Cesium.PerInstanceColorAppearance({
              flat: !0,
              translucent: o.material.alpha < 1
            });
          a && (c.renderState.depthTest.enabled = !1), n.length > 0 && l.add(new Cesium.Primitive({
            geometryInstances: n,
            appearance: c
          })), r.length > 0 && l.add(new Cesium.Primitive({
            geometryInstances: r,
            appearance: c
          })), t(l)
        },
        l = this.style.altitudeMethod == TerraExplorer.internal.TEPosition.ATC_TERRAIN_ABSOLUTE;
      if (!l) {
        a = !0;
        var c = s(n),
          p = Cesium.sampleTerrain(viewer.terrainProvider, r + e, c);
        Cesium.when(p, function (e) {
          t && console.log("adding  polygon with " + e.length + " vertices");
          var r = u._style.altitudeMethod == TerraExplorer.internal.TEPosition.ATC_ON_TERRAIN ? !0 : !1;
          o(n, e, u._style.altitudeOffset, r), f(n, i)
        })
      } else f(h(n, this._style.altitudeOffset), i)
    }, c.prototype.createPolygonGeometryHelper = function (e, t, n, r, i) {
      var s = new e({
          polygonHierarchy: n,
          vertexFormat: Cesium.PerInstanceColorAppearance.FLAT_VERTEX_FORMAT,
          perPositionHeight: i
        }),
        o = new Cesium.GeometryInstance({
          geometry: s,
          id: t,
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(r)
          }
        });
      return o
    }, c.prototype.createLinestringPrimitive = function (n, r, i) {
      var s = this,
        o = !1,
        f = function (e, t) {
          var n = [];
          for (var r = 0; r < e.length; r++) {
            var i = e[r],
              u = s.createLinestringOptions(i.positions, i.attributes);
            u = u.polyline, u.vertexFormat = Cesium.PolylineColorAppearance.VERTEX_FORMAT;
            var a = new Cesium.PolylineGeometry(u),
              f = new Cesium.GeometryInstance({
                geometry: a,
                id: i.fid,
                attributes: {
                  color: Cesium.ColorGeometryInstanceAttribute.fromColor(u.material)
                }
              });
            n.push(f)
          }
          var l = new Cesium.Primitive({
            geometryInstances: n,
            appearance: new Cesium.PolylineColorAppearance({
              translucent: !1
            }),
            asynchronous: !0
          });
          o && (l.appearance.renderState.depthTest.enabled = !1), t(l)
        },
        l = this.style.altitudeMethod == TerraExplorer.internal.TEPosition.ATC_TERRAIN_ABSOLUTE;
      if (!l) {
        o = !0;
        var c = u(n),
          p = Cesium.sampleTerrain(viewer.terrainProvider, r + e, c);
        Cesium.when(p, function (e) {
          t && console.log("adding  linestring with " + e.length + " vertices");
          var r = s._style.altitudeMethod == TerraExplorer.internal.TEPosition.ATC_ON_TERRAIN ? !0 : !1;
          a(n, e, s._style.altitudeOffset, r), f(n, i)
        })
      } else f(h(n, this.style.altitudeOffset), i)
    }, c.prototype.createPointPrimitive = function (t, n, r) {
      var i = this,
        s = function (e, t) {
          var n, r = new Cesium.LabelCollection,
            s = new Cesium.PointPrimitiveCollection,
            o = new Cesium.BillboardCollection,
            u = new Cesium.PrimitiveCollection;
          for (var a = 0; a < e.length; a++) {
            var f = e[a],
              l = i.createPointOptions(f.positions, f.attributes);
            if (l.label) {
              l.label.position = l.position, l.label.id = f.fid, l.label.imageFile != undefined && (l.label.image = i.applyConditionalClassification(l.label.imageFile, f.attributes), l.label.label = l.label, o.add(l.label), l.label.eyeOffset = new Cesium.Cartesian3(0, 0, -5)), l.label.imageFile != undefined && l.label.showText != undefined && l.label.showText && (viewer.scene.onHoverShowTextArray[l.label.id] = !0);
              if (l.label.isBold != undefined && l.label.isBold) {
                l.label.image != undefined && delete l.label.image;
                var c = $.extend({}, l.label);
                c.outlineColor = l.label.fillColor, c.style = Cesium.LabelStyle.FILL_AND_OUTLINE, c.eyeOffset = new Cesium.Cartesian3(0, 0, -5), c.outlineWidth = 1, r.add(c)
              }
              if (l.label.isUnderline != undefined && l.label.isUnderline) {
                var h = "_",
                  p = l.label.text.match(/[iljf1]/g) != null ? l.label.text.match(/[iljf1]/g) : [],
                  d = l.label.text.length,
                  v = Array(Math.ceil(d - p.length * .5)).join(h);
                n = $.extend({}, l.label), l.label.image != undefined && delete l.label.image, n.position = l.label.position, n.id = l.label.id, n.text = v, n.alignment = l.label.alignment != undefined ? l.label.alignment : undefined, n.underline = !0, n.textRelativeToImage = l.label.textRelativeToImage != undefined ? l.label.textRelativeToImage : undefined;
                var m = l.label.font.indexOf("pt") > -1 ? Number(l.label.font.split("pt")[0]) * 4 / 3 : l.label.font.indexOf("px") > -1 ? Number(l.label.font.split("px")[0]) : 5;
                n.pixelOffset = new Cesium.Cartesian2(0, -45), r.add(n)
              }
              r.add(l.label)
            }
            l.billboard && (l.billboard.position = l.position, l.billboard.id = f.fid, o.add(l.billboard));
            if (l.model) {
              l.model.url = l.model.uri, l.model.id = f.fid;
              var g = u.add(Cesium.Model.fromGltf(l.model))
            }
            l.point && (l.point.position = l.position, l.point.id = f.fid, s.add(l.point))
          }
          var y = new Cesium.PrimitiveCollection;
          r.length > 0 && y.add(r), o.length > 0 && y.add(o), u.length > 0 && y.add(u), s.length > 0 && y.add(s), t(y)
        },
        o = this.style.altitudeMethod == TerraExplorer.internal.TEPosition.ATC_TERRAIN_ABSOLUTE;
      if (!o) {
        var u = f(t),
          a = Cesium.sampleTerrain(viewer.terrainProvider, n + e, u);
        Cesium.when(a, function (e) {
          var n = i._style.altitudeMethod == TerraExplorer.internal.TEPosition.ATC_ON_TERRAIN ? !0 : !1;
          l(t, e, i._style.altitudeOffset, n), s(t, r)
        })
      } else s(h(t, this.style.altitudeOffset), r)
    }, c.prototype.createEntityFromWFSFeature = function (e) {
      var t = {},
        n = [];
      try {
        this.sanitizePositions(e.positions);
        switch (e.geometryType) {
          case "polygon":
            t = this.createPolygonOptions(e.positions, e.attributes);
            break;
          case "multipolygon":
            for (var r = 0; r < e.positions.length; r++) n.push(this.createPolygonOptions(e.positions[r], e.attributes));
            break;
          case "linestring":
            t = this.createLinestringOptions(e.positions, e.attributes);
            break;
          case "multilinestring":
            for (var r = 0; r < e.positions.length; r++) n.push(this.createLinestringOptions(e.positions[r], e.attributes));
            break;
          case "point":
            t = this.createPointOptions(e.positions, e.attributes);
            break;
          case "multipoint":
            for (var r = 0; r < e.positions.length; r++) n.push(this.createPointOptions(e.positions[r], e.attributes));
            break;
          default:
            console.log("Geometry type " + e.geometryType + " is not supported")
        }
      } catch (i) {
        console.log("Failed to create entity options for feature '" + e.fid + "': " + i)
      }
      t.name = this.applyClassification(this.style.name, e.attributes) || e.fid, t.featureAttributes = e.attributes;
      var s = new Cesium.Entity(t);
      for (var r = 0; r < n.length; r++) n[r].parent = s, n[r].name = t.name, n[r].featureAttributes = t.featureAttributes, new Cesium.Entity(n[r]);
      return s
    }, c.prototype.createPolygonOptions = function (e, t) {
      var n = this.getPolygonStyle(this.style);
      n.polygon.hierarchy = {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(e[0]),
        holes: []
      };
      for (var r = 1; r < e.length; r++) n.polygon.hierarchy.holes.push({
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(e[r])
      });
      return n.polygon.material = this.applyConditionalClassification(n.polygon.material, t), n.polygon.fill != undefined && n.polygon.fromKml != undefined && (n.polygon.material.alpha = n.polygon.fill), n.polygon.outlineColor = this.applyConditionalClassification(n.polygon.outlineColor, t), n
    }, c.prototype.createLinestringOptions = function (e, t) {
      var n = this.getLinestringStyle(this.style);
      return n.polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(e), n.polyline.material = this.applyConditionalClassification(n.polyline.material, t), n
    }, c.prototype.applyConditionalClassification = function (e, t) {
      function n(e) {
        return isNaN(e) ? e : parseFloat(e)
      }
      if (e == undefined) return undefined;
      if (e.defaultValue == undefined) return e;
      var r = n(e.defaultValue);
      r.toString().indexOf("[") == 0 && r.toString().indexOf("]") == r.length - 1 && (r = this.applyClassification(r, t));
      var i = e.classificationArray;
      return i == undefined ? r : ($(Object.keys(i)).each(function (e, s) {
        var o, u, a = s.split('"');
        a.length == 1 ? (o = s.split("<")[1].split("=")[0].replace("[", "").replace("]", ""), u = s.split("=")[1].split(">")[0]) : (o = a[1].replace("[", "").replace("]", ""), u = a[3]), t[o] == u && (r = n(i[s]))
      }), r)
    }, c.prototype.createPointOptions = function (e, t) {
      var s = this.getPointStyle(this.style);
      s.position = Cesium.Cartesian3.fromDegrees(e[0], e[1], e[2]);
      if (s.label) {
        s.label.text = this.applyClassification(s.label.text, t);
        if (s.label.family != undefined) {
          var o = this.applyConditionalClassification(s.label.family, t),
            u = this.applyConditionalClassification(s.label.font, t);
          u >= 0 ? s.label.font = r(u).toString() + "pt " + o : s.label.font = r(i(u)).toString() + "pt " + o
        }
        s.label.fillColor = this.applyConditionalClassification(s.label.fillColor, t), s.label.backgroundColor = this.applyConditionalClassification(s.label.backgroundColor, t), s.label.backgroundColor == undefined && (s.label.backgroundColor = new Cesium.Color(.165, .165, .165, 0)), s.label.showBackground = !0;
        if (s.label.showText != undefined) {
          var a = this.applyConditionalClassification(s.label.showText, t);
          a && (s.label.onHoverShowText = !0);
          if (a && viewer.scene.canvas.onHoverShowText == undefined) {
            var f = viewer.scene,
              l = new Cesium.ScreenSpaceEventHandler(f.canvas);
            l.setInputAction(function (e) {
              var t = {},
                n = f.screenToWorld(e.endPosition, t);
              Cesium.defined(t.pickPrimitive) && t.pickPrimitive.constructor.name == "Billboard" && t.pickPrimitive.label != undefined ? f.onHoverShowTextArray[t.pickPrimitive.label.id] != undefined && (f._lastObjectShowOnText != null && f._lastObjectShowOnText.id != t.pickPrimitive.label.id && f._lastObjectShowOnText.show != undefined && (f._lastObjectShowOnText.show = !1), viewer.scene._lastObjectShowOnText = f.onHoverShowTextArray[t.pickPrimitive.label.id], f._lastObjectShowOnText.show != undefined && (viewer.scene._lastObjectShowOnText.show = !0)) : f._lastObjectShowOnText != null && f._lastObjectShowOnText.show != undefined && (f._lastObjectShowOnText.show = !1)
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE), viewer.scene.canvas.onHoverShowText = !0
          }
        }
        s.label.textRelativeToImage != undefined && s.label.textAlignment != undefined && (s.label.textRelativeToImage = this.applyConditionalClassification(s.label.textRelativeToImage, t), s.label.alignment = this.applyConditionalClassification(s.label.textAlignment, t)), s.label.underline != undefined && (s.label.isUnderline = this.applyConditionalClassification(s.label.underline, t)), s.label.bold != undefined && (s.label.isBold = this.applyConditionalClassification(s.label.bold, t));
        if (s.label.italic != undefined) {
          var c = this.applyConditionalClassification(s.label.italic, t);
          c == 1 && (s.label.font = "italic " + s.label.font)
        }
        s.label.backgroundOpacity != undefined && (s.label.backgroundColor.alpha = this.applyConditionalClassification(s.label.backgroundOpacity, t) / 100);
        var h = parseFloat(s.label.scale.defaultValue);
        s.label.scale = n(this.applyConditionalClassification(s.label.scale, t) / h, .7, 1.3), s.label.scale = this.applyConditionalClassification(s.label.scale, t);
        if (s.label.minViewingHeight != undefined) {
          var p = this.applyConditionalClassification(s.label.minViewingHeight, t),
            d = this.applyConditionalClassification(s.label.scaleMPP, t) * 650;
          s.label.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(p, d)
        }
        isNaN(s.label.scale) && (s.label.scale = 1.5);
        if (s.label.limitGrowth != undefined && s.label.scaleMPP != undefined) {
          var v = this.applyConditionalClassification(s.label.limitGrowth, t),
            m = this.applyConditionalClassification(s.label.scaleMPP, t) * 1e3;
          v ? s.label.scaleByDistance = new Cesium.NearFarScalar(m, 1, m * 10, 0) : s.label.scaleByDistance = new Cesium.NearFarScalar(15, 50, m * 10, .1)
        }
      }
      if (s.billboard) {
        s.billboard.sizeInMeters = !1;
        if (s.billboard.imageColor != undefined) {
          var g = this.applyConditionalClassification(s.billboard.imageColor, t),
            y = Number(g);
          if (g.alpha == undefined && !isNaN(y)) {
            var b = y.toString(16);
            if (b.length < 6 && b != undefined) {
              var w = b.length;
              while (w < 6) b = "0" + b, w++
            }
            var E = "#" + b,
              S = Cesium.Color.fromCssColorString(E);
            if (S != undefined) {
              var x = S.red;
              S.red = S.blue, S.blue = x
            }
            g = S
          }
          s.billboard.color = g
        }
        s.billboard.imageOpacity != undefined && s.billboard.color.alpha != undefined && (s.billboard.color.alpha = Number(this.applyConditionalClassification(s.billboard.imageOpacity, t))), s.billboard.image = this.applyConditionalClassification(s.billboard.image, t);
        if (s.billboard.limitGrowth != undefined && s.billboard.scaleTE != undefined) {
          var v = this.applyConditionalClassification(s.billboard.limitGrowth, t);
          v.defaultValue == undefined && !isNaN(Number(v)) && (v = Number(v));
          var m = this.applyConditionalClassification(s.billboard.scaleTE, t) * 1e3;
          v ? s.billboard.scaleByDistance = new Cesium.NearFarScalar(m, 1, m * 10, 0) : (s.billboard.sizeInMeters = !0, s.billboard.scaleByDistance = new Cesium.NearFarScalar(m, m / 1e3, m * 10, m / 1e3))
        }
      }
      if (s.model) {
        var T = function (e) {
          var t = Number(e);
          if (!Cesium.defined(t) || isNaN(t)) t = 0;
          return t
        };
        s.model.uri = this.applyClassification(s.model.uri, t), s.model.scale = T(this.applyClassification(s.model.scale, t));
        var N = T(this.applyClassification(s.model.heading, t)),
          C = T(this.applyClassification(s.model.pitch, t)),
          k = T(this.applyClassification(s.model.roll, t)),
          L = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(N), Cesium.Math.toRadians(C), Cesium.Math.toRadians(k));
        s.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(s.position, L)
      }
      return s
    }, c.prototype.applyClassification = function (e, t) {
      if ($.type(e) !== "string") return e;
      if (e.indexOf("[") != -1)
        for (var n in t) e = e.replace("[" + n + "]", t[n]);
      return e
    }, c.prototype.getPolygonStyle = function (e) {
      var t = $.extend(!0, {}, p.DEFAULT_POLYGON_STYLE, e);
      return t
    }, c.prototype.getLinestringStyle = function (e) {
      var t = $.extend(!0, {}, p.DEFAULT_POLYLINE_STYLE, e);
      return t
    }, c.prototype.getPointStyle = function (e) {
      if (e.label != undefined) {
        var t = $.extend(!0, {}, p.DEFAULT_LABEL_STYLE, e);
        return t
      }
      if (e.billboard != undefined) {
        var n = $.extend(!0, {}, p.DEFAULT_BILLBOARD_STYLE, e);
        return n
      }
      if (e.model != undefined) {
        var r = $.extend(!0, {}, p.DEFAULT_MODEL_STYLE, e);
        return r
      }
      return p.DEFAULT_POINT_STYLE
    }, c.prototype.sanitizePositions = function (e) {
      for (var t = 0; t < e.length; t++) e[t] instanceof Array ? this.sanitizePositions(e[t]) : isNaN(e[t]) && (e[t] = 0)
    };
    var p = {};
    return Object.defineProperties(p, {
      DEFAULT_POLYGON_STYLE: {
        get: function () {
          return {
            polygon: {
              perPositionHeight: !0,
              fill: !1,
              material: Cesium.Color.GREEN,
              outline: !0,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 1
            }
          }
        }
      },
      DEFAULT_POLYLINE_STYLE: {
        get: function () {
          return {
            polyline: {
              material: Cesium.Color.WHITE,
              width: 1
            }
          }
        }
      },
      DEFAULT_POINT_STYLE: {
        get: function () {
          return {
            point: {
              color: Cesium.Color.RED,
              pixelSize: 5,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2
            }
          }
        }
      },
      DEFAULT_LABEL_STYLE: {
        get: function () {
          return {
            label: {
              text: "Text",
              font: "18px arial",
              style: Cesium.LabelStyle.FILL,
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 5,
              scale: 1,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              eyeOffset: Cesium.Cartesian3.ZERO,
              pixelOffset: new Cesium.Cartesian2(0, -50)
            }
          }
        }
      },
      DEFAULT_BILLBOARD_STYLE: {
        get: function () {
          return {
            billboard: {
              image: "./img/query.png",
              scale: 1,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
          }
        }
      },
      DEFAULT_MODEL_STYLE: {
        get: function () {
          return {
            model: {
              uri: "./img/CesiumTexturedBoxTest.bgltf",
              scale: 1e3
            }
          }
        }
      }
    }), c
  }), define("WorkerPool", [], function () {
    "use strict";

    function t(e, t) {
      for (var n = 0; n < e.length; n++)
        if (t(e[n])) return n
    }
    var e = function (e) {
      e = e || [];
      if (!Cesium.defined(e.workerPath)) throw new Cesium.DeveloperError("workerPath is required.");
      this._workerPath = e.workerPath, this._poolSize = Cesium.defaultValue(e.poolSize, 16), this._workers = [], this._defered = []
    };
    return Object.defineProperties(e.prototype, {
      errorEvent: {
        get: function () {
          return this.errorEvent
        }
      },
      poolSize: {
        get: function () {
          return this._poolSize
        }
      }
    }), e.prototype.queueWorkItem = function (e, t) {
      var n = Cesium.when.defer(),
        r = null,
        i = 999999;
      for (var s = 0; s < this._workers.length; s++) {
        var r = this._workers[s];
        this._workers[s].jobQueueSize < i && (r = this._workers[s], i = this._workers[s].jobQueueSize)
      }
      if (i > 0 && this._workers.length < this.poolSize) {
        r = new Worker(this._workerPath);
        var o = this;
        r.addEventListener("message", function (e) {
          o.onWorkerMessage(e)
        }, !1), r.addEventListener("error", function (e) {
          o.onWorkerError(e)
        }, !1), r.jobQueueSize = 0, this._workers.push(r), r.id = Cesium.createGuid()
      }
      e.workerId = r.id;
      var u = Cesium.createGuid();
      return e.deferedId = u, this._defered[u] = n, r.jobQueueSize++, r.postMessage(e, t), n
    }, e.prototype.trimPool = function (e) {
      var t = this;
      if (e == undefined) {
        this.timerId != null && clearTimeout(this.timerId), this.timerId = setTimeout(function () {
          t.trimPool(!0)
        }, 5e3);
        return
      }
      for (var n = 0; n < this._workers.length; n++) this._workers[n].jobQueueSize == 0 && (this._workers[n].terminate(), this._workers.splice(n, 1), n--);
      this._workers.length ? this.timerId = setTimeout(function () {
        t.trimPool(!0)
      }, 5e3) : this.timerId = null
    }, e.prototype.onWorkerMessage = function (e) {
      var n = e.data,
        r = t(this._workers, function (e) {
          return e.id === n.workerId
        });
      if (r != undefined) {
        var i = this._workers[r];
        i.jobQueueSize--, this.trimPool()
      }
      var s = this._defered[n.deferedId];
      delete this._defered[n.deferedId], s.resolve(n)
    }, e.prototype.onWorkerError = function (e) {
      console.log(e)
    }, e
  }), define("wfs/Layer", ["./../jquery", "./GmlParser", "./EntityCreator", "./TileManager", "WorkerPool"], function (e, t, n, r, i) {
    "use strict";

    function s(e, i, o, f, l, c, h, p) {
      l = l || {}, this._level = f, this._url = i, this._layerName = o, this._guid = Cesium.createGuid(), this._viewer = e, this._gmlParser = new t(!0, null, null, !0), this._tileManager = r.getInstance(e), this._tileManager.loadTileEvent.addEventListener(s.prototype.loadTile, this), this._useWorkers = !0, this._layerDisplayName = c, this._showAttributesAsMessage = l.showAttributesAsMessage, delete l.showAttributesAsMessage, this._entityCreator = new n(l), this._visible = !0, this._featuresMap = {}, this._boundingBox = undefined, this._geometryFieldName = undefined, this._subdomains = h, this.latLon = p, this._statistics = {
        numberOfAddedFeatures: 0,
        numberOfDeletedFeatures: 0,
        numberOfAddePositions: 0,
        numberOfDeletedPositions: 0,
        getNumberOfCurrentlyRenderedFeatures: function () {
          return this.numberOfAddedFeatures - this.numberOfDeletedFeatures
        },
        getNumberOfCurrentlyRenderedPositions: function () {
          return this.numberOfAddePositions - this.numberOfDeletedPositions
        }
      }, u(this), a(this)
    }

    function o(e, t) {
      var n;
      return e.indexOf("{s}") != -1 ? n = t != undefined && t.length > 0 ? e.replace("{s}", t[0]) : console.error("Error - sTag with no subdomains.") : n = e, n
    }

    function u(t) {
      var n = t.cleanUrl(t._url).replace("{s}", t.sTag(t._layerName.length, t._layerName.length, t._level)) + "?SERVICE=WFS" + "&VERSION=1.0.0" + "&REQUEST=GetCapabilities" + "&outputFormat=GML2" + "&typeName=" + t._layerName,
        r = TerraExplorer.internal.Settings.connectionUrl;
      Cesium.TrustedServers.contains(o(t._url, t._subdomains)) ? e.ajax({
        dataType: "xml",
        xhrFields: {
          withCredentials: !0
        },
        url: encodeURI(n),
        success: function (n) {
          e(n).find("FeatureType").each(function (n, r) {
            if (e(r).children("Name").text() == t._layerName) {
              var i = e(r).children("LatLongBoundingBox");
              return i.length !== 1 ? !1 : (t._boundingBox = Cesium.Rectangle.fromDegrees(parseFloat(i[0].attributes.minx.value), parseFloat(i[0].attributes.miny.value), parseFloat(i[0].attributes.maxx.value), parseFloat(i[0].attributes.maxy.value)), !1)
            }
            return !0
          })
        }
      }) : e.ajax({
        dataType: "xml",
        url: encodeURI(n),
        success: function (n) {
          e(n).find("FeatureType").each(function (n, r) {
            if (e(r).children("Name").text() == t._layerName) {
              var i = e(r).children("LatLongBoundingBox");
              return i.length !== 1 ? !1 : (t._boundingBox = Cesium.Rectangle.fromDegrees(parseFloat(i[0].attributes.minx.value), parseFloat(i[0].attributes.miny.value), parseFloat(i[0].attributes.maxx.value), parseFloat(i[0].attributes.maxy.value)), !1)
            }
            return !0
          })
        }
      })
    }

    function a(t) {
      var n = t.cleanUrl(t._url).replace("{s}", t.sTag(t._layerName.length, t._layerName.length, t._level)) + "?SERVICE=WFS" + "&VERSION=1.0.0" + "&REQUEST=DescribeFeatureType" + "&typeName=" + t._layerName,
        r = TerraExplorer.internal.Settings.connectionUrl;
      Cesium.TrustedServers.contains(o(t._url, t._subdomains)) ? e.ajax({
        dataType: "xml",
        xhrFields: {
          withCredentials: !0
        },
        url: encodeURI(n),
        success: function (n) {
          var r = e(n).find("[type^='gml:']");
          t._geometryFieldName = e(r).attr("name")
        }
      }) : e.ajax({
        dataType: "xml",
        url: encodeURI(n),
        success: function (n) {
          var r = e(n).find("[type^='gml:']");
          t._geometryFieldName = e(r).attr("name")
        }
      })
    }
    Cesium.defineProperties(s.prototype, {
      LayerDisplayName: {
        get: function () {
          return this._layerDisplayName
        }
      },
      guid: {
        get: function () {
          return this._guid
        }
      },
      Style: {
        get: function () {
          return this._entityCreator.style
        }
      },
      show: {
        get: function () {
          return this._visible
        },
        set: function (e) {
          this.setVisibility(e)
        }
      },
      BoundingBox: {
        get: function () {
          return this._boundingBox
        }
      },
      Statistics: {
        get: function () {
          return this._statistics
        }
      }
    });
    var f = 180 / Math.PI,
      l = 1 / f;
    s.prototype.refresh = function () {
      var e = this._tileManager.getAllTiles(),
        t = e.length;
      for (var n = 0; n < t; n++) e[n].data.wfsLayerData[this._guid] && e[n].data.wfsLayerData[this._guid].freeResources(), this.loadTile(e[n])
    }, s.prototype.setVisibility = function (e) {
      if (this._visible != e) {
        this._visible = e;
        if (e == 0) {
          var t = this._tileManager.getAllTiles(),
            n = t.length;
          for (var r = 0; r < n; r++) t[r].data.wfsLayerData[this._guid] && t[r].data.wfsLayerData[this._guid].primitive && (t[r].data.wfsLayerData[this._guid].primitive.show = !1)
        } else {
          var t = this._tileManager.getAllTiles(),
            n = t.length;
          for (var r = 0; r < n; r++) t[r].data.wfsLayerData[this._guid] && (t[r].data.wfsLayerData[this._guid].primitive ? t[r].data.wfsLayerData[this._guid].primitive.show = !0 : this.loadTile(t[r]))
        }
      }
    }, s.prototype.loadTile = function (e) {
      var t = this;
      e.data.wfsLayerData[this._guid] = {
        primitive: undefined,
        freeResources: function () {
          Cesium.defined(this.xhr) && (this.xhr.abort(), this.xhr = undefined), Cesium.defined(this.features) && (t.removeFeaturesFromLayer(this.features), this.features = undefined), Cesium.defined(this.primitive) && (t._tileManager.removeFromScene(this.primitive), this.primitive = undefined)
        }
      }, e.level === this._level && this.show && this.beginLoadWFSData(e)
    }, s.prototype.isDestroyed = function () {
      return !1
    }, s.prototype.destroy = function () {
      return this._tileManager.removeEventListener(s.prototype.loadTile, this), Cesium.destroyObject(this)
    }, s.prototype.sTag = function (e, t, n) {
      if (this._subdomains == undefined) return "";
      var r = (e + t + n) % this._subdomains.length;
      return this._subdomains[r]
    }, s.prototype.cleanUrl = function (e) {
      return e.indexOf("?") != -1 ? e.split("?")[0] : e
    }, s.prototype.beginLoadWFSData = function (t) {
      if (this.latLon != undefined && !this.latLon) return;
      this.BoundingBox != undefined && (this.BoundingBox.width == 0 || this.BoundingBox.height == 0) && (this.BoundingBox.east += 1, this.BoundingBox.north += 1, this.BoundingBox.beenModified = !0);
      if (this.BoundingBox !== undefined && Cesium.Rectangle.intersection(this.BoundingBox, t.rectangle) === undefined) return;
      var n = [f * t.rectangle.west, f * t.rectangle.south, f * t.rectangle.east, f * t.rectangle.north],
        r = this,
        i = this.cleanUrl(this._url).replace("{s}", this.sTag(t.x, t.y, t.level)) + "?SERVICE=WFS" + "&VERSION=1.0.0" + "&REQUEST=GetFeature" + "&outputFormat=GML2" + "&typeName=" + this._layerName + "&srsName=EPSG:4326" + "&BBOX=" + n.join(","),
        s = TerraExplorer.internal.Settings.connectionUrl;
      Cesium.TrustedServers.contains(o(this._url, this._subdomains)) ? t.data.wfsLayerData[this._guid].xhr = e.ajax({
        dataType: this._useWorkers ? "text" : "xml",
        url: encodeURI(i),
        xhrFields: {
          withCredentials: !0
        },
        success: function (e) {
          r.processWFSData(t, e)
        },
        error: function (e, t, n) {
          n !== "abort" && console.log("Failed to retrieve data from " + i + " :" + n)
        },
        complete: function () {
          t.data.wfsLayerData[r._guid].xhr = undefined
        }
      }) : t.data.wfsLayerData[this._guid].xhr = e.ajax({
        dataType: this._useWorkers ? "text" : "xml",
        url: encodeURI(i),
        success: function (e) {
          r.processWFSData(t, e)
        },
        error: function (e, t, n) {
          n !== "abort" && console.log("Failed to retrieve data from " + i + " :" + n)
        },
        complete: function () {
          t.data.wfsLayerData[r._guid].xhr = undefined
        }
      })
    };
    var c = new i({
      workerPath: "./static/te4w/wfs/featurefetcherworker.js"
    });
    return s.prototype.processWFSData = function (e, t) {
      e.data.wfsLayerData[this._guid].xhr = undefined;
      if (this._useWorkers) {
        var n = this;
        c.queueWorkItem({
          id: e.data.id,
          text: t,
          geometryFieldName: this._geometryFieldName
        }).then(function (e) {
          n.addFeaturesToTile(e)
        })
      } else {
        var r = this._gmlParser.read(t);
        this.addFeaturesToTile({
          id: e.data.id,
          features: r
        })
      }
    }, s.prototype.addFeaturesToTile = function (e) {
      var t = this._tileManager.getTile(e.id);
      if (t === undefined) return;
      var n = this;
      this._entityCreator.createPrimitiveFromWFSFeatures(e.features, t.level, function (r) {
        t.data.wfsLayerData[n._guid].features = e.features, n.addFeaturesToLayer(t.data.wfsLayerData[n._guid].features);
        if (r.length === undefined || r.length > 0) r.show = n.show, t.data.wfsLayerData[n._guid].primitive = r, n._tileManager.addToScene(r)
      });
      return
    }, s.prototype.addFeaturesToLayer = function (e) {
      this._statistics.numberOfAddedFeatures += e.length, this._statistics.numberOfAddePositions += Cesium.defaultValue(e.numPositions, 0);
      var t = e.length;
      for (var n = 0; n < t; n++) Object.prototype.hasOwnProperty.call(this._featuresMap, e[n].fid) === !1 ? this._featuresMap[e[n].fid] = {
        refCount: 1,
        feature: e[n]
      } : this._featuresMap[e[n].fid].refCount++
    }, s.prototype.removeFeaturesFromLayer = function (e) {
      this._statistics.numberOfDeletedFeatures += e.length, this._statistics.numberOfDeletedPositions += Cesium.defaultValue(e.numPositions, 0);
      var t = e.length;
      for (var n = 0; n < t; n++) {
        if (Object.prototype.hasOwnProperty.call(this._featuresMap, e[n].fid) === !1) continue;
        this._featuresMap[e[n].fid].refCount--, this._featuresMap[e[n].fid].refCount === 0 && delete this._featuresMap[e[n].fid]
      }
    }, s.prototype.getFeature = function (e) {
      return Object.prototype.hasOwnProperty.call(this._featuresMap, e) === !1 ? null : this._featuresMap[e]
    }, s
  }), define("sfsterrainprovider/SFSTerrainProvider", ["WorkerPool"], function (e) {
    "use strict";

    function r(e, t) {
      return Math.floor(Math.random() * (t - e + 1)) + e
    }
    var t = !1,
      n = function (t) {
        if (!Cesium.defined(t)) throw new Cesium.DeveloperError("options is required.");
        this._errorEvent = new Cesium.Event, this._credit = t.credit, typeof this._credit == "string" && (this._credit = new Cesium.Credit(this._credit)), t.heightMapWidth = Cesium.defaultValue(t.heightMapWidth, 32), t.heightMapHeight = Cesium.defaultValue(t.heightMapHeight, 32), this._options = t, this._subdomains = t.subdomains, t.url = t.url.replace("{s}", this.sTag(0, 0, 0)), this._firstRequest = t.url + "?" + "request=GetMap&Version=1.3.0&Service=WMS&CRS=EPSG:4326&bbox=-90,-180,90,180&height=32&width=32&optimizedOnly=0&layers=" + t.layerName + "&Styles=&Format=image/mpt";
        var n = this;
        $.ajax({
          url: this._firstRequest,
          success: function (e) {
            var t = Cesium.defined(e.childNodes) && e.childNodes.length > 0 ? !0 : !1;
            if (!!t) return n._isMPT = !1, n._format = "png", null;
            n._isMPT = !0, n._format = "mpt"
          },
          error: function () {
            return n._isMPT = !1, n._format = "png", null
          },
          async: !1
        }), this._urlTemplate = t.url + "?" + "request=GetMap&Version=1.3.0&Service=WMS&CRS=EPSG:4326&bbox={south},{west},{north},{east}&height={height}&width={width}&optimizedOnly={optimizedOnly}&layers=" + t.layerName + "&Styles=&Format=image/" + this._format, this._allElevationLayers = null, this._tilingScheme = new Cesium.GeographicTilingScheme, this._levelZeroMaximumGeometricError = Cesium.TerrainProvider.getEstimatedLevelZeroGeometricErrorForAHeightmap(this._tilingScheme.ellipsoid, t.heightMapWidth * 4, this._tilingScheme.getNumberOfXTilesAtLevel(0)), this._workerPool = new e({
          workerPath: "./static/te4w/sfsterrainprovider/ParseElevationWorker.js"
        }), this._pendingRequests = 0, this._requestGridSize = 8, this._requestsCache = {}, this._requestsCacheKeys = [], this.errorEvent.addEventListener(function (e) {}, this)
      };
    return n._geometricErrorFactor = 2, Object.defineProperties(n.prototype, {
      errorEvent: {
        get: function () {
          return this._errorEvent
        }
      },
      credit: {
        get: function () {
          return this._credit
        }
      },
      hasVertexNormals: {
        get: function () {
          return !1
        }
      },
      tilingScheme: {
        get: function () {
          return this._tilingScheme
        }
      },
      ready: {
        get: function () {
          return !0
        }
      },
      hasWaterMask: {
        get: function () {
          return !1
        }
      },
      heightMapHeight: {
        get: function () {
          return this._options.heightMapHeight
        }
      },
      heightMapWidth: {
        get: function () {
          return this._options.heightMapWidth
        }
      },
      pendingRequests: {
        get: function () {
          return this._pendingRequests
        }
      }
    }), n.prototype.getLevelMaximumGeometricError = function (e) {
      return this._levelZeroMaximumGeometricError / (1 << e) * n._geometricErrorFactor
    }, n.prototype.createKeyFromTile = function (e, t, n) {
      return e + "_" + t + "_" + n
    }, n.prototype.getTileDataAvailable = function (e, t, n) {
      return this._isMPT ? undefined : n < 16 ? !0 : !1
    }, n.prototype.requestFactorForLevel = function (e) {
      var t = Math.log(this._requestGridSize) / Math.log(2);
      return t = Math.min(t, e), Math.pow(2, t)
    }, n.prototype.getRequestUrl = function (e, t, n, r) {
      var i = this.requestFactorForLevel(n);
      e = (e - e % i) / i, t = (t - t % i) / i, n -= Math.log(i) / Math.log(2);
      var s = this.tilingScheme.tileXYToNativeRectangle(e, t, n),
        o = this.heightMapWidth * i === 256 && r ? 1 : 0,
        u = null;
      this._allElevationLayers != null && $(this._allElevationLayers).each(function (e, t) {
        var n = t.rectangle;
        if (s.west >= n.west * 180 / Math.PI && s.east <= n.east * 180 / Math.PI && s.south >= n.south * 180 / Math.PI && s.north <= n.north * 180 / Math.PI) return u = t, !1
      });
      var a = this._urlTemplate.replace("{south}", s.south).replace("{north}", s.north).replace("{west}", s.west).replace("{east}", s.east).replace("{optimizedOnly}", o).replace("{width}", this.heightMapWidth * i).replace("{height}", this.heightMapHeight * i).replace("{s}", this.sTag(e, t, n));
      return u != null && u.show != undefined && u.show && (a = a.replace(this._options.url, u.url).replace(this._options.layerName, u.name)), a
    }, n.prototype.sTag = function (e, t, n) {
      if (this._subdomains == undefined) return "";
      var r = (e + t + n) % this._subdomains.length;
      return this._subdomains[r]
    }, n.prototype.findDirectParent = function (e) {
      var t = function (e, n) {
        if (e._rectangle.width <= n.width * 2.1 && Cesium.Rectangle.contains(e._rectangle, Cesium.Rectangle.center(n))) return e;
        var r = e.children.length;
        for (var i = 0; i < r; i++) {
          var s = e.children[i];
          if (Cesium.Rectangle.contains(s._rectangle, Cesium.Rectangle.center(n))) return t(s, n)
        }
        return null
      };
      if (e.width == Math.PI) return null;
      for (var n = 0; n < viewer.scene.globe._surface._levelZeroTiles.length; n++) {
        var r = t(viewer.scene.globe._surface._levelZeroTiles[n], e);
        if (r) return r
      }
      return null
    }, n.prototype.isTileAvailable = function (e, t, n) {
      var r = this._tilingScheme.tileXYToRectangle(e, t, n, new Cesium.Rectangle),
        i = this.findDirectParent(r);
      if (i && i.data && i.data.terrainData) {
        if (!(i.data.terrainData._childTileMask > 0)) return !1;
        var s = i.children.length;
        for (var o = 0; o < s; o++) {
          var u = i.children[o];
          if (Cesium.Rectangle.equals(u._rectangle, r)) return i.data.terrainData._childTileMask & 1 << o
        }
      }
      return !0
    }, n.prototype.markTileAsUnavailable = function (e, t, n) {
      var r = this._tilingScheme.tileXYToRectangle(e, t, n, new Cesium.Rectangle),
        i = this.findDirectParent(r);
      i && i.data && i.data.terrainData && i.data.terrainData._childTileMask > 0 && $.each(i.children, function (e, t) {
        if (Cesium.Rectangle.equals(t._rectangle, r)) {
          switch (e) {
            case 0:
              i.data.terrainData._childTileMask &= -5;
              break;
            case 1:
              i.data.terrainData._childTileMask &= -9;
              break;
            case 2:
              i.data.terrainData._childTileMask &= -2;
              break;
            case 3:
              i.data.terrainData._childTileMask &= -3;
              break;
            default:
          }
          return !1
        }
        return !0
      })
    }, n.prototype.requestTileGeometry = function (e, n, r, i) {
      var s = this.requestTileHeightBuffer(e, n, r, i);
      if (s === undefined) return undefined;
      var o = this,
        u = 15,
        a = this.requestTileHeightBuffer(e + 1, n, r, i, !0),
        f = this.requestTileHeightBuffer(e, n + 1, r, i, !0),
        l = this.requestTileHeightBuffer(e + 1, n + 1, r, i, !0),
        c = Cesium.when.defer();
      return Cesium.when.all([s, a, f, l], function (i) {
        if (t == 0) {
          if (i[0].myReject != undefined && i[0].myReject) {
            o.markTileAsUnavailable(e, n, r), c.reject();
            return
          }
          var s = o.heightMapWidth + 1,
            a = o.heightMapHeight + 1,
            f = new Float32Array(s * a);
          for (var l = 0; l < s; l++)
            for (var h = 0; h < a; h++) {
              var p = l,
                d = h,
                v = 0;
              h === s - 1 && (d = 0, v = 1), l === a - 1 && (p = 0, v = 2);
              var m = l * s + h,
                g = p * o.heightMapWidth + d;
              i[v] !== null && (i[v].myReject == undefined || !i[v].myReject) && (f[m] = i[v][g])
            }
          if (i[3].myReject == undefined || !i[3].myReject) f[s * a - 1] = i[3][0];
          var b = o.arrayToHeightmapTerrainData(f, s, a, u);
          c.resolve(b)
        } else {
          var b = o.arrayToHeightmapTerrainData(i[0], o.heightMapWidth, o.heightMapHeight);
          c.resolve(b)
        }
      }).otherwise(function () {
        c.reject()
      }), c
    }, n.prototype.requestTileHeightBuffer = function (e, n, i, s, o) {
      if (isNaN(e + n + i)) return;
      if (!Cesium.defined(s) || s === !1) s = new Cesium.Request({
        defer: !0
      });
      var u = s.defer == 0;
      o = Cesium.defaultValue(u, !1);
      var a = Cesium.when.defer();
      if (t == 0) {
        var f = this.getRequestUrl(e, n, i, u || o);
        if (this._requestsCache.hasOwnProperty(f) === !1) {
          this._requestsCache[f] = {}, this._requestsCacheKeys.push(f);
          if (this._requestsCacheKeys.length > 100) {
            for (var l = 0; l < 50; l++) delete this._requestsCache[this._requestsCacheKeys[l]];
            this._requestsCacheKeys.splice(0, 50)
          }
        } else {
          var c = this._requestsCacheKeys.indexOf(f);
          this._requestsCacheKeys.splice(c, 1), this._requestsCacheKeys.push(f)
        }
        var h = {
            headers: {
              withCredentials: !0
            }
          },
          p = this._requestsCache[f];
        if (p.dataLoaded === undefined) {
          u ? p.dataLoaded = Cesium.RequestScheduler.request(f, Cesium.loadArrayBuffer) : p.dataLoaded = Cesium.loadArrayBuffer(f);
          if (!Cesium.defined(p.dataLoaded)) return undefined
        }
        var d = this;
        this._pendingRequests++, Cesium.when(p.dataLoaded, function (t) {
          p.workerFinished === undefined && (p.workerFinished = d._workerPool.queueWorkItem({
            buffer: t
          })), Cesium.when(p.workerFinished, function (t) {
            if (!!t.rejected) {
              var s = d.heightMapWidth * d.heightMapHeight,
                o = new Int16Array(s),
                u = 0;
              for (var f = 0; f < s; f++) o[f] = 300;
              return i > 2 && (d.markTileAsUnavailable(e, n, i), o.myReject = !0), a.resolve(o), a
            }
            var r = d.extractTileHeightBuffer(t.buffer, e, n, i);
            d._pendingRequests--, a.resolve(r)
          })
        }).otherwise(function () {
          d._pendingRequests--, a.reject()
        })
      } else {
        var v = this.heightMapWidth * this.heightMapHeight,
          m = new Int16Array(v),
          g = r(0, 1500);
        for (var l = 0; l < v; l++) m[l] = g;
        a.resolve(m)
      }
      return a
    }, n.prototype.extractTileHeightBuffer = function (e, t, n, r) {
      try {
        var i = this.requestFactorForLevel(r),
          s = t % i,
          o = n % i,
          u = new Int16Array(this.heightMapWidth * this.heightMapHeight),
          a = 1e6,
          f = -1e5;
        for (var l = 0; l < this.heightMapHeight; l++)
          for (var c = 0; c < this.heightMapWidth; c++) {
            var h = l + o * this.heightMapHeight,
              p = c + s * this.heightMapWidth,
              d = l * this.heightMapWidth + c,
              v = h * this.heightMapWidth * i + p;
            e[v] > f && (f = e[v]), e[v] < a && (a = e[v]), u[d] = e[v]
          }
      } catch (m) {
        console.log(m.message)
      }
      return u
    }, n.prototype.arrayToHeightmapTerrainData = function (e, t, n, r) {
      Cesium.defined(e) === !1 && (e = new Int16Array(t * n));
      var i = {
        buffer: e,
        width: t,
        height: n,
        childTileMask: r
      };
      return new Cesium.HeightmapTerrainData(i)
    }, n
  }), define("KmlParser", ["jquery", "./TELang", "./wfs/Layer", "./internal/TEPosition", "./tools/MenuButton", "./internal/StatusBar", "./internal/Units", "./internal/SearchBox", "./internal/NavigationControl", "./internal/Settings", "./tools/SideBar"], function (e, t, n, r, i, s, o, u, a, f, l) {
    "use strict";

    function h(e) {
      switch (e.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
          return !0;
        case "false":
        case "no":
        case "0":
        case null:
          return !1;
        default:
          return Boolean(e)
      }
    }
    var c = function (e, t) {
        function n(e) {
          return (e & 255) << 24 | (e & 65280) << 8 | e >> 8 & 65280 | e >> 24 & 255
        }

        function r(e) {
          var t = e.length,
            n = 0,
            r = [t];
          while (n < t) r[t - n - 1] = e[n], ++n;
          return r.toString().replace(/,/g, "")
        }
        if (e.length > 0) {
          var i;
          if (t) {
            if (e[0].nodeName === "color") {
              var s = "#" + r(e.text());
              return s = s.substring(0, 7), i = Cesium.Color.fromCssColorString(s), i
            }
            if (!isNaN(e.text())) {
              var o = Number(e.text()).toString(16);
              if (o.length < 6 && o != undefined) {
                var u = o.length;
                while (u < 6) o = "0" + o, u++
              }
              var s = "#" + o;
              i = Cesium.Color.fromCssColorString(s);
              if (i != undefined) {
                var a = i.red;
                i.red = i.blue, i.blue = a
              }
              return i
            }
            i = e.text()
          } else i = e.text();
          return i
        }
        return undefined
      },
      p = function () {
        this._domains = {}, this._locations = null, this._featureLayers = null, this._rasterLayers = null, this._elevationLayers = null, this._meshLayers = null, this._cptLayers = null, this._kmlLayers = null, this._tours = null, this._startPosition = null, this._domainsKml = null, this._nameOfDomain = null, this._unsupportedLayers = new Array, this.depthTestAgainstTerrain = !1, this.startupProjectKMLParsing = !1, this.disableFixedLocalTime = !1
      };
    return Cesium.defineProperties(p.prototype, {
      FeatureLayers: {
        get: function () {
          return this._featureLayers
        }
      },
      RasterLayers: {
        get: function () {
          return this._rasterLayers
        }
      },
      ElevationLayers: {
        get: function () {
          return this._elevationLayers
        }
      },
      MeshLayers: {
        get: function () {
          return this._meshLayers
        }
      },
      CPTLayers: {
        get: function () {
          return this._cptLayers
        }
      },
      Locations: {
        get: function () {
          return this._locations
        }
      },
      Tours: {
        get: function () {
          return this._tours
        }
      },
      UnsupportedLayers: {
        get: function () {
          return this._unsupportedLayers
        }
      },
      Subdomains: {
        get: function () {
          return this._nameOfDomain ? this._domains[this._nameOfDomain] : this._domains["http://www.skylineglobe.com"]
        }
      }
    }), p.prototype.loadConfig = function (e) {
      this._domainsKml = e, this.loadLayout(e)
    }, p.prototype.loadFromData = function (e) {
      this.loadDomains(this._domainsKml), this.loadLayers(e), this.loadLocations(e), this.loadTours(e), this.loadStartPosition(e), this.startupProjectKMLParsing && viewer.dataSources.add(Cesium.KmlDataSource.load(e, {
        camera: viewer.camera,
        canvas: viewer.canvas
      })), this.depthTestAgainstTerrain && (viewer.scene.globe.depthTestAgainstTerrain = !0), this.disableFixedLocalTime && (TerraExplorer.internal.FixedLocalTime.Enable = !1)
    }, p.prototype.loadDomains = function (t) {
      var n = this,
        r = e(t).find("sx\\:Domain, Domain");
      r.length ? (this._nameOfDomain = e(r).attr("name"), r.each(function (t, r) {
        var i = e(r).attr("name");
        if (i != undefined) {
          n._domains[i] = [i];
          var s = e(r).find("sx\\:subdomain, subdomain");
          s.each(function (t, r) {
            n._domains[i].push(e(r).text())
          })
        }
      }), f.Subdomains = this._domains[this._nameOfDomain]) : f.Subdomains = this._domains["http://www.skylineglobe.com"]
    }, p.prototype.replaceDomainWithTag = function (t) {
      if (t == undefined) return {
        url: t,
        subdomains: undefined
      };
      var n = this;
      if (Object.keys(n._domains).length == 0) {
        var r = TerraExplorer.internal.Settings.Subdomains;
        if (!Cesium.defined(r)) return {
          url: t,
          subdomains: undefined
        };
        r.length > 0 && (n._domains[r[0]] = r)
      }
      var i = [];
      return e.each(n._domains, function (n, r) {
        t.indexOf(n + ":") != -1 || t.indexOf(n + "/") != -1 ? (t = t.replace(n, "{s}"), i = r) : e.each(r, function (e, n) {
          if (t.indexOf(n + ":") != -1 || t.indexOf(n + "/") != -1) t = t.replace(n, "{s}"), i = r
        })
      }), {
        url: t,
        subdomains: i.length > 0 ? i : undefined
      }
    }, p.prototype.loadLayers = function (e) {
      this.loadFeatureLayers(e), this.loadRasterLayers(e), this.loadKmlLayers(e), this.loadMeshLayers(e), this.loadCPTLayers(e)
    }, p.prototype.loadFeatureLayers = function (t) {
      var n = e(t).find("sx\\:FeatureLayer, FeatureLayer"),
        r = this._featureLayers = new Array,
        i = this;
      n.each(function (n, r) {
        var s = e(r),
          u = s.children("sx\\:suggestedBlockWidth");
        u = parseInt(u.length > 0 ? u.text() : "1222");
        var a = s.find("visibility").length == 1 ? Number(s.find("visibility").text()) : 1,
          f = s.find("Link href").text(),
          l = i.replaceDomainWithTag(f),
          c = {
            displayName: s.children("name").text(),
            url: l.url,
            name: s.find("Link sx\\:layerName, layerName").text(),
            visibility: a,
            style: i.convertLayerStyle(s, t),
            level: o.blockWidthToTeLayerLevel(u),
            subdomains: l.subdomains,
            indexInProjectTree: n
          },
          h = TerraExplorer.SGWorld.Creator.isLayerLonLat(f, c.name, "WFS", !1);
        h ? i._featureLayers.push(c) : (i._unsupportedLayers.push(c), c.latLon = !1)
      })
    }, p.prototype.findStyle = function (t, n) {
      var r = t.children("Style");
      if (r.length <= 0) {
        var i = t.children("sx\\:FeatureGroup");
        if (!(i.length > 0)) return r;
        var s = i.children("styleUrl");
        if (s.length <= 0) return r;
        var o = s.text().split("#")[1];
        r = e(n).find("Style[id='" + o + "']");
        if (r.length <= 0) return r
      }
      return r
    }, p.prototype.convertLayerStyle = function (e, t) {
      var n = this.findStyle(e, t),
        r = n.length > 0,
        i = e.children("sx\\:geometryType"),
        s = null;
      if (i.length <= 0) {
        s = e.children("sx\\:FeatureGroup");
        if (!(s.length > 0)) return {};
        i = s.children("sx\\:geometryType")
      }
      var o = {};
      r && i.text() == "Polygons" ? o = this.readPolygonStyle(n) : r && i.text() == "Polylines" ? o = this.readPolylineStyle(n) : i.text() == "Points" && (r ? o = this.readPointStyle(n) : o = this.readModelTag(e)), s != null ? (o.altitudeMethod = Number(c(n.children("sx\\:Altitude_Method"))), o.altitudeOffset = Number(c(n.children("sx\\:Altitude")))) : o.altitudeMethod = Number(c(e.children("sx\\:Altitude_Method")));
      if (isNaN(o.altitudeOffset) || o.altitudeOffset == undefined) o.altitudeOffset = 0;
      if (isNaN(o.altitudeMethod) || o.altitudeMethod == undefined) o.altitudeMethod = TerraExplorer.internal.TEPosition.ATC_TERRAIN_ABSOLUTE;
      return o
    }, p.prototype.readPolygonStyle = function (t) {
      var n = !0,
        r = Number(c(t.children("sx\\:Line_Width")));
      isNaN(r) && (r = Number(c(t.find("width"))), n = !1), r < 1 && (r = 1);
      var i, s, o, u, a;
      if (n) var f = e(t).find("s"),
        l = {
          polygon: {
            outlineColor: this.readClassification(t, "sx:Line_Color"),
            outlineWidth: r,
            fill: Number(c(t.children("sx\\:Fill_Opacity"))),
            outline: Number(c(t.children("sx\\:Line_Opacity"))),
            material: this.readClassification(t, "sx:Fill_Color"),
            fromKml: !0
          }
        };
      else var s = c(t.find("LineStyle").children("width")),
        i = c(t.find("LineStyle").children("color"), !0),
        a = c(t.find("PolyStyle").children("color")),
        o = Number(c(t.find("PolyStyle").children("fill"))),
        u = Number(c(t.find("PolyStyle").children("outline"))),
        l = {
          polygon: {
            outlineColor: i,
            outlineWidth: s,
            fill: o,
            outline: u,
            material: a
          }
        };
      return l
    }, p.prototype.readPolylineStyle = function (e) {
      var t = !0,
        n = Number(c(e.children("sx\\:Line_Width")));
      isNaN(n) && (n = Number(c(e.find("LineStyle").children("width"))), t = !1), n < 0 ? n = Math.abs(n) : n == 0 ? n = 1 : n = 1;
      var r;
      if (t) {
        r = this.readClassification(e, "sx:Line_Color");
        var i = this.readClassification(e, "sx:Extend_to_Ground"),
          s = this.readClassification(e, "sx:Fill_Color"),
          o = this.readClassification(e, "sx:Fill_Opacity")
      } else r = c(e.find("LineStyle").children("color"), !0);
      var u = {
        polyline: {
          material: r,
          width: n,
          extendToGround: i,
          fillColor: s,
          wallAlpha: o
        }
      };
      return u
    }, p.prototype.readClassification = function (t, n) {
      var r = n.toLowerCase().indexOf("color") != -1,
        i = {},
        s = e.grep(t.children(), function (e) {
          return e.nodeName == n
        });
      if (s != undefined) {
        if (r) var o = e(s);
        s = c(e(s));
        if (s == undefined) return undefined;
        s.indexOf("Classification") == -1 ? i.defaultValue = r ? c(o, !0) : s : (i.classificationArray = [], e(s).find("Class").each(function (t, n) {
          var s = c(e(n).children("condition")),
            o = r ? c(e(n).children("value"), !0) : c(e(n).children("value"), !1);
          i.classificationArray[s] = o
        }), i.defaultValue = r ? c(e(s).find("defaultValue"), !0) : c(e(s).find("defaultValue"), !1))
      }
      return i
    }, p.prototype.readFeatureLayerLabelStyle = function (e) {
      var t = this.readClassification(e, "sx:Scale"),
        n = this.readClassification(e, "sx:Text_Color"),
        r = this.readClassification(e, "sx:Min._Viewing_Height"),
        i = this.readClassification(e, "sx:Limit_Growth"),
        s = this.readClassification(e, "sx:Text_Size"),
        o = this.readClassification(e, "sx:Font"),
        u = this.readClassification(e, "sx:Background_Color"),
        a = this.readClassification(e, "sx:Background_Opacity"),
        f = this.readClassification(e, "sx:Italic"),
        l = this.readClassification(e, "sx:Bold"),
        h = this.readClassification(e, "sx:Underline"),
        p = this.readClassification(e, "sx:Image_file"),
        d = this.readClassification(e, "sx:Text_Relative_to_Image"),
        v = this.readClassification(e, "sx:Show_Text"),
        m = this.readClassification(e, "sx:Text_Alignment"),
        g = {
          label: {
            text: c(e.children("sx\\:Text")),
            scaleMPP: t,
            fillColor: n,
            scaleByDistance: new Cesium.NearFarScalar(150, 1, 8e6, 0),
            minViewingHeight: r,
            font: s,
            family: o,
            backgroundColor: u,
            backgroundOpacity: a,
            italic: f,
            bold: l,
            underline: undefined,
            limitGrowth: i,
            imageFile: p,
            textRelativeToImage: d,
            showText: v,
            textAlignment: m
          }
        };
      return g
    }, p.prototype.readPointStyle = function (e) {
      var t = e.children("IconStyle");
      if (t.length > 0) return this.readIconStyle(t, !1);
      var n = e.children("LabelStyle");
      if (n.length > 0) return this.readLabelStyle(n);
      var r = e.children("sx\\:Image_file") || e.children("sx\\:image_file"),
        i = e.children("sx\\:Text");
      return r.length > 0 && i.length == 0 ? this.readIconStyle(e, !0) : i.length > 0 ? this.readFeatureLayerLabelStyle(e) : {}
    }, p.prototype.readModelTag = function (e) {
      var t = e.children("Model");
      if (t.length > 0) {
        var n = {
          model: {
            uri: c(t.children("Link")),
            scale: Cesium.defaultValue(c(t.find("Scale x")), 1),
            heading: Cesium.defaultValue(c(t.find("Orientation heading")), 0),
            pitch: Cesium.defaultValue(c(t.find("Orientation tilt")), 0),
            roll: Cesium.defaultValue(c(t.find("Orientation roll")), 0)
          }
        };
        return n
      }
      return {}
    }, p.prototype.readIconStyle = function (e, t) {
      if (t) var n = this.readClassification(e, "sx:Image_Color"),
        r = this.readClassification(e, "sx:Image_file"),
        i = this.readClassification(e, "sx:Image_Opacity"),
        s = this.readClassification(e, "sx:Min._Viewing_Height"),
        o = this.readClassification(e, "sx:Scale"),
        u = this.readClassification(e, "sx:Limit_Growth"),
        a = {
          billboard: {
            color: c(e.children("sx\\:Image_Color"), !0),
            image: r,
            imageColor: n,
            imageOpacity: i,
            scaleTE: o,
            limitGrowth: u,
            minViewingHeightObj: s
          }
        };
      else var a = {
        billboard: {
          color: c(e.children("color"), !0),
          image: c(e.find("Icon href"))
        }
      };
      return a
    }, p.prototype.readLabelStyle = function (e) {
      var t = {
        label: {
          text: c(e.children("sx\\:text")),
          fillColor: c(e.children("color"), !0),
          scale: Number(c(e.children("scale")))
        }
      };
      return t
    }, p.prototype.loadLocations = function (t) {
      var n = e(t).find("Placemark:has(LookAt)"),
        r = this,
        i = this._locations = new Array;
      n.each(function (n, s) {
        var o = e(s),
          u = o.children("LookAt"),
          a = r.findStyle(o, t),
          f = {
            id: o.attr("id"),
            name: o.children("name").text(),
            tePosition: r.tePositionFromCameraOrLookAt(u),
            image: a.length > 0 ? a.find("iconStyle Icon href").text() : undefined
          };
        i.push(f)
      })
    }, p.prototype.tePositionFromCameraOrLookAt = function (e) {
      var t = e.children("range") ? e.children("range").text() : 0,
        n = new r({
          cartesian: Cesium.Cartesian3.fromDegrees(Number(e.children("longitude").text()), Number(e.children("latitude").text()), Number(e.children("altitude").text())),
          headingPitchRange: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(e.children("heading").text()), Cesium.Math.toRadians(-90 + Number(e.children("tilt").text())), Number(t)),
          altitudeType: e.children("altitudeMode").text() == "relativeToGround" ? r.ATC_TERRAIN_RELATIVE : r.ATC_TERRAIN_ABSOLUTE
        });
      return n
    }, p.prototype.loadLayout = function (t) {
      var n = function (e) {
          return e.length > 0 ? e.text() : undefined
        },
        r = function (e) {
          return e.length > 0 ? e.text() === "true" : undefined
        };
      this.depthTestAgainstTerrain = r(e(t).find("sx\\:depthTestAgainstTerrain, depthTestAgainstTerrain")), this.startupProjectKMLParsing = r(e(t).find("sx\\:startupProjectKMLParsing, startupProjectKMLParsing")), this.disableFixedLocalTime = r(e(t).find("sx\\:disableFixedLocalTime, disableFixedLocalTime"));
      var o = n(e(t).find("sx\\:serverUrl, serverUrl"));
      o != undefined && o != "" ? (o.slice(-1) != "/" && (o += "/"), f.connectionUrl = o) : (f.connectionUrl = window.location.protocol + "//" + window.location.host + "/sg/", f.cookieString = "");
      var a = n(e(t).find("sx\\:userName, userName"));
      a != undefined && a != "" ? f.userConnection = a : (f.userConnection = "Guest", f.cookieString = "");
      var c = n(e(t).find("sx\\:password, password"));
      c != undefined && c != "" ? f.passwordConnection = c : (f.passwordConnection = "", f.cookieString = ""), f.saveSettings();
      var h = e(t).find("sx\\:Layout, Layout");
      if (h.length <= 0) return;
      l.Visibility = !0;
      var p = h.find("sx\\:SearchBox, SearchBox");
      if (p.length > 0) {
        var d = r(p.find("visibility"));
        d && (u.Visibility = d);
        var v = n(p.find("sx\\:searchProvider, searchProvider"));
        v && (u.SearchServer = v)
      }
      var m = h.find("sx\\:StatusBar, StatusBar");
      if (m.length > 0) {
        var d = r(m.find("visibility"));
        d != undefined && (s.Visibility = d);
        var g = r(m.find("sx\\:displayLocation, displayLocation"));
        g != undefined && (s.DisplayLocation = g);
        var y = n(m.find("sx\\:copyrightText, copyrightText"));
        y && (s.Copyright = y)
      }
      i.Visibility = !0;
      var b = n(h.find("sx\\:MenuButton sx\\:iconUrl, MenuButton"));
      b && (i.Image = b);
      var w = r(h.find("sx\\:AppMenu sx\\:analysisQueryMenu, AppMenu"));
      w != undefined && (i.ShowQueryTool = w);
      var E = r(h.find("sx\\:AppMenu sx\\:analysisDistanceMenu, AppMenu"));
      E != undefined && (i.ShowAnalysisDistance = E);
      var S = r(h.find("sx\\:AppMenu sx\\:analysisAreaMenu, AppMenu"));
      S != undefined && (i.ShowAnalysisArea = S);
      var x = r(h.find("sx\\:AppMenu sx\\:analysisProfileMenu, AppMenu"));
      x != undefined && (i.ShowAnalysisProfile = x);
      var T = r(h.find("sx\\:AppMenu sx\\:analysisShadowMenu, AppMenu"));
      T != undefined && (i.ShowShadowTool = T);
      var N = r(h.find("sx\\:AppMenu sx\\:layersMenu, AppMenu"));
      N != undefined && (i.ShowLayers = N);
      var C = r(h.find("sx\\:AppMenu sx\\:placesMenu, AppMenu"));
      C != undefined && (i.ShowPlaces = C);
      var k = r(h.find("sx\\:AppMenu sx\\:undergroundMenu, AppMenu"));
      k != undefined && (i.ShowUnderground = k);
      var L = r(h.find("sx\\:AppMenu sx\\:settingsMenu, AppMenu"));
      L != undefined && (i.ShowSettings = L);
      var A = e(t).find("ScreenOverlay");
      if (A.length > 0 && r(A.find("visibility")) == 1) {
        var O = n(A.find("Icon href")),
          M = A.find("overlayXY"),
          _ = A.find("screenXY");
        if (O.length > 0 && M.length > 0 && _.length > 0) {
          var D = M.attr("xunits"),
            P = M.attr("yunits");
          if (D == "fraction" && P == "fraction") {
            var H = M.attr("y"),
              B = _.attr("x"),
              j = _.attr("y"),
              F = e("<img src='" + O + "' style='position:absolute; right:" + B + "px;'/>");
            H == 0 ? F.css({
              top: Number(j)
            }) : F.css({
              bottom: Number(j)
            }), e("body").append(F)
          }
        }
      }
    }, p.prototype.loadRasterLayers = function (t) {
      var n = e(t).find("sx\\:RasterLayer, RasterLayer"),
        r = this._rasterLayers = new Array,
        i = this;
      n.each(function (n, r) {
        var s = e(r),
          o = !1;
        if (r.parentNode.nodeName.indexOf("Terrain") == -1) {
          var u = s.find("sx\\:elevation,elevation");
          u.length > 0 && c(u) != "0" && (o = !0);
          var a = 1,
            f = i.findStyle(s, t);
          if (f.length > 0) {
            var l = i.readPolygonStyle(f);
            a = l && l.polygon && l.polygon.material && l.polygon.material.alpha ? l.polygon.material.alpha : 1
          }
          var h = undefined,
            p = s.find("sx\\:BoundingBox, BoundingBox");
          if (p.length > 0) {
            var d = Math.min(parseFloat(p.children("sx\\:minY").text()), parseFloat(p.children("sx\\:maxY").text())),
              v = Math.max(parseFloat(p.children("sx\\:minY").text()), parseFloat(p.children("sx\\:maxY").text()));
            h = Cesium.Rectangle.fromDegrees(p.children("sx\\:minX").text(), d.toString(), p.children("sx\\:maxX").text(), v.toString())
          }
          var m = s.children("visibility").text(),
            g = s.find("Link href").text(),
            y = i.replaceDomainWithTag(g),
            b = s.find("sx\\:Service,Service"),
            w, E;
          b.length > 0 ? (w = b.text() == "googleEarthEnterprise", E = b.text() == "WMTS") : w = !!s.find("sx\\:googleEarthEnterprise, googleEarthEnterprise").length;
          var S = {
            displayName: s.children("name").text(),
            url: y.url,
            name: w != undefined && w ? s.children("name").text() : s.find("Link sx\\:layerName, layerName").text(),
            visibility: m ? Number(m) : !0,
            alpha: a,
            rectangle: h,
            subdomains: y.subdomains
          };
          w ? S.googleEarthEnterpriseLayer = !0 : E ? S.WMTS = !0 : o && (S.isElevationLayer = !0);
          var x = s.find("sx\\:nullValue,nullValue");
          x.length > 0 && (S.nullValue = c(x, !0).toBytes().toString());
          var T = s.find("sx\\:nullTolerance,nullTolerance");
          T.length > 0 && S.nullValue != undefined && (S.nullTolerance = c(T, !1));
          var N = s.find("sx\\:geometryWKT,geometryWKT"),
            C = S.googleEarthEnterpriseLayer != undefined ? undefined : S.WMTS != undefined ? TerraExplorer.SGWorld.Creator.isLayerLonLat(g, S.name, "WMTS", !1) : TerraExplorer.SGWorld.Creator.isLayerLonLat(g, S.name, "WMS", !1);
          !C && !w ? (i._unsupportedLayers.push(S), S.latLon = !1) : o ? (i._elevationLayers == null && (i._elevationLayers = new Array), i._elevationLayers.push(S)) : i._rasterLayers.push(S)
        }
      })
    }, p.prototype.loadMeshLayers = function (t) {
      var n = e(t).find("sx\\:MeshLayer, MeshLayer"),
        r = this._meshLayers = new Array,
        i = this;
      n.each(function (t, n) {
        var r = e(n),
          s = r.children("visibility").text(),
          o = i.replaceDomainWithTag(r.find("Link href").text());
        if (o.url.indexOf("streamer.ashx") != -1) {
          var u = o.url.replace(/streamer.ashx/g, "b3dm");
          o.url = u
        }
        var a = {
          displayName: r.children("name").text(),
          url: o.url,
          name: r.find("Link sx\\:layerName, layerName").text(),
          visibility: s ? h(s) : !0,
          subdomains: o.subdomains
        };
        i._meshLayers.push(a)
      })
    }, p.prototype.loadCPTLayers = function (t) {
      var n = e(t).find("sx\\:PointCloud, PointCloud"),
        r = this._cptLayers = new Array,
        i = this;
      n.each(function (t, n) {
        var r = e(n),
          s = i.replaceDomainWithTag(r.find("Link href").text());
        if (s.url.indexOf("@") != -1) {
          var o = s.url.split("@"),
            u = o[0];
          u.indexOf(".cpt") && (u = u.replace(".cpt", ""));
          var a = window.location.protocol + "//" + o[1] + "/pnts/" + u;
          s.url = a
        }
        var f = {
          displayName: r.children("name").text(),
          url: s.url,
          name: u,
          visibility: !0,
          subdomains: s.subdomains
        };
        i._cptLayers.push(f)
      })
    }, p.prototype.loadKmlLayers = function (t) {
      var n = e(t).find("NetworkLink");
      this._kmlLayers = new Array;
      for (var r = 0; r < n.length; r++) {
        var i = (new XMLSerializer).serializeToString(n.get(r)),
          s = "<?xml version='1.0' encoding='utf-8'?><kml xmlns='http://www.opengis.net/kml/2.2' xmlns:gx='http://www.google.com/kml/ext/2.2'><Document>" + i + "</Document></kml>";
        this.loadKmlLayer(s)
      }
      n.remove()
    }, p.prototype.loadKmlLayer = function (t, n) {
      var r = e.parseXML(t),
        i = e(r).find("NetworkLink"),
        s = this,
        o = Cesium.createGuid();
      for (var u = 0; u < this._kmlLayers.length; u++)
        if (this._kmlLayers[u].layerSrc == t) {
          o = this._kmlLayers[u].guid, viewer.dataSources.remove(this._kmlLayers[u]), this._kmlLayers.splice(u, 1);
          break
        } viewer.dataSources.add(Cesium.KmlDataSource.load(r, {
        camera: viewer.camera,
        canvas: viewer.canvas
      })).then(function (r) {
        r.layerSrc = t, r.guid = o, r.LayerDisplayName = r.name, r.LayerDisplayName == undefined && (r.LayerDisplayName = e(i).children("name").length > 0 ? e(i).children("name").text() : e(i).find("Link href").text().replace(/^.*[\\\/]/, "")), s._kmlLayers.push(r), n != undefined && (n = r), r.refresh = function () {
          s.loadKmlLayer(this.layerSrc, this)
        }
      })
    }, p.prototype.loadTours = function (t) {
      var n = e(t).find("gx\\:Tour, Tour");
      this._tours = new Array;
      var r = this;
      for (var i = 0; i < n.length; i++) {
        var s = {
            id: e(n[i]).attr("id") || Cesium.createGuid(),
            name: e(n[i]).children("name").length == 1 ? e(n[i]).children("name").text() : "",
            playlist: []
          },
          o = e(n[i]).children("gx\\:Playlist");
        o && o.children().each(function (e, t) {
          if (t.nodeName == "gx:AnimatedUpdate") return;
          t.nodeName == "gx:FlyTo" && s.playlist.push(r.readFlyToTag(t)), t.nodeName == "gx:Wait" && s.playlist.push(r.readWaitTag(t))
        }), this._tours.push(s)
      }
      n.remove()
    }, p.prototype.loadStartPosition = function (t) {
      this._startPosition = null;
      try {
        var n = e(t).find("Document").children().first();
        if (n.length < 1) return;
        if (n[0].nodeName != "LookAt") return;
        var r = {
          id: "StartPosition",
          name: "StartPosition",
          tePosition: this.tePositionFromCameraOrLookAt(n)
        };
        this._startPosition = r
      } catch (i) {}
    }, p.prototype.readFlyToTag = function (t) {
      var n = {
        type: "FlyTo",
        id: e(t).attr("id") || Cesium.createGuid(),
        duration: e(t).children("gx\\:duration").length == 1 ? Number(e(t).children("gx\\:duration").text()) : undefined,
        flyToMode: e(t).children("gx\\:flyToMode").length == 1 ? e(t).children("gx\\:flyToMode").text() : "bounce",
        tePosition: this.tePositionFromCameraOrLookAt(e(t).children("Camera").length > 0 ? e(t).children("Camera") : e(t).children("LookAt"))
      };
      return n
    }, p.prototype.readWaitTag = function (t) {
      var n = {
        type: "Wait",
        duration: e(t).children("gx\\:duration").length == 1 ? Number(e(t).children("gx\\:duration").text()) : undefined
      };
      return n
    }, new p
  }), define("internal/Project", ["jquery", "TELang", "KmlParser", "wfs/Layer", "./Units", "tools/TETools/FavoritesStorage"], function (e, t, n, r, i, s) {
    "use strict";

    function u(t, n) {
      var r = t;
      r.indexOf("{s}") != -1 && n != undefined && (r = r.replace("{s}", n[0])), TerraExplorer.isSkylineGlobeServer(r, function (t, i, s, o, u) {
        if (i == 1 && !Cesium.TrustedServers.contains(r)) {
          var a = t.authority != undefined ? t.authority : t.path.split("/")[0];
          TerraExplorer.trustedSkylineGlobeServers.addTrustedSG(a, s), n != undefined && e(n).each(function (e, t) {
            var n = new Cesium.Uri(t),
              r = n.authority != undefined ? n.authority : n.path.split("/")[0];
            TerraExplorer.trustedSkylineGlobeServers.addTrustedSG(r, s)
          })
        }
      })
    }

    function a(e) {
      return TerraExplorer.browser.isFirefox && e.indexOf("��") == 0 ? e.slice(2).replace(/\0/g, "") : e
    }

    function f(e) {
      var t;
      return e.indexOf("://") > -1 ? t = e.split("/")[2] : t = e.split("/")[0], t = t.split(":")[0], t = t.split("?")[0], t
    }
    var o = function () {
      this._featureLayers = [], this._rasterLayers = [], this._locations = [], this._presentations = [], this._startPosition, this._unsupportedLayers = [], this._cancelCloseAlert = !1, this._wmtsDictionary = {};
      var t = this;
      this._statistics = {
        getNumberOfFeatures: function () {
          var n = 0;
          return e(t._featureLayers).each(function (e, t) {
            n += t.Statistics.getNumberOfCurrentlyRenderedFeatures()
          }), n
        },
        getNumberOfPositions: function () {
          var n = 0;
          return e(t._featureLayers).each(function (e, t) {
            n += t.Statistics.getNumberOfCurrentlyRenderedPositions()
          }), n
        }
      }, this._featureLayers.getLayerContainingFid = function (e) {
        for (var t = 0; t < this.length; t++) {
          var n = this[t].getFeature(e);
          if (n != null) return {
            layer: this[t],
            feature: n.feature
          }
        }
        return null
      }
    };
    return Cesium.defineProperties(o.prototype, {
      FeatureLayers: {
        get: function () {
          return this._featureLayers
        }
      },
      KmlLayers: {
        get: function () {
          return n._kmlLayers
        }
      },
      Locations: {
        get: function () {
          return this._locations
        }
      },
      Presentations: {
        get: function () {
          return this._presentations
        }
      },
      MeshLayers: {
        get: function () {
          var t = e.grep(viewer.scene.primitives._primitives, function (e) {
            return e instanceof Cesium.Cesium3DTileset
          });
          return t
        }
      },
      StartPosition: {
        get: function () {
          return this._startPosition
        }
      },
      Statistics: {
        get: function () {
          return this._statistics
        }
      },
      UnsupportedLayers: {
        get: function () {
          return this._unsupportedLayers
        },
        set: function (e) {
          this._unsupportedLayers = e
        }
      },
      ElevationLayers: {
        get: function () {
          return n.ElevationLayers
        }
      }
    }), o.prototype.load = function (t, n, r) {
      u(r.terrainImageryUrl, r.terrainSubdomainsImagery), u(r.terrainElevationUrl, r.terrainSubdomainsElevation);
      var i = this;
      e.ajax({
        url: t,
        success: function (t) {
          var n;
          typeof t == "string" ? (t = a(t), t.indexOf("xmlns:gx") != -1 ? n = e.parseXML(t) : console.error("Not a valid google-earth string")) : n = t, i.readProject(n)
        },
        complete: n
      })
    }, o.prototype.readLayout = function (e) {
      n.loadConfig(e)
    }, o.prototype.readProject = function (e) {
      n.loadFromData(e), this.createFeatureLayers(n.FeatureLayers), this.createRasterLayers(n.RasterLayers), this.createElevationLayers(n.ElevationLayers), this.createMeshLayers(n.MeshLayers), this.CreatePointCloudModel(n.CPTLayers), this.UnsupportedLayers = n.UnsupportedLayers, this._locations = n.Locations, this._presentations = n.Tours, this._startPosition = n._startPosition, this._startPosition != null && TerraExplorer.internal.Navigate.flyToPosition(this._startPosition.tePosition)
    }, o.prototype.showErrorMessages = function () {
      this.UnsupportedLayers.length > 0 && this.displayUnsupportedLayersMessage()
    }, o.prototype.replaceUrlWithRandomSubdomain = function (e, t) {
      return t == undefined ? e : e.replace("{s}", t ? t[Math.floor(Math.random() * t.length)] : "")
    }, o.prototype.createFeatureLayers = function (t) {
      var n = this;
      e(t).each(function (t, s) {
        var o = n.replaceUrlWithRandomSubdomain(s.url, s.subdomains) + "?REQUEST=GetLayerExBaseInfo" + "&typename=" + s.name;
        u(s.url, s.subdomains);
        var a = s;
        e.ajax({
          dataType: "xml",
          url: o,
          success: function (e) {
            var t = e.getElementsByTagName("BlockWidth");
            if (t.length == 1) {
              var n = parseFloat(t[0].textContent);
              if (n <= 0 || !Cesium.defined(n)) {
                console.log("Layer does not contain a valid blockWidth");
                return
              }
              var r = t[0].attributes[0].value,
                s = i.blockWidthToTeLayerLevel(n);
              a.level = Cesium.Math.clamp(a.level, s - 2, s + 5), a.level <= 2 && (a.level = 3)
            }
          },
          complete: function () {
            if (a.name != "" && a.url != "") {
              var e = new r(viewer, a.url, a.name, a.level, a.style, a.displayName, a.subdomains, a.latLon, a.myLayer);
              e.indexInProjectTree = a.indexInProjectTree, e.setVisibility(a.visibility), e.latLon = a.latLon, n._featureLayers.push(e), a.myLayer != undefined && TerraExplorer.tools.ToolManager._tools.LayersTool.insertMyLayersKey(e)
            }
          }
        })
      })
    }, o.prototype.OpenProjectFromServer = function (e, t) {
      if (t == undefined || e == undefined) return;
      var n = t.split(".").length - 1,
        r = t.split(".")[n],
        i = e + "/projects?id=" + r,
        s = f(e);
      s == window.location.host ? window.open("http://" + window.location.host + "/sg/terraexplorerweb/terraexplorer.html?catalogid=" + r, "_blank") : window.open("http://" + window.location.host + "/sg/terraexplorerweb/terraexplorer.html?kmlUrl=" + i, "_blank")
    }, o.prototype.createElevationLayerFromServer = function (t) {
      var r = this;
      e(t).each(function (e, t) {
        u(t.url, t.subdomains), r.readRasterBBOxFromServer(t, function (e) {
          e.guid = Cesium.createGuid(), n._elevationLayers == null && (n._elevationLayers = new Array), n._elevationLayers.push(e), r.createElevationLayers(r.ElevationLayers), e.myLayer != undefined && TerraExplorer.tools.ToolManager._tools.LayersTool.insertMyLayersKey(e)
        })
      })
    }, o.prototype.createElevationLayers = function (e) {
      e != null && (viewer.terrainProvider._allElevationLayers = e)
    }, o.prototype.createRasterLayers = function (t) {
      var n = this;
      e(t).each(function (r, i) {
        var s = e(t).find("sx\\:BoundingBox, BoundingBox");
        i.rectangle == undefined && i.googleEarthEnterpriseLayer == undefined ? n.readRasterBBOxFromServer(i, n.createRasterLayer) : n.createRasterLayer(i)
      })
    }, o.prototype.createRasterLayer = function (e) {
      u(e.url, e.subdomains);
      var t = {
        transparent: "true",
        format: "image/png"
      };
      e.nullValue != undefined && (t.nullvalue = e.nullValue), e.nullTolerance != undefined && (t.nulltolerance = e.nullTolerance), e.clippingPolygonVertices != undefined && (t.clippingpolygonvertices = e.clippingPolygonVertices);
      var n;
      if (e.googleEarthEnterpriseLayer != undefined) {
        var r = e.url.indexOf("?http"),
          i;
        r > -1 && (i = e.url.substring(0, r), e.url = e.url.substring(r).substring(1));
        var s = new Cesium.GoogleEarthEnterpriseMetadata({
          url: unescape(e.url),
          proxy: i == undefined ? undefined : new Cesium.DefaultProxy(i)
        });
        n = new Cesium.GoogleEarthEnterpriseImageryProvider({
          metadata: s
        })
      } else if (e.WMTS != undefined) {
        var o = this._wmtsDictionary[e.name],
          a = o.identifier,
          f = o.rectangle,
          l = o.tileMatrixLabelsArray,
          c = [];
        for (var h = 1; h <= l.length; h++) c.push(a + ":" + h);
        n = new Cesium.WebMapTileServiceImageryProvider({
          url: e.url,
          layer: e.name,
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: a,
          tileMatrixLabels: c,
          rectangle: f,
          tilingScheme: new Cesium.GeographicTilingScheme
        })
      } else n = new Cesium.WebMapServiceImageryProvider({
        url: e.url,
        layers: e.name,
        rectangle: e.rectangle,
        parameters: t,
        subdomains: e.subdomains
      }), n.latLon = e.latLon, n.rectangle == undefined && (n.rectangle = new Cesium.Rectangle(e.rectangle.west, e.rectangle.south, e.rectangle.east, e.rectangle.north));
      var p = viewer.imageryLayers.addImageryProvider(n);
      p.show = e.visibility, p.alpha = e.alpha, p.displayName = e.displayName, p.name = e.name, p.guid = Cesium.createGuid(), p.myLayer = e.myLayer, p._rectangle = e.rectangle, p.latLon = e.latLon, e.myLayer != undefined && TerraExplorer.tools.ToolManager._tools.LayersTool.insertMyLayersKey(p)
    }, o.prototype.createMeshLayers = function (t) {
      var n = this;
      e(t).each(function (e, t) {
        u(t.url, t.subdomains);
        var n = "";
        Cesium.getExtensionFromUri(t.name) !== "json" && (n = "/");
        var r = t.url.trim();
        r.indexOf(t.name) == -1 && (r += "/" + t.name.trim() + n);
        var i = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: r,
          maximumNumberOfLoadedTiles: TerraExplorer.max3DTiles,
          subdomains: t.subdomains,
          myLayer: t.myLayer
        }));
        i.name = t.name, i.displayName = t.displayName, i.guid = Cesium.createGuid(), i.show = t.visibility, i.type = t.type, t.myLayer != undefined && TerraExplorer.tools.ToolManager._tools.LayersTool.insertMyLayersKey(i)
      })
    }, o.prototype.CreatePointCloudModel = function (t) {
      var n = this;
      e(t).each(function (e, t) {
        u(t.url, t.subdomains);
        var n = "";
        Cesium.getExtensionFromUri(t.name) !== "json" && (n = "/");
        var r = t.url.trim();
        r.indexOf(t.name) == -1 && (r += "/" + t.name.trim() + n);
        var i = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
          url: r,
          subdomains: t.subdomains,
          myLayer: t.myLayer
        }));
        i.name = t.name, i.displayName = t.displayName, i.guid = Cesium.createGuid(), i.show = t.visibility, t.type == undefined && (t.type = "cpt"), i.type = t.type, t.myLayer != undefined && TerraExplorer.tools.ToolManager._tools.LayersTool.insertMyLayersKey(i)
      })
    }, o.prototype.readRasterBBOxFromServer = function (t, n) {
      var r = this.replaceUrlWithRandomSubdomain(t.url, t.subdomains) + "?SERVICE=WMS" + "&REQUEST=GetCapabilities" + "&layers=" + t.name;
      e.ajax({
        dataType: "xml",
        beforeSend: function (e) {
          e.withCredentials = !0
        },
        url: r,
        success: function (e) {
          var r = e.getElementsByTagName("EX_GeographicBoundingBox");
          r.length == 0 ? (r = e.getElementsByTagName("LatLonBoundingBox"), r.length == 0 ? t.rectangle = Cesium.Rectangle.MAX_VALUE : t.rectangle = Cesium.Rectangle.fromDegrees(parseFloat(r[0].attributes.minx.value), parseFloat(r[0].attributes.miny.value), parseFloat(r[0].attributes.maxx.value), parseFloat(r[0].attributes.maxy.value))) : t.rectangle = Cesium.Rectangle.fromDegrees(parseFloat(r[0].getElementsByTagName("westBoundLongitude")[0].textContent), parseFloat(r[0].getElementsByTagName("southBoundLatitude")[0].textContent), parseFloat(r[0].getElementsByTagName("eastBoundLongitude")[0].textContent), parseFloat(r[0].getElementsByTagName("northBoundLatitude")[0].textContent)), n && n(t)
        }
      })
    }, o.prototype.displayUnsupportedLayersMessage = function () {
      var n = this,
        r = t.i18n("UnsupportedLayers_Alert", {
          aTag: "<a href=# style='text-decoration:none;color:rgba(13,194,223,1.0);' onclick='TerraExplorer.internal.Project.displayDetailedUnsupported();'>",
          closedATag: "</a>"
        });
      TerraExplorer.tools.ToolDialog.showAlertDialog(r), e(".toolDialog").css({
        left: "280px",
        top: "93%",
        height: "30px",
        "background-color": "rgba(0,0,0,1.0)",
        width: "430px"
      }), e(".toolDialog .toolDialogLabel").css({
        top: "auto",
        color: "rgba(255,255,255,1.0)",
        "background-color": "rgba(0,0,0,1.0)"
      }).prepend("<img width=12 height=12 style='vertical-align: middle;' src='../terraexplorerweb/img/newDesign/errorIcon.png'/>&nbsp;&nbsp;"), e("#titleTextID").remove(), TerraExplorer.tools.ToolDialog.removeCloseButton(), e(".toolDialog #closeXID").css("visibility", "hidden"), setTimeout(function () {
        n._cancelCloseAlert || e(".toolDialog #closeXID")[0].click()
      }, 1e4)
    }, o.prototype.displayDetailedUnsupported = function () {
      this._cancelCloseAlert = !0;
      var n = t.i18n("UnsupportedLayers_Alert_List") + "<br/><br/>",
        r = this.UnsupportedLayers.length * 20,
        i = 1;
      this.UnsupportedLayers.forEach(function (r) {
        n += r.name != undefined ? i + ") &nbsp;&nbsp;" + r.name + "" + t.i18n("Disabled_Layer") + "<br/><br/>" : i + ") &nbsp;&nbsp;" + (" " + e(r).children("name").text()) + "" + t.i18n("Disabled_Layer") + "<br/><br/>", i++
      }), TerraExplorer.tools.ToolDialog.showAlertDialog(n), e(".toolDialog").css({
        left: "280px",
        top: "90%"
      }), e(".toolDialog").width("550"), e(".toolDialogLabel").width("550");
      var s = Number(e(".toolDialog").css("top").replace("px", ""));
      e(".toolDialog").height(e(".toolDialog").height() + r);
      var o = (s - r - 50).toString() + "px";
      e(".toolDialog").css("top", o), e("#titleTextID").html("Error Messages")
    }, o.prototype.findObjectFromID = function (e) {
      var t = s.getFeatureById(e);
      return t != null ? t : (t = this._featureLayers.getLayerContainingFid(e), t != null ? t : null)
    }, new o
  }), define("internal/CesiumOverrides", ["jquery", "WorkerPool"], function (e, t) {
    "use strict";

    function a() {
      if (!viewer.camera.isMoving) return !0;
      if (TerraExplorer.tilesProcessingLimit > 0) {
        if (u == viewer.scene._frameState.frameNumber) return !1;
        u = viewer.scene._frameState.frameNumber;
        if (viewer.scene._frameState.frameNumber % 5 > 0) return !1
      }
      return !0
    }

    function h(e, t) {
      try {
        viewer.scene._undergroundFloor != null && !viewer.scene._undergroundFloor.isDestroyed() && viewer.scene.primitives.remove(viewer.scene._undergroundFloor);
        var n = e;
        e instanceof Cesium.Cartesian3 && (n = viewer.scene.globe.ellipsoid.cartesianToCartographic(e));
        var r = new Cesium.GeometryInstance({
            geometry: new Cesium.EllipseGeometry({
              center: Cesium.Cartesian3.fromRadians(n.longitude, n.latitude),
              height: n.height,
              semiMinorAxis: 2e5,
              semiMajorAxis: 2e5,
              vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
            }),
            id: "undergroundSurface"
          }),
          i = Cesium.Material.fromType("Grid");
        i.uniforms.color = Cesium.Color.WHITE.withAlpha(.3), i.uniforms.cellAlpha = .001, i.uniforms.lineCount = new Cesium.Cartesian2(2e3, 2e3), i.uniforms.lineThickness = viewer.scene.belowZero ? new Cesium.Cartesian2(1, 1) : new Cesium.Cartesian2(1, 1);
        var s = viewer.scene.primitives.add(new Cesium.Primitive({
          geometryInstances: r,
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: i
          })
        }));
        s.appearance.renderState.depthTest.enabled = t
      } catch (o) {
        console.log(o.message)
      }
      return s
    }

    function d(t, n) {
      if (p > 0) return;
      var r = {
          level: 16,
          callback: undefined,
          pickPrimitive: undefined,
          includeUndergroundSurface: !0
        },
        i = e.extend(!0, {}, r, n),
        s, o;
      try {
        p++, TerraExplorer.optimized_depth_picking = undefined, o = viewer.scene.pick(t), TerraExplorer.optimized_depth_picking = !0
      } catch (u) {
        console.log("Pick error!")
      } finally {
        p--
      }
      var a = i.includeUndergroundSurface && Cesium.defined(o) && Cesium.defined(o.id) && o.id == "undergroundSurface";
      if (Cesium.defined(o) && Cesium.defined(o.primitive) && (!(Cesium.defined(o.primitive.appearance) && o.primitive.appearance instanceof Cesium.PolylineColorAppearance) || a) && viewer.scene.pickPositionSupported) s = viewer.scene.pickPosition(t), i.callback != undefined && i.callback(s);
      else if (TerraExplorer.internal.Navigate.HeightAboveGround < 0 && viewer.scene.pickPositionSupported) s = viewer.scene.pickPosition(t), i.callback != undefined && i.callback(s);
      else {
        var f = viewer.camera.getPickRay(t);
        s = viewer.scene.globe.pick(f, viewer.scene);
        if (i.callback != undefined) {
          var l = viewer.scene.globe.ellipsoid.cartesianToCartographic(s),
            c = Cesium.sampleTerrain(viewer.terrainProvider, i.level, [l]);
          Cesium.when(c, function (e) {
            e[0].height != undefined && (s = viewer.scene.globe.ellipsoid.cartographicToCartesian(e[0])), i.callback(s)
          })
        }
      }
      return n != undefined && o != undefined && (n.pickPrimitive = o.primitive), n != undefined && o != undefined && (n.id = o.id), s
    }

    function v(e, t, n, r) {
      var i = new Cesium.Cartesian3;
      Cesium.Cartesian3.subtract(this.position, e, i);
      var s, o, u = Cesium.defaultValue(n, this.defaultRotateAmount),
        a = Cesium.Quaternion.fromAxisAngle(t, -u, s),
        f = Cesium.Matrix3.fromQuaternion(a, o);
      Cesium.Matrix3.multiplyByVector(f, i, i), Cesium.Matrix3.multiplyByVector(f, this.direction, this.direction), Cesium.Matrix3.multiplyByVector(f, this.up, this.up), Cesium.Matrix3.multiplyByVector(f, this.right, this.right), r != undefined && Cesium.Cartesian3.multiplyByScalar(i, r, i), this.position = Cesium.Cartesian3.add(i, e, this.position)
    }

    function y(e, t, n) {
      var r = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
      };
      if (e.indexOf("nullvalue=") > -1) {
        var i = e.split("nullvalue=")[1].split("&")[0],
          s = i.split("%2C");
        r.r = s[0], r.g = s[1], r.b = s[2]
      }
      if (e.indexOf("nulltolerance=") > -1) var o = e.split("nulltolerance=")[1].split("&")[0];
      var u = new Image,
        a = document.createElement("canvas"),
        f = a.getContext("2d");
      u.url = e, u.onload = function () {
        if (u.url != undefined && u.url.indexOf("nullvalue") != -1) {
          delete u.url, a.width = u.width, a.height = u.height, f.drawImage(u, 0, 0), u.imageProcesses = [];
          var e = u.width / g,
            t = u.height,
            i = 0;
          for (var s = 0; s < g; s++) {
            var l = s * e,
              c = f.getImageData(l, i, e, t).data;
            u.imageProcesses[s] = m.queueWorkItem({
              nullValue: r,
              nullTolerance: o,
              canvasData: c,
              width: e,
              height: t,
              startX: l
            })
          }
          Cesium.when.all(u.imageProcesses, function (e) {
            for (var t = 0; t < e.length; t++) {
              var r = f.createImageData(e[t].width, e[t].height);
              for (var i = 0; i < e[t].canvasData.length; i++) r.data[i] = e[t].canvasData[i];
              f.putImageData(r, e[t].startX, 0)
            }
            u.src = a.toDataURL(), n.resolve(u)
          }).otherwise(function (e) {
            console.log(e)
          })
        } else n.resolve(u)
      }, u.onerror = function (e) {
        n.reject(e)
      }, t && (Cesium.TrustedServers.contains(e) ? u.crossOrigin = "use-credentials" : u.crossOrigin = ""), u.src = e
    }
    var n = function () {};
    n.init = function () {};
    var r = this;
    Cesium.defineProperties(Cesium.Camera.prototype, {
      isMoving: {
        get: function () {
          return this._isMoving == undefined && (this._isMoving = !1, this.moveStart.addEventListener(function () {
            this._isMoving = !0
          }, this), this.moveEnd.addEventListener(function () {
            this._isMoving = !1
          }, this)), this._isMoving
        }
      }
    }), n.WebMapServiceImageryProvider_requestImage = function (e, t, n) {
      function r(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
      }
      var i = Cesium.when.defer(),
        s = 256,
        o = document.createElement("canvas");
      o.width = s, o.height = s;
      var u = o.getContext("2d");
      u.beginPath(), u.rect(0, 0, s, s);
      var a = r(50, 100);
      return u.fillStyle = "rgba(" + a + ", " + a + ", " + a + ", 1.0)", u.fill(), u.strokeStyle = "gray", u.strokeRect(10, 10, s - 20, s - 20), i.resolve(o), i
    };
    var i = Cesium.TrustedServers.contains;
    n.TrustedServers_contains = function (e) {
      try {
        if (TerraExplorer.trustedSkylineGlobeServers.contains(e)) return !0
      } catch (t) {}
      return i(e)
    }, Cesium.TrustedServers.contains = n.TrustedServers_contains;
    var s = Cesium.Cesium3DTileset.prototype,
      o = Cesium.Cesium3DTileset;
    Cesium.Cesium3DTileset = function (e) {
      e.maximumMemoryUsage = TerraExplorer._3dTilesetMaximumMemoryUsage, e.maximumScreenSpaceError = TerraExplorer._3dTilesetMaximumScreenSpaceError, this._subdomains = e.subdomains, o.call(this, e)
    }, Cesium.Cesium3DTileset.prototype = s, Cesium.Cesium3DTileset.useSubDomains = !0, Cesium.Cesium3DTileset.b3dmDebugFreezeFrame = !1, Cesium.Cesium3DTileset.prototype.buildURL = function (e, t) {
      var n = function (e) {
        return Math.abs(e.split("").reduce(function (e, t) {
          return e = (e << 5) - e + t.charCodeAt(0), e & e
        }, 0))
      };
      if (t == undefined) return e;
      var r = e.split("{s}");
      if (r.length == 1) return e;
      var i = r[1],
        s = n(i) % t.length;
      return e.replace("{s}", t[s])
    }, Cesium.defineProperties(Cesium.Cesium3DTile.prototype, {
      hierarchyLevel: {
        get: function () {
          if (this._hierarchyLevel == undefined) {
            this._hierarchyLevel = 0;
            var e = this;
            while (e.parent) e.parent.hasTilesetContent || this._hierarchyLevel++, e = e.parent
          }
          return this._hierarchyLevel
        }
      }
    }), Cesium.Cesium3DTile.prototype.isAncestor = function (e) {
      while (e.parent) {
        if (e.parent == this) return !0;
        e = e.parent
      }
      return !1
    }, Cesium.Cesium3DTile.prototype.isDescendantOf = function (e) {
      if (e instanceof Array) {
        for (var t = 0; t < e.length; t++)
          if (e[t].isAncestor(this)) return t
      } else if (e.isAncestor(this)) return 0;
      return -1
    };
    var u = 0;
    Cesium.Cesium3DTile.prototype.canRequestContent = function () {
      return viewer.camera.isMoving && !a() ? !1 : Cesium.defined(this._requestServer) ? this._requestServer.hasAvailableRequests() : !0
    };
    var f = Uint32Array.BYTES_PER_ELEMENT;
    n.Batched3DModel3DTileContent_initialize = function (e, t) {
      var n = Cesium.defaultValue(t, 0);
      t = n;
      var r = new Uint8Array(e),
        i = Cesium.getMagic(r, t);
      if (i !== "b3dm") throw new Cesium.DeveloperError("Invalid Batched 3D Model.  Expected magic=b3dm.  Read magic=" + i);
      var s = new DataView(e);
      t += f, t += f;
      var o = s.getUint32(t, !0);
      t += f;
      var u = s.getUint32(t, !0);
      this._featuresLength = u, t += f;
      var a = new Cesium.Cesium3DTileBatchTableResources(this, u);
      this.batchTableResources = a;
      var l = s.getUint32(t, !0);
      t += f;
      if (l > 0) {
        var c = Cesium.getStringFromTypedArray(r, t, l);
        t += l, a.batchTable = JSON.parse(c)
      }
      var h = n + o - t,
        p = new Uint8Array(e, t, h),
        d = new Cesium.Model({
          gltf: p,
          cull: !1,
          releaseGltfJson: !0,
          vertexShaderLoaded: a.getVertexShaderCallback(),
          fragmentShaderLoaded: a.getFragmentShaderCallback(),
          uniformMapLoaded: a.getUniformMapCallback(),
          pickVertexShaderLoaded: a.getPickVertexShaderCallback(),
          pickFragmentShaderLoaded: a.getPickFragmentShaderCallback(),
          pickUniformMapLoaded: a.getPickUniformMapCallback(),
          basePath: this.buildURL(this._tileset._subdomains),
          incrementallyLoadTextures: !1
        });
      this._model = d, this.state = Cesium.Cesium3DTileContentState.PROCESSING, this._contentReadyToProcessPromise.resolve(this);
      var v = this;
      d.readyPromise.then(function (e) {
        v.state = Cesium.Cesium3DTileContentState.READY, v._readyPromise.resolve(v)
      }).otherwise(function (e) {
        v.state = Cesium.Cesium3DTileContentState.FAILED, v._readyPromise.reject(e)
      })
    }, n.Batched3DModel3DTileContent_request = function () {
      var e = this,
        t = this._tile.distanceToCamera,
        n = Cesium.RequestScheduler.schedule(new Cesium.Request({
          url: this.buildURL(this._tileset._subdomains),
          server: this._tile.requestServer,
          requestFunction: Cesium.loadArrayBuffer,
          type: Cesium.RequestType.TILES3D,
          distance: t,
          defer: !0
        }));
      if (Cesium.defined(n)) return this.state = Cesium.Cesium3DTileContentState.LOADING, n.then(function (t) {
        if (e.isDestroyed()) return Cesium.when.reject("tileset is destroyed");
        e.initialize(t)
      }).otherwise(function (t) {
        e.state = Cesium.Cesium3DTileContentState.FAILED, e._readyPromise.reject(t)
      }), !0
    }, Cesium.Batched3DModel3DTileContent.prototype.request = n.Batched3DModel3DTileContent_request;
    var l = Cesium.GlobeSurfaceTileProvider.prototype.beginUpdate;
    n.GlobeSurfaceTileProvider_beginUpdate = function (e) {
      l.call(this, e), Cesium.defined(this._renderState) && (this._renderState.cull.enabled = !viewer.scene.showUndergroundSurface)
    }, Cesium.GlobeSurfaceTileProvider.prototype.beginUpdate = n.GlobeSurfaceTileProvider_beginUpdate;
    var c = Cesium.QuadtreePrimitive.prototype.beginFrame;
    n.QuadtreePrimitive_beginFrame = function (e) {
      c.call(this, e), this._cameraMoving == undefined && (viewer.loadQueueTimeSliceWhileMoving = 1, this._cameraMoving = !1, viewer.camera.moveEnd.addEventListener(function () {
        this._cameraMoving = !1, this._loadQueueTimeSlice = 5
      }, this), viewer.camera.moveStart.addEventListener(function () {
        this._cameraMoving = !0, this._loadQueueTimeSlice = viewer.loadQueueTimeSliceWhileMoving
      }, this))
    }, Cesium.QuadtreePrimitive.prototype.beginFrame = n.QuadtreePrimitive_beginFrame, Cesium.defineProperties(Cesium.Scene.prototype, {
      belowZero: {
        get: function () {
          return this._belowZero
        },
        set: function (e) {
          this._belowZero = e
        }
      },
      undergroundSurfaceHeight: {
        get: function () {
          return -1e3
        }
      },
      showUndergroundSurface: {
        get: function () {
          try {
            var e = viewer.scene,
              t = e.undergroundMode && TerraExplorer.internal.Navigate.HeightAboveGround < 2e3;
            e.skyAtmosphere.show = !t, e.screenSpaceCameraController.enableCollisionDetection = !t;
            var n = window.TerraExplorer == undefined ? 0 : TerraExplorer.internal.Navigate.GroundHeightAtCameraPosition,
              r = viewer.camera.positionCartographic.height;

            function i() {
              e._undergroundFloor != undefined && !e._undergroundFloor.isDestroyed() && (e.primitives.remove(e._undergroundFloor), e._undergroundFloor = null)
            }
            if (e._prevShowUndergroundSurface != t)
              if (e._undergroundFloor && !t && !e._undergroundFloor.isDestroyed()) e.primitives.remove(e._undergroundFloor), e._undergroundFloor = null;
              else if (!e._undergroundFloor && t) {
              i();
              var s = new Cesium.Cartographic(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, e.undergroundSurfaceHeight);
              e._undergroundFloor = h(s, TerraExplorer.internal.Navigate.HeightAboveGround < 0)
            }
            if (e._undergroundFloor && (e._undergroundFloor.appearance.renderState.depthTest.enabled != (r < n && r > 0) || e.belowZero) && r > 0) {
              i();
              var s = new Cesium.Cartographic(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, 0);
              e.belowZero = !1, e._undergroundFloor = h(s, r < n && r > 0)
            }
            if (e.undergroundMode && !e.belowZero && viewer.camera.positionCartographic.height < 0) {
              i();
              var s = new Cesium.Cartographic(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, -1e3);
              e.belowZero = !0, e._undergroundFloor = h(s, viewer.camera.positionCartographic.height < 0)
            }
            e._prevShowUndergroundSurface = t
          } catch (o) {
            console.log(o.message)
          }
          return t
        }
      },
      undergroundMode: {
        get: function () {
          return this._undergroundMode == undefined && (this._undergroundMode = !1), this._undergroundMode
        },
        set: function (e) {
          this._undergroundMode = e, viewer.scene.globe._surface.invalidateAllTiles()
        }
      },
      allowDepthPicking: {
        get: function () {
          return !Cesium.defined(window.TerraExplorer) || Cesium.defined(window.TerraExplorer) && !Cesium.defined(window.TerraExplorer.optimized_depth_picking) ? this._environmentState.useGlobeDepthFramebuffer && this.useDepthPicking : this.useDepthPicking ? this.frameState.passes.pick : !1
        }
      }
    });
    var p = 0;
    Cesium.Scene.prototype.screenToWorld = d, Cesium.Camera.prototype.rotateAroundPoint = v;
    var m = new t({
        workerPath: "./static/te4w/internal/nullValueRemoveWorker.js"
      }),
      g = 8;
    return Cesium.loadImage.createImage = y, n
  }), define("internal/Tests", ["jquery"], function (e) {
    "use strict";

    function o(e, t, n) {
      var r = u(e, t),
        i;
      r ? i = "Text copied to the clipboard." : i = "Copy not supported or blocked.  Press Ctrl+c to copy.", setTimeout(function () {
        i = ""
      }, 2e3)
    }

    function u(e, t) {
      var n = "_hiddenCopyText_",
        r = t.tagName === "INPUT" || t.tagName === "TEXTAREA",
        i, s, o;
      if (r) o = t, i = t.selectionStart, s = t.selectionEnd;
      else {
        o = document.getElementById(n);
        if (!o) {
          var o = document.createElement("textarea");
          o.style.position = "absolute", o.style.left = "-9999px", o.style.top = "0", o.id = n, document.body.appendChild(o)
        }
        for (var u = 0; u < t.children[0].childElementCount; u++) o.textContent += e.children[0].children[u].textContent + t.children[0].children[u].textContent, o.textContent += String.fromCharCode(13)
      }
      var a = document.activeElement;
      o.focus(), o.setSelectionRange(0, o.value.length);
      var f;
      try {
        f = document.execCommand("copy")
      } catch (l) {
        f = !1
      }
      return a && typeof a.focus == "function" && a.focus(), r ? t.setSelectionRange(i, s) : o.textContent = "", f
    }
    var t = 0,
      n = -1,
      r, i = function () {
        this._fps = 0, this._prevOnFrameTime = 0
      };
    Cesium.defineProperties(i.prototype, {
      fps: {
        get: function () {
          return this._fps
        }
      }
    }), i.prototype.init = function () {
      var e = TerraExplorer.getUrlParameters().test || 0;
      e == 1 && this.showConsole()
    };
    var s = !1;
    return i.prototype.showConsole = function () {
      var t = e("<div id='WrapperDiv' style='position:absolute; left:5px; top:5px; opacity:1.0; width:600px; height:267px; background-color: rgba(255, 255, 255, 1.0); font-size: 13px;'>				<div id='Titles' style='position:absolute; width:600px;'>				<table id='titles-row'>					<tr id='a' style='textAlign:center; padding-right:20px; padding-left:10px; display:table-cell;'><th> FPS </th></tr>					<tr id='b' style='textAlign:center; padding-right:20px; display:table-cell;'><th> Sharpen Time<br>(Seconds) </th></tr>					<tr id='c' style='textAlign:center; padding-right:20px; display:table-cell;'><th> Memory<br>(MB) </th></tr>					<tr id='d' style='textAlign:center; padding-right:20px; display:table-cell;'><th> Number Of<br>Features </th></tr>					<tr id='e' style='textAlign:center; padding-right:22px; display:table-cell;'><th> Added<br>Features </th></tr>					<tr id='f' style='textAlign:center; padding-right:28px; display:table-cell;'><th> Number Of<br>Vertices </th></tr>					<tr id='g' style='textAlign:center; padding-right:2px; display:table-cell;'><th> Added<br>Vertices </th></tr>				</table>				</div>				<div id='TestDiv' style='position:absolute; top:45px; opacity: 1.0; border:2px; width:600px; height:175px; display:none; background-color: rgba(255, 255, 255, 1.0); overflow-y:scroll; border-top: 1px solid rgba(200, 200, 200, 1.0); border-bottom: 1px solid rgba(200, 200, 200, 1.0);'>				<table id='row'>					<tr id='left' align='center' style='display:table-cell; width:50px;'></tr>					<tr id='middle1' align='center' style='width:100px; display:table-cell;'></tr>					<tr id='middle2' align='center' style='width:85px; display:table-cell;'></tr>					<tr id='middle3' align='center' style='width:85px; display:table-cell;'></tr>					<tr id='middle4' align='center' style='width:80px; display:table-cell;'></tr>					<tr id='middle5' align='center' style='width:100px; display:table-cell;'></tr>					<tr id='right' align='center' style='width:80px; display:table-cell;'></tr>				</table>				</div>				<button id='copyButton2' style='position:absolute; bottom:10px; left:10px; border:none; color:white; background-color: #008CBA; padding: 6px 6px; cursor:pointer;'>Copy To Clipboard</button>				<button id='pauseButton' style='position:absolute; bottom:10px; left:140px; border:none; color:white; background-color: #008CBA; padding: 6px 6px; cursor:pointer;'>Stop Monitor</button>				<div id='logo' style='position:absolute; bottom:3px; right:10px;'><img src='img/QA_Logo.png' alt='QAlogo' height='30'></div>				</div>").disableSelection();
      e("#mainContainer").append(t), e("#TestDiv").show(), document.getElementById("copyButton2").addEventListener("click", function () {
        o(document.getElementById("titles-row"), document.getElementById("row"), "msg")
      }), document.getElementById("pauseButton").addEventListener("click", function () {
        s = !s, document.getElementById("pauseButton").textContent = s ? "Start Monitor" : "Stop Monitor"
      });
      var n = 0;
      TerraExplorer.internal.Tests.StartMonitor();
      var r = 1e3,
        i = 0,
        u = 0,
        a = 0;
      setInterval(function () {
        if (s) return;
        i += r / 1e3;
        var e = document.createElement("tr"),
          t = document.getElementById("left").appendChild(e),
          o = document.createElement("td"),
          f = e.appendChild(o);
        f.innerHTML = TerraExplorer.internal.Tests.fps.toFixed(1) + " ", TerraExplorer.internal.Tests.fps < 30 && (f.style.backgroundColor = "red");
        var l = document.createElement("tr"),
          c = document.getElementById("middle1").appendChild(l),
          h = document.createElement("td"),
          p = l.appendChild(h);
        TerraExplorer.internal.StatusBar.isBuffering() ? (p.innerHTML = n + " ", n++) : n > 0 ? (p.innerHTML = n + " ", n = 0) : p.innerHTML = "0 ";
        var d = document.createElement("tr"),
          v = document.getElementById("middle2").appendChild(d),
          m = document.createElement("td"),
          g = d.appendChild(m);
        typeof InstallTrigger == "undefined" ? g.innerHTML = (performance.memory.usedJSHeapSize / 1048576).toFixed(1) + " " : g.innerHTML = "N/A ";
        var y = document.createElement("tr"),
          b = document.getElementById("middle3").appendChild(y),
          w = document.createElement("td"),
          E = y.appendChild(w);
        E.innerHTML = TerraExplorer.internal.Project.Statistics.getNumberOfFeatures() + " ";
        var S = document.createElement("tr"),
          x = document.getElementById("middle4").appendChild(S),
          T = document.createElement("td"),
          N = S.appendChild(T);
        N.innerHTML = TerraExplorer.internal.Project.Statistics.getNumberOfFeatures() - u + " ", u = TerraExplorer.internal.Project.Statistics.getNumberOfFeatures();
        var C = document.createElement("tr"),
          k = document.getElementById("middle5").appendChild(C),
          L = document.createElement("td"),
          A = C.appendChild(L);
        A.innerHTML = TerraExplorer.internal.Project.Statistics.getNumberOfPositions() + " ";
        var O = document.createElement("tr"),
          M = document.getElementById("right").appendChild(O),
          _ = document.createElement("td"),
          D = O.appendChild(_);
        D.innerHTML = TerraExplorer.internal.Project.Statistics.getNumberOfPositions() - a + " ", a = TerraExplorer.internal.Project.Statistics.getNumberOfPositions();
        var P = document.getElementById("TestDiv");
        P.scrollTop = P.scrollHeight
      }, r)
    }, i.prototype.StartMonitor = function () {
      if (n != -1) return;
      t = 0, r = Date.now(), viewer.scene.preRender.addEventListener(this.onPreFrame, this), n = setInterval(e.proxy(this.onTimer, this), 250)
    }, i.prototype.StopMonitor = function () {
      if (n == -1) return;
      viewer.scene.preRender.removeEventListener(this.onPreFrame, this), clearInterval(n), this._fps = 0, t = 0, n = -1
    }, i.prototype.onPreFrame = function (e, n) {
      t++
    }, i.prototype.onTimer = function () {
      var e = Date.now(),
        n = (e - r) / 1e3;
      r = e, this._fps = t / n, t = 0
    }, new i
  }), define("internal/internal", ["./SearchBox", "./NavigationControl", "./StatusBar", "./DebugInfo", "./Units", "wfs/Layer", "sfsterrainprovider/SFSTerrainProvider", "./Project", "tools/TETools/FavoritesStorage", "./GeometryHelper", "./Navigate", "./CesiumOverrides", "./FixedLocalTime", "./Settings", "./Tests", "./TEPosition", "./Presentation"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m) {
    "use strict";
    var g = {};
    return g.SearchBox = e, g.NavigationControl = t, g.StatusBar = n, g.DebugInfo = r, g.Units = i, g.WFSLayer = s, g.SFSTerrainProvider = o, g.Project = u, g.Navigate = l, g.CesiumOverrides = c, g.FixedLocalTime = h, g.Settings = p, g.Tests = d, g.TEPosition = v, g.Presentation = m, g
  }), define("SGWorld/Creator", ["jquery", "TELang", "../tools/ToolDialog", "../internal/Units", "KmlParser", "../internal/Settings"], function (e, t, n, r, i, s) {
    "use strict";

    function a(e) {
      var t = e.slice(0, 5);
      return t == "https" ? !0 : !1
    }

    function f(t, n) {
      var r = !1;
      if (t.indexOf("streamer.ashx") != -1) {
        var i = t.replace(/streamer.ashx/g, "pnts");
        t = i
      }
      return t += "/" + n + "/tileset.json", e.ajax({
        url: encodeURI(t),
        xhrFields: {
          withCredentials: !0
        },
        success: function (e) {
          e.root != undefined ? r = !0 : r = !1
        },
        error: function () {
          r = !1
        },
        async: !1
      }), r
    }
    var o = function () {
        this._Msg_LayerFromNonSecuredServer = t.i18n("Msg_LayerFromNonSecuredServer"), this._Msg_NonLatLonLayer = t.i18n("non_LatLon_Layer"), this._Msg_CPTHasNoDefaultLocation = t.i18n("CPT_No_defaultLocation_Notification"), this._isElevationLayer = !1
      },
      u = this;
    return o.prototype.isLayerLonLat = function (t, n, r, i) {
      var s = r;
      if (s == "WMTS") var o;
      var u, a, f = this;
      return s == "WFS" ? u = t + "?SERVICE=" + s + "&VERSION=1.0.0" + "&REQUEST=GetCapabilities" + "&outputFormat=GML2" + "&typeName=" + n : s == "WMS" ? u = t + "?SERVICE=" + s + "&REQUEST=GetCapabilities" + "&layers=" + n : s == "WMTS" && (u = t + "?SERVICE=" + s + "&REQUEST=GetCapabilities" + "&layer=" + n), e.ajax({
        dataType: "xml",
        xhrFields: {
          withCredentials: i == undefined ? !0 : !1
        },
        url: encodeURI(u),
        success: function (t) {
          var r = e(t).find("CRS");
          if (r.length == 0) {
            r = e(t).find("SRS");
            if (r.length == 0 && s == "WMTS") {
              var i = e(t).find("contents,contents");
              if (i.length > 0) {
                var o = i.find("tilematrixset,tilematrixset");
                if (o.length > 0) var u = e.grep(o, function (t) {
                  return e(t).children().length > 0
                });
                var f = e(u).children(),
                  l = e.grep(f, function (e) {
                    return e.tagName == "ows:SupportedCRS"
                  });
                if (l != undefined && e(l).text().indexOf("EPSG:4326") > -1) {
                  a = !0;
                  var c = e.grep(f, function (e) {
                    return e.tagName == "ows:Identifier"
                  });
                  if (c != undefined) var h = e(c).text();
                  var p = [],
                    d = e(u).find("tilematrix,tilematrix"),
                    v = i.find("ows\\:wgs84boundingbox,ows\\:wgs84boundingbox");
                  if (v.length > 0) var m = e(v[0]),
                    g = m.find("ows\\:LowerCorner,ows\\:LowerCorner").text(),
                    y = m.find("ows\\:UpperCorner,ows\\:UpperCorner").text(),
                    b = Cesium.Math.toRadians(Number(g.split(" ")[0])),
                    w = Cesium.Math.toRadians(Number(g.split(" ")[1])),
                    E = Cesium.Math.toRadians(Number(y.split(" ")[0])),
                    S = Cesium.Math.toRadians(Number(y.split(" ")[1])),
                    x = new Cesium.Rectangle(b, w, E, S);
                  var T = {
                    identifier: h,
                    tileMatrixLabelsArray: d,
                    rectangle: x
                  };
                  TerraExplorer.internal.Project._wmtsDictionary[n] = T;
                  return
                }
              }
            }
            if (r.length == 0) {
              a = !1;
              return
            }
          }
          e.each(r, function (e, t) {
            if (t.innerHTML == "EPSG:4326") return a = !0, !1
          }), a == undefined && (a = !1)
        },
        error: function () {
          console.error("!!")
        },
        async: !1
      }), a
    }, o.prototype.CreateFeatureLayer = function (e, t, n, s, o, u) {
      var f = !1,
        l;
      (l = t.indexOf("_FromStorage")) != -1 && (t = t.slice(0, l), f = !0);
      if (a(window.location.protocol) && !a(t)) {
        TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_LayerFromNonSecuredServer);
        return
      }
      var c = null,
        h = s,
        p;
      t.indexOf("streamer.ashx") == -1 ? p = t + "/streamer.ashx" : p = t;
      var d = this.isLayerLonLat(p, n, "WFS");
      !d && !f && (TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_NonLatLonLayer), o = 1);
      var v = i.replaceDomainWithTag(p),
        m = {
          url: v.url,
          name: n,
          displayName: e,
          visibility: !0,
          style: c,
          level: r.blockWidthToTeLayerLevel(0),
          myLayer: u,
          type: h,
          latLon: d,
          subdomains: v.subdomains
        };
      if (m.latLon != undefined && m.latLon == 0) return;
      o == 0 ? TerraExplorer.tools.ToolManager._tools.EditLayersTool.firstStyleLayer(m) : (m.style = o, TerraExplorer.internal.Project.createFeatureLayers(m))
    }, o.prototype.CreateMeshLayerFromSFS = function (e, t, n, r) {
      if (a(window.location.protocol) && !a(t)) {
        TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_LayerFromNonSecuredServer);
        return
      }
      var s = i.replaceDomainWithTag(t),
        o = "mesh";
      if (s.url.indexOf("streamer.ashx") != -1) {
        var u = s.url.replace(/streamer.ashx/g, "b3dm");
        s.url = u
      }
      var f = {
        url: s.url,
        name: n,
        displayName: e,
        visibility: !0,
        myLayer: r,
        type: o,
        subdomains: s.subdomains
      };
      TerraExplorer.internal.Project.createMeshLayers(f)
    }, o.prototype.CreateElevationLayer = function (e, t, n, r) {
      this._isElevationLayer = !0, this.CreateImageryLayer(e, t, n, r)
    }, o.prototype.CreateImageryLayer = function (e, t, n, r) {
      var s = !1,
        o;
      (o = t.indexOf("_FromStorage")) != -1 && (t = t.slice(0, o), s = !0);
      if (a(window.location.protocol) && !a(t)) {
        TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_LayerFromNonSecuredServer);
        return
      }
      var u = "imagery";
      t.indexOf("/streamer.ashx") == -1 && (t += "/streamer.ashx");
      var f = this.isLayerLonLat(t, n, "WMS");
      !f && !s && TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_NonLatLonLayer);
      var l = i.replaceDomainWithTag(t),
        c = {
          url: l.url,
          name: n,
          displayName: e,
          visibility: 1,
          myLayer: r,
          type: u,
          alpha: 1,
          subdomains: l.subdomains,
          latLon: f
        };
      if (c.latLon != undefined && c.latLon == 0) return;
      this._isElevationLayer ? (c.isElevationLayer = this._isElevationLayer, c.type = "elevation", this._isElevationLayer = !1, TerraExplorer.internal.Project.createElevationLayerFromServer(c)) : TerraExplorer.internal.Project.createRasterLayers(c)
    }, o.prototype.CreatePointCloudModel = function (e, t, n, r) {
      if (a(window.location.protocol) && !a(t)) {
        TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_LayerFromNonSecuredServer);
        return
      }
      r == undefined && (r = !0);
      if (!f(t, n)) {
        TerraExplorer.tools.ToolDialog.showAlertDialog(this._Msg_CPTHasNoDefaultLocation);
        return
      }
      var s = i.replaceDomainWithTag(t),
        o = "cpt";
      if (s.url.indexOf("streamer.ashx") != -1) {
        var u = s.url.replace(/streamer.ashx/g, "pnts");
        s.url = u
      }
      var l = {
        url: s.url,
        name: n,
        displayName: e,
        visibility: !0,
        myLayer: r,
        type: o,
        subdomains: s.subdomains
      };
      TerraExplorer.internal.Project.CreatePointCloudModel(l)
    }, new o
  }), define("SGWorld/SGWorld", ["../jquery", "../TELang", "./Creator"], function (e, t, n) {
    "use strict";
    var r = {};
    return r.Creator = n, r
  }), define("TerraExplorer", ["jquery", "./flot/jquery.flot.min", "./tools/TETools/FavoritesStorage", "./internal/GeometryHelper", "./tools/tools", "./internal/internal", "./SGWorld/SGWorld", "./tools/TETools/LayersStorage"], function (e, t, n, r, i, s, o, u) {
    "use strict";

    function a(t) {
      var n = t.getUrlParameters().debug || 0;
      if (n == 1) {
        viewer.scene.debugShowFramesPerSecond = !0;
        var r = function (t, n) {
          e(viewer.scene._performanceContainer).css({
            top: 65
          }), viewer.scene.postRender.removeEventListener(r)
        };
        viewer.scene.postRender.addEventListener(r)
      }
      n == 2 && (viewer.extend(Cesium.viewerCesiumInspectorMixin), e(viewer.cesiumInspector._container).css({
        top: 65
      })), n == 3 && viewer.extend(Cesium.viewerPerformanceWatchdogMixin, {
        lowFrameRateMessage: "This application appears to be performing poorly on your system.  Please try using a different web browser or updating your video drivers."
      }), l._3dTilesetMaximumMemoryUsage = t.getUrlParameters().max3DTSMemory, l._3dTilesetMaximumMemoryUsage && (l._3dTilesetMaximumMemoryUsage = parseInt(l._3dTilesetMaximumMemoryUsage)), l._3dTilesetMaximumScreenSpaceError = t.getUrlParameters().max3DTSSSE, l._3dTilesetMaximumScreenSpaceError && (l._3dTilesetMaximumScreenSpaceError = parseInt(l._3dTilesetMaximumScreenSpaceError))
    }

    function f(t) {
      var n = t.getUrlParameters().scale || 1;
      if (n != 1 && n >= .1 && n <= 5) {
        var r = viewer.canvas,
          i = function () {
            r.style.width = "100%", r.style.height = "100%", r.width = r.offsetWidth / n, r.height = r.offsetHeight / n
          };
        e(viewer.canvas.parentElement).resize(i), i()
      }
    }
    var l = {
      Version: "7.0.1.2539",
      getUrlParameters: function () {
        var e = [],
          t, n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for (var r = 0; r < n.length; r++) t = n[r].split("="), e.push(t[0]), e[t[0]] = t[1];
        return e
      },
      init: function () {
        function t() {
          viewer.shadowMap.maximumDistance = 25e3, viewer.shadows = Cesium.ShadowMode.DISABLED, viewer.terrainShadows = Cesium.ShadowMode.DISABLED, viewer.shadowMap.darkness = .5, s.FixedLocalTime.Enable = !0
        }

        function d() {
          return window.mobileAndTabletcheck = function () {
            var e = !1;
            return function (t) {
              if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) e = !0
            }(navigator.userAgent || navigator.vendor || window.opera), e
          }
        }

        function v() {
          var e = {};
          return e.isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0, e.isFirefox = typeof InstallTrigger != "undefined", e.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0, e.isIE = !!document.documentMode, e.isEdge = !e.isIE && !!window.StyleMedia, e.isChrome = !!window.chrome && !!window.chrome.webstore, e.isBlink = (e.isChrome || e.isOpera) && !!window.CSS, e
        }
        var e = Cesium.WebMapServiceImageryProvider.prototype.requestImage;
        Cesium.WebMapServiceImageryProvider.prototype.requestImage = function (t, n, r) {
          this.pendingRequests = this.pendingRequests || 0;
          var i = e.apply(this, arguments);
          if (i != undefined) {
            this.pendingRequests++;
            var s = this;
            i.then(function () {
              s.pendingRequests--
            }, function () {
              s.pendingRequests--
            })
          }
          return i
        }, Cesium.RequestScheduler.maximumRequestsPerServer = 6, Cesium.RequestScheduler.maximumRequests = 30, Cesium.RequestScheduler.prioritize = !0, viewer.scene.globe.enableLighting = !1, this.optimized_depth_picking = !0, this.browser = v(), this.isTouch = d(), i.ToolManager.registerTools([]), t(), this.tilesProcessingLimit = 4, this.useAggressiveTileDelete = !1;
        var o = typeof InstallTrigger != "undefined",
          l = !!document.documentMode,
          c = !l && !!window.StyleMedia,
          h = o || c;
        this.max3DTiles = h ? 250 : 300;
        var p = [];
        s.Settings.init(), r.init(), s.Units.init(), i.ContextMenu.init(), i.MessageView.init(), n.loadFavoritesLayer(), u.loadLayersFromLocalStorage(), s.Navigate.init(), s.FixedLocalTime.init(), s.CesiumOverrides.init(), viewer.scene.pickPositionSupported == 0 && console.log(TELang.i18n("warning_depth_buffer_picking_not_supported")), s.Tests.init(), a(this), f(this)
      },
      style: {
        measureBillboardOptions: function (e, t) {
          return {
            position: e,
            image: Cesium.writeTextToCanvas(t, {
              font: "normal bold 32px Arial",
              fill: !0,
              stroke: !1,
              fillColor: Cesium.Color.YELLOW,
              strokeColor: Cesium.Color.BLACK,
              strokeWidth: 1
            }),
            scale: .5,
            pixelOffset: new Cesium.Cartesian2(0, -16),
            eyeOffset: new Cesium.Cartesian3(0, 0, -50)
          }
        },
        segmentBillboardOptions: function (e, t, n) {
          var r = new Cesium.Cartesian3;
          Cesium.Cartesian3.lerp(t, n, .5, r);
          var i = this.measureBillboardOptions(r, e);
          return i.translucencyByDistance = new Cesium.NearFarScalar(0, 1, Cesium.Cartesian3.distance(t, n) * 200, 0), i
        }
      },
      getCurrentPresentation: function () {
        return l.tools.ToolManager._tools.PresentationTool ? l.tools.ToolManager._tools.PresentationTool._currentPresentation : null
      },
      _untrustedSkylineGlobeServers: {},
      _ongoingSkylineGlobeServerTests: {},
      isSkylineGlobeServer: function (t, n) {
        var r = new Cesium.Uri(t),
          i = t + "?checkServer=1";
        i = i.toLowerCase();
        var s = !1,
          o = "SG",
          u = 0,
          a = 80;
        if (this._untrustedSkylineGlobeServers[i]) return n != undefined && n(r, !1, o, u, a), !1;
        var f = l.trustedSkylineGlobeServers.contains(t);
        return f != undefined && n != undefined ? (n(r, !0, f, u, a), !0) : (this._ongoingSkylineGlobeServerTests[i] instanceof Array || (this._ongoingSkylineGlobeServerTests[i] = []), this._ongoingSkylineGlobeServerTests[i].push(n), this._ongoingSkylineGlobeServerTests[i].length > 1 ? s : (e.ajax({
          url: i,
          success: function (e) {
            try {
              s = e.sg == 1, s && (o = e.appDomain, u = e.secured == 1, a = parseInt(e.port))
            } catch (t) {
              s = !1
            }
          },
          error: function () {
            console.log(t + " is not a SkylineGlobeServer")
          },
          complete: function () {
            s == 0 && (l._untrustedSkylineGlobeServers[i] = !0), l._ongoingSkylineGlobeServerTests[i].forEach(function (e, t) {
              e && e(r, s, o, u, a)
            }), delete l._ongoingSkylineGlobeServerTests[i]
          },
          async: n != undefined
        }), s))
      },
      trustedSkylineGlobeServers: new function () {
        var e = {};
        this.addTrustedSG = function (t, n) {
          Cesium.defined(e[t.toLowerCase()]) || (e[t.toLowerCase()] = n.toLowerCase())
        }, this.contains = function (t) {
          if (!Cesium.defined(t)) return !1;
          var n = new Cesium.Uri(t);
          n.normalize();
          var r = e[n.authority.toLowerCase()];
          return r != undefined && n.path.toLowerCase().indexOf("/" + r + "/") == 0 ? r : undefined
        }
      }
    };
    return l.tools = i, l.internal = s, l.SGWorld = o, l
  }), require(["TerraExplorer"], function (e) {
    "use strict";
    var t = typeof window != "undefined" ? window : typeof self != "undefined" ? self : {};
    t.TerraExplorer = e
  }, undefined, !0), define("RequireTE", function () {});