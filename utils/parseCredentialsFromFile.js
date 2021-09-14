import { readFile } from 'fs/promises';

async function parseCredentialsFromFile(path) {
  const data = await readFile(path);

  const parsedData = data
    // Приводим buffer к строке
    .toString()
    // Обрезаем возможные пробелы и пустые строки
    .trim()
    // Разбиваем данные на массив построчно
    .split('\n')
    // Формируем массив [логин, пароль]
    .map((item) => item.split(' '));

  return parsedData;
}

export { parseCredentialsFromFile };
