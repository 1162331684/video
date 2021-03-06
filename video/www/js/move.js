"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
!function () {
    var I = {
        Linear: function (t, n, e, u) {
            return e * t / u + n
        }, Bounce: {
            easeIn: function (t, n, e, u) {
                return e - I.Bounce.easeOut(u - t, 0, e, u) + n
            }, easeOut: function (t, n, e, u) {
                return (t /= u) < 1 / 2.75 ? e * (7.5625 * t * t) + n : t < 2 / 2.75 ? e * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? e * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : e * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
            }, easeInOut: function (t, n, e, u) {
                return t < u / 2 ? .5 * I.Bounce.easeIn(2 * t, 0, e, u) + n : .5 * I.Bounce.easeOut(2 * t - u, 0, e, u) + .5 * e + n
            }
        }, Quad: {
            easeIn: function (t, n, e, u) {
                return e * (t /= u) * t + n
            }, easeOut: function (t, n, e, u) {
                return -e * (t /= u) * (t - 2) + n
            }, easeInOut: function (t, n, e, u) {
                return (t /= u / 2) < 1 ? e / 2 * t * t + n : -e / 2 * (--t * (t - 2) - 1) + n
            }
        }, Cubic: {
            easeIn: function (t, n, e, u) {
                return e * (t /= u) * t * t + n
            }, easeOut: function (t, n, e, u) {
                return e * ((t = t / u - 1) * t * t + 1) + n
            }, easeInOut: function (t, n, e, u) {
                return (t /= u / 2) < 1 ? e / 2 * t * t * t + n : e / 2 * ((t -= 2) * t * t + 2) + n
            }
        }, Quart: {
            easeIn: function (t, n, e, u) {
                return e * (t /= u) * t * t * t + n
            }, easeOut: function (t, n, e, u) {
                return -e * ((t = t / u - 1) * t * t * t - 1) + n
            }, easeInOut: function (t, n, e, u) {
                return (t /= u / 2) < 1 ? e / 2 * t * t * t * t + n : -e / 2 * ((t -= 2) * t * t * t - 2) + n
            }
        }, Quint: {
            easeIn: function (t, n, e, u) {
                return e * (t /= u) * t * t * t * t + n
            }, easeOut: function (t, n, e, u) {
                return e * ((t = t / u - 1) * t * t * t * t + 1) + n
            }, easeInOut: function (t, n, e, u) {
                return (t /= u / 2) < 1 ? e / 2 * t * t * t * t * t + n : e / 2 * ((t -= 2) * t * t * t * t + 2) + n
            }
        }, Sine: {
            easeIn: function (t, n, e, u) {
                return -e * Math.cos(t / u * (Math.PI / 2)) + e + n
            }, easeOut: function (t, n, e, u) {
                return e * Math.sin(t / u * (Math.PI / 2)) + n
            }, easeInOut: function (t, n, e, u) {
                return -e / 2 * (Math.cos(Math.PI * t / u) - 1) + n
            }
        }, Expo: {
            easeIn: function (t, n, e, u) {
                return 0 == t ? n : e * Math.pow(2, 10 * (t / u - 1)) + n
            }, easeOut: function (t, n, e, u) {
                return t == u ? n + e : e * (1 - Math.pow(2, -10 * t / u)) + n
            }, easeInOut: function (t, n, e, u) {
                return 0 == t ? n : t == u ? n + e : (t /= u / 2) < 1 ? e / 2 * Math.pow(2, 10 * (t - 1)) + n : e / 2 * (2 - Math.pow(2, -10 * --t)) + n
            }
        }, Circ: {
            easeIn: function (t, n, e, u) {
                return -e * (Math.sqrt(1 - (t /= u) * t) - 1) + n
            }, easeOut: function (t, n, e, u) {
                return e * Math.sqrt(1 - (t = t / u - 1) * t) + n
            }, easeInOut: function (t, n, e, u) {
                return (t /= u / 2) < 1 ? -e / 2 * (Math.sqrt(1 - t * t) - 1) + n : e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
            }
        }, Back: {
            easeIn: function (t, n, e, u, a) {
                return null == a && (a = 1.70158), e * (t /= u) * t * ((a + 1) * t - a) + n
            }, easeOut: function (t, n, e, u, a) {
                return null == a && (a = 1.70158), e * ((t = t / u - 1) * t * ((a + 1) * t + a) + 1) + n
            }, easeInOut: function (t, n, e, u, a) {
                return null == a && (a = 1.70158), (t /= u / 2) < 1 ? e / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + n : e / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + n
            }
        }, Elastic: {
            easeIn: function (t, n, e, u, a, r) {
                return 0 == t ? n : 1 == (t /= u) ? n + e : (r || (r = .3 * u), o = !a || a < Math.abs(e) ? (a = e, r / 4) : r / (2 * Math.PI) * Math.asin(e / a), -a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) + n);
                var o
            }, easeOut: function (t, n, e, u, a, r) {
                return 0 == t ? n : 1 == (t /= u) ? n + e : (r || (r = .3 * u), o = !a || a < Math.abs(e) ? (a = e, r / 4) : r / (2 * Math.PI) * Math.asin(e / a), a * Math.pow(2, -10 * t) * Math.sin((t * u - o) * (2 * Math.PI) / r) + e + n);
                var o
            }, easeInOut: function (t, n, e, u, a, r) {
                return 0 == t ? n : 2 == (t /= u / 2) ? n + e : (r || (r = u * (.3 * 1.5)), o = !a || a < Math.abs(e) ? (a = e, r / 4) : r / (2 * Math.PI) * Math.asin(e / a), t < 1 ? a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * -.5 + n : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * u - o) * (2 * Math.PI) / r) * .5 + e + n);
                var o
            }
        }
    };
    window.animate = function (e, u, t) {
        var n = (t = t || {}).effect, a = t.callback, r = n || I.Linear,
            o = ["Linear", "Elastic-easeOut", "Back-easeOut", "Bounce-easeOut", "Expo-easeIn"];
        "number" == typeof n ? (o = o[n % o.length].split("-"), r = 2 <= o.length ? I[o[0]][o[1]] : I[o[0]]) : "object" === (void 0 === n ? "undefined" : _typeof(n)) && (r = 2 <= n.length ? I[n[0]][n[1]] : I[n[0]]);
        var i = {}, s = {};
        for (var c in u) i[c] = utils.css(e, c), s[c] = u[c] - i[c];
        var f = t.duration || 1e3, h = null;
        clearInterval(e.timer), e.timer = setInterval(function () {
            if (f <= (h += 10)) return utils.css(e, u), clearInterval(e.timer), void (a && a.call(e));
            for (var t in s) {
                var n = r(h, i[t], s[t], f);
                utils.css(e, t, n)
            }
        }, 10)
    }
}();