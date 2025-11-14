<?php
/**
 * NEVO Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'NEVO_VERSION', '0.1.0' );
define( 'NEVO_DIR', get_template_directory() );
define( 'NEVO_URI', get_template_directory_uri() );

/**
 * Setup motywu
 */
function nevo_theme_setup() {
    load_theme_textdomain( 'nevo', NEVO_DIR . '/languages' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support(
        'html5',
        array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        )
    );
    add_theme_support(
        'custom-logo',
        array(
            'height'      => 60,
            'width'       => 200,
            'flex-height' => true,
            'flex-width'  => true,
        )
    );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
}
add_action( 'after_setup_theme', 'nevo_theme_setup' );

/**
 * Enqueue Google Fonts
 */
function nevo_enqueue_google_fonts() {
    wp_enqueue_style(
        'nevo-google-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Roboto:wght@400;500;700&display=swap',
        array(),
        null
    );
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_google_fonts' );
add_action( 'admin_enqueue_scripts', 'nevo_enqueue_google_fonts' );

/**
 * Register custom blocks
 */
function nevo_register_blocks() {
    $blocks = [ 'hero', 'tiles', 'cta' ];

    foreach ( $blocks as $block ) {
        $block_path = NEVO_DIR . '/build/blocks/' . $block;
        if ( file_exists( $block_path . '/block.json' ) ) {
            register_block_type( $block_path );
        }
    }
}
add_action( 'init', 'nevo_register_blocks' );

/**
 * Register block category
 */
function nevo_block_categories( $categories ) {
    return array_merge(
        [
            [
                'slug'  => 'nevo-blocks',
                'title' => __( 'NEVO Blocks', 'nevo' ),
            ],
        ],
        $categories
    );
}
add_filter( 'block_categories_all', 'nevo_block_categories' );

/**
 * Inline block styles (workaround for HTTP serving issues)
 */
function nevo_inline_hero_css() {
    if ( has_block( 'nevo/hero' ) || is_front_page() ) {
        $css_file = NEVO_DIR . '/build/blocks/hero/style-index.css';
        if ( file_exists( $css_file ) ) {
            echo '<style id="nevo-hero-inline">' . file_get_contents( $css_file ) . '</style>';
        }
    }
}
add_action( 'wp_head', 'nevo_inline_hero_css', 100 );

function nevo_inline_tiles_css() {
    if ( has_block( 'nevo/tiles' ) ) {
        $css_file = NEVO_DIR . '/build/blocks/tiles/style-index.css';
        if ( file_exists( $css_file ) ) {
            echo '<style id="nevo-tiles-inline">' . file_get_contents( $css_file ) . '</style>';
        }
    }
}
add_action( 'wp_head', 'nevo_inline_tiles_css', 100 );

function nevo_inline_cta_css() {
    if ( has_block( 'nevo/cta' ) ) {
        $css_file = NEVO_DIR . '/build/blocks/cta/style-index.css';
        if ( file_exists( $css_file ) ) {
            echo '<style id="nevo-cta-inline">' . file_get_contents( $css_file ) . '</style>';
        }
    }
}
add_action( 'wp_head', 'nevo_inline_cta_css', 100 );

/**
 * Add loading="lazy" to images
 */
function nevo_add_lazy_loading( $attr ) {
    if ( ! isset( $attr['loading'] ) ) {
        $attr['loading'] = 'lazy';
    }
    return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'nevo_add_lazy_loading' );