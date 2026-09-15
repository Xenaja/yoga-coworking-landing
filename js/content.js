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

/** Кнопки мессенджеров: адреса берутся из #content.
 *  В разметке стоят те же адреса — они работают и без JS. */
function syncMessengerLinks(content) {
  const map = { vk: content.vk_message, tg: content.telegram, max: content.max };
  document.querySelectorAll('a[data-cta]').forEach((a) => {
    const href = map[a.dataset.cta];
    if (href) a.href = href;
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

/** Телефон: текст и ссылка tel: собираются из одного значения #content,
 *  чтобы при смене номера править его в одном месте. */
function fillPhone(content) {
  if (!content.phone) return;
  const href = 'tel:' + content.phone.replace(/[^+\d]/g, '');
  document.querySelectorAll('[data-bind="phone"]').forEach((el) => {
    el.textContent = content.phone;
    el.href = href;
  });
}

export function applyContent(content) {
  fillPhone(content);
  syncMessengerLinks(content);
  linkMosRu(content);
  fillLegal(content);
}
