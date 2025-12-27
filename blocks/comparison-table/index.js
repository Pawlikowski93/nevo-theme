import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

const DEFAULT_ITEMS = [
	{ left: '„Zadzwoń do nas"', right: 'Rezerwacja online 24/7' },
	{ left: 'Brak analityki', right: 'Wiesz kto, skąd, kiedy' },
	{ left: 'Statyczna wizytówka', right: 'Dynamiczne narzędzie sprzedaży' },
	{ left: 'Jednorazowy koszt, zero ROI', right: 'Zwraca się w 3-6 miesięcy' },
	{ left: 'Ręczne odpowiadanie na pytania', right: 'FAQ + chatbot automatyczny' },
	{ left: 'Brak integracji', right: 'Połączenie z CRM, kalendarzem, płatnościami' },
];

registerBlockType('nevo/comparison-table', {
	edit: ({ attributes, setAttributes }) => {
		const { leftTitle, rightTitle, items } = attributes;
		const blockProps = useBlockProps({ className: 'nevo-comparison' });

		const updateItem = (index, field, value) => {
			const newItems = [...items];
			newItems[index] = { ...newItems[index], [field]: value };
			setAttributes({ items: newItems });
		};

		const addItem = () => {
			setAttributes({
				items: [...items, { left: '', right: '' }],
			});
		};

		const removeItem = (index) => {
			const newItems = items.filter((_, i) => i !== index);
			setAttributes({ items: newItems });
		};

		const resetToDefault = () => {
			setAttributes({
				leftTitle: 'Strona-wizytówka',
				rightTitle: 'Strona-narzędzie',
				items: DEFAULT_ITEMS,
			});
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia tabeli', 'nevo')}>
						<Button variant="secondary" onClick={addItem} style={{ marginBottom: '10px', width: '100%' }}>
							{__('Dodaj wiersz', 'nevo')}
						</Button>
						<Button variant="tertiary" onClick={resetToDefault} isDestructive style={{ width: '100%' }}>
							{__('Resetuj do domyślnych', 'nevo')}
						</Button>
					</PanelBody>
					<PanelBody title={__('Wiersze', 'nevo')} initialOpen={false}>
						{items.map((item, index) => (
							<div key={index} style={{ marginBottom: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '4px' }}>
								<p style={{ margin: '0 0 8px', fontWeight: '600', fontSize: '12px' }}>
									{__('Wiersz', 'nevo')} {index + 1}
								</p>
								<TextControl
									label={__('Wizytówka', 'nevo')}
									value={item.left}
									onChange={(value) => updateItem(index, 'left', value)}
								/>
								<TextControl
									label={__('Narzędzie', 'nevo')}
									value={item.right}
									onChange={(value) => updateItem(index, 'right', value)}
								/>
								<Button variant="link" isDestructive onClick={() => removeItem(index)} style={{ fontSize: '12px' }}>
									{__('Usuń wiersz', 'nevo')}
								</Button>
							</div>
						))}
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="nevo-comparison__grid">
						<div className="nevo-comparison__column nevo-comparison__column--left">
							<RichText
								tagName="h3"
								className="nevo-comparison__title"
								value={leftTitle}
								onChange={(value) => setAttributes({ leftTitle: value })}
								placeholder={__('Tytuł lewej kolumny', 'nevo')}
							/>
							<ul className="nevo-comparison__list">
								{items.map((item, index) => (
									<li key={index} className="nevo-comparison__item">
										<span className="nevo-comparison__icon nevo-comparison__icon--negative">✗</span>
										<RichText
											tagName="span"
											className="nevo-comparison__text"
											value={item.left}
											onChange={(value) => updateItem(index, 'left', value)}
											placeholder={__('Tekst...', 'nevo')}
										/>
									</li>
								))}
							</ul>
						</div>

						<div className="nevo-comparison__column nevo-comparison__column--right">
							<RichText
								tagName="h3"
								className="nevo-comparison__title"
								value={rightTitle}
								onChange={(value) => setAttributes({ rightTitle: value })}
								placeholder={__('Tytuł prawej kolumny', 'nevo')}
							/>
							<ul className="nevo-comparison__list">
								{items.map((item, index) => (
									<li key={index} className="nevo-comparison__item">
										<span className="nevo-comparison__icon nevo-comparison__icon--positive">✓</span>
										<RichText
											tagName="span"
											className="nevo-comparison__text"
											value={item.right}
											onChange={(value) => updateItem(index, 'right', value)}
											placeholder={__('Tekst...', 'nevo')}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { leftTitle, rightTitle, items } = attributes;
		const blockProps = useBlockProps.save({ className: 'nevo-comparison' });

		return (
			<div {...blockProps}>
				<div className="nevo-comparison__grid">
					<div className="nevo-comparison__column nevo-comparison__column--left">
						<RichText.Content tagName="h3" className="nevo-comparison__title" value={leftTitle} />
						<ul className="nevo-comparison__list">
							{items.map((item, index) => (
								<li key={index} className="nevo-comparison__item">
									<span className="nevo-comparison__icon nevo-comparison__icon--negative">✗</span>
									<span className="nevo-comparison__text">{item.left}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="nevo-comparison__column nevo-comparison__column--right">
						<RichText.Content tagName="h3" className="nevo-comparison__title" value={rightTitle} />
						<ul className="nevo-comparison__list">
							{items.map((item, index) => (
								<li key={index} className="nevo-comparison__item">
									<span className="nevo-comparison__icon nevo-comparison__icon--positive">✓</span>
									<span className="nevo-comparison__text">{item.right}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	},
});
