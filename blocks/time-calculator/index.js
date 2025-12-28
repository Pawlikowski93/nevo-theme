import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('nevo/time-calculator', {
	edit: ({ attributes, setAttributes }) => {
		const { title, subtitle, ctaText, ctaUrl, hourlyRate } = attributes;
		const blockProps = useBlockProps({
			className: 'nevo-time-calculator-editor'
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia kalkulatora', 'nevo')} initialOpen={true}>
						<TextControl
							label={__('Tytuł', 'nevo')}
							value={title}
							onChange={(value) => setAttributes({ title: value })}
						/>
						<TextControl
							label={__('Podtytuł', 'nevo')}
							value={subtitle}
							onChange={(value) => setAttributes({ subtitle: value })}
						/>
						<RangeControl
							label={__('Domyślna stawka godzinowa (PLN)', 'nevo')}
							value={hourlyRate}
							onChange={(value) => setAttributes({ hourlyRate: value })}
							min={50}
							max={500}
							step={10}
						/>
						<TextControl
							label={__('Tekst przycisku CTA', 'nevo')}
							value={ctaText}
							onChange={(value) => setAttributes({ ctaText: value })}
						/>
						<TextControl
							label={__('URL przycisku CTA', 'nevo')}
							value={ctaUrl}
							onChange={(value) => setAttributes({ ctaUrl: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="nevo-calc-preview">
						<div className="nevo-calc-preview__header">
							<svg className="nevo-calc-preview__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							<div>
								<h3 className="nevo-calc-preview__title">{title}</h3>
								<p className="nevo-calc-preview__subtitle">{subtitle}</p>
							</div>
						</div>
						<div className="nevo-calc-preview__placeholder">
							<div className="nevo-calc-preview__sliders">
								<div className="nevo-calc-preview__slider-row">
									<span>📞 Telefony: 5/tyg.</span>
									<div className="nevo-calc-preview__slider-bar"></div>
								</div>
								<div className="nevo-calc-preview__slider-row">
									<span>📧 Maile: 10/tyg.</span>
									<div className="nevo-calc-preview__slider-bar"></div>
								</div>
								<div className="nevo-calc-preview__slider-row">
									<span>💰 Stawka: {hourlyRate} zł/h</span>
									<div className="nevo-calc-preview__slider-bar"></div>
								</div>
							</div>
							<div className="nevo-calc-preview__result">
								<span className="nevo-calc-preview__result-number">12</span>
								<span className="nevo-calc-preview__result-label">godzin miesięcznie</span>
							</div>
							<p className="nevo-calc-preview__info">
								{__('Interaktywny kalkulator wyświetli się na frontendzie', 'nevo')}
							</p>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { title, subtitle, ctaText, ctaUrl, hourlyRate } = attributes;
		const blockProps = useBlockProps.save({
			className: 'nevo-time-calculator'
		});

		return (
			<div
				{...blockProps}
				data-title={title}
				data-subtitle={subtitle}
				data-cta-text={ctaText}
				data-cta-url={ctaUrl}
				data-hourly-rate={hourlyRate}
			>
				<div className="nevo-time-calculator__loading">
					<div className="nevo-time-calculator__spinner"></div>
					<p>{__('Ładowanie kalkulatora...', 'nevo')}</p>
				</div>
			</div>
		);
	},
});
