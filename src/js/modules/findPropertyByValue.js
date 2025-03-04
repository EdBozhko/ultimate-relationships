function findPropertyByValue(obj, value, seenObjects = []) {
  if (seenObjects.includes(obj)) {
    return null; // Обнаружена циклическая ссылка
  }

  seenObjects.push(obj);

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var property = obj[key];

      if (property === value || (typeof property === 'string' && property.includes(value))) {
        return key; // Возвращаем имя свойства
      }

      if (typeof property === 'object') {
        var result = findPropertyByValue(property, value, seenObjects);

        if (result) {
          return key + '.' + result; // Возвращаем путь к свойству
        }
      }
    }
  }

  return null; // Свойство не найдено
}
