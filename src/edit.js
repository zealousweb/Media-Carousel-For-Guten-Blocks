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
    TextControl,
    RadioControl,
    RangeControl,
    ColorPalette

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
    const { galleryImages = [], urls = [], sliderType, showArrows, arrowType, fancybox, simpleType, carouselType, speed, autoplay, infinite, caption, dotsType, dots, arrowColor, dotsColor, borderRadius, fancyboxBgColor, fancyboxWidth, fancyboxOpacity } = attributes;
    const [sliderId, setSliderId] = useState(attributes.sliderId || '');

    useEffect(() => {
        if (!sliderId) {
            setSliderId(`mcfgb-slider-${sliderType}-${Math.floor(Math.random() * 1000)}`);
        }
    }, [sliderType, sliderId]);

    useEffect(() => {
        setAttributes({ ...attributes, sliderId });
    }, [sliderId]);

    useEffect(() => {
        // If autoplay is enabled, disable infinite scrolling
        if (autoplay) {
            setAttributes({ infinite: false });
        }
        // If infinite scrolling is enabled, disable autoplay
        if (infinite) {
            setAttributes({ autoplay: false });
        }
    }, [autoplay, infinite]);

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
                            <span className="color">FancyBox Background Color</span>
                            <ColorPalette
                                value={fancyboxBgColor}
                                onChange={(color) => setAttributes({ fancyboxBgColor: color })}
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
                            { label: "Simple Type", value: "simpleType" },
                            { label: "Carousel Type", value: "carouselType" },
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
                                        { label: "Simple", value: "simple" },
                                        { label: "Fade", value: "fade" },
                                        { label: "Adaptive Height", value: "adaptiveheight" },
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
                                        { label: "Carousel", value: "carousel" },
                                        { label: "Center Mode", value: "centermode" },
                                        { label: "Lazy Loading", value: "lazyloading" },
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
                                    { label: "Arrow 1", value: "custom1" },
                                    { label: "Arrow 2", value: "custom2" },
                                    { label: "Arrow 3", value: "custom3" },
                                ]}
                                onChange={(val) => {
                                    setAttributes({ arrowType: val });
                                }}
                            />
                            <span className="color">Arrow Color</span>
                            <ColorPalette
                                value={arrowColor}
                                onChange={(color) => setAttributes({ arrowColor: color })}
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
                            setAttributes({ autoplay: val });
                        }}
                    />
                    <ToggleControl
                        label={__("Infinite", "media-carousel-for-guten-blocks")}
                        checked={infinite}
                        onChange={(val) => {
                            setAttributes({ infinite: val });
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
                            <span className="color">Dots Color</span>
                            <ColorPalette
                                value={dotsColor}
                                onChange={(color) => setAttributes({ dotsColor: color })}
                            />
                        </>
                    )}

                    <RangeControl
                        label={__("Border Radius", "media-carousel-for-guten-blocks")}
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
                    {galleryImages && galleryImages.map((media, index) => (
                        <div key={media.id} className="mcfgb-gallery-single">
                            {media.type === 'image' ? (
                                <>
                                    <img src={media.url} alt={media.alt ? media.alt : "Gallery Image"} />
                                    <div>
                                    </div>
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
                                    <input
                                        type="text"
                                        value={media.caption || ''} // Display original caption or an empty string if none
                                        onChange={(event) => {
                                            const updatedGallery = [...galleryImages];
                                            updatedGallery[index].caption = event.target.value; // Override the caption
                                            setAttributes({ galleryImages: updatedGallery });
                                        }}
                                        placeholder="Enter Caption"
                                    />
                                </>
                            ) : media.type === 'video' ? (
                                <>
                                    <video controls>
                                        <source src={media.url} type={media.mime} />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div>

                                    </div>
                                    <input
                                        type="text"
                                        value={media.caption || ''} // Display original caption or an empty string if none
                                        onChange={(event) => {
                                            const updatedGallery = [...galleryImages];
                                            updatedGallery[index].caption = event.target.value; // Override the caption
                                            setAttributes({ galleryImages: updatedGallery });
                                        }}
                                        placeholder="Enter Caption"
                                    />
                                </>
                            ) : null}
                        </div>
                    ))}
                    {galleryImages.length === 0 && (
                        <MediaPlaceholder
                            multiple="add"
                            onSelect={(val) => {
                                setAttributes({ galleryImages: val });
                            }}
                            onFilesPreUpload={(val) => {
                                setAttributes({ galleryImages: val });
                            }}
                            onSelectURL={false}
                            allowedTypes={["image", "video"]}
                            labels={{
                                title: "Add Gallery Image or Video",
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
