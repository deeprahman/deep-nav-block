<?php
// Hook into the REST API initialization
add_action('rest_api_init', function () {
    // Register the endpoint
    register_rest_route('dnb/v1', '/navigation/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'dnb_navigation_endpoint',
        'permission_callback' => '__return_true', // Allow access to anyone; adjust if needed
    ]);
});

/**
 * Callback function for the REST API endpoint.
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response JSON response with post content or an error.
 */
function dnb_navigation_endpoint(WP_REST_Request $request) {
    // Get the ID from the request
    $post_id = $request->get_param('id');

    // Get the post with the given ID
    $post = get_post($post_id);

    // If the post does not exist, return an error
    if (!$post) {
        return new WP_REST_Response([
            'success' => false,
            'message' => 'Post not found',
        ], 404);
    }

    // Return the post data
    return new WP_REST_Response([
        'success' => true,
        'data' => [
            'id'      => $post->ID,
            'title'   => $post->post_title,
            'content' => $post->post_content,
        ],
    ], 200);
}
