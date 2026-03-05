// ═══════════════════════════════════════
// KIDOYO LAUNCHPAD_ — APP LOGIC
// Renders data, handles interactions
// ═══════════════════════════════════════

(function() {

  // ── HELPERS ──
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };

  const lvlClass = (l) => ({L1:'tl-1',L2:'tl-2',L3:'tl-3',L4:'tl-4'}[l] || 'tl-1');

  // ── RENDER TRACKS ──
  function renderTracks() {
    const grid = $('#tracksGrid');
    TRACKS.forEach(track => {
      const card = el('div', 'track-card');
      card.id = `track-${track.id}`;

      // Head
      const levelsHTML = track.levels.map(l =>
        `<span class="track-lvl-tag ${lvlClass(l)}">${l}</span>`
      ).join('');

      card.innerHTML = `
        <div class="track-head">
          <div class="track-head-left">
            <div class="track-icon ${track.iconClass}">${track.icon}</div>
            <div class="track-info">
              <h3>${track.name}</h3>
              <div class="track-meta">${track.meta}</div>
              <div class="track-levels-row">${levelsHTML}</div>
            </div>
          </div>
          <span class="track-arrow">▾</span>
        </div>
        <div class="track-body"></div>
      `;

      // Lessons
      const body = $('.track-body', card);
      track.lessons.forEach(lesson => {
        const row = el('div', 'lesson-row');
        row.innerHTML = `
          <div class="lesson-trigger">
            <div class="lesson-left">
              <span class="lesson-num">${lesson.num}</span>
              <span class="lesson-name">${lesson.title}</span>
              <span class="track-lvl-tag ${lvlClass(lesson.level)}">${lesson.level}</span>
            </div>
            <span class="lesson-chevron">▶</span>
          </div>
          <div class="lesson-body">
            <div class="lesson-body-inner">
              ${renderSteps(lesson.steps)}
            </div>
          </div>
        `;
        body.appendChild(row);
      });

      // Track toggle
      $('.track-head', card).addEventListener('click', () => {
        const wasOpen = card.classList.contains('open');
        // Close other tracks
        $$('.track-card.open').forEach(c => {
          if (c !== card) c.classList.remove('open');
        });
        card.classList.toggle('open', !wasOpen);
        if (!wasOpen) {
          setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }
      });

      // Lesson toggles
      card.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lesson-trigger');
        if (!trigger) return;
        e.stopPropagation();
        const row = trigger.closest('.lesson-row');
        const wasOpen = row.classList.contains('open');
        // Close siblings
        $$('.lesson-row.open', body).forEach(r => {
          if (r !== row) r.classList.remove('open');
        });
        row.classList.toggle('open', !wasOpen);
      });

      grid.appendChild(card);
    });
  }

  function renderSteps(steps) {
    return steps.map(s => {
      let inner = `<div class="step-label">${s.label}</div>`;
      if (s.title) inner += `<h4>${s.title}</h4>`;
      if (s.body) inner += `<p>${escapeHTML(s.body)}</p>`;
      if (s.code) inner += `<pre class="code">${escapeHTML(s.code)}</pre>`;
      if (s.list) inner += `<ul>${s.list.map(li => `<li>${escapeHTML(li)}</li>`).join('')}</ul>`;
      return `<div class="step">${inner}</div>`;
    }).join('');
  }

  function escapeHTML(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── RENDER PROTOCOL ──
  function renderProtocol() {
    const grid = $('#protoGrid');
    PROTOCOL.forEach(p => {
      const card = el('div', 'proto-card');
      card.innerHTML = `
        <div class="proto-idx">${p.idx}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      `;
      grid.appendChild(card);
    });

    // Mandatory box
    const box = $('#mandatoryBox');
    const steps = ["Define the problem", "Identify constraints", "Research solutions", "Design architecture", "THEN code"];
    box.innerHTML = `
      <div class="mandatory-label">⚠ Non-Negotiable: Research Before Writing</div>
      <p>Before ANY hackathon coding begins, students complete these steps in order:</p>
      <div class="mandatory-steps">
        ${steps.map((s, i) => `<div class="m-step"><strong>0${i+1}</strong> ${s}</div>`).join('')}
      </div>
      <p class="mandatory-warn">Student skips? STOP. Redirect to planning. No exceptions.</p>
    `;
  }

  // ── RENDER BRIDGE ──
  function renderBridge() {
    const wrap = $('#bridgeTable');
    const rows = BRIDGE.map(r => `
      <tr><td>${r.hatch}</td><td>${r.python}</td><td>${r.java}</td></tr>
    `).join('');
    wrap.innerHTML = `
      <table class="bridge-table">
        <thead><tr>
          <th style="color:var(--hatch)">Hatch</th>
          <th style="color:var(--python)">Python</th>
          <th style="color:var(--java)">Java</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  // ── RENDER LEVELS ──
  function renderLevels() {
    const stack = $('#levelsStack');
    LEVELS.forEach(l => {
      const node = el('div', 'level-node');
      node.innerHTML = `
        <div class="level-badge" style="color:${l.color}">${l.num}</div>
        <div class="level-text">
          <h3>${l.name}</h3>
          <p>${l.desc}</p>
        </div>
      `;
      stack.appendChild(node);
    });
  }

  // ── RENDER REVIEW ──
  function renderReview() {
    const list = $('#reviewList');
    REVIEW.forEach(r => {
      const item = el('div', 'review-item');
      item.innerHTML = `<div><h4>${r.title}</h4><p>${r.desc}</p></div>`;
      list.appendChild(item);
    });
  }

  // ── NAV SCROLL ──
  function initNav() {
    const nav = $('#topnav');
    const links = $$('.nav-link');
    const sections = $$('section[id]');

    window.addEventListener('scroll', () => {
      // Nav background
      nav.classList.toggle('scrolled', window.scrollY > 60);

      // Active link
      let current = 'tracks';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 160) current = s.id;
      });
      links.forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
      });
    });
  }

  // ── INTERSECTION OBSERVER for fade-in ──
  function initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    // Observe section headers
    $$('.section-header, .track-card, .proto-card, .level-node, .review-item').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.03}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.03}s`;
      observer.observe(el);
    });
  }

  // ── INIT ──
  renderTracks();
  renderProtocol();
  renderBridge();
  renderLevels();
  renderReview();
  initNav();

  // Slight delay to let DOM paint, then observe
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initObserver();
    });
  });

})();
