//lang
function setLang(e) {
  var title = Object.keys(e);
  for (var i = 0, max = title.length; i < max; i++) {
      $('[text=' + title[i] + ']').text(e[title[i]]);
  };
}

$(function () {
  var locale = $('html').attr('lang');
  var ajax1 = $.ajax({
    url:'../load/cnHead.html',
    dataType:'html'
  }).done(function(data) {
    $('.lotHead').append(data);
  });
  var ajax2 = $.ajax({
    url: '../info/json/cn_lottery.json',
    dataType: 'json'
  }).done(function (data) {
    for (var i = 0, Imax = data.length; i < Imax; i++) {
      var cnLotList = "";
      switch(locale) {
        case 'zh' :
          cnLotList += '<li class="cnLot_list"><img class="cnLot_img" src="../info/img/' + data[i].lotImg + '" alt="' + data[i].lotCnName + '"><p class="cnLot_text">' + data[i].lotCnName + '</p></li>';
          break;
        case 'th' :
          cnLotList += '<li class="cnLot_list"><img class="cnLot_img" src="../info/img/' + data[i].lotImg + '" alt="' + data[i].lotThName + '"><p class="cnLot_text">' + data[i].lotThName + '</p></li>';
          break;
        default :
          cnLotList += '<li class="cnLot_list"><img class="cnLot_img" src="../info/img/' + data[i].lotImg + '" alt="' + data[i].lotEnName + '"><p class="cnLot_text">' + data[i].lotEnName + '</p></li>';
      }
      $('.cnLot_menu').append(cnLotList);
    }
  });
  var ajax3 = $.ajax({
    url:'../../load/contact.html',
    dataType:'html'
  }).done(function(data) {
    $('#contact').append(data);
  });
  var ajax4 = $.ajax({
    url:'../../load/foot.html',
    dataType:'html'
  }).done(function(data) {
    $('#foot').append(data);
  });
  $.when(ajax1, ajax2, ajax3, ajax4).then(function(data1, data2, data3, data4){
    switch(locale) {
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
    // header
    $('#cn_lottery').addClass('active');
    $('.lotHead .active').click(function () {
      if ($(this).hasClass('lotHead_lang_list')) {
        $(this).parent().removeClass('open');
      }
      return false;
    });
    $('.lotHead_lang_btn').click(function () {
      $(this).parent().toggleClass('open');
    });
  },function(){
    $('body').prepend('<p class="error">Ajax Something Error</p>')
    console.log(['ajax error', 'ajax1 :', data1, 'ajax2 :', data2, 'ajax3 :', data3]);
  });

  // default
  $('html,body').animate({ scrollTop: 0 });

  //goToTop
  $('#goToTop').click(function () {
    $("html,body").animate({ scrollTop: 0 }, 600);
  });
});
