import puppeteer from 'puppeteer';
import { parseCredentialsFromFile } from './utils/parseCredentialsFromFile';
import { writeLogToFile } from './utils/writeLogToFile';
import { cleanLogFile } from './utils/cleanLogFile';
import { checkAccount } from './functions/checkAccount';

(async () => {
  // Стирает старые логи и пишет дату в начало файла
  await cleanLogFile();
  const date = new Date().toLocaleString('ru');
  await writeLogToFile(`${date}\n`);
  // запускает браузер
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0,
    // product: 'chrome',
    // slowMo: 100,
    defaultViewport: { width: 1500, height: 900 },
    args: [`--window-size=1500,900`],
  });
  // получает массив логинов и паролей
  const credentials = await parseCredentialsFromFile('./data.txt');
  let counter = 1;
  for await (const [log, pass] of credentials) {
    writeLogToFile(
      `${counter}/${credentials.length}. Начало проверки аккаунта: ${log} ${pass}\n-------------------------------------`
    );
    await checkAccount(log, pass, browser);
    counter += 1;
  }
  browser.close();
})();
// 1alexandr.dedikov@bk.ru Gw5q2nnZ
// svschgv6@mail.ru Gw5q2nnZ587
// vorgachev.ernest@mail.ru NXzwbMPm
// german_glukhman@mail.ru NXzwbMPm
// yaroslav_butyakov@mail.ru NXzwbMPm
