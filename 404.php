<?php
/**
 * 404 Template (fallback)
 *
 * @package NEVO
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();
?>

<main class="nevo-404">
    <div class="nevo-404__container">
        <h1 class="nevo-404__code">404</h1>
        <h2 class="nevo-404__title">Strona nie została znaleziona</h2>
        <p class="nevo-404__description">Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.</p>
        <div class="nevo-404__buttons">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nevo-404__btn nevo-404__btn--primary">
                Wróć na stronę główną
            </a>
            <a href="<?php echo esc_url( home_url( '/kontakt' ) ); ?>" class="nevo-404__btn nevo-404__btn--outline">
                Kontakt
            </a>
        </div>
    </div>
</main>

<style>
.nevo-404 {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
}
.nevo-404__container {
    max-width: 600px;
}
.nevo-404__code {
    font-family: 'Montserrat', sans-serif;
    font-size: 120px;
    font-weight: 700;
    color: #FF6B58;
    margin: 0 0 16px;
    line-height: 1;
}
.nevo-404__title {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #1c2e40;
    margin: 0 0 16px;
}
.nevo-404__description {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    color: #6b7280;
    margin: 0 0 32px;
    line-height: 1.6;
}
.nevo-404__buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}
.nevo-404__btn {
    display: inline-block;
    padding: 16px 32px;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 999px;
    transition: all 0.2s ease;
}
.nevo-404__btn--primary {
    background: #FF6B58;
    color: #ffffff;
}
.nevo-404__btn--primary:hover {
    background: #ff8577;
    transform: translateY(-2px);
}
.nevo-404__btn--outline {
    background: transparent;
    color: #1c2e40;
    border: 2px solid #1c2e40;
}
.nevo-404__btn--outline:hover {
    background: #1c2e40;
    color: #ffffff;
}
@media (max-width: 480px) {
    .nevo-404__code { font-size: 80px; }
    .nevo-404__title { font-size: 24px; }
    .nevo-404__buttons { flex-direction: column; }
    .nevo-404__btn { width: 100%; text-align: center; }
}
</style>

<?php
get_footer();
