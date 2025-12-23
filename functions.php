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

// Ładujemy enqueue (CSS/JS, fonty itd.)
require_once NEVO_DIR . '/inc/enqueue.php';

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
 * Enqueue Google Fonts (tylko tutaj, NIE w inc/enqueue.php)
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
 * Rejestracja custom bloków (Hero, Tiles, CTA)
 */
function nevo_register_blocks() {
    $blocks = array( 'hero', 'tiles', 'cta' );

    foreach ( $blocks as $block ) {
        $block_path = NEVO_DIR . '/build/blocks/' . $block;

        if ( file_exists( $block_path . '/block.json' ) ) {
            register_block_type( $block_path );
        }
    }
}
add_action( 'init', 'nevo_register_blocks' );

/**
 * Kategoria bloków NEVO
 */
function nevo_block_categories( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'nevo-blocks',
                'title' => __( 'NEVO Blocks', 'nevo' ),
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories_all', 'nevo_block_categories' );

/**
 * Globalne style dla bloków (front)
 * – na razie ładujemy zawsze, bez kombinowania z has_block()
 */
function nevo_enqueue_block_styles() {

    // Debug – możesz na chwilę zostawić, żeby zobaczyć w źródle strony
    echo "\n<!-- NEVO DEBUG: nevo_enqueue_block_styles fired -->\n";

    // Hero
    wp_enqueue_style(
        'nevo-hero-style',
        NEVO_URI . '/build/blocks/hero/style-index.css',
        array(),
        NEVO_VERSION
    );

    // Tiles
    wp_enqueue_style(
        'nevo-tiles-style',
        NEVO_URI . '/build/blocks/tiles/style-index.css',
        array(),
        NEVO_VERSION
    );

    // CTA
    wp_enqueue_style(
        'nevo-cta-style',
        NEVO_URI . '/build/blocks/cta/style-index.css',
        array(),
        NEVO_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_block_styles', 20 );

/**
 * Lazy loading obrazków
 */
function nevo_add_lazy_loading( $attr ) {
    if ( ! isset( $attr['loading'] ) ) {
        $attr['loading'] = 'lazy';
    }
    return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'nevo_add_lazy_loading' );

/**
 * Enqueue dodatkowych skryptów frontendowych
 */
function nevo_enqueue_frontend_scripts() {
    // Pillars tabs
    wp_enqueue_script(
        'nevo-pillars-tabs',
        get_stylesheet_directory_uri() . '/assets/js/pillars-tabs.js',
        array(),
        filemtime( NEVO_DIR . '/assets/js/pillars-tabs.js' ),
        true
    );

    // Carousel (dla sekcji problems i innych)
    wp_enqueue_script(
        'nevo-carousel',
        get_stylesheet_directory_uri() . '/assets/js/nevo-carousel.js',
        array(),
        filemtime( NEVO_DIR . '/assets/js/nevo-carousel.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'nevo_enqueue_frontend_scripts' );

/**
 * Usuń prefix "Kategoria:", "Tag:", "Autor:" z tytułów archiwum
 */
function nevo_remove_archive_title_prefix( $title ) {
    if ( is_category() ) {
        $title = single_cat_title( '', false );
    } elseif ( is_tag() ) {
        $title = single_tag_title( '', false );
    } elseif ( is_author() ) {
        $title = get_the_author();
    } elseif ( is_post_type_archive() ) {
        $title = post_type_archive_title( '', false );
    }
    return $title;
}
add_filter( 'get_the_archive_title', 'nevo_remove_archive_title_prefix' );

/**
 * Inline Critical CSS for above-the-fold content
 * Only loads on front page to eliminate render-blocking CSS
 */
function nevo_inline_critical_css() {
    if ( ! is_front_page() ) {
        return;
    }

    $critical_css_path = NEVO_DIR . '/assets/css/critical.css';

    if ( file_exists( $critical_css_path ) ) {
        $critical_css = file_get_contents( $critical_css_path );
        if ( $critical_css ) {
            echo '<style id="nevo-critical-css">' . $critical_css . '</style>' . "\n";
        }
    }
}
add_action( 'wp_head', 'nevo_inline_critical_css', 1 );

/**
 * Defer non-critical CSS loading on front page
 */
function nevo_defer_stylesheets( $html, $handle ) {
    if ( is_admin() || ! is_front_page() ) {
        return $html;
    }

    // Stylesheets to defer (load async)
    $defer_handles = array( 'nevo-main' );

    if ( in_array( $handle, $defer_handles, true ) ) {
        // Change rel="stylesheet" to rel="preload" with onload
        $html = str_replace(
            "rel='stylesheet'",
            "rel='preload' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"",
            $html
        );
        // Add noscript fallback
        $html .= '<noscript>' . str_replace( "rel='preload' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"", "rel='stylesheet'", $html ) . '</noscript>';
    }

    return $html;
}
add_filter( 'style_loader_tag', 'nevo_defer_stylesheets', 10, 2 );