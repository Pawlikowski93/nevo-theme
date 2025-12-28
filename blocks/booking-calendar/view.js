import { createRoot } from '@wordpress/element';

const BookingCalendar = ({ title, subtitle, apiBase }) => {
	const [step, setStep] = React.useState(1);
	const [availableDates, setAvailableDates] = React.useState([]);
	const [selectedDate, setSelectedDate] = React.useState(null);
	const [slots, setSlots] = React.useState([]);
	const [selectedSlot, setSelectedSlot] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [bookingResult, setBookingResult] = React.useState(null);

	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		phone: '',
		company: '',
		topic: '',
		marketing_consent: false,
		terms_consent: false
	});

	React.useEffect(() => {
		fetchAvailableDates();
	}, []);

	const fetchAvailableDates = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${apiBase}/available-slots`);
			const data = await response.json();
			setAvailableDates(data.availableDates || []);
		} catch (err) {
			setError('Nie udało się pobrać dostępnych terminów. Spróbuj ponownie.');
		} finally {
			setLoading(false);
		}
	};

	const fetchSlotsForDate = async (date) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`${apiBase}/available-slots?date=${date}`);
			const data = await response.json();
			setSlots(data.slots?.filter(s => s.available) || []);
		} catch (err) {
			setError('Nie udało się pobrać wolnych godzin. Spróbuj ponownie.');
		} finally {
			setLoading(false);
		}
	};

	const handleDateSelect = (date) => {
		setSelectedDate(date);
		setSelectedSlot(null);
		fetchSlotsForDate(date.date);
		setStep(2);
	};

	const handleSlotSelect = (slot) => {
		setSelectedSlot(slot);
		setStep(3);
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${apiBase}/book-consultation`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					date: selectedDate.date,
					time: selectedSlot.time
				})
			});

			const data = await response.json();

			if (data.success) {
				setBookingResult(data.booking);
				setStep(4);
			} else {
				setError(data.message || 'Wystąpił błąd podczas rezerwacji.');
				if (data.error === 'SLOT_TAKEN') {
					fetchSlotsForDate(selectedDate.date);
					setStep(2);
				}
			}
		} catch (err) {
			setError('Nie udało się dokonać rezerwacji. Spróbuj ponownie.');
		} finally {
			setLoading(false);
		}
	};

	const resetBooking = () => {
		setStep(1);
		setSelectedDate(null);
		setSelectedSlot(null);
		setBookingResult(null);
		setFormData({
			name: '', email: '', phone: '', company: '', topic: '',
			marketing_consent: false, terms_consent: false
		});
		fetchAvailableDates();
	};

	const BackIcon = () => (
		<svg className="nevo-booking__icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
		</svg>
	);

	const CalendarIcon = () => (
		<svg className="nevo-booking__icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>
	);

	const CheckIcon = () => (
		<svg className="nevo-booking__icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
		</svg>
	);

	const VideoIcon = () => (
		<svg className="nevo-booking__icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
		</svg>
	);

	const renderDateSelection = () => (
		<div className="nevo-booking__step">
			<h3 className="nevo-booking__step-title">Wybierz dzień</h3>
			{loading ? (
				<div className="nevo-booking__loader">
					<div className="nevo-booking__spinner"></div>
				</div>
			) : (
				<div className="nevo-booking__dates">
					{availableDates.map((date) => (
						<button
							key={date.date}
							onClick={() => handleDateSelect(date)}
							className="nevo-booking__date-btn"
						>
							<span className="nevo-booking__date-day">{date.dayShort}</span>
							<span className="nevo-booking__date-num">{date.dayOfMonth}</span>
							<span className="nevo-booking__date-month">{date.month}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);

	const renderSlotSelection = () => (
		<div className="nevo-booking__step">
			<button onClick={() => setStep(1)} className="nevo-booking__back-btn">
				<BackIcon /> Zmień dzień
			</button>
			<h3 className="nevo-booking__step-title">Wybierz godzinę</h3>
			<p className="nevo-booking__step-info">
				{selectedDate?.dayName}, {selectedDate?.dayOfMonth} {selectedDate?.month}
			</p>
			{loading ? (
				<div className="nevo-booking__loader">
					<div className="nevo-booking__spinner"></div>
				</div>
			) : slots.length === 0 ? (
				<div className="nevo-booking__empty">
					Brak wolnych terminów w tym dniu.
					<button onClick={() => setStep(1)} className="nevo-booking__link">Wybierz inny dzień</button>
				</div>
			) : (
				<div className="nevo-booking__slots">
					{slots.map((slot) => (
						<button
							key={slot.time}
							onClick={() => handleSlotSelect(slot)}
							className="nevo-booking__slot-btn"
						>
							{slot.time}
						</button>
					))}
				</div>
			)}
		</div>
	);

	const renderForm = () => (
		<div className="nevo-booking__step">
			<button onClick={() => setStep(2)} className="nevo-booking__back-btn">
				<BackIcon /> Zmień godzinę
			</button>

			<div className="nevo-booking__selected">
				<div className="nevo-booking__selected-icon">
					<CalendarIcon />
				</div>
				<div className="nevo-booking__selected-info">
					<div className="nevo-booking__selected-date">
						{selectedDate?.dayName}, {selectedDate?.dayOfMonth} {selectedDate?.month}
					</div>
					<div className="nevo-booking__selected-time">{selectedSlot?.time}</div>
				</div>
			</div>

			<h3 className="nevo-booking__step-title">Twoje dane</h3>

			<form onSubmit={handleSubmit} className="nevo-booking__form">
				<div className="nevo-booking__field">
					<label className="nevo-booking__label">Imię i nazwisko *</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
						className="nevo-booking__input"
						placeholder="Jan Kowalski"
					/>
				</div>

				<div className="nevo-booking__field">
					<label className="nevo-booking__label">Email *</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						className="nevo-booking__input"
						placeholder="jan@firma.pl"
					/>
				</div>

				<div className="nevo-booking__field">
					<label className="nevo-booking__label">Telefon *</label>
					<input
						type="tel"
						name="phone"
						value={formData.phone}
						onChange={handleInputChange}
						required
						className="nevo-booking__input"
						placeholder="+48 123 456 789"
					/>
				</div>

				<div className="nevo-booking__field">
					<label className="nevo-booking__label">Firma (opcjonalnie)</label>
					<input
						type="text"
						name="company"
						value={formData.company}
						onChange={handleInputChange}
						className="nevo-booking__input"
						placeholder="Nazwa firmy"
					/>
				</div>

				<div className="nevo-booking__field">
					<label className="nevo-booking__label">O czym chcesz porozmawiać?</label>
					<textarea
						name="topic"
						value={formData.topic}
						onChange={handleInputChange}
						rows={3}
						className="nevo-booking__textarea"
						placeholder="Krótko opisz temat rozmowy..."
					/>
				</div>

				<div className="nevo-booking__consents">
					<label className="nevo-booking__checkbox">
						<input
							type="checkbox"
							name="marketing_consent"
							checked={formData.marketing_consent}
							onChange={handleInputChange}
							required
						/>
						<span>Wyrażam zgodę na kontakt marketingowy od NEVO *</span>
					</label>

					<label className="nevo-booking__checkbox">
						<input
							type="checkbox"
							name="terms_consent"
							checked={formData.terms_consent}
							onChange={handleInputChange}
							required
						/>
						<span>Akceptuję <a href="/regulamin">regulamin</a> i <a href="/polityka-prywatnosci">politykę prywatności</a> *</span>
					</label>
				</div>

				<button type="submit" disabled={loading} className="nevo-booking__submit">
					{loading ? (
						<>
							<div className="nevo-booking__spinner nevo-booking__spinner--small"></div>
							Rezerwuję...
						</>
					) : 'Zarezerwuj konsultację'}
				</button>
			</form>
		</div>
	);

	const renderConfirmation = () => (
		<div className="nevo-booking__step nevo-booking__step--center">
			<div className="nevo-booking__success-icon">
				<CheckIcon />
			</div>

			<h3 className="nevo-booking__success-title">Rezerwacja potwierdzona!</h3>
			<p className="nevo-booking__success-text">
				Wysłaliśmy potwierdzenie na {bookingResult?.email}
			</p>

			<div className="nevo-booking__summary">
				<div className="nevo-booking__summary-row">
					<span>Data:</span>
					<strong>{bookingResult?.formattedDate}</strong>
				</div>
				<div className="nevo-booking__summary-row">
					<span>Godzina:</span>
					<strong>{bookingResult?.time}</strong>
				</div>
				<div className="nevo-booking__summary-row">
					<span>Czas trwania:</span>
					<strong>30 minut</strong>
				</div>

				{bookingResult?.meetLink && (
					<a
						href={bookingResult.meetLink}
						target="_blank"
						rel="noopener noreferrer"
						className="nevo-booking__meet-btn"
					>
						<VideoIcon />
						Dołącz do Google Meet
					</a>
				)}
			</div>

			<p className="nevo-booking__note">
				Link do spotkania znajdziesz również w zaproszeniu kalendarzowym.
			</p>

			<button onClick={resetBooking} className="nevo-booking__link">
				Zarezerwuj kolejne spotkanie
			</button>
		</div>
	);

	return (
		<div className="nevo-booking">
			<div className="nevo-booking__header">
				<h2 className="nevo-booking__title">{title}</h2>
				<p className="nevo-booking__subtitle">{subtitle}</p>
			</div>

			{step < 4 && (
				<div className="nevo-booking__progress">
					{[1, 2, 3].map((s) => (
						<div
							key={s}
							className={`nevo-booking__progress-dot ${
								s === step ? 'nevo-booking__progress-dot--active' :
								s < step ? 'nevo-booking__progress-dot--done' : ''
							}`}
						/>
					))}
				</div>
			)}

			{error && (
				<div className="nevo-booking__error">{error}</div>
			)}

			{step === 1 && renderDateSelection()}
			{step === 2 && renderSlotSelection()}
			{step === 3 && renderForm()}
			{step === 4 && renderConfirmation()}

			<div className="nevo-booking__footer">
				<p>Odpowiemy w ciągu 24 godzin • Video call przez Google Meet</p>
			</div>
		</div>
	);
};

document.addEventListener('DOMContentLoaded', () => {
	const blocks = document.querySelectorAll('.nevo-booking-calendar');

	blocks.forEach((block) => {
		const title = block.dataset.title || 'Umów bezpłatną konsultację';
		const subtitle = block.dataset.subtitle || '30 minut rozmowy o Twoim biznesie. Bez zobowiązań.';
		const apiBase = block.dataset.apiBase || 'https://n8n.nevomarketing.pl/webhook';

		const root = createRoot(block);
		root.render(
			<BookingCalendar
				title={title}
				subtitle={subtitle}
				apiBase={apiBase}
			/>
		);
	});
});
