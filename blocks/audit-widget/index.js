import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('nevo/audit-widget', {
	edit: ({ attributes, setAttributes }) => {
		const { title, description, badgeText } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-audit' });

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
						<span className="nevo-audit__badge">{badgeText}</span>
					)}
					<div className="nevo-audit__icon">
						<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
							<circle cx="11" cy="11" r="8" />
							<path d="M21 21l-4.35-4.35" />
						</svg>
					</div>
					<RichText
						tagName="h3"
						className="nevo-audit__title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Tytuł...', 'nevo')}
					/>
					<RichText
						tagName="p"
						className="nevo-audit__description"
						value={description}
						onChange={(value) => setAttributes({ description: value })}
						placeholder={__('Opis...', 'nevo')}
					/>
					<div className="nevo-audit__form">
						<div className="nevo-audit__input-wrapper">
							<input
								type="text"
								className="nevo-audit__input"
								placeholder="Wpisz adres strony..."
								disabled
							/>
						</div>
						<button className="nevo-audit__button" disabled>
							Sprawdź
						</button>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { title, description, badgeText } = attributes;
		const blockProps = useBlockProps.save({ className: 'nevo-audit' });

		return (
			<div {...blockProps}>
				{badgeText && (
					<span className="nevo-audit__badge">{badgeText}</span>
				)}
				<div className="nevo-audit__icon">
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
						<circle cx="11" cy="11" r="8" />
						<path d="M21 21l-4.35-4.35" />
					</svg>
				</div>
				<RichText.Content tagName="h3" className="nevo-audit__title" value={title} />
				<RichText.Content tagName="p" className="nevo-audit__description" value={description} />
				<div className="nevo-audit__form">
					<div className="nevo-audit__input-wrapper">
						<input
							type="text"
							className="nevo-audit__input"
							placeholder="Wpisz adres strony..."
							disabled
						/>
					</div>
					<button className="nevo-audit__button" disabled>
						Sprawdź
					</button>
				</div>
			</div>
		);
	},
});
