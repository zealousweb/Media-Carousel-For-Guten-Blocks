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
 * Render callback for the block
 */
function mcfgb_render_callback($attributes, $content) {
    // Return the content as-is for widget areas
    return $content;
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
    // Increase memory limit for this operation
    $current_memory_limit = ini_get('memory_limit');
    if (intval($current_memory_limit) < 512) {
        @ini_set('memory_limit', '512M');
    }
    
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
    
    // Read and validate block.json content
    $block_json_content = file_get_contents($block_json_path);
    if ($block_json_content === false) {
        error_log('Media Carousel Block: Could not read block.json file');
        return;
    }
    
    $block_json_data = json_decode($block_json_content, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log('Media Carousel Block: Invalid JSON in block.json: ' . json_last_error_msg());
        return;
    }
    
    if (!isset($block_json_data['name'])) {
        error_log('Media Carousel Block: Missing block name in block.json');
        return;
    }
    
    error_log('Media Carousel Block: Block name from block.json: ' . $block_json_data['name']);
    
    try {
        $result = register_block_type($build_path, array(
            'render_callback' => 'mcfgb_render_callback',
        ));
    } catch (Exception $e) {
        error_log('Media Carousel Block: Exception during block registration: ' . $e->getMessage());
        return;
    }
    
    if (is_wp_error($result)) {
        // Failed to register block
        error_log('Media Carousel Block registration failed: ' . $result->get_error_message());
    } else {
        // Block registered successfully
        error_log('Media Carousel Block registered successfully');
        
        // Clear any potential memory issues
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }
        
        // Additional debugging: check if block is available
        $block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();
        $block_name = 'media-carousel-for-guten-blocks/media-carousel';
        if (isset($block_types[$block_name])) {
            error_log('Media Carousel Block: Block confirmed as registered in registry');
            error_log('Media Carousel Block: Block title: ' . $block_types[$block_name]->title);
            error_log('Media Carousel Block: Block category: ' . $block_types[$block_name]->category);
        } else {
            error_log('Media Carousel Block: Block not found in registry after registration');
            error_log('Media Carousel Block: Available blocks: ' . implode(', ', array_keys($block_types)));
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
 * Ensure block is available in widget areas
 */
function mcfgb_widget_init() {
    // Make sure the block is registered for widget areas
    if (function_exists('register_block_type')) {
        $build_path = __DIR__ . '/build';
        if (file_exists($build_path . '/block.json')) {
            register_block_type($build_path, array(
                'render_callback' => 'mcfgb_render_callback',
            ));
        }
    }
}
add_action('widgets_init', 'mcfgb_widget_init');




/**
 * Enqueue scripts and styles only when the block is used
 */
function mcfgb_enqueue_block_assets() {
    // Check if the current post contains our block
    global $post;
    
    // Add memory management
    if (function_exists('wp_raise_memory_limit')) {
        wp_raise_memory_limit('admin');
    }
    
    $should_enqueue = false;
    
    // Check if block is used in post content
    if ($post && is_object($post) && isset($post->post_content) && !empty($post->post_content)) {
        try {
            if (has_block('media-carousel-for-guten-blocks/media-carousel', $post)) {
                $should_enqueue = true;
            }
        } catch (Exception $e) {
            error_log('Media Carousel Block: Exception during has_block check: ' . $e->getMessage());
        }
    }
    
    // Check if block is used in widget areas
    if (!$should_enqueue) {
        $widget_blocks = wp_get_sidebars_widgets();
        if (!empty($widget_blocks)) {
            foreach ($widget_blocks as $sidebar => $widgets) {
                if (is_array($widgets)) {
                    foreach ($widgets as $widget_id) {
                        if (strpos($widget_id, 'block-') === 0) {
                            $widget_content = get_option('widget_block');
                            if (is_array($widget_content)) {
                                foreach ($widget_content as $widget_instance) {
                                    if (isset($widget_instance['content']) && 
                                        strpos($widget_instance['content'], 'media-carousel-for-guten-blocks/media-carousel') !== false) {
                                        $should_enqueue = true;
                                        break 3;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    if ($should_enqueue) {
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
add_action('init', 'mcfgb_debug_block_registration', 20);


