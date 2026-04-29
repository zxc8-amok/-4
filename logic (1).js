// logic.js — Функции обработки данных
function filterByStatus(items, status) {
  return items.filter(function(item) { return item.status === status; });
}
function filterByMinValue(items, min) {
  return items.filter(function(item) { return item.value >= min; });
}
function findById(items, id) {
  return items.find(function(item) { return item.id === id; }) || null;
}
function sortByValueDesc(items) {
  return items.slice().sort(function(a, b) { return b.value - a.value; });
}
function buildStats(items) {
  return items.reduce(function(acc, item) {
    acc.totalCount += 1;
    acc.sumValue   += item.value;
    if (item.value > acc.maxValue) acc.maxValue = item.value;
    if (item.status === "new") acc.newCount += 1;
    return acc;
  }, { totalCount: 0, sumValue: 0, maxValue: 0, newCount: 0 });
}
function searchByTitle(items, query) {
  const q = query.trim().toLowerCase();
  return items.filter(function(item) {
    return item.title.toLowerCase().includes(q);
  });
}
