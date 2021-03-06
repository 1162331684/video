"use strict";
function a() {
    const v = document.getElementById('se').value;
    return v;
}
var utils = function () {
    var flg = "getComputedStyle" in window;

    function makeArray(e) {
        var t = [];
        if (flg) return Array.prototype.slice.call(e);
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function jsonParse(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")")
    }

    function win(e, t) {
        if (void 0 === t) return document.documentElement[e] || document.body[e];
        document.documentElement[e] = document.body[e] = t
    }

    function offset(e) {
        for (var t = e.offsetLeft, n = e.offsetTop, r = e.offsetParent; r;) -1 === window.navigator.userAgent.indexOf("MSIE 8.0") && (t += r.clientLeft, n += r.clientTop), t += r.offsetLeft, n += r.offsetTop, r = r.offsetParent;
        return {left: t, top: n}
    }

    function rnd(e, t) {
        if (e = Number(e), t = Number(t), isNaN(e) || isNaN(t)) return Math.random();
        if (t < e) {
            var n = t;
            t = e, e = n
        }
        return Math.round(Math.random() * (t - e) + e)
    }

    function getByClass(e, t) {
        if (t = t || document, flg) return this.makeArray(t.getElementsByClassName(e));
        for (var n = e.replace(/(^ +)|( +$)/g, "").split(/\s+/g), r = t.getElementsByTagName("*"), s = [], i = 0; i < r.length; i++) {
            for (var a = r[i], o = !0, l = 0; l < n.length; l++) {
                if (!new RegExp("\\b" + n[l] + "\\b").test(a.className)) {
                    o = !1;
                    break
                }
            }
            o && s.push(a)
        }
        return s
    }

    function addClass(e, t) {
        for (var n = t.replace(/(^ +)|( +$)/g, "").split(/\s+/g), r = 0; r < n.length; r++) this.hasClass(e, n[r]) || (e.className += " " + n[r])
    }

    function hasClass(e, t) {
        return new RegExp("(^| +)" + t + "( +|$)").test(e.className)
    }

    function removeClass(e, t) {
        for (var n = t.replace(/(^ +)|( +$)/g, "").split(/\s+/g), r = 0; r < n.length; r++) {
            var s = new RegExp("\\b" + n[r] + "\\b");
            s.test(e.className) && (e.className = e.className.replace(s, " ").replace(/(^ +)|( +$)/g, "").replace(/\s+/g, " "))
        }
    }

    function getCss(e, t) {
        var n = null;
        if (flg) n = getComputedStyle(e, !1)[t]; else {
            if ("opacity" === t) return n = e.currentStyle.filter, /^alpha\(opacity[=:](\d+)\)$/gi.test(n) ? RegExp.$1 / 100 : 1;
            n = e.currentStyle[t]
        }
        return /^([+-])?(\d+(\.\d+)?(px|pt|rem|em))$/i.test(n) ? parseFloat(n) : n
    }

    function setCss(e, t, n) {
        if ("float" === t) return e.style.cssFloat = n, void (e.style.styleFloat = n);
        if ("opacity" === t) return e.style.opacity = n, void (e.style.filter = "alpha(opacity=" + 100 * n + ")");
        /^(width|height|left|top|right|bottom|((margin|padding)(left|top|right|bottom)?))$/gi.test(t) && -1 === n.toString().indexOf("%") && (n = parseFloat(n) + "px"), e.style[t] = n
    }

    function setGroupCss(e, t) {
        if ("[object Object]" === t.toString()) for (var n in t) this.setCss(e, n, t[n])
    }

    function css(e) {
        var t = arguments[1];
        if ("string" == typeof t) {
            var n = arguments[2];
            if (void 0 === n) return this.getCss(e, t);
            this.setCss(e, t, n)
        }
        "[object Object]" === t.toString() && this.setGroupCss(e, t)
    }

    function getChildren(e, t) {
        for (var n = e.childNodes, r = [], s = 0; s < n.length; s++) {
            var i = n[s];
            1 === i.nodeType && (void 0 !== t ? t.toUpperCase() === i.nodeName && r.push(i) : r.push(i))
        }
        return r
    }

    function prev(e) {
        if (flg) return e.previousElementSibling;
        for (var t = e.previousSibling; t && 1 !== t.nodeType;) t = t.previousSibling;
        return t
    }

    function next(e) {
        if (flg) return e.nextElementSibling;
        for (var t = e.nextSibling; t && 1 !== t.nodeType;) t = t.nextSibling;
        return t
    }

    function prevAll(e) {
        for (var t = this.prev(e), n = []; t;) n.push(t), t = this.prev(t);
        return n
    }

    function nextAll(e) {
        for (var t = this.next(e), n = []; t;) n.push(t), t = this.next(t);
        return n
    }

    function sibling(e) {
        var t = [], n = this.prev(e), r = this.next(e);
        return n && t.push(n), r && t.push(r), t
    }

    function siblings(e) {
        var t = this.prevAll(e), n = this.nextAll(e);
        return t.concat(n)
    }

    function index(e) {
        return this.prevAll(e).length
    }

    function firstChild(e) {
        return this.getChildren(e)[0]
    }

    function lastChild(e) {
        var t = this.getChildren(e);
        return t[t.length - 1]
    }

    function appendChild(e, t) {
        e.appendChild(t)
    }

    function prependChild(e, t) {
        var n = this.firstChild(e);
        n ? e.insertBefore(t, n) : e.appendChild(t)
    }

    function insertBefore(e, t) {
        t.parentNode.insertBefore(e, t)
    }

    function insertAfter(e, t) {
        var n = this.next(t);
        n ? t.parentNode.insertBefore(e, n) : t.parentNode.appendChild(e)
    }

    function getParams(e) {
        var t = [];
        for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.push(("randomNumber=" + Math.random()).replace(".")), t.join("&")
    }

    function ajax(t) {
        (t = t || {}).type = (t.type || "GET").toUpperCase(), t.dataType = t.dataType || "json", t.async = t.async || !0;
        var n, e = getParams(t.data);
        (n = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = function () {
            if (4 == n.readyState) {
                var e = n.status;
                if (200 <= e && e < 300) {
                    if ("json" === t.dataType) try {
                        return t.success && t.success(JSON.parse(n.responseText))
                    } catch (e) {
                        return t.success && t.success(n.responseText, n.responseXML)
                    }
                    t.success && t.success(n.responseText, n.responseXML)
                } else t.fail && t.fail(e)
            }
        }, "GET" == t.type ? (n.open("GET", t.url + "?" + e, t.async), n.send(null)) : "POST" == t.type && (n.open("POST", t.url, t.async), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.send(e))
    }

    function renderHtml(e, t) {
        return Hogan.compile(e).render(t)
    }

    return {
        makeArray: makeArray,
        jsonParse: jsonParse,
        win: win,
        offset: offset,
        rnd: rnd,
        getByClass: getByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        getChildren: getChildren,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        appendChild: appendChild,
        prependChild: prependChild,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        ajax: ajax,
        renderHtml: renderHtml
    }
}();