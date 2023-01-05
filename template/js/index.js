;function setLang(e) {
  var title = Object.keys(e);
  for (var i = 0, max = title.length; i < max; i++) {
      $('[text=' + title[i] + ']').text(e[title[i]]);
  };
}

$(function () {
  var ajax = $.ajax({
        url: './json/ae_template_data.json',
        dataType: 'json'
      }).done(function (data) {
        var _styleItemBox = "", // 收集-載入各風格版型大區塊
            _asideInputArr = [], // 因為首页各風格 input name 都相同，搜集-各版型 styleInputName，過濾掉首页重複的 styleInputName
            _aside_inputRadio = "", // 收集-刪除已选择功能 input
            _body_inputRadio = "", // 收集-各版型裡的每個項目選擇 input
            _pageSelect_li = ""; // 收集-"已选择"選單內部，全部風格的每個項目
        for (var i = 0, Imax = data.length; i < Imax; i++) {
          var _pageItemWrap = "", _pageItemBox_li = "";
          _pageItemWrap += '<div class="page_item_wrap"><h2 text="tempPageItem' + (i + 1) + '"></h2><ul class="page_item_box page_item_box_' + (i + 1) + '"></ul></div>';
          for (var j = 0, Jmax = data[i].pageList.length; j < Jmax; j++) {
            _pageItemBox_li += '<li class="' + data[i].pageList[j].styleValue + '_page_ctrl"><span class="check_box"></span><span text="tempPage' + (i + 1) + 'Ctrl' + (j + 1) + '"></span></li>';
            // _styleItemBox += '<div id="' + data[i].pageList[j].styleValue + '_template" class="style_item_box"><h3 text="tempPage' + (i + 1) + 'Ctrl' + (j + 1) + '"></h3><div class="template_box">';
            _styleItemBox += '<div id="' + data[i].pageList[j].styleValue + '_template" class="style_item_box">';
            _styleItemBox += '<h3 text="tempPage' + (i + 1) + 'Ctrl' + (j + 1) + '"></h3>';
            if (i === 0 && j === 0) {
              _styleItemBox += '<ul class="template_key">';
              for (var l = 0, Lmax = data[0].pageList[0].styleKey.length; l < Lmax; l++) {
                _styleItemBox += '<li class="' + data[0].pageList[0].styleKey[l] + '" text="template_key_' + l + '"></li>';
              }
              _styleItemBox += '</ul>';
            }
            _styleItemBox += '<div class="template_box">';
            // _styleItemBox += '<div id="' + data[i].pageList[j].styleValue + '_template" class="style_item_box"><h3 text="tempPage' + (i + 1) + 'Ctrl' + (j + 1) + '"></h3><div class="template_box">';
            // 下面 var _asideInput 會用到 _asideInputArr 陣列
            _asideInputArr.push(data[i].pageList[j].styleInputName)
            for (var k = 0, Kmax = data[i].pageList[j].styleList.length; k < Kmax; k++) {
              _body_inputRadio += '<input type="radio" name="' + data[i].pageList[j].styleInputName + '" id="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '" value="' + data[i].pageList[j].styleList[k].styleName + '">';
              _styleItemBox += '<div class="template_item ' + data[i].pageList[j].styleList[k].styleImgKey + '"><label for="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '" class="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '"><span text="page' + (i + 1) + 'Ctrl' + (j + 1) + 'Temp' + (k + 1) +'"></span></label><div class="check_box"></div><div class="full_screen_icon"></div><div class="template-img"><img src="./images/' + data[i].pageList[j].styleList[k].styleImgSrc + '" alt="' + data[i].pageList[j].styleList[k].styleName + '" width="' + data[i].pageList[j].styleList[k].styleImgWidth + '" height="' + data[i].pageList[j].styleList[k].styleImgHeight + '"><div class="template_style_prev"></div><div class="template_style_next"></div><div class="full_screen_close"></div></div></div>';
              _pageSelect_li += '<li class="' + data[i].pageList[j].styleValue + '_template_' + (k + 1) + '"><div class="img" style="background-image:url(./images/' + data[i].pageList[j].styleList[k].styleImgSrc + ')"></div><div class="template_content"><strong text="tempPage' + (i + 1) + 'Ctrl' + (j + 1) + '"></strong><p text="page' + (i + 1) + 'Ctrl' + (j + 1) + 'Temp' + (k + 1) +'"></p><label for="' + data[i].pageList[j].styleInputName + '_delete" text="tempDelete">删除 delete</label></div></li>';
            }
            _styleItemBox += '</div></div>';
          }
          // 載入-上方"模板选择"選單
          $('#page_select_box').append(_pageItemWrap).find('.page_item_box_' + (i + 1)).append(_pageItemBox_li);
        }
        // 因為首页各風格input name都相同(有重複要過濾掉) ，for 一個新的陣列給側邊欄「删除 delete」按鍵用。
        var _asideInput = _asideInputArr.filter(function (element, index, arr) {
          return arr.indexOf(element) === index;
        });
        for (var i = 0, max = _asideInput.length; i < max; i++) {
          _aside_inputRadio += '<input type="radio" name="' + _asideInput[i] + '" id="' + _asideInput[i] + '_delete">';
        }
        // 載入-body內部前面，各版型裡的每個項目選擇input
        $('body').prepend(_body_inputRadio);
        // 載入-"已选择"選單在內部後面，全部風格的每個項目；在外部前面，做刪除已选择的功能input
        $('#page_select').append(_pageSelect_li).before(_aside_inputRadio);
        // 載入-在內部後面，各風格版型大區塊
        $('#style_select_box').append(_styleItemBox);
      });
  $.when(ajax).then(function(data){
    // come in, computer language. window.navigator.language ： zh-TW 繁中 、 zh-CN 簡中 、 th-TH 泰文 、 vi-VN 越南 、 en-US 英文
    switch(window.navigator.language) {
      case 'zh-TW' :
      case 'zh-CN' :
        setLang(i18n.zh);
        $('#zh').addClass('active');
        break;
      case 'th-TH' :
        setLang(i18n.th);
        $('#th').addClass('active');
        break;
      case 'vi-VN' :
        setLang(i18n.vn);
        $('#vn').addClass('active');
        break;
      default :
        setLang(i18n.en);
        $('#en').addClass('active');
        break;
    }
    // PageSelectScrollFunction
    var liIndex,
        pageSelectHeight,
        styleKeyIndex = 0,
        DISTANCE = 1000, //(px)
        SPEED = 300, //(ms)
        MIN_SPEED = 300, //(ms)
        MAX_SPEED = 600, //(ms)
        RATE = SPEED / DISTANCE,
        HEADHEIGHT = $('#head').outerHeight(),
        $RollingUnit = $('#style_select_box > .style_item_box');
    function pageSelectResize() {
      if ($(window).outerWidth() >= 1024) {
        pageSelectHeight = $('#page_select_box').outerHeight();
        $('#AE_wrap').attr("style","padding-top:"+ ( pageSelectHeight + HEADHEIGHT ) +"px;");
      } else {
        pageSelectHeight = 0;
        $('#AE_wrap').attr("style","");
      }
      mouseFollow();
    }
    // 螢幕寬度大於、等於 1024px 時，#page_select_box 固定於上方減少滾動距離
    $(window).on("resize", pageSelectResize).resize();
    // 上方"模板选择"，第各大類的選項滾動
    $('.page_item_box > li').click(function () {
      var _loopNumber = $(this).parent().attr('class').substr(-1);
      if (+_loopNumber > 1) {// _loopNumber轉換成數字，非首页選項
        liIndex = 0;
        for (var i = 1, max = _loopNumber; i < max; i++) {
          liIndex += $('.page_item_box_'+i+' > li').length
        }
        liIndex += $(this).index();
        $(this).toggleClass('select');
      } else {
        if ($(this).hasClass('select')) return
        liIndex = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('div[id$="main_template"]').removeClass('open');
      }
      bodySrcoll();
    });
    function bodySrcoll() {
      $RollingUnit.eq(liIndex).toggleClass('open');
      if (!$RollingUnit.eq(liIndex).hasClass('open')) return // 第各大類的滾動選項，關閉的時候就跳出function
      // var goToOffsetTop = $RollingUnit.eq(liIndex).offset().top - HEADHEIGHT - pageSelectHeight,
      var goToOffsetTop = $RollingUnit.eq(liIndex).position().top - HEADHEIGHT - pageSelectHeight,
          bodySrcollTime = Math.abs($(window).scrollTop() - goToOffsetTop) / RATE;
      // $('html, body').stop(true).delay(300).animate({
      $('body').stop(true).delay(300).animate({
        scrollTop: $('body').scrollTop() + goToOffsetTop
      }, (bodySrcollTime < MIN_SPEED ? MIN_SPEED : bodySrcollTime > MAX_SPEED ? MAX_SPEED : bodySrcollTime))
    }
    function mouseFollow() {
      var _cursorWidth = $('.template_key > li').eq(styleKeyIndex).outerWidth(),
          _cursorLeft = $('.template_key > li').eq(styleKeyIndex).position().left;
      // _cursorLeft = $(this).offset().left; _cursorLeft = $(this).position().left;
      $('.template_key > .cursor').css({'width':_cursorWidth, 'left':_cursorLeft});
    };
    // header
    $('.headLang_list').click(function(){
      var webLang = $(this).attr('id');
      // location.hash = webLang;
      $('html').attr('lang',webLang);
      // $('body').attr('class',webLang);
      $(this).addClass('active').siblings().removeClass('active');
      $('#head').removeClass();
      switch(webLang) {
        case 'zh' :
          setLang(i18n.zh);
          break;
        case 'th' :
          setLang(i18n.th);
          break;
        case 'vn' :
          setLang(i18n.vn);
          break;
        default :
          setLang(i18n.en);
          break;
      }
      mouseFollow();
    });
    $('.headAsideMenu').click(function(){
      $('#head').toggleClass('headAsideMenu-open');
      if($('#head').hasClass('headLang-open')) $('#head').removeClass('headLang-open')
    });
    $('.headLang_btn').click(function(){
      $('#head').toggleClass('headLang-open');
      if($('#head').hasClass('headAsideMenu-open')) $('#head').removeClass('headAsideMenu-open')
    });
    $('.aside_menu_bg').click(function(){
      $('#head').removeClass();
    });
    // 先清除"选择确认"結果，再寫入已(打勾)"选择确认"的風格名稱
    function templateData() {
      $('#page_select_comfirm').html('');
      $('body > input[type=radio]').each(function (index,element) {
        if ($(this).prop('checked')) {
          $('#page_select_comfirm').append($(element).attr('id').indexOf('lottery_main') === 0 ? '<li class="main">' + $(this).val() + '</li>' : '<li>' + $(this).val() + '</li>');
          // $('#page_select_comfirm').append($(element).attr('id').indexOf('lottery_main') >= 0 ? '<li class="main">' + $(this).val() + '</li>' : '<li>' + $(this).val() + '</li>');
        }
      });
    };
    // 各風格版型內每個項目與checkbox & 已选择選單全部風格的删除鍵，做templateData()
    $('.template_item > label, .template_content > label').click(function () {
      setTimeout(templateData, 0);
    });
    // 各風格的 label & check_box
    $('.template_item > label').click(function(){
      var thisForValue = $(this).attr('for'),
          templateValue = thisForValue.slice(0, thisForValue.indexOf('_template'));
      if (thisForValue.indexOf('main') > 0) { // 如果字串有main，首页的選項
        // 如果 templateValue 是 彩票城，#AE_wrap 新增 lottery_main class
        templateValue.indexOf('lottery_main') === 0 ? $('#AE_wrap').addClass('lottery_main') : $('#AE_wrap').removeClass('lottery_main');
        // 上方的模板选择選單，首页移除已選取風格
        $('.page_item_box_1 > li').removeClass('selected');
        // 刪除 - 放大區各項之前已選取的風格
        $('#style_select_box > div[id$="main_template"]').find('.selected').removeClass('selected');
        // 刪除 - 側邊的"已选择"選單，之前各項已選取首页各大風格的每項
        $('#page_select > li[class*="main_template"]').removeClass('open');
      } else { // 如果字串沒有main，如果不是首页的選項
        // 刪除 - 放大區各項之前已選取的風格
        $('#' + templateValue + '_template .template_item').find('.selected').removeClass('selected');
        // 刪除 - 側邊的"已选择"選單，之前各項已選取風格
        $('#page_select > li[class^="' + templateValue + '_template"]').removeClass('open');
      }
      // 顯示 - 放大區現在選取風格，新增 selected class
      $(this).next('.check_box').addClass('selected');
      // 顯示 - 上方的模板选择選單現在選取風格，新增 selected class
      $('.page_item_box > .' + templateValue + '_page_ctrl').addClass('selected');
      // 顯示 - 側邊的"已选择"選單，當前選取項目 & 新增 open class
      $('#page_select > .' + thisForValue).addClass('open');
    });
    // new 娱乐城 選單控制
    $('.template_key > li').click(function(){
      var styleKey = $(this).attr('class');
      document.querySelector('.template_key').className = 'template_key ' + styleKey;
      styleKeyIndex = $(this).index();
      mouseFollow();
      // 刪除選取風格用
      // if(styleKey !== 'all') {
      //   $('input[id^="ec_main_template"]').prop('checked',false);
      //   $('#page_select > li[class^="ec_main_template"]').removeClass('open');
      //   $('#ec_main_template').find('.selected').removeClass('selected');
      //   setTimeout(templateData, 0);
      // }
    })
    // 側邊欄的 delete 鍵
    $('#page_select label').click(function () {
      var deleteValueClass = $(this).parent().parent().removeClass('open').attr('class'),
          deleteValue = deleteValueClass.slice(0, deleteValueClass.indexOf('_template'));
      $('div[id^="' + deleteValue + '_template"]').find('.check_box').removeClass('selected');
      $('.page_item_box > .' + deleteValue + '_page_ctrl').removeClass('selected');
    });
    // 樣式風格圖片放大
    $('.full_screen_icon').click(function () {
      // 加class 'close_auto' 解iphone bug 在圖片放大 position:fixed; 時放大的圖片被切著的問題
      $(this).next().addClass('full_screen').parent().parent().addClass('close_auto');
      var $imgWidth = $(this).next().find('img').attr('width'),
          $fullScreenTemplateBgWidth = $('body').width() - ($('.template-img.full_screen').innerWidth() - $('.template-img.full_screen').width());
      if ($imgWidth < $fullScreenTemplateBgWidth) $(this).next().find('img').addClass('auto');
    });
    // 關掉圖片放大的功能
    $('.template-img').click(function(){
      $(this).removeClass('full_screen').find('img').removeClass('auto').end().parent().parent().removeClass('close_auto');
    });
    $('.template-img > img').click(function(e){e.stopPropagation()});
    // 上一頁
    $('.template_style_prev').click(function (e){
      $(this).parent().click().end().parents('.template_item').prev().find('.full_screen_icon').click();
      e.stopPropagation();
    });
    // 下一頁
    $('.template_style_next').click(function(e){
      $(this).parent().click().end().parents('.template_item').next().find('.full_screen_icon').click();
      e.stopPropagation();
    });
    // goTop
    $("#goTop").click(function(){
      $("html,body").animate({scrollTop:0},600);
    });
    // 初始設定
    $('.page_item_box_1 > li').eq(0).click();
    $('.template_key > li').eq(0).click();
  },function(){
    console.log(['ajax error', 'ajax :', data]);
  });
  // Clipboard.JS
  var clipboard = new ClipboardJS('#share_btn');
});