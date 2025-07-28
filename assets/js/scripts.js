var $ = jQuery.noConflict();

$(window).on('load', ($) => {

    // Function to generate video thumbnails from actual video frames
    function generateVideoThumbnails() {
        $('.video-thumbnail-wrapper').each(function() {
            const $wrapper = $(this);
            const $video = $wrapper.find('video');
            
            if ($video.length && !$wrapper.find('.video-thumbnail').length) {
                const video = $video[0];
                
                // Create thumbnail container
                const $thumbnailContainer = $('<div class="video-thumbnail" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>');
                
                // Create loading state
                const $loadingState = $('<div style="width: 100%; height: 100%; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; border: 2px dashed #dee2e6;"><div style="text-align: center;"><svg width="32" height="32" viewBox="0 0 24 24" fill="#6c757d" style="margin-bottom: 8px;"><path d="M8 5v14l11-7z"/></svg><div style="font-size: 12px; color: #6c757d;">Generating thumbnail...</div></div></div>');
                
                $thumbnailContainer.append($loadingState);
                $wrapper.append($thumbnailContainer);
                
                // Set up video event listeners
                video.addEventListener('loadedmetadata', function() {
                    // Seek to first frame (0.1 seconds to ensure we get a frame)
                    video.currentTime = 0.1;
                });
                
                video.addEventListener('seeked', function() {
                    try {
                        // Create canvas to capture the current frame
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // Set canvas dimensions to match video
                        canvas.width = video.videoWidth || 640;
                        canvas.height = video.videoHeight || 360;
                        
                        // Draw the current frame
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        
                        // Convert to data URL for thumbnail
                        const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
                        
                        // Create and display thumbnail
                        const $thumbnail = $('<img src="' + thumbnailUrl + '" alt="Video Thumbnail" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" />');
                        
                        $thumbnailContainer.empty().append($thumbnail);
                        
                        // Add click handler for video playback
                        $thumbnail.on('click', function() {
                            // Check if FancyBox is enabled for this gallery
                            const $fancyboxLink = $wrapper.closest('.mcfgb-gallery-single').find('a[data-fancybox]');
                            if ($fancyboxLink.length) {
                                // If FancyBox is enabled, let FancyBox handle it
                                return;
                            } else {
                                // Create custom video modal
                                const $modal = $('<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; display: flex; align-items: center; justify-content: center;"><video controls autoplay style="max-width: 90%; max-height: 90%; width: auto; height: auto;"><source src="' + video.querySelector('source').src + '" type="' + video.querySelector('source').type + '" /></video><button style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 30px; cursor: pointer; z-index: 10000;">×</button></div>');
                                
                                $modal.find('button').on('click', function() {
                                    $modal.remove();
                                });
                                
                                $modal.on('click', function(e) {
                                    if (e.target === this) {
                                        $modal.remove();
                                    }
                                });
                                
                                $('body').append($modal);
                            }
                        });
                        
                    } catch (error) {
                        // Show fallback
                        $thumbnailContainer.empty().append('<div style="width: 100%; height: 100%; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; border: 2px dashed #dee2e6;"><svg width="48" height="48" viewBox="0 0 24 24" fill="#6c757d"><path d="M8 5v14l11-7z"/></svg></div>');
                    }
                });
                
                // Handle video load errors
                video.addEventListener('error', function() {
                    $thumbnailContainer.empty().append('<div style="width: 100%; height: 100%; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; border: 2px dashed #dee2e6;"><svg width="48" height="48" viewBox="0 0 24 24" fill="#6c757d"><path d="M8 5v14l11-7z"/></svg></div>');
                });
            }
        });
    }
    
    // Generate thumbnails after page load
    setTimeout(generateVideoThumbnails, 100);
    

});