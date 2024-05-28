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

import $ from "jquery";
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
import 'react-fancybox/lib/fancybox.css';
import ReactFancyBox from 'react-fancybox';

export default function Save({ attributes }) {
    const { galleryImages, sliderType, showArrows, arrowType, sliderId, urls, fancybox, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, fancyboxBgColor, fancyboxWidth, fancyboxOpacity, arrowpos ,slidesToShow,slidesToScroll} = attributes;

    return (
        <>
            <div className={`${arrowpos} ${showArrows}`}>
                <div id={sliderId} >
                    {galleryImages && galleryImages.map((media, index) => {
                        const currentCaption = caption ? media.caption : '';
                        const url = urls && urls[index] ? urls[index] : "";
                        const isYouTubeUrl = url.includes("youtube.com");
                        const isWebsiteUrl = url.startsWith("http");
                        if (media.type === 'image') {
                            if (fancybox && isYouTubeUrl && url !== '') {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <a href={url} data-fancybox={`gallery-${sliderId}`} data-caption={media.alt ? media.alt : "Gallery Image"}>
                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                />
                                            </a>
                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            } else if (!fancybox && isYouTubeUrl && url !== '') {
                                const videoID = url.match(/[?&]v=([^&]+)/)[1];
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
                                            <img
                                                src={media.url}
                                                alt={media.alt ? media.alt : "Gallery Image"}
                                            />

                                        </div>
                                        {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                    </div>
                                );
                            }

                        } else if (media.type === 'video') {
                            return (
                                <div key={media.id}>
                                    <div className="mcfgb-gallery-single">
                                        <video controls>
                                            <source src={media.url} type={media.mime} />
                                        </video>
                                    </div>
                                    {currentCaption && <div className="img-caption">{currentCaption}</div>}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div id="btn-wrap" class={arrowType}>
                    <div class="custom-1 svg-arrow">
                        <div class="prev-btn">
                            <svg viewBox="0 0 512 512" fill="#000000">
                                <path d="M154.52,265.848l90.964,69.014c2.329,1.766,4.674,2.702,6.78,2.702c2.148,0,4.022-0.974,5.276-2.741 c1.199-1.688,1.807-3.99,1.807-6.844v-26.424c0-6.952,5.656-12.608,12.607-12.608h75.036c8.705,0,15.788-7.085,15.788-15.788 v-34.313c0-8.703-7.083-15.788-15.788-15.788h-75.036c-6.951,0-12.607-5.656-12.607-12.608v-26.425 c0-7.065-3.659-9.584-7.082-9.584c-2.106,0-4.451,0.936-6.78,2.702l-90.964,69.014c-3.416,2.59-5.297,6.087-5.297,9.849 C149.223,259.762,151.103,263.259,154.52,265.848z">

                                </path>
                                <path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256 S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256 S151.667,66.785,256,66.785z">

                                </path>
                            </svg>
                        </div>
                        <div class="next-btn">
                            <svg viewBox="0 0 512 512" fill="#000000">
                                <path d="M154.52,265.848l90.964,69.014c2.329,1.766,4.674,2.702,6.78,2.702c2.148,0,4.022-0.974,5.276-2.741 c1.199-1.688,1.807-3.99,1.807-6.844v-26.424c0-6.952,5.656-12.608,12.607-12.608h75.036c8.705,0,15.788-7.085,15.788-15.788 v-34.313c0-8.703-7.083-15.788-15.788-15.788h-75.036c-6.951,0-12.607-5.656-12.607-12.608v-26.425 c0-7.065-3.659-9.584-7.082-9.584c-2.106,0-4.451,0.936-6.78,2.702l-90.964,69.014c-3.416,2.59-5.297,6.087-5.297,9.849 C149.223,259.762,151.103,263.259,154.52,265.848z">

                                </path>
                                <path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256 S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256 S151.667,66.785,256,66.785z">

                                </path>
                            </svg>
                        </div>
                    </div>

                    <div class="custom-2 svg-arrow">
                        <div class="prev-btn">
                            <svg viewBox="0 0 512 512">
                                <path d="M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256 S385.387,485.333,256,485.333z">
                                </path>
                                <path d="M337.387,381.013c-0.107-0.107-0.32-0.213-0.427-0.32L167.36,256l169.6-124.8c4.8-3.413,5.76-10.133,2.347-14.827 c-3.52-4.8-10.133-5.76-14.933-2.24L143.04,247.467c-4.693,3.52-5.76,10.133-2.24,14.933c0.64,0.853,1.387,1.6,2.24,2.24 l181.333,133.227c4.693,3.627,11.307,2.773,14.933-1.92C342.933,391.253,342.08,384.64,337.387,381.013z">
                                </path>
                            </svg>
                        </div>
                        <div class="next-btn">
                            <svg viewBox="0 0 512 512">
                                <path d="M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256 S385.387,485.333,256,485.333z">
                                </path>
                                <path d="M337.387,381.013c-0.107-0.107-0.32-0.213-0.427-0.32L167.36,256l169.6-124.8c4.8-3.413,5.76-10.133,2.347-14.827 c-3.52-4.8-10.133-5.76-14.933-2.24L143.04,247.467c-4.693,3.52-5.76,10.133-2.24,14.933c0.64,0.853,1.387,1.6,2.24,2.24 l181.333,133.227c4.693,3.627,11.307,2.773,14.933-1.92C342.933,391.253,342.08,384.64,337.387,381.013z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="custom-3 svg-arrow">
                        <div class="prev-btn">
                            <svg viewBox="0 0 512.003 512.003">
                                <path d="M351.539,256.002l159.07-242.79c2.108-3.226,1.8-7.467-0.76-10.351c-2.568-2.867-6.741-3.686-10.197-1.963L4.719,248.364 C1.826,249.815,0,252.767,0,256.002s1.826,6.187,4.719,7.637l494.933,247.467c1.22,0.606,2.526,0.896,3.814,0.896 c2.381,0,4.719-0.998,6.383-2.859c2.56-2.884,2.867-7.125,0.76-10.351L351.539,256.002z">
                                </path>
                            </svg>
                        </div>
                        <div class="next-btn">
                            <svg viewBox="0 0 512.003 512.003">
                                <path d="M351.539,256.002l159.07-242.79c2.108-3.226,1.8-7.467-0.76-10.351c-2.568-2.867-6.741-3.686-10.197-1.963L4.719,248.364 C1.826,249.815,0,252.767,0,256.002s1.826,6.187,4.719,7.637l494.933,247.467c1.22,0.606,2.526,0.896,3.814,0.896 c2.381,0,4.719-0.998,6.383-2.859c2.56-2.884,2.867-7.125,0.76-10.351L351.539,256.002z">
                                </path>
                            </svg>
                        </div>
                    </div>

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
                        width:100%;
                    }
                    #${sliderId} #btn-wrap .svg-arrow svg{
                        fill: ${arrowColor} !important;
                    }
                    #${sliderId} .slick-dots li.number{
                        background: ${dotsColor} !important;
                        color: #fff !important;
                    }
                
                `}
            </style>
            <script>
                {`              
                        jQuery(document).ready(function($) {

                            $('[data-fancybox="gallery-${sliderId}"]').fancybox();
                            $('[data-fancybox="gallery-${sliderId}"]').on('click', function() {
                                $(this).attr('data-fancybox', 'gallery-${sliderId}');
                                if ($.fancybox.getInstance()) {
                                    $('body.fancybox-active .fancybox-bg').css('background', '${fancyboxBgColor}');
                                    $('body.fancybox-active .fancybox-container .fancybox-content').css('width', '${fancyboxWidth}');
                                    $('body.fancybox-active .fancybox-bg').css('opacity', '${fancyboxOpacity}%');
                                    
                                }
                            });
                            
                            var sliderId = "#${sliderId}";
                            switch ("${sliderType}") {
                                case 'simpleType':
                                    switch("${simpleType}") {
                                        case 'simple':
                                            $(sliderId).slick({
                                            arrows: ${showArrows},
                                            speed:${speed},
                                            autoplaySpeed:${speed},
                                            autoplay:${autoplay},
                                            infinite: ${autoplay ? true : infinite},        
                                            dots:${dots},
                                            customPaging: function(sliderId, i) {
                                                if ("${dotsType}" === "number") {
                                                    return i + 1;
                                                } else {
                                                    return '.';
                                                }
                                            },
                                            prevArrow: '#btn-wrap .prev-btn',
                                            nextArrow: '#btn-wrap .next-btn',
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
                                                infinite: ${autoplay ? true : infinite}, 
                                                prevArrow: '#btn-wrap .prev-btn',
                                                nextArrow: '#btn-wrap .next-btn',
                                            });
                                            // Add classes to the slick dots
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
                                                infinite: ${autoplay ? true : infinite}, 
                                                prevArrow: '#btn-wrap .prev-btn',
                                                nextArrow: '#btn-wrap .next-btn',
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
                                                infinite: ${autoplay ? true : infinite}, 
                                                prevArrow: '#btn-wrap .prev-btn',
                                                nextArrow: '#btn-wrap .next-btn',
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
                                                infinite: ${autoplay ? true : infinite}, 
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
                                                prevArrow: '#btn-wrap .prev-btn',
                                                nextArrow: '#btn-wrap .next-btn',
                                            });
                                            $(sliderId + ' .slick-dots li').each(function(index) {
                                                if ("${dotsType}" === "number") {
                                                    $(this).addClass('number');
                                                } else {
                                                    $(this).addClass('dot');
                                                }
                                            });
                                            break;
                                        case 'lazyloading':
                                            $(sliderId).slick({
                                                lazyLoad: 'ondemand',
                                                slidesToShow: ${slidesToShow},
                                                slidesToScroll: ${slidesToScroll},
                                                speed:${speed},
                                                autoplay:${autoplay}, 
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite: ${autoplay ? true : infinite},  
                                                dots:${dots},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") { 
                                                        return i + 1;
                                                    } else {
                                                        return '.';
                                                    }
                                                },
                                                prevArrow: '#btn-wrap .prev-btn',
                                                nextArrow: '#btn-wrap .next-btn',
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
                                        infinite: ${autoplay ? true : infinite}, 
                                        prevArrow: '#btn-wrap .prev-btn',
                                        nextArrow: '#btn-wrap .next-btn',
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