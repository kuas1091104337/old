"use strict";"object"!=typeof window.CP&&(window.CP={}),window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,exitedLoop:function(o){this._loopExits[o]=!0},shouldStopLoop:function(o){if(this.programKilledSoStopMonitoring)return!0;if(this.programNoLongerBeingMonitored)return!1;if(this._loopExits[o])return!1;var t=this._getTime();if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=t,!1;var i=t-this.timeOfFirstCallToShouldStopLoop;if(i<this.START_MONITORING_AFTER)return!1;if(i>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;try{this._checkOnInfiniteLoop(o,t)}catch(n){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var o={action:"infinite-loop",line:this._findAroundLineNumber()};parent.postMessage(JSON.stringify(o),"*")}else this._throwAnErrorToStopPen()}catch(t){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."},_findAroundLineNumber:function(){var o=new Error,t=0;if(o.stack){var i=o.stack.match(/boomerang\S+:(\d+):\d+/);i&&(t=i[1])}return t},_checkOnInfiniteLoop:function(o,t){if(!this._loopTimers[o])return this._loopTimers[o]=t,!1;var i=t-this._loopTimers[o];if(i>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+o},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(o){return window.CP.PenTimer.shouldStopLoop(o)},window.CP.exitedLoop=function(o){window.CP.PenTimer.exitedLoop(o)};

$(document).ready(function () {

    var $slider = $('.slider');
    var $slideBGs = $('.slide__bg');
    var diff = 0;
    var curSlide = 0;
    var numOfSlides = $('.slide').length - 1;
    var animating = false;
    var animTime = 300;
    var autoSlideTimeout;
    var autoSlideDelay = 12000;//banner輪播時間(毫秒) 麻將上線後輪播時間改 12000(毫秒)
    var $pagination = $('.slider-pagi');

    function createBullets() {
        for (var i = 0; i < numOfSlides + 1; i++) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            var $li = $('<li class=\'slider-pagi__elem\'></li>');
            $li.addClass('slider-pagi__elem-' + i).data('page', i);
            if (!i)
                $li.addClass('active');
            $pagination.append($li);
        }
        window.CP.exitedLoop(1);
    };
    createBullets();
    function manageControls() {
        $('.slider-control').removeClass('inactive');
        if (!curSlide)
            $('.slider-control.left').addClass('inactive');
        if (curSlide === numOfSlides)
            $('.slider-control.right').addClass('inactive');
    };
    function autoSlide() {
        autoSlideTimeout = setTimeout(function () {
            curSlide++;
            if (curSlide > numOfSlides)
                curSlide = 0;
            changeSlides();
        }, autoSlideDelay);
    };
    autoSlide();
    function changeSlides(instant) {
        if (!instant) {
            animating = true;
            manageControls();
            $slider.addClass('animating');
            $slider.css('top');
            $('.slide').removeClass('active');
            $('.slide-' + curSlide).addClass('active');
            setTimeout(function () {
                $slider.removeClass('animating');
                animating = false;
            }, animTime);
        }
        window.clearTimeout(autoSlideTimeout);
        $('.slider-pagi__elem').removeClass('active');
        $('.slider-pagi__elem-' + curSlide).addClass('active');
        $slider.css('transform', 'translate3d(' + -curSlide * 100 + '%,0,0)');
        $slideBGs.css('transform', 'translate3d(' + curSlide * 50 + '%,0,0)');
        diff = 0;
        autoSlide();
    }
    function navigateLeft() {
        if (animating)
            return;
        if (curSlide > 0)
            curSlide--;
        changeSlides();
    }
    function navigateRight() {
        if (animating)
            return;
        if (curSlide < numOfSlides)
            curSlide++;
        changeSlides();
    }
    $(document).on('mousedown touchstart', '.slider', function (e) {
        if (animating)
            return;
        window.clearTimeout(autoSlideTimeout);
        var startX = e.pageX || e.originalEvent.touches[0].pageX, winW = $(window).width();
        diff = 0;
        $(document).on('mousemove touchmove', function (e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            diff = (startX - x) / winW * 70;
            if (!curSlide && diff < 0 || curSlide === numOfSlides && diff > 0)
                diff /= 2;
            $slider.css('transform', 'translate3d(' + (-curSlide * 100 - diff) + '%,0,0)');
            $slideBGs.css('transform', 'translate3d(' + (curSlide * 50 + diff / 2) + '%,0,0)');
        });
    });
    $(document).on('mouseup touchend', function (e) {
        $(document).off('mousemove touchmove');
        if (animating)
            return;
        if (!diff) {
            changeSlides(true);
            return;
        }
        if (diff > -8 && diff < 8) {
            changeSlides();
            return;
        }
        if (diff <= -8) {
            navigateLeft();
        }
        if (diff >= 8) {
            navigateRight();
        }
    });
    $(document).on('click', '.slider-control', function () {
        if ($(this).hasClass('left')) {
            navigateLeft();
        } else {
            navigateRight();
        }
    });
    $(document).on('click', '.slider-pagi__elem', function () {
        curSlide = $(this).data('page');
        changeSlides();
    });
});