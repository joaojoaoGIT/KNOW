/* ============ KNOW – App JS ============ */
(function(){
  // Sidebar toggle
  const sb = document.querySelector('.sidebar');
  const bd = document.querySelector('.backdrop');
  const burger = document.querySelector('.hamburger');
  function close(){ sb?.classList.remove('open'); bd?.classList.remove('show'); }
  burger?.addEventListener('click', ()=>{ sb.classList.toggle('open'); bd.classList.toggle('show'); });
  bd?.addEventListener('click', close);
  document.querySelectorAll('.sidebar__nav a').forEach(a=>a.addEventListener('click', close));

  // Mark active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar__nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });

  // Auth header state
  const u = JSON.parse(localStorage.getItem('know_user') || 'null');
  const headerLogin = document.querySelector('.header__login');
  if(headerLogin && u){
    headerLogin.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${u.name.split(' ')[0]}`;
    headerLogin.href = u.role === 'admin' ? 'admin.html' : 'area-aluno.html';
  }

  // Counters
  const counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const el = en.target;
          const target = +el.dataset.count;
          const suffix = el.dataset.suffix || '';
          let cur = 0, step = Math.max(1, target/60);
          const t = setInterval(()=>{
            cur += step;
            if(cur >= target){ cur = target; clearInterval(t); }
            el.textContent = Math.floor(cur).toLocaleString('pt-BR') + suffix;
          }, 24);
          io.unobserve(el);
        }
      });
    },{threshold:.4});
    counters.forEach(c=>io.observe(c));
  }

  // Reveal
  if(window.AOS){ AOS.init({duration:700, once:true, offset:60}); }
})();

// Toast
function toast(msg, type='success'){
  let t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = `<i class="fa-solid ${type==='success'?'fa-circle-check':'fa-circle-exclamation'}"></i> ${msg}`;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); }, 3200);
}

// Leads form
function bindLeadForm(){
  const f = document.getElementById('leadForm');
  if(!f) return;
  f.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fields = ['nome','idade','email','curso'];
    let ok = true;
    fields.forEach(n=>{
      const w = f.querySelector(`[data-field="${n}"]`);
      const inp = w.querySelector('input,select');
      const v = inp.value.trim();
      w.classList.remove('error');
      if(!v){ w.classList.add('error'); ok=false; return; }
      if(n==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ w.classList.add('error'); ok=false; }
      if(n==='idade' && (+v < 14 || +v > 99)){ w.classList.add('error'); ok=false; }
    });
    if(!ok){ toast('Preencha todos os campos corretamente','error'); return; }
    const leads = JSON.parse(localStorage.getItem('know_leads')||'[]');
    leads.push({
      id: Date.now(),
      nome: f.nome.value.trim(),
      idade: +f.idade.value,
      email: f.email.value.trim(),
      curso: f.curso.value,
      data: new Date().toISOString()
    });
    localStorage.setItem('know_leads', JSON.stringify(leads));
    f.reset();
    toast('Interesse registrado! Em breve entraremos em contato.');
  });
}
document.addEventListener('DOMContentLoaded', bindLeadForm);
