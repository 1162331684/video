"use strict";
!function () {
    function o(t, n) {
        var e = "con" + +new Date,
            o = '<span class="video-comment" z-index="10" id="' + e + '"  style="top:' + (Math.floor(400 * Math.random()) + "px") + "; font-size:"+ (Math.floor(  Math.random()*(8)+18) + "px")+" ; color: " + function () {
                for (var t = "", e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"], o = 0; o < 6; o++) {
                    if (t += "" + e[Math.ceil(15 * Math.random())], 5 === o) return "#" + t
                }
            }() + '; right: -50px;">' + t + "</span>", c = $("#video-top").html().trim();
        $("#video-top").html(c + o), $.animate("#" + e, {left: "-1500px"}, 15e3, "linear"), document.onkeydown = function (t) {
            // noinspection JSAnnotator
            var e = t || window.event || arguments.callee.caller.arguments[0];
            if (e && 13 == e.keyCode) {
                var o = $("#content").val();
                if (!o || "" === o) return;
                if ("rgb(255, 0, 0)" !== $("#status").css("backgroundColor")) return;
                var g = window.location.href.toString(), u = g.substring(g.lastIndexOf("/") + 1);
                var x={t:o,u:u}
                $("#content").val(""), n.emit("publish", x)
            }
        }
    }

    window.onload = function () {
        var g = window.location.href.toString(), u = g.substring(g.lastIndexOf("/") + 1);
        var t = io.connect("http://localhost/?"+u);
        t.emit("foo", "login"), c(t), $("#commit-comment").on("click", function (t) {

            var e = $("#comment-form").get(0), o = $("#comment-text").html(), n = e.action, c = window.location.href,
                a = e.method;
            var  z =$.serialize("comment-form").content
            $.isString(o) && $.ajax({
                url: n,
                type: a,
                dataType: "json",
                data: {con:z,url:u},
                success: function (t) {
                    t && 1 === t.code && setTimeout(function () {
                        window.location.href = c, $("#comment-text").html("")
                    }, 1e3)
                }
            })
        }), $("#comments-page li").on("click", function (t) {
            $.preventDefault(t);
            var e = $($.getTarget(t)).text(), o = $("#pageNow").text(), n = $("#pageNum").text();
            switch (n = $.isString(n) ? parseInt(n) : n, o = $.isString(o) ? parseInt(o) : o, e) {
                case"首页":
                    o = 1;
                    break;
                case"<<":
                    1 < o && (o -= 1);
                    break;
                case">>":
                    o < n && (o += 1);
                    break;
                case"尾页":
                    o = n
            }
            $("#pageNow").html(o), $.ajax({
                url: "/comment/" + o,
                type: "GET",
                dataType: "json",
                data: "",
                success: function (t) {
                    if (t && 1 === t.code) {
                        for (var e, o = t.comments, n = 0, c = o.length, a = ""; n < c; n++) a += '<div class="comment-content">\n                    <div class="userlogo">\n                        <img src="' + (e = o[n]).face + '" alt="">\n                    </div>\n                    <div class="usercontent">\n                        <div class="usercontent-title">\n                            <a href="/login">' + e.uname + "</a><span>评论于 " + e.addtime + '</span>\n                        </div>\n                        <div class="usercontent-con">\n                            ' + e.content + "\n                        </div>\n                    </div>\n                </div>";
                        $("#comments").html(a)
                    }
                }
            })
        }),$(".toggleMovie").on("click", function (t) {
            t.preventDefault(), $.ajax({
                url: "/play/current/0", type: "GET", success: function (t) {
                    if (t && 1 === t.code) {
                        var e = t.movie;
                        window.location.href = "/play/" + e[0].url
                    }
                }
            })
        }),
            $("#select-interface").on("change", function () {
            var t = $("#select-interface").get(0).options, e = t.selectedIndex, o = t[e].value,
                n = window.location.href;
            n = "http://www.iqiyi.com/" + n.substr(n.lastIndexOf("/") + 1), 0 < e ? ("02" === o && (document.getElementById("video_iframe").src = "http://jx.618g.com/?url="+n), "03" === o && (document.getElementById("video_iframe").src = "http://17kyun.com/api.php?url="+n), "04" === o && (document.getElementById("video_iframe").src = " http://jx.598110.com/?url="+n), "05" === o && (document.getElementById("video_iframe").src = "http://vip.jlsprh.com/?url="+n), "06" === o && (document.getElementById("video_iframe").src = "http://jx.du2.cc/?url="+n),"07" === o && (document.getElementById("video_iframe").src = "http://jqaaa.com/jx.php?url="+n)) : "01" === o && (document.getElementById("video_iframe").src = "http://jsap.attakids.com/?url="+n)
        }),
            $("#collect-movie").on("click", function (t) {
            t.preventDefault();
            var e = window.location.href.toString(), o = e.substring(e.lastIndexOf("/") + 1);
            "收藏电影" === $("#collect-movie").text().trim() ? $.ajax({
                url: "/play/colmovie/0",
                type: "POST",
                data: {url: o},
                success: function (t) {
                    t && 1 === t.code && $("#collect-movie").html("取消收藏")
                }
            }) : "取消收藏" === $("#cancel-movie").text().trim() && $.ajax({
                url: "/play/colmovie/1",
                type: "POST",
                data: {url: o},
                success: function (t) {
                    t && 1 === t.code && $("#cancel-movie").html("收藏电影")
                }
            })
        }), $("#cancel-movie").on("click", function (t) {
            t.preventDefault();
            var e = window.location.href.toString(), o = e.substring(e.lastIndexOf("/") + 1);
            "取消收藏" === $("#cancel-movie").text().trim() ? $.ajax({
                url: "/play/colmovie/1",
                type: "POST",
                data: {url: o},
                success: function (t) {
                    t && 1 === t.code && $("#cancel-movie").html("收藏电影")
                }
            }) : "收藏电影" === $("#cancel-movie").text().trim() && $.ajax({
                url: "/play/colmovie/0",
                type: "POST",
                data: {url: o},
                success: function (t) {
                    t && 1 === t.code && $("#cancel-movie").html("取消收藏")
                }
            })
        }),

            function (e) {
            $("#danmu-group").on("click", function (t) {
                $.preventDefault(t), $("#status").hasClass("danmu-open") ? ($("#status").removeClass("danmu-open"), $("#video-top").css("opacity", "0"), $("#status").css("backgroundColor", ""), $("#video-top").html("")) : ($("#status").addClass("danmu-open"), $("#video-top").show(), $("#video-top").css("opacity", "1"))
            }),
                $("#commitButton").on("click", function () {
                    var g = window.location.href.toString(), u = g.substring(g.lastIndexOf("/") + 1);
                var t = $("#content").val();
                var x={t:t,u:u}
                t && "" !== t && "rgb(255, 0, 0)" === $("#status").css("backgroundColor") && ($("#content").val(""), e.emit("publish", x))
            }), c(e)
        }(t),

            setTimeout(function () {
            $("#status").css("backgroundColor", "red"), $("#video-top").show(), $("#video-top").css("opacity", "1"), $("#video-top").html("")
        }, 2e4)
    };

    var n = 0;
    function c(e) {
        e.on("system", function (t, e) {
            switch (t) {
                case"num":
                    $("#usernum").html(e)
            }
        }), e.on("message", function (t) {
            if(t.u==e.query)
            1 !== n ? (o(t.t, e), n++) : n = 0
        }), e.on("loginsuccess", function (t) {
            $("#usernum").html(t), $("#usernummovie").html(t)
        })
    }
}();