/* ============================================================
   Точка входа. Подключается как <script type="module" defer>.
   Каждый модуль сам сообщает в консоль, если не нашёл свою разметку.
   ============================================================ */

import { readContent, applyContent } from './content.js';
import { initMenu } from './nav.js';
import { initReveal } from './reveal.js';
import { initFaq } from './faq.js';

try {
  applyContent(readContent());
} catch (err) {
  console.error('[main] Подстановка контента упала:', err);
}

try {
  initMenu();
} catch (err) {
  console.error('[main] Инициализация меню упала:', err);
}

try {
  initReveal();
} catch (err) {
  console.error('[main] Инициализация анимаций упала:', err);
}

try {
  initFaq();
} catch (err) {
  console.error('[main] Инициализация FAQ упала:', err);
}
