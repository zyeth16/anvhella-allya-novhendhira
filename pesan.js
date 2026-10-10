/* pesan.js — halaman ucapan */
garden(true);
petals(8);
setTimeout(party, 1000);
setInterval(() => {
  const h = mk('span', 'heart', `left:${rand(0,100)}%;font-size:${rand(14,30)}px;animation-duration:${rand(6,10)}s`);
  h.textContent = '♥';
  document.body.append(h);
  setTimeout(() => h.remove(), 10000);
}, 700);
