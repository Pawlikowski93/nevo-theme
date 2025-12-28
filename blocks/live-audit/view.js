import { createRoot } from '@wordpress/element';

const LiveAudit = ({ title, subtitle, ctaUrl, apiBase }) => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [report, setReport] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(`${apiBase}/audit-url?url=${encodeURIComponent(url.trim())}`);
      const data = await response.json();

      if (data.success) {
        setReport(data);
      } else {
        setError(data.message || 'Nie udało się przeanalizować strony.');
      }
    } catch (err) {
      setError('Wystąpił błąd połączenia. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const resetAudit = () => {
    setUrl('');
    setReport(null);
    setError(null);
  };

  const ScoreCircle = ({ score, label, size = 'normal' }) => {
    const getColor = (s) => {
      if (s === null) return { stroke: '#d1d5db', text: '#9ca3af' };
      if (s >= 90) return { stroke: '#22c55e', text: '#16a34a' };
      if (s >= 50) return { stroke: '#f59e0b', text: '#d97706' };
      return { stroke: '#ef4444', text: '#dc2626' };
    };

    const colors = getColor(score);
    const r = size === 'large' ? 40 : 32;
    const circumference = 2 * Math.PI * r;
    const offset = score !== null ? circumference - (score / 100) * circumference : circumference;
    const sizeClass = size === 'large' ? 'nevo-audit__score--large' : '';

    return (
      <div className={`nevo-audit__score ${sizeClass}`}>
        <svg className="nevo-audit__score-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} className="nevo-audit__score-bg" />
          <circle
            cx="50" cy="50" r={r}
            className="nevo-audit__score-fill"
            style={{
              stroke: colors.stroke,
              strokeDasharray: circumference,
              strokeDashoffset: offset
            }}
          />
        </svg>
        <span className="nevo-audit__score-value" style={{ color: colors.text }}>
          {score !== null ? score : '?'}
        </span>
        <span className="nevo-audit__score-label">{label}</span>
      </div>
    );
  };

  const CheckItem = ({ passed, label, value }) => (
    <div className="nevo-audit__check">
      <div className={`nevo-audit__check-icon ${passed ? 'nevo-audit__check-icon--pass' : 'nevo-audit__check-icon--fail'}`}>
        {passed ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <div className="nevo-audit__check-content">
        <div className={`nevo-audit__check-label ${!passed ? 'nevo-audit__check-label--fail' : ''}`}>{label}</div>
        {value && <div className="nevo-audit__check-value">{value}</div>}
      </div>
    </div>
  );

  const IssueItem = ({ issue }) => (
    <div className="nevo-audit__issue">
      <span className={`nevo-audit__issue-badge nevo-audit__issue-badge--${issue.severity}`}>
        {issue.severity === 'high' ? 'Krytyczny' : issue.severity === 'medium' ? 'Ważny' : 'Sugestia'}
      </span>
      <span className="nevo-audit__issue-text">{issue.message}</span>
    </div>
  );

  // Form view
  if (!report) {
    return (
      <div className="nevo-audit nevo-audit--form">
        <div className="nevo-audit__header">
          <div className="nevo-audit__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="nevo-audit__title">{title}</h2>
          <p className="nevo-audit__subtitle">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="nevo-audit__form">
          <div className="nevo-audit__input-wrapper">
            <svg className="nevo-audit__input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="np. mojafirma.pl"
              className="nevo-audit__input"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading || !url.trim()} className="nevo-audit__submit">
            {loading ? (
              <>
                <span className="nevo-audit__spinner"></span>
                Analizuję...
              </>
            ) : (
              <>
                Analizuj
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {error && <div className="nevo-audit__error">{error}</div>}

        {loading && (
          <div className="nevo-audit__progress">
            <div className="nevo-audit__progress-item nevo-audit__progress-item--active">
              <span className="nevo-audit__spinner"></span>
              Sprawdzam prędkość ładowania...
            </div>
            <div className="nevo-audit__progress-item">Analizuję SEO...</div>
            <div className="nevo-audit__progress-item">Sprawdzam bezpieczeństwo...</div>
          </div>
        )}

        <div className="nevo-audit__features">
          <span>🔒 Bezpieczne</span>
          <span>⚡ Wynik w 15s</span>
          <span>💰 Za darmo</span>
        </div>
      </div>
    );
  }

  // Report view
  return (
    <div className="nevo-audit nevo-audit--report">
      <div className="nevo-audit__report-header">
        <div>
          <h2 className="nevo-audit__report-title">Raport dla</h2>
          <p className="nevo-audit__report-domain">{report.domain}</p>
        </div>
        <button onClick={resetAudit} className="nevo-audit__close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="nevo-audit__scores">
        <ScoreCircle score={report.scores.performance} label="Wydajność" size="large" />
        <ScoreCircle score={report.scores.seo} label="SEO" size="large" />
        <ScoreCircle score={report.scores.accessibility} label="Dostępność" size="large" />
      </div>

      <div className="nevo-audit__section">
        <h3 className="nevo-audit__section-title">Szybka diagnoza</h3>
        <div className="nevo-audit__checks">
          <CheckItem passed={report.checks.ssl.passed} label={report.checks.ssl.label} value={report.checks.ssl.passed ? 'https://' : 'http://'} />
          <CheckItem passed={report.checks.mobile.passed} label={report.checks.mobile.label} />
          <CheckItem passed={report.checks.loadingTime.passed} label={`Czas ładowania: ${report.checks.loadingTime.label}`} />
          <CheckItem passed={report.seo.h1.passed} label={report.seo.h1.passed ? 'Nagłówek H1 obecny' : 'Brak nagłówka H1'} value={report.seo.h1.value} />
        </div>
      </div>

      <div className="nevo-audit__section">
        <h3 className="nevo-audit__section-title">Analiza SEO</h3>
        <div className="nevo-audit__seo-items">
          <div className="nevo-audit__seo-item">
            <div className="nevo-audit__seo-header">
              <span>Title tag</span>
              <span className={`nevo-audit__seo-badge ${report.seo.title.passed ? 'nevo-audit__seo-badge--pass' : 'nevo-audit__seo-badge--fail'}`}>
                {report.seo.title.length} znaków
              </span>
            </div>
            <p className="nevo-audit__seo-value">
              {report.seo.title.value || <em className="nevo-audit__seo-empty">Brak</em>}
            </p>
          </div>
          <div className="nevo-audit__seo-item">
            <div className="nevo-audit__seo-header">
              <span>Meta description</span>
              <span className={`nevo-audit__seo-badge ${report.seo.description.passed ? 'nevo-audit__seo-badge--pass' : 'nevo-audit__seo-badge--fail'}`}>
                {report.seo.description.length} znaków
              </span>
            </div>
            <p className="nevo-audit__seo-value">
              {report.seo.description.value || <em className="nevo-audit__seo-empty">Brak</em>}
            </p>
          </div>
        </div>
      </div>

      {report.issues.length > 0 && (
        <div className="nevo-audit__section nevo-audit__section--issues">
          <h3 className="nevo-audit__section-title">
            <span className="nevo-audit__issue-count">{report.issueCount}</span>
            {report.summary}
          </h3>
          <div className="nevo-audit__issues">
            {report.issues.map((issue, index) => (
              <IssueItem key={index} issue={issue} />
            ))}
          </div>
        </div>
      )}

      <div className="nevo-audit__cta">
        <h3 className="nevo-audit__cta-title">
          {report.issueCount > 0 ? 'Chcesz naprawić te problemy?' : 'Chcesz jeszcze lepsze wyniki?'}
        </h3>
        <p className="nevo-audit__cta-text">
          Umów bezpłatną konsultację. Omówimy Twój raport i pokażemy, jak poprawić widoczność i konwersje.
        </p>
        <div className="nevo-audit__cta-buttons">
          <a href={ctaUrl} className="nevo-audit__cta-primary">
            Umów rozmowę
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <button onClick={resetAudit} className="nevo-audit__cta-secondary">
            Sprawdź inną stronę
          </button>
        </div>
      </div>
    </div>
  );
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nevo-live-audit');

  blocks.forEach((block) => {
    const props = {
      title: block.dataset.title || 'Sprawdź swoją stronę za darmo',
      subtitle: block.dataset.subtitle || 'Wpisz adres strony i w 15 sekund dowiedz się, co można poprawić',
      ctaUrl: block.dataset.ctaUrl || '#kontakt',
      apiBase: block.dataset.apiBase || 'https://n8n.nevomarketing.pl/webhook'
    };

    const root = createRoot(block);
    root.render(<LiveAudit {...props} />);
  });
});
