import { createRoot } from '@wordpress/element';

const StaszekChat = ({ apiEndpoint, bookingUrl, welcomeMessage, position }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: 'assistant', content: welcomeMessage }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      const data = await response.json();

      if (data.content) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Ups, coś poszło nie tak. Spróbuj jeszcze raz lub napisz do nas bezpośrednio.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    'Czym się zajmujecie?',
    'Ile to kosztuje?',
    'Chcę umówić rozmowę'
  ];

  const handleQuickReply = (text) => {
    setInput(text);
    setTimeout(() => {
      const form = document.querySelector('.staszek-form');
      if (form) form.requestSubmit();
    }, 100);
  };

  const positionClass = position === 'bottom-left' ? 'staszek-chat--left' : '';

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`staszek-bubble ${position === 'bottom-left' ? 'staszek-bubble--left' : ''}`}
          aria-label="Otwórz czat ze Staszkiem"
        >
          <div className="staszek-bubble__avatar">S</div>
          <div className="staszek-bubble__text">
            <span className="staszek-bubble__name">Staszek</span>
            <span className="staszek-bubble__status">Odpowiem w kilka sekund</span>
          </div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={`staszek-chat ${positionClass}`}>
          {/* Header */}
          <div className="staszek-header">
            <div className="staszek-header__info">
              <div className="staszek-header__avatar">S</div>
              <div>
                <div className="staszek-header__name">Staszek</div>
                <div className="staszek-header__status">
                  <span className="staszek-header__dot"></span>
                  Asystent NEVO
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="staszek-header__close"
              aria-label="Zamknij czat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="staszek-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`staszek-message staszek-message--${msg.role}`}
              >
                {msg.role === 'assistant' && (
                  <div className="staszek-message__avatar">S</div>
                )}
                <div className="staszek-message__bubble">
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="staszek-message staszek-message--assistant">
                <div className="staszek-message__avatar">S</div>
                <div className="staszek-message__bubble staszek-message__bubble--typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="staszek-quick">
              {quickReplies.map((text, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(text)}
                  className="staszek-quick__btn"
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={sendMessage} className="staszek-input staszek-form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napisz wiadomość..."
              disabled={isLoading}
              className="staszek-input__field"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="staszek-input__send"
              aria-label="Wyślij"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <div className="staszek-footer">
            <span>Wolisz rozmowę?</span>
            <a href={bookingUrl} className="staszek-footer__link">
              Umów się z Andrzejem →
            </a>
          </div>
        </div>
      )}
    </>
  );
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.nevo-staszek-chat');

  blocks.forEach((block) => {
    const props = {
      apiEndpoint: block.dataset.apiEndpoint || 'https://n8n.nevomarketing.pl/webhook/staszek-chat',
      bookingUrl: block.dataset.bookingUrl || '#kontakt',
      welcomeMessage: block.dataset.welcomeMessage || 'Cześć! Jestem Staszek z NEVO. W czym mogę pomóc?',
      position: block.dataset.position || 'bottom-right'
    };

    const root = createRoot(block);
    root.render(<StaszekChat {...props} />);
  });
});
