/* ============================================================
   Появление по скроллу — одна сигнатурная анимация на страницу
   (лента залов). Класс js ставится здесь: без скрипта и при
   prefers-reduced-motion контент виден сразу, без opacity: 0.
   ============================================================ */

export function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  document.documentElement.classList.add('js');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '-8% 0px' });

  targets.forEach((el) => io.observe(el));
}
