(function(){
'use strict';

/* ─── PRIZE POOL — itens escolares realistas ─── */
const ALL_PRIZES = [
  {id:'fichario',  emoji:'📂', label:'Fichário KNOW',      desc:'Fichário resistente com divisórias e logo KNOW, ideal para organizar suas anotações.'},
  {id:'caderno',   emoji:'📓', label:'Caderno Universitário', desc:'Caderno universitário 96 folhas personalizado com a marca KNOW.'},
  {id:'caneta',    emoji:'🖊️', label:'Kit Canetas',         desc:'Kit com 5 canetas coloridas personalizadas para suas aulas.'},
  {id:'regua',     emoji:'📏', label:'Kit Régua + Compasso', desc:'Kit completo de régua, compasso e esquadros para suas atividades.'},
  {id:'marca',     emoji:'🖍️', label:'Kit Marca-texto',     desc:'Conjunto de marca-textos coloridos para destacar o que é mais importante.'},
  {id:'agenda',    emoji:'📅', label:'Agenda Escolar',      desc:'Agenda escolar anual com calendário, notas e planejador semanal KNOW.'},
  {id:'post',      emoji:'🗒️', label:'Bloco de Post-it',    desc:'Pacote de blocos adesivos coloridos para organizar seus estudos.'},
  {id:'pasta',     emoji:'🗂️', label:'Pasta Catálogo',      desc:'Pasta catálogo 50 folhas para guardar apostilas e materiais de aula.'},
  {id:'borracha',  emoji:'✏️', label:'Kit Lápis + Borracha', desc:'Kit com lápis HB, lapiseira e borracha premium KNOW.'},
  {id:'corretivo', emoji:'📝', label:'Kit Corretivo + Clips', desc:'Kit com corretivo líquido, clips e colchetes para organização.'},
  {id:'canudo',    emoji:'🎨', label:'Estojo Escolar',      desc:'Estojo duplo personalizado KNOW com espaço para todos os seus materiais.'},
  {id:'desconto',  emoji:'🎓', label:'10% off Matrícula',   desc:'Cupom de 10% de desconto aplicado na sua matrícula em qualquer curso técnico KNOW!'},
];

/* ─── BUILD BOARD — garante EXATAMENTE 3+3+3 ─── */
function buildBoard(){
  // Embaralha o pool
  const pool = [...ALL_PRIZES].sort(() => Math.random() - .5);
  const winnerPrize = pool[0];
  const typeA       = pool[1];
  const typeB       = pool[2];

  // 3 do vencedor + 3 do tipo A + 3 do tipo B = 9 exatos
  const cells = [
    winnerPrize, winnerPrize, winnerPrize,
    typeA, typeA, typeA,
    typeB, typeB, typeB,
  ];

  // Fisher-Yates
  for(let i = cells.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return { cells, winnerPrize };
}

const { cells, winnerPrize } = buildBoard();
const user = JSON.parse(localStorage.getItem('know_user') || 'null');
const isAdmin = user && user.role === 'admin';
const scratchPlayedKey = 'know_raspadinha_played';
const hasPlayedRaspadinha = !isAdmin && localStorage.getItem(scratchPlayedKey) === 'true';

let revealedCount   = 0;
let gameOver        = false;
let winnerTriggered = false; // 3 iguais já detectados?
let matchedPrizeId  = null;
const revealedByType = {};

/* ─── PILLS ─── */
const grid  = document.getElementById('scratchGrid');
const strip = document.getElementById('matchStrip');
const pills = {};

[...new Set(cells.map(p => p.id))].forEach(id => {
  const p  = ALL_PRIZES.find(pr => pr.id === id);
  const el = document.createElement('div');
  el.className    = 'match-pill';
  el.dataset.id   = id;
  el.innerHTML    = `${p.emoji} ${p.label} <span class="count-badge" id="cnt-${id}">0</span>`;
  strip.appendChild(el);
  pills[id] = el;
});

/* ─── BUILD CELLS ─── */
cells.forEach((prize) => {
  const cell = document.createElement('div');
  cell.className = 'scratch-cell';
  cell.dataset.prizeId = prize.id;

  const layer = document.createElement('div');
  layer.className = 'prize-layer';
  // inicia com blur máximo — invisível mas presente
  layer.style.setProperty('--blur', '14px');
  layer.innerHTML = `<span class="prize-emoji">${prize.emoji}</span><span class="prize-label">${prize.label}</span>`;
  cell.appendChild(layer);

  const canvas = document.createElement('canvas');
  canvas.className = 'scratch-canvas';
  cell.appendChild(canvas);

  grid.appendChild(cell);
  initScratch(canvas, cell, layer, prize);
});

if(hasPlayedRaspadinha){
  gameOver = true;
  showPlayedOnceNotice();
}

/* ─────────────────────────────────────────────────────
   SCRATCH ENGINE
   • rAF throttle  → sem jank
   • Linha suave entre pontos → traço contínuo
   • Blur reduzido progressivamente (sem getImageData)
   • Grade 12×12 para medir cobertura geometricamente
───────────────────────────────────────────────────── */
function initScratch(canvas, cell, layer, prize){
  let ctx;
  let isDown     = false;
  let revealed   = false;
  let rafPending = false;
  let lastX      = null, lastY = null;

  const RADIUS_RATIO = 0.20;   // raio = 20% do menor lado
  const REVEAL_THRESH = 0.65;  // 65% raspado → revela
  const GRID_N   = 12;         // grade 12×12 = 144 amostras
  let sampleGrid = new Uint8Array(GRID_N * GRID_N);
  let covered    = 0;
  let cw = 0, ch = 0, radius = 0;

  /* coverage 0→1 */
  function coverPct(){ return covered / (GRID_N * GRID_N); }

  /* atualiza blur baseado em cobertura — não precisa de getImageData */
  function updateBlur(){
    const pct = coverPct();
    // 0% → blur 14px | 30% → blur 8px | 65%+ → blur 0px (desbloqueado)
    const blurPx = pct < REVEAL_THRESH
      ? Math.max(0, 14 - pct * 22)
      : 0;
    layer.style.setProperty('--blur', blurPx.toFixed(1) + 'px');
  }

  function resize(){
    cw = cell.offsetWidth;
    ch = cell.offsetHeight;
    if(!cw || !ch) return;
    canvas.width  = cw;
    canvas.height = ch;
    radius = Math.min(cw, ch) * RADIUS_RATIO;
    ctx = canvas.getContext('2d');
    sampleGrid = new Uint8Array(GRID_N * GRID_N);
    covered = 0;
    drawCover();
  }

  function drawCover(){
    ctx.clearRect(0, 0, cw, ch);
    /* fundo principal */
    ctx.fillStyle = '#2E24A3';
    ctx.fillRect(0, 0, cw, ch);
    /* manchas decorativas */
    ctx.fillStyle = '#3B2FF5';
    for(let i = 0; i < 6; i++){
      ctx.beginPath();
      ctx.arc(Math.random()*cw, Math.random()*ch, Math.random()*14+4, 0, Math.PI*2);
      ctx.fill();
    }
    /* linhas */
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 2;
    for(let i = 0; i < 4; i++){
      ctx.beginPath();
      ctx.moveTo(Math.random()*cw, Math.random()*ch);
      ctx.lineTo(Math.random()*cw, Math.random()*ch);
      ctx.stroke();
    }
    /* texto KNOW */
    const fs = Math.min(cw, ch);
    ctx.fillStyle    = 'rgba(255,255,255,.52)';
    ctx.font         = `800 ${fs*0.20}px Outfit,sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KNOW', cw/2, ch/2 - ch*0.09);
    ctx.font      = `500 ${fs*0.11}px Outfit,sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,.28)';
    ctx.fillText('raspe aqui', cw/2, ch/2 + ch*0.17);
  }

  /* marca círculo na grade de amostras */
  function markCircle(cx, cy, r){
    const sx = cw / GRID_N, sy = ch / GRID_N;
    const r2 = r * r;
    for(let row = 0; row < GRID_N; row++){
      for(let col = 0; col < GRID_N; col++){
        const idx = row * GRID_N + col;
        if(sampleGrid[idx]) continue;
        const px = (col + .5)*sx - cx;
        const py = (row + .5)*sy - cy;
        if(px*px + py*py <= r2){ sampleGrid[idx]=1; covered++; }
      }
    }
  }

  function doScratch(x, y){
    if(revealed) return;
    ctx.globalCompositeOperation = 'destination-out';
    /* linha suave do ponto anterior ao atual */
    if(lastX !== null){
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.lineWidth = radius * 2;
      ctx.lineCap   = 'round';
      ctx.lineJoin  = 'round';
      ctx.stroke();
      markCircle((lastX+x)/2, (lastY+y)/2, radius);
    }
    /* círculo no ponto atual */
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    markCircle(x, y, radius);
    lastX = x; lastY = y;

    /* atualiza blur proporcional */
    updateBlur();

    /* partículas de sujeira (leves) */
    spawnDirt(cell, x, y);

    /* revelação ao atingir threshold */
    if(!revealed && coverPct() >= REVEAL_THRESH){
      revealed = true;
      cell.classList.add('revealed');  /* fade do canvas, blur 0 via CSS */
      revealedCount++;
      updateProgress();
      onCellRevealed(prize, layer);
    }
  }

  /* rAF throttle — apenas 1 draw por frame, sem acúmulo */
  let pendingPos = null;
  function scheduleFrame(x, y){
    pendingPos = {x, y};
    if(!rafPending){
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        if(pendingPos && !revealed && !gameOver){
          doScratch(pendingPos.x, pendingPos.y);
          pendingPos = null;
        }
      });
    } else {
      // sobrescreve — sempre o ponto mais recente
      pendingPos = {x, y};
    }
  }

  function posFromMouse(e){ return {x: e.offsetX, y: e.offsetY}; }
  function posFromTouch(e){
    const r = canvas.getBoundingClientRect();
    return {x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top};
  }

  canvas.addEventListener('mousedown', e => {
    if(revealed || gameOver) return;
    isDown = true; lastX = null; lastY = null;
    const p = posFromMouse(e); scheduleFrame(p.x, p.y);
  });
  canvas.addEventListener('mousemove', e => {
    if(!isDown || revealed || gameOver) return;
    const p = posFromMouse(e); scheduleFrame(p.x, p.y);
  });
  const stopMouse = () => { isDown = false; lastX = null; lastY = null; };
  canvas.addEventListener('mouseup',    stopMouse);
  canvas.addEventListener('mouseleave', stopMouse);

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if(revealed || gameOver) return;
    isDown = true; lastX = null; lastY = null;
    const p = posFromTouch(e); scheduleFrame(p.x, p.y);
  }, {passive: false});
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if(!isDown || revealed || gameOver) return;
    const p = posFromTouch(e); scheduleFrame(p.x, p.y);
  }, {passive: false});
  const stopTouch = () => { isDown = false; lastX = null; lastY = null; };
  canvas.addEventListener('touchend',    stopTouch);
  canvas.addEventListener('touchcancel', stopTouch);

  const ro = new ResizeObserver(() => { if(!revealed) resize(); });
  ro.observe(cell);
  requestAnimationFrame(resize);
}

/* DIRT */
function spawnDirt(parent, x, y){
  if(Math.random() > .32) return;
  const n = Math.floor(Math.random()*2)+1;
  for(let i = 0; i < n; i++){
    const d = document.createElement('div');
    d.className = 'dirt';
    const size  = Math.random()*5+3;
    const angle = Math.random()*Math.PI*2;
    const dist  = Math.random()*24+10;
    d.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`
      + `background:hsl(${238+Math.random()*20},52%,${38+Math.random()*16}%);`
      + `--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px`;
    parent.appendChild(d);
    setTimeout(() => d.remove(), 440);
  }
}

/* PROGRESS */
function updateProgress(){
  const pct = (revealedCount / 9) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent  = `${revealedCount} / 9 raspados`;
  /* quando TODOS os 9 foram revelados → mostra resultado final se ainda não houver ganhador */
  if(revealedCount === 9 && !gameOver){
    gameOver = true;
    setTimeout(() => showResult(), 600);
  }
}

/* CELL REVEALED — verifica 3 iguais imediatamente */
function onCellRevealed(prize, layer){
  revealedByType[prize.id] = (revealedByType[prize.id] || 0) + 1;
  const count = revealedByType[prize.id];

  /* atualiza contador na pill */
  const cntEl = document.getElementById('cnt-' + prize.id);
  if(cntEl) cntEl.textContent = count;
  const pill = pills[prize.id];
  if(pill) pill.classList.add('found');

  if(!isAdmin && !localStorage.getItem(scratchPlayedKey)){
    localStorage.setItem(scratchPlayedKey, 'true');
  }

  /* destaca todas as células do tipo quando atinge 3 iguais */
  if(count === 3){
    highlightMatchCells(prize.id);
  }

  /* ── AO ENCONTRAR OS 3 IGUAIS: avisa e finaliza o jogo imediatamente ── */
  if(count === 3 && !winnerTriggered){
    winnerTriggered = true;
    gameOver = true;
    matchedPrizeId = prize.id;
    if(pill) pill.classList.add('winner-pill');
    fireConfetti();

    const banner = document.getElementById('winnerBanner');
    banner.classList.add('show');
    document.getElementById('bannerPrize').textContent = prize.label;

    setTimeout(() => showResult(prize), 500);
  }
}

/* RESULTADO FINAL — só aparece quando todos os 9 estão raspados */
function showPlayedOnceNotice(){
  const panel = document.getElementById('resultPanel');
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="no-match-icon">⛔</div>
    <div class="result-badge">Atenção</div>
    <h2>Você já jogou a raspadinha</h2>
    <p class="no-match-msg">A raspadinha pode ser feita apenas uma vez por usuário. Se precisar de ajuda, contate a secretaria da KNOW.</p>
  `;
}

function showResult(prize){
  const panel = document.getElementById('resultPanel');
  panel.style.display = 'block';
  const match = prize || getMatchedPrize();
  const user  = JSON.parse(localStorage.getItem('know_user') || 'null');
  const isAdmin = user && user.role === 'admin';
  const replayButton = isAdmin ? `<button class="btn-ghost" onclick="location.reload()"><i class="fa-solid fa-rotate-right"></i> Jogar novamente</button>` : '';

  if(match){
    panel.innerHTML = `
      <div class="result-icon">${match.emoji}</div>
      <div class="result-badge">🎉 Parabéns! Você ganhou!</div>
      <h2>3 ${match.emoji} encontrados!</h2>
      <div class="prize-display">${match.emoji}</div>
      <div class="prize-name">${match.label}</div>
      <p class="prize-desc">${match.desc}<br><br>Apresente esta tela na secretaria da KNOW para retirar seu prêmio, ou aproveite e faça já sua matrícula!</p>
      <a class="btn-cta" href="matriculas.html"><i class="fa-solid fa-file-signature"></i> Fazer minha matrícula</a>
      ${replayButton}
    `;
    fireConfetti();
  } else {
    panel.innerHTML = `
      <div class="no-match-icon">🎟️</div>
      <div class="result-badge">Obrigado por participar!</div>
      <h2>Quase lá desta vez!</h2>
      <p class="no-match-msg">Não rolou desta vez, mas na KNOW você já é um vencedor! Conheça nossos cursos e garanta seu futuro.</p>
      <a class="btn-cta" href="matriculas.html"><i class="fa-solid fa-graduation-cap"></i> Conhecer os cursos</a>
      ${replayButton}
    `;
  }

  panel.scrollIntoView({behavior:'smooth', block:'center'});
}

function getMatchedPrize(){
  const entry = Object.entries(revealedByType).find(([id,count]) => count >= 3);
  if(!entry) return null;
  return ALL_PRIZES.find(pr => pr.id === entry[0]) || null;
}

function highlightMatchCells(prizeId){
  document.querySelectorAll(`.scratch-cell[data-prize-id="${prizeId}"] .prize-layer`).forEach(el => el.classList.add('match-cell'));
}

/* CONFETTI */
function fireConfetti(){
  const colors = ['#3B2FF5','#F5A623','#6C63FF','#FF6B6B','#4ECDC4','#FFE66D','#fff'];
  for(let i = 0; i < 90; i++){
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size   = Math.random()*9+5;
      el.style.cssText = `left:${Math.random()*100}vw;top:-10px;`
        + `width:${size}px;height:${size}px;`
        + `background:${colors[Math.floor(Math.random()*colors.length)]};`
        + `border-radius:${Math.random()>.5?'50%':'2px'};`
        + `animation-duration:${(Math.random()*1.4+.8).toFixed(2)}s;`
        + `animation-delay:${(Math.random()*.4).toFixed(2)}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, i * 22);
  }
}

})();