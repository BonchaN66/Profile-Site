// セクションのフェードイン表示
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));
});

// Back to Topボタン制御
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('show', window.scrollY > 300);
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// カスタムカーソル制御
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
let animating = false;

function mouseMoveHandler(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function animateCursor() {
  const speed = 0.07;
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  const element = document.elementFromPoint(mouseX, mouseY);
  const parentLink = element?.closest('a, button, [type="radio"], [type="checkbox"], [type="submit"]');
  cursor.classList.toggle('hovering', !!parentLink);

  if (animating) requestAnimationFrame(animateCursor);
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

function handleCursor() {
  if (!cursor) return;
  if (isMobile()) {
    cursor.style.display = 'none';
    document.removeEventListener('mousemove', mouseMoveHandler);
    animating = false;
  } else {
    cursor.style.display = '';
    document.addEventListener('mousemove', mouseMoveHandler);
    if (!animating) {
      animating = true;
      requestAnimationFrame(animateCursor);
    }
  }
}

// 初期化とリサイズ対応
handleCursor();
window.addEventListener('resize', handleCursor);