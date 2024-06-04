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
	icon:<svg xmlns="http://www.w3.org/2000/svg" width="441.5" height="331.2" viewBox="0 0 441.5 331.2">
  <g id="Media_Carousel_Icon" data-name="Media Carousel Icon" transform="translate(-36.8 -100)">
    <g id="Group_22945" data-name="Group 22945">
      <g id="Group_22944" data-name="Group 22944">
        <g id="Group_22943" data-name="Group 22943">
          <g id="Group_22942" data-name="Group 22942">
            <path id="Path_4238" data-name="Path 4238" d="M388.5,100h-262a17.2,17.2,0,0,0-17.2,17.2V348.3a17.2,17.2,0,0,0,17.2,17.2h262a17.2,17.2,0,0,0,17.2-17.2V117.1A17.114,17.114,0,0,0,388.5,100ZM288.1,240.1l-26.4,15.2-26.4,15.2a8.521,8.521,0,0,1-12.8-7.4v-61a8.553,8.553,0,0,1,12.8-7.4l26.4,15.2,26.4,15.2A8.716,8.716,0,0,1,288.1,240.1Z"/>
          </g>
        </g>
      </g>
    </g>
    <g id="Group_22950" data-name="Group 22950">
      <g id="Group_22949" data-name="Group 22949">
        <g id="Group_22946" data-name="Group 22946" opacity="0.4">
          <path id="Path_4239" data-name="Path 4239" d="M196.4,426.4h0a7.81,7.81,0,0,1-7.8-7.8h0a7.81,7.81,0,0,1,7.8-7.8h0a7.81,7.81,0,0,1,7.8,7.8h0A7.685,7.685,0,0,1,196.4,426.4Z"/>
        </g>
        <g id="Group_22947" data-name="Group 22947">
          <path id="Path_4240" data-name="Path 4240" d="M257.5,431.2h0a12.548,12.548,0,0,1-12.6-12.6h0A12.548,12.548,0,0,1,257.5,406h0a12.548,12.548,0,0,1,12.6,12.6h0A12.676,12.676,0,0,1,257.5,431.2Z"/>
        </g>
        <g id="Group_22948" data-name="Group 22948" opacity="0.4">
          <path id="Path_4241" data-name="Path 4241" d="M318.5,426.4h0a7.81,7.81,0,0,1-7.8-7.8h0a7.81,7.81,0,0,1,7.8-7.8h0a7.81,7.81,0,0,1,7.8,7.8h0A7.81,7.81,0,0,1,318.5,426.4Z"/>
        </g>
      </g>
    </g>
    <path id="Path_4242" data-name="Path 4242" d="M91.7,326.1H51.5a14.724,14.724,0,0,1-14.7-14.7V151a14.724,14.724,0,0,1,14.7-14.7H91.7Z" opacity="0.5"/>
    <path id="Path_4243" data-name="Path 4243" d="M423.4,326.1h40.2a14.724,14.724,0,0,0,14.7-14.7V151a14.724,14.724,0,0,0-14.7-14.7H423.4Z" opacity="0.5"/>
  </g>
</svg>,
	/**	
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
