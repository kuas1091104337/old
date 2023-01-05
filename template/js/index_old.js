;function setLang(e) {
  var title = Object.keys(e);
  for (var i = 0, max = title.length; i < max; i++) {
      $('[text=' + title[i] + ']').text(e[title[i]]);
  };
}

$(function () {
  // header
  $('#AE_aside_menu').click(function () {
    $('#head').toggleClass('aside_menu_open');
  });
  $('.aside_menu_bg').click(function () {
    $('#head').removeClass('aside_menu_open');
  });

  $.ajax({
    url: 'json/ae_template_data_old.json',
    dataType: 'json'
  }).done(function (data) {
    var body_inputCheckbox = "", body_inputRadio = "", styleItemBox = "", asideInputArr = [], aside_inputRadio = "", pageSelect_li = "";
    for (var i = 0, Imax = data.length; i < Imax; i++) {
      var pageItemWrap = "", pageItemBox_label = "";

      pageItemWrap += '<div class="page_item_wrap"><h2>' + data[i].pageItem + '</h2><div class="page_item_box page_item_box_' + (i + 1) + '"></div></div>';
      for (var j = 0, Jmax = data[i].pageList.length; j < Jmax; j++) {
        pageItemBox_label += '<label for="' + data[i].pageList[j].styleValue + '_page_ctrl" class="' + data[i].pageList[j].styleValue + '_page_ctrl"><span class="check_box"></span>' + data[i].pageList[j].styleItem + '</label>';

        // body_inputCheckbox += '<input type="checkbox" name="ae_selec" id="' + data[i].pageList[j].styleValue + '_page_ctrl">';
        // if (i == 0 && j == 0) body_inputCheckbox += ' checked="yes"';

        styleItemBox += '<div id="' + data[i].pageList[j].styleValue + '_template" class="style_item_box"><h3>' + data[i].pageList[j].styleItem + '</h3><div class="template_box">';

        asideInputArr.push(data[i].pageList[j].styleInputName)
        for (var k = 0, Kmax = data[i].pageList[j].styleList.length; k < Kmax; k++) {
          body_inputRadio += '<input type="radio" name="' + data[i].pageList[j].styleInputName + '" id="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '" value="' + data[i].pageList[j].styleItem + ' / ' + data[i].pageList[j].styleList[k].styleLabel + '">';

          styleItemBox += '<div class="template_item"><label for="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '" class="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '">' + data[i].pageList[j].styleList[k].styleLabel + '<span class="' + data[i].pageList[j].styleList[k].styleNew + '"></span></label><div class="check_box"></div><div class="full_screen_icon"></div><div class="template-img">';
          styleItemBox += '<img src="./images/' + data[i].pageList[j].styleList[k].styleImgSrc + '" alt="' + data[i].pageList[j].styleList[k].styleImgAlt + '" width="' + data[i].pageList[j].styleList[k].styleImgWidth + '" height="' + data[i].pageList[j].styleList[k].styleImgHeight + '"><div class="template_style_prev"></div><div class="template_style_next"></div><div class="full_screen_close"></div></div></div>';

          pageSelect_li += '<li class="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '"><div class="img" style="background-image:url(./images/' + data[i].pageList[j].styleList[k].styleImgSrc + ')"></div><div class="template_content">';
          pageSelect_li += '<strong>' + data[i].pageList[j].styleItem + '</strong><p>' + data[i].pageList[j].styleList[k].styleLabel + '</p><label for="' + data[i].pageList[j].styleInputName + '_delete">删除 delete</label></div></li>';
        }
        styleItemBox += '</div></div>';
      }
      $('#page_select_box').append(pageItemWrap).find('.page_item_box_' + (i + 1)).append(pageItemBox_label);
    }

    // 將重複的 data[i].pageList[j].styleInputName 過瀘掉，for 一個新的陣列給側邊欄「删除 delete」按鍵用。
    var asideInput = asideInputArr.filter(function (element, index, arr) {
      return arr.indexOf(element) === index;
    });
    for (var i = 0, max = asideInput.length; i < max; i++) {
      aside_inputRadio += '<input type="radio" name="' + asideInput[i] + '" id="' + asideInput[i] + '_delete">';
    }

    $('body').prepend(body_inputRadio).prepend(body_inputCheckbox);
    $('#page_select').append(pageSelect_li).before(aside_inputRadio);
    $('#style_select_box').append(styleItemBox)

    // 选择确认 Page Selected Comfirm 寫入樣式的值
    $('#style_select_box label, #page_select label').click(function () {
      setTimeout(function () { templateData(); }, 0);
    });
    function templateData() {
      $('#page_select_comfirm').html('');
      $('body > input[type=radio]').each(function (index,element) {
        if ($(this).prop('checked')) {
          if ($(element).attr('id').indexOf('main') > 0){
            $('#page_select_comfirm').append('<li class="main">' + $(this).val() + '</li>');
          } else {
            $('#page_select_comfirm').append('<li>' + $(this).val() + '</li>');
          }
        }
      });
    };

    // test js
    // 各風格的 label & check_box
    $('.template_item > label').click(function(){
      var thisForValue = $(this).attr('for'),
          templateValue = thisForValue.slice(0, thisForValue.indexOf('_template'));
      $(this).next('.check_box').addClass('selected');
      if (thisForValue.indexOf('main') > 0) { // 如果有 main 為正數
        $(this).parents('div[id*="main"]').siblings('div[id*="main"]').find('.selected').removeClass('selected');
        $('#page_select > li[class*="main_template"]').removeClass('open');
        $('.page_item_box_1 > label[for$="main_page_ctrl"]').removeClass('selected');
      } else { // 如果沒有 main 為 -1
        $('#page_select > li[class^="' + templateValue + '_template"]').removeClass('open');
      }
      $('.page_item_box > .' + templateValue + '_page_ctrl').addClass('selected');
      $(this).parent().siblings().find('.selected').removeClass('selected');
      $('#page_select > .' + thisForValue).addClass('open');
      // console.log(templateValue); console.log(thisForValue);
    });
    // 側邊欄的 delete 鍵
    $('#page_select label').click(function () {
      var deleteValue = $(this).parent().parent().removeClass('open').attr('class').slice(0, $(this).parent().parent().attr('class').indexOf('_template'));
      $('div[id^="' + deleteValue + '_template"]').find('.check_box').removeClass('selected');
      $('.page_item_box > .' + deleteValue + '_page_ctrl').removeClass('selected');
    });

    // Clipboard.JS
    var clipboard = new ClipboardJS('#share_btn');
    // 樣式風格圖片放大
    $('.full_screen_icon').click(function () {
      // 加class 'close_auto' 解iphone bug 在圖片放大 position:fixed; 時放大的圖片被切著的問題
      $(this).next().addClass('full_screen').parent().parent().addClass('close_auto');
      var $imgWidth = $(this).next().find('img').attr('width'),
          $fullScreenTemplateBgWidth = $('body').width() - ($('.template-img.full_screen').innerWidth() - $('.template-img.full_screen').width());
      if ($imgWidth < $fullScreenTemplateBgWidth) {
        $(this).next().find('img').addClass('auto');
      }
    });
    // 上一頁
    $('.template_style_prev').click(function (e) {
      $(this).parent().click().end().parents('.template_item').prev().find('.full_screen_icon').click();
      e.stopPropagation();
    });
    // 下一頁
    $('.template_style_next').click(function (e) {
      $(this).parent().click().end().parents('.template_item').next().find('.full_screen_icon').click();
      e.stopPropagation();
    });
    // 關掉圖片放大的功能
    $('.template-img').click(function () {
      $(this).removeClass('full_screen').find('img').removeClass('auto').end().parent().parent().removeClass('close_auto');
    });
    $('.template-img > img').click(function (e) { e.stopPropagation(); });

    // PageSelectScrollFunction
    var $label_index,
      $pageSelectHeight,
      distance = 1000,//(px)
      speed = 300,//(ms)
      minSpeed = 300,//(ms)
      maxSpeed = 600,//(ms)
      rate = speed / distance,
      $RollingUnit = $('#style_select_box > .style_item_box'),
      $headHeight = $('#head').outerHeight();
    // 螢幕寬度大於、等於 1024px 時，#page_select_box 固定於上方減少滾動距離
    $(window).on("resize", pageSelectResize).resize();
    function pageSelectResize() {
      if ($(window).outerWidth() >= 1024) {
        $pageSelectHeight = $('#page_select_box').outerHeight();
        $('#AE_wrap').attr("style","padding-top:"+ ( $pageSelectHeight + $headHeight ) +"px;");
      } else {
        $pageSelectHeight = 0;
        $('#AE_wrap').attr("style","");
      }
    }

    // 第各大類(首页 Main、内页 Inner，等…)，內页的選項滾動
    $('.page_item_box > label').click(function () {
      var loopNumber = $(this).parent().attr('class').substr(-1);
      if (+loopNumber > 1) {
        $label_index = 0;
        for (var i = 1, max = loopNumber; i < max; i++) {
          $label_index += $('.page_item_box_'+i+' > label').length
        }
        $label_index += $(this).index();
        $(this).toggleClass('select');
      } else {
        if ($(this).hasClass('select')) return
        $label_index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        if ($(this).attr('class').indexOf('ec_main') >= 0) { // 按到 娱乐城 EC 時
          $RollingUnit.eq(1).removeClass('open').find('selected').removeClass('selected');
          $('#AE_wrap').removeClass('lottery_main');
          pageSelectResize()
        } else {
          $RollingUnit.eq(0).removeClass('open').find('selected').removeClass('selected');
          $('#AE_wrap').addClass('lottery_main');
          pageSelectResize()
        }
      }
      bodySrcoll();
    });

    function bodySrcoll() {
      $RollingUnit.eq($label_index).toggleClass('open');
      // 第各大類(Main、Inner等…)的滾動選項(.style_item_box)沒有.open的時候就跳出。
      if (!$RollingUnit.eq($label_index).hasClass('open')) return
      // input[type=checkbox] click 之前的 checked 狀態是 true 或 false ， true(打勾變沒打勾)就跳出。
      // if ($('body > input[type=checkbox]').eq($label_index).prop('checked')) return

      var goToOffsetTop = $RollingUnit.eq($label_index).offset().top - $headHeight - $pageSelectHeight,
        bodySrcollTime = Math.abs($(window).scrollTop() - goToOffsetTop) / rate;
      $('html, body').stop(true).delay(300).animate({
        scrollTop: goToOffsetTop
      }, (bodySrcollTime < minSpeed ? minSpeed : bodySrcollTime > maxSpeed ? maxSpeed : bodySrcollTime))
    }

    $('.page_item_box_1 > label').eq(0).click();
  });

  var ajax1 = $.ajax({
    url:'../load/contact.html',
    dataType:'html'
  }).done(function(data) {
    $('#contact').append(data);
  })
  var ajax2 = $.ajax({
     url:'../load/foot.html',
     dataType:'html'
  }).done(function(data) {
    $('#foot').append(data);
  })
  $.when(ajax1,ajax2).then(function(data1,data2){
    // come in, computer language. window.navigator.language ： zh-TW 繁中 、 zh-CN 簡中 、 th-TH 泰文 、 vi-VN 越南 、 en-US 英文
    switch(window.navigator.language) {
      case 'zh-TW' :
      case 'zh-CN' :
        setLang(i18n.zh);
        break;
      case 'th-TH' :
        setLang(i18n.th);
        break;
      case 'vi-VN' :
        setLang(i18n.vn);
        break;
      default :
        setLang(i18n.en);
        break;
    };
  },function(){
    console.log(['ajax error', 'ajax1 :', data1, 'ajax2 :', data2]);
  });

  // goTop
  // $("#goTop").click(function () {
  //   $("html,body").animate({ scrollTop: 0 }, 600)
  // });

});