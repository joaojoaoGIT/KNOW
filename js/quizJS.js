var _yr = document.getElementById('yr'); if (_yr) _yr.textContent = new Date().getFullYear();

/* BANCO DE QUESTÕES — perguntas reformuladas para serem menos óbvias */
const QUESTIONS = [
  {
    q: "O que mais te atrai no mundo profissional?",
    opts: [
      { l:"A", t:"Resolver problemas complexos com lógica e criatividade", v:"A" },
      { l:"B", t:"Ajudar pessoas e contribuir com o bem-estar delas",      v:"B" },
      { l:"C", t:"Organizar projetos e liderar equipes rumo a resultados",  v:"C" }
    ]
  },
  {
    q: "Qual atividade você mais curtia na escola?",
    opts: [
      { l:"A", t:"Lidar com sistemas, resolver problemas lógicos e experimentar soluções",           v:"A" },
      { l:"B", t:"Aprender com situações práticas que envolvem pessoas e cuidados",                 v:"B" },
      { l:"C", t:"Planejar atividades, negociar ou coordenar tarefas com colegas",                  v:"C" }
    ]
  },
  {
    q: "Qual é o seu estilo de trabalho preferido?",
    opts: [
      { l:"A", t:"Autônomo e criativo, explorando soluções técnicas inovadoras", v:"A" },
      { l:"B", t:"Colaborativo e humano, focado no cuidado com as pessoas",      v:"B" },
      { l:"C", t:"Estratégico e analítico, pensando no quadro geral",            v:"C" }
    ]
  },
  {
    q: "Onde você se imagina atuando daqui a 5 anos?",
    opts: [
      { l:"A", t:"Trabalhando com ferramentas e processos que envolvem tecnologia e soluções",    v:"A" },
      { l:"B", t:"Em rotinas onde o cuidado, a atenção e a interação humana sejam centrais",       v:"B" },
      { l:"C", t:"Coordenando pessoas e planejando entregas para atingir metas",                  v:"C" }
    ]
  },
  {
    q: "Se você ganhasse um fim de semana livre, o que faria?",
    opts: [
      { l:"A", t:"Criaria algo prático, testaria ideias e construiria um protótipo",            v:"A" },
      { l:"B", t:"Participaria de ações que envolvem ajudar outras pessoas ou aprender técnicas de cuidado", v:"B" },
      { l:"C", t:"Organizaria compromissos, faria planejamento e pensaria em estratégias",     v:"C" }
    ]
  },
  {
    q: "Qual dessas habilidades é mais sua?",
    opts: [
      { l:"A", t:"Pensar de forma lógica e depurar problemas passo a passo",   v:"A" },
      { l:"B", t:"Ter empatia e agir com calma em situações de pressão",        v:"B" },
      { l:"C", t:"Comunicar ideias e convencer pessoas com clareza",            v:"C" }
    ]
  },
  {
    q: "O que mais te incomoda em um trabalho?",
    opts: [
      { l:"A", t:"Fazer tarefas repetitivas sem espaço para inovar",       v:"A" },
      { l:"B", t:"Trabalhar isolado, sem contato com outras pessoas",       v:"B" },
      { l:"C", t:"Falta de planejamento e processos desorganizados",       v:"C" }
    ]
  },
  {
    q: "Como você prefere aprender coisas novas?",
    opts: [
      { l:"A", t:"Experimentando na prática: montar, programar, testar e iterar",    v:"A" },
      { l:"B", t:"Simulando situações reais em laboratórios supervisionados",         v:"B" },
      { l:"C", t:"Analisando casos de sucesso e aplicando frameworks de gestão",      v:"C" }
    ]
  },
  {
    q: "Qual área de conhecimento mais desperta sua curiosidade?",
    opts: [
      { l:"A", t:"Tópicos técnicos que envolvem lógica, dados e ferramentas digitais", v:"A" },
      { l:"B", t:"Assuntos práticos ligados ao bem-estar e suporte a outras pessoas",   v:"B" },
      { l:"C", t:"Temas ligados a organização, finanças e gestão de equipes",          v:"C" }
    ]
  },
  {
    q: "Diante de um problema, qual é sua primeira reação?",
    opts: [
      { l:"A", t:"Investigar as causas técnicas e experimentar correções práticas",               v:"A" },
      { l:"B", t:"Avaliar as pessoas envolvidas e agir para reduzir impactos sobre elas",        v:"B" },
      { l:"C", t:"Estruturar etapas e delegar tarefas para resolver de forma organizada",         v:"C" }
    ]
  },
  {
    q: "Qual dessas frases soa mais com você?",
    opts: [
      { l:"A", t:"Gosto de automatizar tarefas e encontrar soluções técnicas elegantes.",    v:"A" },
      { l:"B", t:"Sinto-me realizado ao apoiar alguém em momentos difíceis.",                 v:"B" },
      { l:"C", t:"Satisfaz-me ver processos bem organizados entregando resultados.",         v:"C" }
    ]
  },
  {
    q: "Qual tipo de impacto você quer causar na sociedade?",
    opts: [
      { l:"A", t:"Criar tecnologias que facilitem a vida das pessoas", v:"A" },
      { l:"B", t:"Salvar vidas e melhorar a saúde da comunidade",      v:"B" },
      { l:"C", t:"Gerar empregos e movimentar a economia",             v:"C" }
    ]
  },
  {
    q: "Que papel você costuma assumir em projetos informais?",
    opts: [
      { l:"A", t:"A pessoa que testa soluções, monta protótipos e experimenta",   v:"A" },
      { l:"B", t:"Quem cuida do bem-estar do grupo e garante suporte prático",     v:"B" },
      { l:"C", t:"Quem estrutura prazos, define metas e controla o andamento",     v:"C" }
    ]
  },
  {
    q: "Como você reage quando a tecnologia trava?",
    opts: [
      { l:"A", t:"Sinto prazer em resolver: abro o terminal e começo a depurar",     v:"A" },
      { l:"B", t:"Fico impaciente, prefiro resolver com pessoas do que com máquinas", v:"B" },
      { l:"C", t:"Organizo um plano alternativo para não perder produtividade",       v:"C" }
    ]
  },
  {
    q: "Que tipo de projeto te motiva mais?",
    opts: [
      { l:"A", t:"Construir algo funcional que outras pessoas possam usar", v:"A" },
      { l:"B", t:"Desenvolver iniciativas que melhorem a vida das pessoas", v:"B" },
      { l:"C", t:"Criar planos que ajudem a tirar ideias do papel e monetizá-las", v:"C" }
    ]
  },
  {
    q: "O que você acha mais fascinante no mercado atual?",
    opts: [
      { l:"A", t:"O crescimento exponencial da área de dados e Inteligência Artificial", v:"A" },
      { l:"B", t:"O investimento em saúde preventiva e telemedicina",                    v:"B" },
      { l:"C", t:"O surgimento de startups e novos modelos de negócio",                  v:"C" }
    ]
  },
  {
    q: "Em grupo, qual papel você costuma assumir?",
    opts: [
      { l:"A", t:"O técnico — resolve os problemas mais difíceis do projeto",          v:"A" },
      { l:"B", t:"O cuidador — garante que todos estejam bem e se sentindo ouvidos",   v:"B" },
      { l:"C", t:"O líder — organiza as tarefas e mantém o foco nos objetivos",        v:"C" }
    ]
  },
  {
    q: "Qual frase descreve melhor sua visão de sucesso?",
    opts: [
      { l:"A", t:"\"Construir algo que funciona e que as pessoas usam todo dia.\"",  v:"A" },
      { l:"B", t:"\"Ser reconhecido por fazer diferença na vida de quem cuido.\"",   v:"B" },
      { l:"C", t:"\"Ter um negócio ou carreira que gera resultado e impacto.\"",     v:"C" }
    ]
  },
  {
    q: "Como você prefere o seu ambiente de trabalho?",
    opts: [
      { l:"A", t:"Espaços com foco em experimentação e uso de ferramentas digitais", v:"A" },
      { l:"B", t:"Lugares com rotina de cuidado, processos e supervisão prática",   v:"B" },
      { l:"C", t:"Ambientes orientados a metas, reuniões e coordenação de equipes", v:"C" }
    ]
  },
  {
    q: "Qual desses desafios você toparia encarar agora?",
    opts: [
      { l:"A", t:"Desenvolver um protótipo funcional em pouco tempo",                    v:"A" },
      { l:"B", t:"Assumir uma tarefa que exige cuidado e atenção contínua a pessoas",     v:"B" },
      { l:"C", t:"Preparar e apresentar uma proposta para convencer outras pessoas",      v:"C" }
    ]
  },
  {
    q: "Quando aprende algo novo, o que mais te motiva?",
    opts: [
      { l:"A", t:"Entender como as coisas funcionam por dentro e aplicar na prática", v:"A" },
      { l:"B", t:"Saber que posso usar o conhecimento para ajudar alguém",           v:"B" },
      { l:"C", t:"Conseguir organizar o conteúdo e transformar em um processo replicável", v:"C" }
    ]
  },
  {
    q: "Em uma tarefa em equipe, qual aspecto você mais valoriza?",
    opts: [
      { l:"A", t:"Que a parte técnica esteja bem resolvida e documentada", v:"A" },
      { l:"B", t:"Que haja cuidado com cada pessoa e suporte mútuo",         v:"B" },
      { l:"C", t:"Que exista um plano claro e responsabilidades definidas", v:"C" }
    ]
  },
  {
    q: "Se tivesse que escolher uma atividade para um projeto pessoal, qual seria?",
    opts: [
      { l:"A", t:"Construir algo que automatize uma tarefa",            v:"A" },
      { l:"B", t:"Criar algo voltado ao bem-estar ou cuidado de usuários", v:"B" },
      { l:"C", t:"Planejar e coordenar a execução para atingir um objetivo", v:"C" }
    ]
  }
];

/* ══════════════════════════════════════════════════════════
   CONFIGURAÇÃO
══════════════════════════════════════════════════════════ */
const TOTAL_SHOWN = 6; // número de perguntas exibidas por execução

/* ══════════════════════════════════════════════════════════
   PERFIS
══════════════════════════════════════════════════════════ */
const PROFILES = {
  A: {
    cls: 'tech', icon: 'fa-laptop-code', label: 'Tecnologia',
    course: 'Técnico em Informática',
    headline: 'Você tem perfil de Tecnologia!',
    desc: 'Seu raciocínio lógico, curiosidade por sistemas e gosto por resolver problemas técnicos indicam que você nasceu para o mundo da computação. O curso Técnico em Informática da KNOW vai transformar esse potencial em uma carreira sólida e bem remunerada.',
    incentive: 'Profissionais de TI estão entre os mais demandados do Brasil. Nosso curso abre portas para desenvolvimento web, suporte, dados e muito mais. A demanda supera a oferta — seja você a diferença!',
    link: 'curso-informatica.html'
  },
  B: {
    cls: 'saude', icon: 'fa-heart-pulse', label: 'Saúde',
    course: 'Técnico em Enfermagem',
    headline: 'Você tem perfil de Saúde!',
    desc: 'Sua empatia, calma sob pressão e desejo genuíno de cuidar das pessoas revelam um talento natural para a área da saúde. O curso Técnico em Enfermagem da KNOW combina formação humanizada com prática real em laboratórios de simulação clínica.',
    incentive: 'O setor de saúde nunca para de crescer. Com a KNOW, você sai preparado para atuar em hospitais, UBSs e clínicas desde o primeiro dia. Vagas garantidas para quem tem formação de qualidade!',
    link: 'curso-enfermagem.html'
  },
  C: {
    cls: 'adm', icon: 'fa-briefcase', label: 'Gestão',
    course: 'Técnico em Administração',
    headline: 'Você tem perfil de Gestão!',
    desc: 'Sua capacidade de planejar, liderar e enxergar o quadro geral indicam um gestor em potencial. O curso Técnico em Administração da KNOW vai afiar essas competências com conteúdo prático em finanças, marketing, empreendedorismo e gestão de equipes.',
    incentive: 'Empresas de todos os portes precisam de bons gestores. O Técnico em Administração da KNOW abre portas no RH, financeiro, comercial e até para quem quer empreender do zero. Sua carreira começa aqui!',
    link: 'curso-administracao.html'
  }
};

/* ══════════════════════════════════════════════════════════
   ESTADO
══════════════════════════════════════════════════════════ */
var state = {
  screen: 'welcome',
  questions: [],
  current: 0,
  answers: [],
  scores: { A:0, B:0, C:0 }
};

/* ══════════════════════════════════════════════════════════
   UTILITÁRIOS
══════════════════════════════════════════════════════════ */
function pickQuestions() {
  var arr = QUESTIONS.slice();
  // Fisher-Yates shuffle
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr.slice(0, TOTAL_SHOWN);
}

function calcWinner(scores) {
  var max = Math.max(scores.A, scores.B, scores.C);
  var tied = ['A','B','C'].filter(function(k){ return scores[k] === max; });
  var winner = tied[Math.floor(Math.random() * tied.length)];
  return { winner: winner, isTie: tied.length > 1 };
}

/* ══════════════════════════════════════════════════════════
   RENDER
══════════════════════════════════════════════════════════ */
function render() {
  var root = document.getElementById('quiz-root');
  if (!root) return;
  if (state.screen === 'welcome')    root.innerHTML = tplWelcome();
  else if (state.screen === 'quiz')  root.innerHTML = tplQuiz();
  else                               root.innerHTML = tplResult();
  bindEvents();
}

/* ── Tela de boas-vindas ── */
function tplWelcome() {
  return '<div class="quiz-card">' +
    '<div class="quiz-accent"></div>' +
    '<div class="quiz-inner">' +
      '<div class="welcome-icon"><i class="fa-solid fa-compass"></i></div>' +
      '<h2 class="welcome-title">Descubra sua Profissão do Futuro</h2>' +
      '<p class="welcome-sub">Responda ' + TOTAL_SHOWN + ' perguntas rápidas e descubra qual curso técnico da KNOW combina com seu perfil e potencial.</p>' +
      '<div class="quiz-pills">' +
        '<span class="quiz-pill"><i class="fa-solid fa-clock"></i> ~3 minutos</span>' +
        '<span class="quiz-pill"><i class="fa-solid fa-list-check"></i> ' + TOTAL_SHOWN + ' perguntas</span>' +
        '<span class="quiz-pill"><i class="fa-solid fa-graduation-cap"></i> 3 cursos avaliados</span>' +
      '</div>' +
      '<button class="btn-start" id="startBtn"><i class="fa-solid fa-rocket"></i> Iniciar Quiz</button>' +
    '</div>' +
  '</div>';
}

/* ── Tela do quiz ── */
function tplQuiz() {
  var q = state.questions[state.current];
  var pct = Math.round((state.current / state.questions.length) * 100);
  var chosen = state.answers[state.current] || null;
  var isLast = state.current === state.questions.length - 1;

  var optionsHTML = '';
  for (var i = 0; i < q.opts.length; i++) {
    var o = q.opts[i];
    var sel = chosen === o.v ? ' selected' : '';
    optionsHTML += '<button class="option-btn' + sel + '" data-val="' + o.v + '">' +
      '<span class="opt-ltr">' + o.l + '</span>' +
      '<span>' + o.t + '</span>' +
    '</button>';
  }

  var backBtn = state.current > 0
    ? '<button class="btn-nav btn-back" id="backBtn"><i class="fa-solid fa-arrow-left"></i> Anterior</button>'
    : '';
  var nextLabel = isLast
    ? '<i class="fa-solid fa-flag-checkered"></i> Ver resultado'
    : 'Próxima <i class="fa-solid fa-arrow-right"></i>';
  var disabled = !chosen ? ' disabled' : '';

  return '<div class="quiz-card">' +
    '<div class="quiz-accent"></div>' +
    '<div class="quiz-inner">' +
      '<div class="progress-wrap">' +
        '<div class="progress-meta">' +
          '<span>Pergunta ' + (state.current + 1) + ' de ' + state.questions.length + '</span>' +
          '<span>' + pct + '% concluído</span>' +
        '</div>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<div class="q-label">Pergunta ' + (state.current + 1) + '</div>' +
      '<p class="q-text">' + q.q + '</p>' +
      '<div class="options-list">' + optionsHTML + '</div>' +
      '<div class="quiz-nav">' +
        backBtn +
        '<button class="btn-nav btn-next" id="nextBtn"' + disabled + '>' + nextLabel + '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

/* ── Tela de resultado ── */
function tplResult() {
  var r = calcWinner(state.scores);
  var p = PROFILES[r.winner];
  var scores = state.scores;
  var total = TOTAL_SHOWN;

  // Salva histórico
  try {
    var hist = JSON.parse(localStorage.getItem('know_quiz_history') || '[]');
    hist.unshift({ date: new Date().toISOString(), profile: p.label, course: p.course, scores: scores });
    localStorage.setItem('know_quiz_history', JSON.stringify(hist.slice(0, 10)));
  } catch(e) {}

  var bars = [['A','Informática','tech'],['B','Enfermagem','saude'],['C','Administração','adm']];
  var barsHTML = '';
  for (var i = 0; i < bars.length; i++) {
    var b = bars[i];
    var w = total > 0 ? Math.round((scores[b[0]] / total) * 100) : 0;
    barsHTML += '<div class="score-row">' +
      '<span class="score-label">' + b[1] + '</span>' +
      '<div class="score-track"><div class="score-fill ' + b[2] + '" style="width:' + w + '%"></div></div>' +
      '<span class="score-count">' + scores[b[0]] + '</span>' +
    '</div>';
  }

  var tieNote = r.isTie
    ? '<p class="tie-note"><i class="fa-solid fa-shuffle"></i> Empate detectado — resultado definido por sorteio.</p>'
    : '';

  return '<div class="quiz-card">' +
    '<div class="quiz-accent"></div>' +
    '<div class="quiz-inner result-wrap">' +
      '<div class="result-icon ' + p.cls + '"><i class="fa-solid ' + p.icon + '"></i></div>' +
      '<span class="result-badge ' + p.cls + '">' + p.label + '</span>' +
      '<h2>' + p.headline + '</h2>' +
      '<p class="result-desc">' + p.desc + '</p>' +
      '<div class="score-bars">' + barsHTML + '</div>' +
      tieNote +
      '<div class="incentive-box">' +
        '<h4><i class="fa-solid fa-fire" style="margin-right:6px"></i>Por que escolher a KNOW?</h4>' +
        '<p>' + p.incentive + '</p>' +
      '</div>' +
      '<div class="result-ctas">' +
        '<a class="btn-cta btn-cta-primary" href="matriculas.html"><i class="fa-solid fa-file-signature"></i> Matricule-se agora</a>' +
        '<a class="btn-cta btn-cta-secondary" href="' + p.link + '"><i class="fa-solid fa-graduation-cap"></i> Ver o curso</a>' +
      '</div>' +
      '<button class="btn-restart" id="restartBtn"><i class="fa-solid fa-rotate-right"></i> Refazer o quiz</button>' +
      '<p class="saved-note"><i class="fa-solid fa-database"></i> Resultado salvo no seu navegador.</p>' +
    '</div>' +
  '</div>';
}

/* ══════════════════════════════════════════════════════════
   EVENTOS
══════════════════════════════════════════════════════════ */
function bindEvents() {
  var startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      state.questions = pickQuestions();
      state.current   = 0;
      state.answers   = [];
      state.scores    = { A:0, B:0, C:0 };
      state.screen    = 'quiz';
      render();
    });
  }

  // Melhor experiência ao selecionar: atualiza apenas o necessário no DOM
  var opts = document.querySelectorAll('.option-btn');
  for (var i = 0; i < opts.length; i++) {
    opts[i].addEventListener('click', function(e) {
      var val = this.dataset.val;
      state.answers[state.current] = val;

      // Atualiza classe visual apenas nas opções (sem re-render completo)
      var list = this.parentNode.querySelectorAll('.option-btn');
      for (var j = 0; j < list.length; j++) list[j].classList.remove('selected');
      this.classList.add('selected');

      // Habilita o botão "Próxima" sem reconstruir tudo
      var nextBtnLocal = document.getElementById('nextBtn');
      if (nextBtnLocal) nextBtnLocal.disabled = false;
    });
  }

  var backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      state.current--;
      render();
    });
  }

  var nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (!state.answers[state.current]) return;
      if (state.current < state.questions.length - 1) {
        state.current++;
        render();
      } else {
        state.scores = { A:0, B:0, C:0 };
        for (var i = 0; i < state.answers.length; i++) {
          var v = state.answers[i];
          if (v) state.scores[v]++;
        }
        state.screen = 'result';
        render();
      }
    });
  }

  var restartBtn = document.getElementById('restartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', function() {
      state.screen = 'welcome';
      render();
    });
  }
}

/* ══════════════════════════════════════════════════════════
   INICIAR — DOM já está pronto (script está no fim do body)
══════════════════════════════════════════════════════════ */
render();