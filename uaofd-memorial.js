/*! Меморіал Героїв Небесної Сотні — віджет для Webflow (третій таб кабінету).
    Вставка (елемент HTML Embed):
      <div data-uad-memorial></div>
      <script src="https://cdn.jsdelivr.net/gh/pavlokot/uad@mem-v1/uaofd-memorial.js" defer></script>
    - data-bg : необов'язково, колір фону під блоком. За замовчуванням #f5f5f5.
    Джерело: презентація для погодження + додаток «Звіт про виконання бюджету
    цільового фонду» (без листа Музею — за проханням). Дані статичні, редагуються
    в об'єкті DATA нижче. Зображення — з репозиторію pavlokot/uad (папка memorial-imgs).
    Стилі ізольовані (Shadow DOM), без зовнішніх залежностей. */
(function () {
  "use strict";

  var IMG_BASE = "https://cdn.jsdelivr.net/gh/pavlokot/uad@mem-v1/memorial-imgs/";

  var CSS = ":host{display:block}\n" +
    ".uad-memorial, .uad-memorial * { box-sizing: border-box; }\n" +
    ".uad-memorial {\n" +
    "  --m-violet: #8040b0; --m-navy: #1b2a4a; --m-rust: #c34c2c; --m-rust-soft: #fbe4dc;\n" +
    "  --m-done: #78a748; --m-accent: #e6f44f; --m-accent-soft: #fbfde0;\n" +
    "  --m-ink: #242424; --m-ink-soft: #4b4b4b; --m-muted: #6e6e6e;\n" +
    "  --m-line: rgba(0,0,0,0.1); --m-panel: #ffffff; --m-page-bg: #f5f5f5;\n" +
    "  color-scheme: light; display: block; width: 100%; padding: 0; position: relative;\n" +
    "  background: var(--m-page-bg); color: var(--m-ink);\n" +
    "  font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;\n" +
    "}\n" +
    ".uad-memorial__shell { padding: 32px 40px 48px; }\n" +
    ".uad-memorial__eyebrow { margin: 0 0 12px; font-family: Manrope, Arial, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--m-violet); }\n" +
    ".uad-memorial__title { margin: 0 0 12px; font-family: Manrope, Arial, sans-serif; font-size: 30px; line-height: 1.16; font-weight: 900; letter-spacing: -0.02em; max-width: 34ch; color: var(--m-muted); }\n" +
    ".uad-memorial__lede { margin: 0 0 22px; max-width: 78ch; font-size: 14px; line-height: 1.6; color: var(--m-ink-soft); font-weight: 500; }\n" +
    ".uad-memorial__section { margin-top: 34px; }\n" +
    ".uad-memorial__section h3 { margin: 0 0 8px; font-family: Manrope, Arial, sans-serif; font-size: 19px; font-weight: 800; letter-spacing: -0.01em; color: var(--m-ink); }\n" +
    ".uad-memorial__section > p { margin: 0 0 16px; max-width: 78ch; font-size: 13.5px; line-height: 1.6; color: var(--m-ink-soft); }\n" +
    ".uad-memorial__gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 8px; }\n" +
    ".uad-memorial__gallery img { display: block; width: 100%; height: 170px; object-fit: cover; border-radius: 10px; border: 1px solid var(--m-line); }\n" +
    ".uad-memorial__caption { margin: 0 0 4px; font-size: 11.5px; color: var(--m-muted); font-weight: 600; }\n" +
    ".uad-memorial__budget { display: grid; grid-template-columns: 1.3fr 1fr; gap: 16px; align-items: stretch; }\n" +
    ".uad-memorial__card { padding: 22px 24px; border-radius: 12px; background: var(--m-panel); border: 1px solid var(--m-line); }\n" +
    ".uad-memorial__big { font-family: Manrope, Arial, sans-serif; font-size: 32px; font-weight: 900; letter-spacing: -0.02em; color: var(--m-ink); margin: 0 0 4px; font-variant-numeric: tabular-nums; }\n" +
    ".uad-memorial__card .uad-memorial__sub { margin: 0 0 14px; font-size: 12px; font-weight: 600; color: var(--m-muted); }\n" +
    ".uad-memorial__lines { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }\n" +
    ".uad-memorial__lines li { display: flex; justify-content: space-between; gap: 12px; padding: 10px 12px; border-radius: 8px; background: var(--m-page-bg); font-size: 13px; font-weight: 600; color: var(--m-ink); }\n" +
    ".uad-memorial__lines li b { font-family: Manrope, Arial, sans-serif; font-variant-numeric: tabular-nums; }\n" +
    ".uad-memorial__ask { padding: 22px 24px; border-radius: 12px; background: var(--m-accent-soft); border: 1px solid rgba(230,244,79,0.55); }\n" +
    ".uad-memorial__ask h3 { color: var(--m-navy); }\n" +
    ".uad-memorial__ask-nums { display: flex; gap: 22px; flex-wrap: wrap; margin: 6px 0 14px; }\n" +
    ".uad-memorial__ask-nums div b { display: block; font-family: Manrope, Arial, sans-serif; font-size: 24px; font-weight: 900; color: var(--m-navy); font-variant-numeric: tabular-nums; }\n" +
    ".uad-memorial__ask-nums div span { font-size: 12px; font-weight: 700; color: var(--m-ink-soft); }\n" +
    ".uad-memorial__ask p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--m-ink-soft); max-width: 70ch; }\n" +
    ".uad-memorial__plaque { margin: 6px auto 0; max-width: 480px; padding: 30px 26px; border-radius: 10px; background: var(--m-navy); color: #f4f2ec; text-align: center; }\n" +
    ".uad-memorial__plaque .l1 { font-family: Manrope, Arial, sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 14px; }\n" +
    ".uad-memorial__plaque .l2 { font-size: 12.5px; line-height: 1.7; opacity: 0.9; margin-bottom: 10px; }\n" +
    ".uad-memorial__plaque .l3 { font-family: Manrope, Arial, sans-serif; font-size: 13px; font-weight: 700; line-height: 1.9; letter-spacing: 0.02em; margin-bottom: 14px; }\n" +
    ".uad-memorial__plaque .l4 { font-size: 12px; line-height: 1.6; opacity: 0.85; max-width: 380px; margin: 0 auto 10px; }\n" +
    ".uad-memorial__plaque .l5 { font-size: 11.5px; opacity: 0.7; letter-spacing: 0.04em; }\n" +
    ".uad-memorial__report-head { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }\n" +
    ".uad-memorial__report-head .uad-memorial__sub { margin: 0 0 18px; }\n" +
    ".uad-memorial__tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }\n" +
    ".uad-memorial__tile { padding: 14px 16px; border-radius: 12px; background: var(--m-panel); border: 1px solid var(--m-line); }\n" +
    ".uad-memorial__tile b { display: block; font-family: Manrope, Arial, sans-serif; font-size: 22px; font-weight: 900; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; color: var(--m-ink); }\n" +
    ".uad-memorial__tile span { display: block; margin-top: 4px; font-size: 11px; font-weight: 700; color: var(--m-muted); text-transform: uppercase; letter-spacing: 0.03em; }\n" +
    ".uad-memorial__progress-row { display: grid; grid-template-columns: 140px 1fr 170px; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--m-line); font-size: 13px; }\n" +
    ".uad-memorial__progress-row:last-child { border-bottom: 0; }\n" +
    ".uad-memorial__progress-row b { font-size: 13px; font-weight: 800; color: var(--m-ink); }\n" +
    ".uad-memorial__progress-track { height: 10px; border-radius: 999px; background: var(--m-line); overflow: hidden; position: relative; }\n" +
    ".uad-memorial__progress-fill { height: 100%; border-radius: 999px; background: var(--m-done); }\n" +
    ".uad-memorial__progress-nums { font-size: 12px; font-weight: 700; color: var(--m-ink-soft); font-variant-numeric: tabular-nums; text-align: right; }\n" +
    ".uad-memorial__progress-nums em { display: block; font-style: normal; font-weight: 800; }\n" +
    ".uad-memorial__progress-nums em.short { color: var(--m-rust); } .uad-memorial__progress-nums em.over { color: var(--m-done); }\n" +
    ".uad-memorial__tbl-wrap { overflow-x: auto; border: 1px solid var(--m-line); border-radius: 10px; margin-top: 8px; }\n" +
    "table.uad-memorial__tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 560px; }\n" +
    ".uad-memorial__tbl th { text-align: left; padding: 10px 12px; background: var(--m-navy); color: #fff; font-family: Manrope, Arial, sans-serif; font-size: 10.5px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }\n" +
    ".uad-memorial__tbl td { padding: 9px 12px; border-bottom: 1px solid var(--m-line); color: var(--m-ink-soft); }\n" +
    ".uad-memorial__tbl tr:last-child td { border-bottom: 0; }\n" +
    ".uad-memorial__tbl td.num { text-align: right; font-variant-numeric: tabular-nums; color: var(--m-ink); font-weight: 600; }\n" +
    ".uad-memorial__tbl tr.total td { font-weight: 800; color: var(--m-ink); background: var(--m-page-bg); }\n" +
    ".uad-memorial__tbl .st-paid { color: var(--m-done); font-weight: 700; } .uad-memorial__tbl .st-wait { color: var(--m-muted); }\n" +
    ".uad-memorial__toggle { margin-top: 10px; border: 1px solid var(--m-line); background: var(--m-panel); color: var(--m-violet); padding: 8px 16px; border-radius: 999px; font: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer; }\n" +
    ".uad-memorial__toggle:hover { background: var(--m-page-bg); }\n" +
    ".uad-memorial__hidden-row { display: none; }\n" +
    ".uad-memorial__block { margin-top: 26px; }\n" +
    ".uad-memorial__block h4 { margin: 0 0 4px; font-family: Manrope, Arial, sans-serif; font-size: 14px; font-weight: 800; color: var(--m-ink); }\n" +
    ".uad-memorial__block .uad-memorial__sub { margin: 0 0 4px; }\n" +
    "@media screen and (max-width: 980px) {\n" +
    "  .uad-memorial__shell { padding: 28px 24px 40px; }\n" +
    "  .uad-memorial__gallery { grid-template-columns: 1fr 1fr; }\n" +
    "  .uad-memorial__budget { grid-template-columns: 1fr; }\n" +
    "  .uad-memorial__tiles { grid-template-columns: repeat(2, 1fr); }\n" +
    "  .uad-memorial__progress-row { grid-template-columns: 1fr; text-align: left; }\n" +
    "  .uad-memorial__progress-nums { text-align: left; }\n" +
    "}\n" +
    "@media screen and (max-width: 560px) {\n" +
    "  .uad-memorial__shell { padding: 24px 16px 36px; }\n" +
    "  .uad-memorial__gallery { grid-template-columns: 1fr 1fr; }\n" +
    "  .uad-memorial__gallery img { height: 120px; }\n" +
    "  .uad-memorial__ask-nums { gap: 14px; }\n" +
    "}";

  /* ---------- дані (з презентації для погодження, без листа) -------------- */
  var DATA = {
    lede: "21 листопада в Україні відзначають День Гідності та Свободи. Цього дня очікується участь Президента України Володимира Зеленського в урочистій молитві у каплиці Меморіалу Героїв Небесної Сотні на алеї Героїв Небесної Сотні, поблизу вул. Інститутської.",
    renders: ["img-001-000.jpg", "img-001-001.jpg", "img-001-002.jpg"],
    rendersCaption: "Візуалізації меморіального простору та благоустрою",
    support: {
      text: "Президент України та Офіс Президента звернулися до девелоперської спільноти із закликом підтримати будівництво меморіалу та благоустрій території. 9 вересня 2026 року загальні збори Української асоціації девелоперів ухвалили рішення підтримати проєкт і фінансувати його як цільовий через Асоціацію.",
      total: "16 211 007,60 грн",
      totalLabel: "Загальний бюджет проєкту станом на 15.09.2026",
      lines: [
        { l: "Будівельні роботи та благоустрій", v: "11 020 520,40 грн" },
        { l: "Проєктування та приєднання до електромереж", v: "5 190 487,20 грн" }
      ]
    },
    progressPhotos: {
      text: "Більшість членів Асоціації погодила фінансування. На майданчику тривають роботи з облаштування меморіального простору.",
      photos: ["img-002-003.jpg", "img-002-004.jpg", "img-002-005.jpg"],
      caption: "Каплиця та будівельні роботи. Фото з майданчика"
    },
    donors: {
      text: "Музей Революції Гідності підтримав пропозицію Асоціації розмістити у меморіальному просторі дошку подяки з назвами компаній, які долучилися до проєкту. Архітектори розроблять її дизайн і розміщення для погодження з Асоціацією.",
      plaque: {
        l1: "Меморіальний простір Героїв Небесної Сотні",
        l2: "створено за підтримки Української асоціації девелоперів та компаній-членів Асоціації:",
        l3: ["[НАЗВА КОМПАНІЇ]", "[НАЗВА КОМПАНІЇ]", "[НАЗВА КОМПАНІЇ]", "[НАЗВА КОМПАНІЇ]"],
        l4: "Вдячні за внесок у гідне вшанування Героїв Небесної Сотні, які віддали життя за свободу, гідність і демократичне майбутнє України.",
        l5: "20 лютого 2027 року"
      }
    },
    ask: {
      text: "Просимо погодити участь у фінансуванні цільового проєкту через Українську асоціацію девелоперів на спільних умовах:",
      nums: [
        { v: "550 000 грн", l: "на будівельні роботи" },
        { v: "300 000 грн", l: "на проєктування" }
      ],
      note: "Загальний внесок за двома напрямами становить 850 000 грн. Якщо компанія вже сплатила внесок на проєктування, до погодження залишається 550 000 грн на будівельні роботи."
    },
    report: {
      title: "Звіт про виконання бюджету цільового фонду",
      sub: "«Меморіальний комплекс небесної сотні» · станом на 15 вересня 2026 року",
      tiles: [
        { v: "16,211", l: "Бюджет видатків, млн грн" },
        { v: "7,150", l: "Надходження, млн грн" },
        { v: "4,219", l: "Видатки, млн грн" },
        { v: "16,150", l: "Потенціал внесків, млн грн" }
      ],
      summary: {
        cols: ["Напрям", "План видатки", "План надходження", "Факт надходження", "Факт видатки", "Загальний план"],
        rows: [
          ["Будівельні роботи", "11,021", "5,500", "3,850", "2,500", "10,450"],
          ["Проєктування", "5,190", "5,700", "3,300", "1,719", "5,700"]
        ],
        total: ["РАЗОМ", "16,211", "11,200", "7,150", "4,219", "16,150"]
      },
      coverage: [
        { l: "Будівельні роботи", fact: 10450, plan: 11021, deltaLabel: "Нестача 0,571", deltaCls: "short" },
        { l: "Проєктування", fact: 5700, plan: 5190, deltaLabel: "Надлишок 0,510", deltaCls: "over" }
      ]
    },
    tables: [
      {
        title: "Надходження: будівельні роботи",
        sub: "Повний перелік учасників · суми у гривнях",
        cols: ["№", "Учасник / платник", "Бренд", "План внеску", "Факт надходження", "Стан участі / оплати"],
        rows: [
          [1, "«РОЯЛ ХАУЗ ГРУП» ТОВ", "Royal House", "550 000", "550 000", "Сплачено"],
          [2, "«ЮКРЕЙНІАН ДЕВЕЛОПМЕНТ ПАРТНЕРС» ТОВ", "UDP", "550 000", "550 000", "Сплачено"],
          [3, "«К.А.Н. ДЕВЕЛОПМЕНТ» ТОВ", "KAN Development", "550 000", "550 000", "Сплачено"],
          [4, "«НЕРУХОМІСТЬ СТОЛИЦІ» ПАТ", "HECT", "550 000", "550 000", "Сплачено"],
          [5, "«РІЕЛ ДЕВЕЛОПМЕНТ ГРУП» ТОВ", "РІЕЛ", "550 000", "550 000", "Сплачено"],
          [6, "«СТОЛИЦЯ ГРУП» ТОВ", "Stolitsa Group", "550 000", "550 000", "Сплачено"],
          [7, "«БОСФОРУС ДЕВЕЛОПМЕНТ» ТОВ", "Bosphorus Development", "550 000", "550 000", "Сплачено"],
          [8, "«СІРІУС ІНВЕСТ ГРУП» ТОВ", "GEOS", "550 000", "0", "Оплату не зазначено"],
          [9, "«ФУТУРА-ХАТА» ТОВ", "FuturaHata", "550 000", "0", "Оплату не зазначено"],
          [10, "«АЙБІ АЛЬЯНС» ТОВ", "IB Alliance", "550 000", "0", "Оплату не зазначено"],
          [11, "«ІНТЕРГАЛ-БУД» ТОВ", "Інтергал-Буд", "550 000", "0", "Рішення очікується"],
          [12, "«АВАЛОН ІНКОМПАНІ» ТОВ", "AVALON", "550 000", "0", "Рішення очікується"],
          [13, "«Д-І-М» ТОВ", "DIM", "550 000", "0", "Рішення очікується"],
          [14, "«КРЕАТОР-БУД» ТОВ", "Креатор-Буд", "550 000", "0", "Рішення очікується"],
          [15, "«КОВАЛЬСЬКА НЕРУХОМІСТЬ» ТОВ", "Ковальська", "550 000", "0", "Рішення очікується"],
          [16, "«САГА ДЕВЕЛОПМЕНТ» ТОВ", "SAGA Development", "550 000", "0", "Рішення очікується"],
          [17, "«СТАНДАРТ ІНЖИНІРІНГ ГРУП» ТОВ", "ENSO", "550 000", "0", "Рішення очікується"],
          [18, "«УКБ ПЕРФЕКТ ГРУП» ТОВ", "Perfect Group", "550 000", "0", "Рішення очікується"],
          [19, "«БУДКЕПІТАЛ ГРАНД» ТОВ", "bUd Capital", "550 000", "0", "Рішення очікується"]
        ],
        total: ["", "РАЗОМ", "", "10 450 000", "3 850 000", ""]
      },
      {
        title: "Надходження: проєктування",
        sub: "Повний перелік учасників · суми у гривнях",
        cols: ["№", "Учасник / платник", "Бренд", "План внеску", "Факт надходження", "Стан участі / оплати"],
        rows: [
          [1, "«АВАЛОН ІНКОМПАНІ» ТОВ", "AVALON", "300 000", "300 000", "Сплачено"],
          [2, "«Д-І-М» ТОВ", "DIM", "300 000", "300 000", "Сплачено"],
          [3, "«РОЯЛ ХАУЗ ГРУП» ТОВ", "Royal House", "300 000", "300 000", "Сплачено"],
          [4, "«ЮКРЕЙНІАН ДЕВЕЛОПМЕНТ ПАРТНЕРС» ТОВ", "UDP", "300 000", "300 000", "Сплачено"],
          [5, "«КРЕАТОР-БУД» ТОВ", "Креатор-Буд", "300 000", "300 000", "Сплачено"],
          [6, "«КОВАЛЬСЬКА НЕРУХОМІСТЬ» ТОВ", "Ковальська", "300 000", "300 000", "Сплачено"],
          [7, "«К.А.Н. ДЕВЕЛОПМЕНТ» ТОВ", "KAN Development", "300 000", "300 000", "Сплачено"],
          [8, "«ІНТЕРГАЛ-БУД» ТОВ", "Інтергал-Буд", "300 000", "300 000", "Сплачено"],
          [9, "«АЙБІ АЛЬЯНС» ТОВ", "IB Alliance", "300 000", "300 000", "Сплачено"],
          [10, "«РІЕЛ ДЕВЕЛОПМЕНТ ГРУП» ТОВ", "РІЕЛ", "300 000", "300 000", "Сплачено"],
          [11, "«БОСФОРУС ДЕВЕЛОПМЕНТ» ТОВ", "Bosphorus Development", "300 000", "300 000", "Сплачено"],
          [12, "«НЕРУХОМІСТЬ СТОЛИЦІ» ПАТ", "HECT", "300 000", "0", "Оплату не зазначено"],
          [13, "«САГА ДЕВЕЛОПМЕНТ» ТОВ", "SAGA Development", "300 000", "0", "Оплату не зазначено"],
          [14, "«СТАНДАРТ ІНЖИНІРІНГ ГРУП» ТОВ", "ENSO", "300 000", "0", "Оплату не зазначено"],
          [15, "«СТОЛИЦЯ ГРУП» ТОВ", "Stolitsa Group", "300 000", "0", "Оплату не зазначено"],
          [16, "«СІРІУС ІНВЕСТ ГРУП» ТОВ", "GEOS", "300 000", "0", "Оплату не зазначено"],
          [17, "«УКБ ПЕРФЕКТ ГРУП» ТОВ", "Perfect Group", "300 000", "0", "Оплату не зазначено"],
          [18, "«БУДКЕПІТАЛ ГРАНД» ТОВ", "bUd Capital", "300 000", "0", "Оплату не зазначено"],
          [19, "«ФУТУРА-ХАТА» ТОВ", "FuturaHata", "300 000", "0", "Оплату не зазначено"]
        ],
        total: ["", "РАЗОМ", "", "5 700 000", "3 300 000", ""]
      },
      {
        title: "Видатки: будівельні роботи",
        sub: "Кошторис і фактичне фінансування · суми у гривнях",
        unit: "позицій кошторису",
        cols: ["№", "Найменування робіт", "Виконавець", "План видатки", "Факт видатки"],
        rows: [
          [1, "Благоустрій", "«Дерхоф» ТОВ", "950 000,00", "—"],
          [2, "Озеленення", "«ГринКиїв» ТОВ", "780 000,00", "—"],
          [3, "Освітлення та озвучка", "Не зазначено", "1 000 000,00", "—"],
          [4, "Мобілізація бурового комплексу для влаштування паль на об’єкт KLEMM806", "«ОСНОВА» ТОВ", "202 520,40", "—"],
          [5, "Влаштування мікропаль — 40 шт.", "«ОСНОВА» ТОВ", "1 400 000,00", "1 000 000,00"],
          [6, "Влаштування бетонних ростверків", "«ОСНОВА» ТОВ", "1 100 000,00", "—"],
          [7, "Виготовлення граніту з монтажем", "«Емстоун» ТОВ", "5 250 000,00", "1 500 000,00"],
          [8, "Фотографії Героїв (нержавійка, 107 портретів)", "Не зазначено", "200 000,00", "—"],
          [9, "Послуги інженера-консультанта / технагляду", "Васеньов О — ФОП", "100 000,00", "—"],
          [10, "Авторський нагляд", "Фалько — ФОП", "38 000,00", "—"]
        ],
        totals: [
          ["", "Разом без ПДВ", "", "9 183 767,00", "2 083 333,33"],
          ["", "ПДВ 20%", "", "1 836 753,40", "416 666,67"],
          ["", "ВСЬОГО З ПДВ", "", "11 020 520,40", "2 500 000,00"]
        ]
      },
      {
        title: "Видатки: проєктування",
        sub: "Проєктні роботи та приєднання до електромереж · суми у гривнях",
        unit: "позицій кошторису",
        cols: ["№", "Найменування робіт", "Виконавець / сторона", "План видатки", "Факт видатки"],
        rows: [
          ["1", "Збір та аналіз вихідних даних", "«ОСНОВА-СОЛСИФ» ТОВ", "26 700,00", "26 700,00"],
          ["2", "Інженерно-геодезичні вишукування", "«ОСНОВА-СОЛСИФ» ТОВ", "75 400,00", "75 400,00"],
          ["3", "Інженерно-геологічні вишукування", "«ОСНОВА-СОЛСИФ» ТОВ", "176 806,00", "176 806,00"],
          ["4.1", "Архітектурні рішення", "І.М. Волинець — ФОП", "828 000,00", "828 000,00"],
          ["4.2", "Конструктивні рішення", "І.М. Волинець — ФОП", "608 000,00", "143 094,00"],
          ["4.3", "Генеральний план та благоустрій", "І.М. Волинець — ФОП", "513 000,00", "0,00"],
          ["4.4", "Вертикальне планування", "І.М. Волинець — ФОП", "135 000,00", "0,00"],
          ["4.5", "Озеленення і полив території", "І.М. Волинець — ФОП", "270 000,00", "0,00"],
          ["4.6", "Координація між розділами", "І.М. Волинець — ФОП", "84 000,00", "0,00"],
          ["5", "Отримання ТУ та погоджень", "«ОСНОВА-СОЛСИФ» ТОВ", "35 600,00", "0,00"],
          ["6", "Управління проєктом", "«ОСНОВА-СОЛСИФ» ТОВ", "360 000,00", "0,00"],
          ["7", "Експертиза проєктної документації", "«ОСНОВА-СОЛСИФ» ТОВ", "41 250,00", "0,00"],
          ["8", "Виконання функцій замовника експертизи проєктної документації", "«ОСНОВА-СОЛСИФ» ТОВ", "8 900,00", "0,00"],
          ["9", "Інженерні мережі: електропостачання; водопостачання та каналізація; зливова каналізація; зовнішнє освітлення; відеонагляд, аудіо- та відеосупровід", "«ОСНОВА-СОЛСИФ» ТОВ", "980 000,00", "0,00"]
        ],
        totals: [
          ["", "Разом без ПДВ", "", "4 142 656,00", "1 250 000,00"],
          ["", "ПДВ 20%", "", "828 531,20", "250 000,00"],
          ["", "Всього з ПДВ за додатком №1", "", "4 971 187,20", "1 500 000,00"],
          ["10", "Нестандартне приєднання до електричних мереж «під ключ» (ДТЕК Київські Електромережі)", "«ДТЕК Київські Електромережі» ПрАТ", "219 300,00", "219 300,00"],
          ["", "РАЗОМ ПО РОЗДІЛУ", "", "5 190 487,20", "1 719 300,00"]
        ]
      }
    ]
  };

  function esc(v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function ensureFont() {
    if (document.getElementById("uad-memorial-font") || document.__uadMemorialFont) return;
    document.__uadMemorialFont = true;
    var link = document.createElement("link");
    link.id = "uad-memorial-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800;900&display=swap";
    (document.head || document.documentElement).appendChild(link);
  }

  function statusCls(s) { return /сплачено/i.test(s) ? "st-paid" : "st-wait"; }

  function galleryHtml(files, caption) {
    return '<div class="uad-memorial__gallery">' +
      files.map(function (f) { return '<img src="' + IMG_BASE + f + '" alt="" loading="lazy" />'; }).join("") +
      '</div><p class="uad-memorial__caption">' + esc(caption) + "</p>";
  }

  function detailTableHtml(t, idx) {
    var previewN = 6;
    var head = "<tr>" + t.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
    var isMoneyCol = function (ci) { return ci >= t.cols.length - (t.cols.length === 6 ? 3 : 2) && ci < t.cols.length - (t.cols.length === 6 ? 1 : 0); };
    var body = t.rows.map(function (r, ri) {
      var hidden = ri >= previewN ? " uad-memorial__hidden-row" : "";
      var tds = r.map(function (cell, ci) {
        var isStatusCol = ci === r.length - 1 && t.cols[t.cols.length - 1].indexOf("Стан") === 0;
        var isNum = (t.cols.length === 6 && (ci === 3 || ci === 4)) || (t.cols.length === 5 && (ci === 3 || ci === 4));
        if (isStatusCol) return '<td class="' + statusCls(String(cell)) + '">' + esc(cell) + "</td>";
        return "<td" + (isNum ? ' class="num"' : "") + ">" + esc(cell) + "</td>";
      }).join("");
      return '<tr class="row-' + idx + hidden + '">' + tds + "</tr>";
    }).join("");
    var totalsList = t.total ? [t.total] : (t.totals || []);
    var totals = totalsList.map(function (row) {
      var tds = row.map(function (cell, ci) {
        var isNum = (ci === 3 || ci === 4) && cell !== "";
        return "<td" + (isNum ? ' class="num"' : "") + ">" + esc(cell) + "</td>";
      }).join("");
      return '<tr class="total">' + tds + "</tr>";
    }).join("");
    var unit = t.unit || "учасників";
    var toggleBtn = t.rows.length > previewN
      ? '<button class="uad-memorial__toggle" type="button" data-toggle="' + idx + '" data-n="' + t.rows.length + '">Показати всі ' + t.rows.length + " " + unit + "</button>"
      : "";
    return '<div class="uad-memorial__block">' +
      "<h4>" + esc(t.title) + "</h4>" +
      '<p class="uad-memorial__sub">' + esc(t.sub) + "</p>" +
      '<div class="uad-memorial__tbl-wrap"><table class="uad-memorial__tbl"><thead>' + head + "</thead><tbody>" + body + totals + "</tbody></table></div>" +
      toggleBtn +
      "</div>";
  }

  function progressRowHtml(row) {
    var pct = Math.min(100, Math.round((row.fact / row.plan) * 100));
    return '<div class="uad-memorial__progress-row">' +
      "<b>" + esc(row.l) + "</b>" +
      '<div class="uad-memorial__progress-track"><div class="uad-memorial__progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="uad-memorial__progress-nums">' + (row.fact / 1000).toLocaleString("uk-UA") + " / " + (row.plan / 1000).toLocaleString("uk-UA") + " млн" +
      '<em class="' + row.deltaCls + '">' + esc(row.deltaLabel) + "</em></div>" +
      "</div>";
  }

  function render(root) {
    function q(sel) { return root.querySelector(sel); }

    q("[data-lede]").textContent = DATA.lede;
    q("[data-renders]").innerHTML = galleryHtml(DATA.renders, DATA.rendersCaption);

    q("[data-support-text]").textContent = DATA.support.text;
    q("[data-support-total]").textContent = DATA.support.total;
    q("[data-support-total-label]").textContent = DATA.support.totalLabel;
    q("[data-support-lines]").innerHTML = DATA.support.lines.map(function (l) {
      return "<li><span>" + esc(l.l) + "</span><b>" + esc(l.v) + "</b></li>";
    }).join("");

    q("[data-progress-text]").textContent = DATA.progressPhotos.text;
    q("[data-progress-photos]").innerHTML = galleryHtml(DATA.progressPhotos.photos, DATA.progressPhotos.caption);

    q("[data-donors-text]").textContent = DATA.donors.text;
    var pl = DATA.donors.plaque;
    q("[data-plaque]").innerHTML =
      '<div class="l1">' + esc(pl.l1) + "</div>" +
      '<div class="l2">' + esc(pl.l2) + "</div>" +
      '<div class="l3">' + pl.l3.map(esc).join("<br>") + "</div>" +
      '<div class="l4">' + esc(pl.l4) + "</div>" +
      '<div class="l5">' + esc(pl.l5) + "</div>";

    q("[data-ask-text]").textContent = DATA.ask.text;
    q("[data-ask-nums]").innerHTML = DATA.ask.nums.map(function (n) {
      return "<div><b>" + esc(n.v) + "</b><span>" + esc(n.l) + "</span></div>";
    }).join("");
    q("[data-ask-note]").textContent = DATA.ask.note;

    q("[data-report-sub]").textContent = DATA.report.sub;
    q("[data-report-tiles]").innerHTML = DATA.report.tiles.map(function (t) {
      return '<div class="uad-memorial__tile"><b>' + esc(t.v) + "</b><span>" + esc(t.l) + "</span></div>";
    }).join("");

    var s = DATA.report.summary;
    var sHead = "<tr>" + s.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
    var sBody = s.rows.map(function (r) {
      return "<tr>" + r.map(function (c, i) { return "<td" + (i > 0 ? ' class="num"' : "") + ">" + esc(c) + "</td>"; }).join("") + "</tr>";
    }).join("") + "<tr class=\"total\">" + s.total.map(function (c, i) { return "<td" + (i > 0 ? ' class="num"' : "") + ">" + esc(c) + "</td>"; }).join("") + "</tr>";
    q("[data-summary]").innerHTML = '<div class="uad-memorial__tbl-wrap"><table class="uad-memorial__tbl"><thead>' + sHead + "</thead><tbody>" + sBody + "</tbody></table></div>";

    q("[data-coverage]").innerHTML = DATA.report.coverage.map(progressRowHtml).join("");

    q("[data-tables]").innerHTML = DATA.tables.map(detailTableHtml).join("");

    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-toggle]");
      if (!btn) return;
      var idx = btn.getAttribute("data-toggle");
      root.querySelectorAll(".row-" + idx + ".uad-memorial__hidden-row").forEach(function (r) { r.classList.remove("uad-memorial__hidden-row"); });
      btn.remove();
    });
  }

  function mount(host) {
    if (host.__uadMemorial) return;
    host.__uadMemorial = true;
    ensureFont();
    var sr = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    sr.innerHTML = "<style>" + CSS + "</style><div class=\"uad-memorial\" data-uad-memorial>" +
      '<div class="uad-memorial__shell">' +
        '<p class="uad-memorial__eyebrow">Асоціація · меморіал</p>' +
        '<h2 class="uad-memorial__title">Меморіал Героїв Небесної Сотні</h2>' +
        '<p class="uad-memorial__lede" data-lede></p>' +
        '<div data-renders></div>' +

        '<div class="uad-memorial__section">' +
          '<h3>Підтримка проєкту через Асоціацію</h3>' +
          '<p data-support-text></p>' +
          '<div class="uad-memorial__budget">' +
            '<div class="uad-memorial__card"><div class="uad-memorial__big" data-support-total></div><p class="uad-memorial__sub" data-support-total-label></p><ul class="uad-memorial__lines" data-support-lines></ul></div>' +
            '<div class="uad-memorial__ask"><h3>Рішення для погодження у компанії</h3><p data-ask-text></p><div class="uad-memorial__ask-nums" data-ask-nums></div><p data-ask-note></p></div>' +
          "</div>" +
        "</div>" +

        '<div class="uad-memorial__section">' +
          '<h3>Роботи вже розпочато</h3>' +
          '<p data-progress-text></p>' +
          '<div data-progress-photos></div>' +
        "</div>" +

        '<div class="uad-memorial__section">' +
          '<h3>Відзначення компаній-меценатів</h3>' +
          '<p data-donors-text></p>' +
          '<div class="uad-memorial__plaque" data-plaque></div>' +
        "</div>" +

        '<div class="uad-memorial__section">' +
          '<div class="uad-memorial__report-head"><h3>Звіт про виконання бюджету цільового фонду</h3></div>' +
          '<p class="uad-memorial__sub" data-report-sub></p>' +
          '<div class="uad-memorial__tiles" data-report-tiles></div>' +
          '<div data-summary></div>' +
          '<div class="uad-memorial__block"><h4>Покриття бюджету за участі всіх компаній</h4><div data-coverage></div></div>' +
          '<div data-tables></div>' +
        "</div>" +
      "</div>" +
    "</div>";
    var root = sr.querySelector(".uad-memorial");
    var bg = (host.getAttribute("data-bg") || "").trim();
    if (bg) root.style.setProperty("--m-page-bg", bg);
    render(root);
  }
  function boot() {
    var list = document.querySelectorAll("[data-uad-memorial]");
    for (var i = 0; i < list.length; i++) mount(list[i]);
  }
  function armObserver() {
    if (typeof MutationObserver !== "function") return;
    var t = null;
    new MutationObserver(function () {
      if (t) return;
      t = setTimeout(function () { t = null; boot(); }, 200);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(); armObserver(); });
  } else {
    boot(); armObserver();
  }
})();
