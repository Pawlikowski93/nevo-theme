import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('nevo/booking-calendar', {
	edit: ({ attributes, setAttributes }) => {
		const { title, subtitle, apiBase } = attributes;
		const blockProps = useBlockProps({
			className: 'nevo-booking-calendar-editor'
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia kalendarza', 'nevo')} initialOpen={true}>
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
						<TextControl
							label={__('API Base URL', 'nevo')}
							value={apiBase}
							onChange={(value) => setAttributes({ apiBase: value })}
							help={__('URL do n8n webhooków', 'nevo')}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="nevo-booking-preview">
						<div className="nevo-booking-preview__header">
							<svg className="nevo-booking-preview__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
								<line x1="16" y1="2" x2="16" y2="6"></line>
								<line x1="8" y1="2" x2="8" y2="6"></line>
								<line x1="3" y1="10" x2="21" y2="10"></line>
							</svg>
							<div>
								<h3 className="nevo-booking-preview__title">{title}</h3>
								<p className="nevo-booking-preview__subtitle">{subtitle}</p>
							</div>
						</div>
						<div className="nevo-booking-preview__placeholder">
							<div className="nevo-booking-preview__dates">
								{['Pon', 'Wt', 'Śr', 'Czw', 'Pt'].map((day, i) => (
									<div key={day} className="nevo-booking-preview__date">
										<span className="nevo-booking-preview__day">{day}</span>
										<span className="nevo-booking-preview__num">{i + 6}</span>
									</div>
								))}
							</div>
							<p className="nevo-booking-preview__info">
								{__('Kalendarz rezerwacji wyświetli się na frontendzie', 'nevo')}
							</p>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { title, subtitle, apiBase } = attributes;
		const blockProps = useBlockProps.save({
			className: 'nevo-booking-calendar'
		});

		return (
			<div
				{...blockProps}
				data-title={title}
				data-subtitle={subtitle}
				data-api-base={apiBase}
			>
				<div className="nevo-booking-calendar__loading">
					<div className="nevo-booking-calendar__spinner"></div>
					<p>{__('Ładowanie kalendarza...', 'nevo')}</p>
				</div>
			</div>
		);
	},
});
