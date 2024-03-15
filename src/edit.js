/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

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
 * @return {Element} Element to render.
 */

// import { useState } from "@wordpress/element";
// import { Button } from "@wordpress/components";
// import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

// const MultipleImageUploader = ({ attributes, setAttributes }) => {
// 	const [selectedImages, setSelectedImages] = useState([]);

// 	const onImagesSelect = (newImages) => {
// 		const images = [
// 			...attributes.images,
// 			...newImages.map((image) => image.url),
// 		];
// 		setAttributes({ images });
// 		setSelectedImages([]);
// 	};

// 	const removeImage = (index) => {
// 		const images = [...attributes.images];
// 		images.splice(index, 1);
// 		setAttributes({ images });
// 	};

// 	const replaceImage = (index, newImage) => {
// 		const images = [...attributes.images];
// 		images[index] = newImage.url;
// 		setAttributes({ images });
// 	};

// 	return (
// 		<div>
// 			<MediaUploadCheck>
// 				<MediaUpload
// 					onSelect={onImagesSelect}
// 					multiple={true}
// 					gallery={true}
// 					value={selectedImages}
// 					render={({ open }) => (
// 						<Button onClick={open} isPrimary>
// 							{__("Add Images")}
// 						</Button>
// 					)}
// 				/>
// 			</MediaUploadCheck>
// 			{attributes.images.map((imageUrl, index) => (
// 				<div key={index}>
// 					<img src={imageUrl} alt={`Image ${index + 1}`} />
// 					<Button onClick={() => removeImage(index)}>{__("Remove")}</Button>
// 					<MediaUploadCheck>
// 						<MediaUpload
// 							onSelect={(newImage) => replaceImage(index, newImage)}
// 							multiple={false}
// 							gallery={false}
// 							value={0}
// 							render={({ open }) => (
// 								<Button onClick={open}>{__("Replace")}</Button>
// 							)}
// 						/>
// 					</MediaUploadCheck>
// 				</div>
// 			))}
// 		</div>
// 	);
// };

// export default MultipleImageUploader;




import { useState } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MultipleImageUploader = ({ attributes, setAttributes }) => {
	const [selectedImages, setSelectedImages] = useState([]);

	const onImagesSelect = (newImages) => {
		const images = [
			...attributes.images,
			...newImages.map((image) => image.url),
		];
		setAttributes({ images });
		setSelectedImages([]);
	};

	const removeImage = (index) => {
		const images = [...attributes.images];
		images.splice(index, 1);
		setAttributes({ images });
	};

	const replaceImage = (index, newImage) => {
		const images = [...attributes.images];
		images[index] = newImage.url;
		setAttributes({ images });
	};

	return (
		<div>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onImagesSelect}
					multiple={true}
					gallery={true}
					value={selectedImages}
					render={({ open }) => (
						<Button onClick={open} isPrimary>
							{__("Add Images")}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			<Carousel>
				{attributes.images.map((imageUrl, index) => (
					<div key={index}>
						<img src={imageUrl} alt={`Image ${index + 1}`} />
						<Button onClick={() => removeImage(index)}>{__("Remove")}</Button>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(newImage) => replaceImage(index, newImage)}
								multiple={false}
								gallery={false}
								value={0}
								render={({ open }) => (
									<Button onClick={open}>{__("Replace")}</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default MultipleImageUploader;