// ═══════════════════════════════════════
// HERO CANVAS — Animated particle mesh
// with floating geometric accents
// ═══════════════════════════════════════

(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles, shapes, mouse, raf;

  const COLORS = {
    hatch: { r: 255, g: 122, b: 61 },
    python: { r: 30, g: 232, b: 130 },
    java: { r: 124, g: 124, b: 255 },
    hack: { r: 255, g: 48, b: 88 },
  };

  const colorKeys = Object.keys(COLORS);

  mouse = { x: -1000, y: -1000 };

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    init();
  }

  function init() {
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const count = Math.min(Math.floor((cw * ch) / 12000), 80);

    particles = [];
    for (let i = 0; i < count; i++) {
      const ck = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const c = COLORS[ck];
      particles.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        color: c,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    // Floating geometric shapes
    shapes = [];
    const shapeCount = 5;
    for (let i = 0; i < shapeCount; i++) {
      const ck = colorKeys[i % colorKeys.length];
      const c = COLORS[ck];
      shapes.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        size: Math.random() * 60 + 30,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.003,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        type: i % 3, // 0=triangle, 1=square, 2=circle
        color: c,
        alpha: 0.04 + Math.random() * 0.03,
      });
    }
  }

  function drawShape(s) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rotation);
    ctx.globalAlpha = s.alpha;
    ctx.strokeStyle = `rgb(${s.color.r},${s.color.g},${s.color.b})`;
    ctx.lineWidth = 1;

    if (s.type === 0) {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(0, -s.size / 2);
      ctx.lineTo(-s.size / 2, s.size / 2);
      ctx.lineTo(s.size / 2, s.size / 2);
      ctx.closePath();
      ctx.stroke();
    } else if (s.type === 1) {
      // Square
      ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
    } else {
      // Circle
      ctx.beginPath();
      ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function animate() {
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    ctx.clearRect(0, 0, cw, ch);

    // Draw gradient mesh background
    const g1 = ctx.createRadialGradient(cw * 0.2, ch * 0.3, 0, cw * 0.2, ch * 0.3, cw * 0.5);
    g1.addColorStop(0, 'rgba(255,48,88,0.04)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, cw, ch);

    const g2 = ctx.createRadialGradient(cw * 0.8, ch * 0.6, 0, cw * 0.8, ch * 0.6, cw * 0.45);
    g2.addColorStop(0, 'rgba(30,232,130,0.03)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, cw, ch);

    const g3 = ctx.createRadialGradient(cw * 0.5, ch * 0.85, 0, cw * 0.5, ch * 0.85, cw * 0.4);
    g3.addColorStop(0, 'rgba(124,124,255,0.03)');
    g3.addColorStop(1, 'transparent');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, cw, ch);

    // Shapes
    shapes.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotSpeed;
      if (s.x < -100) s.x = cw + 100;
      if (s.x > cw + 100) s.x = -100;
      if (s.y < -100) s.y = ch + 100;
      if (s.y > ch + 100) s.y = -100;
      drawShape(s);
    });

    // Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.15;
        p.vy += (dy / dist) * force * 0.15;
      }

      // Damping
      p.vx *= 0.995;
      p.vy *= 0.995;

      // Wrap
      if (p.x < 0) p.x = cw;
      if (p.x > cw) p.x = 0;
      if (p.y < 0) p.y = ch;
      if (p.y > ch) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha})`;
      ctx.fill();
    });

    // Connect nearby particles with lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].color.r},${particles[i].color.g},${particles[i].color.b},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(animate);
  }

  // Mouse tracking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize();
    animate();
  });

  resize();
  animate();
})();
