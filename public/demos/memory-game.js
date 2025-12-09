document.addEventListener('DOMContentLoaded', () => {
    const demoContainer = document.getElementById('memory-game-demo');
    if (!demoContainer) return;
  
    demoContainer.innerHTML = `
      <div class="memory-game-demo">
        <h2>🎮 Juego de Memoria</h2>
        <div class="game-stats">
          <div class="stat">
            <span class="stat-label">Movimientos:</span>
            <span id="moves-count" class="stat-value">0</span>
          </div>
          <div class="stat">
            <span class="stat-label">Tiempo:</span>
            <span id="timer" class="stat-value">0:00</span>
          </div>
          <div class="stat">
            <span class="stat-label">Pares:</span>
            <span id="pairs-count" class="stat-value">0/8</span>
          </div>
        </div>
        <div id="game-board" class="game-board"></div>
        <button id="restart-btn" class="btn-demo">🔄 Reiniciar</button>
        <div id="win-message" class="win-message" style="display: none;"></div>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .memory-game-demo {
        max-width: 600px;
        margin: 0 auto;
      }
      .memory-game-demo h2 {
        color: var(--text-light);
        text-align: center;
        margin-bottom: 2rem;
      }
      .game-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .stat {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: center;
      }
      .stat-label {
        display: block;
        font-size: 0.875rem;
        color: var(--text-gray);
        margin-bottom: 0.5rem;
      }
      .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text-light);
      }
      .game-board {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .card {
        aspect-ratio: 1;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        cursor: pointer;
        transition: transform 0.3s;
        position: relative;
      }
      .card.hidden .card-front {
        opacity: 0;
      }
      .card.hidden .card-back {
        opacity: 1;
      }
      .card.flipped .card-front {
        opacity: 1;
      }
      .card.flipped .card-back {
        opacity: 0;
      }
      .card.matched {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        cursor: default;
        animation: matchAnimation 0.5s ease;
      }
      @keyframes matchAnimation {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      .card:hover:not(.flipped):not(.matched) {
        transform: scale(1.05);
      }
      .card-front, .card-back {
        position: absolute;
        transition: opacity 0.3s;
      }
      .card-back {
        opacity: 0;
        font-size: 2rem;
      }
      .btn-demo {
        display: block;
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.3s;
      }
      .btn-demo:hover {
        transform: translateY(-2px);
      }
      .win-message {
        margin-top: 2rem;
        padding: 2rem;
        background: rgba(16, 185, 129, 0.2);
        border-radius: 0.75rem;
        text-align: center;
        animation: fadeIn 0.5s ease;
      }
      .win-message h3 {
        color: #10b981;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      .win-message p {
        color: var(--text-light);
        font-size: 1.125rem;
      }
    `;
    document.head.appendChild(style);
  
    const emojis = ['🍎', '🍊', '🍋', '🍌', '🍇', '🍓', '🍒', '🍑'];
    let cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timer = 0;
    let timerInterval = null;
  
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const startTimer = () => {
      if (!timerInterval) {
        timerInterval = setInterval(() => {
          timer++;
          const minutes = Math.floor(timer / 60);
          const seconds = timer % 60;
          document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
      }
    };
  
    const stopTimer = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    };
  
    const createBoard = () => {
      const board = document.getElementById('game-board');
      cards = shuffle([...emojis, ...emojis]);
      
      board.innerHTML = cards.map((emoji, index) => `
        <div class="card hidden" data-index="${index}" data-emoji="${emoji}">
          <span class="card-front">${emoji}</span>
          <span class="card-back">❓</span>
        </div>
      `).join('');
  
      document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', handleCardClick);
      });
    };
  
    const handleCardClick = (e) => {
      const card = e.currentTarget;
      
      if (card.classList.contains('flipped') || 
          card.classList.contains('matched') || 
          flippedCards.length === 2) {
        return;
      }
  
      startTimer();
      
      card.classList.remove('hidden');
      card.classList.add('flipped');
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves-count').textContent = moves;
        checkMatch();
      }
    };
  
    const checkMatch = () => {
      const [card1, card2] = flippedCards;
      const emoji1 = card1.dataset.emoji;
      const emoji2 = card2.dataset.emoji;
  
      if (emoji1 === emoji2) {
        setTimeout(() => {
          card1.classList.add('matched');
          card2.classList.add('matched');
          matchedPairs++;
          document.getElementById('pairs-count').textContent = `${matchedPairs}/8`;
          flippedCards = [];
  
          if (matchedPairs === 8) {
            stopTimer();
            showWinMessage();
          }
        }, 500);
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card1.classList.add('hidden');
          card2.classList.remove('flipped');
          card2.classList.add('hidden');
          flippedCards = [];
        }, 1000);
      }
    };
  
    const showWinMessage = () => {
      const winMsg = document.getElementById('win-message');
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      winMsg.innerHTML = `
        <h3>🎉 ¡Felicidades!</h3>
        <p>Completaste el juego en ${moves} movimientos y ${timeStr}</p>
      `;
      winMsg.style.display = 'block';
    };
  
    const resetGame = () => {
      stopTimer();
      timer = 0;
      moves = 0;
      matchedPairs = 0;
      flippedCards = [];
      document.getElementById('moves-count').textContent = '0';
      document.getElementById('timer').textContent = '0:00';
      document.getElementById('pairs-count').textContent = '0/8';
      document.getElementById('win-message').style.display = 'none';
      createBoard();
    };
  
    document.getElementById('restart-btn').addEventListener('click', resetGame);
    
    createBoard();
  });
  