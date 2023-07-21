<?php

// AJAX function for updating tasks order
function tm_update_tasks_order()
{
    // Check nonce and sanitize input
    $nonce = isset($_POST['nonce']) ? sanitize_text_field($_POST['nonce']) : '';
    $is_nonce_verified = wp_verify_nonce($nonce, 'task-manager-sortable');

    if (!$is_nonce_verified) {
        return wp_send_json_error('Unauthorized');
    }

    if (current_user_can('administrator') && isset($_POST['tasks_order'])) {
        // Validate and sanitize the tasks_order array
        $tasks_order = isset($_POST['tasks_order']) && is_array($_POST['tasks_order']) 
            ? array_map('intval', $_POST['tasks_order']) 
            : [];

        foreach ($tasks_order as $order => $task_id) {
            wp_update_post(array('ID' => $task_id, 'menu_order' => $order));
        }
        wp_send_json_success('Tasks order updated.');
    } else {
        wp_send_json_error('Error updating tasks order.');
    }
}
add_action('wp_ajax_tm_update_tasks_order', 'tm_update_tasks_order');



// AJAX function for updating tasks taxonomy term
function tm_update_tasks_taxonomy()
{
    // Check nonce and sanitize input
    $nonce = isset($_POST['nonce']) ? sanitize_text_field($_POST['nonce']) : '';
    $is_nonce_verified = wp_verify_nonce($nonce, 'task-manager-sortable');

    if (!$is_nonce_verified) {
        return wp_send_json_error('Unauthorized');
    }

    if (current_user_can('administrator') && isset($_POST['task_id']) && isset($_POST['term_id'])) {
        // Validate and sanitize input
        $task_id = isset($_POST['task_id']) ? intval($_POST['task_id']) : 0;
        $term_id = isset($_POST['term_id']) ? intval($_POST['term_id']) : 0;

        $term = get_term($term_id, 'progress');
        if ($term) {
            wp_set_object_terms($task_id, $term->term_id, 'progress');
            wp_send_json_success('Task taxonomy term updated. Task ID: ' . $task_id . ' | Term ID: ' . $term_id);
        } else {
            wp_send_json_error('Error updating task taxonomy term. Task ID: ' . $task_id . ' | Term ID: ' . $term_id);
        }
    } else {
        wp_send_json_error('Error updating task taxonomy term. Insufficient data or permissions.');
    }
}
add_action('wp_ajax_tm_update_tasks_taxonomy', 'tm_update_tasks_taxonomy');
