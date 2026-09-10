/*! Дорожня карта перспективного врегулювання щодо завдань Асоціації.
    Вставний віджет для Webflow. У Embed додати рівно два рядки:
      <div data-uad-roadmap></div>
      <script src="https://ВАШ-ХОСТ/uaofd-roadmap.js" defer></script>
    Стилі повністю ізольовані (Shadow DOM) — сторінку не зачіпають. */
(function () {
  "use strict";
  var CSS = ":host{display:block}\n.uad-roadmap, .uad-roadmap * { box-sizing: border-box; }\n    .uad-roadmap {\n      --r-violet: #4f46e5;\n      --r-violet-deep: #3730a3;\n      --r-teal: #0f766e;\n      --r-ink: #111827;\n      --r-ink-soft: #334155;\n      --r-muted: #64748b;\n      --r-line: rgba(15, 23, 42, 0.10);\n      --r-shadow: 0 26px 70px rgba(15, 23, 42, 0.12);\n      --r-done: #15a34a;\n      --r-done-ink: #ffffff;\n      --r-active: #d97706;\n      --r-active-ink: #ffffff;\n      --r-active-ring: rgba(217, 119, 6, 0.18);\n      --r-pending: #cbd5e1;\n      --r-pending-bg: #eef2f7;\n      --r-panel: rgba(255, 255, 255, 0.86);\n      --r-t1: #ede9fe; --r-t2: #dbeafe; --r-t3: #dcfce7; --r-t4: #ffedd5; --r-t5: #fef9c3;\n      --r-card: linear-gradient(145deg, rgba(237, 233, 254, 0.40), rgba(255, 255, 255, 0.72));\n      color-scheme: light;\n      display: block; width: 100%; max-width: 1240px; margin: 0 auto; padding: 40px 20px;\n      position: relative; overflow: hidden; isolation: isolate;\n      color: var(--r-ink);\n      font-family: Inter, \"Work Sans\", \"Helvetica Neue\", Arial, sans-serif;\n      -webkit-font-smoothing: antialiased;\n    }\n    .uad-roadmap::before, .uad-roadmap::after {\n      content: \"\"; position: absolute; z-index: -1; width: 420px; height: 420px;\n      border-radius: 999px; filter: blur(20px); opacity: 0.6; pointer-events: none;\n    }\n    .uad-roadmap::before { top: -40px; left: -60px; background: radial-gradient(circle, rgba(79, 70, 229, 0.20), rgba(79, 70, 229, 0)); }\n    .uad-roadmap::after { right: -80px; top: 320px; background: radial-gradient(circle, rgba(14, 165, 233, 0.18), rgba(14, 165, 233, 0)); }\n\n    .uad-roadmap__shell {\n      background: linear-gradient(135deg, #ffffff, #f8fafc);\n      border: 1px solid rgba(255, 255, 255, 0.7); border-radius: 32px;\n      box-shadow: var(--r-shadow); padding: 40px 40px 44px;\n    }\n    .uad-roadmap__eyebrow { margin: 0 0 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--r-muted); }\n    .uad-roadmap__title {\n      margin: 0 0 14px; font-size: 36px; line-height: 1.12; font-weight: 900;\n      letter-spacing: -0.02em; max-width: 24ch;\n      background: linear-gradient(92deg, var(--r-ink) 0%, var(--r-violet) 52%, var(--r-teal) 100%);\n      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: var(--r-violet);\n    }\n    .uad-roadmap__lede { margin: 0 0 26px; max-width: 68ch; font-size: 15.5px; line-height: 1.55; color: var(--r-ink-soft); font-weight: 500; }\n\n    .uad-roadmap__tiles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 20px; }\n    .uad-roadmap__tile { padding: 15px 17px; border-radius: 18px; background: var(--r-panel); border: 1px solid var(--r-line); }\n    .uad-roadmap__tile b { display: block; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }\n    .uad-roadmap__tile span { display: block; margin-top: 3px; font-size: 11.5px; font-weight: 600; line-height: 1.35; color: var(--r-muted); }\n    .uad-roadmap__tile--done b { color: var(--r-done); }\n    .uad-roadmap__tile--final b { color: var(--r-active); }\n    .uad-roadmap__tile--accent b { color: var(--r-violet); }\n\n    .uad-roadmap__bar-wrap { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }\n    .uad-roadmap__bar { flex: 1; height: 8px; border-radius: 999px; background: var(--r-pending-bg); overflow: hidden; }\n    .uad-roadmap__bar > i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--r-violet), #06b6d4, var(--r-done)); }\n    .uad-roadmap__bar-num { font-size: 13px; font-weight: 700; color: var(--r-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }\n\n    .uad-roadmap__legend { display: flex; flex-wrap: wrap; gap: 20px 34px; padding: 16px 20px; margin-bottom: 20px; border-radius: 18px; background: var(--r-panel); border: 1px solid var(--r-line); }\n    .uad-roadmap__legend h3 { margin: 0 0 9px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--r-muted); }\n    .uad-roadmap__legend ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 5px; }\n    .uad-roadmap__legend ol li { font-size: 12px; font-weight: 600; color: var(--r-ink-soft); display: flex; gap: 8px; }\n    .uad-roadmap__legend ol li em { color: var(--r-violet); font-style: normal; font-weight: 800; min-width: 14px; }\n    .uad-roadmap__legend .uad-roadmap__states { display: grid; gap: 7px; }\n    .uad-roadmap__legend .uad-roadmap__states span { display: flex; align-items: center; gap: 9px; font-size: 12px; font-weight: 600; color: var(--r-ink-soft); }\n    .uad-roadmap__dot { width: 14px; height: 14px; border-radius: 50%; flex: 0 0 auto; }\n    .uad-roadmap__dot--done { background: var(--r-done); }\n    .uad-roadmap__dot--active { background: var(--r-active); box-shadow: 0 0 0 4px var(--r-active-ring); }\n    .uad-roadmap__dot--pending { background: var(--r-pending-bg); box-shadow: inset 0 0 0 2px var(--r-pending); }\n\n    .uad-roadmap__filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }\n    .uad-roadmap__chip {\n      border: 1px solid var(--r-line); background: var(--r-panel); color: var(--r-ink-soft);\n      padding: 8px 14px; border-radius: 999px; font: inherit; font-size: 13px; font-weight: 700;\n      cursor: pointer; transition: background-color 0.18s, color 0.18s, border-color 0.18s;\n    }\n    .uad-roadmap__chip[aria-pressed=\"true\"] { background: var(--r-violet); color: #fff; border-color: var(--r-violet); }\n    .uad-roadmap__chip:focus-visible { outline: 2px solid var(--r-violet); outline-offset: 2px; }\n    .uad-roadmap__chip b { font-variant-numeric: tabular-nums; opacity: 0.75; margin-left: 4px; }\n\n    .uad-roadmap__grp-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin: 30px 0 8px; padding: 12px 18px; border-radius: 14px; background: var(--r-tone, var(--r-t1)); }\n    .uad-roadmap__grp-head .uad-roadmap__gn { font-size: 16px; font-weight: 900; color: var(--r-violet-deep); font-variant-numeric: tabular-nums; }\n    .uad-roadmap__grp-head h3 { margin: 0; font-size: 17px; font-weight: 800; letter-spacing: -0.01em; color: var(--r-ink); }\n    .uad-roadmap__grp-head .uad-roadmap__cnt { margin-left: auto; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--r-muted); white-space: nowrap; }\n    .uad-roadmap__grp-note { margin: 0 4px 12px; font-size: 13px; line-height: 1.5; color: var(--r-ink-soft); font-weight: 500; }\n    .uad-roadmap__sub-head { margin: 18px 4px 10px; font-size: 12.5px; font-weight: 800; letter-spacing: 0.02em; color: var(--r-ink-soft); text-transform: uppercase; }\n\n    .uad-roadmap__items { display: grid; gap: 12px; }\n    .uad-roadmap__item {\n      display: grid; grid-template-columns: 1.05fr 1.25fr 264px; gap: 24px;\n      padding: 20px 22px; border-radius: 20px; background: var(--r-card); box-shadow: inset 0 0 0 1px var(--r-line);\n    }\n    .uad-roadmap__k { display: block; margin-bottom: 6px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--r-muted); }\n    .uad-roadmap__item p { margin: 0; font-size: 14px; line-height: 1.5; color: var(--r-ink); font-weight: 500; }\n    .uad-roadmap__col-solution p { color: var(--r-ink-soft); }\n    .uad-roadmap__item ul { margin: 6px 0 0; padding-left: 18px; }\n    .uad-roadmap__item ul li { font-size: 13.5px; line-height: 1.45; color: var(--r-ink-soft); margin-bottom: 4px; }\n    .uad-roadmap__item--solo { grid-template-columns: 1fr 264px; }\n    .uad-roadmap__item--solo .uad-roadmap__col-solution p { color: var(--r-ink); font-weight: 600; }\n\n    .uad-roadmap__pipe { list-style: none; display: flex; padding: 0; margin: 2px 0 10px; }\n    .uad-roadmap__nd { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; min-height: 28px; }\n    .uad-roadmap__nd::before { content: \"\"; position: absolute; right: 50%; left: -50%; top: 50%; height: 3px; transform: translateY(-50%); background: var(--r-pending); z-index: 0; }\n    .uad-roadmap__nd:first-child::before { display: none; }\n    .uad-roadmap__nd.is-lnk::before { background: var(--r-done); }\n    .uad-roadmap__nd > b {\n      position: relative; z-index: 1; width: 26px; height: 26px; border-radius: 50%;\n      display: grid; place-items: center; font-size: 11px; font-weight: 800;\n      background: var(--r-pending-bg); color: var(--r-muted); box-shadow: inset 0 0 0 2px var(--r-pending); font-variant-numeric: tabular-nums;\n    }\n    .uad-roadmap__nd.is-done > b { background: var(--r-done); color: var(--r-done-ink); box-shadow: none; }\n    .uad-roadmap__nd.is-active > b { background: var(--r-active); color: var(--r-active-ink); box-shadow: 0 0 0 4px var(--r-active-ring); }\n    .uad-roadmap__cap { font-size: 11.5px; line-height: 1.4; font-weight: 600; color: var(--r-muted); }\n    .uad-roadmap__cap b { color: var(--r-ink-soft); font-weight: 800; }\n\n    .uad-roadmap__hidden { display: none !important; }\n    .uad-roadmap__foot { margin-top: 26px; padding-top: 16px; border-top: 1px solid var(--r-line); font-size: 12px; line-height: 1.55; color: var(--r-muted); }\n\n    @media (prefers-reduced-motion: no-preference) {\n      .uad-roadmap__nd.is-active > b { animation: uad-roadmap-pulse 2.4s ease-in-out infinite; }\n      @keyframes uad-roadmap-pulse { 0%, 100% { box-shadow: 0 0 0 4px var(--r-active-ring); } 50% { box-shadow: 0 0 0 8px transparent; } }\n    }\n    @media screen and (max-width: 980px) {\n      .uad-roadmap__shell { padding: 26px 20px 30px; }\n      .uad-roadmap__title { font-size: 28px; }\n      .uad-roadmap__tiles { grid-template-columns: repeat(2, 1fr); }\n      .uad-roadmap__item, .uad-roadmap__item--solo { grid-template-columns: 1fr; gap: 14px; }\n      .uad-roadmap__pipe { max-width: 320px; }\n    }\n    @media screen and (max-width: 560px) {\n      .uad-roadmap { padding: 16px 10px; }\n      .uad-roadmap__shell { padding: 20px 15px 24px; border-radius: 24px; }\n      .uad-roadmap__title { font-size: 23px; }\n      .uad-roadmap__tiles { grid-template-columns: 1fr 1fr; }\n    }";
  var INNER = "<div class=\"uad-roadmap__shell\">\n    <p class=\"uad-roadmap__eyebrow\">Асоціація · перспективне врегулювання · поточний статус</p>\n    <h2 class=\"uad-roadmap__title\">Дорожня карта перспективного врегулювання щодо завдань Асоціації</h2>\n    <p class=\"uad-roadmap__lede\">\n      Напрями законодавчих та підзаконних змін за десятьма темами. Кожен напрям проходить шість етапів —\n      від звернення до профільного органу до ухвалення рішення Верховною Радою, Кабінетом Міністрів\n      або органом місцевого самоврядування.\n    </p>\n\n    <div class=\"uad-roadmap__tiles\" data-tiles></div>\n\n    <div class=\"uad-roadmap__bar-wrap\">\n      <div class=\"uad-roadmap__bar\"><i data-bar></i></div>\n      <div class=\"uad-roadmap__bar-num\" data-barnum></div>\n    </div>\n\n    <div class=\"uad-roadmap__legend\">\n      <div>\n        <h3>Шість етапів</h3>\n        <ol data-legend></ol>\n      </div>\n      <div>\n        <h3>Позначки</h3>\n        <div class=\"uad-roadmap__states\">\n          <span><i class=\"uad-roadmap__dot uad-roadmap__dot--done\"></i> Етап опрацьовано</span>\n          <span><i class=\"uad-roadmap__dot uad-roadmap__dot--active\"></i> Етап у роботі</span>\n          <span><i class=\"uad-roadmap__dot uad-roadmap__dot--pending\"></i> Етап попереду</span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"uad-roadmap__filters\" data-filters></div>\n    <div data-board></div>\n    <p class=\"uad-roadmap__foot\" data-foot></p>\n  </div>";

  function render(root) {
  
      var STAGES = [
        "Звернення / обговорення з профільним органом",
        "Підготовка проєкта змін до НПА (концепція)",
        "Погодження проєкта змін до НПА",
        "Процедура розгляду змін відповідно до регламенту",
        "Погоджений проєкт змін",
        "Прийняття рішення уповноваженим органом — ВР, КМУ, ОМС"
      ];
      var TONES = ["var(--r-t1)", "var(--r-t2)", "var(--r-t3)", "var(--r-t4)", "var(--r-t5)"];
  
      // st: 6 символів — g = опрацьовано, o = у роботі, . = попереду
      var SECTIONS = [
        { t: "Стабільність дозвільної документації", items: [
          { p: "Дозвільні документи можуть бути оскаржені та скасовані незалежно від того, скільки часу минуло з дня їх видачі та на якій стадії перебуває проєкт. Це створює правову невизначеність та ускладнює залучення фінансування",
            r: "Встановлення чіткого моменту початку відліку шестимісячного строку на оскарження без права на його поновлення", st: "gggo.." }
        ]},
        { t: "Пайова участь", items: [
          { p: "Продовження практики стягнення пайової участі в судовому порядку після її законодавчого скасування",
            r: "Законодавче врегулювання питання з метою остаточного припинення стягнення пайової участі за об’єктами, введеними в експлуатацію після її скасування", st: "gggggo" }
        ]},
        { t: "Містобудівна документація та планування територій", items: [
          { p: "Недостатність джерел фінансування розроблення та оновлення містобудівної документації",
            r: "Розширення джерел фінансування містобудівної документації, зокрема можливість її фінансування за рахунок приватних коштів", st: "gggggo" },
          { p: "Скасування ДПТ через значний час після їх затвердження",
            r: "Встановлення чіткого моменту початку відліку шестимісячного строку на оскарження без права на його поновлення", st: "go...." },
          { p: "Неоднозначне застосування норми закону щодо можливості зміни функціонального призначення територій ДПТ",
            r: "Уточнення положень відповідної норми, що унеможливить двозначне трактування", st: "go...." },
          { p: "Неможливість зміни функціонального призначення промислових територій у разі бездіяльності ОМС щодо розроблення або актуалізації містобудівної документації",
            r: "Запровадження окремого механізму трансформації промислових територій під житлову та змішану забудову (житлові парки)", st: "go...." },
          { p: "Неузгодженість містобудівної документації, затвердженої у різний час",
            r: "Встановлення пріоритету положень містобудівної документації, затвердженої пізніше, та обов’язку привести Генеральний план у відповідність до неї у визначений строк", st: ".o...." },
          { p: "Невідповідність встановлених масштабів графічних матеріалів ДПТ потребам планування значних за площею територій",
            r: "Передбачити можливість розроблення графічних матеріалів ДПТ у масштабі М 1:2000 для значних за площею територій (зокрема від 20 га)", st: ".o...." },
          { p: "Відсутність представництва профільних бізнес-асоціацій у складі архітектурно-містобудівних рад",
            r: "Обов’язкове включення представників профільних бізнес-асоціацій до складу архітектурно-містобудівних рад", st: ".o...." }
        ]},
        { t: "Захист законної господарської діяльності", items: [
          { p: "Використання кримінальних проваджень та заходів забезпечення кримінального провадження для блокування законної діяльності девелоперів",
            r: "Внесення змін до ККУ та КПК України для посилення захисту законної господарської діяльності та обмеження можливостей її необґрунтованого блокування в межах кримінальних проваджень", st: "ggo..." },
          { p: "Використання громадських об’єднань та судових механізмів для необґрунтованого блокування законної господарської діяльності",
            rLead: "Удосконалення механізмів протидії зловживанням, зокрема:",
            rList: [
              "розширення законодавчого визначення протидії законній господарській діяльності",
              "запровадження механізму виявлення громадських об’єднань, які фактично не здійснюють статутної діяльності",
              "обмеження кола осіб, які мають право на звернення до суду в окремих категоріях спорів"
            ], st: "oo...." }
        ]},
        { t: "Культурна спадщина",
          note: "Відсутність підзаконного регулювання, необхідного для повноцінного застосування змін до законодавства у сфері охорони культурної спадщини, прийнятих ще у 2021 році. Потрібні окремі підзаконні акти:",
          items: [
            { solo: true, r: "Підзаконний акт щодо зон охорони", st: "gggggg" },
            { solo: true, r: "Підзаконний акт щодо пам’ятки та її території", st: "gggggo" },
            { solo: true, r: "Підзаконний акт щодо історичних ареалів", st: "go...." },
            { solo: true, r: "Підзаконний акт щодо буферних зон", st: "go...." },
            { solo: true, r: "Підзаконний акт щодо території історико-культурного заповідника, історико-культурної заповідної території", st: "go...." },
            { solo: true, r: "Підзаконний акт щодо археологічних досліджень", st: "go...." },
            { p: "Істотне обмеження раніше набутих прав власників унаслідок встановлення охоронного статусу об’єкта без механізму компенсації",
              r: "Запровадження механізму викупу державою або територіальною громадою об’єктів, охоронний статус яких унеможливлює або істотно обмежує їх використання відповідно до раніше набутих прав", st: "oo...." }
          ]},
        { t: "Підтримка платоспроможного попиту та фінансування житла", subs: [
          { t: "6.1. «єОселя»", items: [
            { p: "Неможливість поєднання «єОселі» з окремими державними житловими програмами",
              r: "Надання можливості використовувати державну грошову компенсацію для оплати частини вартості житла, а решту вартості фінансувати за рахунок кредиту «єОселя»", st: "ggo..." },
            { p: "Обмежені параметри площі та вартості житла, доступного за програмою «єОселя»",
              r: "Перегляд граничної площі та максимальної вартості житла з урахуванням актуальних параметрів ринку", st: "oo...." }
          ]},
          { t: "6.2. Акредитація об’єктів у процесі будівництва", items: [
            { p: "Відсутність єдиного механізму акредитації об’єктів у процесі будівництва",
              r: "Запровадження принципу «єдиного вікна» для акредитації об’єктів у процесі будівництва з можливістю централізованого подання та опрацювання необхідної інформації", st: "gggggo" }
          ]},
          { t: "6.3. Фінансування будівництва житла", items: [
            { p: "Відсутність доступного кредитного фінансування для реалізації житлових проєктів",
              r: "Включення житлового будівництва до напрямів державної програми «Доступні кредити 5–7–9 %»", st: "go...." },
            { p: "Неможливість застосування механізму державної підтримки інвестиційних проєктів зі значними інвестиціями у житловому будівництві",
              r: "Включення житлового будівництва до сфер, у яких можуть реалізовуватися інвестиційні проєкти зі значними інвестиціями", st: "go...." }
          ]},
          { t: "6.4. Проєктне фінансування", items: [
            { p: "Відсутність в Україні цілісного механізму проєктного фінансування будівництва житла",
              r: "Напрацювання комплексного механізму проєктного фінансування у будівництві, зокрема із запровадженням ескроу-рахунків, механізмів захисту кредиторів та інвесторів, step-in rights і механізмів заміни проблемного девелопера", st: "go...." }
          ]},
          { t: "6.5. Апартаменти", items: [
            { p: "Неможливість реєстрації місця проживання в апартаментах, які юридично мають статус нежитлових приміщень",
              r: "Запровадження можливості реєстрації місця проживання в апартаментах", st: ".o...." },
            { p: "Застосування комерційних тарифів на комунальні послуги до апартаментів, які фактично використовуються для проживання",
              r: "Запровадження можливості застосування побутових тарифів до апартаментів, які фактично використовуються фізичними особами для проживання", st: ".o...." }
          ]}
        ]},
        { t: "Земельні та кадастрові питання", items: [
          { p: "Невнесення до ДЗК інформації про функціональне призначення територій, що унеможливлює реалізацію передбачених законом процедур, зокрема спрощеної зміни цільового призначення",
            r: "Налагодження механізму внесення до ДЗК відомостей про функціональне призначення територій", st: "go...." },
          { p: "Колізія між передбаченим ДПТ функціональним призначенням і чинними обмеженнями у використанні земель",
            r: "Врегулювання механізму зміни цільового призначення земельної ділянки у випадках, коли передбачене ДПТ функціональне призначення території не відповідає встановленим обмеженням", st: ".o...." },
          { p: "Невизначеність щодо чинності МУО та дозволу на виконання будівельних робіт після поділу земельної ділянки та зміни її кадастрового номера",
            r: "Встановлення механізму збереження чинності та можливості подальшого використання МУО і дозволу на виконання будівельних робіт у разі поділу земельної ділянки під час реалізації об’єкта будівництва чергами", st: ".o...." }
        ]},
        { t: "Цифрові сервіси", items: [
          { p: "Неможливість реєстрації спеціального майнового права на майбутні об’єкти нерухомості (МОН) при реконструкції",
            r: "Забезпечення технічної та нормативної можливості реєстрації спеціального майнового права на МОН, що створюються в результаті реконструкції", st: "go...." },
          { p: "Відсутність належного механізму внесення до ЄДЕССБ раніше виданої дозвільної документації",
            r: "Налагодження внесення до ЄДЕССБ дозвільної документації, виданої до запровадження відповідних електронних процедур", st: "go...." }
        ]},
        { t: "Інвестиційні механізми", items: [
          { p: "Регуляторні обмеження щодо укладення інвестиційних договорів та договорів про спільну діяльність із державними підприємствами та установами",
            r: "Усунення регуляторних бар’єрів, які ускладнюють залучення приватних інвестицій до реалізації проєктів із державними підприємствами та установами", st: "oo...." }
        ]},
        { t: "Адміністративні бар’єри на місцевому рівні", items: [
          { p: "Бездіяльність органів та посадових осіб при здійсненні процедур, необхідних для реалізації девелоперських проєктів",
            r: "Запровадження відповідальності за бездіяльність та невиконання передбачених законодавством обов’язків", st: ".o...." }
        ]},
        { t: "Бронювання військовозобов’язаних співробітників генпідрядників, підрядників", items: [
          { p: "Необхідність отримання статусу критичності для здійснення бронювання військовозобов’язаних співробітників",
            r: "Комунікація із Агентством відновлення, надання консультацій членам Асоціації з питань щодо порядку отримання статусу, зокрема необхідних документів", st: "gggggg" }
        ]}
      ];
  
      function q(sel) { return root.querySelector(sel); }
      function esc(v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
      function plural(n) { return n === 1 ? " напрям" : (n % 10 >= 2 && n % 10 <= 4 && (n < 10 || n > 20)) ? " напрями" : " напрямів"; }
      function greens(st) { return (st.match(/g/g) || []).length; }
      function furthest(st) { for (var i = 5; i >= 0; i--) if (st[i] !== ".") return i; return -1; }
      function bucket(st) {
        if (st[5] === "g") return "done";
        var f = furthest(st);
        if (f === 5) return "final";
        if (f >= 2) return "review";
        return "concept";
      }
      function caption(st) {
        if (st === "gggggg") return { lead: "", txt: "Рішення ухвалено" };
        var a = st.indexOf("o");
        if (a >= 0) return { lead: "Поточний етап: ", txt: STAGES[a] };
        var g = st.lastIndexOf("g");
        if (g < 0) return { lead: "", txt: "Не розпочато" };
        return { lead: "Опрацьовано до етапу: ", txt: STAGES[g] };
      }
  
      function allItems() {
        var out = [];
        SECTIONS.forEach(function (s) {
          (s.items || []).forEach(function (it) { out.push(it); });
          (s.subs || []).forEach(function (sub) { (sub.items || []).forEach(function (it) { out.push(it); }); });
        });
        return out;
      }
      function sectionCount(s) {
        if (s.items) return s.items.length;
        return (s.subs || []).reduce(function (a, x) { return a + x.items.length; }, 0);
      }
  
      var ITEMS = allItems();
      var TOTAL = ITEMS.length;
      var STEPS_DONE = ITEMS.reduce(function (a, it) { return a + greens(it.st); }, 0);
      var STEPS_TOTAL = TOTAL * 6;
      var B = { concept: 0, review: 0, final: 0, done: 0 };
      ITEMS.forEach(function (it) { B[bucket(it.st)]++; });
  
      /* tiles */
      q("[data-tiles]").innerHTML = [
        { b: TOTAL, s: "Напрямів усього", cls: "uad-roadmap__tile--accent" },
        { b: B.concept, s: "На етапі концепції НПА", cls: "" },
        { b: B.review, s: "На погодженні / за регламентом", cls: "" },
        { b: B.final, s: "Фінальна стадія — рішення органу", cls: "uad-roadmap__tile--final" },
        { b: B.done, s: "Рішення ухвалено", cls: "uad-roadmap__tile--done" }
      ].map(function (t) {
        return '<div class="uad-roadmap__tile ' + t.cls + '"><b>' + t.b + '</b><span>' + t.s + '</span></div>';
      }).join("");
  
      var pct = Math.round((STEPS_DONE / STEPS_TOTAL) * 100);
      q("[data-bar]").style.width = pct + "%";
      q("[data-barnum]").textContent = "Опрацьовано кроків: " + STEPS_DONE + " / " + STEPS_TOTAL + " · " + pct + "%";
      q("[data-legend]").innerHTML = STAGES.map(function (s, i) {
        return '<li><em>' + (i + 1) + '</em><span>' + esc(s) + '</span></li>';
      }).join("");
  
      /* board */
      function pipeHtml(st) {
        var nodes = "";
        for (var i = 0; i < 6; i++) {
          var ch = st[i];
          var cls = "uad-roadmap__nd" + (ch === "g" ? " is-done" : ch === "o" ? " is-active" : "");
          if (i > 0 && st[i - 1] === "g") cls += " is-lnk";
          var word = ch === "g" ? "опрацьовано" : ch === "o" ? "у роботі" : "попереду";
          nodes += '<li class="' + cls + '" aria-label="' + esc(STAGES[i]) + " — " + word + '" title="' + esc((i + 1) + ". " + STAGES[i]) + '"><b>' + (i + 1) + '</b></li>';
        }
        var c = caption(st);
        return '<ol class="uad-roadmap__pipe" role="list" aria-label="Етапи погодження">' + nodes + '</ol>' +
               '<p class="uad-roadmap__cap">' + esc(c.lead) + '<b>' + esc(c.txt) + '</b></p>';
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
              return '<h4 class="uad-roadmap__sub-head">' + esc(sub.t) + '</h4><div class="uad-roadmap__items">' + sub.items.map(itemHtml).join("") + '</div>';
            }).join("")
          : '<div class="uad-roadmap__items">' + s.items.map(itemHtml).join("") + '</div>';
        return '<section class="uad-roadmap__grp" data-grp="' + (idx + 1) + '">' + head + note + body + '</section>';
      }).join("");
  
      /* filters */
      var FILTERS = [
        { k: "all", label: "Усі", n: TOTAL },
        { k: "concept", label: "Концепція", n: B.concept },
        { k: "review", label: "Погодження", n: B.review },
        { k: "final", label: "Фінальна стадія", n: B.final },
        { k: "done", label: "Ухвалено", n: B.done }
      ];
      var filtersEl = q("[data-filters]");
      filtersEl.innerHTML = FILTERS.map(function (f) {
        return '<button class="uad-roadmap__chip" type="button" data-k="' + f.k + '" aria-pressed="' + (f.k === "all") + '">' +
                 f.label + '<b>' + f.n + '</b></button>';
      }).join("");
  
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
  
      q("[data-foot]").textContent =
        "Кольорові позначки відтворюють колонку «поточний статус» вихідної таблиці: зелений — етап опрацьовано, " +
        "помаранчевий — етап у роботі, сірий — етап іще попереду. Показано " + TOTAL + " напрямів за " + SECTIONS.length + " темами.";
    }

  function mount(host) {
    if (host.__uadRoadmap) return;
    host.__uadRoadmap = true;
    var sr = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    sr.innerHTML = "<style>" + CSS + "</style><div class=\"uad-roadmap\" data-uad-roadmap>" + INNER + "</div>";
    render(sr.querySelector(".uad-roadmap"));
  }
  function boot() {
    var list = document.querySelectorAll("[data-uad-roadmap]");
    for (var i = 0; i < list.length; i++) mount(list[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
