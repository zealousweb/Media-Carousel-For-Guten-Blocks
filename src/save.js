/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */


import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
import 'react-fancybox/lib/fancybox.css';

export default function Save({ attributes }) {
    const { galleryImages, sliderType, showArrows, arrowType, sliderId, urls, fancybox, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, fancyboxBgColor, fancyboxWidth, fancyboxOpacity, arrowpos, slidesToShow, slidesToScroll } = attributes;

    return (
        <>
            <div className={`${arrowpos} ${sliderType}  ${showArrows}`}>
                <div id={sliderId} >
                    {galleryImages && galleryImages.map((media, index) => {
                        const currentCaption = caption ? media.caption : '';
                        const url = urls && urls[index] ? urls[index] : "";
                        {/* const isYouTubeUrl = url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com"); */ }
                        const isYouTubeUrl = url.includes("youtube.com") || url.includes("youtu.be");
                        const isVimeoUrl = url.includes("vimeo.com");
                        const isWebsiteUrl = url.startsWith("http");
                        if (media.type === 'image') {
                            if (fancybox && (isYouTubeUrl || isVimeoUrl) && url !== '') {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <a href={url} data-fancybox={`gallery-${sliderId}`} data-fancy-class={sliderId} data-caption={media.alt ? media.alt : "Gallery Image"} className="ratio-part">
                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                />
                                            </a>
                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
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

                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part">
                                                {embedUrl ? (
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={embedUrl}
                                                        title="Video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : (
                                                    <div>Invalid video URL</div>
                                                )}
                                            </div>
                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );

                            } else if (!isYouTubeUrl && isWebsiteUrl && url !== '') {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <a href={url}>
                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                    className="ratio-part"
                                                />

                                            </a>
                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            } else if (fancybox) {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <a href={media.url} data-fancybox={`gallery-${sliderId}`} data-fancy-class={sliderId} data-caption={media.alt ? media.alt : "Gallery Image"}>
                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                    className="ratio-part"
                                                />
                                            </a>

                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part">

                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                />
                                            </div>

                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            }

                        } else if (media.type === 'video') {
                            if (fancybox) {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part">
                                                <a href={media.url} data-fancybox={`gallery-${sliderId}`} data-fancy-class={sliderId} data-caption={media.alt ? media.alt : "Gallery Image"}>
                                                    <video controls>
                                                        <source src={media.url} type={media.mime} />
                                                    </video>
                                                </a>
                                            </div>

                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part">
                                                <video controls>
                                                    <source src={media.url} type={media.mime} />
                                                </video>
                                            </div>

                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}
                </div>
                <div id={`btn-wrap-${sliderId}`} class={arrowType}>
                    {arrowType === 'custom1' && (
                        <div class="svg-arrow">
                            <div class="prev-btn">
                                <svg viewBox="0 0 30.725 30.725"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"></path> </g> </g></svg>
                            </div>
                            <div class="next-btn">
                                <svg viewBox="0 0 30.725 30.725"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"></path> </g> </g></svg>
                            </div>
                        </div>
                    )}

                    {arrowType === 'custom2' && (
                        <div class="svg-arrow">
                            <div class="prev-btn">
                                <svg viewBox="0 0 8 8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"></rect> <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect> <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"></rect> </g></svg>
                            </div>
                            <div class="next-btn">
                                <svg viewBox="0 0 8 8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"></rect> <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect> <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"></rect> </g></svg>
                            </div>
                        </div>
                    )}
                    {arrowType === 'custom3' && (
                        <div class="svg-arrow">
                            <div class="prev-btn">
                                <svg viewBox="0 0 512.013 512.013"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"></path> </g> </g> </g></svg>
                            </div>
                            <div class="next-btn">
                                <svg viewBox="0 0 512.013 512.013"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"></path> </g> </g> </g></svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
                    /* CSS for arrows */
                    
                    /* CSS for dots */
                    #${sliderId} .slick-dots li {
                        color: ${dotsColor} !important;
                    }
                    #${sliderId} .mcfgb-gallery-single iframe , #${sliderId} .mcfgb-gallery-single img ,#${sliderId} .mcfgb-gallery-single video {
                        border-radius:${borderRadius}px;
                        width:100% !important;
                        height: 100% !important;
                    }
                    #btn-wrap-${sliderId} .svg-arrow svg{
                        fill: ${arrowColor} !important;
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
                
                `}
            </style>
            <script>
                {`              
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
                                    const isAutoplay =${autoplay};
                                    const isInfinite =${infinite};
                                    var $slider = $(sliderId);
                                    
                                    Fancybox.bind('[data-fancybox="gallery-' + $datafancyclass + '"]', {
                                        mainClass: 'media-carousel-fancy-custom ' + $datafancyclass + '-fancy-custom',
                                        on: {
                                            reveal: (fancybox, slide) => {
                                                console.log('Fancybox triggered, stopping autoplay');
                                                if (isAutoplay) {
                                                    $(sliderId).slick('slickPause');
                                                } 
                                            },
                                            close: (fancybox, slide) => {
                                                var currentSlide = fancybox.getSlide().index;

                                                if (${sliderType === "carouselType"}) {
                                                    let slickIndex = currentSlide ;
                                                    // console.log('Navigating to the corresponding slide in Slick slider:', slickIndex);
                                                    if (isInfinite) {
                                                        console.log('on');
                                                        const slickSlidesCount = $(sliderId).slick('getSlick').slideCount;
                                                        console.log(slickSlidesCount);
                                                        slickIndex = (currentSlide % slickSlidesCount) - 2;
                                                        console.log('slickIndex',slickIndex);
                                                    }
                                                    $slider.slick('slickGoTo', slickIndex);
                                                } else {
                                                let slickIndex = currentSlide ;
                                                    if (isInfinite) {
                                                        console.log('on');
                                                        const slickSlidesCount = $(sliderId).slick('getSlick').slideCount;
                                                        console.log(slickSlidesCount);
                                                        slickIndex = (currentSlide % slickSlidesCount) - 1;
                                                        console.log('slickIndex',slickIndex);
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
                                    });
                                });
                            
                            switch ("${sliderType}") {
                                    case 'simpleType':
                                        switch("${simpleType}") {
                                            case 'simple':
                                            $(sliderId).slick({
                                            arrows: ${showArrows},
                                            speed:${speed},
                                            autoplaySpeed:${speed},
                                            autoplay:${autoplay},   
                                            infinite: ${autoplay ? true : (typeof infinite !== 'undefined' ? infinite : false)},       
                                            dots:${dots},
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
                                        case 'fade':
                                            $(sliderId).slick({
                                                dots:${dots},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") {
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                fade: true,
                                                cssEase: 'linear',
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite: ${autoplay ? true : (typeof infinite !== 'undefined' ? infinite : false)},
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
                                                dots:${dots},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") {
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                adaptiveHeight: true,
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite: ${autoplay ? true : (typeof infinite !== 'undefined' ? infinite : false)},
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
                                                slidesToShow: ${slidesToShow},
                                                slidesToScroll: ${slidesToScroll},
                                                dots:${dots},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") {
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite: ${autoplay ? true : (typeof infinite !== 'undefined' ? infinite : false)},
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
                                                slidesToShow: ${slidesToShow},
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                infinite: ${autoplay ? true : (typeof infinite !== 'undefined' ? infinite : false)},
                                                responsive: [
                                                    {
                                                        breakpoint: 768,
                                                        settings: {
                                                            arrows: false,
                                                            centerMode: true,
                                                            centerPadding: '40px',
                                                            slidesToShow: ${slidesToShow}
                                                        }
                                                    },
                                                    {
                                                        breakpoint: 480,
                                                        settings: {
                                                            arrows: false,
                                                            centerMode: true,
                                                            centerPadding: '40px',
                                                            slidesToShow: 1
                                                        }
                                                    }
                                                ],
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                dots:${dots},
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
                                        slidesToShow: ${slidesToShow},
                                        slidesToScroll: ${slidesToScroll},
                                        speed:${speed}, 
                                        autoplay:${autoplay},
                                        autoplaySpeed:${speed},
                                        arrows: ${showArrows},
                                        infinite: ${autoplay ? true : (typeof infinite !== 'undefined' ? infinite : false)},
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
                `}
            </script>
        </>
    );
} 