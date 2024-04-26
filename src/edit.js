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
     RadioControl
 
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
     const { galleryImages = [], youtubeUrls = [], sliderType, showArrows, arrowType, fancybox, simpleType, carouselType } = attributes;
 
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
                        checked={attributes.fancybox}
                        onChange={(val) => {
                            setAttributes({ fancybox: val });
                        }}
                    />
                    <RadioControl
                        label={__("Slider Type")}
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
                                    label={__("Simple Slider Type")}
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
                                    label={__("Carousel Slider Type")}
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
 