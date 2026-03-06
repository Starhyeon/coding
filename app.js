// ═══════════════════════════════════════
// KIDOYO LAUNCHPAD_ — APP v3
// Interactive challenges with code editors
// ═══════════════════════════════════════

(function() {

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };
  const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const lvlClass = (l) => ({L1:'tl-1',L2:'tl-2',L3:'tl-3',L4:'tl-4'}[l] || 'tl-1');

  // Track completed challenges
  const completed = new Set();

  // ── RENDER TRACKS ──
  function renderTracks() {
    const grid = $('#tracksGrid');
    TRACKS.forEach(track => {
      const card = el('div', 'track-card');
      card.id = `track-${track.id}`;

      const levelsHTML = track.levels.map(l => `<span class="track-lvl-tag ${lvlClass(l)}">${l}</span>`).join('');
      const totalChallenges = track.lessons.reduce((sum, l) => sum + (l.challenges ? l.challenges.length : 0), 0);

      card.innerHTML = `
        <div class="track-head">
          <div class="track-head-left">
            <div class="track-icon ${track.iconClass}">${track.icon}</div>
            <div class="track-info">
              <h3>${track.name}</h3>
              <div class="track-meta">${track.meta} · ${track.lessons.length} lessons · ${totalChallenges} challenges</div>
              <div class="track-levels-row">${levelsHTML}</div>
            </div>
          </div>
          <span class="track-arrow">▾</span>
        </div>
        <div class="track-body"></div>
      `;

      const body = $('.track-body', card);
      track.lessons.forEach(lesson => {
        const challengeCount = lesson.challenges ? lesson.challenges.length : 0;
        const row = el('div', 'lesson-row');
        row.innerHTML = `
          <div class="lesson-trigger">
            <div class="lesson-left">
              <span class="lesson-num">${lesson.num}</span>
              <span class="lesson-name">${lesson.title}</span>
              <span class="track-lvl-tag ${lvlClass(lesson.level)}">${lesson.level}</span>
              <span class="lesson-step-count">${challengeCount} challenge${challengeCount !== 1 ? 's' : ''}</span>
            </div>
            <span class="lesson-chevron">▶</span>
          </div>
          <div class="lesson-body">
            <div class="lesson-body-inner">
              ${renderConcept(lesson.concept, track.id)}
              ${renderChallenges(lesson.challenges || [], track.id)}
            </div>
          </div>
        `;
        body.appendChild(row);
      });

      // Track toggle
      $('.track-head', card).addEventListener('click', () => {
        const wasOpen = card.classList.contains('open');
        $$('.track-card.open').forEach(c => { if (c !== card) c.classList.remove('open'); });
        card.classList.toggle('open', !wasOpen);
        if (!wasOpen) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      });

      // Lesson toggles
      card.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lesson-trigger');
        if (!trigger) return;
        e.stopPropagation();
        const row = trigger.closest('.lesson-row');
        const wasOpen = row.classList.contains('open');
        $$('.lesson-row.open', body).forEach(r => { if (r !== row) r.classList.remove('open'); });
        row.classList.toggle('open', !wasOpen);
        if (!wasOpen) setTimeout(() => row.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      });

      grid.appendChild(card);
    });

    // Attach editor events
    attachEditorEvents();
  }

  // ── RENDER CONCEPT CARD ──
  function renderConcept(concept, trackId) {
    if (!concept) return '';
    const ccClass = `cc-${trackId}`;
    return `
      <div class="concept-card ${ccClass}">
        <h4>${concept.title}</h4>
        <p>${esc(concept.body)}</p>
        ${concept.code ? `<pre class="concept-code">${esc(concept.code)}</pre>` : ''}
      </div>
    `;
  }

  // ── RENDER CHALLENGES ──
  function renderChallenges(challenges, trackId) {
    if (!challenges.length) return '';
    const iconClass = `ci-${trackId}`;
    const diffClass = (d) => ({easy:'cd-easy', medium:'cd-medium', hard:'cd-hard'}[d] || 'cd-medium');

    return challenges.map((ch, idx) => `
      <div class="challenge-block" data-challenge-id="${ch.id}">
        <div class="challenge-header">
          <div class="challenge-label">
            <div class="challenge-icon ${iconClass}">⚡</div>
            <span class="challenge-tag">Challenge ${idx + 1}: ${ch.title}</span>
          </div>
          <span class="challenge-difficulty ${diffClass(ch.difficulty)}">${ch.difficulty}</span>
        </div>
        <div class="challenge-body">
          <div class="challenge-prompt">${ch.prompt}</div>
          ${ch.expected ? `<div class="expected-output"><span class="expected-label">Expected Output</span>${esc(ch.expected)}</div>` : ''}
          <div class="editor-wrap">
            <div class="editor-topbar">
              <div class="editor-dots"><div class="editor-dot"></div><div class="editor-dot"></div><div class="editor-dot"></div></div>
              <span class="editor-filename">${trackId === 'java' ? 'Main.java' : trackId === 'python' ? 'solution.py' : 'blocks.hatch'}</span>
            </div>
            <textarea class="editor-textarea" data-id="${ch.id}" placeholder="Write your code here..." spellcheck="false">${esc(ch.starter || '')}</textarea>
          </div>
          <div class="editor-actions">
            <button class="btn btn-run" data-action="run" data-id="${ch.id}">▶ Run</button>
            <button class="btn btn-hint" data-action="hint" data-id="${ch.id}" data-hint-idx="0">💡 Hint</button>
            <button class="btn btn-reset" data-action="reset" data-id="${ch.id}">↺ Reset</button>
            <button class="btn btn-solution" data-action="solution" data-id="${ch.id}">Show Solution</button>
          </div>
          <div class="output-console" id="console-${ch.id}">
            <div class="console-topbar">
              <span class="console-label">Output</span>
              <span class="console-status" id="status-${ch.id}"></span>
            </div>
            <div class="console-output" id="output-${ch.id}"></div>
          </div>
          <div class="hint-box" id="hint-${ch.id}">
            <div class="hint-header">
              <span class="hint-icon">💡</span>
              <span class="hint-label">Hint</span>
            </div>
            <div class="hint-text" id="hint-text-${ch.id}"></div>
          </div>
          <div class="solution-box" id="solution-${ch.id}">
            <span class="solution-label">Solution</span>
            <div class="solution-warn">Try to solve it yourself first! Looking at the solution is a last resort.</div>
            <pre class="solution-code">${esc(ch.solution || '')}</pre>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ── ATTACH EDITOR EVENTS ──
  function attachEditorEvents() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      const id = btn.dataset.id;

      // Find challenge data
      let challengeData = null;
      for (const track of TRACKS) {
        for (const lesson of track.lessons) {
          if (lesson.challenges) {
            const found = lesson.challenges.find(c => c.id === id);
            if (found) { challengeData = found; break; }
          }
        }
        if (challengeData) break;
      }
      if (!challengeData) return;

      if (action === 'run') handleRun(id, challengeData);
      if (action === 'hint') handleHint(id, challengeData, btn);
      if (action === 'reset') handleReset(id, challengeData);
      if (action === 'solution') handleSolution(id);
    });

    // Tab support in textareas
    document.addEventListener('keydown', (e) => {
      if (e.target.classList.contains('editor-textarea') && e.key === 'Tab') {
        e.preventDefault();
        const ta = e.target;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        ta.value = ta.value.substring(0, start) + '    ' + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
      }
    });
  }

  function handleRun(id, ch) {
    const textarea = $(`textarea[data-id="${id}"]`);
    const consoleEl = $(`#console-${id}`);
    const outputEl = $(`#output-${id}`);
    const statusEl = $(`#status-${id}`);
    const code = textarea.value.trim();

    consoleEl.classList.add('visible');
    statusEl.className = 'console-status cs-running';
    statusEl.textContent = 'Running...';
    outputEl.innerHTML = '';

    setTimeout(() => {
      if (!code || code === (ch.starter || '').trim()) {
        statusEl.className = 'console-status cs-error';
        statusEl.textContent = 'Empty';
        outputEl.innerHTML = '<span class="warn">⚠ Write some code first! The editor has starter code — build on it.</span>';
        return;
      }

      // For Python challenges, try to actually run it
      if (id.startsWith('py-')) {
        try {
          // Simple Python simulation for common patterns
          let output = simulatePython(code);
          outputEl.innerHTML = `<span class="ok">${esc(output)}</span>`;
          statusEl.className = 'console-status cs-pass';
          statusEl.textContent = 'Ran';
          completed.add(id);
        } catch (err) {
          outputEl.innerHTML = `<span class="err">Error: ${esc(err.message)}</span>`;
          statusEl.className = 'console-status cs-error';
          statusEl.textContent = 'Error';
        }
      } else {
        // For Hatch/Java — show conceptual feedback
        const lineCount = code.split('\n').filter(l => l.trim()).length;
        if (lineCount < 2) {
          statusEl.className = 'console-status cs-fail';
          statusEl.textContent = 'Too Short';
          outputEl.innerHTML = '<span class="warn">⚠ Your code seems incomplete. Try adding more blocks/lines.</span>';
        } else {
          statusEl.className = 'console-status cs-pass';
          statusEl.textContent = 'Looks Good';
          outputEl.innerHTML = `<span class="ok">✓ Your code has ${lineCount} lines. Review the expected output above and compare with your logic.\n\nDoes your code:\n• Handle the main case correctly?\n• Handle edge cases?\n• Use the right blocks/syntax?</span>`;
          completed.add(id);
        }
      }
    }, 400);
  }

  function simulatePython(code) {
    // Very basic Python simulation using JS
    let output = [];
    const lines = code.split('\n');

    // Build a simple eval context
    const context = {};
    let inFunction = false;
    let funcBody = [];
    let funcName = '';
    let funcParams = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Detect print statements and extract content
      const printMatch = trimmed.match(/^print\((.+)\)$/);
      if (printMatch) {
        let content = printMatch[1];
        // Handle f-strings simply
        content = content.replace(/f"([^"]*)"/, (_, s) => {
          return '"' + s.replace(/\{([^}]+)\}/g, (__, expr) => `{${expr}}`) + '"';
        });
        // Evaluate simple expressions
        try {
          let result = evalSimple(content, context);
          output.push(String(result));
        } catch {
          output.push(`[output of: print(${content})]`);
        }
      }
    }

    if (output.length === 0) {
      return "Program ran successfully (no print output detected).\nTip: Use print() to see your results!";
    }
    return output.join('\n');
  }

  function evalSimple(expr, ctx) {
    // Very simplified expression evaluator
    expr = expr.trim();

    // String literal
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }

    // Number
    if (!isNaN(expr)) return Number(expr);

    // Just show the expression
    return `[${expr}]`;
  }

  function handleHint(id, ch, btn) {
    const hintBox = $(`#hint-${id}`);
    const hintText = $(`#hint-text-${id}`);
    let idx = parseInt(btn.dataset.hintIdx) || 0;
    const hints = ch.hints || [];

    if (idx >= hints.length) idx = 0; // cycle

    hintText.innerHTML = esc(hints[idx]);
    hintBox.classList.add('visible');

    // Update button for next hint
    btn.dataset.hintIdx = String(idx + 1);
    if (idx + 1 < hints.length) {
      btn.textContent = `💡 Next Hint (${idx + 1}/${hints.length})`;
    } else {
      btn.textContent = `💡 Hint (restart)`;
      btn.dataset.hintIdx = '0';
    }
  }

  function handleReset(id, ch) {
    const textarea = $(`textarea[data-id="${id}"]`);
    textarea.value = ch.starter || '';
    const consoleEl = $(`#console-${id}`);
    const hintBox = $(`#hint-${id}`);
    const solutionBox = $(`#solution-${id}`);
    consoleEl.classList.remove('visible');
    hintBox.classList.remove('visible');
    solutionBox.classList.remove('visible');

    // Reset hint button
    const hintBtn = $(`[data-action="hint"][data-id="${id}"]`);
    if (hintBtn) {
      hintBtn.textContent = '💡 Hint';
      hintBtn.dataset.hintIdx = '0';
    }
  }

  function handleSolution(id) {
    const box = $(`#solution-${id}`);
    if (box.classList.contains('visible')) {
      box.classList.remove('visible');
    } else {
      if (confirm('Are you sure? Try using the hints first. Only look at the solution as a last resort.')) {
        box.classList.add('visible');
      }
    }
  }

  // ── RENDER OTHER SECTIONS ──
  function renderProtocol() {
    const grid = $('#protoGrid');
    PROTOCOL.forEach(p => {
      grid.appendChild(el('div', 'proto-card', `<div class="proto-idx">${p.idx}</div><h3>${p.title}</h3><p>${p.desc}</p>`));
    });
    const steps = ["Define the problem", "Identify constraints", "Research solutions", "Design architecture", "THEN code"];
    $('#mandatoryBox').innerHTML = `
      <div class="mandatory-label">⚠ Non-Negotiable: Research Before Writing</div>
      <p>Before you write ANY code at the hackathon, complete these steps in order:</p>
      <div class="mandatory-steps">${steps.map((s, i) => `<div class="m-step"><strong>0${i+1}</strong> ${s}</div>`).join('')}</div>
      <p class="mandatory-warn">If you jump into coding without these steps — STOP. Go back to planning. No exceptions.</p>`;
  }

  function renderBridge() {
    const rows = BRIDGE.map(r => `<tr><td>${r.hatch}</td><td>${r.python}</td><td>${r.java}</td></tr>`).join('');
    $('#bridgeTable').innerHTML = `<table class="bridge-table"><thead><tr><th style="color:var(--hatch)">Hatch</th><th style="color:var(--python)">Python</th><th style="color:var(--java)">Java</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderLevels() {
    const stack = $('#levelsStack');
    LEVELS.forEach(l => {
      stack.appendChild(el('div', 'level-node', `<div class="level-badge" style="color:${l.color}">${l.num}</div><div class="level-text"><h3>${l.name}</h3><p>${l.desc}</p></div>`));
    });
  }

  function renderReview() {
    const list = $('#reviewList');
    REVIEW.forEach(r => {
      list.appendChild(el('div', 'review-item', `<div><h4>${r.title}</h4><p>${r.desc}</p></div>`));
    });
  }

  // ── NAV SCROLL ──
  function initNav() {
    const nav = $('#topnav');
    const links = $$('.nav-link');
    const sections = $$('section[id]');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      let current = 'tracks';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
      links.forEach(a => { a.classList.toggle('active', a.dataset.section === current); });
    });
  }

  // ── INTERSECTION OBSERVER ──
  function initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.section-header, .track-card, .proto-card, .level-node, .review-item').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${Math.min(i * 0.04, 0.3)}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${Math.min(i * 0.04, 0.3)}s`;
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
  requestAnimationFrame(() => requestAnimationFrame(() => initObserver()));

})();
