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

// Enqueue Slick slider library
function enqueue_slick_slider() {
    wp_enqueue_script(
        'slick-slider',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
        array('jquery'),
        '1.8.1',
        true
    );

    wp_enqueue_style(
        'slick-slider-style',
        'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css',
        array(),
        '1.8.1'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_slick_slider');

// Enqueue the slider.js script
function enqueue_slider_script() {
    wp_enqueue_script(
        'gutenberg-media-carousel-slider-script',
        plugins_url( 'assets/slider.js', __FILE__ ),
        array( 'jquery', 'slick-slider' ), // Make sure 'slick-slider' is enqueued before this script
        '1.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_slider_script' );

?>