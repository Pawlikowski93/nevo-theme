import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('nevo/ai-chat', {
	edit: ({ attributes, setAttributes }) => {
		const { title, welcomeMessage, badgeText } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-chat' });

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia', 'nevo')}>
						<TextControl
							label={__('Tekst badge', 'nevo')}
							value={badgeText}
							onChange={(value) => setAttributes({ badgeText: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{badgeText && (
						<span className="nevo-chat__badge">{badgeText}</span>
					)}
					<div className="nevo-chat__header">
						<div className="nevo-chat__avatar">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
								<rect x="3" y="11" width="18" height="10" rx="2" />
								<circle cx="8.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
								<circle cx="15.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
								<path d="M8 11V8a4 4 0 0 1 8 0v3" />
							</svg>
						</div>
						<div className="nevo-chat__header-text">
							<RichText
								tagName="h3"
								className="nevo-chat__title"
								value={title}
								onChange={(value) => setAttributes({ title: value })}
								placeholder={__('Tytuł...', 'nevo')}
							/>
							<span className="nevo-chat__status">Asystent AI</span>
						</div>
					</div>
					<div className="nevo-chat__messages">
						<div className="nevo-chat__bubble nevo-chat__bubble--bot">
							<RichText
								tagName="span"
								value={welcomeMessage}
								onChange={(value) => setAttributes({ welcomeMessage: value })}
								placeholder={__('Wiadomość powitalna...', 'nevo')}
							/>
						</div>
					</div>
					<div className="nevo-chat__input-area">
						<input
							type="text"
							className="nevo-chat__input"
							placeholder="Napisz wiadomość..."
							disabled
						/>
						<button className="nevo-chat__send" disabled>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M22 2L11 13" />
								<path d="M22 2L15 22L11 13L2 9L22 2Z" />
							</svg>
						</button>
					</div>
					<p className="nevo-chat__info">Asystent AI połączony z n8n</p>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { title, welcomeMessage, badgeText } = attributes;
		const blockProps = useBlockProps.save({ className: 'nevo-chat' });

		return (
			<div {...blockProps}>
				{badgeText && (
					<span className="nevo-chat__badge">{badgeText}</span>
				)}
				<div className="nevo-chat__header">
					<div className="nevo-chat__avatar">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
							<rect x="3" y="11" width="18" height="10" rx="2" />
							<circle cx="8.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
							<circle cx="15.5" cy="16" r="1.5" fill="currentColor" stroke="none" />
							<path d="M8 11V8a4 4 0 0 1 8 0v3" />
						</svg>
					</div>
					<div className="nevo-chat__header-text">
						<RichText.Content tagName="h3" className="nevo-chat__title" value={title} />
						<span className="nevo-chat__status">Asystent AI</span>
					</div>
				</div>
				<div className="nevo-chat__messages">
					<div className="nevo-chat__bubble nevo-chat__bubble--bot">
						<RichText.Content tagName="span" value={welcomeMessage} />
					</div>
				</div>
				<div className="nevo-chat__input-area">
					<input
						type="text"
						className="nevo-chat__input"
						placeholder="Napisz wiadomość..."
						disabled
					/>
					<button className="nevo-chat__send" disabled>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M22 2L11 13" />
							<path d="M22 2L15 22L11 13L2 9L22 2Z" />
						</svg>
					</button>
				</div>
				<p className="nevo-chat__info">Asystent AI połączony z n8n</p>
			</div>
		);
	},
});
