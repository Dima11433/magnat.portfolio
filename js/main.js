/**
 * PORTFOLIO SCRIPTS — MAGNAT & GLOCK PROJECTS 2026
 * Interactive features, filtering, quotes, clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAndScroll();
  initMobileMenu();
  initProjectFiltering();
  initQuotesGenerator();
  initClipboardActions();
  initScrollReveal();
  initInteractiveTerminal();
  initGlockEasterEgg();
});

/* ==========================================================================
   1. HEADER SCROLL & BACK TO TOP WITH PROGRESS RING
   ========================================================================== */
function initHeaderAndScroll() {
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const progressCircle = document.querySelector('.progress-ring-circle');
  const circumference = 157; // 2 * PI * 25

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollY > 300) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }

    if (progressCircle && docHeight > 0) {
      const scrollProgress = scrollY / docHeight;
      const offset = circumference - (scrollProgress * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }

    highlightActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   2. ACTIVE NAV LINK HIGHLIGHTER
   ========================================================================== */
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 150;
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
      mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileOverlay) return;

  let scrollPosition = 0;

  function openMenu() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    hamburger.classList.add('open');
    mobileOverlay.classList.add('open');
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    document.body.style.top = `-${scrollPosition}px`;
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }

  function toggleMenu() {
    if (mobileOverlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (mobileOverlay.classList.contains('open')) {
        closeMenu();
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            setTimeout(() => {
              targetElem.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          }
        }
      }
    });
  });

  // Block touchmove on background when menu is open
  document.addEventListener('touchmove', (e) => {
    if (mobileOverlay.classList.contains('open')) {
      if (!mobileOverlay.contains(e.target) || mobileOverlay === e.target) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   4. PROJECTS FILTERING (GLOCK BOTS)
   ========================================================================== */
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. INSPIRATIONAL QUOTES (MAGNAT'S TOP QUOTES)
   ========================================================================== */
const quotesCollection = [
  {
    text: "Твой главный актив — твоя голова и твое усердие. Инвестируй в них каждый день.",
    author: "MAGNAT"
  },
  {
    text: "Работай так, чтобы твой кошелек говорил громче любых слов.",
    author: "MAGNAT"
  },
  {
    text: "Хочешь изменить жизнь — начни с дисциплины, а не с понедельника.",
    author: "MAGNAT"
  },
  {
    text: "Кодинг под хорошую музыку превращает чистый энтузиазм в масштабную монополию.",
    author: "Glock Philosophy"
  },
  {
    text: "Результат создается не разговорами, а тысячами строк чистого работающего кода.",
    author: "MAGNAT"
  }
];

function initQuotesGenerator() {
  const quoteTextElem = document.getElementById('dynamicQuoteText');
  const quoteAuthorElem = document.getElementById('dynamicQuoteAuthor');
  const nextQuoteBtn = document.getElementById('nextQuoteBtn');

  if (!quoteTextElem || !nextQuoteBtn) return;

  let currentIdx = 0;

  nextQuoteBtn.addEventListener('click', () => {
    quoteTextElem.style.opacity = '0';
    if (quoteAuthorElem) quoteAuthorElem.style.opacity = '0';

    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * quotesCollection.length);
      while (nextIdx === currentIdx) {
        nextIdx = Math.floor(Math.random() * quotesCollection.length);
      }
      currentIdx = nextIdx;

      quoteTextElem.textContent = `"${quotesCollection[currentIdx].text}"`;
      if (quoteAuthorElem) quoteAuthorElem.textContent = `— ${quotesCollection[currentIdx].author}`;

      quoteTextElem.style.opacity = '1';
      if (quoteAuthorElem) quoteAuthorElem.style.opacity = '1';
    }, 200);
  });
}

/* ==========================================================================
   6. CLIPBOARD COPY ACTIONS
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(item => {
    item.addEventListener('click', () => {
      const textToCopy = item.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Скопировано: ${textToCopy} ✓`);
      }).catch(() => {
        showToast('Скопировано в буфер обмена!');
      });
    });
  });
}

/* Toast Message */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   7. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


/* ==========================================================================
   INTERACTIVE TERMINAL LOGIC
   ========================================================================== */
function initInteractiveTerminal() {
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const body = document.getElementById('terminalBody');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!form || !input || !body) return;

  const commands = {
    help: [
      'Доступные команды:',
      '  status  - статус всех ботов экосистемы',
      '  bots    - список и ссылки на ботов Glock',
      '  stack   - используемые технологии',
      '  music   - любимые треки под кодинг',
      '  goals   - цели монополии',
      '  clear   - очистить экран терминала'
    ],
    status: [
      '[✓] Glock Garant Bot: Active 🟢 (Escrow 24/7)',
      '[✓] Glock Payments: Online 🟢 (Virtual Cards Issue)',
      '[✓] Glock Models Shop: 24/7 🟢 (Auto-Delivery)',
      '[✓] Soundtrack: WORKAL 🎧 (Focus Mode ON)',
      'Ecosystem load: 100% Operational • 0 errors'
    ],
    bots: [
      'Экосистема Glock Projects:',
      '  1. Glock Projects -> t.me/glock_projects',
      '  2. Бот Гарант    -> t.me/glock_garant_bot?start=tr_scandalbio',
      '  3. Выдача Карт   -> t.me/glock_payments_bot?start=ref_6667583896',
      '  4. Модели Шоп    -> t.me/glock_models_bot?start=ref_6667583896'
    ],
    stack: [
      'Технологический стек MAGNAT:',
      '  • Python 3.14 (Asyncio, Aiogram, Requests, API)',
      '  • HTML5 & Modern CSS3 (Cyber-Glassmorphism)',
      '  • Git & GitHub CI/CD',
      '  • Фокус: Кодинг под музыку 24/7'
    ],
    music: [
      'Топ треки на репите:',
      '  1. WORKAL (Focus Mode)',
      '  2. 1 000 000 ₽ (Monopoly Vibe)',
      '  3. Инста модель (Night Coding)'
    ],
    goals: [
      'Цели MAGNAT & Glock Projects:',
      '  1. Сделать популярным Glock Projects',
      '  2. Построить масштабную монополию ботов',
      '  3. Стать лучшим в своей сфере'
    ]
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim().toLowerCase();
    if (!rawCmd) return;

    // Add user command line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="term-prompt">magnat@glock-server:~$</span> <span class="term-cmd">${escapeHtml(rawCmd)}</span>`;
    body.appendChild(userLine);

    if (rawCmd === 'clear') {
      body.innerHTML = '';
      const promptLine = document.createElement('div');
      promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span class="term-prompt">magnat@glock-server:~$</span> <span class="term-cursor">_</span>`;
      body.appendChild(promptLine);
      return;
    }

    if (commands[rawCmd]) {
      commands[rawCmd].forEach(line => {
        const outLine = document.createElement('div');
        outLine.className = 'terminal-line';
        if (line.includes('[✓]')) {
          outLine.className += ' term-success';
        } else if (line.startsWith('  •') || line.startsWith('  1.')) {
          outLine.className += ' term-cyan';
        } else {
          outLine.style.color = '#cbd5e1';
        }
        outLine.textContent = line;
        body.appendChild(outLine);
      });
    } else {
      const errLine = document.createElement('div');
      errLine.className = 'terminal-line';
      errLine.style.color = '#ef4444';
      errLine.textContent = `Команда не найдена: "${rawCmd}". Введите "help" для списка доступных команд.`;
      body.appendChild(errLine);
    }

    // Scroll to bottom
    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = '';
    executeCommand(val);
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
}

/* ==========================================================================
   EASTER EGG (GLOCK SOUND & LASER ACHIEVEMENT)
   ========================================================================== */
function initGlockEasterEgg() {
  const logo = document.querySelector('.logo');
  const easterModal = document.getElementById('easterModal');
  const closeBtn = document.getElementById('easterCloseBtn');

  if (!logo || !easterModal) return;

  let clickCount = 0;
  let timer = null;

  // Web Audio API Glock Reload Sound Generator (Zero latency, works offline)
  function playGlockSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Metallic slide click 1
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(160, audioCtx.currentTime + 0.08);
      gain1.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.08);

      // Heavy bolt chamber click 2
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.15);
        gain2.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.15);
      }, 110);
    } catch(e) {
      console.log('AudioContext not supported');
    }
  }

  logo.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;

    clearTimeout(timer);
    timer = setTimeout(() => {
      clickCount = 0;
    }, 2000);

    if (clickCount >= 5) {
      clickCount = 0;
      playGlockSound();
      showToast('🔫 GLOCK ПАСХАЛКА АКТИВИРОВАНА!');
      easterModal.classList.add('active');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      easterModal.classList.remove('active');
    });
  }

  easterModal.addEventListener('click', (e) => {
    if (e.target === easterModal) {
      easterModal.classList.remove('active');
    }
  });
}
