#!/bin/sh
# ============================================================
# Перевод черновика в публикацию.
# Запуск: sh publish.sh https://ваш-домен.ру
#
# Что делает:
#   1. подставляет домен вместо токена {{SITE_URL}} (canonical, OG, sitemap, robots);
#   2. снимает черновой режим: data-env="dev" и noindex;
#   3. прогоняет gate.sh — без зелёного шлюза дальше не идёт;
#   4. если настроен git remote — коммитит и пушит.
# Скрипт идемпотентен: повторный запуск ничего не ломает.
# ============================================================
cd "$(dirname "$0")" || exit 1

SITE_URL="$1"
if [ -z "$SITE_URL" ]; then
  echo "Укажите адрес сайта: sh publish.sh https://ваш-домен.ру"
  exit 1
fi
SITE_URL="${SITE_URL%/}"   # без завершающего слэша

# что стоит в canonical сейчас: токен или уже подставленный адрес
CURRENT=$(sed -n 's|.*rel="canonical" href="\([^"]*\)/".*|\1|p' index.html | head -1)
[ -z "$CURRENT" ] && CURRENT="{{SITE_URL}}"

echo "→ Подставляю домен: $CURRENT → $SITE_URL"
for f in index.html robots.txt sitemap.xml; do
  [ -f "$f" ] || continue
  sed -i "s|$CURRENT|$SITE_URL|g" "$f"
done

echo "→ Снимаю черновой режим"
sed -i 's| data-env="dev"||' index.html
sed -i '/name="robots" content="noindex/d' index.html

echo "→ Шлюз"
sh gate.sh || exit 1

if git rev-parse --git-dir >/dev/null 2>&1 && git remote | grep -q .; then
  echo "→ Коммит и пуш"
  git add -A
  git commit -m "Публикация: $SITE_URL" || echo "  нечего коммитить"
  git push
else
  echo "→ Git-репозиторий или remote не настроен — публикую вручную."
fi

echo "Готово. Проверить: превью ссылки в Telegram, Lighthouse mobile, validator.schema.org"
