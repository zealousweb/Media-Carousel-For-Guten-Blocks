// Initialize the slider based on the selected type
jQuery(document).ready(function($) {
    // Get the slider type from data attribute
    var sliderType = $('.utk-gallery-container').data('slider-type');

    // Initialize the slider based on the selected type
    switch (sliderType) {
        case 'simple':
            // Initialize simple slider
            $('.utk-gallery-container').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            });
            break;
        case 'carousel':
            // Initialize carousel slider
            $('.utk-gallery-container').slick({
                // Add options for carousel slider
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            });
            break;
        case 'fade':
            // Initialize fade slider
            $('.utk-gallery-container').slick({
                // Add options for fade slider
                fade: true,
                autoplay: true,
                autoplaySpeed: 2000,
            });
            break;
        default:
            // Default slider initialization
            $('.utk-gallery-container').slick({
                // Add default options
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            });
            break;
    }
});
