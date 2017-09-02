/**
 * Created by sky on 2017/7/12.
 */

//购物车效果
$("#J_miniCartTrigger").hover(function () {
    $(this).addClass("topbar-cart-active");
    //$("#J_miniCartMenu").css("display","block");
    $("#J_miniCartMenu").stop().slideDown(300);
},function () {
    $(this).removeClass("topbar-cart-active");
    //$("#J_miniCartMenu").css("display","none");
    $("#J_miniCartMenu").stop().slideUp(300);
});

//侧边栏的显示
$("#J_categoryList").children().hover(function () {
    //$(this).css('background','#ff6700');
    $(this).children(".children").show();
},function () {
    $(this).children(".children").hide();
});

var n,t;

//菜单栏显示
$('.J_navMainList').children('.nav-item').hover(function () {

    var o, a = $('.J_navMainList'),
        i = $('#J_navMenu'),
        r = i.find('> .container')
        e = $(this);

    t && (clearTimeout(t), t = null);  //取消动画
    a.data('toggled',!0);
    e.addClass('nav-item-active');

    if(e.find('.children-list').length) {

        o = e.find('.children-list').clone();
        o.find('img').each(function () {
            $(this).attr('src',$(this).attr('data-src'));
        });
        r.html(o);
        a.data('toggled') && ( n = setTimeout(function () {
           i.stop(true,false).slideDown(300);
        },200));
    } else {
        i.removeClass("header-nav-menu-active").stop(!0,!1).slideUp(200);
    }

},function () {

    $(this).removeClass('nav-item-active');

    n && (clearTimeout(n), n = null);
    t = setTimeout(function () {
        $('#J_navMenu').stop(true,false).slideUp(300);
    },200);

});


$(function () {

    var i = $('<div id="J_navMenu" class="header-nav-menu" style="display: none;"><div class="container"></div></div>');

    i.appendTo(".site-header").hover(function () {
        t && (clearTimeout(t), t = null)
    },function () {
        t = setTimeout(function() {
            i.slideUp();
        }, 200)
    });

    //搜索框点击事件
    var a = $('#J_searchForm'),
        s = $('<div id="J_keywordList" class="keyword-list hide"><ul class="result-list"></ul></div>'),
        c = a.find("#search"),
        u = {},
        p = null,
        l = a.find(".search-hot-words");

    function m(arr) {
        for(var n='', i=0; i<arr.length; i++) {
            var r,o;
            if('object' == typeof arr[i]) {
                r = arr[i].Key;
                o = arr[i].Rst ? '<span class="result">约有' + arr[i].Rst + '件</span>': '';

                n += '<li data-key="' + arr[i].Key + '"><a href="//search.mi.com/search_' + encodeURIComponent(arr[i].Key) + '">' + r + o + '</a></li>';
            }
        }

        s.removeClass('hide').children('.result-list').html(n);
    }

    function r(keycode) {

        var li = s.find('li'),
            index = s.find('.active').index() || 0,
            l = li.length - 1;
        if(38 === keycode) {
            //代码最简的写法
        /*    if(index--,index<0) {
                return index = 0, false;
            }*/
            index--;
            if(index < 0) {
                index = 0;
                return false;
            }
            li.eq(index).addClass('active').siblings().removeClass('active');
            c.val(li.eq(index).data('key'));

        }else if(40 === keycode) {
            /*if(index++, index>l) {
                return index = l,false;
            }*/

            //index = index + 1;
            ++index;
            //index++;   这儿前++和后++都是一样的.
            if(index > l) {
                index = l ;
                return false;
            }
            li.eq(index).addClass('active').siblings().removeClass('active');
            c.val(li.eq(index).data('key'));

        }
    }

    if(a.length) {
        c = a.find('#search');
        try {
            u = $.parseJSON(c.data('search-config').replace(/'/g, '"'));
        } catch (g) {
        }

        a.append(s);

        c.on('focus', function () {
            p && clearTimeout(p);
            l.fadeOut(200);
            a.addClass("search-form-focus");
            !$(this).val() && u.defaultWords && m(u.defaultWords);
        }).on('blur', function () {
            "" === $.trim(c.val()) && $('.search-hot-words').fadeIn(200);
            p = setTimeout(function () {
                a.removeClass("search-form-focus");
                s.addClass("hide");
            }, 200);
        }).on('keyup', function (e) {
            !$(this).val() && u.defaultWords && m(u.defaultWords);
            r(e.keyCode);


        })
    }

})


