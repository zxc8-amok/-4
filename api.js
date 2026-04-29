// api.js — Модуль асинхронного получения данных (fetch, async/await)
// Предметная область: Каталог сервисов

// Загрузка внешних данных с публичного API (JSONPlaceholder как заглушка)
// В учебном контексте используем публичный REST API для демонстрации fetch
async function loadExternalServices() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

    if (!response.ok) {
      throw new Error("HTTP-ошибка: статус " + response.status);
    }

    const data = await response.json();

    // Адаптируем внешние данные к структуре нашей предметной области
    return data.map(function(post) {
      return {
        id:          post.id + 100,         // смещаем id чтобы не пересекался с local
        title:       "Внешний: " + post.title.slice(0, 40),
        value:       Math.floor(post.id * 137 % 900) + 200,
        status:      post.id % 2 === 0 ? "done" : "new",
        createdAt:   "2025-04-0" + post.id,
      };
    });
  } catch (err) {
    console.error("Ошибка загрузки внешних сервисов:", err.message);
    return [];   // возвращаем пустой массив — UI не ломается
  }
}
