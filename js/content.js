/* ============================================================
   Контент — единственный источник правды: блок
   <script type="application/json" id="content"> в index.html.
   Здесь только подстановка значений, которых пока нет в разметке
   (см. PENDING.md). Отсутствующее значение = null, не заглушка.
   ============================================================ */

export function readContent() {
  const el = document.getElementById('content');
  if (!el) {
    console.error('[content] Блок #content не найден — подстановка данных пропущена.');
    return {};
  }
  try {
    return JSON.parse(el.textContent) || {};
  } catch (err) {
    console.error('[content] Блок #content — некорректный JSON:', err.message);
    return {};
  }
}

/** Кнопки «Написать в ВК»: адрес берётся из #content, в разметке он же — фолбэк для no-JS. */
function syncVkLinks(content) {
  if (!content.vk_message) return;
  document.querySelectorAll('a[data-cta]').forEach((a) => { a.href = content.vk_message; });
}

/** Telegram (PENDING-10): пока null — на странице только ВК.
 *  Появится ссылка — рядом с каждой кнопкой ВК встанет вторая, вторичная. */
function addTelegramButtons(content) {
  if (!content.telegram) return;
  document.querySelectorAll('a[data-cta]').forEach((a) => {
    if (a.classList.contains('link')) return;          // текстовые ссылки не дублируем
    const tg = a.cloneNode(false);
    tg.href = content.telegram;
    tg.textContent = 'Написать в Telegram';
    tg.removeAttribute('data-cta');
    tg.className = a.className
      .replace('btn--primary', 'btn--secondary')
      .replace('btn--ondark', 'btn--onbrand');
    a.insertAdjacentElement('afterend', tg);
  });
}

/** Расписание mos.ru (PENDING-01): пока null — упоминаем текстом.
 *  Придёт адрес — те же упоминания станут ссылками. */
function linkMosRu(content) {
  if (!content.mosru_schedule) return;
  const href = encodeURI(content.mosru_schedule);
  document.querySelectorAll('[data-mosru]').forEach((el) => {
    el.innerHTML = el.innerHTML.replace(
      /mos\.ru/g,
      `<a class="link" href="${href}" target="_blank" rel="noopener">mos.ru</a>`
    );
  });
}

/** Реквизиты ИП (PENDING-04): блокируют публикацию, до получения — dev-маркировка. */
function fillLegal(content) {
  const el = document.querySelector('[data-bind="ip"]');
  if (!el || !content.ip) return;
  el.textContent = content.ip;
  el.removeAttribute('data-pending');
}

export function applyContent(content) {
  syncVkLinks(content);
  addTelegramButtons(content);
  linkMosRu(content);
  fillLegal(content);
}
