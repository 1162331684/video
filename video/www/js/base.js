"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
({
    init: function () {
        this._bindEvents()
    }, _bindEvents: function () {
        this._bindFooterEvents(), this._bindProgressBarEvents(), this._bindSearchContentsEvents()
    }, _bindFooterEvents: function () {
        $("#lastlogo dd").on("mouseover", function (t) {
            switch ($($.getTarget(t)).text()) {
                case"微信":
                    $("#imgshow").css("right", "126px").show();
                    break;
                case"QQ群":
                    $("#imgshow").css("right", "63px").show();
                    break;
                case"新浪":
                    $("#imgshow").css("right", "0px").show();
                    break;
                case"邮箱":
                    $("#imgshow").css("right", "-63px").show()
            }
        }).on("mouseout", function () {
            $("#imgshow").hide()
        })
    }, _bindProgressBarEvents: function () {
        function t(t) {
            this.progress = t, this.prg = 0, this.width = document.documentElement.clientWidth, this.timer = 0
        }

        t.prototype = {
            start: function () {
                var t = this;
                t.onchange(), t.timer = setInterval(function () {
                    t.prg >= t.random([40, 80]) ? clearInterval(t.timer) : t.prg += t.random(3), t.progress.style.width = t.prg / 100 * t.width + "px"
                }, 15)
            }, onchange: function () {
                var t = this;
                document.onreadystatechange = function () {
                    "complete" === document.readyState && (clearInterval(t.timer), setInterval(function () {
                        100 <= t.prg ? (clearInterval(t.timer), t.prg = 100, t.progress.style.display = "none") : t.prg += t.random(1), t.progress.style.width = t.prg / 100 * t.width + "px"
                    }, 5))
                }
            }, random: function (t) {
                if ("object" !== (void 0 === t ? "undefined" : _typeof(t))) return Math.random() * t;
                var r = t[1] - t[0];
                return Math.random() * r * 10 + t[0]
            }
        }, new t(document.getElementById("progress")).start()
    },  _bindSearchContentsEvents: function () {
        $("#intheater").on("click", function () {
            $("#intheater").css("color", "red").css("font-weight", "bold"), $("#coming").css("color", "black"), $("#top250").css("color", "black")
        }), $("#coming").on("click", function () {
            $("#intheater").css("color", "black"), $("#coming").css("color", "red").css("font-weight", "bold"), $("#top250").css("color", "black")
        }), $("#top250").on("click", function () {
            $("#intheater").css("color", "black"), $("#coming").css("color", "black"), $("#top250").css("color", "red").css("font-weight", "bold")
        })
    },

}).init();