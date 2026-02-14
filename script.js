(() => {
  const WIN_COMBOS = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const boardEl = document.getElementById('board');
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');
  const endgameEl = document.getElementById('endgame');
  const endMsgEl = document.getElementById('endMsg');
  const playAgainBtn = document.getElementById('playAgain');

  let board = Array(9).fill(null);
  let current = 'X';
  let scores = {X:0,O:0};
  let locked = false;

  function init(){
    // restore scores from localStorage if available
    try{ const s = JSON.parse(localStorage.getItem('ttt-scores')); if(s) scores = s;}catch(e){}
    updateScores();
    cells.forEach(c => c.addEventListener('click', onCellClick));
    cells.forEach(c => c.addEventListener('keydown', onCellKeyDown));
    resetBtn.addEventListener('click', resetBoard);
    playAgainBtn.addEventListener('click', () => { hideEnd(); resetBoard(); });
    render();
  }

  function onCellKeyDown(e){
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); e.currentTarget.click(); }
  }

  function onCellClick(e){
    if(locked) return;
    const idx = Number(e.currentTarget.dataset.index);
    if(board[idx]) return;
    board[idx] = current;
    render();
    const winner = checkWinner();
    if(winner){
      locked = true;
      scores[winner]++;
      updateScores();
      highlightWin(winner);
      saveScores();
      showEnd(`Congrats! Player ${winner} wins`);
      return;
    }
    if(board.every(Boolean)){
      locked = true;
      showEnd(`It's a draw — well played!`);
      return;
    }
    current = current === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${current}'s turn`;
  }

  function showEnd(message){
    if(endMsgEl) endMsgEl.textContent = message;
    if(endgameEl) endgameEl.classList.remove('hidden');
    if(playAgainBtn) playAgainBtn.focus();
  }

  function hideEnd(){
    if(endgameEl) endgameEl.classList.add('hidden');
  }

  function checkWinner(){
    for(const combo of WIN_COMBOS){
      const [a,b,c] = combo;
      if(board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  }

  function highlightWin(player){
    WIN_COMBOS.forEach(combo => {
      const [a,b,c] = combo;
      if(board[a] === player && board[b] === player && board[c] === player){
        [a,b,c].forEach(i => cells[i].classList.add('win'));
      }
    });
  }

  function render(){
    board.forEach((val,i) => {
      const el = cells[i];
      el.classList.remove('x','o');
      el.textContent = val || '';
      if(val) el.classList.add(val.toLowerCase());
      el.disabled = !!val || locked;
    });
    if(!locked) statusEl.textContent = `Player ${current}'s turn`;
  }

  function resetBoard(){
    board = Array(9).fill(null);
    locked = false;
    current = 'X';
    cells.forEach(c => c.classList.remove('win'));
    hideEnd();
    render();
  }

  function updateScores(){ scoreXEl.textContent = scores.X; scoreOEl.textContent = scores.O; }
  function saveScores(){ try{ localStorage.setItem('ttt-scores', JSON.stringify(scores)); }catch(e){} }

  // initialize when DOM ready
  if(document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
  // register service worker for PWA install/offline
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
    });
  }
})();
