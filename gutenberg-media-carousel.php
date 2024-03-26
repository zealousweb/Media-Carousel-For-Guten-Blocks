<?php
/**
 * Plugin Name:       Gutenberg Media Carousel
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-media-carousel
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gutenberg_media_carousel_gutenberg_media_carousel_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'gutenberg_media_carousel_gutenberg_media_carousel_block_init' );



function enqueue_slick_slider() {
    wp_enqueue_style(
        'slick-slider-css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css',
        array(),
        '1.8.1'
    );

    wp_enqueue_style(
        'slick-slider-theme-css',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css',
        array('slick-slider-css'),
        '1.8.1'
    );

    wp_enqueue_script(
        'slick-slider-js',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
        array('jquery'),
        '1.8.1',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_slick_slider');
?>