import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

const DEFAULT_STEPS = [
	{ number: 1, title: 'Rozmowa', description: 'Poznajemy Twój biznes, cele i budżet', duration: '30 min' },
	{ number: 2, title: 'Propozycja', description: 'Strategia + wireframe + wycena wariantowa', duration: '3-5 dni' },
	{ number: 3, title: 'Realizacja', description: 'Iteracyjna praca z Twoim feedbackiem', duration: '2-6 tyg.' },
	{ number: 4, title: 'Odpalenie', description: 'Szkolenie, wsparcie 30 dni, optymalizacja', duration: 'ongoing' },
];

const MAX_STEPS = 6;

registerBlockType('nevo/process-timeline', {
	edit: ({ attributes, setAttributes }) => {
		const { steps, orientation } = attributes;
		const blockProps = useBlockProps({
			className: `nevo-timeline nevo-timeline--${orientation}`,
		});

		const updateStep = (index, field, value) => {
			const newSteps = [...steps];
			newSteps[index] = { ...newSteps[index], [field]: value };
			setAttributes({ steps: newSteps });
		};

		const addStep = () => {
			if (steps.length >= MAX_STEPS) return;
			const newNumber = steps.length + 1;
			setAttributes({
				steps: [...steps, { number: newNumber, title: '', description: '', duration: '' }],
			});
		};

		const removeStep = (index) => {
			const newSteps = steps.filter((_, i) => i !== index).map((step, i) => ({
				...step,
				number: i + 1,
			}));
			setAttributes({ steps: newSteps });
		};

		const resetToDefault = () => {
			setAttributes({ steps: DEFAULT_STEPS, orientation: 'horizontal' });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Ustawienia timeline', 'nevo')}>
						<SelectControl
							label={__('Orientacja', 'nevo')}
							value={orientation}
							options={[
								{ label: __('Pozioma', 'nevo'), value: 'horizontal' },
								{ label: __('Pionowa', 'nevo'), value: 'vertical' },
							]}
							onChange={(value) => setAttributes({ orientation: value })}
						/>
						<Button
							variant="secondary"
							onClick={addStep}
							disabled={steps.length >= MAX_STEPS}
							style={{ marginBottom: '10px', width: '100%' }}
						>
							{__('Dodaj krok', 'nevo')} ({steps.length}/{MAX_STEPS})
						</Button>
						<Button variant="tertiary" onClick={resetToDefault} isDestructive style={{ width: '100%' }}>
							{__('Resetuj do domyślnych', 'nevo')}
						</Button>
					</PanelBody>
					<PanelBody title={__('Czas trwania kroków', 'nevo')} initialOpen={false}>
						{steps.map((step, index) => (
							<TextControl
								key={index}
								label={`${__('Krok', 'nevo')} ${index + 1}: ${step.title || '...'}`}
								value={step.duration}
								onChange={(value) => updateStep(index, 'duration', value)}
								placeholder="np. 30 min"
							/>
						))}
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					<div className="nevo-timeline__track">
						{steps.map((step, index) => (
							<div key={index} className="nevo-timeline__step">
								<div className="nevo-timeline__connector">
									<span className="nevo-timeline__number">{index + 1}</span>
									{index < steps.length - 1 && <span className="nevo-timeline__line" />}
								</div>
								<div className="nevo-timeline__card">
									<span className="nevo-timeline__duration">{step.duration}</span>
									<RichText
										tagName="h4"
										className="nevo-timeline__title"
										value={step.title}
										onChange={(value) => updateStep(index, 'title', value)}
										placeholder={__('Tytuł kroku', 'nevo')}
									/>
									<RichText
										tagName="p"
										className="nevo-timeline__description"
										value={step.description}
										onChange={(value) => updateStep(index, 'description', value)}
										placeholder={__('Opis kroku...', 'nevo')}
									/>
									<Button
										variant="link"
										isDestructive
										onClick={() => removeStep(index)}
										className="nevo-timeline__remove"
									>
										{__('Usuń', 'nevo')}
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { steps, orientation } = attributes;
		const blockProps = useBlockProps.save({
			className: `nevo-timeline nevo-timeline--${orientation}`,
		});

		return (
			<div {...blockProps}>
				<div className="nevo-timeline__track">
					{steps.map((step, index) => (
						<div key={index} className="nevo-timeline__step">
							<div className="nevo-timeline__connector">
								<span className="nevo-timeline__number">{index + 1}</span>
								{index < steps.length - 1 && <span className="nevo-timeline__line" />}
							</div>
							<div className="nevo-timeline__card">
								<span className="nevo-timeline__duration">{step.duration}</span>
								<RichText.Content tagName="h4" className="nevo-timeline__title" value={step.title} />
								<RichText.Content tagName="p" className="nevo-timeline__description" value={step.description} />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	},
});
