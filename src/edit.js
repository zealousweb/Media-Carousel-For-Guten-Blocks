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

// export default function Edit({ attributes, setAttributes, clientId }) {
// 	const { galleryImages, sliderType, showArrows  } = attributes;

// 	const blockProps = useBlockProps({
// 		"data-slider-type": sliderType, // Add data-slider-type attribute
// 	});
// 	const ALLOWED_MEDIA_TYPES = ["image"];
//     // console.log(showArrows);
// 	return (
// 		<>
// 			<InspectorControls key="setting">
// 				<PanelBody title={__("Gallery Settings", "utk-unified-blocks")}>
// 					<SelectControl
// 						label={__("Slider Type", "utk-unified-blocks")}
// 						value={sliderType}
// 						options={[
// 							{ label: "Simple", value: "simple" },
// 							{ label: "Carousel", value: "carousel" },
// 							{ label: "Fade", value: "fade" },
// 						]}
// 						onChange={(val) => {
// 							setAttributes({ sliderType: val });
// 						}}
// 					/>
//                      <ToggleControl
//                         label={__("Show Arrows", "utk-unified-blocks")}
//                         checked={showArrows}
//                         onChange={(val) => {
//                             setAttributes({ showArrows: val });
//                         }}
//                     />
                    
// 				</PanelBody>
// 			</InspectorControls>

// 			{galleryImages && (
// 				<BlockControls>
// 					<ToolbarGroup>
// 						<MediaUploadCheck>
// 							<MediaUpload
// 								multiple={true}
// 								onSelect={(val) => {
// 									setAttributes({ galleryImages: val });
// 								}}
// 								gallery={true}
// 								allowedTypes={["image"]}
// 								value={attributes.galleryImages.map((image) => image.id)}
// 								render={({ open }) => {
// 									return (
// 										<ToolbarButton
// 											label={__("Edit Images", "utk-unified-blocks")}
// 											onClick={open}
// 											icon="edit"
// 										/>
// 									);
// 								}}
// 							/>
// 						</MediaUploadCheck>
// 					</ToolbarGroup>
// 				</BlockControls>
// 			)}

// 			<div {...blockProps}>
// 				{galleryImages ? (
// 					galleryImages.map((image) => {
// 						return (
// 							<div key={image.id}>
// 								<img
// 									src={image.url}
// 									alt={image.alt ? image.alt : "Gallery Image"}
// 								/>
// 							</div>
// 						);
// 					})
// 				) : (
// 					<MediaPlaceholder
// 						multiple={true}
// 						onSelect={(val) => {
// 							setAttributes({ galleryImages: val });
// 						}}
// 						onFilesPreUpload={(val) => {
// 							setAttributes({ galleryImages: val });
// 						}}
// 						onSelectURL={false}
// 						allowedTypes={ALLOWED_MEDIA_TYPES}
// 						labels={{
// 							title: "Add Gallery Images",
// 						}}
// 					/>
// 				)}
// 			</div>
// 		</>
// 	);
// }








export default function Edit({ attributes, setAttributes, clientId }) {
    const { galleryImages, sliderType, showArrows, arrowType } = attributes;
    // console.log(arrowType);
    const blockProps = useBlockProps({
        "data-slider-type": sliderType, // Add data-slider-type attribute
        "data-arrow-type":arrowType,
    });

    const ALLOWED_MEDIA_TYPES = ["image"];

    return (
        <>
            <InspectorControls key="setting">
                <PanelBody title={__("Gallery Settings", "utk-unified-blocks")}>
                    <SelectControl
                        label={__("Slider Type", "utk-unified-blocks")}
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
                        label={__("Show Arrows", "utk-unified-blocks")}
                        checked={showArrows}
                        onChange={(val) => {
                            setAttributes({ showArrows: val });
                        }}
                    />
                    {showArrows && (
                        <SelectControl
                            label={__("Arrow Type", "utk-unified-blocks")}
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
                                }}
                                gallery={true}
                                allowedTypes={["image"]}
                                value={attributes.galleryImages.map((image) => image.id)}
                                render={({ open }) => {
                                    return (
                                        <ToolbarButton
                                            label={__("Edit Images", "utk-unified-blocks")}
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

            <div {...blockProps}>
                {galleryImages ? (
                    galleryImages.map((image) => {
                        return (
                            <div key={image.id}>
                                <img
                                    src={image.url}
                                    alt={image.alt ? image.alt : "Gallery Image"}
                                />
                            </div>
                        );
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
                        allowedTypes={ALLOWED_MEDIA_TYPES}
                        labels={{
                            title: "Add Gallery Images",
                        }}
                    />
                )}
            </div>
        </>
    );
}
