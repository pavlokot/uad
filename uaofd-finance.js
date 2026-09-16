/*! Сплата членських внесків і структура видатків — віджет для Webflow.
    Вставка (елемент HTML Embed, на вкладку "Фінансові показники"):
      <div data-uad-finance></div>
      <script src="https://cdn.jsdelivr.net/gh/pavlokot/uad@fin-v1/uaofd-finance.js" defer></script>
    - data-bg : необов'язково, колір фону під блоком. За замовчуванням #f5f5f5.
    Дані статичні (знімок з PDF) — редагуються нижче в об'єкті DATA.
    Стилі ізольовані (Shadow DOM), без зовнішніх залежностей. */
(function () {
  "use strict";

  var CSS = ":host{display:block}\n" +
    ".uad-finance, .uad-finance * { box-sizing: border-box; }\n" +
    ".uad-finance {\n" +
    "  --f-violet: #8040b0; --f-violet-soft: #ede0f8;\n" +
    "  --f-navy: #1b2a4a; --f-rust: #c0300c; --f-rust-soft: #fbe4dc;\n" +
    "  --f-done: #157a3d; --f-accent: #e6f44f;\n" +
    "  --f-ink: #242424; --f-ink-soft: #4b4b4b; --f-muted: #6e6e6e;\n" +
    "  --f-line: rgba(0,0,0,0.1); --f-panel: #ffffff;\n" +
    "  --f-page-bg: #f5f5f5;\n" +
    "  --f-c1: #1b2a4a; --f-c2: #1f8a6f; --f-c3: #7c93ad; --f-c4: #d29a3d; --f-c5: #a98fc0; --f-c6: #d8d8dc;\n" +
    "  color-scheme: light; display: block; width: 100%; padding: 0; position: relative;\n" +
    "  background: var(--f-page-bg); color: var(--f-ink);\n" +
    "  font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;\n" +
    "}\n" +
    ".uad-finance__shell { padding: 32px 40px 40px; }\n" +
    ".uad-finance__eyebrow { margin: 0 0 12px; font-family: Manrope, Arial, sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--f-violet); }\n" +
    ".uad-finance__title { margin: 0 0 10px; font-family: Manrope, Arial, sans-serif; font-size: 30px; line-height: 1.16; font-weight: 900; letter-spacing: -0.02em; max-width: 34ch; color: var(--f-muted); }\n" +
    ".uad-finance__lede { margin: 0 0 26px; max-width: 68ch; font-size: 14px; line-height: 1.55; color: var(--f-ink-soft); font-weight: 500; }\n" +
    ".uad-finance__tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }\n" +
    ".uad-finance__tile { padding: 16px 18px; border-radius: 12px; background: var(--f-panel); border: 1px solid var(--f-line); }\n" +
    ".uad-finance__tile b { display: block; font-family: Manrope, Arial, sans-serif; font-size: 26px; font-weight: 900; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; color: var(--f-ink); }\n" +
    ".uad-finance__tile--done b { color: var(--f-done); } .uad-finance__tile--rust b { color: var(--f-rust); }\n" +
    ".uad-finance__tile span { display: block; margin-top: 6px; font-size: 12.5px; font-weight: 700; color: var(--f-ink-soft); }\n" +
    ".uad-finance__tile em { display: block; margin-top: 2px; font-style: normal; font-size: 11px; font-weight: 500; color: var(--f-muted); }\n" +
    ".uad-finance__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: stretch; }\n" +
    ".uad-finance__card { padding: 22px 24px; border-radius: 12px; background: var(--f-panel); border: 1px solid var(--f-line); }\n" +
    ".uad-finance__card h3 { margin: 0 0 4px; font-family: Manrope, Arial, sans-serif; font-size: 16px; font-weight: 800; letter-spacing: -0.01em; color: var(--f-ink); }\n" +
    ".uad-finance__card .uad-finance__sub { margin: 0 0 16px; font-size: 12px; font-weight: 600; color: var(--f-muted); }\n" +
    ".uad-finance__big { font-family: Manrope, Arial, sans-serif; font-size: 34px; font-weight: 900; letter-spacing: -0.02em; color: var(--f-rust); margin-bottom: 14px; font-variant-numeric: tabular-nums; }\n" +
    ".uad-finance__debtors { list-style: none; margin: 0 0 16px; padding: 0; display: grid; gap: 8px; }\n" +
    ".uad-finance__debtors li { display: flex; justify-content: space-between; gap: 12px; padding: 10px 12px; border-radius: 8px; background: var(--f-page-bg); font-size: 13.5px; font-weight: 700; color: var(--f-ink); }\n" +
    ".uad-finance__debtors li b { font-family: Manrope, Arial, sans-serif; font-variant-numeric: tabular-nums; color: var(--f-rust); }\n" +
    ".uad-finance__callout { padding: 10px 14px; border-radius: 8px; background: var(--f-rust-soft); color: var(--f-navy); font-size: 13px; font-weight: 700; margin-bottom: 10px; }\n" +
    ".uad-finance__footnote { margin: 0; font-size: 12px; font-weight: 500; color: var(--f-muted); }\n" +
    ".uad-finance__donut-wrap { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }\n" +
    ".uad-finance__donut { width: 148px; height: 148px; border-radius: 50%; position: relative; flex: 0 0 auto; }\n" +
    ".uad-finance__donut::after { content: \"\"; position: absolute; inset: 24%; border-radius: 50%; background: var(--f-panel); display: flex; }\n" +
    ".uad-finance__donut-total { position: absolute; inset: 24%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }\n" +
    ".uad-finance__donut-total b { font-family: Manrope, Arial, sans-serif; font-size: 17px; font-weight: 900; color: var(--f-ink); line-height: 1.1; }\n" +
    ".uad-finance__donut-total span { font-size: 9.5px; font-weight: 700; color: var(--f-muted); text-transform: uppercase; letter-spacing: 0.04em; }\n" +
    ".uad-finance__legend { flex: 1 1 220px; list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; min-width: 200px; }\n" +
    ".uad-finance__legend li { display: flex; align-items: center; gap: 9px; font-size: 12.5px; font-weight: 600; color: var(--f-ink-soft); }\n" +
    ".uad-finance__legend i { width: 11px; height: 11px; border-radius: 3px; flex: 0 0 auto; }\n" +
    ".uad-finance__legend b { margin-left: auto; font-family: Manrope, Arial, sans-serif; font-variant-numeric: tabular-nums; color: var(--f-ink); font-weight: 800; }\n" +
    "@media screen and (max-width: 980px) {\n" +
    "  .uad-finance__shell { padding: 28px 24px 36px; }\n" +
    "  .uad-finance__tiles { grid-template-columns: repeat(2, 1fr); }\n" +
    "  .uad-finance__cols { grid-template-columns: 1fr; }\n" +
    "  .uad-finance__title { font-size: 25px; }\n" +
    "}\n" +
    "@media screen and (max-width: 560px) {\n" +
    "  .uad-finance__shell { padding: 24px 16px 32px; }\n" +
    "  .uad-finance__tiles { grid-template-columns: 1fr 1fr; }\n" +
    "  .uad-finance__donut-wrap { flex-direction: column; align-items: flex-start; }\n" +
    "}";

  var INNER =
    '<div class="uad-finance__shell">' +
      '<p class="uad-finance__eyebrow">Асоціація · фінансові показники</p>' +
      '<h2 class="uad-finance__title">Сплата членських внесків і структура видатків</h2>' +
      '<p class="uad-finance__lede" data-lede></p>' +
      '<div class="uad-finance__tiles" data-tiles></div>' +
      '<div class="uad-finance__cols">' +
        '<div class="uad-finance__card">' +
          '<h3>Борги за членськими внесками</h3>' +
          '<p class="uad-finance__sub" data-debt-sub></p>' +
          '<div class="uad-finance__big" data-debt-total></div>' +
          '<ul class="uad-finance__debtors" data-debtors></ul>' +
          '<div class="uad-finance__callout" data-debt-callout></div>' +
          '<p class="uad-finance__footnote" data-debt-note></p>' +
        '</div>' +
        '<div class="uad-finance__card">' +
          '<h3>Видатки за призначенням</h3>' +
          '<p class="uad-finance__sub" data-exp-sub></p>' +
          '<div class="uad-finance__donut-wrap">' +
            '<div class="uad-finance__donut" data-donut>' +
              '<div class="uad-finance__donut-total" data-donut-total></div>' +
            '</div>' +
            '<ul class="uad-finance__legend" data-legend></ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  /* ---------- дані (знімок станом на 01.09.2026, з PDF) ------------------- */
  var DATA = {
    lede: "Січень–серпень 2026 року. Дані про борги компаній оновлено на 07.09.2026",
    tiles: [
      { v: "10,45 млн грн", l: "Членські внески на 01.09", e: "9,20 поточні + 1,25 погашення боргів" },
      { v: "2,96 млн грн", l: "Надходження до цільових фондів", e: "Станом на 01.09.2026" },
      { v: "6,8 млн грн", l: "Прогноз членських внесків", e: "За період вересень – грудень", cls: "done" },
      { v: "3,85 млн грн", l: "Кредиторська заборгованість", e: "Станом на 01.09.2026", cls: "rust" }
    ],
    debt: {
      sub: "Найбільші боржники за реєстром на 07.09",
      total: "6,40 млн грн",
      rows: [
        { name: "САГА ДЕВЕЛОПМЕНТ", v: "1,80" },
        { name: "Д-І-М", v: "1,20" },
        { name: "ЕНСО", v: "1,00" }
      ],
      callout: "Три компанії формують 62,5% боргу",
      note: "Ще 0,30 млн грн внесків надійшло 02–07.09"
    },
    expenses: {
      sub: "На 01.09.2026, усього 15,08 млн грн",
      total: "15,08 млн грн",
      items: [
        { label: "Персонал і податки", pct: 26.9, color: "var(--f-c1)" },
        { label: "Конференції, виставки, презентації", pct: 26.8, color: "var(--f-c2)" },
        { label: "Інші послуги та витрати", pct: 15.9, color: "var(--f-c3)" },
        { label: "Цільові проєкти", pct: 11.4, color: "var(--f-c4)" },
        { label: "Оренда та утримання офісу", pct: 10.0, color: "var(--f-c5)" },
        { label: "Погашення боргів на 01.01", pct: 9.0, color: "var(--f-c6)" }
      ]
    }
  };

  function esc(v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function ensureFont() {
    if (document.getElementById("uad-finance-font") || document.__uadFinanceFont) return;
    document.__uadFinanceFont = true;
    var link = document.createElement("link");
    link.id = "uad-finance-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800;900&display=swap";
    (document.head || document.documentElement).appendChild(link);
  }

  function render(root) {
    function q(sel) { return root.querySelector(sel); }

    q("[data-lede]").textContent = DATA.lede;

    q("[data-tiles]").innerHTML = DATA.tiles.map(function (t) {
      return '<div class="uad-finance__tile' + (t.cls ? " uad-finance__tile--" + t.cls : "") + '">' +
               "<b>" + esc(t.v) + "</b><span>" + esc(t.l) + "</span><em>" + esc(t.e) + "</em>" +
             "</div>";
    }).join("");

    q("[data-debt-sub]").textContent = DATA.debt.sub;
    q("[data-debt-total]").textContent = DATA.debt.total;
    q("[data-debtors]").innerHTML = DATA.debt.rows.map(function (r) {
      return "<li><span>" + esc(r.name) + "</span><b>" + esc(r.v) + "</b></li>";
    }).join("");
    q("[data-debt-callout]").textContent = DATA.debt.callout;
    q("[data-debt-note]").textContent = DATA.debt.note;

    q("[data-exp-sub]").textContent = DATA.expenses.sub;

    var acc = 0;
    var stops = DATA.expenses.items.map(function (it) {
      var from = Math.round(acc * 10) / 10, to = Math.round((acc + it.pct) * 10) / 10;
      acc = to;
      return it.color + " " + from + "% " + to + "%";
    }).join(", ");
    q("[data-donut]").style.background = "conic-gradient(" + stops + ")";
    q("[data-donut-total]").innerHTML = "<b>" + esc(DATA.expenses.total) + "</b><span>усього</span>";

    q("[data-legend]").innerHTML = DATA.expenses.items.map(function (it) {
      return '<li><i style="background:' + it.color + '"></i>' + esc(it.label) +
             '<b>' + it.pct.toFixed(1).replace(".", ",") + "%</b></li>";
    }).join("");
  }

  function mount(host) {
    if (host.__uadFinance) return;
    host.__uadFinance = true;
    ensureFont();
    var sr = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
    sr.innerHTML = "<style>" + CSS + "</style><div class=\"uad-finance\" data-uad-finance>" + INNER + "</div>";
    var root = sr.querySelector(".uad-finance");
    var bg = (host.getAttribute("data-bg") || "").trim();
    if (bg) root.style.setProperty("--f-page-bg", bg);
    render(root);
  }
  function boot() {
    var list = document.querySelectorAll("[data-uad-finance]");
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
