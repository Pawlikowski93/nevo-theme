<?php
/**
 * Enqueue scripts and styles
 *
 * @package NEVO
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

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
 * Enqueue theme styles and scripts
 */
function nevo_enqueue_assets() {
    $is_dev = defined('WP_DEBUG') && WP_DEBUG;

    if ($is_dev) {
        // Dev mode - Vite HMR
        wp_enqueue_script(
            'nevo-vite',
            'http://localhost:3000/@vite/client',
            array(),
            null,
            true
        );
        wp_enqueue_script(
            'nevo-main',
            'http://localhost:3000/assets/js/main.js',
            array(),
            null,
            true
        );
    } else {
        // Production - built assets
        wp_enqueue_style(
            'nevo-main',
            NEVO_URI . '/dist/assets/css/main.css',
            array(),
            NEVO_VERSION
        );

        wp_enqueue_script(
            'nevo-main',
            NEVO_URI . '/dist/assets/js/main.js',
            array(),
            NEVO_VERSION,
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_assets' );