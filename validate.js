// validate.js — Модуль валидации данных (регулярные выражения)
// Предметная область: Каталог сервисов

// Проверка email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Проверка даты формата YYYY-MM-DD
function validateDate(dateStr) {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  return re.test(dateStr);
}

// Проверка: строка не пустая после trim
function validateNotEmpty(str) {
  return typeof str === "string" && str.trim().length > 0;
}

// Проверка: положительное число
function validatePositiveNumber(val) {
  const n = Number(val);
  return !isNaN(n) && n > 0;
}

// Нормализация строки: trim + нижний регистр
function normalizeInput(str) {
  return str.trim().toLowerCase();
}

// Валидация формы добавления сервиса
// Возвращает массив строк с ошибками (пустой — если всё ок)
function validateServiceForm(data) {
  const errors = [];
  if (!validateNotEmpty(data.title)) {
    errors.push("Название сервиса не может быть пустым.");
  }
  if (!validatePositiveNumber(data.value)) {
    errors.push("Рейтинг (value) должен быть положительным числом.");
  }
  if (!validateDate(data.createdAt)) {
    errors.push("Дата должна быть в формате YYYY-MM-DD.");
  }
  if (!validateEmail(data.contactEmail)) {
    errors.push("Email контактного лица некорректен.");
  }
  return errors;
}
