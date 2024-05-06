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
    const { galleryImages, sliderType, showArrows, arrowType, sliderId, youtubeUrls, fancybox, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots } = attributes;
    console.log(dotsType);
    console.log(dots)

    function getPrevArrow(arrowType) {
        switch (arrowType) {
            case 'custom1':
                return;
            case 'custom2':
                return;
            case 'custom3':
                return;
            default:
                return;
        }
    }

    function getNextArrow(arrowType) {
        switch (arrowType) {
            case 'custom1':
                return;
            case 'custom2':
                return;
            case 'custom3':
                return;
            default:
                return;
        }
    }

    return (
        <>
            <div id={sliderId}>
                {galleryImages && galleryImages.map((media, index) => {
                    {/* const caption = media.caption ? media.caption : ''; */ }
                    const currentCaption = caption ? media.caption : ''; // Conditionally include caption based on the 'caption' attribute
                    if (media.type === 'image') {
                        const youtubeUrl = youtubeUrls && youtubeUrls[index] ? youtubeUrls[index] : "";
                        if (fancybox) {
                            if (youtubeUrl === "") {
                                return (
                                    <div key={media.id} className="utk-gallery-single">
                                        <img
                                            src={media.url}
                                            alt={media.alt ? media.alt : "Gallery Image"}
                                        />
                                        {/* <div>{caption}</div> */}
                                        {currentCaption && <div>{currentCaption}</div>} {/* Conditionally render caption */}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={media.id} className="utk-gallery-single">
                                        <a href={youtubeUrl} data-fancybox="gallery" data-caption={media.alt ? media.alt : "Gallery Image"}>
                                            <img
                                                src={media.url}
                                                alt={media.alt ? media.alt : "Gallery Image"}
                                            />
                                            {/* <div>{caption}</div> */}
                                            {currentCaption && <div>{currentCaption}</div>} {/* Conditionally render caption */}
                                        </a>
                                    </div>
                                );
                            }
                        } else {
                            if (youtubeUrl === "") {
                                return (
                                    <div key={media.id} className="utk-gallery-single">
                                        <img
                                            src={media.url}
                                            alt={media.alt ? media.alt : "Gallery Image"}
                                        />
                                        {/* <div>{caption}</div> */}
                                        {currentCaption && <div>{currentCaption}</div>} {/* Conditionally render caption */}
                                    </div>
                                );
                            } else {
                                const videoID = youtubeUrl.match(/[?&]v=([^&]+)/)[1];
                                return (
                                    <div key={media.id} className="utk-gallery-single">
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    </div>
                                );
                            }
                        }
                    } else if (media.type === 'video') {
                        return (
                            <div key={media.id} className="utk-gallery-single" >
                                <video controls>
                                    <source src={media.url} type={media.mime} />
                                    Your browser does not support the video tag.
                                </video>
                                {/* <div>{caption}</div> */}
                                {currentCaption && <div>{currentCaption}</div>} {/* Conditionally render caption */}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            {showArrows && <p>Arrow Type: {arrowType}</p>}
            <script>
                {`
                        jQuery(document).ready(function($) {
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
                                                infinite:${infinite},
                                                dots:${dots},
                                                customPaging: function(sliderId, i) {
                                                    if ("${dotsType}" === "number") { 
                                                        alert(1);
                                                        return i + 1;
                                                    } 
                                                },
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                               
                                            });
                                            break;
                                        case 'fade':
                                            $(sliderId).slick({
                                                dots:${dots},
                                                infinite: true,
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                fade: true,
                                                cssEase: 'linear',
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite:${infinite},
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'adaptiveheight':
                                            $(sliderId).slick({
                                                dots:${dots},
                                                infinite: true,
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                slidesToShow: 1,
                                                adaptiveHeight: true,
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite:${infinite},
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                    }
                                    break;
                                case 'carouselType':
                                    switch("${carouselType}") {
                                        case 'carousel':
                                            $(sliderId).slick({
                                                infinite: true,
                                                slidesToShow: 3,
                                                slidesToScroll: 3,
                                                dots:${dots},
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite:${infinite},
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'centermode':
                                            $(sliderId).slick({
                                                centerMode: true,
                                                centerPadding: '60px',
                                                slidesToShow: 3,
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                infinite:${infinite},
                                                responsive: [
                                                    {
                                                        breakpoint: 768,
                                                        settings: {
                                                            arrows: false,
                                                            centerMode: true,
                                                            centerPadding: '40px',
                                                            slidesToShow: 3
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
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'lazyloading':
                                            $(sliderId).slick({
                                                lazyLoad: 'ondemand',
                                                slidesToShow: 3,
                                                slidesToScroll: 1,
                                                speed:${speed},
                                                autoplay:${autoplay},
                                                autoplay:true,
                                                arrows: ${showArrows},
                                                autoplaySpeed:${speed},
                                                infinite:${infinite},
                                                dots:${dots},
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                    }
                                    break;
                                default:
                                    $(sliderId).slick({
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        speed:${speed}, 
                                        autoplay:${autoplay},
                                        autoplaySpeed:${speed},
                                        arrows: ${showArrows},
                                        infinite:${infinite},
                                        dots:${dots},
                                        prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                        nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                    });
                                    break;
                            }
                        });
                    `}
            </script>

        </>
    );
} 