import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './style.css';
import './editor.css';

registerBlockType('nevo/live-audit', {
	edit: function Edit({ attributes, setAttributes }) {
		const { title, subtitle, ctaUrl, apiBase } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-live-audit-editor' });

		return (
			<>
				<InspectorControls>
					<PanelBody title="Ustawienia" initialOpen={true}>
						<TextControl
							label="Tytuł"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
						/>
						<TextControl
							label="Podtytuł"
							value={subtitle}
							onChange={(value) => setAttributes({ subtitle: value })}
						/>
						<TextControl
							label="URL przycisku CTA"
							value={ctaUrl}
							onChange={(value) => setAttributes({ ctaUrl: value })}
						/>
						<TextControl
							label="API Base URL"
							value={apiBase}
							onChange={(value) => setAttributes({ apiBase: value })}
							help="Endpoint webhooków n8n"
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="nevo-audit-preview">
						<div className="nevo-audit-preview__header">
							<div className="nevo-audit-preview__icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<h3 className="nevo-audit-preview__title">{title}</h3>
							<p className="nevo-audit-preview__subtitle">{subtitle}</p>
						</div>

						<div className="nevo-audit-preview__form">
							<div className="nevo-audit-preview__input">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="12" cy="12" r="10" />
									<path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
								</svg>
								<span>np. mojafirma.pl</span>
							</div>
							<button className="nevo-audit-preview__button">
								Analizuj
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
								</svg>
							</button>
						</div>

						<div className="nevo-audit-preview__features">
							<span>🔒 Bezpieczne</span>
							<span>⚡ Wynik w 15s</span>
							<span>💰 Za darmo</span>
						</div>

						<div className="nevo-audit-preview__info">
							<strong>Ten blok jest interaktywny na froncie strony.</strong><br />
							Użytkownicy mogą wpisać URL i otrzymać raport audytu.
						</div>
					</div>
				</div>
			</>
		);
	},

	save: function Save({ attributes }) {
		const { title, subtitle, ctaUrl, apiBase } = attributes;
		const blockProps = useBlockProps.save({
			className: 'nevo-live-audit',
			'data-title': title,
			'data-subtitle': subtitle,
			'data-cta-url': ctaUrl,
			'data-api-base': apiBase,
		});

		return (
			<div {...blockProps}>
				<div className="nevo-live-audit__loading">
					<div className="nevo-live-audit__spinner"></div>
					<span>Ładowanie...</span>
				</div>
			</div>
		);
	},
});
