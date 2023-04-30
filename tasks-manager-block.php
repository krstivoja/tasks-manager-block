<?php
/**
 * Plugin Name:       Tasks Manager Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tasks-manager-block
 *
 * @package           create-block
 */

include_once 'inc/cpt.php';
include_once 'inc/taxonomy.php';
include_once 'inc/functions.php';

function enqueue_sortable_scripts() {
    if (current_user_can('administrator')) {
        wp_enqueue_script('sortablejs', 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js', array(), null, true);
        wp_enqueue_script('tasks-sortable', plugin_dir_url(__FILE__) . 'js/tasks-sortable.js', array('jquery', 'sortablejs'), '1.0.0', true);
        wp_localize_script('tasks-sortable', 'ajaxObject', array('ajaxUrl' => admin_url('admin-ajax.php')));
    }
}
add_action('wp_enqueue_scripts', 'enqueue_sortable_scripts');


function create_block_tasks_manager_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_tasks_manager_block_block_init' );
