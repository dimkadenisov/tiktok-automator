import { appendFile } from 'fs/promises';

/**
 *
 * @param {string} data строка, которую надо дописать в файл логов
 */
async function writeLogToFile(data) {
  await appendFile('./log.txt', `${data}\n`);
}

export { writeLogToFile };
