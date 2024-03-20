/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { select } from "@wordpress/data";
const { useSelect } = wp.data;

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
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
	RangeControl,
	ToggleControl,
	TextControl,
	SelectControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {

	const { galleryId, galleryType, galleryImages, galleryColumns, galleryGap, imageLightbox, imageHover,sliderType } = attributes;

	var customClass = `utk-gallery-type-${galleryType} utk-gallery-col-${galleryColumns} utk-gallery-gutter-${galleryGap}`;

	const blockProps = useBlockProps({
		className: customClass,
		"data-slider-type": sliderType // Add data-slider-type attribute
	});
	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	
	// gallery id
	setAttributes({ galleryId: 'gallery-' + clientId.slice(0, 8) });

	const galleryStyle = {  
		'--utk--gallery--type': galleryType,  
		'--utk--gallery--col': galleryColumns,
		'--utk--gallery--gutter': galleryGap + 'px',
	}
	
	return (
		<>
		<InspectorControls key="setting">
			<PanelBody title={ __( 'Gallery Settings', 'utk-unified-blocks' ) }>
			<SelectControl
						label={__('Slider Type', 'utk-unified-blocks')}
						value={sliderType}
						options={[
							{ label: 'Simple', value: 'simple' },
							{ label: 'Carousel', value: 'carousel' },
							{ label: 'Fade', value: 'fade' },
						]}
						onChange={(val) => {
							setAttributes({ sliderType: val });
						}}
					/>
				<SelectControl
					label={ __( 'Gallery type', 'utk-unified-blocks' ) }
					value={ galleryType }
					options={ [
						{ label: 'Grid', value: 'grid' },
						{ label: 'Masonry', value: 'masonry' }
					] }
					onChange={ ( val ) => {
						setAttributes( { galleryType: val } );
					} }
				/>
				
				<RangeControl
					label={ __( 'Number of Columns', 'utk-unified-blocks' ) }
					value={ galleryColumns }
					onChange={ ( val ) => {
						setAttributes( { galleryColumns: val } );
					} }
					min={ 1 }
					max={ 5 }
				/>
				
				<RangeControl
					label={ __( 'Items Gutter (px)', 'utk-unified-blocks' ) }
					value={ galleryGap }
					onChange={ ( val ) => {
						setAttributes( { galleryGap: val } );
					} }
					min={ 0 }
					max={ 100 }
				/>

			</PanelBody>
		</InspectorControls>
		<InspectorControls key="setting">
			<PanelBody title={ __( 'Gallery Image Settings', 'utk-unified-blocks' ) }>

				<ToggleControl
					label={ __( 'Enable Image Lightbox ?', 'utk-unified-blocks' ) }
					checked={ imageLightbox }
					onChange={ ( val ) => {
						setAttributes( { imageLightbox: val } );
					} }
				/>
				
				<SelectControl
					label={ __( 'Image Hover', 'utk-unified-blocks' ) }
					value={ imageHover }
					options={ [
						{ label: 'None', value: 'none' },
						{ label: 'Zoom In', value: 'zoom_in' },
						{ label: 'Zoom Out', value: 'zoom_out' }
					] }
					onChange={ ( val ) => {
						setAttributes( { imageHover: val } );
					} }
				/>

			</PanelBody>
		</InspectorControls>
		
		{ galleryImages && (
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							multiple={ true }
							onSelect={ ( val ) => {
								setAttributes( { galleryImages: val } );
							} }
							gallery={ true }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ attributes.galleryImages.map( ( image ) => image.id ) }
							render={ ( { open } ) => {
								return (
									<ToolbarButton
										label={ __( 'Edit Images', 'utk-unified-blocks' ) }
										onClick={ open }
										icon="edit"
									/>
								);
							}}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>
		) }
		
		<div { ...blockProps } style={ galleryStyle }>
		
			{ galleryImages ? (
				
				galleryImages.map( ( image ) => {
					return (
						<div
							key={ image.id }
							className={`utk-gallery-single utk-gallery-gutter-${galleryGap} utk-gallery-hover-${imageHover}`}
						>
							<img src={ image.url } alt={ image.alt ? image.alt : 'Gallery Image' } />
						</div>
					);
				} )
				
			) : (

				<MediaPlaceholder
					multiple={ true }
					onSelect={ ( val ) => {
						setAttributes( { galleryImages: val } );
					} }
					onFilesPreUpload={ ( val ) => {
						setAttributes( { galleryImages: val } );
					} }
					onSelectURL={ false }
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					labels={ {
						title: 'Add Gallery Images',
					} }
				/>

			) }
			
		</div>
		
		</>
	);
}
