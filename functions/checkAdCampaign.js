import { choiceTodayDate } from '../utils/choiceTodayDate';
import { activateAllFilters } from '../utils/activateAllFilters';
import { activateTableRowCheckboxes } from './activateTableRowCheckboxes';
import { getAdCampaignsData } from '../utils/getAdCampaignsData';
import { parseBaseUrlsFromFile } from '../utils/parseBaseUrlsFromFile';
import { checkUrl } from '../utils/checkUrl';
import { writeLogToFile } from '../utils/writeLogToFile';

async function checkAdCampaign(link, browser) {
  const page = await browser.newPage();
  await page.goto(link);

  await page.waitForSelector('.biz-menu-item', { timeout: 0 });
  // Переход на страницу рекламных компаний
  await page.evaluate(() => {
    document.querySelectorAll('.biz-menu-item')[1].click();
  });
  // Выбор фильтра с сегодняшней датой
  await choiceTodayDate(page);
  // Активация фильтра "все"
  await activateAllFilters(page);
  // Выбирает строки с рекламными кампаниями, в которых были траты
  await activateTableRowCheckboxes(page);
  await page.waitForTimeout(2000);
  // Переходит на вкладку с выбранными рекламными кампаниями
  await page.click('a[href="/i18n/perf/creative"]');
  await page.waitForTimeout(8000);
  // Получает данные о рекламных кампаниях
  const adCampaignsData = await getAdCampaignsData(page);
  writeLogToFile(
    `\t\tВсего рекламных ссылок для проверки: ${adCampaignsData.length}\n`
  );
  // Получает массив допустимых ссылок
  const baseUrls = await parseBaseUrlsFromFile('baseUrls.txt');
  // Проверяет правильные ли ссылки вставлены в рекламных кампаниях
  let counter = 1;
  for await (const { adId, href } of adCampaignsData) {
    const page = await browser.newPage();
    await Promise.all([
      page.goto(href),
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 }),
    ]);
    const url = await page.url();

    if (checkUrl(url, baseUrls)) {
      await writeLogToFile(
        `\t\t\t${counter}/${adCampaignsData.length}. Ok: adId: ${adId}, href: ${href}`
      );
      counter += 1;
      await page.close();
      continue;
    }

    await writeLogToFile(`
      \t\t\t${counter}/${adCampaignsData.length}. Ошибка:\n
      adId: ${adId},\n
      Изначальная ссылка: ${href}\n
      Конечная ссылка: ${url}
    `);
    counter += 1;
    await page.close();
  }
  // Закрывает страницу
  await page.close();
  return;
}

export { checkAdCampaign };
