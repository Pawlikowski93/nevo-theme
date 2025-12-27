import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('nevo/time-calculator', {
	edit: ({ attributes, setAttributes }) => {
		const { title, description, hourlyRate, ctaText, ctaUrl } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-calculator' });

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia kalkulatora', 'nevo')}>
						<RangeControl
							label={__('Stawka godzinowa (PLN)', 'nevo')}
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
					<div className="nevo-calculator__editor-preview">
						<RichText
							tagName="h3"
							className="nevo-calculator__title"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Tytuł kalkulatora', 'nevo')}
						/>
						<RichText
							tagName="p"
							className="nevo-calculator__description"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder={__('Opis kalkulatora...', 'nevo')}
						/>

						<div className="nevo-calculator__preview-box">
							<div className="nevo-calculator__preview-icon">
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="4" y="2" width="16" height="20" rx="2" />
									<line x1="8" y1="6" x2="16" y2="6" />
									<line x1="8" y1="10" x2="10" y2="10" />
									<line x1="14" y1="10" x2="16" y2="10" />
									<line x1="8" y1="14" x2="10" y2="14" />
									<line x1="14" y1="14" x2="16" y2="14" />
									<line x1="8" y1="18" x2="10" y2="18" />
									<line x1="14" y1="18" x2="16" y2="18" />
								</svg>
							</div>
							<p className="nevo-calculator__preview-text">
								{__('Interaktywny kalkulator będzie widoczny na stronie', 'nevo')}
							</p>
							<div className="nevo-calculator__preview-fields">
								<span>Slidery: Telefony, Maile, Wpisy</span>
								<span>Wynik: Godziny/msc, Wartość PLN</span>
							</div>
							<p className="nevo-calculator__preview-rate">
								{__('Stawka:', 'nevo')} {hourlyRate} PLN/h
							</p>
						</div>

						<div className="nevo-calculator__preview-cta">
							<span className="nevo-calculator__cta-button">{ctaText}</span>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { title, description, hourlyRate, ctaText, ctaUrl } = attributes;
		const blockProps = useBlockProps.save({ className: 'nevo-calculator' });

		return (
			<div
				{...blockProps}
				data-hourly-rate={hourlyRate}
				data-cta-text={ctaText}
				data-cta-url={ctaUrl}
			>
				<RichText.Content tagName="h3" className="nevo-calculator__title" value={title} />
				<RichText.Content tagName="p" className="nevo-calculator__description" value={description} />
				<div className="nevo-calculator__app" data-calculator="true">
					<noscript>
						<p>{__('Włącz JavaScript aby użyć kalkulatora', 'nevo')}</p>
					</noscript>
				</div>
			</div>
		);
	},
});
