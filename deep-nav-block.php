<?php
/**
 * Plugin Name:       Deep Nav Block
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       deep-nav-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

include_once plugin_dir_path( __FILE__ ) . 'includes/class-dnb-deep-nav-block.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_deep_nav_block_block_init() {
	register_block_type( __DIR__ . '/build/deep-nav-block' );
}
add_action( 'init', 'create_block_deep_nav_block_block_init' );

$GLOBALS['dnb_deep_nav_block'] = new DNB_Deep_Nav_Block();