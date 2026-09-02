/* ============================================================
   Мобильное меню. Шапка в этой редакции дизайна полупрозрачная
   и с блюром с самого начала (не переключается по скроллу) —
   отдельная инициализация под это не нужна.
   ============================================================ */

/** Полноэкранное меню: aria-expanded, блокировка скролла, Esc, закрытие по ссылке. */
export function initMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#nav');
  if (!burger || !nav) {
    console.error('[nav] Не найдены .burger или #nav — мобильное меню не инициализировано.');
    return;
  }

  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.dataset.open = String(open);
    document.body.toggleAttribute('data-menu-open', open);
  };

  burger.addEventListener('click', () => {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });

  // Меню полноэкранное — «клика вне» у него нет. Зато есть переход на десктоп.
  const wide = matchMedia('(min-width: 1024px)');
  const sync = () => { if (wide.matches) setMenu(false); };
  if (wide.addEventListener) wide.addEventListener('change', sync);
  else wide.addListener(sync);
}
