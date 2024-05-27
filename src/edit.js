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
    Button

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
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";

export default function Edit({ attributes, setAttributes }) {
    const { galleryImages = [], urls = [], sliderType, showArrows, arrowType, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, fancyboxBgColor, fancyboxWidth, fancyboxOpacity, arrowpos } = attributes;
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
                <PanelBody title={__("Media Carousel Settings", "media-carousel-for-guten-blocks")}>
                    <RangeControl
                        label={__("Speed of Slider", "media-carousel-for-guten-blocks")}
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value })}
                        min={1000}
                        max={5000}
                    />
                    <ToggleControl
                        label={__("Caption", "media-carousel-for-guten-blocks")}
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
                    />

                    <PanelBody title={__("FancyBox Settings", "media-carousel-for-guten-blocks")}>
                        <ToggleControl
                            label={__("Enable FancyBox", "media-carousel-for-guten-blocks")}
                            checked={attributes.fancybox}
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
                                    min={200}
                                    max={1200}
                                />
                                <RangeControl
                                    label={__("FancyBox Opacity", "media-carousel-for-guten-blocks")}
                                    value={fancyboxOpacity}
                                    onChange={(value) => setAttributes({ fancyboxOpacity: value })}
                                    min={0}
                                    max={100}
                                />
                            </>
                        }
                    </PanelBody>

                    <PanelBody title={__("Slider Type Settings", "media-carousel-for-guten-blocks")}>
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
                                )}
                                {sliderType === "carouselType" && (
                                    <SelectControl
                                        label={__("Carousel Slider Type", "media-carousel-for-guten-blocks")}
                                        value={carouselType}
                                        options={[
                                            { label: __("Carousel", "media-carousel-for-guten-blocks"), value: "carousel" },
                                            { label: __("Center Mode", "media-carousel-for-guten-blocks"), value: "centermode" },
                                            { label: __("Lazy Loading", "media-carousel-for-guten-blocks"), value: "lazyloading" },
                                        ]}
                                        onChange={(val) => {
                                            setAttributes({ carouselType: val });
                                        }}
                                    />
                                )}
                            </>
                        )}

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
                                    className="arrowclass"
                                    label={__("Arrow Type", "media-carousel-for-guten-blocks")}
                                    selected={arrowType}
                                    options={[
                                        {
                                            label: <>

                                                <svg viewBox="0 0 512 512" fill="#000000">
                                                    <path d="M154.52,265.848l90.964,69.014c2.329,1.766,4.674,2.702,6.78,2.702c2.148,0,4.022-0.974,5.276-2.741 c1.199-1.688,1.807-3.99,1.807-6.844v-26.424c0-6.952,5.656-12.608,12.607-12.608h75.036c8.705,0,15.788-7.085,15.788-15.788 v-34.313c0-8.703-7.083-15.788-15.788-15.788h-75.036c-6.951,0-12.607-5.656-12.607-12.608v-26.425 c0-7.065-3.659-9.584-7.082-9.584c-2.106,0-4.451,0.936-6.78,2.702l-90.964,69.014c-3.416,2.59-5.297,6.087-5.297,9.849 C149.223,259.762,151.103,263.259,154.52,265.848z">

                                                    </path>
                                                    <path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256 S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256 S151.667,66.785,256,66.785z">

                                                    </path>
                                                </svg>

                                            </>, value: "custom1"
                                        },
                                        {
                                            label: <>

                                                <svg viewBox="0 0 512 512">
                                                    <path d="M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256 S385.387,485.333,256,485.333z">
                                                    </path>
                                                    <path d="M337.387,381.013c-0.107-0.107-0.32-0.213-0.427-0.32L167.36,256l169.6-124.8c4.8-3.413,5.76-10.133,2.347-14.827 c-3.52-4.8-10.133-5.76-14.933-2.24L143.04,247.467c-4.693,3.52-5.76,10.133-2.24,14.933c0.64,0.853,1.387,1.6,2.24,2.24 l181.333,133.227c4.693,3.627,11.307,2.773,14.933-1.92C342.933,391.253,342.08,384.64,337.387,381.013z">
                                                    </path>
                                                </svg>

                                            </>, value: "custom2"
                                        },
                                        {
                                            label: <>

                                                <svg viewBox="0 0 512.003 512.003">
                                                    <path d="M351.539,256.002l159.07-242.79c2.108-3.226,1.8-7.467-0.76-10.351c-2.568-2.867-6.741-3.686-10.197-1.963L4.719,248.364 C1.826,249.815,0,252.767,0,256.002s1.826,6.187,4.719,7.637l494.933,247.467c1.22,0.606,2.526,0.896,3.814,0.896 c2.381,0,4.719-0.998,6.383-2.859c2.56-2.884,2.867-7.125,0.76-10.351L351.539,256.002z">
                                                    </path>
                                                </svg>

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
                                    label={__("Arrow Type", "media-carousel-for-guten-blocks")}
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
                                    setAttributes({ infinite: true, autoplay: false });
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
                                <span className="color">{__("Dots Color", "media-carousel-for-guten-blocks")}</span>
                                <ColorPalette
                                    value={dotsColor}
                                    onChange={(color) => setAttributes({ dotsColor: color })}
                                    colors={colors}
                                />
                            </>
                        )}
                    </PanelBody>


                </PanelBody>
            </InspectorControls>

            <BlockControls>
                <ToolbarGroup>
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
                {
                    `
                        .arrowclass input[type=radio]:checked + label svg{
                            fill:${arrowColor} !important;
                        }
                    `
                }
            </style>
        </>
    );
}
