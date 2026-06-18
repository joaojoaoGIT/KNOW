/* Shared sidebar/header partial generator */
function renderShell(activePage, headerTitle){
  const u = JSON.parse(localStorage.getItem('know_user') || 'null');
  const initials = u ? u.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() : 'KN';
  const uname = u ? u.name : 'Visitante';
  const urole = u ? (u.role==='admin'?'Administrador':'Aluno KNOW') : 'Faça login';

  const items = [
    ['index.html','Início','fa-house'],
    ['sobre.html','Sobre','fa-circle-info'],
    ['cursos.html','Cursos','fa-graduation-cap'],
    ['quiz.html','Quiz Vocacional','fa-list-check'],
    ['raspadinha.html','Raspadinha','fa-ticket'],
    ['estrutura.html','Estrutura','fa-building-columns'],
    ['area-aluno.html','Área do Aluno','fa-user-graduate'],
    ['matriculas.html','Matrículas','fa-file-signature'],
    ['contato.html','Contato','fa-envelope'],
    ['admin.html','Painel Administrativo','fa-gauge-high'],
  ];

  const navHtml = items.map(([h,l,i])=>{
    const active = h===activePage ? ' active' : '';
    return `<a href="${h}" class="${active.trim()}"><i class="fa-solid ${i}"></i><span>${l}</span></a>`;
  }).join('');

  return `
  <aside class="sidebar" aria-label="Navegação principal">
    <div class="sidebar__brand">
      <img src="images/logo-know.png" alt="KNOW">
      <div class="sidebar__brand-text">
        <strong>Colégio KNOW</strong>
        <span>Técnico · Desde 2010</span>
      </div>
    </div>
    <div class="sidebar__profile">
      <div class="avatar">${initials}</div>
      <div>
        <strong>${uname}</strong>
        <small>${urole}</small>
      </div>
    </div>
    <nav class="sidebar__nav">
      <div class="sidebar__label">Navegação</div>
      ${navHtml}
    </nav>
    <div class="sidebar__footer">
      © ${new Date().getFullYear()} Colégio Técnico KNOW
    </div>
  </aside>
  <div class="backdrop"></div>
  <div class="main">
    <header class="header">
      <div class="header__left">
        <button class="hamburger" aria-label="Abrir menu"><i class="fa-solid fa-bars"></i></button>
        <div class="header__title">${headerTitle||''}</div>
      </div>
      <div class="header__actions">
        <button class="icon-btn notification-btn" id="notificationToggle" aria-label="Notificações">
          <i class="fa-regular fa-bell"></i>
          <span class="bell-badge" id="notificationBadge"></span>
        </button>
        <a class="header__login" href="${u?(u.role==='admin'?'admin.html':'area-aluno.html'):'login.html'}">
          <i class="fa-solid fa-${u?'circle-user':'right-to-bracket'}"></i> ${u?u.name.split(' ')[0]:'Entrar'}
        </a>
      </div>
    </header>
    <div class="content" id="content"></div>
  <div class="notifications-root" id="notificationsRoot"></div>
  </div>`;
}

function mountShell(activePage, headerTitle, contentHTML){
  document.getElementById('app').innerHTML = renderShell(activePage, headerTitle);
  document.getElementById('content').innerHTML = contentHTML;
}

function renderFooter(){
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer__brand">
            <img src="images/logo-know.png" alt="">
            <strong>Colégio Técnico KNOW</strong>
          </div>
          <p style="color:rgba(255,255,255,.7);font-size:.9rem">Conhecimento que transforma, tecnologia que conecta, futuro que acontece.</p>
          <div class="footer__social">
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4>Institucional</h4>
          <a href="sobre.html">Sobre</a>
          <a href="estrutura.html">Estrutura</a>
          <a href="contato.html">Contato</a>
        </div>
        <div>
          <h4>Cursos</h4>
          <a href="curso-informatica.html">Informática</a>
          <a href="curso-enfermagem.html">Enfermagem</a>
          <a href="curso-administracao.html">Administração</a>
        </div>
        <div>
          <h4>Ferramentas</h4>
          <a href="https://squoosh.app" target="_blank" rel="noopener">Squoosh (otimização/resize)</a>
          <a href="https://colab.research.google.com/github/xinntao/Real-ESRGAN/blob/master/colab/Real-ESRGAN.ipynb" target="_blank" rel="noopener">Real-ESRGAN (Google Colab)</a>
        </div>
        <div>
          <h4>Contato</h4>
          <a href="#"><i class="fa-solid fa-location-dot"></i> Av. da Inovação, 1024</a>
          <a href="#"><i class="fa-solid fa-phone"></i> (51) 3003-KNOW</a>
          <a href="#"><i class="fa-solid fa-envelope"></i> matriculas@colegioknow.com.br</a>
        </div>
      </div>
      <div class="footer__bottom">© ${new Date().getFullYear()} Colégio Técnico KNOW · Todos os direitos reservados</div>
    </div>
  </footer>`;
}
