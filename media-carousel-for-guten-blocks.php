<?php
/**
 * Plugin Name:       Media Carousel for Guten Blocks
 * Description:       The Media Carousel for Guten Blocks is a customizable content block that enables dynamic uploading and display of images and videos with options for captions, border radius, FancyBox functionality, slider settings, and customizable navigation arrows and dots.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           1.0.1
 * Author:            <a href="https://www.zealousweb.com/">ZealousWeb</a>
 * License:           GPLv3 or later License
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       media-carousel-for-guten-blocks
 *
 * @category  ZealBlocks
 * @package   Media-Carousel-for-Guten-Blocks
 * @author    ZealousWeb <support@zealousweb.com>
 * @copyright 2024 ZealousWeb
 * @license   GPLv3 or later License
 * @link      http://www.gnu.org/licenses/gpl-3.0.html
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
    if ( ! function_exists( 'register_block_type' ) ) {
        // Block editor is not available.
        return;
    }
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'mcfgb_init');


/**
 * Category Creation function
 *
 * @param array $categories - list of category.
 *
 * @return mixed Return description.
 */    
function mcfgb_MediaCarousel_Plugin_Block_Categories( $categories )
{
    if (array_search('zealblocks', array_column($categories, 'slug'), true) === false) {
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => 'zealblocks',
                    'title' => __('ZealBlocks', 'media-carousel-for-guten-blocks'),
                    'icon' => '',
                ),
            )
        );
    }
    return $categories;
}
add_action('block_categories_all', 'mcfgb_MediaCarousel_Plugin_Block_Categories', 10, 2);


function mcfgb_enqueue_slick_slider()
{
    wp_enqueue_style(     
        'mcfgb-slick-slider-css',
        plugins_url('/assets/css/slick.css', __FILE__),
        '',
        '1.8.1'
    );

    wp_enqueue_script(
        'mcfgb-slick-slider-js',
        plugins_url('/assets/js/slick.min.js', __FILE__),
        array('jquery'),
        '1.8.1',
        true
    );  
}
add_action('wp_enqueue_scripts', 'mcfgb_enqueue_slick_slider');
function mcfgb_enqueue_fancybox()
{

    wp_enqueue_script(
        'mcfgb-fancybox-library-js',
        plugins_url('/assets/js/fancybox.umd.js', __FILE__),
        array('jquery'),
        '5.0.24',
        false
    );

    wp_enqueue_style(
        'mcfgb-fancybox-liblibrary-css',
        plugins_url('/assets/css/fancybox.css', __FILE__),
        '',
        '5.0.24',
        ''
    );
}

add_action('wp_enqueue_scripts', 'mcfgb_enqueue_fancybox');

