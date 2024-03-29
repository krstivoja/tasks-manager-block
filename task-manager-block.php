<?php

/**
 * Plugin Name:       Task Manager Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.2.2
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       task-manager-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

include 'inc/register.php';
include 'inc/ajax_update.php';
include 'inc/tasks_shortcode.php';

// Register Block
function TMBC_create_block_task_manager_block_block_init()
{
    register_block_type(
        __DIR__ . '/build',
        array(
            'render_callback' => 'TMBC_tasks_shortcode',
        )
    );
}
add_action('init', 'TMBC_create_block_task_manager_block_block_init');

// **************************************************
// Load scripts
// **************************************************
function TMBC_enqueue_sortable_scripts()
{
    if (current_user_can('administrator') && has_block('tasks-manager/tasks-progress')) {
        wp_enqueue_script('sortablejs', plugin_dir_url(__FILE__) . 'inc/sortable.js', array(), null, true);
        wp_enqueue_script('tasks-sortable', plugin_dir_url(__FILE__) . 'inc/tasks-sortable.js', array('jquery', 'sortablejs'), '1.0.0', true);
        wp_localize_script(
            'tasks-sortable',
            'ajaxObject',
            array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('task-manager-sortable')
            )
        );
    }
}
add_action('wp_enqueue_scripts', 'TMBC_enqueue_sortable_scripts');
