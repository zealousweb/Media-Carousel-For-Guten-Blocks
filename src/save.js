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


export default function Save({ attributes }) {
    const { galleryImages, sliderType, showArrows, arrowType, customPrevArrow, customNextArrow, sliderId, urls, fancybox, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, borderRadiusTop, borderRadiusRight, borderRadiusBottom, borderRadiusLeft, fancyboxBgColor, fancyboxWidth, fancyboxOpacity, arrowpos, slidesToShow, slidesToShowDesktop, slidesToShowTablet, slidesToShowMobile, slidesToScroll, pauseOnHover, hideOnDesktop, hideOnTablet, hideOnMobile, hideArrowsOnDesktop, hideArrowsOnTablet, hideArrowsOnMobile, imageAspectRatio = "16:9", description, headingColor = "#111111", descriptionColor = "#636363" } = attributes;

    // Build responsive visibility classes
    const responsiveClasses = [
        hideOnDesktop ? 'mcfgb-hide-desktop' : '',
        hideOnTablet ? 'mcfgb-hide-tablet' : '',
        hideOnMobile ? 'mcfgb-hide-mobile' : ''
    ].filter(Boolean).join(' ');

    // Build arrow responsive visibility classes
    const arrowResponsiveClasses = [
        hideArrowsOnDesktop ? 'mcfgb-hide-arrows-desktop' : '',
        hideArrowsOnTablet ? 'mcfgb-hide-arrows-tablet' : '',
        hideArrowsOnMobile ? 'mcfgb-hide-arrows-mobile' : ''
    ].filter(Boolean).join(' ');

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
            '21:9': '21 / 9',
        };
        return { aspectRatio: aspectRatios[imageAspectRatio] || '16 / 9' };
    };

    const aspectRatioStyle = getAspectRatioStyle();

    return (
        <>
            <div className={`${arrowpos} ${sliderType}  ${showArrows} ${responsiveClasses}`}>
                <div id={sliderId} >
                    {galleryImages && galleryImages.map((media, index) => {
                        const currentCaption = caption ? media.caption : '';
                        const currentDescription = caption ? media.description : '';
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
                                            <a href={url} data-fancybox={`gallery-${sliderId}`} data-fancy-class={sliderId} data-caption={media.alt ? media.alt : "Gallery Image"} className="ratio-part" style={aspectRatioStyle}>
                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                />
                                            </a>
                                        </div>
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
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
                                            <div className="ratio-part" style={aspectRatioStyle}>
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
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
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
                                                    style={aspectRatioStyle}
                                                />

                                            </a>
                                        </div>
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
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
                                                    style={aspectRatioStyle}
                                                />
                                            </a>

                                        </div>
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
                                    
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part" style={aspectRatioStyle}>

                                                <img
                                                    src={media.url}
                                                    alt={media.alt ? media.alt : "Gallery Image"}
                                                />
                                            </div>

                                        </div>
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
                                    </div>
                                );
                            }

                        } else if (media.type === 'video') {
                            if (fancybox) {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part" style={aspectRatioStyle}>
                                                <a href={media.url} data-fancybox={`gallery-${sliderId}`} data-fancy-class={sliderId} data-caption={media.alt ? media.alt : "Video"}>
                                                    {/* Video thumbnail with play button */}
                                                    <div className="video-thumbnail-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                        {media.thumbnailUrl ? (
                                                            <img 
                                                                src={media.thumbnailUrl} 
                                                                alt={media.alt || "Video Thumbnail"} 
                                                                style={{ 
                                                                    width: '100%', 
                                                                    height: '100%', 
                                                                    objectFit: 'cover'
                                                                }}
                                                            />
                                                        ) : (
                                                            <div style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: '#f8f9fa',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                border: '2px dashed #dee2e6'
                                                            }}>
                                                                <div style={{ textAlign: 'center' }}>
                                                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#6c757d" style={{ marginBottom: '8px' }}>
                                                                        <path d="M8 5v14l11-7z"/>
                                                                    </svg>
                                                                    <div style={{ fontSize: '12px', color: '#6c757d' }}>
                                                                        Generating thumbnail...
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Play button overlay */}
                                                        <div className="play-button-overlay" style={{
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
                                                        }}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                                <path d="M8 5v14l11-7z"/>
                                                            </svg>
                                                        </div>
                                                        
                                                        {/* Hidden video element for thumbnail generation */}
                                                        <video 
                                                            style={{ display: 'none' }}
                                                            preload="metadata"
                                                            muted
                                                            playsInline
                                                        >
                                                            <source src={media.url} type={media.mime} />
                                                        </video>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={media.id}>
                                        <div className="mcfgb-gallery-single">
                                            <div className="ratio-part" style={aspectRatioStyle}>
                                                {/* Video thumbnail with click to play functionality */}
                                                <div className="video-thumbnail-wrapper" style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}>
                                                    {media.thumbnailUrl ? (
                                                        <img 
                                                            src={media.thumbnailUrl} 
                                                            alt={media.alt || "Video Thumbnail"} 
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '100%', 
                                                                objectFit: 'cover'
                                                            }}
                                                            onClick={() => {
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
                                                                videoContainer.onclick = (e) => {
                                                                    if (e.target === videoContainer) {
                                                                        document.body.removeChild(videoContainer);
                                                                    }
                                                                };
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: '#f8f9fa',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '2px dashed #dee2e6'
                                                        }}>
                                                            <div style={{ textAlign: 'center' }}>
                                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#6c757d" style={{ marginBottom: '8px' }}>
                                                                    <path d="M8 5v14l11-7z"/>
                                                                </svg>
                                                                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                                                                    Generating thumbnail...
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Play button overlay */}
                                                    <div className="play-button-overlay" style={{
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
                                                    }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                            <path d="M8 5v14l11-7z"/>
                                                        </svg>
                                                    </div>
                                                    
                                                    {/* Hidden video element for thumbnail generation */}
                                                    <video 
                                                        style={{ display: 'none' }}
                                                        preload="metadata"
                                                        muted
                                                        playsInline
                                                    >
                                                        <source src={media.url} type={media.mime} />
                                                    </video>
                                                </div>
                                            </div>
                                        </div>
                                        {currentCaption && <div className="img-caption" style={{ color: headingColor }}>{currentCaption}</div>}
                                        {currentDescription && <div className="img-description" style={{ color: descriptionColor }}>{currentDescription}</div>}
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}
                </div>
                <div id={`btn-wrap-${sliderId}`} class={`${arrowType} ${arrowResponsiveClasses}`}>
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
                    {arrowType === 'custom' && customPrevArrow && customNextArrow && (
                        <div class="svg-arrow">
                            <div class="prev-btn">
                                <img 
                                    src={customPrevArrow.url} 
                                    alt={customPrevArrow.alt || 'Previous Arrow'} 
                                    class="custom-arrow-img"
                                />
                            </div>
                            <div class="next-btn">
                                <img 
                                    src={customNextArrow.url} 
                                    alt={customNextArrow.alt || 'Next Arrow'} 
                                    class="custom-arrow-img"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
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
                        color: ${dotsColor} !important;
                    }
                    #${sliderId} .mcfgb-gallery-single iframe , #${sliderId} .mcfgb-gallery-single img ,#${sliderId} .mcfgb-gallery-single video {
                        border-radius: ${
                            (typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined')
                                ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px`
                                : `${borderRadius || 0}px`
                        };
                        width:100% !important;
                        height: 100% !important;
                    }
                    
                    /* Video thumbnail styling */
                    #${sliderId} .video-thumbnail-wrapper {
                        border-radius: ${
                            (typeof borderRadiusTop !== 'undefined' && typeof borderRadiusRight !== 'undefined' && typeof borderRadiusBottom !== 'undefined' && typeof borderRadiusLeft !== 'undefined')
                                ? `${borderRadiusTop || 0}px ${borderRadiusRight || 0}px ${borderRadiusBottom || 0}px ${borderRadiusLeft || 0}px`
                                : `${borderRadius || 0}px`
                        };
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
                                            infinite: ${autoplay ? true : (infinite || false)},       
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
                                                infinite: ${autoplay ? true : (infinite || false)},
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
                                                infinite: ${autoplay ? true : (infinite || false)},
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
                                                infinite: ${autoplay ? true : (infinite || false)},
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
                                                infinite: ${autoplay ? true : (infinite || false)},
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
                                        infinite: ${autoplay ? true : (infinite || false)},
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
                `}
            </script>
        </>
    );
} 