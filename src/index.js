/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon:<svg fill="#000000" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.5 9c-.492-.004-.916.242-1.092.47l-2.737 3.457c-.17.208-.55.073-.727-.03l-2.455-1.547c-.29-.19-.62-.35-.988-.35-.38 0-.786.114-1.072.434l-3.293 3.724c-.445.498.3 1.166.746.668l3.294-3.724c.218-.234.535-.05.765.084l2.46 1.552.012.006c.306.19.65.252.988.256.34.004.71-.027.985-.36l2.767-3.5c.217-.263.534-.14.744.04l2.254 1.688c.527.477 1.205-.375.62-.78l-2.252-1.69C20.252 9.188 19.913 9 19.5 9zm-12 8h15c.277 0 .5.223.5.5s-.223.5-.5.5h-15c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zM11 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 1c.558 0 1 .442 1 1s-.442 1-1 1-1-.442-1-1 .442-1 1-1zm14 19.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-19 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm9-1.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 1c.563 0 1 .437 1 1s-.437 1-1 1-1-.437-1-1 .437-1 1-1zM26.5 3c-.665 0-.648 1 0 1h2c.286 0 .5.214.5.5v14c0 .286-.214.5-.5.5h-2c-.654 0-.66 1 0 1h2c.822 0 1.5-.678 1.5-1.5v-14c0-.822-.678-1.5-1.5-1.5zm-25 0C.678 3 0 3.678 0 4.5v14c0 .822.678 1.5 1.5 1.5h2c.66 0 .665-1 0-1h-2c-.286 0-.5-.214-.5-.5v-14c0-.286.214-.5.5-.5h2c.66 0 .66-1 0-1zm5-1C5.678 2 5 2.678 5 3.5v16c0 .822.678 1.5 1.5 1.5h17c.822 0 1.5-.678 1.5-1.5v-16c0-.822-.678-1.5-1.5-1.5zm0 1h17c.286 0 .5.214.5.5v16c0 .286-.214.5-.5.5h-17c-.286 0-.5-.214-.5-.5v-16c0-.286.214-.5.5-.5z"></path></g></svg>,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
