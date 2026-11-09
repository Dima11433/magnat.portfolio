/**
 * PORTFOLIO SCRIPTS — MAGNAT 2026
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
  initCyberEasterEgg();
  initSoundToggle();
  initThemeSwitcher();
  init3DTilt();
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
   4. PROJECTS FILTERING
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
    author: "MAGNAT Philosophy"
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
      '  status   - статус проектов и серверов',
      '  projects - список открытых веб-проектов',
      '  stack    - используемые технологии',
      '  music    - любимые треки под кодинг',
      '  goals    - цели и ориентиры',
      '  clear    - очистить экран терминала'
    ],
    status: [
      '[✓] Крипто Обменник: Online 🟢 (GitHub Pages)',
      '[✓] CORTEZ FAMq: Online 🟢 (GitHub Pages)',
      '[✓] Soundtrack: WORKAL 🎧 (Focus Mode ON)',
      'Status: 100% Operational • All projects active'
    ],
    projects: [
      'Избранные сайты на GitHub:',
      '  1. Крипто Обменник -> dima11433.github.io/crypto-3d-converter',
      '  2. CORTEZ FAMq     -> dima11433.github.io/cortez-family-site'
    ],
    bots: [
      'Избранные сайты на GitHub:',
      '  1. Крипто Обменник -> dima11433.github.io/crypto-3d-converter',
      '  2. CORTEZ FAMq     -> dima11433.github.io/cortez-family-site'
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
      'Цели MAGNAT:',
      '  1. Развивать независимые IT-продукты',
      '  2. Построить масштабную сеть ботов',
      '  3. Стать лучшим в своей сфере'
    ]
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim().toLowerCase();
    if (!rawCmd) return;

    // Add user command line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="term-prompt">magnat@server:~$</span> <span class="term-cmd">${escapeHtml(rawCmd)}</span>`;
    body.appendChild(userLine);

    if (rawCmd === 'clear') {
      body.innerHTML = '';
      const promptLine = document.createElement('div');
      promptLine.className = 'terminal-line';
      promptLine.innerHTML = `<span class="term-prompt">magnat@server:~$</span> <span class="term-cursor">_</span>`;
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
   EASTER EGG (PURE CINEMATIC LASER FX, NO TEXT)
   ========================================================================== */
function initCyberEasterEgg() {
  const logo = document.querySelector('.logo');
  const fxOverlay = document.getElementById('laserScreenFx');

  if (!logo || !fxOverlay) return;

  let clickCount = 0;
  let timer = null;

  // Web Audio API Reload & Laser Sound Generator
  function playCyberSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Metallic slide click
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.09);
      gain1.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.09);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.09);

      // Heavy bolt chamber click + laser pulse
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.22);
        gain2.gain.setValueAtTime(0.55, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.22);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.22);
      }, 100);
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
      playCyberSound();

      // Trigger pure fullscreen laser & shockwave animation
      fxOverlay.classList.remove('active');
      void fxOverlay.offsetWidth; // force reflow
      fxOverlay.classList.add('active');

      setTimeout(() => {
        fxOverlay.classList.remove('active');
      }, 1600);
    }
  });
}


/* ==========================================================================
   26. CYBER UI SOUND FX (WEB AUDIO API SYNTHESIZER)
   ========================================================================== */
const SoundFX = (() => {
  let audioCtx = null;
  let isMuted = true;

  function initCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, gainVal = 0.2) {
    if (isMuted) return;
    try {
      initCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
  }

  return {
    click: () => {
      // Tactile cyber click
      playTone(680, 'sine', 0.05, 0.15);
    },
    hover: () => {
      // Very subtle blip
      playTone(1200, 'triangle', 0.02, 0.04);
    },
    theme: () => {
      // Two-tone chime
      playTone(480, 'sine', 0.08, 0.15);
      setTimeout(() => playTone(720, 'triangle', 0.12, 0.15), 60);
    },
    copy: () => {
      // Ascending chirp
      playTone(520, 'sine', 0.05, 0.15);
      setTimeout(() => playTone(660, 'sine', 0.06, 0.15), 50);
      setTimeout(() => playTone(880, 'triangle', 0.1, 0.2), 110);
    },
    toggleMute: () => {
      isMuted = !isMuted;
      localStorage.setItem('magnat_sfx_muted', isMuted);
      return isMuted;
    },
    isMuted: () => isMuted
  };
})();

function initSoundToggle() {
  const toggleBtns = document.querySelectorAll('.sfx-toggle-btn');

  function updateIcon() {
    const muted = SoundFX.isMuted();
    toggleBtns.forEach(btn => {
      btn.innerHTML = `<span class="sfx-icon">${muted ? '🔇' : '🔊'}</span>`;
      if (muted) btn.classList.add('muted');
      else btn.classList.remove('muted');
    });
  }

  updateIcon();

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const muted = SoundFX.toggleMute();
      updateIcon();
      showToast(muted ? 'Звуки интерфейса выключены 🔇' : 'Звуки интерфейса включены 🔊');
      if (!muted) SoundFX.click();
    });
  });

  // Attach click sound to interactive buttons and links
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .btn, .nav-link, .mobile-nav-link, .filter-btn, .quick-cmd-btn');
    if (target && !target.classList.contains('sfx-toggle-btn')) {
      SoundFX.click();
    }
  });

  // Attach hover sound on desktop
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project-card, .track-card, .quote-card, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => SoundFX.hover());
    });
  }
}

/* ==========================================================================
   27. COLOR THEME SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const themeDots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('magnat_theme') || 'violet';

  function applyTheme(themeName, playSound = false) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('magnat_theme', themeName);

    themeDots.forEach(dot => {
      if (dot.getAttribute('data-theme') === themeName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (playSound) {
      SoundFX.theme();
      const themeNamesRu = {
        violet: 'Фиолетовая (Неон)',
        cyan: 'Неоновый Циан',
        emerald: 'Изумрудная',
        red: 'Красный Неон',
        gold: 'Золотая (MAGNAT)'
      };
      showToast(`Тема переключена: ${themeNamesRu[themeName] || themeName} ✨`);
    }
  }

  applyTheme(savedTheme, false);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.getAttribute('data-theme');
      applyTheme(theme, true);
    });
  });
}

/* ==========================================================================
   22. 3D TILT EFFECT FOR CARDS
   ========================================================================== */
function init3DTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll('.project-card, .track-card, .quote-card, .avatar-main-card');

  tiltCards.forEach(card => {
    // Add subtle glare element
    let glare = card.querySelector('.tilt-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -(deltaY * 10).toFixed(2);
      const rotateY = (deltaX * 10).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glare position
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.18) 0%, transparent 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glare.style.opacity = '0';
    });
  });
}
