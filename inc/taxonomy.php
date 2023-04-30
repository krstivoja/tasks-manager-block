<?php

// Register custom taxonomy "progress"
add_action('init', 'register_progress_taxonomy');
function register_progress_taxonomy() {
  $labels = array(
    'name' => __('Progress'),
    'singular_name' => __('Progress'),
    'search_items' => __('Search Progresses'),
    'all_items' => __('All Progresses'),
    'parent_item' => __('Parent Progress'),
    'parent_item_colon' => __('Parent Progress:'),
    'edit_item' => __('Edit Progress'),
    'update_item' => __('Update Progress'),
    'add_new_item' => __('Add New Progress'),
    'new_item_name' => __('New Progress Name'),
    'menu_name' => __('Progress')
  );

  $args = array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'query_var' => true,
    'rewrite' => array('slug' => 'progress'),
    'show_in_rest' => true, // Enable support for the block editor
  );

  register_taxonomy('progress', array('tasks'), $args);
}

?>