<?php

// Register custom post type "tasks"
add_action('init', 'register_tasks_post_type');
function register_tasks_post_type() {
  $labels = array(
    'name' => __('Tasks'),
    'singular_name' => __('Task'),
    'add_new' => __('Add New'),
    'add_new_item' => __('Add New Task'),
    'edit_item' => __('Edit Task'),
    'new_item' => __('New Task'),
    'view_item' => __('View Task'),
    'search_items' => __('Search Tasks'),
    'not_found' => __('No tasks found'),
    'not_found_in_trash' => __('No tasks found in Trash'),
    'parent_item_colon' => '',
    'menu_name' => __('Tasks')
  );

  $args = array(
    'labels' => $labels,
    'public' => true,
    'has_archive' => false,
    'menu_icon' => 'dashicons-performance',
    'supports' => array('title', 'editor'),
    'show_ui' => true,
    'capability_type' => 'post',
    'rewrite' => array('slug' => 'tasks'),
    'menu_position' => 5,
    'show_in_rest' => true, // Enable support for the block editor
  );

  register_post_type('tasks', $args);
}

?>