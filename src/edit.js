/**
* Retrieves the translation of text.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
*/
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    BlockControls,
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
} from "@wordpress/block-editor";

/**
 * React hook that is used creates a collapsible container that can be toggled open or closed.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody  
 */
import {
    ToolbarGroup,
    ToolbarButton,
    PanelBody,
    SelectControl,
    ToggleControl,
    RadioControl,
    RangeControl,
    ColorPalette,
    Placeholder,
    Button,
    Panel

} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import { useState, useEffect } from "@wordpress/element";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
import carousel from '../assets/type-carousel.png';
import simple from '../assets/type-slider.png';

export default function Edit({ attributes, setAttributes }) {
    const { galleryImages = [], urls = [], sliderType, showArrows, arrowType, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, fancyboxBgColor, fancyboxWidth, fancyboxOpacity, arrowpos, slidesToShow, slidesToScroll, fancybox } = attributes;
    const [sliderId, setSliderId] = useState(attributes.sliderId || '');

    useEffect(() => {
        if (!sliderId) {
            setSliderId(`mcfgb-slider-${sliderType}-${Math.floor(Math.random() * 1000)}`);
        }
    }, [sliderType, sliderId]);

    useEffect(() => {
        setAttributes({ ...attributes, sliderId });
    }, [sliderId]);

    const colors = [
        { color: '#F9F9F9' },
        { color: '#A4A4A4' },
        { color: '#636363' },
        { color: '#111111' },
        { color: '#FFFFFF' },
        { color: '#C2A990' },
        { color: '#CFCABE' },
        { color: '#D8613C' },
        { color: '#B1C5A4' },
    ];

    return (
        <>
            <InspectorControls>
                <Panel title={__("Media Carousel Settings", "media-carousel-for-guten-blocks")}>
                    <PanelBody>
                        <ToggleControl
                            label={__("Enable Caption", "media-carousel-for-guten-blocks")}
                            checked={caption}
                            onChange={(val) => {
                                setAttributes({ caption: val });
                            }}
                        />
                        <RangeControl
                            label={__("Border Radius for Image and Video ", "media-carousel-for-guten-blocks")}
                            value={borderRadius}
                            onChange={(value) => setAttributes({ borderRadius: value })}
                            min={0}
                            max={50}
                            step={10}
                        />
                    </PanelBody>
                    <PanelBody title={__("FancyBox Settings", "media-carousel-for-guten-blocks")} initialOpen={true}>
                        <ToggleControl
                            label={__("Enable FancyBox", "media-carousel-for-guten-blocks")}
                            checked={fancybox}
                            // onChange={(val) => {
                            //     if (val) {
                            //         setAttributes({ autoplay: false, infinite: false, fancybox: true });
                            //     }
                            //     else {
                            //         setAttributes({ fancybox: false });
                            //     }
                            // }}
                            onChange={(val) => {
                                setAttributes({ fancybox: val });
                            }}
                        />
                        {attributes.fancybox &&
                            <>
                                <span className="color">{__("FancyBox Background Color", "media-carousel-for-guten-blocks")}</span>
                                <ColorPalette
                                    value={fancyboxBgColor}
                                    onChange={(color) => setAttributes({ fancyboxBgColor: color })}
                                    colors={colors}
                                />
                                <RangeControl
                                    label={__("FancyBox Width", "media-carousel-for-guten-blocks")}
                                    value={fancyboxWidth}
                                    onChange={(value) => setAttributes({ fancyboxWidth: value })}
                                    min={400}
                                    max={1200}
                                    step={100}
                                />
                                <RangeControl
                                    label={__("FancyBox Opacity", "media-carousel-for-guten-blocks")}
                                    value={fancyboxOpacity}
                                    onChange={(value) => setAttributes({ fancyboxOpacity: value })}
                                    min={0}
                                    max={100}
                                    step={10}
                                />
                            </>
                        }
                    </PanelBody>
                    <PanelBody title={__("Slider Type Settings", "media-carousel-for-guten-blocks")} initialOpen={true} id={sliderId}>
                        <RadioControl
                            label={__("Slider Type", "media-carousel-for-guten-blocks")}
                            selected={sliderType}
                            options={[
                                { label: __("Simple Type", "media-carousel-for-guten-blocks"), value: "simpleType" },
                                { label: __("Carousel Type", "media-carousel-for-guten-blocks"), value: "carouselType" },
                            ]}
                            onChange={(val) => {
                                setAttributes({ sliderType: val });
                            }}
                        />
                        {sliderType && (
                            <>
                                {sliderType === "simpleType" && (
                                    <>
                                        <img src={simple} className="type_image" />
                                        <SelectControl
                                            label={__("Simple Slider Type", "media-carousel-for-guten-blocks")}
                                            value={simpleType}
                                            options={[
                                                { label: __("Simple", "media-carousel-for-guten-blocks"), value: "simple" },
                                                { label: __("Fade", "media-carousel-for-guten-blocks"), value: "fade" },
                                                { label: __("Adaptive Height", "media-carousel-for-guten-blocks"), value: "adaptiveheight" },
                                            ]}
                                            onChange={(val) => {
                                                setAttributes({ simpleType: val });
                                            }}
                                        />
                                    </>
                                )}
                                {sliderType === "carouselType" && (
                                    <>
                                        <img src={carousel} className="type_image" />
                                        <SelectControl
                                            label={__("Carousel Slider Type", "media-carousel-for-guten-blocks")}
                                            value={carouselType}
                                            options={[
                                                { label: __("Carousel", "media-carousel-for-guten-blocks"), value: "carousel" },
                                                { label: __("Center Mode", "media-carousel-for-guten-blocks"), value: "centermode" },
                                            ]}
                                            onChange={(val) => {
                                                setAttributes({ carouselType: val });
                                            }}
                                        />
                                        <RangeControl
                                            label={__("Slides To Show", "media-carousel-for-guten-blocks")}
                                            value={slidesToShow}
                                            onChange={(value) => setAttributes({ slidesToShow: value })}
                                            min={2}
                                            max={4}
                                        />
                                        <RangeControl
                                            label={__("Slides To Scroll", "media-carousel-for-guten-blocks")}
                                            value={slidesToScroll}
                                            onChange={(value) => setAttributes({ slidesToScroll: value })}
                                            min={1}
                                            max={3}
                                        />

                                    </>
                                )}
                            </>
                        )}
                        <RangeControl
                            label={__("Delay Speed of Slider", "media-carousel-for-guten-blocks")}
                            value={speed}
                            onChange={(value) => setAttributes({ speed: value })}
                            min={1000}
                            max={5000}
                            step={1000}
                        />
                        <ToggleControl
                            label={__("Show Arrows", "media-carousel-for-guten-blocks")}
                            checked={showArrows}
                            onChange={(val) => {
                                setAttributes({ showArrows: val });
                            }}
                        />
                        {showArrows && (
                            <>
                                <RadioControl
                                    className={` arrowclass  ${arrowType} ${sliderId}`}
                                    label={__("Arrow Type", "media-carousel-for-guten-blocks")}
                                    selected={arrowType}
                                    options={[
                                        {
                                            label: <>

                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg viewBox="0 0 30.725 30.725"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"></path> </g> </g></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 30.725 30.725"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.078,26.457c0.977,0.978,0.977,2.559,0,3.536c-0.488,0.488-1.128,0.731-1.77,0.731c-0.639,0-1.278-0.243-1.768-0.731 L5.914,15.362l14.629-14.63c0.977-0.977,2.559-0.976,3.535,0c0.977,0.977,0.977,2.56,0,3.536L12.984,15.362L24.078,26.457z"></path> </g> </g></svg>
                                                    </div>
                                                </div>
                                            </>, value: "custom1"
                                        },
                                        {
                                            label: <>

                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg viewBox="0 0 8 8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"></rect> <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect> <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"></rect> </g></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 8 8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"></rect> <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect> <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"></rect> </g></svg>
                                                    </div>
                                                </div>
                                            </>, value: "custom2"
                                        },
                                        {
                                            label: <>

                                                <div class="svg-arrow">
                                                    <div class="prev-btn">
                                                        <svg viewBox="0 0 512.013 512.013"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"></path> </g> </g> </g></svg>
                                                    </div>
                                                    <div class="next-btn">
                                                        <svg viewBox="0 0 512.013 512.013"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M366.64,256.013L508.677,32.802c5.141-8.107,4.267-18.624-2.176-25.749c-6.443-7.168-16.832-9.067-25.365-4.8 L11.802,236.92c-7.232,3.627-11.797,11.008-11.797,19.093c0,8.085,4.565,15.467,11.797,19.093l469.333,234.667 c3.029,1.515,6.293,2.24,9.536,2.24c5.888,0,11.691-2.432,15.829-7.04c6.443-7.125,7.317-17.643,2.176-25.749L366.64,256.013z"></path> </g> </g> </g></svg>
                                                    </div>
                                                </div>

                                            </>, value: "custom3"
                                        },
                                    ]}
                                    onChange={(val) => {
                                        setAttributes({ arrowType: val });
                                    }}
                                />

                                <span className="color">{__("Arrow Color", "media-carousel-for-guten-blocks")}</span>
                                <ColorPalette
                                    value={arrowColor}
                                    onChange={(color) => setAttributes({ arrowColor: color })}
                                    colors={colors}
                                />

                                <RadioControl
                                    className="arrowpos"
                                    label={__("Arrow Position", "media-carousel-for-guten-blocks")}
                                    selected={arrowpos}
                                    options={[
                                        { label: "Bottom", value: "bottom" },
                                        { label: "Side", value: "side" },
                                    ]}
                                    onChange={(val) => {
                                        setAttributes({ arrowpos: val });
                                    }}
                                />

                            </>
                        )}
                        <ToggleControl
                            label={__("Auto Play", "media-carousel-for-guten-blocks")}
                            checked={autoplay}
                            onChange={(val) => {
                                if (val) {
                                    setAttributes({ autoplay: true, infinite: false });
                                }
                                else {
                                    setAttributes({ autoplay: false });
                                }
                            }}
                        />
                        <ToggleControl
                            label={__("Infinite", "media-carousel-for-guten-blocks")}
                            checked={infinite}
                            onChange={(val) => {
                                if (val) {
                                    setAttributes({ infinite: true, autoplay: false});
                                } else {
                                    setAttributes({ infinite: false });
                                }
                            }}
                        />
                        <ToggleControl
                            label={__("Dots", "media-carousel-for-guten-blocks")}
                            checked={dots}
                            onChange={(val) => {
                                setAttributes({ dots: val });
                            }}
                        />
                        {dots && (
                            <>
                                <SelectControl
                                    label={__("Dots Type", "media-carousel-for-guten-blocks")}
                                    value={dotsType}
                                    options={[
                                        { label: "Normal Dots", value: "ndots" },
                                        { label: "Number", value: "number" },
                                    ]}
                                    onChange={(val) => {
                                        setAttributes({ dotsType: val });
                                    }}
                                />
                                <span className="color">
                                    {dotsType === "number" ? __("Number Color", "media-carousel-for-guten-blocks") : __("Dots Color", "media-carousel-for-guten-blocks")}
                                </span>
                                <ColorPalette
                                    value={dotsColor}
                                    onChange={(color) => setAttributes({ dotsColor: color })}
                                    colors={colors}
                                />
                            </>
                        )}
                    </PanelBody>
                </Panel>
            </InspectorControls>

            <BlockControls>
                <ToolbarGroup>
                    <MediaUploadCheck>
                        <MediaUpload
                            multiple="add"
                            onSelect={(val) => {
                                // Filter out any duplicate images
                                const filteredVal = val.filter((media) => {
                                    return !galleryImages.some((img) => img.id === media.id);
                                });

                                // Filter out any removed images
                                const updatedGallery = galleryImages.filter((img) => {
                                    return val.some((media) => media.id === img.id);
                                }).map((img) => ({
                                    id: img.id,
                                    url: img.url,
                                    alt: img.alt,
                                    type: img.type,
                                    caption: img.caption || ''
                                }));

                                // Merge filtered newly selected media with the updated gallery, preserving captions
                                const finalGallery = [
                                    ...updatedGallery,
                                    ...filteredVal.map((media) => ({
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt,
                                        type: media.type,
                                        caption: media.caption || '' // Set a default caption if not provided
                                    }))
                                ];

                                setAttributes({ galleryImages: finalGallery });
                            }}

                            // onSelect={(val) => {
                            //     setAttributes({
                            //         galleryImages: val.map((media) => ({
                            //             id: media.id,
                            //             url: media.url,
                            //             alt: media.alt,
                            //             type: media.type,
                            //             caption: media.caption, // Include the caption field
                            //         }))
                            //     });
                            // }}

                            allowedTypes={['image', 'video']}
                            value={galleryImages.map((val) => val.id)}
                            render={({ open }) => (
                                <ToolbarButton
                                    label={__("Edit Images")}
                                    onClick={() => {
                                        open();
                                    }}
                                    icon="edit"
                                />
                            )}
                        />
                    </MediaUploadCheck>
                </ToolbarGroup>
            </BlockControls>

            <div {...useBlockProps()} id={sliderId}>
                {galleryImages && galleryImages.length > 0 ? (
                    <div class="slider-boxwrap">
                        {galleryImages.map((media, index) => (
                            <div key={media.id} className="mcfgb-gallery-single">
                                {media.type === 'image' ? (
                                    <>
                                        <img src={media.url} alt={media.alt ? media.alt : "Gallery Image"} />
                                        <input
                                            type="text"
                                            className="ytb-url"
                                            value={urls.map((url, idx) => idx === index ? url : '').join('')}
                                            onChange={(event) => {
                                                const updatedUrls = [...urls];
                                                updatedUrls[index] = event.target.value;
                                                setAttributes({ urls: updatedUrls });
                                            }}
                                            placeholder="Enter URL "
                                        />
                                        {caption && (
                                            <input
                                                type="text"
                                                className="caption"
                                                value={media.caption || ''}
                                                onChange={(event) => {
                                                    const updatedGallery = [...galleryImages];
                                                    updatedGallery[index].caption = event.target.value;
                                                    setAttributes({ galleryImages: updatedGallery });
                                                }}
                                                placeholder="Enter Caption"
                                            />
                                        )}

                                    </>
                                ) : media.type === 'video' ? (
                                    <>
                                        <video controls>
                                            <source src={media.url} type={media.mime} />
                                            {__("Your browser does not support the video tag.", "media-carousel-for-guten-blocks")}
                                        </video>
                                        {caption && (
                                            <input
                                                type="text"
                                                className="caption-video"
                                                value={media.caption || ''}
                                                onChange={(event) => {
                                                    const updatedGallery = [...galleryImages];
                                                    updatedGallery[index].caption = event.target.value;
                                                    setAttributes({ galleryImages: updatedGallery });
                                                }}
                                                placeholder="Enter Caption"
                                            />
                                        )}

                                    </>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Placeholder
                        className="upload-part"
                        label="Add Gallery Image or Video"
                        instructions="Upload images or videos by clicking the button below."
                    >
                        <MediaUploadCheck>
                            <MediaUpload
                                multiple="add"
                                onSelect={(val) => {
                                    setAttributes({
                                        galleryImages: val.map((media) => ({
                                            id: media.id,
                                            url: media.url,
                                            alt: media.alt,
                                            type: media.type,
                                            caption: media.caption, // Include the caption field
                                        }))
                                    });
                                }}
                                allowedTypes={['image', 'video']}
                                value={galleryImages.map((val) => val.id)}
                                render={({ open }) => (
                                    <Button onClick={open} isPrimary className="upload-btn">
                                        <svg viewBox="0 0 24 24" width="24" ><g> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z"></path> </g> </g></svg>
                                        {__("Upload Media", "media-carousel-for-guten-blocks")}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </Placeholder>
                )}
            </div>

            <style>
                {`
                        .arrowclass.${arrowType}.${sliderId} input[type=radio]:checked + label svg g{
                            fill:${arrowColor} !important;
                        }
                        #${sliderId} .slider-boxwrap .mcfgb-gallery-single img , #${sliderId} .slider-boxwrap .mcfgb-gallery-single video{
                            border-radius:${borderRadius}px !important;
                        }
                `}
            </style>
        </>
    );
}
