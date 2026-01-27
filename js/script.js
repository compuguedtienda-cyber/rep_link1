const track = document.querySelector('.slider-track');
let slides = Array.from(track.children);
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let index = 1;
let slideWidth;
let autoplayInterval;

/* ===== CLONAR PARA LOOP INFINITO ===== */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);

/* ===== INICIALIZAR ===== */
function setPosition() {
  slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

window.addEventListener('load', setPosition);
window.addEventListener('resize', setPosition);

/* ===== CONTROLES ===== */
function moveNext() {
  if (index >= slides.length - 1) return;
  index++;
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

function movePrev() {
  if (index <= 0) return;
  index--;
  track.style.transition = 'transform 0.4s ease';
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

next.addEventListener('click', () => {
  stopAutoplay();
  moveNext();
  startAutoplay();
});

prev.addEventListener('click', () => {
  stopAutoplay();
  movePrev();
  startAutoplay();
});

/* ===== LOOP INVISIBLE ===== */
track.addEventListener('transitionend', () => {
  if (slides[index].id === 'first-clone') {
    track.style.transition = 'none';
    index = 1;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  if (slides[index].id === 'last-clone') {
    track.style.transition = 'none';
    index = slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

/* ===== AUTOPLAY INFINITO ===== */
function startAutoplay() {
  autoplayInterval = setInterval(moveNext, 3500);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

startAutoplay();

/* ===== SWIPE / DRAG ===== */
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', startDrag);
track.addEventListener('mousedown', startDrag);

track.addEventListener('touchmove', dragMove);
track.addEventListener('mousemove', dragMove);

track.addEventListener('touchend', endDrag);
track.addEventListener('mouseup', endDrag);
track.addEventListener('mouseleave', endDrag);

function startDrag(e) {
  stopAutoplay();
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function dragMove(e) {
  if (!isDragging) return;
  const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  const diff = startX - x;

  track.style.transition = 'none';
  track.style.transform = `translateX(-${index * slideWidth + diff}px)`;
}

function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
  const diff = startX - endX;

  track.style.transition = 'transform 0.4s ease';

  if (diff > 50) moveNext();
  else if (diff < -50) movePrev();
  else setPosition();

  startAutoplay();
}
