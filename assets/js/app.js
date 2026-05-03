// App bootstrap and non-quiz interactions
(function(){
  function initStateSelector(){
    const cards = document.querySelectorAll('.state-card');
    const select = document.getElementById('state-select');
    const saved = localStorage.getItem('kl-state') || 'WA';

    function applyUI(code){
      cards.forEach(c => {
        const on = c.dataset.state === code;
        c.classList.toggle('active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      if(select) select.value = code;
    }

    function setState(code){
      if(!code) return;
      localStorage.setItem('kl-state', code);
      applyUI(code);
      if(window.DW && typeof window.DW.setState === 'function'){
        window.DW.setState(code);
      }
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        if(card.classList.contains('coming-soon')) return;
        setState(card.dataset.state);
      });
    });

    if(select){
      select.addEventListener('change', () => setState(select.value));
    }

    setState(saved);
  }

  window.addEventListener('DOMContentLoaded', () => {
    if(window.DW && typeof window.DW.init === 'function') window.DW.init();
    initStateSelector();

    // Mock test actions
    document.querySelectorAll('[data-action="mode-sim"]').forEach(el => {
      el.addEventListener('click', () => setTimeout(() => window.DW?.setMode?.('sim'), 30));
    });

    // Topic quick filter
    document.querySelectorAll('.topic-card[data-cat]').forEach(card => {
      card.addEventListener('click', () => setTimeout(() => window.DW?.setCat?.(card.dataset.cat), 30));
    });

    // Language dropdown: remove inline dependencies
    const ldTrigger = document.getElementById('ld-trigger');
    if(ldTrigger) ldTrigger.addEventListener('click', () => window.DW?.ldToggle?.());
    document.querySelectorAll('.ld-option[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => window.DW?.setLang?.(btn.dataset.lang, btn));
    });
  });

  const bar = document.getElementById('reading-progress');
  if(bar){
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
      bar.setAttribute('aria-valuenow', String(Math.min(Math.round(pct), 100)));
    }, {passive: true});
  }

  const ldPanel = document.getElementById('ld-panel');
  const ldTrigger2 = document.getElementById('ld-trigger');
  if(ldTrigger2 && ldPanel){
    ldTrigger2.setAttribute('aria-haspopup','listbox');
    ldTrigger2.setAttribute('aria-expanded','false');
    const origToggle = window.DW?.ldToggle?.bind(window.DW);
    if(origToggle){
      window.DW.ldToggle = function(){
        origToggle();
        const isOpen = ldPanel.classList.contains('open');
        ldTrigger2.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      };
    }
  }

  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeEmail = document.getElementById('subscribe-email');
  const subscribeFeedback = document.getElementById('subscribe-feedback');
  if(subscribeForm && subscribeEmail && subscribeFeedback){
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!subscribeEmail.validity.valid){
        subscribeFeedback.textContent = window.DW?.t?.('subscribe_err') || 'Please enter a valid email.';
        return;
      }
      subscribeFeedback.textContent = window.DW?.t?.('subscribe_ok') || 'Thanks! You are subscribed.';
      subscribeForm.reset();
    });
  }
})();
