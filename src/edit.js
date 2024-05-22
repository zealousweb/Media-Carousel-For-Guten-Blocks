/**
* Retrieves the translation of text.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
*/
import { __ } from "@wordpress/i18n";

import { select } from "@wordpress/data";
const { useSelect } = wp.data;

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
    MediaPlaceholder,
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
    const { galleryImages = [], urls = [], sliderType, showArrows, arrowType, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, fancyboxBgColor, fancyboxWidth, fancyboxOpacity } = attributes;
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
                <PanelBody title={__("Media Carousel Settings")}>
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
                            <SelectControl
                                label={__("Arrow Type", "media-carousel-for-guten-blocks")}
                                value={arrowType}
                                options={[
                                    { label: __("Arrow 1", "media-carousel-for-guten-blocks"), value: "custom1" },
                                    { label: __("Arrow 2", "media-carousel-for-guten-blocks"), value: "custom2" },
                                    { label: __("Arrow 3", "media-carousel-for-guten-blocks"), value: "custom3" },
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
                        </>
                    )}

                    <RangeControl
                        label={__("Speed of Slider", "media-carousel-for-guten-blocks")}
                        value={speed}
                        onChange={(value) => setAttributes({ speed: value })}
                        min={1000}
                        max={5000}
                    />
                    <ToggleControl
                        label={__("Auto Play", "media-carousel-for-guten-blocks")}
                        checked={autoplay}
                        onChange={(val) => {
                            if (val) {
                                setAttributes({ autoplay: true, infinite: false });
                            }
                        }}
                    />
                    <ToggleControl
                        label={__("Infinite", "media-carousel-for-guten-blocks")}
                        checked={infinite}
                        onChange={(val) => {
                            if (val) {
                                setAttributes({ infinite: true, autoplay: false });
                            }
                        }}
                    />

                    <ToggleControl
                        label={__("Caption", "media-carousel-for-guten-blocks")}
                        checked={caption}
                        onChange={(val) => {
                            setAttributes({ caption: val });
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

                    <RangeControl
                        label={__("Border Radius for Image and Video ", "media-carousel-for-guten-blocks")}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
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
                <div class="slider-boxwrap">
                    {galleryImages && galleryImages.length > 0 ? (
                        <div class="slider-boxwrap">
                            {galleryImages.map((media, index) => (
                                <div key={media.id} className="mcfgb-gallery-single">
                                    {media.type === 'image' ? (
                                        <>
                                            <img src={media.url} alt={media.alt ? media.alt : "Gallery Image"} />
                                            <div></div>
                                            <input
                                                type="text"
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
                                            <div></div>
                                            {caption && (
                                                <input
                                                    type="text"
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
                            icon="format-image"
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
                                        <Button onClick={open} isPrimary>
                                            {__("Upload Media", "media-carousel-for-guten-blocks")}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </Placeholder>
                    )}
                </div>
            </div>
        </>
    );
}
