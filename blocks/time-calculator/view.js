import { render, useState, useEffect } from '@wordpress/element';

const Calculator = ({ hourlyRate, ctaText, ctaUrl }) => {
	const [calls, setCalls] = useState(10);
	const [callDuration, setCallDuration] = useState(5);
	const [emails, setEmails] = useState(15);
	const [emailDuration, setEmailDuration] = useState(5);
	const [manualEntry, setManualEntry] = useState(false);
	const [entries, setEntries] = useState(10);
	const [isAnimating, setIsAnimating] = useState(false);

	const weeklyMinutes =
		calls * callDuration +
		emails * emailDuration +
		(manualEntry ? entries * 5 : 0);

	const monthlyHours = Math.round((weeklyMinutes * 4.3) / 60);
	const yearlyHours = monthlyHours * 12;
	const yearlyDays = Math.round(yearlyHours / 8);
	const monthlyValue = monthlyHours * hourlyRate;

	const maxHours = 80;
	const progressPercent = Math.min((monthlyHours / maxHours) * 100, 100);

	useEffect(() => {
		setIsAnimating(true);
		const timer = setTimeout(() => setIsAnimating(false), 300);
		return () => clearTimeout(timer);
	}, [monthlyHours]);

	const getProgressColor = () => {
		if (progressPercent < 25) return '#22c55e';
		if (progressPercent < 50) return '#eab308';
		if (progressPercent < 75) return '#f97316';
		return '#ef4444';
	};

	return (
		<div className="nevo-calculator__form">
			<div className="nevo-calculator__inputs">
				<div className="nevo-calculator__field">
					<label className="nevo-calculator__label">
						Ile razy w tygodniu klienci dzwonią?
						<span className="nevo-calculator__value">{calls}</span>
					</label>
					<input
						type="range"
						min="0"
						max="30"
						value={calls}
						onChange={(e) => setCalls(Number(e.target.value))}
						className="nevo-calculator__slider"
					/>
				</div>

				<div className="nevo-calculator__field">
					<label className="nevo-calculator__label">
						Ile minut trwa rozmowa?
					</label>
					<select
						value={callDuration}
						onChange={(e) => setCallDuration(Number(e.target.value))}
						className="nevo-calculator__select"
					>
						<option value="3">3 minuty</option>
						<option value="5">5 minut</option>
						<option value="8">8 minut</option>
						<option value="10">10 minut</option>
						<option value="15">15 minut</option>
					</select>
				</div>

				<div className="nevo-calculator__field">
					<label className="nevo-calculator__label">
						Ile maili wysyłasz ręcznie tygodniowo?
						<span className="nevo-calculator__value">{emails}</span>
					</label>
					<input
						type="range"
						min="0"
						max="50"
						value={emails}
						onChange={(e) => setEmails(Number(e.target.value))}
						className="nevo-calculator__slider"
					/>
				</div>

				<div className="nevo-calculator__field">
					<label className="nevo-calculator__label">
						Ile minut zajmuje jeden mail?
					</label>
					<select
						value={emailDuration}
						onChange={(e) => setEmailDuration(Number(e.target.value))}
						className="nevo-calculator__select"
					>
						<option value="2">2 minuty</option>
						<option value="5">5 minut</option>
						<option value="10">10 minut</option>
						<option value="15">15 minut</option>
					</select>
				</div>

				<div className="nevo-calculator__field nevo-calculator__field--checkbox">
					<label className="nevo-calculator__checkbox-label">
						<input
							type="checkbox"
							checked={manualEntry}
							onChange={(e) => setManualEntry(e.target.checked)}
							className="nevo-calculator__checkbox"
						/>
						<span>Czy ręcznie wprowadzasz dane do kalendarza?</span>
					</label>
				</div>

				{manualEntry && (
					<div className="nevo-calculator__field nevo-calculator__field--indent">
						<label className="nevo-calculator__label">
							Ile razy tygodniowo?
							<span className="nevo-calculator__value">{entries}</span>
						</label>
						<input
							type="range"
							min="0"
							max="20"
							value={entries}
							onChange={(e) => setEntries(Number(e.target.value))}
							className="nevo-calculator__slider"
						/>
					</div>
				)}
			</div>

			<div className="nevo-calculator__results">
				<div className="nevo-calculator__progress">
					<div className="nevo-calculator__progress-bar">
						<div
							className="nevo-calculator__progress-fill"
							style={{
								width: `${progressPercent}%`,
								backgroundColor: getProgressColor(),
							}}
						/>
					</div>
					<div className="nevo-calculator__progress-labels">
						<span>0h</span>
						<span>20h</span>
						<span>40h</span>
						<span>60h</span>
						<span>80h+</span>
					</div>
				</div>

				<div className={`nevo-calculator__stats ${isAnimating ? 'is-animating' : ''}`}>
					<div className="nevo-calculator__stat nevo-calculator__stat--primary">
						<span className="nevo-calculator__stat-value">{monthlyHours}</span>
						<span className="nevo-calculator__stat-label">godzin miesięcznie</span>
					</div>

					<div className="nevo-calculator__stat">
						<span className="nevo-calculator__stat-value">{yearlyHours}</span>
						<span className="nevo-calculator__stat-label">godzin rocznie</span>
						<span className="nevo-calculator__stat-sub">= {yearlyDays} dni roboczych</span>
					</div>

					<div className="nevo-calculator__stat nevo-calculator__stat--money">
						<span className="nevo-calculator__stat-value">{monthlyValue.toLocaleString('pl-PL')}</span>
						<span className="nevo-calculator__stat-label">PLN/miesiąc</span>
						<span className="nevo-calculator__stat-sub">wartość Twojego czasu</span>
					</div>
				</div>

				{monthlyHours > 0 && (
					<a href={ctaUrl} className="nevo-calculator__cta">
						{ctaText}
					</a>
				)}
			</div>
		</div>
	);
};

document.addEventListener('DOMContentLoaded', () => {
	const calculators = document.querySelectorAll('.nevo-calculator');

	calculators.forEach((container) => {
		const appContainer = container.querySelector('[data-calculator="true"]');
		if (!appContainer) return;

		const hourlyRate = parseInt(container.dataset.hourlyRate, 10) || 100;
		const ctaText = container.dataset.ctaText || 'Pokaż mi jak to zautomatyzować';
		const ctaUrl = container.dataset.ctaUrl || '#kontakt';

		render(
			<Calculator hourlyRate={hourlyRate} ctaText={ctaText} ctaUrl={ctaUrl} />,
			appContainer
		);
	});
});
