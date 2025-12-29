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
 * Enqueue Font Awesome CSS (not JS Kit - faster!)
 */
function nevo_enqueue_font_awesome() {
    wp_enqueue_style(
        'fontawesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        array(),
        '6.5.1'
    );
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_font_awesome' );

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

/**
 * Enqueue landing page styles
 */
function nevo_enqueue_landing_styles() {
    if ( is_page_template( 'templates/landing-strony.html' ) || is_page( 'strony-internetowe' ) || is_page( 'landing-strony' ) ) {
        wp_enqueue_style(
            'nevo-landing-strony',
            NEVO_URI . '/assets/css/landing-strony.css',
            array( 'nevo-main' ),
            NEVO_VERSION
        );
    }
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_landing_styles' );

/**
 * Enqueue landing page scripts
 */
function nevo_enqueue_landing_scripts() {
    if ( is_page_template( 'templates/landing-strony.html' ) || is_page( 'strony-internetowe' ) || is_page( 'landing-strony' ) ) {

        wp_enqueue_script(
            'nevo-landing-personalization',
            NEVO_URI . '/assets/js/landing-strony.js',
            array(),
            NEVO_VERSION,
            true
        );

        wp_enqueue_script(
            'nevo-time-calculator',
            NEVO_URI . '/build/blocks/time-calculator/view.js',
            array( 'wp-element' ),
            NEVO_VERSION,
            true
        );

        // Transformation section
        wp_enqueue_style(
            'nevo-transformation',
            NEVO_URI . '/assets/css/transformation-section.css',
            array(),
            NEVO_VERSION
        );

        wp_enqueue_script(
            'nevo-transformation',
            NEVO_URI . '/assets/js/transformation-section.js',
            array(),
            NEVO_VERSION,
            true
        );

        // Lightbox
        wp_enqueue_style(
            'nevo-lightbox',
            NEVO_URI . '/assets/css/lightbox.css',
            array(),
            NEVO_VERSION
        );

        wp_enqueue_script(
            'nevo-lightbox',
            NEVO_URI . '/assets/js/lightbox.js',
            array(),
            NEVO_VERSION,
            true
        );

        wp_localize_script( 'nevo-landing-personalization', 'nevoLanding', array(
            'ajaxUrl' => admin_url( 'admin-ajax.php' ),
            'nonce'   => wp_create_nonce( 'nevo_landing_nonce' ),
            'isDebug' => defined( 'WP_DEBUG' ) && WP_DEBUG,
        ) );

        if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
            wp_add_inline_script( 'nevo-landing-personalization', 'document.body.classList.add("wp-debug");', 'before' );
        }
    }
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_landing_scripts' );

/**
 * Register custom page templates
 */
function nevo_register_templates( $templates ) {
    $templates['templates/landing-strony.html'] = 'Landing - Strony internetowe';
    return $templates;
}
add_filter( 'theme_page_templates', 'nevo_register_templates' );
