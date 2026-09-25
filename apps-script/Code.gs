/**
 * «Юридичний напрямок: задачі в роботі» → JSON для віджета на Webflow.
 *
 * Читає аркуш у тому вигляді, як він є:
 *   рядок 1–2  — заголовок (A=проблема, B=рішення, C–H = 6 етапів у рядку 2);
 *   рядок-розділ — текст у A виду "1. Назва" (B порожній), C–H порожні;
 *   підрозділ    — текст у A виду "6.1. Назва";
 *   рядок-задача — A=проблема, B=рішення, C–H = 🟢 / 🟠 / ⚪;
 *   спільна проблема на кілька рядків — A об'єднано по вертикалі
 *     (у наступних рядках A порожній, B = конкретний пункт).
 *
 * РОЗГОРТАННЯ
 *   Розширення → Apps Script → вставити цей файл → Зберегти.
 *   Розгорнути → Новий розгортання → «Веб-застосунок»:
 *      Виконувати від імені: Я   |   Хто має доступ: Будь-хто
 *   Скопіювати URL, що закінчується на /exec, і вставити у Webflow:
 *      <div data-uad-roadmap data-src="URL/exec"></div>
 *      <script src="https://cdn.jsdelivr.net/gh/pavlokot/uad@main/uaofd-roadmap.js" defer></script>
 *   Після зміни коду: Розгорнути → Керувати розгортаннями → (олівець) → Нова версія.
 */

var SHEET_NAME = 'Аркуш1';   // якщо аркуш перейменують — змініть тут
var LAST_COL = 8;            // A..H

// Порожньо = ендпоінт відкритий (працює одразу).
// Щоб закрити: впишіть сюди довільний рядок і додайте у віджет  data-key="той самий рядок".
var ACCESS_KEY = '';

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (ACCESS_KEY && p.key !== ACCESS_KEY) {
    var deny = JSON.stringify({ error: 'forbidden' });
    return p.callback
      ? ContentService.createTextOutput(p.callback + '(' + deny + ');').setMimeType(ContentService.MimeType.JAVASCRIPT)
      : ContentService.createTextOutput(deny).setMimeType(ContentService.MimeType.JSON);
  }
  var body = JSON.stringify(buildData_());
  return p.callback
    ? ContentService.createTextOutput(p.callback + '(' + body + ');').setMimeType(ContentService.MimeType.JAVASCRIPT)
    : ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

function buildData_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  var tz = ss.getSpreadsheetTimeZone() || 'Europe/Kyiv';
  var updated = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');

  var lastRow = sh.getLastRow();
  if (lastRow < 3) return { updated: updated, stages: [], sections: [] };
  var grid = sh.getRange(1, 1, lastRow, LAST_COL).getDisplayValues();

  var stages = [];
  for (var i = 2; i < LAST_COL; i++) stages.push(String(grid[1][i] || '').trim());

  var TOP = /^\s*\d+[.)]\s/;
  var SUB = /^\s*\d+\.\d+[.)]/;

  function statusOf(row) {
    var s = '';
    for (var i = 2; i < LAST_COL; i++) {
      var v = String(row[i] || '');
      s += (v.indexOf('🟢') >= 0) ? 'g'                      // 🟢
         : (v.indexOf('🟠') >= 0 || v.indexOf('🟡') >= 0) ? 'o'  // 🟠 / 🟡
         : '.';
    }
    return s;
  }
  function hasStatus(row) {
    for (var i = 2; i < LAST_COL; i++) if (String(row[i] || '').trim()) return true;
    return false;
  }
  function solution(b) {
    b = String(b || '').trim();
    if (b.indexOf('\n') >= 0 && /\n\s*[•\-]\s/.test(b)) {
      var parts = b.split('\n');
      var lead = parts.shift().trim();
      var list = [];
      parts.forEach(function (p) {
        p = p.replace(/^\s*[•\-]\s*/, '').trim().replace(/;+\s*$/, '').trim();
        if (p) list.push(p);
      });
      return { rLead: lead, rList: list };
    }
    return { r: b.replace(/\s*\n\s*/g, ' ').trim() };
  }

  // 1) токенізуємо рядки
  var tokens = [];
  for (var r = 2; r < lastRow; r++) {           // з рядка 3 (index 2)
    var row = grid[r];
    var a = String(row[0] || '').trim();
    var b = String(row[1] || '').trim();
    if (a && !b && !hasStatus(row)) {
      tokens.push({ t: 'band', text: a, sub: SUB.test(a) });
    } else if (a || b || hasStatus(row)) {
      tokens.push({ t: 'row', a: a, b: b, st: statusOf(row) });
    }
  }

  // 2) збираємо секції
  var sections = [];
  var cur = null, cursub = null, buf = [];

  function flush() {
    if (!buf.length) return;
    var target = cursub || cur;
    if (!target) { buf = []; return; }
    // групуємо у "пробіги": рядок з A + наступні рядки без A
    var runs = [], run = null;
    buf.forEach(function (x) {
      if (x.a) { if (run) runs.push(run); run = { problem: x.a, members: [x] }; }
      else if (run) { run.members.push(x); }
      else { run = { problem: '', members: [x] }; }
    });
    if (run) runs.push(run);

    runs.forEach(function (rn) {
      if (rn.members.length >= 2) {                 // спільна проблема на кілька пунктів
        if (cur && !cur.note && rn.problem) cur.note = rn.problem;
        rn.members.forEach(function (m) {
          var it = { solo: true, sh: '', st: m.st };
          var s = solution(m.b); for (var k in s) it[k] = s[k];
          target.items.push(it);
        });
      } else {
        var m = rn.members[0];
        var it = { p: rn.problem, st: m.st };
        var s = solution(m.b); for (var k in s) it[k] = s[k];
        target.items.push(it);
      }
    });
    buf = [];
  }

  tokens.forEach(function (tok) {
    if (tok.t === 'band') {
      if (tok.sub) {
        flush();
        cursub = { t: tok.text, items: [] };
        if (cur) { cur.subs = cur.subs || []; cur.subs.push(cursub); }
      } else {
        flush(); cursub = null;
        cur = { t: tok.text.replace(TOP, '').trim(), items: [] };
        sections.push(cur);
      }
    } else {
      buf.push(tok);
    }
  });
  flush();

  sections.forEach(function (s) {
    if (s.subs && s.subs.length && (!s.items || !s.items.length)) delete s.items;
  });

  return { updated: updated, stages: stages, sections: sections };
}
