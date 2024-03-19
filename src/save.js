/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	useBlockProps,
} from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	
	const { galleryId, galleryType, galleryImages, galleryColumns, galleryGap, imageLightbox, imageHover } = attributes;

	var customClass = `utk-gallery-type-${galleryType} utk-gallery-col-${galleryColumns} utk-gallery-gutter-${galleryGap}`;

	const blockProps = useBlockProps.save({
		className: customClass
	});

	return (
		<>
			
		<div { ...blockProps } style={ `--utk--gallery--type:${galleryType}; --utk--gallery--col:${galleryColumns}; --utk--gallery--gutter:${galleryGap}px;` }>
		
			{ galleryImages &&
				galleryImages.map( ( image ) => {
					
					return imageLightbox ? (

						<a
							className={`utk-gallery-single utk-gallery-gutter-${galleryGap} utk-gallery-hover-${imageHover}`}
							href={ image.url }
							data-fancybox='gallery'
						>
							<img src={ image.url } alt={ image.alt ? image.alt : 'Gallery Image' } />
						</a>

					) : (
							
						<div
							key={ image.id }
							className={`utk-gallery-single utk-gallery-gutter-${galleryGap} utk-gallery-hover-${imageHover}`}
						>
							<img src={ image.url } alt={ image.alt ? image.alt : 'Gallery Image' } />
						</div>
							
					);

				} )
			}
			
		</div>
		
		</>
	);
}
