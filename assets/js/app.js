// App bootstrap and non-quiz interactions
(function(){
  function initStateSelector(){
    const cards = document.querySelectorAll('.state-card');
    const select = document.getElementById('state-select');
    const saved = localStorage.getItem('kl-state') || 'WA';
    function setState(code){
      localStorage.setItem('kl-state', code);
      cards.forEach(c => c.classList.toggle('active', c.dataset.state === code));
      cards.forEach(c => c.setAttribute('aria-pressed', c.dataset.state === code ? 'true' : 'false'));
      if(select) select.value = code === 'AU' ? 'AU' : code;
      if(window.DW && typeof window.DW.setState === 'function') window.DW.setState(code === 'AU' ? 'WA' : code);
    }
    cards.forEach(card => card.addEventListener('click', () => setState(card.dataset.state)));
    if(select) select.addEventListener('change', () => setState(select.value === 'AU' ? 'WA' : select.value));
    setState(saved);
  }

  window.addEventListener('DOMContentLoaded', () => {
    if(window.DW && typeof window.DW.init === 'function') window.DW.init();
    initStateSelector();
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

  const ldTrigger = document.getElementById('ld-trigger');
  const ldPanel = document.getElementById('ld-panel');
  if(ldTrigger && ldPanel){
    ldTrigger.setAttribute('aria-haspopup','listbox');
    ldTrigger.setAttribute('aria-expanded','false');
    const origToggle = window.ldToggle;
    window.ldToggle = function(){
      origToggle && origToggle();
      const isOpen = ldPanel.classList.contains('open');
      ldTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };
  }

  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeEmail = document.getElementById('subscribe-email');
  const subscribeFeedback = document.getElementById('subscribe-feedback');
  if(subscribeForm && subscribeEmail && subscribeFeedback){
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!subscribeEmail.validity.valid){
        subscribeFeedback.textContent = 'Please enter a valid email.';
        return;
      }
      subscribeFeedback.textContent = 'Thanks! You are subscribed.';
      subscribeForm.reset();
    });
  }
})();
