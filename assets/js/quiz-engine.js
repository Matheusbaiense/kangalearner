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
  answered: {},     // id -> {correct, chosen} (view of answeredByState for current storage key)
  answeredByState: {},
  simQueue: [],
  simIdx: 0,
  simMode: false,
  simAnswered: {},

  // ── I18N ──
  t(key){ return I18N[key]?.[this.lang] || I18N[key]?.en || key },

  /** WA and AU share the same question bank — share progress bucket. */
  storageStateKey(){
    return this.state === 'AU' ? 'WA' : this.state;
  },

  /** Category / filter bar labels: bilingual modes use English UI labels. */
  filterLabelLang(lang){
    if(lang === 'pten' || lang === 'esen') return 'en';
    const l = String(lang).slice(0, 2);
    return ['pt','en','es'].includes(l) ? l : 'en';
  },

  /** Question text, options, explanations: bilingual modes use primary language. */
  questionLang(lang){
    if(lang === 'pten') return 'pt';
    if(lang === 'esen') return 'es';
    if(String(lang).startsWith('pt')) return 'pt';
    if(String(lang).startsWith('es')) return 'es';
    return 'en';
  },

  hydrateAnsweredForCurrentState(){
    const key = this.storageStateKey();
    if(!this.answeredByState[key]) this.answeredByState[key] = {};
    this.answered = this.answeredByState[key];
  },

  // ── STORAGE ──
  save(){
    try{
      localStorage.setItem('kl-lang', this.lang);
      localStorage.setItem('kl-answered-by-state', JSON.stringify(this.answeredByState));
    }catch(e){}
  },
  load(){
    try{
      const l = localStorage.getItem('kl-lang');
      if(l) this.lang = l;
      const s = localStorage.getItem('kl-state');
      if(s) this.state = s;
      let byState = {};
      const v2 = localStorage.getItem('kl-answered-by-state');
      const v1 = localStorage.getItem('kl-answered');
      if(v2){
        byState = JSON.parse(v2);
      } else if(v1){
        const old = JSON.parse(v1);
        byState = { WA: old };
        localStorage.setItem('kl-answered-by-state', JSON.stringify(byState));
      }
      this.answeredByState = byState && typeof byState === 'object' ? byState : {};
      this.hydrateAnsweredForCurrentState();
    }catch(e){
      this.answeredByState = {};
      this.hydrateAnsweredForCurrentState();
    }
  },

  getQuestionsForState(){
    if(this.state === 'AU') return QUESTIONS.slice();
    return QUESTIONS.filter(q => Array.isArray(q.states) && q.states.includes(this.state));
  },
  clearProgress(){
    const key = this.storageStateKey();
    this.answeredByState[key] = {};
    this.answered = this.answeredByState[key];
    this.correct = 0;
    this.total = 0;
    this.save();
    this.renderQuiz();
    this.updateScore();
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
    try{ localStorage.setItem('kl-state', state); }catch(e){}
    this.hydrateAnsweredForCurrentState();
    if(this.simMode){
      this.startSim();
    } else {
      this.renderQuiz();
    }
    this.updateScore();
  },

  renderFilters(){
    const bar = document.getElementById('filter-bar');
    const safeL = this.filterLabelLang(this.lang);
    
    const allLabel = {pt:'Todas',en:'All',es:'Todas'}[safeL] || 'All';
    let html = `<button class="fcat ${this.cat==='all'?'active':''}" data-cat="all" type="button">${allLabel}</button>`;
    CATEGORIES.forEach(c => {
      const label = c.label[safeL] || c.label.en;
      html += `<button class="fcat ${this.cat===c.key?'active':''}" data-cat="${c.key}" type="button">${c.icon} ${label}</button>`;
    });
    bar.innerHTML = html;
    bar.querySelectorAll('.fcat').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.cat === this.cat ? 'true' : 'false');
      btn.addEventListener('click', () => this.setCat(btn.dataset.cat || 'all'));
    });
  },

  setCat(cat){
    this.cat = cat;
    document.querySelectorAll('.fcat').forEach(b => {
      const on = b.dataset.cat === cat;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    this.renderQuiz();
  },

  setMode(mode){
    this.mode = mode;
    document.querySelectorAll('.fmode').forEach(b => {
      const on = b.dataset.mode === mode;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
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
    let qs = this.getQuestionsForState();
    if(this.cat !== 'all') qs = qs.filter(q => q.cat === this.cat);
    if(this.mode === 'wrong') qs = qs.filter(q => this.answered[q.id] && !this.answered[q.id].correct);
    if(this.mode === 'unanswered') qs = qs.filter(q => !this.answered[q.id]);
    return qs;
  },

  renderQuiz(){
    const container = document.getElementById('quiz-cards');
    const lang = this.lang;
    const qLang = this.questionLang(lang);
    const pool = this.getQuestionsForState();

    if(pool.length === 0){
      container.innerHTML = `<div class="empty-state" role="status">
        <div class="empty-icon" aria-hidden="true">📍</div>
        <div class="empty-title">${this.t('empty_state_title')}</div>
        <div class="empty-sub">${this.t('empty_state_sub')}</div>
      </div>`;
      this.updateScore();
      return;
    }

    const qs = this.getFilteredQ();

    if(qs.length === 0){
      container.innerHTML = `<div class="empty-state" role="status">
        <div class="empty-icon" aria-hidden="true">🎉</div>
        <div class="empty-title">${this.t('empty_title')}</div>
        <div class="empty-sub">${this.t('empty_sub')}</div>
      </div>`;
      this.updateScore();
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
      const label = catData?.label?.[qLang] || cat;
      html += `<div class="sec-head"><span class="sec-icon">${icon}</span><span>${label}</span></div>`;
      catQs.forEach(q => { html += this.renderCard(q, lang, qLang); });
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

  renderCard(q, lang, qLang){
    const letters = ['A','B','C','D'];
    const qtext = q.q[qLang] || q.q.en || '';
    
    let signHtml = '';
    if(q.sign){
      const cap = q.cap ? (q.cap[qLang] || q.cap.en || '') : '';
      const signMarkup = q.sign.trim().startsWith('<svg')
        ? q.sign
        : `<img src="${q.sign}" alt="${cap || 'Road sign'}" width="170" height="170" loading="lazy">`;
      signHtml = `<div class="sign-box">${signMarkup}${cap ? `<div class="img-cap">${cap}</div>` : ''}</div>`;
    }

    let optsHtml = '';
    q.opts.forEach((o,i) => {
      const otxt = o.t[qLang] || o.t.en || '';
      optsHtml += `<div class="opt" data-correct="${o.ok}" data-letter="${o.l}" role="button" tabindex="0">
        <span class="oletter">${o.l}</span>
        <span class="otext">${otxt}</span>
      </div>`;
    });

    const exp = q.exp[qLang] || q.exp.en || '';
    const tip = q.tip ? (q.tip[qLang] || q.tip.en || '') : '';
    const tipHtml = tip ? `<div class="atip">💡 ${tip}</div>` : '';

    return `<div class="qcard" id="${q.id}">
  <div class="qmeta"><span class="qnum">${q.id}</span><span class="qcat-badge">${CATEGORIES.find(c=>c.key===q.cat)?.icon||''} ${CATEGORIES.find(c=>c.key===q.cat)?.label?.[qLang]||q.cat}</span></div>
  <div class="qtext">${qtext}</div>
  ${signHtml}
  <div class="opts">${optsHtml}</div>
  <div class="answer" id="ans-${q.id}">
    <div class="alabel">✅ ${qLang==='pt'?'Resposta':qLang==='es'?'Respuesta':'Answer'}</div>
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
    const pool = this.getQuestionsForState();
    if(pool.length === 0){
      this.simMode = false;
      document.getElementById('sim-wrapper').style.display = 'none';
      document.getElementById('study-wrapper').style.display = 'block';
      this.renderQuiz();
      return;
    }
    const n = Math.min(30, pool.length);
    this.simMode = true;
    this.simAnswered = {};
    this.simQueue = [...pool].sort(() => Math.random() - 0.5).slice(0, n);
    this.simIdx = 0;
    document.getElementById('study-wrapper').style.display = 'none';
    document.getElementById('sim-wrapper').style.display = 'block';
    this.renderSimCard();
  },

  renderSimCard(){
    const q = this.simQueue[this.simIdx];
    const lang = this.lang;
    const qLang = this.questionLang(lang);
    const total = this.simQueue.length;
    const pct = Math.round((this.simIdx / total) * 100);

    document.getElementById('sim-progress-text').textContent = `${this.simIdx + 1} / ${total}`;
    document.getElementById('sim-progress-bar').style.width = pct + '%';

    const container = document.getElementById('sim-card-container');
    container.innerHTML = this.renderCard(q, lang, qLang);
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
    const qLang = this.questionLang(this.lang);
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
        <div class="sim-result-msg">${pass ? msgs.pass[qLang] : msgs.fail[qLang]}</div>
        <button class="btn btn-gold" type="button" data-action="mode-all" style="margin-top:20px">${msgs.back[qLang]}</button>
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
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
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
  empty_state_title: {pt:'Em breve para este estado',en:'Questions for this state are coming soon',es:'Preguntas para este estado: próximamente'},
  empty_state_sub:   {pt:'Por enquanto você pode continuar praticando WA.',en:'You can keep practising WA questions for now.',es:'Por ahora puedes seguir practicando WA.'},
  empty_title: {pt:'Sem questões nesta categoria!',en:'No questions in this category!',es:'¡Sin preguntas en esta categoría!'},
  empty_sub:   {pt:'Tente mudar o filtro ou o modo.',en:'Try changing the filter or mode.',es:'Prueba cambiando el filtro o el modo.'},
  subscribe_ok: {pt:'Obrigado! Inscrição registrada.',en:'Thanks! You are subscribed.',es:'¡Gracias! Te has suscrito.'},
  subscribe_err: {pt:'Digite um e-mail válido.',en:'Please enter a valid email.',es:'Introduce un correo válido.'},
  mode_all:    {pt:'Todas',en:'All',es:'Todas'},
  mode_wrong:  {pt:'Erradas',en:'Wrong',es:'Erradas'},
  mode_unans:  {pt:'Não respondidas',en:'Unanswered',es:'Sin responder'},
  mode_sim:    {pt:'Simulado (30 perguntas)',en:'Simulate (30 questions)',es:'Simulacro (30 preguntas)'},
};

function ldToggle(){ DW.ldToggle(); }
function setLang(lang, el){ DW.setLang(lang, el); }
window.DW = DW;

