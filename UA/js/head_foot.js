;$(function () {
  $.ajax({
     type:'get',
     url:'./load/head_nav_menu_foot.html',
     dataType:'html'
  }).done(function(data) {
    var UAlang = $('body').attr('id');
    $('.UAhead').html($('<div>'+data+'</div>').find('.UAhead-'+UAlang).html());
    $('.UAfoot').html($('<div>'+data+'</div>').find('.UAfoot-'+UAlang).html());
    if($('body').has('.UAnav-product')) $('.UAnav-product').html($('<div>'+data+'</div>').find('.UAnav-product-'+UAlang).html());
    if($('body').has('.UAnav-collaborate')) $('.UAnav-collaborate').html($('<div>'+data+'</div>').find('.UAnav-collaborate-'+UAlang).html());
    if($('body').has('.UAmenu')) $('.UAmenu').html($('<div>'+data+'</div>').find('.UAmenu').html());
  }).always(function(){
    var UAurl = location.href,
        UAhref = UAurl.substr(UAurl.lastIndexOf('/')+1);
    $('a[href="'+(UAhref||'index.html')+'"]').addClass('active');
    switch(UAhref) {
      case 'product_aeSexy.html' :
        $('.UAhead_links_item > a[href="product_whiteLabel.html"]').addClass('active');
        break;
      case 'collaborate_api.html' :
        $('a[href="collaborate_api.html"]').addClass('active');
        $('a[href="collaborate_whiteLabel.html"]').addClass('active');
        break;
      case 'product_aeGaming.html' :
      case 'product_ufaLotto.html' :
      case 'product_ufaSlot.html' :
      case 'product_ufaEsports.html' :
      case 'product_uSports.html' :
        $('.UAhead_links_item > a[href="product_whiteLabel.html"]').addClass('active');
        $('.UAnav > a[href="product_aeSexy.html"]').addClass('active');
        break;
    }
    $('.UAhead_mBtn').click(function(e){
      $('.UAhead').toggleClass('menu-open');
      e.stopPropagation();
    });
    $('.UAhead_links_item-lang').click(function(e){
      $(this).toggleClass('menu-open');
    });
    $('.UAhead_menu').click(function(e){
      e.stopPropagation();
    });
    $('.UAhead > .wrap').click(function(){
      $('.UAhead').removeClass('menu-open')
      $('.UAhead_links_item-lang').removeClass('menu-open')
    });
    // 多國語系
    // $('.UAhead_lang_item > a').click(function () {
    //   if($('body').attr('id') === $(this).attr('id')) return;
    //   var website = window.location.href;
    //   window.location = '../' +  $(this).attr('id') + website.substr(website.lastIndexOf('/'));
    // });
    if(!$('body').hasClass('UAindex')){
      $(window).on('resize',function() {
        if($(window).outerWidth() < 1280){
          $(window).off('scroll',headScrollFunc);
        }else{
          $(window).off('scroll',headScrollFunc).on('scroll',headScrollFunc).scroll();
        }
      }).resize();
    }
  });
  function headScrollFunc(){
    $(window).scrollTop() > 200 ? $('.UAhead').addClass('UAhead-black') : $('.UAhead').removeClass('UAhead-black');
  }
});
