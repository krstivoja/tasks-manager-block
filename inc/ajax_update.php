<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
// AJAX function for updating tasks order
function TMBC_update_tasks_order()
{

    $nonce = isset($_POST['nonce']) ? sanitize_text_field($_POST['nonce']) : '';
    $is_nonce_verified = wp_verify_nonce($nonce, 'task-manager-sortable');

    if (!$is_nonce_verified) {
        return wp_send_json_error('Unauthorized');
    }

    if (current_user_can('administrator') && isset($_POST['tasks_order'])) {
        $tasks_order = sanitize_text_field($_POST['tasks_order']);
        foreach ($tasks_order as $order => $task_id) {
            wp_update_post(array('ID' => $task_id, 'menu_order' => $order));
        }
        wp_send_json_success('Tasks order updated.');
    } else {
        wp_send_json_error('Error updating tasks order.');
    }
}
add_action('wp_ajax_update_tasks_order', 'TMBC_update_tasks_order');



// AJAX function for updating tasks taxonomy term
function TMBC_update_tasks_taxonomy()
{
    $nonce = isset($_POST['nonce']) ? sanitize_text_field($_POST['nonce']) : '';
    $is_nonce_verified = wp_verify_nonce($nonce, 'task-manager-sortable');

    if (!$is_nonce_verified) {
        return wp_send_json_error('Unauthorized');
    }

    if (current_user_can('administrator') && isset($_POST['task_id']) && isset($_POST['term_id'])) {
        $task_id = intval(sanitize_text_field($_POST['task_id']));
        $term_id = intval(sanitize_text_field($_POST['term_id']));

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
add_action('wp_ajax_update_tasks_taxonomy', 'TMBC_update_tasks_taxonomy');
