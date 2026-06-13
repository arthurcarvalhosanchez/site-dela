
/* ── Corações flutuantes no canvas ── */
const canvas = document.getElementById('heartCanvas');
const ctx    = canvas.getContext('2d');
let W, H;
 
function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
 
function heartPath(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.25);
  ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.25);
  ctx.bezierCurveTo(x - size * 0.5, y + size * 0.6, x, y + size * 0.9, x, y + size);
  ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.6, x + size * 0.5, y + size * 0.25);
  ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.25);
  ctx.closePath();
}
 
const COLORS = ['#a78bfa', '#818cf8', '#60a5fa', '#c4b5fd', '#7c3abf', '#3b6fd4'];
const hearts = Array.from({ length: 28 }, () => ({
  x:     Math.random() * window.innerWidth,
  y:     Math.random() * window.innerHeight + window.innerHeight,
  size:  6 + Math.random() * 18,
  speed: 0.4 + Math.random() * 0.8,
  drift: (Math.random() - 0.5) * 0.5,
  alpha: 0.08 + Math.random() * 0.18,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  phase: Math.random() * Math.PI * 2,
}));
 
function animate(t) {
  ctx.clearRect(0, 0, W, H);
  hearts.forEach(h => {
    h.y    -= h.speed;
    h.x    += h.drift + Math.sin(t * 0.001 + h.phase) * 0.3;
    h.alpha = 0.08 + 0.1 * Math.abs(Math.sin(t * 0.001 + h.phase));
 
    if (h.y + h.size < -20) {
      h.y = H + 20;
      h.x = Math.random() * W;
    }
 
    ctx.save();
    ctx.globalAlpha = h.alpha;
    ctx.fillStyle   = h.color;
    heartPath(ctx, h.x, h.y, h.size);
    ctx.fill();
    ctx.restore();
  });
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
 
/* ── Mensagem secreta ── */
const btn = document.getElementById('secretBtn');
const msg = document.getElementById('secretMsg');
btn.addEventListener('click', () => {
  msg.classList.toggle('open');
  btn.textContent = msg.classList.contains('open')
    ? 'Esconder a surpresa 🙈'
    : 'Toque aqui para uma surpresa 💜';
});
 
/* ── Sparks ao clicar ── */
const EMOJIS = ['💜','💙','✨','💫','🌟','🫧','💕'];
document.addEventListener('click', e => {
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('span');
    el.className = 'spark';
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const angle = (Math.random() * 360) * (Math.PI / 180);
    const dist  = 50 + Math.random() * 80;
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
});
 