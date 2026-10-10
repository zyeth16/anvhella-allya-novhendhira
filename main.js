/* main.js — fungsi bersama yang dipakai semua halaman */
const $ = s => document.querySelector(s);
const rand = (a, b) => a + Math.random() * (b - a);
const page = document.body.dataset.page;
const mk = (tag, cls, css) => { const e = document.createElement(tag); e.className = cls; e.style.cssText = css || ''; return e; };

/* transisi antar halaman + penunjuk halaman */
document.body.append(mk('div', 'veil'));
const go = url => { document.body.classList.add('leaving'); setTimeout(() => location.href = url, 650); };
document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
addEventListener('pageshow', () => document.body.classList.remove('leaving'));
const dots = mk('nav', 'dots');
['awal', 'bunga', 'kue', 'pesan'].forEach(p => dots.append(mk('i', p === page ? 'on' : '')));
document.body.append(dots);

/* latar pink: bokeh + kilau */
const sky = mk('div', 'sky'); document.body.prepend(sky);
for (let i = 0; i < 16; i++) { const z = rand(14, 64);
  sky.append(mk('div', 'bokeh', `left:${rand(0,100)}%;width:${z}px;height:${z}px;animation-duration:${rand(14,28)}s;animation-delay:-${rand(0,20)}s`)); }
for (let i = 0; i < 26; i++)
  sky.append(mk('div', 'spark', `left:${rand(0,100)}%;top:${rand(0,85)}%;--z:${rand(8,18)}px;animation-delay:${rand(0,3)}s`));

/* bunga lily */
const pals = [['#fffdf5','#ffd0e1','#e0507f'], ['#fff1f6','#ff6b9d','#c2185b'], ['#ffffff','#ffc2d8','#d6336c'], ['#fff3d6','#ff9a3c','#8a3b0a'], ['#fffaf0','#ffe3ef','#e0507f']];
let uid = 0;
function head(p) {
  const id = 'g' + uid++; let i = 0, out = '', st = '';
  const petal = (r, sc) => `<g class="petal" style="--r:${r}deg;--sc:${sc};--i:${i++}"><path d="M0 0C-13-12-20-44-4-74 0-78 0-78 4-74 20-44 13-12 0 0Z" fill="url(#${id})" stroke="rgba(150,30,80,.28)" stroke-width=".8"/><path d="M0-4Q1-40 0-68" stroke="rgba(255,255,255,.6)" stroke-width="1.3" fill="none"/><g fill="${p[2]}" opacity=".85"><circle cx="-5" cy="-24" r="1.5"/><circle cx="4" cy="-28" r="1.5"/><circle cx="-3" cy="-36" r="1.4"/><circle cx="6" cy="-40" r="1.3"/><circle cx="-6" cy="-45" r="1.2"/></g></g>`;
  for (const r of [0, 120, 240]) out += petal(r, 1);
  for (const r of [60, 180, 300]) out += petal(r, .94);
  for (let k = 0; k < 6; k++) { const d = k * 60 + 30, a = d * Math.PI / 180, x = (Math.cos(a) * 26).toFixed(1), y = (Math.sin(a) * 26).toFixed(1);
    st += `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="#d8e6a0" stroke-width="1.6"/><ellipse cx="${x}" cy="${y}" rx="4.4" ry="2.2" transform="rotate(${d} ${x} ${y})" fill="#a8541d"/>`; }
  st += '<line x1="0" y1="0" x2="0" y2="-34" stroke="#9cc46a" stroke-width="2"/><circle cx="0" cy="-35" r="3.2" fill="#8bb04f"/><circle r="5" fill="#d9eb8e"/>';
  return `<svg class="bloom" viewBox="-80 -80 160 160"><defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient></defs>${out}<g class="core">${st}</g></svg>`;
}
function garden(low) {
  const g = mk('div', 'garden', `--gh:${low ? 24 : 44}vh`); document.body.append(g);
  const k = Math.min(1.6, Math.max(.75, Math.min(innerWidth, innerHeight * .9) / 500));
  const n = Math.round(Math.min(56, Math.max(low ? 14 : 26, innerWidth / (low ? 60 : 26))));
  const add = (x, h, z, p, d, hero) => { const f = mk('div', 'flower' + (hero ? ' hero' : ''), `left:${x}%;--h:${h}vh;--z:${(z * k).toFixed(0)}px;--d:${d.toFixed(2)}s;--s:${rand(3.5,6).toFixed(1)}s`);
    f.innerHTML = '<div class="stem"></div>' + head(p); g.append(f); };
  for (let i = 0; i < n; i++)
    add((i + rand(.1, .9)) / n * 100, low ? rand(8, 18) : rand(8, 28), rand(46, 88), pals[i % 5], rand(.3, 2.4));
  if (!low) [[50,37,160,1],[27,31,128,3],[73,32,128,2],[10,26,100,0],[90,26,100,1]].forEach(([x,h,z,p], i) => add(x, h, z, pals[p], i * .22, true));
  for (let i = 0; i < Math.round(innerWidth / 8); i++)
    g.append(mk('i', 'blade', `left:${rand(0,100)}%;--h:${rand(3,9)}vh;--d:${rand(0,1.5)}s;--s:${rand(2.5,5)}s`));
}
function petals(n) { for (let i = 0; i < n; i++)
  document.body.append(mk('i', 'fall', `left:${rand(0,100)}%;--w:${rand(8,15)}px;--sx:${rand(-80,80)}px;animation-duration:${rand(9,17)}s;animation-delay:-${rand(0,15)}s`)); }

/* petasan: suara + konfeti + serpentin */
const cv = mk('canvas', ''); cv.id = 'confetti'; document.body.append(cv);
const ctx = cv.getContext('2d'); let parts = [], running = false;
const cols = ['#ff4f87','#ffd166','#c77dff','#4fc3f7','#7bd88f','#ffffff','#ff9f43'];
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
addEventListener('resize', fit); fit();
function burst(x, y, ang) {
  for (let i = 0; i < 110; i++) { const a = ang + rand(-.5, .5), v = rand(8, 20), r = Math.random();
    parts.push({ x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, w: rand(6,12), h: rand(4,8), c: cols[i % 7],
      r: rand(0,6), vr: rand(-.3,.3), age: 0, k: r < .6 ? 'r' : r < .88 ? 'c' : 's' }); }
  if (!running) { running = true; loop(); }
}
function loop() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.age++; p.vx *= .98; p.vy = p.vy * .98 + (p.k === 's' ? .14 : .26); p.x += p.vx; p.y += p.vy; p.r += p.vr;
    ctx.save(); ctx.fillStyle = p.c; ctx.strokeStyle = p.c;
    if (p.k === 's') { ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath();
      for (let k = 0; k < 16; k++) { const px = p.x - p.vx*k*.6 + Math.sin(k*.7 + p.age*.3)*5, py = p.y - p.vy*k*.6 + Math.cos(k*.7 + p.age*.3)*5;
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
    else { ctx.translate(p.x, p.y); ctx.rotate(p.r);
      if (p.k === 'c') { ctx.beginPath(); ctx.arc(0, 0, p.h/1.6, 0, 7); ctx.fill(); } else ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); }
    ctx.restore(); });
  parts = parts.filter(p => p.y < cv.height + 60);
  parts.length ? requestAnimationFrame(loop) : (running = false);
}
function bang() { try {
  const A = new (window.AudioContext || window.webkitAudioContext)(), n = A.sampleRate * .25, b = A.createBuffer(1, n, A.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random()*2 - 1) * Math.pow(1 - i/n, 3);
  const s = A.createBufferSource(), g = A.createGain(); g.gain.value = .5; s.buffer = b; s.connect(g).connect(A.destination); s.start();
} catch (e) {} }
function party() {
  bang(); document.body.append(mk('div', 'flash')); setTimeout(() => $('.flash')?.remove(), 600);
  document.querySelectorAll('.popper').forEach(e => { e.classList.remove('kick'); void e.getBoundingClientRect(); e.classList.add('kick'); });
  const tip = side => { const e = $('.popper.' + side);
    if (e) { const r = e.getBoundingClientRect(); return side === 'l' ? [r.left + r.width*.64, r.top + r.height*.2, -1.15] : [r.left + r.width*.36, r.top + r.height*.2, -Math.PI + 1.15]; }
    return side === 'l' ? [30, innerHeight - 40, -1.1] : [innerWidth - 30, innerHeight - 40, -Math.PI + 1.1]; };
  [0, 450, 900].forEach(t => setTimeout(() => { if (t) bang(); ['l', 'r'].forEach(s => burst(...tip(s))); }, t));
}

/* teks muncul huruf per huruf */
function spell(el, text) { text.split(' ').forEach(word => {
  const w = mk('span', 'w');
  [...word].forEach(ch => { const s = document.createElement('span'); s.textContent = ch; s.style.animationDelay = rand(0, 2.6).toFixed(2) + 's'; w.append(s); });
  el.append(w); }); }

/* mulai animasi setelah halaman siap */
addEventListener('load', () => setTimeout(() => document.body.classList.remove('not-loaded'), 700));
