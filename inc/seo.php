<?php
/**
 * NEVO SEO Functions (without plugin)
 *
 * @package Nevo
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Meta Description
 */
function nevo_meta_description() {
	global $post;
	$desc = '';

	// Homepage
	if ( is_front_page() ) {
		$desc = 'NEVO Marketing — agencja premium dla e-commerce i MŚP. Strategia. Technologia. Efekt. Google Ads, WooCommerce, GA4. Zakopane, Małopolska.';
	}
	// Strony - custom field lub excerpt
	elseif ( is_page() && $post ) {
		$custom = get_post_meta( $post->ID, '_nevo_meta_description', true );
		$desc   = ! empty( $custom ) ? $custom : wp_trim_words( strip_tags( get_the_excerpt() ), 25 );
	}
	// Posty
	elseif ( is_single() && $post ) {
		$custom = get_post_meta( $post->ID, '_nevo_meta_description', true );
		$desc   = ! empty( $custom ) ? $custom : wp_trim_words( strip_tags( get_the_excerpt() ), 25 );
	}
	// Kategorie
	elseif ( is_category() ) {
		$desc = category_description();
	}
	// Archive
	elseif ( is_archive() ) {
		$desc = 'Artykuły i poradniki o marketingu, e-commerce i analityce od NEVO Marketing.';
	}

	if ( ! empty( $desc ) ) {
		$desc = esc_attr( substr( preg_replace( '/\s+/', ' ', strip_tags( $desc ) ), 0, 160 ) );
		echo '<meta name="description" content="' . $desc . '">' . "\n";
	}
}
add_action( 'wp_head', 'nevo_meta_description', 1 );

/**
 * Canonical URL
 */
function nevo_canonical_url() {
	if ( is_singular() ) {
		echo '<link rel="canonical" href="' . esc_url( get_permalink() ) . '">' . "\n";
	} elseif ( is_front_page() ) {
		echo '<link rel="canonical" href="' . esc_url( home_url( '/' ) ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'nevo_canonical_url', 1 );

/**
 * Open Graph tags
 */
function nevo_open_graph() {
	global $post;

	echo '<meta property="og:site_name" content="NEVO Marketing">' . "\n";
	echo '<meta property="og:locale" content="pl_PL">' . "\n";

	if ( is_singular() && $post ) {
		echo '<meta property="og:type" content="article">' . "\n";
		echo '<meta property="og:title" content="' . esc_attr( get_the_title() ) . '">' . "\n";
		echo '<meta property="og:url" content="' . esc_url( get_permalink() ) . '">' . "\n";

		if ( has_post_thumbnail() ) {
			echo '<meta property="og:image" content="' . esc_url( get_the_post_thumbnail_url( $post, 'large' ) ) . '">' . "\n";
		}
	} elseif ( is_front_page() ) {
		echo '<meta property="og:type" content="website">' . "\n";
		echo '<meta property="og:title" content="NEVO Marketing — Strategia. Technologia. Efekt.">' . "\n";
		echo '<meta property="og:url" content="' . esc_url( home_url( '/' ) ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'nevo_open_graph', 2 );

/**
 * Meta box for custom description (admin)
 */
function nevo_seo_meta_box() {
	add_meta_box(
		'nevo_seo',
		'NEVO SEO',
		'nevo_seo_meta_box_html',
		array( 'post', 'page' ),
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'nevo_seo_meta_box' );

/**
 * Meta box HTML
 *
 * @param WP_Post $post Current post object.
 */
function nevo_seo_meta_box_html( $post ) {
	$value = get_post_meta( $post->ID, '_nevo_meta_description', true );
	wp_nonce_field( 'nevo_seo_save', 'nevo_seo_nonce' );
	?>
	<p>
		<label for="nevo_meta_description"><strong>Meta Description</strong> (max 160 znaków)</label><br>
		<textarea id="nevo_meta_description" name="nevo_meta_description" rows="3" style="width:100%" maxlength="160"><?php echo esc_textarea( $value ); ?></textarea>
		<span class="description">Zostaw puste aby użyć excerpt.</span>
	</p>
	<?php
}

/**
 * Save meta box data
 *
 * @param int $post_id Post ID.
 */
function nevo_seo_meta_box_save( $post_id ) {
	if ( ! isset( $_POST['nevo_seo_nonce'] ) || ! wp_verify_nonce( $_POST['nevo_seo_nonce'], 'nevo_seo_save' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['nevo_meta_description'] ) ) {
		update_post_meta( $post_id, '_nevo_meta_description', sanitize_textarea_field( $_POST['nevo_meta_description'] ) );
	}
}
add_action( 'save_post', 'nevo_seo_meta_box_save' );
