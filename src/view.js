/**
 * Frontend JavaScript for Media Carousel Block
 * This script initializes the carousel functionality on the frontend
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all media carousel blocks
        const carouselBlocks = document.querySelectorAll('.wp-block-media-carousel-for-guten-blocks-media-carousel');
        
        carouselBlocks.forEach(function(block) {
            initializeCarousel(block);
        });
    });

    function initializeCarousel(block) {
        // Check if jQuery and Slick are available
        if (typeof jQuery === 'undefined' || typeof jQuery.fn.slick === 'undefined') {
            console.warn('Media Carousel: jQuery or Slick carousel not loaded');
            return;
        }

        const $ = jQuery;
        const sliderId = block.querySelector('[id^="slider-"]')?.id;
        
        if (!sliderId) {
            console.warn('Media Carousel: No slider ID found');
            return;
        }

        // Initialize the carousel
        try {
            // The carousel initialization is handled by the inline script in save.js
            // This view.js file is mainly for additional frontend functionality if needed
            
            // Add any additional frontend functionality here
            console.log('Media Carousel initialized for:', sliderId);
        } catch (error) {
            console.error('Media Carousel initialization error:', error);
        }
    }

    // Handle dynamic content loading (for AJAX-loaded content)
    if (typeof jQuery !== 'undefined') {
        jQuery(document).on('DOMNodeInserted', function(e) {
            const target = e.target;
            if (target.nodeType === 1) { // Element node
                const carouselBlocks = target.querySelectorAll ? 
                    target.querySelectorAll('.wp-block-media-carousel-for-guten-blocks-media-carousel') : 
                    (target.classList && target.classList.contains('wp-block-media-carousel-for-guten-blocks-media-carousel') ? [target] : []);
                
                carouselBlocks.forEach(function(block) {
                    initializeCarousel(block);
                });
            }
        });
    }
})();
