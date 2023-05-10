<?php

function tasks_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'backgroundColor' => '',
            'tasksListBackgroundColor' => '',
            'cardBackgroundColor' => '',
            'align' => '',
			'paddingSize' => '',
			'gapSize' => '',
			'spaddingSize' => '',
			'sgapSize' => '',
        ),
        $atts,
        'tasks_progress'
    );

    
    $align_class = $atts['align'] ? 'align' . $atts['align'] : '';
	$block_gap = $atts['gapSize'] ? $atts['gapSize'] : '';
	$sblock_gap = $atts['sgapSize'] ? $atts['sgapSize'] : '';
	if ($atts['paddingSize']){
		$padding_top = $atts['paddingSize']['top'];
		$padding_right = $atts['paddingSize']['right'];
		$padding_bottom = $atts['paddingSize']['bottom'];
		$padding_left = $atts['paddingSize']['left'];
	} else {
		$padding_top = "";
		$padding_right = "";
		$padding_bottom = "";
		$padding_left = "";
	}
	if ($atts['spaddingSize']){
		$spadding_top = $atts['spaddingSize']['top'];
		$spadding_right = $atts['spaddingSize']['right'];
		$spadding_bottom = $atts['spaddingSize']['bottom'];
		$spadding_left = $atts['spaddingSize']['left'];
	} else {
		$spadding_top = "";
		$spadding_right = "";
		$spadding_bottom = "";
		$spadding_left = "";
	}
	
    ob_start();
    $terms = get_terms(array('taxonomy' => 'progress', 'hide_empty' => false));
	
    ?>

    <div class="tasks-shortcode <?php echo esc_attr($align_class); ?>" style="gap:<?php echo $block_gap?>;padding-top:<?php echo $padding_top?>;padding-right:<?php echo $padding_right?>;padding-bottom:<?php echo $padding_bottom?>;padding-left:<?php echo $padding_left?>;background-color: <?php echo esc_attr($atts['backgroundColor']); ?>;">
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

                <div class="tasks-list" id="<?php echo $term->slug; ?>" data-term-id="<?php echo $term->term_id; ?>" style="gap:<?php echo $sblock_gap?>;padding-top:<?php echo $spadding_top?>;padding-right:<?php echo $spadding_right?>;padding-bottom:<?php echo $spadding_bottom?>;padding-left:<?php echo $spadding_left?>;background-color: <?php echo esc_attr($atts['tasksListBackgroundColor']); ?>">

                    <?php if ($tasks->have_posts()) : ?>
                        <?php while ($tasks->have_posts()) : $tasks->the_post(); ?>
                            <div class="task-item" data-id="<?php echo get_the_ID(); ?>" style="background-color: <?php echo esc_attr($atts['cardBackgroundColor']); ?>">
                                <span class="task-title"><?php echo get_the_title(); ?></span>
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









