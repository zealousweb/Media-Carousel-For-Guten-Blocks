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

export default function save({ attributes,  }) {
    const { galleryImages, sliderType, showArrows, arrowType,sliderId,youtubeUrls } = attributes;
    console.log(youtubeUrls);

    // Define getPrevArrow and getNextArrow functions
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
                {galleryImages &&
                    galleryImages.map((media,index) => {
                           if (media.type === 'image') {
                            return (
                                <div key={media.id} className="utk-gallery-single">
                                    <a href={youtubeUrls[index]} data-fancybox="gallery" data-caption={media.alt ? media.alt : "Gallery Image"}>
                                        <img
                                            src={media.url}
                                            alt={media.alt ? media.alt : "Gallery Image"}
                                        />
                                    </a>
                                </div>
                            );
                        } else if (media.type === 'video') {
                            return (
                                <div key={media.id} className="utk-gallery-single" >
                                    <video controls>
                                        <source src={media.url} type={media.mime} />
                                        Your browser does not support the video tag.
                                    </video>
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
                        $('[data-fancybox="gallery"]').fancybox({
                            loop: false,
                            protect: true
                        });
                        var sliderId = "#${sliderId}";
                        
                        switch ("${sliderType}") {
                            case 'simple':
                                $(sliderId).slick({
                                    arrows: ${showArrows},
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType): null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                });
                                break;
                            case 'carousel':
                                $(sliderId).slick({
                                    infinite: true,
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    dots: true,
                                    arrows: ${showArrows},
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
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
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                });
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
            <style>
                
            </style>
        </>
    );
}