<?php

// AJAX function for updating tasks order
function update_tasks_order() {
    if (current_user_can('administrator') && isset($_POST['tasks_order'])) {
        $tasks_order = $_POST['tasks_order'];
        foreach ($tasks_order as $order => $task_id) {
            wp_update_post(array('ID' => $task_id, 'menu_order' => $order));
        }
        wp_send_json_success('Tasks order updated.');
    } else {
        wp_send_json_error('Error updating tasks order.');
    }
}
add_action('wp_ajax_update_tasks_order', 'update_tasks_order');



// AJAX function for updating tasks taxonomy term
function update_tasks_taxonomy() {
    if (current_user_can('administrator') && isset($_POST['task_id']) && isset($_POST['term_id'])) {
        $task_id = intval($_POST['task_id']);
        $term_id = intval($_POST['term_id']);

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
add_action('wp_ajax_update_tasks_taxonomy', 'update_tasks_taxonomy');


?>