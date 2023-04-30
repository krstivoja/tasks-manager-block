<?php

function tasks_manager_block_init() {
    register_block_type('tasks-manager/tasks-progress', array(
        'render_callback' => 'tasks_shortcode',
    ));
}
add_action('init', 'tasks_manager_block_init');



function tasks_shortcode($atts) {
    ob_start();
    $terms = get_terms(array('taxonomy' => 'progress', 'hide_empty' => false));
    ?>

    <div class="tasks-shortcode">
        <?php foreach ($terms as $term) : ?>
            <div class="tasks-group-wrap">
                <h3><?php echo $term->name; ?></h3>

                <?php
                $task_args = array(
                    'post_type' => 'tasks',
                    'posts_per_page' => -1,
                    'orderby' => 'menu_order',
                    'order' => 'ASC',
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'progress',
                            'field' => 'term_id',
                            'terms' => $term->term_id
                        )
                    )
                );

                $tasks = new WP_Query($task_args);
                ?>

                <div class="tasks-list" id="<?php echo $term->slug; ?>" data-term-id="<?php echo $term->term_id; ?>">
                    <?php if ($tasks->have_posts()) : ?>
                        <?php while ($tasks->have_posts()) : $tasks->the_post(); ?>
                            <div class="task-item" data-id="<?php echo get_the_ID(); ?>">
                                <span class="task-title"><?php echo get_the_title(); ?></span>
                                <button class="read-more" data-id="<?php echo get_the_ID(); ?>">Read More</button>
                                <dialog class="task-content" id="task-content-<?php echo get_the_ID(); ?>">
                                    <div class="wrap">
                                        <h1><?php echo get_the_title(); ?></h1>
                                        <?php echo get_the_content(); ?>
                                        <div class="actions">                                            
                                            <?php if (current_user_can('administrator')) : ?>
                                                <a class="edit-task" href="<?php echo get_edit_post_link(get_the_ID()); ?>" target="_blank">Edit</a>
                                            <?php endif; ?>
                                            <button class="close-dialog" data-id="<?php echo get_the_ID(); ?>">Close</button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
            </div>
            <?php wp_reset_postdata(); ?>
        <?php endforeach; ?>
    </div>

    <?php
    return ob_get_clean();
}
// add_shortcode('tasks_progress', 'tasks_shortcode');


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