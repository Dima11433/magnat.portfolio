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
