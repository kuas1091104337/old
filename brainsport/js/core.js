$(function(){
    $("ul.service_nav").load("include/common.html ul.service_nav>li");
    $("ul.accountManagement").load("include/common.html ul.accountManagement>li");
    $("ul.issueForms").load("include/common.html ul.issueForms>li");
    $("ul.FAQ").load("include/common.html ul.FAQ>li");
    $("footer").load("include/common.html footer>div");
    $("#lteIE").load("include/common.html #lteIE>div");
//navbar JQ
    $("header#signIn").load("include/common.html header#signIn>hgroup", function(){
        $("#language").click(function(){
            $("nav ul ul").stop().fadeToggle();
            $("#popup").hide();
        });
        $(".sign_in").click(function(){;
            $("#popup").stop().slideToggle()
            $("nav ul ul").hide();
            if($(window).outerWidth(true)<750){//innerWidth()
                $("ul.second").stop().fadeToggle();
            }
        });
        $("li.menu_icon").click(function(){
            $("ul.second").stop().fadeToggle();
        });
    });
    $("header#signOut").load("include/common.html header#signOut>hgroup", function(){
        $("#language").click(function(){
            $("nav ul ul").stop().fadeToggle();
            $("#popup").hide();
        });
        $("li.menu_icon").click(function(){
            $("ul.second").stop().fadeToggle();
        });
    });
    $("#popup").load("include/common.html #popup>div", function(){
        $("#popup-box-close").click(function(){
            $("#popup").stop().slideToggle();
        });
    });
    $(window).on("resize",function(){
        if($(window).outerWidth(true)>750){//innerWidth()
            $("ul.second").attr("style","");
        }
    });// .outerWidth(true)
//會員註冊 JQ
    $("#TAB_MAN").click(function(){
        $("#TAB_MAN").removeClass("man").addClass("clickMan")
        $("#TAB_WOMAN").removeClass("clickWoman").addClass("woman")
    });
    $("#TAB_WOMAN").click(function(){
        $("#TAB_WOMAN").removeClass("woman").addClass("clickWoman")
        $("#TAB_MAN").removeClass("clickMan").addClass("man")
    });
//常見問題 JQ
    $("ul.faq_box li .ans_box").eq(0).slideDown();
    $("ul.faq_box li span").eq(0).addClass("move");
    $("ul.faq_box li h3").click( function(){
        $(this).siblings().slideDown(500).parent().siblings().find(".ans_box").slideUp(500);
        $(this).children().addClass("move").parent().parent().siblings().children().find("span").removeClass("move");
    });
//全部按扭動畫
    $("li.storeLightBtn a, .cardInput_data button, .service_content .notice button, .carrier-code-box button").click(function(){
        $(this).removeClass("submitbtn").addClass("clickSubmitbtn");
        setTimeout(clearBtn,800);
        function clearBtn(){
            $("li.storeLightBtn a, .cardInput_data button, .service_content .notice button, .carrier-code-box button").removeClass("clickSubmitbtn").addClass("submitbtn");
        }
    });
//我要提問區
    $("#cancelBtn").click(function(){
        alert("確定清空提問內容?");
        document.getElementById('fm').reset();
    });
//本地儲值(除線上刷卡、Hinet之外)
    $("figure.money").click(function(){
        $(this).addClass("picking").siblings().removeClass("picking");
    });
    $(".storeBtnSwitch figure").one("click", function(){
        $(".webStoreBtn").slideDown();
        var position=$(".attention").offset().top - $("header").outerHeight(true);
        $("html,body").stop().delay(400).animate({
            scrollTop:position
        });
    });
//儲值金額(線上刷卡、Hinet)
    //選擇"儲值金額"出現"選擇信用卡機制"
    $("#money-card figure").one("click", function(){
        $("#creditCardMechanism").slideDown();
        var position=$("#creditCardMechanism").offset().top - $("header").outerHeight(true) - 25;
        $("html,body").stop().delay(400).animate({
            scrollTop:position    
        });
    });
    //選擇"信用卡機制"出現"確定付款"
    $("li.authenticateNon3D").one("click", function(){
        $("#creditCardPayment").slideDown();
        var position=$("#non-3D").offset().top - $("header").outerHeight(true) - 15;
        $("html,body").stop().delay(300).animate({
            scrollTop:position    
        });
    });
    $("li.authenticateNon3D a").click(function(){
        $("#non-3D").slideDown();
    });
    $("li.authenticate3D").one("click", function(){
        $("#creditCardPayment").slideDown();
        var position=$(".attention").offset().top - $("header").outerHeight(true) - 15;
        $("html,body").stop().delay(300).animate({
            scrollTop:position    
        });
    });
    $("li.authenticate3D a").click(function(){
        $("#non-3D").slideUp();
    });
    //3D認證機制的lightBox
    $("p.certification3D").click(function(){
        $("#lightbox3D").fadeIn();
        $("#lightbox3D .lightbox-close").click(function(){
            $("#lightbox3D").fadeOut();
        });
    });
//儲值金額 MOL(東南亞國家適用)、線上刷卡
    $(".storeMenu li a").click(function(){
        $(".storeMenu li a").removeClass();
        $(this).addClass("click");
    });    
//Hinet小額付費
    $("#money-hinet figure").one("click", function(){
        $("#non-3D").slideDown();
        var position=$("#non-3D").offset().top - $("header").outerHeight(true) - 25;
        $("html,body").stop().delay(400).animate({
            scrollTop:position    
        });
    });
    //請程式改成手機號碼按發送後、認證號碼 認證後，按#certNumber之後#hinetPayment才出現
    $("#certNumber").one("click", function(){
        $("#hinetPayment").slideDown();
        var position=$("#hinetPayment").offset().top - $("header").outerHeight(true);
        $("html,body").stop().delay(400).animate({
            scrollTop:position    
        });
    });
//海外儲值(PayPal、MOL)
    $(".foreignStoreBtnSwitch figure, .foreignStoreBtnSwitch li a").one("click", function(){
        $(".webStoreBtn").slideDown();
        var position=$(".webStoreBtn").offset().top - $("header").outerHeight(true);
        $("html,body").stop().delay(400).animate({
            scrollTop:position   
        });
    });
//購買同意書
    //購買同意書lightBox
    $("#lightbox").load("include/common.html #lightbox>div");
    $("span.consent").click(function(){
        $("#lightbox").fadeIn();
        $("h6.lightbox-close").click(function(){
            $("#lightbox").fadeOut();
        });
    });
    //同意書下方"確定付款"跳頁
    $(".consentCheck").change(function(){
        if($(this).is(":checked")){
            $("#prepaidMoney").on("click", function() {
                $(this).removeClass("submitbtn").addClass("clickSubmitbtn");
                setTimeout(function(){
                    location.href="invoice.html";
                },400);
            }).removeClass("off");
            $("#okPay").on("click", function() {
                $(this).removeClass("submitbtn").addClass("clickSubmitbtn");
                setTimeout(function(){
                    location.href="result.html";
                },400);
            }).removeClass("off");
        }else{
            $("#prepaidMoney, #okPay").off("click").addClass("off");
        };       
    }).change();
//儲值資訊
    $("#choose-invoice-type .person").click(function(){
        $("#choose-invoice-carrier").slideDown();
        $("#choose-invoice-donate").slideUp();
    });
    $("#choose-invoice-type .donate").click(function(){
        $("#choose-invoice-donate").slideDown();
        $("#choose-invoice-carrier").slideUp();
    });
//goTop區
    $("aside").load("include/common.html aside>div", function(){
        $(window).scroll(function(){
            if($(window).scrollTop()>1000){
                $("#goTop").stop().fadeIn();
            }else{
                $("#goTop").stop().fadeOut();
            };
        });
        $("#goTop").click(function(){
            $("html,body").animate({scrollTop:0},600);
        });
    });
//影音專區
    $(".video_gallery .video_box").click(function(){
        var videoNumber = $(this).index();
        $(".video_lightbox_"+videoNumber).delay(350).fadeIn();

        $(".video_lightbox_"+videoNumber).click(function(){
             $(this).fadeOut();
             
        });
    });
    $(".lightbox_video_iframe").click(function(e){
        e.stopPropagation();
    });

});
