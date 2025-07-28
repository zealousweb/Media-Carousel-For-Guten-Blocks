<?php
/**
 * Plugin Name:       Media Carousel for Guten Blocks
 * Description:       The Media Carousel for Guten Blocks is a customizable content block that enables dynamic uploading and display of images and videos with options for captions, border radius, FancyBox functionality, slider settings, and customizable navigation arrows and dots.
 * Requires at least: 5.9
 * Requires PHP:      7.4
 * Version:           1.0.2
 * Author:            ZealousWeb
 * Author URI:        https://www.zealousweb.com
 * License:           GPLv3 or later
 * License URI:       https://spdx.org/licenses/GPL-3.0-or-later.html
 * Text Domain:       media-carousel-for-guten-blocks
 *
 * @category  ZealBlocks
 * @package   Media-Carousel-for-Guten-Blocks
 * @author    ZealousWeb <support@zealousweb.com>
 * @copyright 2024 ZealousWeb
 * @license   GPLv3 or later
 * @link      https://spdx.org/licenses/GPL-3.0-or-later.html
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
    // Check WordPress version compatibility
    if (version_compare(get_bloginfo('version'), '5.0', '<')) {
        return;
    }
    
    if (!function_exists('register_block_type')) {
        // Block editor is not available.
        return;
    }
    
    // Check if build directory and block.json exist
    $build_path = __DIR__ . '/build';
    $block_json_path = $build_path . '/block.json';
    
    if (!file_exists($block_json_path)) {
        return;
    }
    
    // Check if all required files exist
    $required_files = [
        $build_path . '/index.js',
        $build_path . '/index.css',
        $build_path . '/style-index.css',
        $build_path . '/view.js'
    ];
    
    foreach ($required_files as $file) {
        if (!file_exists($file)) {
            // Required file not found
        }
    }
    
    $result = register_block_type($build_path);
    
    if (is_wp_error($result)) {
        // Failed to register block
    }
}
add_action('init', 'mcfgb_init', 10);




/**
 * Enqueue scripts and styles only when the block is used
 */
function mcfgb_enqueue_block_assets() {
    // Check if the current post contains our block
    global $post;
    if ($post && has_block('media-carousel-for-guten-blocks/media-carousel', $post)) {
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
}
add_action('wp_enqueue_scripts', 'mcfgb_enqueue_block_assets');

/**
 * Enqueue editor assets for the block
 */
function mcfgb_enqueue_editor_assets() {
    // Enqueue slick carousel for editor
    wp_enqueue_style(
        'mcfgb-slick-slider-css',
        plugins_url('/assets/css/slick.css', __FILE__),
        '',
        '1.8.1'
    );

    wp_enqueue_style(
        'mcfgb-slick-theme-css',
        plugins_url('/assets/css/slick-theme.css', __FILE__),
        array('mcfgb-slick-slider-css'),
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
add_action('enqueue_block_editor_assets', 'mcfgb_enqueue_editor_assets');





/**
 * Register block category for ZealBlocks
 */
function mcfgb_register_block_category($categories) {
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

// Register for both old and new WordPress versions
add_action('block_categories_all', 'mcfgb_register_block_category', 5, 1);
add_action('block_categories', 'mcfgb_register_block_category', 5, 2);


