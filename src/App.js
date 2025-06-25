import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [timelineEvents, setTimelineEvents] = useState([
    { date: '23 February 2025', description: 'Made it official', photo: '/mem1.jpeg' },
    { date: '4 March 2025', description: 'Went on our first date', photo: '/mem2.jpg' },
    { date: '2023-2024', description: 'Nationals', photo: '/mem3.jpg' },
    { date: '25 March 2025', description: "Emy's First Birthday with Ron", photo: '/mem9.jpeg' },
    { date: '29 May 2025', description: 'Emy Graduation Night with Ron', photo: '/mem20.jpg' },
    { date: '15-16 June 2025', description: 'Gas Motor Show Together', photo: '/mem23.jpeg' },
    { date: '22 June 2025', description: 'First Proper Nap', photo: '/mem24.jpeg' },
  ]);
  const [albumPhotos, setAlbumPhotos] = useState([
    '/mem1.jpeg','/mem2.jpg','/mem3.jpg','/mem4.jpg','/mem5.jpg','/mem6.jpeg',
    '/mem7.jpg','/mem8.jpg','/mem9.jpeg','/mem10.jpeg','/mem11.jpg','/mem12.jpeg',
    '/mem13.jpeg','/mem14.jpg','/mem15.jpg','/mem16.jpeg','/mem17.jpeg','/mem18.jpg',
    '/mem19.jpg','/mem20.jpg','/mem21.jpeg','/mem22.jpeg','/mem23.jpeg','/mem24.jpeg'
  ]);
  const [dontForgetList, setDontForgetList] = useState(() => {
    const stored = localStorage.getItem('dontForgetList');
    return stored ? JSON.parse(stored) : [];
  });

  // Load album photos from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('albumPhotos');
    if (stored) {
      setAlbumPhotos(JSON.parse(stored));
    }
  }, []);
  // Save album photos to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('albumPhotos', JSON.stringify(albumPhotos));
  }, [albumPhotos]);

  // Load timeline events from localStorage on mount
  React.useEffect(() => {
    const storedEvents = localStorage.getItem('timelineEvents');
    if (storedEvents) {
      setTimelineEvents(JSON.parse(storedEvents));
    }
  }, []);
  // Save timeline events to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('timelineEvents', JSON.stringify(timelineEvents));
  }, [timelineEvents]);

  // Save dont forget list to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('dontForgetList', JSON.stringify(dontForgetList));
  }, [dontForgetList]);

  // --- Home Page ---
  const renderHomePage = () => (
    <div className="home-fancy">
      <h1>Welcome to Our Love App!</h1>
      <p>Use the menu to explore our journey together.</p>
      <div className="photo-gallery">
        <img className="photo-placeholder" src="/0c967293-a6bb-475a-bf6a-b2f7c459a878.jpeg" alt="Memory 1" />
        <img className="photo-placeholder" src="/Image 2.jpeg" alt="Memory 2" />
        <img className="photo-placeholder" src="/Image 3.jpeg" alt="Memory 3" />
      </div>
      <p className="home-quote">“I Love You The Most And Always Will -Love Emy”</p>
    </div>
  );

  // --- Timeline: view only ---
  const renderTimeline = () => (
    <div className="timeline-container">
      <h2>Our Timeline</h2>
      <div className="timeline">
        {timelineEvents.map((event, idx) => (
          <div className="timeline-month timeline-flex-row" key={idx}>
            <div className="timeline-dot"></div>
            <div className="timeline-content timeline-info">
              <h3>{event.date}</h3>
              <p>{event.description}</p>
            </div>
            <div className="timeline-photo-block">
              {event.photo ? (
                <img src={event.photo} alt="memory" className="timeline-photo" />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Photo Album: view only ---
  const renderMemories = () => (
    <div className="album-container">
      <h2>Photo Album</h2>
      <div className="album-grid">
        {albumPhotos.map((src, idx) => (
          <div className="album-photo-block" key={idx}>
            <img src={src} alt={`Memory ${idx+1}`} className="album-photo" />
          </div>
        ))}
      </div>
      <p className="album-note">More beautiful memories coming soon!</p>
    </div>
  );

  // --- Don't Forget: view only ---
  const renderDontForget = () => (
    <div className="dont-forget-bg">
      <div className="dont-forget-container">
        <h2 className="dont-forget-title">Don't Forget</h2>
        <div className="dont-forget-list">
          {dontForgetList.length === 0 && <div className="dont-forget-empty">Nothing yet!</div>}
          {dontForgetList.map((item, idx) => (
            <div className="dont-forget-item" key={idx}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ...keep all your other renderers and logic unchanged...

  // --- Games Page Routing ---
  const [activeGame, setActiveGame] = useState(null);
  const renderPage = () => {
    switch(page) {
      case 'home':
        return renderHomePage();
      case 'timeline':
        return renderTimeline();
      case 'memories':
        return renderMemories();
      case 'dontforget':
        return renderDontForget();
      // ...other cases unchanged...
      default:
        return renderHomePage();
    }
  };

  // --- Animated Floating Characters ---
  const floatingCharacters = [
    { emoji: '🐻', style: { top: '10%', left: '5%', animationDelay: '0s' } },
    { emoji: '💌', style: { top: '20%', right: '8%', animationDelay: '1.2s' } },
    { emoji: '🌹', style: { bottom: '12%', left: '12%', animationDelay: '2.1s' } },
    { emoji: '🧸', style: { top: '35%', left: '45%', animationDelay: '0.4s' } },
    { emoji: '🍦', style: { top: '50%', left: '2%', animationDelay: '1.7s' } },
    { emoji: '🎈', style: { bottom: '8%', right: '3%', animationDelay: '2.7s' } },
    { emoji: '💖', style: { top: '35%', left: '45%', animationDelay: '0.4s' } },
    { emoji: '🦄', style: { top: '60%', right: '12%', animationDelay: '1.9s' } },
  ];

  return (
    <div className="App">
      {/* Floating animated characters */}
      {floatingCharacters.map((c, i) => (
        <span key={i} className="floating-char" style={c.style}>{c.emoji}</span>
      ))}
      <div className="burger-highlight"></div>
      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>
      {menuOpen && (
        <nav className={`menu menu-open`}>
          <ul>
            <li onClick={() => {setPage('home'); setMenuOpen(false);}}>Home</li>
            <li onClick={() => {setPage('timeline'); setMenuOpen(false);}}>Timeline</li>
            <li onClick={() => {setPage('memories'); setMenuOpen(false);}}>Photo Album</li>
            <li onClick={() => {setPage('spinner'); setMenuOpen(false);}}>Who Loves Who More?</li>
            <li onClick={() => {setPage('slot'); setMenuOpen(false);}}>Whose Gonna Choose?</li>
            <li onClick={() => {setPage('reasons'); setMenuOpen(false);}}>Reasons I Love You</li>
            <li onClick={() => {setPage('games'); setMenuOpen(false);}}>Games</li>
            <li onClick={() => {setPage('dontforget'); setMenuOpen(false);}}>Don't Forget</li>
          </ul>
        </nav>
      )}
      <main>
        {renderPage()}
      </main>
      {/* Register service worker for PWA support */}
      {`serviceWorker` in navigator && (
        <script>
          {`
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/service-worker.js');
            });
          `}
        </script>
      )}
    </div>
  );
}

export default App;