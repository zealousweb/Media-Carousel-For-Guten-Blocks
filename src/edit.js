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
    ToggleControl 
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
    const { galleryImages, sliderType, showArrows, arrowType } = attributes;

    const [sliderId, setSliderId] = useState(attributes.sliderId || '');

    useEffect(() => {
        if (!sliderId) {
            setSliderId(`utk-slider-${sliderType}-${Math.floor(Math.random() * 1000)}`);
        }
    }, [sliderType, sliderId]);
        // Update setAttributes to include sliderId
        useEffect(() => {
            setAttributes({ ...attributes, sliderId });
        }, [sliderId]);

        console.log("edit",sliderId);
        console.log(galleryImages);
    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Gallery Settings")}>
                    <SelectControl
                        label={__("Slider Type")}
                        value={sliderType}
                        options={[
                            { label: "Simple", value: "simple" },
                            { label: "Carousel", value: "carousel" },
                            { label: "Fade", value: "fade" },
                        ]}
                        onChange={(val) => {
                            setAttributes({ sliderType: val });
                        }}
                    />
                    <ToggleControl
                        label={__("Show Arrows")}
                        checked={showArrows}
                        onChange={(val) => {
                            setAttributes({ showArrows: val });
                        }}
                    />
                    {showArrows && (
                        <SelectControl
                            label={__("Arrow Type")}
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
                    )}
                </PanelBody>
            </InspectorControls>

            {galleryImages && (
                <BlockControls>
                    <ToolbarGroup>
                        <MediaUploadCheck>
                            <MediaUpload 
                                multiple={true}
                                onSelect={(val) => {
                                    setAttributes({ galleryImages: val });
                                    console.log(galleryImages);
                                }}
                                // gallery={true}
                                allowedTypes={['image', 'video']}
                                value={attributes.galleryImages.map((val) => val.id)}
                                render={({ open }) => {
                                    return (
                                        <ToolbarButton
                                            label={__("Edit Media")}
                                            onClick={open}
                                            icon="edit"
                                        />
                                    );
                                }}
                            />
                        </MediaUploadCheck>
                    </ToolbarGroup>
                </BlockControls>
            )}

            <div {...useBlockProps()} id={sliderId}>
                {galleryImages ? (
                    galleryImages.map((media) => {
                        if (media.type === 'image') {
                            return (
                                <div key={media.id} className="utk-gallery-single">
                                    <img
                                        src={media.url}
                                        alt={media.alt ? media.alt : "Gallery Image"}
                                    />
                                </div>
                            );
                        } else if (media.type === 'video') {
                            return (
                                <div key={media.id} className="utk-gallery-single">
                                    <video controls>
                                        <source src={media.url} type={media.mime} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <MediaPlaceholder
                        multiple={true}
                        onSelect={(val) => {
                            setAttributes({ galleryImages: val });
                        }}
                        onFilesPreUpload={(val) => {
                            setAttributes({ galleryImages: val });
                        }}
                        onSelectURL={false}
                        allowedTypes={["image", "video"]}
                        labels={{
                            title: "Add Gallery Images and Video",
                        }}
                    />
                )}
            </div>
        </>
    );
}