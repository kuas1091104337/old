//lang
;function setLang(e) {
  var title = Object.keys(e);
  for (var i = 0, max = title.length; i < max; i++) {
      $('[text=' + title[i] + ']').text(e[title[i]]);
  };
}

$(function () {
  var ajax1 = $.ajax({
    url:'../load/lottery.html',
    dataType:'html'
  }).done(function(data) {
    $('#contact').before(data);
  });
  var ajax2 = $.ajax({
    url:'../../load/contact.html',
    dataType:'html'
  }).done(function(data) {
    $('#contact').append(data);
  });
  var ajax3 = $.ajax({
    url:'../../load/foot.html',
    dataType:'html'
  }).done(function(data) {
    $('#foot').append(data);
  });
  $.when(ajax1, ajax2, ajax3).then(function(data1, data2, data3){
    switch($('body').attr('class')) {
      case 'zh' :
        setLang(i18n.zh);
        $('#zh').parent().addClass('active');
        break;
      case 'th' :
        setLang(i18n.th);
        $('#th').parent().addClass('active');
        break;
      case 'en' :
        setLang(i18n.en);
        $('#en').parent().addClass('active');
        break;
    };

    var distance = 1000,//(px)
      speed = 300,//(ms)
      minSpeed = 300,//(ms)
      maxSpeed = 600,//(ms)
      scrollSceneActive = 0,
      rate = speed / distance,
      // $headHeight = $('.head').height(),
      $markWidth, $markLeft,
      $headMenuMark = $('.head_menu_mark'),
      $RollingUnit = $('body > section'),
      $windowHeight = $(window).outerHeight(),
      $windowWidth = $(window).outerWidth();

    // window scroll function，這裡的滾動程式己經客制修改太多，不適合通用了
    function windowScrollFunction() {
      var WST = $(window).scrollTop();
      $RollingUnit.each(function (index) {
        // WST >= $RollingUnit.eq(index).offset().top - $headHeight - ($windowHeight / 2) && (scrollSceneActive = index)
        WST >= $RollingUnit.eq(index).offset().top - ($windowHeight / 4) && (scrollSceneActive = index)
      });
      $('.head_menu_list').removeClass('active').eq(scrollSceneActive).addClass('active');
      if ($windowWidth >= 1280) {
        menuMarkFollowClass();
      }
      headChangeColor()
      $RollingUnit.removeClass('active').eq(scrollSceneActive).addClass('active');
    }

    $('.head_menu_list').click(function () {
      if (!$(this).hasClass('active')) {
        // html,body{overflow-x:hidden;overflow-y:auto;} 與 html,body {height:100%;} 無法同時使用，不然下面的滾動程式會運作錯誤
        var goToOffsetTop,
            $this = $(this),
            clickSceneActive = $this.index(),
            $RollingTarget = $RollingUnit.eq(clickSceneActive);
        scrollSceneActive = clickSceneActive;
        $(window).off('scroll', windowScrollFunction);
        $('.head').removeClass('menu-open');
        $this.addClass('active').siblings('li').removeClass('active');
        if ($windowWidth >= 1280) {
          menuMarkFollowClass();
        }
        $RollingUnit.removeClass('active').eq(clickSceneActive).addClass('active');
        goToOffsetTop = $RollingTarget.offset().top; // 選單滾動位置，都置頂
        var bodySrcollTime = Math.abs($(window).scrollTop() - goToOffsetTop) / rate;
        $('html, body').stop(true).delay(200).animate({
          scrollTop: goToOffsetTop
        }, (bodySrcollTime < minSpeed ? minSpeed : bodySrcollTime > maxSpeed ? maxSpeed : bodySrcollTime), function () {
          headChangeColor();
          $(window).on('scroll', windowScrollFunction);
        })
      }
    });

    // window scroll & resize
    $(window).on('scroll', windowScrollFunction).scroll().on("resize", function () {
      $windowHeight = $(window).outerHeight();
      // $headHeight = $('.head').height();
      $windowWidth = $(window).outerWidth();
      $('.home').attr("style","height:" + $windowHeight + "px;");
      if ($windowWidth >= 1024) {
        $('.head_lang_btn').on('click', function(){
          $('.head_lang').toggleClass('open');
        });
      } else {
        $('.head_lang_btn').off('click')
      }
      if ($windowWidth >= 1280) {
        var $headMenuMarkRefer = $('.head_menu_list.active');
        $markWidth = $headMenuMarkRefer.outerWidth() - 30;
        $markLeft = $headMenuMarkRefer.offset().left + 15;
        $headMenuMark.css({'width':$markWidth, 'left':$markLeft});
        $('.head_menu_list').mouseenter(function(){
          var $newWidth = $(this).outerWidth() - 30,
              $newLeft = $(this).offset().left + 15;
          $headMenuMark.css({'width':$newWidth, 'left':$newLeft});
        }).mouseleave(function(){
          $headMenuMark.css({'width':$markWidth, 'left':$markLeft});
        });
      }
    }).resize();

    // header
    $('.head_mBtn').click(function () {
      $('.head').toggleClass('menu-open');
    });
    $('.head_lang_list.active').click(function () {
      $(this).parent().removeClass('open')
      $('.head').removeClass('menu-open');
      return false;
    });
    function menuMarkFollowClass(){
      var $headMenuMarkRefer = $('.head_menu_list.active');
      $markWidth = $headMenuMarkRefer.outerWidth() - 30;
      $markLeft = $headMenuMarkRefer.offset().left + 15;
      $headMenuMark.css({'width':$markWidth, 'left':$markLeft});
    }
    function headChangeColor(){
      switch(scrollSceneActive) {
        case 0 :
        case 4 :
          $('.head').attr("id","blue");
          break;
        case 1 :
          $('.head').attr("id","white");
          break;
        case 2 :
        case 3 :
          $('.head').attr("id","lilac");
          break;
      }
    }

  },function(){
    $('body').prepend('<p class="error">Ajax Something Error</p>')
    console.log(['ajax error', 'ajax1 :', data1, 'ajax2 :', data2, 'ajax3 :', data3]);
  });

  // default
  $("html,body").animate({ scrollTop: 0 }, 600);

  //goToTop
  $('#goToTop').click(function () {
    $("html,body").animate({ scrollTop: 0 }, 600);
  });
});
