import { readFile } from 'fs/promises';

async function parseBaseUrlsFromFile(path) {
  const data = await readFile(path);

  const parsedData = data
    // Приводим buffer к строке
    .toString()
    // Обрезаем возможные пробелы и пустые строки
    .trim()
    // Разбиваем данные на массив построчно
    .split('\n');

  return parsedData;
}

export { parseBaseUrlsFromFile };
