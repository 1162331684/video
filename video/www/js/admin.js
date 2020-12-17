"use strict";
!function () {
    var e = {
        init: function () {
            this._bindEvents()
        },
        _bindEvents: function () {
            this._bindLoginEvents(), this._bindUserCenterEvents()
        },
        _bindLoginEvents: function () {
            function l() {
                var e = $("#uname").val(),
                    t = $("#pwd").val(), n = $("#captcha").val();
                return null == e || void 0 === e || "" === e ? ($("#unamelb").html('<span style="color: red">用户名不能为空</span>'), !1) : ($("#unamelb").html("用户名"), null == t || void 0 === t || "" === t ? ($("#pwdlb").html('<span style="color: red">密码不能为空</span>'), !1) : ($("#pwdlb").html("密码"), null == n || void 0 === n || "" === n ? ($("#captchalb").html('<span style="color: red">验证码不能为空</span>'), !1) : ($("#captchalb").html("验证码"), !0)))
            }

            location.href.includes("admin") && ($("input").on("blur", function () {
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
                            e && 1 === e.code ? window.location.href = "admin/admin" : (1001 === e.code ? $("#captchalb").html('<span style="color: red">验证码输入错误</span>') : ($("#unamelb").html('<span style="color: red">用户名或密码错误</span>'), $("#uname").val(""), $("#pwd").val("")), $("#captcha").val(""), $("#captcha-img").get(0).src = "/captcha?" + new Date)
                        },
                        error: function (e) {
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

            function a(e) {
                for (var t, n = 0, l = e.length, a = ""; n < l; n++) null !== (t = e[n]) && (a += '<div class="comment-content">\n                    <div class="userlogo">\n                        <img src="' + t.face + '" alt="">\n                    </div>\n                    <div class="usercontent">\n                        <div class="usercontent-title">\n            ' + t.uname + "</a><span>评论于 " + t.addtime + '</span>\n <span style="color: #00b100;font-size: x-large">'+t.title+'</span>   <input id='+t.a+' type="button" class="movie-play" onclick="delcom(this) " value="删除评论">\n                                 </div>\n                        <div class="usercontent-con">\n                            ' + t.content + "\n                        </div>\n                    </div>\n                </div>");
                return a
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
            }),

                $("#comment-logs").on("click", function (e) {
                    "" === $("#pageNum").text().trim() ? $("#pageNum").text("1") : $("#pageNum").text().trim(),
                        $.ajax({
                            url: "/comment/1",
                            type: "GET",
                            success: function (e) {
                                if (e && 1 === e.code) {
                                    var t = a(e.comments);
                                    if (!t || "" == t) return;
                                    $("#comments").html(t), $("#pageNum").text(e.pageNum)
                                }
                            }
                        })
                }),
                //评论信息展示
                $("#comments-page li").on("click", function (e) {
                    $.preventDefault(e);
                    var t = $($.getTarget(e)).text(), n = $("#pageNow").text(), l = $("#pageNum").text();
                    switch (l = $.isString(l) ? parseInt(l) : l, n = $.isString(n) ? parseInt(n) : n, t) {
                        case"首页":
                            n = 1;
                            break;
                        case"上一页":
                            1 < n && (n -= 1);
                            break;
                        case"下一页":
                            n < l && (n += 1);
                            break;
                        case"尾页":
                            n = l
                    }
                    $("#pageNow").html(n), $.ajax({
                        url: "/comment/" + n,
                        type: "GET",
                        dataType: "json",
                        data: "",
                        success: function (e) {
                            if (e && 1 === e.code) {
                                var t = a(e.comments);
                                $("#comments").html(t)
                            }
                        }
                    })
                }),
                //展示用户列表
                $(".current").on("click", function (e) {

                    $.ajax({
                        url: "/admin/userlist",
                        type: "GET",
                        success: function (e) {
                            if (e && 1 === e.code) {
                                for (var t,
                                         n = e.users,
                                         l = 0,
                                         a = n.length,
                                         o = '<tr style="text-align: center">\n  <td>编号</td>\n <td>名称</td>\n <td>密码</td>\n <td>注册时间</td>\n  <td>电话</td>\n  <td>邮箱</td>\n </tr>'; l < a; l++) t = n[l], o += ' <tr class="change">\n   <td style="text-align: center">' + t.id + '</td>\n                    <td style="text-align: center">' + t.uname + '</td>\n                    <td style="text-align: center">' + t.pwd + '</td>\n                    <td style="text-align: center">' + t.addtime + "</td>\n           <td style=\"text-align: center\">" + t.phone + "</td>\n       <td style=\"text-align: center\">" + t.email + "</td>\n      </tr>"
                                $("#userlist-con").html(o)
                            }
                        }
                    })

                    return false
                }),
                //展示用户日志
                $("#login-logs").on("click", function (e) {
                    $.ajax({
                        url: "/userlog", type: "POST", dataType: "json", data: {data: "logs"}, success: function (e) {
                            if (e && 1 === e.code) {
                                for (var t,
                                         n = e.userlogs,
                                         l = 0,
                                         a = n.length,
                                         o = '<tr style="text-align: center">\n                        <td>编号</td>\n                        <td>登录时间</td>\n                        <td>登录IP</td>\n                        <td>登录地址</td>\n                    </tr>'; l < a; l++) t = n[l], o += l % 2 == 0 ? ' <tr class="change">\n                    <td style="text-align: center">' + (l + 1) + '</td>\n                    <td style="text-align: center">' + t.login_time + '</td>\n                    <td style="text-align: center">' + t.ip + '</td>\n                    <td style="text-align: center">' + t.address + "</td>\n                    </tr>" : ' <tr class="change" style="background-color: rgba(0,177,27,0);">\n                    <td style="text-align: center">' + (l + 1) + '</td>\n                    <td style="text-align: center">' + t.login_time + '</td>\n                    <td style="text-align: center">' + t.ip + '</td>\n                    <td style="text-align: center">' + t.address + "</td>\n                    </tr>";
                                $("#userlogs-con").html(o)
                            }
                        }
                    })
                }),
                $('#movies').on('click',function (e) {
                    confirm("采集过程请耐心等待，不要做其他操作")
                    var da=$(this).attr('id')
                    $.ajax({
                        url: "/admin/getvideo",
                        dataType: "json",
                        type: "post",
                        data:{id:da},
                        success: function (e) {
                            alert('电影数据抓取完成')
                        }
                    })
                }),
            $('#tvs').on('click',function (e) {
                confirm("采集过程请耐心等待，不要做其他操作")
                var da=$(this).attr('id')
                $.ajax({
                    url: "/admin/getvideo",
                    dataType: "json",
                    type: "post",
                    data:{id:da},
                    success: function (e) {
                        alert('电视剧数据抓取完成，共')
                    }
                })
            }),
            $('#cartoons').on('click',function (e) {
                confirm("采集过程请耐心等待，不要做其他操作")
                var da=$(this).attr('id')
                $.ajax({
                    url: "/admin/getvideo",
                    dataType: "json",
                    type: "post",
                    data:{id:da},
                    success: function (e) {
                        alert('动漫数据抓取完成')
                    }
                })
            }),
            $('#varietys').on('click',function (e) {
                confirm("采集过程请耐心等待，不要做其他操作")
                var da=$(this).attr('id')
                $.ajax({
                    url: "/admin/getvideo",
                    dataType: "json",
                    type: "post",
                    data:{id:da},
                    success: function (e) {
                        alert('综艺数据抓取完成')
                    }
                })
            }),
            //搜索或展示电影列表

            $("#select").on("change", function (e) {
                $(".user-center").hide(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").show()
               var vide=this.value
                var s=$("#sea").val()
                $("#sea").val('')
                "" === $("#pNum").text().trim() ? $("#pNum").text("1") : $("#pNum").text().trim(),
                    $.ajax({
                        url: "/admin/movielist/1",
                        dataType: "json",
                        type: "post",
                        data:{moviename:s,video:vide},
                        success: function (e) {
                            if (e && 1 === e.code) {
                                var t = "", n = e.movies;
                                if (!n.length) return;

                                n.forEach(function (e) {
                                    if((typeof e.score)=="undefined")e.score="无";
                                    t += ' <div class="moviecol-con">\n                        <div class="moviecol-con-l" onclick="window.open(\'' + e.url + '\')">\n                            <img src="/www/uploads/'+vide+'/' + e.id + '.jpg" alt="">                        </div>\n                        <div class="moviecol-con-r">\n                        <div class="moviecol-con-title">\n                        <span class="movie-title" style="font-size: x-large">\n                        ' + e.title + '\n                </span>\n                 <span style="color: white;margin-left: 30px"> 播放次数：  '+e.playnum+' </span>   <span style="color: white;margin-left: 30px"> 采集时间：  '+e.addtime+' </span>   <span style="color: white;margin-left: 30px"> 评分：  '+e.score+' </span>             <a class="movie-play" href="' + e.url + '">\n                                    ▶播放影片\n                    </a>\n        <a id='+e.id+' class="movie-play" onclick="de(this)" href="javascript:void(0)">删除</a>\n                  </div>\n                    <span class="moviecol-con-desc">\n                        ' + e.info + "\n                </span>\n                    </div>\n                    </div>"
                                }), $("#user-colmovie").html(t),$("#pNum").text(e.pageNum)
                            }
                            else {
                                alert('未找到资源')
                            }
                        }
                    })
            }),

                $('#col-movie').on('click',function (e) {
                    var s=$("#sea").val()
                    $("#sea").val('')
                    var vide=document.getElementById('select').value
                    $.ajax({
                        url: "/admin/movielist/1",
                        dataType: "json",
                        type: "post",
                        data:{moviename:s,video:vide},
                        success: function (e) {
                            if (e && 1 === e.code) {
                                var t = "", n = e.movies;
                                if (!n.length) return;

                                n.forEach(function (e) {
                                    if((typeof e.score)=="undefined")e.score="无";
                                    t += ' <div class="moviecol-con">\n                        <div class="moviecol-con-l" onclick="window.open(\'' + e.url + '\')">\n                            <img src="/www/uploads/'+vide+'/' + e.id + '.jpg" alt="">                        </div>\n                        <div class="moviecol-con-r">\n                        <div class="moviecol-con-title">\n                        <span class="movie-title" style="font-size: x-large">\n                        ' + e.title + '\n                </span>\n                 <span style="color: white;margin-left: 30px"> 播放次数：  '+e.playnum+' </span>   <span style="color: white;margin-left: 30px"> 采集时间：  '+e.addtime+' </span>   <span style="color: white;margin-left: 30px"> 评分：  '+e.score+' </span>             <a class="movie-play" href="' + e.url + '">\n                                    ▶播放影片\n                    </a>\n        <a id='+e.id+' class="movie-play" onclick="de(this)" href="javascript:void(0)">删除</a>\n                  </div>\n                    <span class="moviecol-con-desc">\n                        ' + e.info + "\n                </span>\n                    </div>\n                    </div>"
                                }), $("#user-colmovie").html(t),$("#pNum").text(e.pageNum)
                            }
                            else {
                                alert('未找到资源')
                            }
                        }
                    })
                }),
                //换页功能
                $("#movie-page li").on("click", function (e) {
                    $.preventDefault(e);
                    var vide= document.getElementById("select").value
                    var t = $($.getTarget(e)).text(), n = $("#pNow").text(), l = $("#pNum").text();
                    switch (l = $.isString(l) ? parseInt(l) : l, n = $.isString(n) ? parseInt(n) : n, t) {
                        case"首页":
                            n = 1;
                            break;
                        case"上一页":
                            1 < n && (n -= 1);
                            break;
                        case"下一页":
                            n < l && (n += 1);
                            break;
                        case"尾页":
                            n = l
                    }
                    $("#pNow").html(n), $.ajax({
                        url: "/admin/movielist/" + n,
                        type: "post",
                        dataType: "json",
                        data: {video: vide},
                        success: function (e) {
                            if (e && 1 === e.code) {
                                var t = "", n = e.movies;

                                if (!n.length) return;
                                n.forEach(function (e) {
                                    if((typeof e.score)=="undefined")e.score="无";
                                    t += ' <div class="moviecol-con">\n                        <div class="moviecol-con-l" onclick="window.open(\'' + e.url + '\')">\n                            <img src="/www/uploads/'+vide+'/' + e.id + '.jpg" alt="">                        </div>\n                        <div class="moviecol-con-r">\n                        <div class="moviecol-con-title">\n                        <span class="movie-title" style="font-size: x-large">\n                        ' + e.title + '\n                </span>\n                 <span style="color: white;margin-left: 30px"> 播放次数：  '+e.playnum+' </span>   <span style="color: white;margin-left: 30px"> 采集时间：  '+e.addtime+' </span>   <span style="color: white;margin-left: 30px"> 评分：  '+e.score+' </span>             <a class="movie-play" href="' + e.url + '">\n                                    ▶播放影片\n                    </a>\n        <a id='+e.id+' class="movie-play" onclick="de(this)" href="javascript:void(0)">删除</a>\n                  </div>\n                    <span class="moviecol-con-desc">\n                        ' + e.info + "\n                </span>\n                    </div>\n                    </div>"
                                })
                                    $("#user-colmovie").html(t)
                            }
                        }
                    })
                }),
                //各个列表展示
                $("#userinfo li").on("click", function (e) {
                    var t = $($.getTarget(e)), n = t.text();
                    switch ($("#userinfo li").each(function () {
                        $(this).removeClass("current"), $(this).css("backgroundColor", ""), $(this).css("color", "black")
                    }), t.css("color", "white"), t.css("backgroundColor", "#13dc06"), n.toString().trim()) {
                        case"用户列表":
                            $(".user-center").show(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").hide();
                            break;
                        case"修改密码":
                            $(".user-center").hide(), $(".user-pwd").show(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").hide();
                            break;
                        case"评论记录":
                            $(".user-center").hide(), $(".user-pwd").hide(), $(".user-comment").show(), $(".user-logininglog").hide(), $(".user-moviecol").hide();
                            break;
                        case"登录日志":
                            $(".user-center").hide(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").show(), $(".user-moviecol").hide();
                            break;
                        // case"查看视频或搜索视频":
                        //     // $(".user-center").hide(), $(".user-pwd").hide(), $(".user-comment").hide(), $(".user-logininglog").hide(), $(".user-moviecol").show()
                    }
                })
        }
    };
    window.onload = function () {
        e.init()
    }
}();