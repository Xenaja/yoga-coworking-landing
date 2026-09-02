/* ============================================================
   FAQ-аккордеон: одна открытая строка, первая раскрыта по умолчанию.
   Высота анимируется по фактическому scrollHeight ответа — не по
   фиксированному пределу, чтобы длинный ответ не обрезался.
   ============================================================ */

export function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) {
    console.error('[faq] .faq__item не найдены — аккордеон не инициализирован.');
    return;
  }

  const setOpen = (item, open) => {
    const btn = item.querySelector('.faq__q');
    const body = item.querySelector('.faq__a');
    item.dataset.open = String(open);
    btn.setAttribute('aria-expanded', String(open));
    body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
  };

  items.forEach((item, i) => {
    const btn = item.querySelector('.faq__q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const willOpen = item.dataset.open !== 'true';
      items.forEach((other) => setOpen(other, false));
      if (willOpen) setOpen(item, true);
    });
    setOpen(item, i === 0);   // первый вопрос открыт по умолчанию
  });

  // при ресайзе пересчитать высоту открытого ответа (смена кегля на брейкпоинте)
  let raf = null;
  addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const open = document.querySelector('.faq__item[data-open="true"]');
      if (open) open.querySelector('.faq__a').style.maxHeight = open.querySelector('.faq__a').scrollHeight + 'px';
    });
  });
}
