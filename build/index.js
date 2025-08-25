/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick-theme.css":
/*!***********************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick-theme.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick.css":
/*!*****************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick.js":
/*!****************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else // removed by dead control flow
{}

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"media-carousel-for-guten-blocks/media-carousel","version":"1.0.0","title":"Media Carousel for Guten Blocks","category":"zealblocks","description":"The Media Carousel for Guten Blocks is a versatile tool for displaying images and videos, featuring customizable options like slider speed, autoplay, and FancyBox integration to enhance your website\'s design and functionality.","example":{},"attributes":{"sliderId":{"type":"string"},"galleryImages":{"type":"array"},"sliderType":{"type":"string","default":"simpleType"},"showArrows":{"type":"boolean"},"arrowType":{"type":"string","default":"custom1"},"customPrevArrow":{"type":"object","default":null},"customNextArrow":{"type":"object","default":null},"urls":{"type":"array","items":{"type":"string"}},"simpleType":{"type":"string","default":"simple"},"carouselType":{"type":"string","default":"carousel"},"speed":{"type":"number","default":1000},"autoplay":{"type":"boolean","default":false},"infinite":{"type":"boolean","default":false},"dots":{"type":"boolean","default":false},"dotsType":{"type":"string","default":"ndots"},"arrowColor":{"type":"string","default":"#D8613C"},"dotsColor":{"type":"string","default":"#000000"},"borderRadius":{"type":"number","default":0},"borderRadiusTop":{"type":"number","default":0},"borderRadiusRight":{"type":"number","default":0},"borderRadiusBottom":{"type":"number","default":0},"borderRadiusLeft":{"type":"number","default":0},"fancyboxBgColor":{"type":"string","default":"#000000"},"fancyboxWidth":{"type":"number","default":800},"fancyboxOpacity":{"type":"number","default":70},"arrowpos":{"type":"string","default":"side"},"slidesToShow":{"type":"number","default":2},"slidesToShowDesktop":{"type":"number","default":2},"slidesToShowTablet":{"type":"number","default":2},"slidesToShowMobile":{"type":"number","default":1},"slidesToScroll":{"type":"number","default":1},"caption":{"type":"boolean","default":false},"fancybox":{"type":"boolean","default":false},"pauseOnHover":{"type":"boolean","default":true},"hideOnDesktop":{"type":"boolean","default":false},"hideOnTablet":{"type":"boolean","default":false},"hideOnMobile":{"type":"boolean","default":false},"description":{"type":"string","default":""},"headingColor":{"type":"string","default":""},"descriptionColor":{"type":"string","default":""},"hideArrowsOnDesktop":{"type":"boolean","default":false},"hideArrowsOnTablet":{"type":"boolean","default":false},"hideArrowsOnMobile":{"type":"boolean","default":false},"imageAspectRatio":{"type":"string","default":"16:9"}},"supports":{"html":false,"align":["wide","full"],"video":true},"textdomain":"media-carousel-for-guten-blocks","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! slick-carousel/slick/slick.css */ "./node_modules/slick-carousel/slick/slick.css");
/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! slick-carousel/slick/slick-theme.css */ "./node_modules/slick-carousel/slick/slick-theme.css");
/* harmony import */ var slick_carousel_slick_slick_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! slick-carousel/slick/slick.js */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel_slick_slick_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick_js__WEBPACK_IMPORTED_MODULE_8__);


/**
* Retrieves the translation of text.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
*/


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * React hook that is used creates a collapsible container that can be toggled open or closed.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody  
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */





function Edit({
  attributes,
  setAttributes
}) {
  const {
    galleryImages = [],
    urls = [],
    sliderType,
    showArrows,
    arrowType,
    customPrevArrow,
    customNextArrow,
    simpleType,
    carouselType,
    speed,
    autoplay,
    infinite,
    caption,
    dotsType,
    dots,
    arrowColor,
    dotsColor,
    borderRadius,
    borderRadiusTop,
    borderRadiusRight,
    borderRadiusBottom,
    borderRadiusLeft,
    fancyboxBgColor,
    fancyboxWidth,
    fancyboxOpacity,
    arrowpos,
    slidesToShow,
    slidesToShowDesktop,
    slidesToShowTablet,
    slidesToShowMobile,
    slidesToScroll,
    fancybox,
    pauseOnHover,
    hideOnDesktop = false,
    hideOnTablet = false,
    hideOnMobile = false,
    hideArrowsOnDesktop = false,
    hideArrowsOnTablet = false,
    hideArrowsOnMobile = false,
    description = "",
    imageAspectRatio = "16:9",
    headingColor = "",
    descriptionColor = ""
  } = attributes;
  const [sliderId, setSliderId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(attributes.sliderId || '');
  const [activeDevice, setActiveDevice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('desktop');
  const [radiusLinked, setRadiusLinked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!sliderId) {
      setSliderId(`mcfgb-slider-${sliderType}-${Math.floor(Math.random() * 1000)}`);
    }
  }, [sliderType, sliderId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      ...attributes,
      sliderId
    });
  }, [sliderId]);

  // Migration for responsive slides - set default values if not present
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // For existing blocks with only slidesToShow
    if (slidesToShowDesktop === undefined && slidesToShow !== undefined) {
      setAttributes({
        slidesToShowDesktop: slidesToShow,
        slidesToShowTablet: Math.min(slidesToShow, 2),
        slidesToShowMobile: 1
      });
    }
    // For new blocks, ensure responsive values are set
    else if (slidesToShowDesktop === undefined) {
      setAttributes({
        slidesToShowDesktop: 2,
        slidesToShowTablet: 2,
        slidesToShowMobile: 1
      });
    }
    // Ensure all responsive values are set (fallback)
    if (slidesToShowDesktop === undefined || slidesToShowTablet === undefined || slidesToShowMobile === undefined) {
      setAttributes({
        slidesToShowDesktop: slidesToShowDesktop || 2,
        slidesToShowTablet: slidesToShowTablet || 2,
        slidesToShowMobile: slidesToShowMobile || 1
      });
    }
  }, []);

  // Migrate old borderRadius to new per-side values if not set
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (borderRadius !== undefined && borderRadiusTop === undefined && borderRadiusRight === undefined && borderRadiusBottom === undefined && borderRadiusLeft === undefined) {
      setAttributes({
        borderRadiusTop: borderRadius,
        borderRadiusRight: borderRadius,
        borderRadiusBottom: borderRadius,
        borderRadiusLeft: borderRadius
      });
    }
  }, []);

  // Validate and clamp existing border radius values to ensure they don't exceed 100
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const needsUpdate = {};
    let hasChanges = false;

    // Check and clamp each border radius value
    if (borderRadiusTop !== undefined && (borderRadiusTop < 0 || borderRadiusTop > 100)) {
      needsUpdate.borderRadiusTop = Math.min(Math.max(borderRadiusTop, 0), 100);
      hasChanges = true;
    }
    if (borderRadiusRight !== undefined && (borderRadiusRight < 0 || borderRadiusRight > 100)) {
      needsUpdate.borderRadiusRight = Math.min(Math.max(borderRadiusRight, 0), 100);
      hasChanges = true;
    }
    if (borderRadiusBottom !== undefined && (borderRadiusBottom < 0 || borderRadiusBottom > 100)) {
      needsUpdate.borderRadiusBottom = Math.min(Math.max(borderRadiusBottom, 0), 100);
      hasChanges = true;
    }
    if (borderRadiusLeft !== undefined && (borderRadiusLeft < 0 || borderRadiusLeft > 100)) {
      needsUpdate.borderRadiusLeft = Math.min(Math.max(borderRadiusLeft, 0), 100);
      hasChanges = true;
    }

    // Update attributes if any values need clamping
    if (hasChanges) {
      setAttributes(needsUpdate);
    }
  }, [borderRadiusTop, borderRadiusRight, borderRadiusBottom, borderRadiusLeft]);

  // Helper to update all sides
  const setAllRadius = value => {
    // Ensure value is a number and clamp it to valid range
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(Math.max(numValue, 0), 100);
    setAttributes({
      borderRadiusTop: clampedValue,
      borderRadiusRight: clampedValue,
      borderRadiusBottom: clampedValue,
      borderRadiusLeft: clampedValue
    });
  };

  // UI for Elementor-style border radius
  const BorderRadiusControl = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginBottom: '16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontWeight: 500,
      fontSize: 13,
      display: 'block',
      marginBottom: 8
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Border Radius", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "mcfgb-radius-control"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "number",
    min: 0,
    max: 100,
    step: 1,
    value: borderRadiusTop !== null && borderRadiusTop !== void 0 ? borderRadiusTop : 0,
    onChange: e => {
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
        borderRadiusTop: clampedValue
      });
    },
    onBlur: e => {
      // Additional validation on blur to ensure value is within range
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (value !== clampedValue) {
        if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
          borderRadiusTop: clampedValue
        });
      }
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top', 'media-carousel-for-guten-blocks'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border radius value (0-100)', 'media-carousel-for-guten-blocks')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "number",
    min: 0,
    max: 100,
    step: 1,
    value: borderRadiusRight !== null && borderRadiusRight !== void 0 ? borderRadiusRight : 0,
    onChange: e => {
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
        borderRadiusRight: clampedValue
      });
    },
    onBlur: e => {
      // Additional validation on blur to ensure value is within range
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (value !== clampedValue) {
        if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
          borderRadiusRight: clampedValue
        });
      }
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'media-carousel-for-guten-blocks'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border radius value (0-100)', 'media-carousel-for-guten-blocks')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "number",
    min: 0,
    max: 100,
    step: 1,
    value: borderRadiusBottom !== null && borderRadiusBottom !== void 0 ? borderRadiusBottom : 0,
    onChange: e => {
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
        borderRadiusBottom: clampedValue
      });
    },
    onBlur: e => {
      // Additional validation on blur to ensure value is within range
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (value !== clampedValue) {
        if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
          borderRadiusBottom: clampedValue
        });
      }
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom', 'media-carousel-for-guten-blocks'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border radius value (0-100)', 'media-carousel-for-guten-blocks')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "number",
    min: 0,
    max: 100,
    step: 1,
    value: borderRadiusLeft !== null && borderRadiusLeft !== void 0 ? borderRadiusLeft : 0,
    onChange: e => {
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
        borderRadiusLeft: clampedValue
      });
    },
    onBlur: e => {
      // Additional validation on blur to ensure value is within range
      const value = parseInt(e.target.value) || 0;
      const clampedValue = Math.min(Math.max(value, 0), 100);
      if (value !== clampedValue) {
        if (radiusLinked) setAllRadius(clampedValue);else setAttributes({
          borderRadiusLeft: clampedValue
        });
      }
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'media-carousel-for-guten-blocks'),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border radius value (0-100)', 'media-carousel-for-guten-blocks')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    type: "button",
    className: radiusLinked ? 'linked' : '',
    onClick: () => setRadiusLinked(!radiusLinked),
    "aria-label": radiusLinked ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlink values', 'media-carousel-for-guten-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Link values', 'media-carousel-for-guten-blocks')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    "aria-hidden": "true",
    focusable: "false"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "mcfgb-radius-labels"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Top', 'media-carousel-for-guten-blocks')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Right', 'media-carousel-for-guten-blocks')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom', 'media-carousel-for-guten-blocks')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Left', 'media-carousel-for-guten-blocks'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      fontSize: '11px',
      color: '#555555',
      marginTop: '4px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Maximum value: 100px', 'media-carousel-for-guten-blocks')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      fontSize: '12px',
      color: '#555555',
      marginTop: '4px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Desktop Border Radius', 'media-carousel-for-guten-blocks'), ": ", borderRadiusTop || 0, "px"));

  // Aspect Ratio Control Component
  const AspectRatioControl = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginBottom: '16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontWeight: 500,
      fontSize: 13,
      display: 'block',
      marginBottom: 8
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Image Aspect Ratio", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    value: imageAspectRatio,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("16:9 (Widescreen)", "media-carousel-for-guten-blocks"),
      value: "16:9"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("4:3 (Standard)", "media-carousel-for-guten-blocks"),
      value: "4:3"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("1:1 (Square)", "media-carousel-for-guten-blocks"),
      value: "1:1"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("3:2 (Photo)", "media-carousel-for-guten-blocks"),
      value: "3:2"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("21:9 (Ultrawide)", "media-carousel-for-guten-blocks"),
      value: "21:9"
    }],
    onChange: value => setAttributes({
      imageAspectRatio: value
    })
  }));
  const colors = [{
    color: '#F9F9F9'
  }, {
    color: '#A4A4A4'
  }, {
    color: '#636363'
  }, {
    color: '#111111'
  }, {
    color: '#FFFFFF'
  }, {
    color: '#C2A990'
  }, {
    color: '#CFCABE'
  }, {
    color: '#D8613C'
  }, {
    color: '#B1C5A4'
  }];
  const deviceOptions = [{
    key: 'desktop',
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "12",
      rx: "2",
      stroke: "#222",
      strokeWidth: "2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M8 20h8M12 16v4",
      stroke: "#222",
      strokeWidth: "2",
      strokeLinecap: "round"
    }))
  }, {
    key: 'tablet',
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
      x: "5",
      y: "2",
      width: "14",
      height: "20",
      rx: "2",
      stroke: "#222",
      strokeWidth: "2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
      cx: "12",
      cy: "18",
      r: "1",
      fill: "#222"
    }))
  }, {
    key: 'mobile',
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
      x: "7",
      y: "2",
      width: "10",
      height: "20",
      rx: "2",
      stroke: "#222",
      strokeWidth: "2"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
      cx: "12",
      cy: "18",
      r: "1",
      fill: "#222"
    }))
  }];
  const deviceValue = {
    desktop: slidesToShowDesktop,
    tablet: slidesToShowTablet,
    mobile: slidesToShowMobile
  };
  const deviceMin = {
    desktop: 1,
    tablet: 1,
    mobile: 1
  };
  const deviceMax = {
    desktop: 6,
    tablet: 4,
    mobile: 2
  };
  const deviceLabel = {
    desktop: 'Desktop',
    tablet: 'Tablet',
    mobile: 'Mobile'
  };
  const handleSliderChange = value => {
    const intValue = parseInt(value) || 1;
    if (activeDevice === 'desktop') setAttributes({
      slidesToShowDesktop: intValue
    });
    if (activeDevice === 'tablet') setAttributes({
      slidesToShowTablet: intValue
    });
    if (activeDevice === 'mobile') setAttributes({
      slidesToShowMobile: intValue
    });
  };

  // Dynamically set border radius for editor preview
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    style: {
      ['--mcfgb-border-radius']: `${typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined' ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px` : `${borderRadius || 0}px`}`
    }
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Panel, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Media Carousel Settings", "media-carousel-for-guten-blocks")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Media Item Settings", "media-carousel-for-guten-blocks"),
    initialOpen: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(AspectRatioControl, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BorderRadiusControl, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enable Caption", "media-carousel-for-guten-blocks"),
    checked: caption,
    onChange: val => {
      setAttributes({
        caption: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enable FancyBox", "media-carousel-for-guten-blocks"),
    checked: fancybox,
    onChange: val => {
      setAttributes({
        fancybox: val
      });
    }
  }), caption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginTop: '12px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Heading Color", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    value: headingColor,
    onChange: color => setAttributes({
      headingColor: color
    }),
    colors: colors
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginTop: '12px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description Color", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    value: descriptionColor,
    onChange: color => setAttributes({
      descriptionColor: color
    }),
    colors: colors
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Slider Type Settings", "media-carousel-for-guten-blocks"),
    initialOpen: true,
    id: sliderId
  }, (sliderType === "carouselType" || sliderType === "simpleType") && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginBottom: '16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
    style: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '13px',
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slide to Show', 'media-carousel-for-guten-blocks')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginBottom: '12px'
    }
  }, deviceOptions.map(dev => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    key: dev.key,
    type: "button",
    onClick: () => setActiveDevice(dev.key),
    style: {
      background: activeDevice === dev.key ? '#007cba' : '#fff',
      border: '1px solid #ccd0d4',
      borderRadius: '4px',
      padding: '4px 8px',
      cursor: 'pointer',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      color: activeDevice === dev.key ? '#fff' : '#222'
    },
    "aria-label": deviceLabel[dev.key]
  }, dev.icon))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "range",
    min: deviceMin[activeDevice],
    max: deviceMax[activeDevice],
    value: deviceValue[activeDevice],
    onChange: e => handleSliderChange(e.target.value),
    style: {
      flex: 1
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      minWidth: '32px',
      textAlign: 'center',
      fontWeight: 'bold'
    }
  }, deviceValue[activeDevice])), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      fontSize: '12px',
      color: '#555',
      marginTop: '4px'
    }
  }, deviceLabel[activeDevice], " Columns: ", deviceValue[activeDevice]))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delay Speed of Slider", "media-carousel-for-guten-blocks"),
    value: speed,
    onChange: value => setAttributes({
      speed: value
    }),
    min: 1000,
    max: 5000,
    step: 1000
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      fontSize: '12px',
      color: '#555555',
      marginBottom: '16px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delay Speed", "media-carousel-for-guten-blocks"), ": ", (speed || 1000) / 1000, "s"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Pause on hover", "media-carousel-for-guten-blocks"),
    checked: pauseOnHover,
    onChange: val => {
      setAttributes({
        pauseOnHover: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Auto Play", "media-carousel-for-guten-blocks"),
    checked: autoplay,
    onChange: val => {
      setAttributes({
        autoplay: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Infinite", "media-carousel-for-guten-blocks"),
    checked: infinite,
    onChange: val => {
      setAttributes({
        infinite: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Dots", "media-carousel-for-guten-blocks"),
    checked: dots,
    onChange: val => {
      setAttributes({
        dots: val
      });
    }
  }), dots && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Dots Type", "media-carousel-for-guten-blocks"),
    value: dotsType,
    options: [{
      label: "Normal Dots",
      value: "ndots"
    }, {
      label: "Number",
      value: "number"
    }],
    onChange: val => {
      setAttributes({
        dotsType: val
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "color"
  }, dotsType === "number" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Number Color", "media-carousel-for-guten-blocks") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Dots Color", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    value: dotsColor,
    onChange: color => setAttributes({
      dotsColor: color
    }),
    colors: colors
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Show Arrows", "media-carousel-for-guten-blocks"),
    checked: showArrows,
    onChange: val => {
      setAttributes({
        showArrows: val
      });
    }
  }), showArrows && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RadioControl, {
    className: ` arrowclass  ${arrowType} ${sliderId}`,
    label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Arrow Type", "media-carousel-for-guten-blocks")),
    selected: arrowType,
    options: [{
      label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "svg-arrow"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "prev-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 30.725 30.725"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_iconCarrier"
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"
      }), " "), " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "next-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 30.725 30.725"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_iconCarrier"
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"
      }), " "), " "))))),
      value: "custom1"
    }, {
      label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "svg-arrow"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "prev-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 8 8"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_iconCarrier"
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
        x: "-0.226",
        y: "4.614",
        transform: "matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)",
        width: "5.283",
        height: "1.466"
      }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
        x: "1.607",
        y: "3.161",
        width: "6.375",
        height: "1.683"
      }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
        x: "-0.233",
        y: "1.921",
        transform: "matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)",
        width: "5.284",
        height: "1.465"
      }), " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "next-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 8 8"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_iconCarrier"
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
        x: "-0.226",
        y: "4.614",
        transform: "matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)",
        width: "5.283",
        height: "1.466"
      }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
        x: "1.607",
        y: "3.161",
        width: "6.375",
        height: "1.683"
      }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
        x: "-0.233",
        y: "1.921",
        transform: "matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)",
        width: "5.284",
        height: "1.465"
      }), " "))))),
      value: "custom2"
    }, {
      label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "svg-arrow"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "prev-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 512.013 512.013"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_iconCarrier"
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"
      }), " "), " "), " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "next-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 512.013 512.013"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_bgCarrier",
        "stroke-width": "0"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_tracerCarrier",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", {
        id: "SVGRepo_iconCarrier"
      }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"
      }), " "), " "), " "))))),
      value: "custom3"
    }, {
      label: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "svg-arrow"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "prev-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "30",
        height: "30",
        viewBox: "0 0 30 30"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6M25.5,12,18,4.5,10.5,12M18,4.5v18",
        transform: "translate(-3 -3)",
        fill: "none",
        stroke: "#000",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "3"
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
        class: "next-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M9 9h.01"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
        d: "M15 9h.01"
      }))))),
      value: "custom"
    }],
    onChange: val => {
      setAttributes({
        arrowType: val
      });
    }
  }), arrowType === 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginBottom: '16px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontWeight: 500,
      fontSize: 13,
      display: 'block',
      marginBottom: 8
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Custom Arrow Icons", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginBottom: '12px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontSize: 12,
      color: '#666'
    },
    "data-tooltip": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Upload an image for the previous/left navigation arrow. Recommended size: 30x30px", "media-carousel-for-guten-blocks")
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Previous Arrow", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
    onSelect: media => setAttributes({
      customPrevArrow: media
    }),
    allowedTypes: ['image'],
    value: customPrevArrow ? customPrevArrow.id : '',
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      style: {
        marginTop: '8px'
      }
    }, customPrevArrow ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
      src: customPrevArrow.url,
      alt: customPrevArrow.alt || 'Previous Arrow',
      style: {
        width: '30px',
        height: '30px',
        objectFit: 'contain'
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSmall: true,
      onClick: open,
      variant: "secondary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Change", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSmall: true,
      onClick: () => setAttributes({
        customPrevArrow: null
      }),
      variant: "tertiary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Remove", "media-carousel-for-guten-blocks"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSmall: true,
      onClick: open,
      variant: "secondary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Upload Previous Arrow", "media-carousel-for-guten-blocks")))
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      marginBottom: '12px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontSize: 12,
      color: '#666'
    },
    "data-tooltip": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Upload an image for the next/right navigation arrow. Recommended size: 30x30px", "media-carousel-for-guten-blocks")
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Next Arrow", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
    onSelect: media => setAttributes({
      customNextArrow: media
    }),
    allowedTypes: ['image'],
    value: customNextArrow ? customNextArrow.id : '',
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      style: {
        marginTop: '8px'
      }
    }, customNextArrow ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
      src: customNextArrow.url,
      alt: customNextArrow.alt || 'Next Arrow',
      style: {
        width: '30px',
        height: '30px',
        objectFit: 'contain'
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSmall: true,
      onClick: open,
      variant: "secondary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Change", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSmall: true,
      onClick: () => setAttributes({
        customNextArrow: null
      }),
      variant: "tertiary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Remove", "media-carousel-for-guten-blocks"))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSmall: true,
      onClick: open,
      variant: "secondary"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Upload Next Arrow", "media-carousel-for-guten-blocks")))
  }))))), arrowType !== 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Arrow Color", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPalette, {
    value: arrowColor,
    onChange: color => setAttributes({
      arrowColor: color
    }),
    colors: colors
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RadioControl, {
    className: "arrowpos",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Arrow Position", "media-carousel-for-guten-blocks"),
    selected: arrowpos,
    options: [{
      label: "Bottom",
      value: "bottom"
    }, {
      label: "Side",
      value: "side"
    }],
    onChange: val => {
      setAttributes({
        arrowpos: val
      });
    }
  }))), showArrows && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Arrow Responsive Visibility", "media-carousel-for-guten-blocks"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '12px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Control arrow visibility on different devices. These settings will take effect only on the front view page.", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hide Arrows on Desktop", "media-carousel-for-guten-blocks"),
    checked: hideArrowsOnDesktop,
    onChange: val => setAttributes({
      hideArrowsOnDesktop: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hide Arrows on Tablet", "media-carousel-for-guten-blocks"),
    checked: hideArrowsOnTablet,
    onChange: val => setAttributes({
      hideArrowsOnTablet: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hide Arrows on Mobile", "media-carousel-for-guten-blocks"),
    checked: hideArrowsOnMobile,
    onChange: val => setAttributes({
      hideArrowsOnMobile: val
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Responsive Visibility", "media-carousel-for-guten-blocks"),
    initialOpen: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("p", {
    style: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '12px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Responsive visibility will take effect only on front view page.", "media-carousel-for-guten-blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hide on Desktop", "media-carousel-for-guten-blocks"),
    checked: hideOnDesktop,
    onChange: val => setAttributes({
      hideOnDesktop: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hide on Tablet", "media-carousel-for-guten-blocks"),
    checked: hideOnTablet,
    onChange: val => setAttributes({
      hideOnTablet: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hide on Mobile", "media-carousel-for-guten-blocks"),
    checked: hideOnMobile,
    onChange: val => setAttributes({
      hideOnMobile: val
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
    multiple: "add",
    onSelect: val => {
      // Filter out any duplicate images
      const filteredVal = val.filter(media => {
        return !galleryImages.some(img => img.id === media.id);
      });

      // Filter out any removed images
      const updatedGallery = galleryImages.filter(img => {
        return val.some(media => media.id === img.id);
      }).map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
        type: img.type,
        caption: img.caption || '',
        description: img.description || ''
      }));

      // Merge filtered newly selected media with the updated gallery, preserving captions
      const finalGallery = [...updatedGallery, ...filteredVal.map(media => ({
        id: media.id,
        url: media.url,
        alt: media.alt,
        type: media.type,
        caption: media.caption || '',
        // Set a default caption if not provided
        description: media.description || ''
      }))];

      // Update URLs array to match the new gallery
      const updatedUrls = finalGallery.map((media, index) => {
        // Preserve existing URL if it exists, otherwise set empty string
        return urls[index] || '';
      });
      setAttributes({
        galleryImages: finalGallery,
        urls: updatedUrls
      });
    },
    allowedTypes: ['image', 'video'],
    value: galleryImages.map(val => val.id),
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit Images"),
      onClick: () => {
        open();
      },
      icon: "edit"
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, blockProps, {
    id: sliderId
  }), galleryImages && galleryImages.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    class: "slider-boxwrap"
  }, galleryImages.map((media, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    key: media.id,
    className: "mcfgb-gallery-single"
  }, media.type === 'image' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: media.url,
    alt: media.alt ? media.alt : "Gallery Image"
  }), !fancybox && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "text",
    className: "ytb-url",
    value: urls[index] || '',
    onChange: event => {
      const updatedUrls = [...urls];
      updatedUrls[index] = event.target.value;
      setAttributes({
        urls: updatedUrls
      });
    },
    placeholder: "Enter URL "
  }), caption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "text",
    className: "caption",
    value: media.caption || '',
    onChange: event => {
      const updatedGallery = [...galleryImages];
      updatedGallery[index].caption = event.target.value;
      setAttributes({
        galleryImages: updatedGallery
      });
    },
    placeholder: "Heading"
  }), caption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("textarea", {
    className: "description",
    value: media.description || '',
    onChange: event => {
      const updatedGallery = [...galleryImages];
      updatedGallery[index].description = event.target.value;
      setAttributes({
        galleryImages: updatedGallery
      });
    },
    placeholder: "Description",
    rows: "3",
    style: {
      width: '100%',
      marginTop: '5px',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      resize: 'vertical',
      fontFamily: 'inherit',
      fontSize: '14px'
    }
  })) : media.type === 'video' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "video-thumbnail-container",
    style: {
      position: 'relative',
      width: '100%'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("video", {
    ref: el => {
      if (el) {
        // Set up video thumbnail generation
        el.addEventListener('loadedmetadata', () => {
          // Seek to the first frame (0.1 seconds to ensure we get a frame)
          el.currentTime = 0.1;
        });
        el.addEventListener('seeked', () => {
          // Create canvas to capture the current frame
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions to match video
          canvas.width = el.videoWidth || 640;
          canvas.height = el.videoHeight || 360;
          try {
            // Draw the current frame
            ctx.drawImage(el, 0, 0, canvas.width, canvas.height);

            // Convert to data URL for thumbnail
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);

            // Store thumbnail URL in media object
            const updatedGallery = [...galleryImages];
            updatedGallery[index].thumbnailUrl = thumbnailUrl;
            setAttributes({
              galleryImages: updatedGallery
            });
          } catch (error) {
            // Error generating video thumbnail
          }
        });

        // Handle video load errors
        el.addEventListener('error', () => {
          // Error loading video for thumbnail generation
        });
      }
    },
    style: {
      width: '100%',
      objectFit: 'cover',
      display: 'none' // Hide the video element
    },
    preload: "metadata",
    muted: true,
    playsInline: true
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("source", {
    src: media.url,
    type: media.mime
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Your browser does not support the video tag.", "media-carousel-for-guten-blocks")), media.thumbnailUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("img", {
    src: media.thumbnailUrl,
    alt: media.alt || "Video Thumbnail",
    style: {
      width: '100%',
      objectFit: 'cover',
      cursor: 'pointer'
    },
    onClick: () => {
      // Show video controls when clicked
      const videoElement = document.querySelector(`video[src="${media.url}"]`);
      if (videoElement) {
        videoElement.style.display = 'block';
        videoElement.muted = false;
        videoElement.play();
      }
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      textAlign: 'center'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "#6c757d",
    style: {
      marginBottom: '8px'
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M8 5v14l11-7z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    style: {
      fontSize: '12px',
      color: '#6c757d'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Generating thumbnail...", "media-carousel-for-guten-blocks"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "play-button-overlay",
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60px',
      height: '60px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 2
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "white"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
    d: "M8 5v14l11-7z"
  })))), !fancybox && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "text",
    className: "ytb-url",
    value: urls[index] || '',
    onChange: event => {
      const updatedUrls = [...urls];
      updatedUrls[index] = event.target.value;
      setAttributes({
        urls: updatedUrls
      });
    },
    placeholder: "Enter URL"
  }), caption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("input", {
    type: "text",
    className: "caption-video",
    value: media.caption || '',
    onChange: event => {
      const updatedGallery = [...galleryImages];
      updatedGallery[index].caption = event.target.value;
      setAttributes({
        galleryImages: updatedGallery
      });
    },
    placeholder: "Enter Caption"
  }), caption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("textarea", {
    className: "description-video",
    value: media.description || '',
    onChange: event => {
      const updatedGallery = [...galleryImages];
      updatedGallery[index].description = event.target.value;
      setAttributes({
        galleryImages: updatedGallery
      });
    },
    placeholder: "Description",
    rows: "3",
    style: {
      width: '100%',
      marginTop: '5px',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      resize: 'vertical',
      fontFamily: 'inherit',
      fontSize: '14px'
    }
  })) : null))) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
    className: "upload-part",
    label: "Add Gallery Image or Video",
    instructions: "Upload images or videos by clicking the button below."
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
    multiple: "add",
    onSelect: val => {
      const newGallery = val.map(media => ({
        id: media.id,
        url: media.url,
        alt: media.alt,
        type: media.type,
        caption: media.caption,
        // Include the caption field
        description: media.description || '' // Include the description field
      }));

      // Initialize URLs array with empty strings for new media
      const newUrls = new Array(newGallery.length).fill('');
      setAttributes({
        galleryImages: newGallery,
        urls: newUrls
      });
    },
    allowedTypes: ['image', 'video'],
    value: galleryImages.map(val => val.id),
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      onClick: open,
      isPrimary: true,
      className: "upload-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
      viewBox: "0 0 24 24",
      width: "24"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
      x: "0",
      fill: "none",
      width: "24",
      height: "24"
    }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
      d: "M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z"
    }), " "), " ")), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Upload Media", "media-carousel-for-guten-blocks"))
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("style", null, `
                        .arrowclass.${arrowType}.${sliderId} input[type=radio]:checked + label svg g{
                            fill:${arrowColor} !important;
                        }
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single img , #${sliderId} .slider-boxwrap .mcfgb-gallery-single video{
                            border-radius: ${typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined' ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px` : `${borderRadius || 0}px`} !important;
                        }
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single .video-thumbnail-container,
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single .video-thumbnail-wrapper {
                            border-radius: ${typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined' ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px` : `${borderRadius || 0}px`} !important;
                            overflow: hidden;
                        }
                `));
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/block.json");

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "441.5",
    height: "331.2",
    viewBox: "0 0 441.5 331.2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Media_Carousel_Icon",
    "data-name": "Media Carousel Icon",
    transform: "translate(-36.8 -100)"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22945",
    "data-name": "Group 22945"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22944",
    "data-name": "Group 22944"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22943",
    "data-name": "Group 22943"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22942",
    "data-name": "Group 22942"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Path_4238",
    "data-name": "Path 4238",
    d: "M388.5,100h-262a17.2,17.2,0,0,0-17.2,17.2V348.3a17.2,17.2,0,0,0,17.2,17.2h262a17.2,17.2,0,0,0,17.2-17.2V117.1A17.114,17.114,0,0,0,388.5,100ZM288.1,240.1l-26.4,15.2-26.4,15.2a8.521,8.521,0,0,1-12.8-7.4v-61a8.553,8.553,0,0,1,12.8-7.4l26.4,15.2,26.4,15.2A8.716,8.716,0,0,1,288.1,240.1Z"
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22950",
    "data-name": "Group 22950"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22949",
    "data-name": "Group 22949"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22946",
    "data-name": "Group 22946",
    opacity: "0.4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Path_4239",
    "data-name": "Path 4239",
    d: "M196.4,426.4h0a7.81,7.81,0,0,1-7.8-7.8h0a7.81,7.81,0,0,1,7.8-7.8h0a7.81,7.81,0,0,1,7.8,7.8h0A7.685,7.685,0,0,1,196.4,426.4Z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22947",
    "data-name": "Group 22947"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Path_4240",
    "data-name": "Path 4240",
    d: "M257.5,431.2h0a12.548,12.548,0,0,1-12.6-12.6h0A12.548,12.548,0,0,1,257.5,406h0a12.548,12.548,0,0,1,12.6,12.6h0A12.676,12.676,0,0,1,257.5,431.2Z"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "Group_22948",
    "data-name": "Group 22948",
    opacity: "0.4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Path_4241",
    "data-name": "Path 4241",
    d: "M318.5,426.4h0a7.81,7.81,0,0,1-7.8-7.8h0a7.81,7.81,0,0,1,7.8-7.8h0a7.81,7.81,0,0,1,7.8,7.8h0A7.81,7.81,0,0,1,318.5,426.4Z"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Path_4242",
    "data-name": "Path 4242",
    d: "M91.7,326.1H51.5a14.724,14.724,0,0,1-14.7-14.7V151a14.724,14.724,0,0,1,14.7-14.7H91.7Z",
    opacity: "0.5"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    id: "Path_4243",
    "data-name": "Path 4243",
    d: "M423.4,326.1h40.2a14.724,14.724,0,0,0,14.7-14.7V151a14.724,14.724,0,0,0-14.7-14.7H423.4Z",
    opacity: "0.5"
  }))),
  /**	
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var slick_carousel_slick_slick_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! slick-carousel/slick/slick.css */ "./node_modules/slick-carousel/slick/slick.css");
/* harmony import */ var slick_carousel_slick_slick_theme_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! slick-carousel/slick/slick-theme.css */ "./node_modules/slick-carousel/slick/slick-theme.css");
/* harmony import */ var slick_carousel_slick_slick_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! slick-carousel/slick/slick.js */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel_slick_slick_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick_js__WEBPACK_IMPORTED_MODULE_5__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */





function Save({
  attributes
}) {
  const {
    galleryImages,
    sliderType,
    showArrows,
    arrowType,
    customPrevArrow,
    customNextArrow,
    sliderId,
    urls,
    fancybox,
    simpleType,
    carouselType,
    speed,
    autoplay,
    infinite,
    caption,
    dotsType,
    dots,
    arrowColor,
    dotsColor,
    borderRadius,
    borderRadiusTop,
    borderRadiusRight,
    borderRadiusBottom,
    borderRadiusLeft,
    fancyboxBgColor,
    fancyboxWidth,
    fancyboxOpacity,
    arrowpos,
    slidesToShow,
    slidesToShowDesktop,
    slidesToShowTablet,
    slidesToShowMobile,
    slidesToScroll,
    pauseOnHover,
    hideOnDesktop,
    hideOnTablet,
    hideOnMobile,
    hideArrowsOnDesktop,
    hideArrowsOnTablet,
    hideArrowsOnMobile,
    imageAspectRatio = "16:9",
    description,
    headingColor = "#111111",
    descriptionColor = "#000000"
  } = attributes;

  // Helper function to normalize URLs by adding protocol if missing
  const normalizeUrl = url => {
    if (!url || typeof url !== 'string') return url;
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return url;
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }
    // Add https:// protocol for URLs that don't have it
    return `https://${trimmedUrl}`;
  };

  // Build responsive visibility classes
  const responsiveClasses = [hideOnDesktop ? 'mcfgb-hide-desktop' : '', hideOnTablet ? 'mcfgb-hide-tablet' : '', hideOnMobile ? 'mcfgb-hide-mobile' : ''].filter(Boolean).join(' ');

  // Build arrow responsive visibility classes
  const arrowResponsiveClasses = [hideArrowsOnDesktop ? 'mcfgb-hide-arrows-desktop' : '', hideArrowsOnTablet ? 'mcfgb-hide-arrows-tablet' : '', hideArrowsOnMobile ? 'mcfgb-hide-arrows-mobile' : ''].filter(Boolean).join(' ');

  // Generate aspect ratio CSS
  const getAspectRatioStyle = () => {
    if (imageAspectRatio === 'auto') {
      return {};
    }
    const aspectRatios = {
      '16:9': '16 / 9',
      '4:3': '4 / 3',
      '1:1': '1 / 1',
      '3:2': '3 / 2',
      '21:9': '21 / 9'
    };
    return {
      aspectRatio: aspectRatios[imageAspectRatio] || '16 / 9'
    };
  };
  const aspectRatioStyle = getAspectRatioStyle();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `${arrowpos} ${sliderType}  ${showArrows} ${responsiveClasses}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: sliderId
  }, galleryImages && Array.isArray(galleryImages) && galleryImages.map((media, index) => {
    const currentCaption = caption ? media.caption : '';
    const currentDescription = caption ? media.description : '';
    const url = urls && Array.isArray(urls) && urls[index] ? urls[index] : "";
    const normalizedUrl = normalizeUrl(url);
    {/* const isYouTubeUrl = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com"); */}
    const isYouTubeUrl = url && typeof url === 'string' && (url.includes("youtube.com") || url.includes("youtu.be"));
    const isVimeoUrl = url && typeof url === 'string' && url.includes("vimeo.com");
    const isWebsiteUrl = url && typeof url === 'string' && (url.startsWith("http") || url.includes("www.") || url.includes(".") && url.length > 3 && !url.startsWith(".") && !url.endsWith("."));
    if (media && media.type === 'image') {
      if (fancybox) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: media.url,
          "data-fancybox": `gallery-${sliderId}`,
          "data-fancy-class": sliderId,
          "data-caption": media.alt ? media.alt : "Gallery Image"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.url,
          alt: media.alt ? media.alt : "Gallery Image",
          className: "ratio-part",
          style: aspectRatioStyle
        }))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else if (!fancybox && (isYouTubeUrl || isVimeoUrl) && url !== '') {
        let embedUrl;
        if (isYouTubeUrl) {
          const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n?#]+)/);
          const videoID = match ? match[1] : null;
          embedUrl = videoID ? `https://www.youtube.com/embed/${videoID}` : null;
        } else if (isVimeoUrl) {
          const match = url.match(/vimeo\.com\/(\d+)/);
          const videoID = match ? match[1] : null;
          embedUrl = videoID ? `https://player.vimeo.com/video/${videoID}` : null;
        }
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, embedUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
          width: "560",
          height: "315",
          src: embedUrl,
          title: "Video player",
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          referrerPolicy: "strict-origin-when-cross-origin",
          allowFullScreen: true
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Invalid video URL"))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else if (!isYouTubeUrl && isWebsiteUrl && url !== '' && !fancybox) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: normalizedUrl
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.url,
          alt: media.alt ? media.alt : "Gallery Image",
          className: "ratio-part",
          style: aspectRatioStyle
        }))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.url,
          alt: media.alt ? media.alt : "Gallery Image"
        }))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      }
    } else if (media && media.type === 'video') {
      const url = urls && Array.isArray(urls) && urls[index] ? urls[index] : "";
      const normalizedUrl = normalizeUrl(url);
      const isYouTubeUrl = url && typeof url === 'string' && (url.includes("youtube.com") || url.includes("youtu.be"));
      const isVimeoUrl = url && typeof url === 'string' && url.includes("vimeo.com");
      const isWebsiteUrl = url && typeof url === 'string' && (url.startsWith("http") || url.includes("www.") || url.includes(".") && url.length > 3 && !url.startsWith(".") && !url.endsWith("."));
      if (fancybox) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: media.url,
          "data-fancybox": `gallery-${sliderId}`,
          "data-fancy-class": sliderId,
          "data-caption": media.alt ? media.alt : "Video"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "video-thumbnail-wrapper",
          style: {
            position: 'relative',
            width: '100%',
            height: '100%'
          }
        }, media.thumbnailUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.thumbnailUrl,
          alt: media.alt || "Video Thumbnail",
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #dee2e6'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            textAlign: 'center'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "32",
          height: "32",
          viewBox: "0 0 24 24",
          fill: "#6c757d",
          style: {
            marginBottom: '8px'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            fontSize: '12px',
            color: '#6c757d'
          }
        }, "Generating thumbnail..."))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "play-button-overlay",
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "white"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
          style: {
            display: 'none'
          },
          preload: "metadata",
          muted: true,
          playsInline: true
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
          src: media.url,
          type: media.mime
        })))))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else if (!fancybox && (isYouTubeUrl || isVimeoUrl) && url !== '') {
        let embedUrl;
        if (isYouTubeUrl) {
          const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n?#]+)/);
          const videoID = match ? match[1] : null;
          embedUrl = videoID ? `https://www.youtube.com/embed/${videoID}` : null;
        } else if (isVimeoUrl) {
          const match = url.match(/vimeo\.com\/(\d+)/);
          const videoID = match ? match[1] : null;
          embedUrl = videoID ? `https://player.vimeo.com/video/${videoID}` : null;
        }
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, embedUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
          width: "560",
          height: "315",
          src: embedUrl,
          title: "Video player",
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          referrerPolicy: "strict-origin-when-cross-origin",
          allowFullScreen: true
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Invalid video URL"))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else if (!isYouTubeUrl && isWebsiteUrl && url !== '' && !fancybox) {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
          href: normalizedUrl
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "video-thumbnail-wrapper",
          style: {
            position: 'relative',
            width: '100%',
            height: '100%'
          }
        }, media.thumbnailUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.thumbnailUrl,
          alt: media.alt || "Video Thumbnail",
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #dee2e6'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            textAlign: 'center'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "32",
          height: "32",
          viewBox: "0 0 24 24",
          fill: "#6c757d",
          style: {
            marginBottom: '8px'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            fontSize: '12px',
            color: '#6c757d'
          }
        }, "Generating thumbnail..."))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "play-button-overlay",
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "white"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        }))))))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else if (!isYouTubeUrl && isWebsiteUrl && url !== '' && !fancybox) {
        // When Fancybox is disabled but URL is a website URL (not YouTube/Vimeo), show video with click to play
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "video-thumbnail-wrapper",
          style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }
        }, media.thumbnailUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.thumbnailUrl,
          alt: media.alt || "Video Thumbnail",
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          },
          onClick: () => {
            // Create and show video player
            const videoContainer = document.createElement('div');
            videoContainer.style.cssText = `
                                                                    position: fixed;
                                                                    top: 0;
                                                                    left: 0;
                                                                    width: 100%;
                                                                    height: 100%;
                                                                    background: rgba(0,0,0,0.9);
                                                                    z-index: 9999;
                                                                    display: flex;
                                                                    align-items: center;
                                                                    justify-content: center;
                                                                `;
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.style.cssText = `
                                                                    max-width: 90%;
                                                                    max-height: 90%;
                                                                    width: auto;
                                                                    height: auto;
                                                                `;
            const source = document.createElement('source');
            source.src = media.url;
            source.type = media.mime;
            video.appendChild(source);
            videoContainer.appendChild(video);

            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                                                                    position: absolute;
                                                                    top: 20px;
                                                                    right: 20px;
                                                                    background: none;
                                                                    border: none;
                                                                    color: white;
                                                                    font-size: 30px;
                                                                    cursor: pointer;
                                                                    z-index: 10000;
                                                                `;
            closeBtn.onclick = () => {
              document.body.removeChild(videoContainer);
            };
            videoContainer.appendChild(closeBtn);
            document.body.appendChild(videoContainer);

            // Close on background click
            videoContainer.onclick = e => {
              if (e.target === videoContainer) {
                document.body.removeChild(videoContainer);
              }
            };
          }
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #dee2e6'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            textAlign: 'center'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "32",
          height: "32",
          viewBox: "0 0 24 24",
          fill: "#6c757d",
          style: {
            marginBottom: '8px'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            fontSize: '12px',
            color: '#6c757d'
          }
        }, "Generating thumbnail..."))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "play-button-overlay",
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "white"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
          style: {
            display: 'none'
          },
          preload: "metadata",
          muted: true,
          playsInline: true
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
          src: media.url,
          type: media.mime
        }))))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      } else {
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          key: media.id
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "mcfgb-gallery-single"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "ratio-part",
          style: aspectRatioStyle
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "video-thumbnail-wrapper",
          style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }
        }, media.thumbnailUrl ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
          src: media.thumbnailUrl,
          alt: media.alt || "Video Thumbnail",
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          },
          onClick: () => {
            // Create and show video player
            const videoContainer = document.createElement('div');
            videoContainer.style.cssText = `
                                                                    position: fixed;
                                                                    top: 0;
                                                                    left: 0;
                                                                    width: 100%;
                                                                    height: 100%;
                                                                    background: rgba(0,0,0,0.9);
                                                                    z-index: 9999;
                                                                    display: flex;
                                                                    align-items: center;
                                                                    justify-content: center;
                                                                `;
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.style.cssText = `
                                                                    max-width: 90%;
                                                                    max-height: 90%;
                                                                    width: auto;
                                                                    height: auto;
                                                                `;
            const source = document.createElement('source');
            source.src = media.url;
            source.type = media.mime;
            video.appendChild(source);
            videoContainer.appendChild(video);

            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                                                                    position: absolute;
                                                                    top: 20px;
                                                                    right: 20px;
                                                                    background: none;
                                                                    border: none;
                                                                    color: white;
                                                                    font-size: 30px;
                                                                    cursor: pointer;
                                                                    z-index: 10000;
                                                                `;
            closeBtn.onclick = () => {
              document.body.removeChild(videoContainer);
            };
            videoContainer.appendChild(closeBtn);
            document.body.appendChild(videoContainer);

            // Close on background click
            videoContainer.onclick = e => {
              if (e.target === videoContainer) {
                document.body.removeChild(videoContainer);
              }
            };
          }
        }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #dee2e6'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            textAlign: 'center'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "32",
          height: "32",
          viewBox: "0 0 24 24",
          fill: "#6c757d",
          style: {
            marginBottom: '8px'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          style: {
            fontSize: '12px',
            color: '#6c757d'
          }
        }, "Generating thumbnail..."))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "play-button-overlay",
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "white"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          d: "M8 5v14l11-7z"
        }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
          style: {
            display: 'none'
          },
          preload: "metadata",
          muted: true,
          playsInline: true
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
          src: media.url,
          type: media.mime
        }))))), currentCaption && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-caption",
          style: {
            color: headingColor
          }
        }, currentCaption), currentDescription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
          className: "img-description",
          style: {
            color: descriptionColor
          }
        }, currentDescription));
      }
    }
    return null;
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: `btn-wrap-${sliderId}`,
    class: `${arrowType} ${arrowResponsiveClasses}`
  }, arrowType === 'custom1' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "svg-arrow"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "prev-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 30.725 30.725"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"
  }), " "), " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "next-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 30.725 30.725"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"
  }), " "), " ")))), arrowType === 'custom2' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "svg-arrow"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "prev-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 8 8"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "-0.226",
    y: "4.614",
    transform: "matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)",
    width: "5.283",
    height: "1.466"
  }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "1.607",
    y: "3.161",
    width: "6.375",
    height: "1.683"
  }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "-0.233",
    y: "1.921",
    transform: "matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)",
    width: "5.284",
    height: "1.465"
  }), " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "next-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 8 8"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "-0.226",
    y: "4.614",
    transform: "matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)",
    width: "5.283",
    height: "1.466"
  }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "1.607",
    y: "3.161",
    width: "6.375",
    height: "1.683"
  }), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
    x: "-0.233",
    y: "1.921",
    transform: "matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)",
    width: "5.284",
    height: "1.465"
  }), " ")))), arrowType === 'custom3' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "svg-arrow"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "prev-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 512.013 512.013"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"
  }), " "), " "), " "))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "next-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 512.013 512.013"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"
  }), " "), " "), " ")))), arrowType === 'custom' && customPrevArrow && customNextArrow && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "svg-arrow"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "prev-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: customPrevArrow.url,
    alt: customPrevArrow.alt || 'Previous Arrow',
    class: "custom-arrow-img"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "next-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: customNextArrow.url,
    alt: customNextArrow.alt || 'Next Arrow',
    class: "custom-arrow-img"
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, `
                    /* CSS for arrows */
                    #btn-wrap-${sliderId} .prev-btn svg,
                    #btn-wrap-${sliderId} .next-btn svg {
                        fill: ${arrowColor || '#D8613C'} !important;
                    }
                    
                    /* CSS for caption colors */
                    #${sliderId} .img-caption {
                        color: ${headingColor || 'inherit'} !important;
                    }
                    #${sliderId} .img-description {
                        color: ${descriptionColor || 'inherit'} !important;
                    }
                    
                    /* CSS for dots */
                    #${sliderId} .slick-dots li {
                        background: ${dotsColor} !important;
                    }
                    #${sliderId} .mcfgb-gallery-single iframe , #${sliderId} .mcfgb-gallery-single img ,#${sliderId} .mcfgb-gallery-single video {
                        border-radius: ${typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined' ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px` : `${borderRadius || 0}px`};
                        width:100% !important;
                        height: 100% !important;
                    }
                    
                    /* Video thumbnail styling */
                    #${sliderId} .video-thumbnail-wrapper {
                        border-radius: ${typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined' ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px` : `${borderRadius || 0}px`};
                        overflow: hidden;
                    }
                    
                    #${sliderId} .video-thumbnail-wrapper img {
                        transition: transform 0.3s ease;
                    }
                    
                    #${sliderId} .video-thumbnail-wrapper .play-button-overlay {
                        transition: all 0.3s ease;
                    }
                    
                    #${sliderId} .video-thumbnail-wrapper:hover .play-button-overlay {
                        background-color: rgba(0,0,0,0.8) !important;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    #btn-wrap-${sliderId} .custom-arrow-img{
                        width: 30px !important;
                        height: 30px !important;
                        object-fit: contain !important;
                        filter: brightness(0) saturate(100%) !important;
                    }
                    #${sliderId} .slick-dots li.number{
                        background: ${dotsColor} !important;
                        color: #fff !important;
                    }

                    #${sliderId} .slick-dots li.dot {
                        background: ${dotsColor};
                        border-radius: 50%;
                        font-size: 0;
                        border: 1px solid #000;
                    }
                     .${sliderId}-fancy-custom .fancybox__backdrop {
                        background: ${fancyboxBgColor} !important;
                        opacity: ${fancyboxOpacity}% !important;
                    }
                                         .${sliderId}-fancy-custom .fancybox__content {
                        width: ${fancyboxWidth}px !important;
                        max-height:700px !important;
                    }
                     
                     /* Hide Fancybox caption completely */
                     .${sliderId}-fancy-custom .fancybox__caption,
                     .fancybox__caption {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    }
                
                `), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("script", null, `              
                        jQuery(document).ready(function($) {
                            


                            function removeGalleryHash() {
                                if (window.location.hash.startsWith('#gallery-${sliderId}-')) {
                                    history.replaceState("", document.title, window.location.pathname + window.location.search);
                                    window.location.reload();
                                }
                            }
                            function removeGalleryHash2() {
                                if (window.location.hash) {
                                    history.replaceState("", document.title, window.location.pathname + window.location.search);
                                    window.location.reload();
                                }
                            }
                            removeGalleryHash();
                            removeGalleryHash2();

                            var sliderId = "#${sliderId}";

                                $('[data-fancybox="gallery-${sliderId}"]').each(function () {
                                    var $this = $(this);
                                    var $datafancyclass = $this.attr('data-fancy-class');
                                    const isAutoplay = ${autoplay || false};
                                    const isInfinite = ${infinite || false};
                                    var $slider = $(sliderId);
                                    
                                    Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
                                        mainClass: 'media-carousel-fancy-custom ' + $datafancyclass + '-fancy-custom',
                                        on: {
                                            reveal: (fancybox, slide) => {
                                                if (isAutoplay) {
                                                    $(sliderId).slick('slickPause');
                                                } 
                                            },
                                            close: (fancybox, slide) => {
                                                var currentSlide = fancybox.getSlide().index;

                                                if ("${sliderType}" === "carouselType") {
                                                    let slickIndex = currentSlide ;
                                                    if (isInfinite) {
                                                        const slickSlidesCount = $(sliderId).slick('getSlick').slideCount;
                                                        slickIndex = (currentSlide % slickSlidesCount) - 2;
                                                    }
                                                    $slider.slick('slickGoTo', slickIndex);
                                                } else {
                                                let slickIndex = currentSlide ;
                                                    if (isInfinite) {
                                                        const slickSlidesCount = $(sliderId).slick('getSlick').slideCount;
                                                        slickIndex = (currentSlide % slickSlidesCount) - 1;
                                                    }
                                                    $slider.slick('slickGoTo', slickIndex);
                                                }

                                                if (isAutoplay) {
                                                    setTimeout(() => {      
                                                        $(sliderId).slick('slickPlay');
                                                    }, 100);
                                                }
                                            },
                                        },
                                        Image: { 
                                            zoom: false,
                                        },
                                        Html: {
                                            video: {
                                                autoplay: false,
                                                ratio: 16/9
                                            }
                                        },
                                        Carousel: {
                                            infinite: false,
                                            Navigation: false
                                        },
                                        Toolbar: {
                                            display: false
                                        },
                                        Thumbs: {
                                            autoStart: false
                                        },
                                        // Additional options to ensure footer and caption are hidden
                                        hideScrollbar: true,
                                        backdropClick: "close",
                                        dragToClose: false,
                                        // Explicitly hide footer and caption elements
                                        on: {
                                            initLayout: (fancybox) => {
                                                // Hide footer after layout is initialized
                                                const footer = fancybox.container.querySelector('.fancybox__footer');
                                                if (footer) {
                                                    footer.style.display = 'none';
                                                }
                                                
                                                // Hide caption after layout is initialized
                                                const caption = fancybox.container.querySelector('.fancybox__caption');
                                                if (caption) {
                                                    caption.style.display = 'none';
                                                }
                                            },
                                            done: (fancybox, slide) => {
                                                // Additional attempt to hide caption after slide is loaded
                                                setTimeout(() => {
                                                    const captions = document.querySelectorAll('.fancybox__caption');
                                                    captions.forEach(caption => {
                                                        caption.style.display = 'none';
                                                        caption.style.visibility = 'hidden';
                                                        caption.style.opacity = '0';
                                                    });
                                                }, 100);
                                            },
                                            reveal: (fancybox, slide) => {
                                                // Hide caption when modal is revealed
                                                setTimeout(() => {
                                                    const captions = document.querySelectorAll('.fancybox__caption');
                                                    captions.forEach(caption => {
                                                        caption.style.display = 'none';
                                                        caption.style.visibility = 'hidden';
                                                        caption.style.opacity = '0';
                                                    });
                                                }, 50);
                                            }
                                        }
                                    });
                                });
                            
                            switch ("${sliderType}") {
                                    case 'simpleType':
                                        switch("${simpleType}") {
                                            case 'simple':
                                            $(sliderId).slick({
                                            slidesToShow: ${slidesToShowDesktop || 2},
                                            slidesToScroll: ${slidesToScroll || 1},
                                            arrows: ${showArrows || false},
                                            speed: ${speed || 1000},
                                            autoplaySpeed: ${speed || 1000},
                                            autoplay: ${autoplay || false},   
                                            infinite: ${infinite || false},       
                                            dots: ${dots || false},
                                            pauseOnHover: ${pauseOnHover !== undefined ? pauseOnHover : true},
                                            customPaging: function(sliderId, i) {
                                                if ("${dotsType}" === "number") {
                                                    return i + 1;
                                                } else {
                                                    return '.';
                                                }
                                            },
                                            responsive: [
                                                {
                                                    breakpoint: 1024,
                                                    settings: {
                                                        slidesToShow: ${slidesToShowTablet || 2},
                                                        slidesToScroll: ${slidesToScroll || 1},
                                                        arrows: ${showArrows || false}
                                                    }
                                                },
                                                {
                                                    breakpoint: 768,
                                                    settings: {
                                                        slidesToShow: ${slidesToShowMobile || 1},
                                                        slidesToScroll: ${slidesToScroll || 1},
                                                        arrows: ${showArrows || false}
                                                    }
                                                }
                                            ],
                                            prevArrow: '#btn-wrap-${sliderId} .prev-btn',
                                            nextArrow: '#btn-wrap-${sliderId} .next-btn',
                                        });
                                        $(sliderId + ' .slick-dots li').each(function(index) {
                                            if ("${dotsType}" === "number") {
                                                $(this).addClass('number');
                                            } else {
                                                $(this).addClass('dot');
                                            }
                                        });
                                            break;
                                        case 'fade':
                                            $(sliderId).slick({
                                                slidesToShow: ${slidesToShowDesktop || 2},
                                                slidesToScroll: ${slidesToScroll || 1},
                                                dots: ${dots || false},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") {
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                speed: ${speed || 1000},
                                                autoplay: ${autoplay || false},
                                                fade: true,
                                                cssEase: 'linear',
                                                arrows: ${showArrows || false},
                                                autoplaySpeed: ${speed || 1000},
                                                infinite: ${infinite || false},
                                                pauseOnHover: ${pauseOnHover !== undefined ? pauseOnHover : true},
                                                responsive: [
                                                    {
                                                        breakpoint: 1024,
                                                        settings: {
                                                            slidesToShow: ${slidesToShowTablet || 2},
                                                            slidesToScroll: ${slidesToScroll || 1},
                                                            arrows: ${showArrows || false}
                                                        }
                                                    },
                                                    {
                                                        breakpoint: 768,
                                                        settings: {
                                                            slidesToShow: ${slidesToShowMobile || 1},
                                                            slidesToScroll: ${slidesToScroll || 1},
                                                            arrows: ${showArrows || false}
                                                        }
                                                    }
                                                ],
                                                prevArrow: '#btn-wrap-${sliderId} .prev-btn',
                                                nextArrow: '#btn-wrap-${sliderId} .next-btn',
                                            });
                                            $(sliderId + ' .slick-dots li').each(function(index) {
                                                if ("${dotsType}" === "number") {
                                                    $(this).addClass('number');
                                                } else {
                                                    $(this).addClass('dot');
                                                }
                                            });
                                            break;
                                        case 'adaptiveheight':
                                            $(sliderId).slick({
                                                slidesToShow: ${slidesToShowDesktop || 2},
                                                slidesToScroll: ${slidesToScroll || 1},
                                                dots: ${dots || false},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") {
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                speed: ${speed || 1000},
                                                autoplay: ${autoplay || false},
                                                adaptiveHeight: true,
                                                arrows: ${showArrows || false},
                                                autoplaySpeed: ${speed || 1000},
                                                infinite: ${infinite || false},
                                                pauseOnHover: ${pauseOnHover !== undefined ? pauseOnHover : true},
                                                responsive: [
                                                    {
                                                        breakpoint: 1024,
                                                        settings: {
                                                            slidesToShow: ${slidesToShowTablet || 2},
                                                            slidesToScroll: ${slidesToScroll || 1},
                                                            arrows: ${showArrows || false}
                                                        }
                                                    },
                                                    {
                                                        breakpoint: 768,
                                                        settings: {
                                                            slidesToShow: ${slidesToShowMobile || 1},
                                                            slidesToScroll: ${slidesToScroll || 1},
                                                            arrows: ${showArrows || false}
                                                        }
                                                    }
                                                ],
                                                prevArrow: '#btn-wrap-${sliderId} .prev-btn',
                                                nextArrow: '#btn-wrap-${sliderId} .next-btn',
                                            });
                                            $(sliderId + ' .slick-dots li').each(function(index) {
                                                if ("${dotsType}" === "number") {
                                                    $(this).addClass('number');
                                                } else {
                                                    $(this).addClass('dot');
                                                }
                                            });
                                            break;
                                    }
                                    break;
                                case 'carouselType':
                                    switch("${carouselType}") {
                                        case 'carousel':
                                            $(sliderId).slick({
                                                slidesToShow: ${slidesToShowDesktop || 2},
                                                slidesToScroll: ${slidesToScroll || 1},
                                                dots: ${dots || false},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") {
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                speed: ${speed || 1000},
                                                autoplay: ${autoplay || false},
                                                arrows: ${showArrows || false},
                                                autoplaySpeed: ${speed || 1000},
                                                infinite: ${infinite || false},
                                                pauseOnHover: ${pauseOnHover !== undefined ? pauseOnHover : true},
                                                responsive: [
                                                    {
                                                        breakpoint: 1024,
                                                        settings: {
                                                            slidesToShow: ${slidesToShowTablet || 2},
                                                            slidesToScroll: ${slidesToScroll || 1},
                                                            arrows: ${showArrows || false}
                                                        }
                                                    },
                                                    {
                                                        breakpoint: 768,
                                                        settings: {
                                                            slidesToShow: ${slidesToShowMobile || 1},
                                                            slidesToScroll: ${slidesToScroll || 1},
                                                            arrows: ${showArrows || false}
                                                        }
                                                    }
                                                ],
                                                prevArrow: '#btn-wrap-${sliderId} .prev-btn',
                                                nextArrow: '#btn-wrap-${sliderId} .next-btn',
                                            });
                                            $(sliderId + ' .slick-dots li').each(function(index) {
                                                if ("${dotsType}" === "number") {
                                                    $(this).addClass('number');
                                                } else {
                                                    $(this).addClass('dot');
                                                }
                                            });
                                            break;
                                        case 'centermode':
                                            $(sliderId).slick({
                                                centerMode: true,
                                                centerPadding: '60px',
                                                slidesToShow: ${slidesToShowDesktop || 2},
                                                speed: ${speed || 1000},
                                                autoplay: ${autoplay || false},
                                                infinite: ${infinite || false},
                                                pauseOnHover: ${pauseOnHover !== undefined ? pauseOnHover : true},
                                                responsive: [
                                                    {
                                                        breakpoint: 1024,
                                                        settings: {
                                                            arrows: ${showArrows || false},
                                                            centerMode: true,
                                                            centerPadding: '40px',
                                                            slidesToShow: ${slidesToShowTablet || 2}
                                                        }
                                                    },
                                                    {
                                                        breakpoint: 768,
                                                        settings: {
                                                            arrows: ${showArrows || false},
                                                            centerMode: true,
                                                            centerPadding: '40px',
                                                            slidesToShow: ${slidesToShowMobile || 1}
                                                        }
                                                    }
                                                ],
                                                arrows: ${showArrows || false},
                                                autoplaySpeed: ${speed || 1000},
                                                dots: ${dots || false},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") { 
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                prevArrow: '#btn-wrap-${sliderId} .prev-btn',
                                                nextArrow: '#btn-wrap-${sliderId} .next-btn',
                                            });
                                            $(sliderId + ' .slick-dots li').each(function(index) {
                                                if ("${dotsType}" === "number") {
                                                    $(this).addClass('number');
                                                } else {
                                                    $(this).addClass('dot');
                                                }
                                            });
                                            break;
                                        }
                                    break;
                                default:
                                    $(sliderId).slick({
                                        slidesToShow: ${slidesToShowDesktop || 2},
                                        slidesToScroll: ${slidesToScroll || 1},
                                        speed: ${speed || 1000}, 
                                        autoplay: ${autoplay || false},
                                        autoplaySpeed: ${speed || 1000},
                                        arrows: ${showArrows || false},
                                        infinite: ${infinite || false},
                                        pauseOnHover: ${pauseOnHover !== undefined ? pauseOnHover : true},
                                        responsive: [
                                            {
                                                breakpoint: 1024,
                                                settings: {
                                                    slidesToShow: ${slidesToShowTablet || 2},
                                                    slidesToScroll: ${slidesToScroll || 1},
                                                    arrows: ${showArrows || false}
                                                }
                                            },
                                            {
                                                breakpoint: 768,
                                                settings: {
                                                    slidesToShow: ${slidesToShowMobile || 1},
                                                    slidesToScroll: ${slidesToScroll || 1},
                                                    arrows: ${showArrows || false}
                                                }
                                            }
                                        ],
                                        prevArrow: '#btn-wrap-${sliderId} .prev-btn',
                                        nextArrow: '#btn-wrap-${sliderId} .next-btn',
                                    });
                                    $(sliderId + ' .slick-dots li').each(function(index) {
                                                if ("${dotsType}" === "number") {
                                                    $(this).addClass('number');
                                                } else {
                                                    $(this).addClass('dot');
                                                }
                                            });
                                    break;
                            }
                        });
                `));
}

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkgutenberg_media_carousel"] = globalThis["webpackChunkgutenberg_media_carousel"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map