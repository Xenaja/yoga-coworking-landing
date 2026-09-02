/* ============================================================
   Точка входа. Подключается как <script type="module" defer>.
   Каждый модуль сам сообщает в консоль, если не нашёл свою разметку.
   ============================================================ */

import { readContent, applyContent } from './content.js';
import { initHeader, initMenu } from './nav.js';
import { initReveal } from './reveal.js';

try {
  applyContent(readContent());
} catch (err) {
  console.error('[main] Подстановка контента упала:', err);
}

try {
  initHeader();
  initMenu();
} catch (err) {
  console.error('[main] Инициализация шапки и меню упала:', err);
}

try {
  initReveal();
} catch (err) {
  console.error('[main] Инициализация анимаций упала:', err);
}
