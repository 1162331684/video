"use strict";
!function () {
    var e = {
        init: function () {
            this._bindEvents()
        },
        _bindEvents: function () {
            this._bindLoginEvents(), this._bindRegisterEvents(), this._bindUserCenterEvents()
        },
        _bindLoginEvents: function () {
            function l() {
                var e = $("#uname").val(),
                    t = $("#pwd").val(), n = $("#captcha").val();
                return null == e || void 0 === e || "" === e ? ($("#unamelb").html('<span style="color: red">用户名不能为空</span>'), !1) : ($("#unamelb").html("用户名"), null == t || void 0 === t || "" === t ? ($("#pwdlb").html('<span style="color: red">密码不能为空</span>'), !1) : ($("#pwdlb").html("密码"), null == n || void 0 === n || "" === n ? ($("#captchalb").html('<span style="color: red">验证码不能为空</span>'), !1) : ($("#captchalb").html("验证码"), !0)))
            }

            location.href.includes("login") && ($("input").on("blur", function () {
                if (!l()) return !1
            }),
                $("#login-form").on("submit", function (e) {
                if ($.preventDefault(e), !l()) return !1;
                var t = $(this).attr("action"), n = $(this).attr("method");
                $("#unamelb").html("用户名"), $("#captchalb").html("验证码"), $.ajax({
                    url: t,
                    type: n,
                    data: $.serialize("login-form"),
                    dataType: "json",
                    success: function (e) {
                        e && 1 === e.code ? window.location.href = "/" : (1001 === e.code ? $("#captchalb").html('<span style="color: red">验证码输入错误</span>') : ($("#unamelb").html('<span style="color: red">用户名或密码错误</span>'), $("#uname").val(""), $("#pwd").val("")), $("#captcha").val(""), $("#captcha-img").get(0).src = "/captcha?" + new Date)
                    },
                    error: function (e) {
                        console.log(e)
                    }
                })
            }))
        },
        _bindRegisterEvents: function () {
            function l() {
                var e = $("#uname").val(), t = $("#email").val(), n = $("#phone").val(), l = $("#pwd1").val(),
                    a = $("#pwd2").val(), o = $("#captcha").val();
                return null == e || void 0 === e || "" === e ? ($("#unamelb").html('<span style="color: red">用户名不能为空</span>'), !1) : $.isString(e) && (e.length < 4 || 12 < e.length) ? ($("#unamelb").html('<span style="color: red">用户名为4到12位有效字符</span>'), !1) : ($("#unamelb").html("用户名"), null == t || void 0 === t || "" === t ? ($("#emaillb").html('<span style="color: red">邮箱不能为空</span>'), !1) : $.isString(t) && !t.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g) ? ($("#emaillb").html('<span style="color: red">邮箱格式错误</span>'), !1) : ($("#emaillb").html("邮箱"), null == n || void 0 === n || "" === n ? ($("#phonelb").html('<span style="color: red">手机不能为空</span>'), !1) : $.isString(n) && !n.match(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/) ? ($("#phonelb").html('<span style="color: red">手机格式有误</span>'), !1) : ($("#phonelb").html("手机"), null == l || void 0 === l || "" === l ? ($("#pwd1lb").html('<span style="color: red">密码不能为空</span>'), !1) : $.isString(l) && l.length < 5 ? ($("#pwd1lb").html('<span style="color: red">密码强度不能少于5个字符</span>'), !1) : ($("#pwd1lb").html("密码"), null == a || void 0 === a || "" === a ? ($("#pwd2lb").html('<span style="color: red">确认密码不能为空</span>'), !1) : $.isString(a) && a !== l ? ($("#pwd2lb").html('<span style="color: red">确认密码不一致</span>'), !1) : ($("#pwd2lb").html("确认密码"), null == o || void 0 === o || "" === o ? ($("#captchalb").html('<span style="color: red">验证码不能为空</span>'), !1) : ($("#captchalb").html("验证码"), !0))))))
            }

            location.href.includes("register") && ($("input").on("blur", function () {
                if (!l()) return !1
            }),
                $("#register-form").on("submit", function (e) {
                if ($.preventDefault(e), !l()) return !1;
                var t = $(this).attr("action"), n = $(this).attr("method");
                $.ajax({
                    url: t, type: n, data: $.serialize("register-form"), dataType: "json", success: function (e) {
                        e && 1 === e.code ? (window.location.href = "/", alert("恭喜你注册成功！")) : e && 1001 === e.code ? ($("#captchalb").html('<span style="color: red">验证码输入错误</span>'), $("#captcha-img").get(0).src = "/captcha?" + new Date, $("#captcha").val("")) : e && 1002 === e.code ? ($("#unamelb").html('<span style="color: red">用户名已存在</span>'), $("#uname").get(0).focus()) : alert(JSON.stringify(e))
                    }, error: function (e) {
                        console.log(e)
                    }
                })
            }))
        },
        _bindUserCenterEvents: function () {
            function t() {
                var e = $("#email").val(), t = $("#phone").val();
                return null == e || void 0 === e || "" === e ? ($("#emaillb").html('<span style="color: red">邮箱不能为空</span>'), $("#email").get(0).focus(), !1) : $.isString(e) && !e.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g) ? ($("#emaillb").html('<span style="color: red">邮箱格式错误</span>'), $("#email").get(0).focus(), !1) : ($("#emaillb").html("邮箱"), null == t || void 0 === t || "" === t ? ($("#phonelb").html('<span style="color: red">手机不能为空</span>'), $("#phone").get(0).focus(), !1) : $.isString(t) && !t.match(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/) ? ($("#phonelb").html('<span style="color: red">手机格式有误</span>'), $("#phone").get(0).focus(), !1) : ($("#phonelb").html("手机"), !0))
            }


            $("input").on("blur", function (e) {
                if ($("#emaillb").html("邮箱"), $("#phonelb").html("手机"), !t()) return !1
            }), $("#userino-form").on("submit", function (e) {
                if ($.preventDefault(e), !t()) return !1;
                $.ajax({
                    url: "/user",
                    type: "POST",
                    dataType: "json",
                    data: $.serialize("userino-form"),
                    success: function (e) {
                        window.location.href = "/login"
                    }
                })
            }), $("#upload-form button").on("click", function (e) {
                $.preventDefault(e);
                var t = $($.getTarget(e)).text();
                switch ($("#upload-file-title").html("请选择要上传的图片"), t) {
                    case"取消":
                        $("#toastWindow").hide();
                        break;
                    case"点击上传":
                        var n = new FormData, l = document.querySelector("#upload-file").files[0];
                        if (n.append("pic", l), !n || !l) return void $("#upload-file-title").html('<span style="color: red">请至少选择一个要上传的文件</span>');
                        var a = l.type;
                        if (!["image/jpg", "image/jpeg", "image/png", "image/pjpeg", "image/gif", "image/bmp", "image/x-png"].contains(a)) return void $("#upload-file-title").html('<span style="color: red">不支持的文件格式</span>');
                        var o = new XMLHttpRequest;
                        o.open("POST", "/user/upload"), o.onreadystatechange = function (e) {
                            if (4 === o.readyState && 200 === o.status) {
                                var t = JSON.parse(o.responseText);
                                if (t && 1 === t.code) {
                                    var n = t.msg;
                                    $("#toastWindow").hide(), $("#logo").attr("src", n), window.location.href = "/"
                                }
                            }
                        }, o.send(n)
                }
            }), $("#upload").on("click", function (e) {
                $.preventDefault(e), $("#toastWindow").show()
            }), $("#pwd-form").on("submit", function (e) {
                $.preventDefault(e);
                var t = $("#pwd1").val(), n = $("#pwd2").val();
                return null == t || void 0 === t || "" === t ? ($("#pwd1lb").html(""), void $("#pwd1lb").html('<span style="color: red">密码不能为空</span>')) : $.isString(t) && t.length < 5 ? ($("#pwd1lb").html(""), $("#pwd1lb").html('<span style="color: red">原始密码错误</span>'), $("#pwd1").val(""), void $("#pwd2").val("")) : ($("#pwd1lb").html("旧密码"), null == n || void 0 === n || "" === n ? ($("#pwd2lb").html(""), void $("#pwd2lb").html('<span style="color: red">确认密码不能为空</span>')) : $.isString(n) && n === t ? ($("#pwd2lb").html(""), void $("#pwd2lb").html('<span style="color: red">新密码不能和旧密码相同</span>')) : void ($.isString(n) && n.length < 5 ? $("#pwd2lb").html('<span style="color: red">新密码长度不能低于5位</span>') : ($.ajax({
                    url: "/user",
                    type: "POST",
                    data: $.serialize("pwd-form"),
                    success: function (e) {
                        if (console.log(e), e && 0 === e.code) return $("#pwd1lb").html('<span style="color: red">原始密码错误</span>'), $("#pwd1").val(""), void $("#pwd2").val("");
                        $.ajax({
                            url: "/user",
                            type: "POST",
                            data: $.serialize("pwd-form"),
                            dataType: "string",
                            success: function (e) {
                                e && (window.location.href = "/login")
                            }
                        })
                    }
                }), $("#pwd2lb").html("新密码"))))
            }), $("#login-logs").on("click", function (e) {
                $.ajax({
                    url: "/userlog", type: "POST", dataType: "json", data: {data: "logs"}, success: function (e) {
                        if (e && 1 === e.code) {
                            for (var t,
                                     n = e.userlogs,
                                     l = 0,
                                     a = n.length,
                                     o = '<tr style="text-align: center">\n                        <td>编号</td>\n                        <td>登录时间</td>\n                        <td>登录IP</td>\n                        <td>登录地址</td>\n                    </tr>'; l < a; l++) t = n[l], o += l % 2 == 0 ? ' <tr class="change">\n                    <td style="text-align: center">' + (l + 1) + '</td>\n                    <td style="text-align: center">' + t.login_time + '</td>\n                    <td style="text-align: center">' + t.ip + '</td>\n                    <td style="text-align: center">' + t.address + "</td>\n                    </tr>" : ' <tr class="change" style="background-color: rgba(2,2,2,0.53);">\n                    <td style="text-align: center">' + (l + 1) + '</td>\n                    <td style="text-align: center">' + t.login_time + '</td>\n                    <td style="text-align: center">' + t.ip + '</td>\n                    <td style="text-align: center">' + t.address + "</td>\n                    </tr>";
                            $("#userlogs-con").html(o)
                        }
                    }
                })
            }),
                $("#col-movie").on("click", function (e) {
                $.ajax({
                    url: "/colmovie/1",
                    data: {tag: "comment"},
                    dataType: "json",
                    type: "POST",
                    success: function (e) {
                        if (e && 1 === e.code) {
                            var t = "", n = e.msg;
                            if (!n.length) return;
                            n.forEach(function (e) {
                                t += ' <div class="moviecol-con">\n                        <div class="moviecol-con-l" onclick="window.open(\'' + e.url + '\')">\n                            <img src="/www/uploads/movies/' + e.id + '.jpg" alt="">                        </div>\n                        <div class="moviecol-con-r">\n                        <div class="moviecol-con-title">\n                        <span class="movie-title">\n                        ' + e.title + '\n                </span>\n          <a class="movie-play" onclick="canclecol(this)" id ="cancol"name="'+e.url+'">取消收藏</a>          <a class="movie-play" href="' + e.url + '">\n                                    ▶播放影片\n                    </a>\n                    </div>\n                    <span class="moviecol-con-desc">\n                        ' + e.info + "\n                </span>\n                    </div>\n                    </div>"
                            }), $("#user-colmovie").html(t)
                        }
                    }
                })
            }),

                $("#userinfo li").on("click", function (e) {
                var t = $($.getTarget(e)), n = t.text();
                switch ($("#userinfo li").each(function () {
                    $(this).removeClass("current"), $(this).css("backgroundColor", ""), $(this).css("color", "black")
                }),
                    t.css("color", "white"), t.css("backgroundColor", "#18b400"), n.toString().trim()) {
                    case"会员中心":
                        $(".user-center").show(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").hide();
                        break;
                    case"修改密码":
                        $(".user-center").hide(), $(".user-pwd").show(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").hide();
                        break;
                    case"登录日志":
                        $(".user-center").hide(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").show(), $(".user-moviecol").hide();
                        break;
                    case"收藏电影":
                        $(".user-center").hide(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").show()
                }
            })
        }
    };
    window.onload = function () {
        e.init()
    }
}();