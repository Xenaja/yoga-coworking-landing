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

HOST=$(echo "$SITE_URL" | sed 's|^https\?://||')
echo "→ Проверяю, что $HOST реально резолвится, прежде чем что-то менять"
RESOLVED=""
if command -v getent >/dev/null 2>&1 && getent hosts "$HOST" >/dev/null 2>&1; then RESOLVED=1; fi
if [ -z "$RESOLVED" ] && command -v host >/dev/null 2>&1 && host "$HOST" >/dev/null 2>&1; then RESOLVED=1; fi
if [ -z "$RESOLVED" ] && command -v dig >/dev/null 2>&1 && [ -n "$(dig +short "$HOST" 2>/dev/null)" ]; then RESOLVED=1; fi
if [ -z "$RESOLVED" ] && command -v nslookup >/dev/null 2>&1 \
   && nslookup "$HOST" 2>/dev/null | grep -qE '[Aa]ddress:?[[:space:]]+[0-9]'; then RESOLVED=1; fi
# Локальный резолвер может молчать (VPN, корпоративный DNS), а домен при этом работать.
# Последний довод — сайт отвечает по HTTPS.
if [ -z "$RESOLVED" ] && command -v curl >/dev/null 2>&1; then
  CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "https://$HOST/" 2>/dev/null)
  case "$CODE" in
    2??|3??) RESOLVED=1; echo "  DNS молчит, но https://$HOST/ отвечает $CODE — домен живой" ;;
  esac
fi
if [ -z "$RESOLVED" ]; then
  echo "  ✗ $HOST не резолвится и не отвечает по HTTPS (DNS ещё не разошёлся или не настроен)."
  echo "  Публикация с нерабочим доменом в canonical/OG хуже, чем noindex. Прервано."
  exit 1
fi

echo "→ Подставляю домен: $CURRENT → $SITE_URL"
for f in index.html robots.txt sitemap.xml; do
  [ -f "$f" ] || continue
  sed -i "s|$CURRENT|$SITE_URL|g" "$f"
done
sed -i 's| data-env="dev"||' index.html
sed -i '/name="robots" content="noindex/d' index.html

echo "→ Шлюз"
if ! sh gate.sh; then
  echo "→ Шлюз не пройден — откатываю подстановку домена и снятие noindex"
  git checkout -- index.html robots.txt sitemap.xml
  exit 1
fi

if git rev-parse --git-dir >/dev/null 2>&1 && git remote | grep -q .; then
  echo "→ Коммит и пуш"
  git add -A
  git commit -m "Публикация: $SITE_URL" || echo "  нечего коммитить"
  git push
else
  echo "→ Git-репозиторий или remote не настроен — публикую вручную."
fi

echo "Готово. Проверить: превью ссылки в Telegram, Lighthouse mobile, validator.schema.org"
