<?php
// blocks/functions.php

/**
 * Inserts an attachment into the database with an associated YouTube link.
 *
 * @param array $args Array of arguments for inserting the attachment.
 *                    See https://developer.wordpress.org/reference/functions/wp_insert_attachment/
 * @return int|WP_Error Attachment ID on success, WP_Error object otherwise.
 */
function wp_insert_attachment_with_youtube_link( $args ) {
    // Process the arguments
    $defaults = array(
        'file'           => '',
        'post_parent'    => 0,
        'post_title'     => '',
        'post_content'   => '',
        'post_status'    => 'inherit',
        'post_mime_type' => '',
        'guid'           => '',
        'youtube_link'   => '', // Additional argument for YouTube link
    );
    $args = wp_parse_args( $args, $defaults );

    // Additional processing for YouTube link
    $youtube_link = ! empty( $args['youtube_link'] ) ? esc_url_raw( $args['youtube_link'] ) : '';

    // Insert the attachment
    $attachment_id = wp_insert_attachment( $args );

    if ( ! is_wp_error( $attachment_id ) ) {
        // Update meta for the attachment with the YouTube link
        update_post_meta( $attachment_id, 'youtube_link', $youtube_link );
    }

    return $attachment_id;
}
