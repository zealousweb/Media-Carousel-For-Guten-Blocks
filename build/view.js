/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log('Hello World! (from create-block-gutenberg-media-carousel block)');
// /* eslint-enable no-console */
var $ = jQuery.noConflict();
// $(() => {
// 	jQuery("[data-fancybox]").each(function () {
// 		$this = jQuery(this);
// 		$datafancyclass = jQuery(this).attr('data-fancy-class');
// 		// console.log($datafancyclass);
// 		Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
// 			mainClass: `media-carousel-fancy-custom ` + $datafancyclass + '-fancy-custom',
// 		});
// 	});
// });

// getting slick slider current index on the open of
// var $ = jQuery.noConflict();
// $(() => {
//     jQuery("[data-fancybox]").each(function () {
//         let $this = jQuery(this);
//         let $datafancyclass = $this.attr('data-fancy-class');

//         Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
//             mainClass: `media-carousel-fancy-custom ` + $datafancyclass + '-fancy-custom',
//             on: {
//                 reveal: (fancybox) => {
//                     let slickInstance = $this.closest('.slick-slider').slick('getSlick');
//                     if (slickInstance) {
//                         let currentIndex = slickInstance.currentSlide;
//                         console.log('Current index: ', currentIndex);
//                     } else {
//                         console.log('Slick instance not found.');
//                     }
//                 }
//             }
//         });
//     });
// });
// $(() => {
// 	jQuery("[data-fancybox]").each(function () {
// 		$this = jQuery(this);
// 		$datafancyclass = jQuery(this).attr('data-fancy-class');
// 		// console.log($datafancyclass);
// 		Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
// 			mainClass: `media-carousel-fancy-custom ` + $datafancyclass + '-fancy-custom',
// 			on: {
// 				done: (fancybox, slide) => {
// 					currentSlide = slide.index;
// 					$(".slick-dots li").each(function () {
// 						currentDot = $(this).text();
// 						if(currentSlide == currentDot){
// 							$(this).addClass('slick-active').siblings().removeClass('slick-active');
// 						}
// 					});
// 					console.log(currentSlide)
// 				},
// 			},
// 		});
// 	});
// });

// $(() => {
//     jQuery("[data-fancybox]").each(function () {
//         var $this = jQuery(this);
//         var $datafancyclass = $this.attr('data-fancy-class');

//         Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
//             mainClass: `media-carousel-fancy-custom ` + $datafancyclass + '-fancy-custom',
//             on: {
//                 done: (fancybox, slide) => {
//                     var currentSlideIndex = slide.index + 1; // Start index from 1
//                     console.log(currentSlideIndex);
//                     var fancyBoxIndex = currentSlideIndex - 1; // Adjust for fancy box index
// 					console.log('fancyBoxIndex',fancyBoxIndex);
//                     $(".slick-dots li").removeClass('slick-active').eq(fancyBoxIndex).addClass('slick-active');
//                 },
//             },
//         });
//     });
// });

//working
// $(() => {
//     jQuery("[data-fancybox]").each(function () {
//         var $this = jQuery(this);
//         var $datafancyclass = $this.attr('data-fancy-class');

//         Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
//             mainClass: `media-carousel-fancy-custom ` + $datafancyclass + '-fancy-custom',
//             on: {
//                 done: (fancybox, slide) => {
//                     var currentSlideIndex = slide.index + 1; // Start index from 1
//                     $(".slick-carousel").slick('slickGoTo', currentSlideIndex - 1); // Adjust for slick index
//                     console.log(currentSlideIndex);
//                 },
//             },
//         });
//     });
// });
/******/ })()
;
//# sourceMappingURL=view.js.map