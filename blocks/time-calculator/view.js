import { createRoot } from '@wordpress/element';

const TimeCalculator = ({ title, subtitle, ctaText, ctaUrl, hourlyRate: defaultHourlyRate }) => {
	const [phoneCalls, setPhoneCalls] = React.useState(5);
	const [callDuration, setCallDuration] = React.useState(8);
	const [manualEmails, setManualEmails] = React.useState(10);
	const [emailDuration, setEmailDuration] = React.useState(5);
	const [hourlyRate, setHourlyRate] = React.useState(defaultHourlyRate);
	const [isAnimating, setIsAnimating] = React.useState(false);

	const results = React.useMemo(() => {
		const phoneMinutesWeekly = phoneCalls * callDuration;
		const emailMinutesWeekly = manualEmails * emailDuration;
		const totalMinutesWeekly = phoneMinutesWeekly + emailMinutesWeekly;

		const hoursMonthly = Math.round((totalMinutesWeekly * 4.33) / 60);
		const hoursYearly = hoursMonthly * 12;
		const workDays = Math.round(hoursYearly / 8);
		const moneySaved = hoursYearly * hourlyRate;

		return {
			minutesWeekly: totalMinutesWeekly,
			hoursMonthly,
			hoursYearly,
			workDays,
			moneySaved
		};
	}, [phoneCalls, callDuration, manualEmails, emailDuration, hourlyRate]);

	const handleSliderChange = (setter) => (e) => {
		setter(parseInt(e.target.value));
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 300);
	};

	const SliderInput = ({ label, value, onChange, min, max, unit, icon }) => (
		<div className="nevo-calc__slider-group">
			<div className="nevo-calc__slider-header">
				<label className="nevo-calc__slider-label">
					<span className="nevo-calc__slider-icon">{icon}</span>
					{label}
				</label>
				<div className="nevo-calc__slider-value">
					<span className="nevo-calc__slider-number">{value}</span>
					<span className="nevo-calc__slider-unit">{unit}</span>
				</div>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				onChange={onChange}
				className="nevo-calc__slider"
				style={{
					background: `linear-gradient(to right, var(--nevo-accent) 0%, var(--nevo-accent) ${((value - min) / (max - min)) * 100}%, var(--nevo-gray-light) ${((value - min) / (max - min)) * 100}%, var(--nevo-gray-light) 100%)`
				}}
			/>
			<div className="nevo-calc__slider-range">
				<span>{min}</span>
				<span>{max}</span>
			</div>
		</div>
	);

	return (
		<div className="nevo-calc">
			<div className="nevo-calc__header">
				<h2 className="nevo-calc__title">{title}</h2>
				<p className="nevo-calc__subtitle">{subtitle}</p>
			</div>

			<div className="nevo-calc__grid">
				<div className="nevo-calc__inputs">
					<h3 className="nevo-calc__panel-title">
						<span className="nevo-calc__panel-icon">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</span>
						Twoja codzienna rzeczywistość
					</h3>

					<SliderInput
						label="Ile telefonów z pytaniami odbierasz?"
						value={phoneCalls}
						onChange={handleSliderChange(setPhoneCalls)}
						min={0}
						max={20}
						unit="/tyg."
						icon="📞"
					/>

					<SliderInput
						label="Średni czas jednej rozmowy"
						value={callDuration}
						onChange={handleSliderChange(setCallDuration)}
						min={2}
						max={20}
						unit="min"
						icon="⏱️"
					/>

					<SliderInput
						label="Ile maili z ofertą piszesz ręcznie?"
						value={manualEmails}
						onChange={handleSliderChange(setManualEmails)}
						min={0}
						max={30}
						unit="/tyg."
						icon="📧"
					/>

					<SliderInput
						label="Czas na napisanie jednego maila"
						value={emailDuration}
						onChange={handleSliderChange(setEmailDuration)}
						min={2}
						max={15}
						unit="min"
						icon="✍️"
					/>

					<SliderInput
						label="Twoja stawka godzinowa"
						value={hourlyRate}
						onChange={handleSliderChange(setHourlyRate)}
						min={50}
						max={500}
						unit="zł/h"
						icon="💰"
					/>
				</div>

				<div className="nevo-calc__results">
					<h3 className="nevo-calc__panel-title nevo-calc__panel-title--light">
						<span className="nevo-calc__panel-icon nevo-calc__panel-icon--accent">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</span>
						Twoje wyniki
					</h3>

					<div className={`nevo-calc__main-result ${isAnimating ? 'nevo-calc__main-result--animating' : ''}`}>
						<div className="nevo-calc__main-number">{results.hoursMonthly}</div>
						<div className="nevo-calc__main-label">godzin miesięcznie</div>
					</div>

					<div className="nevo-calc__stats">
						<div className="nevo-calc__stat">
							<span className="nevo-calc__stat-label">Rocznie to:</span>
							<span className="nevo-calc__stat-value">{results.hoursYearly} godzin</span>
						</div>

						<div className="nevo-calc__stat">
							<span className="nevo-calc__stat-label">Czyli:</span>
							<span className="nevo-calc__stat-value nevo-calc__stat-value--accent">{results.workDays} dni roboczych</span>
						</div>

						<div className="nevo-calc__stat nevo-calc__stat--last">
							<span className="nevo-calc__stat-label">Wartość Twojego czasu*:</span>
							<span className="nevo-calc__stat-value">{results.moneySaved.toLocaleString('pl-PL')} zł</span>
						</div>
					</div>

					<p className="nevo-calc__footnote">
						* Obliczone na podstawie Twojej stawki godzinowej
					</p>

					<div className="nevo-calc__bar-container">
						<div className="nevo-calc__bar-label">Stracony czas w skali roku:</div>
						<div className="nevo-calc__bar">
							<div
								className="nevo-calc__bar-fill"
								style={{ width: `${Math.min((results.workDays / 30) * 100, 100)}%` }}
							/>
						</div>
						<div className="nevo-calc__bar-range">
							<span>0 dni</span>
							<span>30 dni</span>
						</div>
					</div>
				</div>
			</div>

			<div className="nevo-calc__cta">
				<h3 className="nevo-calc__cta-title">
					{results.workDays} dni rocznie to za dużo?
				</h3>
				<p className="nevo-calc__cta-text">
					Sprawdźmy, które z tych zadań można zautomatyzować w Twoim biznesie.
					Bezpłatna konsultacja, bez zobowiązań.
				</p>
				<a href={ctaUrl} className="nevo-calc__cta-button">
					{ctaText}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>

			<p className="nevo-calc__privacy">
				Dane są przetwarzane lokalnie w Twojej przeglądarce. Nic nie zapisujemy.
			</p>
		</div>
	);
};

document.addEventListener('DOMContentLoaded', () => {
	const blocks = document.querySelectorAll('.nevo-time-calculator');

	blocks.forEach((block) => {
		const title = block.dataset.title || 'Ile czasu tracisz na powtarzalne zadania?';
		const subtitle = block.dataset.subtitle || 'Przesuń suwaki i zobacz, ile godzin możesz odzyskać';
		const ctaText = block.dataset.ctaText || 'Odzyskaj swój czas';
		const ctaUrl = block.dataset.ctaUrl || '#kontakt';
		const hourlyRate = parseInt(block.dataset.hourlyRate) || 100;

		const root = createRoot(block);
		root.render(
			<TimeCalculator
				title={title}
				subtitle={subtitle}
				ctaText={ctaText}
				ctaUrl={ctaUrl}
				hourlyRate={hourlyRate}
			/>
		);
	});
});
