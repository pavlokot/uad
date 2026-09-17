/*! Дорожня карта перспективного врегулювання щодо завдань Асоціації — віджет для Webflow.
    Дані тягнуться з Google-таблиці через Apps Script Web App (data-src).
    Вставка (елемент HTML Embed у Webflow):
      <div data-uad-roadmap data-src="https://script.google.com/macros/s/DEPLOY_ID/exec"></div>
      <script src="https://cdn.jsdelivr.net/gh/pavlokot/uad@main/uaofd-roadmap.js" defer></script>
    - data-src : URL Apps Script /exec (без нього показується вбудована копія).
    - data-ttl : необов'язково, хвилини кешу в браузері відвідувача (1440 = раз на добу).
                 Без атрибута — свіже щоразу при завантаженні сторінки.
    - data-key : необов'язково, секретний ключ (має збігатися з ACCESS_KEY у Code.gs).
    - data-bg  : необов'язково, колір фону під блоком. За замовчуванням #F9F7F5 (тло
                 табів на ua-developers.com.ua/cabinet) — задайте свій, якщо вставляєте
                 блок в секцію з іншим тлом.
    Немає власних зовнішніх відступів/картки-підложки — блок вписується у вже готову
    верстку сторінки (свій контейнер, свій padding задає сама секція Webflow).
    Стиль підігнано під ua-developers.com.ua/stats/*: Manrope (заголовки, цифри) +
    Arial (текст), фіолетовий #85529C, жовто-зелений акцент #D1CE05, наві #1B3155.
    Блок домонтовується автоматично, якщо MemberSpace/гейт показав його пізніше.
    Якщо таблиця недоступна: остання збережена копія -> вбудований fallback.
    Стилі ізольовані (Shadow DOM). */
(function () {
  "use strict";

  var CSS = ":host{display:block}\n.uad-roadmap, .uad-roadmap * { box-sizing: border-box; }\n.uad-roadmap {\n  --r-violet: #85529C;\n  --r-violet-deep: #6b3f7d;\n  --r-violet-soft: #EFE4F3;\n  --r-accent: #D1CE05;\n  --r-navy: #1B3155;\n  --r-ink: #242424;\n  --r-ink-soft: #4b4b4b;\n  --r-muted: #6e6e6e;\n  --r-line: rgba(0, 0, 0, 0.1);\n  --r-done: #3E9536;\n  --r-done-ink: #ffffff;\n  --r-active: #D3411C;\n  --r-active-ink: #ffffff;\n  --r-active-ring: rgba(211, 65, 28, 0.16);\n  --r-pending: #cfcfd4;\n  --r-pending-bg: #f1f1f3;\n  --r-panel: #ffffff;\n  --r-t1: #EFE4F3; --r-t2: #e3e7f0; --r-t3: #ddf3e6; --r-t4: #fde3d8; --r-t5: #fff3c4;\n  --r-card: #ffffff;\n  --r-page-bg: #F9F7F5;\n  color-scheme: light;\n  display: block; width: 100%; padding: 0;\n  position: relative;\n  background: var(--r-page-bg);\n  color: var(--r-ink);\n  font-family: 'Mark Simonson Proxima Nova', Arial, Helvetica, sans-serif;\n  -webkit-font-smoothing: antialiased;\n}\n.uad-roadmap__shell { padding: 32px 40px 40px; }\n.uad-roadmap__eyebrow { margin: 0 0 12px; font-family: 'Mark Simonson Proxima Nova', Arial, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--r-violet); }\n.uad-roadmap__title {\n  margin: 0 0 14px; font-family: 'Mark Simonson Proxima Nova', Arial, sans-serif; font-size: 34px; line-height: 1.12; font-weight: 900;\n  letter-spacing: -0.02em; max-width: 24ch; color: var(--r-muted);\n}\n.uad-roadmap__lede { margin: 0 0 24px; max-width: 68ch; font-size: 15px; line-height: 1.6; color: var(--r-ink-soft); font-weight: 500; }\n.uad-roadmap__updated { margin: -12px 0 22px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--r-muted); }\n\n.uad-roadmap__tiles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px; }\n.uad-roadmap__tile { padding: 16px 18px; border-radius: 12px; background: var(--r-panel); border: 1px solid var(--r-line); }\n.uad-roadmap__tile b { display: block; font-family: 'Mark Simonson Proxima Nova', Arial, sans-serif; font-size: 30px; font-weight: 900; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; color: var(--r-ink); }\n.uad-roadmap__tile span { display: block; margin-top: 4px; font-size: 11.5px; font-weight: 700; line-height: 1.35; color: var(--r-muted); }\n.uad-roadmap__tile--done b { color: var(--r-done); }\n.uad-roadmap__tile--final b { color: var(--r-active); }\n.uad-roadmap__tile--accent b { color: var(--r-violet); }\n\n.uad-roadmap__bar-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }\n.uad-roadmap__bar { flex: 1; height: 6px; border-radius: 999px; background: var(--r-pending-bg); overflow: hidden; }\n.uad-roadmap__bar > i { display: block; height: 100%; border-radius: 999px; background: var(--r-violet); }\n.uad-roadmap__bar-num { font-size: 12.5px; font-weight: 700; color: var(--r-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }\n\n.uad-roadmap__legend { display: flex; flex-wrap: wrap; gap: 20px 34px; padding: 16px 18px; margin-bottom: 20px; border-radius: 12px; background: var(--r-panel); border: 1px solid var(--r-line); }\n.uad-roadmap__legend h3 { margin: 0 0 9px; font-family: 'Mark Simonson Proxima Nova', Arial, sans-serif; font-size: 10.5px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--r-muted); }\n.uad-roadmap__legend ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 5px; }\n.uad-roadmap__legend ol li { font-size: 12px; font-weight: 500; color: var(--r-ink-soft); display: flex; gap: 8px; }\n.uad-roadmap__legend ol li em { color: var(--r-violet); font-style: normal; font-weight: 800; min-width: 14px; }\n.uad-roadmap__legend .uad-roadmap__states { display: grid; gap: 7px; }\n.uad-roadmap__legend .uad-roadmap__states span { display: flex; align-items: center; gap: 9px; font-size: 12px; font-weight: 500; color: var(--r-ink-soft); }\n.uad-roadmap__dot { width: 13px; height: 13px; border-radius: 50%; flex: 0 0 auto; }\n.uad-roadmap__dot--done { background: var(--r-done); }\n.uad-roadmap__dot--active { background: var(--r-active); box-shadow: 0 0 0 4px var(--r-active-ring); }\n.uad-roadmap__dot--pending { background: var(--r-pending-bg); box-shadow: inset 0 0 0 2px var(--r-pending); }\n\n.uad-roadmap__filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }\n.uad-roadmap__chip {\n  border: 1px solid var(--r-line); background: var(--r-panel); color: var(--r-ink-soft);\n  padding: 8px 14px; border-radius: 999px; font: inherit; font-size: 12.5px; font-weight: 700;\n  cursor: pointer; transition: background-color 0.18s, color 0.18s, border-color 0.18s;\n}\n.uad-roadmap__chip[aria-pressed=\"true\"] { background: var(--r-violet); color: #ffffff; border-color: var(--r-violet); }\n.uad-roadmap__chip:focus-visible { outline: 2px solid var(--r-navy); outline-offset: 2px; }\n.uad-roadmap__chip b { font-variant-numeric: tabular-nums; opacity: 0.75; margin-left: 4px; }\n\n.uad-roadmap__grp-head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 28px 0 8px; }\n.uad-roadmap__grp-head .uad-roadmap__gn {\n  display: inline-flex; align-items: center; justify-content: center; min-width: 22px; height: 22px; padding: 0 6px;\n  font-family: 'Mark Simonson Proxima Nova', Arial, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.02em;\n  color: var(--r-violet); background: var(--r-violet-soft); border-radius: 999px; font-variant-numeric: tabular-nums;\n}\n.uad-roadmap__grp-head h3 { margin: 0; font-family: 'Mark Simonson Proxima Nova', Arial, sans-serif; font-size: 16px; font-weight: 800; letter-spacing: -0.01em; color: var(--r-ink); }\n.uad-roadmap__grp-head .uad-roadmap__cnt { margin-left: auto; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--r-muted); white-space: nowrap; }\n.uad-roadmap__grp-note { margin: 0 0 12px; font-size: 13px; line-height: 1.55; color: var(--r-ink-soft); font-weight: 500; }\n.uad-roadmap__sub-head { margin: 18px 0 10px; font-size: 12px; font-weight: 800; letter-spacing: 0.03em; color: var(--r-muted); text-transform: uppercase; }\n\n.uad-roadmap__items { display: grid; gap: 10px; }\n.uad-roadmap__item {\n  display: grid; grid-template-columns: 1.05fr 1.25fr 260px; gap: 24px;\n  padding: 18px 20px; border-radius: 12px; background: var(--r-card); border: 1px solid var(--r-line);\n}\n.uad-roadmap__k { display: block; margin-bottom: 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--r-muted); }\n.uad-roadmap__item p { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--r-ink); font-weight: 500; }\n.uad-roadmap__col-solution p { color: var(--r-ink-soft); }\n.uad-roadmap__item ul { margin: 6px 0 0; padding-left: 18px; }\n.uad-roadmap__item ul li { font-size: 13px; line-height: 1.5; color: var(--r-ink-soft); margin-bottom: 4px; }\n.uad-roadmap__item--solo { grid-template-columns: 1fr 260px; }\n.uad-roadmap__item--solo .uad-roadmap__col-solution p { color: var(--r-ink); font-weight: 600; }\n\n.uad-roadmap__pipe { list-style: none; display: flex; padding: 0; margin: 2px 0 10px; }\n.uad-roadmap__nd { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; min-height: 26px; }\n.uad-roadmap__nd::before { content: \"\"; position: absolute; right: 50%; left: -50%; top: 50%; height: 2px; transform: translateY(-50%); background: var(--r-pending); z-index: 0; }\n.uad-roadmap__nd:first-child::before { display: none; }\n.uad-roadmap__nd.is-lnk::before { background: var(--r-done); }\n.uad-roadmap__nd > b {\n  position: relative; z-index: 1; width: 24px; height: 24px; border-radius: 50%;\n  display: grid; place-items: center; font-size: 10.5px; font-weight: 800;\n  background: var(--r-pending-bg); color: var(--r-muted); box-shadow: inset 0 0 0 2px var(--r-pending); font-variant-numeric: tabular-nums;\n}\n.uad-roadmap__nd.is-done > b { background: var(--r-done); color: var(--r-done-ink); box-shadow: none; }\n.uad-roadmap__nd.is-active > b { background: var(--r-active); color: var(--r-active-ink); box-shadow: 0 0 0 4px var(--r-active-ring); }\n.uad-roadmap__cap { font-size: 11px; line-height: 1.4; font-weight: 600; color: var(--r-muted); }\n.uad-roadmap__cap b { color: var(--r-ink-soft); font-weight: 800; }\n\n.uad-roadmap__hidden { display: none !important; }\n@media (prefers-reduced-motion: no-preference) {\n  .uad-roadmap__nd.is-active > b { animation: uad-roadmap-pulse 2.4s ease-in-out infinite; }\n  @keyframes uad-roadmap-pulse { 0%, 100% { box-shadow: 0 0 0 4px var(--r-active-ring); } 50% { box-shadow: 0 0 0 8px transparent; } }\n}\n@media screen and (max-width: 980px) {\n  .uad-roadmap__shell { padding: 28px 24px 36px; }\n  .uad-roadmap__title { font-size: 27px; }\n  .uad-roadmap__tiles { grid-template-columns: repeat(2, 1fr); }\n  .uad-roadmap__item, .uad-roadmap__item--solo { grid-template-columns: 1fr; gap: 14px; }\n  .uad-roadmap__pipe { max-width: 320px; }\n}\n@media screen and (max-width: 560px) {\n  .uad-roadmap__shell { padding: 24px 16px 32px; }\n  .uad-roadmap__title { font-size: 22px; }\n  .uad-roadmap__tiles { grid-template-columns: 1fr 1fr; }\n}";

  var INNER = "<div class=\"uad-roadmap__shell\">\n    <p class=\"uad-roadmap__eyebrow\">Асоціація · перспективне врегулювання · поточний статус</p>\n    <h2 class=\"uad-roadmap__title\">Дорожня карта перспективного врегулювання щодо завдань Асоціації</h2>\n    <p class=\"uad-roadmap__lede\">\n      Напрями законодавчих та підзаконних змін за десятьма темами. Кожен напрям проходить шість етапів —\n      від звернення до профільного органу до ухвалення рішення Верховною Радою, Кабінетом Міністрів\n      або органом місцевого самоврядування.\n    </p>\n    <p class=\"uad-roadmap__updated\" data-updated></p>\n\n    <div class=\"uad-roadmap__tiles\" data-tiles></div>\n\n    <div class=\"uad-roadmap__bar-wrap\">\n      <div class=\"uad-roadmap__bar\"><i data-bar></i></div>\n      <div class=\"uad-roadmap__bar-num\" data-barnum></div>\n    </div>\n\n    <div class=\"uad-roadmap__legend\">\n      <div>\n        <h3>Шість етапів</h3>\n        <ol data-legend></ol>\n      </div>\n      <div>\n        <h3>Позначки</h3>\n        <div class=\"uad-roadmap__states\">\n          <span><i class=\"uad-roadmap__dot uad-roadmap__dot--done\"></i> Етап опрацьовано</span>\n          <span><i class=\"uad-roadmap__dot uad-roadmap__dot--active\"></i> Етап у роботі</span>\n          <span><i class=\"uad-roadmap__dot uad-roadmap__dot--pending\"></i> Етап попереду</span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"uad-roadmap__filters\" data-filters></div>\n    <div data-board></div>\n  </div>";

  // Резервні (нейтрально оформлені) назви етапів. Якщо таблиця віддає свої — беруться вони.
  var STAGES_DEFAULT = [
    "Звернення / обговорення з профільним органом",
    "Підготовка проєкта змін до НПА (концепція)",
    "Погодження проєкта змін до НПА",
    "Процедура розгляду змін відповідно до регламенту",
    "Погоджений проєкт змін",
    "Прийняття рішення уповноваженим органом — ВР, КМУ, ОМС"
  ];
  var TONES = ["var(--r-t1)", "var(--r-t2)", "var(--r-t3)", "var(--r-t4)", "var(--r-t5)"];

  // Вбудована копія (fallback). Згенерована з аркуша станом на останнє оновлення.
  var SECTIONS_DEFAULT = [
    {
      "t": "Стабільність дозвільної документації",
      "items": [
        {
          "p": "Дозвільні документи можуть бути оскаржені та скасовані незалежно від того, скільки часу минуло з дня їх видачі та на якій стадії перебуває проєкт. Це створює правову невизначеність та, серед іншого, ускладнює залучення фінансування",
          "st": "gggo..",
          "r": "Встановлення чіткого моменту початку відліку шестимісячного строку на оскарження без права на його поновлення"
        }
      ]
    },
    {
      "t": "Пайова участь",
      "items": [
        {
          "p": "Продовження практики стягнення пайової участі в судовому порядку після її законодавчого скасування",
          "st": "gggggo",
          "r": "Законодавче врегулювання питання з метою остаточного припинення стягнення пайової участі за об’єктами, введеними в експлуатацію після її скасування"
        }
      ]
    },
    {
      "t": "Містобудівна документація та планування територій",
      "items": [
        {
          "p": "Завершення строку, упродовж якого законодавцем було дозволено визначення функціонального призначення територій ДПТ",
          "st": "gggggg",
          "r": "Пролонгація відповідного строку"
        },
        {
          "p": "Порядок № 926 містить норми, які обмежують можливості зміни функціонального призначення ДПТ (виключно у межах підгрупи), а в інших випадках - взагалі забороняють таку зміну (дозволяючи лише уточнення меж)",
          "st": "gggggg",
          "r": "Виключити з Порядку норми, які прямо суперечать положенням нормативно-правового акту вищої юридичної сили, тобто Закону"
        },
        {
          "p": "Наявність регуляторної прогалини щодо визначення складу та змісту містобудівної документації на місцевому рівні у період з 2025 по 2028 роки",
          "st": "gggggg",
          "r": "Внести зміни до Порядку розроблення, оновлення, внесення змін та затвердження містобудівної документації, якими передбачити вимоги до складу та змісту містобудівної документації на місцевому рівні у період з 2025 по 2028 роки"
        },
        {
          "p": "Недостатність джерел фінансування розроблення та оновлення містобудівної документації",
          "st": "gggggo",
          "r": "Розширення джерел фінансування містобудівної документації, зокрема можливість її фінансування за рахунок приватних коштів"
        },
        {
          "p": "Скасування ДПТ через значний час після їх затвердження",
          "st": "go....",
          "r": "Встановлення чіткого моменту початку відліку шестимісячного строку на оскарження без права на його поновлення"
        },
        {
          "p": "Неоднозначне застосування норми закону щодо можливості зміни функціонального призначення територій ДПТ",
          "st": "go....",
          "r": "Уточнення положень відповідної норми, що унеможливить двозначне трактування"
        },
        {
          "p": "Неможливість зміни функціонального призначення промислових територій у разі бездіяльності ОМС щодо розроблення або актуалізації містобудівної документації",
          "st": "go....",
          "r": "Запровадження окремого механізму трансформації промислових територій під житлову та змішану забудову (житлові парки)"
        },
        {
          "p": "Неузгодженість містобудівної документації, затвердженої у різний час",
          "st": ".o....",
          "r": "Встановлення пріоритету положень містобудівної документації, затвердженої пізніше, та обов’язку привести Генеральний план у відповідність до неї у визначений строк"
        },
        {
          "p": "Невідповідність встановлених масштабів графічних матеріалів ДПТ потребам планування значних за площею територій",
          "st": ".o....",
          "r": "Передбачити можливість розроблення графічних матеріалів ДПТ у масштабі М 1:2000 для значних за площею територій (зокрема від 20 га)"
        },
        {
          "p": "Відсутність представництва профільних бізнес-асоціацій у складі архітектурно-містобудівних рад",
          "st": ".o....",
          "r": "Обов’язкове включення представників профільних бізнес-асоціацій до складу архітектурно-містобудівних рад"
        }
      ]
    },
    {
      "t": "Захист законної господарської діяльності",
      "items": [
        {
          "p": "Використання кримінальних проваджень та заходів забезпечення кримінального провадження для блокування законної діяльності девелоперів",
          "st": "ggo...",
          "r": "Внесення змін до ККУ та КПК України для посилення захисту законної господарської діяльності та обмеження можливостей її необґрунтованого блокування в межах кримінальних проваджень"
        },
        {
          "p": "Використання громадських об’єднань та судових механізмів для необґрунтованого блокування законної господарської діяльності",
          "st": "oo....",
          "rLead": "Удосконалення механізмів протидії зловживанням, зокрема:",
          "rList": [
            "розширення законодавчого визначення протидії законній господарській діяльності",
            "запровадження механізму виявлення громадських об’єднань, які фактично не здійснюють статутної діяльності",
            "обмеження кола осіб, які мають право на звернення до суду в окремих категоріях спорів"
          ]
        }
      ]
    },
    {
      "t": "Культурна спадщина",
      "items": [
        {
          "solo": true,
          "sh": "",
          "st": "gggggg",
          "r": "щодо зон охорони"
        },
        {
          "solo": true,
          "sh": "",
          "st": "gggggo",
          "r": "щодо пам'ятки та її території"
        },
        {
          "solo": true,
          "sh": "",
          "st": "go....",
          "r": "щодо історичних ареалів"
        },
        {
          "solo": true,
          "sh": "",
          "st": "go....",
          "r": "щодо буферних зон"
        },
        {
          "solo": true,
          "sh": "",
          "st": "go....",
          "r": "щод території історико-культурного заповідника, історико-культурної заповідної території"
        },
        {
          "solo": true,
          "sh": "",
          "st": "go....",
          "r": "щодо археологічних досліджень"
        },
        {
          "p": "Істотне обмеження раніше набутих прав власників унаслідок встановлення охоронного статусу об’єкта без механізму компенсації",
          "st": "oo....",
          "r": "Запровадження механізму викупу державою або територіальною громадою об’єктів, охоронний статус яких унеможливлює або істотно обмежує їх використання відповідно до раніше набутих прав"
        }
      ],
      "note": "Відсутність підзаконного регулювання, необхідного для повноцінного застосування змін до законодавства у сфері охорони культурної спадщини, прийнятих ще у 2021 році"
    },
    {
      "t": "Підтримка платоспроможного попиту та фінансування житла",
      "subs": [
        {
          "t": "6.1. «єОселя»",
          "items": [
            {
              "p": "Неможливість поєднання «єОселі» з окремими державними житловими програмами",
              "st": "ggo...",
              "r": "Надання можливості використовувати державну грошову компенсацію для оплати частини вартості житла, а решту вартості фінансувати за рахунок кредиту «єОселя»."
            },
            {
              "p": "Обмежені параметри площі та вартості житла, доступного за програмою «єОселя»",
              "st": "oo....",
              "r": "Перегляд граничної площі та максимальної вартості житла з урахуванням актуальних параметрів ринку"
            }
          ]
        },
        {
          "t": "6.2. Акредитація об’єктів у процесі будівництва",
          "items": [
            {
              "p": "Відсутність єдиного механізму акредитації об’єктів у процесі будівництва",
              "st": "gggggo",
              "r": "Запровадження принципу «єдиного вікна» для акредитації об’єктів у процесі будівництва з можливістю централізованого подання та опрацювання необхідної інформації"
            }
          ]
        },
        {
          "t": "6.3. Фінансування будівництва житла",
          "items": [
            {
              "p": "Відсутність доступного кредитного фінансування для реалізації житлових проєктів",
              "st": "go....",
              "r": "Включення житлового будівництва до напрямів державної програми «Доступні кредити 5–7–9 %»"
            },
            {
              "p": "Неможливість застосування механізму державної підтримки інвестиційних проєктів зі значними інвестиціями у житловому будівництві",
              "st": "go....",
              "r": "Включення житлового будівництва до сфер, у яких можуть реалізовуватися інвестиційні проєкти зі значними інвестиціями"
            }
          ]
        },
        {
          "t": "6.4. Проєктне фінансування",
          "items": [
            {
              "p": "Відсутність в Україні цілісного механізму проєктного фінансування будівництва житла",
              "st": "go....",
              "r": "Напрацювання комплексного механізму проєктного фінансування у будівництві, зокрема із запровадженням ескроу-рахунків, механізмів захисту кредиторів та інвесторів, step-in rights і спеціальних механізмів заміни проблемного девелопера"
            }
          ]
        },
        {
          "t": "6.5. Апартаменти",
          "items": [
            {
              "p": "Неможливість реєстрації місця проживання в апартаментах, які юридично мають статус нежитлових приміщень",
              "st": ".o....",
              "r": "Запровадження можливості реєстрації місця проживання в апартаментах"
            },
            {
              "p": "Застосування комерційних тарифів на комунальні послуги до апартаментів, які фактично використовуються для проживання",
              "st": ".o....",
              "r": "Запровадження можливості застосування побутових тарифів до апартаментів, які фактично використовуються фізичними особами для проживання"
            }
          ]
        }
      ]
    },
    {
      "t": "Земельні та кадастрові питання",
      "items": [
        {
          "p": "Невнесення до ДЗК інформації про функціональне призначення територій, що унеможливлює реалізацію передбачених законом процедур, зокрема спрощеної зміни цільового призначення",
          "st": "go....",
          "r": "Налагодження механізму внесення до ДЗК відомостей про функціональне призначення територій"
        },
        {
          "p": "Колізія між передбаченим ДПТ функціональним призначенням і чинними обмеженнями у використанні земель",
          "st": ".o....",
          "r": "Врегулювання механізму зміни цільового призначення земельної ділянки у випадках, коли передбачене ДПТ функціональне призначення території не відповідає встановленим обмеженням у використанні земель, зокрема СЗЗ"
        },
        {
          "p": "Невизначеність щодо чинності МУО та дозволу на виконання будівельних робіт після поділу земельної ділянки та зміни її кадастрового номера",
          "st": ".o....",
          "r": "Встановлення механізму збереження чинності та можливості подальшого використання МУО і дозволу на виконання будівельних робіт у разі поділу земельної ділянки під час реалізації об’єкта будівництва чергами"
        }
      ]
    },
    {
      "t": "Цифрові сервіси",
      "items": [
        {
          "p": "Неможливість реєстрації спеціального майнового права на майбутні об’єкти нерухомості (МОН) при реконструкції",
          "st": "go....",
          "r": "Забезпечення технічної та нормативної можливості реєстрації спеціального майнового права на МОН, що створюються в результаті реконструкції"
        },
        {
          "p": "Відсутність належного механізму внесення до ЄДЕССБ раніше виданої дозвільної документації",
          "st": "go....",
          "r": "Налагодження внесення до ЄДЕССБ дозвільної документації, виданої до запровадження відповідних електронних процедур"
        }
      ]
    },
    {
      "t": "Інвестиційні механізми",
      "items": [
        {
          "p": "Регуляторні обмеження щодо укладення інвестиційних договорів та договорів про спільну діяльність із державними підприємствами та установами",
          "st": "oo....",
          "r": "Усунення регуляторних бар’єрів, які ускладнюють залучення приватних інвестицій до реалізації проєктів із державними підприємствами та установами"
        }
      ]
    },
    {
      "t": "Адміністративні бар’єри на місцевому рівні",
      "items": [
        {
          "p": "Потенційне ускладнення роботи зі 100-річними будинками, зокрема через необхідність отримання додаткових документів, наприклад рішення Консультативної ради (проєкт рішення КМР)",
          "st": "gggggg",
          "r": "Направлення проекту рішення ініціатору на доопрацювання"
        },
        {
          "p": "Бездіяльність органів та посадових осіб при здійсненні процедур, необхідних для реалізації девелоперських проєктів",
          "st": ".o....",
          "r": "Запровадження відповідальності за бездіяльність та невиконання передбачених законодавством обов’язків"
        },
        {
          "p": "Складність та непрозорість процедур отримання технічних умов від міських служб та операторів інфраструктури",
          "st": "oo....",
          "r": "Удосконалення та стандартизація процедур отримання технічних умов, зменшення можливостей для необґрунтованих вимог та затягування їх видачі"
        },
        {
          "p": "Залежність процедури присвоєння адрес від окремих адміністративних рішень та дій ОМС",
          "st": ".o....",
          "r": "Автоматизація процедури присвоєння адрес та мінімізація необхідності прийняття окремих рішень органами місцевого самоврядування"
        }
      ]
    },
    {
      "t": "Бронювання військовозобов'язаних співробіників генпідрядників, підрядників",
      "items": [
        {
          "p": "Необхідність отримання статусу критичності для здійснення бронювання військовозобов'язаних співробітників",
          "st": "gggggg",
          "r": "Комунікація із Агентством відновлення, надання консультацій членам Асоціації з питань щодо порядку отримання статусу, зокрема необхідних документів"
        }
      ]
    }
  ];

  /* ---------- helpers ---------- */
  function esc(v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function capFirst(s) { s = String(s || ""); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function plural(n) { return n === 1 ? " напрям" : (n % 10 >= 2 && n % 10 <= 4 && (n < 10 || n > 20)) ? " напрями" : " напрямів"; }
  function normSt(s) { s = String(s || "").replace(/[^go.]/g, "."); s = s.slice(0, 6); while (s.length < 6) s += "."; return s; }
  function greens(st) { return (st.match(/g/g) || []).length; }
  function furthest(st) { for (var i = 5; i >= 0; i--) if (st[i] !== ".") return i; return -1; }
  function bucket(st) {
    if (st[5] === "g") return "done";
    var f = furthest(st);
    if (f === 5) return "final";
    if (f >= 2) return "review";
    return "concept";
  }
  function pickStages(data) {
    var s = data && data.stages;
    return (s && s.length === 6 && s.filter(Boolean).length === 6) ? s.map(capFirst) : STAGES_DEFAULT;
  }
  function caption(st, STG) {
    if (st === "gggggg") return { lead: "", txt: "Рішення ухвалено" };
    var a = st.indexOf("o");
    if (a >= 0) return { lead: "Поточний етап: ", txt: STG[a] };
    var g = st.lastIndexOf("g");
    if (g < 0) return { lead: "", txt: "Не розпочато" };
    return { lead: "Опрацьовано до етапу: ", txt: STG[g] };
  }
  function normSections(list) {
    (list || []).forEach(function (s) {
      var groups = s.subs ? s.subs : [{ items: s.items }];
      groups.forEach(function (g) { (g.items || []).forEach(function (it) { it.st = normSt(it.st); }); });
    });
    return list;
  }
  function allItems(list) {
    var out = [];
    list.forEach(function (s) {
      (s.items || []).forEach(function (it) { out.push(it); });
      (s.subs || []).forEach(function (sub) { (sub.items || []).forEach(function (it) { out.push(it); }); });
    });
    return out;
  }
  function sectionCount(s) {
    if (s.items && !s.subs) return s.items.length;
    return (s.subs || []).reduce(function (a, x) { return a + (x.items || []).length; }, 0);
  }
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ""));
    return m ? (m[3] + "." + m[2] + "." + m[1]) : String(iso || "");
  }

  /* ---------- render (перевикликається на свіжих даних) ---------- */
  function render(root, data) {
    var SECTIONS = normSections((data && data.sections && data.sections.length) ? data.sections : SECTIONS_DEFAULT);
    var STAGES = pickStages(data);
    var updated = data && data.updated;
    function q(sel) { return root.querySelector(sel); }

    var ITEMS = allItems(SECTIONS);
    var TOTAL = ITEMS.length;
    var STEPS_DONE = ITEMS.reduce(function (a, it) { return a + greens(it.st); }, 0);
    var STEPS_TOTAL = TOTAL * 6;
    var B = { concept: 0, review: 0, final: 0, done: 0 };
    ITEMS.forEach(function (it) { B[bucket(it.st)]++; });

    q("[data-updated]").textContent = updated ? ("Оновлено " + fmtDate(updated)) : "";

    q("[data-tiles]").innerHTML = [
      { b: TOTAL, s: "Напрямів усього", cls: "uad-roadmap__tile--accent" },
      { b: B.concept, s: "На етапі концепції НПА", cls: "" },
      { b: B.review, s: "На погодженні / за регламентом", cls: "" },
      { b: B.final, s: "Фінальна стадія — рішення органу", cls: "uad-roadmap__tile--final" },
      { b: B.done, s: "Рішення ухвалено", cls: "uad-roadmap__tile--done" }
    ].map(function (t) { return '<div class="uad-roadmap__tile ' + t.cls + '"><b>' + t.b + '</b><span>' + t.s + '</span></div>'; }).join("");

    var pct = STEPS_TOTAL ? Math.round((STEPS_DONE / STEPS_TOTAL) * 100) : 0;
    q("[data-bar]").style.width = pct + "%";
    q("[data-barnum]").textContent = "Опрацьовано кроків: " + STEPS_DONE + " / " + STEPS_TOTAL + " · " + pct + "%";
    q("[data-legend]").innerHTML = STAGES.map(function (s, i) { return '<li><em>' + (i + 1) + '</em><span>' + esc(s) + '</span></li>'; }).join("");

    function pipeHtml(st) {
      var nodes = "";
      for (var i = 0; i < 6; i++) {
        var ch = st[i];
        var cls = "uad-roadmap__nd" + (ch === "g" ? " is-done" : ch === "o" ? " is-active" : "");
        if (i > 0 && st[i - 1] === "g") cls += " is-lnk";
        var word = ch === "g" ? "опрацьовано" : ch === "o" ? "у роботі" : "попереду";
        nodes += '<li class="' + cls + '" aria-label="' + esc(STAGES[i]) + " — " + word + '" title="' + esc((i + 1) + ". " + STAGES[i]) + '"><b>' + (i + 1) + '</b></li>';
      }
      var c = caption(st, STAGES);
      return '<ol class="uad-roadmap__pipe" role="list" aria-label="Етапи погодження">' + nodes + '</ol><p class="uad-roadmap__cap">' + esc(c.lead) + '<b>' + esc(c.txt) + '</b></p>';
    }
    function itemHtml(it) {
      var solHtml = it.rList
        ? '<p>' + esc(it.rLead) + '</p><ul>' + it.rList.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'
        : '<p>' + esc(it.r) + '</p>';
      var cols = it.solo
        ? '<div class="uad-roadmap__col-solution"><span class="uad-roadmap__k">Потрібен акт</span>' + solHtml + '</div>'
        : '<div class="uad-roadmap__col-problem"><span class="uad-roadmap__k">Проблема</span><p>' + esc(it.p) + '</p></div>' +
          '<div class="uad-roadmap__col-solution"><span class="uad-roadmap__k">Рішення</span>' + solHtml + '</div>';
      return '<article class="uad-roadmap__item' + (it.solo ? ' uad-roadmap__item--solo' : '') + '" data-bucket="' + bucket(it.st) + '">' +
               cols + '<div class="uad-roadmap__col-pipe">' + pipeHtml(it.st) + '</div></article>';
    }

    q("[data-board]").innerHTML = SECTIONS.map(function (s, idx) {
      var tone = TONES[idx % TONES.length];
      var cnt = sectionCount(s);
      var head = '<div class="uad-roadmap__grp-head" style="--r-tone:' + tone + '">' +
                   '<span class="uad-roadmap__gn">' + (idx + 1) + '</span><h3>' + esc(s.t) + '</h3>' +
                   '<span class="uad-roadmap__cnt">' + cnt + plural(cnt) + '</span></div>';
      var note = s.note ? '<p class="uad-roadmap__grp-note">' + esc(s.note) + '</p>' : "";
      var body = s.subs
        ? s.subs.map(function (sub) {
            return '<h4 class="uad-roadmap__sub-head">' + esc(sub.t) + '</h4><div class="uad-roadmap__items">' + (sub.items || []).map(itemHtml).join("") + '</div>';
          }).join("")
        : '<div class="uad-roadmap__items">' + (s.items || []).map(itemHtml).join("") + '</div>';
      return '<section class="uad-roadmap__grp" data-grp="' + (idx + 1) + '">' + head + note + body + '</section>';
    }).join("");

    var FILTERS = [
      { k: "all", label: "Усі", n: TOTAL },
      { k: "concept", label: "Концепція", n: B.concept },
      { k: "review", label: "Погодження", n: B.review },
      { k: "final", label: "Фінальна стадія", n: B.final },
      { k: "done", label: "Ухвалено", n: B.done }
    ];
    var filtersEl = q("[data-filters]");
    filtersEl.innerHTML = FILTERS.map(function (f) {
      return '<button class="uad-roadmap__chip" type="button" data-k="' + f.k + '" aria-pressed="' + (f.k === "all") + '">' + f.label + '<b>' + f.n + '</b></button>';
    }).join("");

    if (!root.__filterWired) {
      root.__filterWired = true;
      filtersEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".uad-roadmap__chip");
        if (!btn) return;
        var k = btn.getAttribute("data-k");
        filtersEl.querySelectorAll(".uad-roadmap__chip").forEach(function (c) { c.setAttribute("aria-pressed", c === btn); });
        root.querySelectorAll(".uad-roadmap__item").forEach(function (it) {
          it.classList.toggle("uad-roadmap__hidden", !(k === "all" || it.getAttribute("data-bucket") === k));
        });
        root.querySelectorAll(".uad-roadmap__grp").forEach(function (g) {
          var anyVisible = [].some.call(g.querySelectorAll(".uad-roadmap__item"), function (it) { return !it.classList.contains("uad-roadmap__hidden"); });
          g.classList.toggle("uad-roadmap__hidden", !anyVisible);
          g.querySelectorAll(".uad-roadmap__sub-head").forEach(function (sh) {
            var wrap = sh.nextElementSibling;
            var vis = wrap && [].some.call(wrap.querySelectorAll(".uad-roadmap__item"), function (it) { return !it.classList.contains("uad-roadmap__hidden"); });
            sh.classList.toggle("uad-roadmap__hidden", !vis);
            if (wrap) wrap.classList.toggle("uad-roadmap__hidden", !vis);
          });
        });
      });
    }
  }

  /* ---------- дані з Google-таблиці ---------- */
  function snapKey(src) { return "uadr:" + src; }
  function readSnap(src) {
    try { var s = JSON.parse(localStorage.getItem(snapKey(src))); return (s && Array.isArray(s.sections) && s.sections.length) ? s : null; }
    catch (e) { return null; }
  }
  function writeSnap(src, data) {
    try { localStorage.setItem(snapKey(src), JSON.stringify({ sections: data.sections, stages: data.stages, updated: data.updated, _ts: Date.now() })); }
    catch (e) {}
  }
  function valid(d) { return (d && Array.isArray(d.sections) && d.sections.length) ? d : null; }

  function fetchJson(src) {
    var url = src + (src.indexOf("?") < 0 ? "?" : "&") + "t=" + Date.now();
    if (typeof fetch !== "function") return jsonp(src);
    return fetch(url, { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { return valid(d) || jsonp(src); })
      .catch(function () { return jsonp(src); });
  }
  function jsonp(src) {
    return new Promise(function (resolve) {
      var cb = "__uadr_cb_" + Math.random().toString(36).slice(2);
      var el = document.createElement("script");
      var done = false;
      function fin(v) { if (done) return; done = true; try { delete window[cb]; } catch (e) { window[cb] = void 0; } if (el.parentNode) el.parentNode.removeChild(el); resolve(v); }
      var to = setTimeout(function () { fin(null); }, 12000);
      window[cb] = function (d) { clearTimeout(to); fin(valid(d)); };
      el.onerror = function () { clearTimeout(to); fin(null); };
      el.src = src + (src.indexOf("?") < 0 ? "?" : "&") + "callback=" + cb + "&t=" + Date.now();
      (document.head || document.documentElement).appendChild(el);
    });
  }

  /* ---------- монтування ---------- */
  /* Шрифт Proxima Nova не завантажуємо самі (платний) — сайт уже реєструє
     "Mark Simonson Proxima Nova" глобально, Shadow DOM це успадковує. */
  function mount(host) {
    if (host.__uadRoadmap) return;
    host.__uadRoadmap = true;
    var sr = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    sr.innerHTML = "<style>" + CSS + "</style><div class=\"uad-roadmap\" data-uad-roadmap>" + INNER + "</div>";
    var root = sr.querySelector(".uad-roadmap");

    var bg = (host.getAttribute("data-bg") || "").trim();
    if (bg) root.style.setProperty("--r-page-bg", bg);

    var base = (host.getAttribute("data-src") || "").trim();
    var key = (host.getAttribute("data-key") || "").trim();
    var src = base && key ? base + (base.indexOf("?") < 0 ? "?" : "&") + "key=" + encodeURIComponent(key) : base;
    var ttlMin = parseFloat(host.getAttribute("data-ttl") || "0") || 0;
    var snap = src ? readSnap(src) : null;

    render(root, snap || { sections: SECTIONS_DEFAULT });

    if (!src) return;
    if (ttlMin > 0 && snap && snap._ts && (Date.now() - snap._ts) < ttlMin * 60000) return;

    fetchJson(src).then(function (data) {
      if (!data) return;
      render(root, data);
      writeSnap(src, data);
    });
  }
  function boot() {
    var list = document.querySelectorAll("[data-uad-roadmap]");
    for (var i = 0; i < list.length; i++) mount(list[i]);
  }
  // MemberSpace та подібні гейти показують вміст сторінки динамічно після входу —
  // тож домонтовуємо блок, якщо він з'явився пізніше.
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

