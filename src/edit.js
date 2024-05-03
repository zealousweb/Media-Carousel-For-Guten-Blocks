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


export default function Edit({ attributes, setAttributes }) {
    const { galleryImages = [], youtubeUrls = [], sliderType, showArrows, arrowType, fancybox } = attributes;

    const [sliderId, setSliderId] = useState(attributes.sliderId || '');

    useEffect(() => {
        if (!sliderId) {
            setSliderId(`utk-slider-${sliderType}-${Math.floor(Math.random() * 1000)}`);
        }
    }, [sliderType, sliderId]);

    useEffect(() => {
        setAttributes({ ...attributes, sliderId });
    }, [sliderId]);

    const handleRemove = (mediaId) => {
        const updatedGallery = galleryImages.filter((media) => media.id !== mediaId);
        setAttributes({ galleryImages: updatedGallery });
    };
    
    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Gallery Settings")}>
                    <ToggleControl
                        label={__("Enable FancyBox")}
                        checked={fancybox}
                        onChange={(val) => {
                            setAttributes({ fancybox: val });
                        }}
                    />
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

            <BlockControls>
                <ToolbarGroup>
                    <MediaUploadCheck>
                        <MediaUpload
                            multiple="add"
                            onSelect={(val) => {
                                setAttributes({ galleryImages: val.map((media) => ({
                                    id: media.id,
                                    url: media.url,
                                    alt: media.alt,
                                    type: media.type,
                                    caption: media.caption, // Include the caption field
                                })) });
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
                {galleryImages && galleryImages.map((media, index) => (
                    <div key={media.id} className="utk-gallery-single">
                        {media.type === 'image' ? (
                            <>
                                <img src={media.url} alt={media.alt ? media.alt : "Gallery Image"} />
                                <div>
                                    <button onClick={() => handleRemove(media.id)}>Remove</button>
                                </div>
                                <input
                                    type="text"
                                    value={youtubeUrls.map((url, idx) => idx === index ? url : '').join('')}
                                    onChange={(event) => {
                                        const updatedUrls = [...youtubeUrls];
                                        updatedUrls[index] = event.target.value;
                                        setAttributes({ youtubeUrls: updatedUrls });
                                    }}
                                    placeholder="Enter YouTube video URL"
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
                                    <button onClick={() => handleRemove(media.id)}>Remove</button>
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
        </>
    );
}
