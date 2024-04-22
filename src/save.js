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
    const { galleryImages, sliderType, showArrows, arrowType, sliderId, youtubeUrls, fancybox, simpleType, carouselType } = attributes;

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
                    const caption = media.caption ? media.caption : '';
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
                                        <div>{caption}</div>
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
                                            <div>{caption}</div> 
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
                                        <div>{caption}</div> 
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
                                <div>{caption}</div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            
     
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
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'fade':
                                            $(sliderId).slick({
                                                dots: true,
                                                infinite: true,
                                                speed: 500,
                                                fade: true,
                                                cssEase: 'linear',
                                                arrows: ${showArrows},
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'adaptiveheight':
                                            $(sliderId).slick({
                                                dots: true,
                                                infinite: true,
                                                speed: 300,
                                                slidesToShow: 1,
                                                adaptiveHeight: true,
                                                arrows: ${showArrows},
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
                                                dots: true,
                                                arrows: ${showArrows},
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'centermode':
                                            $(sliderId).slick({
                                                centerMode: true,
                                                centerPadding: '60px',
                                                slidesToShow: 3,
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
                                                prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : 'null'},
                                                nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : 'null'}
                                            });
                                            break;
                                        case 'lazyloading':
                                            $(sliderId).slick({
                                                lazyLoad: 'ondemand',
                                                slidesToShow: 3,
                                                slidesToScroll: 1,
                                                arrows: ${showArrows},
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
                                        autoplay: true,
                                        autoplaySpeed: 2000,
                                        arrows: ${showArrows},
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