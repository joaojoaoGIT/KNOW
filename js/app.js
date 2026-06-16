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
function addLead(lead){
  const leads = JSON.parse(localStorage.getItem('know_leads')||'[]');
  leads.push(lead);
  localStorage.setItem('know_leads', JSON.stringify(leads));
}
function getNotifications(){ return JSON.parse(localStorage.getItem('know_notifications') || '[]'); }
function saveNotifications(items){ localStorage.setItem('know_notifications', JSON.stringify(items)); }
function addNotification(item){
  const items = getNotifications();
  if(items.some(existing => existing.id === item.id)) return;
  items.push({ ...item, seen:false, shown:false, createdAt: Date.now() });
  saveNotifications(items);
}
function getUnreadCount(){ return getNotifications().filter(item => !item.seen).length; }
function updateNotificationBadge(){
  const badge = document.getElementById('notificationBadge');
  if(!badge) return;
  badge.style.display = getUnreadCount() ? 'block' : 'none';
}
function markNotificationSeen(id){
  const items = getNotifications().map(item => item.id === id ? {...item, seen:true} : item);
  saveNotifications(items);
  updateNotificationBadge();
}
function markAllNotificationsRead(){
  const items = getNotifications().map(item => ({...item, seen:true}));
  saveNotifications(items);
  updateNotificationBadge();
}
function buildNotificationPanel(){
  const root = document.getElementById('notificationsRoot');
  if(!root) return null;
  let panel = root.querySelector('.notification-panel');
  if(!panel){
    panel = document.createElement('div');
    panel.className = 'notification-panel';
    root.appendChild(panel);
  }
  const items = getNotifications();
  const listHtml = items.length ? items.map(item => `
      <div class="notification-item">
        <h4>${item.title}</h4>
        <p>${item.message}</p>
        <a href="${item.href}">Abrir</a>
      </div>
    `).join('') : '<div class="notification-item"><p>Sem notificações no momento.</p></div>';
  panel.innerHTML = `
    <div class="panel-header">
      <strong>Notificações</strong>
      <button type="button" aria-label="Fechar">×</button>
    </div>
    <div class="panel-list">${listHtml}</div>
  `;
  panel.querySelector('button')?.addEventListener('click', closeNotificationPanel);
  panel.querySelectorAll('.notification-item a').forEach((link, index) => {
    link.addEventListener('click', () => markNotificationSeen(items[index].id));
  });
  return panel;
}
function openNotificationPanel(){
  const panel = buildNotificationPanel();
  if(!panel) return;
  panel.classList.add('open');
  markAllNotificationsRead();
}
function closeNotificationPanel(){
  const root = document.getElementById('notificationsRoot');
  const panel = root?.querySelector('.notification-panel');
  if(panel) panel.classList.remove('open');
}
function showTopRightNotifications(){
  const root = document.getElementById('notificationsRoot');
  if(!root) return;
  const items = getNotifications();
  const unseen = items.filter(item => !item.shown);
  if(!unseen.length) return;
  unseen.forEach(item => {
    const card = document.createElement('article');
    card.className = 'notification-card';
    card.innerHTML = `
      <button class="close-card" aria-label="Fechar">×</button>
      <h4>${item.title}</h4>
      <p>${item.message}</p>
      <a href="${item.href}">Abrir</a>
    `;
    card.querySelector('.close-card')?.addEventListener('click', e => {
      e.stopPropagation();
      markNotificationSeen(item.id);
      card.remove();
    });
    card.querySelector('a')?.addEventListener('click', () => markNotificationSeen(item.id));
    root.appendChild(card);
    setTimeout(() => card.remove(), 11000);
  });
  saveNotifications(items.map(item => item.shown ? item : {...item, shown:true}));
}
function bindNotifications(){
  const btn = document.getElementById('notificationToggle');
  const root = document.getElementById('notificationsRoot');
  if(!btn || !root) return;
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const panel = root.querySelector('.notification-panel');
    if(panel?.classList.contains('open')){
      closeNotificationPanel();
    } else {
      openNotificationPanel();
    }
  });
  document.addEventListener('click', closeNotificationPanel);
  root.addEventListener('click', e => e.stopPropagation());
  updateNotificationBadge();
  showTopRightNotifications();
}
document.addEventListener('DOMContentLoaded', bindNotifications);
