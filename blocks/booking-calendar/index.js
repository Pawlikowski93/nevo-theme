import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('nevo/booking-calendar', {
	edit: ({ attributes, setAttributes }) => {
		const { title, calendarUrl, embedType } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-booking' });

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia Cal.com', 'nevo')}>
						<TextControl
							label={__('URL Cal.com', 'nevo')}
							value={calendarUrl}
							onChange={(value) => setAttributes({ calendarUrl: value })}
							placeholder="https://cal.com/twoj-profil"
							help={__('Wklej pełny URL do swojego kalendarza Cal.com', 'nevo')}
						/>
						<SelectControl
							label={__('Typ embedu', 'nevo')}
							value={embedType}
							options={[
								{ label: 'Inline (w stronie)', value: 'inline' },
								{ label: 'Popup (przycisk)', value: 'popup' },
							]}
							onChange={(value) => setAttributes({ embedType: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<RichText
						tagName="h3"
						className="nevo-booking__title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Tytuł...', 'nevo')}
					/>
					<div className="nevo-booking__container">
						<div className="nevo-booking__icon">
							<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<rect x="3" y="4" width="18" height="18" rx="2" />
								<path d="M16 2v4" />
								<path d="M8 2v4" />
								<path d="M3 10h18" />
								<path d="M8 14h.01" />
								<path d="M12 14h.01" />
								<path d="M16 14h.01" />
								<path d="M8 18h.01" />
								<path d="M12 18h.01" />
							</svg>
						</div>
						{calendarUrl ? (
							<>
								<p className="nevo-booking__status nevo-booking__status--configured">
									Kalendarz skonfigurowany
								</p>
								<p className="nevo-booking__url">{calendarUrl}</p>
								<span className="nevo-booking__embed-type">
									Typ: {embedType === 'inline' ? 'Inline' : 'Popup'}
								</span>
							</>
						) : (
							<>
								<p className="nevo-booking__status">
									Wpisz URL Cal.com w panelu bocznym
								</p>
								<p className="nevo-booking__hint">
									Kalendarz pojawi się tutaj po skonfigurowaniu
								</p>
							</>
						)}
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { title, calendarUrl, embedType } = attributes;
		const blockProps = useBlockProps.save({ className: 'nevo-booking' });

		return (
			<div {...blockProps} data-calendar-url={calendarUrl} data-embed-type={embedType}>
				<RichText.Content tagName="h3" className="nevo-booking__title" value={title} />
				<div className="nevo-booking__container">
					{calendarUrl ? (
						embedType === 'inline' ? (
							<iframe
								src={calendarUrl}
								className="nevo-booking__iframe"
								frameBorder="0"
								allowFullScreen
								loading="lazy"
							/>
						) : (
							<a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="nevo-booking__button">
								Zarezerwuj termin
							</a>
						)
					) : (
						<div className="nevo-booking__placeholder">
							<div className="nevo-booking__icon">
								<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
									<rect x="3" y="4" width="18" height="18" rx="2" />
									<path d="M16 2v4" />
									<path d="M8 2v4" />
									<path d="M3 10h18" />
									<path d="M8 14h.01" />
									<path d="M12 14h.01" />
									<path d="M16 14h.01" />
									<path d="M8 18h.01" />
									<path d="M12 18h.01" />
								</svg>
							</div>
							<p className="nevo-booking__status">
								Kalendarz wkrótce dostępny
							</p>
						</div>
					)}
				</div>
			</div>
		);
	},
});
