;$(function () {
  var $head_H,
      $window_W, //= $(window).outerWidth();
      $window_H,
      upDown_afterIndex,
      UAapiIndex,
      $rollUnit = $('.UAindex_main > div'),
      $sliderWrap = $('.UAapi_slider_wrap'),
      $rollUnit_item = $('.rollUnit_item'),
      $UAapi = $('.UAapi');
  $(window).on('resize', function () {
    $window_W = $(window).outerWidth(),
    $window_H = $(window).outerHeight();
    if($window_W < 1280) {
      $rollUnit_item.off('click',upDown_clickHandler);
      $rollUnit.off('mousewheel',upDown_wheelHandler);
      $('.UAapi_slider > i').off('click',rightLeft_clickHandler_desktop)
      $UAapi.off('mousewheel',rightLeft_wheelHandler);

      UAapiIndex = 0,
      upDown_afterIndex = 0,
      $head_H = $('.UAhead').height();
      $(window).on('scroll', windowScrollFunc).scroll();
      $sliderWrap.removeClass('last').addClass('first');
      // .find('li').eq(UAapiIndex).addClass('active').end().end().next().find('div').eq(UAapiIndex).addClass('active');
      UAapiSlider();
      $('.UAapi_slider_next').off('click',rightLeft_swipeNextHandler).on('click',rightLeft_swipeNextHandler);
      $('.UAapi_slider_prev').off('click',rightLeft_swipePrevHandler).on('click',rightLeft_swipePrevHandler);
      $('.UAapi_slider').off('swipeleft',rightLeft_swipeNextHandler).on('swipeleft',rightLeft_swipeNextHandler)
                        .off('swiperight',rightLeft_swipePrevHandler).on('swiperight',rightLeft_swipePrevHandler);
    }else{
      $(window).off('scroll', windowScrollFunc);
      $('.UAapi_slider_next').off('click',rightLeft_swipeNextHandler);
      $('.UAapi_slider_prev').off('click',rightLeft_swipePrevHandler);
      $('.UAapi_slider').off('swipeleft',rightLeft_swipeNextHandler).off('swiperight',rightLeft_swipePrevHandler);

      $rollUnit_item.off('click',upDown_clickHandler).on('click',upDown_clickHandler).eq(0).click();
      $rollUnit.off('mousewheel',upDown_wheelHandler).on('mousewheel',upDown_wheelHandler);
      $('.UAapi_slider > i').off('click',rightLeft_clickHandler_desktop).on('click',rightLeft_clickHandler_desktop);
      $UAapi.off('mousewheel',rightLeft_wheelHandler).on('mousewheel',rightLeft_wheelHandler);
      $('.UAapi_slider_dot').off('click',rightLeft_sliderDotHandler).on('click',rightLeft_sliderDotHandler);
    }
  }).resize();
  // mobile & desktop
  function scrollSceneActive(){
    switch(upDown_afterIndex) {
      case 0 :
        $rollUnit.removeClass('active');
        document.querySelector('video').play();
        $('.UAhead_menu').removeClass('UAhead_menu-logoDown');
        break;
      case 1 :
      case 2 :
        $rollUnit.removeClass('active').eq(upDown_afterIndex).addClass('active');
        document.querySelector('video').pause();
        $('.UAhead_menu').addClass('UAhead_menu-logoDown');
        break;
      default :
        $rollUnit.removeClass('active');
        document.querySelector('video').pause();
        $('.UAhead_menu').addClass('UAhead_menu-logoDown');
    }
  }
  // mobile
  function windowScrollFunc(){
    var WST = $(window).scrollTop();
    $rollUnit.each(function(index){
      WST >= $rollUnit.eq(index).offset().top - ($window_H / 2) - ($head_H / 2) && (upDown_afterIndex = index);
    });
    scrollSceneActive();
  }
  function sliderWrap_class(){
    if(UAapiIndex === 0) {
      $('.UAapi_slider_wrap').addClass('first');
      UAapiSlider();
    }else if(UAapiIndex < 0) {
      UAapiIndex = 0;
    }else if(UAapiIndex === $('.UAapi_slider_item').length - 1){
      $('.UAapi_slider_wrap').addClass('last');
      UAapiSlider();
    }else if(UAapiIndex > $('.UAapi_slider_item').length - 1){
      UAapiIndex= $('.UAapi_slider_item').length - 1;
    }else{
      document.querySelector('.UAapi_slider_wrap').className = 'UAapi_slider_wrap';
      UAapiSlider();
    }
  }
  // function clearSwipe(){ $('.UAapi_slider').off('swipeleft').off('swiperight'); }
  // function setSwipe(){ $('.UAapi_slider').on('swipeleft').on('swiperight'); }
  function UAapiSlider(){
    $('.UAapi_slider_item').eq(UAapiIndex).addClass('active').velocity('stop', true).velocity('scroll', {
      axis: 'x',
      duration: 500,
      container: $sliderWrap //,
      // begin:clearSwipe,
      // complete:setSwipe
    }).siblings().removeClass('active');
    $('.UAapi_slider_dot').eq(UAapiIndex).addClass('active').siblings().removeClass('active');
  }
  function rightLeft_swipeNextHandler(){
    UAapiIndex++;
    sliderWrap_class();
  }
  function rightLeft_swipePrevHandler(){
    UAapiIndex--;
    sliderWrap_class();
  }

  // desktop
  function upDown_clickHandler(){
    if($(this).hasClass('active')) return;
    var upDown_beforeIndex = $('.rollUnit_item.active').index(),
        upDown_sliderDirect;
    upDown_afterIndex = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if (upDown_beforeIndex > upDown_afterIndex) {
      upDown_sliderDirect = -1; // 後退找最後一個
    } else {
      upDown_sliderDirect = 0; // 前進找第一個
    }
    $rollUnit.eq(upDown_afterIndex).velocity('stop',true).velocity('scroll', 500)
    .find('.UAapi_slider_item').removeClass('active').eq(upDown_sliderDirect).addClass('active')
    .velocity('stop',true).velocity('scroll', {
      axis: 'x',
      duration: 0,
      container: $sliderWrap
    }).end().parent().next()
    .find('.UAapi_slider_dot').removeClass('active').eq(upDown_sliderDirect).addClass('active');
    scrollSceneActive();
  }
  function upDown_wheelHandler(e){
    if(!$(this).has('.UAapi_slider_wrap').length){
      var upDown_sliderTarget = $rollUnit_item.eq($(this).index())
      if(e.deltaY > 0){
        upDown_sliderTarget.prev().click(); // console.log('prev');
      }else{
        upDown_sliderTarget.next().click(); // console.log('next');
      }
    }
  }
  function rightLeft_clickHandler_desktop(){
    // 第一次是0，之後是index
    var rightLeft_beforeIndex = $('.UAapi_slider_item.active').length ? $('.UAapi_slider_item.active').index() : 0,
    // var rightLeft_beforeIndex = $('.UAapi_slider_item.active').index(),
        // .UAapi_slider_next為1，prv為-1
        rightLeft_slideDirect = $(this).hasClass('UAapi_slider_next') ? 1 : -1,
        // 向上時第一個時為[] & 要滑到第幾個
        rightLeft_afterIndex_Target = rightLeft_beforeIndex + rightLeft_slideDirect < 0 ? [] : $('.UAapi_slider_item').eq(rightLeft_beforeIndex + rightLeft_slideDirect)
    // 找不到那個.UAapi_slider_item 時成立，去上一層或下一層時
    if(!rightLeft_afterIndex_Target.length){
      $rollUnit_item.eq($(this).parents('.UAindex_main > div').index() + rightLeft_slideDirect).click()
    }else{
      // rightLeft_要滑到第幾個
      rightLeft_afterIndex_Target.addClass('active').velocity('stop',true).velocity('scroll',{
        axis:'x',
        duration:500,
        container:$sliderWrap,
        begin:rightLeft_clearWheel,
        complete:rightLeft_setWheel
      }).siblings().removeClass('active').end().parent().next()
      .find('.UAapi_slider_dot').removeClass('active').eq(rightLeft_beforeIndex + rightLeft_slideDirect).addClass('active');
    }
  }
  function rightLeft_wheelHandler(e){
    if(e.deltaY > 0){
      $('.UAapi_slider_prev').click();
    }else{
      $('.UAapi_slider_next').click();
    }
  }
  function rightLeft_clearWheel(){
    // $(this).parents('.slider').off('mousewheel',rightLeft_wheelHandler)
    $UAapi.unmousewheel(rightLeft_wheelHandler);
  }
  function rightLeft_setWheel(){
    $UAapi.mousewheel(rightLeft_wheelHandler);
  }
  function rightLeft_sliderDotHandler(){
    if($(this).hasClass('active')) return;
    $(this).addClass('active').siblings().removeClass('active');
    $('.UAapi_slider_item').eq($(this).index()).addClass('active').velocity('stop',true).velocity('scroll',{
      axis:'x',
      duration:500,
      container:$sliderWrap,
      begin:rightLeft_clearWheel,
      complete:rightLeft_setWheel
    }).siblings().removeClass('active');
  }
  // default
  // $('html,body').animate({ scrollTop: 0 });
  // var scrollSceneIndex = 0,
  //     $rollUnit = $('.UAindex_main > div'),
  //     $sliderWrap = $('.UAapi_slider_wrap');
  // function scrollSceneActive(){
  //   switch(scrollSceneIndex) {
  //     case 0 :
  //       $rollUnit.removeClass('active');
  //       document.querySelector('video').play();
  //       break;
  //     case 1 :
  //     case 2 :
  //       $rollUnit.removeClass('active').eq(scrollSceneIndex).addClass('active');
  //       document.querySelector('video').pause();
  //       break;
  //     default :
  //       $rollUnit.removeClass('active');
  //       document.querySelector('video').pause();
  //   }
  // }

  // parallax
  // $(window).on('resize', function () {
  //   var $window_W = $(window).outerWidth(),
  //       $window_H = $(window).outerHeight();
  //   if($window_W < 1280){
  //     var sliderDirect,
  //         UAapiIndex = 0,
  //         $head_H = $('.UAhead').height();
  //     $('.UAapi_slider_wrap').removeClass('last').addClass('first').find('li').eq(UAapiIndex).addClass('active')
  //                            .end().end().next().find('div').eq(UAapiIndex).addClass('active');
  //     sliderGo();
  //     $('.UAapi_slider > i').click(function(){
  //       sliderDirect = $(this).hasClass('UAapi_slider_next') ? 1 : -1;
  //       UAapiIndex += sliderDirect;
  //       sliderWrap_class();
  //     });
  //     $('.UAapi_slider').on('swipeleft',function(){
  //       UAapiIndex++;
  //       sliderWrap_class();
  //     }).on('swiperight',function(){
  //       UAapiIndex--;
  //       sliderWrap_class();
  //     });
  //     function sliderWrap_class(){
  //       if(UAapiIndex === 0) {
  //         $('.UAapi_slider_wrap').addClass('first');
  //         sliderGo();
  //       }else if(UAapiIndex < 0) {
  //         UAapiIndex = 0;
  //       }else if(UAapiIndex === $('.UAapi_slider_item').length - 1){
  //         $('.UAapi_slider_wrap').addClass('last');
  //         sliderGo();
  //       }else if(UAapiIndex > $('.UAapi_slider_item').length - 1){
  //         UAapiIndex= $('.UAapi_slider_item').length - 1;
  //       }else{
  //         sliderGo();
  //         document.querySelector('.UAapi_slider_wrap').className = 'UAapi_slider_wrap';
  //       }
  //     }
  //     // function clearSwipe(){
  //     //   $('.UAapi_slider').off('swipeleft').off('swiperight');
  //     // }
  //     // function setSwipe(){
  //     //   $('.UAapi_slider').on('swipeleft').on('swiperight');
  //     // }
  //     function sliderGo(){
  //       $('.UAapi_slider_item').eq(UAapiIndex).addClass('active').velocity('stop', true).velocity('scroll', {
  //         axis: 'x',
  //         duration: 500,
  //         container: $sliderWrap,
  //         // begin:clearSwipe,
  //         // complete:setSwipe
  //       }).siblings().removeClass('active');
  //       $('.UAapi_slider_dot').eq(UAapiIndex).addClass('active').siblings().removeClass('active');
  //     }
  //     $(window).on('scroll', windowScrollFunction).scroll();
  //     function windowScrollFunction(){
  //       var WST = $(window).scrollTop();
  //       $rollUnit.each(function(index){
  //         WST >= $rollUnit.eq(index).offset().top - ($window_H / 2) - ($head_H / 2) && (scrollSceneIndex = index);
  //       });
  //       scrollSceneActive();
  //     }
  //   } else {
  //     // $(window).off('scroll', windowScrollFunction);
  //     $rollUnit.each(function(){
  //       $('.rollUnit').append('<li class="rollUnit_item"></li>');
  //     });
  //   }
  // }).resize();

});
