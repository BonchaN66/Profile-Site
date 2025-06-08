// スクロールするとセクションをじんわり表示
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});

// back to top
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
     backToTopBtn.classList.add('show');
  } else {
      backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// kawaiiポインタ
const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
  const speed = 0.07;
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  cursor.style.left = currentX + 'px'; 
  cursor.style.top = currentY + 'px';

  const element = document.elementFromPoint(mouseX, mouseY);
  const parentLink = element?.closest('a, button, [type="radio"], [type="checkbox"], [type="submit"]');

  if (parentLink) {
    cursor.classList.add('hovering');
  } else {
    cursor.classList.remove('hovering');
  }

  requestAnimationFrame(animate);
}

function isMobile() {
  // ユーザーエージェントで判定＋画面幅でも判定（768px以下はスマホ想定）
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

if (!isMobile()) {
  animate();
} else {
  // スマホならカーソルを非表示にしたい場合
  const cursor = document.getElementById('cursor');
  if (cursor) {
    cursor.style.display = 'none';
  }
}