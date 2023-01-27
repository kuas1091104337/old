$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70
        }, 1000);
        return false;
      }
    }
  });

//遊戲介紹
  $("#video_box").click(function(){
      $(".video_lightbox").fadeIn();
      $(".lightbox_video_iframe>iframe").attr("src","https://www.youtube.com/embed/8vAXeBS1yLA?hd=1&amp;autoplay=1&amp;loop=1&amp;playlist=8vAXeBS1yLA");
      $(".video_lightbox").click(function(){
        $(this).fadeOut();
        $(".lightbox_video_iframe>iframe").attr("src","");
      });
  }).click();
  $(".lightbox_video_iframe").click(function(e){
      e.stopPropagation();
  });

//按鍵動畫
  $(".preLoginInput_data input").click(function(){
      $(this).removeClass("submitbtn").addClass("clickSubmitbtn");
      setTimeout(clearBtn,800);
      function clearBtn(){
          $(".preLoginInput_data input").removeClass("clickSubmitbtn").addClass("submitbtn");
      }
  });
  $(".checkContentTwo .ReBtnSize, .checkContentOne .ReBtnSize").click(function(){
      $(this).removeClass("submitbtn2").addClass("clickSubmitbtn2");
      setTimeout(clearBtn,800);
      function clearBtn(){
          $(".checkContentTwo .ReBtnSize, .checkContentOne .ReBtnSize").removeClass("clickSubmitbtn2").addClass("submitbtn2");
      }
  });
  
});

$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });