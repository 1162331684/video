!function (n, o, t, s) {
    "use strict";
    var i = n.fn.twbsPagination, r = function (t, s) {
        if (this.$element = n(t), this.options = n.extend({}, n.fn.twbsPagination.defaults, s), this.options.startPage < 1 || this.options.startPage > this.options.totalPages) throw new Error("Start page option is incorrect");
        if (this.options.totalPages = parseInt(this.options.totalPages), isNaN(this.options.totalPages)) throw new Error("Total pages option is not correct!");
        if (this.options.visiblePages = parseInt(this.options.visiblePages), isNaN(this.options.visiblePages)) throw new Error("Visible pages option is not correct!");
        if (this.options.totalPages < this.options.visiblePages && (this.options.visiblePages = this.options.totalPages), this.options.onPageClick instanceof Function && this.$element.first().on("page", this.options.onPageClick), this.options.href) {
            var i, e = this.options.href.replace(/[-\/\\^$*+?.|[\]]/g, "\\$&");
            e = e.replace(this.options.hrefVariable, "(\\d+)"), null != (i = new RegExp(e, "i").exec(o.location.href)) && (this.options.startPage = parseInt(i[1], 10))
        }
        var a = "function" == typeof this.$element.prop ? this.$element.prop("tagName") : this.$element.attr("tagName");
        return this.$listContainer = "UL" === a ? this.$element : n("<ul></ul>"), this.$listContainer.addClass(this.options.paginationClass), "UL" !== a && this.$element.append(this.$listContainer), this.render(this.getPages(this.options.startPage)), this.setupEvents(), this.options.initiateStartPageClick && this.$element.trigger("page", this.options.startPage), this
    };
    r.prototype = {
        constructor: r, destroy: function () {
            return this.$element.empty(), this.$element.removeData("twbs-pagination"), this.$element.off("page"), this
        }, show: function (t) {
            if (t < 1 || t > this.options.totalPages) throw new Error("Page is incorrect.");
            return this.render(this.getPages(t)), this.setupEvents(), this.$element.trigger("page", t), this
        }, buildListItems: function (t) {
            var s = [];
            if (this.options.first && s.push(this.buildItem("first", 1)), this.options.prev) {
                var i = 1 < t.currentPage ? t.currentPage - 1 : this.options.loop ? this.options.totalPages : 1;
                s.push(this.buildItem("prev", i))
            }
            for (var e = 0; e < t.numeric.length; e++) s.push(this.buildItem("page", t.numeric[e]));
            if (this.options.next) {
                var a = t.currentPage < this.options.totalPages ? t.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
                s.push(this.buildItem("next", a))
            }
            return this.options.last && s.push(this.buildItem("last", this.options.totalPages)), s
        }, buildItem: function (t, s) {
            var i = n("<li></li>"), e = n("<a></a>"), a = null;
            switch (t) {
                case"page":
                    a = s, i.addClass(this.options.pageClass);
                    break;
                case"first":
                    a = this.options.first, i.addClass(this.options.firstClass);
                    break;
                case"prev":
                    a = this.options.prev, i.addClass(this.options.prevClass);
                    break;
                case"next":
                    a = this.options.next, i.addClass(this.options.nextClass);
                    break;
                case"last":
                    a = this.options.last, i.addClass(this.options.lastClass)
            }
            return i.data("page", s), i.data("page-type", t), i.append(e.attr("href", this.makeHref(s)).html(a)), i
        }, getPages: function (t) {
            var s = [], i = Math.floor(this.options.visiblePages / 2), e = t - i + 1 - this.options.visiblePages % 2,
                a = t + i;
            e <= 0 && (e = 1, a = this.options.visiblePages), a > this.options.totalPages && (e = this.options.totalPages - this.options.visiblePages + 1, a = this.options.totalPages);
            for (var o = e; o <= a;) s.push(o), o++;
            return {currentPage: t, numeric: s}
        }, render: function (s) {
            var i = this;
            this.$listContainer.children().remove(), this.$listContainer.append(this.buildListItems(s)), this.$listContainer.children().each(function () {
                var t = n(this);
                switch (t.data("page-type")) {
                    case"page":
                        t.data("page") === s.currentPage && t.addClass(i.options.activeClass);
                        break;
                    case"first":
                        t.toggleClass(i.options.disabledClass, 1 === s.currentPage);
                        break;
                    case"last":
                        t.toggleClass(i.options.disabledClass, s.currentPage === i.options.totalPages);
                        break;
                    case"prev":
                        t.toggleClass(i.options.disabledClass, !i.options.loop && 1 === s.currentPage);
                        break;
                    case"next":
                        t.toggleClass(i.options.disabledClass, !i.options.loop && s.currentPage === i.options.totalPages)
                }
            })
        }, setupEvents: function () {
            var i = this;
            this.$listContainer.find("li").each(function () {
                var s = n(this);
                s.off(), s.hasClass(i.options.disabledClass) || s.hasClass(i.options.activeClass) ? s.on("click", !1) : s.click(function (t) {
                    !i.options.href && t.preventDefault(), i.show(parseInt(s.data("page")))
                })
            })
        }, makeHref: function (t) {
            return this.options.href ? this.options.href.replace(this.options.hrefVariable, t) : "#"
        }
    }, n.fn.twbsPagination = function (t) {
        var s, i = Array.prototype.slice.call(arguments, 1), e = n(this), a = e.data("twbs-pagination"),
            o = "object" == typeof t && t;
        return a || e.data("twbs-pagination", a = new r(this, o)), "string" == typeof t && (s = a[t].apply(a, i)), void 0 === s ? e : s
    }, n.fn.twbsPagination.defaults = {
        totalPages: 0,
        startPage: 1,
        visiblePages: 5,
        initiateStartPageClick: !0,
        href: !1,
        hrefVariable: "{{number}}",
        first: "First",
        prev: "Previous",
        next: "Next",
        last: "Last",
        loop: !1,
        onPageClick: null,
        paginationClass: "pagination",
        nextClass: "next",
        prevClass: "prev",
        lastClass: "last",
        firstClass: "first",
        pageClass: "page",
        activeClass: "active",
        disabledClass: "disabled"
    }, n.fn.twbsPagination.Constructor = r, n.fn.twbsPagination.noConflict = function () {
        return n.fn.twbsPagination = i, this
    }
}(window.jQuery, window, document);