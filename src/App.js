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
  const [newEvent, setNewEvent] = useState({ date: '', description: '', photo: null });
  const [newEventPhoto, setNewEventPhoto] = useState(null);
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
  const [newDontForget, setNewDontForget] = useState("");
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");

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

  // Photo Upload Handlers
  const handlePhotoChange = (idx, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedEvents = [...timelineEvents];
      updatedEvents[idx].photo = reader.result;
      setTimelineEvents(updatedEvents);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleNewEventPhotoChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewEventPhoto(reader.result);
      setNewEvent({ ...newEvent, photo: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddAlbumPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAlbumPhotos(prev => [...prev, reader.result]);
    };
    reader.readAsDataURL(file);
  };

  // Timeline Event Handlers
  const addTimelineEvent = () => {
    if (newEvent.date && newEvent.description) {
      setTimelineEvents([
        ...timelineEvents,
        { ...newEvent, photo: newEvent.photo || null }
      ]);
      setNewEvent({ date: '', description: '', photo: null });
      setNewEventPhoto(null);
    }
  };

  // Don't Forget Handlers
  const addDontForget = () => {
    if (newDontForget.trim()) {
      setDontForgetList([...dontForgetList, newDontForget.trim()]);
      setNewDontForget("");
    }
  };
  const deleteDontForget = idx => {
    setDontForgetList(dontForgetList.filter((_, i) => i !== idx));
  };
  const startEditDontForget = (idx, val) => {
    setEditIdx(idx);
    setEditValue(val);
  };
  const saveEditDontForget = idx => {
    if (editValue.trim()) {
      setDontForgetList(dontForgetList.map((item, i) => i === idx ? editValue.trim() : item));
      setEditIdx(null);
      setEditValue("");
    }
  };
  const cancelEditDontForget = () => {
    setEditIdx(null);
    setEditValue("");
  };

  // Page Renderers
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
              ) : (
                <label className="photo-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => handlePhotoChange(idx, e.target.files[0])}
                  />
                  <span className="add-photo-btn">+ Add Photo</span>
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="add-event-form">
        <input
          type="text"
          placeholder="Date (e.g. 1 July 2025)"
          value={newEvent.date}
          onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <label className="photo-upload-label">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => handleNewEventPhotoChange(e.target.files[0])}
          />
          <span className="add-photo-btn">{newEventPhoto ? 'Photo Added' : '+ Add Photo'}</span>
        </label>
        <button className="add-month-btn" onClick={addTimelineEvent}>+ Add Event</button>
      </div>
    </div>
  );

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
      <label className="add-photo-label">
        <input type="file" accept="image/*" style={{display:'none'}} onChange={handleAddAlbumPhoto} />
        <span className="add-photo-btn">+ Add Photo</span>
      </label>
      <p className="album-note">More beautiful memories coming soon!</p>
    </div>
  );

  const renderDontForget = () => (
    <div className="dont-forget-bg">
      <div className="dont-forget-container">
        <h2 className="dont-forget-title">Don't Forget</h2>
        <p className="dont-forget-desc">Add, edit, or remove things you don't want to forget!</p>
        <div className="dont-forget-list">
          {dontForgetList.length === 0 && <div className="dont-forget-empty">Nothing yet! Add your first item below.</div>}
          {dontForgetList.map((item, idx) => (
            <div className="dont-forget-item" key={idx}>
              {editIdx === idx ? (
                <>
                  <input className="dont-forget-edit" value={editValue} onChange={e=>setEditValue(e.target.value)} />
                  <button className="dont-forget-save" onClick={()=>saveEditDontForget(idx)}>Save</button>
                  <button className="dont-forget-cancel" onClick={cancelEditDontForget}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <button className="dont-forget-edit-btn" onClick={()=>startEditDontForget(idx, item)}>Edit</button>
                  <button className="dont-forget-delete" onClick={()=>deleteDontForget(idx)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="dont-forget-add-row">
          <input className="dont-forget-input" value={newDontForget} onChange={e=>setNewDontForget(e.target.value)} placeholder="Add something not to forget..." />
          <button className="dont-forget-add" onClick={addDontForget}>Add</button>
        </div>
      </div>
    </div>
  );

  // Spinner Wheel (rigged)
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState('');
  const [wheelRotation, setWheelRotation] = useState(0);
  const spinWheel = () => {
    setSpinning(true);
    // Always land with the pink (Emy) half (right side, 270deg) at the top
    const spins = 5; // number of full spins
    const emyAngle = 270; // Pink (Emy) half and label at 270deg (right, will rotate to top)
    // Randomize start so it feels real
    const startAngle = Math.floor(Math.random() * 360);
    const endAngle = spins * 360 + emyAngle - (startAngle % 360);
    setWheelRotation(startAngle);
    setTimeout(() => {
      setWheelRotation(startAngle + endAngle);
      setTimeout(() => {
        setSpinResult('Emy');
        setSpinning(false);
      }, 1800);
    }, 50);
  };
  const renderSpinnerWheel = () => (
    <div className="spinner-container">
      <h2>Who Loves Who More?</h2>
      <div style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center', width: '200px', height: '220px', margin: '0 auto'}}>
        {/* Pointer overlays the wheel, pointing down into the wheel */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '10px',
          transform: 'translateX(-50%) rotate(180deg)',
          zIndex: 2
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40">
            <polygon points="20,0 36,28 4,28" fill="#a94442" />
            <circle cx="20" cy="32" r="6" fill="#fff0f6" stroke="#a94442" strokeWidth="2" />
          </svg>
        </div>
        <div
          className={`wheel`}
          style={{
            width: '180px',
            height: '180px',
            marginTop: '30px',
            borderRadius: '50%',
            overflow: 'hidden',
            transition: spinning ? 'transform 1.8s cubic-bezier(.17,.67,.83,.67)' : 'none',
            transform: `rotate(${wheelRotation}deg)`,
            boxShadow: '0 2px 8px #fae3d9',
            background: 'conic-gradient(#fae3d9 0 180deg, #ffb6b9 180deg 360deg)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: 'absolute', top: 0, left: 0 }}>
            <text x="140" y="95" textAnchor="middle" fill="#a94442" fontSize="20" fontWeight="bold">Emy</text>
            <text x="40" y="95" textAnchor="middle" fill="#a94442" fontSize="20" fontWeight="bold">Ron</text>
          </svg>
        </div>
      </div>
      <button className="spin-btn" onClick={spinWheel} disabled={spinning}>Spin</button>
      {spinResult && <div className="spin-result">It's {spinResult}!</div>}
    </div>
  );

  // Slot Spinner (random)
  const [slotResult, setSlotResult] = useState('');
  const [slotSpinning, setSlotSpinning] = useState(false);
  const slotOptions = ['Emy', 'Ron'];
  const spinSlot = () => {
    setSlotSpinning(true);
    setTimeout(() => {
      const winner = slotOptions[Math.floor(Math.random() * slotOptions.length)];
      setSlotResult(winner);
      setSlotSpinning(false);
    }, 1200);
  };
  const renderSlotSpinner = () => (
    <div className="slot-container">
      <h2>Whose Gonna Choose?</h2>
      <div className="slot-display">{slotSpinning ? '...' : slotResult || '---'}</div>
      <button className="spin-btn" onClick={spinSlot} disabled={slotSpinning}>Spin</button>
      {slotResult && <div className="slot-result">{slotResult} gets to choose!</div>}
    </div>
  );

  // --- Cute Tic-Tac-Toe Game ---
  const [tttBoard, setTttBoard] = useState(Array(9).fill(null));
  const [tttXIsNext, setTttXIsNext] = useState(true);
  const [tttWinner, setTttWinner] = useState(null);

  const tttLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  const checkTttWinner = (board) => {
    for (let line of tttLines) {
      const [a,b,c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  };
  const handleTttClick = idx => {
    if (tttBoard[idx] || tttWinner) return;
    const newBoard = tttBoard.slice();
    newBoard[idx] = tttXIsNext ? '💖' : '💙';
    setTttBoard(newBoard);
    const winner = checkTttWinner(newBoard);
    setTttWinner(winner);
    setTttXIsNext(!tttXIsNext);
  };
  const resetTtt = () => {
    setTttBoard(Array(9).fill(null));
    setTttXIsNext(true);
    setTttWinner(null);
  };
  const renderTicTacToe = () => (
    <div className="ttt-container">
      <h2>Tic-Tac-Toe</h2>
      <div className="ttt-board">
        {tttBoard.map((cell, idx) => (
          <button key={idx} className="ttt-cell" onClick={() => handleTttClick(idx)}>{cell}</button>
        ))}
      </div>
      <div className="ttt-status">
        {tttWinner ? (
          <span className="ttt-winner">{tttWinner} wins!</span>
        ) : (
          <span>Next: {tttXIsNext ? '💖' : '💙'}</span>
        )}
      </div>
      <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
        <button className="ttt-reset" onClick={resetTtt}>Restart</button>
        <button className="game-back" onClick={() => setActiveGame(null)}>Back to Games</button>
      </div>
    </div>
  );

  // --- Cute Memory Match Game ---
  const [mmCards, setMmCards] = useState([
    {id: 1, emoji: '🐻', flipped: false, matched: false},
    {id: 2, emoji: '🐻', flipped: false, matched: false},
    {id: 3, emoji: '💌', flipped: false, matched: false},
    {id: 4, emoji: '💌', flipped: false, matched: false},
    {id: 5, emoji: '🌹', flipped: false, matched: false},
    {id: 6, emoji: '🌹', flipped: false, matched: false},
    {id: 7, emoji: '🍫', flipped: false, matched: false},
    {id: 8, emoji: '🍫', flipped: false, matched: false},
  ].sort(() => Math.random() - 0.5));
  const [mmFlipped, setMmFlipped] = useState([]);
  const [mmMatchedCount, setMmMatchedCount] = useState(0);
  const [mmLock, setMmLock] = useState(false);

  const handleMmFlip = idx => {
    if (mmLock || mmCards[idx].flipped || mmCards[idx].matched) return;
    const newCards = mmCards.slice();
    newCards[idx].flipped = true;
    const newFlipped = [...mmFlipped, idx];
    setMmFlipped(newFlipped);
    setMmCards(newCards);
    if (newFlipped.length === 2) {
      setMmLock(true);
      setTimeout(() => {
        const [i, j] = newFlipped;
        if (newCards[i].emoji === newCards[j].emoji) {
          newCards[i].matched = newCards[j].matched = true;
          setMmMatchedCount(mmMatchedCount + 1);
        } else {
          newCards[i].flipped = newCards[j].flipped = false;
        }
        setMmCards(newCards);
        setMmFlipped([]);
        setMmLock(false);
      }, 900);
    }
  };
  const resetMm = () => {
    setMmCards([
      {id: 1, emoji: '🐻', flipped: false, matched: false},
      {id: 2, emoji: '🐻', flipped: false, matched: false},
      {id: 3, emoji: '💌', flipped: false, matched: false},
      {id: 4, emoji: '💌', flipped: false, matched: false},
      {id: 5, emoji: '🌹', flipped: false, matched: false},
      {id: 6, emoji: '🌹', flipped: false, matched: false},
      {id: 7, emoji: '🍫', flipped: false, matched: false},
      {id: 8, emoji: '🍫', flipped: false, matched: false},
    ].sort(() => Math.random() - 0.5));
    setMmFlipped([]);
    setMmMatchedCount(0);
    setMmLock(false);
  };
  const renderMemoryMatch = () => (
    <div className="mm-container">
      <h2>Memory Match</h2>
      <div className="mm-board">
        {mmCards.map((card, idx) => (
          <button key={card.id + '-' + idx} className={`mm-card${card.flipped || card.matched ? ' flipped' : ''}`} onClick={() => handleMmFlip(idx)}>
            {card.flipped || card.matched ? card.emoji : '❓'}
          </button>
        ))}
      </div>
      <div className="mm-status">
        {mmMatchedCount === 4 ? <span className="mm-winner">You matched all pairs! 🎉</span> : <span>Pairs matched: {mmMatchedCount}/4</span>}
      </div>
      <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
        <button className="mm-reset" onClick={resetMm}>Restart</button>
        <button className="game-back" onClick={() => setActiveGame(null)}>Back to Games</button>
      </div>
    </div>
  );

  // --- Cute Love Quiz Game ---
  const quizQuestions = [
    {q: 'Who said “I love you” first?', a: ['Emy', 'Ron'], correct: 'Emy'},
    {q: 'Who is more likely to plan a surprise date?', a: ['Emy', 'Ron'], correct: 'Ron'},
    {q: 'Who gives the best hugs?', a: ['Emy', 'Ron'], correct: 'Both!'},
    {q: 'Who is the better cook?', a: ['Emy', 'Ron'], correct: 'Emy'},
  ];
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizSelected, setQuizSelected] = useState(null);
  const handleQuizAnswer = ans => {
    setQuizSelected(ans);
    if (ans === quizQuestions[quizIdx].correct) setQuizScore(quizScore + 1);
    setTimeout(() => {
      if (quizIdx + 1 < quizQuestions.length) {
        setQuizIdx(quizIdx + 1);
        setQuizSelected(null);
      } else {
        setQuizDone(true);
      }
    }, 900);
  };
  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setQuizDone(false);
    setQuizSelected(null);
  };
  const renderLoveQuiz = () => (
    <div className="quiz-container">
      <h2>Love Quiz</h2>
      {!quizDone ? (
        <div>
          <div className="quiz-q">{quizQuestions[quizIdx].q}</div>
          <div className="quiz-answers">
            {quizQuestions[quizIdx].a.map(ans => (
              <button key={ans} className={`quiz-btn${quizSelected === ans ? ' selected' : ''}`} onClick={() => handleQuizAnswer(ans)} disabled={!!quizSelected}>{ans}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result">You scored {quizScore} / {quizQuestions.length}! <br/> <button className="quiz-reset" onClick={resetQuiz}>Try Again</button></div>
      )}
      <button className="game-back" onClick={() => setActiveGame(null)}>Back to Games</button>
    </div>
  );

  // --- Game Navigation State ---
  const [activeGame, setActiveGame] = useState(null); // null = hub, else game name

  // --- Rock Paper Scissors ---
  const [rpsResult, setRpsResult] = useState('');
  const rpsOptions = ['✊', '✋', '✌️'];
  const playRps = (user) => {
    const ai = rpsOptions[Math.floor(Math.random()*3)];
    let result = '';
    if (user === ai) result = "It's a tie!";
    else if ((user === '✊' && ai === '✌️') || (user === '✋' && ai === '✊') || (user === '✌️' && ai === '✋')) result = 'You win!';
    else result = 'Ron wins!';
    setRpsResult(`You: ${user} | Ron: ${ai} — ${result}`);
  };
  const renderRps = () => (
    <div className="rps-container">
      <h2>Rock Paper Scissors</h2>
      <div className="rps-btns">
        {rpsOptions.map(opt => <button key={opt} className="rps-btn" onClick={() => playRps(opt)}>{opt}</button>)}
      </div>
      <div className="rps-result">{rpsResult}</div>
      <button className="game-back" onClick={() => setActiveGame(null)}>Back to Games</button>
    </div>
  );

  // --- Love Calculator ---
  const [loveNames, setLoveNames] = useState({a: '', b: ''});
  const [loveScore, setLoveScore] = useState(null);
  const calcLove = () => {
    const score = Math.floor(Math.random()*21)+80;
    setLoveScore(score);
  };
  const renderLoveCalc = () => (
    <div className="love-calc-container">
      <h2>Love Calculator</h2>
      <input className="love-input" placeholder="Your Name" value={loveNames.a} onChange={e=>setLoveNames({...loveNames,a:e.target.value})} />
      <input className="love-input" placeholder="Their Name" value={loveNames.b} onChange={e=>setLoveNames({...loveNames,b:e.target.value})} />
      <div style={{height:'1rem'}}></div>
      <button className="love-btn" onClick={calcLove}>Calculate</button>
      {loveScore && <div className="love-score">{loveNames.a} ❤️ {loveNames.b}: {loveScore}%</div>}
      <button className="game-back" onClick={() => setActiveGame(null)}>Back to Games</button>
    </div>
  );

  // --- Hangman Game (replaces Simon Says) ---
  const hangmanWords = ["love", "memory", "hug", "kiss", "forever", "sweet", "smile", "cuddle"];
  const [hangmanWord, setHangmanWord] = useState(hangmanWords[Math.floor(Math.random()*hangmanWords.length)]);
  const [hangmanGuesses, setHangmanGuesses] = useState([]);
  const [hangmanWrong, setHangmanWrong] = useState(0);
  const [hangmanInput, setHangmanInput] = useState("");
  const maxWrong = 6;
  const resetHangman = () => {
    setHangmanWord(hangmanWords[Math.floor(Math.random()*hangmanWords.length)]);
    setHangmanGuesses([]);
    setHangmanWrong(0);
    setHangmanInput("");
  };
  const handleHangmanGuess = () => {
    if (!hangmanInput) return;
    const letter = hangmanInput[0].toLowerCase();
    if (hangmanGuesses.includes(letter)) return setHangmanInput("");
    setHangmanGuesses([...hangmanGuesses, letter]);
    if (!hangmanWord.includes(letter)) setHangmanWrong(hangmanWrong+1);
    setHangmanInput("");
  };
  const renderHangman = () => {
    const display = hangmanWord.split('').map(l => hangmanGuesses.includes(l) ? l : '_').join(' ');
    const won = display.replace(/ /g,'') === hangmanWord;
    const lost = hangmanWrong >= maxWrong;
    return (
      <div className="hangman-container">
        <h2>Hangman</h2>
        <div className="hangman-word">{display}</div>
        <div className="hangman-status">Wrong guesses: {hangmanWrong} / {maxWrong}</div>
        <input className="hangman-input" maxLength={1} value={hangmanInput} onChange={e=>setHangmanInput(e.target.value.replace(/[^a-zA-Z]/g, ''))} disabled={won||lost} />
        <button className="hangman-btn" onClick={handleHangmanGuess} disabled={won||lost||!hangmanInput}>Guess</button>
        {(won || lost) && <div className="hangman-result">{won ? 'You Win! 💖' : `You Lose! Word was: ${hangmanWord}`}</div>}
        <div style={{display:'flex', gap:'1rem', marginTop:'1rem'}}>
          <button className="hangman-reset" onClick={resetHangman}>Restart</button>
          <button className="game-back" onClick={() => setActiveGame(null)}>Back to Games</button>
        </div>
      </div>
    );
  };

  // --- 100 Reasons I Love You List (tailored for a boyfriend) ---
  const reasons100 = [
    "Your handsome smile",
    "The way you make me laugh",
    "Your strong hugs",
    "Your kindness to me and others",
    "How you always support me",
    "Your sense of humor",
    "Your intelligence",
    "The way you look at me",
    "Your honesty",
    "Your creativity",
    "How you always listen",
    "Your patience",
    "Your ambition",
    "Your cuddles",
    "Your kisses",
    "How you make me feel safe",
    "Your generosity",
    "Your playfulness",
    "Your confidence",
    "Your loyalty",
    "How you inspire me to be better",
    "Your passion for life",
    "Your optimism",
    "Your strength",
    "Your gentle touch",
    "Your silly faces",
    "How you say 'I love you'",
    "Your morning messages",
    "Your late-night talks",
    "Your surprises",
    "How you always try new things with me", // replaced 'your cooking'
    "How you make every day an adventure", // replaced 'love for nature'
    "Your dancing (even if it's silly)",
    "Your singing (even if off-key)",
    "Your style",
    "Your eyes",
    "Your voice",
    "Your hands",
    "Your warmth",
    "Your dreams",
    "Your goals",
    "Your support for my dreams",
    "Your understanding",
    "Your forgiveness",
    "Your resilience",
    "Your faith in us",
    "Your love for your family",
    "Your love for your friends",
    "Your adventures with me",
    "Your travel dreams",
    "Your silly jokes",
    "Your memes",
    "Your loving messages",
    "Your selfies",
    "How you make the little things special", // replaced 'holidays together'
    "How you make memories out of ordinary days", // replaced 'traditions'
    "How you talk about our dreams together", // replaced 'favourite future'
    "Your curiosity",
    "Your honesty about feelings",
    "Your support when I'm down",
    "Your encouragement",
    "Your belief in me",
    "Your faithfulness",
    "Your gentle heart",
    "Your little gifts",
    "Your favorite movies",
    "Your favorite songs",
    "Your favorite foods",
    "Your favorite places",
    "Your favorite colors",
    "Your favorite books",
    "Your favorite games",
    "Your favorite shows",
    "Your favorite holidays",
    "Your favorite memories with me",
    "Your favorite dreams for us",
    "Your favorite adventures together",
    "Your favorite cuddles",
    "Your favorite kisses",
    "Your favorite hugs",
    "Your favorite laughs",
    "Your favorite smiles",
    "Your favorite looks",
    "Your favorite words",
    "Your favorite moments",
    "Your favorite days",
    "Your favorite nights",
    "Your favorite mornings",
    "Your favorite evenings",
    "Our weekends together", // replaced 'favourite weekends'
    "Your favorite holidays together",
    "Your favorite surprises",
    "Your favorite plans",
    "Your favorite dreams for us",
    "Our love story",
    "How you make me feel loved every day",
    "How you are my best friend",
    "How you are my safe place",
    "How you are my everything.",
    "Because you're my soulmate (I have no choice but if I did, I'd choose you every single day over and over again)"
  ];
  const renderReasons = () => (
    <div className="reasons-fancy-bg">
      <div className="reasons-fancy-container">
        <h2 className="reasons-fancy-title">100 Reasons I Love You</h2>
        <div className="reasons-fancy-list">
          {reasons100.map((reason, i) => (
            <div className="reason-card" key={i}>
              <span className="reason-num">{i+1}.</span> {reason}
            </div>
          ))}
        </div>
        <div className="reasons-fancy-footer">Forever & Always 💖</div>
      </div>
    </div>
  );

  // --- Games Hub ---
  const renderGamesHub = () => (
    <div className="games-hub">
      <h2>Games</h2>
      <div className="games-grid">
        <div className="game-block" onClick={()=>setActiveGame('ttt')}>Tic-Tac-Toe</div>
        <div className="game-block" onClick={()=>setActiveGame('memory')}>Memory Match</div>
        <div className="game-block" onClick={()=>setActiveGame('quiz')}>Love Quiz</div>
        <div className="game-block" onClick={()=>setActiveGame('rps')}>Rock Paper Scissors</div>
        <div className="game-block" onClick={()=>setActiveGame('love')}>Love Calculator</div>
        <div className="game-block" onClick={()=>setActiveGame('hangman')}>Hangman</div>
      </div>
    </div>
  );

  // --- Games Page Routing ---
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
      case 'spinner':
        return renderSpinnerWheel();
      case 'slot':
        return renderSlotSpinner();
      case 'reasons':
        return renderReasons();
      case 'games':
        if (!activeGame) return renderGamesHub();
        if (activeGame==='ttt') return renderTicTacToe();
        if (activeGame==='memory') return renderMemoryMatch();
        if (activeGame==='quiz') return renderLoveQuiz();
        if (activeGame==='rps') return renderRps();
        if (activeGame==='love') return renderLoveCalc();
        if (activeGame==='hangman') return renderHangman();
        // Removed: guess, ep, qm
        return renderGamesHub();
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
