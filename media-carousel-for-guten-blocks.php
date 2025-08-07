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

// Plugin activation hook for debugging
register_activation_hook(__FILE__, 'mcfgb_activate');
function mcfgb_activate() {
    error_log('Media Carousel Block: Plugin activated');
    error_log('Media Carousel Block: WordPress version: ' . get_bloginfo('version'));
    error_log('Media Carousel Block: PHP version: ' . PHP_VERSION);
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
    if (version_compare(get_bloginfo('version'), '5.9', '<')) {
        error_log('Media Carousel Block: WordPress version too old');
        return;
    }
    
    if (!function_exists('register_block_type')) {
        // Block editor is not available.
        error_log('Media Carousel Block: register_block_type function not available');
        return;
    }
    
    // Check if build directory and block.json exist
    $build_path = __DIR__ . '/build';
    $block_json_path = $build_path . '/block.json';
    
    if (!file_exists($block_json_path)) {
        error_log('Media Carousel Block: block.json not found at ' . $block_json_path);
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
            // Required file not found, return early
            error_log('Media Carousel Block: Required file not found: ' . $file);
            return;
        }
    }
    
    // Log the block registration attempt
    error_log('Media Carousel Block: Attempting to register block from: ' . $build_path);
    
    $result = register_block_type($build_path);
    
    if (is_wp_error($result)) {
        // Failed to register block
        error_log('Media Carousel Block registration failed: ' . $result->get_error_message());
    } else {
        // Block registered successfully
        error_log('Media Carousel Block registered successfully');
        
        // Additional debugging: check if block is available
        $block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();
        $block_name = 'media-carousel-for-guten-blocks/media-carousel';
        if (isset($block_types[$block_name])) {
            error_log('Media Carousel Block: Block confirmed as registered in registry');
        } else {
            error_log('Media Carousel Block: Block not found in registry after registration');
        }
    }
}
/**
 * Register block category for ZealBlocks
 */
function mcfgb_register_block_category($categories) {
    if (array_search('zealblocks', array_column($categories, 'slug'), true) === false) {
        error_log('Media Carousel Block: Registering ZealBlocks category');
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
// Deprecated hook for older WordPress versions
add_action('block_categories', 'mcfgb_register_block_category', 5, 2);

add_action('init', 'mcfgb_init', 5);




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
    // Only enqueue if we're in the block editor
    if (!function_exists('get_current_screen')) {
        return;
    }
    
    $screen = get_current_screen();
    if (!$screen || !in_array($screen->base, ['post', 'post-new'])) {
        return;
    }
    
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
 * Debug function to check block registration
 * You can call this function manually to debug block registration issues
 */
function mcfgb_debug_block_registration() {
    if (!function_exists('WP_Block_Type_Registry')) {
        error_log('Media Carousel Block: WP_Block_Type_Registry not available');
        return;
    }
    
    $block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();
    $block_name = 'media-carousel-for-guten-blocks/media-carousel';
    
    if (isset($block_types[$block_name])) {
        error_log('Media Carousel Block: Block is registered successfully');
        error_log('Media Carousel Block: Block title: ' . $block_types[$block_name]->title);
        error_log('Media Carousel Block: Block category: ' . $block_types[$block_name]->category);
    } else {
        error_log('Media Carousel Block: Block is NOT registered');
        error_log('Media Carousel Block: Available blocks: ' . implode(', ', array_keys($block_types)));
    }
}

// Uncomment the line below to debug block registration
// add_action('init', 'mcfgb_debug_block_registration', 20);


