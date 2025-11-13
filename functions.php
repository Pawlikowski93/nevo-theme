<?php
/**
 * NEVO Theme Functions
 *
 * @package NEVO
 * @since 0.1.0
 */

// Zapobiegaj bezpośredniemu dostępowi
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Wersja motywu
define( 'NEVO_VERSION', '0.1.0' );
define( 'NEVO_DIR', get_template_directory() );
define( 'NEVO_URI', get_template_directory_uri() );

/**
 * Setup motywu
 */
function nevo_theme_setup() {
    // Wsparcie dla tłumaczeń
    load_theme_textdomain( 'nevo', NEVO_DIR . '/languages' );

    // Wsparcie dla RSS
    add_theme_support( 'automatic-feed-links' );

    // Title tag
    add_theme_support( 'title-tag' );

    // Featured images
    add_theme_support( 'post-thumbnails' );

    // HTML5
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

    // Custom logo
    add_theme_support(
        'custom-logo',
        array(
            'height'      => 60,
            'width'       => 200,
            'flex-height' => true,
            'flex-width'  => true,
        )
    );

    // Editor styles
    add_theme_support( 'editor-styles' );

    // Responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Block styles
    add_theme_support( 'wp-block-styles' );

    // Wide alignments
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
