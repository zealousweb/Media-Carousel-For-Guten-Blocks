/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
// const Save = ({ attributes }) => {
// 	return (
// 	  <div>
// 		{attributes.images.map((imageUrl, index) => (
// 		  <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
// 		))}
// 	  </div>
// 	);
//   };
//   export default Save;

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Save = ({ attributes }) => {
	return (
		<div>
			<div>
				<Carousel>
					{attributes.images.map((imageUrl, index) => (
						<div key={index}>
							<img src={imageUrl} alt={`Image ${index + 1}`} />
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};
export default Save;
