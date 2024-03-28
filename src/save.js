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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";

// export default function save({ attributes }) {
// 	const { galleryImages, sliderType, showArrows } = attributes;
//     // console.log(showArrows, 't');
// 	const blockProps = useBlockProps.save();
// 	return (
// 		<>
// 			<div {...blockProps}>
// 				{galleryImages &&
// 					galleryImages.map((image) => (
// 						<div key={image.id} className="utk-gallery-single">
// 							<img
// 								src={image.url}
// 								alt={image.alt ? image.alt : "Gallery Image"}
// 							/>
// 						</div>
// 					))}
// 			</div>
// 			<script>
// 				{`
//                     jQuery(document).ready(function($) {
//                         switch ("${sliderType}") {
//                             case 'simple':
//                                 $('.wp-block-create-block-gutenberg-media-carousel').slick({
//                                     arrows:${showArrows}
//                                 });
//                                 break;
//                             case 'carousel':
//                                 $('.wp-block-create-block-gutenberg-media-carousel').slick({
//                                     infinite: true,
//                                     slidesToShow: 3,
//                                     slidesToScroll: 1,
//                                     dots: true,
//                                     arrows:${showArrows}
//                                 });
//                                 break;
//                             case 'fade':
//                                 $('.wp-block-create-block-gutenberg-media-carousel').slick({
//                                     dots: true,
//                                     infinite: true,
//                                     speed: 500,
//                                     fade: true,
//                                     cssEase: 'linear',
//                                     arrows:${showArrows}
//                                 });
//                                 break;
//                             default:
//                                 $('.wp-block-create-block-gutenberg-media-carousel').slick({
//                                     slidesToShow: 1,
//                                     slidesToScroll: 1,
//                                     autoplay: true,
//                                     autoplaySpeed: 2000,
//                                     arrows:${showArrows}
//                                 });
//                                 break;
//                         }
//                     });
//                 `}
// 			</script>
// 		</>
// 	);
// }







export default function save({ attributes }) {
    const { galleryImages, sliderType, showArrows, arrowType } = attributes;
    const blockProps = useBlockProps.save();
    
    // Define getPrevArrow and getNextArrow functions
    function getPrevArrow(arrowType) {
        switch (arrowType) {
            case 'custom1':
                return ;
            case 'custom2':
                return ;
            case 'custom3':
                return ;
            default:
                return ;
        }
    }

    function getNextArrow(arrowType) {
        switch (arrowType) {
            case 'custom1':
                return ;
            case 'custom2':
                return;
            case 'custom3':
                return ;
            default:
                return ;
        }
    }

    return (
        <>
            <div {...blockProps}>
            {/* {arrowType} */}
                {galleryImages &&
                    galleryImages.map((image) => (
                        <div key={image.id} className="utk-gallery-single">
                            <img
                                src={image.url}
                                alt={image.alt ? image.alt : "Gallery Image"}
                            />
                        </div>
                    ))}
            </div>
            {showArrows && <p>Arrow Type: {arrowType}</p>}
            <script>
            
                {`
                    jQuery(document).ready(function($) {
                        var arrowType = "${arrowType}";
                        switch ("${sliderType}") {
                            case 'simple':
                                $('.wp-block-create-block-gutenberg-media-carousel').slick({
                                    arrows: ${showArrows},
                                    
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                    
                                });
                                break;
                            case 'carousel':
                                $('.wp-block-create-block-gutenberg-media-carousel').slick({
                                    infinite: true,
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    dots: true,
                                    arrows: ${showArrows},
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                    
                                });
                                break;
                            case 'fade':
                                $('.wp-block-create-block-gutenberg-media-carousel').slick({
                                    dots: true,
                                    infinite: true,
                                    speed: 500,
                                    fade: true,
                                    cssEase: 'linear',
                                    arrows: ${showArrows},
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                   
                                });
                                break;
                            default:
                                $('.wp-block-create-block-gutenberg-media-carousel').slick({
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    autoplay: true,
                                    autoplaySpeed: 2000,
                                    arrows: ${showArrows},
                                    prevArrow: ${showArrows && arrowType ? getPrevArrow(arrowType) : null},
                                    nextArrow: ${showArrows && arrowType ? getNextArrow(arrowType) : null}
                                  
                                });
                                break;
                        }
                    });
                `}
            </script>
        </>
    );
}
