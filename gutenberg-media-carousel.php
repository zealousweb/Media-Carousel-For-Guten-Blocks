<?php
/**
 * Plugin Name:       Media Carousel for Guten blocks
 * Description:       Media Carousel.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            <a href="https://www.zealousweb.com/">ZealousWeb</a>
 * License:           GPL-3.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       media-carousel-for-guten-blocks
 *
 *
 * @package   Media-Carousel-for-Guten-Blocks
 * @author    ZealousWeb <support@zealousweb.com>
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function mcfgb_init()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'mcfgb_init');



function enqueue_slick_slider()
{
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
function enqueue_fancybox()
{
    // Enqueue Fancybox JavaScript
    wp_enqueue_script('fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js', array('jquery'), '5.0', true);

    // Enqueue Fancybox CSS
    wp_enqueue_style('fancybox-css', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css', array(), '5.0');
}

add_action('wp_enqueue_scripts', 'enqueue_fancybox');

