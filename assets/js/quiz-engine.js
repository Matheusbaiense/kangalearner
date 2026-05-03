// ═══════════════════════════════════════════════
//  DriveWise WA — App Logic
// ═══════════════════════════════════════════════

const DW = {
  lang: 'en',
  mode: 'all',      // all | wrong | unanswered | sim
  cat: 'all',
  state: 'WA',
  correct: 0,
  total: 0,
  answered: {},     // id -> {correct, chosen}
  simQueue: [],
  simIdx: 0,
  simMode: false,
  simAnswered: {},

  // ── I18N ──
  t(key){ return I18N[key]?.[this.lang] || I18N[key]?.en || key },

  // ── STORAGE ──
  save(){
    try{
      localStorage.setItem('kl-lang', this.lang);
      localStorage.setItem('kl-answered', JSON.stringify(this.answered));
    }catch(e){}
  },
  load(){
    try{
      const l = localStorage.getItem('kl-lang');
      if(l) this.lang = l;
      const s = localStorage.getItem('kl-state');
      if(s) this.state = s;
      const a = localStorage.getItem('kl-answered');
      if(a) this.answered = JSON.parse(a);
    }catch(e){}
  },
  clearProgress(){
    this.answered = {};
    this.correct = 0;
    this.total = 0;
    localStorage.removeItem('kl-answered');
    this.renderQuiz();
    this.updateScore();
    // confetti on reset
  },

  // ── LANG ──
  setLang(lang, el){
    this.lang = lang;
    document.body.className = 'mode-' + lang;
    document.documentElement.lang = lang.startsWith('pt') ? 'pt-BR' : lang.startsWith('es') ? 'es' : 'en';
    document.getElementById('ld-flag').textContent = FLAGS[lang] || '🌐';
    document.getElementById('ld-name').textContent = NAMES[lang] || lang;
    document.querySelectorAll('.ld-option').forEach(o => o.classList.remove('active'));
    if(el) el.classList.add('active');
    document.querySelectorAll('.ld-option').forEach(o => o.setAttribute('aria-selected', o.classList.contains('active') ? 'true' : 'false'));
    document.getElementById('ld-panel').classList.remove('open');
    document.getElementById('ld-trigger').classList.remove('open');
    this.save();
    this.renderFilters();
    this.renderQuiz();
    if (window.KL_LEARN && typeof window.KL_LEARN.refreshLanguage === "function") {
      window.KL_LEARN.refreshLanguage();
    }
  },

  // ── DROPDOWN ──
  ldToggle(){
    const t = document.getElementById('ld-trigger');
    const p = document.getElementById('ld-panel');
    const rect = t.getBoundingClientRect();
    const isOpen = p.classList.contains('open');
    if(!isOpen){
      p.style.top = (rect.bottom + 6) + 'px';
      p.style.left = Math.min(rect.left, window.innerWidth - 250) + 'px';
      p.style.width = Math.max(rect.width, 240) + 'px';
    }
    p.classList.toggle('open', !isOpen);
    t.classList.toggle('open', !isOpen);
  },

  // ── FILTERS ──
  setState(state){
    this.state = state;
    this.renderQuiz();
  },

  renderFilters(){
    const bar = document.getElementById('filter-bar');
    const l = this.lang.replace('pten','en').replace('esen','en').slice(0,2);
    const safeL = ['pt','en','es'].includes(l) ? l : 'en';
    
    const allLabel = {pt:'Todas',en:'All',es:'Todas'}[safeL] || 'All';
    let html = `<button class="fcat ${this.cat==='all'?'active':''}" data-cat="all" type="button">${allLabel}</button>`;
    CATEGORIES.forEach(c => {
      const label = c.label[safeL] || c.label.en;
      html += `<button class="fcat ${this.cat===c.key?'active':''}" data-cat="${c.key}" type="button">${c.icon} ${label}</button>`;
    });
    bar.innerHTML = html;
    bar.querySelectorAll('.fcat').forEach(btn => {
      btn.addEventListener('click', () => this.setCat(btn.dataset.cat || 'all'));
    });
  },

  setCat(cat){
    this.cat = cat;
    document.querySelectorAll('.fcat').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    this.renderQuiz();
  },

  setMode(mode){
    this.mode = mode;
    document.querySelectorAll('.fmode').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    if(mode === 'sim'){
      this.startSim();
    } else {
      this.simMode = false;
      document.getElementById('sim-wrapper').style.display = 'none';
      document.getElementById('study-wrapper').style.display = 'block';
      this.renderQuiz();
    }
  },

  // ── QUIZ RENDER ──
  getFilteredQ(){
    let qs = QUESTIONS;
    qs = qs.filter(q => !q.states || q.states.includes(this.state));
    if(this.cat !== 'all') qs = qs.filter(q => q.cat === this.cat);
    if(this.mode === 'wrong') qs = qs.filter(q => this.answered[q.id] && !this.answered[q.id].correct);
    if(this.mode === 'unanswered') qs = qs.filter(q => !this.answered[q.id]);
    return qs;
  },

  renderQuiz(){
    const container = document.getElementById('quiz-cards');
    const qs = this.getFilteredQ();
    const lang = this.lang;
    const safeL = lang.includes('pt') ? 'pt' : lang.includes('es') ? 'es' : 'en';

    if(qs.length === 0){
      container.innerHTML = `<div class="empty-state">
        <div class="empty-icon">🎉</div>
        <div class="empty-title">${this.t('empty_title')}</div>
        <div class="empty-sub">${this.t('empty_sub')}</div>
      </div>`;
      return;
    }

    // Group by category
    const groups = {};
    qs.forEach(q => {
      if(!groups[q.cat]) groups[q.cat] = [];
      groups[q.cat].push(q);
    });

    let html = '';
    Object.entries(groups).forEach(([cat, catQs]) => {
      const catData = CATEGORIES.find(c => c.key === cat);
      const icon = catData?.icon || '📚';
      const label = catData?.label?.[safeL] || cat;
      html += `<div class="sec-head"><span class="sec-icon">${icon}</span><span>${label}</span></div>`;
      catQs.forEach(q => { html += this.renderCard(q, lang, safeL); });
    });

    container.innerHTML = html;

    // Restore answered state visually
    Object.entries(this.answered).forEach(([qid, state]) => {
      const card = document.getElementById(qid);
      if(!card) return;
      const opts = card.querySelectorAll('.opt');
      opts.forEach(o => {
        o.setAttribute('data-done','1');
        o.style.cursor = 'default';
        const isCorrect = o.dataset.correct === 'true';
        const isChosen = o.dataset.letter === state.chosen;
        if(isCorrect) o.classList.add(state.correct ? 'correct' : 'missed');
        else if(isChosen && !state.correct) o.classList.add('wrong');
      });
      const ans = document.getElementById('ans-' + qid);
      if(ans) ans.classList.add('show');
    });

    this.updateScore();
  },

  renderCard(q, lang, safeL){
    const letters = ['A','B','C','D'];
    const qtext = q.q[safeL] || q.q.en || '';
    
    let signHtml = '';
    if(q.sign){
      const cap = q.cap ? (q.cap[safeL] || q.cap.en || '') : '';
      const signMarkup = q.sign.trim().startsWith('<svg')
        ? q.sign
        : `<img src="${q.sign}" alt="${cap || 'Road sign'}" width="170" height="170" loading="lazy">`;
      signHtml = `<div class="sign-box">${signMarkup}${cap ? `<div class="img-cap">${cap}</div>` : ''}</div>`;
    }

    let optsHtml = '';
    q.opts.forEach((o,i) => {
      const otxt = o.t[safeL] || o.t.en || '';
      optsHtml += `<div class="opt" data-correct="${o.ok}" data-letter="${o.l}" role="button" tabindex="0">
        <span class="oletter">${o.l}</span>
        <span class="otext">${otxt}</span>
      </div>`;
    });

    const exp = q.exp[safeL] || q.exp.en || '';
    const tip = q.tip ? (q.tip[safeL] || q.tip.en || '') : '';
    const tipHtml = tip ? `<div class="atip">💡 ${tip}</div>` : '';

    return `<div class="qcard" id="${q.id}">
  <div class="qmeta"><span class="qnum">${q.id}</span><span class="qcat-badge">${CATEGORIES.find(c=>c.key===q.cat)?.icon||''} ${CATEGORIES.find(c=>c.key===q.cat)?.label?.[safeL]||q.cat}</span></div>
  <div class="qtext">${qtext}</div>
  ${signHtml}
  <div class="opts">${optsHtml}</div>
  <div class="answer" id="ans-${q.id}">
    <div class="alabel">✅ ${safeL==='pt'?'Resposta':safeL==='es'?'Respuesta':'Answer'}</div>
    <div class="atext">${exp}</div>
    ${tipHtml}
  </div>
</div>`;
  },

  // ── ANSWER PICK ──
  pick(el, qid){
    if(el.getAttribute('data-done')) return;
    const q = QUESTIONS.find(x => x.id === qid);
    if(!q) return;
    const isCorrect = el.dataset.correct === 'true';
    if(this.simMode){
      this.simAnswered = { ...this.simAnswered, [qid]: { correct: isCorrect, chosen: el.dataset.letter } };
    }
    const card = document.getElementById(qid);
    const opts = card.querySelectorAll('.opt');
    opts.forEach(o => {
      o.setAttribute('data-done','1');
      o.style.cursor = 'default';
      if(o.dataset.correct === 'true') o.classList.add(isCorrect ? 'correct' : 'missed');
      else if(o === el && !isCorrect) o.classList.add('wrong');
    });
    document.getElementById('ans-' + qid)?.classList.add('show');
    
    if(!this.answered[qid]){
      this.total++;
      if(isCorrect) this.correct++;
      this.answered[qid] = { correct: isCorrect, chosen: el.dataset.letter };
      this.save();
      this.updateScore();
      if(isCorrect) this.spawnConfetti(el);
      this.syncAttempt(q, isCorrect, el.dataset.letter);
    }

    // Sim mode: advance
    if(this.simMode){
      setTimeout(() => this.simNext(), 900);
    }
  },

  // ── SCORE ──
  updateScore(){
    const total = Object.keys(this.answered).length;
    const correct = Object.values(this.answered).filter(a => a.correct).length;
    const pct = total > 0 ? Math.round(correct/total*100) : 0;
    const el = document.getElementById('score-val');
    if(el){
      el.textContent = `${correct} / ${total}`;
      el.style.color = pct >= 80 ? 'var(--green)' : pct >= 60 ? 'var(--gold)' : total > 0 ? 'var(--red)' : '#fff';
    }
    const pbar = document.getElementById('score-pbar');
    if(pbar){
      pbar.style.width = pct + '%';
      pbar.setAttribute('aria-valuenow', String(pct));
    }
    const pct_el = document.getElementById('score-pct');
    if(pct_el) pct_el.textContent = total > 0 ? pct + '%' : '';
  },

  // ── CONFETTI ──
  spawnConfetti(el){
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const colors = ['#F4A900','#30D158','#FFBE33','#fff','#FFD700'];
    for(let i=0;i<18;i++){
      const d = document.createElement('div');
      d.className = 'confetti-dot';
      d.style.cssText = `left:${cx}px;top:${cy}px;background:${colors[i%colors.length]};
        --dx:${(Math.random()-0.5)*160}px;--dy:${-(Math.random()*120+60)}px;
        width:${5+Math.random()*5}px;height:${5+Math.random()*5}px;
        border-radius:${Math.random()>0.5?'50%':'2px'};`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 900);
    }
  },

  // ── SIM MODE ──
  startSim(){
    this.simMode = true;
    this.simAnswered = {};
    this.simQueue = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 30);
    this.simIdx = 0;
    document.getElementById('study-wrapper').style.display = 'none';
    document.getElementById('sim-wrapper').style.display = 'block';
    this.renderSimCard();
  },

  renderSimCard(){
    const q = this.simQueue[this.simIdx];
    const lang = this.lang;
    const safeL = lang.includes('pt') ? 'pt' : lang.includes('es') ? 'es' : 'en';
    const total = this.simQueue.length;
    const pct = Math.round((this.simIdx / total) * 100);

    document.getElementById('sim-progress-text').textContent = `${this.simIdx + 1} / ${total}`;
    document.getElementById('sim-progress-bar').style.width = pct + '%';

    const container = document.getElementById('sim-card-container');
    container.innerHTML = this.renderCard(q, lang, safeL);
  },

  simNext(){
    this.simIdx++;
    if(this.simIdx >= this.simQueue.length){
      this.showSimResult();
    } else {
      this.renderSimCard();
    }
  },

  showSimResult(){
    const total = this.simQueue.length;
    let score = 0;
    this.simQueue.forEach(q => { if(this.simAnswered[q.id]?.correct) score++; });
    const pct = Math.round(score/total*100);
    const pass = pct >= 80;
    const safeL = this.lang.includes('pt') ? 'pt' : this.lang.includes('es') ? 'es' : 'en';
    this.syncMockSession({ state: this.state || 'WA', score, total });
    const msgs = {
      pass: {pt:'Parabéns! Você passou!', en:'Congratulations! You passed!', es:'¡Felicidades! ¡Aprobaste!'},
      fail: {pt:'Continue estudando. Você precisa de 80%.', en:'Keep studying. You need 80%.', es:'Sigue estudiando. Necesitas 80%.'},
      back: {pt:'Voltar ao estudo', en:'Back to study', es:'Volver al estudio'}
    };
    document.getElementById('sim-card-container').innerHTML = `
      <div class="sim-result">
        <div class="sim-result-icon">${pass ? '🎉' : '📚'}</div>
        <div class="sim-result-score">${score}/${total}</div>
        <div class="sim-result-pct" style="color:${pass?'var(--green)':'var(--red)'}">${pct}%</div>
        <div class="sim-result-msg">${pass ? msgs.pass[safeL] : msgs.fail[safeL]}</div>
        <button class="btn btn-gold" type="button" data-action="mode-all" style="margin-top:20px">${msgs.back[safeL]}</button>
      </div>`;
  },

  // ── INIT ──
  init(){
    this.load();
    // restore lang UI
    const langEl = document.querySelector(`.ld-option[data-lang="${this.lang}"]`);
    if(langEl) { langEl.classList.add('active'); }
    document.body.className = 'mode-' + this.lang;
    document.documentElement.lang = this.lang.startsWith('pt') ? 'pt-BR' : this.lang.startsWith('es') ? 'es' : 'en';
    document.getElementById('ld-flag').textContent = FLAGS[this.lang] || '🇧🇷';
    document.getElementById('ld-name').textContent = NAMES[this.lang] || 'Português';

    // close dropdown on outside click
    document.addEventListener('click', e => {
      if(!document.getElementById('ld')?.contains(e.target)){
        document.getElementById('ld-panel').classList.remove('open');
        document.getElementById('ld-trigger').classList.remove('open');
      }
    });

    // nav active on scroll
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const y = window.scrollY + 120;
      sections.forEach(s => {
        if(y >= s.offsetTop && y < s.offsetTop + s.offsetHeight){
          navLinks.forEach(a => { a.classList.remove('active'); if(a.getAttribute('href') === '#' + s.id) a.classList.add('active'); });
        }
      });
    }, {passive:true});

    // Restore score counts from storage
    const total = Object.keys(this.answered).length;
    const correct = Object.values(this.answered).filter(a => a.correct).length;
    this.total = total; this.correct = correct;

    this.renderFilters();
    this.renderQuiz();
    this.updateScore();

    // Wire mode buttons
    document.querySelectorAll('.fmode').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.fmode').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        DW.setMode(btn.dataset.mode);
      });
    });

    // Wire reset button
    const resetBtn = document.getElementById('reset-btn');
    if(resetBtn) resetBtn.addEventListener('click', () => DW.clearProgress());

    // Option selection (delegation) + keyboard
    document.addEventListener('click', (e) => {
      const opt = e.target.closest?.('.opt');
      if(opt){
        const card = opt.closest?.('.qcard');
        if(card) DW.pick(opt, card.id);
      }
      const actionEl = e.target.closest?.('[data-action="mode-all"]');
      if(actionEl) DW.setMode('all');
    });
    document.addEventListener('keydown', (e) => {
      const opt = e.target?.closest?.('.opt');
      if(!opt) return;
      if(e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      const card = opt.closest?.('.qcard');
      if(card) DW.pick(opt, card.id);
    });

    // Remove old onclick from mode buttons (safety)
  }
};

DW.syncAttempt = function(q, isCorrect, chosen){
  try{
    fetch('/api/attempts', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({
        question_id: q.id,
        state: (this.state || 'WA'),
        category: q.cat,
        is_correct: Boolean(isCorrect),
        chosen: chosen || null,
        source: 'web'
      }),
      keepalive: true
    }).catch(()=>{});
  }catch(e){}
};

DW.syncMockSession = function(session){
  try{
    fetch('/api/mock-sessions', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({ ...session, source: 'web' }),
      keepalive: true
    }).catch(()=>{});
  }catch(e){}
};

const FLAGS={pt:'🇧🇷',en:'🇦🇺',es:'🇪🇸',pten:'🇧🇷\u2009🇦🇺',esen:'🇪🇸\u2009🇦🇺'};
const NAMES={pt:'Português',en:'English',es:'Español',pten:'Bilíngue PT+EN',esen:'Bilíngüe ES+EN'};

const I18N = {
  empty_title: {pt:'Sem questões nesta categoria!',en:'No questions in this category!',es:'¡Sin preguntas en esta categoría!'},
  empty_sub:   {pt:'Tente mudar o filtro ou o modo.',en:'Try changing the filter or mode.',es:'Prueba cambiando el filtro o el modo.'},
  mode_all:    {pt:'Todas',en:'All',es:'Todas'},
  mode_wrong:  {pt:'Erradas',en:'Wrong',es:'Erradas'},
  mode_unans:  {pt:'Não respondidas',en:'Unanswered',es:'Sin responder'},
  mode_sim:    {pt:'Simulado (30 perguntas)',en:'Simulate (30 questions)',es:'Simulacro (30 preguntas)'},
};

function ldToggle(){ DW.ldToggle(); }
function setLang(lang, el){ DW.setLang(lang, el); }
window.DW = DW;

