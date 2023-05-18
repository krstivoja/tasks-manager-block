<?php

/**
 * Processes a block attributes, and also ignores the attribute when the value is empty.
 * 
 * @param string $attribute - Attribute to apply.
 * @param string $value - Value to process.
 * 
 * @return string Processed attribute.
 */
function tm_process_attributes($attribute, $value)
{

    if ('' === $value || empty($value)) {
        return '';
    }

    return sprintf('%1$s="%2$s"', $attribute, $value);
}

function tasks_shortcode($_, $block_content)
{
    $blockprops = json_decode($block_content, true);

    // Exiting if block props doesn't exists.
    if (is_null($blockprops)) {
        return '';
    }

    $wrapper_attributes = get_block_wrapper_attributes(
        array(
            'class' => 'tasks-shortcode',
            'style' => $blockprops['wrapperStyles'],
            'id'    => isset($blockprops['blockProps']['id']) ? $blockprops['blockProps']['id'] : ''
        )
    );

    ob_start();

    $terms = get_terms(
        array(
            'taxonomy' => 'progress',
            'hide_empty' => false
        )
    );

?>

    <div <?php echo $wrapper_attributes; ?>>
        <?php foreach ($terms as $term) : ?>
            <div class="tasks-group-wrap">
                <h3 <?php echo tm_process_attributes('style', $blockprops['listTypographyStyles']); ?>><?php echo $term->name; ?></h3>

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

                <div class="tasks-list" id="<?php echo $term->slug; ?>" data-term-id="<?php echo $term->term_id; ?>" <?php echo tm_process_attributes('style', $blockprops['listStyles']); ?>>

                    <?php if ($tasks->have_posts()) : ?>
                        <?php while ($tasks->have_posts()) : $tasks->the_post(); ?>
                            <div class="task-item" data-id="<?php echo get_the_ID(); ?>" <?php echo tm_process_attributes('style', $blockprops['cardStyles']); ?>>
                                <span class="task-title" <?php echo tm_process_attributes('style', $blockprops['cardTypographyStyles']); ?>><?php echo get_the_title(); ?></span>
                                <button class="read-more wp-element-button" data-id="<?php echo get_the_ID(); ?>">Read More</button>
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
add_shortcode('tasks_progress', 'tasks_shortcode');
