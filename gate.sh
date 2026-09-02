#!/bin/sh
# ============================================================
# Шлюз перед публикацией. Пока хоть один пункт не пуст — не сдавать.
# Запуск: sh gate.sh
# ============================================================
cd "$(dirname "$0")" || exit 1
SRC="index.html"
fail=0

say_fail() { printf '\n[ БЛОК ] %s\n' "$1"; fail=1; }
say_warn() { printf '\n[ ПРОВЕРИТЬ ] %s\n' "$1"; }

echo "=== Шлюз: Йога Коворкинг ==="

# 1. Незакрытые данные из реестра
if grep -n 'data-pending' "$SRC"; then
  say_fail "В разметке остались data-pending — закрыть данными или планом Б (PENDING.md)."
fi

# 2. Черновой режим
if grep -n 'data-env="dev"' "$SRC"; then
  say_fail "Не снят dev-режим: атрибут data-env=\"dev\" на <html>."
fi
if grep -n 'name="robots" content="noindex' "$SRC"; then
  say_fail "Страница под noindex — снять перед публикацией."
fi

# 3. Заглушки и мусор
if grep -rniE "lorem|\+7 000|000-00-00|уточня|placeholder|заглушка|TODO|example\.com" "$SRC"; then
  say_fail "Заглушки или служебные пометки в разметке."
fi

# 4. Домен не подставлен
if grep -rn '{{SITE_URL}}' "$SRC" robots.txt sitemap.xml 2>/dev/null; then
  say_fail "Не подставлен домен: остался токен {{SITE_URL}} (PENDING-07). Помогает publish.sh."
fi

# 5. Пустые значения в блоке контента — проверить по реестру вручную
if sed -n '/id="content"/,/<\/script>/p' "$SRC" | grep -n 'null'; then
  say_warn "В блоке #content есть null — сверить каждый по PENDING.md."
fi

# 6. Реестр закрыт
if grep -cE '\|[[:space:]]*ждём[[:space:]]*\|' PENDING.md | grep -qv '^0$'; then
  say_fail "В PENDING.md остались строки со статусом «ждём»."
fi

# 7. Все картинки легче 300 КБ
find photos og.jpg -type f \( -name '*.jpg' -o -name '*.webp' -o -name '*.png' \) -size +300k 2>/dev/null | while read -r f; do
  echo "Тяжёлый файл: $f"
done

echo
if [ "$fail" -eq 0 ]; then
  echo "=== Шлюз пройден. Можно публиковать. ==="
else
  echo "=== НЕ СДАВАТЬ: см. блоки выше. ==="
fi
exit "$fail"
