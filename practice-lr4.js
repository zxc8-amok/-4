// ============================================================
// practice-lr4.js — Задания на закрепление теории ЛР-4
// Предметная область: Каталог сервисов (вариант 13)
// ============================================================

// ─── Блок A — Регулярные выражения ───────────────────────────

// A1. Проверка email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
console.log("A1 email valid:", validateEmail("admin@services.ru"));   // true
console.log("A1 email invalid:", validateEmail("not-an-email"));      // false

// A2. Проверка даты формата YYYY-MM-DD
function validateDate(dateStr) {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(dateStr);
}
console.log("A2 date valid:", validateDate("2025-03-15"));   // true
console.log("A2 date invalid:", validateDate("15.03.2025")); // false

// ─── Блок B — Функции обработки строк ────────────────────────

// B1. Нормализация строки: обрезка пробелов и приведение к нижнему регистру
function normalizeInput(str) {
  return str.trim().toLowerCase();
}
console.log("B1 normalize:", normalizeInput("  SSO Service  ")); // "sso service"

// B2. Форматирование записи сервиса в читаемую строку
function formatService(service) {
  return "#" + service.id + " | " + service.title +
         " [" + service.status + "] value=" + service.value;
}
const testService = { id: 1, title: "Сервис авторизации", status: "new", value: 950 };
console.log("B2 format:", formatService(testService));

// ─── Блок C — Пользовательские функции ───────────────────────

// C1. Функция с валидацией входных данных
function addService(id, title, value, status, createdAt) {
  if (!title || typeof title !== "string" || title.trim() === "") {
    console.log("C1 Ошибка: название сервиса не может быть пустым");
    return null;
  }
  if (isNaN(value) || value <= 0) {
    console.log("C1 Ошибка: value должно быть положительным числом");
    return null;
  }
  if (!validateDate(createdAt)) {
    console.log("C1 Ошибка: дата должна быть в формате YYYY-MM-DD");
    return null;
  }
  return { id, title: title.trim(), value: Number(value), status, createdAt };
}
console.log("C1 valid:", addService(9, "Новый сервис", 500, "new", "2025-05-01"));
console.log("C1 invalid:", addService(10, "", -100, "new", "bad-date"));

// C2. Функция поиска по подстроке в названии
function searchByTitle(data, query) {
  const q = normalizeInput(query);
  return data.filter(function(item) {
    return normalizeInput(item.title).includes(q);
  });
}
const demo = [
  { id: 1, title: "Сервис авторизации", status: "new",  value: 950 },
  { id: 2, title: "Сервис уведомлений", status: "done", value: 820 },
  { id: 3, title: "Сервис аналитики",   status: "new",  value: 1100 },
];
console.log("C2 search 'авт':", searchByTitle(demo, "авт"));

// ─── Блок D — Асинхронность (имитация fetch) ─────────────────

// D1. Имитация асинхронного запроса через Promise
function fakeLoadServices() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve([
        { id: 101, title: "Внешний сервис A", status: "new",  value: 700 },
        { id: 102, title: "Внешний сервис B", status: "done", value: 400 },
      ]);
    }, 300);
  });
}

async function loadAndLog() {
  try {
    const data = await fakeLoadServices();
    console.log("D1 async loaded:", data);
  } catch (err) {
    console.log("D1 Ошибка загрузки:", err.message);
  }
}
loadAndLog();

// D2. try/catch при некорректном JSON (имитация ошибки парсинга)
function parseServiceJSON(jsonStr) {
  try {
    const obj = JSON.parse(jsonStr);
    console.log("D2 parsed:", obj);
    return obj;
  } catch (err) {
    console.log("D2 Ошибка парсинга JSON:", err.message);
    return null;
  }
}
parseServiceJSON('{"id":1,"title":"SSO"}');   // корректный JSON
parseServiceJSON("not-json");                  // некорректный

// ─── Блок E — Валидация формы ────────────────────────────────

// E1. Функция валидации полей новой записи сервиса
function validateServiceForm(formData) {
  const errors = [];
  if (!formData.title || formData.title.trim() === "") {
    errors.push("Название не может быть пустым");
  }
  if (isNaN(formData.value) || Number(formData.value) <= 0) {
    errors.push("Value должно быть положительным числом");
  }
  if (!validateDate(formData.createdAt)) {
    errors.push("Дата должна быть в формате YYYY-MM-DD");
  }
  if (!validateEmail(formData.contactEmail)) {
    errors.push("Email некорректен");
  }
  return errors;
}

const validForm   = { title: "Новый сервис", value: "800",
                      createdAt: "2025-06-01", contactEmail: "dev@org.ru" };
const invalidForm = { title: "", value: "-5",
                      createdAt: "01.06.2025", contactEmail: "bad" };
console.log("E1 valid form errors:",   validateServiceForm(validForm));   // []
console.log("E1 invalid form errors:", validateServiceForm(invalidForm)); // [...]
