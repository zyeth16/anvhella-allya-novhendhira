/* cake.js — halaman kue: petasan + lilin nyala */
const POPPER = '<svg class="popper %S" viewBox="0 0 90 110"><defs><linearGradient id="pp%S" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb3cf"/><stop offset=".5" stop-color="#ff5c93"/><stop offset="1" stop-color="#c2185b"/></linearGradient><clipPath id="pc%S"><path d="M38 108 L52 108 L80 26 L10 26Z"/></clipPath></defs><path d="M38 108 L52 108 L80 26 L10 26Z" fill="url(#pp%S)"/><g clip-path="url(#pc%S)" stroke="#fff" stroke-width="4" opacity=".85"><path d="M0 60 L90 40"/><path d="M0 82 L90 62"/><path d="M0 104 L90 84"/></g><ellipse cx="45" cy="26" rx="35" ry="8" fill="#ffd166"/><ellipse cx="45" cy="26" rx="29" ry="5.5" fill="#7d1d4f"/></svg>';
document.body.insertAdjacentHTML('beforeend', POPPER.replace(/%S/g, 'l') + POPPER.replace(/%S/g, 'r'));

const btn = $('#btnCake');
let lit = false;
btn.addEventListener('click', () => {
  if (lit) return go('pesan.html');
  lit = true;
  $('#stage').classList.add('lit');
  party();
  btn.querySelector('.lbl').textContent = 'Lanjut';
});
