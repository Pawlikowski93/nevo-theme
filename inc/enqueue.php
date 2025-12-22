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
 * Enqueue Font Awesome Kit
 */
function nevo_enqueue_font_awesome() {
    wp_enqueue_script(
        'font-awesome-kit',
        'https://kit.fontawesome.com/8910124cbf.js',
        array(),
        null,
        false // Load in head
    );
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_font_awesome' );

/**
 * Add crossorigin attribute to Font Awesome script
 */
function nevo_font_awesome_crossorigin( $tag, $handle ) {
    if ( 'font-awesome-kit' === $handle ) {
        return str_replace( ' src', ' crossorigin="anonymous" src', $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'nevo_font_awesome_crossorigin', 10, 2 );

/**
 * Enqueue theme styles and scripts
 */
function nevo_enqueue_assets() {
    $is_dev = defined( 'WP_DEBUG' ) && WP_DEBUG;

    if ( $is_dev ) {
        // Dev – Vite HMR (JS importuje main.scss)
        wp_enqueue_script(
            'nevo-vite-client',
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
        // Produkcja – build z Vite (dist)
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

/**
 * Defer dla wybranych skryptów
 */
function nevo_defer_scripts( $tag, $handle ) {
    if ( is_admin() ) {
        return $tag;
    }

    $defer_handles = array( 'nevo-main' );

    if ( in_array( $handle, $defer_handles, true ) ) {
        return str_replace( ' src', ' defer src', $tag );
    }

    return $tag;
}
add_filter( 'script_loader_tag', 'nevo_defer_scripts', 10, 2 );
