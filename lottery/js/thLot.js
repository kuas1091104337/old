//lang
function setLang(e) {
  var title = Object.keys(e);
  for (var i = 0, max = title.length; i < max; i++) {
      $('[text=' + title[i] + ']').text(e[title[i]]);
  };
}

$(function () {
  var locale = $('html').attr('lang');
  // var lotType = $('body').attr('class');
  var ajax1 = $.ajax({
    url:'../load/thHead.html',
    dataType:'html'
  }).done(function(data) {
    $('.lotHead').append(data);
  });
  // if (lotType) { var ajax2 = console.log(1); } else { var ajax2 = console.log(2); }
  // thLot 和 cnLot 在 var ajax2的內容是不同的
  var ajax2 = $.ajax({
    url: '../info/json/th_lottery.json',
    dataType: 'json'
  }).done(function (data) {
    for (var i = 0, Imax = data.length; i < Imax; i++) {
      var thLotList = "";
      switch(locale) {
        case 'zh' :
          thLotList += '<section class="thLot_item"><h3 class="thLot_title">' + data[i].langZh.thLotTitle + '</h3><ul class="thLot_menu">';
          for (var j = 0, Jmax = data[i].langZh.thLotGameType.length; j < Jmax; j++){
            thLotList += '<li class="thLot_list ' + data[i].thLotClass + '"><p class="thLot_text';
            if (data[i].thLotGameCountry.length) thLotList += ' ' +  data[i].thLotGameCountry[j];
            thLotList += '">' + data[i].langZh.thLotGameType[j].gameName01;
            if (data[i].langZh.thLotGameType[j].gameName02) thLotList += '<span>' + data[i].langZh.thLotGameType[j].gameName02 + '</span>';
            thLotList += '</p><div class="thLot_info"><div class="thLot_info_box"><div class="thLot_info_head">' + data[i].langZh.thLotBoxTitle + '<div class="thLot_info_close"></div></div><div class="thLot_info_content"><div class="thLot_info_title">' + data[i].langZh.thLotBoxAbout + data[i].langZh.thLotGameType[j].gameName01 + '</div><div class="thLot_info_text">' + data[i].langZh.thLotGameType[j].gameAboutExplain;
            if (data[i].langZh.thLotGameType[j].gameAboutLink) thLotList += '<a href="' + data[i].langZh.thLotGameType[j].gameAboutLink + '" target="_blank">' + data[i].langZh.thLotGameType[j].gameAboutLink + '</a>';
            thLotList += '</div>';
            switch(data[i].thLotClass) {
              // thLot_list yeekee 系列
              case 'yeekee' :
                thLotList += '<div class="thLot_info_title">' + data[i].langZh.thLotGameType[j].gamePeriodTitle + '</div><div class="thLot_info_text">' + data[i].langZh.thLotGameType[j].gamePeriodText + '</div><div class="thLot_info_title">' + data[i].langZh.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langZh.thLotBoxPlayText + '</div>';
                break;
              // thLot_list 股票彩 系列
              case 'stock' :
                thLotList += '<div class="thLot_info_title">' + data[i].langZh.gameTimeTitle + '</div><div class="thLot_info_text addLink">' + data[i].langZh.thLotGameType[j].gameTimeText + '<a href="' + data[i].langZh.thLotGameType[j].gameTimeLink + '" target="_blank">' + data[i].langZh.thLotGameType[j].gameTimeLink + '</a></div><div class="thLot_info_title">' + data[i].langZh.gameAwardNumberTitle + '</div><div class="thLot_info_text">' + data[i].langZh.thLotGameType[j].gameAwardNumberText + '<img src="../img/' + data[i].langZh.thLotGameType[j].gameAwardNumberImg + '" alt="' + data[i].langZh.thLotGameType[j].gameName01 + '"></div><div class="thLot_info_title">' + data[i].langZh.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langZh.thLotGameType[j].thLotBoxPlayText + '</div>';
                break;
              // thLot_list 其他 系列
              default :
                thLotList += '<div class="thLot_info_title">' + data[i].langZh.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langZh.thLotBoxPlayText + '</div>';
            }
            thLotList += '</div></div></div></li>';
          }
          thLotList += '</ul></section>';
          break;
        case 'th' :
          thLotList += '<section class="thLot_item"><h3 class="thLot_title">' + data[i].langTh.thLotTitle + '</h3><ul class="thLot_menu">';
          for (var j = 0, Jmax = data[i].langTh.thLotGameType.length; j < Jmax; j++){
            thLotList += '<li class="thLot_list ' + data[i].thLotClass + '"><p class="thLot_text';
            if (data[i].thLotGameCountry.length) thLotList += ' ' +  data[i].thLotGameCountry[j];
            thLotList += '">' + data[i].langTh.thLotGameType[j].gameName01;
            if (data[i].langTh.thLotGameType[j].gameName02) thLotList += '<span>' + data[i].langTh.thLotGameType[j].gameName02 + '</span>';
            thLotList += '</p><div class="thLot_info"><div class="thLot_info_box"><div class="thLot_info_head">' + data[i].langTh.thLotBoxTitle + '<div class="thLot_info_close"></div></div><div class="thLot_info_content"><div class="thLot_info_title">' + data[i].langTh.thLotGameType[j].thLotBoxAboutTitle + '</div><div class="thLot_info_text">' + data[i].langTh.thLotGameType[j].gameAboutExplain;
            if (data[i].langTh.thLotGameType[j].gameAboutLink) thLotList += '<a href="' + data[i].langTh.thLotGameType[j].gameAboutLink + '" target="_blank">' + data[i].langTh.thLotGameType[j].gameAboutLink + '</a>';
            thLotList += '</div>';
            switch(data[i].thLotClass) {
              // thLot_list yeekee 系列
              case 'yeekee' :
                thLotList += '<div class="thLot_info_title">' + data[i].langTh.thLotGameType[j].gamePeriodTitle + '</div><div class="thLot_info_text">' + data[i].langTh.thLotGameType[j].gamePeriodText + '</div><div class="thLot_info_title">' + data[i].langTh.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langTh.thLotBoxPlayText + '</div>';
                break;
              // thLot_list 股票彩 系列
              case 'stock' :
                thLotList += '<div class="thLot_info_title">' + data[i].langTh.gameTimeTitle + '</div><div class="thLot_info_text addLink">' + data[i].langTh.thLotGameType[j].gameTimeText + '<a href="' + data[i].langTh.thLotGameType[j].gameTimeLink + '" target="_blank">' + data[i].langTh.thLotGameType[j].gameTimeLink + '</a></div><div class="thLot_info_title">' + data[i].langTh.gameAwardNumberTitle + '</div><div class="thLot_info_text">' + data[i].langTh.thLotGameType[j].gameAwardNumberText + '<img src="../img/' + data[i].langTh.thLotGameType[j].gameAwardNumberImg + '" alt="' + data[i].langTh.thLotGameType[j].gameName01 + '"></div><div class="thLot_info_title">' + data[i].langTh.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langTh.thLotGameType[j].thLotBoxPlayText + '</div>';
                break;
              // thLot_list 其他 系列
              default :
                thLotList += '<div class="thLot_info_title">' + data[i].langTh.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langTh.thLotBoxPlayText + '</div>';
            }
            thLotList += '</div></div></div></li>';
          }
          thLotList += '</ul></section>';
          break;
        default :
          thLotList += '<section class="thLot_item"><h3 class="thLot_title">' + data[i].langEn.thLotTitle + '</h3><ul class="thLot_menu">';
          for (var j = 0, Jmax = data[i].langEn.thLotGameType.length; j < Jmax; j++){
            thLotList += '<li class="thLot_list ' + data[i].thLotClass + '"><p class="thLot_text';
            if (data[i].thLotGameCountry.length) thLotList += ' ' +  data[i].thLotGameCountry[j];
            thLotList += '">' + data[i].langEn.thLotGameType[j].gameName01;
            if (data[i].langEn.thLotGameType[j].gameName02) thLotList += '<span>' + data[i].langEn.thLotGameType[j].gameName02 + '</span>';
            thLotList += '</p><div class="thLot_info"><div class="thLot_info_box"><div class="thLot_info_head">' + data[i].langEn.thLotBoxTitle + '<div class="thLot_info_close"></div></div><div class="thLot_info_content"><div class="thLot_info_title">' + data[i].langEn.thLotBoxAbout + data[i].langEn.thLotGameType[j].gameName01 + '</div><div class="thLot_info_text">' + data[i].langEn.thLotGameType[j].gameAboutExplain;
            if (data[i].langEn.thLotGameType[j].gameAboutLink) thLotList += '<a href="' + data[i].langEn.thLotGameType[j].gameAboutLink + '" target="_blank">' + data[i].langEn.thLotGameType[j].gameAboutLink + '</a>';
            thLotList += '</div>';
            switch(data[i].thLotClass) {
              // thLot_list yeekee 系列
              case 'yeekee' :
                thLotList += '<div class="thLot_info_title">' + data[i].langEn.thLotGameType[j].gamePeriodTitle + '</div><div class="thLot_info_text">' + data[i].langEn.thLotGameType[j].gamePeriodText + '</div><div class="thLot_info_title">' + data[i].langEn.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langEn.thLotBoxPlayText + '</div>';
                break;
              // thLot_list 股票彩 系列
              case 'stock' :
                thLotList += '<div class="thLot_info_title">' + data[i].langEn.gameTimeTitle + '</div><div class="thLot_info_text addLink">' + data[i].langEn.thLotGameType[j].gameTimeText + '<a href="' + data[i].langEn.thLotGameType[j].gameTimeLink + '" target="_blank">' + data[i].langEn.thLotGameType[j].gameTimeLink + '</a></div><div class="thLot_info_title">' + data[i].langEn.gameAwardNumberTitle + '</div><div class="thLot_info_text">' + data[i].langEn.thLotGameType[j].gameAwardNumberText + '<img src="../img/' + data[i].langEn.thLotGameType[j].gameAwardNumberImg + '" alt="' + data[i].langEn.thLotGameType[j].gameName01 + '"></div><div class="thLot_info_title">' + data[i].langEn.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langEn.thLotGameType[j].thLotBoxPlayText + '</div>';
                break;
              // thLot_list 其他 系列
              default :
                thLotList += '<div class="thLot_info_title">' + data[i].langEn.thLotBoxPlayTitle + '</div><div class="thLot_info_text">' + data[i].langEn.thLotBoxPlayText + '</div>';
            }
            thLotList += '</div></div></div></li>';
          }
          thLotList += '</ul></section>';
      }
      $('.thLot').append(thLotList);
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
    $('#th_lottery').addClass('active');
    $('.lotHead .active').click(function () {
      if ($(this).hasClass('lotHead_lang_list')) {
        $(this).parent().removeClass('open');
      }
      return false;
    });
    $('.lotHead_lang_btn').click(function () {
      $(this).parent().toggleClass('open');
    });
    // thLot.js 的 彈跳視窗區
    $('.thLot_text').click(function() {
      $(this).parent().addClass('show');
    });
    $('.thLot_info_close, .thLot_info').click(function(e) {
      $(this).parents('.thLot_list').removeClass('show');
      e.stopPropagation();
    });
    $('.thLot_info_box').click(function(e) {
      e.stopPropagation();
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
