import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, TextareaControl } from '@wordpress/components';
import './style.css';
import './editor.css';

registerBlockType('nevo/staszek-chat', {
	edit: function Edit({ attributes, setAttributes }) {
		const { apiEndpoint, bookingUrl, welcomeMessage, position } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-staszek-chat-editor' });

		return (
			<>
				<InspectorControls>
					<PanelBody title="Ustawienia" initialOpen={true}>
						<TextareaControl
							label="Wiadomość powitalna"
							value={welcomeMessage}
							onChange={(value) => setAttributes({ welcomeMessage: value })}
							rows={3}
						/>
						<TextControl
							label="URL przycisku rezerwacji"
							value={bookingUrl}
							onChange={(value) => setAttributes({ bookingUrl: value })}
						/>
						<SelectControl
							label="Pozycja"
							value={position}
							options={[
								{ label: 'Prawy dolny róg', value: 'bottom-right' },
								{ label: 'Lewy dolny róg', value: 'bottom-left' },
							]}
							onChange={(value) => setAttributes({ position: value })}
						/>
						<TextControl
							label="API Endpoint"
							value={apiEndpoint}
							onChange={(value) => setAttributes({ apiEndpoint: value })}
							help="URL webhooków n8n dla Staszka"
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="staszek-preview">
						<div className="staszek-preview__header">
							<div className="staszek-preview__avatar">S</div>
							<div className="staszek-preview__info">
								<div className="staszek-preview__name">Staszek</div>
								<div className="staszek-preview__status">
									<span className="staszek-preview__dot"></span>
									Asystent NEVO
								</div>
							</div>
						</div>

						<div className="staszek-preview__messages">
							<div className="staszek-preview__message staszek-preview__message--assistant">
								<div className="staszek-preview__msg-avatar">S</div>
								<div className="staszek-preview__bubble">{welcomeMessage}</div>
							</div>
							<div className="staszek-preview__message staszek-preview__message--user">
								<div className="staszek-preview__bubble">Czym się zajmujecie?</div>
							</div>
						</div>

						<div className="staszek-preview__quick">
							<span>Czym się zajmujecie?</span>
							<span>Ile to kosztuje?</span>
							<span>Chcę umówić rozmowę</span>
						</div>

						<div className="staszek-preview__input">
							<span>Napisz wiadomość...</span>
							<div className="staszek-preview__send">➤</div>
						</div>

						<div className="staszek-preview__footer">
							Wolisz rozmowę? <strong>Umów się z Andrzejem →</strong>
						</div>
					</div>

					<div className="staszek-preview__info-box">
						<strong>Chat pojawi się jako pływający widget</strong><br />
						Pozycja: {position === 'bottom-left' ? 'lewy dolny róg' : 'prawy dolny róg'}
					</div>
				</div>
			</>
		);
	},

	save: function Save({ attributes }) {
		const { apiEndpoint, bookingUrl, welcomeMessage, position } = attributes;
		const blockProps = useBlockProps.save({
			className: 'nevo-staszek-chat',
			'data-api-endpoint': apiEndpoint,
			'data-booking-url': bookingUrl,
			'data-welcome-message': welcomeMessage,
			'data-position': position,
		});

		return <div {...blockProps}></div>;
	},
});
