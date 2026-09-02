# Handoff: рестайлинг лендинга «Йога Коворкинг»

## Overview
Визуальный рестайлинг существующего одностраничного лендинга сети йога-залов
на базе библиотек юга Москвы (репозиторий `xenaja/yoga-coworking-landing`,
превью: https://xenaja.github.io/yoga-coworking-landing/).

**Тексты и порядок блоков не менялись** — они взяты дословно из живой страницы
и `HANDOFF-DESIGN.md`. Изменены только типографика, цвет, сетки, отступы,
обработка фотографий и компоновка первого экрана. Два текстовых правки,
внесённые заказчицей в этой итерации:
- «Аренда съедает доход, а группу приходится собирать своими силами**?**» (был точка)
- «0 ₽ — **оплата за аренду и инвентарь для инструктора**» (было «аренды и инвентаря для инструктора»)

## About the Design Files
Файл `Yoga-Coworking.dc.html` в этом бандле — **дизайн-референс**, а не продакшн-код.
Это HTML-прототип, показывающий итоговый вид и поведение; стили в нём написаны
инлайново намеренно (требование среды прототипирования).

Задача — воспроизвести этот вид **в существующей структуре проекта лендинга**,
которая описана в его `README.md`:
```
index.html            разметка, JSON-LD, блок #content
css/tokens.css        палитра, шрифты, шкала кеглей, отступы  ← токены ниже сюда
css/base.css          сброс, типографика, доступность
css/components.css    ритм секций, кнопки, карточки, шапка, sticky
css/sections.css      hero, аудитории, залы, шаги, вопросы, контакты
```
Правила проекта сохраняются: **инлайновых `style=` в проде нет**, mobile-first,
брейкпоинты 640 / 1024 / 1280, без сборки (статика + ES-модули).
JSON-LD, `#content`, `data-env="dev"`-маркировка, `gate.sh`/`publish.sh` — не трогать.

## Fidelity
**High-fidelity.** Финальные цвета, шрифты, кегли, отступы и состояния.
Воспроизводить попиксельно значениями из раздела «Design Tokens».

## Screens / Views
Одна страница, 9 блоков в исходном порядке. Контейнер во всех блоках:
`max-width: 1200px; margin-inline: auto; padding-inline: clamp(20px, 4vw, 32px)`.
Вертикальный ритм секций: `padding-block: clamp(72px, 9vw, 120px)`.

### 0. Шапка (sticky)
- `position: sticky; top: 0; z-index: 50; height: 72px`
- Фон `rgba(250,248,245,.82)` + `backdrop-filter: blur(14px) saturate(1.4)`,
  низ — `1px solid rgba(36,31,43,.08)`
- Логотип 44×44 (`object-fit: contain`) + лого-текст 17px Literata:
  «Йога» цветом `--ink`, «коворкинг» — акцентом, между ними узкий пробел `&#8239;`
- Меню: 14px Golos Text, `color:#57505C`, `gap: 28px`, ховер — акцент
- Кнопка «Написать в ВК»: 14px/500, `padding: 11px 20px`, `radius: 2px`,
  фон акцент → ховер `#5C3B6E`, `white-space: nowrap`

### 1. Hero — фулл-бли́д кадр (главное изменение)
- Секция: `min-height: min(90vh, 840px)`, `display:flex; flex-direction:column;
  justify-content:flex-end`, фон `#341831`, `overflow:hidden`
- Фото `photos/hero/hero.jpg` абсолютом на всю секцию:
  `object-fit: cover; object-position: 60% 45%;
  filter: saturate(.55) contrast(1.06) brightness(.92)`
- Две вуали поверх (обе абсолютом, `inset: 0`):
  1. `linear-gradient(103deg, rgba(46,20,44,.94) 0%, rgba(52,24,49,.8) 38%, rgba(52,24,49,.34) 72%, rgba(74,36,80,.42) 100%)`
  2. `linear-gradient(180deg, rgba(46,20,44,.5) 0%, rgba(46,20,44,0) 30%, rgba(30,12,28,.62) 100%)`
- Контент: `padding: clamp(120px,16vw,180px) clamp(20px,4vw,32px) clamp(40px,5vw,56px)`
- Бейдж-строка: «7 ЗАЛОВ» (`#D6B6DF`, 600) · разделитель 28×1px `rgba(245,239,243,.35)`
  · «ЧЕРТАНОВО · БРАТЕЕВО · ЗЯБЛИКОВО · САДОВНИКИ» — 12px, `letter-spacing:.18em`,
  uppercase, `rgba(245,239,243,.62)`
- H1: `clamp(33px, 6.4vw, 88px)`, `line-height: .98`, `letter-spacing: -.03em`, 500, `#fff`,
  `text-shadow: 0 2px 40px rgba(30,12,28,.35)`.
  Первая строка «Йога-коворкинг» — `white-space: nowrap`; вторая «в вашем районе» —
  курсив, цвет `#E3C8EA`.
  ⚠ Минимум clamp именно 33px: при 320px вьюпорта nowrap-строка иначе даёт горизонтальный скролл.
- Ниже — ряд `display:flex; flex-wrap:wrap; gap: clamp(28px,4vw,72px); align-items:flex-end`:
  - Левая колонка (`flex: 1 1 420px; max-width: 620px`): подзаголовок
    `clamp(16px,1.4vw,19px)/1.6`, `rgba(245,239,243,.88)`, `max-width: 46ch`;
    пара кнопок (см. «Кнопки»); строка «Расписание занятий и запись — в сервисе mos.ru»
    14px `rgba(245,239,243,.6)`
  - Правая колонка (`flex: 0 1 300px`), отделена `border-left: 1px solid rgba(245,239,243,.28)`,
    `padding-left: 24px`: курсивная подпись Literata `clamp(17px,1.7vw,22px)/1.35` `#F5EFF3`
    «Так выглядит зал: тихо, просторно, без суеты фитнес-клуба.» + 12px uppercase
    `letter-spacing:.16em` `rgba(245,239,243,.55)` «Коврики и инвентарь — в зале»

### 1b. Полоса цифр (на кремовом, сразу под hero)
`display:grid; grid-template-columns: repeat(auto-fit, minmax(255px, 1fr))`,
низ — `1px solid rgba(36,31,43,.1)`, вертикальные разделители `border-right` того же цвета.
Ячейки: `padding: 44px 32px` (первая без левого, последняя без правого).
Цифра: Literata `clamp(40px,5vw,64px)`, `line-height:1`, акцент, `letter-spacing:-.03em`.
Подпись: 15px `#57505C`, `margin-top: 12px`.
Значения: **7** залов на юге Москвы · **6** районов: Чертаново, Братеево, Зябликово, Садовники ·
**0 ₽** оплата за аренду и инвентарь для инструктора

### Общий заголовок секции (блоки 01–08)
- Служебная строка: `display:flex; align-items:baseline; gap:20px`, 12px uppercase
  `letter-spacing:.18em`, `#8C8093`; слева номер «01 / 08» (`font-variant-numeric: tabular-nums`),
  посередине растянутая линия `height:1px; background: rgba(36,31,43,.12)`, справа — имя раздела.
  На тёмных блоках: текст `rgba(245,239,243,.5)`, линия `rgba(245,239,243,.2)`.
- H2: Literata `clamp(30px,3.6vw,46px)`, `line-height:1.12`, `letter-spacing:-.02em`, 500.
  В «Ученикам»/«Инструкторам» одно слово выделено курсивом акцентным цветом.
- Лид-абзац рядом (вторая колонка `repeat(auto-fit, minmax(320px,1fr))`, `gap: clamp(32px,4vw,64px)`):
  17px/1.7 `#57505C`.

### 2. «Что это» — 01 / 08
Три карточки `repeat(auto-fit, minmax(255px,1fr))`, `gap: 20px`, `margin-top: 72px`:
`background:#fff; border:1px solid rgba(36,31,43,.09); radius:3px; padding:36px 32px 40px`.
Ховер: `border-color: rgba(138,106,164,.45); transform: translateY(-3px)`, `transition: .25s`.
Рубрика 11px uppercase `letter-spacing:.2em` `#7A5F80` 600 → H3 23px/1.25 → текст 15px/1.65 `#57505C`.

### 3. «Ученикам» — 02 / 08 (`#students`)
Слева нумерованный список 01–04: строки `display:grid; grid-template-columns:auto 1fr; gap:24px;
padding: 26px 0`, разделители `1px solid rgba(36,31,43,.12)` (плюс `border-top` у первой).
Номер: Literata 14px `#A595A8`, tabular-nums. H3 20px/1.3, текст 15px/1.6.
Под списком пара кнопок + приписка 14px `#8C8093`.
Справа — фото `photos/practice/practice.jpg`, `position: sticky; top: 104px`, `radius: 3px`,
`height: clamp(360px,46vw,620px)`, `object-fit: cover`, `filter: saturate(.82) contrast(1.04)`.

### 4. «Инструкторам» — 03 / 08 (`#teachers`, тёмный блок)
Фон `#341831`, текст `#F5EFF3`. Список из 5 пунктов + 6-я ячейка с курсивной цитатой
(`Literata italic 19px/1.45`, `#D6B6DF`) — `grid; repeat(auto-fit, minmax(300px,1fr));
gap: 0 clamp(24px,4vw,64px)`, разделители `rgba(245,239,243,.16)`.
H3 20px `#fff`, текст 15px/1.6 `rgba(245,239,243,.62)`.
Кнопки инвертированы: основная — белая с текстом `#341831` (ховер `#D6B6DF`),
вторичная — обводка `rgba(245,239,243,.38)`.

### 5. «Требования» — 04 / 08
Шесть плиток `repeat(auto-fit, minmax(255px,1fr))`, `gap: 20px`:
`background:#F3EFE9; radius:3px; padding:32px 28px 36px; border-top:2px solid <accent>`.
Номер Literata 15px акцентом, H3 21px/1.25, текст 15px/1.6.
Шестая плитка — не заливка, а `border: 1px dashed rgba(138,106,164,.4)` с текстом
16px/1.6 `#54305F` и двумя ссылками (подчёркивание `border-bottom: 1px solid rgba(138,106,164,.4)`).

### 6. «Наши залы» — 05 / 08 (`#halls`)
- Лента фото: `display:grid; grid-auto-flow:column; grid-auto-columns:minmax(300px,1fr);
  gap:12px; overflow-x:auto; scroll-snap-type:x mandatory`, элементы `scroll-snap-align:center`,
  `height: 300px`, `object-fit: cover`, `filter: saturate(.8) contrast(1.04)`, `radius: 3px`.
  6 файлов `photos/halls/hall-01…06.jpg` с исходными alt-текстами. Подпись под лентой 13px `#8C8093`.
- Каталог из 7 строк: `display:flex; flex-wrap:wrap; gap:10px 24px; align-items:baseline;
  padding: 22px 0`, разделители `rgba(36,31,43,.1)`, ховер `background:#F3EFE9`.
  Колонки: номер (Literata 14px акцент, `flex: 0 0 72px`) · название 17px (`flex: 1 1 210px`) ·
  район · метро 15px `#57505C` (`flex: 1 1 200px`) · адрес 15px `#8C8093` (`flex: 1 1 180px`).
  Данные — как в текущем `index.html` (№ 143, 150, 151·1, 151·2, 155, 158, 159).
- Замыкающий абзац 16px/1.6 `#57505C`, `max-width: 60ch`.

### 7. «Как начать» — 06 / 08
Две карточки `repeat(auto-fit, minmax(300px,1fr))`, `gap: 20px`:
`background:#fff; border:1px solid rgba(36,31,43,.09); radius:3px; padding:40px 36px 44px`.
Рубрика 11px uppercase `#7A5F80` 600 → H3 25px/1.2 → `<ol>` из 3 шагов
(`grid; auto 1fr; gap:20px; padding:20px 0; border-top:1px solid rgba(36,31,43,.1)`),
номер Literata 14px акцент, заголовок шага 17px/500, текст 15px/1.6 `#57505C`.

### 8. FAQ — 07 / 08 (`#faq`)
Аккордеон, `max-width: 960px`, разделители `rgba(36,31,43,.12)`.
Кнопка строки: `width:100%; display:flex; justify-content:space-between; align-items:flex-start;
gap:16px; min-width:0; padding: 26px 0`, без фона и рамки, `cursor:pointer`.
Вопрос: Literata `clamp(18px,2vw,22px)/1.35`, 500; цвет `#241F2B`, у раскрытого — акцент.
Иконка «+» 22px `#A595A8`, у раскрытого `transform: rotate(45deg)`, `transition: .25s`.
Тело: `overflow:hidden; max-height: 0 → 320px; opacity: 0 → 1;
transition: max-height .35s ease, opacity .25s`; текст 16px/1.7 `#57505C`, `max-width: 70ch`,
`padding-bottom: 28px`. По умолчанию раскрыт первый вопрос; открыт всегда только один.
7 вопросов — те же, что в секции и в JSON-LD `FAQPage` (менять надо в обоих местах).

### 9. «Контакты» — 08 / 08 (`#contacts`, брендовый блок)
Фон `#4A2450`, текст `#F5EFF3`, `padding: clamp(72px,9vw,120px) 0 96px`.
Слева H2 `clamp(34px,4.6vw,60px)/1.05` `#fff`, абзац 17px/1.7 `rgba(245,239,243,.78)` `max-width:52ch`,
пара кнопок (основная белая), ссылки-строка: «Сообщество ВКонтакте» `#D6B6DF` с подчёркиванием +
серым «Расписание занятий и запись — в сервисе mos.ru».
Справа карточка: `border:1px solid rgba(245,239,243,.2); radius:3px; padding:36px 32px 40px;
background: rgba(255,255,255,.03)`, H3 24px `#fff` + текст 15px/1.7.

### 10. Футер
Фон `#341831`, `border-top: 1px solid rgba(245,239,243,.12)`, `padding: 44px 0 56px`,
`flex; wrap; justify-content: space-between; gap: 32px`.
Логотип 80×80 на светлой круглой подложке (`background:#FAF8F5; border-radius:50%; padding:9px`) —
**без инвертирующих фильтров**, знак цветной. Реквизиты 14px/1.7 `rgba(245,239,243,.6)`,
копирайт `rgba(245,239,243,.42)`. Справа ссылки 14px `#D6B6DF`, ховер `#fff`.

## Кнопки (единый паттерн)
Все парные CTA — **одной ширины**:
`display:inline-flex; align-items:center; justify-content:center; min-width:220px;
white-space:nowrap; flex:none; border-radius:2px; font: 500 15px Golos Text`.
- Основная на светлом: фон `#8A6AA4`, текст `#fff`, `padding: 14px 26px`; ховер фон `#5C3B6E`
- Вторичная на светлом: `border: 1px solid rgba(36,31,43,.22)`, текст `#241F2B`,
  `padding: 13px 24px`; ховер `border-color/color: #8A6AA4`
- Основная на тёмном: фон `#fff`, текст `#341831`; ховер фон `#D6B6DF`/`#E3C8EA`
- Вторичная на тёмном: `border: 1px solid rgba(245,239,243,.38…45)`, текст `#F5EFF3`;
  ховер `#D6B6DF`/`#E3C8EA`
`transition: background .2s` / `border-color .2s, color .2s`.
Все ведут на `https://vk.ru/im?sel=-241061217` и `https://t.me/natalimorozova7sky`.

## Interactions & Behavior
- Плавная прокрутка по анкорам: `html { scroll-behavior: smooth }`,
  `section[id] { scroll-margin-top: 88px }` (компенсация sticky-шапки)
- FAQ-аккордеон: клик по строке раскрывает её и закрывает остальные; повторный клик закрывает.
  Только `max-height`/`opacity`/`transform` — без анимации layout-свойств
- Ховеры карточек (`translateY(-3px)` + смена `border-color`) и строк каталога залов (заливка `#F3EFE9`)
- Лента залов — нативный горизонтальный скролл со снапом (без JS, без стрелок)
- Фото секции «Ученикам» — `position: sticky` рядом со списком
- Респонсив без медиа-запросов: все сетки на `repeat(auto-fit, minmax(…, 1fr))`,
  кегли и отступы на `clamp()`. В продакшн-CSS это можно переписать
  под брейкпоинты 640/1024/1280, но поведение должно остаться тем же
- Sticky-полоса CTA на мобиле из текущего проекта сохраняется как есть
- `prefers-reduced-motion`: отключить `transform`-ховеры и переход аккордеона

## State Management
Единственное состояние — индекс раскрытого вопроса FAQ (`number`, по умолчанию `0`,
`-1` = все закрыты). Никаких фетчей, форм и персональных данных → обвязка 152-ФЗ не нужна.

## Design Tokens
Цвета (для `css/tokens.css`) — палитра выведена из кириллического логотипа:
| Токен | Значение | Где |
|---|---|---|
| `--bg` | `#FAF8F5` | фон страницы, `theme-color` |
| `--surface` | `#FFFFFF` | карточки «Что это», «Как начать» |
| `--surface-warm` | `#F3EFE9` | плитки требований, ховер строк каталога |
| `--ink` | `#241F2B` | основной текст, H1–H3 на светлом |
| `--ink-2` | `#57505C` | абзацы |
| `--ink-3` | `#8C8093` | подписи, мелкие пояснения |
| `--label` | `#7A5F80` | рубрики 11px uppercase (600) |
| `--num` | `#A595A8` | номера пунктов, иконка «+» |
| `--accent` | `#8A6AA4` | акцент (мид-тон лотоса) |
| `--accent-deep` | `#5C3B6E` | ховер кнопок |
| `--accent-ink` | `#54305F` | текст на кремовом акцентно |
| `--plum-900` | `#341831` | тёмный блок «Инструкторам», футер (цвет букв лого) |
| `--plum-800` | `#4A2450` | брендовый блок «Контакты» |
| `--lilac-300` | `#D6B6DF` | акцент на тёмном |
| `--lilac-200` | `#E3C8EA` | курсив в H1, ховер белых кнопок |
| `--on-dark` | `#F5EFF3` | текст на тёмном |
| hairline светлый | `rgba(36,31,43,.09….14)` | рамки, разделители |
| hairline тёмный | `rgba(245,239,243,.16….2)` | разделители на тёмном |

Типографика:
- Заголовки: **Literata** (variable, `ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;1,7..72,400;1,7..72,500`),
  `font-optical-sizing: auto`, вес 500, курсив — как акцент
- Текст: **Golos Text** 400/500/600
- Шкала: H1 `clamp(33px,6.4vw,88px)`/.98/-.03em · H2 `clamp(30px,3.6vw,46px)`/1.12/-.02em ·
  H2 контактов `clamp(34px,4.6vw,60px)`/1.05 · H3 20–25px/1.2–1.3 ·
  лид 17–19px/1.7 · текст 15–16px/1.6–1.7 · подписи 13–14px ·
  рубрики 11–12px uppercase `letter-spacing: .16–.2em`
- Цифры в статистике и номерах — `font-variant-numeric: tabular-nums`
- Подключение: Google Fonts, `display=swap`, `preconnect` к `fonts.googleapis.com` и `fonts.gstatic.com`.
  Для прода лучше самохостинг `woff2` (латиница + кириллица, `unicode-range`) — Lighthouse ≥ 90

Прочее: радиусы `2px` (кнопки) / `3px` (карточки, фото) / `50%` (лого в футере);
теней нет — только hairline-рамки и `translateY` на ховере;
отступы: `clamp(72px,9vw,120px)` между секциями, `20px` между карточками,
`22–26px` вертикальный ритм строк списков, контейнер `padding-inline: clamp(20px,4vw,32px)`.

## Assets
- `photos/logo.png` — кириллический знак «ЙОГА КОВОРКИНГ» заказчицы (PENDING-11),
  **обрезаны прозрачные поля**: исходник 1280×714 со знаком в центральном квадрате →
  кадрировано до 464×464. Именно этот файл лежит в бандле и должен заменить старый
  `photos/logo.png` в репозитории, иначе знак снова будет рисоваться ~18px внутри 44px-бокса.
  SVG-вектор по-прежнему желателен для Retina.
- `photos/hero/hero.jpg`, `photos/practice/practice.jpg`, `photos/halls/hall-01…06.jpg` —
  существующие фото из репозитория, в прототипе подключены по абсолютным URL с
  `xenaja.github.io`; в проде это локальные относительные пути (WebP, <300 КБ).
  Все фото приглушены фильтрами (`saturate .55–.82`), чтобы телефонное качество не бросалось
  в глаза. Когда придут профессиональные снимки — фильтры ослабить до `saturate(.9)`.
- `og.jpg` 1200×630 — как есть.
- Иконок нет; «+» аккордеона — текстовый символ.

## Files
- `Yoga-Coworking.dc.html` — референс-прототип целиком (открывается в браузере как есть)
- `photos/logo.png` — кадрированный логотип для замены в репозитории
- Исходники контента: `HANDOFF-DESIGN.md` (тексты и структура), `PENDING.md` (что ждём от заказчицы)

## Открытые пункты, влияющие на вёрстку
- **PENDING-01** — ссылка на mos.ru: упоминания станут ссылками (стиль ссылок уже задан)
- **PENDING-12** — соответствие «фото ↔ библиотека»: тогда кадры вернутся в строки каталога,
  и лента фото уйдёт (сейчас это два отдельных блока именно из-за отсутствия соответствия)
- **PENDING-09** — стиль формально ещё «план Б»; эта итерация согласована заказчицей в чате
